#!/usr/bin/env -S deno run -A

import { parseArgs } from "./utils/parse_args.ts";
import denoJson from "./deno.json" with { type: "json" };

import $ from "@david/dax";

if (import.meta.main) {
  $.setPrintCommand(true);
  console.log({ version: denoJson.version, ...Deno.version });
  await parseArgs(Deno.args);
}
