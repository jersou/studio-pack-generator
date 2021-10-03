import {
  expectedAssetPaths,
  expectedFullPackSerialized,
  expectedSha1s,
  expectedSha1sMap,
  fullFs,
} from "../test_data/test_data.ts";
import { getAssetsPaths, getAssetsSha1s, getSha1sMap } from "./assets.ts";
import { assertArrayIncludes, assertEquals } from "../test_deps.ts";

Deno.test("getAssetsSha1s", () => {
  const sha1s = getAssetsSha1s(expectedFullPackSerialized);
  assertArrayIncludes(sha1s, expectedSha1s);
  assertEquals(sha1s.length, expectedSha1s.length);
});

Deno.test("getSha1sMap", () => {
  const map = getSha1sMap(fullFs);
  assertEquals(map, expectedSha1sMap);
});

Deno.test("getAssetsPaths", () => {
  const paths = getAssetsPaths(expectedFullPackSerialized, fullFs);
  assertEquals(paths, expectedAssetPaths);
});
