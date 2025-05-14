#!/usr/bin/env node
import { mkdirSync as makeDirectorySync, readFileSync, writeFileSync } from "fs"

const readme = readFileSync(`readme.md`, { encoding: `utf8` })
const ts = readFileSync(`src/index.ts`, { encoding: `utf8` })

makeDirectorySync("dist", { recursive: true })
writeFileSync(`dist/index.ts`, `/**\n * ${readme.trim().replaceAll(`*/`, `\u200D`).replaceAll(`\n`, `\n * `)}\n * @module\n */\n\n${ts}`)
