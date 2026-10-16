import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { authorCatalog } from './lib/author-content.mjs'
import { contentFingerprint, readReleaseConfig, releaseProblems } from './lib/release.mjs'
const root = resolve(import.meta.dirname, '..'), catalog = authorCatalog(root), config = readReleaseConfig(root, process.argv[2]), issues = releaseProblems(config, catalog)
mkdirSync(resolve(root, 'dist'), { recursive: true })
writeFileSync(resolve(root, 'dist/release-readiness.json'), JSON.stringify({ ready: !issues.length, fingerprint: contentFingerprint(catalog), checkedAt: new Date().toISOString(), issues }, null, 2) + '\n')
if (issues.length) { console.error(`Release is not ready: ${issues.length} missing requirements. See dist/release-readiness.json and docs/release-checklist.md.`); process.exitCode = 1 }
else console.log('Release prerequisites pass. Run npm run build:release with this exact configuration, then validate the resulting native package before uploading.')
