import { ShellStream } from "../shell_stream.ts";
import { map } from "./map.ts";
import { Operator } from "../types.ts";

// deno-lint-ignore no-explicit-any
export type Replacer = string | ((substring: string, ...args: any[]) => string);

export const replace: Operator = (
  searchValue: string | RegExp,
  replacer: Replacer,
) =>
  (shellStream: ShellStream) => {
    return map((line: string) => {
      if (typeof replacer === "string") {
        return line.replace(searchValue, replacer);
      } else {
        return line.replace(searchValue, replacer);
      }
    })(shellStream);
  };
