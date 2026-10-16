import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { authorCatalog } from './lib/author-content.mjs'
import { contentFingerprint, readReleaseConfig, releaseProblems } from './lib/release.mjs'
const root = resolve(import.meta.dirname, '..'), catalog = authorCatalog(root), config = readReleaseConfig(root, process.argv[2]), issues = releaseProblems(config, catalog)
const outputIndex = process.argv.indexOf('--output'), output = outputIndex >= 0 ? resolve(root, process.argv[outputIndex + 1]) : resolve(root, 'dist/release-readiness.json')
mkdirSync(dirname(output), { recursive: true })
writeFileSync(output, JSON.stringify({ ready: !issues.length, fingerprint: contentFingerprint(catalog), checkedAt: new Date().toISOString(), issues }, null, 2) + '\n')
if (issues.length) { console.error(`Release is not ready: ${issues.length} missing requirements. See the readiness JSON report and docs/release-checklist.md.`); process.exitCode = 1 }
else console.log('Release prerequisites pass. Run npm run build:release with this exact configuration, then validate the resulting native package before uploading.')
