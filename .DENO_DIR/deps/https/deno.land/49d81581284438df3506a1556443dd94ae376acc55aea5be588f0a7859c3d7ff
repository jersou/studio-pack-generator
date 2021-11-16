import { ShellStream } from "../shell_stream.ts";
import { Operator } from "../types.ts";
import { tap } from "./tap.ts";

export const logWithTimestamp: Operator = () =>
  (shellStream: ShellStream) =>
    tap((line: string) => {
      console.log(`${new Date().toISOString()} ${line}`);
    })(shellStream);
