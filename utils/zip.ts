import { BlobReader, BlobWriter, Buffer, exists, ZipWriter } from "../deps.ts";
import { SerializedPack } from "../serialize/types.ts";
import { Assets } from "../serialize/assets.ts";
import { getExtension } from "./utils.ts";

export async function createPackZip(
  zipPath: string,
  storyPath: string,
  serializedPack: SerializedPack,
  assets: Assets,
) {
  console.log(`create ${zipPath}`);
  const blobWriter = new BlobWriter("application/zip");
  const zipWriter = new ZipWriter(blobWriter, {
    useWebWorkers: false,
  });
  const thumbnailPath = `${storyPath}/thumbnail.png`;
  if (await exists(thumbnailPath)) {
    await zipWriter.add(
      "thumbnail.png",
      new BlobReader(new Blob([await Deno.readFile(thumbnailPath)])),
    );
  }

  await zipWriter.add(
    "story.json",
    new BlobReader(new Blob([JSON.stringify(serializedPack, null, "  ")])),
  );

  for (const asset of assets) {
    console.log(`add asset ${asset.path}`);
    await zipWriter.add(
      `assets/${asset.sha1}.${getExtension(asset.path)}`,
      new BlobReader(
        new Blob([await Deno.readFile(`${storyPath}/${asset.path}`)]),
      ),
    );
  }
  console.log(`write ${zipPath}`);
  const blob = await zipWriter.close();

  await Deno.writeFile(zipPath, new Buffer(await blob.arrayBuffer()).bytes());
}
