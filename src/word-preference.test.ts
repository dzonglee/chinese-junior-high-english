import {describe,it,expect} from 'vitest'
import {validWordPreference,preferenceMatch,changePreference,wordPreferenceView} from './core/word-preference'
const config={title:'谁更喜欢？',hint:'prefer A to B；A更喜欢。',wrong:'别颠倒A和B。'}
describe('preference roles',()=>{
 it('puts the chosen activity in the preferred role and keeps its comparison separate',()=>{expect(validWordPreference(config)).toBe(true);for(const raw of ['','walking','waiting']){const v=wordPreferenceView(config,raw);expect(preferenceMatch(raw)).toBe(raw==='walking');expect(v.selected).toBe(raw);expect(v.choices.filter(c=>c.selected)).toHaveLength(raw?1:0);if(raw==='walking'){expect(v.preferred).toBe('步行');expect(v.comparison).toBe('等拥挤的公交')}if(raw==='waiting'){expect(v.preferred).toBe('等拥挤的公交');expect(v.comparison).toBe('步行')}}expect(changePreference('','waiting')).toBe('waiting');expect(changePreference('waiting','walking')).toBe('walking');expect(changePreference('walking','reset')).toBe('')})
 it('rejects forged role strings, unknown actions and missing instructional copy',()=>{for(const raw of ['walk',' WALKING','walking ','both','bus']){expect(preferenceMatch(raw)).toBe(false);expect(changePreference(raw,'walking')).toBeUndefined();expect(wordPreferenceView(config,raw).selected).toBe('')}expect(changePreference('','success')).toBeUndefined();expect(validWordPreference({...config,hint:' '})).toBe(false)})
})
