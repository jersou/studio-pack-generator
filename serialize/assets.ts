import { File, Folder, SerializedPack } from "./types.ts";
import { getNameWithoutExt, isFile, uniq } from "../utils/utils.ts";
import { join } from "@std/path";

export function getAssetsSha1s(serializedPack: SerializedPack): string[] {
  return [
    ...serializedPack.stageNodes.map((stageNode) => stageNode.image),
    ...serializedPack.stageNodes.map((stageNode) => stageNode.audio),
  ]
    .filter((sha) => sha)
    .map((sha) => sha as string)
    .map(getNameWithoutExt)
    .sort((a, b) => a.localeCompare(b));
}

export type Sha1Map = { [sha1: string]: string };

export function getSha1sMap(
  folder: Folder,
  path = "",
  map: Sha1Map = {},
): Sha1Map {
  folder.files.forEach((f) => {
    if (isFile(f)) {
      map[(f as File).sha1] = join(path, f.name);
    } else {
      getSha1sMap(f as Folder, join(path, f.name), map);
    }
  });
  return map;
}

export type Assets = { sha1: string; path: string }[];

export function getAssetsPaths(
  serializedPack: SerializedPack,
  folder: Folder,
): Assets {
  const sha1s = uniq(getAssetsSha1s(serializedPack));
  const map = getSha1sMap(folder);
  return sha1s.map((sha1) => ({ sha1, path: map[sha1] }));
}
