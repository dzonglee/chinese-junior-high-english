import {it,expect} from 'vitest'
import {authorCatalog} from '../scripts/lib/author-content.mjs'
import {createLessonTeaching,freshTeaching,changeTeaching,teachingCanAdvance,restoreTeaching,teachingProblems} from './core/lesson-teaching'
import {workshopView,workshopProblems} from './core/lesson-workshop'
import {individualDelayedProblems} from '../scripts/lib/author-visual-missions.mjs'
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

it('keeps a mistaken suffix on the live word-building result and limits choices to the current verb',()=>{
 const s=studio('l-g-present'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-item','5',2);p=changeTeaching(s,p,'workshop-choose','studys',3);p=changeTeaching(s,p,'workshop-check','',4);let v=workshopView(w,p);expect(v.cells[2].label).toBe('studys');expect(v.expressionWrong).toBe(true);expect(v.complete).toBe(false);expect(v.choices.map(o=>o.id)).toEqual(['study','studies','studys']);p=changeTeaching(s,p,'workshop-choose','walking',5);expect(workshopView(w,p).selected).toBe('studys');p=changeTeaching(s,p,'workshop-choose','studies',6);p=changeTeaching(s,p,'workshop-check','',7);v=workshopView(w,p);expect(v.cells[2].label).toBe('studies');expect(v.complete).toBe(true);expect(w.conditions![5].world.cells[2].label).toBe('@attempt')
})


it('requires an actual dated event record and moves the marker without colouring a correct verb wrong',()=>{
 const s=studio('l-g-past'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1}
 p=changeTeaching(s,p,'workshop-choose','cleaned',2);p=changeTeaching(s,p,'workshop-check','',3);expect(workshopView(w,p).complete).toBe(false)
 p=changeTeaching(s,p,'workshop-record','future',4);p=changeTeaching(s,p,'workshop-check','',5);let v=workshopView(w,p);expect(v.recordCorrect).toBe(false);expect(v.expressionWrong).toBe(false);expect(v.cells[0].style).toBe('left:80%;');expect(v.feedback).toContain('明天');expect(v.complete).toBe(false)
 p=changeTeaching(s,p,'workshop-record','past',6);p=changeTeaching(s,p,'workshop-check','',7);v=workshopView(w,p);expect(v.complete).toBe(true);expect(v.cells[0].style).toBe('left:20%;');expect(v.cells[0].label).toContain('昨天')
 p=changeTeaching(s,p,'workshop-record','unknown',8);expect(workshopView(w,p).complete).toBe(true)
 p=changeTeaching(s,p,'workshop-record','now',9);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).attempted).toBe(false)
})

it('keeps picture evidence and residence duration tied to the selected record',()=>{
 const s=studio('l-g-perfect'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1}
 p=changeTeaching(s,p,'workshop-choose','has lost',2);p=changeTeaching(s,p,'workshop-record','found',3);p=changeTeaching(s,p,'workshop-check','',4);let v=workshopView(w,p);expect(v.recordArtChoices.find(r=>r.id==='found')!.wrong).toBe(true);expect(v.cells[0].label).toBe('找回钥匙');expect(v.expressionWrong).toBe(false);expect(v.complete).toBe(false)
 p=changeTeaching(s,p,'workshop-record','missing',5);p=changeTeaching(s,p,'workshop-check','',6);expect(workshopView(w,p).complete).toBe(true)
 p=changeTeaching(s,p,'workshop-item','5',7);p=changeTeaching(s,p,'workshop-record','left',8);p=changeTeaching(s,p,'workshop-choose','have lived',9);p=changeTeaching(s,p,'workshop-check','',10);v=workshopView(w,p);expect(v.cells[0].rangeStyle).toBe('left:20%;width:15%;');expect(v.complete).toBe(false)
 p=changeTeaching(s,p,'workshop-record','live',11);p=changeTeaching(s,p,'workshop-check','',12);v=workshopView(w,p);expect(v.cells[0].rangeStyle).toBe('left:20%;width:30%;');expect(v.complete).toBe(true)
})

it('requires the full comparison set and accepts typed forms only after repairing the actual attempt',()=>{
 const s=studio('l-g-comparison'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1}
 p=changeTeaching(s,p,'workshop-choose','taller',2);p=changeTeaching(s,p,'workshop-member','amy',3);p=changeTeaching(s,p,'workshop-check','',4);expect(workshopView(w,p).complete).toBe(false)
 p=changeTeaching(s,p,'workshop-member','mia',5);p=changeTeaching(s,p,'workshop-member','leo',6);p=changeTeaching(s,p,'workshop-check','',7);let v=workshopView(w,p);expect(v.complete).toBe(false);expect(v.cells.find(c=>c.id==='leo')!.wrong).toBe(true);expect(v.expressionWrong).toBe(false)
 p=changeTeaching(s,p,'workshop-member','leo',8);p=changeTeaching(s,p,'workshop-check','',9);expect(workshopView(w,p).complete).toBe(true)
 p=changeTeaching(s,p,'workshop-item','7',10);p=changeTeaching(s,p,'workshop-input','easyer',11);p=changeTeaching(s,p,'workshop-check','',12);v=workshopView(w,p);expect(v.selected).toBe('easyer');expect(v.cells[2].label).toBe('easyer');expect(v.complete).toBe(false)
 p=changeTeaching(s,p,'workshop-input','easier',13);p=changeTeaching(s,p,'workshop-check','',14);expect(workshopView(w,p).complete).toBe(true)
 p=changeTeaching(s,p,'workshop-input','easiest',15);expect(workshopView(w,p).complete).toBe(false)
})

it('holds the past reference cursor fixed while the selected activity interval changes',()=>{
 const s=studio('l-g-past-continuous'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1}
 p=changeTeaching(s,p,'workshop-choose','was watering',2);p=changeTeaching(s,p,'workshop-record','finished',3);p=changeTeaching(s,p,'workshop-check','',4);let v=workshopView(w,p);expect(v.referenceStyle).toBe('left:30%;');expect(v.cells[0].rangeStyle).toBe('left:10%;width:15%;');expect(v.complete).toBe(false)
 p=changeTeaching(s,p,'workshop-record','ongoing',5);p=changeTeaching(s,p,'workshop-check','',6);v=workshopView(w,p);expect(v.referenceStyle).toBe('left:30%;');expect(v.cells[0].rangeStyle).toBe('left:20%;width:20%;');expect(v.complete).toBe(true);expect(v.cells[1].label).toBe('16:10')
})

it('marks a wrongly selected passive subject separately from a correct predicate',()=>{
 const s=studio('l-g-passive'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-item','1',2);p=changeTeaching(s,p,'workshop-choose','is cleaned',3);p=changeTeaching(s,p,'workshop-record','doer',4);p=changeTeaching(s,p,'workshop-check','',5);let v=workshopView(w,p);expect(v.cells[0].label).toBe('Mia');expect(v.cells[0].wrong).toBe(true);expect(v.expressionWrong).toBe(false);expect(v.complete).toBe(false)
 p=changeTeaching(s,p,'workshop-record','receiver',6);p=changeTeaching(s,p,'workshop-check','',7);v=workshopView(w,p);expect(v.cells[0].label).toBe('the table');expect(v.cells[0].wrong).toBe(false);expect(v.complete).toBe(true)
})


it('rejects exact delayed grammar sentences in workshops while allowing immediate and fresh examples',()=>{
 const grammar=[{id:'g-guard',cases:[['First [[1]].','one'],['Second [[1]].','two'],['Third [[1]].','three'],['Fourth [[1]].','four'],['The notice must [[1]] before the meeting.','be read'],['Later [[1]].','six']]}]
 const specs=[{lessonId:'l-g-guard',workshop:{conditions:[{before:'The notice must ',target:'be read',after:' before the meeting.'}]}}]
 expect(individualDelayedProblems(specs,grammar)).toEqual(['l-g-guard: workshop repeats delayed grammar item q-g-guard-005'])
 specs[0].workshop.conditions[0]={before:'The game rules must ',target:'be followed',after:' by every player.'};expect(individualDelayedProblems(specs,grammar)).toEqual([])
 specs[0].workshop.conditions[0]={before:'First ',target:'one',after:'.'};expect(individualDelayedProblems(specs,grammar)).toEqual([])
 const extended=[{id:'g-guard12',cases:Array.from({length:12},(_,i)=>[`Example ${i+1} [[1]].`,'done'])}];specs[0].workshop.conditions[0]={before:'Example 8 ',target:'done',after:'.'};expect(individualDelayedProblems(specs,extended)).toEqual([]);specs[0].workshop.conditions[0].before='Example 9 ';expect(individualDelayedProblems(specs,extended)).toEqual(['l-g-guard: workshop repeats delayed grammar item q-g-guard12-009'])
})


it('rejects a transfer that omits a grade eligible for its lesson',()=>{
 const s=studio('l-g-nouns'),l=c.lessons.find(l=>l.id==='l-g-nouns')!;expect(l.grades).toContain(6);expect(teachingProblems(s,l)).toEqual([])
 const altered={...s,transfer:{...s.transfer,grades:[7,8,9] as (6|7|8|9)[]}};expect(teachingProblems(altered,l)).toContain('l-g-nouns: transfer must cover every lesson grade')
})


it('changes the planned outcome with the selected hypothetical condition without treating a correct tense as wrong',()=>{
 const s=studio('l-g-conditionals'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1}
 p=changeTeaching(s,p,'workshop-choose','rains',2);p=changeTeaching(s,p,'workshop-record','dry',3);p=changeTeaching(s,p,'workshop-check','',4);let v=workshopView(w,p);expect(v.cells.map(c=>c.label)).toEqual(['假设明天不下雨','花园观察']);expect(v.expressionWrong).toBe(false);expect(v.complete).toBe(false)
 p=changeTeaching(s,p,'workshop-record','rain',5);p=changeTeaching(s,p,'workshop-check','',6);v=workshopView(w,p);expect(v.cells.map(c=>c.label)).toEqual(['假设明天下雨','室内读书']);expect(v.complete).toBe(true)
 const broken=structuredClone(w);delete broken.conditions![0].world.records!.options[0].outcome;expect(workshopProblems(broken)).toContain('Missing outcome for a changing condition')
})
it('accepts authored contraction alternatives and still rejects the wrong negative tense or agreement',()=>{
 const s=studio('l-g-conditionals'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-item','1',2);p=changeTeaching(s,p,'workshop-record','dry',3)
 for(const good of ["doesn't rain",'does not rain','DOES NOT RAIN',"doesn’t rain"]){p=changeTeaching(s,p,'workshop-input',good,4);p=changeTeaching(s,p,'workshop-check','',5);expect(workshopView(w,p).complete).toBe(true);expect(workshopView(w,p).selected).toBe(good)}
 for(const bad of ['did not rain','does not rains','will not rain']){p=changeTeaching(s,p,'workshop-input',bad,6);expect(workshopView(w,p).complete).toBe(false);p=changeTeaching(s,p,'workshop-check','',7);expect(workshopView(w,p).correct).toBe(false)}
})
it('checks alternative typed completions against the reserved grammar sentences too',()=>{
 const grammar=[{id:'g-alt',cases:[['A [[1]].','one'],['B [[1]].','two'],['C [[1]].','three'],['D [[1]].','four'],['We [[1]] it.','do not need']]}]
 expect(individualDelayedProblems([{lessonId:'l-g-alt',workshop:{conditions:[{before:'We ',target:"don't need",accepted:['do not need'],after:' it.'}]}}],grammar)).toEqual(['l-g-alt: workshop repeats delayed grammar item q-g-alt-005'])
})
