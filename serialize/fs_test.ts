import { fsToFolder } from "./fs.ts";
import { expectedFullFolder, minFsWithoutSha } from "../test_data/test_data.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test("fsToFolder", async () => {
  const folder = await fsToFolder("./test_data/fs/2-full");
  assertEquals(folder, expectedFullFolder);
  const folderWithoutSha = await fsToFolder("./test_data/fs/0-min", false);
  assertEquals(folderWithoutSha, minFsWithoutSha);
});
