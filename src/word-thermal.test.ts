import {expect,it} from 'vitest'
import {thermalStarts,thermalRises,validWordThermal,changeThermal,thermalMatches,wordThermalView} from './core/word-thermal'
import type {WordThermal} from './core/word-thermal'
const task:WordThermal={title:'任选示例起点，升高一度',answer:1,hint:'起点只是练习示例。',wrong:'差值应是一度。'}
it('uses a difference of one degree at every example starting point instead of a fixed final reading',()=>{
 for(const start of thermalStarts)for(const rise of thermalRises){const raw=changeThermal(changeThermal('','start-'+start)!,'rise-'+rise)!;expect(thermalMatches(task,raw)).toBe(rise===1);const view=wordThermalView(task,raw);expect(view.start).toBe(start);expect(view.end).toBe(start+rise);expect(view.rise).toBe(rise);expect(view.reading).toBe(`${start+rise} − ${start} = ${rise} degree${rise===1?'':'s'}`)}
 expect(changeThermal('10:1','start-20')).toBe('20:1');expect(changeThermal('20:1','rise-2')).toBe('20:2');expect(changeThermal('20:1','reset')).toBe('');expect(wordThermalView(task,'').end).toBeNull();expect(wordThermalView(task,'').chosen).toBe(false);expect(wordThermalView(task,'20:').end).toBeNull()
})
it('rejects invented readings, forged saved completion and unsupported actions without exposing the answer',()=>{
 for(const raw of ['', '1','14:1','10:01','10:1:observed','10:1 ',' 10:1','25:1','10:-1','start-10','20:'])expect(thermalMatches(task,raw)).toBe(false)
 for(const action of ['10:1','start-25','rise-3','rise--1','observed'])expect(changeThermal('',action)).toBeUndefined()
 expect(validWordThermal(task)).toBe(true);for(const patch of [{answer:3},{answer:'1'},{title:''},{hint:' trailing '},{wrong:'x'.repeat(141)}])expect(validWordThermal({...task,...patch})).toBe(false)
 const view=wordThermalView(task,'20:1');expect('answer' in view).toBe(false);expect(view.ticks.map(t=>t.label)).toEqual(['0','5','10','15','20','25']);view.starts[0].label='Changed';expect(wordThermalView(task,'').starts[0].label).toBe('10°C')
})
