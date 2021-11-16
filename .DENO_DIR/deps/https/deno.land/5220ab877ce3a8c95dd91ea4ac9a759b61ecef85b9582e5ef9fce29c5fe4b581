import { ShellStream } from "../shell_stream.ts";
import { Operator } from "../types.ts";

export const uniq: Operator = () =>
  (shellStream: ShellStream) => {
    const generator = (async function* () {
      let lastEmit;
      for await (const line of shellStream.generator) {
        if (lastEmit !== line) {
          lastEmit = line;
          yield line;
        }
      }
    })();
    return ShellStream.builder(generator, shellStream);
  };
