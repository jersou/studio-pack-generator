#!/usr/bin/env -S deno run -A

export const version = "v0.2.9";

if (import.meta.main) {
  console.log(version);
}
