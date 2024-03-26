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
  {
    cwd,
    cmd:
      `deno fmt --ignore=vendor,dist,.cov_profile,gui/frontend/assets_bundle.json,gui/frontend/htm@3.1.1-preact-standalone.module.js,gui/lodash-throttle-v4.1.1.js`,
  },
  {
    cwd,
    cmd:
      `deno lint --ignore=vendor,dist,gui/frontend/,gui/lodash-throttle-v4.1.1.js`,
  },
  { cwd, cmd: `deno test -A --ignore=vendor,dist --no-check` },
];

await runPreCommit(runs);
