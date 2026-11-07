import {it,expect} from 'vitest'
import {validWordDoor,doorState,changeDoor,doorMatches,wordDoorView} from './core/word-door'
const door={title:'松手以后会怎样？',people:['Amy','Leo'],answer:'automatic' as const,hint:'比较关门原因，旁边的人始终不变。',wrong:'选择自动闭门并松手观察。'}
it('validates authored door causes and bounded unambiguous bystander names',()=>{
 expect(validWordDoor(door)).toBe(true)
 for(const value of [null,{}, {...door,answer:'none'}, {...door,title:' '}, {...door,people:[]}, {...door,people:['Amy','Amy']}, {...door,people:['Amy','Leo','Mia']}, {...door,people:[' Amy']}, {...door,hint:'x'.repeat(121)}])expect(validWordDoor(value)).toBe(false)
})
it('rejects unobserved and noncanonical door states rather than accepting forged flags',()=>{
 for(const raw of ['', 'automatic','automatic:pushed','person:closed','automatic:released:extra',' automatic:released','automatic:RELEASED','automatic:released\n']){
  expect(doorMatches(door,raw)).toBe(false);expect(doorState(raw)).toEqual({mode:'',phase:'ready'});expect(wordDoorView(door,raw).closed).toBe(false)
 }
 expect(doorMatches(door,'automatic:ready')).toBe(false);expect(doorMatches(door,'automatic:released')).toBe(true)
})
it('distinguishes release from a person pushing and requires observing the authored cause',()=>{
 expect(changeDoor('','release')).toBeUndefined();expect(changeDoor('','push')).toBeUndefined()
 let s=changeDoor('','person')!;expect(s).toBe('person:ready');expect(changeDoor(s,'push')).toBeUndefined();s=changeDoor(s,'release')!;expect(wordDoorView(door,s).closed).toBe(false);expect(wordDoorView(door,s).canPush).toBe(true)
 s=changeDoor(s,'push')!;expect(wordDoorView(door,s).closed).toBe(true);expect(doorMatches(door,s)).toBe(false);expect(doorMatches({...door,answer:'person'},s)).toBe(true)
 s=changeDoor(s,'automatic')!;expect(wordDoorView(door,s).closed).toBe(false);expect(changeDoor(s,'push')).toBeUndefined();s=changeDoor(s,'release')!;expect(doorMatches(door,s)).toBe(true);expect(changeDoor(s,'release')).toBeUndefined();expect(changeDoor(s,'reset')).toBe('automatic:ready')
})
it('keeps nearby people fixed and returns independent answer-free door previews',()=>{
 const auto=wordDoorView(door,'automatic:released'),manual=wordDoorView(door,'person:pushed');expect(auto.people).toEqual(manual.people);expect(auto.reading).toContain('没有推门');expect(manual.reading).toContain('由人');expect('answer' in auto).toBe(false)
 auto.people[0].name='Changed';auto.modes[0].selected=false;expect(door.people[0]).toBe('Amy');expect(wordDoorView(door,'automatic:released').people[0].name).toBe('Amy');expect(wordDoorView(door,'automatic:released').modes[0].selected).toBe(true)
 for(const action of ['set:closed','person:pushed','release ','push:1'])expect(changeDoor('automatic:ready',action)).toBeUndefined()
})
