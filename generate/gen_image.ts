import { green } from "@std/fmt/colors";
import $ from "@david/dax";

import { getConvertCommand } from "../utils/external_commands.ts";

export async function generateImage(
  title: string,
  outputPath: string,
  fontName: string, 
  extraArgs = {},
) {
  console.log(green(`Generate image to ${outputPath}`));
  const args: Record<string, string> = Object.assign({
    background:'black',
    fill:'white',
    gravity:'center',
    size:'320x240',
    font:fontName,
  }, extraArgs)
  const convertCommand = await getConvertCommand();
  const cmd = [
    convertCommand[0],
    ...(convertCommand.splice(1)),
    ...Object.keys(args).map(k=>([`-${k}`, args[k] ])).flat(),
    `caption:${title}`,
    outputPath,
  ];
  await $`${cmd}`.noThrow();
}
export async function convertImage(inputPath: string, outputPath: string) {
  console.log(green(`convert image ${inputPath} to ${outputPath}`));

  const convertCommand = await getConvertCommand();
  const cmd = [
    convertCommand[0],
    ...(convertCommand.splice(1)),
    inputPath,
    outputPath,
  ];
  await $`${cmd}`.noThrow();
}
