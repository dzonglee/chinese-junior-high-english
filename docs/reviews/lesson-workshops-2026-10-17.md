# Lesson workshop upgrade · 2026-10-17

The rejected extra answer-card introduction has been replaced by one connected lesson path.
Students make a prediction, work with a subject-specific model, apply the idea, correct an error
and try a fresh task. The full local application includes the homepage, course browser, review,
progress, settings and eight original written mock papers. This is a local development delivery;
fresh WeChat execution and public-release acceptance remain separate.

## What changed

| Lessons | Work the student does | What the model explains |
| --- | --- | --- |
| 55 grammar | Change two authored conditions, choose an expression and recover from a wrong choice | Counts, person, time, position, comparison, clause roles and word formation change visibly |
| 212 vocabulary | Recall each target word, write an original sentence, then change its situation | Context and spelling stay together; borrow/lend/return/bring/take also move an object in the relevant direction |
| 35 reading | Connect actual source excerpts, explain the conclusion and answer another question with evidence | A visible chain separates the question, accepted premises and conclusion |
| 31 transcript preparation | Distinguish proposals, agreement, corrected details and intention | Multiple premises are required when the answer depends on their combination; no listening credit is claimed |
| 72 writing/speaking | Plan task-specific information, compare a useful reference criterion, revise an original draft | The student's plan and before/after writing remain available; empty plans and undersized drafts cannot finish |
| 8 written phonetics | Change a sound, stress beat, phrase boundary, connection or pitch notation | The attempted notation is rendered, including the wrong state; no pronunciation measurement is claimed |

The explicit manifest is `content/teaching/workshops.json`: 413 lessons, 1,690 contextual word
items, 191 communication-plan items and 110 grammar conditions. It is authored through
`scripts/author-workshops.mjs`. The 66 evidence lessons have individual short reasoning notes in
`content/teaching/proof-reasons.json`, rather than repeating the quoted passage as feedback.

## Corrections made during review

- The canvas now displays the attempted expression. Choosing `are` no longer leaves `am` visible.
- Time/conditional clauses change the actual sentence and condition. Timelines show past/now/future;
  comparison bars share a scale; morphology uses parts + parts = word without splitting `classroom`.
- Prompts constrain the requested construction where other English forms could also be valid.
  Feedback does not call a valid alternative ungrammatical simply because it differs from the key.
- Evidence chains retain accepted premises after a wrong choice. Twelve chains require two clues:
  a proposal and agreement, a selected product and price, a question and polite refusal, an expected
  duration and actual duration, observation and testing, or a reference and its antecedent.
- Source explanations were corrected too: the original question no longer rejects those necessary
  supporting excerpts. Price reasoning acknowledges the valid money-left subtraction alternative.
- Reading checks require an answer and a source. Vocabulary application changes the student's own
  sentence instead of repeating the same cloze. Transfer questions stay out of guided examples.
- Writing checks enforce stated word bounds and sentence counts. Live counts explain what to fix.
  These are form checks; meaning, task fulfilment and usage remain explicit self-review.
- Stable item IDs preserve original drafts across content updates. Earlier phases can be revisited
  without clearing writing. Editing an answer invalidates its affected completion.
- Sound models render the actual stress beat, phrase boundary, connected speech and pitch curve.
  Unsupported gap/pitch symbols were replaced with legible labels or drawn marks.

## Review and verification

The review covered the first workshop panel of every lesson and both conditions of every grammar
model, followed by the completed grammar/evidence/sound/direction models. Render fixtures also
exercise every workshop item in initial, wrong and recovered/production states, plus every lesson's
application stage, at 320, 390 and 768 pixels. These are different kinds of evidence: a rendered
fixture is not a full learner journey, and a functional pass is not editorial approval.

The [checked-in results record](lesson-workshops-2026-10-17.json) and selected screenshots below preserve the final run. Full generated
captures remain under `test-results/workshops/` and `test-results/workshop-model-review/`.

- `npm run typecheck` and the serial core suite: 14 files, 1,448 tests passed.
- Course, teaching, mock, content and native-package static audits passed. All 826 spelling variants
  validate; eight papers contain 200 separate original items, each paper 60 marks / 60 minutes.
- Browser results: 22 complete lesson journeys, 6,608 rendered states at each of three widths
  (19,824 layouts), 13 exploration-control flows, six product checks, eight offline checks, eleven
  connected app journeys and six mock-exam journeys/audits. All eight paper preflights and 200 new
  paper visuals were checked. See the accompanying results JSON for scope and capture indexes.
- Native-adapter checks are controlled platform tests, not a WeChat compilation result.

No new scene image is being used as proof of teaching quality. Instructional geometry and exact
labels are rendered by code; previously inspected original scenes provide the visual setting.
No `reference/` text, question or media was copied. All learning content remains `draft`.

## Full-app screenshots

These are actual browser views. The writing examples are fictional learner drafts entered through
the controls for this walkthrough; they are not automatic judgments or real student results.

| View | Capture |
| --- | --- |
| Full homepage | [Home](../screenshots/lesson-workshops-2026-10-17/home.png) |
| Course entry | [Course list](../screenshots/lesson-workshops-2026-10-17/course.png) |
| Actual wrong verb on the canvas | [Wrong state](../screenshots/lesson-workshops-2026-10-17/grammar-wrong.png) |
| Changed condition and repaired expression | [Recovered state](../screenshots/lesson-workshops-2026-10-17/grammar-changed.png) |
| Borrow direction and original word use | [Word task](../screenshots/lesson-workshops-2026-10-17/word-direction.png) |
| Observation + testing support one conclusion | [Evidence task](../screenshots/lesson-workshops-2026-10-17/reading-evidence.png) |
| Original invitation plan | [Writing plan](../screenshots/lesson-workshops-2026-10-17/writing-plan.png) |
| Draft revision and explicit self-review | [Revision](../screenshots/lesson-workshops-2026-10-17/writing-revision.png) |
| Timed paper entry | [Mock papers](../screenshots/lesson-workshops-2026-10-17/mock-papers.png) |

## Delivery and remaining boundary

Open `dist/local/index.html` for the complete portable application, or extract
`dist/local-english-app.zip`. Import the extracted root of `dist/english-wechat-development.zip`
into WeChat DevTools for native validation. Archive CRC and exact source-entry comparisons are
recorded with the delivery results.

The Studio MCP connection works, and `wechat_status` confirms DevTools is installed. A fresh
`read_file` call for `wechat/AGENTS.md` still reports unavailable MacStudioExternal access. No new
GUI job was submitted and no new native compilation is claimed. The existing native Kanban card
has been reopened as blocked for this revision; earlier native screenshots cover earlier builds.
After drive access returns, read the shared GUI instructions, obtain its lock and run the current
`scripts/devtools-teaching.cjs` and product/mock checks against this exact package.

There are still 99 scripts awaiting approved audio. The 31 listening lessons are explicitly text
preparation. Real-device testing, full editorial approval, verified city/cohort examination mapping,
production configuration and publication are not part of this local sign-off. The maths comparison
remains the reference for useful manipulation and honest evidence; lesson counts do not prove
blanket parity or measured learning effectiveness. Videos remain deferred.
