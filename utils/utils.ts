import { File, Folder } from "../serialize/types.ts";
import { bgBlue, bgGreen, bgRed } from "../deps.ts";
import { getFfmpegCommand } from "./external_commands.ts";

export const extensionRegEx = /\.([^.?]+)(\?.*)?$/i;
export const folderAudioItemRegEx = /^0-item\.(ogg|wav|mp3)$/i;
export const folderImageItemRegEx = /^0-item\.(png|jpg|jpeg|bmp)$/i;
export const fileAudioItemRegEx = /\.item\.(ogg|wav|mp3)$/i;
export const fileImageItemRegEx = /\.item\.(png|jpg|jpeg|bmp)$/i;
export const storyRegEx = /\.(ogg|wav|mp3)$/i;
export const itemsRegEx = [
  folderAudioItemRegEx,
  folderImageItemRegEx,
  fileAudioItemRegEx,
  fileImageItemRegEx,
];

export function isFolder(f: Folder | File): boolean {
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
    (f) => f.name.startsWith(nameWithoutExt) && fileAudioItemRegEx.test(f.name),
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
    (f) => f.name.startsWith(nameWithoutExt) && fileImageItemRegEx.test(f.name),
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

export function isAudioItem(file: File) {
  return (
    fileAudioItemRegEx.test(file.name) || folderAudioItemRegEx.test(file.name)
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
  const process = await Deno.run({
    cmd: [
      ...(ffmpegCommand),
      "-i",
      ffmpegCommand[0] === "wsl" ? convertPath(inputPath) : inputPath,
      "-vf",
      "scale=320:240:force_original_aspect_ratio=decrease,pad='320:240:(ow-iw)/2:(oh-ih)/2'",
      ffmpegCommand[0] === "wsl" ? convertPath(outputPath) : outputPath,
    ],
    stdout: "null",
    stdin: "null",
    stderr: "piped",
  });
  const status = await process.status();
  if (status.success) {
    console.log(bgGreen("→ OK"));
    process.stderr?.close();
  } else {
    const output = new TextDecoder().decode(await process.stderrOutput());
    console.log(bgRed("→ KO : \n" + output));
  }
  process.close();
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

const stdRes = ["stdin", "stderr", "stdout"];

export function checkResources() {
  const res = Deno.resources();
  if (
    Object.keys(res).length !== 3 &&
    Object.values(res).filter((v) => !stdRes.includes(v)).length > 0
  ) {
    console.log(
      bgRed("Some resources are not closed except stdin/stderr/stdout :"),
    );
    console.log(res);
  }
}

export function checkOps() {
  const metrics = Deno.metrics();
  if (
    metrics.opsDispatched !== metrics.opsCompleted ||
    metrics.opsDispatchedSync !== metrics.opsCompletedSync ||
    metrics.opsDispatchedAsync !== metrics.opsCompletedAsync ||
    metrics.opsDispatchedAsyncUnref !== metrics.opsCompletedAsyncUnref
  ) {
    console.log(bgRed("Some ops are not completed :"));
    console.log({ metrics });
  }
}

export function sanitize() {
  checkResources();
  checkOps();
}
