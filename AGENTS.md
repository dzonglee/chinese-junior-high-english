# Working instructions

WeChat mini program for mainland Chinese junior-high English (初中英语): textbook-synced lessons
plus exam-focused drilling for 中考英语 (listening, speaking, reading, language use and writing).
It is the sister app of `dzonglee/chinese-junior-high-maths` and must reach the same standard. Read
`README.md`, then `docs/plan.md`. **The project is in Stage 1, resource gathering:** start at
`docs/stage1-resource-gathering.md` and `docs/authoring/board.md`.

## Standing requirements (all stages)

- **Exam realism comes from the learner's own facts.** Everything exam-related comes from the
  learner's city, structure (六三/五四), grade and textbook edition. Keep verification states visible
  (`official` / `reported` / `unverified`). Never splice textbook editions, never extrapolate a
  capital's paper to its province, and apply reforms (new 2024 textbooks, new 听说 formats, new
  marks) only to the cohorts they affect.
- **Public access ≠ commercial permission.** `reference/` is read-only research. Never ship texts,
  passages, audio, questions, answers or rubrics copied from it. Later stages author original items
  or use licensed sources.
- **Never bypass** paywalls, logins, captchas, encryption or copy protection. Record the block and
  move on.
- **Interactive learning first** (from Stage 3). Lessons lead with a task the student does
  (listen-and-choose, shadow-read, reorder, fix-the-sentence, 你来批改), with immediate, specific
  feedback. Only first-try answers count as independent evidence; never call completion mastery.
- **Every item teaches.** Every question, original or user-made, carries an illustrated,
  step-by-step explanation a student can learn from alone. That means:
  - a 思路 (what to notice, which rule or strategy);
  - one move per step with its reason (the grammar rule, the clue in the passage, the line in the
    transcript);
  - why each wrong option is wrong;
  - the specific pitfall;
  - a picture where a picture is the explanation (sentence-structure diagrams, timelines for
    tenses, the passage with the evidence highlighted, the transcript with the key words marked).

  The standard matches the maths app's EXPL standard (`docs/content-model.md` there) and is
  enforced by the compiler.
- **Visual direction: bold, but usable**, as in the maths app (`docs/design-system.md` there): art
  only from the Blender pipeline, never AI-generated images; no neo-brutalism, beige or yellowish
  grounds, serif/editorial layouts, grid-paper motifs or left-border callouts.
- **Language quality.** Chinese UI copy and explanations read as native Chinese (how teachers and
  students talk, no translated phrasing). English content is native-quality English at the
  learner's level, following the edition's spelling (人教 American; 外研/译林/沪教牛津 British).
  Audio comes only from licensed recordings or the owner-chosen TTS model: never switch models
  silently.
- Discussion, docs and code comments are in English.

## Working alongside other agents

Several agents may work at the same time. The plan is in `docs/plan.md` and
`docs/stage1-resource-gathering.md`; who owns what is on `docs/authoring/board.md`; decisions and
handoffs go in `docs/authoring/log.md`. Follow this protocol so work never overlaps:

1. **Sync first.** `git fetch origin main` and read `board.md` and the latest `log.md` entries
   before choosing work. Don't trust a board you read earlier in the session.
2. **Claim before you start.** Pick an `open` unit whose dependencies are `done`. On `main`, set its
   Status to `claimed`, Owner, Branch and Updated, commit only that change (`board: claim <id>`)
   and push. The push is the lock: if it's rejected, pull, re-read the row and pick another unit if
   someone got there first. Claim one unit at a time.
3. **Work on your branch, inside your unit.** Branches: `research/<unit-id>` in Stage 1
   (`author/…`, `platform/…` later). A Stage 1 unit owns only its folders listed on the board
   (e.g. `reference/source-register/south/`, `reference/files/south/`). The schema, the integration
   layer, `reference/README.md`, this file and the docs are shared: change them only under R-0 or
   R-INT, or ask under **Requests** on the board.
4. **Ids never collide.** Source ids are `<unit>::<nnn>` (e.g. `R-SOUTH::042`); file ids are
   `<unit>-<nnn>`. Only the unit owner numbers its ids.
5. **Hand off in writing.** Whenever you stop, finished or not: push your branch, update the row
   (`review` when the unit's checks pass, otherwise leave `claimed` with a Notes line) and append a
   `log.md` entry: what you did, what you decided, what the next owner should do first, and open
   questions for the owner.
6. **Merging.** Rebase on `main`, rerun the checks, then squash-merge (or open a PR if the owner
   asked for one) and set the row to `done` in the same push.
7. **Stale claims.** A `claimed` row with no commits on its branch for 48 hours may be taken over:
   say so in `log.md`, build on the existing branch and update Owner.
8. **Changing the plan.** Re-cutting units or changing conventions is a plan change: edit
   `docs/plan.md` / `board.md` on `main` and record why in `log.md`.

## Stage 1 checks before handing back

1. Every record validates against `reference/source-register/resource-schema.json`
   (`node scripts/check-register.mjs <unit folder>` once R-0 lands; until then, valid JSON with
   every required field).
2. Every downloaded file is listed in your `download_manifest.json` with size and SHA-256, and was
   opened to confirm it is what the record claims (year, city, subject 英语, paper vs answers).
3. Your unit's coverage cells are filled: every city × year has a status, even when the status is
   `not_found` or `blocked`.
4. Large binaries are committed through Git LFS (see `.gitattributes`); nothing is committed from
   behind a login or paywall.
