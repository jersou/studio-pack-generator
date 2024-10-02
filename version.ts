#!/usr/bin/env -S deno run -A

export const version = "v0.4.4";

if (import.meta.main) {
  console.log(version);
}
