# Local version · 2026-10-17

The owner's current milestone is a usable local app; videos come later. The local build includes
413 original draft lessons, 5,004 tasks, 1,690 distinct vocabulary headwords and all 245 topic packs. Artwork
includes three original Blender assets and three inspected AI-generated scenes authorized by
the owner; book positions and exact labels are rendered by code. No research documents are embedded.

The current [lesson review](reviews/lesson-workshops-2026-10-17.md) documents the redesigned
single teaching path and its checks. The earlier [maths comparison](reviews/lesson-quality-comparison-2026-10-17.md)
explains why the extra card-board layer was replaced. Fresh native validation is blocked by Mac
project-drive access; the local version is not a public-release approval.

## Use the app

Run `npm ci --no-audit --no-fund`, `npm run build:local`, then `npm run dev` from the repository
with Node 24. The server listens on loopback port 4173. Alternatively, copy `dist/local/index.html`
to a computer and open it in Chrome or Edge. To regenerate the two checked ZIP archives after a build,
run `python3 scripts/package-development.py`; it verifies CRCs and every archived source file. The standalone HTML contains its own code, styles,
illustrations and hash-checked questions; practice works with networking disabled.

Choose the student's city, school structure, grade, term and exact edition. The app keeps
unverified adoption and exam-format states visible. This original capability course is not yet
a verified textbook-by-unit course or exact official national vocabulary list.

Every course card opens one interactive lesson sequence. Change a grammar condition and test the
resulting expression; recall a word and write your own sentence; connect source evidence and
explain a conclusion; or plan and revise your own communication task. Vocabulary application
changes a detail in the learner's own sentence instead of repeating the worked blank. Reading
requires both an answer and evidence. The written phonetics models show how stress, grouping,
connections and pitch notation change. These do not measure actual speech or listening.

Writing follows the task's word/sentence limits. Original drafts and self-review are separate
from automatic form checks. Guided progress never creates mastery or independent attempts.
See [lesson studios](lesson-studios.md) for the skill coverage and
[current lesson review](reviews/lesson-workshops-2026-10-17.md) for screenshots and results.

The course covers all 29 thematic domains in reading/listening/speaking/writing, 58 grammar
objectives and eight written pronunciation-knowledge units. Every course task and word belongs to a
lesson with distinct delayed checks; the 200 new mock items are held separately. Use the 课程 tab to filter by skill/theme or search; expand
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

## Original written papers

Open 练习 → 原创模拟卷. Choose a grade/term and inspect the five sections before starting.
Eight original papers use 25 tasks, 60 minutes and 60 marks each. Save/resume preserves the
clock; the answer sheet supports flags and jumping. After submission, inspect section losses,
locate evidence, return to lessons and retry. A second essay draft preserves the exam answer.
Objective marks are out of 40; the 20 writing marks await human assessment. This self-authored
format is not a verified local exam blueprint. See [paper review](reviews/mock-exams-2026-10-17.md).

## What was verified

`npm run build:local` verifies pack hashes before embedding them. `npm run test:local` covers
offline lessons, legitimate grammar variants, saved progress, a real backup download, microphone
cancellation/storage failure through API doubles and small-screen layout. This cloud's managed
Chromium blocks direct `file://` navigation. The test respects that policy and serves the exact
standalone document over loopback, then disables networking during practice. Direct-file browser
navigation is therefore unvalidated on this machine; the runner also supports it where permitted.

The current visual revision passes 1,424 automated tests, including checked-pack practice, saved progress and distinct delayed
review for every lesson. Tests simulate listening playback only for lifecycle coverage; the real
app rejects missing audio. Seven grammar regressions, four native-source permission simulations,
11 full browser journeys, eight offline checks and six expanded-course browser checks pass.
All 4,804 course-task figures render without horizontal overflow at 320/390/768 widths;
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


## Visual revision verification

See [the visual lesson review](reviews/visual-lessons-2026-10-17.md) for current checks and screenshots.
This revision has browser and adapter evidence; its new actual WeChat DevTools control run is
blocked by unavailable MacStudioExternal file access. Previous native jobs establish earlier
builds only. Neither development archive is a production release.
