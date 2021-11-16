import { ShellStream } from "../shell_stream.ts";
import { StartOperator } from "../types.ts";

export const fromArray: StartOperator = (lines: string[]) =>
  () => {
    const generator = (async function* () {
      for await (const line of lines) {
        yield line;
      }
    })();
    return ShellStream.builder(generator);
  };
