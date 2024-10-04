#!/usr/bin/env -S deno run -A
import denoJson from "../deno.json" with { type: "json" };

if (import.meta.main) {
  console.log(denoJson.version);
}
