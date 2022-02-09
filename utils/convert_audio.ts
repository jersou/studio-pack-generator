import {
  checkRunPermission,
  getExtension,
  getNameWithoutExt,
  isAudioItem,
  isFolder,
  isStory,
} from "./utils.ts";
import { bgBlue, bgGreen, bgRed, exists, join } from "../deps.ts";
import { File, Folder } from "../serialize/types.ts";
import { getFfmpegCommand } from "./external_commands.ts";

export async function convertAudioOfFolder(
  rootpath: string,
  folder: Folder,
  addDelay: boolean,
  seekStory: number,
) {
  await checkRunPermission();
  for (const file of folder.files) {
    if (isFolder(file)) {
      await convertAudioOfFolder(
        join(rootpath, file.name),
        file as Folder,
        addDelay,
        seekStory,
      );
    } else {
      if (isStory(file as File) || isAudioItem(file as File)) {
        const inputPath = join(rootpath, file.name);
        const outPath = join(rootpath, `${getNameWithoutExt(file.name)}.mp3`);
        const skipPath = `${outPath}__skip-convert`;
        if (!(await exists(skipPath))) {
          const maxDb = await getMaxVolumeOfFile(inputPath);

          if (addDelay || maxDb >= 1 || !(await checkAudioFormat(inputPath))) {
            await Deno.copyFile(inputPath, `${inputPath}.bak`);
            const tmpPath = await Deno.makeTempFile({
              dir: rootpath,
              suffix: `.${getExtension(file.name)}`,
            });
            await Deno.copyFile(inputPath, tmpPath);
            await Deno.remove(inputPath);
            var seek: number;
            if (isStory(file as File)) {
              seek = seekStory;
            } else {
              seek = 0;
            }
            await convertAudioFile(tmpPath, maxDb, outPath, addDelay, seek);
            await Deno.remove(tmpPath);
          } else {
            console.log(bgGreen("→ skip db<1"));
          }
          await Deno.writeTextFile(skipPath, "");
        }
      }
    }
  }
}

async function convertAudioFile(
  inputPath: string,
  maxDb: number,
  outputPath: string,
  addDelay: boolean,
  seek: number = 0,
) {
  console.log(bgBlue(`Convert file ${inputPath} → ${outputPath}`));

  const process = await Deno.run({
    cmd: [
      ...(await getFfmpegCommand()),
      "-i",
      inputPath,
      "-af",
      // FIXME adelay=all doesn't work
      `volume=${maxDb}dB,dynaudnorm${
        addDelay ? ",adelay=1000|1000|1000|1000|1000|1000,apad=pad_dur=1s" : ""
      }`,
      "-ac",
      "1",
      "-ar",
      "44100",
      "-map_metadata",
      "-1",
      "-ss",
      `${seek}`,
      "-y",
      outputPath,
    ],
    stdout: "null",
    stdin: "null",
    stderr: "null",
  });
  const status = await process.status();
  process.close();
  if (status.success) {
    console.log(bgGreen("→ OK"));
  } else {
    console.log(bgRed("→ KO"));
  }
}

async function getMaxVolumeOfFile(inputPath: string): Promise<number> {
  const maxVolumeRegex = /max_volume: -([0-9]+.[0-9]+) dB/;
  let maxDb = 0;
  console.log(bgBlue(`get max volume of file ${inputPath}`));
  const process = await Deno.run({
    cmd: [
      ...(await getFfmpegCommand()),
      "-i",
      inputPath,
      "-af",
      "volumedetect",
      "-vn",
      "-sn",
      "-dn",
      "-f",
      "null",
      "/dev/null",
    ],
    stdout: "null",
    stdin: "null",
    stderr: "piped",
  });
  const output = new TextDecoder().decode(await process.stderrOutput());
  const status = await process.status();
  process.close();
  if (status.success) {
    const maxVolLine = output
      .split("\\n")
      .find((line) => maxVolumeRegex.test(line));
    if (maxVolLine) {
      maxDb = parseFloat(maxVolumeRegex.exec(maxVolLine)![1]);
    }
    console.log(bgGreen(`→ OK : ${maxDb} Db`));
  } else {
    console.log(bgRed("→ KO"));
  }
  return maxDb;
}

async function checkAudioFormat(filePath: string) {
  const info = await getFfmpegInfo(filePath);
  const isOk = /^ *Stream #0:0: Audio: mp3, 44100 Hz, mono,.*$/m.test(info);
  console.log(
    bgBlue(`checkAudioFormat of ${filePath} : Format is ${isOk ? "OK" : "KO"}`),
  );
  return isOk;
}

async function getFfmpegInfo(filePath: string): Promise<string> {
  console.log(bgBlue(`get info of file ${filePath}`));
  const process = await Deno.run({
    cmd: [
      ...(await getFfmpegCommand()),
      "-i",
      filePath,
      "-hide_banner",
      "-f",
      "null",
      "-",
    ],
    stdout: "null",
    stdin: "null",
    stderr: "piped",
  });
  const output = new TextDecoder().decode(await process.stderrOutput());
  const status = await process.status();
  process.close();
  let info = "";
  if (status.success) {
    info = output;
  }
  console.log(bgGreen("info=" + info));
  return info;
}
