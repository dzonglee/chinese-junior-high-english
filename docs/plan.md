# Plan

The English app follows the route that built the maths app: research first, then the product
design, platform and content. Each stage ends with a gate the owner signs off.

## Stage 1 · Resource gathering (now)

Build the research corpus in `reference/`: a source register with provenance, verification and
rights on every record; the files themselves where they can be lawfully downloaded; and an
integration layer that merges it into one city × year picture. Details, units and done criteria are
in `docs/stage1-resource-gathering.md`.

**Gate 1:** the integration layer exists (`master-sources.json`, `priority-city-exam-map.json`,
`coverage.json`, `textbook-term-map.json`, `listening-speaking-map.json`, `vocabulary-map.json`,
`qa-report.md`). Every one of the 56 cities × 2022–2026 has a status per resource type. The owner
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
- writing self-marking against rubric points.

Question bank and audio go to 云开发 storage, not the package.

## Stage 4 · Content lanes

Lessons per edition unit, items per 题型, 听说 tasks, original passages and audio, mock papers per
city layout. Everything is original or licensed, follows the explanation standard (思路, steps, why
each wrong option is wrong), and is reviewed in DevTools.

## Stage 5 · Release

Same as maths `docs/release-checklist.md`: AppID, 云开发, registration, privacy, real-device 体验版,
editorial release by the owner.
