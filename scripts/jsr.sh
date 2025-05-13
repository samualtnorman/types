#!/bin/sh
set -ex
rm dist --recursive --force
scripts/emit-jsr-json.js
cp src/index.ts dist
