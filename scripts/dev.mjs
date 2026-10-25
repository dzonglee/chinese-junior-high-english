import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
const root = resolve(import.meta.dirname, '..'), port = Number(process.env.PORT || 4173)
const artwork = new Map(JSON.parse(readFileSync(resolve(root,'content/visual-assets.json'),'utf8')).assets.filter(a=>/^miniprogram\/illustrations(?:-[2345])?\//.test(a.file)).map(a=>['/assets/'+a.id+extname(a.file),resolve(root,a.file)]))
const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    let file = artwork.get(path) ?? (path === '/review' || path === '/review/' ? resolve(root, 'dist/review/index.html') : path === '/' ? resolve(root, 'dist/web/index.html') : path.startsWith('/packs/') ? resolve(root, 'dist', '.' + path) : path.startsWith('/assets/') ? resolve(root, 'miniprogram', '.' + path) : resolve(root, 'dist/web', '.' + path))
    if (![resolve(root, 'dist') + '/', resolve(root, 'miniprogram/assets') + '/', resolve(root, 'miniprogram/illustrations') + '/', resolve(root, 'miniprogram/illustrations-2') + '/', resolve(root, 'miniprogram/illustrations-3') + '/', resolve(root, 'miniprogram/illustrations-4') + '/', resolve(root, 'miniprogram/illustrations-5') + '/'].some(prefix => file.startsWith(prefix))) { res.writeHead(403); res.end(); return }
    if (!(await stat(file)).isFile()) throw new Error('Not found')
    res.writeHead(200, { 'Content-Type': ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg' })[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(await readFile(file))
  } catch { res.writeHead(404); res.end('Not found') }
})
server.listen(port, '127.0.0.1', () => console.log(`Local English app listening on port ${port}.`))
