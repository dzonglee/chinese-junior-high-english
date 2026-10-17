import{expect,it}from'vitest'
import{readFileSync}from'node:fs'
import{resolve}from'node:path'
import{authorCatalog}from'../scripts/lib/author-content.mjs'
import{Application,type Platform}from'./app/application'
import{ContentRepository}from'./services/content'
import{StateStore,checkedState}from'./services/storage'
import{emptyState}from'./core/learning'
import{availableQuestions}from'./core/sessions'
import{paperQuestionIds,paperResults,paperEligibility,reservedMockQuestions,startMockPaper,toggleExamFlag}from'./core/mock-papers'
import type{ContentCatalog,MockPaper,Question}from'./core/types'
const source:ContentCatalog=authorCatalog(process.cwd()),papers=source.mockPapers!,manifest=JSON.parse(readFileSync('dist/manifest.json','utf8'))
function harness(p:MockPaper){
 const topicIds=new Set(paperQuestionIds(p).map(id=>source.questions.find(q=>q.id===id)!.topicId))
 const catalog={...source,topics:source.topics.filter(t=>topicIds.has(t.id)),lessons:source.lessons.filter(l=>topicIds.has(l.topicId)),questions:[],questionIndex:source.questions.filter(q=>topicIds.has(q.topicId)).map(({id,topicId,skill,kind,difficulty,grades,marks,estimatedSeconds,mediaId,review})=>({id,topicId,skill,kind,difficulty,grades,marks,estimatedSeconds,mediaId,review})),vocabulary:source.vocabulary.filter(w=>topicIds.has(w.topicId))}
 const data=new Map<string,string>(),adapter={read:(k:string)=>data.get(k)??null,write:(k:string,v:string)=>{data.set(k,v)},remove:(k:string)=>{data.delete(k)}};let now=Date.UTC(2026,9,17,12),app:Application,confirms=0,scrolls=0
 const store=new StateStore(adapter,catalog,now);store.save({...emptyState(now),profile:{cityId:'北京-北京',structure:p.grade===6?'54':'63',grade:p.grade,term:p.term,editionId:p.grade===6?'pep-54':'pep-legacy',schoolYear:2026,dailyMinutes:20,createdAt:now}})
 const repo=new ContentRepository(catalog,manifest,async pack=>readFileSync(resolve('dist/packs',pack.file),'utf8'))
 const platform:Platform={now:()=>now,navigate:(page,params)=>app.open(page,params),back(){},scrollTop(){scrolls++},toast(){},confirm:async()=>{confirms++;return true},exportText:async()=>{},importText:async()=>null,copy:async()=>{},play:async()=>{},stopAudio(){},startRecording:async()=>{},stopRecording:async()=>({path:'',durationMs:0}),removeRecordings:async()=>{}}
 app=new Application(repo,store,platform)
 return{app,store,repo,adapter,platform,advance:(ms:number)=>{now+=ms},get confirms(){return confirms},get scrolls(){return scrolls}}
}
const answer=(q:Question)=>q.kind==='choice'?q.answer.option!:q.kind==='writing'?q.answer.display:q.answer.accepted![0]
it('provides eight fully original papers with correct marks, timing and protected pools',()=>{
 expect(papers.map(p=>`${p.grade}-${p.term}`)).toEqual(['6-upper','6-lower','7-upper','7-lower','8-upper','8-lower','9-upper','9-lower'])
 const lessonIds=new Set(source.lessons.flatMap(l=>[...l.questionIds,...l.delayedQuestionIds])),ids=papers.flatMap(p=>paperQuestionIds(p))
 expect(ids).toHaveLength(200);expect(new Set(ids).size).toBe(200);expect(ids.some(id=>lessonIds.has(id))).toBe(false)
 for(const p of papers){expect(p.totalMarks).toBe(60);expect(p.sections.reduce((n,s)=>n+s.questionIds.length*s.marksEach,0)).toBe(60);expect(p.sections.reduce((n,s)=>n+s.minutes,0)).toBe(55);expect(p.minutes).toBe(60);expect(paperQuestionIds(p)).toHaveLength(25)}
 const h=harness(papers[0]);expect(availableQuestions(source,h.store.get(),{}).some(q=>reservedMockQuestions(source).has(q.id))).toBe(false)
 expect(()=>startMockPaper(h.store.get(),h.repo.catalog,papers[0].id,1)).toThrow('加载完整')
})
it.each(papers)('marks $id, withholds feedback and supports a real correction journey',async p=>{
 const h=harness(p),a=h.app;a.open('papers',{paper:p.id});expect(a.render().paperCatalog?.sections).toHaveLength(5);await a.action('start-paper',p.id);expect(a.error).toBe('')
 const id=a.state.activeSessionId!,s=a.state.sessions[id],ids=paperQuestionIds(p),wrong=new Set([ids[0],ids[8],ids[13],ids[21]])
 expect(s.paperId).toBe(p.id);expect(s.deadlineAt!-s.startedAt).toBe(3600000)
 for(const[i,qid]of ids.entries()){
  const q=h.repo.getQuestion(qid)!,v=a.render().question!;expect(v.explanation).toBeUndefined();expect(v.modelAnswer).toBeUndefined();if(q.kind==='writing')expect(v.rubric).toEqual([])
  if(i===0){await a.action('paper-flag');expect(a.state.sessions[id].flagged).toEqual([qid]);await a.action('hint');expect(a.error).toContain('不显示提示')}
  const value=wrong.has(qid)?q.options?.find(o=>o.id!==q.answer.option)?.id??'not-the-answer':answer(q)
  if(q.kind==='choice')await a.action('choose',value);else{a.setField('answer',value);a.flush()}
  await a.action('next')
 }
 expect(a.render().id).toBe('result');expect(h.confirms).toBe(1);expect(h.scrolls).toBe(24);expect(a.params.session).toBe(id)
 const submitted=a.state.sessions[id],report=paperResults(p,submitted);expect(report.filter(r=>!r.writing).reduce((n,r)=>n+r.score,0)).toBe(33)
 expect(report.find(r=>r.writing)?.score).toBe(0);expect(report.flatMap(r=>r.wrong)).toHaveLength(4);expect(a.state.attempts.filter(x=>x.evidence==='independent')).toHaveLength(24)
 expect(a.render().paperReport?.wrong).toBe(4);expect(a.render().cards).toHaveLength(5);expect(a.render().cards.filter(c=>c.tag==='需要订正').every(c=>c.actions.some(a=>a.id==='open-lesson-studio'))).toBe(true)
 await a.action('review-question','24');expect(a.render().question?.answerLocked).toBe(true);expect(a.render().question?.modelAnswer).toBeTruthy()
 for(const r of a.render().question!.rubric)await a.action('toggle-rubric',r.id)
 await a.action('review-self');expect(a.render().question?.feedback).toContain('人工判断')
 expect(paperResults(p,a.state.sessions[id]).filter(r=>!r.writing).reduce((n,r)=>n+r.score,0)).toBe(33)
 a.open('result',{session:id});await a.action('paper-correct');const child=a.state.activeSessionId!;expect(child).not.toBe(id);expect(a.state.sessions[child].mode).toBe('mistakes');expect(a.state.sessions[child].questionIds).toHaveLength(4)
 a.open('result',{session:id});expect(a.state.activeSessionId).toBe(id);expect(a.render().paperReport?.wrong).toBe(4);expect(a.state.sessions[child]).toBeTruthy();await a.action('paper-rewrite',ids[24]);expect(a.state.sessions[a.state.activeSessionId!].questionIds).toEqual([ids[24]]);expect(a.render().question!.answerLocked).toBe(false);a.setField('answer','I am revising my answer in this separate practice.');a.flush();expect(a.state.sessions[id].answers[ids[24]].answer).toBe(answer(h.repo.getQuestion(ids[24])!))
})
it('preserves an unfinished paper, answer, flags and deadline across local restoration',async()=>{
 const p=papers.find(p=>p.id==='mock-7-upper')!,h=harness(p);await h.app.action('start-paper',p.id);await h.app.action('choose','a');await h.app.action('paper-flag');await h.app.action('jump','8');h.app.setField('answer','b');await h.app.suspend()
 const old=h.store.get().sessions[h.store.get().activeSessionId!],store=new StateStore(h.adapter,h.repo.catalog,h.platform.now()),repo=new ContentRepository({...h.repo.catalog,questions:[]},manifest,async pack=>readFileSync(resolve('dist/packs',pack.file),'utf8')),restored=new Application(repo,store,h.platform)
 await repo.ensureQuestions(old.questionIds);restored.open('session');expect(restored.render().question?.value).toBe('b');expect(store.get().sessions[old.id].deadlineAt).toBe(old.deadlineAt);expect(store.get().sessions[old.id].flagged).toEqual([old.questionIds[0]])
 const portable=JSON.parse(store.export());portable.state.sessions[old.id].flagged=['unknown-question'];expect(()=>checkedState(JSON.stringify(portable),h.repo.catalog,h.platform.now())).toThrow('题目标记')
})
it('auto-submits expired papers once without confirmation or timer reset',async()=>{
 const p=papers[0],h=harness(p);await h.app.action('start-paper',p.id);const id=h.app.state.activeSessionId!;await h.app.action('choose',h.repo.getQuestion(paperQuestionIds(p)[0])!.answer.option!);h.advance(3600001);await h.app.tick();const at=h.app.state.sessions[id].submittedAt
 expect(h.app.render().id).toBe('result');expect(h.app.params.session).toBe(id);expect(h.confirms).toBe(0);expect(h.app.render().paperReport?.sections.reduce((n,s)=>n+s.unanswered,0)).toBe(24)
 await h.app.tick();expect(h.app.state.sessions[id].submittedAt).toBe(at);expect(toggleExamFlag(h.app.state,h.platform.now()).sessions[id].flagged).toEqual([])
})
it('guards the learner stage and school structure without substituting a city blueprint',()=>{
 const h=harness(papers.find(p=>p.id==='mock-7-upper')!);expect(paperEligibility(h.store.get(),papers.find(p=>p.id==='mock-7-lower')!)).toContain('下学期');expect(paperEligibility(h.store.get(),papers.find(p=>p.id==='mock-8-upper')!)).toContain('高年级');expect(paperEligibility(h.store.get(),papers[0])).toContain('学制');expect(source.blueprints).toEqual([])
})

it('loads a paper result safely after a cold deep link before its packs have arrived',async()=>{
 const h=harness(papers[0]);await h.app.action('start-paper',papers[0].id);await h.app.action('submit');const id=h.app.state.activeSessionId!
 const c={...h.repo.catalog,questions:[]},repo=new ContentRepository(c,manifest,async p=>readFileSync(resolve('dist/packs',p.file),'utf8')),store=new StateStore(h.adapter,c,h.platform.now()),app=new Application(repo,store,h.platform)
 expect(()=>app.open('result',{session:id})).not.toThrow();expect(app.render().cards.some(c=>c.tag==='载入中')).toBe(true)
 await repo.ensureQuestions(paperQuestionIds(papers[0]));expect(app.render().cards.every(c=>c.tag!=='载入中')).toBe(true);expect(app.render().paperReport?.wrong).toBe(24)
 app.open('result',{session:'missing-paper-session'});expect(app.render().notice).toContain('记录不在本机')
})
it('counts a whitespace-only answer as unanswered in the submission confirmation',async()=>{
 const h=harness(papers[0]);await h.app.action('start-paper',papers[0].id);await h.app.action('jump','21');h.app.setField('answer','   ');h.app.flush();let message='';h.platform.confirm=async(_title,text)=>{message=text;return false};await h.app.action('submit');expect(message).toContain('25 道题未作答');expect(h.app.render().id).toBe('session')
})
