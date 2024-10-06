import { generate_audio_basic_tts } from "./basic_tts.ts";
import { generate_audio_with_openAI } from "./openai_tts.ts";
import type { ModOptions } from "../types.ts";
import { getCoquiCommand } from "../utils/external_commands.ts";
import $ from "@david/dax";

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
  } else if (opt.useCoquiTts) {
    const coquiCommand = await getCoquiCommand();
    const cmd = [
      ...coquiCommand,
      "--text",
      title,
      "--model_name",
      opt.coquiTtsModel,
      "--out_path",
      outputPath,
    ];
    if (opt.coquiTtsLanguageIdx) {
      cmd.push("--language_idx", opt.coquiTtsLanguageIdx);
    }
    if (opt.coquiTtsSpeakerIdx) {
      cmd.push("--speaker_idx", opt.coquiTtsSpeakerIdx);
    }
    await $`${cmd}`;
  } else {
    await generate_audio_basic_tts(title, outputPath, lang, opt);
  }
}
