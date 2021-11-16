import { ShellStream } from "../shell_stream.ts";
import { Operator } from "../types.ts";

export const sort: Operator = () =>
  (shellStream: ShellStream) => {
    const generator = (async function* () {
      const out: string[] = [];
      for await (const line of shellStream.generator) {
        out.push(line);
      }
      for await (const line of out.sort()) {
        yield line;
      }
    })();
    return ShellStream.builder(generator, shellStream);
  };
