import assert from'node:assert/strict'
import{mkdirSync,writeFileSync}from'node:fs'
import{authorCatalog}from'./lib/author-content.mjs'
const c=authorCatalog(process.cwd()),papers=c.mockPapers,ids=new Set(papers.flatMap(p=>p.sections.flatMap(s=>s.questionIds))),lessons=new Set(c.lessons.flatMap(l=>[...l.questionIds,...l.delayedQuestionIds]))
const normalize=t=>t.toLocaleLowerCase('en').replace(/_+/g,'_').replace(/\s+/g,' ').trim(),signature=q=>normalize(q.stem+'\n'+(q.passage??'')+'\n'+(q.options??[]).map(o=>o.text).sort().join('|'))
const bank=new Set(c.questions.filter(q=>!ids.has(q.id)).map(signature)),seen=new Set(),rows=[]
assert.equal(papers.length,8);assert.equal(ids.size,200)
for(const p of papers){const questions=p.sections.flatMap(s=>s.questionIds.map(id=>c.questions.find(q=>q.id===id)));assert.equal(questions.length,25);assert.equal(p.sections.reduce((n,s)=>n+s.marksEach*s.questionIds.length,0),60);assert.equal(p.sections.reduce((n,s)=>n+s.minutes,0),55);assert.equal(p.minutes,60)
 for(const q of questions){assert(!lessons.has(q.id));assert(q.source.kind==='original'&&q.review==='draft');assert(!bank.has(signature(q)),'Duplicate question from the lesson bank: '+q.id);assert(!seen.has(signature(q)),'Repeated mock question: '+q.id);seen.add(signature(q))}
 rows.push({id:p.id,title:p.title,grade:p.grade,term:p.term,minutes:p.minutes,marks:p.totalMarks,sections:p.sections.map(s=>({title:s.title,questions:s.questionIds.length,marks:s.questionIds.length*s.marksEach,recommendedMinutes:s.minutes})),questionIds:questions.map(q=>q.id),writingWords:(questions.at(-1).answer.display.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g)??[]).length})
}
mkdirSync('docs/reviews',{recursive:true});writeFileSync('docs/reviews/mock-exams-2026-10-17.json',JSON.stringify({scope:'Original written training format; no official city blueprint claimed. Structural/content identity audit, not external editorial approval.',papers:rows,questions:ids.size,lessonOrDelayedOverlap:0,exactQuestionDuplicates:0},null,2)+'\n');console.log('Mock audit passed: 8 original papers, 200 distinct questions, 60 marks/60 minutes each; no lesson or delayed-item reuse.')
