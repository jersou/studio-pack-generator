import { ShellStream } from "../shell_stream.ts";
import { StartOperator } from "../types.ts";

export const fromDir: StartOperator = (path: string) =>
  () => {
    const generator = (async function* () {
      for await (const dirEntry of Deno.readDir(path)) {
        yield dirEntry.name;
      }
    })();
    return ShellStream.builder(generator);
  };
