import { cacheTtsFile, useCachedTtsFile } from "./tts_cache.ts";
import { getCoquiCommand } from "../utils/external_commands.ts";
import $ from "@david/dax";
import { bgRed } from "@std/fmt/colors";
import type { StudioPackGenerator } from "../studio_pack_generator.ts";

export async function generate_audio_with_coqui(
  title: string,
  opt: StudioPackGenerator,
  outputPath: string,
) {
  const cacheKey = [
    "CoquiTts",
    title,
    opt.coquiTtsSpeakerIdx,
    opt.coquiTtsLanguageIdx,
    opt.coquiTtsModel,
  ];
  if (
    opt.skipReadTtsCache ||
    !(await useCachedTtsFile(outputPath, cacheKey, opt))
  ) {
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
    const res = await $`${cmd}`.noThrow(true);
    if (res.code === 0) {
      if (!opt.skipWriteTtsCache) {
        await cacheTtsFile(outputPath, cacheKey, opt);
      }
    } else {
      console.log(bgRed(`Coqui gen KO for "${title}"`));
    }
  }
}
