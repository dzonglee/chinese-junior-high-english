# 初中英语 · Local learning app and WeChat mini program

A working local English practice app for mainland junior-high students, with 413 original draft
lessons, 5,004 tasks and 1,690 distinct vocabulary headwords. Every lesson starts with a hands-on
studio: build an expression, choose evidence, sort examples or revise a draft. It includes illustrated answer feedback,
vocabulary review, reading, writing drafts, speaking self-review, a question builder, timed
practice, private questions, a mistake book, saved progress and backup import/export.

The whole-app interface now includes a focused Today page, compact searchable courses, a skill-based
practice grid, useful mistake states and a profile menu. First use takes three short steps.
See [UI comparison and evidence](docs/reviews/ui-2026-10-17.md) for the current verification boundary.

Every lesson now includes exam coaching: rule contrasts, passage evidence, vocabulary context
and task-specific writing revision. The **原创模拟卷** entrance offers eight original written
papers for grades 6–9, upper/lower terms: 25 questions, 60 minutes and 60 marks each. Save and
resume, flag questions, use the answer sheet, inspect section losses and return to the right lesson.
Objective marks (40) and writing awaiting human review (20) are kept separate. These are original
training papers; exact local exam formats and publisher-unit alignment remain unverified.
See [exam teaching](docs/reviews/exam-teaching-2026-10-17.md) and
[mock-paper verification](docs/reviews/mock-exams-2026-10-17.md).

## Run locally

Use Node 24 and the checked-in npm lockfile:

```bash
npm ci --no-audit --no-fund
npm run build:local
npm run dev
```

The development server listens on loopback port 4173. For a portable offline copy, open
`dist/local/index.html` in Chrome or Edge. That single file contains all 245 checked content packs,
the app code, styles, original Blender artwork and the inspected generated desk scene. It needs no account or cloud configuration.
See [local version instructions](docs/local-version.md) for saving progress and microphone support.

The complete original course covers 29 themes across reading, listening, speaking and writing,
58 grammar objectives, eight pronunciation-knowledge units and vocabulary with delayed checks.
Browse by grade, term, skill or theme, or search the full inventory. The sequence is authored by
this project; publisher-unit alignment and exact official vocabulary coverage are unverified.

Videos are deferred. The 99 listening scripts await approved audio; those 31 lessons offer text
preparation, while actual listening practice stays disabled. Content remains draft;
the app does not infer verified textbook adoption or local exam blueprints from the selected city.
The native WeChat implementation is included in `miniprogram/`; production configuration,
approved audio, real-device validation and editorial launch review remain future work.

Open a course card to **先动手学**. Each of the 413 studios uses five short stages: predict,
build, explore, diagnose and try a new task. Grammar has live sentence slots; vocabulary covers
all 1,690 spellings; reading uses source selection; pronunciation knowledge uses sorting; writing
and speaking preserve a student's first draft and guided revision. Longer references open on demand.
Progress saves locally and never counts as mastery or independent test evidence.

The separate **互动实验室** adds 13 workshops with 39 conditions, including a manipulable desk
scene. See [lesson studios](docs/lesson-studios.md) for coverage and native test instructions.

## Open in WeChat DevTools

After `npm run build`, import the repository root containing `project.config.json`.
The guest development project uses base library 3.8.0 and the native `miniprogram/` pages/components.
The packaged copy is `dist/english-wechat-development.zip`: extract it, then import its root.
No production AppID is included. See [native verification evidence](docs/reviews/teaching-2026-10-17.md).

## Validate changes

```bash
npm run check
npm run test:grammar
npm run check:course
npm run check:interactions
npm run check:teaching
npm run check:mocks
npm run test:mocks
npm run content:audit
npm run check:package
npm run test:native-adapter
npm run test:native-cancellation
npm run test:release-guards
npm run test:journeys
npm run test:local
npm run test:product-ui
npm run test:course-browser
npm run test:interactions
npm run test:teaching
node scripts/test-teaching-transfers.mjs
```

Browser checks need Chromium: use the installed `/usr/bin/chromium`, set `CHROMIUM_PATH`, or run
`npx playwright install --with-deps chromium`. Current results and the precise simulated/native
boundary are recorded in [validation evidence](docs/validation.md).

## Working on the project

Read [AGENTS.md](AGENTS.md), [the plan](docs/plan.md), [project memory](docs/project-memory.md),
[the board](docs/authoring/board.md) and the latest [handoff log](docs/authoring/log.md) first.
Follow the claim protocol; preserve other agents' work. The sister app is
`dzonglee/chinese-junior-high-maths`.

Research continues separately under [Stage 1](docs/stage1-resource-gathering.md).
`reference/` is a provenance/rights research corpus, never learner content. Neither full national
vocabulary coverage nor completion of the research integration gate is claimed.
