import { ShellStream } from "../shell_stream.ts";
import { Generator, Operator } from "../types.ts";

export const tee: Operator = (outputPath: string) =>
  (stream: ShellStream) => {
    const generator: Generator = (async function* () {
      stream.file = await Deno.open(outputPath, {
        write: true,
        create: true,
      });
      const encoder = new TextEncoder();
      let start = true;
      for await (const line of stream.generator) {
        if (start) {
          await Deno.write(stream.file.rid, encoder.encode(line));
          start = false;
        } else {
          await Deno.write(stream.file.rid, encoder.encode("\n" + line));
        }
        yield line;
      }
      stream.file.close();
    })();

    return ShellStream.builder(generator, stream);
  };
