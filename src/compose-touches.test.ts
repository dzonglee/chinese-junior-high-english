import {expect,it} from 'vitest'
import {validComposeTouches,changeComposeTouches,composeTouchesMatch,composeTouchesView} from './core/compose-touches'
import type {ComposeTouches} from './core/compose-touches'
const model=():ComposeTouches=>({title:'四人触球',hint:'标记不同队员，并区分得分前后。',wrong:'四名队员都要在得分前触球。',players:['a','b','c','d'].map(id=>({id,label:'队员 '+id.toUpperCase()}))})
it('requires four distinct named players and rejects control identifiers in authored touch rules',()=>{
 const w=model();expect(validComposeTouches(w)).toBe(true)
 for(const players of [w.players.slice(0,3),[...w.players,w.players[0]],[w.players[0],w.players[0],...w.players.slice(2)],w.players.map((p,i)=>i? p:{...p,id:'before'}),w.players.map((p,i)=>i?p:{...p,label:' '})])expect(validComposeTouches({...w,players})).toBe(false)
 expect(validComposeTouches({...w,title:''})).toBe(false);expect(validComposeTouches(null)).toBe(false)
})
it('accepts every touch order only after all four different players meet the before-score condition',()=>{
 const w=model(),permutations=(xs:string[]):string[][]=>xs.length?xs.flatMap((x,i)=>permutations(xs.filter((_,j)=>i!==j)).map(t=>[x,...t])):[[]],orders=permutations(['a','b','c','d']);expect(orders).toHaveLength(24)
 for(const order of orders){let raw='';for(const[i,id]of order.entries()){raw=changeComposeTouches(w,raw,id)!;expect(composeTouchesView(w,raw).count).toBe(i+1);expect(composeTouchesMatch(w,raw)).toBe(i===3)}const after=changeComposeTouches(w,raw,'after')!;expect(composeTouchesView(w,after).count).toBe(4);expect(composeTouchesMatch(w,after)).toBe(false);expect(composeTouchesMatch(w,changeComposeTouches(w,after,'before')!)).toBe(true)}
})
it('reverses one player marker or the whole board without accumulating duplicate participation',()=>{
 const w=model(),before=JSON.stringify(w);let raw='';raw=changeComposeTouches(w,raw,'a')!;raw=changeComposeTouches(w,raw,'a')!;expect(composeTouchesView(w,raw).count).toBe(0)
 for(const id of ['a','b','c','d'])raw=changeComposeTouches(w,raw,id)!;raw=changeComposeTouches(w,raw,'b')!;expect(composeTouchesMatch(w,raw)).toBe(false);expect(composeTouchesView(w,raw).players.find(p=>p.id==='b')!.touched).toBe(false);expect(changeComposeTouches(w,raw,'reset')).toBe('');expect(JSON.stringify(w)).toBe(before)
})
it('rejects corrupt or unknown touch records and never describes a met condition as a guaranteed score',()=>{
 const w=model();for(const raw of ['before:a|a|b|c','before:a|b|c|x','before:a|b|c|d|e','later:a|b|c|d',' before:a|b|c|d','before:a|b|c|d ']){expect(composeTouchesMatch(w,raw)).toBe(false);expect(changeComposeTouches(w,raw,'a')).toBeUndefined();expect(changeComposeTouches(w,raw,'reset')).toBe('')}
 expect(changeComposeTouches(w,'','unknown')).toBeUndefined();expect(composeTouchesView(w,'before:a|b|c|d').reading).toContain('不表示自动得分');expect(composeTouchesView(w,'after:a|b|c|d').reading).toContain('不能满足得分前');expect(composeTouchesView(w,'before:a|b|c').ready).toBe(false)
})
