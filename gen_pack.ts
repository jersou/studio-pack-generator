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
import { basename, bgRed, exists, join } from "./deps.ts";
import {
  checkRunPermission,
  convertToImageItem,
  folderImageItemRegEx,
  getNightModeAudioItem,
  isFolder,
} from "./utils/utils.ts";
import { getLang, initI18n } from "./utils/i18n.ts";
import { convertImageOfFolder } from "./utils/convert_image.ts";
import { OPEN_AI_MODELS, OPEN_AI_VOICES } from "./generate/openai_tts.ts";
import { fileImageItemRegEx } from "./utils/utils.ts";

export type ModOptions = {
  storyPath: string;
  lang: string;
  rssSplitLength: number;
  rssSplitSeasons?: boolean;
  rssMinDuration: number;
  rssUseImageAsThumbnail?: boolean;
  skipImageItemGen?: boolean;
  thumbnailFromFirstItem: boolean;
  useThumbnailAsRootImage?: boolean;
  imageItemGenFont: string;
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
  skipRssImageDl: boolean;
  outputFolder?: string;
  useOpenAiTts?: boolean;
  openAiApiKey?: string;
  openAiModel?: typeof OPEN_AI_MODELS[number];
  openAiVoice?: typeof OPEN_AI_VOICES[number];
  useCoquiTts?: boolean;
  coquiTtsModel?: string;
  coquiTtsLanguageIdx?: string;
  coquiTtsSpeakerIdx?: string;
  extract?: boolean;
};

async function genThumbnail(
  folder: Folder,
  storyPath: string,
  thumbnailFromFirstItem: boolean,
) {
  await checkRunPermission();
  const thumbnailPath = join(storyPath, "thumbnail.png");
  if (!(await exists(thumbnailPath))) {
    let itemFile: File | null = null;
    let thumbnailItemPath = storyPath;
    if (thumbnailFromFirstItem) {
      let files = folder.files;
      let insideFolder = files.find(isFolder);
      while (insideFolder) {
        files = insideFolder.files;
        thumbnailItemPath = join(thumbnailItemPath, insideFolder.name);
        insideFolder = files.find(isFolder);
      }
      itemFile = files.find((f) => fileImageItemRegEx.test(f.name)) as File;
    }
    if (!itemFile) {
      thumbnailItemPath = storyPath;
      itemFile = folder.files.find((f) =>
        folderImageItemRegEx.test(f.name)
      ) as File;
    }
    if (itemFile) {
      await convertToImageItem(
        join(thumbnailItemPath, itemFile.name),
        thumbnailPath,
      );
    }
  }
}

export async function generatePack(opt: ModOptions) {
  if (
    opt.nightMode && (opt.autoNextStoryTransition || opt.selectNextStoryAtEnd)
  ) {
    console.log(
      bgRed(
        "The night mode is incompatible with auto-next-story-transition or select-next-story-at-end options",
      ),
    );
    Deno.exit(1);
  }

  const start = Date.now();
  console.log({ opt });
  const lang = opt.lang || (await getLang());
  await initI18n(lang);
  let pathsToHandle = [opt.storyPath];
  if (opt.storyPath.startsWith("http")) {
    pathsToHandle = await downloadRss(opt.storyPath, ".", opt);
    console.log(`downloaded in ${opt.storyPath}`);
  }
  for (let index = 0; index < pathsToHandle.length; index++) {
    const storyPath = pathsToHandle[index];
    if (!opt.skipNotRss) {
      let folder: Folder = await fsToFolder(storyPath, false);
      if (!opt.skipExtractImageFromMp3) {
        await extractImagesFromAudio(storyPath, folder);
        folder = await fsToFolder(storyPath, false);
      }
      if (!opt.skipImageItemGen) {
        await genThumbnail(folder, storyPath, opt.thumbnailFromFirstItem);
      }
      if (!opt.skipImageItemGen || !opt.skipAudioItemGen) {
        await genMissingItems(
          folder,
          lang,
          true,
          storyPath,
          opt,
        );
        folder = await fsToFolder(storyPath, false);
      }
      if (!opt.skipAudioConvert) {
        await convertAudioOfFolder(
          storyPath,
          folder,
          !!opt.addDelay,
          opt.seekStory,
        );
      }
      if (!opt.skipImageConvert) {
        await convertImageOfFolder(storyPath, folder);
      }
      if (!opt.skipZipGeneration) {
        folder = await fsToFolder(storyPath, true);

        const metadata: Metadata = await getMetadata(storyPath, opt);
        const pack = folderToPack(folder, metadata);
        const nightModeAudioItemName = getNightModeAudioItem(folder);
        const serializedPack = await serializePack(pack, opt, {
          autoNextStoryTransition: opt.autoNextStoryTransition,
          nightModeAudioItemName,
        });
        const assets = getAssetsPaths(serializedPack, folder);
        const zipPath = opt.outputFolder
          ? join(opt.outputFolder, `${basename(storyPath)}-${Date.now()}.zip`)
          : `${storyPath}-${Date.now()}.zip`;
        await createPackZip(zipPath, storyPath, serializedPack, assets);
        console.log(
          `Done (${
            (Date.now() - start) / 1000
          } sec) :  ${storyPath} → ${zipPath}`,
        );
      }
    }
  }
}

async function getMetadata(
  storyPath: string,
  opt: ModOptions,
): Promise<Metadata> {
  const metadataPath = `${storyPath}/metadata.json`;
  if (await exists(metadataPath)) {
    const metadataJson = await Deno.readTextFile(metadataPath);
    return JSON.parse(metadataJson);
  } else {
    return {
      nightMode: !!opt.nightMode,
    };
  }
}
