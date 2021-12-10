import { basename, dirname, posix, win32 } from "../deps.ts";

let ffmpegCommand: string[] = [];

export async function checkCommand(
  cmd: string[],
  exitCodeExpected: number,
): Promise<boolean> {
  console.log("checkCommand", cmd);
  try {
    const process = Deno.run({
      cmd,
      stdin: "null",
      stdout: "null",
      stderr: "null",
    });
    const status = await process.status();
    process.close();
    return status.code === exitCodeExpected;
  } catch (_e) {
    return false;
  }
}

export function getInstallDir(): string {
  if (basename(Deno.execPath()).match(/^deno/i)) {
    const fromFileUrl = Deno.build.os === "windows"
      ? win32.fromFileUrl
      : posix.fromFileUrl;
    return dirname(fromFileUrl(Deno.mainModule));
  } else {
    return dirname(Deno.execPath());
  }
}

export async function getFfmpegCommand(): Promise<string[]> {
  if (ffmpegCommand.length === 0) {
    if (Deno.build.os === "windows") {
      const winFFmeg = `${getInstallDir()}\\tools\\ffmpeg.exe`;
      if (await checkCommand([winFFmeg, "-version"], 0)) {
        ffmpegCommand = [winFFmeg];
      } else {
        console.error(
          `
Command ffmpeg not found,
use --skip-extract-image-from-mp3 to skip image item generation
or check your install, ffmpeg should be present in studio-pack-generator/tools/ffmpeg.exe
`,
        );
        Deno.exit(3);
      }
    } else {
      if (await checkCommand(["ffmpeg", "-version"], 0)) {
        ffmpegCommand = ["ffmpeg"];
      } else {
        console.error(
          `
Command ffmpeg (from ffmpeg) not found,
use --skip-image-item-gen to skip image item generation
or install ffmpeg : sudo apt install -y ffmpeg
`,
        );
        Deno.exit(3);
      }
    }
  }
  return ffmpegCommand;
}

let pico2waveCommand: string[] = [];

export async function getPico2waveCommand(): Promise<string[]> {
  if (pico2waveCommand.length === 0) {
    if (await checkCommand(["pico2wave", "--version"], 1)) {
      pico2waveCommand = ["pico2wave"];
    } else {
      console.error(
        `
Command pico2wave (from libttspico-utils) not found,
use --skip-audio-item-gen to skip audio item generation
or install pico2wave : sudo apt install -y libttspico-utils
`,
      );
      Deno.exit(3);
    }
  }
  return pico2waveCommand;
}

let convertCommand: string[] = [];

export async function getConvertCommand(): Promise<string[]> {
  if (convertCommand.length === 0) {
    if (Deno.build.os === "windows") {
      const winConvert = `${getInstallDir()}\\tools\\convert.exe`;
      if (await checkCommand([winConvert, "--version"], 0)) {
        convertCommand = [winConvert];
      } else {
        console.error(
          `
Command convert (from ImageMagick) not found,
use --skip-image-item-gen to skip image item generation
or check your install, ImageMagick should be present in studio-pack-generator/tools/convert.exe
`,
        );
        Deno.exit(3);
      }
    } else {
      if (await checkCommand(["convert", "--version"], 0)) {
        convertCommand = ["convert"];
      } else {
        console.error(
          `
Command convert (from ImageMagick) not found,
use --skip-image-item-gen to skip image item generation
or install ImageMagick : sudo apt install -y imagemagick
`,
        );
        Deno.exit(3);
      }
    }
  }
  return convertCommand;
}
