#!/usr/bin/env bash

rm -f dist/*.zip || true
mkdir -p dist/
version=$(./version.ts)

for i in \
         x86_64-unknown-linux-gnu,x86_64-linux \
         x86_64-apple-darwin,x86_64-apple \
         aarch64-apple-darwin,aarch64-apple \
         x86_64-pc-windows-msvc,x86_64-windows ; do
  IFS=","
  set -- $i
  deno compile --target $1 --allow-all --output dist/studio-pack-generator-$2 --unstable ./studio_pack_generator.ts --is-compiled
  if [[ "$1" = "x86_64-pc-windows-msvc" ]] ; then
    rm -rf dist/Studio-Pack-Generator
    mkdir dist/Studio-Pack-Generator
    cp -a tools/ dist/studio-pack-generator-x86_64-windows.exe dist/Studio-Pack-Generator/
    (cd dist && zip -r studio-pack-generator-$version-x86_64-windows.zip Studio-Pack-Generator/)
    rm dist/studio-pack-generator-x86_64-windows.exe
    rm -rf dist/Studio-Pack-Generator
  else
    (cd dist && zip -r studio-pack-generator-$version-$2.zip studio-pack-generator-$2)
    rm dist/studio-pack-generator-$2
  fi
done
