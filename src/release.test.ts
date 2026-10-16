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
