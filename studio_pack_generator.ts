#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write

import { parseArgs } from "./utils/parse_args.ts";

if (import.meta.main) {
  console.log(Deno.version);
  await parseArgs(Deno.args);
}
