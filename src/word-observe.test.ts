import {describe,it,expect} from 'vitest'
import {validWordObserve,changeObserve,observeMatch,wordObserveView} from './core/word-observe'
const w={title:'观察，不搬动',hint:'虚构示意，只演示位置。',wrong:'请留在原位观察。'}
describe('stationary observation',()=>{
 it('distinguishes attention from moving the pot and resets the decision',()=>{
  const before=wordObserveView(w,''),observed=wordObserveView(w,changeObserve('','observe')!),moved=wordObserveView(w,changeObserve('observe','move')!);expect(observed.plantStyle).toBe(before.plantStyle);expect(observed.moved).toBe(false);expect(observed.reading).toContain('没有移动');expect(moved.plantStyle).not.toBe(before.plantStyle);expect(moved.moved).toBe(true);expect(observeMatch('observe')).toBe(true);for(const raw of ['','move','forged','observe|move'])expect(observeMatch(raw)).toBe(false);expect(changeObserve('move','reset')).toBe('');expect(wordObserveView(w,'').choices.every(c=>!c.selected)).toBe(true)
 })
 it('rejects malformed state and controls and does not accept invalid configuration',()=>{
  expect(validWordObserve(w)).toBe(true);for(const value of [null,{}, {...w,title:' '},{...w,hint:' x'},{...w,wrong:'x'.repeat(141)}])expect(validWordObserve(value)).toBe(false);expect(changeObserve('forged','observe')).toBeUndefined();expect(changeObserve('','forged')).toBeUndefined();expect(changeObserve('move','observe')).toBe('observe');expect(wordObserveView(w,'forged').chosen).toBe('');const v=wordObserveView(w,'observe');v.choices[0].label='changed';expect(wordObserveView(w,'observe').choices[0].label).toBe('留在原位观察')
 })
})
