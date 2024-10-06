import { blue } from "@std/fmt/colors";
import $ from "@david/dax";

import { convertPath } from "../utils/utils.ts";
import {
  checkCommand,
  getPico2waveCommand,
} from "../utils/external_commands.ts";
import type { ModOptions } from "../types.ts";

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

export async function generate_audio_basic_tts(
  title: string,
  outputPath: string,
  lang: string,
  opt: ModOptions,
) {
  console.log(blue(`Generate basic TTS to ${outputPath}`));

  if (
    Deno.build.os === "windows" && (opt.skipWsl || !(await hasPico2waveWsl()))
  ) {
    const audioFormat = "[System.Speech.AudioFormat.SpeechAudioFormatInfo]::" +
      "new(8000,[System.Speech.AudioFormat.AudioBitsPerSample]" +
      "::Sixteen,[System.Speech.AudioFormat.AudioChannel]::Mono)";

    const args = [
      "-Command",
      `Add-Type -AssemblyName System.Speech; ` +
      `$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; ` +
      `$speak.SetOutputToWaveFile("${outputPath}",${audioFormat}); ` +
      `$speak.Speak(" . ${title.replace(/["' ]/g, " ")} . "); ` +
      `$speak.Dispose();`,
    ];
    await $`PowerShell ${args}`.noThrow();
  } else if (Deno.build.os === "darwin" && !(await hasPico2wave())) {
    const args = [
      "-o",
      convertPath(outputPath, opt),
      "--file-format",
      "WAVE",
      "--data-format",
      "LEF32@22050",
    ];
    await $`say ${args}`.noThrow();
  } else {
    const pico2waveCommand = await getPico2waveCommand();
    const cmd = [
      pico2waveCommand[0],
      ...(pico2waveCommand.splice(1)),
      "-l",
      lang,
      "-w",
      convertPath(outputPath, opt),
      ` . ${title} . `,
    ];
    await $`${cmd}`.noThrow();
  }
}
