import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
const files = ['project.config.json', 'src/generated/catalog.ts', 'src/generated/runtime.ts', 'miniprogram/runtime.js', 'miniprogram/app.json', 'miniprogram/pack-loader.js']
const digest = file => createHash('sha256').update(readFileSync(file)).digest('hex'), before = new Map(files.map(file => [file, digest(file)]))
mkdirSync('test-results', { recursive: true })
const config = 'test-results/empty-release-config.json', reportFile = 'test-results/release-readiness-negative.json'
writeFileSync(config, '{}\n')
const check = spawnSync(process.execPath, ['scripts/check-release.mjs', config, '--output', reportFile], { encoding: 'utf8' })
assert.equal(check.status, 1, 'The unconfigured checkout must not claim release readiness')
const report = JSON.parse(readFileSync(reportFile, 'utf8'))
assert.equal(report.ready, false); assert(report.issues.some(issue => issue.includes('AppID')))
const build = spawnSync(process.execPath, ['scripts/build.mjs', '--release', '--config', config], { encoding: 'utf8' })
assert.notEqual(build.status, 0, 'Release compilation must stop before replacing development output')
assert(build.stderr.includes('Release prerequisites are incomplete'))
for (const file of files) assert.equal(digest(file), before.get(file), `Blocked release changed ${file}`)
mkdirSync('test-results', { recursive: true })
writeFileSync('test-results/release-guards.json', JSON.stringify({ guardChecks: 'passed', emptyFixtureReady: false, missingRequirements: report.issues.length, fingerprint: report.fingerprint }, null, 2) + '\n')
console.log(`Release guards correctly reject ${report.issues.length} missing requirements and leave development artifacts unchanged. Actual release readiness is checked separately.`)
