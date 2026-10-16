/** WeChat JS engines need not provide the browser TextEncoder API. */
export function utf8Bytes(text: string): Uint8Array {
  const bytes: number[] = []
  for (const character of text) {
    let code = character.codePointAt(0)!
    if (code >= 0xd800 && code <= 0xdfff) code = 0xfffd
    if (code < 0x80) bytes.push(code)
    else if (code < 0x800) bytes.push(0xc0 | code >> 6, 0x80 | code & 0x3f)
    else if (code < 0x10000) bytes.push(0xe0 | code >> 12, 0x80 | code >> 6 & 0x3f, 0x80 | code & 0x3f)
    else bytes.push(0xf0 | code >> 18, 0x80 | code >> 12 & 0x3f, 0x80 | code >> 6 & 0x3f, 0x80 | code & 0x3f)
  }
  return new Uint8Array(bytes)
}
