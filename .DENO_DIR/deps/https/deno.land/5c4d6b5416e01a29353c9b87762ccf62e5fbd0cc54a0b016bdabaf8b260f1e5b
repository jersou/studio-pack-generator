import { ShellStream } from "../shell_stream.ts";
import { readLines } from "../deps.ts";
import { Operator } from "../types.ts";

export type RunOptions = Omit<Deno.RunOptions, "cmd"> & {
  throwIfRunFail?: boolean;
  exitCodeIfRunFail?: number;
  streamStdErr?: boolean;
};

export const run: Operator = (cmdOrStr: string[] | string, opt?: RunOptions) =>
  (stream: ShellStream) => {
    const generator = (async function* () {
      stream.processCmd = parseCmdString(cmdOrStr);

      stream.process = Deno.run({
        cmd: stream.processCmd,
        ...opt,
        stdout: opt?.stdout || (opt?.streamStdErr ? "inherit" : "piped"),
        stderr: opt?.stderr || (opt?.streamStdErr ? "piped" : "inherit"),
        stdin: "piped",
      });
      ShellStream.incProcessCount();
      redirectGeneratorToStdin(stream).then();
      (async () => {
        stream.processStatus = await stream.process!.status();
        ShellStream.incProcessDone();
        closeProcess(stream.process!);
      })().then();

      try {
        for await (
          const line of readLines(
            opt?.streamStdErr ? stream.process.stderr! : stream.process.stdout!,
          )
        ) {
          yield line;
        }
      } catch (_e) {
        // ignore error
      }
      if (opt?.throwIfRunFail && !stream.processStatus!.success) {
        throw new Error(
          `The process ${stream.processCmd[0]} exit error ${
            stream.processStatus!.code
          }`,
        );
      }
      if (opt?.exitCodeIfRunFail !== undefined) {
        Deno.exit(opt?.exitCodeIfRunFail);
      }
    })();
    return ShellStream.builder(generator, stream);
  };

async function redirectGeneratorToStdin(stream: ShellStream) {
  const textEncoder = new TextEncoder();
  for await (const line of stream.generator) {
    try {
      await stream.process!.stdin!.write(textEncoder.encode(line + "\n"));
    } catch (_e) {
      break;
    }
  }
  try {
    stream.process!.stdin!.close();
  } catch (_e) {
    // ignore error
  }
}

export function parseCmdString(cmdOrStr: string[] | string): string[] {
  return cmdOrStr instanceof Array ? cmdOrStr : cmdOrStr
    .trim()
    .match(/"(\\"|[^"])*"|'(\\'|[^'])*'|[^ "']+/g)!
    .map((p) =>
      p.match(/^"((\\"|[^"])*)"$/)
        ? p.replace(/^"((\\"|[^"])*)"$/, "$1")
        : p.match(/^'((\\'|[^'])*)'$/)
        ? p.replace(/^'((\\'|[^'])*)'$/, "$1")
        : p
    );
}

export function closeProcess(process: Deno.Process) {
  try {
    process!.stdin!.close();
  } catch (_e) {
    // ignore error
  }
  try {
    process!.stdout!.close();
  } catch (_e) {
    // ignore error
  }
  try {
    process!.stderr!.close();
  } catch (_e) {
    // ignore error
  }
  try {
    process!.close();
  } catch (_e) {
    // ignore error
  }
}
