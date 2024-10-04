import {
  checkRunPermission,
  getExtension,
  isFolder,
  isImageItem,
} from "./utils.ts";
import { exists } from "@std/fs";
import { bgBlue, bgGreen, bgRed } from "@std/fmt/colors";
import { join } from "@std/path";
import $ from "@david/dax";

import { Folder } from "../serialize/types.ts";
import { getConvertCommand } from "./external_commands.ts";

export async function convertImageOfFolder(
  rootpath: string,
  folder: Folder,
) {
  await checkRunPermission();
  for (const file of folder.files) {
    if (isFolder(file)) {
      await convertImageOfFolder(join(rootpath, file.name), file);
    } else if (isImageItem(file)) {
      const inputPath = join(rootpath, file.name);
      const outPath = join(rootpath, file.name);
      const skipPath = `${outPath}__skip-convert`;
      if (!(await exists(skipPath))) {
        if (!(await checkImageFormat(inputPath))) {
          await Deno.copyFile(inputPath, `${inputPath}.bak`);
          const tmpPath = await Deno.makeTempFile({
            dir: rootpath,
            suffix: `.${getExtension(file.name)}`,
          });
          await Deno.copyFile(inputPath, tmpPath);
          await Deno.remove(inputPath);
          await convertImageFile(tmpPath, outPath);
          await Deno.remove(tmpPath);
        }
        await Deno.writeTextFile(skipPath, "");
      }
    }
  }
}

async function convertImageFile(inputPath: string, outputPath: string) {
  console.log(bgBlue(`Convert file ${inputPath} → ${outputPath}`));
  const convertCommand = await getConvertCommand();
  const cmd = [
    ...convertCommand,
    inputPath,
    "-resize",
    "320x240",
    "-background",
    "black",
    "-gravity",
    "center",
    "-extent",
    "300x220",
    outputPath,
  ];
  console.log(bgBlue('"' + cmd.join('" "') + '"'));
  const result = $`${cmd}`.noThrow().stdout("null").stderr("null");
  if ((await result).code === 0) {
    console.log(bgGreen("→ OK"));
  } else {
    console.log(bgRed("→ KO"));
  }
}

async function checkImageFormat(filePath: string) {
  const info = await getImageInfo(filePath);
  const isOk = /^320x240$/m.test(info);
  console.log(
    bgBlue(`checkImageFormat of ${filePath} : Format is ${isOk ? "OK" : "KO"}`),
  );
  return isOk;
}

async function getImageInfo(filePath: string): Promise<string> {
  console.log(bgBlue(`get info of file ${filePath}`));
  const tmpPath = await Deno.makeTempFile();
  const cmd = [
    ...(await getConvertCommand()),
    filePath,
    "-format",
    "%wx%h",
    "-identify",
    tmpPath,
  ];
  const result = await $`${cmd}`.noThrow().stdout("piped");
  await Deno.remove(tmpPath);
  let info = "";
  if (result.code === 0) {
    info = result.stdout;
  }
  // console.log(bgGreen("info=" + info));
  return info;
}
