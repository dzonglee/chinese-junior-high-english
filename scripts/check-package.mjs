import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, relative, dirname } from 'node:path'
const root = resolve(import.meta.dirname, '..'), native = resolve(root, 'miniprogram'), app = JSON.parse(readFileSync(resolve(native, 'app.json'), 'utf8'))
for (const page of app.pages) {
  for (const extension of ['js', 'json', 'wxml']) assert(existsSync(resolve(native, `${page}.${extension}`)), `Missing native page file: ${page}.${extension}`)
  const config = JSON.parse(readFileSync(resolve(native, `${page}.json`), 'utf8'))
  assert.equal(config.usingComponents['app-shell'], '/components/app-shell/index')
  assert(readFileSync(resolve(native, `${page}.wxml`), 'utf8').includes('id="shell"'), `Privacy routing requires the shell ID on ${page}`)
}
// Check every page and component; DevTools still provides the real compiler.
function checkWxml(file) {
 const script=file.replace(/\.wxml$/,'.js'),host=existsSync(script)?script:resolve(dirname(file),'index.js')
 // Imported templates run in the owning component and use its event handlers.
 const wxml=readFileSync(file,'utf8'),js=readFileSync(host,'utf8'),stack=[]
 for(const match of wxml.matchAll(/(?:bind|catch):?[a-z]+="([A-Za-z][A-Za-z0-9]*)"/g))assert(new RegExp(`\\b${match[1]}\\s*\\(`).test(js),`Unbound WXML event handler in ${file}: ${match[1]}`)
 for(const expression of wxml.matchAll(/\{\{([\s\S]*?)\}\}/g))assert(!/\.\w+\s*\(/.test(expression[1]),`WXML cannot call methods: ${file}`)
 for(const match of wxml.replace(/\{\{[\s\S]*?\}\}/g,'').matchAll(/<(\/?)([\w-]+)\b[^>]*?(\/?)>/g)){
  if(match[1])assert.equal(stack.pop(),match[2],`Unbalanced WXML tag in ${file}: ${match[0]}`)
  else if(!match[3])stack.push(match[2])
 }
 assert.equal(stack.length,0,`Unclosed WXML tags in ${file}`)
}
function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(resolve(dir, e.name)) : [resolve(dir, e.name)]) }
const all = files(native); for(const file of all.filter(f=>f.endsWith('.wxml')))checkWxml(file)
assert((app.subPackages??[]).length<=100,'WeChat allows at most 100 subpackages')
for(const p of app.subPackages??[]){const members=files(resolve(native,p.root));assert(members.reduce((n,f)=>n+statSync(f).size,0)<1_900_000,`Subpackage exceeds its safety budget: ${p.root}`)}
const main = all.filter(file => !relative(native, file).replaceAll('\\', '/').startsWith('content/')), mainBytes = main.reduce((n, file) => n + statSync(file).size, 0), totalBytes = all.reduce((n, file) => n + statSync(file).size, 0)
assert(mainBytes < 1_900_000, 'Main package exceeds its safety budget'); assert(totalBytes < 19_000_000, 'Total package exceeds its safety budget')
for (const name of ['welcome', 'cards', 'notebook']) assert(existsSync(resolve(native, 'assets', `${name}.png`)), `Missing Blender artwork: ${name}`)
assert(!all.some(file => /(?:^|[\\/])reference[\\/]/.test(file)), 'Research files must not ship in the app')
console.log(`Package checks passed: ${app.pages.length} native routes, bound event handlers, balanced WXML tags, ${Math.round(mainBytes / 1024)} KB main / ${Math.round(totalBytes / 1024)} KB total.`)
console.log('These are static checks, not WeChat DevTools compilation.')
