import {describe,it,expect} from 'vitest'
import {changeRobotWave,robotWaveMatch,validWordRobotWave,wordRobotWaveKey,wordRobotWaveView} from './core/word-robot-wave'
const w={title:'演示挥手',hint:'任选一只手臂。',wrong:'只演示一只手臂。'}
describe('single-arm robot demonstration',()=>{
 it('accepts either one-arm demonstration and rejects neither or both',()=>{expect(['','0:0','1:0','0:1','1:1'].map(robotWaveMatch)).toEqual([false,false,true,true,false]);expect(wordRobotWaveView(w,'1:0').reading).toBe('左臂在挥动，右臂不动');expect(wordRobotWaveView(w,'0:1').reading).toBe('右臂在挥动，左臂不动')})
 it('toggles each arm independently without imposing capability limits',()=>{let s='';s=changeRobotWave(s,'left')!;expect(s).toBe('1:0');s=changeRobotWave(s,'right')!;expect(s).toBe('1:1');s=changeRobotWave(s,'left')!;expect(s).toBe('0:1');expect(robotWaveMatch(s)).toBe(true);expect(changeRobotWave(s,'right')).toBe('0:0');expect(changeRobotWave(s,'reset')).toBe('')})
 it('rejects malformed states and actions without repairing arbitrary input',()=>{for(const raw of ['left','1:2',' 1:0','0:1 ','1:0:0']){expect(robotWaveMatch(raw)).toBe(false);expect(changeRobotWave(raw,'left')).toBeUndefined();expect(wordRobotWaveView(w,raw).left).toBe(false)}expect(changeRobotWave('','jump')).toBeUndefined();expect(wordRobotWaveKey('cute')).toBe('workshopRobotWave-cute')})
 it('clones views without mutating configuration or disclosing a required arm',()=>{const a=wordRobotWaveView(w,'1:0'),b=wordRobotWaveView(w,'1:0');a.arms[0].label='Changed';expect(b.arms[0].label).toBe('左臂');expect(w.title).toBe('演示挥手');expect(Object.keys(b).sort()).toEqual(['arms','hint','left','reading','right','title']);expect(b.arms.map(a=>a.selected)).toEqual([true,false])})
 it('requires trimmed bounded instructional copy',()=>{expect(validWordRobotWave(w)).toBe(true);for(const x of [null,{}, {...w,title:' padded '},{...w,hint:''},{...w,wrong:'x'.repeat(141)}])expect(validWordRobotWave(x)).toBe(false)})
})
