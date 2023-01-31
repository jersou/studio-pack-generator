#!/usr/bin/env -S deno run -A

import { ModOptions } from "./gen_pack.ts";
import { BlobReader, BlobWriter, ZipReader } from "./deps.ts";
import { getExtension } from "./utils/utils.ts";

export async function extractPack(opt: ModOptions) {
  const packPath = opt.storyPath;
  // console.log({ packPath });

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
  await extractStage(story, entrypoint.uuid, [], "", []);

  // for (
  //   const entry of entries
  // ) {
  //   //  console.log({ entry });
  //   const blob = await entry.getData(new BlobWriter());
  //   console.log(`filename : ${entry.filename}`);
  // }
}

// TODO : suppression des cycle pour reafaire un parcourt derriere et avoir les bon chemins

export async function extractStage(
  story: any,
  stageId: string,
  stageDone: string[],
  basePath: string,
  stageToProcess: { stageId: string; basePath: string }[],
) {
  const stageIndex = stageDone.length;
  if (!stageDone.includes(stageId)) {
    // console.log(basePath);
    stageDone.push(stageId);
    const stage = story.stageNodes.find((s: any) => s.uuid === stageId);
    stage.audio &&
      console.log(
        `→ ${basePath}/${stage.name}.${getExtension(stage.audio)}`,
      );
    // stage.audio &&
    //   console.log(
    //     `assets/${stage.audio}\n  → ${basePath}/${stage.name}.${
    //       getExtension(stage.audio)
    //     }`,
    //   );
    // stage.image && console.log(
    //   `assets/${stage.image}\n  → ${basePath}/${stage.name}.${
    //     getExtension(stage.image)
    //   }`,
    // );

    const actionId = stage.okTransition.actionNode;
    const action = story.actionNodes.find((a: any) => a.id === actionId);
    stageToProcess.push(
      ...action.options.map((o: string) => ({
        stageId: o,
        basePath: stageIndex === 0 ? "" : `${basePath}/${action.name}`,
      })),
    );

    if (stageIndex === 0) {
      for (let i = 0; i < stageToProcess.length; i++) {
        await extractStage(
          story,
          stageToProcess[i].stageId,
          stageDone,
          stageToProcess[i].basePath,
          stageToProcess,
        );
      }
    }
  }
}

if (import.meta.main) {
  // await extractPack({ storyPath: "test_data/zip/2-full.zip" } as ModOptions);
  await extractPack(
    {
      storyPath: "test_data/zip/2-full.zip",
    } as ModOptions,
  );
}
