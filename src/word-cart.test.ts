import {describe,it,expect} from 'vitest'
import {validWordCart,cartMatch,changeCart,wordCartView} from './core/word-cart'
const config={title:'施力，让空车移动',hint:'虚构动作只示意移动，不计算真实力或速度。',wrong:'先施力，让空车移动。'}
describe('fictional cart action',()=>{
 it('shows movement after the push and distinguishes leaving the cart in place',()=>{expect(validWordCart(config)).toBe(true);for(const raw of ['','wait','push']){const v=wordCartView(config,raw);expect(v.moved).toBe(raw==='push');expect(cartMatch(raw)).toBe(raw==='push');expect(v.cartStyle).toBe(raw==='push'?'left:51%':'left:5%');expect(v.choices.filter(c=>c.selected)).toHaveLength(raw?1:0)}expect(changeCart('','push')).toBe('push');expect(changeCart('push','wait')).toBe('wait');expect(changeCart('wait','push')).toBe('push');expect(changeCart('push','reset')).toBe('')})
 it('rejects invalid actions and prevents malformed state from counting as movement',()=>{for(const raw of ['pushed','move',' PUSH','push ','bad']){expect(cartMatch(raw)).toBe(false);expect(wordCartView(config,raw).moved).toBe(false);expect(changeCart(raw,'push')).toBeUndefined()}expect(changeCart('','success')).toBeUndefined();expect(validWordCart({...config,hint:' '})).toBe(false);expect(validWordCart({...config,wrong:'x'.repeat(141)})).toBe(false)})
})
