#!/usr/bin/env bash
set -o errexit
d=$(dirname "$0")
cd "$d/.."

rm -f dist/*
mkdir -p dist/

deno compile --target x86_64-unknown-linux-gnu --allow-all --output dist/studio-pack-generator-x86_64-linux --unstable ./studio_pack_generator.ts
(cd dist && zip -r studio-pack-generator-x86_64-linux.zip studio-pack-generator-x86_64-linux)
rm dist/studio-pack-generator-x86_64-linux

deno compile --target x86_64-pc-windows-msvc   --allow-all --output dist/studio-pack-generator-x86_64-windows --unstable ./studio_pack_generator.ts
(cd dist && zip -r studio-pack-generator-x86_64-windows.zip studio-pack-generator-x86_64-windows.exe)
rm dist/studio-pack-generator-x86_64-windows.exe

deno compile --target x86_64-apple-darwin      --allow-all --output dist/studio-pack-generator-x86_64-apple --unstable ./studio_pack_generator.ts
(cd dist && zip -r studio-pack-generator-x86_64-apple.zip studio-pack-generator-x86_64-apple)
rm dist/studio-pack-generator-x86_64-apple

deno compile --target aarch64-apple-darwin     --allow-all --output dist/studio-pack-generator-aarch64-apple --unstable ./studio_pack_generator.ts
(cd dist && zip -r studio-pack-generator-aarch64-apple.zip studio-pack-generator-aarch64-apple)
rm dist/studio-pack-generator-aarch64-apple

