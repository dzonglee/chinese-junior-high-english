import{readFileSync,readdirSync,existsSync}from'node:fs'
import{resolve}from'node:path'
export function authorVisualMissions(root,catalog){
 const records=JSON.parse(readFileSync(resolve(root,'content/teaching/visual-missions.json'),'utf8'))
 const individualDir=resolve(root,'content/teaching/individual'),individuals=existsSync(individualDir)?readdirSync(individualDir).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync(resolve(individualDir,f),'utf8'))):[]
 if(new Set(individuals.map(i=>i.lessonId)).size!==individuals.length)throw Error('Duplicate individual lesson')
 for(const i of individuals)if(!catalog.lessons.some(l=>l.id===i.lessonId)||!i.intent||!i.picturePurpose||i.reviewState!=='draft')throw Error('Incomplete individual lesson specification')
 const workshops=JSON.parse(readFileSync(resolve(root,'content/teaching/workshops.json'),'utf8'))
 if(Object.keys(workshops).length!==catalog.lessons.length)throw Error('Workshop coverage mismatch')
 if(Object.keys(records).length!==catalog.lessons.length)throw Error('Visual mission manifest must cover every lesson exactly once')
 for(const l of catalog.lessons){const m=records[l.id];if(!m?.boards?.length||m.sourceIds.some(id=>!l.questionIds.includes(id)))throw Error('Missing or unsafe visual mission '+l.id);if(!workshops[l.id])throw Error('Missing workshop '+l.id);m.workshop=individuals.find(i=>i.lessonId===l.id)?.workshop??workshops[l.id];if(m.workshop.applicationIds?.some(id=>!l.questionIds.includes(id)||id===l.questionIds[0]))throw Error('Individual application must use a distinct immediate question');if(m.workshop.transfer&&(l.questionIds.includes(m.workshop.transfer.id)||l.delayedQuestionIds.includes(m.workshop.transfer.id)))throw Error('Individual transfer must be fresh');l.visualMission=m;const first=catalog.questions.find(q=>q.id===l.questionIds[0]);first.visualMission=m}
 return catalog
}
