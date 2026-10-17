import{readFileSync}from'node:fs'
import{resolve}from'node:path'
export function authorVisualMissions(root,catalog){
 const records=JSON.parse(readFileSync(resolve(root,'content/teaching/visual-missions.json'),'utf8'))
 if(Object.keys(records).length!==catalog.lessons.length)throw Error('Visual mission manifest must cover every lesson exactly once')
 for(const l of catalog.lessons){const m=records[l.id];if(!m?.boards?.length||m.sourceIds.some(id=>!l.questionIds.includes(id)))throw Error('Missing or unsafe visual mission '+l.id);l.visualMission=m;const first=catalog.questions.find(q=>q.id===l.questionIds[0]);first.visualMission=m}
 return catalog
}
