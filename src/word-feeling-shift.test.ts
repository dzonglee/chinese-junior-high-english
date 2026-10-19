import {expect,it} from 'vitest'
import {changeFeelingShift,feelingShiftMatches,validWordFeelingShift,wordFeelingShiftView} from './core/word-feeling-shift'
import type {WordFeelingShift} from './core/word-feeling-shift'
const task:WordFeelingShift={title:'友好消息带来怎样的变化',feeling:'lonely',event:'收到一条友好的消息',answer:'less',hint:'只标变化方向。',wrong:'less表示减轻。'}
it('represents reported feeling direction without a numerical measurement or proof of physical company',()=>{
 expect(validWordFeelingShift(task)).toBe(true)
 for(const [choice,symbol]of [['less','↓'],['same','='],['more','↑']]){expect(changeFeelingShift(choice)).toBe(choice);expect(feelingShiftMatches(choice)).toBe(choice==='less');const view=wordFeelingShiftView(task,choice);expect(view.chosen).toBe(true);expect(view.symbol).toBe(symbol);expect(view.choices.filter(c=>c.selected).map(c=>c.id)).toEqual([choice]);expect(view.description).toContain('本次设置');expect('answer'in view).toBe(false)}
 expect(wordFeelingShiftView(task,'less').description).toContain('不等于完全没有孤独感');expect(changeFeelingShift('reset')).toBe('');expect(wordFeelingShiftView(task,'').chosen).toBe(false);expect(wordFeelingShiftView(task,'').symbol).toBe('?');const view=wordFeelingShiftView(task,'less');view.choices[0].label='Changed';expect(wordFeelingShiftView(task,'less').choices[0].label).toBe('减轻 ↓')
})
it('rejects forged completions, unsupported directions and malformed feeling-change tasks',()=>{
 for(const value of ['','less ',' less','none','less:done','1']){expect(feelingShiftMatches(value)).toBe(false);expect(wordFeelingShiftView(task,value).chosen).toBe(false);if(value)expect(changeFeelingShift(value)).toBeUndefined()}
 for(const patch of [{title:''},{feeling:' lonely'},{event:''},{answer:'none'},{hint:'x'.repeat(111)},{wrong:'x'.repeat(141)}])expect(validWordFeelingShift({...task,...patch})).toBe(false);for(const value of [null,undefined,[],true,'message'])expect(validWordFeelingShift(value)).toBe(false)
})
