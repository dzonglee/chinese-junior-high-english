import {it,expect} from 'vitest'
import {validWordQuantity,quantityCount,changeQuantity,wordQuantityView} from './core/word-quantity'
import type {WordQuantity} from './core/word-quantity'
const q:WordQuantity={title:'摆出鸡蛋',unit:'egg',pluralUnit:'eggs',limit:6,answer:4,shape:'egg',hint:'每份两个，准备两份。',wrong:'需要四个鸡蛋。'}
it('bounds exact quantities, distinguishes untouched from explicit zero and presents no answer flag',()=>{
 expect(validWordQuantity(q)).toBe(true)
 for(const raw of ['', '00','04','-0','-1','7','8','9','1.0','1 ',' 1','NaN'])expect(quantityCount(q,raw)).toBeUndefined()
 expect(quantityCount(q,'0')).toBe(0);expect(quantityCount(q,'4')).toBe(4)
 expect(changeQuantity(q,'','remove')).toBeUndefined();expect(changeQuantity(q,'','clear')).toBe('0');expect(changeQuantity(q,'','add')).toBe('1')
 expect(changeQuantity(q,'6','add')).toBeUndefined();expect(changeQuantity(q,'0','remove')).toBeUndefined();expect(changeQuantity(q,'4','remove')).toBe('3');expect(changeQuantity(q,'4','99')).toBeUndefined()
 expect(wordQuantityView(q,'').ready).toBe(false);expect(wordQuantityView(q,'0').ready).toBe(true)
 expect(wordQuantityView(q,'1').unit).toBe('egg');expect(wordQuantityView(q,'4').unit).toBe('eggs')
 expect(wordQuantityView(q,'4').units).toEqual([{id:'0'},{id:'1'},{id:'2'},{id:'3'}]);expect(wordQuantityView(q,'6').canAdd).toBe(false)
 expect(wordQuantityView(q,'4')).not.toHaveProperty('answer');expect(wordQuantityView(q,'4')).not.toHaveProperty('correct')
})
it('rejects unbounded, malformed or arbitrary image bindings',()=>{
 expect(validWordQuantity({...q,shape:'plant',unitArt:'count-unit-seedling'})).toBe(true)
 for(const bad of [null,{}, {...q,title:' '},{...q,pluralUnit:''},{...q,unit:' egg'}, {...q,limit:0},{...q,limit:9},{...q,answer:7},{...q,answer:-1},{...q,answer:1.5},{...q,shape:'unknown'},{...q,unitArt:'https://invalid.test/x.png'},{...q,shape:'plant'},{...q,shape:'plant',unitArt:'../assets/seedling'}])expect(validWordQuantity(bad)).toBe(false)
})
