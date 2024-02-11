import { fsToFolder, getSha1 } from "./fs.ts";
import {
  expectedFullFolder,
  expectedSortFolder,
  minFsWithoutSha,
} from "../test_data/test_data.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test("fsToFolder", async () => {
  const folder = await fsToFolder("./test_data/fs/2-full");
  assertEquals(folder, expectedFullFolder);
  const folderWithoutSha = await fsToFolder("./test_data/fs/0-min", false);
  assertEquals(folderWithoutSha, minFsWithoutSha);
});

Deno.test("fsToFolder", async () => {
  const folder = await fsToFolder("./test_data/fs/3-sort");
  assertEquals(folder, expectedSortFolder);
});

Deno.test("getSha1", async () => {
  const hash = await getSha1("./test_data/fs/0-min/0-item.ogg");
  assertEquals(hash, "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a");
});
