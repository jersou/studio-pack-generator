import { EndOperator } from "../types.ts";
import { ShellStream } from "../shell_stream.ts";
import { close } from "./close.ts";

export const success: EndOperator<boolean> = () =>
  async (shellStream: ShellStream) => (await close()(shellStream)).success;
