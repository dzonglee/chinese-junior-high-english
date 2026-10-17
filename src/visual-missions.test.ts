import{it,expect}from'vitest'
import{authorCatalog}from'../scripts/lib/author-content.mjs'
import{createLessonTeaching,freshTeaching,changeTeaching,restoreTeaching}from'./core/lesson-teaching'
import{missionView,missionProblems}from'./core/visual-mission'
const c=authorCatalog(process.cwd())
it.each(c.lessons)('completes every visual board for $id with safe sources, correction and saved state',l=>{
 const s=createLessonTeaching(c,l),m=s.mission!;expect(m).toBeTruthy();expect(missionProblems(m,l.questionIds)).toEqual([]);let p=freshTeaching(s,1)
 for(const[bidx,b]of m.boards.entries()){
  p=changeTeaching(s,p,'mission-board',String(bidx),2)
  for(const slot of b.slots){p=changeTeaching(s,p,'mission-slot',slot.id,3);const wrong=b.chips.find(x=>x.text!==b.chips.find(y=>y.id===slot.answer)!.text&&!missionView(m,p).chips.find(y=>y.id===x.id)!.used)
   if(wrong){p=changeTeaching(s,p,'mission-place',wrong.id,4);expect(missionView(m,p).correct).toBe(false);expect(missionView(m,p).feedback).toBeTruthy()}
   p=changeTeaching(s,p,'mission-place',slot.answer,5);expect(missionView(m,p).correct,slot.id).toBe(true)
  }
  expect(missionView(m,p).boardDone).toBe(true)
 }
 expect(missionView(m,p).allDone).toBe(true);const saved=JSON.parse(JSON.stringify(p));p=restoreTeaching(s,saved,8);expect(missionView(m,p).allDone).toBe(true);p=changeTeaching(s,p,'mission-next','',9);expect(missionView(m,p).open).toBe(false);expect(p.step).toBe(0);expect(l.delayedQuestionIds.some(id=>m.sourceIds.includes(id))).toBe(false)
})
it('keeps an unfinished board blocked, rejects unknown/used cards and lets learners choose the study path',()=>{
 const l=c.lessons.find(l=>l.topicId==='v-school')!,s=createLessonTeaching(c,l),m=s.mission!;let p=freshTeaching(s,1);p=changeTeaching(s,p,'mission-open','',1);p=changeTeaching(s,p,'mission-next','',2);expect(missionView(m,p).index).toBe(0);expect(missionView(m,p).open).toBe(true);const copy=structuredClone(p);p=changeTeaching(s,p,'mission-place','forged',3);expect(p.answers).toEqual(copy.answers);p=changeTeaching(s,p,'mission-study','',4);expect(missionView(m,p).open).toBe(false);expect(p.step).toBe(0)
})
it('switches all 55 live grammar conditions, preserves personal lines and verifies concealed spelling without scored evidence',()=>{
 for(const l of c.lessons.filter(l=>l.visualMission?.lab)){const s=createLessonTeaching(c,l),m=s.mission!,p=freshTeaching(s,1),first=missionView(m,p).lab!;const next=changeTeaching(s,p,'mission-lab','1',2);expect(missionView(m,next).lab!.focus+missionView(m,next).lab!.before).not.toBe(first.focus+first.before)}
 const l=c.lessons.find(l=>l.id==='l-v-school')!,s=createLessonTeaching(c,l),m=s.mission!;let p=freshTeaching(s,1);p=changeTeaching(s,p,'mission-recall','',2);p=changeTeaching(s,p,'mission-recall-answer','wrong',3);p=changeTeaching(s,p,'mission-recall-check','',4);expect(missionView(m,p).recallCorrect).toBe(false);const v=missionView(m,p);p=changeTeaching(s,p,'mission-recall-answer',v.board.chips.find(x=>x.id===v.active.answer)!.text,5);p=changeTeaching(s,p,'mission-recall-check','',6);expect(missionView(m,p).recallCorrect).toBe(true);p=changeTeaching(s,p,'mission-own-line','My own saved sentence.',7);expect(missionView(m,restoreTeaching(s,p,8)).ownLine).toBe('My own saved sentence.');const changed=restoreTeaching(s,{...p,fingerprint:'older-content'},9);expect(changed.answers['visualOwn-'+v.board.id+'-'+v.active.id]).toBe('My own saved sentence.');expect(changed.checked).toEqual({})
})

it('preserves exact source and control IDs in both spelling systems',()=>{
 for(const spelling of ['american','british']as const)for(const l of c.lessons){const s=createLessonTeaching(c,l,spelling),m=s.mission!;expect(m.sourceIds).toEqual(l.questionIds);expect(missionProblems(m,l.questionIds)).toEqual([]);expect(m.boards.map(b=>b.id)).toEqual(l.visualMission!.boards.map(b=>b.id))}
})

it('keeps feedback on the slot just answered, handles imported indices and returns to unfinished boards',()=>{
 const l=c.lessons.find(l=>l.id==='l-v-school')!,s=createLessonTeaching(c,l),m=s.mission!;let p=freshTeaching(s,1),v=missionView(m,p);p=changeTeaching(s,p,'mission-place',v.active.answer,2);expect(missionView(m,p).active.id).toBe(v.active.id);expect(missionView(m,p).feedback).toBe(v.active.reason)
 p.answers.visualBoard='0.5';p.answers.visualLab='Infinity';expect(missionView(m,p).index).toBe(0);expect(missionView(m,p).goal).toContain('首字母');expect(missionView(m,p).goal).not.toContain(v.board.chips.find(x=>x.id===v.active.answer)!.text)
 p=changeTeaching(s,p,'mission-open','',3);p=changeTeaching(s,p,'mission-board',String(m.boards.length-1),3);for(const slot of m.boards.at(-1)!.slots){p=changeTeaching(s,p,'mission-slot',slot.id,4);p=changeTeaching(s,p,'mission-place',slot.answer,5)}expect(missionView(m,p).allDone).toBe(false);p=changeTeaching(s,p,'mission-next','',6);expect(missionView(m,p).open).toBe(true);expect(missionView(m,p).boardDone).toBe(false)
})

it('renders intonation as coded directions and keeps native recall answers concealed',()=>{
 const l=c.lessons.find(l=>l.id==='l-p-intonation')!,s=createLessonTeaching(c,l),m=s.mission!;let p=freshTeaching(s,1);expect(missionView(m,p).pitch).toBe('rise');expect(missionView(m,p).nativeContext).toContain('升调');expect(missionView(m,p).displayText).not.toContain('↗');
 const v=c.lessons.find(l=>l.id==='l-v-school')!,sv=createLessonTeaching(c,v),mv=sv.mission!;let pv=freshTeaching(sv,1);const b=mv.boards[0],slot=b.slots[0],word=b.chips.find(c=>c.id===slot.answer)!.text;pv=changeTeaching(sv,pv,'mission-slot',slot.id,2);pv=changeTeaching(sv,pv,'mission-place',slot.answer,3);expect(missionView(mv,pv).nativeContext).toContain(word);pv=changeTeaching(sv,pv,'mission-recall','',4);expect(missionView(mv,pv).nativeContext).not.toContain(word);
})
