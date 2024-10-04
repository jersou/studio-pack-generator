import OpenAI from "https://deno.land/x/openai@v4.67.1/mod.ts";
import { bgRed, blue } from "@std/fmt/colors";
import $ from "@david/dax";

import type { ModOptions } from "../types.ts";

let openAI_client: OpenAI;

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
    console.log(blue(`OpenAI gen OK of "${title}" in ${outputPath}`));
    const file = await Deno.open(outputPath, { create: true, write: true });
    await result.body!.pipeTo(file.writable);
  } else {
    console.log(bgRed(`OpenAI gen KO of ${title}`), result);
  }
}
