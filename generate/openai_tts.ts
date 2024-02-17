import { $, bgBlue, bgRed, OpenAI } from "../deps.ts";
import { ModOptions } from "../gen_pack.ts";

let openAI_client: OpenAI;

export const OPEN_AI_VOICES = [
  "alloy",
  "echo",
  "fable",
  "onyx",
  "nova",
  "shimmer",
] as const;
export const OPEN_AI_MODELS = ["tts-1", "tts-1-hd"] as const;

export async function generate_audio_with_openAI(
  title: string,
  outputPath: string,
  opt: ModOptions,
) {
  if (!openAI_client) {
    if (opt?.openAiApiKey) {
      openAI_client = new OpenAI({ apiKey: opt.openAiApiKey });
    } else if (Deno.env.has("OPENAI_API_KEY")) {
      openAI_client = new OpenAI();
    } else {
      const apiKey = await $.prompt({
        message: "OPENAI_API_KEY :",
        mask: true,
      });
      openAI_client = new OpenAI({ apiKey });
    }
  }
  const result = await openAI_client.audio.speech.create({
    input: title,
    response_format: "mp3",
    model: opt?.openAiModel ?? "tts-1",
    voice: opt?.openAiVoice ?? "onyx",
  });
  if (result.ok) {
    console.log(bgBlue(`OpenAI gen OK of "${title}" in ${outputPath}`));
    const file = await Deno.open(outputPath, { create: true, write: true });
    await result.body!.pipeTo(file.writable);
  } else {
    console.log(bgRed(`OpenAI gen KO of ${title}`), result);
  }
}
