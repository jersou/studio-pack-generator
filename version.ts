#!/usr/bin/env -S deno run -A

export const version = "v0.5.0";

if (import.meta.main) {
  console.log(version);
}
