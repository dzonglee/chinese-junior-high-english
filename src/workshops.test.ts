import {ContentRepository} from './services/content'
import {readFileSync} from 'node:fs'
import {individualChoiceLayout} from '../scripts/lib/individual-choice-layout.mjs'
import {checkAnswer} from './core/answers'
import {editionText} from './core/spelling'
import {workshopExpressionActions} from '../scripts/lib/workshop-test-actions.mjs'
import {it,expect} from 'vitest'
import {authorCatalog} from '../scripts/lib/author-content.mjs'
import {createLessonTeaching,teachingExplanation,freshTeaching,changeTeaching,teachingCanAdvance,restoreTeaching,teachingProblems} from './core/lesson-teaching'
import {workshopView,workshopProblems,changeWorkshop} from './core/lesson-workshop'
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
 const s=structuredClone(studio('l-r-details')),w={...s.mission!.workshop!,items:[{...s.mission!.workshop!.items[0],sourceStyle:undefined}]};s.mission!.workshop=w;let p={...freshTeaching(s,1),step:1};const item=w.items[0],bad=item.options!.find(o=>!o.correct)!,good=item.options!.find(o=>o.correct)!
 p=changeTeaching(s,p,'workshop-choose',bad.id,2);p=changeTeaching(s,p,'workshop-check','',3);expect(workshopView(w,p).selected).toBe(bad.id);expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(bad.reason);p=changeTeaching(s,p,'workshop-choose',good.id,4);p=changeTeaching(s,p,'workshop-check','',5);expect(workshopView(w,p).correct).toBe(true);expect(teachingCanAdvance(s,p)).toBe(false);p=changeTeaching(s,p,'workshop-own',item.reason,6);p=changeTeaching(s,p,'workshop-save','',6);expect(teachingCanAdvance(s,p)).toBe(true);p=changeTeaching(s,p,'workshop-choose',bad.id,6);expect(teachingCanAdvance(s,p)).toBe(false)
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
 const s=studio(id),w=s.mission!.workshop!,clues=w.items[0].options!.filter(o=>o.correct);expect(clues).toHaveLength(2);let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-choose',clues[0].id,2);p=changeTeaching(s,p,'workshop-check','',3);p=changeTeaching(s,p,'workshop-own','这两处线索共同回答了问题。',4);p=changeTeaching(s,p,'workshop-save','',5);expect(teachingCanAdvance(s,p)).toBe(false);p=changeTeaching(s,p,'workshop-choose',clues[1].id,6);p=changeTeaching(s,p,'workshop-check','',7);p=changeTeaching(s,p,'workshop-save','',8);expect(workshopView(w,p).complete).toBe(true);expect(teachingCanAdvance(s,p)).toBe(w.items.length===1)
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


it('requires real clause-tile assembly, invalidates a saved answer on removal and preserves the incomplete repair',()=>{
 const s=studio('l-g-object-clauses'),w=s.mission!.workshop!,c=w.conditions![0];let p={...freshTeaching(s,1),step:1}
 p=changeTeaching(s,p,'workshop-choose',c.target,2);p=changeTeaching(s,p,'workshop-input',c.target,3);expect(workshopView(w,p).selected).toBe('');p=changeTeaching(s,p,'workshop-record','place',4)
 for(const[a,v]of workshopExpressionActions(c,'where is the umbrella'))p=changeTeaching(s,p,'workshop-'+a,v,5);p=changeTeaching(s,p,'workshop-check','',6);expect(workshopView(w,p).cells[1].label).toBe('where is the umbrella');expect(workshopView(w,p).complete).toBe(false)
 for(const[a,v]of workshopExpressionActions(c,c.target))p=changeTeaching(s,p,'workshop-'+a,v,7);p=changeTeaching(s,p,'workshop-check','',8);expect(workshopView(w,p).complete).toBe(true)
 p=changeTeaching(s,p,'workshop-tile-add','999',9);p=changeTeaching(s,p,'workshop-tile-add',workshopView(w,p).tileAnswer[0].id,10);expect(workshopView(w,p).complete).toBe(true)
 p=changeTeaching(s,p,'workshop-tile-remove',workshopView(w,p).tileAnswer.at(-1)!.id,11);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),12);expect(workshopView(w,p).selected).toBe('where the umbrella');expect(workshopView(w,p).complete).toBe(false)
})
it('accepts both if/whether and optional-that clause variants through actual tile actions',()=>{
 const s=studio('l-g-object-clauses'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1}
 for(const i of [2,7]){const c=w.conditions![i];p=changeTeaching(s,p,'workshop-item',String(i),2);if(c.world.records)p=changeTeaching(s,p,'workshop-record',c.world.records.answer,3);for(const good of [c.target,...c.accepted!]){for(const[a,v]of workshopExpressionActions(c,good))p=changeTeaching(s,p,'workshop-'+a,v,4);p=changeTeaching(s,p,'workshop-check','',5);expect(workshopView(w,p).complete).toBe(true);expect(workshopView(w,p).selected).toBe(good)}}
})
it('keeps duplicate words as separate usable tiles and rejects an unbuildable authored answer',()=>{
 const original=studio('l-g-object-clauses').mission!.workshop!,condition={...original.conditions![0],target:'the book and the umbrella',choices:['the book and the umbrella','the umbrella and the book'],tiles:['the','book','and','the','umbrella'],world:{kind:'syntax' as const,caption:'Find both objects',cells:[{label:'@attempt'}]}},w={...original,conditions:[condition,original.conditions![1]]};let p=freshTeaching(studio('l-g-object-clauses'),1)
 for(const[a,v]of workshopExpressionActions(condition,condition.target))changeWorkshop(w,p,a,v);changeWorkshop(w,p,'check','');expect(workshopView(w,p).complete).toBe(true);expect(workshopView(w,p).tileAnswer.filter(t=>t.text==='the').map(t=>t.id)).toEqual(['0','3'])
 const broken={...w,conditions:[{...condition,tiles:['the','book','and','umbrella']},original.conditions![1]]};expect(workshopProblems(broken)).toContain('Invalid clause tile bank')
})


it('requires the actual relative antecedent and does not invent a speaker in a silent reference scene',()=>{
 const s=studio('l-g-relatives'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1}
 for(const[a,v]of workshopExpressionActions(w.conditions![0],w.conditions![0].target))p=changeTeaching(s,p,'workshop-'+a,v,2);p=changeTeaching(s,p,'workshop-check','',3);expect(workshopView(w,p).complete).toBe(false)
 p=changeTeaching(s,p,'workshop-subject','mia',4);p=changeTeaching(s,p,'workshop-check','',5);let v=workshopView(w,p);expect(v.expressionWrong).toBe(false);expect(v.scenePeople.find(p=>p.id==='mia')!.wrong).toBe(true);expect(v.scenePeople.every(p=>!p.speaking&&!p.listening)).toBe(true)
 p=changeTeaching(s,p,'workshop-subject','mia',6);p=changeTeaching(s,p,'workshop-subject','leo',7);p=changeTeaching(s,p,'workshop-check','',8);expect(workshopView(w,p).complete).toBe(true)
 p=changeTeaching(s,p,'workshop-item','1',9);for(const id of ['mia','amy'])p=changeTeaching(s,p,'workshop-subject',id,10);for(const[a,v]of workshopExpressionActions(w.conditions![1],'who is standing beside Leo'))p=changeTeaching(s,p,'workshop-'+a,v,11);p=changeTeaching(s,p,'workshop-check','',12);v=workshopView(w,p);expect(v.expressionWrong).toBe(true);expect(v.sceneSubjectsCorrect).toBe(true);expect(v.scenePeople.filter(p=>p.wrong)).toHaveLength(0)
 const invalid=structuredClone(w);invalid.conditions![0].world.scene!.listeners=['mia'];expect(workshopProblems(invalid)).toContain('Invalid scene referents or layout')
})
it('accepts object-relative omission and stranded-preposition variants while rejecting a duplicated object or missing preposition',()=>{
 const s=studio('l-g-relatives'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1}
 for(const[i,good,bad]of [[2,['which I borrowed','that I borrowed','I borrowed'],'which I borrowed it'],[4,['where we meet','in which we meet','which we meet in','that we meet in','we meet in'],'which we meet']]as const){p=changeTeaching(s,p,'workshop-item',String(i),2);for(const answer of good){for(const[a,v]of workshopExpressionActions(w.conditions![i],answer))p=changeTeaching(s,p,'workshop-'+a,v,3);p=changeTeaching(s,p,'workshop-check','',4);expect(workshopView(w,p).complete).toBe(true)}for(const[a,v]of workshopExpressionActions(w.conditions![i],bad))p=changeTeaching(s,p,'workshop-'+a,v,5);p=changeTeaching(s,p,'workshop-check','',6);expect(workshopView(w,p).complete).toBe(false)}
})


it('requires the actual walking days rather than accepting any three dates as frequency evidence',()=>{
 const s=studio('l-g-questions'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-choose','How often',2)
 for(const id of ['mon','tue','fri'])p=changeTeaching(s,p,'workshop-member',id,3);p=changeTeaching(s,p,'workshop-check','',4);let v=workshopView(w,p);expect(v.membersCorrect).toBe(false);expect(v.cells.find(c=>c.id==='tue')!.wrong).toBe(true);expect(v.expressionWrong).toBe(false)
 p=changeTeaching(s,p,'workshop-member','tue',5);p=changeTeaching(s,p,'workshop-member','wed',6);p=changeTeaching(s,p,'workshop-check','',7);v=workshopView(w,p);expect(v.complete).toBe(true);expect(v.cells.filter(c=>c.selected).map(c=>c.id)).toEqual(['mon','wed','fri'])
})
it('answers a negative tag from the supplied positive fact and rejects a grammatical answer that contradicts it',()=>{
 const s=studio('l-g-questions'),w=s.mission!.workshop!,i=w.conditions!.length-1;let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-item',String(i),2);p=changeTeaching(s,p,'workshop-record','likes',3)
 p=changeTeaching(s,p,'workshop-choose',w.conditions![i].choices!.find(c=>c.startsWith('No,'))!,4);p=changeTeaching(s,p,'workshop-check','',5);expect(workshopView(w,p).complete).toBe(false)
 p=changeTeaching(s,p,'workshop-choose','Yes, she does',6);p=changeTeaching(s,p,'workshop-check','',7);expect(workshopView(w,p).complete).toBe(true)
 p=changeTeaching(s,p,'workshop-record','dislikes',8);p=changeTeaching(s,p,'workshop-check','',9);expect(workshopView(w,p).expressionWrong).toBe(false);expect(workshopView(w,p).complete).toBe(false)
})


it('uses edition-specific distance units without turning a measuring-device meter into a length unit',()=>{
 expect(editionText('One kilometre; two kilometres; the parking meter.','american')).toBe('One kilometer; two kilometers; the parking meter.')
 expect(editionText('One kilometer; two kilometers; the parking meter.','british')).toBe('One kilometre; two kilometres; the parking meter.')
 const l=c.lessons.find(l=>l.id==='l-g-questions')!;for(const spelling of ['american','british']as const){const s=createLessonTeaching(c,l,spelling),text=s.mission!.workshop!.conditions![2].after;expect(text).toContain(spelling==='american'?'kilometer':'kilometre');expect(text).not.toContain(spelling==='american'?'kilometre':'kilometer')}
})


it('projects the selected concrete controller count while preserving a static counted-noun figure',()=>{
 const s=studio('l-g-agreement'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};expect(workshopView(w,p).cells[0].copies).toHaveLength(0)
 p=changeTeaching(s,p,'workshop-choose','is',2);p=changeTeaching(s,p,'workshop-record','boxes',3);p=changeTeaching(s,p,'workshop-check','',4);let v=workshopView(w,p);expect(v.cells[0].copies).toHaveLength(3);expect(v.cells[0].label).toBe('boxes');expect(v.expressionWrong).toBe(false);expect(v.complete).toBe(false)
 p=changeTeaching(s,p,'workshop-record','key',5);p=changeTeaching(s,p,'workshop-check','',6);v=workshopView(w,p);expect(v.cells[0].copies).toHaveLength(1);expect(v.complete).toBe(true)
 const bad=structuredClone(w);bad.conditions![0].world.records!.options[0].value=9;expect(workshopProblems(bad)).toContain('Invalid event records')
 const noun=studio('l-g-nouns'),nw=noun.mission!.workshop!;let np={...freshTeaching(noun,1),step:1};np=changeTeaching(noun,np,'workshop-item','8',2);np=changeTeaching(noun,np,'workshop-record','food',3);expect(workshopView(nw,np).cells[0].copies).toHaveLength(3);np=changeTeaching(noun,np,'workshop-record','plural',4);expect(workshopView(nw,np).cells[0].copies).toHaveLength(3)
})


it('edits capitalization exactly, projects the attempted caption and preserves a deliberately cleared draft',()=>{
 const s=studio('l-g-proper-nouns'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};let v=workshopView(w,p)
 expect(v.selected).toBe('mia');expect(v.records!.artLabels![0]).toBe('你的图注：This is mia.')
 p=changeTeaching(s,p,'workshop-record','meaning',2);p=changeTeaching(s,p,'workshop-check','',3);expect(workshopView(w,p).complete).toBe(false)
 for(const value of ['MIA','mia','mIa']){p=changeTeaching(s,p,'workshop-input',value,4);p=changeTeaching(s,p,'workshop-check','',5);v=workshopView(w,p);expect(v.complete).toBe(false);expect(v.records!.artLabels![0]).toBe('你的图注：This is '+value+'.')}
 p=changeTeaching(s,p,'workshop-input','Mia',6);p=changeTeaching(s,p,'workshop-check','',7);expect(workshopView(w,p).complete).toBe(true)
 p=changeTeaching(s,p,'workshop-input','',8);expect(workshopView(w,p).selected).toBe('');expect(workshopView(w,restoreTeaching(s,p,9)).selected).toBe('');expect(workshopView(w,p).complete).toBe(false)
 expect(w.conditions![0].world.records!.artLabels![0]).toContain('@attempt')
 const q=w.transfer!;expect(checkAnswer(q,q.answer.accepted![0])).toBe(true);expect(checkAnswer(q,q.answer.accepted![0].toLowerCase())).toBe(false)
 const bad=structuredClone(w);bad.conditions![0].input=false;expect(workshopProblems(bad)).toContain('Invalid typed draft')
})


it('exposes every authored explanation step separately, persists its position and bounds it per question',()=>{
 const s=studio('l-g-proper-nouns');let p={...freshTeaching(s,1),step:4};const answer=s.transfer.answer.accepted![0]
 p=changeTeaching(s,p,'explanation-step','1',2);expect(teachingExplanation(s,p).index).toBe(0)
 p=changeTeaching(s,p,'answer',answer,3);p=changeTeaching(s,p,'check','',4);p=changeTeaching(s,p,'explanation','',5)
 p=changeTeaching(s,p,'explanation-step','1',6);expect(teachingExplanation(s,p).text).toContain('French');expect(teachingExplanation(s,restoreTeaching(s,p,7)).index).toBe(1)
 for(const value of ['-1','2','1.5','NaN']){p=changeTeaching(s,p,'explanation-step',value,8);expect(teachingExplanation(s,p).index).toBe(1)}
 expect(p.completed).toEqual(['transfer']);p={...p,step:2,caseIndex:0};expect(teachingExplanation(s,p).index).toBe(0)
 p.answers['explanation-2-0']='999';expect(teachingExplanation(s,p).index).toBe(0)
})

it('changes the actual album allocation and requires it to match joint versus separate possessives',()=>{
 const s=studio('l-g-possessives'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-item','4',2)
 expect(workshopView(w,p).albumItems).toHaveLength(0);p=changeTeaching(s,p,'workshop-input',w.conditions![4].target,3);p=changeTeaching(s,p,'workshop-record','separate',4);p=changeTeaching(s,p,'workshop-check','',5)
 let v=workshopView(w,p);expect(v.albumMode).toBe('separate');expect(v.albumItems.map(a=>a.label)).toEqual(['Mia 的旅行相册','Leo 的旅行相册']);expect(v.complete).toBe(false);expect(v.expressionWrong).toBe(false)
 p=changeTeaching(s,p,'workshop-record','shared',6);p=changeTeaching(s,p,'workshop-check','',7);v=workshopView(w,p);expect(v.albumItems).toEqual([{label:'Mia 和 Leo 共同的旅行相册'}]);expect(v.complete).toBe(true)
 p=changeTeaching(s,p,'workshop-item','5',8);p=changeTeaching(s,p,'workshop-input',w.conditions![5].target,9);p=changeTeaching(s,p,'workshop-record','shared',10);p=changeTeaching(s,p,'workshop-check','',11);expect(workshopView(w,p).complete).toBe(false)
 p=changeTeaching(s,p,'workshop-record','separate',12);p=changeTeaching(s,p,'workshop-check','',13);expect(workshopView(w,restoreTeaching(s,p,14)).albumItems).toHaveLength(2);expect(workshopView(w,p).complete).toBe(true)
 const bad=structuredClone(w);bad.conditions![4].world.albums!.separateId='missing';expect(workshopProblems(bad)).toContain('Invalid album ownership')
})


it('draws the selected preposition explicitly and never treats an unknown expression as a parsed connection',()=>{
 const s=studio('l-g-transitivity'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};expect(workshopView(w,p).verbBridge!.known).toBe(false)
 p.answers['workshop-0']='unrecognised phrase';expect(workshopView(w,p).verbBridge!.known).toBe(false)
 p=changeTeaching(s,p,'workshop-choose','reach at',2);p=changeTeaching(s,p,'workshop-check','',3);let v=workshopView(w,p);expect(v.verbBridge!.link).toBe('at');expect(v.expressionWrong).toBe(true);expect(v.complete).toBe(false)
 p=changeTeaching(s,p,'workshop-choose','reach',4);p=changeTeaching(s,p,'workshop-check','',5);v=workshopView(w,p);expect(v.verbBridge!.known).toBe(true);expect(v.verbBridge!.link).toBe('');expect(v.complete).toBe(true)
 p=changeTeaching(s,p,'workshop-item','1',6);p=changeTeaching(s,p,'workshop-choose','arrive',7);p=changeTeaching(s,p,'workshop-check','',8);expect(workshopView(w,p).complete).toBe(false)
 p=changeTeaching(s,p,'workshop-choose','arrive at',9);p=changeTeaching(s,p,'workshop-check','',10);expect(workshopView(w,p).complete).toBe(true)
 p=changeTeaching(s,p,'workshop-item','2',11);p=changeTeaching(s,p,'workshop-choose','arrive at',12);p=changeTeaching(s,p,'workshop-check','',13);v=workshopView(w,p);expect(v.verbBridge!.object).toBe('Shanghai');expect(v.complete).toBe(false)
 p=changeTeaching(s,p,'workshop-choose','arrive in',14);p=changeTeaching(s,p,'workshop-check','',15);expect(workshopView(w,p).complete).toBe(true)
 const bad=structuredClone(w);bad.conditions![0].world.verbBridge!.options[0].link='in';expect(workshopProblems(bad)).toContain('Invalid verb bridge')
 const l=c.lessons.find(l=>l.id==='l-g-transitivity')!;expect(createLessonTeaching(c,l,'american').mission!.workshop!.conditions![0].world.verbBridge!.object).toBe('the science center')
})

it('distinguishes a tile capitalization repair from changing the auxiliary or verb form',()=>{
 const s=studio('l-g-auxiliaries'),w=s.mission!.workshop!,c=w.conditions![5];let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-item','5',2)
 for(const[a,v]of workshopExpressionActions(c,'can Amy design a poster'))p=changeTeaching(s,p,'workshop-'+a,v,3);p=changeTeaching(s,p,'workshop-check','',4);let view=workshopView(w,p);expect(view.complete).toBe(false);expect(view.selected).toBe('can Amy design a poster');expect(view.feedback).toContain('再核对大小写')
 for(const[a,v]of workshopExpressionActions(c,c.target))p=changeTeaching(s,p,'workshop-'+a,v,5);p=changeTeaching(s,p,'workshop-check','',6);expect(workshopView(w,p).complete).toBe(true)
 for(const[a,v]of workshopExpressionActions(c,c.choices![0]))p=changeTeaching(s,p,'workshop-'+a,v,7);p=changeTeaching(s,p,'workshop-check','',8);view=workshopView(w,p);expect(view.complete).toBe(false);expect(view.feedback).not.toContain('再核对大小写');expect(workshopProblems(w)).toEqual([])
})

it('joins word parts through actual controls and invalidates the word when a prefix is removed',()=>{
 const base=studio('l-g-object-clauses'),original=base.mission!.workshop!,condition={...original.conditions![0],before:'She felt ',target:'unhappy',after:'.',initial:undefined,accepted:undefined,tileMode:'morpheme' as const,tiles:['un','happy','ly'],choices:['happy','unhappy'],reason:'The record says she did not feel happy.',world:{kind:'morphology' as const,caption:'Use a negative prefix.',cells:[{label:'un'},{label:'happy'},{label:'@attempt',role:'attempt-result'}]}},w={...original,choices:[...original.choices!,...condition.choices],conditions:[condition,original.conditions![1]]},s={...base,mission:{...base.mission!,workshop:w}};let p={...freshTeaching(s,1),step:1}
 p=changeTeaching(s,p,'workshop-input','unhappy',2);p=changeTeaching(s,p,'workshop-choose','unhappy',3);expect(workshopView(w,p).selected).toBe('')
 p=changeTeaching(s,p,'workshop-tile-add','1',4);p=changeTeaching(s,p,'workshop-check','',5);expect(workshopView(w,p).selected).toBe('happy');expect(workshopView(w,p).complete).toBe(false)
 for(const[a,v]of workshopExpressionActions(condition,'unhappy'))p=changeTeaching(s,p,'workshop-'+a,v,6)
 p=changeTeaching(s,p,'workshop-check','',7);expect(workshopView(w,p).selected).toBe('unhappy');expect(workshopView(w,p).cells[2].label).toBe('unhappy');expect(workshopView(w,p).morphemeTiles).toBe(true);expect(workshopView(w,p).complete).toBe(true)
 p=changeTeaching(s,p,'workshop-tile-add','1',8);p=changeTeaching(s,p,'workshop-tile-add','999',9);expect(workshopView(w,p).selected).toBe('unhappy')
 p=changeTeaching(s,p,'workshop-tile-remove','0',10);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),11);expect(workshopView(w,p).selected).toBe('happy');expect(workshopView(w,p).complete).toBe(false)
})
it('keeps word boundaries distinct from joined pieces and rejects impossible authored word assemblies',()=>{
 const original=studio('l-g-object-clauses').mission!.workshop!,condition={...original.conditions![0],before:'A ',target:'schoolbag',after:'.',accepted:undefined,initial:undefined,tileMode:'morpheme' as const,tiles:['school','bag','schools'],choices:['schoolsbag','schoolbag'],world:{kind:'morphology' as const,caption:'Build the noun.',cells:[{label:'@attempt'}]}},w={...original,choices:[...original.choices!,...condition.choices],conditions:[condition,original.conditions![1]]}
 expect(workshopProblems(w)).toEqual([])
 expect(workshopProblems({...w,conditions:[{...condition,tiles:['school','schools']},original.conditions![1]]})).toContain('Invalid clause tile bank')
 expect(workshopProblems({...w,conditions:[{...condition,target:'school bag'},original.conditions![1]]})).toContain('Invalid clause tile bank')
 expect(workshopProblems({...w,conditions:[{...condition,tiles:undefined},original.conditions![1]]})).toContain('Invalid tile mode')
 const phrase=original.conditions![0],p=freshTeaching(studio('l-g-object-clauses'),1)
 for(const[a,v]of workshopExpressionActions(phrase,phrase.target))changeWorkshop(original,p,a,v)
 expect(workshopView(original,p).selected).toBe(phrase.target);expect(workshopView(original,p).morphemeTiles).toBe(false);expect(phrase.target).toContain(' ')
})

it('rejects a record illustration root without an asset or outside the allowed package',()=>{
 const w=structuredClone(studio('l-g-statements').mission!.workshop!);const r=w.conditions![0].world.records!;r.assetRoot='illustrations';expect(workshopProblems(w)).toEqual([])
 delete r.asset;expect(workshopProblems(w)).toContain('Invalid event records');r.asset='lesson-box-inventory';r.assetRoot='../outside' as 'illustrations';expect(workshopProblems(w)).toContain('Invalid event records')
})

it('requires a complete selected phrase and preserves actual word order without granting an incomplete boundary',()=>{
 const s=studio('l-g-exclamations'),w=s.mission!.workshop!,c=w.conditions![0];let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-input',c.target,2)
 p=changeTeaching(s,p,'workshop-member','3',3);p=changeTeaching(s,p,'workshop-check','',4);let v=workshopView(w,p);expect(v.complete).toBe(false);expect(v.selectionText).toBe('it');expect(v.feedback).toContain('「it」');expect(v.cells.find(c=>c.id==='3')!.wrong).toBe(true)
 p=changeTeaching(s,p,'workshop-member','3',5);for(const id of ['1','0'])p=changeTeaching(s,p,'workshop-member',id,6);p=changeTeaching(s,p,'workshop-check','',7);v=workshopView(w,p);expect(v.selectionText).toBe('a bright');expect(v.complete).toBe(false)
 p=JSON.parse(JSON.stringify(p));p=changeTeaching(s,p,'workshop-member','2',8);p=changeTeaching(s,p,'workshop-check','',9);v=workshopView(w,p);expect(v.selectionText).toBe('a bright kite');expect(v.complete).toBe(true)
 p=changeTeaching(s,p,'workshop-member','1',10);expect(workshopView(w,p).complete).toBe(false)
 const bad=structuredClone(w);bad.conditions![0].world.selection!.mode='outside' as 'words';expect(workshopProblems(bad)).toContain('Invalid comparison scope');bad.conditions![0].world.selection!.mode='words';bad.conditions![0].world.cells[0].label='a phrase';expect(workshopProblems(bad)).toContain('Invalid comparison scope')
})

it('keeps a short assembled verb with its final punctuation while allowing long clauses to wrap',()=>{
 const original=studio('l-g-object-clauses').mission!.workshop!
 const condition={...original.conditions![0],before:'We do not know when the new club ',target:'will open',after:'.',initial:undefined,accepted:undefined,tiles:['will','open','opens'],choices:['will opens','will open'],world:{kind:'syntax' as const,caption:'Keep the short answer and punctuation together.',cells:[{label:'will opens'},{label:'@attempt',role:'attempt-result'}]}}
 const w={...original,conditions:[condition,original.conditions![1]]},p=freshTeaching(studio('l-g-object-clauses'),1)
 for(const[a,v]of workshopExpressionActions(condition,condition.target))changeWorkshop(w,p,a,v)
 const view=workshopView(w,p)
 expect(view.keepEnding).toBe(true)
 expect(view.selected).toBe('will open')
 expect(view.tileAnswer.map(t=>t.text)).toEqual(['will','open'])
 expect(workshopView({...w,conditions:[{...condition,after:' next year.'},w.conditions![1]]},p).keepEnding).toBe(false)
 const long={...condition,target:'Do you want tea',tiles:['Do','you','want','tea'],choices:['Do you want tea']},longW={...w,conditions:[long,w.conditions![1]]}
 for(const[a,v]of workshopExpressionActions(long,long.target))changeWorkshop(longW,p,a,v)
 expect(workshopView(longW,p).keepEnding).toBe(false)
 expect(workshopView(longW,p).selected).toBe('Do you want tea')
})

it('refuses invented quotations or missing original notices in readable evidence cards',()=>{
 const w=structuredClone(studio('l-r-details').mission!.workshop!)
 expect(workshopProblems(w)).toEqual([])
 w.items[0].options![0].text='The workshop has twenty places.'
 expect(workshopProblems(w)).toContain('Source cards must quote the complete material')
 const absent=structuredClone(studio('l-r-details').mission!.workshop!);absent.items[0].material=''
 expect(workshopProblems(absent)).toContain('Source cards must quote the complete material')
 const wrongKind=structuredClone(studio('l-r-details').mission!.workshop!);wrongKind.kind='sound-map'
 expect(workshopProblems(wrongKind)).toContain('Source cards must quote the complete material')
})


it('finishes a single-clue card task directly but keeps a multi-clue inference and reflection required',()=>{
 const s=studio('l-r-details'),w=s.mission!.workshop!,p=freshTeaching(s,1),first=w.items[0]
 changeWorkshop(w,p,'choose',first.options!.find(o=>o.correct)!.id);changeWorkshop(w,p,'check','')
 expect(workshopView(w,p).complete).toBe(true)
 changeWorkshop(w,p,'choose',first.options!.find(o=>!o.correct)!.id);changeWorkshop(w,p,'check','')
 expect(workshopView(w,p).complete).toBe(false)
 changeWorkshop(w,p,'item','1');const second=w.items[1]
 for(const group of second.evidenceGroups!){changeWorkshop(w,p,'choose',group[0]);changeWorkshop(w,p,'check','')}
 expect(workshopView(w,p).correct).toBe(true);expect(workshopView(w,p).complete).toBe(false)
 changeWorkshop(w,p,'save','');expect(workshopView(w,p).complete).toBe(false)
 changeWorkshop(w,p,'own',second.reason);changeWorkshop(w,p,'save','');expect(workshopView(w,p).complete).toBe(true)
})

it('binds inference picture choices to distinct quoted evidence rather than unknown source IDs',()=>{
 const w=structuredClone(studio('l-r-inference').mission!.workshop!)
 expect(workshopProblems(w)).toEqual([])
 w.items[0].sourceArt!.choices[0].id='invented-evidence'
 expect(workshopProblems(w)).toContain('Invalid source illustration')
 const duplicate=structuredClone(studio('l-r-inference').mission!.workshop!)
 duplicate.items[0].sourceArt!.choices[1].id=duplicate.items[0].sourceArt!.choices[0].id
 expect(workshopProblems(duplicate)).toContain('Invalid source illustration')
 const unsafe=structuredClone(studio('l-r-inference').mission!.workshop!)
 unsafe.items[0].sourceArt!.asset='../outside'
 expect(workshopProblems(unsafe)).toContain('Invalid source illustration')
})


it('varies individual transfer letters while preserving every correct meaning and wrong-option explanation',()=>{
 const counts={a:0,b:0,c:0};let total=0
 for(const lesson of c.lessons){
  const question=lesson.visualMission?.workshop?.transfer
  if(question?.kind!=='choice')continue
  const canonical=JSON.parse(readFileSync(`content/teaching/individual/${lesson.id}.json`,'utf8')).workshop.transfer
  const original=JSON.stringify(canonical),right=canonical.options.find((o:{id:string})=>o.id===canonical.answer.option).text
  expect(question.options!.find(o=>o.id===question.answer.option)!.text).toBe(right)
  expect(checkAnswer(question,question.answer.option!)).toBe(true)
  for(const option of question.options!.filter(o=>o.id!==question.answer.option)){
   expect(checkAnswer(question,option.id)).toBe(false)
   const previous=canonical.options.find((o:{text:string})=>o.text===option.text)
   expect(question.explanation.distractors.find(d=>d.option===option.id)!.reason).toBe(canonical.explanation.distractors.find((d:{option:string})=>d.option===previous.id).reason)
  }
  expect(individualChoiceLayout(canonical)).toEqual(question);expect(JSON.stringify(canonical)).toBe(original)
  if(question.options!.length===3){counts[question.answer.option as keyof typeof counts]++;total++}
 }
 expect(total).toBeGreaterThanOrEqual(54)
 for(const n of Object.values(counts))expect(n).toBeGreaterThanOrEqual(Math.floor(total/6))
})

it('keeps a transfer layout stable across rebuilds and spelling changes',()=>{
 const canonical=JSON.parse(readFileSync('content/teaching/individual/l-g-be.json','utf8')).workshop.transfer
 const first=individualChoiceLayout(canonical)
 expect(individualChoiceLayout(canonical)).toEqual(first)
 const copy=structuredClone(canonical);for(const option of copy.options)option.text='Edited wording: '+option.text
 expect(individualChoiceLayout(copy).answer.option).toBe(first.answer.option)
 expect(individualChoiceLayout(copy).options.map((o:{id:string})=>o.id)).toEqual(first.options.map((o:{id:string})=>o.id))
})

it('invalidates stale checked letters after a transfer layout changes while retaining the learner writing',()=>{
 const previous=structuredClone(c),lesson=previous.lessons.find(l=>l.id==='l-g-be')!
 lesson.visualMission!.workshop!.transfer=JSON.parse(readFileSync('content/teaching/individual/l-g-be.json','utf8')).workshop.transfer
 const old=createLessonTeaching(previous,lesson),current=studio('l-g-be'),saved=freshTeaching(old,1),own='workshopOwn-'+old.mission!.workshop!.items[0].id
 expect(old.transfer.answer.option).not.toBe(current.transfer.answer.option)
 saved.step=4;saved.answers['step-4-0']=old.transfer.answer.option!;saved.checked['step-4-0']=true;saved.completed.push('transfer');saved.answers[own]='My original explanation stays saved.';saved.before='My first draft.';saved.after='My revised draft.'
 expect(restoreTeaching(old,saved,2)).toBe(saved)
 const restored=restoreTeaching(current,saved,3)
 expect(restored.step).toBe(0);expect(restored.checked).toEqual({});expect(restored.completed).toEqual([]);expect(restored.answers['step-4-0']).toBeUndefined();expect(restored.answers[own]).toBe(saved.answers[own]);expect(restored.before).toBe(saved.before);expect(restored.after).toBe(saved.after)
})


it('uses the selected edition in main-idea source cards,full passages and feedback',()=>{
 const lesson=c.lessons.find(l=>l.id==='l-r-main-idea')!
 for(const spelling of ['american','british'] as const){
  const repository=new ContentRepository({...c,questions:[...c.questions]},[],async()=>'');repository.setSpelling(spelling)
  const s=createLessonTeaching(repository.catalog,lesson,spelling),item=s.mission!.workshop!.items[5],expected=spelling==='american'?'realized':'realised'
  expect(item.options!.find(o=>o.correct)!.text).toContain(expected)
  expect(item.material).toContain(expected);expect(item.reason).toContain(expected)
  expect(s.cases[0].passage).toContain(spelling==='american'?'colorful':'colourful')
  expect(workshopProblems(s.mission!.workshop!)).toEqual([])
 }
})


it('uses edition-specific past practice verbs in actual speaking models and vocabulary while retaining the noun',()=>{
 const originalQuestions=c.questions.filter(q=>q.skill==='speaking'&&q.answer.display.includes('practised'))
 expect(originalQuestions.length).toBeGreaterThan(0)
 const singer=c.vocabulary.find(w=>w.word==='singer'&&w.example.includes('practised'))!
 expect(singer).toBeDefined()
 const repository=new ContentRepository({...c,questions:[...c.questions],vocabulary:[...c.vocabulary]},[],async()=>'')
 for(const spelling of ['american','british'] as const){
  repository.setSpelling(spelling);const expected=spelling==='american'?'practiced':'practised'
  for(const q of originalQuestions)expect(repository.getQuestion(q.id)!.answer.display).toContain(expected)
  expect(repository.catalog.vocabulary.find(w=>w.id===singer.id)!.example).toContain(expected)
 }
 expect(editionText('She practiced daily. Practice helps.','british')).toBe('She practised daily. Practice helps.')
 expect(editionText('She practised daily. Practice helps.','american')).toBe('She practiced daily. Practice helps.')
})

it('names each evidence requirement and preserves partial groups across wrong choices and reloads',()=>{
 const s=structuredClone(studio('l-r-course-t05')),w=s.mission!.workshop!,item=w.items[0],first=item.options!.find(o=>o.id===item.evidenceGroups![0][0])!
 item.options!.push({...first,id:'alternative-first'});item.evidenceGroups![0].push('alternative-first')
 expect(workshopProblems(w)).toEqual([])
 let p={...freshTeaching(s,1),step:1}
 expect(workshopView(w,p).proofSteps.map(step=>[step.label,step.accepted])).toEqual([['原先预计',false],['实际用时',false]])
 for(const id of [first.id,'alternative-first']){p=changeTeaching(s,p,'workshop-choose',id,2);p=changeTeaching(s,p,'workshop-check','',3)}
 expect(workshopView(w,p).proofCollected).toHaveLength(2)
 expect(workshopView(w,p).proofSteps.map(step=>step.accepted)).toEqual([true,false]);expect(workshopView(w,p).correct).toBe(false)
 p=changeTeaching(s,p,'workshop-choose',item.options!.find(o=>!o.correct)!.id,4);p=changeTeaching(s,p,'workshop-check','',5)
 p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),6)
 expect(workshopView(w,p).proofSteps.map(step=>step.accepted)).toEqual([true,false]);expect(workshopView(w,p).complete).toBe(false)
 p=changeTeaching(s,p,'workshop-choose',item.evidenceGroups![1][0],7);p=changeTeaching(s,p,'workshop-check','',8)
 expect(workshopView(w,p).proofSteps.every(step=>step.accepted)).toBe(true);expect(workshopView(w,p).correct).toBe(true);expect(workshopView(w,p).complete).toBe(false)
})

it('rejects missing,duplicate or unusable names for evidence slots without changing legacy lessons',()=>{
 const original=structuredClone(studio('l-r-course-t05').mission!.workshop!)
 for(const labels of [['one'],['same','same'],['','other'],[' leading','other'],['x'.repeat(25),'other']]){
  const w=structuredClone(original);w.items[0].evidenceLabels=labels;expect(workshopProblems(w)).toContain('Invalid named evidence slots')
 }
 const noCards=structuredClone(original);delete noCards.items[0].sourceStyle;expect(workshopProblems(noCards)).toContain('Invalid named evidence slots')
 const legacy=structuredClone(original);legacy.items.forEach(item=>delete item.evidenceLabels);expect(workshopProblems(legacy)).toEqual([])
})
