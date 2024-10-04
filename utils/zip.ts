import {
  BlobReader,
  BlobWriter,
  terminateWorkers,
  ZipReader,
  ZipWriter,
} from "@zip-js/zip-js";

import { Buffer } from "@std/io";
import { exists } from "@std/fs";
import type { SerializedPack } from "../serialize/serialize-types.ts";
import type { Assets } from "../serialize/assets.ts";
import { getExtension } from "./utils.ts";

export async function createPackZip(
  zipPath: string,
  storyPath: string,
  serializedPack: SerializedPack,
  assets: Assets,
) {
  console.log(`create ${zipPath}`);
  const blobWriter = new BlobWriter("application/zip");
  const fileInZip: string[] = [];
  const zipWriter = new ZipWriter(blobWriter, {
    keepOrder: true,
    dataDescriptor: false,
  });
  const thumbnailPath = `${storyPath}/thumbnail.png`;
  if (await exists(thumbnailPath)) {
    fileInZip.push("thumbnail.png");
    await zipWriter.add(
      "thumbnail.png",
      new BlobReader(new Blob([await Deno.readFile(thumbnailPath)])),
    );
  }

  if (serializedPack.zipPaths) {
    for (const zipPath of serializedPack.zipPaths) {
      const zipReader = new ZipReader(
        new BlobReader(
          new Blob([await Deno.readFile(`${storyPath}/${zipPath}`)]),
        ),
        { useWebWorkers: false },
      );
      // deno-lint-ignore no-explicit-any
      const entries: any[] = await zipReader.getEntries();
      for (
        const entry of entries.filter((entry) =>
          entry.filename.startsWith("assets/")
        )
      ) {
        if (!fileInZip.find((f) => f === entry.filename)) {
          const blob = await entry.getData(new BlobWriter());
          console.log(`add to zip : ${entry.filename}`);
          fileInZip.push(entry.filename);
          await zipWriter.add(entry.filename, new BlobReader(blob));
        }
      }
      await zipReader.close();
    }
  }
  delete serializedPack.zipPaths;

  await zipWriter.add(
    "story.json",
    new BlobReader(new Blob([JSON.stringify(serializedPack, null, "  ")])),
  );

  for (const asset of assets.filter((asset) => asset.path)) {
    console.log(`add asset ${asset.path}`);

    if (
      !fileInZip.find(
        (f) => f === `assets/${asset.sha1}.${getExtension(asset.path)}`,
      )
    ) {
      await zipWriter.add(
        `assets/${asset.sha1}.${getExtension(asset.path)}`,
        new BlobReader(
          new Blob([await Deno.readFile(`${storyPath}/${asset.path}`)]),
        ),
      );
    }
  }

  console.log(`write ${zipPath}`);
  const blob = await zipWriter.close();

  await Deno.writeFile(zipPath, new Buffer(await blob.arrayBuffer()).bytes());
  await terminateWorkers();
}
