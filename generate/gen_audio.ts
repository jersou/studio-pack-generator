import { ModOptions } from "../gen_pack.ts";
import { generate_audio_basic_tts } from "./basic_tts.ts";

export async function generateAudio(
  title: string,
  outputPath: string,
  lang: string,
  opt: ModOptions,
) {
  await generate_audio_basic_tts(title, outputPath, lang, opt);
}
