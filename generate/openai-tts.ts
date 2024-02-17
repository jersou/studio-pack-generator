import { $, bgBlue, bgRed, OpenAI } from "../deps.ts";

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

type Generate_audio_with_openAI_options = {
  open_ai_voice?: typeof OPEN_AI_VOICES[number];
  open_ai_model?: typeof OPEN_AI_MODELS[number];
  open_ai_apiKey?: string;
};

export async function generate_audio_with_openAI(
  title: string,
  outputPath: string,
  opts?: Generate_audio_with_openAI_options,
) {
  if (!openAI_client) {
    if (opts?.open_ai_apiKey) {
      openAI_client = new OpenAI({ apiKey: opts.open_ai_apiKey });
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
    model: opts?.open_ai_model ?? "tts-1",
    voice: opts?.open_ai_voice ?? "onyx",
  });
  if (result.ok) {
    console.log(bgBlue(`OpenAI gen OK of "${title}" in ${outputPath}`));
    const file = await Deno.open(outputPath, { create: true, write: true });
    await result.body!.pipeTo(file.writable);
  } else {
    console.log(bgRed(`OpenAI gen KO of ${title}`), result);
  }
}
