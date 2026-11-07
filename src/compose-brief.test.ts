import {mapWorkshop,type LessonWorkshop} from './core/lesson-workshop'
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

describe('position-neutral conditional planning',()=>{
 const argument:ComposeBrief={title:'Two defensible positions',hint:'Choose a position and connect reasons.',wrong:'The reasons must support your chosen position.',fields:[{id:'stance',label:'Position',answer:'support',choices:[{id:'support',label:'Support daily reading'},{id:'oppose',label:'Oppose a compulsory daily block'}]},{id:'reason',label:'Reason',answer:'habit',choices:[{id:'habit',label:'A regular time can help build a habit.'},{id:'choice',label:'Different learners may need different uses of the time.'},{id:'guarantee',label:'Every learner will get full marks.'}]}],paths:{selector:'stance',answers:{support:{reason:'habit'},oppose:{reason:'choice'}}}}
 it('accepts either coherent position and rejects stale or contradictory reasons',()=>{
  expect(validComposeBrief(argument)).toBe(true)
  for(const stance of ['_','0','1'])for(const reason of ['_','0','1','2']){const raw=stance+reason;expect(composeBriefMatches(argument,raw)).toBe(raw==='00'||raw==='11')}
  let raw=changeComposeBrief(argument,'','reason:habit')!;expect(composeBriefMatches(argument,raw)).toBe(false);raw=changeComposeBrief(argument,raw,'stance:support')!;expect(composeBriefMatches(argument,raw)).toBe(true);raw=changeComposeBrief(argument,raw,'stance:oppose')!;expect(composeBriefMatches(argument,raw)).toBe(false);expect(composeBriefView(argument,raw).fields[1].reading).toContain('habit');raw=changeComposeBrief(argument,raw,'reason:choice')!;expect(composeBriefMatches(argument,raw)).toBe(true);expect(composeBriefMatches(argument,changeComposeBrief(argument,raw,'stance:clear')!)).toBe(false);expect(changeComposeBrief(argument,raw,'reset')).toBe('')
 })
 it('rejects incomplete, extra, inherited or invalid conditional answer mappings',()=>{
  for(const paths of [{selector:'missing',answers:argument.paths!.answers},{selector:'stance',answers:{support:{reason:'habit'}}},{selector:'stance',answers:{support:{reason:'habit'},oppose:{reason:'missing'}}},{selector:'stance',answers:{support:{reason:'habit',extra:'choice'},oppose:{reason:'choice'}}},{selector:'stance',answers:{support:{reason:'habit'},extra:{reason:'choice'}}},{selector:'stance',answers:{support:{reason:'habit'},oppose:Object.create({reason:'choice'})}},{selector:'stance',answers:argument.paths!.answers,extra:true}])expect(validComposeBrief({...argument,paths})).toBe(false)
  const cloned=structuredClone(argument);cloned.paths!.answers.oppose.reason='habit';expect(argument.paths!.answers.oppose.reason).toBe('choice')
 })
})


describe('budget diagram linked to an explicitly chosen budget',()=>{
 const c:ComposeBrief={title:'Budget',hint:'Compare totals.',wrong:'Check the whole pack.',fields:[{id:'budget',label:'Budget',answer:'twelve',choices:[{id:'twelve',label:'Original 12'},{id:'eighteen',label:'Hypothetical 18'}]},{id:'result',label:'Result',answer:'short',choices:[{id:'short',label:'3 short'},{id:'left',label:'3 left'}]}],paths:{selector:'budget',answers:{twelve:{result:'short'},eighteen:{result:'left'}}},money:{title:'Compare',note:'Original need stays one.',selector:'budget',amounts:{twelve:12,eighteen:18},original:'twelve',cost:15,single:6,quantity:3}}
 it('uses one exact yuan per cell for both budgets, the single and the whole pack',()=>{
  expect(validComposeBrief(c)).toBe(true)
  for(const[raw,budget,reading]of [['0_',12,'还差 3'],['1_',18,'剩 3']]as const){const m=composeBriefView(c,raw).money!;expect(m.scale).toBe(18);expect(m.budget).toBe(budget);expect(m.rows.map(r=>r.cells.filter(x=>x.filled).length)).toEqual([budget,6,15]);expect(m.rows.every(r=>r.cells.length===18)).toBe(true);expect(m.reading).toContain(reading);expect(m.originalBudget).toBe(12);expect(m.hypothetical).toBe(raw==='1_');expect(c.money!.amounts.twelve).toBe(12)}
 })
 it('does not invent an active budget after clearing, resetting or restoring malformed choices',()=>{
  for(const raw of ['', '__','_1','garbage','20','00x',changeComposeBrief(c,'11','budget:clear')!,changeComposeBrief(c,'11','reset')!]){const v=composeBriefView(c,raw);expect(v.money!.budget).toBeUndefined();expect(v.money!.selected).toBe('');expect(v.money!.rows[0].cells.some(x=>x.filled)).toBe(false);expect(v.money!.reading).toContain('点上方预算');expect(v.complete).toBe(false)}
 })
 it('rejects mismatched, inherited, fractional and unbounded money metadata',()=>{
  const m=c.money!;for(const patch of [{selector:'missing'},{original:'eighteen'},{amounts:{twelve:12}},{amounts:{twelve:12,eighteen:18,extra:1}},{amounts:Object.assign(Object.create({twelve:12,eighteen:18}),{a:1,b:2})},{amounts:{twelve:-12,eighteen:18}},{cost:NaN},{cost:Infinity},{single:0},{single:6.5},{quantity:1},{quantity:6},{cost:31},{extra:true}])expect(validComposeBrief({...c,money:{...m,...patch}})).toBe(false)
 })
 it('keeps drawing state separate from correctness and deep-copies translated money metadata',()=>{
  const without=structuredClone(c);delete without.money
  for(const a of ['_','0','1'])for(const b of ['_','0','1'])expect(composeBriefMatches(c,a+b)).toBe(composeBriefMatches(without,a+b))
  const w:LessonWorkshop={kind:'compose',title:'Title',instruction:'Write your own reason.',items:[{id:'budget',label:'Budget',prompt:'Compare',answer:'',hint:'Compare',reason:'Compare',composeBrief:c}]};const mapped=mapWorkshop(w,t=>'Translated '+t);mapped.items[0].composeBrief!.money!.amounts.twelve=1;expect(c.money!.amounts.twelve).toBe(12);expect(mapped.items[0].composeBrief!.money!.title).toBe('Translated Compare');expect(mapped.items[0].composeBrief!.money!.note).toBe('Translated Original need stays one.');expect(mapped.items[0].composeBrief!.money!.selector).toBe('budget')
 })
})
