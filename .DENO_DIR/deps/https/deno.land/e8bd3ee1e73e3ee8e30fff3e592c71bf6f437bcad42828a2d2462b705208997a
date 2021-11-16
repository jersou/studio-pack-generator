import { ShellStream } from "../shell_stream.ts";
import { StartOperator } from "../types.ts";
import { walk, WalkOptions } from "../deps.ts";

export const fromWalk: StartOperator = (path: string, opt?: WalkOptions) =>
  () => {
    const generator = (async function* () {
      for await (const dirEntry of walk(path, opt)) {
        yield dirEntry.path;
      }
    })();
    return ShellStream.builder(generator);
  };
