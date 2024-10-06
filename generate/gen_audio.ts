import { generate_audio_basic_tts } from "./basic_tts.ts";
import { generate_audio_with_openAI } from "./openai_tts.ts";
import type { ModOptions } from "../types.ts";

export async function generateAudio(
  title: string,
  outputPath: string,
  lang: string,
  opt: ModOptions,
) {
  if (opt.useOpenAiTts) {
    await generate_audio_with_openAI(
      title,
      outputPath.replace(/\.wav/i, ".mp3"),
      opt,
    );
  } else {
    await generate_audio_basic_tts(title, outputPath, lang, opt);
  }
}
