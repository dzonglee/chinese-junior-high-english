import {it,expect} from 'vitest'
import {validWordRecordSelection,selectedWordRecords,wordRecordSelectionMatches,toggleWordRecord,wordRecordSelectionView} from './core/word-record-selection'
import type {WordRecordSelection} from './core/word-record-selection'
const records:WordRecordSelection={title:'四天日记',prompt:'圈出有练习的日子。',hint:'逐条核对。',wrong:'重新核对有无练习。',rows:[{id:'mon',label:'Monday',text:'Practice.',include:true},{id:'tue',label:'Tuesday',text:'No practice.',include:false},{id:'thu',label:'Thursday',text:'Practice.',include:true}]}
it('requires an exact canonical set and explicit confirmation for zero records',()=>{
 expect(validWordRecordSelection(records)).toBe(true)
 expect(wordRecordSelectionMatches(records,'mon|thu')).toBe(true)
 for(const raw of ['', '@none','mon','mon|tue|thu','thu|mon','mon|mon|thu','mon|unknown|thu','mon|thu|',' mon|thu'])expect(wordRecordSelectionMatches(records,raw)).toBe(false)
 const never={...records,rows:records.rows.map(r=>({...r,include:false}))}
 expect(wordRecordSelectionMatches(never,'')).toBe(false);expect(wordRecordSelectionMatches(never,'@none')).toBe(true)
 expect(selectedWordRecords(records,'thu|mon')).toBeUndefined()
 expect(toggleWordRecord(records,'@none','thu')).toBe('thu')
 expect(toggleWordRecord(records,'thu','mon')).toBe('mon|thu')
 expect(toggleWordRecord(records,'mon','mon')).toBe('')
 expect(toggleWordRecord(records,'mon','unknown')).toBeUndefined()
 expect(wordRecordSelectionView(records,'mon').status).toBe('已圈出 1 条')
 expect(wordRecordSelectionView(records,'@none').noneSelected).toBe(true)
 expect(wordRecordSelectionView(records,'mon').rows.every(r=>!('include' in r)&&!('correct' in r))).toBe(true)
})
it('validates bounded records and rejects malformed or ambiguous bindings',()=>{
 for(const invalid of [null,{}, {...records,title:' '},{...records,prompt:''},{...records,wrong:' '},{...records,hint:''},{...records,rows:[]},{...records,rows:[records.rows[0]]},{...records,rows:[records.rows[0],records.rows[0]]},{...records,rows:[{...records.rows[0],id:'@none'},records.rows[1]]},{...records,rows:[{...records.rows[0],include:'true'},records.rows[1]]},{...records,rows:[{...records.rows[0],text:' '},records.rows[1]]},{...records,rows:[{...records.rows[0],label:' '},records.rows[1]]}])expect(validWordRecordSelection(invalid)).toBe(false)
})
it('binds a people view to an authored speaker without exposing answer membership',()=>{
 const people:WordRecordSelection={...records,layout:'people',speakerId:'mon',quote:'Can you help us?'}
 expect(validWordRecordSelection(people)).toBe(true)
 const v=wordRecordSelectionView(people,'mon|thu')
 expect(v.layout).toBe('people');expect(v.speaker).toEqual({name:'Monday',quote:'Can you help us?'})
 expect(v.status).toBe('已选：Monday、Thursday');expect(v.noneLabel).toBe('没有符合的人')
 expect(v.rows.map(r=>r.initial)).toEqual(['M','T','T']);expect(v.rows.every(r=>!('include' in r)&&!('correct' in r))).toBe(true)
 expect(wordRecordSelectionView(people,'@none').status).toBe('已确认：没有符合的人')
 expect(wordRecordSelectionView(records,'').layout).toBeUndefined();expect(wordRecordSelectionView(records,'').speaker).toBeUndefined()
 for(const invalid of [{...people,speakerId:'missing'},{...people,quote:''},{...people,quote:' x '},{...people,quote:'x'.repeat(161)},{...people,layout:'cards'},{...records,speakerId:'mon'},{...records,quote:'Quote.'},{...people,layout:undefined}])expect(validWordRecordSelection(invalid)).toBe(false)
})
