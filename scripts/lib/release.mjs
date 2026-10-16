import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
export function contentFingerprint(catalog) {
  return createHash('sha256').update(JSON.stringify({ questions: catalog.questions, lessons: catalog.lessons, vocabulary: catalog.vocabulary, media: catalog.media, books: catalog.books, blueprints: catalog.blueprints })).digest('hex')
}
export function releaseProblems(config, catalog) {
  const errors = [], fileID = value => typeof value === 'string' && /^cloud:\/\/[a-zA-Z0-9._-]+\/[a-zA-Z0-9._/-]+$/.test(value) && !value.includes('..')
  if (!config || !/^wx[0-9a-f]{16}$/.test(config.appid ?? '')) errors.push('The owner\'s real WeChat AppID is missing.')
  if (!config || typeof config.cloudEnv !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9-]{5,100}$/.test(config.cloudEnv) || /REPLACE|example|placeholder/i.test(config.cloudEnv)) errors.push('The owner\'s CloudBase environment is missing.')
  for (const topic of catalog.topics) if (!fileID(config?.contentFiles?.[topic.id])) errors.push(`Cloud content file ID is missing for ${topic.id}.`)
  for (const asset of catalog.media) {
    if (!asset.approvedByOwner || !asset.sha256 || !asset.model || !asset.voice || !asset.license) errors.push(`Approved audio is missing for ${asset.id}.`)
    if (!fileID(config?.mediaFiles?.[asset.id])) errors.push(`Cloud audio file ID is missing for ${asset.id}.`)
  }
  const fingerprint = contentFingerprint(catalog)
  if (!config?.editorialApproval || config.editorialApproval.fingerprint !== fingerprint || typeof config.editorialApproval.approvedBy !== 'string' || !config.editorialApproval.approvedBy.trim() || !Number.isFinite(Date.parse(config.editorialApproval.at))) errors.push('An editorial release approval matching the current content fingerprint is missing.')
  if (!config?.nativeValidation || typeof config.nativeValidation.evidence !== 'string' || !config.nativeValidation.evidence.trim() || !Number.isFinite(Date.parse(config.nativeValidation.at)) || config.nativeValidation.realDevice !== true) errors.push('WeChat DevTools and real-device evidence are missing.')
  if (config?.privacyConfigured !== true) errors.push('The WeChat platform privacy declaration is not confirmed.')
  return errors
}
export function readReleaseConfig(root, path) { const file = resolve(root, path || '.local/release.json'); if (!existsSync(file)) return null; try { return JSON.parse(readFileSync(file, 'utf8')) } catch { throw new Error('Release configuration is not valid JSON. No configuration values are logged.') } }
