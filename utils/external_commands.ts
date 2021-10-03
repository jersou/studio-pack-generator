let ffmpegCommand: string[] = [];

export async function checkCommand(
  cmd: string[],
  exitCodeExpected: number,
): Promise<boolean> {
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

export async function getFfmpegCommand(): Promise<string[]> {
  if (ffmpegCommand.length === 0) {
    if (Deno.build.os === "windows") {
      if (await checkCommand(["wsl", "ffmpeg", "-version"], 0)) {
        ffmpegCommand = ["wsl", "ffmpeg"];
      } else if (await checkCommand(["wsl2", "ffmpeg", "-version"], 0)) {
        ffmpegCommand = ["wsl2", "ffmpeg"];
      } else {
        console.error(
          `
Command ffmpeg not found,
use --skip-extract-image-from-mp3 to skip image item generation
or install ffmpeg :
       wsl  sudo apt install ffmpeg
    or wsl2 sudo apt install ffmpeg
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
or install ffmpeg : sudo apt install ffmpeg
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
    if (Deno.build.os === "windows") {
      if (await checkCommand(["wsl", "pico2wave", "--version"], 1)) {
        pico2waveCommand = ["wsl", "pico2wave"];
      } else if (await checkCommand(["wsl2", "pico2wave", "--version"], 1)) {
        pico2waveCommand = ["wsl2", "pico2wave"];
      } else {
        console.error(
          `
Command pico2wave (from libttspico-utils) not found,
use --skip-audio-item-gen to skip audio item generation
or install pico2wave :
       wsl  sudo apt install libttspico-utils
    or wsl2 sudo apt install libttspico-utils
`,
        );
        Deno.exit(3);
      }
    } else {
      if (await checkCommand(["pico2wave", "--version"], 1)) {
        pico2waveCommand = ["pico2wave"];
      } else {
        console.error(
          `
Command pico2wave (from libttspico-utils) not found,
use --skip-audio-item-gen to skip audio item generation
or install pico2wave : sudo apt install libttspico-utils
`,
        );
        Deno.exit(3);
      }
    }
  }
  return pico2waveCommand;
}

let convertCommand: string[] = [];

export async function getConvertCommand(): Promise<string[]> {
  if (convertCommand.length === 0) {
    if (Deno.build.os === "windows") {
      if (await checkCommand(["wsl", "convert", "--version"], 0)) {
        convertCommand = ["wsl", "convert"];
      } else if (await checkCommand(["wsl2", "convert", "--version"], 0)) {
        convertCommand = ["wsl2", "convert"];
      } else {
        console.error(
          `
Command convert (from ImageMagick) not found,
use --skip-image-item-gen to skip image item generation
or install ImageMagick :
       wsl  sudo apt install imagemagick
    or wsl2 sudo apt install imagemagick
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
or install ImageMagick : sudo apt install imagemagick
`,
        );
        Deno.exit(3);
      }
    }
  }
  return convertCommand;
}
