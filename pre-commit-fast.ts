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
  { cwd, cmd: `deno task fmt --check` },
  { cwd, cmd: `deno task lint` },
  { cwd, cmd: `deno task test` },
  { cwd, cmd: `deno task check` },
];

await runPreCommit(runs);
