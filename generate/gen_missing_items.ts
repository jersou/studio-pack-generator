import { Folder } from "../serialize/types.ts";
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
import { ModOptions } from "../gen_pack.ts";

function getTitle(name: string): string {
  if (/^[0-9]* *-? *$/.test(name)) {
    return name;
  } else {
    return /^[0-9]* *-? *(.*)$/.exec(name)?.[1].replace(/_/g, " ").trim()!;
  }
}

// FIXME : use object args
export async function genMissingItems(
  folder: Folder,
  lang: string,
  isRoot: boolean,
  rootpath: string,
  opt: ModOptions,
) {
  if (!opt.skipImageItemGen || !opt.skipAudioItemGen) {
    await checkRunPermission();
    if (!opt.skipImageItemGen && !getFolderImageItem(folder)) {
      await generateImage(getTitle(folder.name), `${rootpath}/0-item.png`);
    }
    if (!opt.skipAudioItemGen && !getFolderAudioItem(folder)) {
      await generateAudio(
        getTitle(folder.name),
        `${rootpath}/0-item.wav`,
        lang,
        !!opt.skipWsl,
      );
    }
    if (!opt.skipAudioItemGen && isRoot && !getNightModeAudioItem(folder)) {
      await generateAudio(
        i18next.t("NightModeTransition"),
        `${rootpath}/0-night-mode.wav`,
        lang,
        !!opt.skipWsl,
      );
    }

    for (const file of folder.files) {
      if (isFolder(file)) {
        await genMissingItems(
          file,
          lang,
          false,
          join(rootpath, file.name),
          opt,
        );
      } else if (isStory(file)) {
        if (!opt.skipImageItemGen && !getFileImageItem(file, folder)) {
          await generateImage(
            getTitle(getNameWithoutExt(file.name)),
            `${rootpath}/${getNameWithoutExt(file.name)}.item.png`,
          );
        }
        if (!opt.skipAudioItemGen && !getFileAudioItem(file, folder)) {
          await generateAudio(
            getTitle(getNameWithoutExt(file.name)),
            `${rootpath}/${getNameWithoutExt(file.name)}.item.wav`,
            lang,
            !!opt.skipWsl,
          );
        }
      }
    }
  }
}
