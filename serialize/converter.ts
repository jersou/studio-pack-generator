import {
  File,
  Folder,
  Menu,
  Metadata,
  Pack,
  Story,
  StoryItem,
  ZipMenu,
} from "./types.ts";
import {
  cleanStageName,
  firstStoryFile,
  getExtension,
  getFileAudioItem,
  getFileAudioStory,
  getFileImageItem,
  getFolderAudioItem,
  getFolderImageItem,
  isFolder,
  isStory,
  isZipFile,
} from "../utils/utils.ts";

export function folderToPack(folder: Folder, metadata?: Metadata): Pack {
  const firstSubFolder = folder.files.find((f) => isFolder(f)) as Folder;
  const audio = getFolderAudioItem(folder);
  const image = getFolderImageItem(folder);
  const folderPath = folder.path + "/";
  const res: Pack = {
    title: metadata?.title ?? folder.name,
    description: metadata?.description ?? "",
    format: metadata?.format ?? "v1",
    version: metadata?.version ?? 1,
    nightModeAvailable: !!(metadata?.nightMode),
    entrypoint: {
      class: "StageNode-Entrypoint",
      name: "Cover node",
      path: folderPath,
      image: image?.assetName ?? null,
      audio: audio?.assetName ?? null,
      imagePath: image?.path,
      audioPath: audio?.path,
      okTransition: {
        class: "ActionNode",
        name: "Action node",
        options: [
          firstSubFolder
            ? folderToMenu(firstSubFolder, "")
            : fileToStory(firstStoryFile(folder)!),
        ],
      },
    },
  };

  if (folder.path) {
    try {
      if (audio) {
        res.entrypoint.audioTimestamp = Deno.statSync(folder.path + "/" + audio)
          .mtime
          ?.getTime();
      }
      if (image) {
        res.entrypoint.imageTimestamp = Deno.statSync(folder.path + "/" + image)
          .mtime
          ?.getTime();
      }
      if (folder.path) {
        res.entrypoint.pathTimestamp = Deno.statSync(folder.path).mtime
          ?.getTime();
      }
    } catch (_) {
      //
    }
  }

  return res;
}

export function folderToMenu(folder: Folder, path: string): Menu {
  const image = getFolderImageItem(folder);
  const audio = getFolderAudioItem(folder);
  const folderPath = folder.path + "/";
  const res: Menu = {
    class: "StageNode-Menu",
    image: image?.assetName ?? null,
    audio: audio?.assetName ?? null,
    name: folder.name,
    path: folderPath,
    imagePath: image?.path,
    audioPath: audio?.path,
    audioTimestamp: folder.path && audio ? getMTime(audio?.path) : undefined,
    imageTimestamp: folder.path && image ? getMTime(image?.path) : undefined,
    pathTimestamp: folderPath ? getMTime(folderPath) : undefined,
    okTransition: {
      class: "ActionNode",
      name: folder.name,
      options: folder.files
        .map((f) =>
          isFolder(f)
            ? folderToMenu(f as Folder, path + "/" + f.name)
            : isStory(f as File)
            ? fileToStoryItem(f as File, folder)
            : isZipFile(f as File)
            ? fileToZipMenu(`${path}/${folder.name}/${f.name}`)
            : null
        )
        .filter((f) => f) as (Menu | ZipMenu | StoryItem)[],
    },
  };
  return res;
}

export function fileToZipMenu(path: string): ZipMenu {
  return {
    class: "ZipMenu",
    path: path,
  };
}

function getMTime(path: string | undefined) {
  try {
    return path ? Deno.statSync(path).mtime?.getTime() : undefined;
  } catch (_) {
    //
  }
}

export function fileToStoryItem(file: File, parent: Folder): StoryItem {
  const audio = getFileAudioItem(file, parent);
  const image = getFileImageItem(file, parent);
  const res: StoryItem = {
    class: "StageNode-StoryItem",
    name: cleanStageName(file.name),
    path: file.path,
    audio: audio?.assetName ?? null,
    image: image?.assetName ?? null,
    imagePath: image?.path,
    audioPath: audio?.path,
    audioTimestamp: parent.path && audio ? getMTime(audio?.path) : undefined,
    imageTimestamp: parent.path && image ? getMTime(image?.path) : undefined,
    pathTimestamp: parent.path && file.path ? getMTime(file.path) : undefined,
    okTransition: {
      name: cleanStageName(file.name),
      class: "ActionNode",
      options: [
        {
          class: "StageNode-Story",
          audio: getFileAudioStory(file)?.assetName ?? null,
          image: null,
          name: cleanStageName(file.name),
          okTransition: null,
        },
      ],
    },
  };
  return res;
}

export function fileToStory(file: File): Story {
  return {
    class: "StageNode-Story",
    path: file.path,
    audio: `${file.sha1}.${getExtension(file.name)}`,
    image: null,
    name: cleanStageName(file.name),
    okTransition: null,
  };
}
