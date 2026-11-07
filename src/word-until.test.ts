import {expect,it} from 'vitest'
import {changeUntil,untilMatches,validWordUntil,wordUntilView} from './core/word-until'
import type {WordUntil} from './core/word-until'
const task:WordUntil={title:'给无聊时段放一个终点',feeling:'bored',events:[{id:'before',label:'出题前'},{id:'puzzle',label:'导游出题'},{id:'after',label:'出题后'}],answer:'puzzle',hint:'按事件顺序，不表示时长。',wrong:'终点在导游出题时。'}
it('places an until endpoint at an explicitly recorded event without inventing time or exposing an answer',()=>{
 expect(validWordUntil(task)).toBe(true)
 for(const[index,event]of task.events.entries()){expect(changeUntil(task,event.id)).toBe(event.id);expect(untilMatches(task,event.id)).toBe(event.id==='puzzle');const view=wordUntilView(task,event.id);expect(view.chosen).toBe(true);expect(view.spanStyle).toBe(`width:${index*50}%;`);expect(view.markerStyle).toBe(`left:${index*50}%;`);expect(view.events.filter(e=>e.selected).map(e=>e.id)).toEqual([event.id]);expect(view.reading).toContain(event.label);expect('answer'in view).toBe(false)}
 expect(changeUntil(task,'reset')).toBe('');for(const value of ['', 'puzzle ', ' puzzle','solved','1','puzzle:complete']){expect(untilMatches(task,value)).toBe(false);expect(wordUntilView(task,value).chosen).toBe(false)}for(const value of ['solved','1','puzzle:complete'])expect(changeUntil(task,value)).toBeUndefined()
 const view=wordUntilView(task,'puzzle');view.events[0].label='Changed';expect(task.events[0].label).toBe('出题前')
})
it('rejects malformed event timelines, duplicate identifiers and absent endpoints',()=>{
 for(const patch of [{title:''},{feeling:' bored '},{events:[]},{events:[task.events[0]]},{events:[...task.events,task.events[0]]},{events:[{id:'invalid id',label:'Bad'},task.events[1]]},{events:[{id:'before',label:''},task.events[1]]},{answer:'solved'},{hint:'x'.repeat(101)},{wrong:'x'.repeat(141)}])expect(validWordUntil({...task,...patch})).toBe(false)
 const four={...task,events:[...task.events,{id:'later',label:'更晚'}],answer:'later'};expect(validWordUntil(four)).toBe(true);expect(wordUntilView(four,'later').spanStyle).toBe('width:100%;');expect(untilMatches(four,'later')).toBe(true)
})
