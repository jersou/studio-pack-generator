import {
  checkRunPermission,
  getExtension,
  getNameWithoutExt,
  isAudioItem,
  isFolder,
  isStory,
} from "./utils.ts";
import {
  bgBlue,
  bgGreen,
  bgRed,
  exists,
  join,
  readAll,
  readerFromStreamReader,
} from "../deps.ts";
import { File, Folder } from "../serialize/types.ts";
import { getFfmpegCommand } from "./external_commands.ts";

export async function convertAudioOfFolder(
  rootpath: string,
  folder: Folder,
  addDelay: boolean,
  seekStory: string | undefined,
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

          const seek = isStory(file as File) ? seekStory : undefined;
          const forceToConvert = addDelay || seek || maxDb >= 1;
          if (forceToConvert || !(await checkAudioFormat(inputPath))) {
            await Deno.copyFile(inputPath, `${inputPath}.bak`);
            const tmpPath = await Deno.makeTempFile({
              dir: rootpath,
              suffix: `.${getExtension(file.name)}`,
            });
            await Deno.copyFile(inputPath, tmpPath);
            await Deno.remove(inputPath);
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
  seek: string | undefined,
) {
  console.log(bgBlue(`Convert file ${inputPath} → ${outputPath}`));
  const cmd = [
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
    "-fflags",
    "+bitexact",
    "-flags:v",
    "+bitexact",
    "-flags:a",
    "+bitexact",
    ...(seek ? ["-ss", seek] : []),
    "-y",
    outputPath,
  ];
  console.log(bgBlue('"' + cmd.join('" "') + '"'));
  const process = new Deno.Command(cmd[0], {
    args: cmd.slice(1),
    stdout: "null",
    stdin: "null",
    stderr: "null",
  }).spawn();
  const status = await process.status;
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
  const cmd = [
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
  ];

  const process = new Deno.Command(cmd[0], {
    args: cmd.splice(1),
    stdout: "null",
    stdin: "null",
    stderr: "piped",
  }).spawn();

  const stderrArr = await readAll(
    readerFromStreamReader(process.stderr.getReader()),
  );
  const output = new TextDecoder().decode(stderrArr);
  const status = await process.status;
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
  const cmd = [
    ...(await getFfmpegCommand()),
    "-i",
    filePath,
    "-hide_banner",
    "-f",
    "null",
    "-",
  ];
  const process = new Deno.Command(cmd[0], {
    args: cmd.splice(1),
    stdout: "null",
    stdin: "null",
    stderr: "piped",
  }).spawn();
  const stderrArr = await readAll(
    readerFromStreamReader(process.stderr.getReader()),
  );
  const output = new TextDecoder().decode(stderrArr);
  const status = await process.status;
  let info = "";
  if (status.success) {
    info = output;
  }
  console.log(bgGreen("info=" + info));
  return info;
}
