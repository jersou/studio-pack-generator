import { ShellStream } from "../shell_stream.ts";
import { Operator } from "../types.ts";
import { tap } from "./tap.ts";

export type LogTransformFunction = (line: string) => string;
export const log: Operator = (transform?: LogTransformFunction) =>
  (shellStream: ShellStream) =>
    tap((line: string) =>
      transform ? console.log(transform(line)) : console.log(line)
    )(shellStream);
