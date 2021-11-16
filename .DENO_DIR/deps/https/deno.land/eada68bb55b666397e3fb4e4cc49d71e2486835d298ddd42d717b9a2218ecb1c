import { ShellStream } from "../shell_stream.ts";
import { StartOperator } from "../types.ts";

export const from: StartOperator = (
  iterable: AsyncIterable<string> | Iterable<string>,
) =>
  () => {
    const generator = (async function* () {
      for await (const str of iterable) {
        yield str;
      }
    })();
    return ShellStream.builder(generator);
  };
