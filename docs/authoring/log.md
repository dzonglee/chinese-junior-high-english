# Log

Newest at the bottom. Template: `## YYYY-MM-DD · <owner> · <unit ids>`, then Did / Decided / Next /
Open questions.

## 2026-10-15 · claude-7fcc · R-0 (project start)
- Did: set up the English app as the sister of `dzonglee/chinese-junior-high-maths`. The work
  includes:
  - `AGENTS.md`, `docs/plan.md` (five stages with gates) and
    `docs/stage1-resource-gathering.md` (what to gather, how to record it, units, done criteria).
  - The register schema, a dependency-free checker (`node scripts/check-register.mjs`) and LFS
    rules.
  - The 56-city roster, copied from the maths register and split into four city units.
- Decided:
  - The same 56 cities and the years 2022–2026 as maths, so the two apps route identically.
  - Stage 1 is research only, and no app code is written before Gate 1.
  - English adds audio, transcripts, 听说 specs, vocabulary lists and writing rubrics on top of the
    maths resource types.
  - `commercial_reuse_approved` is always false in Stage 1.
- Next: any agent can claim an R unit. The city units (R-NORTH, R-EAST, R-SOUTH, R-CW), R-STD and
  R-LS give the most value first. R-INT waits for all of them.
- Open questions for the owner:
  - Which editions and cities should launch first? This is decided at Gate 2, informed by what
    Stage 1 finds.
  - Is a licensed paper/audio source (publisher or bank) being pursued? R-RIGHTS records the options.

## 2026-10-15 · claude-7fcc · plan change: wider Stage 1 scope
- The owner pointed out that the maths material pack is more than past papers. It also holds
  question banks, 教辅, 教师用书, term and mock papers, teaching schedules and a research brief.
- Did:
  - Added these resource types to `docs/stage1-resource-gathering.md` (#10–#17): term papers by
    grade; mocks; question banks, 专题 collections and commercial bank indexes; 教辅 and teacher
    material; 教学进度; 听说 practice systems; reading material; exam analyses.
  - Extended the schema enums: coverage cells take grade/term/kind for the term and mock grid.
  - Added two units: R-BANK and R-AUX.
  - The city units now also cover term papers and mocks per grade. R-INT also delivers the
    editable research brief and `bank-map.json`.

## 2026-10-15 · claude-7fcc · standards carried over from maths
- The owner asked that the English app match the maths standards. The plan now carries over:
  - illustrated step-by-step explanations on every item from the start (`AGENTS.md`);
  - the 题库 builder (自选刷题 / 自由组卷, CAT-0);
  - 我的题目 user questions held to the same standard (UQ-0);
  - balanced mocks that change on every sitting, plus fixed 套卷.
- Stage 1 already gathers what these need: the 题型 inventory, banks and rubrics.
