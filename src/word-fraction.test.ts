import {it,expect} from 'vitest'
import {validWordFraction,fractionCount,changeFraction,wordFractionView} from './core/word-fraction'
import type {WordFraction} from './core/word-fraction'
const f:WordFraction={title:'涂出一半',parts:2,answer:1,wholeLabel:'一个橙子',hint:'两等份中的一份。',wrong:'应涂一份。'}
it('bounds equal shares and distinguishes untouched from explicit zero without answer flags',()=>{
 for(const parts of [2,4] as const){const q={...f,parts};expect(validWordFraction(q)).toBe(true);expect(wordFractionView(q,'').ready).toBe(false);expect(wordFractionView(q,'0').ready).toBe(true)
  for(let n=0;n<=parts;n++){const v=wordFractionView(q,String(n));expect(fractionCount(q,String(n))).toBe(n);expect(v.reading).toBe(`${n} / ${parts}`);expect(v.segments).toHaveLength(parts);expect(v.segments.filter(s=>s.selected)).toHaveLength(n);expect(v.canAdd).toBe(n<parts);expect(v.canRemove).toBe(n>0);expect(v).not.toHaveProperty('answer');expect(v).not.toHaveProperty('correct')}
  expect(changeFraction(q,'','clear')).toBe('0');expect(changeFraction(q,'','add')).toBe('1');expect(changeFraction(q,'','remove')).toBeUndefined();expect(changeFraction(q,String(parts),'add')).toBeUndefined();expect(changeFraction(q,'1','remove')).toBe('0');expect(changeFraction(q,'1','set:4')).toBeUndefined()
 }
})
it('rejects unequal or noncanonical fraction metadata and stored counts',()=>{
 for(const raw of ['', '00','01','1 ',' 1','1.0','-0','-1','3','4','5','NaN'])expect(fractionCount(f,raw)).toBeUndefined()
 for(const bad of [null,{}, {...f,parts:3},{...f,parts:0},{...f,parts:'2'},{...f,answer:3},{...f,answer:-1},{...f,answer:1.5},{...f,title:' '},{...f,wholeLabel:''},{...f,hint:' '},{...f,wrong:''}])expect(validWordFraction(bad)).toBe(false)
})
