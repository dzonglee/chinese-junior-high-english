/** Plan comparable classroom setups; this model never predicts physical performance. */
export interface ComposeConditions {
 title:string
 hint:string
 wrong:string
 rows:{id:string;label:string;left:string;same:string;changed:string}[]
}
type ConditionChoice='same'|'changed'
const parse=(m:ComposeConditions,value:string):Partial<Record<string,ConditionChoice>>=>{
 try{
  const candidate:unknown=JSON.parse(value)
  if(!candidate||Array.isArray(candidate)||typeof candidate!=='object')return {}
  const entries=Object.entries(candidate)
  if(entries.some(([key,value])=>!m.rows.some(row=>row.id===key)||(value!=='same'&&value!=='changed')))return {}
  return Object.fromEntries(entries) as Record<string,ConditionChoice>
 }catch{return {}}
}
export const composeConditionsKey=(item:string)=>'composeConditions-'+item
export function validComposeConditions(value:unknown):value is ComposeConditions {
 if(!value||typeof value!=='object'||Array.isArray(value))return false
 const m=value as ComposeConditions
 return [m.title,m.hint,m.wrong].every(x=>typeof x==='string'&&!!x.trim())&&Array.isArray(m.rows)&&m.rows.length===3&&new Set(m.rows.map(row=>row?.id)).size===3&&['paper','gap','objects'].every(id=>m.rows.some(row=>row?.id===id))&&m.rows.every(row=>[row.label,row.left,row.same,row.changed].every(x=>typeof x==='string'&&!!x.trim())&&row.same!==row.changed)
}
export function composeConditionsMatch(m:ComposeConditions,value:string):boolean {
 const selected=parse(m,value)
 return m.rows.every(row=>selected[row.id]==='same')
}
export function composeConditionsView(m:ComposeConditions,value:string){
 const selected=parse(m,value)
 return {title:m.title,hint:m.hint,ready:composeConditionsMatch(m,value),chosen:Object.keys(selected).length,
  // Unselected is explicitly unknown, never silently drawn as a successful setup.
  paper:selected.paper??'unknown',gap:selected.gap??'unknown',objects:selected.objects??'unknown',
  rows:m.rows.map(row=>({...row,selected:selected[row.id]??'',right:selected[row.id]==='same'?row.same:selected[row.id]==='changed'?row.changed:'待设置',sameSelected:selected[row.id]==='same',changedSelected:selected[row.id]==='changed'}))}
}
export function changeComposeConditions(m:ComposeConditions,value:string,action:string):string|undefined {
 if(action==='reset')return '{}'
 const match=/^(paper|gap|objects):(same|changed|clear)$/.exec(action)
 if(!match||!m.rows.some(row=>row.id===match[1]))return undefined
 const selected=parse(m,value)
 if(match[2]==='clear')delete selected[match[1]]
 else selected[match[1]]=match[2] as ConditionChoice
 return JSON.stringify(selected)
}
