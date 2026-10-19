import { gunzipSync, strFromU8 } from 'fflate/browser'

/** Development packages store losslessly compressed text; ContentRepository still checks SHA-256. */
export function decodeNativePack(value: unknown): string {
  const invalid = () => new Error('内容包格式不正确，请更新后重试。')
  if (!value || typeof value !== 'object') throw invalid()
  const pack = value as { encoding?: unknown; byteLength?: unknown; data?: unknown }
  if (pack.encoding !== 'gzip-hex-v1' || typeof pack.byteLength !== 'number' ||
      !Number.isInteger(pack.byteLength) || pack.byteLength < 1 || pack.byteLength > 2_000_000 ||
      typeof pack.data !== 'string' || pack.data.length < 36 || pack.data.length > 3_000_000 ||
      pack.data.length % 2 !== 0 || !/^[0-9a-f]+$/.test(pack.data)) throw invalid()
  const compressed = new Uint8Array(pack.data.length / 2)
  for (let i = 0; i < compressed.length; i++) compressed[i] = Number.parseInt(pack.data.slice(i * 2, i * 2 + 2), 16)
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
