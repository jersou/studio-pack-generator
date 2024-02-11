import {
  convertToImageItem,
  convertToValidFilename,
  getExtension,
  getNameWithoutExt,
  isFile,
  isFolder,
} from "../utils/utils.ts";
import { bgBlue, bgGreen, exists, i18next, join, parse } from "../deps.ts";
import { File } from "../serialize/types.ts";

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
  "itunes:image"?: {
    "@href": string;
  };
};
export type FolderWithUrl = {
  name: string;
  files: (FolderWithUrl | FileWithUrl)[];
};
export type FileWithUrl = File & {
  url: string;
};

async function getFolderWithUrlFromRssUrl(
  url: string,
  skipRssImageDl: boolean,
): Promise<FolderWithUrl> {
  console.log(bgGreen(`→ url = ${url}`));

  const resp = await fetch(url);
  const xml = (await resp.text()).replace(/<\?xml-stylesheet [^>]+\?>/, "");
  // @ts-ignore rss conv
  // deno-lint-ignore no-explicit-any
  const rss: Rss = (parse(xml).rss as any).channel;
  const imgUrl = rss.image?.url || rss.itunes?.image?.["@href"] || "";
  const fs: FolderWithUrl = {
    name: convertToValidFilename(rss.title),
    files: [],
  };
  if (imgUrl) {
    fs.files.push({
      name: `0-item-to-resize.${getExtension(imgUrl)}`,
      url: imgUrl,
      sha1: "",
    });
  }
  const items = rss.item.sort(
    (a, b) => new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime(),
  );
  console.log(bgBlue(`→ ${items.length} items`));
  if (rss.item.length <= 10) {
    fs.files.push(getFolderOfStories(items, skipRssImageDl));
  } else {
    fs.files.push(getFolderParts(items, skipRssImageDl));
  }
  return fs;
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
            getExtension(imageUrl!)
          }`,
          url: imageUrl!,
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
    file.close();
  }
}

export async function downloadRss(
  url: string,
  parentPath: string,
  skipRssImageDl: boolean,
) {
  const fs = await getFolderWithUrlFromRssUrl(url, skipRssImageDl);
  await writeFolderWithUrl(fs, parentPath);
  const storyPath = join(parentPath, fs.name);

  const itemToResize = fs.files.find(
    (f) => isFile(f) && f.name.startsWith("0-item-to-resize"),
  )!;
  if (itemToResize) {
    const itemToResizePath = join(storyPath, itemToResize.name);
    await convertToImageItem(itemToResizePath, join(storyPath, "0-item.png"));
    await Deno.remove(itemToResizePath);
  }
  return storyPath;
}
