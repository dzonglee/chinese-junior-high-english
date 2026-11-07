import {expect,it} from 'vitest'
import {validWordOverlap,changeOverlap,overlapMatches,wordOverlapView} from './core/word-overlap'
const model=()=>({title:'两段动作是否重叠',first:'I read the map',second:'my friend checked the signs',hint:'示意相对时段，不标实际钟点。',wrong:'这里的while要求两段动作有重叠，不要求起止完全相同。'})
it('validates bounded authored overlap labels without accepting empty or malformed metadata',()=>{
 const w=model();expect(validWordOverlap(w)).toBe(true)
 for(const key of ['title','first','second','hint','wrong'])for(const value of ['',null,' trailing ', 'x'.repeat(181)])expect(validWordOverlap({...w,[key]:value})).toBe(false)
 expect(validWordOverlap(null)).toBe(false);expect(validWordOverlap([])).toBe(false);expect(validWordOverlap({...w,clockTime:'12:00'})).toBe(false)
})
it('accepts overlap and rejects completely separated periods in either order',()=>{
 for(const state of ['before','overlap','after']){expect(changeOverlap(state)).toBe(state);expect(overlapMatches(state)).toBe(state==='overlap')}
 expect(overlapMatches('')).toBe(false)
})
it('resets and rejects unknown actions without treating a corrupt saved value as placed',()=>{
 expect(changeOverlap('reset')).toBe('')
 for(const action of ['unknown',' overlap','overlap ','BEFORE'])expect(changeOverlap(action)).toBeUndefined()
 for(const raw of ['unknown',' overlap','overlap ']){expect(overlapMatches(raw)).toBe(false);expect(wordOverlapView(model(),raw).chosen).toBe(false)}
})
it('keeps the overlap schematic partial and bounded without inventing equal durations or timestamps',()=>{
 const w=model(),before=JSON.stringify(w),v=wordOverlapView(w,'overlap');expect(v.secondStyle).toBe('left:50%;width:35%;');expect(v.reading).toContain('不要求起止时刻完全相同');expect(wordOverlapView(w,'').secondStyle).toBe('');expect(wordOverlapView(w,'').reading).toContain('不提供实际开始时间');expect(JSON.stringify(w)).toBe(before)
})
