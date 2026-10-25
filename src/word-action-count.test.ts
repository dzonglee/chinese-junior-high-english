import {describe,it,expect} from 'vitest'
import {validWordActionCount,actionCountMatch,changeActionCount,wordActionCountView,wordActionCountKey} from './core/word-action-count'
const one={title:'读一次',hint:'开始前',wrong:'核对次数和先后',target:1 as const,actionLabel:'读说明',boundaryLabel:'开始'}
const two={...one,title:'核对两次',target:2 as const,actionLabel:'核对总额',boundaryLabel:'发送订单'}
describe('action counts before a boundary',()=>{
 it('distinguishes all counts and both temporal relations for once and twice',()=>{
  for(const w of [one,two]){expect(validWordActionCount(w)).toBe(true);expect(actionCountMatch(w,'')).toBe(false)
   for(const phase of ['before','after'])for(let n=0;n<=3;n++){const raw=phase+':'+n,v=wordActionCountView(w,raw);expect(v.marks.filter(m=>m.filled)).toHaveLength(n);expect(v.count).toBe(n);expect(v.before).toBe(phase==='before');expect(v.after).toBe(phase==='after');expect(actionCountMatch(w,raw)).toBe(phase==='before'&&n===w.target)}
  }
  expect(actionCountMatch(one,'before:2')).toBe(false);expect(actionCountMatch(two,'before:1')).toBe(false);expect(wordActionCountKey('twice')).not.toBe(wordActionCountKey('once'))
 })
 it('retains action count across temporal edits, supports reversal and rejects malformed actions',()=>{
  let raw='';for(const n of [1,2,3]){raw=changeActionCount(raw,'more')!;expect(raw).toBe('before:'+n)}expect(changeActionCount(raw,'more')).toBeUndefined();raw=changeActionCount(raw,'after')!;expect(raw).toBe('after:3');for(const n of [2,1,0]){raw=changeActionCount(raw,'less')!;expect(raw).toBe('after:'+n)}expect(changeActionCount(raw,'less')).toBeUndefined();expect(changeActionCount(raw,'before')).toBe('before:0');expect(changeActionCount(raw,'reset')).toBe('')
  for(const value of ['before:01','before:-1','after:4','before:1\n','after:2\r','before:1\u2028','__proto__','constructor','before:NaN']){expect(actionCountMatch(one,value)).toBe(false);expect(changeActionCount(value,'more')).toBeUndefined();expect(wordActionCountView(one,value).chosen).toBe(false)}for(const action of ['__proto__','constructor','more\n','4'])expect(changeActionCount('',action)).toBeUndefined();expect(validWordActionCount({...one,target:3})).toBe(false);expect(validWordActionCount({...one,actionLabel:''})).toBe(false)
 })
})
