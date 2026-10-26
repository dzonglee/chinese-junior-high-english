/** WeChat JS engines need not provide the browser TextEncoder API. */
export function utf8Bytes(text: string): Uint8Array {
  // Checked packs can be large. Allocate their exact byte size without first
  // growing a boxed-number array or creating a string for every code point.
  const bytes = new Uint8Array(utf8ByteLength(text))
  let offset = 0
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i)
    if (code >= 0xd800 && code <= 0xdbff && i + 1 < text.length) {
      const low = text.charCodeAt(i + 1)
      if (low >= 0xdc00 && low <= 0xdfff) {
        code = 0x10000 + ((code - 0xd800) << 10) + low - 0xdc00
        i++
      }
    }
    if (code >= 0xd800 && code <= 0xdfff) code = 0xfffd
    if (code < 0x80) bytes[offset++] = code
    else if (code < 0x800) {
      bytes[offset++] = 0xc0 | code >> 6
      bytes[offset++] = 0x80 | code & 0x3f
    } else if (code < 0x10000) {
      bytes[offset++] = 0xe0 | code >> 12
      bytes[offset++] = 0x80 | code >> 6 & 0x3f
      bytes[offset++] = 0x80 | code & 0x3f
    } else {
      bytes[offset++] = 0xf0 | code >> 18
      bytes[offset++] = 0x80 | code >> 12 & 0x3f
      bytes[offset++] = 0x80 | code >> 6 & 0x3f
      bytes[offset++] = 0x80 | code & 0x3f
    }
  }
  return bytes
}
export function utf8ByteLength(text: string): number {
  let length = 0
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i)
    if (code < 0x80) length++
    else if (code < 0x800) length += 2
    else if (code >= 0xd800 && code <= 0xdbff && i + 1 < text.length && text.charCodeAt(i + 1) >= 0xdc00 && text.charCodeAt(i + 1) <= 0xdfff) {
      length += 4
      i++
    } else length += 3
  }
  return length
}
