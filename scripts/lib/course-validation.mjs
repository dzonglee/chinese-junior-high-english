export function courseProblems(catalog, plan, coverage) {
  const errors = [], topics = new Map(catalog.topics.map(t => [t.id, t])), questions = new Map(catalog.questions.map(q => [q.id, q])), primary = new Set(catalog.lessons.flatMap(l => l.questionIds)), delayed = new Set(catalog.lessons.flatMap(l => l.delayedQuestionIds))
  const expect = (condition, message) => { if (!condition) errors.push(message) }
  expect(plan.themes.length === 29 && new Set(plan.themes.map(t => t.id)).size === 29, 'The original thematic plan must contain all 29 distinct units')
  expect(coverage.grammarObjectives.length === 58 && new Set(coverage.grammarObjectives.map(o => o.id)).size === 58, 'The grammar coverage inventory must contain all 58 distinct objectives')
  for (const objective of coverage.grammarObjectives) expect(objective.questionIds.length >= 2 && new Set(objective.questionIds).size === objective.questionIds.length && objective.questionIds.every(id => questions.get(id)?.skill === 'grammar' && (primary.has(id) || delayed.has(id))), `Missing executable grammar anchors: ${objective.id}`)
  for (const theme of plan.themes) for (const skill of plan.requiredThemeSkills) {
    const t = catalog.topics.find(t => t.course?.themeId === theme.id && t.skill === skill)
    expect(t && t.course.grade === theme.grade && t.course.term === theme.term && catalog.lessons.some(l => l.topicId === t.id), `Missing ${skill} lesson for ${theme.id}`)
  }
  for (const topic of catalog.topics) {
    expect(catalog.lessons.some(l => l.topicId === topic.id), `Topic has no full lesson: ${topic.id}`)
    expect(topic.course && [6, 7, 8, 9].includes(topic.course.grade) && ['upper', 'lower'].includes(topic.course.term), `Missing original course stage: ${topic.id}`)
  }
  const paperItems=new Set((catalog.mockPapers??[]).flatMap(p=>p.sections.flatMap(s=>s.questionIds)))
  for (const q of catalog.questions) expect(primary.has(q.id) || delayed.has(q.id) || paperItems.has(q.id), `Question is outside the lesson course: ${q.id}`)
  expect(catalog.vocabulary.length >= plan.vocabularyMinimum && new Set(catalog.vocabulary.map(w => w.word.toLocaleLowerCase('en'))).size === catalog.vocabulary.length, `Vocabulary must contain at least ${plan.vocabularyMinimum} distinct headwords`)
  for (const word of catalog.vocabulary) {
    expect(primary.has(`q-${word.topicId}-${word.id.slice(5)}`) && delayed.has(`q-${word.topicId}-${word.id.slice(5)}-meaning`), `Vocabulary has no immediate and delayed check: ${word.id}`)
    expect(new RegExp(`\\b${word.word}\\b`, 'i').test(word.example), `Vocabulary example cannot mask its target: ${word.id}`)
  }
  for (const id of coverage.pronunciationTopics) expect(topics.has(id) && catalog.lessons.some(l => l.topicId === id), `Missing pronunciation-knowledge unit: ${id}`)
  for (const q of catalog.questions) {
    expect(q.source.kind === 'original' && q.review === 'draft', `Course authorship/review must remain original draft: ${q.id}`)
    if (q.skill === 'listening') expect(catalog.media.some(m => m.id === q.mediaId && m.transcript === q.passage), `Listening transcript is inconsistent: ${q.id}`)
  }
  return errors
}
