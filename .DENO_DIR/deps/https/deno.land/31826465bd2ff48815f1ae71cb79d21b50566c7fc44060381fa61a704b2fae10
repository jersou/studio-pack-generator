import { ShellStream } from "../shell_stream.ts";
import { Operator } from "../types.ts";

export const tail: Operator = (count = 1) =>
  (shellStream: ShellStream) => {
    const generator = (async function* () {
      const buffer: string[] = [];
      for await (const line of shellStream.generator) {
        buffer.push(line);
        if (buffer.length > count) {
          buffer.shift();
        }
      }
      for (const line of buffer) {
        yield line;
      }
    })();
    return ShellStream.builder(generator, shellStream);
  };
