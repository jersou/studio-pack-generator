import { assertEquals } from "@std/assert";
import { getCachePath, getDefaultTtsPath } from "./tts_cache.ts";
import type { StudioPackGenerator } from "../studio_pack_generator.ts";

Deno.test("getCachePath", () => {
  assertEquals(
    getCachePath(["aa", "bb"], {} as StudioPackGenerator).toString(),
    getDefaultTtsPath().join("e9/e9350e939ff0f72285307e1a792fe739").toString(),
  );
});
