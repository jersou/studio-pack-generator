import { ShellStream } from "../shell_stream.ts";
import { StartOperator } from "../types.ts";
import { run, RunOptions } from "../operators/run.ts";

export const fromRun: StartOperator = (cmd: string[], opt?: RunOptions) =>
  () => run(cmd, opt)(ShellStream.empty());
