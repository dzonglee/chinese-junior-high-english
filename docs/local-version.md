# Local version · 2026-10-17

The owner's current milestone is a usable local app; videos come later. The local build includes
413 original draft lessons, 4,804 tasks, 1,690 distinct vocabulary headwords and all 245 topic packs. Artwork
includes three original Blender assets and one inspected AI-generated desk scene authorized by
the owner; book positions and exact labels are rendered by code. No research documents are embedded.

## Use the app

Run `npm ci --no-audit --no-fund`, `npm run build:local`, then `npm run dev` from the repository
with Node 24. The server listens on loopback port 4173. Alternatively, copy `dist/local/index.html`
to a computer and open it in Chrome or Edge. The standalone HTML contains its own code, styles,
illustrations and hash-checked questions; practice works with networking disabled.

Choose the student's city, school structure, grade, term and exact edition. The app keeps
unverified adoption and exam-format states visible. This original capability course is not yet
a verified textbook-by-unit course or exact official national vocabulary list.

Every course card opens a five-stage hands-on studio. Build sentence tiles or spellings, insert
words into live sentence slots, select source evidence, sort pronunciation examples, or link model
sentences to one criterion before revising your own draft. One activity leads each screen; longer
references open when needed. All 413 lessons have this flow, with saved progress separate from
scored practice. See [lesson studios](lesson-studios.md) for the exact skill coverage.

The course covers all 29 thematic domains in reading/listening/speaking/writing, 58 grammar
objectives and eight written pronunciation-knowledge units. Every task and word belongs to a
lesson with distinct delayed checks. Use the 课程 tab to filter by skill/theme or search; expand
the additional filters for grade/term/status. Grades and terms describe this original sequence,
not a verified publisher progression.

Open 互动实验室 from 今日 or 课程, or choose 先动手探索 on a relevant course card. Thirteen
workshops provide 39 conditions to change, with prediction, a live sentence/scene, error diagnosis
and transfer. Progress survives navigation/restart and participates in backup/export/deletion;
it is exploratory practice, not independent evidence. Completed workshops lead to topic practice.
After reading feedback unlocks, 264 questions offer original-sentence evidence selection. Unsupported
or ambiguous evidence mappings are omitted. Timed and shared-passage reviews keep this hidden
until feedback is legitimately unlocked. Explanation reasons reveal one step at a time.

Students can complete lessons with illustrated feedback, review words and mistakes, save writing
drafts, build practice sets, use timed practice, create private questions, and inspect progress.
Local data stays in the current browser profile/origin. Use the backup export in 我的 before
clearing browser data, switching browsers or moving/renaming the HTML file; use import to restore.
Exported JSON contains learning data, not microphone audio. Browser file storage behavior varies;
the development server gives a stable origin for regular use.

Recording is optional and requires a supported browser, a secure context and microphone consent.
Use the local development server if the browser restricts recording from files. Recordings are
stored locally in IndexedDB, can be played/deleted in the app and remain self-review evidence,
never automatic speech scores. Denied/cancelled consent and storage failures do not create a
successful recording or learning attempt.

All 99 listening scripts are authored, but their audio is pending; the 31 listening lessons
offer text preparation; actual listening practice stays disabled. Written pronunciation knowledge is available and does not measure spoken ability. No audio model has been
selected and no video production is required for this local milestone. Native WeChat publication,
CloudBase deployment, device evidence and editorial approval are separate future work.

## What was verified

`npm run build:local` verifies pack hashes before embedding them. `npm run test:local` covers
offline lessons, legitimate grammar variants, saved progress, a real backup download, microphone
cancellation/storage failure through API doubles and small-screen layout. This cloud's managed
Chromium blocks direct `file://` navigation. The test respects that policy and serves the exact
standalone document over loopback, then disables networking during practice. Direct-file browser
navigation is therefore unvalidated on this machine; the runner also supports it where permitted.

All 989 automated tests pass, including checked-pack practice, saved progress and distinct delayed
review for every lesson. Tests simulate listening playback only for lifecycle coverage; the real
app rejects missing audio. Seven grammar regressions, four native-source permission simulations,
11 full browser journeys, eight offline checks and six expanded-course browser checks pass.
All 4,804 instructional figures render without horizontal overflow at 320/390/768 widths;
245 topic representatives and real app screens received visual review. This is bounded content
review, not editorial approval of every individual task. See [validation evidence](validation.md) for the boundaries and
[authoring guidance](content-authoring.md) before changing questions.

The October 16 review is a historical defect snapshot. Its bad-outcome probes are preserved;
current desired-behavior regressions replace them for verification. The local work fixes all
three requested areas: constrained grammar prompts and accepted equivalents, cancellation of
pending microphone starts, and invalidation of editorial approval after any catalog change.

The new studio review additionally covers all 413 lessons / 2,478 states at three widths, all
1,962 assembly boards and 13 real exploration-control flows. Fourteen original studio-only
transfer tasks have separate rendered reference checks; their subjective self-review is not
automatic writing or speech assessment. Actual WeChat simulator evidence is recorded separately
in validation.md; browser results alone never establish native compilation.

The complete UI is now redesigned around five clear main sections and three-step first use.
Courses show real lessons before optional advanced filters; practice uses skill tiles and a
simple builder. The [whole-app UI review](reviews/ui-2026-10-17.md) includes actual native screens
and the subsequent fresh-install and answer-control fixes.
