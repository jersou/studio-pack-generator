import {
  convertToImageItem,
  convertToValidFilename,
  getExtension,
  getNameWithoutExt,
  groupBy,
  isFile,
  isFolder,
} from "../utils/utils.ts";
import { join } from "@std/path";
import { blue, green } from "@std/fmt/colors";
import { exists } from "@std/fs";
import { parse } from "@libs/xml";
import i18next from "https://deno.land/x/i18next@v23.15.1/index.js";
import { sprintf } from "@std/fmt/printf";
import type { File, Metadata } from "../serialize/serialize-types.ts";
import { convertImage } from "./gen_image.ts";
import type { StudioPackGenerator } from "../studio_pack_generator.ts";

export type Rss = {
  title: string;
  description?: string;
  lastBuildDate?: string;
  image?: {
    url?: string;
  };
  itunes?: {
    image?: {
      "@href"?: string;
    };
  };
  "itunes:image"?: {
    "@href": string;
  };
  item: RssItem[];
};
export type RssItem = {
  title?: string;
  pubDate: string;
  enclosure: {
    "@url": string;
  };
  "podcast:season"?: number;
  "podcast:episode"?: number;
  "itunes:season"?: number;
  "itunes:subtitle"?: string;
  "itunes:episode"?: number;
  "itunes:duration"?: string;
  "itunes:image"?: {
    "@href": string;
  };
};
export type FolderWithUrlOrData = {
  name: string;
  files: (FolderWithUrlOrData | FileWithUrlOrData)[];
  metadata?: Metadata;
  thumbnailUrl?: string;
};
export type FileWithUrlOrData = File & {
  url?: string;
} & {
  data?: string | Uint8Array | object;
};

async function getFolderWithUrlFromRssUrl(
  url: string,
  opt: StudioPackGenerator,
): Promise<FolderWithUrlOrData[]> {
  console.log(green(`→ url = ${url}`));

  const resp = await fetch(url);
  const xml = (await resp.text()).replace(/<\?xml-stylesheet [^>]+\?>/, "");
  // @ts-ignore rss conv
  // deno-lint-ignore no-explicit-any
  const rss: Rss = (parse(xml).rss as any).channel;
  const metadata = {
    title: rss.title,
    description: rss.description,
    podcast: true, // can be used by players to know if that pack is a podcast
  } as Metadata;
  if (opt.rssMinDuration > 0) {
    rss.item = rss.item.filter((i) => {
      const duration = i["itunes:duration"];
      if (duration) {
        return (
          duration
            .split(":")
            .reduce(
              (acc, val, index) =>
                acc + Math.pow(60, 2 - index) * parseInt(val, 10),
              0,
            ) >= opt.rssMinDuration
        );
      } else {
        return true;
      }
    });
  }
  // we reverse the array to have oldest episodes first. This should ensure episode correctly sorted
  let rssItems = [rss.item.reverse()];
  let seasonIds: string[] = [];
  if (opt.rssSplitSeasons) {
    const grouped = groupBy(rss.item, (item) => {
      const season = item["itunes:season"] ?? item["podcast:season"] ?? 0;
      return season + "";
    });
    const sorted = Object.entries(grouped).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
    seasonIds = sorted.map((i) => i[0]);
    // we sort based on season. Season 0 will be items without a rss season => specials
    rssItems = sorted.map((i) => i[1]);
  }
  const rssName = convertToValidFilename(rss.title);
  const imgUrl = rss.image?.url ||
    rss.itunes?.image?.["@href"] ||
    rss["itunes:image"]?.["@href"] ||
    "";
  const fss: FolderWithUrlOrData[] = rssItems.map((items, index) => {
    const name = rssItems.length > 1
      ? `${rssName} ${
        seasonIds[index] === "0"
          ? opt.i18n?.["special"] || i18next.t("special")
          : sprintf(
            opt.i18n?.["season"] || i18next.t("season"),
            seasonIds[index],
          )
      }`
      : rssName;
    return {
      name,
      files: [],
      thumbnailUrl: opt.rssUseImageAsThumbnail
        ? items.find((item) => item["itunes:image"]?.["@href"])?.[
          "itunes:image"
        ]?.["@href"]
        : imgUrl,
      metadata: {
        ...metadata,
        title: name,
        ...(opt.rssEpisodeNumbers
          ? {
            episodeCount: items.length,
          }
          : {}),
      },
    };
  });
  for (let index = 0; index < fss.length; index++) {
    const fs = fss[index];
    if (imgUrl) {
      fs.files.push({
        name: opt.skipImageConvert
          ? `0-item.${getExtension(imgUrl)}`
          : `0-item-to-resize.${getExtension(imgUrl)}`,
        url: imgUrl,
        sha1: "",
      });
    }
    const items = rssItems[index].sort(
      (a, b) => new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime(),
    );
    console.log(blue(`→ ${items.length} items`));
    if (items.length <= opt.rssSplitLength) {
      fs.files.push(await getFolderOfStories(items, opt, 0));
    } else {
      fs.files.push(await getFolderParts(items, opt));
    }
  }

  return fss;
}

export function getItemFileName(item: RssItem, opt: StudioPackGenerator) {
  const title = convertToValidFilename(
    ((opt.rssUseSubtitleAsTitle && item["itunes:subtitle"]) || item.title)!,
  );
  return (
    new Date(item.pubDate).getTime() +
    ` - ${title}.${getExtension(item.enclosure["@url"])}`
  );
}

export function fixUrl(url: string): string {
  return url
    .replace(/^.*https:\/\//g, "https://")
    .replace(/^.*http:\/\//g, "http://");
}

async function getFolderOfStories(
  items: RssItem[],
  opt: StudioPackGenerator,
  deltaIndex: number,
): Promise<FolderWithUrlOrData> {
  return {
    name: opt.i18n?.["storyQuestion"] || i18next.t("storyQuestion"),
    files: (
      await Promise.all(
        items.map(async (item, index) => {
          const itemFiles = [
            {
              name: getItemFileName(item, opt),
              url: fixUrl(item.enclosure["@url"]),
              sha1: "",
            },
            {
              name: getNameWithoutExt(getItemFileName(item, opt)) +
                "-metadata.json",
              data: {
                ...item,
                title: opt.customModule?.fetchRssItemTitle
                  ? await opt.customModule?.fetchRssItemTitle(item, opt)
                  : (opt.rssUseSubtitleAsTitle && item["itunes:subtitle"]) ||
                    item.title,
                episode: item["itunes:episode"] ||
                  item["podcast:episode"] ||
                  deltaIndex + index + 1,
              },
              sha1: "",
            },
          ];
          const imageUrl = opt.customModule?.fetchRssItemImage
            ? await opt.customModule?.fetchRssItemImage(item, opt)
            : item["itunes:image"]?.["@href"];
          if (!opt.skipRssImageDl && imageUrl) {
            itemFiles.push({
              name: `${getNameWithoutExt(getItemFileName(item, opt))}.item.${
                getExtension(
                  imageUrl,
                )
              }`,
              url: imageUrl,
              sha1: "",
            });
          }

          return itemFiles;
        }),
      )
    ).flat(),
  };
}

async function getFolderParts(
  items: RssItem[],
  opt: StudioPackGenerator,
): Promise<FolderWithUrlOrData> {
  const partCount = Math.ceil(items.length / 10);
  const parts: RssItem[][] = [];
  for (let i = 0; i < partCount; i++) {
    const partSize = Math.floor(items.length / (partCount - i));
    const part: RssItem[] = [];
    part.push(...items.splice(0, partSize));
    parts.push(part);
  }

  return {
    name: opt.i18n?.["partQuestion"] || i18next.t("partQuestion"),
    files: await Promise.all(
      parts.map(async (part, index) => ({
        name: sprintf(i18next.t("partTitle"), index + 1),
        files: [
          await getFolderOfStories(
            part,
            opt,
            parts.slice(0, index).reduce((acc, val) => acc + val.length, 0),
          ),
        ],
      })),
    ),
  };
}

async function writeFolderWithUrl(
  folder: FolderWithUrlOrData,
  parentPath: string,
) {
  const path = join(parentPath, folder.name);
  await Deno.mkdir(path, { recursive: true });
  for (const file of folder.files) {
    isFolder(file)
      ? await writeFolderWithUrl(file as FolderWithUrlOrData, path)
      : await writeFileWithUrl(file as FileWithUrlOrData, path);
  }
}

async function writeFileWithUrl(
  fileWithUrlOrData: FileWithUrlOrData,
  parentPath: string,
) {
  const filePath = join(parentPath, fileWithUrlOrData.name);
  console.log(blue(`Download ${fileWithUrlOrData.url}\n    → ${filePath}`));

  if (await exists(filePath)) {
    console.log(green(`   → skip`));
  } else if (fileWithUrlOrData.url) {
    if (fileWithUrlOrData.url.startsWith("http")) {
      const resp = await fetch(fileWithUrlOrData.url);
      const file = await Deno.open(filePath, { create: true, write: true });
      await resp.body?.pipeTo(file.writable);
    } else {
      const file = await Deno.open(filePath, { create: true, write: true });
      await (
        await Deno.open(fileWithUrlOrData.url)
      ).readable.pipeTo(file.writable);
    }
  } else if (fileWithUrlOrData.data) {
    let toWrite = fileWithUrlOrData.data;
    if (typeof toWrite === "object") {
      toWrite = JSON.stringify(toWrite);
    }
    if (typeof toWrite === "string") {
      toWrite = new TextEncoder().encode(toWrite);
    }
    await Deno.writeFile(filePath, toWrite as Uint8Array);
  }
}

export async function downloadRss(
  url: string,
  parentPath: string,
  opt: StudioPackGenerator,
) {
  const fss = await getFolderWithUrlFromRssUrl(url, opt);
  const result = [];
  for (let index = 0; index < fss.length; index++) {
    const fs = fss[index];
    await writeFolderWithUrl(fs, parentPath);
    const storyPath = join(parentPath, fs.name);
    if (fs.thumbnailUrl) {
      const thumbnailFileName = `thumbnail.${getExtension(fs.thumbnailUrl)}`;
      const resp = await fetch(fs.thumbnailUrl);
      const file = await Deno.open(join(storyPath, thumbnailFileName), {
        create: true,
        write: true,
      });
      await resp.body?.pipeTo(file.writable);
      if (!thumbnailFileName.endsWith(".png")) {
        await convertImage(
          join(storyPath, thumbnailFileName),
          join(storyPath, "thumbnail.png"),
        );
      }
    }
    if (fs.metadata) {
      await Deno.writeTextFile(
        `${storyPath}/metadata.json`,
        JSON.stringify(fs.metadata, null, "  "),
      );
    }
    const itemToResize = fs.files.find(
      (f) => isFile(f) && f.name.startsWith("0-item-to-resize"),
    )!;
    if (itemToResize) {
      const itemToResizePath = join(storyPath, itemToResize.name);
      await convertToImageItem(itemToResizePath, join(storyPath, "0-item.png"));
      await Deno.remove(itemToResizePath);
    }
    result.push(storyPath);
  }
  return result;
}
