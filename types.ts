export const OPEN_AI_VOICES = [
  "alloy",
  "echo",
  "fable",
  "onyx",
  "nova",
  "shimmer",
] as const;
export const OPEN_AI_MODELS = ["tts-1", "tts-1-hd"] as const;
export type ModOptions = {
  storyPath: string;
  lang: string;
  skipImageItemGen?: boolean;
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
  extract?: boolean;
  server?: boolean;
  port?: string;
  configFile?: string;
  isCompiled?: boolean;
};
