#!/usr/bin/env -S deno run -A

import { ModOptions } from "./gen_pack.ts";
import { BlobReader, BlobWriter, ZipReader } from "./deps.ts";

export async function extractPack(opt: ModOptions) {
  const packPath = opt.storyPath;
  console.log({ packPath });

  const zipReader = new ZipReader(
    new BlobReader(
      new Blob([await Deno.readFile(packPath)]),
    ),
    { useWebWorkers: false },
  );
  // deno-lint-ignore no-explicit-any
  const entries: any[] = await zipReader.getEntries();
  const storyEntry = entries.find((e) => e.filename === "story.json");

  const blob = await storyEntry!.getData(new BlobWriter());
  const story = JSON.parse(await blob.text());

  const entrypoint = story.stageNodes.find((s: any) => s.squareOne);
  await extractStage(story, entrypoint.uuid, []);

  // for (
  //   const entry of entries
  // ) {
  //   //  console.log({ entry });
  //   const blob = await entry.getData(new BlobWriter());
  //   console.log(`filename : ${entry.filename}`);
  // }
}

export async function extractStage(
  story: any,
  stageId: string,
  stageDone: string[],
) {
  if (!stageDone.includes(stageId)) {
    stageDone.push(stageId);
    const stage = story.stageNodes.find((s: any) => s.uuid === stageId);
    console.log({
      name: stage.name,
      audio: stage.audio,
      image: stage.image,
    });

    const actionId = stage.okTransition.actionNode;
    const action = story.actionNodes.find((a: any) => a.id === actionId);
    console.log({ actionName: action.name });
    action.options.forEach((o: string) => extractStage(story, o, stageDone));
  }
}

if (import.meta.main) {
  await extractPack({ storyPath: "test_data/zip/2-full.zip" } as ModOptions);
}
