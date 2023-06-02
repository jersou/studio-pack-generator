import { bgBlue } from "../deps.ts";
import { convertPath } from "../utils/utils.ts";
import {
  checkCommand,
  getPico2waveCommand,
} from "../utils/external_commands.ts";

let hasPico2waveWslCache: undefined | boolean;

export async function hasPico2waveWsl() {
  if (hasPico2waveWslCache === undefined) {
    hasPico2waveWslCache = await checkCommand(
      ["wsl", "pico2wave", "--version"],
      1,
    );
  }
  return hasPico2waveWslCache;
}

let hasPico2waveCache: undefined | boolean;

export async function hasPico2wave() {
  if (hasPico2waveCache === undefined) {
    hasPico2waveCache = await checkCommand(["pico2wave", "--version"], 1);
  }
  return hasPico2waveCache;
}

// FIXME : use object args
export async function generateAudio(
  title: string,
  outputPath: string,
  lang: string,
  skipWsl: boolean,
) {
  console.log(bgBlue(`Generate audio to ${outputPath}`));

  if (Deno.build.os === "windows" && (skipWsl || !(await hasPico2waveWsl()))) {
    const audioFormat = "[System.Speech.AudioFormat.SpeechAudioFormatInfo]::" +
      "new(8000,[System.Speech.AudioFormat.AudioBitsPerSample]" +
      "::Sixteen,[System.Speech.AudioFormat.AudioChannel]::Mono)";

    const cmd = new Deno.Command(
      "PowerShell",
      {
        args: [
          "-Command",
          `Add-Type -AssemblyName System.Speech; ` +
          `$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; ` +
          `$speak.SetOutputToWaveFile("${outputPath}",${audioFormat}); ` +
          `$speak.Speak(" . ${title.replace(/["' ]/g, " ")} . "); ` +
          `$speak.Dispose();`,
        ],
      },
    );
    const process = cmd.spawn();
    await process.status;
  } else if (Deno.build.os === "darwin" && !(await hasPico2wave())) {
    const cmd = new Deno.Command(
      "say",
      {
        args: [
          "-o",
          convertPath(outputPath),
          "--file-format",
          "WAVE",
          "--data-format",
          "LEF32@22050",
          ` . ${title} . `,
        ],
      },
    );
    const process = cmd.spawn();

    await process.status;
  } else {
    const pico2waveCommand = await getPico2waveCommand();

    const process = new Deno.Command(pico2waveCommand[0], {
      args: [
        ...(pico2waveCommand.splice(1)),
        "-l",
        lang,
        "-w",
        convertPath(outputPath),
        ` . ${title} . `,
      ],
    }).spawn();
    await process.status;
  }
}
