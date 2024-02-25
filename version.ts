#!/usr/bin/env -S deno run -A

export const version = "v0.3.3";

if (import.meta.main) {
  console.log(version);
}
