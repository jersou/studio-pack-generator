import { bgGreen } from "../deps.ts";
import { convertPath } from "../utils/utils.ts";
import { getConvertCommand } from "../utils/external_commands.ts";

export async function generateImage(title: string, outputPath: string) {
  console.log(bgGreen(`Generate image to ${outputPath}`));
  const convertCommand = await getConvertCommand();
  const process = await Deno.run({
    cmd: [
      ...(convertCommand),
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
      convertCommand[0] === "wsl" ? convertPath(outputPath) : outputPath,
    ],
  });
  await process.status();
  process.close();
}
