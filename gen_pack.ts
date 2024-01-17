import { File, Folder, Metadata } from "./serialize/types.ts";
import { fsToFolder } from "./serialize/fs.ts";
import { extractImagesFromAudio } from "./generate/extract_images_from_audio.ts";
import { genMissingItems } from "./generate/gen_missing_items.ts";
import { convertAudioOfFolder } from "./utils/convert_audio.ts";
import { folderToPack } from "./serialize/converter.ts";
import { serializePack } from "./serialize/serializer.ts";
import { getAssetsPaths } from "./serialize/assets.ts";
import { createPackZip } from "./utils/zip.ts";
import { downloadRss } from "./generate/rss_parser.ts";
import { basename, exists, join } from "./deps.ts";
import {
  checkRunPermission,
  convertToImageItem,
  folderImageItemRegEx,
  getNightModeAudioItem,
} from "./utils/utils.ts";
import { getLang, initI18n } from "./utils/i18n.ts";
import { convertImageOfFolder } from "./utils/convert_image.ts";

export type ModOptions = {
  storyPath: string;
  lang: string;
  skipImageItemGen?: boolean;
  skipAudioItemGen?: boolean;
  skipAudioConvert?: boolean;
  skipImageConvert?: boolean;
  skipExtractImageFromMp3?: boolean;
  skipZipGeneration?: boolean;
  skipNotRss?: boolean;
  autoNextStoryTransition?: boolean;
  selectNextStoryAtEnd?: boolean;
  addDelay?: boolean;
  nightMode?: boolean;
  seekStory?: string;
  skipWsl?: boolean;
  skipRssImageDl?: boolean;
  outputFolder?: string;
  extract?: boolean;
};

async function genThumbnail(folder: Folder, storyPath: string) {
  await checkRunPermission();
  const thumbnailPath = join(storyPath, "thumbnail.png");
  if (!(await exists(thumbnailPath))) {
    const itemFile = folder.files.find((f) =>
      folderImageItemRegEx.test(f.name)
    ) as File;
    if (itemFile) {
      await convertToImageItem(join(storyPath, itemFile.name), thumbnailPath);
    }
  }
}

export async function generatePack(opt: ModOptions) {
  const start = Date.now();
  console.log({ opt });
  const lang = opt.lang || (await getLang());
  await initI18n(lang);

  if (opt.storyPath.startsWith("http")) {
    opt.storyPath = await downloadRss(opt.storyPath, ".", !!opt.skipRssImageDl);
    console.log(`downloaded in ${opt.storyPath}`);
  }
  if (!opt.skipNotRss) {
    let folder: Folder = await fsToFolder(opt.storyPath, false);
    if (!opt.skipExtractImageFromMp3) {
      await extractImagesFromAudio(opt.storyPath, folder);
      folder = await fsToFolder(opt.storyPath, false);
    }
    if (!opt.skipImageItemGen || !opt.skipAudioItemGen) {
      await genMissingItems(
        opt.storyPath,
        folder,
        !opt.skipImageItemGen,
        !opt.skipAudioItemGen,
        lang,
        true,
        !!opt.skipWsl,
      );
      folder = await fsToFolder(opt.storyPath, false);
    }
    if (!opt.skipAudioConvert) {
      await convertAudioOfFolder(
        opt.storyPath,
        folder,
        !!opt.addDelay,
        opt.seekStory,
      );
    }
    if (!opt.skipImageConvert) {
      await convertImageOfFolder(opt.storyPath, folder);
    }
    if (!opt.skipImageItemGen) {
      await genThumbnail(folder, opt.storyPath);
    }
    if (!opt.skipZipGeneration) {
      folder = await fsToFolder(opt.storyPath, true);

      const metadata: Metadata = await getMetadata(opt);
      const pack = folderToPack(folder, metadata);
      const nightModeAudioItemName = getNightModeAudioItem(folder);
      const serializedPack = await serializePack(pack, opt, {
        autoNextStoryTransition: opt.autoNextStoryTransition,
        nightModeAudioItemName,
      });
      const assets = getAssetsPaths(serializedPack, folder);
      const zipPath = opt.outputFolder
        ? join(opt.outputFolder, `${basename(opt.storyPath)}-${Date.now()}.zip`)
        : `${opt.storyPath}-${Date.now()}.zip`;
      await createPackZip(zipPath, opt.storyPath, serializedPack, assets);
      console.log(
        `Done (${
          (Date.now() - start) / 1000
        } sec) :  ${opt.storyPath} → ${zipPath}`,
      );
      // sanitize();
    }
  }
}

async function getMetadata(opt: ModOptions): Promise<Metadata> {
  const metadataPath = `${opt.storyPath}/metadata.json`;
  if (await exists(metadataPath)) {
    const metadataJson = await Deno.readTextFile(metadataPath);
    return JSON.parse(metadataJson);
  } else {
    return {
      nightMode: !!opt.nightMode,
    };
  }
}
