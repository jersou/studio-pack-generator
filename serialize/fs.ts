import { File, Folder } from "./types.ts";
import { basename, createHash, join } from "../deps.ts";

async function ls(path: string): Promise<Deno.DirEntry[]> {
  const entries = [];
  for await (const entry of Deno.readDir(path)) {
    entries.push(entry);
  }
  return entries.sort((e1, e2) => e1.name.localeCompare(e2.name));
}

export async function fsToFolder(
  path: string,
  genSha1 = true,
): Promise<Folder> {
  const folder: Folder = {
    name: basename(path),
    files: [],
  };
  const entries = await ls(path);
  for (const entry of entries) {
    if (entry.isDirectory) {
      folder.files.push(await fsToFolder(join(path, entry.name), genSha1));
    } else {
      folder.files.push({
        name: entry.name,
        sha1: genSha1 ? await getSha1(join(path, entry.name)) : "",
      } as File);
    }
  }
  return folder;
}

export async function getSha1(path: string): Promise<string> {
  const sha1Hash = createHash("sha1");
  const data = await Deno.readFile(path);
  sha1Hash.update(data);
  return sha1Hash.toString();
}
