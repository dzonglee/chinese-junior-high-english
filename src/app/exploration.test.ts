import { expect, it } from 'vitest'
import { Application, type Platform } from './application'
import { experiments } from '../core/experiments'
import { sceneExperiment } from '../core/scene-experiment'
import { ContentRepository } from '../services/content'
import { StateStore, checkedState } from '../services/storage'
import { state, catalog, NOW, q } from '../test-fixtures'
import { startSession, saveAnswer, checkCurrent, submitSession } from '../core/sessions'
import { evidenceSentences } from '../core/reading-evidence'
import type { Question } from '../core/types'

function harness(reading = false) {
  const c = catalog(), data = new Map<string,string>(), adapter = { read: (key: string) => data.get(key) ?? null, write: (key: string,value: string) => { data.set(key,value) }, remove: (key: string) => { data.delete(key) } }
  if (reading) c.questions[0] = { ...c.questions[0], skill: 'reading', passage: 'Mia left her bag at school. She returned to collect her notebook. The school closed at five.', explanation: { ...q.explanation, visual: { ...q.explanation.visual, segments: [{ text: 'She returned to collect her notebook.', role: 'evidence' }] } } } as Question
  const store = new StateStore(adapter,c,NOW); store.save({ ...state(), profile: { ...state().profile!, grade: 9 } })
  const repo = new ContentRepository(c,[],async()=>''), errors: string[] = []; let app: Application
  const platform: Platform = { now:()=>NOW, navigate:(page,params)=>app.open(page,params),back(){},toast(s){errors.push(s)},confirm:async()=>true,exportText:async()=>{},importText:async()=>null,copy:async()=>{},play:async()=>{},stopAudio(){},startRecording:async()=>{},stopRecording:async()=>({path:'test',durationMs:1}),removeRecordings:async()=>{} }
  app = new Application(repo,store,platform)
  return { app,store,c,adapter,errors }
}
it.each([sceneExperiment,...experiments])('runs $id through prediction, manipulation, diagnosis and transfer with restorable practice-only progress',async e=>{
  const h=harness();h.app.open('explore',{id:e.id})
  await h.app.action('explore-next');expect(h.app.render().exploration?.progress.phase).toBe(0)
  await h.app.action('explore-predict',e.prediction.options.find(o=>o.id!==e.prediction.correct)!.id)
  expect(h.app.render().exploration?.progress.phase).toBe(1);expect(h.app.render().exploration?.correct).toBe(false)
  await h.app.action('explore-next');expect(h.app.render().exploration?.progress.phase).toBe(1)
  await h.app.action('explore-condition','unknown');expect(h.app.render().exploration?.progress.visited).toHaveLength(1)
  await h.app.action('explore-condition',e.conditions[1].id)
  expect(h.app.render().exploration?.condition.sentence).toBe(e.conditions[1].sentence)
  const restored=new StateStore(h.adapter,h.c,NOW).get();expect(restored.explorations?.[e.id]?.condition).toBe(e.conditions[1].id)
  expect(checkedState(h.store.export(),h.c,NOW).explorations).toEqual(restored.explorations)
  await h.app.action('explore-next');expect(h.app.render().exploration?.progress.phase).toBe(2)
  await h.app.action('explore-answer',e.spot.options.find(o=>o.id!==e.spot.correct)!.id);await h.app.action('explore-next')
  expect(h.app.render().exploration?.progress.phase).toBe(2)
  await h.app.action('explore-answer',e.spot.correct);await h.app.action('explore-next')
  await h.app.action('explore-answer',e.transfer.correct);await h.app.action('explore-next')
  expect(h.app.render().exploration?.progress.phase).toBe(4)
  expect(h.store.get().attempts).toEqual([]);expect(h.store.get().mastery).toEqual({});expect(h.store.get().lessonDoneAt).toEqual({})
  h.app.open('explore',{id:e.id});expect(h.app.render().exploration?.progress.phase).toBe(4)
  await h.app.action('explore-reset');expect(h.app.render().exploration?.progress.phase).toBe(0)
  expect(h.errors).toEqual([])
})
it('rejects oversized or unsafe imported exploration progress atomically',()=>{
  const h=harness(), raw=JSON.parse(h.store.export())
  raw.state.explorations={unsafe:{version:1,phase:99,condition:'one',visited:[],updatedAt:NOW}}
  expect(()=>h.store.import(JSON.stringify(raw),NOW)).toThrow('互动探索')
  expect(h.store.get().explorations).toBeUndefined()
  raw.state.explorations={unsafe:{version:1,phase:1,condition:'one',visited:['<script>'],updatedAt:NOW}}
  expect(()=>h.store.import(JSON.stringify(raw),NOW)).toThrow('互动探索')
})
it('keeps evidence mapping and staged reasons locked before checking and until exam submission',async()=>{
  const h=harness(true), question=h.c.questions[0]
  h.store.save(startSession(h.store.get(),[question.id],'exam',NOW,{deadlineAt:NOW+60_000}).state);h.app.open('session')
  await h.app.action('evidence-open');await h.app.action('evidence-pick','evidence-sentence-2');await h.app.action('explain-more')
  expect(h.app.render().question?.evidence).toBeUndefined();expect(h.app.form[`steps-${question.id}`]).toBeUndefined()
  h.store.save(saveAnswer(h.store.get(),question.answer.option!,NOW));h.store.save(submitSession(h.store.get(),h.c,NOW));h.app.open('session')
  expect(h.app.render().question?.evidence?.sentences).toHaveLength(3)
  const correct=evidenceSentences(question).find(s=>s.matched)!
  await h.app.action('evidence-pick',correct.id);expect(h.app.render().question?.evidence?.correct).toBe(true)
  const count=h.store.get().attempts.length
  await h.app.action('evidence-pick','evidence-sentence-1');expect(h.app.render().question?.evidence?.correct).toBe(false)
  await h.app.action('explain-more');expect(h.app.render().question?.revealedSteps).toBe(question.explanation.steps.length)
  expect(h.store.get().attempts).toHaveLength(count)
})
it('does not expose evidence in shared-passage delayed review before unified submission',async()=>{
  const h=harness(true), question={...h.c.questions[0],feedbackGroup:'same-passage'};h.c.questions[0]=question
  h.store.save(startSession(h.store.get(),[question.id],'review',NOW).state)
  h.store.save(checkCurrent(saveAnswer(h.store.get(),question.answer.option!,NOW),h.c,NOW));h.app.open('session')
  await h.app.action('evidence-pick','evidence-sentence-2');expect(h.app.render().question?.evidence).toBeUndefined()
  expect(h.app.form[`evidence-${question.id}`]).toBeUndefined()
})
