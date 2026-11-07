/** A deliberately schematic obstruction model: no lunar phase, sky position, date or actual observation is represented. */
export interface ComposeOcclusion {title:string;hint:string;wrong:string}
export const composeOcclusionKey=(id:string)=>'composeOcclusion-'+id
export function validComposeOcclusion(x:unknown):x is ComposeOcclusion {
 if(!x||Array.isArray(x)||typeof x!=='object')return false
 const m=x as Record<string,unknown>,keys=['title','hint','wrong']
 return Object.keys(m).length===keys.length&&keys.every(k=>typeof m[k]==='string'&&!!(m[k]as string).trim()&&(m[k]as string)===(m[k]as string).trim()&&(m[k]as string).length<=({title:60,hint:110,wrong:140}[k as 'title'|'hint'|'wrong']))
}
export function composeOcclusionMatch(value:string):boolean {return value==='cover'||value==='clear'}
export function changeComposeOcclusion(_value:string,action:string):string|undefined {
 if(action==='reset')return ''
 if(action==='cover'||action==='clear')return action
 return undefined
}
export function composeOcclusionView(m:ComposeOcclusion,value:string){
 const selected=composeOcclusionMatch(value)?value:'unknown'
 return {...m,selected,chosen:selected!=='unknown',covered:selected==='cover',uncovered:selected==='clear',markerVisible:selected==='clear',modelReady:composeOcclusionMatch(value),reading:selected==='cover'?'示意云遮住了月球标记；模型中的标记没有被移走。':selected==='clear'?'示意云已移开，可以看到原位置的月球标记。':'请选择一种模型状态；这里尚未表示观察结果。',boundary:'这是遮挡示意，不表示真实月相、大小、位置或观测时间。现实中看不清，不能仅凭这一点断言月球消失。'}
}
