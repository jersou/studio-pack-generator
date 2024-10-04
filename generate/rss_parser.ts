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
import { bgBlue, bgGreen } from "@std/fmt/colors";
import { exists } from "@std/fs";
import i18next from "https://deno.land/x/i18next@v23.15.1/index.js";
import type { File } from "../serialize/types.ts";
import type { ModOptions } from "../types.ts";
import type { Metadata } from "../serialize/types.ts";
import { convertImage } from "./gen_image.ts";

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
  "itunes:episode"?: number;
  "itunes:duration"?: string;
  "itunes:image"?: {
    "@href": string;
  };
};
export type FolderWithUrl = {
  name: string;
  files: (FolderWithUrl | FileWithUrl)[];
  metadata?: Metadata;
  thumbnailUrl?: string;
};
export type FileWithUrl = File & {
  url: string;
};

async function getFolderWithUrlFromRssUrl(
  url: string,
  opt: ModOptions,
): Promise<FolderWithUrl[]> {
  console.log(bgGreen(`→ url = ${url}`));

  const resp = await fetch(url);
  const xml = (await resp.text()).replace(/<\?xml-stylesheet [^>]+\?>/, "");
  // @ts-ignore rss conv
  // deno-lint-ignore no-explicit-any
  const rss: Rss = (parse(xml).rss as any).channel;
  const metadata = {
    title: rss.title,
    description: rss.description,
  } as Metadata;
  if (opt.rssMinDuration > 0) {
    rss.item = rss.item.filter((i) => {
      const duration = i["itunes:duration"];
      if (duration) {
        return duration.split(":")
          .reduce(
            (acc, val, index) =>
              acc + Math.pow(60, 2 - index) * parseInt(val, 10),
            0,
          ) >= opt.rssMinDuration;
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
  const imgUrl = rss.image?.url || rss.itunes?.image?.["@href"] || "";
  const fss: FolderWithUrl[] = rssItems.map((items, index) => {
    const name = rssItems.length > 1
      ? `${rssName} ${
        seasonIds[index] === "0"
          ? i18next.t("special")
          : i18next.t("season") + " " + seasonIds[index]
      }`
      : rssName;
    return {
      name,
      files: [],
      thumbnailUrl: opt.rssUseImageAsThumbnail
        ? items.find((item) => item["itunes:image"]?.["@href"])
          ?.["itunes:image"]?.["@href"]
        : undefined,
      metadata: { ...metadata, title: name },
    };
  });
  for (let index = 0; index < fss.length; index++) {
    const fs = fss[index];
    if (imgUrl) {
      fs.files.push({
        name: `0-item-to-resize.${getExtension(imgUrl)}`,
        url: imgUrl,
        sha1: "",
      });
    }
    const items = rssItems[index].sort(
      (a, b) => new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime(),
    );
    console.log(bgBlue(`→ ${items.length} items`));
    if (items.length <= opt.rssSplitLength) {
      fs.files.push(getFolderOfStories(items, !!opt.skipRssImageDl));
    } else {
      fs.files.push(getFolderParts(items, !!opt.skipRssImageDl));
    }
  }

  return fss;
}

export function getItemFileName(item: RssItem) {
  const title = convertToValidFilename(item.title!);
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

function getFolderOfStories(
  items: RssItem[],
  skipRssImageDl: boolean,
): FolderWithUrl {
  return {
    name: i18next.t("storyQuestion"),
    files: items.flatMap((item) => {
      const itemFiles = [{
        name: getItemFileName(item),
        url: fixUrl(item.enclosure["@url"]),
        sha1: "",
      }];
      const imageUrl = item["itunes:image"]?.["@href"];
      if (!skipRssImageDl && imageUrl) {
        itemFiles.push({
          name: `${getNameWithoutExt(getItemFileName(item))}.item.${
            getExtension(imageUrl)
          }`,
          url: imageUrl,
          sha1: "",
        });
      }

      return itemFiles;
    }),
  };
}

function getFolderParts(
  items: RssItem[],
  skipRssImageDl: boolean,
): FolderWithUrl {
  const partCount = Math.ceil(items.length / 10);
  const parts: RssItem[][] = [];
  for (let i = 0; i < partCount; i++) {
    const partSize = Math.floor(items.length / (partCount - i));
    const part: RssItem[] = [];
    part.push(...items.splice(0, partSize));
    parts.push(part);
  }

  return {
    name: i18next.t("partQuestion"),
    files: parts.map((part, index) => ({
      name: `${i18next.t("partTitle")} ${index + 1}`,
      files: [getFolderOfStories(part, skipRssImageDl)],
    })),
  };
}

async function writeFolderWithUrl(folder: FolderWithUrl, parentPath: string) {
  const path = join(parentPath, folder.name);
  await Deno.mkdir(path, { recursive: true });
  for (const file of folder.files) {
    isFolder(file)
      ? await writeFolderWithUrl(file as FolderWithUrl, path)
      : await writeFileWithUrl(file as FileWithUrl, path);
  }
}

async function writeFileWithUrl(fileWithUrl: FileWithUrl, parentPath: string) {
  const filePath = join(parentPath, fileWithUrl.name);
  console.log(bgBlue(`Download ${fileWithUrl.url}\n    → ${filePath}`));

  if (await exists(filePath)) {
    console.log(bgGreen(`   → skip`));
  } else {
    const resp = await fetch(fileWithUrl.url);
    const file = await Deno.open(filePath, { create: true, write: true });
    await resp.body?.pipeTo(file.writable);
  }
}

export async function downloadRss(
  url: string,
  parentPath: string,
  opt: ModOptions,
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
      const file = await Deno.open(
        join(storyPath, thumbnailFileName),
        { create: true, write: true },
      );
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
