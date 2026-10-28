import{it,expect}from'vitest'
import{validWordRelationScene,changeRelationScene,relationSceneMatch,wordRelationSceneView}from'./core/word-relation-scene'
const fixture=(kind:'under'|'over'|'above'|'below'|'into'|'onto')=>({kind,title:'摆关系',hint:'参照物固定',wrong:'关系还没对应'})
it('distinguishes all eighteen semantic states and preserves both offset above/below placements',()=>{
 for(const[kind,states,good]of [['under',['under','on','beside'],['under']],['over',['across','bank','in-water'],['across']],['above',['upper-left','upper-right','lower'],['upper-left','upper-right']],['below',['lower-left','lower-right','upper'],['lower-left','lower-right']],['into',['before','inside','beside'],['inside']],['onto',['before','seat','air'],['seat']]]as const){const w=fixture(kind);for(const state of states){expect(changeRelationScene(w,'',state)).toBe(state);expect(relationSceneMatch(w,state)).toBe((good as readonly string[]).includes(state));const v=wordRelationSceneView(w,state);expect(v.chosen).toBe(true);expect(v.choices.filter(c=>c.selected).map(c=>c.id)).toEqual([state])}}
})
it('keeps unknown and corrupted states unchosen, closes actions and allows explicit reset',()=>{
 for(const kind of ['under','over','above','below','into','onto']as const){const w=fixture(kind),state=wordRelationSceneView(w,'').choices[0].id;expect(wordRelationSceneView(w,'')).toMatchObject({selected:'',chosen:false});expect(wordRelationSceneView(w,'corrupt')).toMatchObject({selected:'',chosen:false});expect(relationSceneMatch(w,'')).toBe(false);expect(changeRelationScene(w,'corrupt',state)).toBeUndefined();expect(changeRelationScene(w,'corrupt','reset')).toBe('');expect(changeRelationScene(w,state,'reset')).toBe('');for(const invalid of ['toString','__proto__','constructor','unknown'])expect(changeRelationScene(w,'',invalid)).toBeUndefined()}
 expect(changeRelationScene(fixture('over'),'','seat')).toBeUndefined()
})
it('separates instructions from completed actions and returns fresh semantic labels',()=>{
 expect(wordRelationSceneView(fixture('into'),'inside').reading).toContain('不证明现实中已经执行');expect(wordRelationSceneView(fixture('under'),'under').reading).toContain('不证明已经放好了');expect(wordRelationSceneView(fixture('onto'),'seat').reading).toContain('不保证它以后一直');expect(wordRelationSceneView(fixture('over'),'across').reading).toContain('不提供实际尺寸或承重');const w=fixture('above'),v=wordRelationSceneView(w,'upper-left');v.choices[0].label='Changed';expect(wordRelationSceneView(w,'upper-left').choices[0].label).toBe('挂到左上方')
})
it('requires a known frame and bounded trimmed teaching metadata',()=>{
 expect(validWordRelationScene(fixture('onto'))).toBe(true);for(const patch of [{unknown:'extra'},{kind:{}},{kind:'toString'},{kind:'constructor'},{title:''},{hint:' padded '},{wrong:'x'.repeat(141)}])expect(validWordRelationScene({...fixture('under'),...patch})).toBe(false);expect(validWordRelationScene([])).toBe(false);expect(validWordRelationScene(null)).toBe(false)
})
