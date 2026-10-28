import{it,expect}from'vitest'
import{validWordRouteFrame,changeRouteFrame,routeFrameMatch,wordRouteFrameView}from'./core/word-route-frame'
const make=(kind:'across'|'through'|'along'|'towards'|'beyond')=>({kind,title:'比关系',hint:'固定参照物',wrong:'再比较方向与原句'})
it('distinguishes all fifteen route/reference states without treating directions as arrivals',()=>{
 for(const[kind,states,answer]of [['across',['cross','parallel','side'],'cross'],['through',['inside','surface','around'],'inside'],['along',['beside','cross','finished'],'beside'],['towards',['direction','away','arrived'],'direction'],['beyond',['far-side','near-side','top'],'far-side']]as const){const x=make(kind);for(const state of states){expect(changeRouteFrame(x,'',state)).toBe(state);expect(routeFrameMatch(x,state)).toBe(state===answer);expect(wordRouteFrameView(x,state).choices.filter(c=>c.selected).map(c=>c.id)).toEqual([state])}}
 expect(wordRouteFrameView(make('towards'),'arrived').reading).toContain('不能只凭towards');expect(wordRouteFrameView(make('along'),'finished').reading).toContain('额外提出的结果')
})
it('keeps unset and corrupt persisted values unknown and permits deliberate recovery only',()=>{
 for(const kind of ['across','through','along','towards','beyond']as const){const x=make(kind);for(const raw of ['','forged','false','{}']){expect(wordRouteFrameView(x,raw)).toMatchObject({selected:'',chosen:false});expect(routeFrameMatch(x,raw)).toBe(false)}const good=wordRouteFrameView(x,'').choices[0].id;expect(changeRouteFrame(x,'forged',good)).toBeUndefined();expect(changeRouteFrame(x,'forged','reset')).toBe('');expect(changeRouteFrame(x,good,'reset')).toBe('');for(const bad of ['toString','constructor','__proto__','reset:all'])expect(changeRouteFrame(x,'',bad)).toBeUndefined()}
})
it('preserves the fixed viewpoint and scope of each illustration and returns fresh labels',()=>{
 expect(wordRouteFrameView(make('beyond'),'far-side').reading).toContain('固定观察者');expect(wordRouteFrameView(make('beyond'),'far-side').reading).toContain('不表示实际距离');expect(wordRouteFrameView(make('across'),'cross').reading).toContain('是否能够通行');expect(wordRouteFrameView(make('through'),'inside').reading).toContain('不是实际剖面');const x=make('towards'),view=wordRouteFrameView(x,'direction');view.choices[0].label='changed';expect(wordRouteFrameView(x,'direction').choices[0].label).toBe('朝芦苇丛，未确认到达');expect(view.reading).toContain('toward本身不保证')
})
it('requires exact known metadata and bounded trimmed teaching copy',()=>{
 expect(validWordRouteFrame(make('through'))).toBe(true);for(const patch of [{kind:{}},{kind:'constructor'},{kind:'toString'},{extra:'unknown'},{title:''},{hint:' padded '},{title:'x'.repeat(61)},{hint:'x'.repeat(111)},{wrong:'x'.repeat(141)}])expect(validWordRouteFrame({...make('across'),...patch})).toBe(false);expect(validWordRouteFrame([])).toBe(false);expect(validWordRouteFrame(null)).toBe(false)
})
