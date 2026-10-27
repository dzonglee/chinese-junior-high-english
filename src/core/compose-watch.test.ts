import {describe,it,expect} from 'vitest'
import {validComposeWatch,composeWatchMatch,changeComposeWatch,composeWatchView,composeWatchKey,composeWatchPhotoKey}from './compose-watch'
const model={title:'观察计划',hint:'先选位置与做法',wrong:'照片不清不能靠近巢',pathLabel:'留在标记路径和观察区',nestLabel:'离开路径靠近巢'}
describe('fictional birdwatching plans',()=>{
 it('requires an explicit path position and quiet behaviour across all four combinations',()=>{
  expect(composeWatchMatch('')).toBe(false);expect(composeWatchView(model,'','unclear')).toMatchObject({position:'unknown',voice:'unknown',ready:false})
  for(const position of ['path','nest'])for(const voice of ['quiet','loud']){let s=changeComposeWatch('',`position:${position}`)!;expect(composeWatchMatch(s)).toBe(false);s=changeComposeWatch(s,`voice:${voice}`)!;expect(composeWatchMatch(s)).toBe(position==='path'&&voice==='quiet')}
 })
 it('keeps hypothetical photograph clarity separate from plan correctness',()=>{
  for(const position of ['path','nest'])for(const voice of ['quiet','loud'])for(const photo of ['clear','unclear','forged']){const s=JSON.stringify({position,voice}),v=composeWatchView(model,s,photo);expect(v.ready).toBe(position==='path'&&voice==='quiet');expect(v.photoClear).toBe(photo==='clear');expect(v.position).toBe(position);expect(v.voice).toBe(voice)}
  expect(composeWatchKey('a')).not.toBe(composeWatchPhotoKey('a'));expect(composeWatchPhotoKey('a')).not.toBe(composeWatchPhotoKey('b'))
 })
 it('clears and resets actual decisions without mutating metadata or silently keeping success',()=>{
  const original=JSON.stringify(model),good=JSON.stringify({position:'path',voice:'quiet'});expect(composeWatchMatch(changeComposeWatch(good,'position:clear')!)).toBe(false);expect(composeWatchMatch(changeComposeWatch(good,'voice:clear')!)).toBe(false);expect(changeComposeWatch(good,'reset')).toBe('{}');expect(composeWatchView(model,'{}','clear').position).toBe('unknown');expect(JSON.stringify(model)).toBe(original)
 })
 it('rejects malformed stored data, crossed actions and incomplete metadata',()=>{
  for(const raw of ['null','[]','not JSON','{"position":"path","voice":"quiet","credit":true}','{"position":"quiet","voice":"path"}'])expect(composeWatchMatch(raw)).toBe(false)
  for(const action of ['position:quiet','voice:path','photo:clear','position:near','__proto__:path'])expect(changeComposeWatch('{}',action)).toBeUndefined()
  expect(validComposeWatch(model)).toBe(true);for(const x of [null,[],{}, {...model,pathLabel:''},{...model,nestLabel:4},{...model,nestLabel:model.pathLabel},{...model,extra:'unsupported'}])expect(validComposeWatch(x)).toBe(false)
 })
})
