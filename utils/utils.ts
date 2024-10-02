import { File, Folder } from "../serialize/types.ts";
import { $, bgBlue, bgGreen, bgRed } from "../deps.ts";
import { getFfmpegCommand } from "./external_commands.ts";

export const extensionRegEx = /\.([^.?]+)(\?.*)?$/i;
export const folderAudioItemRegEx = /^0-item\.(ogg|opus|wav|mp3)$/i;
export const nightModeAudioItemRegEx = /^0-night-mode\.(ogg|opus|wav|mp3)$/i;
export const folderImageItemRegEx = /^0-item\.(png|jpg|jpeg|bmp)$/i;
export const fileAudioItemRegEx = /\.item\.(ogg|opus|wav|mp3)$/i;
export const fileImageItemRegEx = /\.item\.(png|jpg|jpeg|bmp)$/i;
export const storyRegEx = /\.(ogg|opus|wav|mp3)$/i;
export const itemsRegEx = [
  folderAudioItemRegEx,
  folderImageItemRegEx,
  fileAudioItemRegEx,
  fileImageItemRegEx,
  nightModeAudioItemRegEx,
];

export function isFolder(f: Folder | File): f is Folder {
  return !!(f as Folder).files;
}

export function isFile(f: Folder | File): boolean {
  return !(f as Folder).files;
}

export function getNameWithoutExt(name: string): string {
  return /(.*)\.[^.]+$/.test(name) ? /(.*)\.[^.]+$/.exec(name)![1] : name;
}

export function getExtension(name: string): string {
  return extensionRegEx.exec(name)?.[1] || "";
}

export function getFolderAudioItem(folder: Folder) {
  const file = folder.files.find((f) =>
    folderAudioItemRegEx.test(f.name)
  ) as File;
  if (file) {
    return `${file.sha1}.${getExtension(file.name)}`;
  } else {
    return null;
  }
}

export function getNightModeAudioItem(folder: Folder) {
  const file = folder.files.find((f) =>
    nightModeAudioItemRegEx.test(f.name)
  ) as File;
  if (file) {
    return `${file.sha1}.${getExtension(file.name)}`;
  } else {
    return null;
  }
}

export function getFolderImageItem(folder: Folder) {
  const file = folder.files.find((f) =>
    folderImageItemRegEx.test(f.name)
  ) as File;
  if (file) {
    return `${file.sha1}.${getExtension(file.name)}`;
  } else {
    return null;
  }
}

export function getFileAudioItem(file: File, parent: Folder) {
  const nameWithoutExt = getNameWithoutExt(file.name);
  const audioItem = parent.files.find(
    (f) =>
      getNameWithoutExt(rmDiacritic(f.name)).replace(/.item$/, "") ===
        rmDiacritic(nameWithoutExt) &&
      fileAudioItemRegEx.test(f.name),
  ) as File;
  if (audioItem) {
    return `${audioItem.sha1}.${getExtension(audioItem.name)}`;
  } else {
    return null;
  }
}

export function getFileImageItem(file: File, parent: Folder) {
  const nameWithoutExt = getNameWithoutExt(file.name);
  const ImageItem = parent.files.find(
    (f) =>
      getNameWithoutExt(rmDiacritic(f.name)).replace(/(-generated)?.item$/, "") ===
        rmDiacritic(nameWithoutExt) &&
      fileImageItemRegEx.test(f.name),
  ) as File;
  if (ImageItem) {
    return `${ImageItem.sha1}.${getExtension(ImageItem.name)}`;
  } else {
    return null;
  }
}

export function getFileAudioStory(file: File) {
  return `${file.sha1}.${getExtension(file.name)}`;
}

export function isStory(file: File): boolean {
  return (
    storyRegEx.test(file.name) &&
    !itemsRegEx.some((regex) => regex.test(file.name))
  );
}

export function isZipFile(file: File): boolean {
  return /\.zip$/i.test(file.name);
}

export function isAudioItem(file: File) {
  return (
    fileAudioItemRegEx.test(file.name) || folderAudioItemRegEx.test(file.name)
  );
}

export function isImageItem(file: File) {
  return (
    fileImageItemRegEx.test(file.name) || folderImageItemRegEx.test(file.name)
  );
}

export function firstStoryFile(folder: Folder) {
  return folder.files.find(
    (f) =>
      storyRegEx.test(f.name) &&
      !itemsRegEx.some((regex) => regex.test(f.name)),
  ) as File;
}

export function convertPath(path: string) {
  return Deno.build.os === "windows" ? convWindowsWslPath(path) : path;
}

export function convWindowsWslPath(path: string, cwd?: string): string {
  const groups = /^[a-z]:/i.test(path)
    ? /(^.)(.*)$/.exec(path)
    : /(^.)(.*)$/.exec((cwd || Deno.cwd()) + "/" + path);
  return (
    "/mnt/" +
    groups?.[1].toLowerCase() +
    groups?.[2].replace(/\\/g, "/").replace(/:/g, "")
  );
}

export function uniq(items: string[]): string[] {
  return [...new Set(items)];
}

export async function convertToImageItem(
  inputPath: string,
  outputPath: string,
) {
  console.log(bgBlue(`Try convert ${inputPath} → ${outputPath}`));

  const ffmpegCommand = await getFfmpegCommand();

  const cmd = [
    ffmpegCommand,
    ...(ffmpegCommand.splice(1)),
    "-i",
    inputPath,
    "-vf",
    "scale=320:240:force_original_aspect_ratio=decrease,pad='320:240:(ow-iw)/2:(oh-ih)/2'",
    outputPath,
  ];
  const result = await $`${cmd}`.noThrow().stdout("null").stderr("piped");
  if (result.code === 0) {
    console.log(bgGreen("→ OK"));
  } else {
    console.log(bgRed("→ KO : \n" + result.stderr));
  }
}

let runPermissionOk = false;

export async function checkRunPermission() {
  if (!runPermissionOk) {
    if ((await Deno.permissions.query({ name: "run" })).state !== "granted") {
      throw new Error(`Missing Deno run permission ! add "--allow-run"`);
    }
    runPermissionOk = true;
  }
}

export function rmDiacritic(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function convertToValidFilename(name: string): string {
  return name.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9_\-.,()'! ]/g, " ").trim();
}

export function cleanStageName(name: string): string {
  return name.replace(/^\d{13} - /g, "").replace(/\.[^/.]+$/, "").trim();
}
export function groupBy<T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) {
  return array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });
}