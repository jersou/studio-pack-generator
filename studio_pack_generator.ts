#!/usr/bin/env -S deno run -A

import { parseArgs } from "./utils/parse_args.ts";
import { version } from "./version.ts";
import $ from "@david/dax";

if (import.meta.main) {
  $.setPrintCommand(true);
  console.log({ version, ...Deno.version });
  await parseArgs(Deno.args);
}
