import { ShellStream } from "../shell_stream.ts";

export const toIterable: () => (
  shellStream: ShellStream,
) => AsyncIterable<string> = () =>
  (stream: ShellStream) => {
    return (async function* () {
      for await (const line of stream.generator) {
        yield line;
      }
      await stream.close();
    })();
  };
