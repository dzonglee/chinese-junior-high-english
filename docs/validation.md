# Validation evidence · 2026-10-17

The application runs in the development environment. These checks establish the development
behavior below; they do not establish native release or publication.

| Check | Observed result |
| --- | --- |
| Locked setup script | Node 24; npm ci; Git LFS pull/fsck and register checks pass |
| TypeScript and automated tests | 90 tests pass across core, storage, controller and release requirements |
| Grammar assessment regressions | Seven source-only tests cover all 52 blanks and 38 corrections, explicit constraints, legitimate equivalents and invalid grammar |
| Native recording cancellation | Four actual-native-source simulations pass for privacy/microphone cancellation, late start and normal recording |
| Standalone local app | 1.64 MB; all 48 hash-checked packs and three original Blender assets embedded |
| Offline learner checks | Seven checks pass with networking disabled during practice; managed browser uses exact standalone document on loopback because file navigation is blocked |
| Running development service | Real app document and learner workflow bundle served on port 4173 |
| Content compiler/audit | 48 topics, 34 lessons, 368 original draft questions, 96 vocabulary entries |
| Blender artwork | Three original transparent assets rendered with Blender 4.3.2 |
| Native adapter | Development subpackage and synthetic CloudBase API simulations pass |
| Native package structure | 24 routes, handlers and WXML tag structure pass static checks |
| Package budget | Approximately 772 KB main / 1,475 KB development total; below safety budgets |
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
is still draft, the 96 words are not full national vocabulary coverage, and no research gate is
marked complete.
