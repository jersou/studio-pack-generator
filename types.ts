import { RssItem } from "./generate/rss_parser.ts";

export const OPEN_AI_VOICES = [
  "alloy",
  "echo",
  "fable",
  "onyx",
  "nova",
  "shimmer",
] as const;
export const OPEN_AI_MODELS = ["tts-1", "tts-1-hd"] as const;

export interface CustomModule {
  fetchRssItemImage?:(item: RssItem, opt: ModOptions) => Promise<string>
}
export type ModOptions = {
  storyPath: string;
  lang: string;
  rssSplitLength: number;
  rssSplitSeasons?: boolean;
  rssMinDuration: number;
  rssUseImageAsThumbnail?: boolean;
  skipImageItemGen?: boolean;
  thumbnailFromFirstItem: boolean;
  useThumbnailAsRootImage?: boolean;
  imageItemGenFont: string;
  skipAudioItemGen?: boolean;
  skipAudioConvert?: boolean;
  skipImageConvert?: boolean;
  skipExtractImageFromMp3?: boolean;
  skipZipGeneration?: boolean;
  skipNotRss?: boolean;
  autoNextStoryTransition?: boolean;
  selectNextStoryAtEnd?: boolean;
  addDelay?: boolean;
  nightMode?: boolean;
  seekStory?: string;
  skipWsl?: boolean;
  skipRssImageDl?: boolean;
  outputFolder?: string;
  useOpenAiTts?: boolean;
  openAiApiKey?: string;
  openAiModel?: typeof OPEN_AI_MODELS[number];
  openAiVoice?: typeof OPEN_AI_VOICES[number];
  useCoquiTts?: boolean;
  coquiTtsModel?: string;
  coquiTtsLanguageIdx?: string;
  coquiTtsSpeakerIdx?: string;
  extract?: boolean;
  server?: boolean;
  port?: number;
  configFile?: string;
  isCompiled?: boolean;
  gui?: boolean;
  customScript?: string;
  customModule?: CustomModule;
};
