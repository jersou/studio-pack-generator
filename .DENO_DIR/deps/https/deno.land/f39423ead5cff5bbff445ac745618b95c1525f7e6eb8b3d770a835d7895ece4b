import { ShellStream } from "../shell_stream.ts";
import { Operator } from "../types.ts";

export type FilterFunction = (line: string) => boolean;

export const filter: Operator = (filterFunction: FilterFunction) =>
  (shellStream: ShellStream) => {
    const generator = (async function* () {
      for await (const line of shellStream.generator) {
        if (filterFunction(line)) {
          yield line;
        }
      }
    })();
    return ShellStream.builder(generator, shellStream);
  };
