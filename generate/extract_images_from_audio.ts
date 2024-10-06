import type { Folder } from "../serialize/serialize-types.ts";
import {
  checkRunPermission,
  convertToImageItem,
  getFileImageItem,
  getNameWithoutExt,
  isFolder,
  isStory,
} from "../utils/utils.ts";
import { join } from "@std/path";

export async function extractImagesFromAudio(rootpath: string, folder: Folder) {
  await checkRunPermission();
  for (const file of folder.files) {
    if (isFolder(file)) {
      await extractImagesFromAudio(join(rootpath, file.name), file);
    } else if (isStory(file)) {
      const imageItem = getFileImageItem(file, folder)?.assetName ?? null;
      if (!imageItem) {
        const inputPath = join(rootpath, file.name);
        const outputPath = join(
          rootpath,
          `${getNameWithoutExt(file.name)}.item.png`,
        );
        await convertToImageItem(inputPath, outputPath);
      }
    }
  }
}
