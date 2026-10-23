import { build } from 'esbuild'
import { createHash } from 'node:crypto'
import { gzipSync, gunzipSync } from 'node:zlib'
import { cpSync, copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { resolve, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readReleaseConfig, releaseProblems } from './lib/release.mjs'
import { catalogModule } from './lib/catalog-code.mjs'
import { authorCatalog } from './lib/author-content.mjs'
import { validationModule, writeJson } from './lib/compile.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const catalog = authorCatalog(root)
const release = process.argv.includes('--release'), configArg = process.argv.indexOf('--config'), releaseConfig = release ? readReleaseConfig(root, configArg >= 0 ? process.argv[configArg + 1] : undefined) : null
if (release) { const problems = releaseProblems(releaseConfig, catalog); if (problems.length) throw new Error('Release prerequisites are incomplete:\n' + problems.join('\n')) }
const distributionRoot = resolve(root, release ? 'dist/release' : 'dist')
const nativeRoot = release ? resolve(distributionRoot, 'miniprogram') : resolve(root, 'miniprogram')
const visualAssets = JSON.parse(readFileSync(resolve(root, 'content/visual-assets.json'), 'utf8')).assets
const illustrationPackages = [{ root: 'assets', name: 'app-artwork', pages: [] }, ...['illustrations', 'illustrations-2', 'illustrations-3', 'illustrations-4'].filter(root => visualAssets.some(a => a.file.startsWith(`miniprogram/${root}/`))).map(root => ({ root, name: `lesson-${root}`, pages: [] }))]
const { contentProblems } = await validationModule(root)
const errors = contentProblems(catalog)
if (errors.length) throw new Error(errors.join('\n'))
for (const asset of catalog.media.filter(a => a.approvedByOwner)) {
  const script = ['listening.json', 'course-listening.json'].flatMap(file => JSON.parse(readFileSync(resolve(root, 'content', file), 'utf8'))).flatMap(t => t.cases).find(t => `audio-${t.audioKey ?? t.id}` === asset.id)
  const source = resolve(root, 'content/audio', `${asset.id}.mp3`)
  const word = catalog.vocabulary.find(w => w.mediaId === asset.id), expectedTranscript = script?.transcript ?? (word ? `${word.word}. ${word.example}` : undefined)
  if (!expectedTranscript || expectedTranscript !== asset.transcript || !existsSync(source) || createHash('sha256').update(readFileSync(source)).digest('hex') !== asset.sha256) throw new Error(`Audio source/transcript/checksum does not match ${asset.id}`)
}

mkdirSync(resolve(root, 'src/generated'), { recursive: true })
const artworkFormats = Object.fromEntries(visualAssets.map(a => [a.id, a.file.split('.').at(-1)]))
if (Object.values(artworkFormats).some(format => !['png','jpg','webp'].includes(format))) throw Error('Unsupported registered artwork format')
writeFileSync(resolve(root, 'src/generated/artwork.ts'), `export const artworkFormats: Record<string,string> = ${JSON.stringify(artworkFormats)};\n`)
if (release) {
  rmSync(nativeRoot, { recursive: true, force: true })
  cpSync(resolve(root, 'miniprogram'), nativeRoot, { recursive: true, filter: (file) => !['content', 'audio', 'runtime.js', 'pack-loader.js'].includes(relative(resolve(root, 'miniprogram'), file).split(/[\\/]/)[0]) })
}
rmSync(resolve(distributionRoot, 'packs'), { recursive: true, force: true })
mkdirSync(resolve(distributionRoot, 'packs'), { recursive: true })
rmSync(resolve(nativeRoot, 'content'), { recursive: true, force: true })
rmSync(resolve(nativeRoot, 'audio'), { recursive: true, force: true })
if (!release && catalog.media.some(a => a.approvedByOwner)) { mkdirSync(resolve(nativeRoot, 'audio'), { recursive: true }); for (const asset of catalog.media.filter(a => a.approvedByOwner)) copyFileSync(resolve(root, 'content/audio', `${asset.id}.mp3`), resolve(nativeRoot, 'audio', `${asset.id}.mp3`)) }
const manifest = [], nativeGroups = [], nativePaths = new Map()
let groupBytes = 0
const nativeGroupBudget = 1_500_000
for (const topic of catalog.topics) {
  const questions = catalog.questions.filter((q) => q.topicId === topic.id)
  const text = JSON.stringify({ version: 1, topicId: topic.id, questions })
  const hash = createHash('sha256').update(text).digest('hex')
  const file = `${topic.id}-${hash.slice(0, 16)}.json`
  if (Buffer.byteLength(text) > 1_500_000) throw new Error(`${topic.id} exceeds the content pack budget`)
  writeFileSync(resolve(distributionRoot, 'packs', file), text)
  if (!release) {
    const compressed = gzipSync(text, { level: 9 })
    if (gunzipSync(compressed).toString('utf8') !== text) throw new Error(`${topic.id} compression changed its checked content`)
    const stored = { encoding: 'gzip-hex-v1', byteLength: Buffer.byteLength(text), data: compressed.toString('hex') }
    const moduleText = `module.exports = ${JSON.stringify(stored)};\n`, bytes = Buffer.byteLength(moduleText)
    if (bytes > nativeGroupBudget) throw new Error(`${topic.id} exceeds the native subpackage budget`)
    if (!nativeGroups.length || groupBytes + bytes > nativeGroupBudget) { nativeGroups.push(`content/group-${String(nativeGroups.length + 1).padStart(3, '0')}`); groupBytes = 0 }
    const group = nativeGroups[nativeGroups.length - 1], out = resolve(nativeRoot, group)
    mkdirSync(out, { recursive: true })
    writeFileSync(resolve(out, `${topic.id}.js`), moduleText)
    nativePaths.set(topic.id, `./${group}/${topic.id}.js`)
    groupBytes += bytes
  }
  manifest.push({ topicId: topic.id, sha256: hash, file, questionIds: questions.map((q) => q.id) })
}
const index = catalog.questions.map(({ id, topicId, skill, kind, difficulty, grades, marks, estimatedSeconds, mediaId, review, stem }) => ({ id, topicId, skill, kind, difficulty, grades, marks, estimatedSeconds, ...(mediaId ? { mediaId } : {}), ...(['speaking','writing'].includes(kind) ? { prompt: stem.replace(/\s+/g,' ').slice(0,24) + (stem.length > 24 ? '…' : '') } : {}), review }))
const metadata = { ...catalog, lessons:catalog.lessons.map(({visualMission,...lesson})=>lesson), questions: [], questionIndex: index, media: catalog.media.map(asset => ({ ...asset, transcript: '', ...(release ? { path: releaseConfig.mediaFiles[asset.id] } : {}) })) }
const runtime = { mode: release ? 'cloud' : 'development', cloudEnv: releaseConfig?.cloudEnv ?? '', contentFiles: releaseConfig?.contentFiles ?? {}, mediaFiles: releaseConfig?.mediaFiles ?? {} }
const generated = new Map()
generated.set(resolve(root, 'src/generated/runtime.ts'), `// Generated by npm run build. Do not edit.\nexport const runtime: { mode: 'development' | 'cloud'; cloudEnv: string; contentFiles: Record<string, string>; mediaFiles: Record<string, string> } = ${JSON.stringify(runtime)}\n`)
generated.set(resolve(root, 'src/generated/catalog.ts'), catalogModule(metadata))
generated.set(resolve(root, 'src/generated/packs.ts'), `// Generated by npm run build. Do not edit.\nimport type { PackDescriptor } from '../services/content'\nexport const packs: PackDescriptor[] = ${JSON.stringify(manifest)}\n`)
if (!release) for (const [file, text] of generated) writeFileSync(file, text)
const releaseOverrides = { name: 'release-catalog', setup(builder) { builder.onLoad({ filter: /generated[\\/](catalog|runtime|packs)\.ts$/ }, args => ({ contents: generated.get(args.path), loader: 'ts', resolveDir: dirname(args.path) })) } }
writeJson(resolve(distributionRoot, 'catalog.json'), metadata)
writeJson(resolve(distributionRoot, 'manifest.json'), manifest)
for (const artwork of illustrationPackages) {
  mkdirSync(resolve(nativeRoot, artwork.root), { recursive: true })
  // Requiring a module uses WeChat's documented asynchronous subpackage loader.
  writeFileSync(resolve(nativeRoot, artwork.root, 'index.js'), 'module.exports = true;\n')
}
writeFileSync(resolve(nativeRoot, 'pack-loader.js'), `const loaders = {\n${(release ? [] : manifest).map((p) => `  ${JSON.stringify(p.topicId)}: () => require.async(${JSON.stringify(nativePaths.get(p.topicId))}),`).join('\n')}\n};\nmodule.exports = { loadCatalog: async () => { ${illustrationPackages.map(p=>`await require.async(${JSON.stringify('./'+p.root+'/index.js')}).catch(() => { throw new Error('插图加载未完成，请重试。'); });`).join(' ')} return require.async('./content/catalog/index.js'); }, loadPack: (topicId) => { if (!loaders[topicId]) return Promise.reject(new Error('Unknown topic')); return loaders[topicId](); } };\n`)


mkdirSync(resolve(nativeRoot, 'content/catalog'), { recursive: true })
await build({ entryPoints: [resolve(root, 'src/generated/catalog.ts')], bundle: true, charset: 'utf8', format: 'cjs', platform: 'neutral', target: 'es2020', outfile: resolve(nativeRoot, 'content/catalog/index.js'), plugins: release ? [releaseOverrides] : [], minify: true })
if (statSync(resolve(nativeRoot, 'content/catalog/index.js')).size > 1_900_000) throw new Error('Catalog subpackage exceeds its budget')
if (existsSync(resolve(root, 'src/native/app.ts'))) {
  await build({ entryPoints: [resolve(root, 'src/native/app.ts')], bundle: true, charset: 'utf8', format: 'cjs', platform: 'neutral', target: 'es2020', outfile: resolve(nativeRoot, 'runtime.js'), plugins: release ? [releaseOverrides] : [], external: ['./pack-loader.js'], minify: true })
}
if (!release && existsSync(resolve(root, 'web/main.ts'))) {
  mkdirSync(resolve(root, 'dist/web'), { recursive: true })
  await build({ entryPoints: [resolve(root, 'web/main.ts')], bundle: true, charset: 'utf8', format: 'esm', platform: 'browser', target: 'es2020', outfile: resolve(root, 'dist/web/app.js'), sourcemap: true })
  writeFileSync(resolve(root, 'dist/web/index.html'), readFileSync(resolve(root, 'web/index.html')))
  const css = readFileSync(resolve(root, 'miniprogram/app.wxss'), 'utf8').replace(/([0-9.]+)rpx/g, (_, n) => `${Number(n) / 2}px`).replace(/page\{/g, 'body{')
  writeFileSync(resolve(root, 'dist/web/app.css'), css + '\nbody{margin:0}p,h1,h2,h3,h4{margin:0}span{display:block}button{cursor:pointer}button:disabled{cursor:default}input,select,textarea{font:inherit}select{color:inherit}label.field{display:block}textarea{resize:vertical}#toast{position:fixed;z-index:100;bottom:110px;left:24px;right:24px;max-width:420px;margin:auto;border-radius:14px;padding:16px;background:#18243a;color:white}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:3px solid #6b3fc4;outline-offset:3px}')
}
const appFile = resolve(nativeRoot, 'app.json')
if (existsSync(appFile)) {
  const app = JSON.parse(readFileSync(appFile, 'utf8'))
  if (nativeGroups.length + 1 + illustrationPackages.length > 100) throw new Error('WeChat allows at most 100 subpackages')
  app.subPackages = [{ root: 'content/catalog', name: 'course-catalog', pages: [] }, ...nativeGroups.map((group, i) => ({ root: group, name: `content-group-${i + 1}`, pages: [] })), ...illustrationPackages]
  writeJson(appFile, app)
  if (release) { const projectFile = resolve(root, 'project.config.json'); const project = JSON.parse(readFileSync(projectFile, 'utf8')); project.appid = releaseConfig.appid; delete project.cloudfunctionRoot; writeJson(resolve(distributionRoot, 'project.config.json'), project) }
}
function files(dir) { return existsSync(dir) ? readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? files(resolve(dir, e.name)) : [resolve(dir, e.name)]) : [] }
for (const p of illustrationPackages) if (files(resolve(nativeRoot,p.root)).reduce((n,f)=>n+statSync(f).size,0)>1_500_000) throw new Error('Lesson illustrations exceed their subpackage safety budget')
const mainFiles = files(nativeRoot).filter((f) => !['content/',...illustrationPackages.map(p=>p.root+'/')].some(prefix=>relative(nativeRoot, f).startsWith(prefix)))
const mainBytes = mainFiles.reduce((sum, f) => sum + statSync(f).size, 0)
const totalBytes = files(nativeRoot).reduce((sum, f) => sum + statSync(f).size, 0)
if (mainBytes > 1_900_000) throw new Error(`Main package is too large: ${mainBytes}`)
if (totalBytes > 19_000_000) throw new Error(`Development package is too large: ${totalBytes}`)
console.log(`Built ${catalog.lessons.length} lessons / ${catalog.questions.length} questions in ${manifest.length} checked topic packs.`)
writeJson(resolve(distributionRoot, 'package-budget.json'), { mode: release ? 'cloud' : 'development', mainBytes, totalBytes, topicPacks: manifest.length, questionCount: catalog.questions.length })
console.log(`Main package ${(mainBytes / 1024).toFixed(0)} KB; development package ${(totalBytes / 1024).toFixed(0)} KB.`)
