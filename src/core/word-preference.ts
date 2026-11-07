/** A preferred activity is separate from the activity used as its comparison. */
export interface WordPreference {title:string;hint:string;wrong:string}
export interface WordPreferenceView {title:string;hint:string;selected:string;preferred:string;comparison:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordPreferenceKey=(id:string)=>`workshopPreference-${id}`
export function validWordPreference(value:unknown):value is WordPreference {if(!value||typeof value!=='object')return false;const w=value as WordPreference;return [[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,max])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(max as number))}
export function preferenceMatch(raw:string):boolean{return raw==='walking'}
export function changePreference(raw:string,action:string):string|undefined {if(action==='reset')return'';if(!['','walking','waiting'].includes(raw))return undefined;return ['walking','waiting'].includes(action)?action:undefined}
export function wordPreferenceView(w:WordPreference,raw:string):WordPreferenceView {const selected=['walking','waiting'].includes(raw)?raw:'';return{title:w.title,hint:w.hint,selected,preferred:selected==='walking'?'步行':selected==='waiting'?'等拥挤的公交':'还没选择',comparison:selected==='walking'?'等拥挤的公交':selected==='waiting'?'步行':'还没选择',reading:selected==='walking'?'你的选择：更喜欢步行，而不是等拥挤的公交。':selected==='waiting'?'你的选择：更喜欢等拥挤的公交，而不是步行。':'点选原句中更喜欢的活动。',choices:[{id:'walking',label:'更喜欢步行'},{id:'waiting',label:'更喜欢等公交'}].map(c=>({...c,selected:c.id===selected}))}}
