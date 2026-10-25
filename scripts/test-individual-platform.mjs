// Run the latest authored fixture while preserving a committed, byte-identical full platform baseline.
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createServer } from 'node:http'
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import ts from 'typescript'
import { chromium, expect } from '@playwright/test'
import { fillInitialProfile } from './lib/browser-profile.mjs'
import { authorCatalog } from './lib/author-content.mjs'
import { workshopExpressionActions } from './lib/workshop-test-actions.mjs'
const repo=resolve(import.meta.dirname,'..'), lesson=process.argv[2], mode=process.argv[3]
assert(/^l-[a-z0-9-]+$/.test(lesson??''),'Provide an exact lesson ID')
assert(['--offline','--adapters','--inspect-shared'].includes(mode),'Choose --offline, --adapters or --inspect-shared')
const baselineIndex=Number(process.argv[4]);assert(Number.isInteger(baselineIndex)&&baselineIndex>=241,'Provide the last full platform checkpoint')
const baselinePath=`docs/reviews/individual-lessons/checkpoint-${baselineIndex}.json`,baseline=JSON.parse(readFileSync(resolve(repo,baselinePath),'utf8'));assert(baseline.offlineChecks>4,'A focused checkpoint cannot be used as a full baseline')
function git(args){const r=spawnSync('git',args,{cwd:repo,encoding:'utf8',maxBuffer:16*1024*1024});assert.equal(r.status,0,'Cannot verify platform baseline: '+(r.error?.code??r.status));return r.stdout}
const baselineCommit=git(['log','-1','--format=%H','--',baselinePath]).trim();assert(/^[a-f0-9]{40}$/.test(baselineCommit),'Missing committed full baseline')
const platformPath=n=>(n.startsWith('src/')&&!n.startsWith('src/generated/')&&!n.endsWith('.test.ts'))||n.startsWith('web/')||/^miniprogram\/(components|pages)\//.test(n)||['miniprogram/app.js','miniprogram/app.json','miniprogram/app.wxss','miniprogram/project.config.json'].includes(n)
const roots=['src','web','miniprogram/components','miniprogram/pages','miniprogram/app.js','miniprogram/app.json','miniprogram/app.wxss','miniprogram/project.config.json'];const baselineFiles=git(['ls-tree','-r','--name-only',baselineCommit,'--',...roots]).trim().split('\n').filter(platformPath).sort(),currentFiles=git(['ls-files','--cached','--others','--exclude-standard','--',...roots]).trim().split('\n').filter(platformPath).sort();assert.deepEqual(currentFiles,baselineFiles,'Platform file inventory changed; run the full suites')
const differences=baselineFiles.filter(n=>{const old=spawnSync('git',['show',baselineCommit+':'+n],{cwd:repo});assert.equal(old.status,0);return !existsSync(resolve(repo,n))||!old.stdout.equals(readFileSync(resolve(repo,n)))})
assert.deepEqual(differences,[],'Shared platform changed; run the full suites')
const sharedBaseline={checkpoint:baselineIndex,commit:baselineCommit,unchangedPlatformFiles:baselineFiles.length}
const out=resolve(repo,'test-results/individual-platform',lesson);mkdirSync(out,{recursive:true})
const sha=s=>createHash('sha256').update(s).digest('hex')
function parse(file){const source=readFileSync(resolve(repo,'scripts',file),'utf8');return {source,tree:ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS)}}
function fixture(statements,source,{native=false}={}){
 const marker=native?`app.open('lesson',{id:'${lesson}'});`:`catalog.lessons.find(l=>l.id==='${lesson}')`
 const start=statements.findIndex(s=>s.getText().includes(marker));assert(start>=0,'No exact authored fixture for '+lesson)
 let end=-1
 for(let i=start;i<statements.length;i++){
  const text=statements[i].getText()
  if(native&&text.startsWith("if (mode === 'cloud')")){end=i;break}
  if(!native&&text.includes("checks.push('No remote/content requests")){end=i;break}
 }
 assert(end>start,'Fixture boundary missing')
 const body=source.slice(statements[start].getStart(),statements[end-1].end)
 // This runner is for the newly appended case. Refuse to run intervening lessons silently.
 const starts=[...body.matchAll(/(?:catalog\.lessons\.find\(l=>l\.id===|app\.open\('lesson',\{id:)'(l-[a-z0-9-]+)'/g)].map(m=>m[1]);assert(starts.length&&starts.every(id=>id===lesson),'Selected fixture contains a different lesson')
 assert(body.includes(native?'assert.equal(app.state.attempts.length,1,':'checks.push('),'Selected fixture lacks its original completion/evidence assertion')
 return body
}
if(mode==='--inspect-shared'){console.log(JSON.stringify(sharedBaseline));process.exit(0)}
if(mode==='--offline'){
 const {source,tree}=parse('test-local.mjs'),block=tree.statements.find(ts.isTryStatement)?.tryBlock;assert(block)
 const body=fixture([...block.statements],source),catalog=authorCatalog(repo),errors=[],network=[],checks=[]
 let url=pathToFileURL(resolve(repo,'dist/local/index.html')).href,transport='file',server,browser,context,documentLoad=false
 try{
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),headless:true,args:['--no-sandbox']})
  context=await browser.newContext({offline:true,viewport:{width:390,height:844}});const page=await context.newPage()
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))network.push({url:r.url(),document:r.isNavigationRequest(),duringDocumentLoad:documentLoad})})
  await context.route(/^https?:/,route=>{const r=route.request();return documentLoad&&r.isNavigationRequest()&&r.url()===url?route.continue():route.abort()})
  const action=async(id,value)=>{const b=page.locator(`[data-action="${id}"]${value===undefined?'':`[data-value="${value}"]`}`).first();await expect(b).toBeEnabled();await b.click()}
  const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('cjhe.state.v1')))
  async function reloadStandalone(){if(transport!=='file'){documentLoad=true;await context.setOffline(false)}try{await page.reload()}finally{await context.setOffline(true);documentLoad=false}}
  try{await page.goto(url)}catch(e){if(!String(e).includes('ERR_BLOCKED_BY_ADMINISTRATOR'))throw e;transport='standalone HTTP; managed browser blocks file navigation';server=createServer((req,res)=>{assert.equal(req.url,'/');res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(readFileSync(resolve(repo,'dist/local/index.html')))});await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve)});url=`http://127.0.0.1:${server.address().port}/`;documentLoad=true;await context.setOffline(false);try{await page.goto(url)}finally{await context.setOffline(true);documentLoad=false}}
  await expect(page.locator('[data-screen=onboarding]')).toBeVisible();await fillInitialProfile(page,{cityId:'北京-北京',structure:'63',grade:'9',editionId:'pep-legacy'});await action('save-profile');await expect(page.locator('[data-screen=home]')).toBeVisible();await expect.poll(()=>page.locator('.continue-cover img').evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);checks.push('Standalone startup, saved profile and embedded home artwork')
  const beforeStudio=await state(),independent=JSON.stringify({attempts:beforeStudio.attempts,mastery:beforeStudio.mastery,lessonDoneAt:beforeStudio.lessonDoneAt})
  const run=new (Object.getPrototypeOf(async function(){}).constructor)('page','action','catalog','state','reloadStandalone','beforeStudio','checks','expect','url','workshopExpressionActions',body)
  await run(page,action,catalog,state,reloadStandalone,beforeStudio,checks,expect,url,workshopExpressionActions)
  const after=await state();assert.equal(JSON.stringify({attempts:after.attempts,mastery:after.mastery,lessonDoneAt:after.lessonDoneAt}),independent);checks.push('Guided lesson preserves independent attempts, mastery and lessonDone')
  assert.deepEqual(errors,[]);assert(network.every(r=>r.url===url&&r.document&&r.duringDocumentLoad));assert.equal(documentLoad,false);checks.push('Only loopback document loads; practice stays offline with no page errors')
  writeFileSync(resolve(out,'offline.json'),JSON.stringify({mode:transport,networkDisabledAfterDocumentLoad:true,directFileNavigationValidated:transport==='file',sharedBaseline,scope:'Selected lesson only; original authored fixture plus shared startup,offline and evidence guards. Other platform cases are not claimed as rerun.',lesson,fixtureSha256:sha(body),transport,checks,errors,network,completedAt:new Date().toISOString()},null,2)+'\n');console.log(`${checks.length} offline local checks passed for selected lesson ${lesson}; original case assertions retained.`)
 }finally{await browser?.close();if(server)await new Promise(resolve=>server.close(resolve))}
}else{
 const {source,tree}=parse('test-native-adapter.mjs'),loop=tree.statements.find(ts.isForOfStatement);assert(loop&&ts.isBlock(loop.statement));const body=fixture([...loop.statement.statements],source,{native:true})
 const cut=source.indexOf('const nativeArt=new Set()');assert(cut>0)
 let prefix=source.slice(0,cut)
 const old="const root = resolve(import.meta.dirname, '../miniprogram'), local = resolve(import.meta.dirname, '../.local/native-adapter-test')";assert(prefix.includes(old));prefix=prefix.replace(old,`const root=${JSON.stringify(resolve(repo,'miniprogram'))},local=${JSON.stringify(resolve(repo,'.local/individual-platform-adapter'))}`)
 const guard="if (mode === 'cloud') { assert(cloudInitialised); assert(cloudDownloads > 0) } else { assert(!cloudInitialised); assert.equal(cloudDownloads, 0) }";assert(source.includes(guard))
 const report=resolve(out,'adapters.json'),temp=resolve(repo,'.local/individual-platform-adapter-runner.mjs');mkdirSync(resolve(repo,'.local'),{recursive:true})
 const setup="app.open('settings');app.setField('grade','9');app.setField('editionId','pep-legacy');await app.action('save-profile');const selectedBefore=JSON.stringify({attempts:app.state.attempts,mastery:app.state.mastery,lessonDoneAt:app.state.lessonDoneAt});assert.equal(app.state.attempts.length,1);"
 const content=prefix.replace("for (const mode of ['development', 'cloud']) {","const selectedModes=[];for (const mode of ['development', 'cloud']) {")+setup+'\n'+body+'\n'+guard+`\nassert.equal(JSON.stringify({attempts:app.state.attempts,mastery:app.state.mastery,lessonDoneAt:app.state.lessonDoneAt}),selectedBefore);assert.deepEqual(errors,[]);selectedModes.push({mode,passed:true,canonicalPacks:manifest.length,cloudDownloads,independentAttempts:app.state.attempts.length});console.log(mode+' native-adapter simulation passed.');\n}\nwriteFileSync(${JSON.stringify(report)},JSON.stringify({sharedBaseline:${JSON.stringify(sharedBaseline)},scope:'Selected lesson and original shared CommonJS startup,privacy and all canonical pack/hash checks; not all platform cases.',lesson:${JSON.stringify(lesson)},fixtureSha256:${JSON.stringify(sha(body))},modes:selectedModes,completedAt:new Date().toISOString()},null,2)+'\\n');\n`
 writeFileSync(temp,content);const r=spawnSync(process.execPath,[temp],{cwd:repo,encoding:'utf8',maxBuffer:1024*1024});if(r.stdout)process.stdout.write(r.stdout);if(r.stderr)process.stderr.write(r.stderr);assert.equal(r.status,0,'Focused adapter runner failed');console.log('Selected lesson only; other platform cases retain their separately recorded baseline scope.')
}
