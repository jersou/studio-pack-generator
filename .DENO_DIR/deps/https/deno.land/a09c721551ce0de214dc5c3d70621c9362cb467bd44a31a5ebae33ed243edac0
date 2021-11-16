import { ShellStream } from "../shell_stream.ts";
import { map } from "./map.ts";
import { Operator } from "../types.ts";

export const cut: Operator = (delim: string, indexes: number[], sep = " ") =>
  (shellStream: ShellStream) =>
    map((line: string) => {
      const parts = line.split(delim);
      return indexes.map((i) => parts[i]).join(sep);
    })(shellStream);
