import assert from 'node:assert/strict'
import{createRequire}from'node:module'
import{resolve,join}from'node:path'
import{mkdtempSync,rmSync}from'node:fs'
import{tmpdir}from'node:os'
import{fileURLToPath,pathToFileURL}from'node:url'
const root=resolve(process.argv[2]||process.cwd()), here=fileURLToPath(new URL('.',import.meta.url));
const{build}=createRequire(resolve(root,'package.json'))('esbuild');
const output=mkdtempSync(join(tmpdir(),'cjhe-runtime-review-'));
process.on('exit',()=>rmSync(output,{recursive:true,force:true}));
await build({entryPoints:[resolve(here,'recording-probe.ts')],alias:{'@review-app':root},bundle:true,platform:'node',format:'esm',outfile:resolve(output,'controller.mjs')})
await import(pathToFileURL(resolve(output,'controller.mjs')))
const {contentFingerprint,releaseProblems}=await import(pathToFileURL(resolve(root,'scripts/lib/release.mjs')))
const c={questions:[],lessons:[],vocabulary:[],media:[],books:[],blueprints:[],topics:[{id:'g-be',grades:[7],order:1,prerequisites:[]}],editions:[{id:'pep-2024',spelling:'american'}],cities:[]}
const approvedFingerprint=contentFingerprint(c)
const config={appid:'wx0123456789abcdef',cloudEnv:'test-owner-env',contentFiles:{'g-be':'cloud://test-owner-env/content/g-be.json'},mediaFiles:{},editorialApproval:{fingerprint:approvedFingerprint,approvedBy:'Synthetic review probe',at:'2026-10-16'},nativeValidation:{realDevice:true,evidence:'Synthetic probe only; not an actual approval',at:'2026-10-16'},privacyConfigured:true}
const errorsBefore=releaseProblems(config,c)
c.editions[0].spelling='british';c.topics[0].grades=[9]
console.log(JSON.stringify({probe:'release gate after unapproved edition spelling and curriculum grade changes',sameFingerprint:approvedFingerprint===contentFingerprint(c),errorsBefore,errorsAfter:releaseProblems(config,c)}))

assert.equal(approvedFingerprint,contentFingerprint(c));assert.deepEqual(errorsBefore,[]);assert.deepEqual(releaseProblems(config,c),[])
