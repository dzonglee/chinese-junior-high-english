import {it,expect} from 'vitest'
import {composeConditionsMatch,composeConditionsView,changeComposeConditions,validComposeConditions} from './compose-conditions'
const m={title:'Match conditions',hint:'Change only the fold',wrong:'Another condition changed',rows:[{id:'paper',label:'Paper',left:'Same sheet type and size',same:'Same type and size',changed:'Different thickness'},{id:'gap',label:'Support gap',left:'Same support gap',same:'Same gap',changed:'Wider gap'},{id:'objects',label:'Test objects',left:'Same test objects',same:'Same objects',changed:'Different objects'}]}
it('distinguishes all eight complete setups and requires all comparison conditions',()=>{
 for(let mask=0;mask<8;mask++){let value='{}';for(const[index,row]of m.rows.entries())value=changeComposeConditions(m,value,row.id+':'+(mask&(1<<index)?'changed':'same'))!;expect(composeConditionsMatch(m,value)).toBe(mask===0);expect(composeConditionsView(m,value).chosen).toBe(3)}
 for(const row of m.rows){let value='{}';for(const other of m.rows.filter(x=>x.id!==row.id))value=changeComposeConditions(m,value,other.id+':same')!;expect(composeConditionsMatch(m,value)).toBe(false);expect(composeConditionsView(m,value).chosen).toBe(2)}
})
it('preserves explicit unknown conditions and allows undo/reset without inferring a winner',()=>{
 let value='{}';const initial=composeConditionsView(m,value);expect([initial.paper,initial.gap,initial.objects]).toEqual(['unknown','unknown','unknown']);for(const row of m.rows)value=changeComposeConditions(m,value,row.id+':same')!;expect(composeConditionsMatch(m,value)).toBe(true);value=changeComposeConditions(m,value,'gap:changed')!;expect(composeConditionsView(m,value).gap).toBe('changed');expect(composeConditionsMatch(m,value)).toBe(false);value=changeComposeConditions(m,value,'gap:clear')!;expect(composeConditionsView(m,value).gap).toBe('unknown');expect(changeComposeConditions(m,value,'reset')).toBe('{}');expect(initial).not.toHaveProperty('winner');expect(initial).not.toHaveProperty('loadLimit')
})
it('rejects malformed stored or action data instead of granting ready status',()=>{
 for(const value of ['null','[]','"same"','{bad','{"paper":"same","gap":"same","objects":"same","winner":"B"}','{"paper":"same","gap":"same","objects":"unknown"}'])expect(composeConditionsMatch(m,value)).toBe(false)
 for(const action of ['winner:B','paper:same:extra','gap:unknown','objects','__proto__:same'])expect(changeComposeConditions(m,'{}',action)).toBeUndefined()
 const value=changeComposeConditions(m,'{"paper":"same"}','gap:same')!;expect(composeConditionsView(m,JSON.stringify(JSON.parse(value))).paper).toBe('same')
})
it('requires all three distinct condition types and distinct nonempty alternatives',()=>{
 expect(validComposeConditions(m)).toBe(true)
 for(const bad of [null,{}, {...m,rows:m.rows.slice(0,2)},{...m,rows:[m.rows[0],m.rows[0],m.rows[2]]},{...m,rows:m.rows.map(row=>({...row,same:''}))},{...m,rows:m.rows.map(row=>({...row,changed:row.same}))},{...m,rows:m.rows.map(row=>({...row,id:'other-'+row.id}))}])expect(validComposeConditions(bad)).toBe(false)
})
