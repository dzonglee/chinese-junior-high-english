import { build } from 'esbuild'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

export async function validationModule(root) {
  const target = resolve(root, '.local/tools/validation.mjs')
  mkdirSync(resolve(root, '.local/tools'), { recursive: true })
  await build({ entryPoints: [resolve(root, 'src/core/validation.ts')], bundle: true, format: 'esm', platform: 'node', outfile: target })
  return import(`${pathToFileURL(target).href}?t=${Date.now()}`)
}
export function writeJson(path, value) { mkdirSync(resolve(path, '..'), { recursive: true }); writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`) }
