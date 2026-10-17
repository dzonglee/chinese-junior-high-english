import {it,expect} from 'vitest'
import {authorCatalog} from '../scripts/lib/author-content.mjs'
import {createLessonTeaching,freshTeaching,changeTeaching,teachingCanAdvance,restoreTeaching} from './core/lesson-teaching'
import {workshopView} from './core/lesson-workshop'
import {containsTerm,productionReady,productionMinimum} from './core/teaching-production'
import {missionView} from './core/visual-mission'
const c=authorCatalog(process.cwd()),studio=(id:string)=>createLessonTeaching(c,c.lessons.find(l=>l.id===id)!)
it('connects a single lesson path, holds transfer questions out of guided contexts and preserves drafts after updates',()=>{
 for(const id of ['l-g-be','l-v-school','l-r-course-t01','l-w-email','l-p-word-stress']){const s=studio(id),p=freshTeaching(s,1);expect(missionView(s.mission!,p).open).toBe(false);expect(s.mission!.workshop!.items.length).toBeGreaterThan(0);expect(s.cases.some(q=>q.id===s.transfer.id)).toBe(false);p.answers['workshopOwn-'+s.mission!.workshop!.items[0].id]='My own saved writing.';p.fingerprint='old';expect(restoreTeaching(s,p,2).answers['workshopOwn-'+s.mission!.workshop!.items[0].id]).toBe('My own saved writing.')}
})
it('requires the actual referents as well as the verb and keeps a wrong attempted expression visible',()=>{
 const s=studio('l-g-be'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1}
 p=changeTeaching(s,p,'workshop-choose','am',2);p=changeTeaching(s,p,'workshop-check','',3);expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toContain('先改好人物')
 p=changeTeaching(s,p,'workshop-subject','leo',4);p=changeTeaching(s,p,'workshop-check','',5);expect(workshopView(w,p).feedback).toContain('Leo');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).expressionWrong).toBe(false);expect(workshopView(w,p).scenePeople.find(p=>p.id==='leo')!.wrong).toBe(true)
 p=changeTeaching(s,p,'workshop-subject','leo',6);p=changeTeaching(s,p,'workshop-subject','mia',7);p=changeTeaching(s,p,'workshop-choose','are',8);p=changeTeaching(s,p,'workshop-check','',9);expect(workshopView(w,p).selected).toBe('are');expect(workshopView(w,p).expressionWrong).toBe(true);expect(workshopView(w,p).feedback).toContain('are');expect(workshopView(w,p).correct).toBe(false)
 p=changeTeaching(s,p,'workshop-choose','am',10);p=changeTeaching(s,p,'workshop-check','',11);expect(workshopView(w,p).complete).toBe(true);p=changeTeaching(s,p,'workshop-subject','amy',12);expect(workshopView(w,p).complete).toBe(false)
})
it('changes who I refers to when the speaker changes, and uses are for singular as well as plural you',()=>{
 const s=studio('l-g-be'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1}
 for(let i=0;i<w.conditions!.length;i++){p=changeTeaching(s,p,'workshop-item',String(i),2);for(const id of w.conditions![i].world.scene!.subjects)p=changeTeaching(s,p,'workshop-subject',id,3);p=changeTeaching(s,p,'workshop-choose',w.conditions![i].target,4);p=changeTeaching(s,p,'workshop-check','',5);expect(workshopView(w,p).correct).toBe(true)}expect(teachingCanAdvance(s,p)).toBe(true)
 expect(w.conditions![0].world.scene!.subjects).toEqual(['mia']);expect(w.conditions![5].world.scene!.subjects).toEqual(['leo']);expect(w.conditions![2].target).toBe('are');expect(w.conditions![6].target).toBe('are');expect(s.cases.map(q=>q.id)).toEqual(['q-g-be-003','q-g-be-005']);expect(s.transfer.id).toBe('individual-g-be-transfer')
})
it('requires original writing for each planned function and prevents a zero-word completion',()=>{
 const s=studio('l-w-email'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1}
 for(let i=0;i<w.items.length;i++){p=changeTeaching(s,p,'workshop-item',String(i),2);p=changeTeaching(s,p,'workshop-check','',3);expect(workshopView(w,p).complete).toBe(false);p=changeTeaching(s,p,'workshop-own','Please join our reading club on Friday.',4);p=changeTeaching(s,p,'workshop-check','',5)}expect(teachingCanAdvance(s,p)).toBe(true);p=changeTeaching(s,p,'workshop-own','',6);expect(teachingCanAdvance(s,p)).toBe(false);expect(productionMinimum(s.prediction)).toBe(70);expect(productionReady(s.prediction,'This is a four word outline.')).toBe(false);expect(productionReady(s.prediction,'word '.repeat(91))).toBe(false)
})
it('requires word recall and actual use, preserves input per word and distinguishes word boundaries',()=>{
 const s=studio('l-v-school'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const item=w.items[0]
 p=changeTeaching(s,p,'workshop-input',item.answer,2);p=changeTeaching(s,p,'workshop-check','',3);p=changeTeaching(s,p,'workshop-save','',4);expect(workshopView(w,p).complete).toBe(false);p=changeTeaching(s,p,'workshop-own',`May I ${item.answer} this book today?`,5);p=changeTeaching(s,p,'workshop-save','',6);expect(workshopView(w,p).complete).toBe(true);p=changeTeaching(s,p,'workshop-item','1',7);p=changeTeaching(s,p,'workshop-item','0',8);expect(workshopView(w,p).input).toBe(item.answer);p=changeTeaching(s,p,'workshop-input','wrong',9);expect(workshopView(w,p).complete).toBe(false);expect(containsTerm('This is a cat.','a')).toBe(true);expect(containsTerm('This cat sat.','a')).toBe(false)
})
it('keeps a selected wrong premise visible without unlocking the conclusion',()=>{
 const s=studio('l-r-details'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const item=w.items[0],bad=item.options!.find(o=>!o.correct)!,good=item.options!.find(o=>o.correct)!
 p=changeTeaching(s,p,'workshop-choose',bad.id,2);p=changeTeaching(s,p,'workshop-check','',3);expect(workshopView(w,p).selected).toBe(bad.id);expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toContain(item.prompt);p=changeTeaching(s,p,'workshop-choose',good.id,4);p=changeTeaching(s,p,'workshop-check','',5);expect(workshopView(w,p).correct).toBe(true);expect(teachingCanAdvance(s,p)).toBe(false);p=changeTeaching(s,p,'workshop-own','这句话直接说明了饭后的行动。',6);p=changeTeaching(s,p,'workshop-save','',6);expect(teachingCanAdvance(s,p)).toBe(true);p=changeTeaching(s,p,'workshop-choose',bad.id,6);expect(teachingCanAdvance(s,p)).toBe(false)
})
it('keeps saved repairs and feedback on the same attempted expression',()=>{
 const s=studio('l-g-be');let p=freshTeaching(s,1);p=changeTeaching(s,p,'mission-open','',2);const m=s.mission!,v=missionView(m,p),bad=v.chips.find(c=>c.id!==v.active.answer&&c.text!==v.active.initial)!
 p=changeTeaching(s,p,'mission-place',bad.id,3);expect(missionView(m,p).activePlaced).toBe(bad.text);expect(missionView(m,p).nativeContext).toContain(bad.text)
})

it('makes the borrow/lend distinction change the transfer direction rather than merely relabeling a picture',()=>{
 const s=studio('l-v-school'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-input','lend',2);p=changeTeaching(s,p,'workshop-check','',3);expect(workshopView(w,p).usageDirection).toBe('left');expect(workshopView(w,p).feedback).toContain('借入');expect(workshopView(w,p).correct).toBe(false);p=changeTeaching(s,p,'workshop-input','borrow',4);p=changeTeaching(s,p,'workshop-check','',5);expect(workshopView(w,p).usageDirection).toBe('right');expect(workshopView(w,p).correct).toBe(true)
})

it('keeps vocabulary form cues consistent with the selected spelling and marks the actual stress beat',()=>{
 const l=c.lessons.find(l=>l.visualMission?.workshop?.items.some(i=>i.answer==='colour'))!;for(const spelling of ['american','british']as const){const w=createLessonTeaching(c,l,spelling).mission!.workshop!,item=w.items.find(i=>i.answer===(spelling==='american'?'color':'colour'))!;expect(item.hint).toContain(spelling==='american'?'5 个字符':'6 个字符');expect(item.hint).toContain('首字母是 c')}
 const s=studio('l-p-word-stress'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-choose','bad',2);expect(workshopView(w,p).soundUnits.map(u=>u.emphasis)).toEqual([true,false,false]);p=changeTeaching(s,p,'workshop-choose','good',3);expect(workshopView(w,p).soundUnits.map(u=>u.emphasis)).toEqual([false,true,false])
})

it('invalidates a completed transfer when its ordered response is edited, and a clinic diagnosis when replaced by a wrong choice',()=>{
 const l=c.lessons.find(l=>{const s=createLessonTeaching(c,l);return s.transfer.kind==='order'})!,s=createLessonTeaching(c,l);let p={...freshTeaching(s,1),step:4};p=changeTeaching(s,p,'answer',JSON.stringify(s.transfer.answer.order),2);p=changeTeaching(s,p,'check','',3);expect(teachingCanAdvance(s,p)).toBe(true);p=changeTeaching(s,p,'response-remove',s.transfer.answer.order![0],4);expect(teachingCanAdvance(s,p)).toBe(false);p={...freshTeaching(s,1),step:3,completed:s.diagnoses.map((_,i)=>'diagnosis-'+i)};p=changeTeaching(s,p,'diagnose',s.diagnosis.options.find(o=>o.id!==s.diagnosis.correct)!.id,5);expect(teachingCanAdvance(s,p)).toBe(false)
})

it('does not infer an agreed meeting from a proposal alone and retains accepted evidence after a wrong clue',()=>{
 const s=studio('l-ls-details'),w=s.mission!.workshop!,sources=w.items[0].options!.filter(o=>o.correct);expect(sources).toHaveLength(2);let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-choose',sources[0].id,2);p=changeTeaching(s,p,'workshop-check','',3);expect(workshopView(w,p).proofCollected).toHaveLength(1);expect(workshopView(w,p).correct).toBe(false);p=changeTeaching(s,p,'workshop-choose',w.items[0].options!.find(o=>!o.correct)!.id,4);p=changeTeaching(s,p,'workshop-check','',5);expect(workshopView(w,p).proofCollected).toHaveLength(1);p=changeTeaching(s,p,'workshop-choose',sources[1].id,6);p=changeTeaching(s,p,'workshop-check','',7);expect(workshopView(w,p).proofCollected).toHaveLength(2);expect(workshopView(w,p).correct).toBe(true)
})

it('uses a new situation for vocabulary application instead of repeating the worked cloze',()=>{
 const s=studio('l-v-school'),item=s.mission!.workshop!.items[0];let p={...freshTeaching(s,1),step:2};p.answers['workshopOwn-'+item.id]='May I borrow your ruler until lunch?';p=changeTeaching(s,p,'answer',p.answers['workshopOwn-'+item.id],2);p=changeTeaching(s,p,'word-review','',3);p=changeTeaching(s,p,'check','',4);expect(p.checked['step-2-0']).toBe(false);p=changeTeaching(s,p,'answer','May I borrow your dictionary after school today?',5);p=changeTeaching(s,p,'check','',6);expect(p.checked['step-2-0']).toBe(false);p=changeTeaching(s,p,'word-review','',7);p=changeTeaching(s,p,'check','',8);expect(p.checked['step-2-0']).toBe(true);p=changeTeaching(s,p,'answer','May I borrow your book tomorrow?',9);expect(p.checked['wordReview-'+item.id]).toBeUndefined();expect(p.completed).not.toContain('case-'+s.cases[0].id)
})

it('lets learners revisit earlier teaching without discarding their writing or recording an attempt',()=>{
 const s=studio('l-w-email'),item=s.mission!.workshop!.items[0];let p={...freshTeaching(s,1),step:2};p.answers['workshopOwn-'+item.id]='Please join our club on Friday afternoon.';p=changeTeaching(s,p,'previous','',2);expect(p.step).toBe(1);expect(workshopView(s.mission!.workshop!,p).own).toBe('Please join our club on Friday afternoon.')
})

for(const id of ['l-r-inference','l-r-course-t01','l-r-course-t05','l-r-course-t06','l-r-course-t09','l-r-course-t11','l-ls-course-t01','l-ls-course-t08','l-ls-course-t15','l-ls-course-t20'])it(`requires both the context and decisive clue before accepting ${id}`,()=>{
 const s=studio(id),w=s.mission!.workshop!,clues=w.items[0].options!.filter(o=>o.correct);expect(clues).toHaveLength(2);let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-choose',clues[0].id,2);p=changeTeaching(s,p,'workshop-check','',3);p=changeTeaching(s,p,'workshop-own','这两处线索共同回答了问题。',4);p=changeTeaching(s,p,'workshop-save','',5);expect(teachingCanAdvance(s,p)).toBe(false);p=changeTeaching(s,p,'workshop-choose',clues[1].id,6);p=changeTeaching(s,p,'workshop-check','',7);p=changeTeaching(s,p,'workshop-save','',8);expect(teachingCanAdvance(s,p)).toBe(true)
})
