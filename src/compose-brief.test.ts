import {describe,it,expect} from 'vitest'
import {validComposeBrief,changeComposeBrief,composeBriefMatches,composeBriefView,type ComposeBrief} from './core/compose-brief'
const config:ComposeBrief={title:'Invitation card',hint:'Match the brief before drafting.',wrong:'Check the day, time and place.',fields:[{id:'day',label:'Day',answer:'friday',choices:[{id:'friday',label:'Friday'},{id:'saturday',label:'Saturday'},{id:'sunday',label:'Sunday'}]},{id:'time',label:'Time',answer:'four',choices:[{id:'two',label:'14:00'},{id:'four',label:'16:00'},{id:'six',label:'18:00'}]},{id:'place',label:'Place',answer:'library',choices:[{id:'hall',label:'School hall'},{id:'classroom',label:'Classroom'},{id:'library',label:'Library'}]}]}
describe('invitation brief planning',()=>{
 it('preserves every necessary fact across all 64 partial and complete cards and reversible changes',()=>{
  expect(validComposeBrief(config)).toBe(true)
  for(const day of ['_','0','1','2'])for(const time of ['_','0','1','2'])for(const place of ['_','0','1','2']){const raw=day+time+place;expect(composeBriefMatches(config,raw)).toBe(raw==='012');const v=composeBriefView(config,raw);expect(v.fields.map(f=>f.chosen)).toEqual([...raw].map(n=>n!=='_'));for(let i=0;i<3;i++)expect(v.fields[i].choices.filter(c=>c.selected)).toHaveLength(raw[i]==='_'?0:1)}
  let raw='';for(const a of ['place:library','time:four','day:friday'])raw=changeComposeBrief(config,raw,a)!;expect(raw).toBe('012');expect(composeBriefMatches(config,raw)).toBe(true)
  raw=changeComposeBrief(config,raw,'day:saturday')!;expect(composeBriefMatches(config,raw)).toBe(false);expect(composeBriefView(config,raw).fields[1].reading).toBe('16:00');expect(changeComposeBrief(config,raw,'day:clear')).toBe('_12');expect(changeComposeBrief(config,raw,'reset')).toBe('');expect(composeBriefMatches(config,'')).toBe(false)
 })
 it('rejects malformed states/actions and invalid or ambiguous authored fields',()=>{
  for(const raw of ['012\n','012x','01','312','01|2','__proto__','constructor']){expect(composeBriefMatches(config,raw)).toBe(false);expect(changeComposeBrief(config,raw,'day:friday')).toBeUndefined()}
  for(const a of ['day:friday\n','__proto__:friday','constructor:friday','day:constructor','day:friday:extra','missing:clear','reset\n'])expect(changeComposeBrief(config,'',a)).toBeUndefined()
  expect(validComposeBrief({...config,fields:[{...config.fields[0],answer:'clear',choices:[{id:'clear',label:'Ambiguous reset action'},{id:'valid',label:'Valid'}]}]})).toBe(false);expect(validComposeBrief({...config,fields:[]})).toBe(false);expect(validComposeBrief({...config,fields:[config.fields[0],config.fields[0]]})).toBe(false);expect(validComposeBrief({...config,fields:[{...config.fields[0],answer:'missing'}]})).toBe(false);expect(validComposeBrief({...config,fields:[{...config.fields[0],choices:[config.fields[0].choices[0],config.fields[0].choices[0]]}]})).toBe(false)
 })
})
