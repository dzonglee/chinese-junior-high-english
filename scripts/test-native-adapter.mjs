// Runs the built WeChat CommonJS adapter against deterministic API doubles. This is not DevTools.
import assert from 'node:assert/strict'
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import vm from 'node:vm'
import { build } from 'esbuild'
const root = resolve(import.meta.dirname, '../miniprogram'), local = resolve(import.meta.dirname, '../.local/native-adapter-test')
mkdirSync(local, { recursive: true })
const manifest = JSON.parse(readFileSync(resolve(root, '../dist/manifest.json'), 'utf8'))
const cloudFileMap = Object.fromEntries(manifest.map(p => [p.topicId, `cloud://synthetic-test-env/${p.file}`]))
writeFileSync(resolve(local, 'pack-loader.js'), `module.exports = { loadCatalog: () => require('../../miniprogram/pack-loader.js').loadCatalog(), loadPack: () => { throw new Error('Cloud mode must not read packaged questions') } };`)
await build({ entryPoints: [resolve(root, '../src/native/app.ts')], bundle: true, format: 'cjs', platform: 'neutral', target: 'es2020', outfile: resolve(local, 'runtime.cjs'), external: ['./pack-loader.js'], plugins: [{ name: 'synthetic-cloud-runtime', setup(builder) { builder.onLoad({ filter: /generated[\\/]runtime\.ts$/ }, () => ({ contents: `export const runtime = ${JSON.stringify({ mode: 'cloud', cloudEnv: 'synthetic-test-env', contentFiles: cloudFileMap, mediaFiles: {} })}`, loader: 'ts' })) } }] })
for (const mode of ['development', 'cloud']) {
const data = new Map(), navigations = [], errors = [], pendingNavigation = []
let privacyListener, privacyValue, topPage
let cloudInitialised = false, cloudDownloads = 0, artworkLoaded = new Set(), failArtwork = false, artworkRequests = 0
const wx = {
  cloud: { init(options) { assert.equal(options.env, 'synthetic-test-env'); cloudInitialised = true }, async downloadFile({ fileID }) { cloudDownloads++; const file = manifest.find(p => cloudFileMap[p.topicId] === fileID); assert(file); return { tempFilePath: resolve(root, '../dist/packs', file.file) } } },
  getFileSystemManager: () => ({ readFile(options) { try { options.success({ data: readFileSync(options.filePath, 'utf8') }) } catch { options.fail() } } }),
  getStorageSync: key => data.get(key) || '', setStorageSync: (key, value) => data.set(key, value), removeStorageSync: key => data.delete(key),
  onNeedPrivacyAuthorization: callback => { privacyListener = callback },
  reLaunch: options => navigations.push(options.url), redirectTo: options => navigations.push(options.url), navigateTo: options => { navigations.push(options.url); pendingNavigation.push(options) },
  showToast: options => errors.push(options.title), hideToast() {}, showModal: options => options.success({ confirm: true }),
}
const context = vm.createContext({ wx, console, getCurrentPages: () => topPage ? [topPage] : [], TextEncoder: undefined, TextDecoder: undefined })
function load(file, scope=context) {
  assert(file.startsWith(root + '/') || file.startsWith(local + '/'), 'The test loader must stay inside the mini-program package')
  const source = readFileSync(file, 'utf8'), module = { exports: {} }
  const require = path => load(resolve(dirname(file), path), scope)
  require.async = async path => { if(['./assets/index.js','./illustrations/index.js','./illustrations-2/index.js'].includes(path)){artworkRequests++;if(failArtwork===path)throw new Error('Simulated subpackage download failure');const app=JSON.parse(readFileSync(resolve(root,'app.json'),'utf8'));assert(app.subPackages.some(p=>p.root===path.split('/')[1]));await new Promise(resolve=>setTimeout(resolve,5));artworkLoaded.add(path)}return load(resolve(dirname(file), path), scope) }
  const wrapper = vm.runInContext(`(function(require,module,exports){${source}\n})`, scope, { filename: file })
  wrapper(require, module, module.exports); return module.exports
}
const adapter = load(mode === 'cloud' ? resolve(local, 'runtime.cjs') : resolve(root, 'runtime.js')); await adapter.ready; const app = adapter.application
assert.deepEqual([...artworkLoaded],['./assets/index.js','./illustrations/index.js','./illustrations-2/index.js'],'Application readiness must wait for all registered artwork subpackages')
app.open('home'); assert.equal(app.render().id, 'onboarding')
for (const [name, value] of Object.entries({ cityId: '河南-郑州', structure: '63', grade: '7', term: 'upper', editionId: 'pep-2024', schoolYear: '2026', dailyMinutes: '15' })) app.setField(name, value)
await app.action('save-profile'); assert(navigations.at(-1).startsWith('/pages/home/index'))
app.open('home'); await app.action('start-lesson', 'l-g-be'); assert(navigations.at(-1).startsWith('/pages/session/index'))
app.open('session'); assert.equal(app.render().question.stem, 'Mia _____ ready for the class photo.')
await app.action('choose', 'a'); await app.action('check'); assert.equal(app.state.attempts[0].correct, true); assert(app.render().question.explanation)
assert(data.get('cjhe.state.v1').includes('q-g-be-001')); assert.equal(errors.length, 0)
privacyListener(value => { privacyValue = value }); assert.equal(privacyValue.event, 'disagree')
let requested = false
privacyValue = null; topPage = { selectComponent: id => { assert.equal(id, '#shell'); return { requestPrivacy: resolve => { requested = true; resolve({ event: 'agree', buttonId: 'privacy-agree' }) } } } }
privacyListener(value => { privacyValue = value }); assert(requested); assert.equal(privacyValue.buttonId, 'privacy-agree')
await app.content.ensureTopics(manifest.map(p=>p.topicId)); assert.equal(app.catalog.questions.length, manifest.reduce((n,p)=>n+p.questionIds.length,0), 'Every native packed topic must load and pass its hash, not only the first topic')
const nativeArt=new Set()
for(const q of app.catalog.questions){const w=q.visualMission?.workshop;if(!w)continue;for(const condition of w.conditions??[]){const scene=condition.world.scene,records=condition.world.records;const preview=condition.world.selection?.preview;if(preview)nativeArt.add(`illustrations/${preview.asset}.jpg`);if(scene)nativeArt.add(`${scene.assetRoot??'assets'}/${scene.asset}.jpg`);if(records?.asset)nativeArt.add(`${records.assetRoot??'assets'}/${records.asset}.jpg`)}for(const item of w.items??[]){if(item.wordDecision?.quantity?.unitArt)nativeArt.add(`illustrations-2/${item.wordDecision.quantity.unitArt}.png`);if(item.wordDecision?.art)nativeArt.add(`${item.wordDecision.art.assetRoot??'illustrations-2'}/${item.wordDecision.art.asset}.jpg`);if(item.sourceArt)nativeArt.add(`${item.sourceArt.assetRoot??'illustrations'}/${item.sourceArt.asset}.jpg`)}}
for(const file of nativeArt)assert(existsSync(resolve(root,file)),`Native lesson artwork is missing at its resolved path: ${file}`)
assert(nativeArt.has('illustrations/lesson-four-player-team.jpg'),'The authored four-player scene must resolve through the illustration subpackage')
assert(nativeArt.has('illustrations/lesson-project-noticeboard.jpg'),'The masking preview must resolve through the illustration subpackage')
assert(nativeArt.has('illustrations-2/lesson-birdwatch-actions.jpg'),'The binocular/feeding action comparison must resolve through the third artwork root')
assert(nativeArt.has('illustrations-2/lesson-study-table.jpg'),'The individual vocabulary decision must resolve its registered study-table artwork')
assert(nativeArt.has('illustrations-2/count-unit-seedling.png'),'The transparent counting unit must resolve through the registered third artwork root')
assert.deepEqual([...readFileSync(resolve(root,'illustrations-2/count-unit-seedling.png')).subarray(0,8)],[137,80,78,71,13,10,26,10],'The counting unit must retain PNG bytes rather than a JPEG extension alias')
// Exercise the actual Application field route in both native package modes.
app.open('lesson',{id:'l-ls-course-t04'});await app.action('studio-answer',app.render().teaching.lesson.prediction.answer.option);await app.action('studio-check');await app.action('studio-next');await app.action('studio-workshop-item','2');
assert.equal(app.render().teaching.workshop.recall.phase,'study');await app.action('studio-workshop-recall-hide');
for(const [id,value]of [['map','mappp'],['bridge','不记得'],['corner','corner']])app.setField('studioRecall-'+id,value);
await app.action('studio-workshop-recall-reveal');assert.equal(app.render().teaching.workshop.recall.phase,'compare');assert.equal(app.render().teaching.workshop.recall.rows[0].attempt,'mappp');assert.equal(app.render().teaching.workshop.recall.rows[0].same,false);
app.setField('studioRecall-map','MAP');assert.equal(app.render().teaching.workshop.recall.phase,'recall');assert(app.render().teaching.workshop.recall.rows.every(w=>w.answer===''));assert.equal(app.state.attempts.length,1,'Guided recall adds no independent attempt');
app.open('lesson',{id:'l-ls-course-t05'});await app.action('studio-answer',app.render().teaching.lesson.prediction.answer.option);await app.action('studio-check');await app.action('studio-next');await app.action('studio-workshop-item',String(app.render().teaching.lesson.mission.workshop.items.findIndex(i=>!!i.sourceSettings)));
await app.action('studio-workshop-setting','calls:off');await app.action('studio-workshop-setting','alerts:off');await app.action('studio-workshop-settings-check');assert.equal(app.render().teaching.workshop.settings.correct,false);assert.equal(app.render().teaching.workshop.settings.rows[0].value,'off');assert.equal(app.render().teaching.workshop.settings.rows[1].correct,true);
await app.action('studio-workshop-setting','calls:on');assert.equal(app.render().teaching.workshop.settings.checked,false);await app.action('studio-workshop-settings-check');assert.equal(app.render().teaching.workshop.settings.correct,true);assert.equal(app.render().teaching.workshop.complete,false);assert.equal(app.state.attempts.length,1,'Guided settings add no independent attempt');
app.open('settings');app.setField('grade','8');await app.action('save-profile');assert.equal(app.state.profile.grade,8);app.open('lesson',{id:'l-ls-course-t08'});await app.action('studio-answer',app.render().teaching.lesson.prediction.answer.option);await app.action('studio-check');await app.action('studio-next');await app.action('studio-workshop-item','2');
for(const group of app.render().teaching.lesson.mission.workshop.items[2].evidenceGroups){await app.action('studio-workshop-choose',group[0]);await app.action('studio-workshop-check')}
assert.equal(app.render().teaching.workshop.item.calculation.kind,'yuan');app.setField('studioWorkshopInput','8');await app.action('studio-workshop-check');assert.equal(app.render().teaching.workshop.correct,false);assert.equal(app.render().teaching.workshop.input,'8');
app.setField('studioWorkshopInput','１２');await app.action('studio-workshop-check');assert.equal(app.render().teaching.workshop.correct,true);assert.equal(app.render().teaching.workshop.complete,false);app.setField('studioWorkshopOwn','二十减八等于十二，不能把支出八元当作余额。');await app.action('studio-workshop-save');assert.equal(app.render().teaching.workshop.complete,true);app.setField('studioWorkshopInput','8');assert.equal(app.render().teaching.workshop.complete,false);assert.equal(app.state.attempts.length,1,'Guided yuan entry adds no independent attempt');
app.open('lesson',{id:'l-ls-course-t09'});await app.action('studio-answer',app.render().teaching.lesson.prediction.answer.option);await app.action('studio-check');await app.action('studio-next');await app.action('studio-workshop-item','1');assert.equal(app.render().teaching.workshop.settings.labels.join('/'),'改变/保持');
for(const [row,value]of [['paper','on'],['shape','on'],['coins','off']])await app.action('studio-workshop-setting',row+':'+value);await app.action('studio-workshop-settings-check');assert.deepEqual(Array.from(app.render().teaching.workshop.settings.rows,r=>r.correct),[false,true,true]);await app.action('studio-workshop-setting','paper:off');await app.action('studio-workshop-settings-check');assert.equal(app.render().teaching.workshop.settings.correct,true);assert.equal(app.render().teaching.workshop.complete,false);assert.equal(app.state.attempts.length,1,'Guided factor choices add no independent attempt');
app.open('lesson',{id:'l-v-course-quantity'});app.setField('studioAnswer',app.render().teaching.lesson.prediction.answer.accepted[0]);await app.action('studio-check');await app.action('studio-next');await app.action('studio-workshop-item','1');
await app.action('studio-workshop-quantity','add');assert.equal(app.render().teaching.workshop.wordQuantity.count,1);assert.equal(app.render().teaching.workshop.wordQuantity.unit,'seedling');const plantItem=app.render().teaching.workshop.item;await app.action('studio-workshop-choose',plantItem.options.find(o=>o.correct).id);app.setField('studioWorkshopInput',plantItem.answer);await app.action('studio-workshop-check');app.setField('studioWorkshopOwn','I need one more pencil for our poster.');await app.action('studio-workshop-save');assert.equal(app.render().teaching.workshop.complete,true);
await app.action('studio-workshop-quantity','add');assert.equal(app.render().teaching.workshop.wordQuantity.count,2);assert.equal(app.render().teaching.workshop.wordQuantity.unit,'seedlings');assert.equal(app.render().teaching.workshop.complete,false);assert.equal(app.render().teaching.workshop.own,'I need one more pencil for our poster.');await app.action('studio-workshop-quantity','remove');await app.action('studio-workshop-check');await app.action('studio-workshop-save');assert.equal(app.render().teaching.workshop.complete,true);assert.equal(app.state.attempts.length,1,'Guided exact quantities add no independent attempt');
if (mode === 'cloud') { assert(cloudInitialised); assert(cloudDownloads > 0) } else { assert(!cloudInitialised); assert.equal(cloudDownloads, 0) }
// A late callback must not report failure after the exact destination actually arrived.
app.platform.navigate('lesson',{id:'l-ls-course-t08'});const arrived=pendingNavigation.at(-1),toastCount=errors.length,routeCount=navigations.length;topPage={route:'pages/lesson/index',options:{id:'l-ls-course-t08'}};arrived.fail({errMsg:'navigateTo:fail timeout'});assert.equal(errors.length,toastCount);assert.equal(navigations.length,routeCount);
app.platform.navigate('lesson',{id:'l-ls-course-t08'});topPage={route:'pages/lesson/index',options:{id:'l-ls-course-t07'}};pendingNavigation.at(-1).fail({errMsg:'navigateTo:fail timeout'});assert.equal(errors.length,toastCount+1,'A different lesson on the same route is still a failed destination');topPage=undefined;
app.platform.navigate('builder');const stale=pendingNavigation.at(-1);app.platform.navigate('session');const current=pendingNavigation.at(-1),count=navigations.length
stale.fail({errMsg:'navigateTo:fail cancelled'});assert.equal(navigations.length,count,'A late failed navigation cannot replace the newer session')
current.fail({errMsg:'navigateTo:fail webview count limit exceed'});assert.equal(navigations.length,count+1);assert(navigations.at(-1).startsWith('/pages/session/index'))
for(const failedModule of ['./assets/index.js','./illustrations/index.js','./illustrations-2/index.js']) {
failArtwork=failedModule;artworkRequests=0
const retryContext=vm.createContext({wx:{...wx},console,getCurrentPages:()=>[],TextEncoder:undefined,TextDecoder:undefined})
const retryAdapter=load(mode==='cloud'?resolve(local,'runtime.cjs'):resolve(root,'runtime.js'),retryContext)
await assert.rejects(retryAdapter.ready,/插图加载未完成，请重试/);assert.equal(retryAdapter.application,undefined)
failArtwork=false;await retryAdapter.initializeApplication();assert(retryAdapter.application);assert.equal(artworkRequests,3+['./assets/index.js','./illustrations/index.js','./illustrations-2/index.js'].indexOf(failedModule)+1,'Every artwork package must be retryable without a stuck initialization promise')
}
console.log(`${mode} native-adapter simulation passed.`)
}
console.log('Native-adapter simulation passed: CommonJS startup, async subpackage/hash loading without DOM encoders, profile, answer, storage and privacy routing.')
console.log('This does not replace WeChat DevTools or real-device validation.')
