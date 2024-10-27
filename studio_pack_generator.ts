#!/usr/bin/env -S deno run -A

import denoJson from "./deno.json" with { type: "json" };
import {
  alias,
  cliteRun,
  defaultHelp,
  help,
  hidden,
  type,
  usage,
} from "@jersou/clite";

import $ from "@david/dax";
import { PackExtractor } from "./extract_pack.ts";
import { openGui } from "./gui/gui.ts";
import { generatePack } from "./gen_pack.ts";
import type { CustomModule } from "./types.ts";
import { OPEN_AI_MODELS, OPEN_AI_VOICES } from "./types.ts";

// CLI of https://github.com/jersou/studio-pack-generator

@help(
  "studio-pack-generator convert a folder or a RSS URL to Studio pack zip for Lunii device",
)
@usage(
  "studio-pack-generator [options] [--] <story path | RSS URL>   convert a folder or RSS url to Studio pack",
)
export class StudioPackGenerator {
  @alias("d")
  @help("add 1 second at the beginning and the end of audio files")
  addDelay = false;

  @alias("n")
  @help("go to next story of group at end of stories")
  autoNextStoryTransition = false;

  @alias("b")
  @help("select the next story in the menu at end")
  selectNextStoryAtEnd = false;

  @type("string")
  @alias("l")
  @help("the lang used to generate menu and items. Auto detected by default")
  lang: string = "";

  @alias("t")
  @help("enable night mode : add transitions to an uniq endpoint")
  nightMode = false;

  @type("string")
  @alias("o")
  @help("zip output folder")
  outputFolder?: string;

  @type("string")
  @alias("c")
  @help("cut the beginning of stories: 'HH:mm:ss' format or 'N' sec")
  seekStory?: string;

  @alias("v")
  @help("skip convert audio (and skip increase volume)")
  skipAudioConvert = false;

  @alias("j")
  @help("skip image convert")
  skipImageConvert = false;

  @alias("a")
  @help("skip audio item generation")
  skipAudioItemGen = false;

  @alias("m")
  @help("skip extract item image from story mp3")
  skipExtractImageFromMp3 = false;

  @alias("i")
  @help("skip image item generation")
  skipImageItemGen = false;

  @help("font used for image item generation")
  imageItemGenFont = "Arial";

  @help("gen thumbnail from first item instead of first chapter")
  thumbnailFromFirstItem = false;

  @help("skip all except download RSS files")
  @alias("s")
  skipNotRss = false;

  @help("RSS will be split in parts of N length")
  rssSplitLength = 10;

  @help("RSS create different packs per season")
  rssSplitSeasons = false;

  @help("add RSS episode number to stages")
  rssEpisodeNumbers = false;

  @help("RSS min episode duration")
  rssMinDuration = 0;

  @help("Use rss items subtitle as title")
  rssUseSubtitleAsTitle = false;

  @help("Use rss image (first item with image) as thumbnail")
  rssUseImageAsThumbnail = false;

  @help("Use thumbnail as 'root' image instead of generated one")
  useThumbnailAsRootImage = false;

  @help("skip RSS image download of items")
  @alias("r")
  skipRssImageDl = false;

  @help("disable WSL usage")
  @alias("w")
  skipWsl = false;

  @help("only process item generation, don't create zip")
  @alias("z")
  skipZipGeneration = false;

  @help("generate missing audio item with Open AI TTS")
  @alias("e")
  useOpenAiTts = false;

  @help("the OpenAI API key")
  @type("string")
  @alias("k")
  openAiApiKey?: string;

  @help("OpenAi model : " + OPEN_AI_MODELS.join(", "))
  @alias("g")
  openAiModel: typeof OPEN_AI_MODELS[number] = "tts-1";

  @help("OpenAi voice : " + OPEN_AI_VOICES.join(", "))
  @alias("p")
  openAiVoice: typeof OPEN_AI_VOICES[number] = "onyx";

  @help("use coqui TTS")
  useCoquiTts = false;

  @help("enable CUDA in coqui TTS")
  coquiTtsUseCuda = false;

  @help("coqui TTS model")
  coquiTtsModel = "tts_models/multilingual/multi-dataset/xtts_v2";

  @help("coqui TTS language_idx")
  coquiTtsLanguageIdx = "fr";

  @help("coqui TTS speaker_idx")
  coquiTtsSpeakerIdx = "Abrahan Mack";

  @help("extract a zip pack (reverse mode)")
  @alias("x")
  extract = false;

  @help("disable night mode in extract mode")
  extractDisableNightMode = false;

  @help("open GUI (on localhost:5555)")
  @alias("u")
  gui = false;

  @help("port of GUI server")
  port = 5555;

  @help("disable the TTS cache usage")
  skipReadTtsCache = false;

  @help("disable the TTS cache write")
  skipWriteTtsCache = false;

  @help("path to the TTS cache")
  @defaultHelp("<Studio-Pack-Generator dir>/.spg-TTS-cache")
  ttsCachePath = ".../Studio-Pack-Generator/.spg-TTS-cache";

  @type("string")
  @help("custom script to be used for custom image... handling")
  customScript?: string;

  @hidden()
  storyPath = "";

  @hidden()
  customModule?: CustomModule;

  @help("Metadata of the pack")
  @type("object")
  metadata?: {
    title?: string;
    description?: string;
    format?: string;
    version?: number;
    nightModeAvailable?: boolean;
    [k: string]: string | number | boolean | undefined | object;
  };
  @help("Custom i18n")
  @type("object")
  i18n?: Record<string, string>;

  // deno-lint-ignore no-explicit-any
  async main(storyPath: string): Promise<any> {
    if (!this.storyPath) { // don't set if set by config file or --storyPath
      this.storyPath = storyPath;
    }
    if (!this.storyPath) {
      throw new Error(
        "The story path is not defined ! separate option and story path by --",
        { cause: { clite: true } },
      );
    }

    if (this.customScript) {
      try {
        this.customModule = await import(this.customScript);
      } catch (error) {
        console.error(error);
      }
    }

    if (this.extract) {
      return await new PackExtractor(this).extractPack();
    } else if (this.gui) {
      return await openGui(this);
    } else {
      return await generatePack(this);
    }
  }
}

if (import.meta.main) {
  $.setPrintCommand(true);
  console.log({ version: denoJson.version, ...Deno.version });
  cliteRun(StudioPackGenerator, {
    noCommand: true,
    configCli: "The json config file",
  });
}
