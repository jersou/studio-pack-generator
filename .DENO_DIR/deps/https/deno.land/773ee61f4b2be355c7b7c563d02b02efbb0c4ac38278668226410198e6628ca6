import { ShellStream } from "../shell_stream.ts";
import { readLines } from "../deps.ts";
import { StartOperator } from "../types.ts";

export type FromFileOpt = { closeBeforeStreaming?: boolean };
export const fromFile: StartOperator = (path: string, opt?: FromFileOpt) =>
  () => {
    const generator = (async function* () {
      if (opt?.closeBeforeStreaming) {
        const fileContent = await Deno.readTextFile(path);
        for await (const line of fileContent.split("\n")) {
          yield line;
        }
      } else {
        const file = await Deno.open(path);
        for await (const line of readLines(file)) {
          yield line;
        }
        file.close();
      }
    })();
    return ShellStream.builder(generator);
  };
