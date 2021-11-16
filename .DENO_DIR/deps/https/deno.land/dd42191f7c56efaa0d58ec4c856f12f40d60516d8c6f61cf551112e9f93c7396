import { ShellStream } from "../shell_stream.ts";
import { Operator } from "../types.ts";

export const head: Operator = (count = 1) =>
  (shellStream: ShellStream) => {
    const generator = (async function* () {
      let i = 0;
      for await (const line of shellStream.generator) {
        yield line;
        i++;
        if (i >= count) {
          break;
        }
      }
    })();
    return ShellStream.builder(generator, shellStream);
  };
