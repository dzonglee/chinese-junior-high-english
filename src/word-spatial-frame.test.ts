import{describe,it,expect}from'vitest'
import{validWordSpatialFrame,wordSpatialFrameView,changeSpatialFrame,spatialFrameMatch}from'./core/word-spatial-frame'
const fixture=(kind:'beside'|'behind'|'between')=>({kind,title:'摆位置',hint:'先看参照物',wrong:'位置不对应'})
describe('fixed spatial reference',()=>{
 it('accepts both sides for beside and only back or middle for the other relations',()=>{
  for(const[kind,states,good]of [['beside',['left','right','front'],['left','right']],['behind',['back','front','inside'],['back']],['between',['middle','left','right'],['middle']]]as const){const w=fixture(kind);expect(spatialFrameMatch(w,'')).toBe(false);for(const state of states){expect(changeSpatialFrame(w,'',state)).toBe(state);expect(spatialFrameMatch(w,state)).toBe((good as readonly string[]).includes(state));expect(wordSpatialFrameView(w,state).choices.filter(c=>c.selected).map(c=>c.id)).toEqual([state])}}
 })
 it('keeps unknowns explicit and closed actions resettable without cross-frame placements',()=>{
  for(const kind of ['beside','behind','between']as const){const w=fixture(kind);expect(wordSpatialFrameView(w,'').chosen).toBe(false);expect(wordSpatialFrameView(w,'corrupt')).toMatchObject({selected:'',chosen:false});expect(changeSpatialFrame(w,'corrupt',wordSpatialFrameView(w,'').choices[0].id)).toBeUndefined();expect(changeSpatialFrame(w,'corrupt','reset')).toBe('');expect(changeSpatialFrame(w,'','toString')).toBeUndefined();expect(changeSpatialFrame(w,'','__proto__')).toBeUndefined();expect(changeSpatialFrame(w,wordSpatialFrameView(w,'').choices[0].id,'reset')).toBe('')}
  expect(changeSpatialFrame(fixture('behind'),'','middle')).toBeUndefined();expect(changeSpatialFrame(fixture('beside'),'','inside')).toBeUndefined()
 })
 it('preserves reference language and returns fresh isolated views',()=>{
  const w=fixture('beside'),view=wordSpatialFrameView(w,'left');expect(view.reading).toContain('左侧或右侧都可以');view.choices[0].label='Changed';expect(wordSpatialFrameView(w,'left').choices[0].label).toBe('坐在左侧');expect(wordSpatialFrameView(fixture('behind'),'back').reading).toContain('正门');expect(wordSpatialFrameView(fixture('between'),'middle').reading).toContain('两堵石墙之间')
 })
 it('requires a known frame and bounded nonblank teaching metadata',()=>{
  expect(validWordSpatialFrame(fixture('beside'))).toBe(true);for(const change of [{metres:3},{kind:'near'},{title:''},{hint:' x '},{wrong:'x'.repeat(141)}])expect(validWordSpatialFrame({...fixture('behind'),...change})).toBe(false);expect(validWordSpatialFrame(null)).toBe(false);expect(validWordSpatialFrame([])).toBe(false)
 })
})
