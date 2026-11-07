// Return source tile IDs; duplicate pieces are separate, consumable controls.
export function tileIdsForText(tiles, value, mode = 'words') {
  if (!value || tiles.length > 24 || tiles.some(tile => !tile)) return undefined
  if (mode !== 'morpheme') {
    const used = new Set(), result = []
    for (const word of value.split(' ')) {
      const index = tiles.findIndex((tile, i) => tile === word && !used.has(i))
      if (index < 0) return undefined
      used.add(index); result.push(String(index))
    }
    return result
  }
  if (/\s/.test(value)) return undefined
  const failed = new Set()
  function build(offset, used) {
    if (offset === value.length) return []
    const key = `${offset}:${used}`
    if (failed.has(key)) return undefined
    const seen = new Set()
    for (let i = 0; i < tiles.length; i++) {
      if ((used & (1 << i)) || seen.has(tiles[i]) || !value.startsWith(tiles[i], offset)) continue
      seen.add(tiles[i])
      const tail = build(offset + tiles[i].length, used | (1 << i))
      if (tail) return [String(i), ...tail]
    }
    failed.add(key); return undefined
  }
  return build(0, 0)
}
