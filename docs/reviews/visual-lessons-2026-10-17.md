# Visual lesson revision · 2026-10-17

All 413 lessons now open a lesson-specific visual task before the existing five-stage studio.
This implements the owner's request for pictures and more manipulation in each lesson. It is
an original local teaching revision; actual native acceptance of this revision is still blocked.

## What students do

| Lesson mode | New interaction | Scope |
| --- | --- | --- |
| Grammar | Change a subject/time/logic condition, observe the highlighted sentence, then repair an expression | 55 lessons, 55 authored two-condition experiments |
| Vocabulary | Send word cards into contextual slots, then conceal the cards and spell from recall | 212 lessons, all 1,690 headwords |
| Reading | Connect the exact source clue to a question; unlock its conclusion after a correct choice | 35 lessons |
| Transcript preparation | Connect written source clues, with no listening claim | 31 lessons |
| Writing and speaking preparation | Identify each model sentence's purpose and save an original version per frame | 72 lessons |
| Written pronunciation knowledge | Sort examples into explicit categories; intonation uses coded pitch arrows | Eight lessons; no speech scoring |

The explicit manifest contains 1,002 boards and 2,202 slots, at most three slots per board.
Tasks are drawn only from immediate lesson material. Delayed checks and the 200 mock-paper items
remain separate. Practice completion creates no independent attempt, mastery or lesson pass.
A model sentence is one reference, never the only valid personal response. Personal frame text
survives navigation, reload and teaching-fingerprint invalidation without preserving stale scores.

Two newly generated scenes support school/community and science/workshop contexts. The originals
and converted assets were visually inspected; provenance, hashes, conversion and permission are
in `content/visual-assets.json`. Exact task clues and diagrams are coded. Generated scenery is
illustrative, not evidence for a passage or a verified factual location.

## Review and validation

Every lesson/board/slot and all 110 grammar conditions were rendered in teacher sheets. All
35 sheets and both generated originals were inspected. Exhaustive student-view fixtures cover
2,312 states at 320, 390 and 768 pixels (6,936 layouts). Actual sampled control flows cover each
board type, condition switching, saved completion, recall wrong/correct paths, saved original
writing and the unscored handoff into the existing studio. Browser evidence is kept separate
from the prepared native runner. Final check results are recorded in the adjacent JSON report.

Visual review fixed excessive whitespace, a wrapped footer label and unreliable font arrows.
Learning-state review fixed recall-answer exposure, ambiguous vocabulary constraints, stale
feedback after changing slots, fractional imported indices and skipping unfinished boards.
Spelling conversion now changes instructional text while preserving source/control IDs.
A full-catalog compact-code round trip was fixed to preserve optional lesson missions; native
metadata still omits them, loading the actual mission lazily from the checked question pack.
Large generated pack moves reflect that grouping change; package budgets were not increased.

Initial parallel core runs exceeded original test timeouts; the model no longer duplicates
mission data inside its question copies and caches immutable teaching models. A later serial
spelling audit also exceeded its timeout; spelling dictionaries are now built once instead of
for every text field. The serial full
suite uses the existing timeouts. Initial localhost browser execution was sandbox-blocked; the
same local test passed using the supported execution permission. No assertion was weakened. The first offline regression incorrectly tried to choose the study
path a second time after that choice was already restored. It now checks the saved phase and
selected tile directly, without requiring a button from the initial mission screen. Existing
phase-specific browser fixtures explicitly select the retained study path.

## Native limitation and next action

The existing authenticated Studio connection works for Obsidian and Kanban. Its file tools
report **MacStudioExternal file access unavailable**; archive transfer returned HTTP 400.
The read-only file check was repeated after implementation and still failed. No native job
for APP-VISUAL-LESSONS was submitted, no shared WeChat GUI was changed and no compilation or
native-control success is inferred from an upload attempt. Older native jobs prove older builds.

Once remote file access returns, read `wechat/AGENTS.md`, coordinate the shared GUI through the
existing Kanban card and `wechat/DEVTOOLS.lock`, sync the exact reviewed development package and
run `scripts/devtools-visual-lessons.cjs`. Inspect the job's actual nested exit status, saved
results and screenshots; check touched controls in both spelling variants before native acceptance.
The prepared runner restores its previous local test storage and acts only on the isolated
English guest project. It is not production upload or publication.

## Delivery boundary

The feature branch is `author/visual-lessons`; APP-VISUAL-LESSONS remains under review until
native checks can run. The local offline and WeChat development archives contain this revision.
All content remains draft. Approved audio, real-device evidence, exact publisher/city mappings,
production AppID/cloud configuration and editorial launch approval remain separate existing gaps.
