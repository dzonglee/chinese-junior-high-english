import {expect,it} from 'vitest'
import {climateTemperatures,climateHumidities,validWordClimate,changeClimate,climateMatches,wordClimateView} from './core/word-climate'
import type {WordClimate} from './core/word-climate'
const cool:WordClimate={criterion:'temperature',answer:'cool',title:'把空气调成凉爽',hint:'温湿度分开设置。',wrong:'这里要求凉爽。'},humid:WordClimate={...cool,criterion:'humidity',answer:'high'}
it('keeps humidity and temperature independent and accepts humid air at every temperature',()=>{
 for(const temperature of climateTemperatures)for(const humidity of climateHumidities){const raw=changeClimate(changeClimate('',temperature)!,humidity)!;expect(climateMatches(cool,raw)).toBe(temperature==='cool');expect(climateMatches(humid,raw)).toBe(humidity==='high');expect(wordClimateView(cool,raw).temperature).toBe(temperature);expect(wordClimateView(humid,raw).humidity).toBe(humidity)}
 expect(climateMatches(cool,'cool:')).toBe(true);expect(climateMatches(humid,':high')).toBe(true);expect(climateMatches(humid,'hot:')).toBe(false);expect(climateMatches(cool,':high')).toBe(false)
 expect(changeClimate('cool:high','hot')).toBe('hot:high');expect(changeClimate('cool:high','low')).toBe('cool:low');expect(changeClimate('cool:high','reset')).toBe('');expect(wordClimateView(cool,'').chosen).toBe(false)
})
it('rejects forged saved conditions and invalid payloads without exposing an answer or numeric measurements',()=>{
 for(const raw of ['', 'cool','high','Cool:high','cool:high:checked',' cool:high','cool:high ','30:80',':','reset']){expect(climateMatches(cool,raw)).toBe(false);expect(climateMatches(humid,raw)).toBe(false)}
 for(const action of ['warm:high','80%','30°C','observed','wet',' high'])expect(changeClimate('',action)).toBeUndefined()
 expect(validWordClimate(cool)).toBe(true);expect(validWordClimate(humid)).toBe(true)
 for(const patch of [{criterion:'rain'},{answer:'freezing'},{answer:'high'},{title:''},{hint:' trailing '},{wrong:'x'.repeat(141)}])expect(validWordClimate({...cool,...patch})).toBe(false)
 const view=wordClimateView(humid,'cool:high');expect('answer' in view).toBe(false);expect('criterion' in view).toBe(false);view.temperatures[0].label='changed';expect(wordClimateView(cool,'').temperatures[0].label).toBe('凉爽 cool');expect(view.reading).toContain('较高 high')
})
