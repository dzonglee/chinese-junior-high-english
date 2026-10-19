/** Resolve registered formats consistently in browser and embedded offline builds. */
export function artworkUrl(name:string,embedded:Record<string,string>,formats:Record<string,string>):string {
 if(Object.prototype.hasOwnProperty.call(embedded,name))return embedded[name]
 const format=Object.prototype.hasOwnProperty.call(formats,name)?formats[name]:(name.startsWith('lesson-')||['desk-scene','class-photo'].includes(name))?'jpg':['types','exam_light','mistakes_light'].includes(name)?'webp':'png'
 return `/assets/${name}.${format}`
}
