import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
const root = resolve(import.meta.dirname, '..'), config = JSON.parse(readFileSync(resolve(root, 'content/audio-policy.json'), 'utf8'))
if (config.source !== 'openai' || !config.model || !config.voice || !config.ownerApproval) {
  console.error('Audio preparation is waiting for the owner\'s source/model choice. Record that actual choice in content/audio-policy.json; never fill it by inference. No request was sent.'); process.exit(2)
}
if (!process.env.AUDIO_API_KEY) { console.error('Set AUDIO_API_KEY securely in environment settings. No request was sent.'); process.exit(2) }
const output = resolve(root, 'content/audio'); mkdirSync(output, { recursive: true })
const records = JSON.parse(readFileSync(resolve(root, 'content/listening.json'), 'utf8')).flatMap(topic => topic.cases)
if (process.argv.includes('--vocabulary')) records.push(...readFileSync(resolve(root, 'content/vocabulary.tsv'), 'utf8').split('\n').filter(line => line && !line.startsWith('#')).map(line => { const [, word, , example] = line.split('|'); return { id: `word-${word}`, transcript: `${word}. ${example}` } }))
const existing = existsSync(resolve(root, 'content/audio-manifest.json')) ? JSON.parse(readFileSync(resolve(root, 'content/audio-manifest.json'), 'utf8')) : [], manifest = []
for (const task of records) {
  const id = `audio-${task.id}`, file = `${id}.mp3`, path = resolve(output, file)
  const prior = existing.find(a => a.id === id && a.transcript === task.transcript && a.model === config.model && a.voice === config.voice)
  if (prior && existsSync(path) && createHash('sha256').update(readFileSync(path)).digest('hex') === prior.sha256) { manifest.push(prior); continue }
  const response = await fetch('https://api.openai.com/v1/audio/speech', { method: 'POST', headers: { Authorization: `Bearer ${process.env.AUDIO_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: config.model, voice: config.voice, input: task.transcript, response_format: 'mp3', ...(config.model.includes('gpt-4o') ? { instructions: 'Read this original junior-high English listening task clearly at a natural, moderate pace. Pause briefly between speakers. Do not read the speaker labels. Do not add words.' } : {}) }) })
  if (!response.ok) throw new Error(`Audio service returned HTTP ${response.status}. No credential or response body is logged.`)
  const raw = Buffer.from(await response.arrayBuffer())
  if (!raw.length || raw.length > 10_000_000) throw new Error(`Invalid audio size for ${id}`)
  const temporary = resolve(output, `${id}.source.mp3`); writeFileSync(temporary, raw)
  const result = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', temporary, '-codec:a', 'libmp3lame', '-b:a', '48k', '-ac', '1', path], { encoding: 'utf8' })
  if (result.status !== 0) throw new Error(`Audio conversion failed for ${id}. Install ffmpeg; do not discard the source recording.`)
  const { unlinkSync } = await import('node:fs'); unlinkSync(temporary)
  manifest.push({ id, path: `/audio/${file}`, transcript: task.transcript, voice: config.voice, model: config.model, license: 'Project-original script; generated using the owner-selected service under its applicable terms.', sha256: createHash('sha256').update(readFileSync(path)).digest('hex'), approvedByOwner: true })
  // Save each successful clip so an interrupted run can resume without paying twice.
  writeFileSync(resolve(root, 'content/audio-manifest.json'), JSON.stringify([...existing.filter(a => !manifest.some(m => m.id === a.id)), ...manifest], null, 2) + '\n')
  console.log(`Prepared ${id}`)
}
writeFileSync(resolve(root, 'content/audio-manifest.json'), JSON.stringify([...existing.filter(a => !manifest.some(m => m.id === a.id)), ...manifest], null, 2) + '\n')
console.log(`Prepared ${manifest.length} clips. Listen and review before release, then run npm run build.`)
