import type { Folder } from "../serialize/serialize-types.ts";
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
import i18next from "https://deno.land/x/i18next@v23.15.1/index.js";
import { join } from "@std/path";
import { exists } from "@std/fs";
import type { StudioPackGenerator } from "../studio_pack_generator.ts";

function getTitle(name: string): string {
  if (/^[0-9]* *-? *$/.test(name)) {
    return name;
  } else {
    return /^[0-9]* *-? *(.*)$/.exec(name)?.[1].replace(/_/g, " ").trim()!;
  }
}

export async function genMissingItems(
  folder: Folder,
  lang: string,
  isRoot: boolean,
  rootpath: string,
  opt: StudioPackGenerator,
) {
  if (!opt.skipImageItemGen || !opt.skipAudioItemGen) {
    await checkRunPermission();
    if (!opt.skipImageItemGen && !getFolderImageItem(folder)) {
      if (
        isRoot &&
        opt.useThumbnailAsRootImage &&
        (await exists(join(rootpath, "thumbnail.png")))
      ) {
        await Deno.copyFile(
          join(rootpath, "thumbnail.png"),
          `${rootpath}/0-item.png`,
        );
      } else {
        await generateImage(
          getTitle(folder.name),
          `${rootpath}/0-item.png`,
          opt.imageItemGenFont,
        );
      }
    }
    if (!opt.skipAudioItemGen && !getFolderAudioItem(folder)) {
      await generateAudio(
        getTitle(folder.name),
        `${rootpath}/0-item.wav`,
        lang,
        opt,
      );
    }
    if (!opt.skipAudioItemGen && isRoot && !getNightModeAudioItem(folder)) {
      await generateAudio(
        opt.i18n?.["NightModeTransition"] || i18next.t("NightModeTransition"),
        `${rootpath}/0-night-mode.wav`,
        lang,
        opt,
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
        let title = getTitle(getNameWithoutExt(file.name));
        const metadataPath = join(
          rootpath,
          getNameWithoutExt(file.name) + "-metadata.json",
        );
        if (await exists(metadataPath)) {
          try {
            const metadata = JSON.parse(await Deno.readTextFile(metadataPath));
            title = metadata?.title ?? title;
          } catch (error) {
            console.error(
              `error reading json metadata: ${metadataPath}`,
              error,
            );
          }
        }
        if (!opt.skipImageItemGen && !getFileImageItem(file, folder)) {
          await generateImage(
            title,
            `${rootpath}/${getNameWithoutExt(file.name)}-generated.item.png`,
            opt.imageItemGenFont,
          );
        }
        if (!opt.skipAudioItemGen && !getFileAudioItem(file, folder)) {
          await generateAudio(
            title,
            `${rootpath}/${getNameWithoutExt(file.name)}-generated.item.wav`,
            lang,
            opt,
          );
        }
      }
    }
  }
}
