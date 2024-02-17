import { File, Folder } from "../serialize/types.ts";
import {
  checkRunPermission,
  getFileAudioItem,
  getFileImageItem,
  getFolderAudioItem,
  getFolderImageItem,
  getNameWithoutExt,
  getNightModeAudioItem,
  isFolder,
  isStory,
} from "../utils/utils.ts";
import { generateImage } from "./gen_image.ts";
import { generateAudio } from "./gen_audio.ts";
import { i18next, join } from "../deps.ts";

function getTitle(name: string): string {
  if (/^[0-9]* *-? *$/.test(name)) {
    return name;
  } else {
    return /^[0-9]* *-? *(.*)$/.exec(name)?.[1].replace(/_/g, " ").trim()!;
  }
}

// FIXME : use object args
export async function genMissingItems(
  rootpath: string,
  folder: Folder,
  genImage: boolean,
  genAudio: boolean,
  lang: string,
  isRoot: boolean,
  skipWsl: boolean,
) {
  if (genImage || genAudio) {
    await checkRunPermission();
    if (genImage && !getFolderImageItem(folder)) {
      await generateImage(getTitle(folder.name), `${rootpath}/0-item.png`);
    }
    if (genAudio && !getFolderAudioItem(folder)) {
      await generateAudio(
        getTitle(folder.name),
        `${rootpath}/0-item.wav`,
        lang,
        skipWsl,
      );
    }
    if (genAudio && isRoot && !getNightModeAudioItem(folder)) {
      await generateAudio(
        i18next.t("NightModeTransition"),
        `${rootpath}/0-night-mode.wav`,
        lang,
        skipWsl,
      );
    }

    for (const file of folder.files) {
      if (isFolder(file)) {
        await genMissingItems(
          join(rootpath, file.name),
          file as Folder,
          genImage,
          genAudio,
          lang,
          false,
          skipWsl,
        );
      } else if (isStory(file as File)) {
        if (genImage && !getFileImageItem(file as File, folder)) {
          await generateImage(
            getTitle(getNameWithoutExt(file.name)),
            `${rootpath}/${getNameWithoutExt(file.name)}.item.png`,
          );
        }
        if (genAudio && !getFileAudioItem(file as File, folder)) {
          await generateAudio(
            getTitle(getNameWithoutExt(file.name)),
            `${rootpath}/${getNameWithoutExt(file.name)}.item.wav`,
            lang,
            skipWsl,
          );
        }
      }
    }
  }
}
