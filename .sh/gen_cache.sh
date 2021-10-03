#!/usr/bin/env bash
set -o errexit
d=$(dirname "$0")
cd "$d/.."

DENO_DIR=./.DENO_DIR deno cache --lock=.lock.json --lock-write studio_pack_generator.ts deps.ts test_deps.ts
DENO_DIR=./.DENO_DIR deno bundle --lock=.lock.json --lock-write studio_pack_generator.ts dist/studio_pack_generator.js

