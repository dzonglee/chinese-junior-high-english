import {workshopExpressionActions} from '../scripts/lib/workshop-test-actions.mjs'
import {productionMinimum} from './core/teaching-production'
import { it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { authorCatalog } from '../scripts/lib/author-content.mjs'
import { Application, type Platform } from './app/application'
import { ContentRepository } from './services/content'
import { StateStore, checkedState } from './services/storage'
import { emptyState } from './core/learning'
import { questionProblems } from './core/validation'
import type { ContentCatalog, Lesson, Question } from './core/types'
import { createLessonTeaching, freshTeaching, restoreTeaching, changeTeaching, teachingCanAdvance, teachingProblems, teachingSentences, assemblyCorrect, sentenceWorkbench } from './core/lesson-teaching'
const root=process.cwd(),read=(file:string)=>JSON.parse(readFileSync(resolve(root,file),'utf8'))
const source:ContentCatalog=authorCatalog(root),manifest=read('dist/manifest.json')
function harness(lesson?: Lesson, simulatedAudio = false) {
  const topicIds = lesson ? [lesson.topicId] : source.topics.map(t => t.id)
  const all = source.questions.filter(q => topicIds.includes(q.topicId))
  const catalog: ContentCatalog = { ...source, topics: source.topics.filter(t => topicIds.includes(t.id)), lessons: lesson ? [lesson] : source.lessons, vocabulary: source.vocabulary.filter(w => topicIds.includes(w.topicId)), media: source.media.map(m => simulatedAudio ? { ...m, approvedByOwner: true, path: 'synthetic-playback:' + m.id } : { ...m }), questions: [], questionIndex: all.map(({ id, topicId, skill, kind, difficulty, grades, marks, estimatedSeconds, mediaId, review }) => ({ id, topicId, skill, kind, difficulty, grades, marks, estimatedSeconds, mediaId, review })) }
  const data = new Map<string, string>(), adapter = { read: (key: string) => data.get(key) ?? null, write: (key: string, value: string) => { data.set(key, value) }, remove: (key: string) => { data.delete(key) } }
  let now = Date.UTC(2026, 9, 17, 2), app: Application
  const store = new StateStore(adapter, catalog, now), grade = lesson ? Math.min(...lesson.grades) as 6 | 7 | 8 | 9 : 9
  store.save({ ...emptyState(now), profile: { cityId: '北京-北京', structure: grade === 6 ? '54' : '63', grade, term: catalog.topics.find(t => t.id === lesson?.topicId)?.course?.term ?? 'upper', editionId: grade === 6 ? 'pep-54' : 'pep-legacy', schoolYear: 2026, dailyMinutes: 20, createdAt: now } })
  const repo = new ContentRepository(catalog, manifest, async pack => readFileSync(resolve(root, 'dist/packs', pack.file), 'utf8'))
  const errors: string[] = []
  const platform: Platform = { now: () => now, navigate: (page, params) => app.open(page, params), back() {}, toast: text => { errors.push(text) }, confirm: async () => true, exportText: async () => {}, importText: async () => null, copy: async () => {}, play: async () => {}, stopAudio() {}, startRecording: async () => {}, stopRecording: async () => ({ path: 'synthetic-recording', durationMs: 1000 }), removeRecordings: async () => {} }
  app = new Application(repo, store, platform)
  return { app, repo, catalog, store, adapter, errors, advance: (ms: number) => { now += ms } }
}


function answer(q:Question):string { return q.kind==='choice'?q.answer.option!:q.kind==='order'?JSON.stringify(q.answer.order):q.kind==='speaking'||q.kind==='writing'?q.answer.display:q.answer.accepted![0] }
it('rejects a reading application whose clue cannot be selected, even when the prediction has usable evidence',()=>{
 const lesson=source.lessons.find(l=>l.id==='l-r-course-t26')!,studio=createLessonTeaching(source,lesson)
 expect(studio.cases[0].id).toBe('q-r-course-t26-1-3')
 expect(teachingProblems(studio,lesson)).toEqual([])
 expect(studio.evidence.some(e=>e.supports)).toBe(true)
 for(const unusable of ['identity uncertain','a nonexistent identity']){
  const broken=structuredClone(studio),q=broken.cases[0]
  q.explanation.visual.segments=q.explanation.visual.segments.map(segment=>segment.role==='evidence'?{...segment,text:unusable}:segment)
  expect(teachingProblems(broken,lesson)).toContain(`l-r-course-t26: missing usable source evidence for ${q.id}`)
 }
})
it.each(source.lessons)('completes the real checked-pack five-phase studio for $id without granting mastery',async lesson=>{
 const h=harness(lesson),a=h.app
 await a.action('open-lesson-studio',lesson.id)
 await a.action('studio-mission-study')
 const s=a.render().teaching!.lesson
 expect(teachingProblems(s,lesson)).toEqual([])
 expect(s.transfer.id).not.toBe(s.prediction.id)
 expect(s.cases.some(q=>q.id===s.transfer.id)).toBe(false)
 expect(a.render().teaching!.mission!.open).toBe(false)
 expect(s.exposedIds).toEqual(lesson.questionIds)
 expect(s.exposedIds.some(id=>lesson.delayedQuestionIds.includes(id))).toBe(false)
 await a.action('studio-next');expect(a.render().teaching!.progress.step).toBe(0)
 if(s.mode==='communication')a.setField('studioBefore','I have one idea for this task.')
 else await a.action('studio-answer','deliberately-wrong')
 await a.action('studio-check');await a.action('studio-next')
 expect(a.render().teaching!.progress.step).toBe(1)
 await a.action('studio-assemble');expect(a.render().teaching!.canAdvance).toBe(false)
 const w=s.mission!.workshop!
 for(let i=0;i<(w.conditions?.length??w.items.length);i++){
  await a.action('studio-workshop-item',String(i));const item=w.items[w.kind==='transform'?0:i]
  if(w.kind==='compose'){await a.action('studio-workshop-check');expect(a.render().teaching!.workshop!.complete).toBe(false);a.setField('studioWorkshopOwn','This is my own specific detail for this part.');await a.action('studio-workshop-check')}
  else if(w.kind==='word-use'){if(item.wordDecision)await a.action('studio-workshop-choose',item.options!.find(o=>o.correct)!.id);if(item.wordDecision?.clock)await a.action('studio-workshop-clock',String(item.wordDecision.clock.answer));if(item.wordDecision?.ruler)await a.action('studio-workshop-ruler',String(item.wordDecision.ruler.answer));if(item.wordDecision?.climate)await a.action('studio-workshop-climate',item.wordDecision.climate.answer);if(item.wordDecision?.until)await a.action('studio-workshop-until',item.wordDecision.until.answer);if(item.wordDecision?.dailyWalk){await a.action('studio-workshop-daily-walk','reset');for(const day of ['mon','tue','wed','thu','fri','sat','sun'])await a.action('studio-workshop-daily-walk',day)}if(item.wordDecision?.reportedChange)await a.action('studio-workshop-reportedChange',item.wordDecision.reportedChange.answer);if(item.wordDecision?.shadePanel)for(const value of ['reset','green','pale'])await a.action('studio-workshop-shadePanel',value);if(item.wordDecision?.rectangleRatio)for(const value of ['reset','length:4','width:2'])await a.action('studio-workshop-rectangleRatio',value);if(item.wordDecision?.spotWings)for(const value of ['reset','a:1','b:1'])await a.action('studio-workshop-spotWings',value);if(item.wordDecision?.wireOrder)for(const value of ['reset','straighten','attach'])await a.action('studio-workshop-wireOrder',value);if(item.wordDecision?.routeTraffic)for(const value of ['reset','a'])await a.action('studio-workshop-routeTraffic',value);if(item.wordDecision?.stampPlacement)await a.action('studio-workshop-stampPlacement','top-right');if(item.wordDecision?.eachItem)for(const value of ['reset','a:1','b:1','c:1'])await a.action('studio-workshop-eachItem',value);if(item.wordDecision?.busBudget){await a.action('studio-workshop-busBudget','reset');for(let n=0;n<item.wordDecision.busBudget.fare;n++)await a.action('studio-workshop-busBudget','reserve')}if(item.wordDecision?.paperUse)for(const value of ['reset','old:3','new:2'])await a.action('studio-workshop-paperUse',value);if(item.wordDecision?.pathSteps)for(const value of ['reset','left'])await a.action('studio-workshop-pathSteps',value);if(item.wordDecision?.robotWave)for(const value of ['reset','left'])await a.action('studio-workshop-robotWave',value);if(item.wordDecision?.depthLine)for(const value of ['reset','blue','depth'])await a.action('studio-workshop-depthLine',value);if(item.wordDecision?.waterPair)for(const value of ['reset','a:1','b:2'])await a.action('studio-workshop-waterPair',value);if(item.wordDecision?.observe)await a.action('studio-workshop-observe','observe');if(item.wordDecision?.molecule){for(const action of ['add-h','add-h','add-o'])await a.action('studio-workshop-molecule',action);}if(item.wordDecision?.cart)await a.action('studio-workshop-cart','push');if(item.wordDecision?.pattern){for(const action of ['add-circle','add-circle','add-circle'])await a.action('studio-workshop-pattern',action);}if(item.wordDecision?.preference){for(const action of ['walking'])await a.action('studio-workshop-preference',action);}if(item.wordDecision?.flash){for(const action of ['off'])await a.action('studio-workshop-flash',action);}if(item.wordDecision?.processOrder){await a.action('studio-workshop-processOrder','reset');for(const event of item.wordDecision.processOrder.sequence)await a.action('studio-workshop-processOrder',event)}if(item.wordDecision?.queueMove)for(const value of ['reset','long','quick','move'])await a.action('studio-workshop-queueMove',value);if(item.wordDecision?.shelfRoom)for(const value of ['reset','add','add','add'])await a.action('studio-workshop-shelfRoom',value);if(item.wordDecision?.fileDesk)for(const value of ['reset',...(item.wordDecision.fileDesk.mode==='save'?['save','close']:['backup','delete'])])await a.action('studio-workshop-fileDesk',value);if(item.wordDecision?.titleArrow)await a.action('studio-workshop-titleArrow','arrow');if(item.wordDecision?.offlinePage)for(const value of ['reset','save','network','open'])await a.action('studio-workshop-offlinePage',value);if(item.wordDecision?.nameGroups){await a.action('studio-workshop-nameGroups','reset');for(const n of item.wordDecision.nameGroups.names)await a.action('studio-workshop-nameGroups',n.id+':'+(n.name[0]<='M'?'am':'nz'))}if(item.wordDecision?.phoneMode)await a.action('studio-workshop-phoneMode','silent');if(item.wordDecision?.printPages){await a.action('studio-workshop-printPages','reset');for(const n of item.wordDecision.printPages.needed)await a.action('studio-workshop-printPages',String(n))}if(item.wordDecision?.chance){await a.action('studio-workshop-chance','reset');for(const person of ['a','b','c','d'])await a.action('studio-workshop-chance',person+'+')}if(item.wordDecision?.boat){await a.action('studio-workshop-boat','mast');await a.action('studio-workshop-boat','sail')}if(item.wordDecision?.shift)await a.action('studio-workshop-shift','less');if(item.wordDecision?.provision)await a.action('studio-workshop-provision','pack');if(item.wordDecision?.thermal)await a.action('studio-workshop-thermal','rise-'+item.wordDecision.thermal.answer);if(item.wordDecision?.daylight)await a.action('studio-workshop-daylight',item.wordDecision.daylight.answer);if(item.wordDecision?.weather){await a.action('studio-workshop-weather',item.wordDecision.weather.answer);await a.action('studio-workshop-weather','observe')}if(item.wordDecision?.door){await a.action('studio-workshop-door',item.wordDecision.door.answer);await a.action('studio-workshop-door','release');if(item.wordDecision.door.answer==='person')await a.action('studio-workshop-door','push')}if(item.wordDecision?.rotation)await a.action('studio-workshop-rotation',String(item.wordDecision.rotation.answer));if(item.wordDecision?.fraction){await a.action('studio-workshop-fraction','clear');for(let n=0;n<item.wordDecision.fraction.answer;n++)await a.action('studio-workshop-fraction','add')}if(item.wordDecision?.quantity){await a.action('studio-workshop-quantity','clear');for(let n=0;n<item.wordDecision.quantity.answer;n++)await a.action('studio-workshop-quantity','add')}if(item.wordDecision?.recordSelection){await a.action('studio-workshop-record-none');for(const row of item.wordDecision.recordSelection.rows.filter(r=>r.include).slice(0,item.wordDecision.recordSelection.selectionMode==='one'?1:undefined))await a.action('studio-workshop-record-toggle',row.id)}a.setField('studioWorkshopInput','deliberately-wrong');await a.action('studio-workshop-check');expect(a.render().teaching!.workshop!.correct).toBe(false);a.setField('studioWorkshopInput',item.answer);await a.action('studio-workshop-check');await a.action('studio-workshop-save');expect(a.render().teaching!.workshop!.complete).toBe(false);a.setField('studioWorkshopOwn',`I use ${item.answer} in my own example today.`);await a.action('studio-workshop-save')}
  else if(w.kind==='proof'&&item.sourceOrder){
   await a.action('studio-workshop-order-add',item.options!.find(o=>!o.correct)!.id);await a.action('studio-workshop-check');expect(a.render().teaching!.workshop!.correct).toBe(false);await a.action('studio-workshop-order-clear')
   for(const id of [...item.sourceOrder].reverse())await a.action('studio-workshop-order-add',id)
   await a.action('studio-workshop-check');expect(a.render().teaching!.workshop!.correct).toBe(false);await a.action('studio-workshop-order-clear')
   for(const id of item.sourceOrder)await a.action('studio-workshop-order-add',id)
   await a.action('studio-workshop-check');expect(a.render().teaching!.workshop!.complete).toBe(false);a.setField('studioWorkshopOwn','先观察问题，再测试办法，最后才作出选择。');await a.action('studio-workshop-save')
  }
  else {const good=w.kind==='transform'?w.conditions![i].target:item.options!.find(o=>o.correct)!.id;const bad=a.render().teaching!.workshop!.choices.find(o=>o.id!==good)!.id;for(const [action,value] of workshopExpressionActions(w.kind==='transform'?w.conditions![i]:undefined,bad))await a.action('studio-workshop-'+action,value);await a.action('studio-workshop-check');expect(a.render().teaching!.workshop!.correct).toBe(false);if(w.kind==='transform')for(const id of w.conditions![i].world.scene?.subjects??[])await a.action('studio-workshop-subject',id);if(w.kind==='transform')for(const id of w.conditions![i].world.selection?.ids??[])await a.action('studio-workshop-member',id);if(w.kind==='transform'&&w.conditions![i].world.records)await a.action('studio-workshop-record',w.conditions![i].world.records!.answer);for(const [action,value] of workshopExpressionActions(w.kind==='transform'?w.conditions![i]:undefined,good))await a.action('studio-workshop-'+action,value);await a.action('studio-workshop-check');if(w.kind==='proof'){for(const o of item.options!.filter(o=>o.correct&&o.id!==good)){await a.action('studio-workshop-choose',o.id);await a.action('studio-workshop-check')}if(item.sourceSettings){for(const row of item.sourceSettings.rows)await a.action('studio-workshop-setting',row.id+':'+row.answer);await a.action('studio-workshop-settings-check');await a.action('studio-workshop-check')}if(item.sourceRecall){await a.action('studio-workshop-recall-hide');for(const word of item.sourceRecall.words)a.setField('studioRecall-'+word.id,'不记得');await a.action('studio-workshop-recall-reveal');await a.action('studio-workshop-check')}if(item.sourceGap){expect(a.render().teaching!.workshop!.correct).toBe(false);await a.action('studio-workshop-gap',item.sourceGap.answer);await a.action('studio-workshop-gap-check')}if(item.calculation){expect(a.render().teaching!.workshop!.correct).toBe(false);a.setField('studioWorkshopInput',item.calculation.answer);await a.action('studio-workshop-check')}a.setField('studioWorkshopOwn','这条线索说明了题目所问的行动和原因。');await a.action('studio-workshop-save')}}
  expect(a.render().teaching!.workshop!.complete,`${lesson.id}/${i}`).toBe(true)
 }
 await a.action('studio-next');expect(a.render().teaching!.progress.step).toBe(2)
 expect(a.render().teaching!.canAdvance).toBe(false)
 if(s.sorting){for(const card of s.sorting.cards){await a.action('studio-sort',card.id+':'+s.sorting.categories.find(g=>g.id!==card.category)!.id);expect(a.render().teaching!.sortingCards.find(x=>x.id===card.id)!.correct).toBe(false);await a.action('studio-sort',card.id+':'+card.category)}}
 else if(s.mode==='communication'){
  a.setField('studioAfter',s.prediction.answer.display)
  for(const r of s.rubric){const wrong=s.modelSentences.find(t=>!s.roleAnchors[r.id].includes(t.id))!;await a.action('studio-link',r.id+':'+wrong.id);expect(a.render().teaching!.linkFeedback).toBeTruthy();expect(a.render().teaching!.progress.links[r.id]).toBeUndefined();await a.action('studio-link',r.id+':'+s.roleAnchors[r.id][0]);}for(const r of s.revisionRubric)await a.action('studio-rubric',r.id)
  await a.action('studio-review');expect(a.render().teaching!.progress.checked.revision).toBe(true)
 }else if(s.evidence.length){for(const[i]of s.cases.entries()){await a.action('studio-case',String(i));const e=a.render().teaching!.evidenceItems,wrong=e.find(e=>!e.supports);if(wrong){await a.action('studio-evidence',wrong.id);expect(a.render().teaching!.correct).toBe(false)}await a.action('studio-evidence',e.find(e=>e.supports)!.id);await a.action('studio-answer',answer(s.cases[i]));await a.action('studio-check')}}
 else for(const [i,q] of s.cases.slice(0,s.mode==='vocabulary'?s.cases.length:2).entries()){
  await a.action('studio-case',String(i));await a.action('studio-answer',s.mode==='vocabulary'?`I can use ${s.mission!.workshop!.items[i].answer} in a different example today.`:answer(q));if(s.mode==='vocabulary')await a.action('studio-word-review');await a.action('studio-check');expect(a.render().teaching!.correct,q.id).toBe(true)
 }
 const backup=h.store.export(),restored=checkedState(backup,h.catalog,Date.now())
 expect(restored.teaching![s.id].step).toBe(2)
 expect(new StateStore(h.adapter,h.catalog,Date.now()).get().teaching![s.id].step).toBe(2)
 await a.action('studio-next');expect(a.render().teaching!.progress.step).toBe(3)
 await a.action('studio-diagnose',s.diagnosis.options.find(o=>o.id!==s.diagnosis.correct)!.id);expect(a.render().teaching!.correct).toBe(false)
 await a.action('studio-next');expect(a.render().teaching!.progress.step).toBe(3)
 for(const[i,d]of s.diagnoses.entries()){await a.action('studio-clinic',String(i));await a.action('studio-diagnose',d.correct)}await a.action('studio-next');expect(a.render().teaching!.progress.step).toBe(4)
 await a.action('studio-answer',answer(s.transfer));for(const r of s.transfer.rubric??[])await a.action('studio-rubric',r.id)
 await a.action('studio-check');expect(a.render().teaching!.correct).toBe(true)
 await a.action('studio-next');expect(a.render().teaching!.progress.step).toBe(5)
 expect(h.store.get().attempts).toEqual([]);expect(h.store.get().mastery).toEqual({});expect(h.store.get().lessonDoneAt).toEqual({})
 expect(lesson.delayedQuestionIds.every(id=>!h.store.get().answerSeenAt?.[id])).toBe(true)
 if(s.mediaPending){expect(a.render().actions.find(x=>x.id==='start-lesson')!.disabled).toBe(true);await a.action('start-lesson',lesson.id);expect(a.render().id).not.toBe('session')}
 else {await a.action('start-lesson',lesson.id);const q=a.render().question!;await a.action('choose',answer(h.repo.getQuestion(q.id)!));if(q.kind!=='choice')a.setField('answer',answer(h.repo.getQuestion(q.id)!));for(const r of h.repo.getQuestion(q.id)!.rubric??[])await a.action('toggle-rubric',r.id);await a.action('check');expect(h.store.get().attempts.every(x=>x.evidence!=='independent')).toBe(true)}
 expect(h.errors.filter(x=>!x.includes('音频'))).toEqual([])
})
it.each(['american','british'] as const)('audits %s spelling, all vocabulary assemblies and fresh original communication transfers',spelling=>{
 const repo=new ContentRepository({...source,questions:[...source.questions]},[],async()=>''), words=new Set<string>()
 repo.setSpelling(spelling);for(const lesson of source.lessons){const s=createLessonTeaching(repo.catalog,lesson,spelling);expect(teachingProblems(s,lesson),lesson.id).toEqual([]);if(s.mode==='vocabulary')for(const unit of s.assemblies)words.add(unit.id);if(s.transfer.id.startsWith('teach-')){expect(questionProblems(s.transfer),s.transfer.id).toEqual([]);expect(s.transfer.passage).toBeUndefined();expect(s.transfer.mediaId).toBeUndefined();expect(s.transfer.explanation.visual.segments.some(x=>x.text===s.transfer.answer.display)).toBe(false)}}
 expect(words.size).toBe(1690)
// Both spelling audits traverse all 413 lessons; individual task timeouts stay unchanged.
}, 20000)
it('restores safely after content changes and rejects malformed imported course state atomically',()=>{
 const s=createLessonTeaching(source,source.lessons[0]),p=freshTeaching(s,1);p.before='My own saved draft.';p.after='My revised saved draft.';p.step=4;p.fingerprint='old'
 const restored=restoreTeaching(s,p,2);expect(restored.step).toBe(0);expect(restored.before).toBe(p.before);expect(restored.after).toBe(p.after)
 const h=harness(source.lessons[0]);const backup=JSON.parse(h.store.export());backup.state.teaching={[s.id]:{...freshTeaching(s,1),step:6}};expect(()=>h.store.import(JSON.stringify(backup))).toThrow();expect(h.store.get().teaching).toBeUndefined()
 backup.state.teaching[s.id]={...freshTeaching(s,1),checked:{poison:'yes'}};expect(()=>h.store.import(JSON.stringify(backup))).toThrow()
})
it('preserves sentence abbreviations and accepts equivalent duplicate letter tiles without accepting missing IDs',()=>{
 expect(teachingSentences('Dr. Lee arrived at 3.5. She met Ms. Lin.')).toEqual(['Dr. Lee arrived at 3.5.','She met Ms. Lin.'])
 const s=createLessonTeaching(source,source.lessons.find(l=>source.topics.find(t=>t.id===l.topicId)?.skill==='vocabulary')!),u=s.assemblies.find(x=>new Set(x.tiles.map(t=>t.text)).size<x.tiles.length)!
 const order=[...u.target],same=u.tiles.filter(t=>t.text===u.tiles.find(x=>u.tiles.filter(y=>y.text===x.text).length>1)!.text);const a=order.indexOf(same[0].id),b=order.indexOf(same[1].id);[order[a],order[b]]=[order[b],order[a]];expect(assemblyCorrect(u,order)).toBe(true);order[0]=order[1];expect(assemblyCorrect(u,order)).toBe(false)
 expect(teachingCanAdvance(s,changeTeaching(s,freshTeaching(s,1),'next','',2))).toBe(false)
})

it('marks direct-route content exposure without exposing delayed items',()=>{const h=harness(source.lessons[0]);h.catalog.questions=source.questions.filter(q=>q.topicId===source.lessons[0].topicId);h.app.open('lesson',{id:source.lessons[0].id});expect(source.lessons[0].questionIds.every(id=>h.store.get().answerSeenAt?.[id])).toBe(true);expect(source.lessons[0].delayedQuestionIds.every(id=>!h.store.get().answerSeenAt?.[id])).toBe(true)})

it('shows literal live sentence slots and never duplicates a spelling prefix',()=>{const q=source.questions.find(q=>q.id==='q-g-be-001')!;expect(sentenceWorkbench(q,'a')).toMatchObject({before:'Mia ',selection:'is',after:' ready for the class photo.'});const word={...source.questions.find(q=>q.skill==='vocabulary')!,stem:'填写目标词：餐食。\nWe eat m____ at home.'};expect(sentenceWorkbench(word,'meals')).toMatchObject({before:'We eat ',selection:'meals',after:' at home.'});expect(sentenceWorkbench({...q,stem:'No gap here.'},'a')).toBeUndefined()})

it('uses the selected edition spelling throughout the fresh planning task',()=>{
 const lesson=source.lessons.find(l=>l.topicId==='s-plan')!
 for(const spelling of ['american','british'] as const){const model=createLessonTeaching(source,lesson,spelling).transfer;const text=JSON.stringify(model);expect(model.answer.display).toContain(spelling==='american'?'summarize':'summarise');expect(text).not.toContain(spelling==='american'?'summarise':'summarize');expect(questionProblems(model)).toEqual([])}
})

it('uses the selected edition spelling in written pronunciation cards without changing their grouping',()=>{
 const lesson=source.lessons.find(l=>l.topicId==='p-thought-groups')!
 for(const spelling of ['american','british'] as const){const cards=createLessonTeaching(source,lesson,spelling).sorting!.cards;expect(cards.every(card=>card.text.includes(spelling==='american'?'practice':'practise'))).toBe(true);expect(cards.map(card=>card.category)).toEqual(['group-0','group-1'])}
})

it('explains the sentence-building activity for a one-letter target word',()=>{
 const word=source.vocabulary.find(w=>w.word==='a')!,id=`q-${word.topicId}-${word.id.slice(5)}`,lesson=source.lessons.find(l=>l.questionIds.includes(id))!,unit=createLessonTeaching(source,lesson).assemblies.find(u=>u.id===word.id)!
 expect(unit.kind).toBe('sentence');expect(unit.prompt).toContain('词块');expect(unit.prompt).toContain('例句');expect(unit.prompt).not.toContain('字母拼');expect(unit.tiles.some(t=>t.text==='A')).toBe(true)
})
