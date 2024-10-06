import type { File, Folder } from "./serialize-types.ts";
import { basename, join } from "@std/path";
import { encodeHex } from "@std/encoding";
import { getLang } from "../utils/i18n.ts";

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
    path,
    files: [],
  };
  const entries = await ls(path);
  // natural sort
  const lang = (await getLang()).substring(0, 2);
  entries.sort((a, b) => a.name.localeCompare(b.name, lang, { numeric: true }));
  for (const entry of entries) {
    if (entry.isDirectory) {
      folder.files.push(await fsToFolder(join(path, entry.name), genSha1));
    } else {
      const filePath = join(path, entry.name);
      folder.files.push({
        name: entry.name,
        sha1: genSha1 ? await getSha1(filePath) : "",
        path: filePath,
      } as File);
    }
  }
  return folder;
}

export async function getSha1(path: string): Promise<string> {
  const data = await Deno.readFile(path);
  return encodeHex(await crypto.subtle.digest("SHA-1", data));
}
