import {expect,it} from 'vitest'
import {changeProvision,provisionMatches,validWordProvision,wordProvisionView} from './core/word-provision'
const task={title:'出发前，把饮用水带上',goal:'目的：避免口渴',hint:'准备和后来结果分开。',wrong:'按建议带水，不能说保证不会口渴。'}
it('models packing as preventive preparation without claiming a later bodily outcome',()=>{
 expect(validWordProvision(task)).toBe(true)
 for(const choice of ['pack','leave']){expect(changeProvision(choice)).toBe(choice);expect(provisionMatches(choice)).toBe(choice==='pack');const view=wordProvisionView(task,choice);expect(view.chosen).toBe(true);expect(view.packed).toBe(choice==='pack');expect(view.choices.filter(c=>c.selected).map(c=>c.id)).toEqual([choice]);expect(view.bottleStyle).toBe(choice==='pack'?'left:65%;':'left:18%;');expect(view.goal).toBe('目的：避免口渴');expect(view.reading).toContain(choice==='pack'?'不是后来绝不会口渴的证明':'不能据此断定后来一定口渴');expect('answer'in view).toBe(false)}
 expect(changeProvision('reset')).toBe('');expect(wordProvisionView(task,'').chosen).toBe(false);expect(wordProvisionView(task,'').packed).toBe(false);const view=wordProvisionView(task,'pack');view.choices[0].label='Changed';expect(wordProvisionView(task,'pack').choices[0].label).toBe('装进包里带上')
})
it('rejects forged states, unsupported actions and malformed preventive-task labels',()=>{
 for(const value of ['','pack ', ' pack','packed','pack:done','never-thirsty','1']){expect(provisionMatches(value)).toBe(false);expect(wordProvisionView(task,value).chosen).toBe(false);if(value)expect(changeProvision(value)).toBeUndefined()}
 for(const patch of [{title:''},{goal:' 目的'},{hint:'x'.repeat(111)},{wrong:'x'.repeat(141)}])expect(validWordProvision({...task,...patch})).toBe(false);for(const value of [null,undefined,[],true,'water'])expect(validWordProvision(value)).toBe(false)
})
