import { $, bgGreen } from "../deps.ts";
import { getConvertCommand } from "../utils/external_commands.ts";

export async function generateImage(title: string, outputPath: string) {
  console.log(bgGreen(`Generate image to ${outputPath}`));

  const convertCommand = await getConvertCommand();
  const cmd = [
    convertCommand[0],
    ...(convertCommand.splice(1)),
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
  ];
  await $`${cmd}`.noThrow();
}
