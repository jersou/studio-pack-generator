import { bgBlue } from "../deps.ts";
import { convertPath } from "../utils/utils.ts";
import { getPico2waveCommand } from "../utils/external_commands.ts";

export async function generateAudio(
  title: string,
  outputPath: string,
  lang: string,
) {
  console.log(bgBlue(`Generate audio to ${outputPath}`));
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
