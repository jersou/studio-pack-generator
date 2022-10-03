/* usage :
 * ```ts
 * import { runPreCommit } from "https://deno.land/x/shell_stream@v1.1.0/examples/pre-commit-parallel.ts";
 * import { fromFileUrl, normalize } from "https://deno.land/std@0.158.0/path/mod.ts";
 * import { setCwd } from "https://deno.land/x/shell_stream@v1.1.0/Stream.ts";
 * setCwd(dirname(fromFileUrl(import.meta.url)));
 * await runPreCommit([
 *   { cmd: `deno fmt --check --ignore="vendor,npm"`, useStderr: true },
 *   { cmd: `deno lint --ignore="vendor,npm"`, useStderr: true },
 *   { cmd: `deno test -A --ignore="vendor,npm"`, useStderr: false },
 * ]);
 * ```
 * The commands are run only if there are staged file in their cwd
 */
import { bgBlue, bgGreen, bgRed, black } from "../deps.ts";
import { run, runKo, RunOptions, RunStream, sanitize, Stream } from "../mod.ts";

import {
  default as ProgressBar,
} from "https://deno.land/x/progress@v1.2.8/mod.ts";

export function onError(streamData: { stream: RunStream; out: string }) {
  const err = (s: string) => console.error(bgRed(black(s)));
  err("");
  err("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
  console.error(streamData.out);
  err("");
  err("                                                                 ");
  err("                                                                 ");
  err("                              ERROR                              ");
  err("                                                                 ");
  err("                                                                 ");
  err("");
  const cwd = streamData.stream.opt?.cwd || streamData.stream.cwd;
  const cmd = streamData.stream.processCmd.join(" ");
  err(`Error on "${cwd}", while : "${cmd}"`);
  Deno.exit(1);
}

const ok = (s: string) => console.error(bgGreen(black(s)));
const blue = (s: string) => console.error(bgBlue(s));

export function onSuccess() {
  ok("");
  ok("                                                                 ");
  ok("                                                                 ");
  ok("                               OK                                ");
  ok("                                                                 ");
  ok("                                                                 ");
  Deno.exit(0);
}

async function pathHasDiff(path: string, stagedCheck = true, diffRef = "") {
  return await runKo(
    `git diff ${
      stagedCheck ? "--cached" : ""
    } --exit-code ${diffRef} -- ${path} `,
    { stderr: "null", stdout: "null" },
  );
}

type RunPreCommitData = {
  cwd?: string;
  diffPath?: string;
  cmd: string[] | string;
};

export type RunPreCommitOption = {
  checkGitDiff?: boolean;
  stagedCheck?: boolean;
  liveLog?: boolean;
  diffRef?: string;
  maxParallel?: number;
};

export function getTimeStr() {
  return new Date().toISOString().substring(11, 23);
}

export async function runPreCommit(
  runData: RunPreCommitData[],
  opt?: RunPreCommitOption,
) {
  const runs = [];
  for (const data of runData) {
    if (
      (opt?.checkGitDiff === false) ||
      await pathHasDiff(
        data.diffPath ?? data.cwd ?? ".",
        opt?.stagedCheck,
        opt?.diffRef ?? "",
      )
    ) {
      const runOptions: RunOptions = {
        cwd: data.cwd,
        allowFail: true,
        output: "merged",
        mergedTransform: {
          stdout: (s) => `[${getTimeStr()}] ${s}`,
          stderr: (s) => `[${bgRed(getTimeStr())}] ${s}`,
        },
      };
      runs.push(run(data.cmd, runOptions));
    }
  }

  Stream.resetProcessCount();
  const progress = new ProgressBar({ title: "progress:", interval: 0 });
  Stream.subscribeProcessEvent(({ processDone }) => {
    progress.render(processDone, { total: runs.length });
  });

  await Stream.fromArray(runs)
    .mapAwaitParallel(async (s) => ({
      stream: s,
      out: await (opt?.liveLog ? s.log() : s)
        .toString()
        .then((out) => {
          console.error();
          blue(` → ${s.processCmd.join(" ")} From ${s.opt?.cwd ?? ""} OK !`);
          return out.trim();
        }),
    }), opt?.maxParallel)
    .filter((streamData) => streamData.stream.processStatus?.success !== true)
    .map((streamData) => onError(streamData))
    .wait();
  onSuccess();
  sanitize();
}
