/**
 * Create ReadableStream from each file of the directory
 * @param {string} path The path to the directory to read.
 * @returns the files as a ReadableStream<Deno.DirEntry>
 */
export function dirToStream(path: string) {
  return new ReadableStream<Deno.DirEntry>({
    async start(controller) {
      for await (const dirEntry of Deno.readDir(path)) {
        controller.enqueue(dirEntry);
      }
      controller.close();
    },
  });
}
