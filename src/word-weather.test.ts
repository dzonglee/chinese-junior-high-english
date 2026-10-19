import {expect,it} from 'vitest'
import {validWordWeather,changeWeather,weatherMatches,wordWeatherView} from './core/word-weather'
import type {WordWeather} from './core/word-weather'
const rain:WordWeather={kind:'rain',initial:'calm',answer:'active',title:'接满雨水',hint:'观察起点和结果。',wrong:'还没有接满雨水。'}
it('requires a legal observed condition rather than a chosen condition or malformed persisted flag',()=>{
 expect(validWordWeather(rain)).toBe(true)
 for(const raw of ['', 'active','active:observed:extra',' active:observed','active:observed ','other:observed','calm:observed'])expect(weatherMatches(rain,raw)).toBe(false)
 expect(changeWeather('','observe')).toBeUndefined();let raw=changeWeather('','active')!;expect(weatherMatches(rain,raw)).toBe(false);expect(wordWeatherView(rain,raw).scene).toContain('空');raw=changeWeather(raw,'observe')!;expect(weatherMatches(rain,raw)).toBe(true);expect(wordWeatherView(rain,raw).scene).toContain('满');expect(changeWeather(raw,'observe')).toBeUndefined();expect(changeWeather(raw,'reset')).toBe('active:ready');expect(changeWeather(raw,'calm')).toBe('calm:ready');expect(changeWeather(raw,'forge')).toBeUndefined()
 for(const change of [{kind:'storm'},{initial:'invalid'},{answer:'invalid'},{title:''},{hint:' leading'},{wrong:'x'.repeat(141)}])expect(validWordWeather({...rain,...change})).toBe(false)
})
it('distinguishes initial and observed scenes for each weather cause without exposing authored answers',()=>{
 for(const kind of ['cloud','rain','snow','wind'] as const){const w={...rain,kind};const start=wordWeatherView(w,''),selected=wordWeatherView(w,'active:ready'),observed=wordWeatherView(w,'active:observed');expect(start.active).toBe(false);expect(selected.active).toBe(false);expect(observed.active).toBe(true);expect(start.canObserve).toBe(false);expect(selected.canObserve).toBe(true);expect('answer' in observed).toBe(false);observed.choices[0].label='Changed';expect(wordWeatherView(w,'active:observed').choices[0].label).not.toBe('Changed')}
 const sun={...rain,kind:'cloud' as const,initial:'active' as const,answer:'calm' as const};expect(wordWeatherView(sun,'calm:ready').active).toBe(true);expect(wordWeatherView(sun,'calm:observed').active).toBe(false);expect(weatherMatches(sun,'calm:observed')).toBe(true)
 expect(wordWeatherView({...rain,kind:'snow'},'active:observed').reading).toContain('原来的脚印');expect(wordWeatherView({...rain,kind:'wind'},'calm:observed').reading).toContain('原处')
})
