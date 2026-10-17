# Validation evidence · 2026-10-17

The application runs in the development environment. These checks establish the development
behavior below; they do not establish native release or publication.

| Check | Observed result |
| --- | --- |
| Locked setup script | Node 24; npm ci; Git LFS pull/fsck and register checks pass |
| TypeScript and automated tests | 561 tests pass, including every lesson’s immediate/delayed controller and persistence lifecycle |
| Grammar assessment regressions | Seven source-only tests cover all 52 blanks and 38 corrections, explicit constraints, legitimate equivalents and invalid grammar |
| Native recording cancellation | Four actual-native-source simulations pass for privacy/microphone cancellation, late start and normal recording |
| Standalone local app | 10.12 MB; all 245 packs, three Blender assets and one generated scene embedded |
| Offline learner checks | Seven checks pass with networking disabled during practice; managed browser uses exact standalone document on loopback because file navigation is blocked |
| Running development service | Real app document and learner workflow bundle served on port 4173 |
| Content compiler/audit | 245 topics, 413 lessons, 4,804 original draft tasks, 1,690 distinct headwords |
| Blender artwork | Three original transparent assets rendered with Blender 4.3.2 |
| Native adapter | Development subpackage and synthetic CloudBase API simulations pass |
| Native package structure | 25 routes, handlers and WXML tag structure pass static checks |
| Package budget | Approximately 1,704 KB main / 10,101 KB development total; below safety budgets |
| Interaction content audit | 13 workshops / 39 conditions; exact-source evidence mapping for 264/298 reading tasks |
| Interactive browser checks | Eight pass; course-card links, all workshops practiced offline, scene movement/reload, evidence gating, progressive reasons and topic-practice handoff |
| Interaction visual review | All 36 sentence states, three scene positions and real reading locator inspected |
| Complete course coverage | 29 themes × four skills; 58 grammar objectives; eight pronunciation-knowledge units; no orphan tasks/words |
| Expanded-course browser checks | Six pass; inventory, reading, oral self-review, phonetics, vocabulary and pending audio |
| Complete figure layout | All 4,804 diagrams rendered at 320/390/768 widths with zero horizontal overflow |
| Visual review | All 245 topic representatives and four real app states inspected; not approval of every task |
| Chromium journeys | 11 complete journeys pass; zero browser page errors |
| Small screens | Reviewed 320, 390 and 768 widths without horizontal overflow |
| Editorial artifact | Search/skill filtering and answer/explanation expansion work without page errors |
| Release rejection | Missing prerequisites are rejected before modifying development artifacts |
| Audio preparation | Correctly stops with exit 2 before any request while owner source/model is unset |
| Actual release readiness | Not ready: AppID, CloudBase files, audio, native/device and owner approvals absent |

The browser journeys cover profile validation and structure changes; saved onboarding; wrong
answers and illustrated feedback; assisted retry; reload and lesson completion; early mistake
review; word recall and reveal; writing draft restoration and self-review; private-question
validation/practice; history and favourites; honest pending audio; reading filters; timed writing
focus and subjective review; timed navigation and auto-submission; browser recording, playback
and deletion; backup export, complete deletion including orphan audio, and onboarding restore.

The microphone input in Chromium is simulated. The native adapter runs the actual built CommonJS
runtime with deterministic WeChat API doubles, including real pack bytes/checksums without DOM
TextEncoder/TextDecoder. Neither check is WeChat DevTools compilation, native permission behavior,
real audio on a phone or a published experience build. Static WXML balance checks are also not
native compilation.

Recent correctness fixes include: same-device active-session/recording restoration; hash encoding
without browser-only APIs; answer peeks and hints across sessions; two-day retention spacing;
back-to-back overdue reviews; meaningful daily time targets; listening playback evidence; empty
exam answers; subjective-score separation; timed writing focus; UTF-8 backup size limits; import
recording retention; and complete deletion of orphaned audio.

The October 16 review findings are fixed in this local milestone: all free-response grammar
prompts now define their lexical/meaning constraints and accepted alternatives; suspended pending
recording starts are cancelled (or stopped against the original question); approval fingerprints
cover the full catalog, including edition/city/topic metadata. Browser microphone tracks are
also released if local recording storage fails. Regression tests check these desired outcomes.
The historical review probes intentionally reproduce bad outcomes in their snapshot and remain
historical evidence, not the current pass criteria.

Direct `file://` navigation was not verified in this managed browser; its administrator policy
blocks it. The standalone test uses ordinary loopback delivery, then disables networking during
practice. Cancellation and storage-failure checks use explicit browser API doubles. No managed
policy was disabled. Screenshots of the current home and valid-answer explanation were inspected.

Reproduce with the README commands. Current machine artifacts are `test-results/journeys/`, `test-results/local/`, `dist/local/index.html`,
`test-results/release-guards.json`, `dist/package-budget.json`, `dist/release-readiness.json` and
`dist/review/index.html`. Generated test artifacts are ignored; this document records what ran.
The owner must supply and verify the remaining requirements in `release-checklist.md`. Content
is still draft. The 1,690 original headwords are not an exact verified official list; publisher-unit
alignment and research gates remain incomplete. All 99 scripts/31 listening lessons await approved
audio. Written pronunciation knowledge does not verify pronunciation.

## Complete-course review

See [bounded course review](reviews/course-2026-10-17.md) for source-level corrections and visual
review scope. The lifecycle tests detected and corrected shared-passage feedback leaking later
review answers. Such reviews now store answers without exposing feedback or recording evidence
until submission, including after reload. Subjective work advances its practice schedule but
never becomes independent retention evidence. All 413 lesson lifecycles pass; listening playback
is synthetic only in those tests, while actual pending-audio lessons are tested as unavailable.
Contact-sheet captures use isolated pages and wait for fonts and two paint frames; the sheets were retaken and enlarged inspections confirmed intact text. Restoration explanations now use complete paragraphs rather than midword truncation.

## Interaction upgrade

The new checks exercise every workshop's incorrect prediction, required condition change,
incorrect/correct error diagnosis and transfer. Exploration progress survives local restoration
and backup import, while attempts, mastery and lesson completion stay unchanged. Invalid imported
progress is rejected atomically. Reading evidence and progressive reasons remain unavailable in
unsubmitted timed work and deferred shared-passage reviews. Existing learner/offline journeys
still pass. New test artifacts are in `test-results/interactions/`. The exact standalone document
is served over loopback; networking is disabled during workshop practice and restored only for
explicit document reload/navigation. This is not direct-file or native-device validation.

The maths comparison is a source-contract comparison at `933ab32`, not a native walkthrough.
Full per-lesson interactive teaching parity remains unverified and incomplete; the 13 workshops
are a reviewed foundation. Original course inventory counts are unchanged.

Editorial fingerprints now include hashes of the workshop/evidence sources, scene asset and
instructional renderer/geometry files. Editing this teaching content invalidates a prior approval;
no real approval was created. The source/asset hash audit passes.
