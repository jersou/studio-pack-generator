import {
  firstStoryFile,
  getExtension,
  getFileAudioItem,
  getFileAudioStory,
  getFileImageItem,
  getFolderAudioItem,
  getFolderImageItem,
  getNameWithoutExt,
  isFile,
  isFolder,
} from "./utils.ts";
import {
  aliceCityStory,
  aliceJungleStory,
  emptyFolder,
  moyFolder,
  moyFs,
} from "../test_data/test_data.ts";
import { assertEquals } from "../test_deps.ts";
import { checkCommand } from "./external_commands.ts";
import { exists } from "../deps.ts";

Deno.test("isFolder", () => {
  assertEquals(isFolder(moyFs), true);
  assertEquals(isFolder(moyFs.files[0]), false);
});
Deno.test("isFile", () => {
  assertEquals(isFile(moyFs), false);
  assertEquals(isFile(moyFs.files[0]), true);
});

Deno.test("getNameWithoutExt", () => {
  assertEquals(getNameWithoutExt("azertyu.iop"), "azertyu");
});
Deno.test("getExtension", () => {
  assertEquals(getExtension("azertyu.iop"), "iop");
});

Deno.test("getFolderAudioItem", () => {
  assertEquals(
    getFolderAudioItem(moyFs),
    "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a.ogg",
  );
  assertEquals(getFolderAudioItem(emptyFolder), null);
});
Deno.test("getFolderImageItem", () => {
  assertEquals(
    getFolderImageItem(moyFs),
    "5f667e756ba42748a9eea3b0a217579bee960164.png",
  );
});

Deno.test("firstStoryFile", () => {
  assertEquals(firstStoryFile(moyFolder), aliceCityStory);
});
Deno.test("getFileAudioItem", () => {
  assertEquals(
    getFileAudioItem(aliceJungleStory, moyFolder),
    "78adc1006ff121cbf1c7052a02be47c398aecd78.ogg",
  );
});
Deno.test("getFileImageItem", () => {
  assertEquals(
    getFileImageItem(aliceJungleStory, moyFolder),
    "da5e7052795b59001f09e2caf27412ef8212f23f.png",
  );
  assertEquals(getFileImageItem(aliceJungleStory, moyFs), null);
});
Deno.test("getFileAudioStory", () => {
  assertEquals(
    getFileAudioStory(aliceJungleStory),
    "f493d4e986a1278ca7db3f7c65bf8ee32535b2e4.ogg",
  );
});

Deno.test("checkCommand", async () => {
  assertEquals(await checkCommand(["true"], 0), true);
  assertEquals(await checkCommand(["false"], 1), true);
  assertEquals(
    await checkCommand(["gdfJ0bN6jltMx5XsYsx78gHvrAn44o3p-not-found"], 0),
    false,
  );
});

Deno.test("fileExist", async () => {
  assertEquals(
    await exists("inc-file-46OeEXqXvZd09KbBafEWBrq1UBXguupY"),
    false,
  );
  assertEquals(await exists("utils/utils_test.ts"), true);
});
