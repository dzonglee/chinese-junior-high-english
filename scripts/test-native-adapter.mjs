// Runs the built WeChat CommonJS adapter against deterministic API doubles. This is not DevTools.
import assert from 'node:assert/strict'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import vm from 'node:vm'
import { build } from 'esbuild'
const root = resolve(import.meta.dirname, '../miniprogram'), local = resolve(import.meta.dirname, '../.local/native-adapter-test')
mkdirSync(local, { recursive: true })
const manifest = JSON.parse(readFileSync(resolve(root, '../dist/manifest.json'), 'utf8'))
const cloudFileMap = Object.fromEntries(manifest.map(p => [p.topicId, `cloud://synthetic-test-env/${p.file}`]))
writeFileSync(resolve(local, 'pack-loader.js'), 'module.exports = { loadPack: () => { throw new Error("Cloud mode must not read packaged questions") } };')
await build({ entryPoints: [resolve(root, '../src/native/app.ts')], bundle: true, format: 'cjs', platform: 'neutral', target: 'es2020', outfile: resolve(local, 'runtime.cjs'), external: ['./pack-loader.js'], plugins: [{ name: 'synthetic-cloud-runtime', setup(builder) { builder.onLoad({ filter: /generated[\\/]runtime\.ts$/ }, () => ({ contents: `export const runtime = ${JSON.stringify({ mode: 'cloud', cloudEnv: 'synthetic-test-env', contentFiles: cloudFileMap, mediaFiles: {} })}`, loader: 'ts' })) } }] })
for (const mode of ['development', 'cloud']) {
const data = new Map(), navigations = [], errors = []
let privacyListener, privacyValue, topPage
let cloudInitialised = false, cloudDownloads = 0
const wx = {
  cloud: { init(options) { assert.equal(options.env, 'synthetic-test-env'); cloudInitialised = true }, async downloadFile({ fileID }) { cloudDownloads++; const file = manifest.find(p => cloudFileMap[p.topicId] === fileID); assert(file); return { tempFilePath: resolve(root, '../dist/packs', file.file) } } },
  getFileSystemManager: () => ({ readFile(options) { try { options.success({ data: readFileSync(options.filePath, 'utf8') }) } catch { options.fail() } } }),
  getStorageSync: key => data.get(key) || '', setStorageSync: (key, value) => data.set(key, value), removeStorageSync: key => data.delete(key),
  onNeedPrivacyAuthorization: callback => { privacyListener = callback },
  reLaunch: options => navigations.push(options.url), redirectTo: options => navigations.push(options.url), navigateTo: options => navigations.push(options.url),
  showToast: options => errors.push(options.title), showModal: options => options.success({ confirm: true }),
}
const context = vm.createContext({ wx, console, getCurrentPages: () => topPage ? [topPage] : [], TextEncoder: undefined, TextDecoder: undefined })
function load(file) {
  assert(file.startsWith(root + '/') || file.startsWith(local + '/'), 'The test loader must stay inside the mini-program package')
  const source = readFileSync(file, 'utf8'), module = { exports: {} }
  const require = path => load(resolve(dirname(file), path))
  require.async = async path => load(resolve(dirname(file), path))
  const wrapper = vm.runInContext(`(function(require,module,exports){${source}\n})`, context, { filename: file })
  wrapper(require, module, module.exports); return module.exports
}
const { application: app, ready } = load(mode === 'cloud' ? resolve(local, 'runtime.cjs') : resolve(root, 'runtime.js')); await ready
app.open('home'); assert.equal(app.render().id, 'onboarding')
for (const [name, value] of Object.entries({ cityId: '河南-郑州', structure: '63', grade: '7', term: 'upper', editionId: 'pep-2024', schoolYear: '2026', dailyMinutes: '15' })) app.setField(name, value)
await app.action('save-profile'); assert(navigations.at(-1).startsWith('/pages/home/index'))
app.open('home'); await app.action('start-lesson', 'l-g-be'); assert(navigations.at(-1).startsWith('/pages/session/index'))
app.open('session'); assert.equal(app.render().question.stem, 'Mia _____ ready for the school trip.')
await app.action('choose', 'a'); await app.action('check'); assert.equal(app.state.attempts[0].correct, true); assert(app.render().question.explanation)
assert(data.get('cjhe.state.v1').includes('q-g-be-001')); assert.equal(errors.length, 0)
privacyListener(value => { privacyValue = value }); assert.equal(privacyValue.event, 'disagree')
let requested = false
privacyValue = null; topPage = { selectComponent: id => { assert.equal(id, '#shell'); return { requestPrivacy: resolve => { requested = true; resolve({ event: 'agree', buttonId: 'privacy-agree' }) } } } }
privacyListener(value => { privacyValue = value }); assert(requested); assert.equal(privacyValue.buttonId, 'privacy-agree')
if (mode === 'cloud') { assert(cloudInitialised); assert(cloudDownloads > 0) } else { assert(!cloudInitialised); assert.equal(cloudDownloads, 0) }
console.log(`${mode} native-adapter simulation passed.`)
}
console.log('Native-adapter simulation passed: CommonJS startup, async subpackage/hash loading without DOM encoders, profile, answer, storage and privacy routing.')
console.log('This does not replace WeChat DevTools or real-device validation.')
