import { ShellStream } from "../shell_stream.ts";
import { Operator } from "../types.ts";

export const timestamp: Operator = () =>
  (shellStream: ShellStream) => {
    const inputGenerator = (async function* () {
      for await (const line of shellStream.generator) {
        const ts = new Date().toISOString();
        yield `${ts} ${line}`;
      }
    })();

    return ShellStream.builder(inputGenerator, shellStream);
  };
