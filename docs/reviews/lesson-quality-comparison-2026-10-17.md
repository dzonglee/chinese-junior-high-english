# English lesson quality compared with Chinese maths · 2026-10-17

**English has not reached the teaching standard demonstrated by the maths lessons checked.**
The previous report overstated a broad interface pass as a complete lesson revamp. A script
materialized five reusable mission formats across the course, with 55 authored sentence switches.
That establishes coverage of the new mechanism. It does not establish 413 individually redesigned,
engaging lessons. The owner rejected that conclusion; APP-VISUAL-LESSONS is reopened.

The owner clarified that “Chinese app” means the Chinese maths app, not a third subject app.
The requested repository is cloned at `/workspace/chinese-junior-high-maths`, main `933ab32`.
English is compared at implementation `702ef77`, including the latest visual mission layer.

[Open the paired screenshot overview](lesson-quality-comparison-2026-10-17/overview.png). The
self-contained evidence viewer is also saved at `/workspace/lesson-comparison/index.html`.

## What was actually checked

Read the lesson contract and four maths lesson sequences: equation properties (`l-a01-props`),
direct proportion (`l-f02-direct`), probability (`l-d06-events`) and shortest paths
(`l-g14-jiangjun`). Read their balance, graph, probability and river components and the lesson
controller's diagnosis logic. Inspected thirteen existing native screenshots, including each
activity's starting, wrong/intermediate and recovered state plus the homepage. Every downloaded
PNG matches its Git LFS object hash. These are recorded native captures tracked by the maths
repository; no fresh maths GUI run is claimed.

Also ran fourteen existing proof-order, square-tile and number-line logic tests: all pass.
Inspected English's authoring script, mission engine, renderer, styles, grammar switches,
retained studio and earlier exploratory workshops. Captured fresh English grammar/reading wrong
paths, writing completion without personal text, and the following studio screen. The comparison
viewer contains four cases and 22 selectable frames; its controls browse evidence, not live apps.
Exact versions, hashes and probe results are in the [evidence file](lesson-quality-comparison-2026-10-17/evidence.json).

## Concrete differences

| Area | Maths observed | English observed | Gap to close |
| --- | --- | --- | --- |
| Manipulation | Remove a weight: the beam tilts and the equation changes. Repair both sides to restore equality. | Switch between two prepared sentences; choose a replacement card. | Let a learner manipulate the entities or sentence structure and see why meaning/form changes. |
| Discovery | Drag P, compare path lengths, then reveal the reflection that explains the minimum. | The new grammar switch immediately shows the completed sentence and explanatory note. | Require a prediction, useful exploration and an explanation connected to what changed. |
| Visual meaning | A curve, scale, path or bag is part of the mathematical relationship being learned. | Two new pictures are static scenery reused in 109 lessons. A class named `diagram-timeline` adds a bottom border. | Use a real event timeline, actor/object scene or sentence-structure model where it explains the English. |
| Error diagnosis | The wrong graph remains visible; feedback explains the effect of k. The wrong bag shows its actual counts and probability. | Most non-repair boards use a generic mismatch plus the same hint. One repair image contradicts its feedback. | Show the actual attempted state and explain the particular misconception. |
| Production | The sampled student constructs a bag composition, equation state or path. | The new email mission completes by matching model sentences to roles, with no original text entered. | Make an appropriate original utterance, explanation or revision part of a coherent writing lesson. |
| Lesson rhythm | Authored prediction, exploration, concept, diagnosis and guided exam work form one sequence. | After the added missions, a fresh learner enters the previous studio at phase zero. | Integrate the useful activities into one lesson instead of stacking another introductory sequence. |

The maths app also reuses components and includes choice/text steps. It is not automatically a
perfect app because it has more model kinds, and this review does not judge every maths lesson.
The advantage in these examples is that the student's action changes a model that explains the
subject, and the next teaching move uses that experience.

## Reproduced English problems

1. **Attempt and feedback disagree.** In `l-g-be`, the initial bad sentence uses `am`. Select
   `are`: the canvas still shows “Mia am ready…”, but feedback explains why `are` is wrong.
   `changeMission` only writes the placed card on a correct answer. The wrong attempted expression
   therefore never replaces the initial expression. [Actual capture](lesson-quality-comparison-2026-10-17/l-g-be-wrong.png).
2. **Irrelevant clue gets a generic warning.** For “What does Mia do after her snack?”, choose
   “Here is my new plan.” The feedback warns about nearby words or numbers rather than explaining
   that this sentence introduces the plan and contains no post-snack action.
   [Actual capture](lesson-quality-comparison-2026-10-17/l-r-course-t01-wrong.png).
3. **Writing mission completes with no writing.** Completed every new board in `l-w-email` while
   keeping all personal lines empty; the completion action is enabled. This is legitimate
   recognition practice, but insufficient evidence of a substantive writing lesson revamp.
   [Empty completed mission](lesson-quality-comparison-2026-10-17/email-completed-without-writing.png).
   The retained studio does separately request an original draft; this finding concerns the new layer.
4. **The added layer repeats the start.** After that completion, a fresh learner sees the old
   stage-zero draft/prediction screen. [Following screen](lesson-quality-comparison-2026-10-17/restarts-old-studio.png).
5. **Some “condition changes” only change emphasis.** `l-g-conditionals` and `l-g-time-clauses`
   display the same complete sentence in both states, with different highlighting. Useful annotation
   should be described as annotation, not evidence of a changed-condition language experiment.

Source locations: [authoring formats](../../scripts/author-visual-missions.mjs),
[mission checking and handoff](../../src/core/visual-mission.ts),
[mission rendering](../../web/visual-mission.ts), and [stage styles](../../miniprogram/app.wxss).
Of 1,002 new boards, 939 have no explicit per-wrong-choice reason map; those use the generic fallback.
This count describes this new layer, not the existing question explanations or all teaching feedback.

## What is useful, and what should happen next

Keep the functioning course/navigation, original questions, progress and delayed-evidence controls,
concealed spelling recall, saved drafts and original papers. The thirteen earlier workshops,
especially the coded object-placement desk scene, provide better starting points than another
course-wide card wrapper. Preserve the content that is correct while changing how it is taught.

First author complete exemplars in grammar, contextual vocabulary, reading reasoning and writing.
For example: move objects and change number/perspective before building a sentence; act out
borrow/lend/return and describe who gives what to whom; connect a claim to source evidence and
reject a plausible inference; plan, write and revise an invitation for a changed audience or constraint.
Keep generation away from exact instructional facts. Do not fabricate semantic writing/speech scores.

An exemplar needs an understandable task, meaningful learner action, a visual consequence,
error-specific recovery and a fresh exam-style transfer. Review its initial, wrong, recovered and
transfer screens. Then review each remaining lesson against its actual skill and misconceptions.
Neither unique decorative art for every lesson nor a larger interaction count is the acceptance criterion.

The existing 1,424 tests remain functional evidence. They did not assess whether the learning is
interesting or whether every visual state agrees with its feedback. The unavailable new native run
is a separate issue and does not explain the pedagogical gaps above. No course code changed during
this comparison, no maths files changed, and no content was released.
