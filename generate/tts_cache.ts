import { getSpgDirPath } from "../utils/utils.ts";
import { crypto } from "@std/crypto/crypto";
import { encodeHex } from "@std/encoding/hex";
import $ from "@david/dax";
import { green, yellow } from "@std/fmt/colors";
import type { StudioPackGenerator } from "../studio_pack_generator.ts";

export function getDefaultTtsPath() {
  return getSpgDirPath().resolve(".spg-TTS-cache");
}

export function getCachePath(
  key: (string | boolean | undefined)[],
  opt: StudioPackGenerator,
) {
  const data = new TextEncoder().encode(JSON.stringify(key));
  const sum = encodeHex(crypto.subtle.digestSync("MD5", data));
  return (opt.ttsCachePath ? $.path(opt.ttsCachePath) : getDefaultTtsPath())
    .join(sum.substring(0, 2))
    .join(sum);
}

export async function cacheTtsFile(
  output: string,
  key: (string | undefined | boolean)[],
  opt: StudioPackGenerator,
) {
  const cachePath = getCachePath(key, opt);
  await cachePath.resolve("..").mkdir({ recursive: true });
  await $.path(output).copyFile(cachePath);
}

export async function useCachedTtsFile(
  output: string,
  key: (string | undefined | boolean)[],
  opt: StudioPackGenerator,
): Promise<boolean> {
  const cachePath = getCachePath(key, opt);
  if (await cachePath.exists()) {
    await cachePath.copyFile(output);
    console.log(green(`use TTS cached for ${output}`));
    return true;
  } else {
    console.log(yellow(`no TTS cache found for ${output}`));
    return false;
  }
}
