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

export async function generateAudio(
  title: string,
  outputPath: string,
  lang: string,
) {
  console.log(bgBlue(`Generate audio to ${outputPath}`));

  if (Deno.build.os === "windows" && !await hasPico2waveWsl()) {
    const audioFormat = "[System.Speech.AudioFormat.SpeechAudioFormatInfo]::" +
      "new(8000,[System.Speech.AudioFormat.AudioBitsPerSample]" +
      "::Sixteen,[System.Speech.AudioFormat.AudioChannel]::Mono)";
    const process = Deno.run({
      cmd: [
        "PowerShell",
        "-Command",
        `Add-Type -AssemblyName System.Speech; ` +
        `$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; ` +
        `$speak.SetOutputToWaveFile("${outputPath}",${audioFormat}); ` +
        `$speak.Speak(" . ${title.replace(/["' ]/g, " ")} . "); ` +
        `$speak.Dispose();`,
      ],
    });
    await process.status();
    process.close();
  } else {
    const process = Deno.run({
      cmd: [
        ...(await getPico2waveCommand()),
        "-l",
        lang,
        "-w",
        convertPath(outputPath),
        ` . ${title} . `,
      ],
    });
    await process.status();
    process.close();
  }
}
