export interface ComposeBriefChoice {id:string;label:string}
export interface ComposeBriefField {id:string;label:string;choices:ComposeBriefChoice[];answer:string}
export interface ComposeMoney {title:string;note:string;selector:string;amounts:Record<string,number>;original:string;cost:number;single:number;quantity:number}
export interface ComposeBrief {title:string;hint:string;wrong:string;fields:ComposeBriefField[];paths?:{selector:string;answers:Record<string,Record<string,string>>};money?:ComposeMoney}
const text=(v:unknown):v is string=>typeof v==='string'&&v.trim().length>0
const id=(v:unknown):v is string=>typeof v==='string'&&v.trim()===v&&/^[a-z][a-z0-9-]{0,39}$/.test(v)
const obj=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v)
export function validComposeBrief(v:unknown):v is ComposeBrief {
 if(!obj(v)||Object.keys(v).some(k=>!['title','hint','wrong','fields','paths','money'].includes(k))||!text(v.title)||!text(v.hint)||!text(v.wrong)||!Array.isArray(v.fields)||!v.fields.length||v.fields.length>4)return false
 const seen=new Set<string>()
 const fieldsValid=v.fields.every(f=>{if(!obj(f)||Object.keys(f).some(k=>!['id','label','choices','answer'].includes(k))||!id(f.id)||seen.has(f.id)||!text(f.label)||!Array.isArray(f.choices)||f.choices.length<2||f.choices.length>3)return false;seen.add(f.id);const ids=new Set<string>();return f.choices.every(c=>{if(!obj(c)||Object.keys(c).some(k=>!['id','label'].includes(k))||!id(c.id)||c.id==='clear'||!text(c.label)||ids.has(c.id))return false;ids.add(c.id);return true})&&typeof f.answer==='string'&&ids.has(f.answer)})
 if(!fieldsValid)return false
 if(v.money!==undefined){
  const m=v.money,amount=(x:unknown):x is number=>typeof x==='number'&&Number.isInteger(x)&&x>0&&x<=30
  if(!obj(m)||Object.keys(m).some(k=>!['title','note','selector','amounts','original','cost','single','quantity'].includes(k))||!text(m.title)||!text(m.note)||!id(m.selector)||!id(m.original)||!obj(m.amounts)||!amount(m.cost)||!amount(m.single)||!amount(m.quantity)||m.quantity<2||m.quantity>5)return false
  const field=(v.fields as unknown as ComposeBriefField[]).find(f=>f.id===m.selector)
  if(!field||field.choices.length!==2||field.answer!==m.original||Object.keys(m.amounts).length!==field.choices.length||Object.keys(m.amounts).some(k=>!field.choices.some(c=>c.id===k))||!field.choices.every(c=>amount((m.amounts as Record<string,unknown>)[c.id])))return false
 }
 if(v.paths===undefined)return true
 const paths=v.paths;if(!obj(paths)||Object.keys(paths).some(k=>!['selector','answers'].includes(k))||!id(paths.selector)||!obj(paths.answers))return false
 const fields=v.fields as unknown as ComposeBriefField[],selector=fields.find(f=>f.id===paths.selector);if(!selector||selector.choices.length!==2)return false
 const branches=paths.answers as Record<string,unknown>,others=fields.filter(f=>f.id!==selector.id)
 if(Object.keys(branches).length!==selector.choices.length||Object.keys(branches).some(k=>!selector.choices.some(c=>c.id===k))||!others.length)return false
 return selector.choices.every(choice=>{const answers=branches[choice.id];return obj(answers)&&Object.keys(answers).length===others.length&&Object.keys(answers).every(k=>others.some(f=>f.id===k))&&others.every(f=>typeof answers[f.id]==='string'&&f.choices.some(c=>c.id===answers[f.id]))})
}
export const composeBriefKey=(itemId:string)=>`composeBrief-${itemId}`
function slots(c:ComposeBrief,raw:string):string[]|undefined {
 if(raw==='')return c.fields.map(()=>'_')
 if(raw.length!==c.fields.length||![...raw].every((n,i)=>n==='_'||/^[012]$/.test(n)&&Number(n)<c.fields[i].choices.length))return undefined
 return [...raw]
}
export function changeComposeBrief(c:ComposeBrief,raw:string,action:string):string|undefined {
 if(action==='reset')return ''
 const current=slots(c,raw);if(!current)return undefined
 const parts=action.split(':');if(parts.length!==2)return undefined
 const index=c.fields.findIndex(f=>f.id===parts[0]);if(index<0)return undefined
 const choice=c.fields[index].choices.findIndex(x=>x.id===parts[1]);if(choice<0&&parts[1]!=='clear')return undefined
 current[index]=parts[1]==='clear'?'_':String(choice);return current.join('')
}
export function composeBriefMatches(c:ComposeBrief,raw:string):boolean {
 const values=slots(c,raw);if(!values)return false
 if(!c.paths)return c.fields.every((f,i)=>values[i]!=='_'&&f.choices[Number(values[i])]?.id===f.answer)
 const index=c.fields.findIndex(f=>f.id===c.paths!.selector),choice=c.fields[index]?.choices[Number(values[index])]?.id
 if(!choice||values[index]==='_')return false
 const answers=c.paths.answers[choice];if(!answers)return false
 return c.fields.every((f,i)=>values[i]!=='_'&&(i===index||f.choices[Number(values[i])]?.id===answers[f.id]))
}
export function composeMoneyView(c:ComposeBrief,raw:string){
 const m=c.money;if(!m)return undefined
 const values=slots(c,raw),index=c.fields.findIndex(f=>f.id===m.selector),selected=values&&values[index]!=='_'?c.fields[index]?.choices[Number(values[index])]?.id:undefined
 const budget=selected?m.amounts[selected]:undefined,scale=Math.max(m.cost,m.single,...Object.values(m.amounts))
 const row=(id:string,label:string,amount:number|undefined)=>({id,label,amount,displayAmount:amount===undefined?'待选择':amount+'元',cells:Array.from({length:scale},(_,i)=>({id:String(i),filled:amount!==undefined&&i<amount}))})
 return {title:m.title,note:m.note,selector:m.selector,scale,selected:selected??'',budget,originalBudget:m.amounts[m.original],hypothetical:selected!==undefined&&selected!==m.original,rows:[row('budget',budget===undefined?'先选预算':selected===m.original?'原题预算':'假设预算',budget),row('single','单本总价',m.single),row('pack',`${m.quantity}本装总价`,m.cost)],reading:budget===undefined?'点上方预算，看看钱数怎样变化。':budget<m.cost?`买整包还差 ${m.cost-budget} 元。`:`买整包后剩 ${budget-m.cost} 元。`}
}
export function composeBriefView(c:ComposeBrief,raw:string) {const values=slots(c,raw)??c.fields.map(()=>'_');return {title:c.title,hint:c.hint,wrong:c.wrong,money:composeMoneyView(c,raw),fields:c.fields.map((f,i)=>({id:f.id,label:f.label,chosen:values[i]!=='_',reading:f.choices[Number(values[i])]?.label??'待选择',choices:f.choices.map((x,n)=>({...x,action:`${f.id}:${x.id}`,selected:values[i]===String(n)}))})),complete:composeBriefMatches(c,raw)}}
