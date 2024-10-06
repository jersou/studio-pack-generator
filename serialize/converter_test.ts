import { folderToPack } from "./converter.ts";
import { assertEquals } from "@std/assert";
import {
  expectedFullPack,
  expectedMinPack,
  expectedMoyPack,
  fullFs,
  minFs,
  moyFs,
} from "../test_data/test_data.ts";
import { getExtension } from "../utils/utils.ts";

Deno.test("folderToPack-min", () => {
  const pack = folderToPack(minFs);
  assertEquals(pack, expectedMinPack);
});

Deno.test("folderToPack-moy", () => {
  const pack = folderToPack(moyFs);
  assertEquals(pack, expectedMoyPack);
});

Deno.test("folderToPack-full", () => {
  const pack = folderToPack(fullFs);
  assertEquals(pack, expectedFullPack);
});

Deno.test("getExtension", () => {
  assertEquals(getExtension("azerty.uiop"), "uiop");
  assertEquals(getExtension("azertyuiop"), "");
  assertEquals(getExtension("a.zer.tyui.op"), "op");
});
