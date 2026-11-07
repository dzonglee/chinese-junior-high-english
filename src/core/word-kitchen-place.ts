/** Source-specific noun/place conditions; diagrams do not establish completed actions. */
export interface WordKitchenPlace { title:string; hint:string; wrong:string; kind:'sink'|'plate' }
const bound=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordKitchenPlace(v:unknown):v is WordKitchenPlace {
 if(!v||typeof v!=='object'||Array.isArray(v))return false
 const w=v as WordKitchenPlace
 return Object.keys(w).length===4&&Object.keys(w).every(k=>['title','hint','wrong','kind'].includes(k))&&['sink','plate'].includes(w.kind)&&bound(w.title,60)&&bound(w.hint,110)&&bound(w.wrong,140)
}
export const wordKitchenPlaceKey=(id:string)=>'workshopKitchenPlace-'+id
function plateState(raw:string){
 if(raw==='')return{clean:'?',place:'?'}
 const m=/^(\?|clean|dirty)\|(\?|rack|beside)$/.exec(raw)
 return m&&raw!=='?|?'?{clean:m[1],place:m[2]}:null
}
export function changeKitchenPlace(w:WordKitchenPlace,raw:string,action:string):string|undefined {
 if(action==='reset')return''
 if(w.kind==='sink')return['','inside','beside','sinking'].includes(raw)&&['inside','beside','sinking'].includes(action)?action:undefined
 const s=plateState(raw);if(!s)return undefined
 if(['clean','dirty'].includes(action))return action+'|'+s.place
 if(['rack','beside'].includes(action))return s.clean+'|'+action
 return undefined
}
export const kitchenPlaceMatch=(w:WordKitchenPlace,raw:string)=>raw===(w.kind==='sink'?'inside':'clean|rack')
export function wordKitchenPlaceView(w:WordKitchenPlace,raw:string){
 const sink=w.kind==='sink',valid=sink?['','inside','beside','sinking'].includes(raw):!!plateState(raw),state=valid?raw:'',s=plateState(state)??{clean:'?',place:'?'}
 const choices=(ids:string[],labels:string[],selected:string)=>ids.map((id,j)=>({id,label:labels[j],selected:id===selected}))
 const groups=sink?[{label:'这里的意思是？',choices:choices(['inside','beside','sinking'],['在水槽里','在水槽旁','下沉的动作'],state)}]:[{label:'盘子状态？',choices:choices(['clean','dirty'],['干净','脏的'],s.clean)},{label:'要放在哪里？',choices:choices(['rack','beside'],['在沥水架上','在沥水架旁'],s.place)}]
 const reading=sink?(state===''?'先选一种解释；问号不是已完成清洗。':state==='inside'?'in the sink指在水槽里；这里只模拟洗蔬菜的位置要求。':state==='beside'?'在旁边应说beside；不能替代in。':'the sink是地点名词，不是下沉这个动作。'):(s.clean==='?'||s.place==='?'?'盘子状态和位置都要选；不推断已经放好或干透。':s.clean==='dirty'?'clean要求干净盘子，不能改成脏盘子。':s.place==='beside'?'on the drying rack要求放在架上，不是旁边。':'干净盘子、放在沥水架上，两条要求都保留了。')
 return{title:w.title,hint:w.hint,kind:w.kind,state,clean:sink?'?':s.clean,place:sink?state:s.place,objectLeft:sink?(state==='beside'?82:38):(s.place==='beside'?80:38),groups,reading}
}

export type WordKitchenPlaceView=ReturnType<typeof wordKitchenPlaceView>
