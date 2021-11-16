import { ShellStream } from "../shell_stream.ts";
import { Generator, Operator } from "../types.ts";

export type MapFunction = (line: string) => string;

export const map: Operator = (mapFunction: MapFunction) =>
  (shellStream: ShellStream) => {
    const generator: Generator = (async function* () {
      for await (const line of shellStream.generator) {
        yield mapFunction(line);
      }
    })();
    return ShellStream.builder(generator, shellStream);
  };
