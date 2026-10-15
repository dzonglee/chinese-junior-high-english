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
