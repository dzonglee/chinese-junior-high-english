import {it,expect}from'vitest'
import {composeCoverageKey,validComposeCoverage,composeCoverageMatch,composeCoverageView,changeComposeCoverage}from'./compose-coverage'
const model={title:'观察范围',hint:'对照记录',wrong:'不能扩大',pathLabel:'这条短路',otherPlacesLabel:'其他地区（未观察）',otherTimesLabel:'其他时间（未观察）',afternoons:['下午1','下午2','下午3']as[string,string,string]}
it('keeps three observed cells fixed while testing all four claimed scopes',()=>{
 const original=JSON.stringify(model)
 for(const place of ['path','town'])for(const time of ['three','year']){const s=JSON.stringify({place,time}),v=composeCoverageView(model,s);expect(v.rows.flatMap(r=>r.cells).filter(c=>c.observed)).toHaveLength(3);expect(v.claimedCells).toBe((place==='path'?1:2)*(time==='three'?3:4));expect(v.ready).toBe(place==='path'&&time==='three');expect(v.rows.flatMap(r=>r.cells).filter(c=>!c.observed).every(c=>c.label==='未观察')).toBe(true)}
 expect(JSON.stringify(model)).toBe(original)
})
it('does not silently claim coverage for unknown or partial choices',()=>{
 for(const raw of ['','{}','{"place":"path"}','{"time":"three"}']){const v=composeCoverageView(model,raw);expect(v.ready).toBe(false);expect(v.claimedCells).toBe(0);expect(v.rows.flatMap(r=>r.cells).filter(c=>c.observed)).toHaveLength(3)}
 expect(composeCoverageKey('one')).not.toBe(composeCoverageKey('two'))
})
it('supports editing, clearing and resetting without altering the supplied observations',()=>{
 let s=changeComposeCoverage('','place:path')!;s=changeComposeCoverage(s,'time:three')!;expect(composeCoverageMatch(s)).toBe(true);s=changeComposeCoverage(s,'place:town')!;expect(composeCoverageMatch(s)).toBe(false);s=changeComposeCoverage(s,'place:path')!;expect(composeCoverageMatch(s)).toBe(true)
 for(const a of ['place:clear','time:clear','reset']){const result=changeComposeCoverage(s,a)!;expect(composeCoverageMatch(result)).toBe(false);expect(composeCoverageView(model,result).claimedCells).toBe(0)}
})
it('rejects malformed state, crossed actions and ambiguous observation labels',()=>{
 for(const raw of ['null','[]','broken','{"place":"three","time":"path"}','{"place":"path","time":"three","count":0}'])expect(composeCoverageMatch(raw)).toBe(false)
 for(const a of ['place:three','time:town','place:country','__proto__:year'])expect(changeComposeCoverage('{}',a)).toBeUndefined()
 expect(validComposeCoverage(model)).toBe(true);for(const x of [{...model,afternoons:['one','two']},{...model,afternoons:['same','same','same']},{...model,pathLabel:''},{...model,otherPlacesLabel:model.pathLabel},{...model,title:'x'.repeat(61)},{...model,hint:' padded '},{...model,afternoons:['one','two','x'.repeat(25)]}])expect(validComposeCoverage(x)).toBe(false)
})
