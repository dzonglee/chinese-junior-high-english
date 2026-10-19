/** A preventive action can support a goal without proving that a future outcome happened. */
export interface WordProvision {title:string;goal:string;hint:string;wrong:string}
export interface WordProvisionView {title:string;goal:string;hint:string;choice:string;packed:boolean;chosen:boolean;bottleStyle:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordProvisionKey=(id:string)=>`workshopProvision-${id}`
export function validWordProvision(value:unknown):value is WordProvision {if(!value||typeof value!=='object')return false;const w=value as WordProvision,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max;return text(w.title,40)&&text(w.goal,70)&&text(w.hint,110)&&text(w.wrong,140)}
export function changeProvision(action:string):string|undefined {return action==='reset'?'':action==='pack'||action==='leave'?action:undefined}
export function provisionMatches(raw:string):boolean {return raw==='pack'}
export function wordProvisionView(w:WordProvision,raw:string):WordProvisionView {const choice=raw==='pack'||raw==='leave'?raw:'',packed=choice==='pack';return{title:w.title,goal:w.goal,hint:w.hint,choice,packed,chosen:!!choice,bottleStyle:packed?'left:65%;':'left:18%;',reading:packed?'已把饮用水放进包里。这是预防口渴的准备，不是后来绝不会口渴的证明。':choice==='leave'?'水还留在桌上，没有按这条建议带水；也不能据此断定后来一定口渴。':'先决定是否把饮用水带上，再区分目的和已经发生的结果。',choices:[{id:'pack',label:'装进包里带上',selected:packed},{id:'leave',label:'留在桌上',selected:choice==='leave'}]}}
