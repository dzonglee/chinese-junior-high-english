import {describe,it,expect} from 'vitest'
import {validWordFlash,flashMatch,changeFlash,wordFlashView} from './core/word-flash'
const config={title:'示意闪光灯',hint:'只限制闪光摄影；其他规定另查。',wrong:'请关闭示意闪光灯。'}
describe('schematic flash restriction',()=>{
 it('requires an explicit off setting rather than assuming an untouched control is compliant',()=>{expect(validWordFlash(config)).toBe(true);for(const raw of ['','on','off']){const v=wordFlashView(config,raw);expect(flashMatch(raw)).toBe(raw==='off');expect(v.active).toBe(raw==='on');expect(v.choices.filter(c=>c.selected)).toHaveLength(raw?1:0)}expect(changeFlash('','on')).toBe('on');expect(changeFlash('on','off')).toBe('off');expect(wordFlashView(config,'off').reading).toContain('其他拍照规定仍需另查');expect(changeFlash('off','reset')).toBe('')})
 it('rejects forged settings and unknown actions without invoking any camera API',()=>{for(const raw of ['false','OFF','off ','0','disabled']){expect(flashMatch(raw)).toBe(false);expect(changeFlash(raw,'off')).toBeUndefined();expect(wordFlashView(config,raw).selected).toBe('')}expect(changeFlash('','capture')).toBeUndefined();expect(validWordFlash({...config,title:' '})).toBe(false)})
})
