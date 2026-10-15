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

## 2026-10-15 · codex-curriculum · R-STD partial handoff
- Did: pushed `research/R-STD` (`891d1c2`): original Ministry-hosted English2022 standard (201pages), publisher revision-programme interview,58grammar research entries,29level3 themes,17quality indicators and94pages of explicitly unreviewed OCR. Source and download checks pass.
- Decided: keep R-STD claimed/incomplete. A general October2025 revision announcement is not a verified revised English standard; OCR is not a corrected1600word list. No commercial permission inferred.
- Next: retrieve the English-specific revised standard, audit the vocabulary transcription and review remaining teaching/evaluation cases. Exact successful/failed endpoints and provenance are in the unit branch. No unit dependency or final gate is waived. The coordinator continues other independent research while those missing-source checks remain unresolved.
- Open questions: official English2025 revision attachment remains unavailable through inspected sources. Network additions are saved in the environment draft; saving a draft has not changed runtime policy.

## 2026-10-15 · codex research coordinator · city-stream partial handoffs
- Did: pushed R-NORTH (`da41b42`,160sources/19files/132opened previews), R-EAST (`f53d4ab`,231records/143HTML artifacts) and R-CW (`3a1a82f`,105sources/75artifacts). Each branch passes its register and source/coverage integrity checks. Shared public-index samples were cached and rate-limited; no gated original files were acquired.
- Decided: all three units stay claimed/incomplete. Source verification is separate from full city/year coverage. Actual official policy evidence is retained where opened; commercial previews remain reported. Upper-term dates, local-school scope, publisher mocks and title/body conflicts are explicit. No partial branch is merged as a completed unit and no final integration dependency is waived.
- Next: finish the unresolved official sources, original files, city/year searches and grade/term grids on each existing branch. Independent national/publisher/bank resource lanes can proceed while those external-source gaps remain unresolved.
- Open questions: network/source failures and unavailable original paper/audio licences remain precise unit-level gaps, not a claim that all official sites are blocked.

## 2026-10-15 · codex-south · R-SOUTH partial handoff
- Did: pushed `research/R-SOUTH` (`e03b907`):81sources/13files; acquired official English papers and answers/model essays for all five Fujian years2022–2026, parent hashes and opened checks retained; verified Quanzhou2026 citywide Renai/Kepu adoption from the actual notice/DOCX. All seven LFS objects uploaded; register, scope and file-integrity checks pass.
- Decided: remain claimed/incomplete;1459coverage cells are explicitly unsearched. Complete whole-page English extracts are distinguished from their all-subject parent PDFs and from public commercial previews. No MP3 advertisement becomes acquired audio.
- Next: follow the unit's149unreviewed/index leads and99attempt records, finish official city/year applicability and missing audio/transcripts/grade-term grids. Independent publisher research continues on a separate claimed unit.
- Open questions: detailed current local speaking rubrics, actual licensed audio and full56city coverage remain unresolved.

## 2026-10-15 · codex research coordinator · R-ED-A and R-BANK partial handoffs
- Did: pushed R-ED-A (`7174f0d`,19sources/19files,17legacy book reference extracts and official catalogues) and R-BANK (`8545410`,62sources/40HTML snapshots,930catalogue asset listings,35observed question-type labels). Unit checkers and committed-file integrity checks pass.
- Decided: both remain claimed/incomplete. Legacy editions do not satisfy2024book coverage; listed assets are not verified question totals. Existing bank snapshots are reference-only. Further automated21cnjy collection stopped after inspecting its agreement, which requires written permission for automated collection and commercial use.
- Next: retrieve current publisher books and complete audited maps; seek an authorized bank access/licensing route and official English exam analyses. Independent auxiliary and rights research proceeds separately.
- Open questions: current-edition availability, actual audio licences, and platform permissions remain unresolved; no outreach or agreement is authorized by this handoff.

## 2026-10-15 · codex research coordinator · R-ED-B and R-LS partial handoffs
- Did: pushed R-ED-B (`876dae3`,51sources/44artifacts,43legacy books with local full parents, compact repository extracts and7representative maps) and R-LS (`eeddd83`,21sources/20artifacts,5official Fujian2022–26listening models). Source/schema/file-integrity audits pass; LFS objects uploaded.
- Decided: both remain claimed/incomplete. The2024catalogue is separate from legacy books; no current2024book/audio acquired. Fujian listening models are provincial facts, not evidence of speaking tests in every city.278speaking cells remain unsearched. No permission inferred from access or hashes.
- Next: current publisher originals, complete maps, audio and local speaking rubrics/platform mandates need followup. Proceed with separate writing/measurement work using opened official papers.
- Open questions: the English-specific2025revised standard remains unavailable after genuine government searches; its dependent vocabulary and integration gates remain unwaived.
