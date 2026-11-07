import {individualChoiceLayout} from './individual-choice-layout.mjs'
import{readFileSync,readdirSync,existsSync}from'node:fs'
import{resolve}from'node:path'
// Practice must not rehearse the exact sentence reserved for a delayed grammar check.
export function individualDelayedProblems(individuals, grammar){
 const normal=text=>text.normalize('NFC').replace(/[‘’]/g,"'").replace(/\s+/g,' ').trim().toLocaleLowerCase('en'),delayed=new Map(),errors=[]
 for(const record of grammar){const start=record.cases.length>=12?8:4;for(let i=start;i<record.cases.length;i++){const [sentence,answer]=record.cases[i];delayed.set(normal(sentence.replace('[[1]]',answer)),`q-${record.id}-${String(i+1).padStart(3,'0')}`)}}
 for(const i of individuals)for(const c of i.workshop?.conditions??[])for(const answer of [c.target??'',...c.accepted??[]]){const id=delayed.get(normal((c.before??'')+answer+(c.after??'')));if(id)errors.push(`${i.lessonId}: workshop repeats delayed grammar item ${id}`)}
 return errors
}
export function authorVisualMissions(root,catalog){
 const records=JSON.parse(readFileSync(resolve(root,'content/teaching/visual-missions.json'),'utf8'))
 const individualDir=resolve(root,'content/teaching/individual'),individuals=existsSync(individualDir)?readdirSync(individualDir).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync(resolve(individualDir,f),'utf8'))):[]
 if(new Set(individuals.map(i=>i.lessonId)).size!==individuals.length)throw Error('Duplicate individual lesson')
 const lessonIds=new Set(catalog.lessons.map(l=>l.id)),individualByLesson=new Map(individuals.map(i=>[i.lessonId,i])),questionById=new Map()
 for(const q of catalog.questions)if(!questionById.has(q.id))questionById.set(q.id,q)
 for(const i of individuals)if(!lessonIds.has(i.lessonId)||!i.intent||!i.picturePurpose||!i.workshop||i.reviewState!=='draft')throw Error('Incomplete individual lesson specification')
 const assetFiles=new Map(JSON.parse(readFileSync(resolve(root,'content/visual-assets.json'),'utf8')).assets.map(a=>[a.id,a.file]))
 for(const i of individuals)for(const c of i.workshop.conditions??[]){const preview=c.world.selection?.preview;if(preview&&assetFiles.get(preview.asset)!==`miniprogram/illustrations/${preview.asset}.jpg`)throw Error('Redaction artwork must match its registered native path: '+i.lessonId);const scene=c.world.scene;if(scene&&assetFiles.get(scene.asset)!==`miniprogram/${scene.assetRoot??'assets'}/${scene.asset}.jpg`)throw Error('Scene artwork must match its registered native path: '+i.lessonId);const r=c.world.records;if(r?.asset&&assetFiles.get(r.asset)!==`miniprogram/${r.assetRoot??'assets'}/${r.asset}.jpg`)throw Error('Record artwork must match its registered native path: '+i.lessonId)}
 for(const i of individuals)for(const item of i.workshop.items??[]){const quantity=item.wordDecision?.quantity;if(quantity?.unitArt&&assetFiles.get(quantity.unitArt)!==`miniprogram/${quantity.unitArtRoot??'illustrations-2'}/${quantity.unitArt}.png`)throw Error('Counting artwork must match its registered native path: '+i.lessonId);const wordArt=item.wordDecision?.art;if(wordArt&&assetFiles.get(wordArt.asset)!==`miniprogram/${wordArt.assetRoot??'illustrations-2'}/${wordArt.asset}.${wordArt.format??'jpg'}`)throw Error('Word decision artwork must match its registered native path: '+i.lessonId);const a=item.sourceArt;if(a&&assetFiles.get(a.asset)!==`miniprogram/${a.assetRoot??'illustrations'}/${a.asset}.jpg`)throw Error('Source illustration must match its registered native path: '+i.lessonId)}
 const workshops=JSON.parse(readFileSync(resolve(root,'content/teaching/workshops.json'),'utf8'))
 const effective=Object.entries(workshops).map(([lessonId,workshop])=>({lessonId,workshop:individualByLesson.get(lessonId)?.workshop??workshop}))
 const delayedErrors=individualDelayedProblems(effective,[...JSON.parse(readFileSync(resolve(root,'content/grammar.json'),'utf8')),...JSON.parse(readFileSync(resolve(root,'content/course-grammar.json'),'utf8'))]);if(delayedErrors.length)throw Error(delayedErrors.join('\n'))
 if(Object.keys(workshops).length!==catalog.lessons.length)throw Error('Workshop coverage mismatch')
 if(Object.keys(records).length!==catalog.lessons.length)throw Error('Visual mission manifest must cover every lesson exactly once')
 for(const l of catalog.lessons){const m=records[l.id];if(!m?.boards?.length||m.sourceIds.some(id=>!l.questionIds.includes(id)))throw Error('Missing or unsafe visual mission '+l.id);if(!workshops[l.id])throw Error('Missing workshop '+l.id);const authored=individualByLesson.get(l.id)?.workshop??workshops[l.id];m.workshop=authored.transfer?{...authored,transfer:individualChoiceLayout(authored.transfer)}:authored;if(m.workshop.applicationIds?.some(id=>!l.questionIds.includes(id)||id===l.questionIds[0]))throw Error('Individual application must use a distinct immediate question');if(m.workshop.transfer&&(l.questionIds.includes(m.workshop.transfer.id)||l.delayedQuestionIds.includes(m.workshop.transfer.id)))throw Error('Individual transfer must be fresh');l.visualMission=m;const first=questionById.get(l.questionIds[0]);first.visualMission=m}
 return catalog
}
