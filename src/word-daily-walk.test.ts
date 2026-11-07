import {expect,it} from 'vitest'
import {dailyWalkMatches,changeDailyWalk,validWordDailyWalk,wordDailyWalkView} from './core/word-daily-walk'
const task={title:'用示意周表示daily',hint:'daily表示每天，不是全天不停。',wrong:'给示意周的每天安排步行。'}
it('distinguishes an illustrative daily habit from only weekdays and from continuous activity',()=>{
 let raw='';expect(validWordDailyWalk(task)).toBe(true);expect(wordDailyWalkView(task,raw).count).toBe(0)
 for(const day of ['mon','tue','wed','thu','fri'])raw=changeDailyWalk(raw,day)!;expect(wordDailyWalkView(task,raw).count).toBe(5);expect(dailyWalkMatches(raw)).toBe(false);expect(wordDailyWalkView(task,raw).reading).toContain('不只工作日')
 raw=changeDailyWalk(raw,'sat')!;expect(dailyWalkMatches(raw)).toBe(false);raw=changeDailyWalk(raw,'sun')!;expect(dailyWalkMatches(raw)).toBe(true);expect(wordDailyWalkView(task,raw).count).toBe(7);expect(wordDailyWalkView(task,raw).reading).toContain('不等于全天不停');raw=changeDailyWalk(raw,'sat')!;expect(dailyWalkMatches(raw)).toBe(false);expect(changeDailyWalk(raw,'reset')).toBe('');expect('answer'in wordDailyWalkView(task,raw)).toBe(false)
 const a=wordDailyWalkView(task,raw);a.days[0].label='Changed';a.days[0].selected=false;expect(wordDailyWalkView(task,raw).days[0]).toEqual({id:'mon',label:'周一',selected:true})
})
it('rejects forged schedules and malformed payloads without inventing attendance evidence',()=>{
 for(const raw of ['','1111111 ',' 1111111','111111','11111111','daily','111111x','true']){expect(dailyWalkMatches(raw)).toBe(false);expect(wordDailyWalkView(task,raw).count).toBe(0)}
 expect(changeDailyWalk('','monday')).toBeUndefined();expect(changeDailyWalk('','mon ')).toBeUndefined();expect(changeDailyWalk('0000001','sun')).toBe('');for(const patch of [{title:''},{hint:' wrong '},{wrong:'x'.repeat(141)}])expect(validWordDailyWalk({...task,...patch})).toBe(false);for(const value of [null,undefined,[],true,'walk'])expect(validWordDailyWalk(value)).toBe(false)
})
