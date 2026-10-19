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
it('keeps written thunder, one lightning event, fog occlusion, rising mist and solid hail as distinct records',()=>{
 const checks=[['thunder','文字记录','醒'],['lightning','一次闪电','照亮'],['fog','对岸没有消失','挡'],['mist','湖面升起','薄雾'],['hail','固态冰雹','弹开']] as const
 for(const [kind,reading,scene]of checks){const w={...rain,kind};expect(validWordWeather(w)).toBe(true);expect(wordWeatherView(w,'active:ready').active).toBe(false);const view=wordWeatherView(w,'active:observed');expect(view.active).toBe(true);expect(view.reading).toContain(reading);expect(view.scene).toContain(scene);expect(weatherMatches(w,'calm:observed')).toBe(false);expect(weatherMatches(w,'active:observed')).toBe(true);expect(wordWeatherView(w,changeWeather('active:observed','reset')!).active).toBe(false);expect('answer' in view).toBe(false)}
 expect(wordWeatherView({...rain,kind:'lightning'},'').choices.map(x=>x.id)).toEqual(['calm','active']);expect(wordWeatherView({...rain,kind:'hail'},'calm:observed').reading).toContain('液态');expect(wordWeatherView({...rain,kind:'fog'},'calm:observed').scene).toContain('看见')
})

it('keeps candle extinction as one possible result and window breeze as gentle air rather than a storm',()=>{
 for(const kind of ['candle','breeze'] as const){const w={...rain,kind};expect(validWordWeather(w)).toBe(true);expect(wordWeatherView(w,'active:ready').active).toBe(false);expect(weatherMatches(w,'active:ready')).toBe(false);expect(wordWeatherView(w,'active:observed').active).toBe(true);expect(wordWeatherView(w,'calm:observed').active).toBe(false);expect(wordWeatherView(w,changeWeather('active:observed','reset')!).active).toBe(false)}
 expect(wordWeatherView({...rain,kind:'candle'},'active:observed').reading).toContain('can不表示每次都必然如此');expect(wordWeatherView({...rain,kind:'candle'},'calm:observed').scene).toContain('仍亮着');expect(wordWeatherView({...rain,kind:'breeze'},'active:observed').reading).toContain('没有暴风或破窗');expect(wordWeatherView({...rain,kind:'breeze'},'calm:observed').scene).toContain('窗户打开')
})
