#!/bin/sh
set -ex
rm dist --recursive --force
scripts/tsc.sh
scripts/emit-package-json.js
cp readme.md dist
