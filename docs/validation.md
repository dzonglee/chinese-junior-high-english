# Validation evidence · 2026-10-16

The application runs in the development environment. These checks establish the development
behavior below; they do not establish native release or publication.

| Check | Observed result |
| --- | --- |
| Locked setup script | Node 24; npm ci; Git LFS pull/fsck and register checks pass |
| TypeScript and automated tests | 73 tests pass across core, storage, controller and release requirements |
| Content compiler/audit | 48 topics, 34 lessons, 368 original draft questions, 96 vocabulary entries |
| Blender artwork | Three original transparent assets rendered with Blender 4.3.2 |
| Native adapter | Development subpackage and synthetic CloudBase API simulations pass |
| Native package structure | 24 routes, handlers and WXML tag structure pass static checks |
| Package budget | Approximately 771 KB main / 1,464 KB development total; below safety budgets |
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

Reproduce with the README commands. Current machine artifacts are `test-results/journeys/`,
`test-results/release-guards.json`, `dist/package-budget.json`, `dist/release-readiness.json` and
`dist/review/index.html`. Generated test artifacts are ignored; this document records what ran.
The owner must supply and verify the remaining requirements in `release-checklist.md`. Content
is still draft, the 96 words are not full national vocabulary coverage, and no research gate is
marked complete.
