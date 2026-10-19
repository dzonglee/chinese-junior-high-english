import {it,expect} from 'vitest'
import {validWordRuler,rulerDistance,wordRulerView} from './core/word-ruler'
import type {WordRuler} from './core/word-ruler'
const r:WordRuler={title:'两粒种子之间的距离',end:20,choices:[5,9,10,11,15,20],answer:10,unit:'cm',startLabel:'First seed',markerLabel:'Second seed',hint:'从0量起。',wrong:'应在10 cm。'}
it('accepts only canonical authored distances and renders exact labelled coordinates without answer flags',()=>{
 expect(validWordRuler(r)).toBe(true)
 for(const raw of ['', '0','01','010','10 ',' 10','10.0','-10','21','NaN'])expect(rulerDistance(r,raw)).toBeUndefined()
 const initial=wordRulerView(r,'');expect(initial.ready).toBe(false);expect(initial.choices.every(c=>!c.selected)).toBe(true)
 const v=wordRulerView(r,'10');expect(v.ready).toBe(true);expect(v.reading).toBe('0 → 10 cm');expect(v.markerStyle).toBe('left:50%;');expect(v.spanStyle).toBe('width:50%;');expect(v.ticks).toHaveLength(21);expect(v.ticks.filter(t=>t.major).map(t=>t.label)).toEqual(['0','5','10','15','20']);expect(v.choices.filter(c=>c.selected).map(c=>c.id)).toEqual(['10']);expect(v).not.toHaveProperty('answer');expect(v).not.toHaveProperty('correct')
 expect(wordRulerView(r,'20').markerStyle).toBe('left:100%;');expect(wordRulerView(r,'5').markerStyle).toBe('left:25%;')
})
it('rejects ambiguous scales, choices and arbitrary units',()=>{
 for(const bad of [null,{}, {...r,title:' '},{...r,end:0},{...r,end:21},{...r,unit:'pixels'}, {...r,choices:[10,5]},{...r,choices:[5,10,10]},{...r,choices:[5,21]},{...r,choices:[5,9.5,10]},{...r,answer:8},{...r,startLabel:''},{...r,markerLabel:' '},{...r,hint:''},{...r,wrong:''}])expect(validWordRuler(bad)).toBe(false)
})
