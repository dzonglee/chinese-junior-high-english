import assert from 'node:assert/strict'
import vm from 'node:vm'
import { build } from 'esbuild'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
const root=resolve(import.meta.dirname,'..')
const bundle=await build({entryPoints:[`${root}/src/native/app.ts`],bundle:true,format:'cjs',platform:'neutral',target:'es2020',write:false,external:['./pack-loader.js']})
async function adapter() {
 let privacy,microphone,onStart,onStop,onError,starts=0,stops=0,microphoneRequests=0
 const recorder={onStart:cb=>{onStart=cb},onStop:cb=>{onStop=cb},onError:cb=>{onError=cb},start(){starts++},stop(){stops++;onStop({tempFilePath:'temp.mp3',duration:10})}}
 const wx={onNeedPrivacyAuthorization(){},getStorageSync:()=>'',setStorageSync(){},removeStorageSync(){},requirePrivacyAuthorize(options){privacy=options},authorize(options){microphoneRequests++;microphone=options},getRecorderManager:()=>recorder,getFileSystemManager:()=>({saveFile(options){options.success({savedFilePath:'saved.mp3'})}})}
 const module={exports:{}}
 const context=vm.createContext({wx,getCurrentPages:()=>[],module,exports:module.exports,require:()=>({loadCatalog:async()=>({catalog:JSON.parse(readFileSync(resolve(root,'dist/catalog.json'),'utf8'))}),loadPack(){throw Error('Unexpected content load')}}),console,setTimeout,clearTimeout})
 vm.runInContext(bundle.outputFiles[0].text,context)
 await module.exports.ready
 return {platform:module.exports.application.platform,grantPrivacy:()=>privacy.success(),grantMicrophone:()=>microphone.success(),started:()=>onStart(),get starts(){return starts},get stops(){return stops},get microphoneRequests(){return microphoneRequests}}
}
const turn=()=>new Promise(resolve=>setImmediate(resolve))
{
 const a=await adapter();let current=true
 const starting=a.platform.startRecording(()=>current);current=false;a.grantPrivacy()
 assert.equal(await starting,'cancelled');assert.equal(a.microphoneRequests,0);assert.equal(a.starts,0)
}
{
 const a=await adapter();let current=true
 const starting=a.platform.startRecording(()=>current);a.grantPrivacy();await turn();current=false;a.grantMicrophone()
 assert.equal(await starting,'cancelled');assert.equal(a.starts,0)
}
{
 const a=await adapter();let current=true
 const starting=a.platform.startRecording(()=>current);a.grantPrivacy();await turn();a.grantMicrophone();await turn();current=false;a.started()
 assert.equal(await starting,undefined);const result=await a.platform.stopRecording();assert.equal(result.path,'saved.mp3');assert.equal(a.starts,1);assert.equal(a.stops,1)
}
{
 const a=await adapter();const starting=a.platform.startRecording();a.grantPrivacy();await turn();a.grantMicrophone();await turn();a.started()
 assert.equal(await starting,undefined);await a.platform.stopRecording();assert.equal(a.starts,1);assert.equal(a.stops,1)
}
console.log('Native source adapter with API doubles: privacy cancellation, microphone cancellation, late onStart cleanup, normal grant/start/stop passed. No real-device validation claimed.')
