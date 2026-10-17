# Original written mock papers · 17 October 2026

## Learner outcome

The practice homepage now leads into eight fixed original papers, one per grade/term
from six upper through nine lower. Each has 25 new questions, 60 minutes and 60 marks.
Five sections cover language (8), cloze (10), reading (16), task reading (6) and writing
(20). Suggested section times total 55 minutes, leaving five for checking. Two reading
passages per paper provide distinct contexts. The eight essay models meet their word bands.

Learners see the declared format before starting, save/resume without resetting the
clock, flag questions and jump with a grouped answer sheet. Passage scrolling survives
timer updates. Answer feedback, models and writing criteria stay hidden until submission.
Expiry submits once; submissions lock the original answers. Section results distinguish
objective marks out of 40 from writing's 20 marks awaiting human assessment.

After submission, students label wrong causes, locate exact passage evidence, open a
relevant lesson and retry errors with assisted evidence. They can inspect the writing
criteria, learn the relevant writing method and write a separate second draft. Returning
from a lesson, correction or rewrite restores the original paper result and answers.

## Content and teaching review

All 200 questions are original and remain draft. They are reserved from lesson, delayed
and random-practice pools. Every item has a strategy, reasoned steps, specific wrong-answer
feedback, a pitfall and an explanatory visual. The audit JSON lists every paper and question.
The full catalog is 5,004 questions, 413 lessons, 245 topics and 1,690 vocabulary headwords.

Review corrected ambiguous article/preposition prompts, implausible distractors, a
photograph-date versus bridge-construction-date distinction, a two-variable boat experiment
and the explicit thickness comparison needed for a bridge inference. The volunteer survey
uses 24 + 18 − 10 = 32 distinct volunteers out of 40. Room counts are not misrepresented
as energy savings. Exact question identity and lesson/delayed overlap checks both report zero.
All 200 instructional diagrams were rendered at three widths; all thirteen sheets were
visually inspected, with changed diagrams checked again after the last wording edits.

## Verification

Type checking and the complete 1,006-test suite pass. The eight paper-controller journeys
exercise score arithmetic (33/40 with four deliberate errors), hidden feedback, restored
sessions/deadlines, flags, separate writing self-review, correction forks and immutable
original answers after a rewrite. Additional checks cover learner eligibility, reserved
question pools, expiry, cold result loading and whitespace-only unanswered responses.
Course, teaching, content and package audits pass. The native package contains 27 routes,
about 1,023 KB in main and 10,811 KB total, under the unchanged budgets.

Browser tests use actual controls for a complete 25-question paper, evidence selection,
lesson/correction returns and an essay rewrite. Explicit fixtures cover all eight preflights
at 320/390/768 px and a short deadline; they do not pretend to wait an hour. All 200 new
visuals render at three widths. Existing product, offline and connected journey checks
also passed during this implementation.

Native testing uses the official Tencent SDK and guest WeChat DevTools in the isolated
English project under the shared GUI lock. It restores the exact prior storage afterward.
Actual taps/typing exercise the paper entrance, flags/sheet/jump, short answer, writing,
save/resume, results, evidence and correction. Bulk objective answers use the actual app
controller. Submit confirmation uses the SDK deterministic modal response; no operating-
system overlay interaction, real-device behavior or production compilation is implied.

- `ea9c3e5a07364b1e9a6effa4e6ec5d6e`: eight full paper flows, 80 captures, nested exit 0,
  no simulator exceptions.
- `654c59d51feb4c21a657529d2a99118c`: two layout follow-ups, 21 captures, nested exit 0.
  Visual inspection exposed half-width paper cards and overlapping answer numbers despite
  the behavioral pass. These screenshots were not accepted as final polish.
- `a4878d77ac48414c84848289bef45587`: two corrected layout flows, 21 captures, nested exit 0,
  no exceptions. Geometry asserts now require full-width cards/report rows, five distinct
  number buttons per row and usable two-row footer controls. Final screenshots inspected.
- `09b6a701fbe2401a88052bc6ab53311e`: first paper including rewrite passed; the second
  profile transition produced a blank native route. The job failed and is not counted as a pass.

- `e488c89edbe54dd5acfbed150d21d11a`: isolated ninth-grade flow including a separate
  essay rewrite, 11 captures, nested exit 0, no exceptions.
- `de32c81ae1eb47adaeb5eb0604cab6d0`: final two-paper/profile-transition flows,
  21 captures, nested exit 0, no exceptions. Both include a second essay draft and assert
  the submitted essay/score are unchanged. Native binding now also runs at component
  readiness and recovers an initially blank frame once its route becomes current; a focused
  regression covers that ordering without resetting a valid active form.

One local test run overlapped content regeneration and failed on temporary missing generated
files; rebuilding and running serially passed all 1,005 before the final binding regression was added. Redundant concurrent runs hit five-second resource timeouts in catalog-heavy fixtures;
the isolated native file passed, and final full verification uses one test-file worker
without Chromium contention. The new binding fixture initially omitted the app open-event
emission; its fixture was corrected before final verification. No timeout, assertion or package budget was weakened.

## Boundaries

These are explicitly original written capability/term training papers, not verified city
mock exams or an official local blueprint. Grade six is limited to the five-four structure;
future-year/term starts are gated. Exact publisher-unit and city alignment remain unverified.
No material is copied from reference. Writing is self/human reviewed, not automatically
semantically graded. Approved audio for 99 scripts, actual phones, production AppID/cloud,
editorial approval and publication remain separate. Nothing has been marked released.


## Reviewable artifacts

The current native entrance, preflight, answer sheet, section report and evidence review
are in `docs/screenshots/exam-2026-10-17/`. Download archives are
`dist/local-english-app.zip` and `dist/english-wechat-development.zip`. Both pass CRC and
entry-by-entry source comparison; exact archive hashes are in `mock-exams-evidence-2026-10-17.json`.
