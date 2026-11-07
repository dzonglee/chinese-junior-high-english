/** A labelled fictional coast compares inland with alongshore and seaward, without a real evacuation map. */
export interface WordInlandRoute {title:string;hint:string;wrong:string}
export interface WordInlandRouteView {title:string;hint:string;selected:string;direction:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
const ids=['inland','alongshore','seaward'],labels=['向内陆','沿海岸','朝海面']
export const wordInlandRouteKey=(id:string)=>`workshopInlandRoute-${id}`
export function validWordInlandRoute(v:unknown):v is WordInlandRoute {if(!v||typeof v!=='object')return false;const w=v as WordInlandRoute;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function inlandRouteMatch(raw:string):boolean{return raw==='inland'}
export function changeInlandRoute(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!ids.includes(raw))return undefined;return ids.includes(action)?action:undefined}
export function wordInlandRouteView(w:WordInlandRoute,raw:string):WordInlandRouteView {const selected=ids.includes(raw)?raw:'';return{title:w.title,hint:w.hint,selected,direction:selected==='inland'?'←':selected==='alongshore'?'↑':selected==='seaward'?'→':'?',reading:!selected?'先选移动方向，比较内陆、沿岸和朝海面。':selected==='inland'?'从海岸向陆地内部移动，符合move inland。':selected==='alongshore'?'沿海岸走没有表示向陆地内部移动。':'朝海面走与inland的方向相反。',choices:ids.map((id,i)=>({id,label:labels[i],selected:id===selected}))}}
