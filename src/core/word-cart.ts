/** A fictional action demonstrates moved; it does not simulate physical quantities. */
export interface WordCart {title:string;hint:string;wrong:string}
export interface WordCartView {title:string;hint:string;chosen:string;moved:boolean;cartStyle:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordCartKey=(id:string)=>`workshopCart-${id}`
export function validWordCart(value:unknown):value is WordCart {if(!value||typeof value!=='object')return false;const w=value as WordCart;return [[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,max])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(max as number))}
export function cartMatch(raw:string):boolean{return raw==='push'}
export function changeCart(raw:string,action:string):string|undefined {if(action==='reset')return'';if(!['','push','wait'].includes(raw))return undefined;return ['push','wait'].includes(action)?action:undefined}
export function wordCartView(w:WordCart,raw:string):WordCartView {const chosen=['push','wait'].includes(raw)?raw:'';return{title:w.title,hint:w.hint,chosen,moved:chosen==='push',cartStyle:`left:${chosen==='push'?51:5}%`,reading:chosen==='push'?'已施力：空车移到了另一边。':chosen==='wait'?'这次选择没有施力，示意中的空车仍在原位。':'先选一个动作，看空车的位置怎样变化。',choices:[{id:'push',label:'施力推动车'},{id:'wait',label:'暂不施力'}].map(c=>({...c,selected:c.id===chosen}))}}
