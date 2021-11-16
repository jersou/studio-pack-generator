import { ShellStream } from "../shell_stream.ts";
import { Operator } from "../types.ts";
import { filter } from "./filter.ts";

export const grep: Operator = (regex: RegExp) =>
  (shellStream: ShellStream) =>
    filter((line: string) => regex.test(line))(shellStream);
