#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write

import yargs from "https://deno.land/x/yargs@v17.7.2-deno/deno.ts";
import { generatePack } from "../gen_pack.ts";
import { PackExtractor } from "../extract_pack.ts";
import { openGui } from "../gui/gui.ts";
import type { ModOptions } from "../types.ts";
import { OPEN_AI_MODELS, OPEN_AI_VOICES } from "../types.ts";
import { getDefaultTtsPath } from "../generate/tts_cache.ts";

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
        if (opts.configFile) {
          const optsFromFile = JSON.parse(
            await Deno.readTextFile(opts.configFile),
          );
          opts = { ...opts, ...optsFromFile, storyPath: opts.storyPath };
        }

        if (opts.customScript) {
          try {
            opts.customModule = await import(opts.customScript);
          } catch (error) {
            console.error(error);
          }
        }

        if (opts.extract) {
          return await new PackExtractor(opts).extractPack();
        } else if (opts.gui) {
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
      describe: "skip image convert",
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
    .option("image-item-gen-font", {
      demandOption: false,
      boolean: false,
      default: "Arial",
      type: "string",
      describe: "font used for image item generation",
    })
    .option("thumbnail-from-first-item", {
      demandOption: false,
      boolean: true,
      default: false,
      describe: "gen thumbnail from first item instead of first chapter",
    })
    .option("skip-not-rss", {
      alias: "s",
      demandOption: false,
      boolean: true,
      default: false,
      describe: "skip all except download RSS files",
    })
    .option("rss-split-length", {
      demandOption: false,
      boolean: false,
      default: 10,
      type: "number",
      describe: "RSS will be split in parts of N length",
    })
    .option("rss-split-seasons", {
      demandOption: false,
      boolean: true,
      default: false,
      describe: "RSS create different packs per season",
    })
    .option("rss-min-duration", {
      demandOption: false,
      boolean: false,
      type: "number",
      default: 0,
      describe: "RSS min episode duration",
    })
    .option("rss-use-subtitle-as-title", {
      demandOption: false,
      boolean: true,
      default: false,
      describe: "Use rss items subtitle as title",
    })
    .option("rss-use-image-as-thumbnail", {
      demandOption: false,
      boolean: true,
      default: false,
      describe: "Use rss image (first item with image) as thumbnail",
    })
    .option("use-thumbnail-as-root-image", {
      demandOption: false,
      boolean: true,
      default: false,
      describe: "Use thumbnail as 'root' image instead of generated one",
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
    .option("use-coqui-tts", {
      demandOption: false,
      boolean: true,
      default: false,
      describe: "use coqui TTS",
    })
    .option("coqui-tts-model", {
      demandOption: false,
      boolean: false,
      type: "string",
      default: "tts_models/multilingual/multi-dataset/xtts_v2",
      describe: "coqui TTS model",
    })
    .option("coqui-tts-language-idx", {
      demandOption: false,
      boolean: false,
      type: "string",
      default: "fr",
      describe: "coqui TTS language_idx",
    })
    .option("coqui-tts-speaker-idx", {
      demandOption: false,
      boolean: false,
      type: "string",
      default: "Abrahan Mack",
      describe: "coqui TTS speaker_idx",
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
      default: false,
      describe: "open GUI (on localhost:5555)",
    })
    .option("port", {
      demandOption: false,
      default: 5555,
      type: "number",
      describe: "port of GUI server",
    })
    .option("config-file", {
      demandOption: false,
      boolean: false,
      default: undefined,
      type: "string",
      describe: "json config file",
    })
    .option("is-compiled", {
      demandOption: false,
      boolean: true,
      default: false,
      hidden: true,
      describe: "true if compiled with deno compile",
    })
    .option("skip-read-tts-cache", {
      demandOption: false,
      boolean: true,
      default: false,
      describe: "disable the TTS cache usage",
    })
    .option("skip-write-tts-cache", {
      demandOption: false,
      boolean: true,
      default: false,
      describe: "disable the TTS cache write",
    })
    .option("tts-cache-path", {
      demandOption: false,
      boolean: false,
      default: getDefaultTtsPath().toString(),
      type: "string",
      describe: "path to the TTS cache",
    })
    .option("custom-script", {
      demandOption: false,
      boolean: false,
      default: undefined,
      type: "string",
      describe: "custom script to be used for custom image... handling",
    })
    .option("i18n", {
      demandOption: false,
      boolean: false,
      default: undefined,
      type: "object",
      describe: "custom translation options",
    })
    .version(false)
    .demandCommand(1)
    .parse();
}
