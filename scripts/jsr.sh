#!/bin/sh
set -ex
rm dist --recursive --force
scripts/emit-jsr-ts.js
scripts/emit-jsr-json.js
