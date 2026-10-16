# Plan

The English app follows the route that built the maths app: research first, then the product
design, platform and content. Each stage ends with a gate the owner signs off.

## Current owner direction (2026-10-16)

The owner requested continuous work toward a finished application, rather than stopping after
research milestones. Platform, product design, original content and validation now proceed
alongside the remaining research. `docs/app-delivery.md` tracks application completion. This does
not declare the research complete or permit invented exam facts, copied reference material,
unapproved audio models or an unverified public release. Build every independent capability
before requesting the owner-only credentials, editorial decisions or publication actions.

Every session and agent must keep the connected Obsidian memory and Kanban board current via
MCP, using plain English. See `AGENTS.md` and `docs/project-memory.md` for the standing protocol
and the current connection state.

## Stage 1 · Resource gathering (continues alongside app delivery)

Build the research corpus in `reference/`: a source register with provenance, verification and
rights on every record; the files themselves where they can be lawfully downloaded; and an
integration layer that merges it into one city × year picture. Details, units and done criteria are
in `docs/stage1-resource-gathering.md`.

**Gate 1:** the integration layer exists (`master-sources.json`, `priority-city-exam-map.json`,
`coverage.json`, `textbook-term-map.json`, `listening-speaking-map.json`, `vocabulary-map.json`,
`bank-map.json`, `qa-report.md`) together with an editable research brief (`.docx`, as for maths). Every one of the 56 cities × 2022–2026 has a status per resource type. The owner
has reviewed `qa-report.md` and the gaps list.

## Stage 2 · Synthesis and product design

- **Curriculum ontology.** The 2022 standard's levels, topics (话题), functions, grammar items and
  the 三级 vocabulary (about 1,600 words), plus 二级 review. Map each to edition units.
- **City exam blueprints**, as in maths `content/exam-structures.json`: written-paper sections,
  counts and marks; 听力 and 听说/口语 (machine-based or not, task types, marks, timing); total
  marks and minutes; each with its verification state and the cohorts it applies to.
- **Edition and term map:** 人教 Go for It! (the 2024 七年级 edition and the legacy books), 外研,
  译林/牛津, 沪教牛津, 北师大, 仁爱/科普, 冀教, 鲁教/人教五四 and others. Never stitch a new book to a
  legacy one.
- **Product design doc** (mirrors maths `docs/product-design.md`): three-fact routing, daily rhythm,
  lessons, practice by 题型, 听说 training, 限时模考 from the local blueprint, writing self-marking
  against a rubric, and the mistake book.

**Gate 2:** owner approves the product design and the launch scope (which editions and cities first).

## Stage 3 · Platform

Fork the maths platform (native TypeScript mini program, content compiler, packs, DevTools walker,
design system), then add what English needs:
- audio playback and recording (listening items, shadowing, read-aloud scoring hooks);
- the passage reader (cloze, reading with 题型 such as 七选五 and 任务型阅读);
- vocabulary review with spaced repetition;
- writing self-marking against rubric points;
- the same 题库 builder as maths (CAT-0): pick units, topics, 题型, skills (听/说/读/写/语法/词汇),
  difficulty and count, then 刷题 with instant illustrated explanations or sit a timed 自由组卷
  with a report;
- 我的题目 (UQ-0): users add their own questions, held in-app to the same explanation standard,
  kept private and never shared into the bank.

Question bank and audio go to 云开发 storage, not the package.

## Stage 4 · Content lanes

Lessons per edition unit, items per 题型, 听说 tasks, original passages and audio, fixed 套卷 and
generated mocks per city layout, with topic and domain balance and a fresh paper each sitting.
Everything is original or licensed. **Every item carries the illustrated step-by-step explanation
from day one** (the maths app had to retrofit 4,287 items, so the English app should not repeat
that). Everything is reviewed in DevTools.

## Stage 5 · Release

Same as maths `docs/release-checklist.md`: AppID, 云开发, registration, privacy, real-device 体验版,
editorial release by the owner.
