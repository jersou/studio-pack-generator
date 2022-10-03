#!/usr/bin/env -S deno run -A

import {
  runPreCommit,
} from "https://deno.land/x/shell_stream@v1.1.0/examples/pre-commit-parallel.ts";
import {
  fromFileUrl,
  normalize,
} from "https://deno.land/std@0.158.0/path/mod.ts";
import { setCwd } from "https://deno.land/x/shell_stream@v1.1.0/mod.ts";

const projetBasePath = normalize(fromFileUrl(import.meta.url) + "/..");
setCwd(projetBasePath);
const cwd = `${projetBasePath}`;

const runs = [
  { cwd, cmd: `deno fmt --ignore=vendor,dist --check` },
  { cwd, cmd: `deno lint --ignore=vendor,dist` },
  { cwd, cmd: `deno test -A --ignore=vendor,dist --no-check` },
];

await runPreCommit(runs, {
  checkGitDiff: Deno.env.get("CHECK_GIT_DIFF") !== "false",
  diffRef: Deno.env.get("CHECK_GIT_DIFF_REF"),
  maxParallel: Deno.env.get("CHECK_MAX_PARALLEL")
    ? parseInt(Deno.env.get("CHECK_MAX_PARALLEL") || "-1")
    : undefined,
});
