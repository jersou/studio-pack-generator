import { EndOperator } from "../types.ts";
import { ShellStream } from "../shell_stream.ts";
import { close } from "./close.ts";

export const toString: EndOperator<string> = () =>
  async (shellStream: ShellStream) =>
    (await close()(shellStream)).out.join("\n");
