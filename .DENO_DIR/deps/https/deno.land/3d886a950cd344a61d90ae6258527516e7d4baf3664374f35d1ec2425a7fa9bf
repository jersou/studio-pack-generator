import { ShellStream } from "../shell_stream.ts";
import { EndOperator } from "../types.ts";
import { CloseRes } from "./close.ts";

export const toFile: EndOperator<CloseRes> = (outputPath: string) =>
  async (stream: ShellStream) => {
    const closeRes = await stream.close();
    await Deno.writeTextFile(outputPath, closeRes.out.join("\n"));
    return closeRes;
  };
