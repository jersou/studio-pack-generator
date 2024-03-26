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
  const res: Pack = {
    title: metadata?.title ?? folder.name,
    description: metadata?.description ?? "",
    format: metadata?.format ?? "v1",
    version: metadata?.version ?? 1,
    nightModeAvailable: !!(metadata?.nightMode),
    entrypoint: {
      class: "StageNode-Entrypoint",
      name: "Cover node",
      path: folder.path + "/",
      image,
      audio,
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

  const res: Menu = {
    class: "StageNode-Menu",
    image,
    audio,
    name: folder.name,
    path: folder.path + "/",
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

  if (folder.path) {
    try {
      if (audio) {
        res.audioTimestamp = Deno.statSync(folder.path + "/" + audio).mtime
          ?.getTime();
      }
      if (image) {
        res.imageTimestamp = Deno.statSync(folder.path + "/" + image).mtime
          ?.getTime();
      }
      if (folder.path) {
        res.pathTimestamp = Deno.statSync(folder.path).mtime?.getTime();
      }
    } catch (_) {
      //
    }
  }

  return res;
}

export function fileToZipMenu(path: string): ZipMenu {
  return {
    class: "ZipMenu",
    path: path,
  };
}

export function fileToStoryItem(file: File, parent: Folder): StoryItem {
  const audio = getFileAudioItem(file, parent);
  const image = getFileImageItem(file, parent);

  const res: StoryItem = {
    class: "StageNode-StoryItem",
    name: file.name + " item",
    path: file.path,
    audio,
    image,
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
  if (parent.path) {
    try {
      if (audio) {
        res.audioTimestamp = Deno.statSync(parent.path + "/" + audio).mtime
          ?.getTime();
      }
      if (image) {
        res.imageTimestamp = Deno.statSync(parent.path + "/" + image).mtime
          ?.getTime();
      }
      if (file.path) {
        res.pathTimestamp = Deno.statSync(file.path).mtime?.getTime();
      }
    } catch (_) {
      //
    }
  }

  return res;
}

export function fileToStory(file: File): Story {
  return {
    class: "StageNode-Story",
    path: file.path,
    audio: `${file.sha1}.${getExtension(file.name)}`,
    image: null,
    name: file.name + " Stage node",
    okTransition: null,
  };
}
