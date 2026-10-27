import {expect,it} from 'vitest'
import {changeComposeOcclusion,composeOcclusionMatch,composeOcclusionView,validComposeOcclusion} from './compose-occlusion'
const model={title:'遮住与移开',hint:'只改变示意云的位置',wrong:'先观察模型，再说明结论边界'}
it('keeps unknown observations distinct from both explored obstruction states',()=>{
 expect(validComposeOcclusion(model)).toBe(true)
 for(const value of ['', 'unknown','{"covered":true}','cover clear','false']){expect(composeOcclusionMatch(value)).toBe(false);const view=composeOcclusionView(model,value);expect(view.chosen).toBe(false);expect(view.markerVisible).toBe(false);expect(view.reading).toContain('尚未表示观察结果')}
 for(const first of ['cover','clear']){let value=changeComposeOcclusion('',first)!;expect(composeOcclusionMatch(value)).toBe(true);const a=composeOcclusionView(model,value);expect(a.covered).toBe(first==='cover');expect(a.markerVisible).toBe(first==='clear');expect(a.boundary).toContain('不表示真实月相');value=changeComposeOcclusion(value,first==='cover'?'clear':'cover')!;expect(composeOcclusionMatch(value)).toBe(true);expect(composeOcclusionView(model,value).markerVisible).toBe(first==='cover');expect(changeComposeOcclusion(value,'reset')).toBe('');expect(composeOcclusionMatch(changeComposeOcclusion(value,'reset')!)).toBe(false)}
})
it('rejects malformed model metadata and unsupported persisted actions without inventing observations',()=>{
 for(const value of [null,[],{}, {...model,title:''},{...model,hint:2},{...model,title:' padded '},{...model,hint:'x'.repeat(111)},{...model,wrong:'x'.repeat(141)},{...model,actualDate:'invented'}])expect(validComposeOcclusion(value)).toBe(false)
 for(const action of ['add','gone','{"cover":true}','clear:all',''])expect(changeComposeOcclusion('cover',action)).toBeUndefined()
 const mapped={...model,title:'different'};const view=composeOcclusionView(mapped,'cover');view.title='changed';expect(model.title).toBe('遮住与移开');expect(mapped.title).toBe('different');expect(composeOcclusionView(model,'cover').reading).toContain('没有被移走')
})
