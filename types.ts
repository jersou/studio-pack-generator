import type { RssItem } from "./generate/rss_parser.ts";
import type { StudioPackGenerator } from "./studio_pack_generator.ts";

export interface CustomModule {
  fetchRssItemImage?: (
    item: RssItem,
    opt: StudioPackGenerator,
  ) => Promise<string>;
  fetchRssItemTitle?: (
    item: RssItem,
    opt: StudioPackGenerator,
  ) => Promise<string>;
}

export const OPEN_AI_VOICES = [
  "alloy",
  "echo",
  "fable",
  "onyx",
  "nova",
  "shimmer",
] as const;
export const OPEN_AI_MODELS = ["tts-1", "tts-1-hd"] as const;
