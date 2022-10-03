import { walk, WalkEntry, WalkOptions } from "../deps.ts";

/**
 * Create ReadableStream recursively from each file and directory of the given
 * directory
 * @param {string} path The path to walk.
 * @param {WalkOptions} [opt] WalkOptions
 * @returns A ReadableStream of WalkEntry.
 */
export function walkToStream(path: string, opt?: WalkOptions) {
  return new ReadableStream<WalkEntry>({
    async start(controller) {
      for await (const dirEntry of walk(path, opt)) {
        controller.enqueue(dirEntry);
      }
      controller.close();
    },
  });
}
