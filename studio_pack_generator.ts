#!/usr/bin/env -S deno run -A

import { parseArgs } from "./utils/parse_args.ts";
import { version } from "./version.ts";

if (import.meta.main) {
  console.log({ version, ...Deno.version });
  await parseArgs(Deno.args);
}
