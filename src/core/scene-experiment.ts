import type { Experiment } from './experiments'

/** Object placement is deterministic; the generated backdrop contains no answers or labels. */
export const sceneExperiment: Experiment = {
  id: 'desk-scene', title: '搬一搬：书在哪里？', topicId: 'g-prepositions', grade: 6,
  question: '先看图。书放在桌子上面，和桌面接触。应该用哪个词？',
  prediction: { options: [{ id: 'on', text: 'on' }, { id: 'under', text: 'under' }, { id: 'beside', text: 'next to' }], correct: 'on', reason: '书与桌面接触，用 on。只表示在上方而不接触时，不能据此选 on。' },
  conditions: [
    { id: 'on', label: '放到桌上', sentence: 'The book is on the desk.', parts: [{ text: 'The book ', role: 'subject', note: '位置发生变化的物品' }, { text: 'is ', role: 'verb', note: '单数主语搭配 is' }, { text: 'on the desk.', role: 'object', note: 'on 表示在表面上并接触' }], explanation: '书落在桌面上。位置关系是接触桌面，用 on。' },
    { id: 'under', label: '移到桌下', sentence: 'The book is under the desk.', parts: [{ text: 'The book ', role: 'subject', note: '仍是同一本书' }, { text: 'is ', role: 'verb', note: '主语没有变化，is 不变' }, { text: 'under the desk.', role: 'object', note: 'under 表示在桌子下方' }], explanation: '书移到了桌面下方。主语和 be 动词不变，位置短语改成 under the desk。' },
    { id: 'beside', label: '移到旁边', sentence: 'The book is next to the desk.', parts: [{ text: 'The book ', role: 'subject', note: '同一个物品' }, { text: 'is ', role: 'verb', note: '单数主语仍用 is' }, { text: 'next to the desk.', role: 'object', note: 'next to 表示紧挨着、在旁边' }], explanation: '书在桌子的旁边，不在桌面上，也不在桌子下面。next to 表示这一相邻关系。' }
  ],
  discovery: '物品和主语没有变化时，只改变位置短语，就能准确表达新的位置。先观察两个物体的关系，再选介词。',
  spot: { prompt: '老师把书放到了桌子下方。一位同学写 The book is on the desk. 哪一处需要改？', options: [{ id: 'subject', text: 'The book ' }, { id: 'verb', text: 'is ' }, { id: 'position', text: 'on the desk.' }], correct: 'position', reasons: { subject: '仍是同一本书，主语没有错。要检查的是物品之间的位置关系。', verb: 'The book 是单数，is 正确。不要改动没有问题的部分。', position: 'on the desk 应改成 under the desk，才与“在桌子下方”的位置一致。' } },
  transfer: { prompt: '换成一支铅笔：它放在盒子的表面上，和盒面接触。哪句话准确？', options: [{ id: 'under', text: 'The pencil is under the box.' }, { id: 'on', text: 'The pencil is on the box.' }, { id: 'next', text: 'The pencil is next to the box.' }], correct: 'on', reasons: { under: 'under 是在下方，题目描述的是与盒面接触。', on: 'on the box 准确表达与盒子表面接触的位置关系。换了物品，判断方法不变。', next: 'next to 是在旁边，不能表达放在盒子表面上。' } }
}
