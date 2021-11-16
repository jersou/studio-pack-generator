import { ShellStream } from "../shell_stream.ts";
import { EndOperator } from "../types.ts";
import { closeProcess } from "../operators/run.ts";

export type CloseOptions = {
  processes: "KILL" | "AWAIT" | "KEEP";
};

export const close: EndOperator<CloseRes> = (
  opt: CloseOptions = { processes: "AWAIT" },
) =>
  async (shellStream: ShellStream): Promise<CloseRes> => {
    const out = [];
    // consume the generator
    for await (const line of shellStream.generator!) {
      out.push(line);
    }
    if (opt.processes === "AWAIT") {
      for (const stream of shellStream.parents) {
        if (stream.process && !stream.processStatus) {
          try {
            stream.process!.stdin!.close();
          } catch (_e) {
            // ignore error
          }
          try {
            stream.process!.stdout!.close();
          } catch (_e) {
            // ignore error
          }
          try {
            stream.processStatus = await stream.process.status();
          } catch (_) {
            // ignore error
          }
          try {
            stream.process.close();
          } catch (_) {
            // ignore error
          }
        }
      }
    } else if (opt.processes === "KILL") {
      for (const stream of shellStream.parents) {
        if (stream.process && !stream.processStatus) {
          try {
            stream.process.kill("SIGINT");
            stream.process.kill("SIGKILL");
          } catch (_e) {
            // ignore error
          }
          stream.processStatus = await stream.process.status();
          closeProcess(stream.process);
        }
      }
    }

    for (const stream of shellStream.parents) {
      for await (const _line of stream.generator) {
        // ignore stream
      }
      if (stream.file) {
        try {
          stream.file.close();
        } catch (_e) {
          // ignore error
        }
      }
    }
    const statuses = shellStream.parents.map((stream) => {
      return (
        stream.processStatus && {
          ...stream.processStatus,
          cmd: stream.processCmd!,
        }
      );
    });
    const success = !statuses.some((s) => s && !s.success);
    return new CloseRes(success, statuses, out);
  };

export class CloseRes {
  constructor(
    public success: boolean,
    public statuses: ((Deno.ProcessStatus & { cmd: string[] }) | undefined)[],
    public out: string[],
  ) {}
  tostring() {
    return this.out.join("\n");
  }
}
