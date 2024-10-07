import { assertEquals } from "@std/assert";
import { getCachePath, getDefaultTtsPath } from "./tts_cache.ts";
import type { ModOptions } from "../types.ts";

Deno.test("getCachePath", () => {
  assertEquals(
    (getCachePath(["aa", "bb"], {} as ModOptions)).toString(),
    getDefaultTtsPath().join("e9/e9350e939ff0f72285307e1a792fe739").toString(),
  );
});
