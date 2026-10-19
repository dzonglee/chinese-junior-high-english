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
 for(const id of ['l-v-school','l-v-school-2','l-v-school-3','l-v-daily','l-v-daily-2','l-v-daily-3','l-v-community','l-v-community-2','l-v-community-3','l-v-nature','l-v-nature-2','l-v-nature-3','l-v-course-family','l-v-course-family-2','l-v-course-family-3','l-v-course-family-4','l-v-course-family-5','l-v-course-home','l-v-course-home-2','l-v-course-home-3','l-v-course-home-4','l-v-course-home-5','l-v-course-school-tools']){
  const s=studio(id),w=s.mission!.workshop!,source=JSON.stringify(w.items),positions=[]
  for(const[index,item]of w.items.entries()){
   let p={...freshTeaching(s,1),step:1};const act=(a:string,value='')=>{p=changeTeaching(s,p,'workshop-'+a,value,2)};act('item',String(index));const good=item.options!.find(o=>o.correct)!,order=workshopView(w,p).choices.map(o=>o.id);positions.push(order.indexOf(good.id));expect(new Set(order)).toEqual(new Set(item.options!.map(o=>o.id)))
   act('choose',good.id);act('input',item.answer);act('check');expect(workshopView(w,p).choices.map(o=>o.id)).toEqual(order);expect(workshopView(w,p).correct).toBe(true);p=restoreTeaching(s,JSON.parse(JSON.stringify(p)),3);expect(workshopView(w,p).choices.map(o=>o.id)).toEqual(order);expect(workshopView(w,p).selected).toBe(good.id)
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
