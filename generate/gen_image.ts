import { bgGreen } from "../deps.ts";
import { getConvertCommand } from "../utils/external_commands.ts";

export async function generateImage(title: string, outputPath: string) {
  console.log(bgGreen(`Generate image to ${outputPath}`));
  const process = await Deno.run({
    cmd: [
      ...(await getConvertCommand()),
      "-background",
      "black",
      "-fill",
      "white",
      "-gravity",
      "center",
      "-size",
      "320x240",
      "-font",
      "Arial",
      `caption:${title}`,
      outputPath,
    ],
  });
  await process.status();
  process.close();
}
