import { bgBlue } from "../deps.ts";
import { getPico2waveCommand } from "../utils/external_commands.ts";

export async function generateAudio(
  title: string,
  outputPath: string,
  lang: string,
) {
  console.log(bgBlue(`Generate audio to ${outputPath}`));

  if (Deno.build.os === "windows") {
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
        outputPath,
        ` . ${title} . `,
      ],
    });
    await process.status();
    process.close();
  }
}
