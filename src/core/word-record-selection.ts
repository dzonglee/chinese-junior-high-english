/** Select evidence from a bounded set of authored records. Empty requires an explicit choice. */
export interface WordRecordSelection {
 layout?:'people'|'objects';speakerId?:string;quote?:string
 title:string;prompt:string;rows:{id:string;label:string;text:string;object?:{shape:'bowl';colour:'blue'|'white'};include:boolean}[];hint:string;wrong:string
}
export interface WordRecordSelectionView {
 layout?:'people'|'objects';speaker?:{name:string;quote:string}
 title:string;prompt:string;hint:string;status:string;noneLabel:string;noneSelected:boolean
 rows:{id:string;label:string;text:string;initial:string;object?:{shape:'bowl';colour:'blue'|'white'};selected:boolean}[]
}
export const wordRecordSelectionKey=(id:string)=>`workshopRecordSelection-${id}`
export const noWordRecords='@none'
export function validWordRecordSelection(value:unknown):value is WordRecordSelection {
 if(!value||typeof value!=='object')return false
 const r=value as WordRecordSelection,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max
 return text(r.title,40)&&text(r.prompt,100)&&text(r.hint,100)&&text(r.wrong,160)
  &&Array.isArray(r.rows)&&r.rows.length>=2&&r.rows.length<=7
  &&r.rows.every(row=>!!row&&typeof row.id==='string'&&/^[a-z][a-z0-9-]{0,39}$/.test(row.id)&&text(row.label,30)&&text(row.text,100)&&typeof row.include==='boolean')
  &&new Set(r.rows.map(row=>row.id)).size===r.rows.length
  &&(r.layout==='people'?r.rows.some(row=>row.id===r.speakerId)&&text(r.quote,160):[undefined,'objects'].includes(r.layout)&&r.speakerId===undefined&&r.quote===undefined)
  &&r.rows.every(row=>r.layout==='objects'?!!row.object&&row.object.shape==='bowl'&&['blue','white'].includes(row.object.colour):row.object===undefined)
}
/** Canonical row order prevents duplicate, unknown or forged stored selections from passing. */
export function selectedWordRecords(r:WordRecordSelection,raw:string):string[]|undefined {
 if(raw===noWordRecords)return []
 if(!raw)return undefined
 const ids=raw.split('|'),canonical=r.rows.filter(row=>ids.includes(row.id)).map(row=>row.id)
 return canonical.join('|')===raw?canonical:undefined
}
export function wordRecordSelectionMatches(r:WordRecordSelection,raw:string):boolean {
 const ids=selectedWordRecords(r,raw)
 return ids!==undefined&&r.rows.every(row=>row.include===ids.includes(row.id))
}
export function toggleWordRecord(r:WordRecordSelection,raw:string,id:string):string|undefined {
 if(!r.rows.some(row=>row.id===id))return undefined
 const ids=selectedWordRecords(r,raw)??[],next=ids.includes(id)?ids.filter(x=>x!==id):[...ids,id]
 return r.rows.filter(row=>next.includes(row.id)).map(row=>row.id).join('|')
}
export function wordRecordSelectionView(r:WordRecordSelection,raw:string):WordRecordSelectionView {
 const ids=selectedWordRecords(r,raw)??[],noneSelected=raw===noWordRecords
 const speaker=r.layout==='people'?r.rows.find(row=>row.id===r.speakerId):undefined
 return {title:r.title,prompt:r.prompt,hint:r.hint,noneLabel:speaker?'没有符合的人':r.layout==='objects'?'没有符合的物品':'记录中没有这件事',noneSelected,...(speaker?{layout:r.layout,speaker:{name:speaker.label,quote:r.quote!}}:r.layout==='objects'?{layout:r.layout}:{}),
  status:noneSelected?(speaker?'已确认：没有符合的人':r.layout==='objects'?'已确认：没有符合的物品':'已确认：记录中没有这件事'):ids.length?(r.layout?'已选：'+r.rows.filter(row=>ids.includes(row.id)).map(row=>row.label).join('、'):`已圈出 ${ids.length} 条`):'还没有圈选',
  rows:r.rows.map(({id,label,text,object})=>({id,label,text,...(object?{object:{...object}}:{}),initial:label.slice(0,1).toUpperCase(),selected:ids.includes(id)}))}
}
