#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write

import { yargs } from "../deps.ts";
import { generatePack, ModOptions } from "../gen_pack.ts";
import { OPEN_AI_MODELS, OPEN_AI_VOICES } from "../generate/openai_tts.ts";
import { PackExtractor } from "../extract_pack.ts";
import { openGui } from "../gui/gui.ts";

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
      async (opts: ModOptions) => {
        if (opts.extract) return await new PackExtractor(opts).extractPack();
        else if (opts.gui) {
          return await openGui(opts);
        } else {
          return await generatePack(opts);
        }
      },
    )
    .usage(
      "deno run -A studio_pack_generator.ts [options] <story path | RSS URL>    convert a folder or RSS url to Studio pack",
    )
    .alias("help", "h")
    .option("add-delay", {
      alias: "d",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "add 1 second at the beginning and the end of audio files",
    })
    .option("auto-next-story-transition", {
      alias: "n",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "go to next story of group at end of stories",
    })
    .option("select-next-story-at-end", {
      alias: "b",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "select the next story in the menu at end",
    })
    .option("lang", {
      alias: "l",
      demandOption: false,
      boolean: false,
      type: "string",
      describe:
        "the lang used to generate menu and items. Auto detected by default",
    })
    .option("night-mode", {
      alias: "t",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "enable night mode : add transitions to an uniq endpoint",
    })
    .option("output-folder", {
      alias: "o",
      demandOption: false,
      boolean: false,
      type: "string",
      default: undefined,
      describe: "zip output folder",
    })
    .option("seek-story", {
      alias: "c",
      demandOption: false,
      boolean: false,
      type: "string",
      default: undefined,
      describe: "cut the beginning of stories: 'HH:mm:ss' format or 'N' sec",
    })
    .option("skip-audio-convert", {
      alias: "v",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "skip convert audio (and skip increase volume)",
    })
    .option("skip-image-convert", {
      alias: "j",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "skip convert image",
    })
    .option("skip-audio-item-gen", {
      alias: "a",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "skip audio item generation",
    })
    .option("skip-extract-image-from-mp3", {
      alias: "m",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "skip extract item image from story mp3",
    })
    .option("skip-image-item-gen", {
      alias: "i",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "skip image item generation",
    })
    .option("skip-not-rss", {
      alias: "s",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "skip all except download RSS files",
    })
    .option("skip-rss-image-dl", {
      alias: "r",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "skip RSS image download of items",
    })
    .option("skip-wsl", {
      alias: "w",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "disable WSL usage",
    })
    .option("skip-zip-generation", {
      alias: "z",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "only process item generation, don't create zip",
    })
    .option("use-open-ai-tts", {
      alias: "e",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "generate missing audio item with Open AI TTS",
    })
    .option("open-ai-api-key", {
      alias: "k",
      demandOption: false,
      boolean: false,
      type: "string",
      default: undefined,
      describe: "the OpenAI API key",
    })
    .option("open-ai-model", {
      alias: "g",
      demandOption: false,
      boolean: false,
      default: "tts-1",
      type: "string",
      describe: "OpenAi model : " + OPEN_AI_MODELS.join(", "),
    })
    .option("open-ai-voice", {
      alias: "p",
      demandOption: false,
      boolean: false,
      default: "onyx",
      type: "string",
      describe: "OpenAi voice : " + OPEN_AI_VOICES.join(", "),
    })
    .option("extract", {
      alias: "x",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "extract a zip pack (reverse mode)",
    })
    .option("gui", {
      alias: "u",
      demandOption: false,
      boolean: true,
      default: true,
      describe: "open GUI (on localhost:3333)",
    })
    .version(false)
    .demandCommand(1)
    .parse();
}
