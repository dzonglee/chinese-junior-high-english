import {expect,it} from 'vitest'
import {daylightPhases,validWordDaylight,changeDaylight,daylightMatches,wordDaylightView} from './core/word-daylight'
import type {WordDaylight} from './core/word-daylight'
const task:WordDaylight={answer:'dawn',event:'到达观景点',title:'把到达放在日出前',hint:'先到达，再看到日出。',wrong:'太阳还没升起时已经到达。'}
it('requires an explicit legal event position and rejects invented times or malformed saved flags',()=>{
 expect(validWordDaylight(task)).toBe(true);for(const value of ['', 'Dawn',' dawn','dawn ','dawn:observed','06:00','reset'])expect(daylightMatches(task,value)).toBe(false)
 for(const value of ['forward','24:00','sunrise:ready','day:observed'])expect(changeDaylight(value)).toBeUndefined()
 expect(changeDaylight('reset')).toBe('');expect(daylightMatches(task,'dawn')).toBe(true);expect(daylightMatches(task,'sunrise')).toBe(false)
 for(const patch of [{answer:'morning'},{event:''},{title:' trailing '},{hint:''},{wrong:'x'.repeat(141)}])expect(validWordDaylight({...task,...patch})).toBe(false)
})
it('shows a neutral day without credit, keeps morning and evening distinct, and never exposes the answer',()=>{
 const neutral=wordDaylightView(task,'');expect(neutral.phase).toBe('day');expect(neutral.chosen).toBe(false);expect(neutral.choices.some(x=>x.selected)).toBe(false);expect('answer' in neutral).toBe(false);expect(neutral.event).toBe('到达观景点')
 for(const phase of daylightPhases){const v=wordDaylightView(task,phase);expect(v.chosen).toBe(true);expect(v.phase).toBe(phase);expect(v.choices.filter(x=>x.selected).map(x=>x.id)).toEqual([phase]);expect('answer' in v).toBe(false);v.choices[0].label='Changed';expect(wordDaylightView(task,phase).choices[0].label).toBe('黎明')}
 expect(wordDaylightView(task,'dawn').scene).toContain('早晨');expect(wordDaylightView(task,'dusk').scene).toContain('傍晚');expect(wordDaylightView(task,'sunrise').scene).toContain('升起');expect(wordDaylightView(task,'sunset').scene).toContain('落向');expect(wordDaylightView(task,'forged').chosen).toBe(false);expect(wordDaylightView(task,changeDaylight('reset')!).phase).toBe('day')
})
