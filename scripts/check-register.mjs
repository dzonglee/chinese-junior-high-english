#!/usr/bin/env node
// Validate a Stage 1 unit folder (or all of them) against reference/source-register/resource-schema.json.
// Usage: node scripts/check-register.mjs [reference/source-register/<unit folder> …]
// No dependencies: checks required fields, enums, consts and patterns, id uniqueness, that
// downloaded files exist with the recorded size and SHA-256, and coverage cells against the roster.
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const REG = join(ROOT, 'reference/source-register')
const schema = JSON.parse(readFileSync(join(REG, 'resource-schema.json'), 'utf8')).$defs
const roster = new Set(JSON.parse(readFileSync(join(REG, 'cities/roster.json'), 'utf8')).cities.map((c) => c.city_id))
const problems = []
const fail = (where, msg) => problems.push(`${where}: ${msg}`)

function check(def, rec, where) {
  for (const k of def.required ?? []) if (rec[k] === undefined) fail(where, `missing ${k}`)
  for (const [k, p] of Object.entries(def.properties ?? {})) {
    const v = rec[k]
    if (v === undefined) continue
    if (p.enum && !p.enum.includes(v)) fail(where, `${k} "${v}" is not one of ${p.enum.join(' | ')}`)
    if ('const' in p && v !== p.const) fail(where, `${k} must be ${JSON.stringify(p.const)}`)
    if (p.pattern && !new RegExp(p.pattern).test(String(v))) fail(where, `${k} "${v}" doesn't match ${p.pattern}`)
    if (p.type === 'array' && !Array.isArray(v)) fail(where, `${k} must be an array`)
    if (p.type === 'integer' && !Number.isInteger(v)) fail(where, `${k} must be an integer`)
    if (p.minLength && String(v).length < p.minLength) fail(where, `${k} is too short`)
  }
}

const read = (f) => (existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null)
const dirs = process.argv.slice(2).length
  ? process.argv.slice(2).map((d) => resolve(d))
  : readdirSync(REG).map((d) => join(REG, d)).filter((d) => statSync(d).isDirectory() && !/cities|integration/.test(d))
const sourceIds = new Set()
let n = { sources: 0, files: 0, cells: 0 }
for (const dir of dirs) {
  const name = dir.split('/').pop()
  const sources = read(join(dir, 'sources.json')) ?? []
  for (const s of sources) {
    check(schema.source, s, `${name}/sources.json ${s.source_id ?? '?'}`)
    if (sourceIds.has(s.source_id)) fail(name, `duplicate source_id ${s.source_id}`)
    sourceIds.add(s.source_id)
    for (const c of s.cities ?? []) if (!roster.has(c)) fail(`${name} ${s.source_id}`, `unknown city_id ${c} (use roster.json ids, e.g. 广东-广州)`)
    n.sources++
  }
  for (const f of read(join(dir, 'download_manifest.json')) ?? []) {
    const where = `${name}/download_manifest.json ${f.file_id ?? '?'}`
    check(schema.file, f, where)
    if (!sourceIds.has(f.source_id) && !sources.some((s) => s.source_id === f.source_id)) fail(where, `unknown source_id ${f.source_id}`)
    const p = join(ROOT, 'reference', f.relative_path ?? '')
    if (!existsSync(p)) fail(where, `file missing: reference/${f.relative_path}`)
    else {
      const buf = readFileSync(p)
      if (buf.subarray(0, 40).toString().startsWith('version https://git-lfs')) continue // LFS pointer in a light checkout
      if (buf.length !== f.bytes) fail(where, `bytes ${buf.length} ≠ recorded ${f.bytes}`)
      if (createHash('sha256').update(buf).digest('hex') !== f.sha256) fail(where, 'sha256 mismatch')
    }
    n.files++
  }
  for (const c of read(join(dir, 'coverage.json')) ?? []) {
    check(schema.coverage_cell, c, `${name}/coverage.json ${c.city_id}-${c.year}-${c.resource}`)
    if (!roster.has(c.city_id)) fail(`${name}/coverage.json`, `unknown city_id ${c.city_id}`)
    n.cells++
  }
}
if (problems.length) {
  console.error(`register check failed (${problems.length}):\n  ` + problems.slice(0, 200).join('\n  '))
  process.exit(1)
}
console.log(`register check passed: ${n.sources} sources, ${n.files} files, ${n.cells} coverage cells in ${dirs.length} folder(s)`)
