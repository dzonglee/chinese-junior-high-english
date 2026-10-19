import {describe,it,expect} from 'vitest'
import {wordClockView,validWordClock,clockInterval} from './core/word-clock'
import type {WordClock} from './core/word-clock'
const clock:WordClock={title:'推过午夜',start:'23:45',days:['Friday','Saturday'],intervals:[0,15,30,45,60],answer:15,hint:'选择等待的时长。',wrong:'再核对时长与日期。'}
describe('authored clock arithmetic',()=>{
 it('shows midnight on the following day and keeps hour/minute hands exact',()=>{
  expect(wordClockView(clock,'15')).toMatchObject({time:'00:00',day:'Saturday',hourStyle:'transform:rotate(0deg);',minuteStyle:'transform:rotate(0deg);',ready:true})
  expect(wordClockView(clock,'30')).toMatchObject({time:'00:15',day:'Saturday',hourStyle:'transform:rotate(7.5deg);',minuteStyle:'transform:rotate(90deg);'})
  expect(wordClockView({...clock,start:'11:45'},'15')).toMatchObject({time:'12:00',day:'Friday'})
  expect(wordClockView(clock,'')).toMatchObject({time:'23:45',day:'Friday',ready:false})
  expect(wordClockView(clock,'60').options.filter(o=>o.selected).map(o=>o.id)).toEqual(['60'])
 })
 it('rejects unlisted, noncanonical and forged persistent intervals',()=>{
  for(const raw of ['015','-1','15.0','15 ',' 15','Infinity','NaN','61','1e1','10']){expect(clockInterval(clock,raw)).toBeUndefined();expect(wordClockView(clock,raw).ready).toBe(false)}
 })
 it('validates the bounded schema without accepting a generated time',()=>{
  expect(validWordClock(clock)).toBe(true)
  for(const value of [null,{}, {...clock,start:'24:00'},{...clock,start:'12:60'},{...clock,start:'9:15'},{...clock,days:['Friday']},{...clock,days:['Friday','Friday']},{...clock,intervals:[0,15,15]},{...clock,intervals:[-1,15]},{...clock,intervals:[15,61]},{...clock,intervals:[0,1.5,15]},{...clock,answer:20},{...clock,title:' '},{...clock,hint:''},{...clock,wrong:' ' }])expect(validWordClock(value)).toBe(false)
 })
})
