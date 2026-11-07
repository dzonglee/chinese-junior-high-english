import {it,expect} from 'vitest'
import {artworkUrl} from '../web/artwork'
it('uses the registered lesson format before filename heuristics and preserves embedded and legacy assets',()=>{
 expect(artworkUrl('lesson-bird-its-wings',{}, {'lesson-bird-its-wings':'png'})).toBe('/assets/lesson-bird-its-wings.png')
 expect(artworkUrl('lesson-bird-its-wings',{'lesson-bird-its-wings':'data:image/png;base64,checked'},{'lesson-bird-its-wings':'png'})).toBe('data:image/png;base64,checked')
 expect(artworkUrl('lesson-legacy',{},{})).toBe('/assets/lesson-legacy.jpg');expect(artworkUrl('count-unit-chair',{},{})).toBe('/assets/count-unit-chair.png');expect(artworkUrl('exam_light',{},{})).toBe('/assets/exam_light.webp')
 expect(artworkUrl('desk-scene',{},{})).toBe('/assets/desk-scene.jpg');expect(artworkUrl('toString',{},{})).toBe('/assets/toString.png')
})
