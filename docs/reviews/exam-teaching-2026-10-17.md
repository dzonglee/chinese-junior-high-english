# Individual lesson exam-teaching review · 2026-10-17

APP-EXAM-LESSONS follows the owner's request to improve the learning inside each lesson,
with exam reasoning, useful feedback and shorter interactions. It covers all 413 existing
lessons. Original mock papers are a separate dependency, APP-MOCKS.

## Teaching changes

- **55 grammar lessons:** individually authored rule/trap contrasts, paired with the existing
  contextual tasks. Students distinguish a reliable method from a specific misconception.
- **35 reading and 31 text-only listening lessons:** build the question/evidence/conclusion
  chain, then locate evidence across the lesson's tasks. The new sequence does not ask students
  to memorise the first five passage sentences. Distractor work asks which option a specific
  exclusion reason actually rules out.
- **212 vocabulary lessons:** retain all 1,690 spelling workbenches and contextual tasks;
  add a short meaning/context clinic, using the actual lesson words and examples.
- **72 writing/speaking lessons:** manually authored sentence-role maps replace arbitrary
  evidence links. An incorrect sentence is rejected. Missing-information cases replace
  remembering a model's first sentence. The revision page uses two to four task-specific
  checks, separate from the detailed model analysis.
- **Eight written pronunciation lessons:** retain their authored sorting and add contextual
  diagnostic decisions. Written notation is still distinct from actual pronunciation.

The source tables are `content/teaching/grammar-exam.tsv`, `model-roles.json` and
`writing-checks.json`. The searchable JSON companion records every lesson's bindings,
coached questions, protected delayed questions and clinic decisions. Its structural audit
is not a claim of external editorial approval or a new official assessment specification.

## Corrections found during review

Open-ended tasks do not require the model's chosen bus journey, meeting venue, opinion,
family object or hometown memory. A checklist initially imposed some of these details;
review corrected it to the actual task requirements. The t11 family check now correctly
says younger brother. The t12 models explicitly include Sunday, and both t20 models now
state retaining photo provenance and checking dates, as their tasks require.

The first visual pass repeated model-analysis guidance beside eight self-check boxes.
The second pass separates those jobs and presents the short task checklist instead.
Questions and optional source materials remain available during diagnostic work.

## Implementation and evidence boundaries

Studios remain coached work: they create no independent attempts, mastery or lesson pass.
All immediate items are marked exposed; delayed checks remain protected. Writing checklists
are learner self-review, not semantic machine assessment. Listening audio remains pending.

Native metadata now uses its own async subpackage rather than filling the main package.
Startup has an explicit loading state and a retry path, and detached pages do not attach
late. The package limits are unchanged.

Verification records and their boundaries follow.

## Verified checks

- All **991** automated tests pass, including every lesson lifecycle, wrong evidence rejection,
  exposure boundaries, persisted progress and native startup recovery/detachment.
- All **413** lessons and both spelling variants pass the teaching audit; the JSON audit records
  **825** clinic decisions. Course coverage and package checks pass.
- Chromium lays out **3,303** lesson/clinic states and **1,962** assemblies at 320/390/768 pixels:
  **15,795** layouts. All 13 actual exploration flows pass. This run uses zero contact sheets;
  it is exhaustive layout verification, not a claim of 413 manual browser journeys.
- Separately rendered all **127** grammar/communication teacher clinics in **16** readable
  sheets. All 16 sheets were visually inspected. Four changed model visuals were rendered
  at three widths, captured and inspected. The final copy clarifies that deletion cases compare
  one reference expression; they do not require students to copy its details.
- Native job `3a3e77a3a55447ae91c6ee9ffb824df6`: **11** complete lesson flows, **45** captures,
  nested exit **0**, no simulator exceptions. Actual native controls check clinic switching,
  wrong-answer rejection/feedback, writing links and saved draft, evidence selection,
  sentence slots, tiles and pronunciation sorting. Both corrected theme pairs are included.
- Development and synthetic-cloud native adapters load all **245** checked topic packs.
  Recording-cancellation checks and release guards pass. These simulations are distinct
  from the actual DevTools evidence above.

The owner still needs approved audio and release prerequisites; no content is released.
This unit does not deliver mock papers or claim verified local exam coverage.

Native copy follow-up `7aeda37e77ec4bc5a2abc7a399a4552c` passes both communication flows on the final wording: eight captures, nested exit 0, no simulator exceptions. The updated native task/checklist screens were inspected.

The last native visual pass exposed an oversized diagnostic heading. The original task and
reference now sit together in the optional scrollable material; the diagnostic heading is
one short instruction. This keeps the task accessible without filling the first screen.

Compact-material follow-up `6b4d6b30ae484a05a961bb14a532b793`: one complete writing flow,
four captures, nested exit 0, no exceptions. The final native diagnostic screen was inspected.
