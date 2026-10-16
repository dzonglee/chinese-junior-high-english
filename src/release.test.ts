import { describe, expect, it } from 'vitest'
import { contentFingerprint, releaseProblems } from '../scripts/lib/release.mjs'
import { catalog } from './test-fixtures'

describe('release requirements (synthetic configuration only)', () => {
  function synthetic() {
    const c = catalog()
    const config = { appid: 'wx0000000000000000', cloudEnv: 'synthetic-test-env', contentFiles: { 'g-be': 'cloud://synthetic-test-env/g-be.json' }, mediaFiles: {}, editorialApproval: { fingerprint: contentFingerprint(c), approvedBy: 'Synthetic test fixture; not an actual approval', at: '2026-10-16T00:00:00Z' }, nativeValidation: { evidence: 'Synthetic test fixture; not real device evidence', at: '2026-10-16T00:00:00Z', realDevice: true }, privacyConfigured: true }
    return { c, config }
  }
  it('rejects tourist IDs and incomplete cloud configuration', () => {
    const { c, config } = synthetic(); config.appid = 'touristappid'; config.contentFiles = {}
    expect(releaseProblems(config, c).join(' ')).toContain('real WeChat AppID'); expect(releaseProblems(config, c).join(' ')).toContain('Cloud content file ID')
  })
  it('invalidates approval after any question change', () => {
    const { c, config } = synthetic(); c.questions[0].stem = 'Changed content'
    expect(releaseProblems(config, c).join(' ')).toContain('matching the current content fingerprint')
  })
  const metadataChanges: [string, (c: ReturnType<typeof catalog>) => void][] = [
    ['edition spelling', c => { c.editions[0].spelling = 'british' }],
    ['edition structures', c => { c.editions[0].structures = ['54'] }],
    ['edition wording', c => { c.editions[0].name = 'Revised edition label' }],
    ['topic grades', c => { c.topics[0].grades = [9] }],
    ['topic ordering', c => { c.topics[0].order = 2 }],
    ['topic wording', c => { c.topics[0].title = 'Revised topic label' }],
    ['city wording', c => { c.cities[0].name = 'Revised city label' }],
    ['city routing', c => { c.cities[0].stream = 'south' }],
    ['catalog version', c => { c.version = 2 }],
  ]
  it.each(metadataChanges)('invalidates prior approval after changing %s', (_name, change) => {
    const { c, config } = synthetic(); change(c)
    expect(releaseProblems(config, c).join(' ')).toContain('matching the current content fingerprint')
  })
  it('keeps approval stable when only JSON object property order changes', () => {
    const { c, config } = synthetic()
    const reordered = JSON.parse(JSON.stringify(c, (_key, value) => value && typeof value === 'object' && !Array.isArray(value)
      ? Object.fromEntries(Object.keys(value).reverse().map(key => [key, value[key]])) : value))
    expect(contentFingerprint(reordered)).toBe(contentFingerprint(c)); expect(releaseProblems(config, reordered)).toEqual([])
  })
  it('invalidates approval when a meaningful array order changes', () => {
    const { c, config } = synthetic(); c.lessons[0].questionIds.reverse()
    expect(contentFingerprint(c)).not.toBe(config.editorialApproval.fingerprint)
  })
  it('rejects missing native and privacy evidence', () => {
    const { c, config } = synthetic(); config.nativeValidation.realDevice = false; config.privacyConfigured = false
    expect(releaseProblems(config, c).join(' ')).toContain('real-device'); expect(releaseProblems(config, c).join(' ')).toContain('privacy')
  })
  it('never treats a script as approved playable audio', () => {
    const { c, config } = synthetic(); c.media.push({ id: 'audio-one', transcript: 'Original script.', path: '', model: '', voice: '', sha256: '', license: '', approvedByOwner: false })
    expect(releaseProblems(config, c).join(' ')).toContain('Approved audio is missing')
  })
  it('accepts the complete synthetic schema without claiming actual release readiness', () => {
    const { c, config } = synthetic(); expect(releaseProblems(config, c)).toEqual([])
  })
})
