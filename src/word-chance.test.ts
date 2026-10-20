import {expect,it} from 'vitest'
import {chanceMatches,changeChance,validWordChance,wordChanceView} from './core/word-chance'
const task={title:'每人一次试投机会',hint:'比较这次规则下的机会，不比较得分。',wrong:'给四位示意参与者各一次机会。'}
it('allocates this specified one-turn rule without treating opportunity as guaranteed score',()=>{
 let raw='';expect(validWordChance(task)).toBe(true);expect(wordChanceView(task,raw).total).toBe(0);expect(changeChance(raw,'a-')).toBe('');raw=changeChance(raw,'a+')!;raw=changeChance(raw,'a+')!;expect(changeChance(raw,'a+')).toBe(raw);expect(wordChanceView(task,raw).people.map(p=>p.count)).toEqual([2,0,0,0]);expect(chanceMatches(raw)).toBe(false)
 raw=changeChance(raw,'a-')!;for(const id of ['b','c','d'])raw=changeChance(raw,id+'+')!;expect(chanceMatches(raw)).toBe(true);expect(wordChanceView(task,raw).people.map(p=>p.count)).toEqual([1,1,1,1]);expect(wordChanceView(task,raw).reading).toContain('不保证最后得分相同');expect(changeChance(raw,'reset')).toBe('');expect('answer'in wordChanceView(task,raw)).toBe(false)
 const view=wordChanceView(task,raw);view.people[0].label='Changed';view.people[0].count=2;expect(wordChanceView(task,raw).people[0]).toEqual({id:'a',label:'甲',count:1})
})
it('rejects forged counts and invalid controls, and keeps the one-turn constraint separate from universal fairness',()=>{
 for(const raw of ['','1111 ',' 1111','111','11111','1131','-111','equal']){expect(chanceMatches(raw)).toBe(false);expect(wordChanceView(task,raw).total).toBe(0)}expect(chanceMatches('2222')).toBe(false);expect(wordChanceView(task,'2222').total).toBe(8)
 for(const action of ['e+','a++','a','a+ ','+a','a:1'])expect(changeChance('1111',action)).toBeUndefined();for(const patch of [{title:''},{hint:' wrong '},{wrong:'x'.repeat(141)}])expect(validWordChance({...task,...patch})).toBe(false);for(const value of [null,undefined,[],true,'chance'])expect(validWordChance(value)).toBe(false)
})
