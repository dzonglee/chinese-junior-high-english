import { gunzipSync, strFromU8 } from 'fflate/browser'

/** Development packages store losslessly compressed text; ContentRepository still checks SHA-256. */
export function decodeNativePack(value: unknown): string {
  const invalid = () => new Error('内容包格式不正确，请更新后重试。')
  if (!value || typeof value !== 'object') throw invalid()
  const pack = value as { encoding?: unknown; byteLength?: unknown; data?: unknown }
  if ((pack.encoding !== 'gzip-hex-v1' && pack.encoding !== 'gzip-base64-v1') || typeof pack.byteLength !== 'number' ||
      !Number.isInteger(pack.byteLength) || pack.byteLength < 1 || pack.byteLength > 2_000_000 ||
      typeof pack.data !== 'string') throw invalid()
  let compressed: Uint8Array
  if (pack.encoding === 'gzip-hex-v1') {
    if (pack.data.length < 36 || pack.data.length > 3_000_000 || pack.data.length % 2 !== 0 || !/^[0-9a-f]+$/.test(pack.data)) throw invalid()
    compressed = new Uint8Array(pack.data.length / 2)
    for (let i = 0; i < compressed.length; i++) compressed[i] = Number.parseInt(pack.data.slice(i * 2, i * 2 + 2), 16)
  } else {
    // Decode directly: WeChat does not supply Node Buffer or browser atob.
    const data = pack.data, alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    if (data.length < 24 || data.length > 2_000_000 || data.length % 4 !== 0 || !/^[A-Za-z0-9+/]*={0,2}$/.test(data)) throw invalid()
    const padding = data.endsWith('==') ? 2 : data.endsWith('=') ? 1 : 0
    const last = alphabet.indexOf(data[data.length - padding - 1])
    if (padding === 2 && (last & 15) !== 0 || padding === 1 && (last & 3) !== 0) throw invalid()
    compressed = new Uint8Array(data.length / 4 * 3 - padding)
    for (let i = 0, j = 0; i < data.length; i += 4) {
      const a = alphabet.indexOf(data[i]), b = alphabet.indexOf(data[i + 1])
      const c = data[i + 2] === '=' ? 0 : alphabet.indexOf(data[i + 2]), d = data[i + 3] === '=' ? 0 : alphabet.indexOf(data[i + 3])
      compressed[j++] = a << 2 | b >> 4
      if (j < compressed.length) compressed[j++] = b << 4 | c >> 2
      if (j < compressed.length) compressed[j++] = c << 6 | d
    }
  }
  // The build emits one ordinary gzip member without optional headers.
  if (compressed[0] !== 31 || compressed[1] !== 139 || compressed[2] !== 8 || compressed[3] !== 0) throw invalid()
  const end = compressed.length
  const size = (compressed[end - 4] | compressed[end - 3] << 8 | compressed[end - 2] << 16 | compressed[end - 1] << 24) >>> 0
  if (size !== pack.byteLength) throw invalid()
  try {
    // One extra byte detects an overrun even when an invalid stream lies about its footer size.
    // fflate's fixed output buffer bounds allocation and truncates larger streams to this buffer.
    const output = gunzipSync(compressed, { out: new Uint8Array(size + 1) })
    if (output.length !== size) throw invalid()
    return strFromU8(output)
  } catch {
    throw invalid()
  }
}
