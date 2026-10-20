import {expect,it} from 'vitest'
import {boatMatches,changeBoat,validWordBoat,wordBoatView} from './core/word-boat'
const task={title:'把桅杆和帆装到船身上',hint:'先装桅杆，再挂帆。',wrong:'按顺序搭好示意船。'}
it('requires mast before sail and removes the unsupported sail when the mast is removed',()=>{
 expect(validWordBoat(task)).toBe(true);expect(changeBoat('','sail')).toBe('');expect(wordBoatView(task,'').choices.find(c=>c.id==='sail')!.disabled).toBe(true)
 let raw=changeBoat('','mast')!;expect(raw).toBe('mast');expect(boatMatches(raw)).toBe(false);expect(wordBoatView(task,raw).mast).toBe(true);expect(wordBoatView(task,raw).sail).toBe(false);raw=changeBoat(raw,'sail')!;expect(boatMatches(raw)).toBe(true);expect(wordBoatView(task,raw).reading).toContain('没有交代造船结果');expect(wordBoatView(task,raw).sail).toBe(true);expect(changeBoat(raw,'sail')).toBe('mast');expect(changeBoat(raw,'mast')).toBe('');expect(changeBoat(raw,'reset')).toBe('');expect('answer'in wordBoatView(task,raw)).toBe(false)
 const view=wordBoatView(task,raw);view.choices[0].label='Changed';expect(wordBoatView(task,raw).choices[0].label).toBe('拆下桅杆')
})
it('rejects forged assembly states and invalid payloads without claiming real-world boat success or feelings',()=>{
 for(const raw of ['','sail','mast-sail ',' mast-sail','mast-sail:done','sailed','fun']){expect(boatMatches(raw)).toBe(false);expect(wordBoatView(task,raw).mast).toBe(false);expect(wordBoatView(task,raw).sail).toBe(false)}
 expect(changeBoat('mast','fly')).toBeUndefined();expect(changeBoat('mast','sail ')).toBeUndefined();for(const patch of [{title:''},{hint:' wrong '},{wrong:'x'.repeat(141)}])expect(validWordBoat({...task,...patch})).toBe(false);for(const value of [null,undefined,[],true,'boat'])expect(validWordBoat(value)).toBe(false)
})
