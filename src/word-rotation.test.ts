import {it,expect} from 'vitest'
import {validWordRotation,rotationAngle,wordRotationView} from './core/word-rotation'
import type {WordRotation} from './core/word-rotation'
const r:WordRotation={title:'向左转动纸上的箭头',start:'up',direction:'left',choices:[0,90,180,270],answer:90,hint:'向左转四分之一圈。',wrong:'应向左转九十度。'}
it('renders exact directed quarter turns with a neutral initial state and no answer flags',()=>{
 expect(validWordRotation(r)).toBe(true);const initial=wordRotationView(r,'');expect(initial.ready).toBe(false);expect(initial.choices.every(c=>!c.selected)).toBe(true);expect(initial.orientation).toBe('up')
 for(const [raw,orientation,angle] of [['0','up',0],['90','left',270],['180','down',180],['270','right',90]] as const){const v=wordRotationView(r,raw);expect(v.ready).toBe(true);expect(v.orientation).toBe(orientation);expect(v.arrowStyle).toBe(`transform:rotate(${angle}deg);`);expect(v.choices.filter(c=>c.selected).map(c=>c.id)).toEqual([raw]);expect(v).not.toHaveProperty('answer');expect(v).not.toHaveProperty('correct')}
 expect(wordRotationView(r,'90').reading).toBe('向左转90° · 箭头向左');expect(wordRotationView({...r,direction:'right'},'90').orientation).toBe('right');expect(wordRotationView({...r,start:'right'},'90').orientation).toBe('up')
})
it('rejects noncanonical angles and ambiguous quarter-turn metadata',()=>{
 for(const raw of ['', '00','090','90 ',' 90','90.0','-90','360','NaN'])expect(rotationAngle(r,raw)).toBeUndefined()
 for(const bad of [null,{}, {...r,title:' '},{...r,start:'north'},{...r,direction:'clockwise'},{...r,choices:[0,45,90]},{...r,choices:[0,90,90]},{...r,choices:[90,0]},{...r,choices:[0,90,180,270,360]},{...r,choices:[90]},{...r,answer:45},{...r,hint:''},{...r,wrong:''}])expect(validWordRotation(bad)).toBe(false)
})
