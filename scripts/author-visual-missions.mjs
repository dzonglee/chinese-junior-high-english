// One-time authoring tool: materializes an explicit, reviewable record for every lesson.
import{build}from'esbuild'
import{mkdirSync,readFileSync,writeFileSync}from'node:fs'
import{pathToFileURL}from'node:url'
import{resolve}from'node:path'
import{authorCatalog}from'./lib/author-content.mjs'
const root=process.cwd(),file=resolve(root,'.local/tools/visual-authoring.mjs');mkdirSync(resolve(root,'.local/tools'),{recursive:true})
await build({stdin:{contents:"export {createLessonTeaching,sourceEvidence} from './src/core/lesson-teaching'",resolveDir:root,loader:'ts'},bundle:true,platform:'node',format:'esm',outfile:file})
const{createLessonTeaching,sourceEvidence}=await import(pathToFileURL(file)),c=authorCatalog(root),records={}
const mix=(a,n)=>{const b=[...a];if(b.length>1){const k=(n%(b.length-1))+1;return[...b.slice(k).reverse(),...b.slice(0,k)]}return b}
const diagramFor=id=>/past|future|present|continuous|perfect|time/.test(id)?'timeline':/be$|agreement|pronoun|reflexive|possessive/.test(id)?'links':/clause|conditional|concession|reason|conjunction/.test(id)?'logic':/noun|article|cardinal|ordinal|comparison|adverb/.test(id)?'scale':'sentence'
for(const[lidx,l]of c.lessons.entries()){
 const s=createLessonTeaching(c,l,'british'),qs=l.questionIds.map(id=>c.questions.find(q=>q.id===id)),topic=c.topics.find(t=>t.id===l.topicId),boards=[]
 const art=/school|learning|community|garden|nature|sport|friend|family|course-t(?:01|02|04|07|10|11|12|13|15|17|24)/.test(l.topicId)?'lesson-courtyard':/science|technology|course-t(?:09|20|27|28)/.test(l.topicId)?'lesson-workshop':undefined
 if(s.mode==='vocabulary'){
  const words=c.vocabulary.filter(w=>qs.some(q=>q.id===`q-${w.topicId}-${w.id.slice(5)}`))
  for(let i=0;i<words.length;i+=3){const batch=words.slice(i,i+3),chips=batch.map((w,j)=>({id:'word-'+j,text:w.word}));if(chips.length===1){const other=words.find(w=>w.id!==batch[0].id);chips.push({id:'extra',text:other?.word??'another'})}
   boards.push({id:'words-'+i,title:'把词送回语境',instruction:'先选一个空位，再点词卡，把句子补完整。',kind:'context',diagram:'cards',slots:batch.map((w,j)=>({id:'slot-'+j,label:'情境 '+(i+j+1),text:qs.find(q=>q.id===`q-${w.topicId}-${w.id.slice(5)}`).stem.split('\n').find(line=>/_+/.test(line)).replace(/[A-Za-z]*_+/g,'___'),answer:'word-'+j,reason:`${w.word}：${w.meaning}。${w.example}`,hint:w.meaning})),chips:mix(chips,lidx+i)})
  }
 }else if(s.mode==='language'){
  const choices=qs.filter(q=>q.options?.length).slice(0,3)
  for(const[i,q]of choices.entries()){
   const wrong=q.options.find(o=>o.id!==q.answer.option),good=q.options.find(o=>o.id===q.answer.option),hasGap=/_+/.test(q.stem),line=q.stem.split('\n').find(t=>/_+/.test(t))??q.stem
   boards.push({id:'repair-'+i,title:'句子修理台',instruction:hasGap?'点亮出错的位置，再选一张卡修好它。':'对照题目约束，替换不合适的表达。',kind:'repair',diagram:diagramFor(topic.id),slots:[{id:'repair',label:s.coaching.task,text:q.stem,initial:wrong.text,answer:good.id,reason:q.explanation.steps[0].text+' '+q.explanation.steps[0].reason,hint:q.explanation.pitfall}],chips:mix(q.options.map(o=>({...o})),lidx+i),wrongReasons:Object.fromEntries(q.explanation.distractors.map(d=>['repair:'+d.option,d.reason]))})
  }
 }else if(s.mode==='reading'||s.mode==='transcript'){
  const eligible=qs.filter(q=>sourceEvidence(q).some(e=>e.supports)).slice(0,3)
  for(const[i,q]of eligible.entries()){
   const source=sourceEvidence(q),support=source.find(e=>e.supports),quote=q.explanation.visual.segments.find(x=>x.role==='evidence'&&x.text.length<240&&q.passage?.includes(x.text))?.text??support.text
   const distractors=source.filter(e=>!e.supports&&e.text.trim()!==quote.trim()).slice(0,2),chips=[{id:'proof',text:quote},...distractors.map((e,j)=>({id:'clue-'+j,text:e.text}))]
   if(chips.length<2)throw Error('Need contrasting evidence '+l.id)
   boards.push({id:'evidence-'+i,title:s.mode==='transcript'?'文字线索接力':'搭一条证据链',instruction:'先读问题，点选原文线索。接对以后再看结论。',kind:'evidence',diagram:'evidence',slots:[{id:'proof',label:'问题 → 原文线索 → 结论',text:q.stem,answer:'proof',reason:q.explanation.steps[0].text+' '+q.explanation.steps[0].reason,hint:q.explanation.pitfall}],chips:mix(chips,lidx+i),material:q.passage,conclusion:q.answer.display})
  }
 }else if(s.mode==='communication'){
  for(let i=0;i<s.modelSentences.length;i+=3){const batch=s.modelSentences.slice(i,i+3),chips=batch.map((t,j)=>({id:'role-'+j,text:s.rubric[i+j].label}));if(chips.length===1)chips.push({id:'other',text:'与这句话无关的其他任务'})
   boards.push({id:'story-'+i,title:s.skill==='writing'?'表达分镜台':'对话分镜台',instruction:'这句在做什么？把任务卡放进对应分镜。它是一种参考写法。',kind:'storyboard',diagram:'story',slots:batch.map((t,j)=>({id:'frame-'+j,label:'分镜 '+(i+j+1),text:t.text,answer:'role-'+j,reason:`这句承担“${s.rubric[i+j].label}”的作用。自己的表达可以换内容和写法。`,hint:'先看这句话传达的信息，再比较任务卡的含义。'})),chips:mix(chips,lidx+i),material:s.prediction.stem})
  }
 }else if(s.sorting){
  for(let i=0;i<s.sorting.cards.length;i+=3){const cards=s.sorting.cards.slice(i,i+3);boards.push({id:'sound-'+i,title:s.sorting.title,instruction:'把例子送进合适的分类；这里只辨认书面规律，不测发音。',kind:'sound',diagram:/stress/.test(l.topicId)?'rhythm':/intonation/.test(l.topicId)?'intonation':'sound',reusable:true,slots:cards.map((t,j)=>({id:'sound-'+j,label:'声音线索 '+(i+j+1),text:t.text,answer:t.category,reason:t.reason,hint:s.sorting.note})),chips:s.sorting.categories.map(g=>({id:g.id,text:g.label}))})}
 }
 if(!boards.length)throw Error('Missing visual lesson '+l.id)
 records[l.id]={title:topic.title,subtitle:s.coaching.task,...(art?{art}:{}),boards,sourceIds:[...l.questionIds]}
}
for(const line of readFileSync('content/teaching/visual-grammar-labs.tsv','utf8').trim().split('\n')){const[id,title,l1,s1,n1,l2,s2,n2]=line.split('\t');records['l-'+id].lab={title,states:[[l1,s1,n1],[l2,s2,n2]].map(([label,sentence,note])=>{const[before,focus,after]=sentence.split('|');return{label,before,focus,after,note}})}}
writeFileSync('content/teaching/visual-missions.json',JSON.stringify(records,null,2)+'\n');console.log('Authored explicit visual missions for '+Object.keys(records).length+' lessons.')
