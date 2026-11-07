# Run the local English app

All 413 lessons have a separate authored interactive sequence and an inspected individual review. The course contains 5,004 original draft tasks, 1,690 vocabulary entries and 245 content packs. Eight original written mock papers are included. See the [actual app screenshots and final review](reviews/individual-lessons/final-local-review-2026-11-07.md) and [per-lesson tracker](authoring/lesson-upgrades.md).

## Start locally

Use Node 24 and the checked-in lockfile:

```bash
npm ci --no-audit --no-fund
npm run build:local
npm run dev
```

Open `http://127.0.0.1:4173`. The development server serves the app and registered illustrations. The standalone build is `dist/local/index.html`; `dist/local-english-app.zip` contains the standalone files. Serve that folder over loopback for a stable browser origin. Direct `file://` navigation was blocked by this cloud browser and is not validated here.

To regenerate the local and WeChat development archives after a checked build:

```bash
python3 scripts/package-development.py
```

This checks CRCs, exact entry sets and every archived byte. Import `dist/english-wechat-development.zip` into WeChat DevTools for development; the root includes `project.config.json` and `miniprogram/`. Neither archive is a production release.

## Use the course

Choose the learner's city, school structure, grade, term and edition. Verification labels remain visible. The original sequence is not a verified publisher-by-unit course or a verified local exam blueprint.

Start at 今日, open 课程 and choose a lesson. Each lesson leads with a task: change a meaningful grammar condition, recall a word and use it, connect actual passage evidence, repair a sentence or plan and revise an original communication task. Feedback identifies the actual error. Diagrams and inspected generated scenes support observations and explanations; exact labels stay in code. Later transfer checks use a fresh context. Guided completion never creates mastery or independent attempts.

Open 练习 → 原创模拟卷. Each of eight papers contains 25 tasks worth 60 marks in 60 minutes. Save/resume preserves the timer; use flags and the answer sheet, inspect section losses, follow the relevant lesson and retry. Objective marks are out of 40; 20 writing marks await human assessment. A separate rewrite preserves the submitted exam answer.

The app also includes vocabulary review, a mistake book, private questions, drafts and backup import/export. Learning data belongs to the current browser profile/origin. Export a backup in 我的 before clearing data or changing browser/origin; microphone recordings are not included in exported JSON. Optional recording is local self-review, subject to browser consent and storage support, never automatic speech scoring.

## Verified scope and remaining work

All 413 lessons have individual review records. The final application run passes 2,820 core tests across 212 files, 292 complete offline checks, both complete 245-pack development/cloud adapter simulations, product navigation, all eight mock papers, current screenshot review, package limits and release guards. The [final checkpoint](reviews/individual-lessons/final-application-checkpoint.json) and [audit](reviews/individual-lessons/final-course-audit.json) preserve exact sources and boundaries. Offline tests serve the exact standalone document once and disable networking during practice. Browser and adapter results are separate from actual native compilation.

Historical WeChat SDK evidence reaches lesson 147 with 805 inspected captures. The final runtime has not received a fresh SDK run. Automatic approval review rejected the later development-source ZIP transfer for source-code egress permission; lessons 148–413 await explicit transfer permission. No alternative transfer or shared GUI job was attempted.

All 99 listening scripts are authored, but approved audio is pending; 31 listening lessons offer text preparation and do not claim listening practice. Written pronunciation activities do not assess speech. Physical devices, editorial/cohort mapping, research integration and production approval remain open. Videos are deferred. All content remains draft; nothing is released or published.
