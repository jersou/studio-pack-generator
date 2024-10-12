import { assertEquals } from "@std/assert";
import {
  expectedFullPack,
  expectedFullPackNightSerialized,
  expectedFullPackSerialized,
  expectedMinPack,
  expectedMinPackSerialized,
  expectedMoyPack,
  expectedMoyPackNextMenuSerialized,
  expectedMoyPackSerialized,
} from "../test_data/test_data.ts";
import { serializePack } from "./serializer.ts";
import type { StudioPackGenerator } from "../studio_pack_generator.ts";

type Obj = {
  id?: string;
  uuid?: string;
  [key: string]: Obj | unknown;
};

function clearIds(obj: Obj) {
  if (obj.id) {
    obj.id = "ID";
  }
  if (obj.uuid) {
    obj.uuid = "ID";
  }
  if (obj.actionNode) {
    obj.actionNode = "ID";
  }
  if (obj.options && Array.isArray(obj.options)) {
    obj.options = obj.options.map(() => "ID");
  }

  for (const key in obj) {
    if (obj[key] instanceof Object) {
      clearIds(obj[key] as Obj);
    }
  }
  return obj;
}

// deno-lint-ignore no-explicit-any
function clone(object: any) {
  if (!object || typeof object != "object") {
    return object;
  }
  // deno-lint-ignore no-explicit-any
  const cloneObj = (Array.isArray(object) ? [] : {}) as any;
  for (const attr in object) {
    if (typeof object[attr] == "object") {
      cloneObj[attr] = clone(object[attr]);
    } else {
      cloneObj[attr] = object[attr];
    }
  }
  return cloneObj;
}

const emptyOpt = {
  lang: "fr",
  storyPath: "",
  imageItemGenFont: "Arial",
  rssMinDuration: 0,
  thumbnailFromFirstItem: false,
  rssSplitLength: 10,
  skipRssImageDl: false,
} as StudioPackGenerator;

Deno.test("serializePack-min", async () => {
  const pack = await serializePack(expectedMinPack, emptyOpt);
  assertEquals(
    clearIds(clone(pack)),
    clearIds(clone(expectedMinPackSerialized)),
  );
});

Deno.test("serializePack-moy", async () => {
  const pack = await serializePack(expectedMoyPack, emptyOpt);
  assertEquals(
    clearIds(clone(pack)),
    clearIds(clone(expectedMoyPackSerialized)),
  );
});

Deno.test("serializePack-full", async () => {
  const pack = await serializePack(expectedFullPack, emptyOpt);
  assertEquals(
    clearIds(clone(pack)),
    clearIds(clone(expectedFullPackSerialized)),
  );
});

Deno.test("serializePack-full-night-mode", async () => {
  const expectedFullPackNight = expectedFullPack;
  expectedFullPackNight.nightModeAvailable = true;
  const pack = await serializePack(expectedFullPackNight, emptyOpt);
  assertEquals(
    clearIds(clone(pack)),
    clearIds(clone(expectedFullPackNightSerialized)),
  );
});

Deno.test("serializePack-next-menu", async () => {
  const pack = await serializePack(expectedMoyPack, {
    lang: "fr",
    storyPath: "",
    selectNextStoryAtEnd: true,
    imageItemGenFont: "Arial",
    rssMinDuration: 0,
    thumbnailFromFirstItem: false,
    rssSplitLength: 10,
    skipRssImageDl: false,
  } as StudioPackGenerator);
  assertEquals(
    clearIds(clone(pack)),
    clearIds(clone(expectedMoyPackNextMenuSerialized)),
  );
});
