import {emptyState} from './core/learning'
import {checkedState} from './services/storage'
import {ContentRepository} from './services/content'
import {readFileSync} from 'node:fs'
import {individualChoiceLayout} from '../scripts/lib/individual-choice-layout.mjs'
import {checkAnswer} from './core/answers'
import {editionText} from './core/spelling'
import {workshopExpressionActions} from '../scripts/lib/workshop-test-actions.mjs'
import {it,expect} from 'vitest'
import {authorCatalog} from '../scripts/lib/author-content.mjs'
import {createLessonTeaching,teachingExplanation,freshTeaching,changeTeaching,teachingCanAdvance,restoreTeaching,teachingProblems,sourceEvidence} from './core/lesson-teaching'
import {workshopView,workshopProblems,changeWorkshop,mapWorkshop} from './core/lesson-workshop'
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
 p=changeTeaching(s,p,'workshop-choose',item.options!.find(o=>o.correct)!.id,2);p=changeTeaching(s,p,'workshop-input',item.answer,2);p=changeTeaching(s,p,'workshop-check','',3);p=changeTeaching(s,p,'workshop-save','',4);expect(workshopView(w,p).complete).toBe(false);p=changeTeaching(s,p,'workshop-own',`May I ${item.answer} this book today?`,5);p=changeTeaching(s,p,'workshop-save','',6);expect(workshopView(w,p).complete).toBe(true);p=changeTeaching(s,p,'workshop-item','1',7);p=changeTeaching(s,p,'workshop-item','0',8);expect(workshopView(w,p).input).toBe(item.answer);p=changeTeaching(s,p,'workshop-input','wrong',9);expect(workshopView(w,p).complete).toBe(false);expect(containsTerm('This is a cat.','a')).toBe(true);expect(containsTerm('This cat sat.','a')).toBe(false)
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
 const s=studio('l-v-school'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-choose',w.items[0].options!.find(o=>o.correct)!.id,2);p=changeTeaching(s,p,'workshop-input','lend',2);p=changeTeaching(s,p,'workshop-check','',3);expect(workshopView(w,p).usageDirection).toBe('right');expect(workshopView(w,p).feedback).toContain('借入');expect(workshopView(w,p).correct).toBe(false);p=changeTeaching(s,p,'workshop-input','borrow',4);p=changeTeaching(s,p,'workshop-check','',5);expect(workshopView(w,p).usageDirection).toBe('left');expect(workshopView(w,p).correct).toBe(true)
})

it('keeps vocabulary form cues consistent with the selected spelling and marks the actual stress beat',()=>{
 const l=c.lessons.find(l=>l.visualMission?.workshop?.items.some(i=>i.answer==='colour'))!;for(const spelling of ['american','british']as const){const w=createLessonTeaching(c,l,spelling).mission!.workshop!,item=w.items.find(i=>i.answer===(spelling==='american'?'color':'colour'))!;expect(item.hint).toContain(spelling==='american'?'5 个字符':'6 个字符');expect(item.hint).toContain('首字母是 c')}
 const s=studio('l-p-word-stress'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-choose','bad',2);expect(workshopView(w,p).soundUnits.map(u=>u.emphasis)).toEqual([true,false,false]);p=changeTeaching(s,p,'workshop-choose','good',3);expect(workshopView(w,p).soundUnits.map(u=>u.emphasis)).toEqual([false,true,false])
})

it('invalidates a completed transfer when its ordered response is edited, and a clinic diagnosis when replaced by a wrong choice',()=>{
 const l=c.lessons.find(l=>{const s=createLessonTeaching(c,l);return s.transfer.kind==='order'})!,s=createLessonTeaching(c,l);let p={...freshTeaching(s,1),step:4};p=changeTeaching(s,p,'answer',JSON.stringify(s.transfer.answer.order),2);p=changeTeaching(s,p,'check','',3);expect(teachingCanAdvance(s,p)).toBe(true);p=changeTeaching(s,p,'response-remove',s.transfer.answer.order![0],4);expect(teachingCanAdvance(s,p)).toBe(false);p={...freshTeaching(s,1),step:3,completed:s.diagnoses.map((_,i)=>'diagnosis-'+i)};p=changeTeaching(s,p,'diagnose',s.diagnosis.options.find(o=>o.id!==s.diagnosis.correct)!.id,5);expect(teachingCanAdvance(s,p)).toBe(false)
})

it('does not infer an agreed meeting from a proposal alone and retains accepted evidence after a wrong clue',()=>{
 const s=studio('l-ls-details'),w=s.mission!.workshop!,sources=w.items[0].options!.filter(o=>o.correct);expect(sources).toHaveLength(2);let p={...freshTeaching(s,1),step:1};const gap=w.items[0].sourceGap;if(gap){p=changeTeaching(s,p,'workshop-gap',gap.answer,2);p=changeTeaching(s,p,'workshop-gap-check','',2);expect(workshopView(w,p).correct).toBe(false)}p=changeTeaching(s,p,'workshop-choose',sources[0].id,2);p=changeTeaching(s,p,'workshop-check','',3);expect(workshopView(w,p).proofCollected).toHaveLength(1);expect(workshopView(w,p).correct).toBe(false);p=changeTeaching(s,p,'workshop-choose',w.items[0].options!.find(o=>!o.correct)!.id,4);p=changeTeaching(s,p,'workshop-check','',5);expect(workshopView(w,p).proofCollected).toHaveLength(1);p=changeTeaching(s,p,'workshop-choose',sources[1].id,6);p=changeTeaching(s,p,'workshop-check','',7);expect(workshopView(w,p).proofCollected).toHaveLength(2);expect(workshopView(w,p).correct).toBe(true)
})

it('uses a new situation for vocabulary application instead of repeating the worked cloze',()=>{
 const s=studio('l-v-school'),item=s.mission!.workshop!.items[0];let p={...freshTeaching(s,1),step:2};p.answers['workshopOwn-'+item.id]='May I borrow your ruler until lunch?';p=changeTeaching(s,p,'answer',p.answers['workshopOwn-'+item.id],2);p=changeTeaching(s,p,'word-review','',3);p=changeTeaching(s,p,'check','',4);expect(p.checked['step-2-0']).toBe(false);p=changeTeaching(s,p,'answer','May I borrow your dictionary after school today?',5);p=changeTeaching(s,p,'check','',6);expect(p.checked['step-2-0']).toBe(false);p=changeTeaching(s,p,'word-review','',7);p=changeTeaching(s,p,'check','',8);expect(p.checked['step-2-0']).toBe(true);p=changeTeaching(s,p,'answer','May I borrow your book tomorrow?',9);expect(p.checked['wordReview-'+item.id]).toBeUndefined();expect(p.completed).not.toContain('case-'+s.cases[0].id)
})

it('lets learners revisit earlier teaching without discarding their writing or recording an attempt',()=>{
 const s=studio('l-w-email'),item=s.mission!.workshop!.items[0];let p={...freshTeaching(s,1),step:2};p.answers['workshopOwn-'+item.id]='Please join our club on Friday afternoon.';p=changeTeaching(s,p,'previous','',2);expect(p.step).toBe(1);expect(workshopView(s.mission!.workshop!,p).own).toBe('Please join our club on Friday afternoon.')
})

for(const id of ['l-r-inference','l-r-course-t01','l-r-course-t05','l-r-course-t06','l-r-course-t09','l-r-course-t11','l-ls-course-t01','l-ls-course-t08','l-ls-course-t15','l-ls-course-t20'])it(`requires both the context and decisive clue before accepting ${id}`,()=>{
 const s=studio(id),w=s.mission!.workshop!,clues=w.items[0].options!.filter(o=>o.correct);expect(clues).toHaveLength(2);let p={...freshTeaching(s,1),step:1};const gap=w.items[0].sourceGap;if(gap){p=changeTeaching(s,p,'workshop-gap',gap.answer,2);p=changeTeaching(s,p,'workshop-gap-check','',2);expect(workshopView(w,p).complete).toBe(false)}p=changeTeaching(s,p,'workshop-choose',clues[0].id,2);p=changeTeaching(s,p,'workshop-check','',3);p=changeTeaching(s,p,'workshop-own','这两处线索共同回答了问题。',4);p=changeTeaching(s,p,'workshop-save','',5);expect(teachingCanAdvance(s,p)).toBe(false);p=changeTeaching(s,p,'workshop-choose',clues[1].id,6);p=changeTeaching(s,p,'workshop-check','',7);p=changeTeaching(s,p,'workshop-save','',8);expect(workshopView(w,p).complete).toBe(true);expect(teachingCanAdvance(s,p)).toBe(w.items.length===1)
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
 const rooted=structuredClone(studio('l-r-inference').mission!.workshop!)
 rooted.items[0].sourceArt!.assetRoot='assets';expect(workshopProblems(rooted)).toEqual([])
 rooted.items[0].sourceArt!.assetRoot='../outside' as 'assets';expect(workshopProblems(rooted)).toContain('Invalid source illustration')
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

it('keeps English possessives and contractions readable in actual lesson models without breaking evidence or answers',()=>{
 const repository=new ContentRepository({...c,questions:[...c.questions]},[],async()=>'')
 for(const spelling of ['american','british'] as const){
  repository.setSpelling(spelling)
  const s=createLessonTeaching(repository.catalog,c.lessons.find(l=>l.id==='l-r-course-t10')!,spelling)
  const q=s.cases.find(q=>q.id==='q-r-course-t10-1-4')!
  expect(q.stem).toContain("Ben's choice")
  const evidence=sourceEvidence(q).filter(e=>e.supports)
  expect(evidence.length).toBeGreaterThan(0);expect(evidence.every(e=>q.passage!.includes(e.text))).toBe(true)
  expect(checkAnswer(q,q.answer.option!)).toBe(true)
  const modals=createLessonTeaching(repository.catalog,c.lessons.find(l=>l.id==='l-g-modals')!,spelling)
  expect(modals.mission!.workshop!.conditions!.some(condition=>condition.reason.includes("mustn't"))).toBe(true)
  expect(editionText('他说：“Ben’s plan isn’t ready.”',spelling)).toBe('他说：“Ben\'s plan isn\'t ready.”')
 }
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

it('requires the learner to construct the source sequence and invalidates it when a step is removed',()=>{
 const s=studio('l-r-course-t09'),w=s.mission!.workshop!,i=w.items.findIndex(item=>!!item.sourceOrder),item=w.items[i],order=item.sourceOrder!
 let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-item',String(i),2)
 const act=(action:string,value='')=>{p=changeTeaching(s,p,'workshop-'+action,value,3)}
 act('order-add',order[1]);act('order-add',order[0]);act('order-add',order[2]);act('check')
 expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toContain('先后还没对上');expect(workshopView(w,p).orderAnswer.map(card=>card.wrong)).toEqual([true,true,false])
 act('order-clear');act('order-add',order[0]);act('order-add',order[0]);act('order-add','unknown')
 p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),4)
 expect(workshopView(w,p).orderAnswer.map(card=>card.id)).toEqual([order[0]])
 expect(workshopView(w,p).orderBank.some(card=>card.id===order[0])).toBe(false)
 act('check');expect(workshopView(w,p).correct).toBe(false)
 const decoy=item.options!.find(o=>!o.correct)!;act('order-add',decoy.id);act('check')
 expect(workshopView(w,p).feedback).toBe(decoy.reason);act('order-remove',decoy.id)
 for(const id of order.slice(1))act('order-add',id)
 act('check');expect(workshopView(w,p).correct).toBe(true);expect(workshopView(w,p).complete).toBe(false)
 act('save');expect(workshopView(w,p).complete).toBe(false)
 act('own',item.reason);act('save');expect(workshopView(w,p).complete).toBe(true)
 act('order-remove',order[1]);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),5)
 expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).complete).toBe(false)
 expect(workshopView(w,p).proofCollected).toEqual([])
 expect(workshopView(w,p).orderAnswer.map(card=>card.id)).toEqual([order[0],order[2]])
 act('order-clear');for(const id of order)act('order-add',id);act('check');act('save')
 expect(workshopView(w,p).complete).toBe(true)
 // A checked flag cannot make an unknown or duplicated saved sequence correct.
 for(const ids of [[...order,'unknown'],[order[0],order[0],order[2]]]){
  p.answers['workshopOrder-'+item.id]=ids.join('|');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).complete).toBe(false)
 }
})

it('rejects ambiguous source-order metadata while keeping ordinary evidence cards valid',()=>{
 const original=structuredClone(studio('l-r-course-t09').mission!.workshop!),i=original.items.findIndex(item=>!!item.sourceOrder),order=original.items[i].sourceOrder!
 for(const ids of [[],[order[0]],[order[0],order[0]],['unknown',order[1],order[2]],order.slice(0,2),[...order,'bad|id']]){
  const w=structuredClone(original);w.items[i].sourceOrder=ids;expect(workshopProblems(w)).toContain('Invalid source order')
 }
 const labels=structuredClone(original);labels.items[i].evidenceLabels=['one','two','three'];expect(workshopProblems(labels)).toContain('Invalid source order')
 const duplicateId=structuredClone(original);duplicateId.items[i].options!.push({...duplicateId.items[i].options![0],correct:false,text:duplicateId.items[i].material!});expect(workshopProblems(duplicateId)).toContain('Invalid source order')
 const duplicateQuote=structuredClone(original);duplicateQuote.items[i].options!.push({...duplicateQuote.items[i].options![0],id:'duplicate-quote',correct:false});expect(workshopProblems(duplicateQuote)).toContain('Invalid source order')
 const legacy=structuredClone(original);delete legacy.items[i].sourceOrder;expect(workshopProblems(legacy)).toEqual([])
 expect(createLessonTeaching(c,c.lessons.find(l=>l.id==='l-r-course-t09')!,'american').mission!.workshop!.items[i].sourceOrder).toEqual(order)
})

it('requires a calculated answer as well as the text evidence and invalidates it after edits',()=>{
 const s=studio('l-r-course-t12'),w=s.mission!.workshop!
 let p={...freshTeaching(s,1),step:1}
 const act=(action:string,value='')=>{p=changeTeaching(s,p,'workshop-'+action,value,2)}
 for(const index of [0,1]){
  act('item',String(index));const item=w.items[index],calculation=item.calculation!
  act('input',calculation.answer);act('check');expect(workshopView(w,p).correct).toBe(false)
  act('input','');for(const group of item.evidenceGroups!){act('choose',group[0]);act('check')}
  expect(workshopView(w,p).proofReady).toBe(true);expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).complete).toBe(false)
  for(const bad of index===0?['14:00','15:10','13:5','13:50 extra']:['90','60','80 minutes','080']){
   act('input',bad);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(calculation.wrong)
  }
  p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).proofReady).toBe(true)
  act('input',index===0?' １３：５０ ':'８０');act('check');expect(workshopView(w,p).correct).toBe(true)
  if(index===0){expect(workshopView(w,p).complete).toBe(false);act('own','14点前十分钟是13点50分。');act('save')}
  expect(workshopView(w,p).complete).toBe(true)
  act('input','');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).complete).toBe(false)
  p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),4);expect(workshopView(w,p).input).toBe('');expect(workshopView(w,p).proofReady).toBe(true)
  act('input',calculation.answer);act('check');if(index===0)act('save');expect(workshopView(w,p).complete).toBe(true)
  p.answers[`workshopInput-${index}`]='wrong';expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).tabs[index].done).toBe(false)
 }
})

it('rejects ambiguous calculated-response metadata and preserves numeric answers across spelling maps',()=>{
 const original=structuredClone(studio('l-r-course-t12').mission!.workshop!)
 for(const patch of [{answer:'25:10'},{answer:'13:60'},{answer:'13:5'},{answer:' 13:50'},{kind:'hours'},{label:''},{hint:''},{wrong:''}]){
  const w=structuredClone(original);Object.assign(w.items[0].calculation!,patch);expect(workshopProblems(w)).toContain('Invalid source calculation')
 }
 for(const answer of ['-1','80 minutes','080','10000']){const w=structuredClone(original);w.items[1].calculation!.answer=answer;expect(workshopProblems(w)).toContain('Invalid source calculation')}
 const plain=structuredClone(original);delete plain.items[0].sourceStyle;expect(workshopProblems(plain)).toContain('Invalid source calculation')
 const ordered=structuredClone(original);ordered.items[0].sourceOrder=['time','early'];expect(workshopProblems(ordered)).toContain('Invalid source calculation')
 for(const spelling of ['american','british'] as const){const s=createLessonTeaching(c,c.lessons.find(l=>l.id==='l-r-course-t12')!,spelling);expect(s.mission!.workshop!.items[0].calculation!.answer).toBe('13:50');expect(workshopProblems(s.mission!.workshop!)).toEqual([])}
})

it('closes a previous reading explanation on changing questions while retaining checked answers',()=>{
 const s=studio('l-r-course-t12');let p={...freshTeaching(s,1),step:2}
 p=changeTeaching(s,p,'answer',s.cases[0].answer.option!,2);p=changeTeaching(s,p,'check','',3);p=changeTeaching(s,p,'explanation','',4)
 expect(p.checked.explanation).toBe(true);expect(p.checked['step-2-0']).toBe(true)
 p=changeTeaching(s,p,'case','1',5);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),6)
 expect(p.caseIndex).toBe(1);expect(p.checked.explanation).toBe(false);expect(p.checked['step-2-1']).toBeUndefined()
 p=changeTeaching(s,p,'case','0',7);expect(p.checked['step-2-0']).toBe(true);expect(p.answers['step-2-0']).toBe(s.cases[0].answer.option);expect(p.checked.explanation).toBe(false)
})

it('counts distinct players from changing sports logs and keeps five-player transfer separate',()=>{
 for(const spelling of ['american','british'] as const){
  const s=createLessonTeaching(c,c.lessons.find(l=>l.id==='l-r-course-t17')!,spelling),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.applicationStyle).toBe('cards');expect(w.conditions).toHaveLength(10);expect(w.conditions!.slice(4).every(c=>c.world.layout==='stacked')).toBe(true)
  const logs=[['a','b','a','c'],['d','a','b','c'],['c','c','c','c'],['a','d','b','c','a']]
  for(const [i,log]of logs.entries()){
   const condition=w.conditions![i],scene=condition.world.scene!,p={...freshTeaching(s,1),step:1};p.answers.workshopIndex=String(i)
   expect(scene.record!.days.map(d=>d.text)).toEqual(log.map(id=>id.toUpperCase()));expect(scene.subjects).toEqual([...new Set(log)]);expect(condition.target).toBe(new Set(log).size===4?'can try to score':'must wait')
   changeWorkshop(w,p,'choose',condition.target);changeWorkshop(w,p,'check','');expect(workshopView(w,p).complete).toBe(false)
   for(const id of scene.subjects)changeWorkshop(w,p,'subject',id)
   changeWorkshop(w,p,'check','');expect(workshopView(w,p).complete).toBe(true)
   changeWorkshop(w,p,'subject',scene.subjects[0]);expect(workshopView(w,p).complete).toBe(false)
   const restored=restoreTeaching(s,p,2);expect(workshopView(w,restored).complete).toBe(false)
  }
  expect(s.cases.map(q=>q.id)).toEqual(['q-r-course-t17-1-2','q-r-course-t17-1-4']);expect(s.cases.every(q=>q.passage&&!q.passage.includes('Ben'))).toBe(true)
  expect(s.transfer.passage).toContain('L → M → L → N → O');expect(s.transfer.passage).toContain('five players');expect(s.transfer.explanation.visual!.segments).toContainEqual(expect.objectContaining({text:'Missing: P'}));expect(s.transfer.review).toBe('draft')
 }
})

it('retains accepted picture premises while a postcard argument collects its other required clue',()=>{
 const s=studio('l-r-course-t19'),w=s.mission!.workshop!
 for(const index of [2,4]){
  const p={...freshTeaching(s,1),step:1};p.answers.workshopIndex=String(index)
  const item=w.items[index],picture=item.evidenceGroups![0][0],other=item.evidenceGroups![1][0],wrong=item.sourceArt!.choices.find(c=>c.id!==picture)!.id
  changeWorkshop(w,p,'choose',picture);expect(workshopView(w,p).proofArtChoices.find(c=>c.id===picture)).toMatchObject({selected:true,accepted:false,wrong:false})
  changeWorkshop(w,p,'check','');expect(workshopView(w,p).proofReady).toBe(false);expect(workshopView(w,p).complete).toBe(false)
  changeWorkshop(w,p,'choose',other);expect(workshopView(w,p).proofArtChoices.find(c=>c.id===picture)).toMatchObject({selected:false,accepted:true,wrong:false})
  changeWorkshop(w,p,'check','');expect(workshopView(w,p).proofReady).toBe(true);expect(workshopView(w,p).complete).toBe(false)
  changeWorkshop(w,p,'choose',wrong);changeWorkshop(w,p,'check','');let v=workshopView(w,restoreTeaching(s,p,2));expect(v.proofArtChoices.find(c=>c.id===picture)).toMatchObject({accepted:true,wrong:false});expect(v.proofArtChoices.find(c=>c.id===wrong)).toMatchObject({selected:true,accepted:false,wrong:true});expect(v.complete).toBe(false)
  changeWorkshop(w,p,'choose',other);changeWorkshop(w,p,'check','');changeWorkshop(w,p,'own',item.reason);changeWorkshop(w,p,'save','');v=workshopView(w,p);expect(v.complete).toBe(true);expect(v.proofArtChoices.find(c=>c.id===picture)).toMatchObject({selected:false,accepted:true,wrong:false})
 }
})

it('requires the actual privacy masks and a bounded conclusion across changing backgrounds',()=>{
 for(const spelling of ['american','british'] as const){
  const s=createLessonTeaching(c,c.lessons.find(l=>l.id==='l-r-course-t21')!,spelling),w=s.mission!.workshop!
  expect(workshopProblems(w)).toEqual([])
  for(const [index,required]of [[1,['name','phone']],[2,['phone']],[3,['name']],[4,[]]] as [number,string[]][]){
   let p={...freshTeaching(s,1),step:1};changeWorkshop(w,p,'item',String(index));const condition=w.conditions![index]
   expect(condition.world.selection!.ids).toEqual(required)
   changeWorkshop(w,p,'choose',condition.target)
   // A harmless title is an extra mask, even when no private fields remain.
   changeWorkshop(w,p,'member','project');changeWorkshop(w,p,'check','')
   expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).redaction!.regions.find(r=>r.id==='project')).toMatchObject({masked:true,wrong:true})
   changeWorkshop(w,p,'member','project')
   for(const id of required.slice(0,-1))changeWorkshop(w,p,'member',id)
   if(required.length){changeWorkshop(w,p,'check','');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),2);expect(workshopView(w,p).redaction!.regions.filter(r=>r.masked).map(r=>r.id)).toEqual(required.slice(0,-1));changeWorkshop(w,p,'member',required.at(-1)!)}
   changeWorkshop(w,p,'choose',condition.choices!.find(x=>x!==condition.target)!);changeWorkshop(w,p,'check','');expect(workshopView(w,p).complete).toBe(false)
   changeWorkshop(w,p,'choose',condition.target);changeWorkshop(w,p,'check','');expect(workshopView(w,p).complete).toBe(true)
   changeWorkshop(w,p,'member',required[0]??'project');expect(workshopView(w,p).complete).toBe(false)
   p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false)
   // Old persisted flags must not conceal a restored name or an unnecessary mask.
   p.checked[`workshop-${index}`]=true;p.completed.push(`workshop-${index}`)
   expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).tabs[index].done).toBe(false)
   changeWorkshop(w,p,'member',required[0]??'project');changeWorkshop(w,p,'check','');expect(workshopView(w,p).complete).toBe(true)
  }
  expect(s.transfer.passage).toContain('only to the private class chat');expect(s.transfer.review).toBe('draft')
 }
})

it('rejects ambiguous masking diagrams and resets masks after their source changes',()=>{
 const s=studio('l-r-course-t21'),w=s.mission!.workshop!
 for(const mutate of [
  (x:typeof w)=>{x.conditions![1].world.selection!.preview!.regions[0].left=99},
  (x:typeof w)=>{x.conditions![1].world.selection!.preview!.regions[1].top=8},
  (x:typeof w)=>{x.conditions![1].world.selection!.preview!.regions[0].id='missing'},
  (x:typeof w)=>{x.conditions![1].world.selection!.preview=undefined},
  (x:typeof w)=>{x.conditions![1].world.selection!.mode='words'},
  (x:typeof w)=>{x.conditions![1].world.kind='calendar'}
 ]){const bad=structuredClone(w);mutate(bad);expect(workshopProblems(bad).length).toBeGreaterThan(0)}
 let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-item','1',2);p=changeTeaching(s,p,'workshop-member','name',3);p.answers['workshopOwn-photo-sharing-checks']='My own saved explanation.'
 const catalog=structuredClone(c),lesson=catalog.lessons.find(l=>l.id===s.id)!
 lesson.visualMission!.workshop!.conditions![1].world.selection!.preview!.regions[0].text='NAME: Sample Jo'
 const changed=createLessonTeaching(catalog,lesson)
 const restored=restoreTeaching(changed,p,4);expect(restored.answers['worldMembers-1']).toBeUndefined();expect(restored.answers['workshopOwn-photo-sharing-checks']).toBe('My own saved explanation.')
})

it('distinguishes the repeated photo contexts without treating an accepted picture as a complete argument',()=>{
 for(const spelling of ['american','british'] as const){
  const s=createLessonTeaching(c,c.lessons.find(l=>l.id==='l-r-course-t23')!,spelling),w=s.mission!.workshop!
  expect(workshopProblems(w)).toEqual([])
  for(const [index,context]of [[1,'old-card'],[2,'new-card']] as const){
   const item=w.items[index];expect(item.sourceArt!.layout).toBe('repeat');expect(item.sourceArt!.asset).toBe('lesson-bridge-source')
   let p={...freshTeaching(s,1),step:1};changeWorkshop(w,p,'item',String(index));changeWorkshop(w,p,'choose',context);changeWorkshop(w,p,'check','')
   expect(workshopView(w,p).proofArtChoices.find(c=>c.id===context)).toMatchObject({accepted:true,caption:context==='old-card'?'Another town · several years earlier':'Our river · this morning'})
   expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).complete).toBe(false)
   changeWorkshop(w,p,'choose',context==='old-card'?'new-card':'old-card');changeWorkshop(w,p,'check','');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),2)
   expect(workshopView(w,p).proofArtChoices.filter(c=>c.accepted)).toHaveLength(1);expect(workshopView(w,p).complete).toBe(false)
   changeWorkshop(w,p,'choose','earlier');changeWorkshop(w,p,'check','');expect(workshopView(w,p).correct).toBe(true);expect(workshopView(w,p).complete).toBe(false)
   changeWorkshop(w,p,'own',item.reason);changeWorkshop(w,p,'save','');expect(workshopView(w,p).complete).toBe(true)
  }
  expect(s.transfer.passage).toContain('one path');expect(s.transfer.explanation.distractors).toHaveLength(2);expect(s.transfer.review).toBe('draft')
 }
})

it('rejects incomplete comparison captions and resets checked arguments when a caption changes',()=>{
 const s=studio('l-r-course-t23'),w=s.mission!.workshop!
 for(const mutate of [
  (x:typeof w)=>{x.items[1].sourceArt!.choices[0].caption=undefined},
  (x:typeof w)=>{x.items[1].sourceArt!.choices[0].caption=' '},
  (x:typeof w)=>{x.items[1].sourceArt!.layout=undefined},
  (x:typeof w)=>{x.items[1].sourceArt!.layout='stacked' as 'repeat'}
 ]){const bad=structuredClone(w);mutate(bad);expect(workshopProblems(bad)).toContain('Invalid source illustration')}
 let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-item','1',2);p=changeTeaching(s,p,'workshop-choose','old-card',3);p=changeTeaching(s,p,'workshop-check','',4);p.answers['workshopOwn-fact-check-2']='My own saved explanation.'
 const catalog=structuredClone(c),lesson=catalog.lessons.find(l=>l.id===s.id)!
 lesson.visualMission!.workshop!.items[1].sourceArt!.choices[0].caption='A changed reported context'
 const updated=createLessonTeaching(catalog,lesson),restored=restoreTeaching(updated,p,5)
 expect(workshopView(updated.mission!.workshop!,restored).proofArtChoices.every(c=>!c.accepted)).toBe(true);expect(restored.answers['workshopOwn-fact-check-2']).toBe('My own saved explanation.')
})

it('checks every changed experimental condition and the question the comparison can answer',()=>{
 for(const spelling of ['american','british'] as const){
  const s=createLessonTeaching(c,c.lessons.find(l=>l.id==='l-r-course-t24')!,spelling),w=s.mission!.workshop!
  expect(workshopProblems(w)).toEqual([])
  for(let index=0;index<5;index++){
   const condition=w.conditions![index],scope=condition.world.selection!,changed=condition.world.cells.filter(c=>/^(Changed|Different)/.test(c.detail!)).map(c=>c.id!)
   expect(scope.mode).toBe('fields');expect([...scope.ids].sort()).toEqual([...changed].sort())
   expect(condition.target).toBe(changed.length===1?(changed[0]==='fold'?'can compare the folds':'do not compare folds'):'change two conditions')
   let p={...freshTeaching(s,1),step:1};changeWorkshop(w,p,'item',String(index));changeWorkshop(w,p,'choose',condition.target);changeWorkshop(w,p,'check','');expect(workshopView(w,p).complete).toBe(false)
   const extra=condition.world.cells.find(c=>!changed.includes(c.id!))!
   changeWorkshop(w,p,'member',extra.id!);changeWorkshop(w,p,'check','');expect(workshopView(w,p).feedback).toContain(extra.label);expect(workshopView(w,p).cells.find(c=>c.id===extra.id)!.wrong).toBe(true)
   changeWorkshop(w,p,'member',extra.id!)
   for(const id of changed)changeWorkshop(w,p,'member',id)
   changeWorkshop(w,p,'choose',condition.choices!.find(x=>x!==condition.target)!);changeWorkshop(w,p,'check','');expect(workshopView(w,p).complete).toBe(false)
   changeWorkshop(w,p,'choose',condition.target);changeWorkshop(w,p,'check','');expect(workshopView(w,p).complete).toBe(true)
   changeWorkshop(w,p,'member',changed[0]);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),2);expect(workshopView(w,p).complete).toBe(false)
   p.checked[`workshop-${index}`]=true;p.completed.push(`workshop-${index}`);expect(workshopView(w,p).tabs[index].done).toBe(false)
   changeWorkshop(w,p,'member',changed[0]);changeWorkshop(w,p,'check','');expect(workshopView(w,p).complete).toBe(true)
  }
  expect(s.transfer.passage).toContain('height and the base width change');expect(s.transfer.passage).toContain('Only these three classroom versions');expect(s.transfer.explanation.visual!.segments.slice(0,3).map(s=>s.text)).toEqual(['A: short + narrow','B: tall + wide','C: tall + narrow']);expect(s.transfer.review).toBe('draft')
 }
})

it('requires readable condition records instead of reusing quantitative or word-only displays',()=>{
 const w=studio('l-r-course-t24').mission!.workshop!
 for(const mutate of [
  (x:typeof w)=>{x.conditions![0].world.cells[0].detail=''},
  (x:typeof w)=>{x.conditions![0].world.kind='scale'},
  (x:typeof w)=>{x.conditions![0].world.selection!.ids=['missing']},
  (x:typeof w)=>{x.conditions![0].world.cells[1].id='paper'}
 ]){const bad=structuredClone(w);mutate(bad);expect(workshopProblems(bad).length).toBeGreaterThan(0)}
})

it('sorts the actual practice notice into persistent named stages and rejects wrong, partial or edited orders',()=>{
 const s=studio('l-r-course-t28'),w=s.mission!.workshop!,index=3,item=w.items[index],order=item.sourceOrder!
 let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)}
 act('item',String(index));expect(workshopView(w,p).orderSlots.map(x=>[x.label,x.filled])).toEqual(item.sourceOrderLabels!.map(label=>[label,false]))
 act('order-add','race');act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).orderSlots[0]).toMatchObject({label:'Before · 演练前',id:'race',wrong:true});expect(workshopView(w,p).orderSlots.slice(1).every(x=>!x.filled)).toBe(true)
 act('order-clear');for(const id of [...order].reverse())act('order-add',id);act('check');expect(workshopView(w,p).orderSlots.map(x=>x.wrong)).toEqual([true,false,true]);expect(workshopView(w,p).complete).toBe(false)
 act('order-clear');act('order-add',order[0]);act('check');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3)
 expect(workshopView(w,p).orderSlots.map(x=>x.filled)).toEqual([true,false,false]);expect(workshopView(w,p).orderSlots[0].text).toBe(item.options!.find(o=>o.id===order[0])!.text)
 for(const id of order.slice(1))act('order-add',id);act('check');expect(workshopView(w,p).correct).toBe(true);act('save');expect(workshopView(w,p).complete).toBe(false)
 act('own','先听老师说明，演练中听指令，结束后查哪些还不清楚。');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('order-remove',order[1]);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),4);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).orderSlots.map(x=>x.id)).toEqual([order[0],order[2],'']);act('check');expect(workshopView(w,p).orderSlots[1].wrong).toBe(true)
 act('order-clear');for(const id of order)act('order-add',id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
 p.answers['workshopOrder-'+item.id]=[order[0],order[2],order[1]].join('|');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).tabs[index].done).toBe(false)
})

it('rejects ambiguous phase labels and retains ordinary ordering and spelling behavior',()=>{
 const original=studio('l-r-course-t28').mission!.workshop!,index=3
 for(const labels of [[],['Before'],['Before','Before','After'],[' Before','During','After'],['Before','During','After '],['x'.repeat(25),'During','After'],['Before',42,'After']]){
  const w=structuredClone(original);w.items[index].sourceOrderLabels=labels as string[];expect(workshopProblems(w)).toContain('Invalid named order slots')
 }
 const unordered=structuredClone(original);delete unordered.items[index].sourceOrder;expect(workshopProblems(unordered)).toContain('Invalid named order slots')
 const legacy=studio('l-r-course-t27'),p={...freshTeaching(legacy,1),step:1};p.answers.workshopIndex='7';expect(workshopView(legacy.mission!.workshop!,p).orderSlots).toEqual([])
 for(const spelling of ['american','british'] as const){const s=createLessonTeaching(c,c.lessons.find(l=>l.id==='l-r-course-t28')!,spelling);expect(s.mission!.workshop!.items[index].sourceOrderLabels).toEqual(['Before · 演练前','During · 演练中','After · 演练后']);expect(workshopProblems(s.mission!.workshop!)).toEqual([])}
})

it('requires the actual cloze word, both context clues and a saved explanation, and invalidates edited words',()=>{
 for(const spelling of ['american','british'] as const){
  const s=createLessonTeaching(c,c.lessons.find(l=>l.id==='l-r-cloze')!,spelling),w=s.mission!.workshop!
  for(const [index,item]of w.items.entries()){
   if(!item.sourceGap)continue
   const gap=item.sourceGap;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index))
   expect(workshopView(w,p).gap!.text).toBe('____');act('gap-check');expect(workshopView(w,p).gap!.correct).toBe(false)
   for(const option of gap.options.filter(o=>o.id!==gap.answer)){act('gap',option.id);expect(workshopView(w,p).gap!.text).toBe(option.text);expect(workshopView(w,p).gap!.checked).toBe(false);act('gap-check');expect(workshopView(w,p).gap!.feedback).toBe(option.reason);expect(workshopView(w,p).correct).toBe(false)}
   act('gap',gap.answer);act('gap-check');act('own','My explanation is saved, but no clues yet.');act('save');expect(workshopView(w,p).complete).toBe(false)
   const groups=item.evidenceGroups!;act('choose',groups[0][0]);act('check');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).gap!.correct).toBe(true);expect(workshopView(w,p).proofCollected).toHaveLength(1);expect(workshopView(w,p).complete).toBe(false)
   for(const group of groups.slice(1)){act('choose',group[0]);act('check')};act('own','');act('save');expect(workshopView(w,p).correct).toBe(true);expect(workshopView(w,p).complete).toBe(false)
   act('own','The surrounding clues support the meaning and the relation.');act('save');expect(workshopView(w,p).complete).toBe(true)
   delete p.checked[`workshop-${index}-proof-${groups[0][0]}`];expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).complete).toBe(false);act('choose',groups[0][0]);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
   act('gap',gap.options.find(o=>o.id!==gap.answer)!.id);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),4);expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).proofCollected).toHaveLength(groups.length)
   p.checked['workshop-'+index]=true;p.completed.push('workshop-'+index);expect(workshopView(w,p).tabs[index].done).toBe(false)
   act('gap',gap.answer);expect(workshopView(w,p).correct).toBe(false);act('gap-check');act('save');expect(workshopView(w,p).complete).toBe(true)
   act('gap','');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),5);expect(workshopView(w,p).gap!.text).toBe('____');expect(workshopView(w,p).complete).toBe(false);act('gap','unknown-id');expect(workshopView(w,p).gap!.selected).toBe('')
  }
  expect(s.transfer.passage).toContain('Sunlight reached the tables');expect(s.transfer.answer.display).toBe('(1) bright; (2) so')
 }
})

it('rejects context gaps detached from the actual material, ambiguous words or missing feedback',()=>{
 const original=studio('l-r-cloze').mission!.workshop!
 for(const mutate of [
  (w:typeof original)=>{w.items[0].sourceGap!.before='Invented unrelated sentence '},
  (w:typeof original)=>{w.items[0].sourceGap!.answer='missing'},
  (w:typeof original)=>{w.items[0].sourceGap!.options[0].reason=''},
  (w:typeof original)=>{w.items[0].sourceGap!.options[0].text=w.items[0].sourceGap!.options[1].text},
  (w:typeof original)=>{w.items[0].sourceGap!.options[0].id=w.items[0].sourceGap!.options[1].id},
  (w:typeof original)=>{w.items[0].sourceGap!.options[0].text=' garden'},
  (w:typeof original)=>{w.kind='sound-map'}
 ]){const w=structuredClone(original);mutate(w);expect(workshopProblems(w)).toContain('Invalid context gap')}
 for(const spelling of ['american','british'] as const){const s=createLessonTeaching(c,c.lessons.find(l=>l.id==='l-r-cloze')!,spelling);expect(workshopProblems(s.mission!.workshop!)).toEqual([])}
 const s=studio('l-r-course-t29');expect(workshopView(s.mission!.workshop!,{...freshTeaching(s,1),step:1}).gap).toBeUndefined()
})

it('grounds every primary cloze explanation in literal passage quotes rather than the absent answer word',()=>{
 for(const q of c.questions.filter(q=>q.id.startsWith('q-r-cloze-1-'))){const quotes=q.explanation.visual.segments.filter(s=>s.role==='evidence').map(s=>s.text);expect(quotes).toHaveLength(2);expect(quotes.every(quote=>q.passage!.includes(quote))).toBe(true);expect(quotes.some(quote=>quote===q.answer.display)).toBe(false);expect(sourceEvidence(q).filter(s=>s.supports).length).toBeGreaterThanOrEqual(2);expect(q.explanation.steps[0].text).toContain(quotes[0])}
})


it('preserves the campus role evidence and saved reasoning through actual storage validation',()=>{
 const id='l-ls-course-t02',s=studio(id),w=s.mission!.workshop!,item=w.items[8]
 let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)}
 act('item','8');for(const group of item.evidenceGroups!){act('choose',group[0]);act('check')}
 act('own','老师自己留下提醒其他人，Ben同时去通知办公室。');act('save');expect(workshopView(w,p).complete).toBe(true)
 const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[id]:p}}),c,3,true)
 const restored=restoreTeaching(s,state.teaching[id],4),view=workshopView(w,restored)
 expect(view.complete).toBe(true);expect(view.proofCollected.map(o=>o.id)).toEqual(['stay','while']);expect(view.own).toContain('Ben同时去通知')
 expect(state.attempts).toHaveLength(0);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
})

it('rejects proof identifiers that cannot persist and duplicated clue identifiers',()=>{
 const original=studio('l-ls-course-t02').mission!.workshop!
 expect(workshopProblems(original)).toEqual([])
 for(const mutate of [
  (w:typeof original)=>{w.items[8].options![2].id='while_'},
  (w:typeof original)=>{w.items[8].id='campus/9'},
  (w:typeof original)=>{w.items[8].options![2].id=w.items[8].options![1].id}
 ]){const w=structuredClone(original);mutate(w);expect(workshopProblems(w)).toContain('Invalid persistent proof identifiers')}
})

it('keeps recall hidden until real attempts, preserves wrong drafts and requires comparison plus source reasoning',()=>{
 for(const spelling of ['american','british'] as const){
 const id='l-ls-course-t04',s=createLessonTeaching(c,c.lessons.find(l=>l.id===id)!,spelling),w=s.mission!.workshop!,index=w.items.findIndex(i=>!!i.sourceRecall),item=w.items[index],words=item.sourceRecall!.words
 let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index))
 expect(workshopView(w,p).recall!.phase).toBe('study');act('recall-input','map:map');expect(workshopView(w,p).recall!.rows[0].attempt).toBe('')
 act('recall-hide');expect(workshopView(w,p).recall!.rows.every(w=>w.answer==='')).toBe(true);act('recall-reveal');expect(workshopView(w,p).recall!.phase).toBe('recall')
 for(const word of words)act('recall-input',word.id+':不记得');act('recall-reveal');expect(workshopView(w,p).recall!.rows.every(w=>!w.same)).toBe(true);expect(workshopView(w,p).complete).toBe(false)
 const saved=checkedState(JSON.stringify({...emptyState(1),teaching:{[id]:p}}),c,3,true);p=restoreTeaching(s,saved.teaching[id],4);expect(workshopView(w,p).recall!.rows[0].attempt).toBe('不记得')
 for(const group of item.evidenceGroups!){act('choose',group[0]);act('check')};act('own','先遮住自己想，再揭开找没有想起来的词。');act('save');expect(workshopView(w,p).complete).toBe(true)
 // Completion records the guided comparison even if the recall was wrong, never mastery.
 expect(saved.attempts).toHaveLength(0);expect(saved.mastery).toEqual({});expect(saved.lessonDoneAt).toEqual({})
 act('recall-input',words[0].id+':'+words[0].answer.toUpperCase());expect(workshopView(w,p).recall!.phase).toBe('recall');expect(workshopView(w,p).recall!.rows.every(w=>w.answer==='')).toBe(true);expect(workshopView(w,p).complete).toBe(false)
 for(const word of words.slice(1))act('recall-input',word.id+':'+word.answer);act('recall-reveal');expect(workshopView(w,p).recall!.rows.every(w=>w.same)).toBe(true);act('choose',item.evidenceGroups![0][0]);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('recall-study');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).recall!.rows[0].attempt).toBe(words[0].answer.toUpperCase())
 p.completed.push('workshop-'+index);p.checked['workshop-'+index]=true;expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).tabs[index].done).toBe(false)
 }
})
it('rejects recall exercises with unsafe identifiers, ambiguous fields or mixed task mechanisms',()=>{
 const original=studio('l-ls-course-t04').mission!.workshop!,index=original.items.findIndex(i=>!!i.sourceRecall);expect(workshopProblems(original)).toEqual([])
 for(const mutate of [
  (w:typeof original)=>{w.items[index].sourceRecall!.words[0].id='map_'},
  (w:typeof original)=>{w.items[index].sourceRecall!.words[1].id=w.items[index].sourceRecall!.words[0].id},
  (w:typeof original)=>{w.items[index].sourceRecall!.words[0].answer=' '},
  (w:typeof original)=>{w.items[index].sourceRecall!.words[0].cue=''},
  (w:typeof original)=>{w.items[index].sourceRecall!.words=[]},
  (w:typeof original)=>{w.items[index].sourceRecall!.note=''},
  (w:typeof original)=>{w.items[index].evidenceGroups=[['try']]},
  (w:typeof original)=>{w.items[index].sourceOrder=['try','check']}
 ]){const w=structuredClone(original);mutate(w);expect(workshopProblems(w)).toContain('Invalid recall exercise')}
})

it('requires both reminder settings, their source constraints and reasoning through actual storage and repairs',()=>{
 for(const spelling of ['american','british'] as const){
 const id='l-ls-course-t05',s=createLessonTeaching(c,c.lessons.find(l=>l.id===id)!,spelling),w=s.mission!.workshop!,index=w.items.findIndex(i=>!!i.sourceSettings),item=w.items[index];let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('settings-check');expect(workshopView(w,p).settings!.rows.every(r=>!r.correct)).toBe(true);expect(workshopView(w,p).settings!.rows.every(r=>r.feedback.includes('还没设置'))).toBe(true)
 for(const values of [['off','off'],['on','on'],['off','on']]){act('setting','calls:'+values[0]);act('setting','alerts:'+values[1]);expect(workshopView(w,p).settings!.checked).toBe(false);act('settings-check');expect(workshopView(w,p).settings!.correct).toBe(false);expect(workshopView(w,p).complete).toBe(false)}
 act('setting','calls:on');act('setting','alerts:off');act('settings-check');expect(workshopView(w,p).settings!.correct).toBe(true);expect(workshopView(w,p).correct).toBe(false)
 for(const group of item.evidenceGroups!){act('choose',group[0]);act('check')};act('save');expect(workshopView(w,p).complete).toBe(false);act('own','保留妈妈来电，又把其他提醒静音，两个条件都要满足。');act('save');expect(workshopView(w,p).complete).toBe(true)
 const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[id]:p}}),c,3,true);p=restoreTeaching(s,state.teaching[id],4);expect(workshopView(w,p).complete).toBe(true);expect(workshopView(w,p).settings!.rows.map(r=>r.value)).toEqual(['on','off']);expect(state.attempts).toHaveLength(0);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 act('setting','calls:off');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).settings!.checked).toBe(false);expect(workshopView(w,p).proofCollected).toHaveLength(3)
 p.completed.push('workshop-'+index);p.checked['workshop-'+index]=true;p.checked['workshopSettings-manage-8']=true;expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).tabs[index].done).toBe(false)
 act('setting','calls:on');act('settings-check');act('choose',item.evidenceGroups![2][0]);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('setting','calls:on:extra');act('setting','unknown:on');act('setting','calls:unknown');expect(workshopView(w,p).complete).toBe(true)
 }
})
it('rejects inconsistent or nonpersistent reminder controls and mixed source mechanisms',()=>{
 const original=studio('l-ls-course-t05').mission!.workshop!,index=original.items.findIndex(i=>!!i.sourceSettings);expect(workshopProblems(original)).toEqual([])
 for(const mutate of [
  (w:typeof original)=>{w.items[index].sourceSettings!.rows[0].id='calls_'},
  (w:typeof original)=>{w.items[index].sourceSettings!.rows[1].id='calls'},
  (w:typeof original)=>{w.items[index].sourceSettings!.rows[0].answer='yes' as 'on'},
  (w:typeof original)=>{w.items[index].sourceSettings!.rows[0].wrong=''},
  (w:typeof original)=>{w.items[index].sourceSettings!.rows[0].label=''},
  (w:typeof original)=>{w.items[index].sourceSettings!.rows=[]},
  (w:typeof original)=>{w.items[index].sourceSettings!.note=''},
  (w:typeof original)=>{w.items[index].evidenceGroups=[['calls']]},
  (w:typeof original)=>{w.items[index].sourceGap=w.items[0].sourceGap}
 ]){const w=structuredClone(original);mutate(w);expect(workshopProblems(w)).toContain('Invalid source settings')}
})

it('keeps the actual wrong information route visible through storage and invalidates completion when its destination changes',()=>{
 const id='l-ls-course-t21',s=studio(id),w=s.mission!.workshop!,item=w.items[0];let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)}
 expect(workshopView(w,p).settings!.rows[0].route!.target).toBe('先选择去向或下一步')
 act('setting','contact-route:on');act('setting','password-request:on');act('settings-check');let view=workshopView(w,p);expect(view.settings!.rows.map(r=>r.route!.target)).toEqual(['Public group','Ask a trusted adult']);expect(view.settings!.rows.map(r=>r.correct)).toEqual([false,true]);expect(view.complete).toBe(false)
 const saved=checkedState(JSON.stringify({...emptyState(1),teaching:{[id]:p}}),c,3,true);p=restoreTeaching(s,saved.teaching[id],4);expect(workshopView(w,p).settings!.rows[0].route!.target).toBe('Public group')
 act('setting','contact-route:off');act('settings-check');expect(workshopView(w,p).settings!.rows[0].route!.target).toBe('Official school system');expect(workshopView(w,p).complete).toBe(false)
 for(const group of item.evidenceGroups!){act('choose',group[0]);act('check')}act('own','联系方式按指定系统交，索要密码的消息先问可信成人。');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('setting','password-request:off');view=workshopView(w,p);expect(view.settings!.rows[1].route!.target).toBe('Send my password');expect(view.settings!.checked).toBe(false);expect(view.complete).toBe(false);expect(view.proofCollected).toHaveLength(3);expect(view.own).toContain('可信成人')
 const edited=checkedState(JSON.stringify({...emptyState(1),teaching:{[id]:p}}),c,5,true);p=restoreTeaching(s,edited.teaching[id],6);expect(workshopView(w,p).settings!.rows[1].route!.target).toBe('Send my password');expect(workshopView(w,p).complete).toBe(false);expect(edited.attempts).toEqual([]);expect(edited.mastery).toEqual({});expect(edited.lessonDoneAt).toEqual({})
 act('setting','password-request:on');act('settings-check');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
})

it('rejects ambiguous, missing and mixed route labels while preserving translated per-row choices',()=>{
 const original=studio('l-ls-course-t21').mission!.workshop!;expect(workshopProblems(original)).toEqual([])
 for(const route of [null,'route',{}, {from:'',targets:['A','B']},{from:' Contact',targets:['A','B']},{from:'Contact',targets:['A']},{from:'Contact',targets:['A','A']},{from:'Contact',targets:['A',' B']},{from:'Contact',targets:['A','x'.repeat(29)]}]){const w=structuredClone(original);(w.items[0].sourceSettings!.rows[0] as any).route=route;expect(workshopProblems(w)).toContain('Invalid source route')}
 const mixed=structuredClone(original);mixed.items[0].sourceSettings!.pacing={paceRow:'contact-route',spaceRow:'password-request'};expect(workshopProblems(mixed)).toContain('Invalid source route')
 for(const spelling of ['american','british'] as const){const s=createLessonTeaching(c,c.lessons.find(l=>l.id==='l-ls-course-t21')!,spelling),w=s.mission!.workshop!,view=workshopView(w,freshTeaching(s,1));expect(view.settings!.rows.map(r=>r.labels)).toEqual(w.items[0].sourceSettings!.rows.map(r=>r.route!.targets));expect(view.settings!.rows.map(r=>r.route!.from)).toEqual(['Contact number','Password request'])}
})

it('keeps organiser and recognition forms consistent with the edition throughout source, live sentence and explanation',()=>{
 const british='The organiser organises visits. Organisations recognise helpers; one organisation recognised them. Organisers are recognising help.'
 const american='The organizer organizes visits. Organizations recognize helpers; one organization recognized them. Organizers are recognizing help.'
 expect(editionText(british,'american')).toBe(american);expect(editionText(american,'british')).toBe(british)
 for(const [id,britishForm,americanForm]of [['l-ls-course-t21','organiser','organizer'],['l-ls-course-t20','recognise cooperation','recognize cooperation']])for(const spelling of ['american','british'] as const){const s=createLessonTeaching(c,c.lessons.find(l=>l.id===id)!,spelling),w=s.mission!.workshop!,item=w.items.find(i=>i.sourceGap&&JSON.stringify(i).includes(spelling==='american'?americanForm:britishForm))!;expect(item).toBeDefined();expect(JSON.stringify(item)).toContain(spelling==='american'?americanForm:britishForm);expect(JSON.stringify(item)).not.toContain(spelling==='american'?britishForm:americanForm);expect(teachingProblems(s,c.lessons.find(l=>l.id===id)!)).toEqual([])}
})

it('rejects both plant-picture proof claims when the required pot bottom is unseen',()=>{
 const id='l-ls-course-t07',s=studio(id),w=s.mission!.workshop!,index=1,item=w.items[index];let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index))
 for(const choice of item.sourceArt!.choices){act('choose',choice.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).proofArtChoices.find(c=>c.id===choice.id)!.wrong).toBe(true);expect(workshopView(w,p).proofArtChoices.some(c=>c.accepted)).toBe(false)}
 act('choose','hole');act('check');act('own','两图看不到盆底，叶色不证明有孔；还需要直接检查。');act('save');expect(workshopView(w,p).complete).toBe(false)
 act('choose','unseen');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);expect(workshopView(w,p).proofArtChoices.some(c=>c.accepted)).toBe(false)
 const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[id]:p}}),c,3,true);p=restoreTeaching(s,state.teaching[id],4);expect(workshopView(w,p).complete).toBe(true);expect(workshopView(w,p).proofCollected.map(c=>c.id).sort()).toEqual(['hole','unseen']);expect(state.attempts).toHaveLength(0);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 expect(item.answer).toContain('still needs checking');expect(item.reason).toContain('不是证明盆没有孔')
})


it('keeps spending and balance distinct in actual yuan work, including persisted wrong and edited answers',()=>{
 const s=studio('l-ls-course-t08'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1}
 const act=(action:string,value='')=>{p=changeTeaching(s,p,'workshop-'+action,value,2)}
 for(const [index,answer,bad]of [[1,'8','12'],[2,'12','8']] as const){
  act('item',String(index));const item=w.items[index];expect(item.calculation?.kind).toBe('yuan')
  act('input',answer);act('check');expect(workshopView(w,p).correct).toBe(false)
  for(const g of item.evidenceGroups!){act('choose',g[0]);act('check')}
  for(const wrong of [bad,'20','012','12 yuan','-1','12.0']){act('input',wrong);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(item.calculation!.wrong)}
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-ls-course-t08':p}}),c,3,true);p=restoreTeaching(s,state.teaching['l-ls-course-t08'],3);expect(workshopView(w,p).input).toBe('12.0')
  act('input',answer.replace(/[0-9]/g,c=>String.fromCharCode(c.charCodeAt(0)+0xfee0)));act('check');expect(workshopView(w,p).correct).toBe(true)
  if(index===2){expect(workshopView(w,p).complete).toBe(false);act('own','原有二十元，蓝色本八元，余额二十减八等于十二。');act('save')}
  expect(workshopView(w,p).complete).toBe(true);act('input','');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),4);expect(workshopView(w,p).input).toBe('');expect(workshopView(w,p).proofReady).toBe(true)
  act('input',answer);act('check');if(index===2)act('save');expect(workshopView(w,p).complete).toBe(true)
  p.answers['workshopInput-'+index]=bad;expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).tabs[index].done).toBe(false)
  expect(state.attempts).toHaveLength(0);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
})

it('restricts authored yuan responses to explicit whole-yuan amounts and preserves other calculation kinds',()=>{
 const w=structuredClone(studio('l-ls-course-t08').mission!.workshop!);expect(workshopProblems(w)).toEqual([])
 for(const answer of ['12.5','-1','012','12 yuan','10000','']){const bad=structuredClone(w);bad.items[2].calculation!.answer=answer;expect(workshopProblems(bad)).toContain('Invalid source calculation')}
 for(const answer of ['0','9999']){const valid=structuredClone(w);valid.items[2].calculation!.answer=answer;expect(workshopProblems(valid)).toEqual([])}
 for(const spelling of ['american','british'] as const){const t=createLessonTeaching(c,c.lessons.find(l=>l.id==='l-ls-course-t08')!,spelling);expect(t.mission!.workshop!.items[2].calculation!.answer).toBe('12')}
 expect(studio('l-r-course-t12').mission!.workshop!.items[0].calculation!.kind).toBe('time');expect(studio('l-r-course-t12').mission!.workshop!.items[1].calculation!.kind).toBe('minutes')
})


it('keeps a three-factor change/keep plan distinct from the old two-reminder controls',()=>{
 const id='l-ls-course-t09',s=studio(id),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','1')
 expect(workshopView(w,p).settings!.labels).toEqual(['改变','保持']);act('settings-check');expect(workshopView(w,p).settings!.rows.every(r=>r.feedback.includes('先选改变或保持'))).toBe(true)
 for(const [row,value]of [['paper','on'],['shape','on'],['coins','off']])act('setting',row+':'+value);act('settings-check');let v=workshopView(w,p);expect(v.settings!.correct).toBe(false);expect(v.settings!.rows.map(r=>r.correct)).toEqual([false,true,true]);expect(v.settings!.rows.map(r=>r.status)).toEqual(['改变','改变','保持'])
 const stored=checkedState(JSON.stringify({...emptyState(1),teaching:{[id]:p}}),c,3,true);p=restoreTeaching(s,stored.teaching[id],4);expect(workshopView(w,p).settings!.rows.map(r=>r.value)).toEqual(['on','on','off'])
 act('setting','paper:off');act('settings-check');expect(workshopView(w,p).settings!.correct).toBe(true);expect(workshopView(w,p).complete).toBe(false)
 for(const g of w.items[1].evidenceGroups!){act('choose',g[0]);act('check')}act('own','只改形状，纸张和硬币保持相同，并逐个加硬币。');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('setting','coins:on');v=workshopView(w,p);expect(v.complete).toBe(false);expect(v.settings!.checked).toBe(false);expect(v.proofCollected).toHaveLength(2);expect(v.own).toContain('只改形状');expect(stored.attempts).toHaveLength(0);expect(stored.mastery).toEqual({});expect(stored.lessonDoneAt).toEqual({})
 const phone=studio('l-ls-course-t05'),phoneState={...freshTeaching(phone,1),step:1};phoneState.answers.workshopIndex='5';expect(workshopView(phone.mission!.workshop!,phoneState).settings!.labels).toEqual(['允许','静音'])
})

it('requires distinct explicit labels for both binary plan states',()=>{
 const w=structuredClone(studio('l-ls-course-t09').mission!.workshop!);expect(workshopProblems(w)).toEqual([])
 for(const labels of [[],['改变'],['改变','保持','其他'],['改变','改变'],[' 改变','保持'],['','保持'],['超过八个字符的状态名称','保持']]){const bad=structuredClone(w);(bad.items[1].sourceSettings as any).labels=labels;expect(workshopProblems(bad)).toContain('Invalid source settings')}
 const legacy=structuredClone(w);delete legacy.items[1].sourceSettings!.labels;expect(workshopProblems(legacy)).toEqual([])
 for(const spelling of ['american','british'] as const){const t=createLessonTeaching(c,c.lessons.find(l=>l.id==='l-ls-course-t09')!,spelling);expect(t.mission!.workshop!.items[1].sourceSettings!.labels).toEqual(['改变','保持'])}
})

it('changes silent pacing geometry independently and restores it without granting hearing or completion credit',()=>{
 const id='l-ls-course-t16',s=studio(id),w=s.mission!.workshop!,index=w.items.findIndex(i=>!!i.sourceSettings?.pacing),item=w.items[index];let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));expect(workshopView(w,p).settings!.pacing!.ready).toBe(false)
 act('setting','slower:on');expect(workshopView(w,p).settings!.pacing!.ready).toBe(false)
 for(const [pace,space]of [['off','off'],['on','off'],['off','on'],['on','on']]){act('setting','slower:'+pace);act('setting','spacing:'+space);const v=workshopView(w,p);expect(v.settings!.pacing).toMatchObject({ready:true,pace,space,beatGap:pace==='on'?10:4,extraGap:space==='on'?18:0,phraseGap:(pace==='on'?10:4)+(space==='on'?18:0)});expect(v.settings!.pacing!.groups.map(g=>g.dots.length)).toEqual([3,3,3]);act('settings-check');expect(workshopView(w,p).complete).toBe(false)}
 for(const group of item.evidenceGroups!){act('choose',group[0]);act('check')};act('own','先试较慢速度并给乐句留空，点图不是已成功的演奏结果。');act('save');expect(workshopView(w,p).complete).toBe(true)
 const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[id]:p}}),c,3,true);p=restoreTeaching(s,state.teaching[id],4);expect(workshopView(w,p).settings!.pacing).toMatchObject({ready:true,beatGap:10,extraGap:18,phraseGap:28});expect(state.attempts).toHaveLength(0);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 act('setting','spacing:off');expect(workshopView(w,p).settings!.pacing!.extraGap).toBe(0);expect(workshopView(w,p).settings!.pacing!.phraseGap).toBe(10);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).proofCollected).toHaveLength(3)
})
it('rejects a silent pacing illustration unless its two controls are distinct existing settings',()=>{
 const original=studio('l-ls-course-t16').mission!.workshop!,index=original.items.findIndex(i=>!!i.sourceSettings?.pacing);expect(workshopProblems(original)).toEqual([])
 for(const pacing of [null,{},'slower',{paceRow:'slower',spaceRow:'slower'},{paceRow:'unknown',spaceRow:'spacing'},{paceRow:'slower',spaceRow:'unknown'}]){const w=structuredClone(original);(w.items[index].sourceSettings as any).pacing=pacing;expect(workshopProblems(w)).toContain('Invalid pacing diagram')}
})

it('keeps measurement and equality spelling edition-specific in the fresh report transfer without changing its scope',()=>{
 const british='One litre; litres per day. Matching units cannot equalise coverage. It equalises, equalised and is equalising units.'
 const american='One liter; liters per day. Matching units cannot equalize coverage. It equalizes, equalized and is equalizing units.'
 expect(editionText(british,'american')).toBe(american);expect(editionText(american,'british')).toBe(british)
 const lesson=c.lessons.find(l=>l.id==='l-ls-course-t23')!
 for(const spelling of ['american','british'] as const){const s=createLessonTeaching(c,lesson,spelling),q=s.transfer,us=spelling==='american';expect(q.passage).toContain(us?'liters per day':'litres per day');expect(q.passage).toContain(us?'liters per week':'litres per week');expect(q.passage).toContain('three pools in one borough');expect(q.passage).toContain('A city and a region still have different coverage.');expect(q.options!.find(o=>o.id==='d')!.text).toContain(us?'equalize coverage':'equalise coverage');expect(teachingProblems(s,lesson)).toEqual([])}
})

it('moves the actual lake marker with a wrong saved direction and requires source-based repair without independent credit',()=>{
 const id='l-ls-course-t25',s=studio(id),w=s.mission!.workshop!,index=w.items.findIndex(i=>!!i.sourceGap?.locationMap),item=w.items[index]
 let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index))
 let map=workshopView(w,p).gap!.map!;expect(map.ready).toBe(false);expect(map.cells[4]).toMatchObject({text:'Village',anchor:true});expect(map.cells.filter(x=>x.marker)).toHaveLength(0)
 act('gap','south');act('gap-check');expect(workshopView(w,p).gap!.correct).toBe(false);expect(workshopView(w,p).gap!.map!.cells[7]).toMatchObject({text:'Lake',marker:true});expect(workshopView(w,p).complete).toBe(false)
 for(const group of item.evidenceGroups!){act('choose',group[0]);act('check')}act('own','湖的位置在村庄北面，不代表水一定往南流。');act('save');expect(workshopView(w,p).complete).toBe(false)
 const saved=checkedState(JSON.stringify({...emptyState(1),teaching:{[id]:p}}),c,3,true);p=restoreTeaching(s,saved.teaching[id],4);expect(workshopView(w,p).gap!.map!.direction).toBe('south');expect(saved.attempts).toEqual([]);expect(saved.mastery).toEqual({});expect(saved.lessonDoneAt).toEqual({})
 act('gap','north');act('gap-check');for(const group of item.evidenceGroups!){act('choose',group[0]);act('check')}act('save');expect(workshopView(w,p).complete).toBe(true);expect(workshopView(w,p).gap!.map!.cells[1]).toMatchObject({text:'Lake',marker:true})
 act('gap','east');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).gap!.checked).toBe(false);expect(workshopView(w,p).gap!.map!.cells[5]).toMatchObject({text:'Lake',marker:true});expect(workshopView(w,p).own).toContain('北面');expect(workshopView(w,p).proofCollected).toHaveLength(2)
 act('gap','');expect(workshopView(w,p).gap!.map!.ready).toBe(false);expect(workshopView(w,p).gap!.map!.cells.filter(x=>x.marker)).toEqual([]);expect(workshopView(w,p).complete).toBe(false)
})
it('rejects location previews with non-cardinal or duplicate direction words and ambiguous place labels',()=>{
 const original=studio('l-ls-course-t25').mission!.workshop!,index=original.items.findIndex(i=>!!i.sourceGap?.locationMap);expect(workshopProblems(original)).toEqual([])
 for(const mutate of [
  (w:typeof original)=>{w.items[index].sourceGap!.options[0].text='inside the school'},
  (w:typeof original)=>{w.items[index].sourceGap!.options[0].text='NORTH'},
  (w:typeof original)=>{w.items[index].sourceGap!.locationMap!.anchor=' Village'},
  (w:typeof original)=>{w.items[index].sourceGap!.locationMap!.marker='Village'},
  (w:typeof original)=>{w.items[index].sourceGap!.locationMap=null as unknown as NonNullable<typeof w.items[number]['sourceGap']>['locationMap']},
  (w:typeof original)=>{w.items[index].evidenceGroups=[['position']]}
 ]){const w=structuredClone(original);mutate(w);expect(workshopProblems(w)).toContain('Invalid context location map')}
 const w=structuredClone(original),item=w.items[index];item.sourceGap!.options.push({id:'west',text:'west',reason:'This puts the lake west, not north.'});expect(workshopProblems(w)).toEqual([]);const s=studio('l-ls-course-t25');let p={...freshTeaching(s,1),step:1};p.answers.workshopIndex=String(index);p.answers['workshopGap-'+item.id]='west';expect(workshopView(w,p).gap!.map!.cells[3]).toMatchObject({text:'Lake',marker:true})
 expect(workshopView(studio('l-r-cloze').mission!.workshop!,{...freshTeaching(studio('l-r-cloze'),1),step:1}).gap!.map).toBeUndefined()
})

it('keeps wildlife behavior spelling consistent with each edition and preserves the conditional limit',()=>{
 const c=authorCatalog(process.cwd()),lesson=c.lessons.find(l=>l.id==='l-ls-course-t26')!
 for(const spelling of ['american','british'] as const){const t=createLessonTeaching(c,lesson,spelling),item=t.mission!.workshop!.items.find(i=>i.id==='wildlife-3')!,word=spelling==='american'?'behavior':'behaviour';expect(item.material).toContain('change its '+word);expect(item.options!.find(o=>o.id==='good')!.text).toContain('change its '+word);expect(item.material).toContain('Not if it disturbs them.');expect(item.sourceSettings!.rows[1].route!.targets).toEqual(['Get closer anyway','Do not move closer']);expect(workshopProblems(t.mission!.workshop!)).toEqual([]);expect(teachingProblems(t,lesson)).toEqual([])}
})

it('plots the learner’s cup reduction without replacing a wrong count, preserving repair and zero independent credit',()=>{
 const id='l-ls-course-t27',s=studio(id),w=s.mission!.workshop!,item=w.items[1];let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','1');expect(workshopView(w,p).reduction!.ready).toBe(false)
 act('input','30');act('check');expect(workshopView(w,p).correct).toBe(false)
 for(const g of item.evidenceGroups!){act('choose',g[0]);act('check')}
 for(const wrong of ['10','40']){act('input',wrong);act('check');const v=workshopView(w,p);expect(v.reduction!.rows.map(r=>r.value)).toEqual(['40','10',wrong]);expect(v.reduction!.rows.map(r=>r.width)).toEqual([100,25,Number(wrong)*2.5]);expect(v.correct).toBe(false)}
 const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[id]:p}}),c,3,true);p=restoreTeaching(s,state.teaching[id],4);expect(workshopView(w,p).input).toBe('40');expect(workshopView(w,p).proofReady).toBe(true)
 act('input','３０');act('check');expect(workshopView(w,p).reduction!.rows.map(r=>r.width)).toEqual([100,25,75]);expect(workshopView(w,p).correct).toBe(true);expect(workshopView(w,p).complete).toBe(false);act('own','40减10等于30；这是杯子减少量，不能证明所有废弃物为零。');act('save');expect(workshopView(w,p).complete).toBe(true)
 for(const bad of ['','-1','1.5','030','10000','30 cups']){act('input',bad);act('check');const v=workshopView(w,p);expect(v.complete).toBe(false);expect(v.reduction!.ready).toBe(false);expect(v.reduction!.rows[2].value).toBe('—');expect(v.reduction!.rows.every(r=>Number.isFinite(r.width)&&r.width>=0&&r.width<=100)).toBe(true)}
 act('input','9999');expect(workshopView(w,p).reduction!.rows[2].width).toBe(100);expect(workshopView(w,p).reduction!.rows[0].value).toBe('40');expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
})
it('rejects inconsistent and malformed count reductions instead of plotting invented arithmetic',()=>{
 const w=structuredClone(studio('l-ls-course-t27').mission!.workshop!);expect(workshopProblems(w)).toEqual([])
 for(const r of [null,{before:10,after:40,unit:'个',beforeLabel:'上周',afterLabel:'本周'},{before:40.5,after:10,unit:'个',beforeLabel:'上周',afterLabel:'本周'},{before:40,after:10,unit:'',beforeLabel:'上周',afterLabel:'本周'},{before:40,after:10,unit:'个',beforeLabel:'本周',afterLabel:'本周'}]){const bad=structuredClone(w);bad.items[1].calculation!.reduction=r as never;expect(workshopProblems(bad)).toContain('Invalid reduction model')}
 for(const kind of ['time','yuan','minutes']){const bad=structuredClone(w);bad.items[1].calculation!.kind=kind as never;expect(workshopProblems(bad)).toContain('Invalid reduction model')}
 const bad=structuredClone(w);bad.items[1].calculation!.answer='10';expect(workshopProblems(bad)).toContain('Invalid reduction model')
})

it('keeps a wrong semantic decision visible despite correct spelling, and invalidates saved vocabulary after changing it',()=>{
 const s=studio('l-v-school'),w=s.mission!.workshop!,item=w.items[0],right=item.options!.find(o=>o.correct)!,wrong=item.options!.find(o=>!o.correct)!
 expect(item.wordDecision).toBeTruthy();let p={...freshTeaching(s,1),step:1}
 const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)}
 act('input',item.answer);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toContain('先选出')
 act('choose',wrong.id);act('check');expect(workshopView(w,p).feedback).toBe(wrong.reason);expect(workshopView(w,p).selected).toBe(wrong.id);expect(workshopView(w,p).input).toBe(item.answer)
 act('own','May I borrow a blue pen?');act('save');expect(workshopView(w,p).complete).toBe(false)
 p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).selected).toBe(wrong.id);expect(workshopView(w,p).feedback).toBe(wrong.reason)
 act('choose',right.id);act('check');act('own',item.material!);act('save');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).ownMissing).toBe(true);act('own','May I borrow a blue pen?');expect(workshopView(w,p).ownMissing).toBe(false);act('save');expect(workshopView(w,p).complete).toBe(true)
 act('choose',wrong.id);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).attempted).toBe(false);expect(workshopView(w,p).own).toBe('May I borrow a blue pen?')
 p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),4);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).selected).toBe(wrong.id)
 act('choose',right.id);act('input','lend');act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).usageDirection).toBe('right');expect(workshopView(w,p).choices.find(o=>o.id===right.id)!.accepted).toBe(true)
 act('input',item.answer);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('input','');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),5);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).input).toBe('');expect(workshopView(w,p).selected).toBe(right.id)
})
it('rejects ambiguous vocabulary decisions and maps their instructional language without changing persisted option ids',()=>{
 const original=studio('l-v-school').mission!.workshop!;expect(workshopProblems(original)).toEqual([])
 for(const mutate of [
  (w:typeof original)=>{w.items[0].options![1].correct=true},
  (w:typeof original)=>{w.items[0].options![0].correct=false},
  (w:typeof original)=>{w.items[0].options![1].id=w.items[0].options![0].id},
  (w:typeof original)=>{w.items[0].options![1].text=w.items[0].options![0].text},
  (w:typeof original)=>{w.items[0].options![1].reason=' '},
  (w:typeof original)=>{w.items[0].wordDecision!.prompt=' '},
  (w:typeof original)=>{w.items[0].wordDecision!.art!.asset='../outside'},
  (w:typeof original)=>{w.items[0].options![0].id=undefined as unknown as string},
  (w:typeof original)=>{w.items[0].wordDecision!.art!.asset=undefined as unknown as string},
  (w:typeof original)=>{w.items[0].wordDecision!.art!.assetRoot=null as unknown as 'assets'},
  (w:typeof original)=>{w.items[0].wordDecision=null as unknown as typeof w.items[0]['wordDecision']},
  (w:typeof original)=>{w.kind='proof'}
 ]){const w=structuredClone(original);mutate(w);expect(workshopProblems(w)).toContain('Invalid word decision')}
 const us=structuredClone(original);us.items[0].wordDecision!.prompt='Which color is your favorite?';us.items[0].wordDecision!.art!.alt='The color of the ruler.';us.items[0].options![0].text='favorite color';us.items[0].hint='Check the color.'
 const uk=mapWorkshop(us,text=>editionText(text,'british'));expect(uk.items[0].wordDecision!.prompt).toBe('Which colour is your favourite?');expect(uk.items[0].wordDecision!.art!.alt).toBe('The colour of the ruler.');expect(uk.items[0].options![0].text).toBe('favourite colour');expect(uk.items[0].hint).toBe('Check the colour.');expect(uk.items[0].options!.map(o=>o.id)).toEqual(us.items[0].options!.map(o=>o.id));expect(uk.items[0].wordDecision!.art!.asset).toBe(us.items[0].wordDecision!.art!.asset)
})
it('locates the selected picture claim without treating a highlight as a correct answer',()=>{
 const s=studio('l-v-school-3'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,value='')=>{p=changeTeaching(s,p,'workshop-'+a,value,3)}
 act('item','3');expect(workshopView(w,p).wordEvidence).toBeUndefined();act('input','Compare');act('choose','covers');let v=workshopView(w,p);expect(v.wordEvidence!.regions.map(r=>r.id)).toEqual(['left-book','right-book']);expect(v.wordEvidence!.regions[0].style).toBe('left:15%;top:25%;width:20%;height:26%;');expect(v.correct).toBe(false)
 act('check');expect(workshopView(w,p).correct).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),2);expect(workshopView(w,p).wordEvidence!.regions).toHaveLength(2)
 act('choose','effort');expect(workshopView(w,p).wordEvidence!.regions).toEqual([]);expect(workshopView(w,p).wordEvidence!.caption).toContain('没有记录');act('choose','green');expect(workshopView(w,p).wordEvidence!.regions.map(r=>r.id)).toEqual(['green-pencil']);expect(workshopView(w,p).correct).toBe(false)
 act('input','compare');act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toContain('大小写');act('input','Compare');act('check');expect(workshopView(w,p).correct).toBe(true);expect(workshopView(w,p).complete).toBe(false);act('own','I compare two answers with the passage.');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('choose','covers');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordEvidence!.regions).toHaveLength(2)
})
it('rejects invalid or incomplete picture evidence and maps labels without moving regions',()=>{
 const original=studio('l-v-school-3').mission!.workshop!;expect(workshopProblems(original)).toEqual([])
 for(const mutate of [
  (w:typeof original)=>{w.items[3].wordDecision!.art!.evidence![0].regions[0].left=90},
  (w:typeof original)=>{w.items[3].wordDecision!.art!.evidence![0].regions[0].height=0},
  (w:typeof original)=>{w.items[3].wordDecision!.art!.evidence![0].regions[0].top=NaN},
  (w:typeof original)=>{w.items[3].wordDecision!.art!.evidence![0].option='absent'},
  (w:typeof original)=>{w.items[3].wordDecision!.art!.evidence!.pop()},
  (w:typeof original)=>{w.items[3].wordDecision!.art!.evidence![1].regions[1].id='left-book'},
  (w:typeof original)=>{w.items[3].wordDecision!.art!.evidence![0].caption=' '},
 ]){const w=structuredClone(original);mutate(w);expect(workshopProblems(w)).toContain('Invalid word picture evidence')}
 const us=structuredClone(original),e=us.items[3].wordDecision!.art!.evidence![0];e.caption='Compare the color.';e.regions[0].label='favorite color';const uk=mapWorkshop(us,text=>editionText(text,'british')),mapped=uk.items[3].wordDecision!.art!.evidence![0];expect(mapped.caption).toBe('Compare the colour.');expect(mapped.regions[0].label).toBe('favourite colour');expect(mapped.option).toBe(e.option);expect(mapped.regions[0].left).toBe(e.regions[0].left);expect(mapped.regions[0].id).toBe(e.regions[0].id)
})
it('varies semantic answer positions while keeping each task stable through checks and restoration',()=>{
 for(const id of ['l-v-school','l-v-school-2','l-v-school-3','l-v-daily','l-v-daily-2','l-v-daily-3','l-v-community','l-v-community-2','l-v-community-3','l-v-nature','l-v-nature-2','l-v-nature-3','l-v-course-family','l-v-course-family-2','l-v-course-family-3','l-v-course-family-4','l-v-course-family-5','l-v-course-home','l-v-course-home-2','l-v-course-home-3','l-v-course-home-4','l-v-course-home-5','l-v-course-school-tools','l-v-course-school-tools-2','l-v-course-school-tools-3','l-v-course-school-tools-4','l-v-course-school-tools-5','l-v-course-time','l-v-course-time-2','l-v-course-time-3','l-v-course-time-4','l-v-course-time-5','l-v-course-quantity','l-v-course-quantity-2','l-v-course-quantity-3','l-v-course-quantity-4','l-v-course-quantity-5']){
  const s=studio(id),w=s.mission!.workshop!,source=JSON.stringify(w.items),positions=[]
  for(const[index,item]of w.items.entries()){
   let p={...freshTeaching(s,1),step:1};const act=(a:string,value='')=>{p=changeTeaching(s,p,'workshop-'+a,value,2)};act('item',String(index));const good=item.options!.find(o=>o.correct)!,order=workshopView(w,p).choices.map(o=>o.id);positions.push(order.indexOf(good.id));expect(new Set(order)).toEqual(new Set(item.options!.map(o=>o.id)))
   act('choose',good.id);act('input',item.answer);if(item.wordDecision?.clock)act('clock',String(item.wordDecision.clock.answer));if(item.wordDecision?.ruler)act('ruler',String(item.wordDecision.ruler.answer));if(item.wordDecision?.climate)p=changeTeaching(s,p,'workshop-climate',item.wordDecision.climate.answer,2);if(item.wordDecision?.until)p=changeTeaching(s,p,'workshop-until',item.wordDecision.until.answer,2);if(item.wordDecision?.dailyWalk){p=changeTeaching(s,p,'workshop-daily-walk','reset',2);for(const day of ['mon','tue','wed','thu','fri','sat','sun'])p=changeTeaching(s,p,'workshop-daily-walk',day,2)}if(item.wordDecision?.reportedChange)p=changeTeaching(s,p,'workshop-reportedChange',item.wordDecision.reportedChange.answer,2);if(item.wordDecision?.queueMove)for(const value of ['reset','long','quick','move'])p=changeTeaching(s,p,'workshop-queueMove',value,2);if(item.wordDecision?.shelfRoom)for(const value of ['reset','add','add','add'])p=changeTeaching(s,p,'workshop-shelfRoom',value,2);if(item.wordDecision?.fileDesk)for(const value of ['reset',...(item.wordDecision.fileDesk.mode==='save'?['save','close']:['backup','delete'])])p=changeTeaching(s,p,'workshop-fileDesk',value,2);if(item.wordDecision?.titleArrow)p=changeTeaching(s,p,'workshop-titleArrow','arrow',2);if(item.wordDecision?.offlinePage)for(const value of ['reset','save','network','open'])p=changeTeaching(s,p,'workshop-offlinePage',value,2);if(item.wordDecision?.nameGroups){p=changeTeaching(s,p,'workshop-nameGroups','reset',2);for(const n of item.wordDecision.nameGroups.names)p=changeTeaching(s,p,'workshop-nameGroups',n.id+':'+(n.name[0]<='M'?'am':'nz'),2)}if(item.wordDecision?.phoneMode)p=changeTeaching(s,p,'workshop-phoneMode','silent',2);if(item.wordDecision?.printPages){p=changeTeaching(s,p,'workshop-printPages','reset',2);for(const n of item.wordDecision.printPages.needed)p=changeTeaching(s,p,'workshop-printPages',String(n),2)}if(item.wordDecision?.chance){p=changeTeaching(s,p,'workshop-chance','reset',2);for(const person of ['a','b','c','d'])p=changeTeaching(s,p,'workshop-chance',person+'+',2)}if(item.wordDecision?.boat){p=changeTeaching(s,p,'workshop-boat','mast',2);p=changeTeaching(s,p,'workshop-boat','sail',2)}if(item.wordDecision?.shift)p=changeTeaching(s,p,'workshop-shift','less',2);if(item.wordDecision?.provision)p=changeTeaching(s,p,'workshop-provision','pack',2);if(item.wordDecision?.thermal)p=changeTeaching(s,p,'workshop-thermal','rise-'+item.wordDecision.thermal.answer,2);if(item.wordDecision?.daylight)p=changeTeaching(s,p,'workshop-daylight',item.wordDecision.daylight.answer,2);if(item.wordDecision?.weather){p=changeTeaching(s,p,'workshop-weather',item.wordDecision.weather.answer,2);p=changeTeaching(s,p,'workshop-weather','observe',2)}if(item.wordDecision?.door){act('door',item.wordDecision.door.answer);act('door','release');if(item.wordDecision.door.answer==='person')act('door','push')}if(item.wordDecision?.rotation)act('rotation',String(item.wordDecision.rotation.answer));if(item.wordDecision?.fraction){act('fraction','clear');for(let n=0;n<item.wordDecision.fraction.answer;n++)act('fraction','add')}if(item.wordDecision?.quantity){act('quantity','clear');for(let n=0;n<item.wordDecision.quantity.answer;n++)act('quantity','add')}if(item.wordDecision?.recordSelection){act('record-none');for(const row of item.wordDecision.recordSelection.rows.filter(r=>r.include).slice(0,item.wordDecision.recordSelection.selectionMode==='one'?1:undefined))act('record-toggle',row.id)}act('check');expect(workshopView(w,p).choices.map(o=>o.id)).toEqual(order);expect(workshopView(w,p).correct).toBe(true);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).choices.map(o=>o.id)).toEqual(order);expect(workshopView(w,p).selected).toBe(good.id)
  }
  expect(new Set(positions).size).toBeGreaterThan(1);expect(positions.some(p=>p>0)).toBe(true);expect(JSON.stringify(w.items)).toBe(source)
 }
})

it('accepts authored past and plural forms in own use without relaxing context or meaning gates',()=>{
 const id='l-v-nature-2',s=studio(id),w=s.mission!.workshop!
 for(const [index,sentence,bad] of [[0,'We planted flowers near the classroom window.','We plantted flowers near the classroom window.'],[1,'The young plants grew quickly last spring.','The young plants growed quickly last spring.'],[2,'Several bright leaves floated down beside me.','Several bright leafs floated down beside me.']] as const){
  const item=w.items[index],good=item.options!.find(o=>o.correct)!,wrong=item.options!.find(o=>!o.correct)!;let p={...freshTeaching(s,1),step:1};const act=(a:string,value='')=>{p=changeTeaching(s,p,'workshop-'+a,value,2)};act('item',String(index))
  act('choose',wrong.id);act('input',item.answer);act('check');act('own',sentence);act('save');expect(workshopView(w,p).complete).toBe(false)
  act('choose',good.id);act('input',item.ownForms![1]);act('check');expect(workshopView(w,p).correct).toBe(false)
  act('input',item.answer);act('check');act('own',bad);act('save');expect(workshopView(w,p).complete).toBe(false);act('own',item.material!);act('save');expect(workshopView(w,p).complete).toBe(false)
  act('own',sentence);act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[id]:p}}),c,3,true);p=restoreTeaching(s,state.teaching[id],4);expect(workshopView(w,p).own).toBe(sentence);expect(workshopView(w,p).complete).toBe(true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
  act('own',bad);expect(workshopView(w,p).complete).toBe(false)
 }
})

it('accepts a new conjugated rewrite only after self-review and rejects unchanged or unlisted writing',()=>{
 const s=studio('l-v-nature-2'),item=s.mission!.workshop!.items[1],original='The young plants grew quickly last spring.';let p={...freshTeaching(s,1),step:2,caseIndex:1};p.answers['workshopOwn-'+item.id]=original
 const act=(name:string,value='')=>{p=changeTeaching(s,p,name,value,2)}
 act('answer','We have grown vegetables in our sunny garden.');act('check');expect(p.checked['step-2-1']).toBe(false);act('word-review');act('check');expect(p.checked['step-2-1']).toBe(true)
 act('answer','Our plants growed quickly during the spring.');act('word-review');act('check');expect(p.checked['step-2-1']).toBe(false)
 act('answer',original);act('word-review');act('check');expect(p.checked['step-2-1']).toBe(false)
})

it('keeps the given-form requirement when no own-use forms are authored',()=>{
 const s=studio('l-v-nature-2'),w=structuredClone(s.mission!.workshop!),item=w.items[1];delete item.ownForms
 let p={...freshTeaching(s,1),step:1};const act=(a:string,value='')=>changeWorkshop(w,p,a,value);act('item','1');act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer);act('check');act('own','The young plants grew quickly last spring.');act('save');expect(workshopView(w,p).complete).toBe(false);act('own','Young plants grow quickly during the spring.');act('save');expect(workshopView(w,p).complete).toBe(true)
})

it('validates explicit own-use forms and maps their spelling without inventing new accepted forms',()=>{
 const original=studio('l-v-nature-2').mission!.workshop!;expect(workshopProblems(original)).toEqual([])
 for(const forms of [null,'grow',[],['grow'],['grew','grown'],['grow','grow'],['grow','GROW'],['grow',' grew'],['grow','two words'],['grow',''],['grow',...Array.from({length:8},(_,i)=>'grows'+'x'.repeat(i))]]){const w=structuredClone(original);w.items[1].ownForms=forms as never;expect(workshopProblems(w)).toContain('Invalid own-use word forms')}
 const w=structuredClone(original);w.kind='proof';expect(workshopProblems(w)).toContain('Invalid own-use word forms')
 const us=structuredClone(original);us.items[0].answer='color';us.items[0].ownForms=['color','colors'];const uk=mapWorkshop(us,text=>editionText(text,'british'));expect(uk.items[0].ownForms).toEqual(['colour','colours']);expect(uk.items[0].id).toBe(us.items[0].id)
})

it('keeps family address capitalization and the maternal spelling consistent with each edition',()=>{
 const lesson=c.lessons.find(l=>l.id==='l-v-course-family')!
 for(const spelling of ['british','american'] as const){
  const s=createLessonTeaching(c,lesson,spelling),w=s.mission!.workshop!,maternal=spelling==='british'?'Mum':'Mom'
  expect(w.items[5].id).toBe('mum');expect(w.items[5].answer).toBe(maternal)
  expect(w.items[5].material).toBe(`${maternal} left a note on the fridge.`)
  expect(w.items[5].wordDecision!.prompt).toContain(`${maternal} left a note`)
  for(const index of [4,5]){
   let p={...freshTeaching(s,1),step:1};const item=w.items[index],act=(action:string,value='')=>{p=changeTeaching(s,p,'workshop-'+action,value,2)}
   act('item',String(index));act('choose',item.options!.find(option=>option.correct)!.id)
   act('input',item.answer.toLowerCase());act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toContain('大小写')
   act('input',item.answer);act('check');expect(workshopView(w,p).correct).toBe(true)
   act('own',`My ${item.answer.toLowerCase()} helped me choose a new book.`);act('save');expect(workshopView(w,p).complete).toBe(true)
   p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(true)
  }
 }
})

it('shows the same written relationship records after either claim without granting answer or completion credit',()=>{
 const s=studio('l-v-course-family-2'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,value='')=>{p=changeTeaching(s,p,'workshop-'+a,value,2)}
 const item=w.items[0],good=item.options!.find(o=>o.correct)!,wrong=item.options!.find(o=>!o.correct)!,records=structuredClone(item.wordDecision!.recordPaths)
 expect(workshopView(w,p).wordRecordPaths).toEqual([])
 act('input',item.answer);act('choose',wrong.id);expect(workshopView(w,p).wordRecordPaths).toEqual(records);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).complete).toBe(false)
 p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordRecordPaths).toEqual(records)
 act('choose',good.id);expect(workshopView(w,p).wordRecordPaths).toEqual(records);expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).choices.some(o=>o.accepted)).toBe(false)
 act('check');expect(workshopView(w,p).correct).toBe(true);expect(workshopView(w,p).complete).toBe(false)
 act('own','My grandfather grows tomatoes in his garden.');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('choose',wrong.id);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordRecordPaths).toEqual(records)
 act('item','4');expect(workshopView(w,p).wordRecordPaths).toEqual([]);expect(item.wordDecision!.recordPaths).toEqual(records)
})
it('strictly bounds written record paths and maps their text while preserving persisted ids and source records',()=>{
 const original=studio('l-v-course-family-2').mission!.workshop!;expect(workshopProblems(original)).toEqual([])
 const variants:unknown[]=[null,{},[],[null],Array(4).fill({id:'a',label:'record',steps:['a','b']}),[{id:'a',label:'record',steps:['a','b']},{id:'a',label:'other',steps:['c','d']}],...[{id:'../bad'},{id:'x'.repeat(41)},{label:' '},{label:' record'},{label:'x'.repeat(41)},{steps:null},{steps:['one']},{steps:['a','b','c','d','e']},{steps:['a',null]},{steps:['a',' b']},{steps:['a','x'.repeat(61)]}].map(change=>[{id:'a',label:'record',steps:['a','b'],...change}])]
 for(const paths of variants){const w=structuredClone(original);w.items[0].wordDecision!.recordPaths=paths as never;expect(workshopProblems(w)).toContain('Invalid word record paths')}
 const us=structuredClone(original),path=us.items[0].wordDecision!.recordPaths![0];path.label='Favorite color';path.steps=['Lin','her favorite color'];const uk=mapWorkshop(us,text=>editionText(text,'british'))
 expect(uk.items[0].wordDecision!.recordPaths![0]).toEqual({id:path.id,label:'Favourite colour',steps:['Lin','her favourite colour']});expect(path.label).toBe('Favorite color');expect(uk.items[0].options!.map(o=>o.id)).toEqual(us.items[0].options!.map(o=>o.id))
 const proof=structuredClone(original);proof.kind='proof';expect(workshopProblems(proof)).toContain('Invalid word record paths')
})

it('keeps actual picture targets neutral through selection, contextual repair and restoration',()=>{
 const s=studio('l-v-course-home'),w=s.mission!.workshop!,index=4,item=w.items[index],source=JSON.stringify(w),good=item.options!.find(o=>o.correct)!,bad=item.options!.find(o=>!o.correct)!;let p={...freshTeaching(s,1),step:1}
 const act=(a:string,value='')=>{p=changeTeaching(s,p,'workshop-'+a,value,2)};act('item',String(index));expect(workshopView(w,p).wordPictureTargets.every(t=>!t.selected)).toBe(true)
 act('choose',bad.id);let v=workshopView(w,p);expect(v.wordPictureTargets.find(t=>t.selected)!.option).toBe(bad.id);expect(v.complete).toBe(false);expect(v.wordPictureTargets.every(t=>!('accepted' in t)&&!('correct' in t))).toBe(true)
 act('input',item.answer);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(bad.reason)
 p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordPictureTargets.find(t=>t.selected)!.option).toBe(bad.id)
 act('choose',good.id);expect(workshopView(w,p).attempted).toBe(false);expect(workshopView(w,p).complete).toBe(false);act('input','wrong');act('check');expect(workshopView(w,p).correct).toBe(false)
 act('input',item.answer);act('check');act('save');expect(workshopView(w,p).complete).toBe(false);act('own','My bedroom has a desk beside the window.');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('choose',bad.id);expect(workshopView(w,p).complete).toBe(false);expect(p.completed).not.toContain('workshop-'+index);expect(teachingCanAdvance(s,p)).toBe(false);expect(JSON.stringify(w)).toBe(source)
 expect(workshopView(studio('l-v-course-family-5').mission!.workshop!,freshTeaching(studio('l-v-course-family-5'),1)).wordPictureTargets).toEqual([])
})
it('rejects ambiguous or malformed picture targets and maps labels without changing their bindings',()=>{
 const original=studio('l-v-course-home').mission!.workshop!;expect(workshopProblems(original)).toEqual([])
 for(const mutate of [
  (w:typeof original)=>{w.items[4].wordDecision!.art!.targets=null as never},
  (w:typeof original)=>{w.items[4].wordDecision!.art!.targets=[]},
  (w:typeof original)=>{w.items[4].wordDecision!.art!.targets!.pop()},
  (w:typeof original)=>{w.items[4].wordDecision!.art!.targets![0].option='absent'},
  (w:typeof original)=>{w.items[4].wordDecision!.art!.targets![1].option=w.items[4].wordDecision!.art!.targets![0].option},
  (w:typeof original)=>{w.items[4].wordDecision!.art!.targets![1].id=w.items[4].wordDecision!.art!.targets![0].id},
  (w:typeof original)=>{w.items[4].wordDecision!.art!.targets![0].label=' '},
  (w:typeof original)=>{w.items[4].wordDecision!.art!.targets![0].labelPosition='centre' as never},
  (w:typeof original)=>{w.items[4].wordDecision!.art!.targets![0].left=NaN},
  (w:typeof original)=>{w.items[4].wordDecision!.art!.targets![0].width=11},
  (w:typeof original)=>{w.items[4].wordDecision!.art!.targets![0].height=0},
  (w:typeof original)=>{w.items[4].wordDecision!.art!.targets![0].top=95},
  (w:typeof original)=>{w.items[4].wordDecision!.art!.targets![1].left=15},
 ]){const w=structuredClone(original);mutate(w);expect(workshopProblems(w)).toContain('Invalid word picture targets')}
 const us=structuredClone(original);us.items[4].wordDecision!.art!.targets![0].label='favorite color';us.items[4].wordDecision!.art!.targets![0].labelPosition='top';const uk=mapWorkshop(us,t=>editionText(t,'british')),target=uk.items[4].wordDecision!.art!.targets![0];expect(target.label).toBe('favourite colour');expect(target.labelPosition).toBe('top');const view=workshopView(uk,{...freshTeaching(studio('l-v-course-home'),1),answers:{workshopIndex:'4'}});expect(view.wordPictureTargets[0].style).toContain('align-items:flex-start');expect(workshopView(original,{...freshTeaching(studio('l-v-course-home'),1),answers:{workshopIndex:'4'}}).wordPictureTargets[0].style).toContain('align-items:flex-end');expect(target.id).toBe(us.items[4].wordDecision!.art!.targets![0].id);expect(target.option).toBe(us.items[4].wordDecision!.art!.targets![0].option);expect(target.left).toBe(us.items[4].wordDecision!.art!.targets![0].left);expect(us.items[4].wordDecision!.art!.targets![0].label).toBe('favorite color')
})
it('requires slow-clock correction and preserves the learner sentence when a signed offset changes',()=>{
 const s=studio('l-v-course-time-3'),w=s.mission!.workshop!,item=w.items[7];let p={...freshTeaching(s,1),step:1}
 const act=(name:string,value='')=>{p=changeTeaching(s,p,'workshop-'+name,value,2)}
 act('item','7');act('choose',item.options!.find(o=>o.correct)!.id);act('input','clock');act('check');expect(workshopView(w,p).correct).toBe(false)
 for(const offset of ['-5','0']){act('clock',offset);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(item.wordDecision!.clock!.wrong)}
 act('clock','5');act('check');act('own','Our kitchen clock needs a new battery.');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('clock','-5');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordClock!.time).toBe('14:20');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toBe('Our kitchen clock needs a new battery.')
 const before=JSON.stringify(p);act('clock','-05');expect(JSON.stringify(p)).toBe(before)
 act('clock','5');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
 const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
})
it('requires the authored clock movement and invalidates completion after changing it',()=>{
 const s=studio('l-v-course-time-2'),w=s.mission!.workshop!
 for(const index of [4,5]){
  const item=w.items[index],clock=item.wordDecision!.clock!;let p={...freshTeaching(s,1),step:1}
  const act=(name:string,value='')=>{p=changeTeaching(s,p,'workshop-'+name,value,2)}
  act('item',String(index));act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer);act('check');expect(workshopView(w,p).correct).toBe(false)
  act('clock','30');act('check');expect(workshopView(w,p).feedback).toBe(clock.wrong)
  act('clock','15');act('check');expect(workshopView(w,p).correct).toBe(true)
  const own=index===4?'We will meet our visitors at noon.':'The storm finally stopped just after midnight.'
  act('own',own);act('save');expect(workshopView(w,p).complete).toBe(true)
  act('clock','30');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toBe(own)
  p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordClock!.time).toBe(index===4?'12:15':'00:15');expect(workshopView(w,p).complete).toBe(false)
  const before=JSON.stringify(p);act('clock','015');expect(JSON.stringify(p)).toBe(before)
  act('clock','15');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 const invalid=structuredClone(w);invalid.items[4].wordDecision!.clock!.start='24:00';expect(workshopProblems(invalid)).toContain('Invalid word clock')
})

it('requires bounded diary evidence, explicit none, and repairs without independent credit',()=>{
 const s=studio('l-v-course-time-5'),w=s.mission!.workshop!,original=JSON.stringify(w)
 for(const index of [4,5,7]){
  const item=w.items[index],records=item.wordDecision!.recordSelection!;let p={...freshTeaching(s,1),step:1}
  const act=(name:string,value='')=>{p=changeTeaching(s,p,'workshop-'+name,value,2)}
  act('item',String(index));act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer);act('check')
  expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(records.wrong)
  expect(workshopView(w,p).wordRecordSelection!.noneSelected).toBe(false)
  const before=JSON.stringify(p);act('record-toggle','absent');act('record-none','forged');expect(JSON.stringify(p)).toBe(before)
  act('record-none');if(index!==7){act('check');expect(workshopView(w,p).correct).toBe(false)}
  for(const row of records.rows.filter(r=>r.include))act('record-toggle',row.id)
  act('check');expect(workshopView(w,p).correct).toBe(true);act('save');expect(workshopView(w,p).complete).toBe(false)
  const own=index===4?'Our teacher always writes the date before class.':index===5?'I often read short stories before going to bed.':'I never share my school password with other people.'
  act('own',own);act('save');expect(workshopView(w,p).complete).toBe(true)
  act('record-toggle',records.rows[0].id);expect(workshopView(w,p).complete).toBe(false)
  p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toBe(own)
  act('record-none');for(const row of records.rows.filter(r=>r.include))act('record-toggle',row.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  for(const raw of ['mon|mon|thu|fri','fri|thu|tue|mon','mon|tue|thu|fri|unknown','']){
   const forged=structuredClone(p);forged.answers['workshopRecordSelection-'+item.id]=raw;expect(workshopView(w,forged).complete).toBe(false)
  }
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(JSON.stringify(w)).toBe(original)
})
it('maps diary text by edition without changing evidence identities or inclusion',()=>{
 const original=studio('l-v-course-time-5').mission!.workshop!,us=structuredClone(original)
 const row=us.items[4].wordDecision!.recordSelection!.rows[0];row.text='Favorite color.'
 const uk=mapWorkshop(us,t=>editionText(t,'british')),mapped=uk.items[4].wordDecision!.recordSelection!.rows[0]
 expect(mapped.text).toBe('Favourite colour.');expect(mapped.id).toBe(row.id);expect(mapped.include).toBe(row.include);expect(row.text).toBe('Favorite color.')
 const malformed=structuredClone(original);malformed.items[4].wordDecision!.recordSelection!.rows[1].id='mon';expect(workshopProblems(malformed)).toContain('Invalid word record selection')
})

it('keeps a correct meaning choice correct while a separate evidence or clock setting still needs repair',()=>{
 for(const [id,index] of [['l-v-course-time-5',4],['l-v-course-time-4',1]] as const){
  const s=studio(id),w=s.mission!.workshop!,item=w.items[index];let p={...freshTeaching(s,1),step:1}
  const act=(name:string,value='')=>{p=changeTeaching(s,p,'workshop-'+name,value,2)}
  act('item',String(index));const good=item.options!.find(o=>o.correct)!,wrong=item.options!.find(o=>!o.correct)!
  act('choose',good.id);act('input',item.answer);act('check');const v=workshopView(w,p)
  expect(v.correct).toBe(false);expect(v.complete).toBe(false);expect(v.choices.find(o=>o.id===good.id)!.accepted).toBe(true)
  expect(v.feedback).toBe(item.wordDecision!.recordSelection?.wrong??item.wordDecision!.clock!.wrong)
  act('choose',wrong.id);act('check');expect(workshopView(w,p).choices.find(o=>o.id===wrong.id)!.accepted).toBe(false)
 }
})


it('requires exact manipulated quantities with meaning and spelling, survives reload and preserves own writing without independent credit',()=>{
 const s=studio('l-v-course-quantity'),w=s.mission!.workshop!,original=JSON.stringify(w)
 expect(workshopProblems(w)).toEqual([])
 expect(w.items.map(i=>i.answer)).toEqual(['zero','one','two','three','Four','five','six','seven'])
 expect(w.items.flatMap(i=>i.wordDecision?.quantity?[i.wordDecision.quantity.answer]:[])).toEqual([1,4,6,8,5,1])
 for(const index of [1,2,3,4,6,7]){
  const item=w.items[index],q=item.wordDecision!.quantity!;let p={...freshTeaching(s,1),step:1}
  const act=(name:string,value='')=>{p=changeTeaching(s,p,'workshop-'+name,value,2)}
  act('item',String(index));act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer);act('check')
  expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(q.wrong)
  expect(workshopView(w,p).choices.find(o=>o.selected)!.accepted).toBe(true)
  for(let n=0;n<q.answer;n++)act('quantity','add')
  act('check');expect(workshopView(w,p).correct).toBe(true);expect(workshopView(w,p).complete).toBe(false)
  act('own',`I wrote ${item.answer} in my new sentence today.`);act('save');expect(workshopView(w,p).complete).toBe(true)
  const own=workshopView(w,p).own;act('quantity','remove');expect(workshopView(w,p).complete).toBe(false)
  p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordQuantity!.count).toBe(q.answer-1);expect(workshopView(w,p).own).toBe(own)
  const forged=structuredClone(p);forged.checked['workshop-'+index]=true;forged.completed.push('workshop-'+index);expect(workshopView(w,forged).complete).toBe(false);expect(workshopView(w,forged).tabs[index].done).toBe(false)
  act('quantity','add');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const before=JSON.stringify(p);act('quantity','set:8');expect(JSON.stringify(p)).toBe(before)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(JSON.stringify(w)).toBe(original)
 expect(s.transfer.passage).toContain('each box contains three empty pots');expect(s.transfer.review).toBe('draft')
})
it('maps quantity labels by edition while preserving exact counts and image identity',()=>{
 const w=studio('l-v-course-quantity').mission!.workshop!,copy=structuredClone(w),q=copy.items[1].wordDecision!.quantity!
 q.title='Favorite color';const uk=mapWorkshop(copy,t=>editionText(t,'british')).items[1].wordDecision!.quantity!
 expect(uk.title).toBe('Favourite colour');expect(uk.answer).toBe(q.answer);expect(uk.unitArt).toBe(q.unitArt)
 const bad=structuredClone(w);bad.items[1].wordDecision!.quantity!.limit=20;expect(workshopProblems(bad)).toContain('Invalid word quantity')
})

it('requires ruler position, meaning and spelling together and reopens changed distances without losing writing',()=>{
 const s=studio('l-v-course-quantity-2'),w=s.mission!.workshop!,item=w.items[2],r=item.wordDecision!.ruler!;let p={...freshTeaching(s,1),step:1}
 const act=(name:string,value='')=>{p=changeTeaching(s,p,'workshop-'+name,value,2)}
 act('item','2');act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(r.wrong);expect(workshopView(w,p).choices.find(o=>o.selected)!.accepted).toBe(true)
 for(const distance of r.choices){act('ruler',String(distance));act('check');expect(workshopView(w,p).correct).toBe(distance===10);expect(workshopView(w,p).complete).toBe(false)}
 act('ruler','10');act('check');act('own','We left ten centimetres between the plant labels.');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('ruler','11');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordRuler!.reading).toBe('0 → 11 cm');expect(workshopView(w,p).own).toContain('ten centimetres')
 const forged=structuredClone(p);forged.checked['workshop-2']=true;forged.completed.push('workshop-2');expect(workshopView(w,forged).complete).toBe(false);expect(workshopView(w,forged).tabs[2].done).toBe(false)
 const before=JSON.stringify(p);for(const bad of ['10 ','010','16','-1']){act('ruler',bad);expect(JSON.stringify(p)).toBe(before)}
 act('ruler','10');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
 const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 const copy=structuredClone(w);copy.items[2].wordDecision!.ruler!.markerLabel='Favorite color';const mapped=mapWorkshop(copy,t=>editionText(t,'british'));expect(mapped.items[2].wordDecision!.ruler!.markerLabel).toBe('Favourite colour');expect(mapped.items[2].wordDecision!.ruler!.answer).toBe(10)
 copy.items[2].wordDecision!.ruler!.choices=[10,10];expect(workshopProblems(copy)).toContain('Invalid word ruler')
})
it('counts whole additional jars and distinguishes remaining objects from stated totals in the second quantity lesson',()=>{
 const s=studio('l-v-course-quantity-2'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([])
 expect(w.items.map(i=>i.answer)).toEqual(['Eight','Nine','ten','eleven','twelve','Thirteen','fourteen','fifteen'])
 expect(w.items.flatMap(i=>i.wordDecision?.quantity?[i.wordDecision.quantity.answer]:[])).toEqual([4,3,8,3,8,4])
 expect(w.items[4].wordDecision!.quantity).toMatchObject({shape:'jar',unitArt:'count-unit-jar',answer:3,limit:6})
 const bad=structuredClone(w);bad.items[4].wordDecision!.quantity!.unitArt=undefined;expect(workshopProblems(bad)).toContain('Invalid word quantity')
 expect(s.transfer.passage).toContain('Each team plays once');expect(s.transfer.review).toBe('draft')
})

it('teaches additional chairs, two sessions, capacity, elapsed time and bundles in the third quantity lesson',()=>{
 const s=studio('l-v-course-quantity-3'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([])
 expect(w.items.map(i=>i.answer)).toEqual(['Sixteen','seventeen','Eighteen','nineteen','Twenty','thirty','forty','Fifty'])
 expect(w.items.flatMap(i=>i.wordDecision?.quantity?[i.wordDecision.quantity.answer]:[])).toEqual([4,3,1,5])
 expect(w.items[0].wordDecision!.quantity).toMatchObject({shape:'chair',unitArt:'count-unit-chair',answer:4,limit:6})
 const bad=structuredClone(w);bad.items[0].wordDecision!.quantity!.unitArt=undefined;expect(workshopProblems(bad)).toContain('Invalid word quantity')
 expect(w.items[1].wordDecision!.recordSelection!.rows.filter(r=>r.include).map(r=>r.id)).toEqual(['morning','afternoon'])
 expect(w.items[3].wordDecision!.recordSelection!.rows.filter(r=>r.include).map(r=>r.id)).toEqual(['leave','join'])
 expect(w.items[5].wordDecision!.clock).toMatchObject({start:'11:10',answer:30,intervals:[0,13,20,30,40]})
 expect(s.transfer.passage).toContain('twelve chairs are already in position');expect(s.transfer.review).toBe('draft')
})
it('preserves an off-tick fourteen-metre attempt and requires forty before saving the larger-scale task',()=>{
 const s=studio('l-v-course-quantity-3'),w=s.mission!.workshop!,item=w.items[6];let p={...freshTeaching(s,1),step:1}
 const act=(name:string,value='')=>{p=changeTeaching(s,p,'workshop-'+name,value,2)}
 act('item','6');act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer);act('ruler','14');act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).wordRuler!.markerStyle).toBe('left:28%;')
 p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordRuler!.reading).toBe('0 → 14 m')
 act('ruler','40');act('check');expect(workshopView(w,p).correct).toBe(true);act('own','The path beside our school is forty meters long.');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('ruler','50');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordRuler!.markerStyle).toBe('left:100%;')
 const forged=structuredClone(p);forged.checked['workshop-6']=true;forged.completed.push('workshop-6');expect(workshopView(w,forged).complete).toBe(false)
 act('ruler','40');act('check');expect(workshopView(w,p).own).toContain('forty meters');act('save');expect(workshopView(w,p).complete).toBe(true)
 const uk=mapWorkshop(w,t=>editionText(t,'british')),us=mapWorkshop(w,t=>editionText(t,'american'));expect(uk.items[6].material).toContain('metres');expect(us.items[6].material).toContain('meters');expect(us.items[6].wordDecision!.ruler!.emptyLabel).toBe('路径终点还没定位');expect(us.items[6].wordDecision!.ruler!.tickStep).toBe(5)
 const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
})

it('requires the directed quarter turn, resulting direction and spelling before saving ninety',()=>{
 const s=studio('l-v-course-quantity-4'),w=s.mission!.workshop!,item=w.items[3];let p={...freshTeaching(s,1),step:1}
 const act=(name:string,value='')=>{p=changeTeaching(s,p,'workshop-'+name,value,2)}
 act('item','3');act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer);act('check');expect(workshopView(w,p).correct).toBe(false)
 for(const n of [0,90,180,270]){act('rotation',String(n));act('check');expect(workshopView(w,p).correct).toBe(n===90)}
 p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordRotation!.orientation).toBe('right')
 act('rotation','90');act('check');act('own','We turned the paper ninety degrees to the left.');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('rotation','180');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('ninety degrees')
 const forged=structuredClone(p);forged.checked['workshop-3']=true;forged.completed.push('workshop-3');expect(workshopView(w,forged).complete).toBe(false)
 const before=JSON.stringify(p);for(const bad of ['090','90 ','360','left']){act('rotation',bad);expect(JSON.stringify(p)).toBe(before)}
 act('rotation','90');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
 const copy=structuredClone(w);copy.items[3].wordDecision!.rotation!.title='Favorite color';const uk=mapWorkshop(copy,t=>editionText(t,'british'));expect(uk.items[3].wordDecision!.rotation!.title).toBe('Favourite colour');expect(uk.items[3].wordDecision!.rotation!.answer).toBe(90)
 copy.items[3].wordDecision!.rotation!.choices=[0,45];expect(workshopProblems(copy)).toContain('Invalid word rotation')
 const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
})
it('distinguishes grouped units, exact counts, strict thresholds and the first paragraph in quantity four',()=>{
 const s=studio('l-v-course-quantity-4'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['sixty','seventy','eighty','ninety','hundred','thousand','million','first']);expect(w.items.flatMap(i=>i.wordDecision?.quantity?[i.wordDecision.quantity.answer]:[])).toEqual([3,5,4]);expect(w.items[6].wordDecision!.recordSelection!.rows.filter(r=>r.include).map(r=>r.id)).toEqual(['above']);expect(w.items[7].wordDecision!.recordSelection!.rows.filter(r=>r.include).map(r=>r.id)).toEqual(['p1']);expect(w.items[5].options!.find(o=>o.correct)!.text).toBe('Nearly a thousand visitors.');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('visitor counter shows 980')
})
it('requires exact equal shares with meaning and spelling, preserving writing through edits and reload',()=>{
 const s=studio('l-v-course-quantity-5'),w=s.mission!.workshop!
 for(const index of [1,2]){const item=w.items[index],f=item.wordDecision!.fraction!;let p={...freshTeaching(s,1),step:1};const act=(name:string,value='')=>{p=changeTeaching(s,p,'workshop-'+name,value,2)}
  act('item',String(index));act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(f.wrong)
  act('fraction','clear');for(let n=0;n<=f.parts;n++){if(n)act('fraction','add');act('check');expect(workshopView(w,p).correct).toBe(n===1);expect(workshopView(w,p).complete).toBe(false)}
  act('fraction','clear');act('fraction','add');act('check');act('own',index===1?'We ate half of the sandwich after class.':'A quarter of our class joined the club.');act('save');expect(workshopView(w,p).complete).toBe(true)
  const own=workshopView(w,p).own;act('fraction','add');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordFraction!.count).toBe(2);expect(workshopView(w,p).own).toBe(own)
  const forged=structuredClone(p);forged.checked['workshop-'+index]=true;forged.completed.push('workshop-'+index);expect(workshopView(w,forged).complete).toBe(false);expect(workshopView(w,forged).tabs[index].done).toBe(false)
  const before=JSON.stringify(p);act('fraction','set:1');expect(JSON.stringify(p)).toBe(before);act('fraction','remove');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 const copy=structuredClone(w);copy.items[1].wordDecision!.fraction!.wholeLabel='Favorite color';expect(mapWorkshop(copy,t=>editionText(t,'british')).items[1].wordDecision!.fraction!.wholeLabel).toBe('Favourite colour');copy.items[1].wordDecision!.fraction!.parts=3 as 2;expect(workshopProblems(copy)).toContain('Invalid word fraction')
})
it('teaches final list position, exact fractions and pairs, several empty seats and every member in the fifth quantity lesson',()=>{
 const s=studio('l-v-course-quantity-5'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['last','half','quarter','double','pair','Several','Each','Every'])
 expect(w.items[0].wordDecision!.recordSelection!.rows.filter(r=>r.include).map(r=>r.id)).toEqual(['lily']);expect(w.items[1].wordDecision!.fraction).toMatchObject({parts:2,answer:1});expect(w.items[2].wordDecision!.fraction).toMatchObject({parts:4,answer:1})
 expect(w.items[3].wordDecision!.quantity).toMatchObject({answer:6,shape:'cup'});expect(w.items[4].wordDecision!.quantity).toMatchObject({answer:3,shape:'pair',unitArt:'count-unit-sock-pair',unitArtRoot:'illustrations-3'})
 expect(w.items[5].wordDecision!.recordSelection!.rows.filter(r=>r.include).map(r=>r.id)).toEqual(['A','C','D','F'].map(s=>s.toLowerCase()))
 for(const index of [6,7])expect(w.items[index].wordDecision!.recordSelection!.rows.every(r=>r.include)).toBe(true)
 expect(s.transfer.review).toBe('draft');expect(s.transfer.explanation!.visual!.segments).toHaveLength(3)
})
it('requires exact pronoun referents, preserves the speaker and keeps guided reference work out of independent credit',()=>{
 const s=studio('l-v-course-pronouns'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([])
 expect(w.items.map(i=>i.answer)).toEqual(['Someone','you','He','She','It','We','They','me'])
 const expected=[['found','owner'],['ming','amy'],['bob'],['amy'],['learn'],['ming','amy','leo'],['ming','amy','leo'],['mia']]
 const owns=['Someone left a blue scarf on the chair.','Could you carry this empty box upstairs?','He brought a warm jacket for the walk.','She put a label on the new plant.','It takes time to learn a useful skill.','We moved the chairs into the reading room.','They will meet us beside the library.','Please save a seat near the door for me.']
 for(const [index,item] of w.items.entries()){
  const records=item.wordDecision!.recordSelection!;expect(records.rows.filter(r=>r.include).map(r=>r.id)).toEqual(expected[index])
  let p={...freshTeaching(s,1),step:1};const act=(name:string,value='')=>{p=changeTeaching(s,p,'workshop-'+name,value,2)}
  act('item',String(index));act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer);act('check');expect(workshopView(w,p).correct).toBe(false)
  act('record-none');for(const id of expected[index])act('record-toggle',id);act('check');expect(workshopView(w,p).correct).toBe(true)
  if(records.layout==='people')expect(workshopView(w,p).wordRecordSelection!.speaker).toEqual({name:records.rows.find(r=>r.id===records.speakerId)!.label,quote:records.quote})
  act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  act('record-toggle',records.rows.find(r=>!r.include)!.id);expect(workshopView(w,p).complete).toBe(false)
  p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toBe(owns[index])
  const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  act('record-none');for(const id of expected[index])act('record-toggle',id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[4].reason).toContain('形式主语');expect(w.items[0].reason).toContain('不能单凭left判断单复数');expect(s.transfer.review).toBe('draft')
})
it('maps the spoken quote by edition while preserving speaker and person identities',()=>{
 const original=studio('l-v-course-pronouns').mission!.workshop!,copy=structuredClone(original),record=copy.items[1].wordDecision!.recordSelection!
 record.quote='What is your favorite color?';record.rows[1].text='Favorite color: blue.'
 const mapped=mapWorkshop(copy,t=>editionText(t,'british')).items[1].wordDecision!.recordSelection!
 expect(mapped.quote).toBe('What is your favourite colour?');expect(mapped.rows[1].text).toBe('Favourite colour: blue.');expect(mapped.speakerId).toBe('mr-li');expect(mapped.rows.map(r=>r.id)).toEqual(record.rows.map(r=>r.id));expect(mapped.rows.map(r=>r.include)).toEqual(record.rows.map(r=>r.include));expect(record.quote).toContain('favorite')
 const invalid=structuredClone(original);invalid.items[1].wordDecision!.recordSelection!.speakerId='absent';expect(workshopProblems(invalid)).toContain('Invalid word record selection')
})
it('teaches recipients, exact moving objects and ownership without awarding independent evidence',()=>{
 const s=studio('l-v-course-pronouns-2'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['him','her','us','them','My','your','his','its'])
 const ids=[['ben'],['mia'],['amy','ming','leo'],['a','b'],['leo'],['mia','leo'],['ben'],['bird']]
 const owns=['I gave him a clean cup after lunch.','We thanked her for showing us the reading room.','Our teacher showed us how to use the new map.','These cups are clean; put them beside the tray.','My school bag has a small pocket at the front.','Please write your name clearly on the club form.','This blue notebook is his, and the green one is mine.','The dog lifted its head when I opened the gate.']
 for(const [index,item]of w.items.entries()){
  const record=item.wordDecision!.recordSelection!;expect(record.rows.filter(r=>r.include).map(r=>r.id)).toEqual(ids[index]);let p={...freshTeaching(s,1),step:1};const act=(name:string,value='')=>{p=changeTeaching(s,p,'workshop-'+name,value,2)}
  act('item',String(index));act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer);act('record-none');act('check');expect(workshopView(w,p).correct).toBe(false)
  for(const id of ids[index])act('record-toggle',id);act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  act('record-toggle',record.rows.find(r=>!r.include)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.checked['workshop-'+index]=true;forged.completed.push('workshop-'+index);expect(workshopView(w,forged).complete).toBe(false)
  act('record-none');for(const id of ids[index])act('record-toggle',id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[3].wordDecision!.recordSelection!.rows.map(r=>r.object!.colour)).toEqual(['blue','blue','white','white']);expect(w.items[7].wordDecision!.art).toMatchObject({assetRoot:'illustrations-3',format:'png',asset:'lesson-bird-its-wings'});expect(w.items[7].reason).toContain('it is');expect(w.items[7].options!.find(o=>o.id==='itis')!.text).toBe("Use it's before wings to show ownership.");expect(w.items[5].reason).toContain('各自');expect(s.transfer.review).toBe('draft')
})
it('keeps default JPEG word art compatible and rejects unsupported PNG roots or formats',()=>{
 const w=structuredClone(studio('l-v-course-pronouns-2').mission!.workshop!);expect(workshopProblems(w)).toEqual([])
 w.items[7].wordDecision!.art!.format='svg' as 'png';expect(workshopProblems(w)).toContain('Invalid word decision');w.items[7].wordDecision!.art!.format='png';w.items[7].wordDecision!.art!.assetRoot='outside' as 'illustrations-3';expect(workshopProblems(w)).toContain('Invalid word decision')
 const legacy=studio('l-v-course-school-tools-4').mission!.workshop!;expect(legacy.items.find(i=>i.wordDecision?.art)!.wordDecision!.art!.format).toBeUndefined();expect(workshopProblems(legacy)).toEqual([])
})
it('tracks group owners, the silver-striped helmet and self-learning without accepting forged completion',()=>{
 const s=studio('l-v-course-pronouns-3'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['Our','Their','mine','yours','hers','ours','theirs','myself'])
 const ids=[['amy','ming','leo'],['ben','mia'],[],['leo'],['mia'],['amy','leo'],['ben','mia'],['ming']]
 const owns=['Our class made a new sign for the reading corner.','Their club grows vegetables behind the school building.','The notebook beside the green bag is mine.','My drawing has fewer colors than yours.','The small umbrella beside the classroom door is hers.','This corner of the school garden is ours.','Our poster has fewer pictures than theirs.','I taught myself to fold a paper box from a guide.']
 for(const [index,item]of w.items.entries()){
  let p={...freshTeaching(s,1),step:1};const act=(name:string,value='')=>{p=changeTeaching(s,p,'workshop-'+name,value,2)};act('item',String(index));act('input',item.answer)
  const record=item.wordDecision!.recordSelection
  if(record){expect(record.rows.filter(r=>r.include).map(r=>r.id)).toEqual(ids[index]);act('choose',item.options!.find(o=>o.correct)!.id);act('record-none');act('check');expect(workshopView(w,p).correct).toBe(false);for(const id of ids[index])act('record-toggle',id)}
  else{expect(item.wordDecision!.art!.targets!.map(t=>t.option)).toEqual(['silver','black','plain']);act('choose','black');act('check');expect(workshopView(w,p).correct).toBe(false);act('choose','silver');expect(workshopView(w,p).wordPictureTargets.filter(t=>t.selected).map(t=>t.id)).toEqual(['left'])}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(record)act('record-toggle',record.rows.find(r=>!r.include)!.id);else act('choose','plain');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(record){act('record-none');for(const id of ids[index])act('record-toggle',id)}else act('choose','silver');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[3].wordDecision!.recordSelection!.rows.map(r=>r.text)).toEqual(['Speaks: “Read every day.” — 3 words.','Listens: “Read a short story each day.” — 6 words.']);expect(w.items[7].reason).toContain('文字指南是自学资源');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('it still belongs to me');expect(s.transfer.explanation!.visual!.segments).toHaveLength(3)
})
it('requires the observed closing cause and exact reflexive referents while preserving original writing',()=>{
 const s=studio('l-v-course-pronouns-4'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['yourself','himself','herself','itself','ourselves','yourselves','themselves','This'])
 const ids=[['ming'],['ben'],['mia'],[],[],['amy','ben'],['amy','ming','leo'],['a']]
 const owns=['Give yourself a few minutes to check the final answer.','He painted the new sign himself using a small brush.','She reminded herself to bring a ruler for the project.','The light turns off by itself after a few minutes.','We made the paper decorations ourselves using a simple guide.','Help yourselves to the fruit on the small table.','The students checked the game rules themselves before starting.','This road goes directly to the small train station.']
 for(const [index,item]of w.items.entries()){
  let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer)
  const record=item.wordDecision!.recordSelection
  if(record){expect(record.rows.filter(r=>r.include).map(r=>r.id)).toEqual(ids[index]);act('check');expect(workshopView(w,p).correct).toBe(false);act('record-none');for(const id of ids[index])act('record-toggle',id)}
  if(item.wordDecision!.door){act('door','person');act('door','release');expect(workshopView(w,p).wordDoor!.closed).toBe(false);act('door','push');expect(workshopView(w,p).wordDoor!.closed).toBe(true);act('check');expect(workshopView(w,p).correct).toBe(false);act('door','automatic');act('check');expect(workshopView(w,p).correct).toBe(false);act('door','release')}
  if(item.wordDecision!.art){act('choose','watchers');act('check');expect(workshopView(w,p).correct).toBe(false);act('choose','makers');expect(workshopView(w,p).wordPictureTargets.filter(t=>t.selected).map(t=>t.id)).toEqual(['a'])}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(record)act('record-toggle',record.rows.find(r=>!r.include)!.id);else if(item.wordDecision!.door)act('door','reset');else act('choose','watchers');expect(workshopView(w,p).complete).toBe(false)
  p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.checked['workshop-'+index]=true;forged.completed.push('workshop-'+index);expect(workshopView(w,forged).complete).toBe(false)
  if(record){act('record-none');for(const id of ids[index])act('record-toggle',id)}else if(item.wordDecision!.door)act('door','release');else act('choose','makers');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[4].options).toHaveLength(2);expect(w.items[4].reason).toContain('材料、工具');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('he does not touch it')
})
it('maps door teaching copy while keeping bystander previews independent and cause validation strict',()=>{
 const w=structuredClone(studio('l-v-course-pronouns-4').mission!.workshop!),d=w.items[3].wordDecision!.door!;d.title='Favorite color';d.hint='Compare the color.'
 const mapped=mapWorkshop(w,t=>editionText(t,'british')).items[3].wordDecision!.door!;expect(mapped.title).toBe('Favourite colour');expect(mapped.hint).toBe('Compare the colour.');mapped.people[0]='Changed';expect(d.people).toEqual(['Amy','Leo'])
 d.answer='invalid' as 'automatic';expect(workshopProblems(w)).toContain('Invalid word door')
})
it('distinguishes exact demonstrative sets, request intent, all and both from a freely chosen entrance',()=>{
 const s=studio('l-v-course-pronouns-5'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['That','These','those','some','any','All','Both','either'])
 const ids=[[],['near-left','near-right'],['gate-one','gate-two','gate-three'],['request'],['questions'],['w-one','w-two','w-three','w-four'],['a','b'],['b']]
 const owns=['That hill looks like a sleeping animal from here.','These shoes are too tight for me after the long walk.','Who put those boxes beside the far classroom door?','Could I have some more rice before we leave, please?','Do you have any questions about tomorrow’s activity?','All the chairs in this room are ready for the meeting.','Both teams arrive before the first game starts.','You can use either dictionary to check the new word.']
 for(const [index,item]of w.items.entries()){
  let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);act('choose',item.options!.find(o=>o.correct)!.id)
  const records=item.wordDecision!.recordSelection
  if(records){act('record-none');act('check');expect(workshopView(w,p).correct).toBe(false);if(index===7){act('record-toggle','a');act('record-toggle','b');act('check');expect(workshopView(w,p).correct).toBe(false);act('record-none')}for(const id of ids[index])act('record-toggle',id)}
  else{expect(item.wordDecision!.art!.targets!.map(t=>t.label)).toEqual(['A 近','B 远','C 远']);act('choose','a');act('check');expect(workshopView(w,p).correct).toBe(false);act('choose','c');act('check');expect(workshopView(w,p).correct).toBe(false);act('choose','b')}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(records){if(index===7)act('record-toggle','a');else act('record-toggle',ids[index][0])}else act('choose','a');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(records){act('record-none');for(const id of index===7?['a']:ids[index])act('record-toggle',id)}else act('choose','b');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[3].reason).toContain('不是所有疑问句');expect(w.items[4].reason).toContain('肯定句');expect(w.items[5].reason).toContain('永远不能指两者');expect(w.items[7].reason).toContain('不表示以后不能换入口');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('Both are open');expect(s.transfer.explanation!.visual!.segments).toHaveLength(3)
})
it('preserves free-choice membership and edition mapping without sharing mutable row objects',()=>{
 const w=structuredClone(studio('l-v-course-pronouns-5').mission!.workshop!),r=w.items[7].wordDecision!.recordSelection!;r.prompt='Choose your favorite color.'
 const mapped=mapWorkshop(w,t=>editionText(t,'british')).items[7].wordDecision!.recordSelection!;expect(mapped.selectionMode).toBe('one');expect(mapped.prompt).toBe('Choose your favourite colour.');mapped.rows[0].text='Changed';expect(r.rows[0].text).toBe('Open; permitted for this entry.')
 r.selectionMode='many' as 'one';expect(workshopProblems(w)).toContain('Invalid word record selection')
})

it('requires observed weather causes and precise sky objects, retaining writing across changed conditions',()=>{
 const s=studio('l-v-course-weather-sky'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['sky','sun','moon','star','cloud','rain','snow','wind'])
 const owns=['The sky grew darker as we walked back to school.','The sun appeared again after the clouds moved away.','The moon hung above the quiet village last night.','A bright star appeared above the dark hill.','A thick cloud hid the top of the mountain.','Heavy rain kept us inside the small classroom.','Fresh snow covered the narrow path behind our house.','The wind blew my hat across the school playground.']
 for(const [index,item]of w.items.entries()){
  let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);act('choose',item.options!.find(o=>o.correct)!.id)
  const weather=item.wordDecision!.weather,records=item.wordDecision!.recordSelection
  if(weather){act('check');expect(workshopView(w,p).correct).toBe(false);const bad=weather.answer==='active'?'calm':'active';act('weather',bad);act('weather','observe');act('check');expect(workshopView(w,p).correct).toBe(false);act('weather',weather.answer);act('check');expect(workshopView(w,p).correct).toBe(false);act('weather','observe')}
  if(records){act('record-toggle','lunch');act('check');expect(workshopView(w,p).correct).toBe(false);act('record-none');act('record-toggle','dawn')}
  if(index===2||index===3){act('choose','reflection');act('check');expect(workshopView(w,p).correct).toBe(false);act('choose',index===2?'moon':'star');expect(workshopView(w,p).wordPictureTargets.filter(t=>t.selected).map(t=>t.id)).toEqual([index===2?'moon':'star'])}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(weather)act('weather','reset');else if(records)act('record-toggle','lunch');else act('choose','reflection');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(weather)act('weather','observe');else if(records)act('record-toggle','lunch');else act('choose',index===2?'moon':'star');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[1].wordDecision!.weather!.answer).toBe('calm');expect(w.items[4].wordDecision!.weather!.answer).toBe('active');expect(w.items[6].reason).toContain('先有our footprints');expect(w.items[7].reason).toContain('/wɪnd/');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('Nobody poured water');expect(s.transfer.explanation!.visual!.segments).toHaveLength(3)
})
it('maps authored weather copy without sharing models or accepting invalid causes',()=>{
 const w=structuredClone(studio('l-v-course-weather-sky').mission!.workshop!),weather=w.items[1].wordDecision!.weather!;weather.title='Favorite color';weather.hint='Compare the color.'
 const mapped=mapWorkshop(w,t=>editionText(t,'british')).items[1].wordDecision!.weather!;expect(mapped.title).toBe('Favourite colour');expect(mapped.hint).toBe('Compare the colour.');mapped.answer='active';expect(weather.answer).toBe('calm');weather.kind='storm' as 'cloud';expect(workshopProblems(w)).toContain('Invalid word weather')
})
it('requires observed storm records, precise frost targets and the negative thin-ice warning without independent credit',()=>{
 const s=studio('l-v-course-weather-sky-2'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['storm','thunder','Lightning','fog','mist','frost','ice','Hail'])
 const owns=['We moved the picnic table inside before the storm.','Thunder shook the windows during the storm last night.','Lightning lit up the fields beyond our house.','Thick fog delayed the early bus to town.','A little mist hung above the lake at dawn.','There was frost on the grass beside the empty field.','The ice melted slowly in the warm kitchen.','Hail left small marks on the old metal shed.']
 for(const [index,item]of w.items.entries()){
  let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer)
  const weather=item.wordDecision!.weather,record=item.wordDecision!.recordSelection,goodRows=record?.rows.filter(x=>x.include).map(x=>x.id)??[]
  if(weather){act('weather','calm');act('weather','observe');act('check');expect(workshopView(w,p).correct).toBe(false);act('weather','active');act('check');expect(workshopView(w,p).correct).toBe(false);act('weather','observe')}
  if(record){act('record-none');act('record-toggle',record.rows.find(x=>!x.include)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);act('record-none');for(const id of goodRows)act('record-toggle',id)}
  if(index===5){act('choose','dew');act('check');expect(workshopView(w,p).correct).toBe(false);act('choose','frost');expect(workshopView(w,p).wordPictureTargets.filter(t=>t.selected).map(t=>t.id)).toEqual(['b'])}
  if(item.caseSensitive){act('input',item.answer.toLowerCase());act('check');expect(workshopView(w,p).correct).toBe(false);act('input',item.answer)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(weather)act('weather','reset');else if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose','dew');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(weather)act('weather','observe');else if(record){act('record-none');for(const id of goodRows)act('record-toggle',id)}else act('choose','frost');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[3].reason).toContain('不代表对岸消失');expect(w.items[6].reason).toContain('含否定');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('bank was still there');expect(s.transfer.explanation!.visual!.segments).toHaveLength(3)
})
it('places four recorded events in distinct day phases and preserves the exact rainbow, purpose and season decisions',()=>{
 const s=studio('l-v-course-weather-sky-3'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['rainbow','sunshine','sunrise','sunset','dawn','dusk','spring','summer'])
 const owns=['A rainbow appeared above the hills after the shower.','We ate our lunch in the sunshine beside the lake.','We took our seats on the hill before sunrise.','We watched the boats return to the harbour at sunset.','We heard birds calling outside the tent at dawn.','We packed our fishing things beside the river at dusk.','The small park is full of birds in spring.','We keep drinking water nearby during summer.']
 const phases=['dawn','sunrise','day','sunset','dusk','night']
 for(const[index,item]of w.items.entries()){
  let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer)
  const day=item.wordDecision!.daylight,record=item.wordDecision!.recordSelection,rows=record?.rows.filter(x=>x.include).map(x=>x.id)??[]
  if(day){expect(workshopView(w,p).wordDaylight!.chosen).toBe(false);act('check');expect(workshopView(w,p).correct).toBe(false);for(const phase of phases){act('daylight',phase);act('check');expect(workshopView(w,p).correct).toBe(phase===day.answer)}act('daylight',day.answer)}
  if(record){act('record-none');act('record-toggle',record.rows.find(x=>!x.include)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);act('record-none');for(const id of rows)act('record-toggle',id)}
  if(index===0){act('choose','shadow');act('check');expect(workshopView(w,p).correct).toBe(false);act('choose','rainbow');expect(workshopView(w,p).wordPictureTargets.filter(t=>t.selected).map(t=>t.id)).toEqual(['a'])}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(day)act('daylight','reset');else if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose','cloud');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(day)act('daylight',day.answer);else if(record){act('record-none');for(const id of rows)act('record-toggle',id)}else act('choose','rainbow');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[2].wordDecision!.daylight!.answer).toBe('dawn');expect(w.items[5].wordDecision!.daylight!.answer).toBe('dusk');expect(w.items[6].reason).toContain('按语境');expect(w.items[7].reason).toContain('所有植物');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('sun had not yet risen');expect(s.transfer.explanation!.visual!.segments).toHaveLength(3)
})
it('maps day-sequence event copy independently and rejects invalid phases without changing the source model',()=>{
 const w=structuredClone(studio('l-v-course-weather-sky-3').mission!.workshop!),day=w.items[2].wordDecision!.daylight!;day.title='Favorite color';day.event='Watch the color';day.hint='Compare the color.'
 const mapped=mapWorkshop(w,t=>editionText(t,'british')).items[2].wordDecision!.daylight!;expect(mapped.title).toBe('Favourite colour');expect(mapped.event).toBe('Watch the colour');expect(mapped.hint).toBe('Compare the colour.');mapped.answer='night';expect(day.answer).toBe('dawn');day.answer='morning' as 'dawn';expect(workshopProblems(w)).toContain('Invalid word daylight')
})

it('separates temperature and humidity across every climate combination and preserves six other exact decisions',()=>{
 const s=studio('l-v-course-weather-sky-4'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['autumn','winter','warm','hot','cool','dry','wet','humid'])
 const owns=["The park has golden leaves in autumn.", "We see frost on the grass in winter.", "My hands stayed warm inside my gloves.", "The soup is too hot to drink right now.", "The room felt cool after our walk in the sun.", "I packed a dry shirt before the trip.", "We put the wet coats beside the entrance.", "The air feels humid near the lake today."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material)
  let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer)
  const climate=item.wordDecision!.climate,record=item.wordDecision!.recordSelection,rows=record?.rows.filter(x=>x.include).map(x=>x.id)??[]
  if(climate){expect(workshopView(w,p).wordClimate!.chosen).toBe(false);act('check');expect(workshopView(w,p).correct).toBe(false);for(const temperature of ['cool','warm','hot'])for(const humidity of ['low','high']){act('climate',temperature);act('climate',humidity);act('check');expect(workshopView(w,p).correct).toBe(climate.criterion==='temperature'?temperature===climate.answer:humidity===climate.answer)}act('climate','reset');act('climate',climate.answer);act('check');expect(workshopView(w,p).correct).toBe(true)}
  if(record){act('record-none');act('record-toggle',record.rows.find(x=>!x.include)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);act('record-none');for(const id of rows)act('record-toggle',id)}
  if(index===6){act('choose','boots');act('check');expect(workshopView(w,p).correct).toBe(false);act('choose','umbrella');expect(workshopView(w,p).wordPictureTargets.filter(t=>t.selected).map(t=>t.id)).toEqual(['a'])}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(climate)act('climate',climate.criterion==='temperature'?'hot':'low');else if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose','door');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(climate){act('climate','reset');const invalidBefore=JSON.stringify(p);act('climate','100:100');expect(JSON.stringify(p)).toBe(invalidBefore);act('climate',climate.answer)}else if(record){act('record-none');for(const id of rows)act('record-toggle',id)}else act('choose','umbrella');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('美式');expect(w.items[1].reason).toContain('sometimes');expect(w.items[3].reason).toContain('不能');expect(w.items[5].reason).toContain('两只');expect(w.items[7].reason).toContain('不等于hot');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('although it is cool');expect(s.transfer.explanation!.visual!.segments).toHaveLength(3)
})
it('maps climate teaching copy independently and rejects invalid criteria without altering source controls',()=>{
 const w=structuredClone(studio('l-v-course-weather-sky-4').mission!.workshop!),climate=w.items[4].wordDecision!.climate!;climate.title='Favorite color';climate.hint='Compare the color.'
 const mapped=mapWorkshop(w,t=>editionText(t,'british')).items[4].wordDecision!.climate!;expect(mapped.title).toBe('Favourite colour');expect(mapped.hint).toBe('Compare the colour.');mapped.title='Changed';expect(climate.title).toBe('Favorite color');climate.answer='frozen' as 'cool';expect(workshopProblems(w)).toContain('Invalid word climate')
})

it('uses the actual selected records as the only meaning decision without a duplicate choice or forged meaning bypass',()=>{
 const s=studio('l-v-course-weather-sky-4'),w=s.mission!.workshop!
 for(const[index,item]of w.items.entries()){if(!item.wordDecision!.meaningFromRecords)continue
  let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);act('choose',item.options!.find(o=>o.correct)!.id);act('check');expect(workshopView(w,p).correct).toBe(false)
  const rows=item.wordDecision!.recordSelection!.rows;act('record-none');for(const row of rows.filter(r=>r.include))act('record-toggle',row.id);delete p.answers['workshop-'+index];act('check');expect(workshopView(w,p).correct).toBe(true);act('own','We used '+item.answer+' in another example today.');act('save');expect(workshopView(w,p).complete).toBe(true)
  act('record-toggle',rows.find(r=>!r.include)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('another example');const forged=structuredClone(p);forged.checked['workshop-'+index]=true;forged.completed.push('workshop-'+index);expect(workshopView(w,forged).complete).toBe(false)
 }
 const bad=structuredClone(w);bad.items[6].wordDecision!.meaningFromRecords=true;expect(workshopProblems(bad)).toContain('Invalid record meaning decision')
})

it('preserves exact temperature differences, preventive instructions, melting direction and air effects in the final weather lesson',()=>{
 const s=studio('l-v-course-weather-sky-5'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['climate','forecast','degree','freeze','melt','shine','blow','breeze'])
 const owns=["The mountain climate suits these apple trees.", "The forecast predicts light rain tomorrow morning.", "The room temperature fell by one degree after we opened the window.", "The water in the shallow tray may freeze tonight.", "The snow began to melt beside the sunny wall.", "The moon can shine through a gap in the clouds.", "A gust of wind blew the paper off the table.", "A light breeze moved the curtains this morning."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material)
  let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));if(!item.wordDecision!.meaningFromRecords)act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer)
  const thermal=item.wordDecision!.thermal,weather=item.wordDecision!.weather,record=item.wordDecision!.recordSelection,rows=record?.rows.filter(x=>x.include).map(x=>x.id)??[]
  if(thermal){expect(workshopView(w,p).wordThermal!.chosen).toBe(false);act('check');expect(workshopView(w,p).correct).toBe(false);for(const start of [10,15,20])for(const rise of [0,1,2]){act('thermal','start-'+start);act('thermal','rise-'+rise);act('check');expect(workshopView(w,p).correct).toBe(rise===1);expect(workshopView(w,p).wordThermal!.end).toBe(start+rise)}act('thermal','rise-1')}
  if(weather){act('weather','calm');act('weather','observe');act('check');expect(workshopView(w,p).correct).toBe(false);act('weather','active');act('check');expect(workshopView(w,p).correct).toBe(false);act('weather','observe')}
  if(record){act('record-none');act('record-toggle',record.rows.find(x=>!x.include)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);act('record-none');for(const id of rows)act('record-toggle',id)}
  if(index===4){act('choose','frozen');act('check');expect(workshopView(w,p).correct).toBe(false);act('choose','liquid');expect(workshopView(w,p).wordPictureTargets.filter(t=>t.selected).map(t=>t.id)).toEqual(['b'])}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(thermal)act('thermal','rise-2');else if(weather)act('weather','reset');else if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose','frozen');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(thermal)act('thermal','rise-1');else if(weather)act('weather','observe');else if(record){act('record-none');for(const id of rows)act('record-toggle',id)}else act('choose','liquid');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[2].reason).toContain('差值');expect(w.items[3].reason).toContain('不证明已经');expect(w.items[4].reason).toContain('开始融化');expect(w.items[6].reason).toContain('can');expect(w.items[7].reason).toContain('所有breeze');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('14°C to 15°C');expect(s.transfer.explanation!.visual!.segments).toHaveLength(3)
})
it('maps thermal labels independently, rejects invalid rise payloads and preserves authored verb families',()=>{
 const w=structuredClone(studio('l-v-course-weather-sky-5').mission!.workshop!),thermal=w.items[2].wordDecision!.thermal!;thermal.title='Favorite color';thermal.hint='Compare the color.'
 const mapped=mapWorkshop(w,t=>editionText(t,'british')).items[2].wordDecision!.thermal!;expect(mapped.title).toBe('Favourite colour');expect(mapped.hint).toBe('Compare the colour.');mapped.title='Changed';expect(thermal.title).toBe('Favorite color');thermal.answer=3 as 1;expect(workshopProblems(w)).toContain('Invalid word thermal');expect(w.items[6].ownForms).toContain('blew');expect(w.items[3].ownForms).toContain('frozen')
})

it('preserves explicit feeling subjects, a puzzle-giving endpoint and both tired and proud without guessing from a picture',()=>{
 const s=studio('l-v-course-feelings'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['happy','sad','glad','pleased','excited','bored','tired','sleepy']);const owns=["I am happy with my new reading routine.", "I felt sad when my friend moved away.", "I was glad to hear your good news.", "We were pleased with our class poster.", "I am excited about our visit to the science museum.", "I felt bored during the long wait for the bus.", "I was tired after carrying the boxes upstairs.", "I felt sleepy while reading on the sofa."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));if(!item.wordDecision!.meaningFromRecords)act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer)
  const until=item.wordDecision!.until,record=item.wordDecision!.recordSelection,rows=record?.rows.filter(x=>x.include).map(x=>x.id)??[]
  if(until){expect(workshopView(w,p).wordUntil!.chosen).toBe(false);act('check');expect(workshopView(w,p).correct).toBe(false);for(const e of until.events){act('until',e.id);act('check');expect(workshopView(w,p).correct).toBe(e.id==='puzzle')}act('until',until.answer)}
  if(record){act('record-none');for(const row of record.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(rows.length===1&&row.include);act('record-toggle',row.id)}for(const id of rows)act('record-toggle',id)}
  if(index===3){for(const id of ['mug','vase']){act('choose',id);act('check');expect(workshopView(w,p).correct).toBe(false)}act('choose','bowl');expect(workshopView(w,p).wordPictureTargets.filter(t=>t.selected).map(t=>t.id)).toEqual(['a'])}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(until)act('until','reset');else if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose','mug');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(until)act('until',until.answer);else if(record){act('record-none');for(const id of rows)act('record-toggle',id)}else act('choose','bowl');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[1].reason).toContain('没有说明鸟去了哪里');expect(w.items[3].reason).toContain('不能靠');expect(w.items[4].reason).toContain('exciting');expect(w.items[5].reason).toContain('不是做出答案');expect(w.items[6].wordDecision!.recordSelection!.rows.filter(r=>r.include).map(r=>r.id)).toEqual(['tired','proud']);expect(w.items[7].reason).toContain('asleep');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('had not solved it yet');expect(s.transfer.passage).toContain('stayed awake');expect(s.transfer.explanation!.visual!.segments).toHaveLength(3)
})
it('maps until event labels independently and rejects substituted -ing feelings and invented endpoints',()=>{
 const w=structuredClone(studio('l-v-course-feelings').mission!.workshop!),u=w.items[5].wordDecision!.until!;u.title='Favorite color';u.events[0].label='Color display';const mapped=mapWorkshop(w,t=>editionText(t,'british')).items[5].wordDecision!.until!;expect(mapped.title).toBe('Favourite colour');expect(mapped.events[0].label).toBe('Colour display');mapped.events[0].label='Changed';expect(u.events[0].label).toBe('Color display');u.answer='solved';expect(workshopProblems(w)).toContain('Invalid word until')
 for(const[index,word]of [[4,'exciting'],[5,'boring']] as const){const s=studio('l-v-course-feelings'),task=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));const i=task.items[index];act('input',i.answer);if(i.wordDecision!.recordSelection){for(const row of i.wordDecision!.recordSelection!.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',i.options!.find(o=>o.correct)!.id);act('until',i.wordDecision!.until!.answer)}act('check');expect(workshopView(task,p).correct).toBe(true);act('own','I wrote an '+word+' sentence for my journal.');act('save');expect(workshopView(task,p).complete).toBe(false)}
})

it('keeps needs and feelings separate from guaranteed outcomes, invented causes and actual falls',()=>{
 const s=studio('l-v-course-feelings-2'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['hungry','thirsty','angry','upset','worried','nervous','afraid','scared']);const owns=["I felt hungry after our football practice.", "I got thirsty after walking in the sun.", "I was angry about the unfair rule.", "I felt upset when our class plant died.", "We were worried about our missing cat.", "I felt nervous before my first piano performance.", "I am afraid of losing my library card.", "The scared kitten hid under the sofa."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));if(!item.wordDecision!.meaningFromRecords)act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer)
  const provision=item.wordDecision!.provision,record=item.wordDecision!.recordSelection,rows=record?.rows.filter(x=>x.include).map(x=>x.id)??[]
  if(provision){expect(workshopView(w,p).wordProvision!.chosen).toBe(false);act('check');expect(workshopView(w,p).correct).toBe(false);act('provision','leave');act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).wordProvision!.reading).toContain('不能据此断定后来一定口渴');act('provision','pack');expect(workshopView(w,p).wordProvision!.reading).toContain('不是后来绝不会口渴的证明')}
  if(record){act('record-none');for(const row of record.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(rows.length===1&&row.include);act('record-toggle',row.id)}for(const id of rows)act('record-toggle',id)}
  if(index===7){act('choose','front');act('check');expect(workshopView(w,p).correct).toBe(false);act('choose','behind');expect(workshopView(w,p).wordPictureTargets.filter(t=>t.selected).map(t=>t.id)).toEqual(['a'])}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(provision)act('provision','reset');else if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose','front');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(provision)act('provision','pack');else if(record){act('record-none');for(const id of rows)act('record-toggle',id)}else act('choose','behind');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[1].reason).toContain('不保证');expect(w.items[2].reason).toContain('没有指明是谁');expect(w.items[2].wordDecision!.recordSelection!.rows.filter(r=>r.include).map(r=>r.id)).toEqual(['angry','promise']);expect(w.items[4].reason).toContain('不能直接推出');expect(w.items[5].reason).toContain('不能证明');expect(w.items[6].reason).toContain('双写p');expect(w.items[7].reason).toContain('不能靠表情');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('did not fall');expect(s.transfer.passage).toContain('talk went well');expect(s.transfer.explanation!.visual!.segments).toHaveLength(3)
})
it('maps prevention goals independently and rejects malformed preparation payloads',()=>{
 const w=structuredClone(studio('l-v-course-feelings-2').mission!.workshop!),u=w.items[1].wordDecision!.provision!;u.title='Favorite color';u.goal='Pack your favorite bottle.';const mapped=mapWorkshop(w,t=>editionText(t,'british')).items[1].wordDecision!.provision!;expect(mapped.title).toBe('Favourite colour');expect(mapped.goal).toBe('Pack your favourite bottle.');mapped.goal='Changed';expect(u.goal).toBe('Pack your favorite bottle.');u.goal='';expect(workshopProblems(w)).toContain('Invalid word provision');expect(w.items[1].ownForms).toContain('thirstier');expect(w.items[2].ownForms).toContain('angrier')
})

it('keeps feeling degrees, physical company, advice and completed events distinct',()=>{
 const s=studio('l-v-course-feelings-3'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['lonely','alone','surprised','relaxed','calm','proud','ashamed','sorry']);const owns=["A kind reply made me feel less lonely.", "I enjoy drawing alone in my room.", "We were surprised by the number of visitors.", "I felt relaxed after listening to soft music.", "I try to stay calm before an important interview.", "We are proud of our class newspaper.", "I felt ashamed of telling a lie.", "I am sorry I forgot to water the plant."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));if(!item.wordDecision!.meaningFromRecords)act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer)
  const shift=item.wordDecision!.shift,record=item.wordDecision!.recordSelection,rows=record?.rows.filter(x=>x.include).map(x=>x.id)??[]
  if(shift){expect(workshopView(w,p).wordShift!.chosen).toBe(false);act('check');expect(workshopView(w,p).correct).toBe(false);for(const choice of ['same','more']){act('shift',choice);act('check');expect(workshopView(w,p).correct).toBe(false)}act('shift','less');expect(workshopView(w,p).wordShift!.description).toContain('不等于完全没有孤独感');for(const bad of item.options!.filter(x=>!x.correct)){act('choose',bad.id);act('check');expect(workshopView(w,p).correct).toBe(false)}act('choose',item.options!.find(x=>x.correct)!.id)}
  if(record){act('record-none');for(const row of record.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const id of rows)act('record-toggle',id)}
  if(index===1){act('choose','company');act('check');expect(workshopView(w,p).correct).toBe(false);act('choose','solo');expect(workshopView(w,p).wordPictureTargets.filter(t=>t.selected).map(t=>t.id)).toEqual(['a'])}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(shift)act('shift','reset');else if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose','company');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(shift)act('shift','less');else if(record){act('record-none');for(const id of rows)act('record-toggle',id)}else act('choose','solo');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('不证明');expect(w.items[1].reason).toContain('enjoy后用doing');expect(w.items[2].reason).toContain('具体尺寸');expect(w.items[3].reason).toContain('已经睡着');expect(w.items[4].reason).toContain('认定已经做到');expect(w.items[5].reason).toContain('不证明每个人');expect(w.items[6].reason).toContain('his不是');expect(w.items[7].reason).toContain('forgot to return');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('later that afternoon');expect(s.transfer.explanation!.visual!.segments).toHaveLength(3)
})
it('maps feeling-change labels independently and rejects malformed tasks without accepting -ing substitutes for feelings',()=>{
 const w=structuredClone(studio('l-v-course-feelings-3').mission!.workshop!),u=w.items[0].wordDecision!.shift!;u.title='Favorite color';u.event='A neighbor sent a message.';const mapped=mapWorkshop(w,t=>editionText(t,'british')).items[0].wordDecision!.shift!;expect(mapped.title).toBe('Favourite colour');expect(mapped.event).toBe('A neighbour sent a message.');mapped.event='Changed';expect(u.event).toBe('A neighbor sent a message.');u.event='';expect(workshopProblems(w)).toContain('Invalid word feeling shift');expect(w.items[0].ownForms).toContain('lonelier');expect(w.items[4].ownForms).toContain('calmer')
 const s=studio('l-v-course-feelings-3');for(const[index,wrong]of [[2,'surprising'],[3,'relaxing']] as const){let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-item',String(index),2);const item=s.mission!.workshop!.items[index];for(const row of item.wordDecision!.recordSelection!.rows.filter(x=>x.include))p=changeTeaching(s,p,'workshop-record-toggle',row.id,2);p=changeTeaching(s,p,'workshop-input',item.answer,2);p=changeTeaching(s,p,'workshop-check','',2);expect(workshopView(s.mission!.workshop!,p).correct).toBe(true);p=changeTeaching(s,p,'workshop-own',`I felt ${wrong} after our school activity.`,2);p=changeTeaching(s,p,'workshop-save','',2);expect(workshopView(s.mission!.workshop!,p).complete).toBe(false)}
})

it('keeps gratitude recipients, hopes, reassurance, reduced fear and an anger-control purpose precise',()=>{
 const s=studio('l-v-course-feelings-4'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['thankful','grateful','hope','wish','fear','worry','anger','joy']);const owns=["We were thankful for our teacher\u2019s careful advice.", "I am grateful to the classmate who helped me rehearse.", "I hope our team finishes the project on time.", "I wish you a happy birthday and a wonderful year.", "Clear instructions helped reduce my fear before the drill.", "Do not worry about asking a question in class.", "He paused for a moment to control his anger.", "We jumped with joy when our school team won."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));if(!item.wordDecision!.meaningFromRecords)act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer)
  const shift=item.wordDecision!.shift,record=item.wordDecision!.recordSelection,rows=record?.rows.filter(x=>x.include).map(x=>x.id)??[]
  if(shift){expect(workshopView(w,p).wordShift!.chosen).toBe(false);act('check');expect(workshopView(w,p).correct).toBe(false);for(const choice of ['same','more']){act('shift',choice);act('check');expect(workshopView(w,p).correct).toBe(false)}act('shift','less');expect(workshopView(w,p).wordShift!.description).toContain('不等于完全没有恐惧感');expect(workshopView(w,p).wordShift!.description).not.toContain('孤独');for(const bad of item.options!.filter(x=>!x.correct)){act('choose',bad.id);act('check');expect(workshopView(w,p).correct).toBe(false)}act('choose',item.options!.find(x=>x.correct)!.id)}
  if(record){act('record-none');for(const row of record.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(rows.length===1&&row.include);act('record-toggle',row.id)}for(const id of rows)act('record-toggle',id)}
  if(index===7){act('choose','ground');act('check');expect(workshopView(w,p).correct).toBe(false);act('choose','air');expect(workshopView(w,p).wordPictureTargets.filter(t=>t.selected).map(t=>t.id)).toEqual(['a'])}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(shift)act('shift','reset');else if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose','ground');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(shift)act('shift','less');else if(record){act('record-none');for(const id of rows)act('record-toggle',id)}else act('choose','air');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('耐心');expect(w.items[1].reason).toContain('范围');expect(w.items[2].reason).toContain('hope the tree to survive');expect(w.items[3].reason).toContain('不是报告已经');expect(w.items[4].reason).toContain('不等于全部消失');expect(w.items[5].reason).toContain('不用ask');expect(w.items[6].reason).toContain('不能据此认定已经成功');expect(w.items[6].wordDecision!.recordSelection!.rows.filter(r=>r.include).map(r=>r.id)).toEqual(['breath','purpose']);expect(w.items[7].reason).toContain('不能单靠静图');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('some fear remained');expect(s.transfer.passage).toContain('do not say whether it worked');expect(s.transfer.explanation!.visual!.segments).toHaveLength(3)
})
it('retains exact source forms and picture-backed options in gratitude and feeling contexts',()=>{
 const w=studio('l-v-course-feelings-4').mission!.workshop!;expect(w.items[7].options!.map(o=>o.id).sort()).toEqual(['air','ground']);expect(w.items[7].wordDecision!.art!.targets!.map(t=>t.option).sort()).toEqual(['air','ground']);expect(w.items[2].ownForms).toContain('hoping');expect(w.items[3].ownForms).toContain('wishes');expect(w.items[5].ownForms).toContain('worried');expect(w.items[1].material).toContain('practise')
 const mapped=mapWorkshop(w,t=>editionText(t,'american'));expect(mapped.items[1].material).toContain('practice');expect(w.items[1].material).toContain('practise');expect(mapped.items[4].wordDecision!.shift!.feeling).toBe('fear')
})

it('teaches emotion nouns through a real assembly order, object choice and six precise source records',()=>{
 const s=studio('l-v-course-feelings-5'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['pleasure','fun','surprise','relief','stress','confidence','courage','mood']);const owns=["It was a pleasure to meet your family yesterday.", "We had fun making paper planes after class.", "The unexpected visit was a lovely surprise for us.", "Finishing the difficult report was a great relief.", "Too much stress can make it difficult to concentrate.", "Regular practice helped build my confidence before the talk.", "It took courage to ask for help during the meeting.", "Talking to my friend improved my mood after school."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));if(!item.wordDecision!.meaningFromRecords)act('choose',item.options!.find(o=>o.correct)!.id);act('input',item.answer)
  const boat=item.wordDecision!.boat,record=item.wordDecision!.recordSelection,rows=record?.rows.filter(x=>x.include).map(x=>x.id)??[]
  if(boat){expect(workshopView(w,p).wordBoat!.chosen).toBe(false);act('boat','sail');expect(workshopView(w,p).wordBoat!.sail).toBe(false);act('check');expect(workshopView(w,p).correct).toBe(false);act('boat','mast');act('check');expect(workshopView(w,p).correct).toBe(false);act('boat','sail');expect(workshopView(w,p).wordBoat!.reading).toContain('没有交代造船结果');for(const bad of item.options!.filter(x=>!x.correct)){act('choose',bad.id);act('check');expect(workshopView(w,p).correct).toBe(false)}act('choose',item.options!.find(x=>x.correct)!.id)}
  if(record){act('record-none');for(const row of record.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const id of rows)act('record-toggle',id)}
  if(index===2){for(const wrong of ['book','photo']){act('choose',wrong);act('check');expect(workshopView(w,p).correct).toBe(false)}act('choose','card');expect(workshopView(w,p).wordPictureTargets.filter(t=>t.selected).map(t=>t.id)).toEqual(['a'])}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(boat)act('boat','mast');else if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose','book');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);expect(workshopView(w,p).complete).toBe(false)
  const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(boat){act('boat','mast');act('boat','sail')}else if(record){act('record-none');for(const id of rows)act('record-toggle',id)}else act('choose','card');act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('听你的故事');expect(w.items[1].reason).toContain('不接to build');expect(w.items[2].reason).toContain('名词');expect(w.items[3].reason).toContain('没有交代是谁');expect(w.items[4].reason).toContain('can说明可能');expect(w.items[5].reason).toContain('不保证');expect(w.items[6].reason).toContain('不可数名词');expect(w.items[7].reason).toContain('没有说永远');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('had not tested');expect(s.transfer.explanation!.steps[0].reason).toContain('can');expect(s.transfer.explanation!.steps[0].reason).not.toContain('possibility');expect(s.transfer.explanation!.visual!.segments).toHaveLength(3)
})
it('maps boat labels independently and rejects malformed tasks or adjective substitutes for nouns',()=>{
 const w=structuredClone(studio('l-v-course-feelings-5').mission!.workshop!),u=w.items[1].wordDecision!.boat!;u.title='Favorite color';const mapped=mapWorkshop(w,t=>editionText(t,'british')).items[1].wordDecision!.boat!;expect(mapped.title).toBe('Favourite colour');mapped.title='Changed';expect(u.title).toBe('Favorite color');u.hint='';expect(workshopProblems(w)).toContain('Invalid word boat')
 const s=studio('l-v-course-feelings-5');for(const[index,wrong]of [[0,'pleasant'],[5,'confident']] as const){let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-item',String(index),2);const item=s.mission!.workshop!.items[index];for(const row of item.wordDecision!.recordSelection!.rows.filter(x=>x.include))p=changeTeaching(s,p,'workshop-record-toggle',row.id,2);p=changeTeaching(s,p,'workshop-input',item.answer,2);p=changeTeaching(s,p,'workshop-check','',2);expect(workshopView(s.mission!.workshop!,p).correct).toBe(true);p=changeTeaching(s,p,'workshop-own',`We felt ${wrong} during our school activity.`,2);p=changeTeaching(s,p,'workshop-save','',2);expect(workshopView(s.mission!.workshop!,p).complete).toBe(false)}
})

it('uses the three real picture targets as the only answers and rejects unreachable picture-only configurations',()=>{
 const s=studio('l-v-course-feelings-5'),w=s.mission!.workshop!,item=w.items[2];expect(item.wordDecision!.art!.pictureOnly).toBe(true);let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-item','2',2);expect(workshopView(w,p).wordPictureOnly).toBe(true)
 p=changeTeaching(s,p,'workshop-input',item.answer,2);for(const choice of ['book','photo','card']){p=changeTeaching(s,p,'workshop-choose',choice,2);expect(workshopView(w,p).wordPictureTargets.every(t=>!t.accepted&&!t.wrong)).toBe(true);p=changeTeaching(s,p,'workshop-check','',2);const selected=workshopView(w,p).wordPictureTargets.find(t=>t.selected)!;expect(selected.accepted).toBe(choice==='card');expect(selected.wrong).toBe(choice!=='card')}
 p=changeTeaching(s,p,'workshop-input','wrong',2);expect(workshopView(w,p).wordPictureTargets.every(t=>!t.accepted&&!t.wrong)).toBe(true)
 const broken=structuredClone(w);broken.items[2].wordDecision!.art!.targets!.pop();expect(workshopProblems(broken)).toContain('Invalid picture-only decision')
})

it('teaches character words from the praised party, actual actions and context rather than assumed intelligence',()=>{
 const s=studio('l-v-course-character'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['kind','friendly','polite','rude','honest','brave','clever','smart']);const owns=["It was kind of Mia to lend me her ruler.", "The volunteers were friendly to the new students.", "Please make a polite request before borrowing the tablet.", "It is rude to laugh at someone\u2019s mistake.", "She gave an honest answer about the broken cup.", "It was brave of Lin to ask for help on stage.", "That is a clever way to reuse an empty box.", "He looked smart in his clean shirt for the concert."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const record=item.wordDecision!.recordSelection
  if(record){act('record-none');act('check');expect(workshopView(w,p).correct).toBe(false);for(const row of record.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else{for(const o of item.options!.filter(x=>!x.correct)){act('choose',o.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(o.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(record){act('record-none');for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 const roles=w.items[0].wordDecision!.recordSelection!;expect(roles.layout).toBe('people');expect(roles.quote).toBe(w.items[0].material);expect(roles.rows.filter(r=>r.include).map(r=>r.id)).toEqual(['you']);expect(roles.rows.find(r=>r.id==='us')!.include).toBe(false)
 const wood=w.items[6].wordDecision!.art!;expect(wood.targets!.map(t=>t.option)).toEqual(['boards','stand']);expect(wood.evidence!.map(e=>e.option)).toEqual(['boards','stand']);expect(w.items[6].reason).toContain('不测量聪明程度');expect(w.items[4].material).toMatch(/^An honest/);expect(w.items[5].reason).toContain('不能推出完全没有恐惧');expect(w.items[7].reason).toContain('穿着整洁得体');expect(s.transfer.passage).toContain('straightening his collar');expect(s.transfer.review).toBe('draft')
})
it('accepts authored character comparatives while rejecting wrong parts of speech in own writing',()=>{
 const s=studio('l-v-course-character'),w=s.mission!.workshop!;for(const[index,bad,good]of [[1,'friendship','Our new classmate was friendlier after the game.'],[2,'politely','That was a politer request than the first one.'],[4,'honesty','She gave an honest answer about the mistake.']] as const){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));const item=w.items[index];act('input',item.answer);if(item.wordDecision!.recordSelection){for(const row of item.wordDecision!.recordSelection.rows.filter(x=>x.include))act('record-toggle',row.id)}else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('own',`We used ${bad} during our class activity.`);act('save');expect(workshopView(w,p).complete).toBe(false);act('own',good);act('save');expect(workshopView(w,p).complete).toBe(true)}
 const mapped=mapWorkshop(w,t=>editionText(t,'british'));mapped.items[0].wordDecision!.recordSelection!.rows[0].label='Changed';expect(w.items[0].wordDecision!.recordSelection!.rows[0].label).toBe('你／你们')
})

it('teaches judgement, advice and daily habits without converting hypotheticals or needs into completed actions',()=>{
 const s=studio('l-v-course-character-2'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['wise','foolish','silly','lazy','active','serious','funny','gentle']);const owns=["It was wise to pack a map before our walk.", "It would be foolish to waste clean water.", "A silly joke helped my sister relax before her talk.", "I was tired after training, not lazy.", "My aunt stays active by swimming regularly.", "We need a serious discussion about the class trip.", "The funny story made my little brother laugh.", "Use a gentle touch when you clean the lens."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const record=item.wordDecision!.recordSelection,walk=item.wordDecision!.dailyWalk
  if(walk){act('choose',item.options!.find(x=>x.correct)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);for(const day of ['mon','tue','wed','thu','fri'])act('daily-walk',day);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).wordDailyWalk!.count).toBe(5);for(const day of ['sat','sun'])act('daily-walk',day)}
  if(record){act('record-none');act('check');expect(workshopView(w,p).correct).toBe(false);for(const row of record.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else{for(const o of item.options!.filter(x=>!x.correct)){act('choose',o.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(o.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(walk)act('daily-walk','sat');else if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(walk)act('daily-walk','sat');else if(record){act('record-none');for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('first不能漏');expect(w.items[1].reason).toContain('没有报告谁已经忽视');expect(w.items[2].reason).toContain('before the show');expect(w.items[3].reason).toContain('不能只因为累了');expect(w.items[4].reason).toContain('不是真实出勤记录');expect(w.items[5].reason).toContain('不是已报告讨论完成');expect(w.items[6].reason).toContain('laugh用原形');expect(w.items[7].reason).toContain('没有报告谁已经');expect(s.transfer.passage).toContain('We still need a serious discussion');expect(s.transfer.review).toBe('draft')
})
it('maps the illustrative week independently and rejects noun/adverb substitutions for target adjectives',()=>{
 const s=studio('l-v-course-character-2'),w=s.mission!.workshop!;for(const[index,bad,good]of [[4,'activity','My grandparents stay active by walking in the park.'],[6,'fun','The funny story made our classmates laugh.'],[7,'gently','Use a gentle touch when you clean the glass.']] as const){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));const item=w.items[index];act('input',item.answer);if(item.wordDecision!.dailyWalk)for(const day of ['mon','tue','wed','thu','fri','sat','sun'])act('daily-walk',day);if(item.wordDecision!.recordSelection){for(const row of item.wordDecision!.recordSelection.rows.filter(x=>x.include))act('record-toggle',row.id)}else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('own',`We used ${bad} during our class activity.`);act('save');expect(workshopView(w,p).complete).toBe(false);act('own',good);act('save');expect(workshopView(w,p).complete).toBe(true)}
 const copy=structuredClone(w);copy.items[4].wordDecision!.dailyWalk!.title='Favorite color';const mapped=mapWorkshop(copy,t=>editionText(t,'british'));expect(mapped.items[4].wordDecision!.dailyWalk!.title).toBe('Favourite colour');mapped.items[4].wordDecision!.dailyWalk!.title='Changed';expect(copy.items[4].wordDecision!.dailyWalk!.title).toBe('Favorite color');copy.items[4].wordDecision!.dailyWalk!.hint='';expect(workshopProblems(copy)).toContain('Invalid daily walking week')
})

it('separates strict requirements, equal opportunities, anonymous requests and observed confidence from invented outcomes',()=>{
 const s=studio('l-v-course-character-3'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['strict','fair','unfair','selfish','generous','helpful','careless','confident']);const owns=["Our teacher is strict about handing in homework on time.", "A fair rule lets every player try once.", "It is unfair to blame Mei for the whole team mistake.", "Keeping every marker for yourself is selfish.", "The generous donor gave books to our school.", "The labelled map was helpful for new visitors.", "A careless mistake changed the total on our form.", "I felt more confident after practising my speech."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const record=item.wordDecision!.recordSelection,chance=item.wordDecision!.chance
  if(chance){act('choose',item.options!.find(x=>x.correct)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);act('chance','a+');act('chance','a+');act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).wordChance!.people.map(p=>p.count)).toEqual([2,0,0,0]);act('chance','a-');for(const id of ['b','c','d'])act('chance',id+'+')}
  if(record){act('record-none');act('check');expect(workshopView(w,p).correct).toBe(false);for(const row of record.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else{for(const o of item.options!.filter(x=>!x.correct)){act('choose',o.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(o.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(chance)act('chance','a+');else if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(chance)act('chance','a-');else if(record){act('record-none');for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('没有报告所有人一直遵守');expect(w.items[1].reason).toContain('不保证最后得分');expect(w.items[2].reason).toContain('不等于说没有失误');expect(w.items[3].reason).toContain('自己用一点');expect(w.items[4].reason).toContain('没有说最后是否照办');expect(w.items[5].reason).toContain('没有说只有初学者');expect(w.items[6].reason).toContain('不能单靠外观证明测量原因');expect(w.items[7].reason).toContain('不保证后来每次都成功');expect(s.transfer.passage).toContain('did not promise equal scores');expect(s.transfer.review).toBe('draft')
})
it('maps opportunity labels independently and accepts target comparatives while rejecting other parts of speech',()=>{
 const s=studio('l-v-course-character-3'),w=s.mission!.workshop!;for(const[index,bad,good]of [[1,'fairness','That is a fairer rule for new players.'],[5,'help','The diagram is helpful for new visitors.'],[7,'confidence','She felt more confident after the second rehearsal.']] as const){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));const item=w.items[index];act('input',item.answer);if(item.wordDecision!.chance)for(const id of ['a','b','c','d'])act('chance',id+'+');if(item.wordDecision!.recordSelection){for(const row of item.wordDecision!.recordSelection.rows.filter(x=>x.include))act('record-toggle',row.id)}else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('own',`We used ${bad} during our class activity.`);act('save');expect(workshopView(w,p).complete).toBe(false);act('own',good);act('save');expect(workshopView(w,p).complete).toBe(true)}
 const copy=structuredClone(w);copy.items[1].wordDecision!.chance!.title='Favorite color';const mapped=mapWorkshop(copy,t=>editionText(t,'british'));expect(mapped.items[1].wordDecision!.chance!.title).toBe('Favourite colour');mapped.items[1].wordDecision!.chance!.title='Changed';expect(copy.items[1].wordDecision!.chance!.title).toBe('Favorite color');copy.items[1].wordDecision!.chance!.hint='';expect(workshopProblems(copy)).toContain('Invalid opportunity allocator')
})

it('preserves individual actions, reuse and unmet needs without inferring behaviour from character labels',()=>{
 const s=studio('l-v-course-character-4'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['shy','outgoing','creative','curious','modest','loyal','independent','dependable']);const owns=["The shy boy wrote his question on a card.", "My outgoing cousin enjoys joining new clubs.", "Our creative idea turned old boxes into a puppet theatre.", "The curious pupil asked how the bridge stayed up.", "She stayed modest about her excellent result.", "A loyal friend gives honest advice kindly.", "Learning to plan my homework made me more independent.", "We chose a dependable classmate to keep the class notebook."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const record=item.wordDecision!.recordSelection,change=item.wordDecision!.reportedChange
  if(change){act('choose',item.options!.find(x=>x.correct)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);for(const direction of ['less','same']){act('reportedChange',direction);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(change.wrong)}act('reportedChange','more')}
  if(record){act('record-none');act('check');expect(workshopView(w,p).correct).toBe(false);for(const row of record.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else{for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(change)act('reportedChange','same');else if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(change)act('reportedChange','more');else if(record){act('record-none');for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('不要由害羞推断');expect(w.items[1].reason).toContain('不是报告现在正在出门');expect(w.items[2].reason).toContain('旧物来源由情境给出');expect(w.items[3].reason).toContain('间接问句用陈述语序');expect(w.items[4].reason).toContain('不是没获奖');expect(w.items[5].reason).toContain('truth限定内容');expect(w.items[6].reason).toContain('没有给出测量值');expect(w.items[7].reason).toContain('没有报告已经找到人');expect(s.transfer.passage).toContain('nobody has been chosen yet');expect(s.transfer.review).toBe('draft')
})
it('maps change labels independently, rejects a forged direction and accepts only permitted target-word forms',()=>{
 const s=studio('l-v-course-character-4'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','6');act('input','independent');act('choose','more');p.answers['workshopReportedChange-independent']='more ';act('check');expect(workshopView(w,p).correct).toBe(false);act('reportedChange','more');act('check');act('own','Learning to cook gave me independence.');act('save');expect(workshopView(w,p).complete).toBe(false);act('own','Planning my homework made me more independent.');act('save');expect(workshopView(w,p).complete).toBe(true);act('reportedChange','reset');expect(workshopView(w,p).wordReportedChange!.chosen).toBe(false);expect(workshopView(w,p).complete).toBe(false)
 const copy=structuredClone(w);copy.items[6].wordDecision!.reportedChange!.title='Favorite color';const mapped=mapWorkshop(copy,t=>editionText(t,'british'));expect(mapped.items[6].wordDecision!.reportedChange!.title).toBe('Favourite colour');mapped.items[6].wordDecision!.reportedChange!.label='Changed';expect(copy.items[6].wordDecision!.reportedChange!.label).toBe('独立性');copy.items[6].wordDecision!.reportedChange!.hint='';expect(workshopProblems(copy)).toContain('Invalid reported word change')
})

it('distinguishes source checking, encouragement, intentions and specific effects in eight character tasks',()=>{
 const s=studio('l-v-course-character-5'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['reliable','positive','negative','determined','stubborn','sensitive','sincere','thoughtful']);const owns=["Check a reliable source before sharing the news.", "Her positive attitude helped us try a different method.", "One negative comment should not end our discussion.", "She was determined to finish her science project.", "A stubborn refusal to discuss the plan caused a delay.", "Be sensitive to how a new pupil may feel.", "She offered a sincere apology for missing the meeting.", "It was thoughtful to keep a seat for the late arrival."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const record=item.wordDecision!.recordSelection
  if(record){act('record-none');act('check');expect(workshopView(w,p).correct).toBe(false);for(const row of record.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else{for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(record){act('record-none');for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('不是百分之百正确的保证');expect(w.items[1].reason).toContain('没有保证最后一定成功');expect(w.items[2].reason).toContain('不是报告已经停练');expect(w.items[3].reason).toContain('没有报告已经登完');expect(w.items[4].reason).toContain('不等于活动彻底取消');expect(w.items[5].reason).toContain('may说明可能');expect(w.items[6].reason).toContain('不保证问题全部解决');expect(w.items[7].reason).toContain('图只说明距离');expect(s.transfer.passage).toContain('the activity was not cancelled');expect(s.transfer.review).toBe('draft')
})
it('keeps source-card metadata complete and independent, and exposes verdicts only after a real check',()=>{
 const s=studio('l-v-course-character-5'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};let v=workshopView(w,p);expect(v.wordSources!.cards).toHaveLength(2);expect(v.wordSources!.cards.every(c=>!c.selected&&!c.accepted&&!c.wrong)).toBe(true);v.wordSources!.cards[0].publisher='Changed';expect(w.items[0].wordDecision!.sources!.cards[0].publisher).toContain('气象机构');p=changeTeaching(s,p,'workshop-choose','forward',2);v=workshopView(w,p);expect(v.wordSources!.cards.find(c=>c.option==='forward')!.wrong).toBe(false);p=changeTeaching(s,p,'workshop-input','reliable',2);p=changeTeaching(s,p,'workshop-check','',2);expect(workshopView(w,p).wordSources!.cards.find(c=>c.option==='forward')!.wrong).toBe(true)
 const copy=structuredClone(w);copy.items[0].wordDecision!.sources!.cards[0].title='Favorite color';const mapped=mapWorkshop(copy,t=>editionText(t,'british'));expect(mapped.items[0].wordDecision!.sources!.cards[0].title).toBe('Favourite colour');mapped.items[0].wordDecision!.sources!.cards[0].publisher='Changed';expect(copy.items[0].wordDecision!.sources!.cards[0].publisher).toContain('气象机构');for(const mutate of [(x:typeof copy)=>{x.items[0].wordDecision!.sources!.cards[0].option='unknown'},(x:typeof copy)=>{x.items[0].wordDecision!.sources!.cards[0].area=''},(x:typeof copy)=>{x.items[0].wordDecision!.sources!.cards.pop()},(x:typeof copy)=>{x.items[0].wordDecision!.sources!.cards[1].option=x.items[0].wordDecision!.sources!.cards[0].option}]){const bad=structuredClone(w);mutate(bad);expect(workshopProblems(bad)).toContain('Invalid word source cards')}
})

it('preserves frequency, instructions, limited comparisons and exact print requests in eight technology tasks',()=>{
 const s=studio('l-v-course-technology'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['computer','laptop','keyboard','screen','monitor','printer','print','phone']);const owns=["Our computer saves a copy of the notes each evening.", "My laptop is easy to carry between classrooms.", "Keep the keyboard dry when you clean the desk.", "The screen is easier to read in the shade.", "This monitor takes up less desk space than my old one.", "The printer needs more paper before our next job.", "Please print the final page of my report.", "Please put your phone away before the meeting."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const record=item.wordDecision!.recordSelection
  if(record){act('record-none');act('check');expect(workshopView(w,p).correct).toBe(false);for(const row of record.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.printPages)for(const n of item.wordDecision!.printPages.needed)act('printPages',String(n));for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.printPages)act('printPages','1');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(record){act('record-none');for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.printPages)act('printPages','1');else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('没有说已经测试');expect(w.items[1].reason).toContain('不是报告每天已经携带');expect(w.items[2].reason).toContain('不是报告已经搬开');expect(w.items[3].reason).toContain('不能直接断定设备坏了');expect(w.items[4].reason).toContain('没有比较所有型号');expect(w.items[5].reason).toContain('没有说墨用完');expect(w.items[6].reason).toContain('不表示已经执行打印');expect(w.items[7].reason).toContain('不是报告手机已放好');expect(s.transfer.passage).toContain('not the same as finishing');expect(s.transfer.review).toBe('draft')
})
it('requires exact page selection as well as print meaning and spelling, without leaking the required set',()=>{
 const s=studio('l-v-course-technology'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','6');const item=w.items[6];act('input','print');act('choose',item.options!.find(o=>o.correct)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);act('printPages','2');act('check');expect(workshopView(w,p).correct).toBe(false);act('printPages','4');act('check');expect(workshopView(w,p).correct).toBe(true);expect(workshopView(w,p).wordPrintPages!.reading).toContain('尚未执行打印');const v=workshopView(w,p).wordPrintPages!;expect('needed'in v).toBe(false);v.pages[0].selected=true;expect(workshopView(w,p).wordPrintPages!.pages[0].selected).toBe(false);act('printPages','7');expect(workshopView(w,p).wordPrintPages!.total).toBe(2);act('printPages','reset');expect(workshopView(w,p).wordPrintPages!.total).toBe(0);expect(workshopView(w,p).complete).toBe(false)
 const mapped=mapWorkshop(w,t=>editionText(t,'british'));mapped.items[6].wordDecision!.printPages!.needed.push(6);expect(w.items[6].wordDecision!.printPages!.needed).toEqual([2,4]);for(const needed of [[],[0],[7],[2,2],[4,2]]){const bad=structuredClone(w);bad.items[6].wordDecision!.printPages!.needed=needed;expect(workshopProblems(bad)).toContain('Invalid print page selection')}
})

it('preserves media instructions and intended purposes in eight device tasks',()=>{
 const s=studio('l-v-course-technology-2'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['telephone','mobile','camera','video','radio','television','remote','battery']);const owns=["The telephone rang while I was making lunch.", "Please keep your mobile on silent during the talk.", "The camera has a long strap for carrying it.", "This video shows how to fold a paper boat.", "We heard the weather report on the radio.", "The television programme explains how rain forms.", "The remote is on the table beside the sofa.", "I put the spare battery in a small case."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const record=item.wordDecision!.recordSelection
  if(record){act('record-none');act('check');expect(workshopView(w,p).correct).toBe(false);for(const row of record.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.phoneMode)act('phoneMode','silent');for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.phoneMode)act('phoneMode','ring');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(record){act('record-none');for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.phoneMode)act('phoneMode','silent');else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('不等于有人接听');expect(w.items[1].reason).toContain('不说明震动');expect(w.items[2].reason).toContain('不是说相机永远不会掉落');expect(w.items[3].reason).toContain('不证明每位观看者');expect(w.items[4].reason).toContain('没有说之后');expect(w.items[5].reason).toContain('不等于逐一测试');expect(w.items[6].reason).toContain('不等于已经换好');expect(w.items[7].reason).toContain('没说明电量');expect(s.transfer.passage).toContain('to help prevent drops');expect(s.transfer.options!.some(o=>o.text.includes('guarantees no drops'))).toBe(true);expect(s.transfer.review).toBe('draft')
})
it('requires silent mode plus correct meaning and form, preserves edits and rejects incompatible configurations',()=>{
 const s=studio('l-v-course-technology-2'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','1');const item=w.items[1];act('input','mobile');act('choose',item.options!.find(o=>o.correct)!.id)
 for(const mode of ['reset','ring','off']){act('phoneMode',mode);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(item.wordDecision!.phoneMode!.wrong)}act('phoneMode','silent');act('check');expect(workshopView(w,p).correct).toBe(true);act('own','Please keep your mobile on silent during the talk.');act('save');expect(workshopView(w,p).complete).toBe(true);act('phoneMode','off');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordPhoneMode!.choice).toBe('off');expect(workshopView(w,p).own).toContain('during the talk');act('phoneMode','silent');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('phoneMode','vibrate');expect(workshopView(w,p).complete).toBe(true);act('phoneMode','reset');expect(workshopView(w,p).wordPhoneMode!.chosen).toBe(false);expect(workshopView(w,p).complete).toBe(false)
 const mapped=mapWorkshop(w,t=>editionText(t,'british'));mapped.items[1].wordDecision!.phoneMode!.hint='Changed';expect(w.items[1].wordDecision!.phoneMode!.hint).not.toBe('Changed');for(const value of [null,{}, {...item.wordDecision!.phoneMode!,title:''}]){const bad=structuredClone(w);bad.items[1].wordDecision!.phoneMode=value as never;expect(workshopProblems(bad)).toContain('Invalid mobile mode task')}
 for(const field of ['recordSelection','printPages','art']as const){const bad=structuredClone(w),d=bad.items[1].wordDecision!;if(field==='recordSelection')d.recordSelection=structuredClone(w.items[0].wordDecision!.recordSelection!);else if(field==='printPages')d.printPages={title:'Only page 2',needed:[2],hint:'Choose page 2',wrong:'Choose page 2'};else d.art=structuredClone(w.items[2].wordDecision!.art!);expect(workshopProblems(bad)).toContain('Invalid mobile mode task')}
})

it('preserves connection, order, possibility and grouping in eight tool tasks',()=>{
 const s=studio('l-v-course-technology-3'),w=s.mission!.workshop!;expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['charger','cable','device','machine','robot','software','hardware','program']);const owns=["Check the charger before using it with your tablet.", "This cable connects my tablet to the computer.", "Turn off the device before you put it away.", "Keep your scarf away from the machine.", "The robot follows the marked path in our classroom.", "This software helps us edit short recordings.", "Check the hardware requirements before installing the software.", "The program sorts our photos into different folders."]
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const record=item.wordDecision!.recordSelection
  if(record){act('record-none');act('check');expect(workshopView(w,p).correct).toBe(false);for(const row of record.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.nameGroups)for(const n of item.wordDecision!.nameGroups.names)act('nameGroups',n.id+':'+(n.name[0]<='M'?'am':'nz'));for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(record)act('record-toggle',record.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.nameGroups)act('nameGroups','amy:nz');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(record){act('record-none');for(const row of record.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.nameGroups)act('nameGroups','amy:am');else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('不能直接补成已通过');expect(w.items[1].reason).toContain('不说明文件已传完');expect(w.items[2].reason).toContain('先关机、后清洁');expect(w.items[3].reason).toContain('没有报告执行结果');expect(w.items[4].reason).toContain('没有报告沿线之外');expect(w.items[5].reason).toContain('不等于所有功能');expect(w.items[6].reason).toContain('可能不适配');expect(w.items[7].reason).toContain('原句没有说明分组规则');expect(s.transfer.passage).toContain('separate demonstration');expect(s.transfer.review).toBe('draft')
})
it('requires every name in the stated first-letter group, retains edited writing and maps independent config copies',()=>{
 const s=studio('l-v-course-technology-3'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','7');const item=w.items[7];act('input','program');act('choose',item.options!.find(o=>o.correct)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);act('nameGroups','amy:am');act('check');expect(workshopView(w,p).correct).toBe(false);for(const[id,group]of [['ben','am'],['nora','am'],['wei','am']])act('nameGroups',id+':'+group);act('check');expect(workshopView(w,p).correct).toBe(false);act('nameGroups','nora:nz');act('nameGroups','wei:nz');act('check');expect(workshopView(w,p).correct).toBe(true);act('own','The program sorts our photos into different folders.');act('save');expect(workshopView(w,p).complete).toBe(true);act('nameGroups','amy:nz');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordNameGroups!.lanes[1].names).toContain('Amy');expect(workshopView(w,p).own).toContain('photos');act('nameGroups','amy:am');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('nameGroups','other:am');expect(workshopView(w,p).complete).toBe(true);act('nameGroups','reset');expect(workshopView(w,p).wordNameGroups!.total).toBe(0);expect(workshopView(w,p).complete).toBe(false)
 const mapped=mapWorkshop(w,t=>editionText(t,'british'));mapped.items[7].wordDecision!.nameGroups!.names[0].name='Changed';expect(w.items[7].wordDecision!.nameGroups!.names[0].name).toBe('Amy');expect(mapped.items[7].answer).toBe('program');for(const value of [null,{}, {...item.wordDecision!.nameGroups!,names:[]}]){const bad=structuredClone(w);bad.items[7].wordDecision!.nameGroups=value as never;expect(workshopProblems(bad)).toContain('Invalid name grouping task')}
 for(const field of ['recordSelection','phoneMode','art']as const){const bad=structuredClone(w),d=bad.items[7].wordDecision!;if(field==='recordSelection')d.recordSelection=structuredClone(w.items[0].wordDecision!.recordSelection!);else if(field==='phoneMode')d.phoneMode={title:'Silent',hint:'Use silent mode',wrong:'Silent required'};else d.art=structuredClone(w.items[1].wordDecision!.art!);expect(workshopProblems(bad)).toContain('Invalid name grouping task')}
})
it('rejects countable plurals for software and hardware in own examples',()=>{
 const s=studio('l-v-course-technology-3'),w=s.mission!.workshop!;for(const index of [5,6]){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};const item=w.items[index];act('item',String(index));act('input',item.answer);for(const row of item.wordDecision!.recordSelection!.rows.filter(x=>x.include))act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(true);act('own',`We discussed these ${item.answer}s in our lesson.`);act('save');expect(workshopView(w,p).complete).toBe(false);act('own',index===5?'This software helps us edit short recordings.':'Check the hardware requirements before installing the software.');act('save');expect(workshopView(w,p).complete).toBe(true)}
})

it('preserves storage, privacy and action order in eight internet tasks',()=>{
 const s=studio('l-v-course-technology-4'),w=s.mission!.workshop!,owns=["This app helps me organise my study notes.", "We use the internet to find the library opening times.", "Our school website has a page about the music club.", "I saved the webpage before leaving the library.", "Do not post your home address online.", "I can read the saved map offline.", "Download the map while you are still at home.", "Ask permission before you upload your friend\u2019s photo."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['app','internet','website','webpage','online','offline','Download','upload'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.offlinePage)for(const value of ['save','network','open'])act('offlinePage',value);for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.offlinePage)act('offlinePage','network');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(rec){act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.offlinePage){act('offlinePage','network');act('offlinePage','open')}else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('这台设备');expect(w.items[1].reason).toContain('这项活动');expect(w.items[3].reason).toContain('不是已经保存完成');expect(w.items[5].reason).toContain('实时更新');expect(w.items[6].reason).toContain('指令');expect(w.items[7].reason).toContain('先征求同意');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('had not checked whether')
})
it('requires saved content reopened offline and preserves edited internet work without credit',()=>{
 const s=studio('l-v-course-technology-4'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','3');const item=w.items[3];act('input','webpage');act('choose',item.options!.find(o=>o.correct)!.id)
 for(const value of ['open','network','open','save']){act('offlinePage',value);act('check');expect(workshopView(w,p).correct).toBe(false)}expect(workshopView(w,p).wordOfflinePage!.pageVisible).toBe(false)
 for(const value of ['network','save','network'])act('offlinePage',value);act('check');expect(workshopView(w,p).correct).toBe(false);act('offlinePage','open');act('check');expect(workshopView(w,p).correct).toBe(true);act('own','I saved the webpage before leaving the library.');act('save');expect(workshopView(w,p).complete).toBe(true)
 act('offlinePage','network');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordOfflinePage).toMatchObject({saved:true,online:true,pageVisible:false});expect(workshopView(w,p).own).toContain('library');expect(workshopView(w,p).complete).toBe(false);for(const value of ['network','open'])act('offlinePage',value);act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('offlinePage','reset');expect(workshopView(w,p).wordOfflinePage).toMatchObject({saved:false,online:true,pageVisible:false});expect(workshopView(w,p).complete).toBe(false)
 const mapped=mapWorkshop(w,t=>editionText(t,'british'));mapped.items[3].wordDecision!.offlinePage!.title='Changed';expect(item.wordDecision!.offlinePage!.title).not.toBe('Changed')
 for(const value of [null,{}, {...item.wordDecision!.offlinePage!,title:''}]){const bad=structuredClone(w);bad.items[3].wordDecision!.offlinePage=value as never;expect(workshopProblems(bad)).toContain('Invalid offline page task')}
 for(const field of ['art','pictureOnly','recordSelection','phoneMode','nameGroups']as const){const bad=structuredClone(w),d=bad.items[3].wordDecision!;if(field==='art')delete d.art;else if(field==='pictureOnly')d.art!.pictureOnly=true;else if(field==='recordSelection')d.recordSelection=structuredClone(w.items[0].wordDecision!.recordSelection!);else if(field==='phoneMode')d.phoneMode={title:'Silent',hint:'Use silent mode',wrong:'Silent required'};else d.nameGroups={title:'Group',hint:'Place names',wrong:'Wrong group',names:[{id:'amy',name:'Amy'}]};expect(workshopProblems(bad)).toContain('Invalid offline page task')}
})

it('preserves file conditions, click targets and account scope in seven interface tasks',()=>{
 const s=studio('l-v-course-technology-5'),w=s.mission!.workshop!,owns=["Save your notes before you close the app.", "Do not delete the photo until you have another copy.", "Click the arrow beside the date to open the calendar.", "Type your name in the box at the top of the form.", "Never put your password in a public message.", "You need an account to save your progress on that website.", "Check your privacy settings before posting a new photo."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['Save','delete','Click','Type','password','account','privacy'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.fileDesk)for(const value of item.wordDecision!.fileDesk.mode==='save'?['save','close']:['backup','delete'])act('fileDesk',value);if(item.wordDecision!.titleArrow)act('titleArrow','arrow');for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.fileDesk)act('fileDesk','reset');else if(item.wordDecision!.titleArrow)act('titleArrow','title');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(rec){act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.fileDesk)for(const value of item.wordDecision!.fileDesk.mode==='save'?['save','close']:['backup','delete'])act('fileDesk',value);else if(item.wordDecision!.titleArrow)act('titleArrow','arrow');else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('先保存');expect(w.items[1].reason).toContain('不代表必须删除');expect(w.items[2].reason).toContain('不是点击标题');expect(w.items[4].reason).toContain('不填写或保存真实密码');expect(w.items[5].reason).toContain('所有功能');expect(w.items[6].reason).toContain('不代替征求');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('another part of the website required one')
})
it('preserves early-close recovery, backup deletion and exact-arrow edits through restore',()=>{
 const s=studio('l-v-course-technology-5'),w=s.mission!.workshop!
 for(const index of [0,1,2]){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));const item=w.items[index];act('input',item.answer);act('choose',item.options!.find(o=>o.correct)!.id)
 if(index===0){act('fileDesk','close');act('fileDesk','save');act('check');expect(workshopView(w,p).correct).toBe(false);act('fileDesk','reset');act('fileDesk','save');act('check');expect(workshopView(w,p).correct).toBe(false);act('fileDesk','close')}
 if(index===1){act('fileDesk','delete');act('check');expect(workshopView(w,p).correct).toBe(false);act('fileDesk','backup');act('check');expect(workshopView(w,p).correct).toBe(false);act('fileDesk','delete');expect(workshopView(w,p).wordFileDesk).toMatchObject({originalVisible:false,backupVisible:true})}
 if(index===2){act('titleArrow','title');act('check');expect(workshopView(w,p).correct).toBe(false);act('titleArrow','arrow');expect(workshopView(w,p).wordTitleArrow!.expanded).toBe(true)}act('check');expect(workshopView(w,p).correct).toBe(true);act('own',["Save your notes before you close the app.", "Do not delete the photo until you have another copy.", "Click the arrow beside the date to open the calendar.", "Type your name in the box at the top of the form.", "Never put your password in a public message.", "You need an account to save your progress on that website.", "Check your privacy settings before posting a new photo."][index]);act('save');expect(workshopView(w,p).complete).toBe(true);act(index===2?'titleArrow':'fileDesk','reset');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toBe(["Save your notes before you close the app.", "Do not delete the photo until you have another copy.", "Click the arrow beside the date to open the calendar.", "Type your name in the box at the top of the form.", "Never put your password in a public message.", "You need an account to save your progress on that website.", "Check your privacy settings before posting a new photo."][index])}
 const mapped=mapWorkshop(w,t=>editionText(t,'british'));mapped.items[0].wordDecision!.fileDesk!.title='Changed';mapped.items[2].wordDecision!.titleArrow!.title='Changed';expect(w.items[0].wordDecision!.fileDesk!.title).not.toBe('Changed');expect(w.items[2].wordDecision!.titleArrow!.title).not.toBe('Changed')
 for(const[index,field,error]of [[0,'fileDesk','Invalid file desk task'],[2,'titleArrow','Invalid title arrow task']]as const){for(const value of [null,{}, {...w.items[index].wordDecision![field]!,title:''}]){const bad=structuredClone(w);bad.items[index].wordDecision![field]=value as never;expect(workshopProblems(bad)).toContain(error)}const bad=structuredClone(w);delete bad.items[index].wordDecision!.art;expect(workshopProblems(bad)).toContain(error)}
})

it('preserves adjective context, comparative space and bounded time in eight quality tasks',()=>{
 const s=studio('l-v-course-basic-qualities'),w=s.mission!.workshop!,owns=["A good plan helps us use our time well.", "A bad smell came from the old rubbish bin.", "The clearer labels are a great improvement on the first chart.", "It was nice to read in the garden for a change.", "The fine sand slipped through the tiny gaps.", "The new shelf has room for our art materials.", "An old map showed a bridge near the village.", "The young bird waited in the nest for food."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['good','bad','great','nice','fine','new','old','young'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.shelfRoom)for(let i=0;i<3;i++)act('shelfRoom','add');for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.shelfRoom)act('shelfRoom','remove');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(rec){act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.shelfRoom)act('shelfRoom','add');else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('不等于路线更短');expect(w.items[1].reason).toContain('不报告受伤');expect(w.items[2].reason).toContain('没有说已完美');expect(w.items[4].reason).toContain('图片只比较粒度');expect(w.items[5].reason).toContain('没有具体数量');expect(w.items[6].reason).toContain('没有核实今天');expect(w.items[7].reason).toContain('不等于永远不能飞');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('It still needed clearer labels')
})
it('accepts any greater shelf space without changing four books and restores edited quality work',()=>{
 const s=studio('l-v-course-basic-qualities'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','5');const item=w.items[5];act('input','new');act('choose',item.options!.find(o=>o.correct)!.id);for(let n=0;n<=4;n++){if(n)act('shelfRoom','add');act('check');expect(workshopView(w,p).correct).toBe(n>2);expect(workshopView(w,p).wordShelfRoom!.shelves.map(s=>s.cells.filter(c=>c.occupied).length)).toEqual([4,4])}act('own','The new shelf has room for our art materials.');act('save');expect(workshopView(w,p).complete).toBe(true);act('shelfRoom','remove');act('shelfRoom','remove');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordShelfRoom!.newFree).toBe(2);expect(workshopView(w,p).own).toContain('art materials');expect(workshopView(w,p).complete).toBe(false);act('shelfRoom','add');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('shelfRoom','reset');expect(workshopView(w,p).wordShelfRoom!.newFree).toBe(0);expect(workshopView(w,p).complete).toBe(false)
 const mapped=mapWorkshop(w,t=>editionText(t,'british'));mapped.items[5].wordDecision!.shelfRoom!.title='Changed';expect(item.wordDecision!.shelfRoom!.title).not.toBe('Changed')
 for(const value of [null,{}, {...item.wordDecision!.shelfRoom!,title:''}]){const bad=structuredClone(w);bad.items[5].wordDecision!.shelfRoom=value as never;expect(workshopProblems(bad)).toContain('Invalid shelf space task')}const bad=structuredClone(w);bad.items[5].wordDecision!.art=structuredClone(w.items[4].wordDecision!.art!);expect(workshopProblems(bad)).toContain('Invalid shelf space task')
})

it('keeps size quantity speed and reach distinct in eight dimension tasks',()=>{
 const s=studio('l-v-course-basic-qualities-2'),w=s.mission!.workshop!,owns=["We need a big box for all these books.", "A small hole lets the string pass through.", "A large crowd gathered outside the theatre.", "A little water will help the young plants.", "The long queue moved quickly after another gate opened.", "Take a short break before you check the final answer.", "The tall fence kept the horses away from the road.", "The cupboard is too high for the child to reach."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['big','small','large','little','long','short','tall','high'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.queueMove)for(const value of ['long','quick','move'])act('queueMove',value);for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.queueMove)act('queueMove','slow');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(rec){act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.queueMove)for(const value of ['quick','move'])act('queueMove',value);else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('不给出容量');expect(w.items[1].reason).toContain('不等于电线已经穿好');expect(w.items[2].reason).toContain('没有给出具体人数');expect(w.items[3].reason).toContain('不是一点也没有');expect(w.items[4].reason).toContain('长就推成慢');expect(w.items[5].reason).toContain('没有指定几分钟');expect(w.items[6].reason).toContain('没有保证');expect(w.items[7].reason).toContain('不等于全世界');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('An adult reached the box for me')
})
it('requires observing a fast long queue and clears completion when speed or length changes',()=>{
 const s=studio('l-v-course-basic-qualities-2'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','4');const item=w.items[4];act('input','long');act('choose',item.options!.find(o=>o.correct)!.id)
 for(const length of ['short','long'])for(const speed of ['slow','quick']){act('queueMove','reset');act('queueMove',length);act('queueMove',speed);act('check');expect(workshopView(w,p).correct).toBe(false);act('queueMove','move');act('check');expect(workshopView(w,p).correct).toBe(length==='long'&&speed==='quick');expect(workshopView(w,p).wordQueueMove!.people).toHaveLength(length==='long'?6:3)}
 act('own','The long queue moved quickly after another gate opened.');act('save');expect(workshopView(w,p).complete).toBe(true);act('queueMove','slow');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordQueueMove).toMatchObject({length:'long',speed:'slow',observed:false});expect(workshopView(w,p).own).toContain('another gate');expect(workshopView(w,p).complete).toBe(false);for(const value of ['quick','move'])act('queueMove',value);act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('queueMove','reset');expect(workshopView(w,p).wordQueueMove!.people).toEqual([]);expect(workshopView(w,p).complete).toBe(false)
 const mapped=mapWorkshop(w,t=>editionText(t,'american'));expect(mapped.items[2].material).toContain('harbor');mapped.items[4].wordDecision!.queueMove!.title='Changed';expect(item.wordDecision!.queueMove!.title).not.toBe('Changed')
 for(const value of [null,{}, {...item.wordDecision!.queueMove!,title:''}]){const bad=structuredClone(w);bad.items[4].wordDecision!.queueMove=value as never;expect(workshopProblems(bad)).toContain('Invalid queue length and movement task')}const bad=structuredClone(w);bad.items[4].wordDecision!.art=structuredClone(w.items[0].wordDecision!.art!);expect(workshopProblems(bad)).toContain('Invalid queue length and movement task')
})

it('preserves width thickness depth location and required lifters in eight quality tasks',()=>{
 const s=studio('l-v-course-basic-qualities-3'),w=s.mission!.workshop!,owns=["A low fence goes around our vegetable patch.", "The wide pavement has room for people to pass each other.", "Use a narrow brush to paint around the window frame.", "Thick gloves make it difficult to pick up tiny beads.", "The thin card bent when I pressed its edge.", "This container is deep enough for the plant roots.", "Small crabs gathered in the shallow pool.", "The heavy table needs two people to move it."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['low','wide','narrow','Thick','thin','deep','shallow','heavy'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.quantity)for(let n=0;n<2;n++)act('quantity','add');for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.quantity)act('quantity','remove');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(rec){act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.quantity)act('quantity','add');else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('不是盖在上面');expect(w.items[1].reason).toContain('不能扩大成所有车辆');expect(w.items[2].reason).toContain('不报告已经刷完');expect(w.items[3].reason).toContain('不是完全不可能');expect(w.items[4].reason).toContain('不是before');expect(w.items[5].reason).toContain('形容词放在enough前');expect(w.items[6].reason).toContain('small修饰fish');expect(w.items[7].reason).toContain('不报告搬运已经完成');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('getting ready to help')
})
it('keeps exact two-person source requirement separate from weight or completed lifting',()=>{
 const s=studio('l-v-course-basic-qualities-3'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','7');const item=w.items[7];expect(item.wordDecision!.quantity).toMatchObject({answer:2,limit:2,shape:'person'});act('input','heavy');act('choose',item.options!.find(o=>o.correct)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);act('quantity','add');act('check');expect(workshopView(w,p).correct).toBe(false);act('quantity','add');act('check');expect(workshopView(w,p).correct).toBe(true);expect(workshopView(w,p).wordQuantity!.units).toHaveLength(2);act('own','The heavy table needs two people to move it.');act('save');expect(workshopView(w,p).complete).toBe(true);act('quantity','clear');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordQuantity!.count).toBe(0);expect(workshopView(w,p).own).toContain('heavy table');expect(workshopView(w,p).complete).toBe(false)
 const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[7].wordDecision!.quantity!.title='Changed';expect(item.wordDecision!.quantity!.title).not.toBe('Changed');for(const value of [{...item.wordDecision!.quantity!,answer:3},{...item.wordDecision!.quantity!,limit:9}]){const bad=structuredClone(w);bad.items[7].wordDecision!.quantity=value;expect(workshopProblems(bad)).toContain('Invalid word quantity')}
})

it('keeps material qualities and the firing-before-hardening order grounded in eight sources',()=>{
 const s=studio('l-v-course-basic-qualities-4'),w=s.mission!.workshop!,owns=["Choose a light jacket for the hill walk.", "We need strong string to hold the model together.", "The model has one weak joint near the base.", "The clay became hard after it was heated in the kiln.", "Wrap the small bowl in a soft cloth.", "Polish the stone until it feels smooth.", "The rough road slowed our bus down.", "The basket is full of clean sheets."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['light','strong','weak','hard','soft','smooth','rough','full'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.processOrder){act('choose',item.options!.find(x=>x.correct)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);act('processOrder','hard');act('processOrder','fire');act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(item.wordDecision!.processOrder.wrong);act('processOrder','reset');act('processOrder','fire');act('check');expect(workshopView(w,p).correct).toBe(false);act('processOrder','hard')}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.processOrder)act('processOrder','undo');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(rec){act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.processOrder)act('processOrder','hard');else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{[s.lessonId]:p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('重量轻');expect(w.items[1].reason).toContain('不报告船已经系好');expect(w.items[2].reason).toContain('one限定一处');expect(w.items[3].reason).toContain('烧制后变硬');expect(w.items[4].reason).toContain('不是声音轻');expect(w.items[5].reason).toContain('until指定打磨的终点');expect(w.items[6].reason).toContain('没有报告永久损坏');expect(w.items[7].reason).toContain('图片只支持装满与空的对比');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('It still moved')
})
it('restores partial event orders and clones their translated event labels and independent target sequence',()=>{
 const s=studio('l-v-course-basic-qualities-4'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','3');act('input','hard');act('choose',w.items[3].options!.find(o=>o.correct)!.id);act('processOrder','fire');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordProcessOrder!.slots.map(x=>x.filled)).toEqual([true,false]);act('check');expect(workshopView(w,p).correct).toBe(false);act('processOrder','hard');act('check');expect(workshopView(w,p).correct).toBe(true);act('own','The clay became hard after it was heated in the kiln.');act('save');expect(workshopView(w,p).complete).toBe(true);act('processOrder','reset');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordProcessOrder!.slots.every(x=>!x.filled)).toBe(true)
 const original=w.items[3].wordDecision!.processOrder!,mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[3].wordDecision!.processOrder!.events[0].label='Changed';mapped.items[3].wordDecision!.processOrder!.sequence.reverse();expect(original.events[0].label).toBe('变硬');expect(original.sequence).toEqual(['fire','hard']);expect(createLessonTeaching(c,c.lessons.find(l=>l.id==='l-v-course-basic-qualities-4')!,'american').transfer.passage).toContain('craft center');for(const value of [{...original,sequence:['hard','hard']},{...original,events:[{id:'reset',label:'重置'},original.events[1]]}]){const bad=structuredClone(w);bad.items[3].wordDecision!.processOrder=value;expect(workshopProblems(bad)).toContain('Invalid word process order')}
})

it('preserves conditional ease and unequal amounts across eight individually authored tasks',()=>{
 const s=studio('l-v-course-basic-qualities-5'),w=s.mission!.workshop!,owns=["Keep an empty box for the spare buttons.", "Use a clean brush each time you paint.", "Leave dirty shoes beside the back door.", "The first exercise is easy if you read the example.", "This lid is difficult to open with wet hands.", "A simple sketch explained the whole route.", "The two plants need different amounts of sunlight.", "We finished the two tasks at the same time."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['empty','clean','dirty','easy','difficult','simple','different','same'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.waterPair){act('choose',item.options!.find(x=>x.correct)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);for(let a=1;a<=3;a++)for(let b=1;b<=3;b++){act('waterPair','a:'+a);act('waterPair','b:'+b);act('check');expect(workshopView(w,p).correct).toBe(a!==b)}act('waterPair','reset');act('waterPair','a:1');act('check');expect(workshopView(w,p).correct).toBe(false);act('waterPair','b:3')}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.waterPair)act('waterPair','b:1');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(rec){act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.waterPair)act('waterPair','b:3');else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-basic-qualities-5':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('不是倒空种子');expect(w.items[1].reason).toContain('不是只第一次');expect(w.items[2].reason).toContain('垫子上');expect(w.items[3].reason).toContain('条件');expect(w.items[4].reason).toContain('困难不等于完全不可能');expect(w.items[5].reason).toContain('整个过程');expect(w.items[6].reason).toContain('不指定哪一种更多');expect(w.items[7].reason).toContain('同时');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('gave no figures')
})
it('keeps either water amount free to be larger and rejects partial or equal restored sample pairs',()=>{
 const s=studio('l-v-course-basic-qualities-5'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','6');act('input','different');act('choose',w.items[6].options!.find(o=>o.correct)!.id);act('waterPair','a:3');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordWaterPair!.sides.map(x=>x.chosen)).toEqual([true,false]);act('check');expect(workshopView(w,p).correct).toBe(false);act('waterPair','b:1');act('check');expect(workshopView(w,p).correct).toBe(true);act('own','The two plants need different amounts of sunlight.');act('save');expect(workshopView(w,p).complete).toBe(true);act('waterPair','b:3');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('sunlight');act('waterPair','a:1');act('check');expect(workshopView(w,p).correct).toBe(true);act('waterPair','reset');expect(workshopView(w,p).wordWaterPair!.sides.every(x=>!x.chosen)).toBe(true)
 const original=w.items[6].wordDecision!.waterPair!,mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[6].wordDecision!.waterPair!.title='Changed';expect(original.title).not.toBe('Changed');for(const value of [{...original,title:' padded '},{...original,hint:''}]){const bad=structuredClone(w);bad.items[6].wordDecision!.waterPair=value;expect(workshopProblems(bad)).toContain('Invalid schematic water pair')}
})

it('preserves colour objects and river dimensions across eight individually authored tasks',()=>{
 const s=studio('l-v-course-colour-appearance'),w=s.mission!.workshop!,owns=["A red sticker marks the correct drawer.", "The blue mark shows the height of the water.", "The yellow flowers open beside our classroom window.", "The green gate leads to the playground.", "Write your name in black ink.", "The white ceiling reflects the morning light.", "The leaves near the fence turned brown.", "A grey cloud covered the hill behind our school."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['red','blue','yellow','green','black','white','brown','grey'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.depthLine){act('choose',item.options!.find(x=>x.correct)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);for(const colour of ['blue','red'])for(const dimension of ['depth','width']){act('depthLine',colour);act('depthLine',dimension);act('check');expect(workshopView(w,p).correct).toBe(colour==='blue'&&dimension==='depth')}act('depthLine','reset');act('depthLine','depth');act('check');expect(workshopView(w,p).correct).toBe(false);act('depthLine','blue')}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.depthLine)act('depthLine','width');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(rec){act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.depthLine)act('depthLine','depth');else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-colour-appearance':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('正确路线由原句说明');expect(w.items[1].reason).toContain('不是width');expect(w.items[2].reason).toContain('open是“开放”');expect(w.items[3].reason).toContain('通向花园');expect(w.items[4].reason).toContain('黑色墨水');expect(w.items[5].reason).toContain('不是自己制造');expect(w.items[6].reason).toContain('状态变化');expect(w.items[7].reason).toContain('hid是hide的过去式');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('mountain was still there');expect(s.transfer.passage).toContain('grey');const american=createLessonTeaching(c,c.lessons.find(l=>l.id==='l-v-course-colour-appearance')!,'american');expect(american.mission!.workshop!.items[7].answer).toBe('gray');expect(american.transfer.passage).toContain('gray');expect(american.transfer.passage).not.toContain('grey')
})
it('retains independent line colour and dimension edits without awarding guided mastery',()=>{
 const s=studio('l-v-course-colour-appearance'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','1');act('input','blue');act('choose',w.items[1].options!.find(o=>o.correct)!.id);act('depthLine','depth');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordDepthLine!.dimension).toBe('depth');expect(workshopView(w,p).wordDepthLine!.colour).toBe('');act('check');expect(workshopView(w,p).correct).toBe(false);act('depthLine','blue');act('check');expect(workshopView(w,p).correct).toBe(true);act('own','The blue arrow shows the way to the garden.');act('save');expect(workshopView(w,p).complete).toBe(true);act('depthLine','red');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordDepthLine!.dimension).toBe('depth');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('garden');act('depthLine','blue');act('check');expect(workshopView(w,p).correct).toBe(true);act('depthLine','reset');expect(workshopView(w,p).wordDepthLine!.lineStyle).toBe('')
 const original=w.items[1].wordDecision!.depthLine!,mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[1].wordDecision!.depthLine!.title='Changed';expect(original.title).not.toBe('Changed');for(const value of [{...original,title:' padded '},{...original,hint:''}]){const bad=structuredClone(w);bad.items[1].wordDecision!.depthLine=value;expect(workshopProblems(bad)).toContain('Invalid schematic depth line')}
})

it('preserves material, shade and visible-bottom evidence across eight individual colour tasks',()=>{
 const s=studio('l-v-course-colour-appearance-2'),w=s.mission!.workshop!,owns=["The clouds were pink above the hills.", "A purple towel hung beside the sink.", "The small medal is made of gold.", "The silver clasp caught the morning sunlight.", "Wear a bright scarf on a cloudy day.", "The room becomes dark when the curtains close.", "We chose a pale shade of blue for the door.", "The clear water let us see the sand below."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['pink','purple','gold','silver','bright','dark','pale','clear'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.shadePanel){act('choose',item.options!.find(x=>x.correct)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);for(const colour of ['green','blue'])for(const tone of ['pale','deep']){act('shadePanel',colour);act('shadePanel',tone);act('check');expect(workshopView(w,p).correct).toBe(colour==='green'&&tone==='pale')}act('shadePanel','reset');act('shadePanel','pale');act('check');expect(workshopView(w,p).correct).toBe(false);act('shadePanel','green')}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.shadePanel)act('shadePanel','deep');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(rec){act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.shadePanel)act('shadePanel','pale');else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-colour-appearance-2':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('港口上方');expect(w.items[1].reason).toContain('不是紫椅子');expect(w.items[2].reason).toContain('不能证明材质');expect(w.items[3].reason).toContain('不是抓住');expect(w.items[4].reason).toContain('没有保证');expect(w.items[5].reason).toContain('树下这段');expect(w.items[6].reason).toContain('浅绿色');expect(w.items[7].reason).toContain('不说明清澈的水一定能喝');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('neither picture');expect(createLessonTeaching(c,c.lessons.find(l=>l.id==='l-v-course-colour-appearance-2')!,'american').transfer.passage).toContain('harbor')
})
it('retains wall colour independently from shade and invalidates edited completion',()=>{
 const s=studio('l-v-course-colour-appearance-2'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','6');act('input','pale');act('choose',w.items[6].options!.find(o=>o.correct)!.id);act('shadePanel','pale');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordShadePanel!.tone).toBe('pale');expect(workshopView(w,p).wordShadePanel!.colour).toBe('');act('check');expect(workshopView(w,p).correct).toBe(false);act('shadePanel','green');act('check');expect(workshopView(w,p).correct).toBe(true);act('own','We chose a pale shade of pink for the cupboard.');act('save');expect(workshopView(w,p).complete).toBe(true);act('shadePanel','blue');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordShadePanel!.tone).toBe('pale');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('cupboard');act('shadePanel','green');act('check');expect(workshopView(w,p).correct).toBe(true);act('shadePanel','reset');expect(workshopView(w,p).wordShadePanel!.reading).toBe('选好色系，再选深浅。')
 const original=w.items[6].wordDecision!.shadePanel!,mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[6].wordDecision!.shadePanel!.title='Changed';expect(original.title).not.toBe('Changed');for(const value of [{...original,title:' padded '},{...original,hint:''}]){const bad=structuredClone(w);bad.items[6].wordDecision!.shadePanel=value;expect(workshopProblems(bad)).toContain('Invalid wall shade panel')}
})

it('preserves appearance objects, polishing time and single-arm capability',()=>{
 const s=studio('l-v-course-colour-appearance-3'),w=s.mission!.workshop!,owns=["The wet leaves looked shiny after the rain.", "The old silver bowl looked dull before cleaning.", "The beautiful mosaic used small pieces of stone.", "A pretty flower grew beside the gate.", "An ugly stain remained on the sleeve.", "What a lovely garden behind the house!", "The cute toy bear can turn its head.", "A handsome wooden desk stood near the wall."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['shiny','dull','beautiful','pretty','ugly','lovely','cute','handsome'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.robotWave){act('choose',item.options!.find(x=>x.correct)!.id);for(const [actions,correct]of [[[],false],[['left'],true],[['right'],true],[['left','right'],false]]as [string[],boolean][]){act('robotWave','reset');for(const action of actions)act('robotWave',action);act('check');expect(workshopView(w,p).correct).toBe(correct)}act('robotWave','right')}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.robotWave)act('robotWave','right');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(rec){act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.robotWave)act('robotWave','right');else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-colour-appearance-3':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('不是石头自发光');expect(w.items[1].reason).toContain('抛光前');expect(w.items[2].reason).toContain('小玻璃片');expect(w.items[3].reason).toContain('不是表示');expect(w.items[4].reason).toContain('污渍');expect(w.items[5].reason).toContain('景色');expect(w.items[6].reason).toContain('没有列出');expect(w.items[7].reason).toContain('wooden cabinet');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('did not list all');expect(w.items[4].wordDecision!.art!.targets!.map(t=>t.option)).toEqual(['stain','clean'])
})
it('accepts either single-arm demonstration and invalidates edited robot completion',()=>{
 const s=studio('l-v-course-colour-appearance-3'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','6');act('input','cute');act('choose',w.items[6].options!.find(o=>o.correct)!.id);act('robotWave','right');act('check');expect(workshopView(w,p).correct).toBe(true);act('own','The cute toy cat can lift one paw.');act('save');expect(workshopView(w,p).complete).toBe(true);act('robotWave','left');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordRobotWave!.left).toBe(true);expect(workshopView(w,p).wordRobotWave!.right).toBe(true);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('paw');act('robotWave','right');act('check');expect(workshopView(w,p).correct).toBe(true);act('save');expect(workshopView(w,p).complete).toBe(true);act('robotWave','reset');expect(workshopView(w,p).wordRobotWave!.reading).toBe('两只手臂都没动');expect(workshopView(w,p).complete).toBe(false)
 const original=w.items[6].wordDecision!.robotWave!,mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[6].wordDecision!.robotWave!.title='Changed';expect(original.title).not.toBe('Changed');for(const value of [{...original,title:' padded '},{...original,hint:''}]){const bad=structuredClone(w);bad.items[6].wordDecision!.robotWave=value;expect(workshopProblems(bad)).toContain('Invalid robot wave')}
})

it('preserves readable labels, assembly order and shape arrangements',()=>{
 const s=studio('l-v-course-colour-appearance-4'),w=s.mission!.workshop!,owns=["Keep your notes neat and easy to follow.", "A tidy shelf makes the books easier to find.", "The desk was messy after our model-making session.", "Straighten the strip before joining the pieces.", "His curly hair showed beneath the helmet.", "The bald actor wore a blue cap outdoors.", "We placed the stones in an oval.", "Stand in a circle around the tree."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer!.toLowerCase())).toEqual(['neat','tidy','messy','straighten','curly','bald','oval','circle'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.wireOrder){act('choose',item.options!.find(x=>x.correct)!.id);for(const [actions,correct]of [[[],false],[['attach'],false],[['straighten'],false],[['straighten','attach'],true]]as [string[],boolean][]){act('wireOrder','reset');for(const action of actions)act('wireOrder',action);act('check');expect(workshopView(w,p).correct).toBe(correct)}}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.wireOrder)act('wireOrder','reset');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  if(rec){act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else if(item.wordDecision!.wireOrder)for(const action of ['straighten','attach'])act('wireOrder',action);else act('choose',item.options!.find(x=>x.correct)!.id);act('check');act('save');expect(workshopView(w,p).complete).toBe(true)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-colour-appearance-4':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('易读');expect(w.items[1].reason).toContain('不保证');expect(w.items[2].reason).toContain('时间要看原句');expect(w.items[3].reason).toContain('先弄直');expect(w.items[4].reason).toContain('从帽子下露出来');expect(w.items[5].reason).toContain('没有说明');expect(w.items[6].reason).toContain('不表示椅子数量');expect(w.items[7].reason).toContain('站成一圈');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('different times');expect(w.items[2].wordDecision!.art!.targets!.map(t=>t.option)).toEqual(['tidy','messy'])
})
it('blocks reversed wire assembly and invalidates reset completion without losing own writing',()=>{
 const s=studio('l-v-course-colour-appearance-4'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','3');act('input','Straighten');act('choose',w.items[3].options!.find(o=>o.correct)!.id);act('wireOrder','attach');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordWireOrder!.blocked).toBe(true);expect(workshopView(w,p).wordWireOrder!.attached).toBe(false);act('check');expect(workshopView(w,p).correct).toBe(false);act('wireOrder','straighten');act('check');expect(workshopView(w,p).correct).toBe(false);act('wireOrder','attach');act('check');expect(workshopView(w,p).correct).toBe(true);act('own','Straighten the strip before fixing it to the model.');act('save');expect(workshopView(w,p).complete).toBe(true);act('wireOrder','reset');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('strip');expect(workshopView(w,p).wordWireOrder!.straight).toBe(false)
 const original=w.items[3].wordDecision!.wireOrder!,mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[3].wordDecision!.wireOrder!.title='Changed';expect(original.title).not.toBe('Changed');for(const value of [{...original,title:' padded '},{...original,hint:''}]){const bad=structuredClone(w);bad.items[3].wordDecision!.wireOrder=value;expect(workshopProblems(bad)).toContain('Invalid wire order')}
})

it('preserves shape ratios and per-side distribution with five precise records',()=>{
 const s=studio('l-v-course-colour-appearance-5'),w=s.mission!.workshop!,owns=["Fold the paper into a triangle.", "Draw a rectangle with a width of three units.", "Draw a line from the word to the matching object.", "The model has a white spot on each side.", "A blue stripe runs across the cushion.", "Smooth the rough edge with fine sandpaper.", "Draw the outline of the kite before painting it.", "The tower\u2019s round windows are its main feature."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer)).toEqual(['triangle','rectangle','line','spot','stripe','edge','outline','feature'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{
   if(index===1)for(const value of ['length:4','width:2'])act('rectangleRatio',value);if(index===3)for(const value of ['a:1','b:1'])act('spotWings',value)
   for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)
  }
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(index===1)act('rectangleRatio','width:3');else if(index===3)act('spotWings','a:2');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-colour-appearance-5':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('不能改成剪');expect(w.items[1].reason).toContain('没有规定');expect(w.items[2].reason).toContain('标签连到图片');expect(w.items[3].reason).toContain('不概括所有');expect(w.items[4].reason).toContain('胸前圆章');expect(w.items[5].reason).toContain('磨平滑');expect(w.items[6].reason).toContain('先画轮廓');expect(w.items[7].reason).toContain('弧形屋顶');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('not one fixed size');expect(w.items[4].wordDecision!.art!.targets!.map(t=>t.option)).toEqual(['stripe','badge'])
})
it('accepts all offered double-length pairs and one spot on each side, retaining reset drafts',()=>{
 const s=studio('l-v-course-colour-appearance-5'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)}
 for(const[index,action,choices]of [[1,'rectangleRatio',[['length:4','width:2'],['length:6','width:3'],['length:8','width:4']]],[3,'spotWings',[['a:1','b:1']]]]as [number,string,string[][]][]){act('item',String(index));act('input',w.items[index].answer);act('choose',w.items[index].options!.find(o=>o.correct)!.id);for(const pair of choices){act(action,'reset');act('check');expect(workshopView(w,p).correct).toBe(false);act(action,pair[0]);act('check');expect(workshopView(w,p).correct).toBe(false);act(action,pair[1]);act('check');expect(workshopView(w,p).correct).toBe(true)}act('own',index===1?'Draw a rectangle with sides of six and three units.':'The paper model has one spot on each side.');act('save');expect(workshopView(w,p).complete).toBe(true);act(action,'reset');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).not.toBe('');if(index===3)for(const pair of [['a:2','b:0'],['a:0','b:2']]){for(const value of pair)act(action,value);act('check');expect(workshopView(w,p).correct).toBe(false)}}
 for(const[index,key,error]of [[1,'rectangleRatio','Invalid rectangleRatio'],[3,'spotWings','Invalid spotWings']]as const){const original=w.items[index].wordDecision![key]!,mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[index].wordDecision![key]!.title='Changed';expect(original.title).not.toBe('Changed');for(const value of [{...original,title:' padded '},{...original,hint:''}]){const bad=structuredClone(w);bad.items[index].wordDecision![key]=value;expect(workshopProblems(bad)).toContain(error)}const bad=structuredClone(w);bad.items[index].wordDecision!.robotWave={title:'Wave',hint:'Choose',wrong:'Check'};expect(workshopProblems(bad)).toContain(error)}
})

it('distinguishes requested information without inventing unknown answers',()=>{
 const s=studio('l-v-course-questions-quantity'),w=s.mission!.workshop!,owns=["Who opened the classroom window?", "To whom should we address the letter?", "Whose pencil is beside the notebook?", "What holds the lid in place?", "Which route has fewer crossings?", "Where can we refill the classroom water jug?", "Why did the paper turn blue?", "How did you fold the paper so evenly?"];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer!.toLowerCase())).toEqual(['who','whom','whose','what','which','where','why','how'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(index===4)act('pathSteps','left');for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(index===4)act('pathSteps','swap');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-questions-quantity':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('没有证明');expect(w.items[1].reason).toContain('发件人');expect(w.items[2].reason).toContain('缺席');expect(w.items[3].reason).toContain('没有说');expect(w.items[4].reason).toContain('不是在');expect(w.items[5].reason).toContain('实际使用');expect(w.items[6].reason).toContain('没有给出原因');expect(w.items[7].reason).toContain('没有直接说明');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('not necessarily shorter');expect(w.items[5].wordDecision!.art!.targets!.map(t=>t.option)).toEqual(['refill','bench'])
})
it('requires a fresh smaller-count path selection after swapping and preserves own writing',()=>{
 const s=studio('l-v-course-questions-quantity'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','4');act('input','Which');act('choose',w.items[4].options!.find(o=>o.correct)!.id);act('pathSteps','right');act('check');expect(workshopView(w,p).correct).toBe(false);act('pathSteps','left');act('check');expect(workshopView(w,p).correct).toBe(true);act('own','Which route has fewer crossings?');act('save');expect(workshopView(w,p).complete).toBe(true);act('pathSteps','swap');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordPathSteps!.paths.map(x=>x.count)).toEqual([7,4]);expect(workshopView(w,p).wordPathSteps!.paths.some(x=>x.selected)).toBe(false);expect(workshopView(w,p).own).toContain('crossings');act('pathSteps','left');act('check');expect(workshopView(w,p).correct).toBe(false);act('pathSteps','right');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('pathSteps','reset');expect(workshopView(w,p).complete).toBe(false)
 const original=w.items[4].wordDecision!.pathSteps!,mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[4].wordDecision!.pathSteps!.title='Changed';expect(original.title).not.toBe('Changed');for(const value of [{...original,title:' padded '},{...original,hint:''}]){const bad=structuredClone(w);bad.items[4].wordDecision!.pathSteps=value;expect(workshopProblems(bad)).toContain('Invalid path steps')}
})

it('preserves modal force and tide-before-leaving order without inventing completed actions',()=>{
 const s=studio('l-v-course-questions-quantity-2'),w=s.mission!.workshop!,owns=["Can this bag hold all the books?", "Could you move the chair a little, please?", "You may leave your umbrella on that stand.", "The gate might be closed after heavy rain.", "You must keep clear of the swinging door.", "We should check the weather before leaving.", "I will carry the smaller basket.", "Would you like a seat beside the door?"];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer!.toLowerCase())).toEqual(['can','could','may','might','must','should','will','would'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(index===5)for(const value of ['check','leave'])act('processOrder',value);for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(index===5)act('processOrder','undo');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-questions-quantity-2':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('没有给出结论');expect(w.items[1].reason).toContain('礼貌请求');expect(w.items[2].reason).toContain('不是必须');expect(w.items[3].reason).toContain('没有确认');expect(w.items[4].reason).toContain('不等于不必');expect(w.items[5].reason).toContain('没有说已经');expect(w.items[6].reason).toContain('不能据此认定重量');expect(w.items[7].reason).toContain('不是说昨天');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('kept that uncertainty');expect(w.items[6].wordDecision!.art!.targets!.map(t=>t.option)).toEqual(['larger','smaller'])
})
it('checks advice meaning and prior tide check independently, undoing stale completion',()=>{
 const s=studio('l-v-course-questions-quantity-2'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','5');act('input','should');act('choose',w.items[5].options!.find(o=>o.correct)!.id);for(const [values,correct]of [[[],false],[['check'],false],[['leave','check'],false],[['check','leave'],true]]as [string[],boolean][]){act('processOrder','reset');for(const value of values)act('processOrder',value);act('check');expect(workshopView(w,p).correct).toBe(correct)}act('own','We should check the weather before leaving.');act('save');expect(workshopView(w,p).complete).toBe(true);act('processOrder','undo');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordProcessOrder!.slots.filter(s=>s.filled).map(s=>s.label)).toEqual(['查潮汐']);expect(workshopView(w,p).own).toContain('weather');act('processOrder','leave');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('processOrder','reset');expect(workshopView(w,p).complete).toBe(false);const original=w.items[5].wordDecision!.processOrder!,mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[5].wordDecision!.processOrder!.events[0].label='Changed';expect(original.events[0].label).toBe('出发')
})

it('preserves amount, count and capacity in individual quantity tasks',()=>{
 const s=studio('l-v-course-questions-quantity-3'),w=s.mission!.workshop!,owns=["Shall we test the new design together?", "We ought to check the labels before printing.", "How much water is left in the jug?", "How many boxes do we need for the books?", "Few people stayed after the final bell.", "Our new poster uses less paper than the old one.", "This route has fewer turns than the old one.", "We need more time to compare the two results."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer!.toLowerCase())).toEqual(['shall','ought','much','many','few','less','fewer','more'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(index===5)for(const value of ['old:3','new:2'])act('paperUse',value);else act('pathSteps','left');for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(index===5)act('paperUse','new:3');else act('pathSteps','swap');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-questions-quantity-3':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[2].reason).toContain('不可数');expect(w.items[3].reason).toContain('能容纳');expect(w.items[4].reason).toContain('不能把few直接算成零');expect(w.items[5].reason).toContain('每张纸更小');expect(w.items[6].reason).toContain('不是说每一级更缓');expect(w.items[7].reason).toContain('没有说测试完成');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('equal-sized sheets')
})
it('requires a smaller equal-sheet amount independently of meaning and invalidates edited paper work',()=>{
 const s=studio('l-v-course-questions-quantity-3'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','5');act('input','less');act('choose',w.items[5].options!.find(o=>o.correct)!.id)
 for(let old=0;old<=3;old++)for(let next=0;next<=3;next++){act('paperUse','reset');if(old)act('paperUse','old:'+old);if(next)act('paperUse','new:'+next);act('check');expect(workshopView(w,p).correct).toBe(old>0&&next>0&&next<old)}act('paperUse','old:3');act('paperUse','new:2');act('check');act('own','Our new box uses less paper than before.');act('save');expect(workshopView(w,p).complete).toBe(true);act('paperUse','new:3');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordPaperUse!.sides.map(x=>x.count)).toEqual([3,3]);expect(workshopView(w,p).own).toContain('new box');act('paperUse','old:2');act('paperUse','new:1');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('paperUse','reset');expect(workshopView(w,p).complete).toBe(false);const cfg=w.items[5].wordDecision!.paperUse!,mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[5].wordDecision!.paperUse!.title='Changed';expect(cfg.title).toContain('新设计')
})

it('preserves majority and indefinite-pronoun scope in eight individual tasks',()=>{
 const s=studio('l-v-course-questions-quantity-4'),w=s.mission!.workshop!,owns=["Most pupils in our club bring a water bottle.", "We chose the road with the least traffic.", "Put the other tools back after making the model.", "Let us find another way to join these parts.", "Some pupils cut the paper while others checked the plan.", "Does anyone else want to check the final label?", "Has anyone checked the label on this box?", "Can anybody show us how to fold the last part?"];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer!.toLowerCase())).toEqual(['most','least','other','another','others','else','anyone','anybody'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include&&rec.rows.filter(x=>x.include).length===1);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('routeTraffic','a');for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else act('routeTraffic','rotate');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-questions-quantity-4':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('超过一半');expect(w.items[1].reason).toContain('没有车');expect(w.items[1].wordDecision!.routeTraffic!.hint).toContain('每个小框表示1辆车');expect(w.items[2].reason).toContain('其余两件');expect(w.items[4].reason).toContain('不能再写others pupils');expect(w.items[5].reason).toContain('anyone后');expect(w.items[6].reason).toContain('不是确认');expect(w.items[7].reason).toContain('不确认人人都会');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('invented for the exercise')
})
it('requires both other tools and compares minimum traffic independently from meaning',()=>{
 const s=studio('l-v-course-questions-quantity-4'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','2');act('input','other');const rows=w.items[2].wordDecision!.recordSelection!.rows;expect(rows.filter(x=>x.include).map(x=>x.id)).toEqual(['hammer','scissors']);for(let mask=0;mask<8;mask++){act('record-none');for(let i=0;i<3;i++)if(mask&(1<<i))act('record-toggle',rows[i].id);act('check');expect(workshopView(w,p).correct).toBe(mask===6)}act('record-toggle','brush');act('check');expect(workshopView(w,p).correct).toBe(true);act('own','Keep the other tools on the lower shelf.');act('save');expect(workshopView(w,p).complete).toBe(true);act('record-toggle','hammer');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('lower shelf')
 act('item','1');act('input','least');act('choose',w.items[1].options!.find(o=>o.correct)!.id);for(let turn=0;turn<3;turn++){for(const choice of ['a','b','c']){act('routeTraffic',choice);act('check');expect(workshopView(w,p).correct).toBe(choice===['a','c','b'][turn])}act('routeTraffic','rotate');expect(workshopView(w,p).correct).toBe(false)}act('routeTraffic','a');act('check');act('own','We chose the road with the least traffic.');act('save');expect(workshopView(w,p).complete).toBe(true);act('routeTraffic','rotate');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),4);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordRouteTraffic!.routes.every(x=>!x.selected)).toBe(true);expect(workshopView(w,p).own).toContain('least traffic');act('routeTraffic','c');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('routeTraffic','reset');expect(workshopView(w,p).complete).toBe(false);const cfg=w.items[1].wordDecision!.routeTraffic!,mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[1].wordDecision!.routeTraffic!.title='Changed';expect(cfg.title).toContain('车流')
})

it('preserves indefinite-pronoun ranges and exceptions in eight individual tasks',()=>{
 const s=studio('l-v-course-questions-quantity-5'),w=s.mission!.workshop!,owns=["Everyone brought one book for the exchange.", "Everybody waited until the teacher opened the door.", "Somebody has left a notebook beside the window.", "Nobody knew why the classroom clock was slow.", "Something is moving under the fallen leaves.", "Do not move anything on the teacher\u2019s desk.", "Nothing moved except the small flag beside the gate.", "Everything we need for the game fits in this box."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer!.toLowerCase())).toEqual(['everyone','everybody','somebody','nobody','something','anything','nothing','everything'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{for(const value of ['a:1','b:1','c:1'])act('eachItem',value);for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else act('eachItem','a:2');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-questions-quantity-5':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('每个人各带一件');expect(w.items[3].reason).toContain('原因');expect(w.items[4].reason).toContain('准确件数');expect(w.items[5].reason).toContain('范围是护栏后');expect(w.items[6].reason).toContain('树叶是例外');expect(w.items[7].reason).toContain('不代表已经打包完成');expect(s.transfer.review).toBe('draft');expect(s.transfer.passage).toContain('a total of three was not enough')
})
it('requires exactly one per member even when incorrect allocations total three',()=>{
 const s=studio('l-v-course-questions-quantity-5'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('input','Everyone');act('choose',w.items[0].options!.find(o=>o.correct)!.id)
 for(let a=0;a<=2;a++)for(let b=0;b<=2;b++)for(let c=0;c<=2;c++){for(const[id,n]of [['a',a],['b',b],['c',c]])act('eachItem',id+':'+n);act('check');expect(workshopView(w,p).correct).toBe(a===1&&b===1&&c===1);expect(workshopView(w,p).wordEachItem!.people.map(x=>x.items.length)).toEqual([a,b,c])}
 for(const value of ['a:1','b:1','c:1'])act('eachItem',value);act('check');act('own','Everyone brought one pencil for our club.');act('save');expect(workshopView(w,p).complete).toBe(true);act('eachItem','c:0');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('one pencil');act('eachItem','c:1');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('eachItem','reset');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordEachItem!.total).toBe(0);const cfg=w.items[0].wordDecision!.eachItem!,mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[0].wordDecision!.eachItem!.title='Changed';expect(cfg.title).toContain('每个人')
})

it('preserves correspondence instructions without inventing completed actions',()=>{
 const s=studio('l-v-course-communication'),w=s.mission!.workshop!,owns=["Leave a message if the office is closed.", "Send the reading list as an email attachment.", "The mail arrives before our first lesson.", "I will post the letter after school.", "Put a stamp in the top right corner of the envelope.", "Write the name clearly on the envelope.", "Keep your home address out of public messages.", "Check the postcode before you send the letter."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer!.toLowerCase())).toEqual(['message','email','mail','post','stamp','envelope','address','postcode'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(x=>x.correct)!.id);if(item.wordDecision!.stampPlacement){for(const corner of ['top-left','bottom-left','bottom-right','top-right']){act('stampPlacement',corner);act('check');expect(workshopView(w,p).correct).toBe(corner==='top-right')}}else{act('processOrder','send');act('processOrder','check');act('check');expect(workshopView(w,p).correct).toBe(false);act('processOrder','reset');for(const id of item.wordDecision!.processOrder!.sequence)act('processOrder',id)}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else act(item.wordDecision!.stampPlacement?'stampPlacement':'processOrder','reset');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-communication':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('条件');expect(w.items[1].reason).toContain('附件');expect(w.items[4].wordDecision!.art!.asset).toBe('lesson-envelope-front');expect(w.items[6].material).toContain('public chat');expect(w.items[7].wordDecision!.processOrder!.sequence).toEqual(['check','send']);expect(s.transfer.review).toBe('draft')
})
it('requires spatial placement independently of stamp meaning and retains revised work',()=>{
 const s=studio('l-v-course-communication'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','4');act('input','stamp');act('choose',w.items[4].options!.find(o=>o.correct)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);act('stampPlacement','top-right');act('check');act('own','Put a stamp on the envelope for our letter.');act('save');expect(workshopView(w,p).complete).toBe(true);act('stampPlacement','bottom-right');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('our letter');expect(workshopView(w,p).wordStampPlacement!.reading).toContain('右下角');act('stampPlacement','top-right');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('stampPlacement','reset');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordStampPlacement!.chosen).toBe(false);const cfg=w.items[4].wordDecision!.stampPlacement!,mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[4].wordDecision!.stampPlacement!.title='Changed';expect(cfg.title).toContain('信封正面');const bad=structuredClone(w);delete bad.items[4].wordDecision!.art;expect(workshopProblems(bad)).toContain('Invalid stamp placement')
})

it('keeps phone idioms and fact-checking order in eight correspondence tasks',()=>{
 const s=studio('l-v-course-communication-2'),w=s.mission!.workshop!,owns=["The parcel arrived at our club this morning.", "This package contains the tools for our project.", "Contact the teacher if you need more information.", "Please call me when your train arrives.", "Give me a ring after your last class.", "Please reply before our next meeting.", "She did not respond until she had read the report.", "We had a quick chat after our science lesson."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer!.toLowerCase())).toEqual(['parcel','package','contact','call','ring','reply','respond','chat'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.processOrder){act('choose',item.options!.find(x=>x.correct)!.id);act('processOrder','respond');act('processOrder','check');act('check');expect(workshopView(w,p).correct).toBe(false);act('processOrder','reset');for(const id of item.wordDecision!.processOrder!.sequence)act('processOrder',id)}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.processOrder)act('processOrder','reset');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-communication-2':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('预期');expect(w.items[1].reason).toContain('全部零件');expect(w.items[4].wordDecision!.art!.asset).toBe('lesson-ring-meaning');expect(w.items[4].reason).toContain('没有说已经到达');expect(w.items[6].wordDecision!.processOrder!.sequence).toEqual(['check','respond']);expect(s.transfer.review).toBe('draft')
})
it('keeps no-response-before-check distinct from never responding and retains revised order',()=>{
 const s=studio('l-v-course-communication-2'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','6');act('input','respond');act('choose',w.items[6].options!.find(o=>o.correct)!.id);act('check');expect(workshopView(w,p).correct).toBe(false);for(const value of ['check','respond'])act('processOrder',value);act('check');act('own','He did not respond until he had read my note.');act('save');expect(workshopView(w,p).complete).toBe(true);act('processOrder','undo');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('my note');act('processOrder','respond');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('processOrder','reset');expect(workshopView(w,p).complete).toBe(false);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[6].wordDecision!.processOrder!.sequence.reverse();expect(w.items[6].wordDecision!.processOrder!.sequence).toEqual(['check','respond']);expect(w.items[6].options!.find(o=>o.id==='never')!.correct).toBe(false)
})

it('keeps two-person exchange and three agreed actions distinct from completed events',()=>{
 const s=studio('l-v-course-communication-3'),w=s.mission!.workshop!,owns=["The conversation helped me understand our project.", "We wrote a short dialogue about a train journey.", "The discussion helped us plan our class visit.", "Her speech helped us think about saving water.", "Listen carefully to the announcement before you move.", "They will announce the results after the meeting.", "The news reached our class before the meeting.", "We used old newspaper to wrap the empty box."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer!.toLowerCase())).toEqual(['conversation','dialogue','discussion','speech','announcement','announce','news','newspaper'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.quantity)for(let n=0;n<3;n++)act('quantity','add');for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.quantity)act('quantity','remove');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-communication-3':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[1].wordDecision!.art!.asset).toBe('lesson-traveller-dialogue');expect(w.items[1].reason).toContain('不证明');expect(w.items[2].wordDecision!.quantity!.answer).toBe(3);expect(w.items[4].reason).toContain('不计听力作答');expect(w.items[7].reason).toContain('不安排接触碎玻璃');expect(s.transfer.review).toBe('draft')
})
it('requires exactly three action cards and retains writing after quantity edits',()=>{
 const s=studio('l-v-course-communication-3'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','2');act('input','discussion');act('choose','three');act('quantity','clear');for(let n=0;n<=5;n++){act('check');expect(workshopView(w,p).correct).toBe(n===3);if(n<5)act('quantity','add')}act('quantity','clear');for(let n=0;n<3;n++)act('quantity','add');act('check');act('own','The discussion helped us plan our class visit.');act('save');expect(workshopView(w,p).complete).toBe(true);act('quantity','remove');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('class visit');act('quantity','add');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('quantity','clear');expect(workshopView(w,p).complete).toBe(false);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[2].wordDecision!.quantity!.answer=2;expect(w.items[2].wordDecision!.quantity!.answer).toBe(3);expect(w.items[2].options!.find(o=>o.id==='done')!.correct).toBe(false)
})

it('keeps open interview questions distinct from completed or fully verified reports',()=>{
 const s=studio('l-v-course-communication-4'),w=s.mission!.workshop!,owns=["The magazine has an article about our town.", "The article explains how the bridge was built.", "Our report includes facts about the school garden.", "We prepared questions before the interview with our teacher.", "We need information about the school bus route.", "Clear communication helps our group share ideas.", "We agreed on a signal before the game.", "The sign tells visitors where the entrance is."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer!.toLowerCase())).toEqual(['magazine','article','report','interview','information','communication','signal','sign'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.processOrder){act('choose',item.options!.find(x=>x.correct)!.id);act('processOrder','respond');act('processOrder','check');act('check');expect(workshopView(w,p).correct).toBe(false);act('processOrder','reset');for(const id of item.wordDecision!.processOrder!.sequence)act('processOrder',id)}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.processOrder)act('processOrder','reset');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-communication-4':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].reason).toContain('其他栏目');expect(w.items[2].reason).toContain('核实');expect(w.items[3].wordDecision!.art!.asset).toBe('lesson-open-interview');expect(w.items[3].reason).toContain('假设');expect(w.items[4].hint).toContain('不可数');expect(w.items[5].reason).toContain('任何错误');expect(s.transfer.review).toBe('draft')
})
it('rejects closed interview questions and unverified claims without inventing route details',()=>{
 const s=studio('l-v-course-communication-4'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','3');act('input','interview');act('choose','closed');act('check');expect(workshopView(w,p).correct).toBe(false);act('choose','open');act('check');act('own','We prepared questions before the interview with our teacher.');act('save');expect(workshopView(w,p).complete).toBe(true);act('choose','done');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('teacher');act('item','4');act('input','information');act('record-none');act('record-toggle','done');act('check');expect(workshopView(w,p).correct).toBe(false);act('record-none');act('record-toggle','wrong');act('check');expect(workshopView(w,p).correct).toBe(false);act('record-none');act('record-toggle','need');act('check');expect(workshopView(w,p).correct).toBe(true);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[3].options![0].text='Changed';expect(w.items[3].options![0].text).toBe('How do you help protect local wildlife?')
})

it('keeps bag clues and two before-order instructions distinct from unstated outcomes',()=>{
 const s=studio('l-v-course-communication-5'),w=s.mission!.workshop!,owns=["The symbol on our map marks the library.", "Read the label before using the new glue.", "Her comment helped me improve the ending of my story.", "The explanation helped me understand the new rule.", "His description helped us find the right classroom.", "Read each instruction before starting the task.", "The warning helped us keep away from the deep water.", "Ask permission before taking a photo of someone."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.answer!.toLowerCase())).toEqual(['symbol','label','comment','explanation','description','instruction','warning','permission'])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection,order=item.wordDecision!.processOrder
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(order){act('choose',item.options!.find(x=>x.correct)!.id);for(const id of [...order.sequence].reverse())act('processOrder',id);act('check');expect(workshopView(w,p).correct).toBe(false);act('processOrder','reset');for(const id of order.sequence)act('processOrder',id)}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(order)act('processOrder','reset');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-communication-5':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[1].wordDecision!.processOrder!.sequence).toEqual(['read','wash']);expect(w.items[4].wordDecision!.art!.asset).toBe('lesson-bag-description');expect(w.items[4].reason).toContain('另给的练习');expect(w.items[7].wordDecision!.processOrder!.sequence).toEqual(['ask','record']);expect(w.items[7].reason).toContain('不会启动录音');expect(s.transfer.review).toBe('draft')
})
it('retains permission writing without treating a request as approval or starting recording',()=>{
 const s=studio('l-v-course-communication-5'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','7');act('input','permission');act('choose','first');act('check');expect(workshopView(w,p).correct).toBe(false);for(const value of ['ask','record'])act('processOrder',value);act('check');act('own','Ask permission before taking a photo of someone.');act('save');expect(workshopView(w,p).complete).toBe(true);act('processOrder','undo');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('photo');act('processOrder','record');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('choose','granted');act('check');expect(workshopView(w,p).correct).toBe(false);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[7].wordDecision!.processOrder!.sequence.reverse();expect(w.items[7].wordDecision!.processOrder!.sequence).toEqual(['ask','record']);expect(w.items[7].options!.find(o=>o.id==='granted')!.correct).toBe(false)
})

it('keeps shopping payment rules and bus-fare reserves separate from invented source facts',()=>{
 const s=studio('l-v-course-commerce'),w=s.mission!.workshop!,owns=["We buy fresh fruit at the market on Saturdays.", "The shop will sell handmade cups next month.", "We can pay by card at the museum shop.", "How much will the repair cost tomorrow?", "I spend less money when I plan my meals.", "Keep some money for the journey home.", "We paid in cash at the small stall.", "A coin rolled under the chair beside me."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["We buy only what we can carry home.", "The shop will sell locally made baskets.", "You can pay by card at this counter.", "How much does the repair cost?", "I spend less money when I take a shopping list.", "Keep a little money for the bus home.", "The stall accepts cash but not cards.", "A coin rolled beneath the ticket machine."])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection,budget=item.wordDecision!.busBudget
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(x=>x.correct)!.id);if(budget){act('check');expect(workshopView(w,p).correct).toBe(false);for(let n=0;n<=budget.total;n++){if(n)act('busBudget','reserve');act('check');expect(workshopView(w,p).correct).toBe(n===budget.fare);expect(workshopView(w,p).wordBusBudget!.reserved+workshopView(w,p).wordBusBudget!.available).toBe(12)}act('busBudget','reset');for(let n=0;n<budget.fare;n++)act('busBudget','reserve')}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(budget)act('busBudget','return');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false)
  const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-commerce':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[5].material).not.toMatch(/12|3/);expect(w.items[5].wordDecision!.busBudget).toMatchObject({total:12,fare:3});expect(w.items[6].wordDecision!.art!.asset).toBe('lesson-cash-card');expect(s.transfer.review).toBe('draft')
})
it('restores a changed bus reserve without awarding guided mastery and isolates mapped config',()=>{
 const s=studio('l-v-course-commerce'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','5');act('input','money');act('choose',w.items[5].options!.find(o=>o.correct)!.id);for(let n=0;n<3;n++)act('busBudget','reserve');act('check');act('own','Keep some money for the bus tomorrow.');act('save');expect(workshopView(w,p).complete).toBe(true);act('busBudget','return');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).wordBusBudget!.reserved).toBe(2);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('tomorrow');act('busBudget','reserve');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('busBudget','reset');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordBusBudget!.ready).toBe(false);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[5].wordDecision!.busBudget!.fare=4;expect(w.items[5].wordDecision!.busBudget!.fare).toBe(3);for(const bad of [{total:13},{fare:12},{fare:0}]){const x=structuredClone(w);Object.assign(x.items[5].wordDecision!.busBudget!,bad);expect(workshopProblems(x)).toContain('Invalid bus budget')}
})

it('distinguishes currency units, one-cent difference, inclusion and cheap-ticket conditions',()=>{
 const s=studio('l-v-course-commerce-2'),w=s.mission!.workshop!,owns=["Check the currency before visiting another country.", "The entrance fee is two pounds today.", "The postcard cost two dollars at the stall.", "The smaller stamp costs two cents less.", "Every penny from our sale went to the charity.", "The price includes a map of the park.", "A cheap ticket helps if the departure time suits us.", "The most expensive bag is not always the strongest."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["Check the local currency before you travel.", "The entrance fee is one pound.", "The old postcard cost one dollar.", "The smaller stamp costs one cent less.", "Every penny from the sale went to the library.", "The price includes a reusable bottle.", "A cheap ticket is useful only if the time suits you.", "The most expensive tool is not always the best."])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-commerce-2':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[3].material).not.toMatch(/150|149/);expect(w.items[3].options!.find(o=>o.correct)!.text).toContain('149 cents');expect(w.items[3].reason).toContain('只属于练习');expect(w.items[6].material).not.toMatch(/08:40|09:00/);expect(w.items[6].options!.find(o=>o.correct)!.text).toContain('08:40');expect(s.transfer.review).toBe('draft')
})
it('preserves the smaller-stamp difference and ticket condition after mapped edits',()=>{
 const s=studio('l-v-course-commerce-2'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','3');act('input','cent');act('choose','lower');act('check');act('own','The blue stamp costs one cent less.');act('save');expect(workshopView(w,p).complete).toBe(true);act('choose','difference');act('check');expect(workshopView(w,p).correct).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('blue stamp');act('choose','lower');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[6].options![0].correct=false;expect(w.items[6].options![0].correct).toBe(true);expect(w.items[7].options!.find(o=>o.id==='cheapest')!.correct).toBe(false)
})

it('checks sales, five-wheel orders, visible stitching and transaction limits',()=>{
 const s=studio('l-v-course-commerce-3'),w=s.mission!.workshop!,owns=["Our school sale raised money for the animal shelter.", "Students receive a discount on theatre tickets.", "The second-hand chair was a real bargain.", "We placed an order for three replacement handles.", "The customer returned a broken clock yesterday.", "The repair service includes a brake check.", "Check the quality of the seams before buying.", "A small repair restored the chair's value."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["The school sale raised money for new books.", "Students receive a discount on museum tickets.", "The second-hand desk was a real bargain.", "We placed an order for five replacement wheels.", "The customer returned the damaged lamp.", "The repair service includes a safety check.", "Check the quality of the stitching before buying.", "A simple repair restored the bicycle's value."])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.quantity){act('choose',item.options!.find(o=>o.correct)!.id);for(let n=0;n<=7;n++){if(n)act('quantity','add');else act('quantity','clear');act('check');expect(workshopView(w,p).correct).toBe(n===5)}act('quantity','clear');for(let n=0;n<5;n++)act('quantity','add')}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-commerce-3':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[3].wordDecision!.quantity!.answer).toBe(5);expect(w.items[6].wordDecision!.art!.asset).toBe('lesson-stitching-check');expect(w.items[6].options!.find(o=>o.correct)!.id).toBe('right');expect(s.transfer.review).toBe('draft')
})
it('invalidates changed wheel counts while retaining writing and isolates mapped quantity config',()=>{
 const s=studio('l-v-course-commerce-3'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','3');act('input','order');act('choose','five');for(let n=0;n<5;n++)act('quantity','add');act('check');act('own','We placed an order for two new wheels.');act('save');expect(workshopView(w,p).complete).toBe(true);act('quantity','remove');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('two new wheels');expect(workshopView(w,p).wordQuantity!.count).toBe(4);act('quantity','add');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[3].wordDecision!.quantity!.answer=4;expect(w.items[3].wordDecision!.quantity!.answer).toBe(5);expect(w.items[4].options!.find(o=>o.id==='refund')!.correct).toBe(false);expect(w.items[5].options!.find(o=>o.id==='all')!.correct).toBe(false)
})

it('checks receipt timing and both budget items without adding unsupported money facts',()=>{
 const s=studio('l-v-course-commerce-4'),w=s.mission!.workshop!,owns=["The view is worth the walk to the hilltop.", "Check the bill before paying at the counter.", "Keep the receipt until you check the new radio.", "Keep some change for the bus home.", "Our budget must cover paper and pencils.", "We cannot afford a new computer this month.", "Do not waste money buying things you already own.", "The stall made a small profit on each handmade card."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["The view is worth the long climb.", "Check the bill before you pay.", "Keep the receipt until you test the lamp.", "Have you got enough change for the bus?", "Our budget must cover paint and brushes.", "We cannot afford a new printer this term.", "Do not waste money replacing things you can repair.", "The stall made a small profit on each notebook."])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){for(let mask=0;mask<(1<<rec.rows.length);mask++){act('record-none');const selected=rec.rows.filter((_,n)=>mask&(1<<n));for(const row of selected)act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,n)=>!!(mask&(1<<n))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.processOrder){act('processOrder','pay');act('processOrder','check');act('check');expect(workshopView(w,p).correct).toBe(false);act('processOrder','reset');for(const id of item.wordDecision!.processOrder!.sequence)act('processOrder',id)}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-commerce-4':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[4].wordDecision!.recordSelection!.rows.filter(x=>x.include).map(x=>x.id)).toEqual(['paint','brushes']);expect(w.items[0].wordDecision!.art!.asset).toBe('lesson-hilltop-view');expect(s.transfer.review).toBe('draft')
})
it('retains budget writing after removing a required item and isolates mapped record config',()=>{
 const s=studio('l-v-course-commerce-4'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','4');act('input','budget');act('record-none');act('record-toggle','paint');act('record-toggle','brushes');act('check');act('own','Our budget must cover paper and pencils.');act('save');expect(workshopView(w,p).complete).toBe(true);act('record-toggle','brushes');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('paper and pencils');act('record-toggle','brushes');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[4].wordDecision!.recordSelection!.rows[0].include=false;expect(w.items[4].wordDecision!.recordSelection!.rows[0].include).toBe(true);expect(w.items[2].options!.find(o=>o.id==='discard')!.correct).toBe(false);expect(w.items[7].options!.find(o=>o.id==='revenue')!.correct).toBe(false)
})

it('checks lending and debt directions, donation order and hypothetical coat clues',()=>{
 const s=studio('l-v-course-commerce-5'),w=s.mission!.workshop!,owns=["The shop reported a small loss after the storm.", "They made a plan to pay off the debt this year.", "Could you lend me a ruler until the next lesson?", "I still owe you three pounds for lunch.", "She hopes to earn money by making wooden toys.", "We will donate the toys after the children finish using them.", "The charity provides warm meals in winter.", "The fund helps schools replace damaged desks."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["The shop reported a small loss after the flood.", "They made a plan to pay off the debt.", "Could you lend me a pencil until lunch?", "I still owe you two pounds for the tickets.", "She hopes to earn money by repairing bikes.", "We will donate the books after everyone has read them.", "The charity provides warm coats in winter.", "The fund helps families replace flood-damaged books."])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(item.usage){act('input','borrow');expect(workshopView(w,p).usageDirection).toBe('left');act('check');expect(workshopView(w,p).correct).toBe(false);act('input','lend');expect(workshopView(w,p).usageDirection).toBe('right')}if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.processOrder){act('choose',item.options!.find(o=>o.correct)!.id);for(const id of [...item.wordDecision!.processOrder!.sequence].reverse())act('processOrder',id);act('check');expect(workshopView(w,p).correct).toBe(false);act('processOrder','reset');for(const id of item.wordDecision!.processOrder!.sequence)act('processOrder',id)}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-commerce-5':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[5].wordDecision!.processOrder!.sequence).toEqual(['read','donate']);expect(w.items[6].wordDecision!.art!.asset).toBe('lesson-winter-coat');expect(w.items[6].options!.find(o=>o.correct)!.id).toBe('coat');expect(s.transfer.review).toBe('draft')
})
it('invalidates reset donation order while retaining writing and isolates mapped sequence',()=>{
 const s=studio('l-v-course-commerce-5'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','5');act('input','donate');act('choose','after');act('processOrder','read');act('processOrder','donate');act('check');act('own','We will donate the toys after everyone has used them.');act('save');expect(workshopView(w,p).complete).toBe(true);act('processOrder','reset');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('donate the toys');act('processOrder','read');act('processOrder','donate');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[5].wordDecision!.processOrder!.sequence.reverse();expect(w.items[5].wordDecision!.processOrder!.sequence).toEqual(['read','donate']);expect(w.items[2].options!.find(o=>o.id==='from-me')!.correct).toBe(false);expect(w.items[3].options!.find(o=>o.id==='you-me')!.correct).toBe(false)
})

it('checks subject contexts, leaf outlines and a separately supplied board exercise',()=>{
 const s=studio('l-v-course-science'),w=s.mission!.workshop!,owns=["Science helps us investigate changes around us.", "Physics helps explain how a swing moves.", "Our chemistry lesson included a teacher-led demonstration.", "In biology, we compared different seed shapes.", "Geography helps us understand how coasts change.", "The museum tells the history of the local harbour.", "Maths helps us estimate the materials for a small table.", "Wear suitable eye protection in the laboratory.", "Math helps us estimate the materials for a small table."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["Science begins with questions we can investigate.", "Physics helps explain why the boat floats.", "Our chemistry lesson included a safe colour-change test.", "In biology, we compared different leaf shapes.", "Geography helps us understand how rivers shape land.", "The museum tells the history of the local railway.", "Maths helps us estimate the materials for the shelf.", "Wear eye protection in the laboratory."])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(const row of rec.rows){act('record-toggle',row.id);act('check');expect(workshopView(w,p).correct).toBe(row.include);act('record-toggle',row.id)}for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{if(item.wordDecision!.quantity){act('choose',item.options!.find(o=>o.correct)!.id);for(let n=0;n<=7;n++){if(n)act('quantity','add');else act('quantity','clear');act('check');expect(workshopView(w,p).correct).toBe(n===5)}act('quantity','clear');for(let n=0;n<5;n++)act('quantity','add')}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-science':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[6].wordDecision!.quantity!.answer).toBe(5);expect(w.items[3].wordDecision!.art!.asset).toBe('lesson-leaf-shapes');expect(w.items[3].options!.find(o=>o.correct)!.id).toBe('shapes');expect(s.transfer.review).toBe('draft')
})
it('invalidates changed board counts while retaining writing and isolates mapped quantity config',()=>{
 const s=studio('l-v-course-science'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','6');act('input',w.items[6].answer);act('choose','five');for(let n=0;n<5;n++)act('quantity','add');act('check');act('own',w.items[6].answer+' helps estimate materials for our new table.');act('save');expect(workshopView(w,p).complete).toBe(true);act('quantity','remove');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('our new table');expect(workshopView(w,p).wordQuantity!.count).toBe(4);act('quantity','add');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[6].wordDecision!.quantity!.answer=4;expect(w.items[6].wordDecision!.quantity!.answer).toBe(5);expect(w.items[2].options!.find(o=>o.id==='recipe')!.correct).toBe(false);expect(w.items[7].options!.find(o=>o.id==='guarantee')!.correct).toBe(false)
})

it('checks observation constraints, complete timed records and measure-before-buy ordering',()=>{
 const s=studio('l-v-course-science-2'),w=s.mission!.workshop!,owns=["Our experiment compared two kinds of paper.", "This method uses less paper for our notes.", "The diagram shows the process of recycling glass.", "Our watering system uses water from a tank.", "We drew a simple water cycle in class.", "Observe the birds without touching their nest.", "Record the date beside each observation.", "Measure the gap before buying a desk."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["Our experiment compared seeds in light and shade.", "This method uses less water to clean the brushes.", "The diagram shows the process of making paper.", "The watering system runs on collected rainwater.", "The water cycle moves water through the environment.", "Observe the plants without moving the pots.", "Record the time beside each measurement.", "Measure the opening before buying a shelf."])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(let bits=0;bits<(1<<rec.rows.length);bits++){act('record-none');for(let j=0;j<rec.rows.length;j++)if(bits&(1<<j))act('record-toggle',rec.rows[j].id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,j)=>!!(bits&(1<<j))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(o=>o.correct)!.id);if(index===5){act('observe','move');act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).wordObserve!.moved).toBe(true);act('observe','observe');expect(workshopView(w,p).wordObserve!.moved).toBe(false)}if(index===7){act('processOrder','buy');act('processOrder','measure');act('check');expect(workshopView(w,p).correct).toBe(false);act('processOrder','reset');act('processOrder','measure');act('processOrder','buy')}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(index===5)act('observe','move');else act('processOrder','reset');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-science-2':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[6].wordDecision!.recordSelection!.rows.filter(r=>r.include)).toHaveLength(2);expect(w.items[5].wordDecision!.art!.asset).toBe('lesson-observe-plant');expect(s.transfer.review).toBe('draft')
})
it('invalidates a moved pot and missing timed record while retaining drafts and isolating mapped config',()=>{
 const s=studio('l-v-course-science-2'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','5');act('input','Observe');act('choose','still');act('observe','observe');act('check');act('own','Observe the birds without touching their nest.');act('save');expect(workshopView(w,p).complete).toBe(true);const start=workshopView(w,p).wordObserve!.plantStyle;act('observe','move');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordObserve!.plantStyle).not.toBe(start);expect(workshopView(w,p).own).toContain('birds');act('observe','observe');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('observe','reset');expect(workshopView(w,p).complete).toBe(false);act('observe','observe');act('check');act('save');act('item','6');act('input','Record');act('record-toggle','first');act('check');expect(workshopView(w,p).correct).toBe(false);act('record-toggle','second');act('check');expect(workshopView(w,p).correct).toBe(true);act('own','Record the date beside each observation.');act('save');act('record-toggle','first');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),4);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain('observation');const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[5].wordDecision!.observe!.title='Changed';mapped.items[6].wordDecision!.recordSelection!.rows[0].include=false;expect(w.items[5].wordDecision!.observe!.title).toBe('观察，不搬动');expect(w.items[6].wordDecision!.recordSelection!.rows[0].include).toBe(true);expect(workshopProblems({...w,items:[{...w.items[5],wordDecision:{...w.items[5].wordDecision!,quantity:{title:'x',unit:'x',pluralUnit:'x',shape:'card',answer:1,limit:2,hint:'x',wrong:'x'}}}]})).toContain('Invalid stationary observation')
})

it('checks estimate order and limits of proof, source-free arithmetic and visible tracks',()=>{
 const s=studio('l-v-course-science-3'),w=s.mission!.workshop!,owns=["Calculate the total cost of the materials.", "Estimate the cost before checking the price list.", "Can you predict which design will work best?", "One example cannot prove that every answer is correct.", "The broken twig gave us evidence of movement.", "Check the data before writing the report.", "We tested our theory with a simple model.", "Our conclusion should be based on the evidence."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["Calculate the total length of string we need.", "Estimate the distance before checking the map.", "Can you predict which material will stay dry?", "One test cannot prove that every sample is safe.", "The footprints gave us evidence of a small animal.", "Check the data before drawing a conclusion.", "We tested our theory with a paper model.", "Our conclusion must match the results."])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(let bits=0;bits<(1<<rec.rows.length);bits++){act('record-none');for(let j=0;j<rec.rows.length;j++)if(bits&(1<<j))act('record-toggle',rec.rows[j].id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,j)=>!!(bits&(1<<j))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(o=>o.correct)!.id);if(index===0){for(const n of [4,5,6]){act('ruler',String(n));act('check');expect(workshopView(w,p).correct).toBe(n===5)}act('ruler','5')}if(item.wordDecision!.processOrder){const task=item.wordDecision!.processOrder!;for(const id of [...task.sequence].reverse())act('processOrder',id);act('check');expect(workshopView(w,p).correct).toBe(false);act('processOrder','reset');for(const id of task.sequence)act('processOrder',id)}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(index===0)act('ruler','4');else if(item.wordDecision!.processOrder)act('processOrder','reset');else act('choose','shoe');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-science-3':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[0].wordDecision!.ruler!.answer).toBe(5);expect(w.items[4].wordDecision!.art!.asset).toBe('lesson-track-evidence');expect(w.items[4].wordDecision!.art!.targets).toHaveLength(2);expect(s.transfer.review).toBe('draft')
})
it('invalidates changed total-length and event-order answers while retaining drafts',()=>{
 const s=studio('l-v-course-science-3'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','0');act('input','Calculate');act('choose','five');act('ruler','5');act('check');act('own','Calculate the total cost of the materials.');act('save');expect(workshopView(w,p).complete).toBe(true);act('ruler','4');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordRuler!.reading).toBe('0 → 4 m');expect(workshopView(w,p).own).toContain('materials');act('ruler','5');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);for(const index of [1,5]){act('item',String(index));const item=w.items[index],task=item.wordDecision!.processOrder!;act('input',item.answer);act('choose',item.options!.find(o=>o.correct)!.id);for(const id of task.sequence)act('processOrder',id);act('check');act('own',index===1?'Estimate the cost before checking the price list.':'Check the data before writing the report.');act('save');expect(workshopView(w,p).complete).toBe(true);act('processOrder','undo');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),4);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordProcessOrder!.slots.filter(x=>x.filled)).toHaveLength(1)}const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[0].wordDecision!.ruler!.answer=4;mapped.items[1].wordDecision!.processOrder!.sequence.reverse();expect(w.items[0].wordDecision!.ruler!.answer).toBe(5);expect(w.items[1].wordDecision!.processOrder!.sequence).toEqual(['estimate','map']);expect(w.items[3].wordDecision!.recordSelection!.rows.find(r=>r.id==='unsafe')!.include).toBe(false)
})

it('checks matter states and symbol composition without inventing observation facts',()=>{
 const s=studio('l-v-course-science-4'),w=s.mission!.workshop!,owns=["The model shows how matter changes when heated.", "Ice is solid water, but it can melt.", "Keep the liquid in a clearly labelled bottle.", "A gas can spread through an empty container.", "A simple model can help us picture an atom.", "The model represents one water molecule.", "We studied a plant cell under the microscope.", "Adjust the microscope until you can see clearly."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["The model shows how matter can change state.", "Ice is a solid form of water.", "Pour the liquid into a labelled container.", "A gas can spread to fill its container.", "A model can help us picture an atom.", "The diagram represents one water molecule.", "We looked at a plant cell through the microscope.", "Adjust the microscope until the image is clear."])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(let bits=0;bits<(1<<rec.rows.length);bits++){act('record-none');for(let j=0;j<rec.rows.length;j++)if(bits&(1<<j))act('record-toggle',rec.rows[j].id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,j)=>!!(bits&(1<<j))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(o=>o.correct)!.id);if(item.wordDecision!.molecule){for(let h=0;h<=3;h++)for(let o=0;o<=3;o++){act('molecule','reset');for(let n=0;n<h;n++)act('molecule','add-h');for(let n=0;n<o;n++)act('molecule','add-o');act('check');expect(workshopView(w,p).correct).toBe(h===2&&o===1)}act('molecule','reset');for(const a of ['add-h','add-h','add-o'])act('molecule',a)}if(item.wordDecision!.processOrder){const task=item.wordDecision!.processOrder!;for(const id of [...task.sequence].reverse())act('processOrder',id);act('check');expect(workshopView(w,p).correct).toBe(false);act('processOrder','reset');for(const id of task.sequence)act('processOrder',id)}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(item.wordDecision!.molecule)act('molecule','remove-o');else if(item.wordDecision!.processOrder)act('processOrder','reset');else act('choose','liquid');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-science-4':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[1].wordDecision!.art!.asset).toBe('lesson-water-forms');expect(w.items[1].wordDecision!.art!.targets).toHaveLength(2);expect(s.transfer.review).toBe('draft')
})
it('invalidates edited molecular composition and clear-image order but retains writing',()=>{
 const s=studio('l-v-course-science-4'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','5');act('input','molecule');act('choose','one');for(const a of ['add-o','add-h','add-h'])act('molecule',a);act('check');act('own','The model represents one water molecule.');act('save');expect(workshopView(w,p).complete).toBe(true);act('molecule','remove-h');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordMolecule!.hydrogen).toBe(1);expect(workshopView(w,p).wordMolecule!.oxygen).toBe(1);expect(workshopView(w,p).own).toContain('one water molecule');act('molecule','add-h');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('item','7');act('input','microscope');act('choose','clear');act('processOrder','adjust');act('processOrder','clear');act('check');act('own','Adjust the microscope until you can see clearly.');act('save');expect(workshopView(w,p).complete).toBe(true);act('processOrder','undo');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),4);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordProcessOrder!.slots.filter(x=>x.filled)).toHaveLength(1);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[5].wordDecision!.molecule!.title='Changed title';mapped.items[7].wordDecision!.processOrder!.sequence.reverse();expect(w.items[5].wordDecision!.molecule!.title).toBe('拼一个水分子');expect(w.items[7].wordDecision!.processOrder!.sequence).toEqual(['adjust','clear']);expect(w.items[4].wordDecision!.recordSelection!.rows.find(r=>r.id==='photo')!.include).toBe(false)
})

it('checks astronomical roles and fictional cart movement without invented measurements',()=>{
 const s=studio('l-v-course-science-5'),w=s.mission!.workshop!,owns=["The telescope helped us see the moon clearly.", "Leave space around the plant for air to circulate.", "The exhibition asks questions about the universe.", "The model shows a planet orbiting a distant star.", "The satellite sends new images back to Earth.", "Gravity pulls a dropped ball towards the ground.", "A gentle force moved the empty cart forward.", "Measure the speed over the same distance again."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["The telescope revealed details on the moon.", "Leave space between the boxes for air to circulate.", "The exhibition explores our place in the universe.", "The model shows a planet moving around a star.", "The satellite sends weather images back to Earth.", "Gravity pulls the ball back to the ground.", "A small force moved the empty cart.", "Measure the speed over the same distance each time."])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection
  if(rec){act('record-none');for(let bits=0;bits<(1<<rec.rows.length);bits++){act('record-none');for(let j=0;j<rec.rows.length;j++)if(bits&(1<<j))act('record-toggle',rec.rows[j].id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,j)=>!!(bits&(1<<j))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(o=>o.correct)!.id);act('cart','wait');act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).wordCart!.moved).toBe(false);act('cart','push');expect(workshopView(w,p).wordCart!.moved).toBe(true);for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else act('cart','wait');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-science-5':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[6].wordDecision!.art!.asset).toBe('lesson-empty-cart');expect(s.transfer.review).toBe('draft')
})
it('requires rechecking cart movement after changed or reset actions while retaining writing',()=>{
 const s=studio('l-v-course-science-5'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','6');act('input','force');act('choose','move');act('cart','push');act('check');act('own','A gentle force moved the empty cart forward.');act('save');expect(workshopView(w,p).complete).toBe(true);act('cart','wait');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordCart!.cartStyle).toBe('left:5%');expect(workshopView(w,p).own).toContain('cart forward');act('cart','push');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('cart','reset');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordCart!.chosen).toBe('');const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[6].wordDecision!.cart!.title='Changed title';expect(w.items[6].wordDecision!.cart!.title).toBe('施力，让空车移动');expect(w.items[3].wordDecision!.recordSelection!.rows.find(r=>r.id==='reverse')!.include).toBe(false);expect(w.items[7].wordDecision!.recordSelection!.rows.find(r=>r.id==='number')!.include).toBe(false)
})

it('checks planning questions, action order and three shape instances',()=>{
 const s=studio('l-v-course-planning-actions'),w=s.mission!.workshop!,owns=["We will begin with a simple drawing.", "Finish the outline before painting the flowers.", "Can we complete the model before lunch?", "Let us end the meeting with a clear plan.", "We can continue the game after a rest.", "Create a pattern with three blue circles.", "We plan to build a small bird shelter.", "Our group will develop a safer crossing plan."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["We will begin with the safest design.", "Finish the drawing before adding colour.", "Can we complete the bridge before the bell?", "Let's end the discussion with one clear decision.", "We can continue the walk after a short rest.", "Create a pattern using only three shapes.", "We plan to build a shelter for small birds.", "The group will develop a safer way to cross."])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection,order=item.wordDecision!.processOrder
  if(rec){for(let bits=0;bits<(1<<rec.rows.length);bits++){act('record-none');for(let j=0;j<rec.rows.length;j++)if(bits&(1<<j))act('record-toggle',rec.rows[j].id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,j)=>!!(bits&(1<<j))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(o=>o.correct)!.id);if(order){act('processOrder','reset');for(const id of [...order.sequence].reverse())act('processOrder',id);act('check');expect(workshopView(w,p).correct).toBe(false);act('processOrder','reset');for(const id of order.sequence)act('processOrder',id)}else{for(const a of ['add-circle','add-circle'])act('pattern',a);act('check');expect(workshopView(w,p).correct).toBe(false);act('pattern','add-circle');expect(workshopView(w,p).wordPattern!.count).toBe(3)}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(order)act('processOrder','undo');else act('pattern','add-square');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-planning-actions':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[5].options!.find(o=>o.id==='kinds')!.correct).toBe(false);expect(s.transfer.review).toBe('draft')
})
it('retains the learner draft while requiring a repaired three-shape pattern to be checked again',()=>{
 const s=studio('l-v-course-planning-actions'),w=s.mission!.workshop!;let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item','5');act('input','Create');act('choose','three');for(const a of ['add-circle','add-circle','add-circle'])act('pattern',a);act('check');act('own','Create a pattern with three blue circles.');act('save');expect(workshopView(w,p).complete).toBe(true);act('pattern','add-square');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordPattern!.count).toBe(4);expect(workshopView(w,p).own).toContain('three blue circles');act('pattern','undo');act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act('pattern','reset');expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).wordPattern!.count).toBe(0);for(const a of ['add-square','add-triangle','add-circle'])act('pattern',a);act('check');act('save');expect(workshopView(w,p).complete).toBe(true);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[5].wordDecision!.pattern!.title='Changed title';expect(w.items[5].wordDecision!.pattern!.title).toBe('拼出三个图形的图案');expect(w.items[1].wordDecision!.processOrder!.sequence).toEqual(['drawing','colour']);expect(w.items[4].wordDecision!.processOrder!.sequence).toEqual(['rest','walk'])
})

it('checks preferences, offers and restriction scope without inventing policies',()=>{
 const s=studio('l-v-course-planning-actions-2'),w=s.mission!.workshop!,owns=["Choose a material that resists rust.", "I prefer walking to waiting in a long queue.", "We agree that this handle needs strengthening.", "You can refuse to share your private password.", "Will this shop accept my return without a receipt?", "I can offer to carry the smaller suitcase.", "The gallery does not allow flash photography.", "Avoid walking close to a steep drop."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["Choose a material that will not rust.", "I prefer walking to waiting for a crowded bus.", "We agree that the handle needs to be stronger.", "You can refuse a request that makes you uncomfortable.", "Will the shop accept a return without a receipt?", "I can offer to carry the lighter bag.", "The museum does not allow flash photography.", "Avoid walking near the edge of the cliff."])
 for(const[index,item]of w.items.entries()){
  expect(item.before!+item.answer+item.after!).toBe(item.material);let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection,model=item.wordDecision!.preference?'preference':item.wordDecision!.flash?'flash':undefined,good=model==='preference'?'walking':'off',bad=model==='preference'?'waiting':'on'
  if(rec){for(let bits=0;bits<(1<<rec.rows.length);bits++){act('record-none');for(let j=0;j<rec.rows.length;j++)if(bits&(1<<j))act('record-toggle',rec.rows[j].id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,j)=>!!(bits&(1<<j))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(o=>o.correct)!.id);if(model){act(model,bad);act('check');expect(workshopView(w,p).correct).toBe(false);act(model,good)}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(x=>x.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(model)act(model,bad);else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-planning-actions-2':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[5].wordDecision!.art!.targets!.map(t=>t.label)).toEqual(['左袋 · 3 kg','右袋 · 5 kg']);expect(s.transfer.review).toBe('draft')
})
it('keeps preference and flash drafts while requiring changed and reset controls to be repaired',()=>{
 const s=studio('l-v-course-planning-actions-2'),w=s.mission!.workshop!,owns=["Choose a material that resists rust.", "I prefer walking to waiting in a long queue.", "We agree that this handle needs strengthening.", "You can refuse to share your private password.", "Will this shop accept my return without a receipt?", "I can offer to carry the smaller suitcase.", "The gallery does not allow flash photography.", "Avoid walking close to a steep drop."]
 for(const[index,model,good,bad]of [[1,'preference','walking','waiting'],[6,'flash','off','on']] as const){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));const item=w.items[index];act('input',item.answer);act('choose',item.options!.find(o=>o.correct)!.id);act(model,good);act('check');act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);act(model,bad);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toBe(owns[index]);act(model,good);act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act(model,'reset');expect(workshopView(w,p).complete).toBe(false);expect(model==='preference'?workshopView(w,p).wordPreference!.selected:workshopView(w,p).wordFlash!.selected).toBe('');const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[index].wordDecision![model]!.title='Changed title';expect(w.items[index].wordDecision![model]!.title).not.toBe('Changed title')}
 expect(w.items[4].wordDecision!.recordSelection!.rows.filter(x=>x.include)).toHaveLength(1);expect(w.items[6].options!.find(x=>x.id==='free')!.correct).toBe(false)
})

it('checks route dependence and route order without invented source geography',()=>{
 const s=studio('l-v-course-planning-actions-3'),w=s.mission!.workshop!,owns=["Does the ticket include a guided tour?", "This drawer may contain small tools.", "Our route will depend on tomorrow\u2019s weather.", "These books belong to our class.", "Follow the marked path to the viewing point.", "This path will lead us back to the school.", "Can you reach the shelf without climbing?", "Please enter through the side gate."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["Does the price include the boat trip?", "This box may contain sharp tools.", "The best route will depend on the weather.", "These tools belong to the whole class.", "Follow the dotted line to the viewing point.", "This path will lead us back to the village.", "Can you reach the switch without standing on a chair?", "Please enter through the smaller gate."])
 for(const[index,item]of w.items.entries()){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection,model=item.wordDecision!.routeWeather?'routeWeather':item.wordDecision!.dottedRoute?'dottedRoute':undefined
  if(rec){for(let bits=0;bits<(1<<rec.rows.length);bits++){act('record-none');for(let j=0;j<rec.rows.length;j++)if(bits&(1<<j))act('record-toggle',rec.rows[j].id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,j)=>!!(bits&(1<<j))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(o=>o.correct)!.id);if(model==='routeWeather'){act(model,'route-b');act('check');expect(workshopView(w,p).correct).toBe(false);act(model,'route-a')}else if(model==='dottedRoute'){for(const id of ['view','middle','start'])act(model,id);act('check');expect(workshopView(w,p).correct).toBe(false);act(model,'reset');for(const id of ['start','middle','view'])act(model,id)}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(o=>o.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(model==='routeWeather')act(model,'weather-rain');else if(model==='dottedRoute')act(model,'undo');else act('choose',item.options!.find(x=>!x.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-planning-actions-3':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[7].wordDecision!.art!.targets!.map(t=>t.option)).toEqual(['small','large']);expect(s.transfer.review).toBe('draft')
})
it('clears stale routes after a weather change and repairs undone paths without losing writing',()=>{
 const s=studio('l-v-course-planning-actions-3'),w=s.mission!.workshop!,owns=["Does the ticket include a guided tour?", "This drawer may contain small tools.", "Our route will depend on tomorrow\u2019s weather.", "These books belong to our class.", "Follow the marked path to the viewing point.", "This path will lead us back to the school.", "Can you reach the shelf without climbing?", "Please enter through the side gate."]
 for(const[index,model]of [[2,'routeWeather'],[4,'dottedRoute']]as const){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));const item=w.items[index];act('input',item.answer);act('choose',item.options!.find(o=>o.correct)!.id);const solve=()=>{act(model,'reset');for(const a of model==='routeWeather'?['route-a']:['start','middle','view'])act(model,a);act('check')};solve();act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true)
  if(model==='routeWeather'){act(model,'weather-rain');expect(workshopView(w,p).wordRouteWeather!.selected).toBe('');act('check');expect(workshopView(w,p).correct).toBe(false);act(model,'route-a');act('check');expect(workshopView(w,p).correct).toBe(false);act(model,'route-b');act('check');expect(workshopView(w,p).correct).toBe(true);act('save');expect(workshopView(w,p).complete).toBe(true);act(model,'weather-rain');expect(workshopView(w,p).wordRouteWeather!.selected).toBe('')}else{act(model,'undo');expect(workshopView(w,p).wordDottedRoute!.steps).toEqual(['start','middle'])}
  p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toBe(owns[index]);solve();act('save');expect(workshopView(w,p).complete).toBe(true);act(model,'reset');expect(workshopView(w,p).complete).toBe(false);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[index].wordDecision![model]!.title='Changed title';expect(w.items[index].wordDecision![model]!.title).not.toBe('Changed title')
 }
})

it('checks necessary conditions and spatial layers without inventing results',()=>{
 const s=studio('l-v-course-planning-actions-4'),w=s.mission!.workshop!,owns=["The exit is behind the blue screen.", "The bird managed to escape from the cage.", "Even a detailed plan can fail.", "We can succeed only if we work together.", "Can you manage the steps with your suitcase?", "A clear sketch helped us solve the puzzle.", "We need to deal with this problem first.", "Let an adult handle the heated tools."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["The nearest exit is behind the curtain.", "The bird managed to escape through the window.", "Even a careful plan can fail.", "We will succeed only if everyone contributes.", "Can you manage the stairs with that bag?", "A simple diagram helped us solve the problem.", "We need to deal with the leak first.", "Let an adult handle the hot equipment."])
 for(const[index,item]of w.items.entries()){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection,model=item.wordDecision!.curtainExit?'curtainExit':item.wordDecision!.contributions?'contributions':undefined
  if(rec){for(let bits=0;bits<(1<<rec.rows.length);bits++){act('record-none');for(let j=0;j<rec.rows.length;j++)if(bits&(1<<j))act('record-toggle',rec.rows[j].id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,j)=>!!(bits&(1<<j))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(o=>o.correct)!.id);if(model==='curtainExit'){act(model,'place-front');act(model,'reveal');act('check');expect(workshopView(w,p).correct).toBe(false);act(model,'place-behind');act('check');expect(workshopView(w,p).correct).toBe(false);act(model,'reveal')}else if(model==='contributions'){for(let bits=0;bits<8;bits++){act(model,'reset');for(let j=0;j<3;j++)if(bits&(1<<j))act(model,['a','b','c'][j]);act('check');expect(workshopView(w,p).correct).toBe(bits===7)}expect(workshopView(w,p).wordContributions!.reading).toContain('并不单独保证成功')}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(o=>o.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(model==='curtainExit')act(model,'conceal');else if(model==='contributions')act(model,'b');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-planning-actions-4':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 expect(w.items[3].options!.find(o=>o.id==='guarantee')!.correct).toBe(false);expect(s.transfer.review).toBe('draft')
})
it('invalidates changed layer and contributor states while preserving writing and cloned configurations',()=>{
 const s=studio('l-v-course-planning-actions-4'),w=s.mission!.workshop!,owns=["The exit is behind the blue screen.", "The bird managed to escape from the cage.", "Even a detailed plan can fail.", "We can succeed only if we work together.", "Can you manage the steps with your suitcase?", "A clear sketch helped us solve the puzzle.", "We need to deal with this problem first.", "Let an adult handle the heated tools."]
 for(const[index,model]of [[0,'curtainExit'],[3,'contributions']]as const){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));const item=w.items[index];act('input',item.answer);act('choose',item.options!.find(o=>o.correct)!.id);const solve=()=>{act(model,'reset');for(const a of model==='curtainExit'?['place-behind','reveal']:['a','b','c'])act(model,a);act('check')};solve();act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);act(model,model==='curtainExit'?'place-front':'a');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toBe(owns[index]);solve();act('save');expect(workshopView(w,p).complete).toBe(true);act(model,'reset');expect(workshopView(w,p).complete).toBe(false);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[index].wordDecision![model]!.title='Changed title';expect(w.items[index].wordDecision![model]!.title).not.toBe('Changed title')
 }
 const invalid=structuredClone(w);delete invalid.items[0].wordDecision!.art;expect(workshopProblems(invalid).length).toBeGreaterThan(0)
})

it('preserves imagined absence and prior estimates without fabricating actual events',()=>{
 const s=studio('l-v-course-planning-actions-5'),w=s.mission!.workshop!,owns=["Consider how the change affects your classmates.", "Imagine our town without its park.", "I did not realise the room was empty.", "I recognise the melody but not the lyrics.", "Guess the length before using the ruler.", "We expect the first flowers next month."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["Consider how each choice affects other people.", "Imagine the village without its river.", "I did not realise the gate was locked.", "I can recognise the tune but not the words.", "Guess the weight before using the scales.", "We expect the first seedlings next week."])
 for(const[index,item]of w.items.entries()){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection,model=item.wordDecision!.riverImagine?'riverImagine':item.wordDecision!.guessScale?'guessScale':undefined
  if(rec){for(let bits=0;bits<(1<<rec.rows.length);bits++){act('record-none');for(let j=0;j<rec.rows.length;j++)if(bits&(1<<j))act('record-toggle',rec.rows[j].id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,j)=>!!(bits&(1<<j))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(o=>o.correct)!.id);if(model==='riverImagine'){act(model,'with');act('check');expect(workshopView(w,p).correct).toBe(false);act(model,'without');expect(workshopView(w,p).wordRiverImagine!.reading).toContain('不是说真实')}else if(model==='guessScale'){act(model,'measure');act(model,'estimate-2');act('check');expect(workshopView(w,p).correct).toBe(false);for(const n of[1,2,3]){act(model,'reset');act(model,'estimate-'+n);act('check');expect(workshopView(w,p).correct).toBe(false);act(model,'measure');act('check');expect(workshopView(w,p).correct).toBe(true);expect(workshopView(w,p).wordGuessScale!.guess).toBe(String(n))}}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(o=>o.correct)!.id)}
  act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(model==='riverImagine')act(model,'with');else if(model==='guessScale')act(model,'reset');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-planning-actions-5':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})
 }
 for(const index of[2,3]){const mapped=mapWorkshop(w,t=>editionText(t,'american'));expect(mapped.items[index].hint).toContain('英式词尾 -ise / 美式词尾 -ize');expect(mapped.items[index].reason).toContain('英式词尾用-ise，美式用-ize')}expect(w.items[1].wordDecision!.riverImagine!.withoutAsset).toBe('lesson-village-imagined');expect(w.items[2].options!.find(o=>o.id==='unlocked')!.correct).toBe(false);expect(s.transfer.review).toBe('draft')
})
it('keeps imagination and estimation drafts while invalidating changed or reset conditions',()=>{
 const s=studio('l-v-course-planning-actions-5'),w=s.mission!.workshop!,owns=["Consider how the change affects your classmates.", "Imagine our town without its park.", "I did not realise the room was empty.", "I recognise the melody but not the lyrics.", "Guess the length before using the ruler.", "We expect the first flowers next month."]
 for(const[index,model]of [[1,'riverImagine'],[4,'guessScale']]as const){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));const item=w.items[index];act('input',item.answer);act('choose',item.options!.find(o=>o.correct)!.id);const solve=()=>{act(model,'reset');for(const a of model==='riverImagine'?['without']:['estimate-1','measure'])act(model,a);act('check')};solve();act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);act(model,model==='riverImagine'?'with':'reset');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toBe(owns[index]);solve();act('save');expect(workshopView(w,p).complete).toBe(true);act(model,'reset');expect(workshopView(w,p).complete).toBe(false);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[index].wordDecision![model]!.title='Changed title';expect(w.items[index].wordDecision![model]!.title).not.toBe('Changed title')}
 const invalid=structuredClone(w);delete invalid.items[1].wordDecision!.art;expect(workshopProblems(invalid).length).toBeGreaterThan(0)
})

it('distinguishes usefulness despite damage and adjective roles without inferred feelings',()=>{
 const s=studio('l-v-course-useful-qualities'),w=s.mission!.workshop!,owns=["It is important to check the address before leaving.", "A spare bag is useful for carrying muddy shoes.", "The old guide was not useless; we could still use its index.", "The most interesting clue was inside the envelope.", "I am interested in how water wheels work.", "A boring exercise can improve with a clear purpose.", "The final performance was the most exciting part.", "The hilltop walk gave us a wonderful view."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["It is important to check the route before leaving.", "A spare bag is useful for wet clothes.", "The torn map was not useless; we could still read it.", "The most interesting clue was under the lid.", "I am interested in how old clocks work.", "A boring task can improve with a clear goal.", "The final climb was the most exciting part.", "The harbour walk gave us a wonderful view."])
 for(const[index,item]of w.items.entries()){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection,model=item.wordDecision!.tornMap?'tornMap':item.wordDecision!.interestRoles?'interestRoles':undefined
 if(rec){for(let bits=0;bits<(1<<rec.rows.length);bits++){act('record-none');for(let j=0;j<rec.rows.length;j++)if(bits&(1<<j))act('record-toggle',rec.rows[j].id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,j)=>!!(bits&(1<<j))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(o=>o.correct)!.id);if(model==='tornMap'){for(const value of['intact','covered']){act(model,value);act('check');expect(workshopView(w,p).correct).toBe(false)}act(model,'corner');expect(workshopView(w,p).wordTornMap!.torn).toBe(true);expect(workshopView(w,p).wordTornMap!.covered).toBe(false)}else if(model==='interestRoles'){for(const clue of['ing','ed'])for(const person of['ing','ed']){act(model,'clue-'+clue);act(model,'person-'+person);act('check');expect(workshopView(w,p).correct).toBe(clue==='ing'&&person==='ed')}act(model,'clue-ing');act(model,'person-ed')}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(o=>o.correct)!.id)}
 act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(model)act(model,'reset');else act('choose',item.options!.find(o=>!o.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-useful-qualities':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})}
 expect(w.items[1].wordDecision!.art!.targets!.map(t=>t.option)).toEqual(['bag','shirt']);expect(w.items[5].options!.find(o=>o.id==='done')!.correct).toBe(false);expect(s.transfer.review).toBe('draft')
})
it('keeps adjective comparison writing while invalidating changed or reset models',()=>{
 const s=studio('l-v-course-useful-qualities'),w=s.mission!.workshop!,owns=["It is important to check the address before leaving.", "A spare bag is useful for carrying muddy shoes.", "The old guide was not useless; we could still use its index.", "The most interesting clue was inside the envelope.", "I am interested in how water wheels work.", "A boring exercise can improve with a clear purpose.", "The final performance was the most exciting part.", "The hilltop walk gave us a wonderful view."]
 for(const[index,model]of [[2,'tornMap'],[4,'interestRoles']]as const){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));const item=w.items[index];act('input',item.answer);act('choose',item.options!.find(o=>o.correct)!.id);const solve=()=>{act(model,'reset');for(const a of model==='tornMap'?['corner']:['clue-ing','person-ed'])act(model,a);act('check')};solve();act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);act(model,model==='tornMap'?'covered':'clue-ed');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toBe(owns[index]);solve();act('save');expect(workshopView(w,p).complete).toBe(true);act(model,'reset');expect(workshopView(w,p).complete).toBe(false);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[index].wordDecision![model]!.title='Changed title';expect(w.items[index].wordDecision![model]!.title).not.toBe('Changed title')}
 const invalid=structuredClone(w);invalid.items[2].wordDecision!.tornMap!.title='';expect(workshopProblems(invalid).length).toBeGreaterThan(0)
})

it('preserves specific suitability, groups, causes and initial-sound articles',()=>{
 const s=studio('l-v-course-useful-qualities-2'),w=s.mission!.workshop!,owns=["Your chart gives an excellent explanation.", "This narrow box is perfect for the spare pencils.", "The quiet park is popular with local families.", "The village is famous for its handmade pottery.", "These young trees need special care in summer.", "It is normal to feel nervous before a speech.", "We met at the usual place beside the station.", "The shell has an unusual pattern."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["Your diagram gives an excellent explanation.", "This small box is perfect for the spare screws.", "The riverside path is popular with local walkers.", "The town is famous for its handmade baskets.", "These plants need special care in winter.", "It is normal to feel nervous before a performance.", "We met at the usual place by the library.", "The leaf has an unusual shape."])
 for(const[index,item]of w.items.entries()){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection,model=item.wordDecision!.boxFit?'boxFit':item.wordDecision!.uArticle?'uArticle':undefined
 if(rec){for(let bits=0;bits<(1<<rec.rows.length);bits++){act('record-none');for(let j=0;j<rec.rows.length;j++)if(bits&(1<<j))act('record-toggle',rec.rows[j].id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,j)=>!!(bits&(1<<j))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(o=>o.correct)!.id);if(model==='boxFit'){for(let bits=0;bits<8;bits++){act(model,'reset');for(const[j,id]of ['a','b','c'].entries())if(bits&(1<<j))act(model,id);act('check');expect(workshopView(w,p).correct).toBe(bits===7)}act(model,'reset');for(const id of ['c','a','b'])act(model,id);expect(workshopView(w,p).wordBoxFit!.count).toBe(3)}else if(model==='uArticle'){for(const useful of['a','an'])for(const unusual of['a','an']){act(model,'useful-'+useful);act(model,'unusual-'+unusual);act('check');expect(workshopView(w,p).correct).toBe(useful==='a'&&unusual==='an')}act(model,'useful-a');act(model,'unusual-an')}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(o=>o.correct)!.id)}
 act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(model)act(model,'reset');else act('choose',item.options!.find(o=>!o.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-useful-qualities-2':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})}
 expect(w.items[3].wordDecision!.art!.targets!.map(t=>t.option)).toEqual(['basket','bucket']);expect(w.items[5].options!.find(o=>o.id==='failure')!.correct).toBe(false);expect(s.transfer.review).toBe('draft')
})
it('keeps suitability and article writing while invalidating changed or reset models',()=>{
 const s=studio('l-v-course-useful-qualities-2'),w=s.mission!.workshop!,owns=["Your chart gives an excellent explanation.", "This narrow box is perfect for the spare pencils.", "The quiet park is popular with local families.", "The village is famous for its handmade pottery.", "These young trees need special care in summer.", "It is normal to feel nervous before a speech.", "We met at the usual place beside the station.", "The shell has an unusual pattern."]
 for(const[index,model]of [[1,'boxFit'],[7,'uArticle']]as const){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));const item=w.items[index];act('input',item.answer);act('choose',item.options!.find(o=>o.correct)!.id);const solve=()=>{act(model,'reset');for(const a of model==='boxFit'?['a','b','c']:['useful-a','unusual-an'])act(model,a);act('check')};solve();act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);act(model,model==='boxFit'?'a':'useful-an');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toBe(owns[index]);solve();act('save');expect(workshopView(w,p).complete).toBe(true);act(model,'reset');expect(workshopView(w,p).complete).toBe(false);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[index].wordDecision![model]!.title='Changed title';expect(w.items[index].wordDecision![model]!.title).not.toBe('Changed title')}
 const invalid=structuredClone(w);invalid.items[1].wordDecision!.boxFit!.title='';expect(workshopProblems(invalid).length).toBeGreaterThan(0)
})

it('preserves completed change, necessary conditions, equality and similar shape',()=>{
 const s=studio('l-v-course-useful-qualities-3'),w=s.mission!.workshop!,owns=["This is a common mistake when comparing fractions.", "An ordinary bottle became a colourful vase.", "A strange tapping noise came from the cupboard.", "Careful checking is essential for an accurate report.", "Divide the ribbon into four equal lengths.", "The two shells have a similar pattern.", "This narrow entrance is not suitable for wheelchairs.", "Keep your pass ready before entering the hall."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["This is a common mistake when measuring angles.", "An ordinary jar became a colourful lantern.", "A strange clicking noise came from the wheel.", "Clean water is essential for good health.", "Divide the dough into four equal pieces.", "The two leaves have a similar shape.", "This path is not suitable for bicycles.", "Keep your ticket ready before joining the queue."])
 for(const[index,item]of w.items.entries()){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection,model=item.wordDecision!.jarChange?'jarChange':item.wordDecision!.doughEqual?'doughEqual':item.wordDecision!.leafSimilar?'leafSimilar':undefined
 if(rec){for(let bits=0;bits<(1<<rec.rows.length);bits++){act('record-none');for(let j=0;j<rec.rows.length;j++)if(bits&(1<<j))act('record-toggle',rec.rows[j].id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,j)=>!!(bits&(1<<j))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(o=>o.correct)!.id);const wrong=model==='jarChange'?'before':model==='doughEqual'?'unequal':'changed',right=model==='jarChange'?'after':model==='doughEqual'?'equal':'scaled';expect(model).toBeTruthy();act(model!,wrong);act('check');expect(workshopView(w,p).correct).toBe(false);act(model!,right);for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(o=>o.correct)!.id)}
 act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else act(model!,'reset');expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-useful-qualities-3':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})}
 expect(w.items[1].wordDecision!.jarChange!.afterAsset).toBe('lesson-colourful-jar');expect(w.items[1].wordDecision!.art!.asset).toBe('lesson-plain-jar');expect(s.transfer.review).toBe('draft')
})
it('keeps individual comparison writing while invalidating changed and reset conditions',()=>{
 const s=studio('l-v-course-useful-qualities-3'),w=s.mission!.workshop!,owns=["This is a common mistake when comparing fractions.", "An ordinary bottle became a colourful vase.", "A strange tapping noise came from the cupboard.", "Careful checking is essential for an accurate report.", "Divide the ribbon into four equal lengths.", "The two shells have a similar pattern.", "This narrow entrance is not suitable for wheelchairs.", "Keep your pass ready before entering the hall."]
 for(const[index,model,right,wrong]of [[1,'jarChange','after','before'],[4,'doughEqual','equal','unequal'],[5,'leafSimilar','scaled','changed']]as const){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));const item=w.items[index];act('input',item.answer);act('choose',item.options!.find(o=>o.correct)!.id);act(model,right);act('check');act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);act(model,wrong);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toBe(owns[index]);act(model,right);act('check');act('save');expect(workshopView(w,p).complete).toBe(true);act(model,'reset');expect(workshopView(w,p).complete).toBe(false);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[index].wordDecision![model]!.title='Changed title';expect(w.items[index].wordDecision![model]!.title).not.toBe('Changed title')}
 const invalid=structuredClone(w);invalid.items[4].wordDecision!.doughEqual!.title='';expect(workshopProblems(invalid).length).toBeGreaterThan(0)
})

it('preserves free-entry scope, likelihood, uncertainty and firm closure',()=>{
 const s=studio('l-v-course-useful-qualities-4'),w=s.mission!.workshop!,owns=["The station is busy before the morning rush.", "The gallery offers free entry on Fridays.", "Extra blankets are available at the reception desk.", "Two players were absent from the practice session.", "Snow is likely to delay the mountain bus.", "I am not certain which key opens the cupboard.", "Make sure the lid is tightly closed.", "The film is based on a true experience."];expect(workshopProblems(w)).toEqual([]);expect(w.items.map(i=>i.material)).toEqual(["The harbour is busy before sunrise.", "The museum offers free entry on Sundays.", "Extra chairs are available at the back of the hall.", "Two pupils were absent from rehearsal.", "Rain is likely to delay the outdoor concert.", "I am not certain which switch controls the light.", "Make sure the gate is firmly closed.", "The story is based on a true event."])
 for(const[index,item]of w.items.entries()){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));act('input',item.answer);const rec=item.wordDecision!.recordSelection,model=item.wordDecision!.freeSunday?'freeSunday':item.wordDecision!.gateFirm?'gateFirm':undefined
 if(rec){for(let bits=0;bits<(1<<rec.rows.length);bits++){act('record-none');for(let j=0;j<rec.rows.length;j++)if(bits&(1<<j))act('record-toggle',rec.rows[j].id);act('check');expect(workshopView(w,p).correct).toBe(rec.rows.every((row,j)=>!!(bits&(1<<j))===row.include))}act('record-none');for(const row of rec.rows.filter(x=>x.include))act('record-toggle',row.id)}else{act('choose',item.options!.find(o=>o.correct)!.id);if(model){for(const value of model==='freeSunday'?['mon','tue','wed','thu','fri','sat','sun']:['open','shut','latched']){act(model,value);act('check');expect(workshopView(w,p).correct).toBe(value===(model==='freeSunday'?'sun':'latched'))}act(model,model==='freeSunday'?'sun':'latched')}for(const option of item.options!.filter(x=>!x.correct)){act('choose',option.id);act('check');expect(workshopView(w,p).correct).toBe(false);expect(workshopView(w,p).feedback).toBe(option.reason)}act('choose',item.options!.find(o=>o.correct)!.id)}
 act('check');expect(workshopView(w,p).correct).toBe(true);act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);if(rec)act('record-toggle',rec.rows.find(x=>!x.include)!.id);else if(model)act(model,'reset');else act('choose',item.options!.find(o=>!o.correct)!.id);expect(workshopView(w,p).complete).toBe(false);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).own).toBe(owns[index]);const forged=structuredClone(p);forged.completed.push('workshop-'+index);forged.checked['workshop-'+index]=true;expect(workshopView(w,forged).complete).toBe(false);const state=checkedState(JSON.stringify({...emptyState(1),teaching:{'l-v-course-useful-qualities-4':p}}),c,3,true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({});expect(state.lessonDoneAt).toEqual({})}
 expect(w.items[2].wordDecision!.art!.targets!.map(t=>t.option)).toEqual(['chairs','lectern']);expect(w.items[4].options!.find(o=>o.id==='done')!.correct).toBe(false);expect(s.transfer.review).toBe('draft')
})
it('keeps Sunday and gate writing while invalidating changed or reset conditions',()=>{
 const s=studio('l-v-course-useful-qualities-4'),w=s.mission!.workshop!,owns=["The station is busy before the morning rush.", "The gallery offers free entry on Fridays.", "Extra blankets are available at the reception desk.", "Two players were absent from the practice session.", "Snow is likely to delay the mountain bus.", "I am not certain which key opens the cupboard.", "Make sure the lid is tightly closed.", "The film is based on a true experience."]
 for(const[index,model]of [[1,'freeSunday'],[6,'gateFirm']]as const){let p={...freshTeaching(s,1),step:1};const act=(a:string,v='')=>{p=changeTeaching(s,p,'workshop-'+a,v,2)};act('item',String(index));const item=w.items[index];act('input',item.answer);act('choose',item.options!.find(o=>o.correct)!.id);const solve=()=>{act(model,'reset');for(const a of model==='freeSunday'?['sun']:['latched'])act(model,a);act('check')};solve();act('own',owns[index]);act('save');expect(workshopView(w,p).complete).toBe(true);act(model,model==='freeSunday'?'mon':'shut');p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toBe(owns[index]);solve();act('save');expect(workshopView(w,p).complete).toBe(true);act(model,'reset');expect(workshopView(w,p).complete).toBe(false);const mapped=mapWorkshop(w,t=>editionText(t,'american'));mapped.items[index].wordDecision![model]!.title='Changed title';expect(w.items[index].wordDecision![model]!.title).not.toBe('Changed title')}
 const invalid=structuredClone(w);invalid.items[1].wordDecision!.freeSunday!.title='';expect(workshopProblems(invalid).length).toBeGreaterThan(0)
})
