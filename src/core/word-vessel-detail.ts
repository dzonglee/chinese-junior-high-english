/** Suitability and a crack's stated position are separate source-specific conditions. */
export interface WordVesselDetail{title:string;hint:string;wrong:string;kind:'bowl'|'cup'}
const bound=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordVesselDetail(v:unknown):v is WordVesselDetail{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordVesselDetail;return Object.keys(w).length===4&&Object.keys(w).every(k=>['title','hint','wrong','kind'].includes(k))&&['bowl','cup'].includes(w.kind)&&bound(w.title,60)&&bound(w.hint,110)&&bound(w.wrong,140)}
export const wordVesselDetailKey=(id:string)=>'workshopVesselDetail-'+id
const states=(w:WordVesselDetail)=>w.kind==='bowl'?['','deep','shallow','only']:['','near','far','absent']
export function changeVesselDetail(w:WordVesselDetail,raw:string,action:string):string|undefined{if(action==='reset')return'';return states(w).includes(raw)&&states(w).slice(1).includes(action)?action:undefined}
export const vesselDetailMatch=(w:WordVesselDetail,raw:string)=>raw===(w.kind==='bowl'?'deep':'near')
export function wordVesselDetailView(w:WordVesselDetail,raw:string){const state=states(w).includes(raw)?raw:'',bowl=w.kind==='bowl';const reading=bowl?(state===''?'先选深浅与用途关系；没有给实际深度。':state==='deep'?'深碗更适合和面；better for不是唯一用途。':state==='shallow'?'浅碗改变了deep，不能保留原句的比较。':'更适合不等于只能用来和面。'):(state===''?'先选裂纹位置；未知不等于没有裂纹。':state==='near'?'有小裂纹，且在把手附近；成因仍未知。':state==='far'?'far from与near相反，改变了裂纹位置。':'没有裂纹，改变了has a small crack。');return{title:w.title,hint:w.hint,kind:w.kind,state,bowlDepth:bowl&&state?(state==='shallow'?40:100):null,crackVisible:!bowl&&(state==='near'||state==='far'),crackLeft:!bowl&&state==='near'?61:!bowl&&state==='far'?30:null,choices:states(w).slice(1).map((id,j)=>({id,label:(bowl?['深碗，更适合和面','浅碗，更适合和面','深碗，只能和面']:['把手附近有小裂纹','小裂纹远离把手','没有裂纹'])[j],selected:id===state})),reading}}

export type WordVesselDetailView=ReturnType<typeof wordVesselDetailView>
