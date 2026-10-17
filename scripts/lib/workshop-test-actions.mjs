// Test drivers only: exercise the authored control path instead of bypassing clause assembly.
export function workshopExpressionActions(condition,value){
 if(!condition?.tiles)return [[condition?.input?'input':'choose',value]]
 const available=condition.tiles.map((text,i)=>({text,id:String(i),used:false}))
 return [['tile-clear',''],...value.split(' ').map(word=>{
  const token=available.find(t=>!t.used&&t.text===word)
  if(!token)throw Error('Test expression cannot be built from the authored tile bank')
  token.used=true;return ['tile-add',token.id]
 })]
}
