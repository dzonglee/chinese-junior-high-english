import {tileIdsForText} from '../../src/core/tile-expression.mjs'
// Drive actual add/remove controls; never bypass assembly with a whole answer.
export function workshopExpressionActions(condition,value){
 if(!condition?.tiles)return [[condition?.input?'input':'choose',value]]
 const ids=tileIdsForText(condition.tiles,value,condition.tileMode??'words')
 if(!ids)throw Error('Test expression cannot be built from the authored tile bank')
 return [['tile-clear',''],...ids.map(id=>['tile-add',id])]
}
