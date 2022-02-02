import {
  File,
  Folder,
  Menu,
  Pack,
  Story,
  StoryItem,
  ZipMenu,
} from "./types.ts";
import {
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

export function folderToPack(folder: Folder, nightMode = false): Pack {
  const firstSubFolder = folder.files.find((f) => isFolder(f)) as Folder;
  return {
    title: folder!.name,
    description: "",
    format: "v1",
    version: 1,
    nightModeAvailable: nightMode,
    entrypoint: {
      class: "StageNode-Entrypoint",
      name: "Cover node",
      image: getFolderImageItem(folder),
      audio: getFolderAudioItem(folder),
      okTransition: {
        class: "ActionNode",
        name: "Action node",
        options: [
          firstSubFolder
            ? folderToMenu(firstSubFolder, "")
            : fileToStory(firstStoryFile(folder)! as File),
        ],
      },
    },
  };
}

export function folderToMenu(folder: Folder, path: string): Menu {
  return {
    class: "StageNode-Menu",
    image: getFolderImageItem(folder),
    audio: getFolderAudioItem(folder),
    name: folder.name,
    okTransition: {
      class: "ActionNode",
      name: folder.name + " ActionNode",
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
}

export function fileToZipMenu(path: string): ZipMenu {
  return {
    class: "ZipMenu",
    path: path,
  };
}

export function fileToStoryItem(file: File, parent: Folder): StoryItem {
  return {
    class: "StageNode-StoryItem",
    name: file.name + " item",
    audio: getFileAudioItem(file, parent),
    image: getFileImageItem(file, parent),
    okTransition: {
      name: file.name + " ActionNode",
      class: "ActionNode",
      options: [
        {
          class: "StageNode-Story",
          audio: getFileAudioStory(file),
          image: null,
          name: file.name + " Stage node",
          okTransition: null,
        },
      ],
    },
  };
}

export function fileToStory(file: File): Story {
  return {
    class: "StageNode-Story",
    audio: `${file.sha1}.${getExtension(file.name)}`,
    image: null,
    name: file.name + " Stage node",
    okTransition: null,
  };
}
