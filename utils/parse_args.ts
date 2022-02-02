#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write

import { yargs } from "../deps.ts";
import { generatePack, ModOptions } from "../gen_pack.ts";

export async function parseArgs(args: string[]) {
  // @ts-ignore yargs
  // deno-lint-ignore no-explicit-any
  await (yargs(args) as any)
    .command(
      "$0 [options] <story-path>",
      "convert a folder to Studio pack zip",
      // deno-lint-ignore no-explicit-any
      (y: any) => {
        let width = y.terminalWidth();
        // if "deno run --unstable" used
        // @ts-ignore unstable
        if (Deno.consoleSize) {
          // @ts-ignore unstable
          width = Math.min(120, Deno.consoleSize(Deno.stdout.rid).columns);
        }
        return y.wrap(width);
      },
      async (opts: ModOptions) => await generatePack(opts),
    )
    .usage(
      "deno run -A studio_pack_generator.ts [options] <story path | RSS URL>    convert a folder or RSS url to Studio pack",
    )
    .option("lang", {
      alias: "l",
      demandOption: false,
      boolean: false,
      type: "string",
      describe:
        "the lang used to generate menu and items. Auto detected by default",
    })
    .option("skip-image-item-gen", {
      alias: "i",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "skip image item generation",
    })
    .option("skip-audio-item-gen", {
      alias: "a",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "skip audio item generation",
    })
    .option("skip-audio-convert", {
      alias: "v",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "skip convert audio (and skip increase volume)",
    })
    .option("skip-extract-image-from-mp3", {
      alias: "m",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "skip extract item image from story mp3",
    })
    .option("skip-zip-generation", {
      alias: "z",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "only process item generation, don't create zip",
    })
    .option("skip-not-rss", {
      alias: "s",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "skip all except download RSS files",
    })
    .option("auto-next-story-transition", {
      alias: "n",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "go to next story of group at end of stories",
    })
    .option("add-delay", {
      alias: "d",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "add 1 second at the beginning and the end of audio files",
    })
    .version(false)
    .demandCommand(1)
    .parse();
}
