#!/usr/bin/env -S deno run -A

export const version = "v0.3.2";

if (import.meta.main) {
  console.log(version);
}
