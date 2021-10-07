#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write

import { parseArgs } from "./utils/parse_args.ts";

if (import.meta.main) {
  await parseArgs(Deno.args);
}
