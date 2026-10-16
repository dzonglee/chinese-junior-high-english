# Project memory

## Owner instructions

- Finish the application. Continue beyond research milestones and isolated access failures.
- Keep Obsidian memory and the Kanban board updated through the existing MCP connections as work
  progresses. Future Codex sessions and agents must follow the same requirement.
- Keep the board clean, concise and easy to read, using plain English.
- While the current session cannot access those MCP connections, continue app work first.

## Current work

The validated app code is published at `platform/app-delivery` checkpoint `ce8b82d`.
Implementation documents referenced below live on that branch until delivery is integrated;
this main-branch update publishes the current handoff without merging an unfinished release.

Application delivery is active under `APP-DELIVERY` on `platform/app-delivery`. The existing
research claims remain intact. Research is incomplete; no application or release completion is
claimed. The native application and shared browser harness are implemented on `platform/app-delivery`. The collection contains 34 original draft lessons, 368 questions across all six skills and 96 vocabulary entries, including cloze, sentence restoration, short answers and read-aloud tasks. Three original Blender assets are rendered. This is a foundation collection, not complete 1,600-word or textbook-unit coverage.

TypeScript and 73 automated tests pass. Eleven complete Chromium journeys pass with zero page errors, including timed writing focus, history/favourites, onboarding restore and orphan-audio deletion. Small-screen layouts were reviewed at 320/390/768 widths. Both development and synthetic CloudBase native-adapter simulations pass; static checks cover 24 routes and about 771 KB main / 1,464 KB development total. These simulations are not WeChat DevTools or real-device evidence.

Release code uses CloudBase for question/audio files and builds separately under `dist/release/`, preserving development files. Release guards reject missing project IDs, media, privacy/device evidence and actual editorial approval; the actual release remains blocked. A searchable standalone editorial artifact is generated with `npm run content:review`. Read `docs/validation.md`, `docs/product-design.md` and `docs/release-checklist.md` on the app branch for exact evidence/scope.

The full reusable cloud install script was executed successfully, and `install_script`/`start_skill` were saved to the environment draft. Saving is not applying/publishing the environment. No published snapshot or fresh-task restoration is claimed. The saved startup instructions include the standing Obsidian/Kanban protocol.

Owner inputs still pending: the approved audio source/model (AGENTS.md explicitly requires an owner-chosen model or licensed recordings); the actual WeChat AppID and CloudBase environment/file IDs; native DevTools/device evidence; editorial review and initial launch scope. The public project identifiers were requested asynchronously. No secret should be sent in chat. Continue immediately when those inputs arrive; do not substitute a model or invent approvals. Application delivery stays in progress.

Obsidian/Kanban discovery was rechecked and exposes neither connection in this session. No external memory/board update or publication has been claimed. The owner requested continued app work first. Reconcile these local updates with the existing external records as soon as their tools appear.

The sister app was inspected at commit `933ab324ba947f061ebff65dca45ba5c2fc26b75` in a temporary
read-only reference checkout. It supplies native TypeScript patterns, learning-state logic,
content packs, design tokens, Blender assets and validation conventions. Its mathematics content
and its release configuration are not English-app content or release approval.

## Memory and board connection

The owner says Obsidian and Kanban are connected via MCP. This session currently exposes neither
tool set; MCP resource discovery returned no such server, the local MCP inventory is empty, and
the local Codex configuration has no MCP servers. No external memory or Kanban write has been
made. The owner was informed and requested that application work continue first.

When the connections become available, discover the existing English project note and board,
read them, then reconcile this file, the application delivery board, decisions and test evidence.
Do not duplicate the owner's records. Save the confirmed note/board identifiers here only after
discovering them through the actual tools, without storing credentials.

## Working references

- `AGENTS.md`: standing requirements, memory/board protocol and ownership rules.
- `docs/app-delivery.md`: application scope and completion evidence.
- `docs/authoring/board.md`: current delivery card and preserved research ownership.
- `docs/authoring/log.md`: detailed decisions and handoffs.
- `research/R-VOC` at `f05f1e7`: latest vocabulary research; not merged as a completed unit.

## Keep these distinctions visible

Research access is not commercial permission. A national list is not a local examination list.
A legacy book is not the current 2024 edition. Completed lessons are not demonstrated mastery.
Self-review is not machine assessment. Passing browser checks is not native DevTools evidence.
An implemented app is not a published WeChat release.

## Current implementation decisions

- Native WeChat app with pure TypeScript learning logic and separate platform services.
- Keep a small main-package catalog and load full question/explanation packs by topic.
- Exam dates must be confirmed; no made-up June countdown date. A local mock requires a fully
  verified blueprint matching the exact city, school structure and examination year.
- Hints, retries and immediate repeated-item practice do not increase independent evidence.
  Self-marked writing/speaking never becomes machine-assessed mastery.
- Question authoring, cloud packs and private questions share strict explanation validation.
- Answer exposure persists across sessions, so peeking or restarting after a hint cannot create independent credit.
- Portable import retains current device recordings but ignores foreign recording paths. Full deletion clears orphan audio too.
- Toolchain: Node 24, TypeScript 5.9.3, Vitest 5.0.1, esbuild 0.28.2. The initial esbuild version
  conflicted with Vite's peer range; it was corrected without disabling dependency checks.

## Research continuation (2026-10-16)

R-VOC remains active under its existing claim. Latest published checkpoint: `research/R-VOC`
at `f05f1e7`, with 123 sources, 434 retained asset records (three shared curriculum records),
60 cached legacy books and 23,248 literal word/phrase/name occurrences across 592 groups.
Counts include repetitions and phrases. They are not unique lemmas or prescribed local exam lists.
Required register and hydrated vocabulary audits pass. No current 2024 book or actual raw local
examination wordset was acquired; unacquired families still need separate discovery.

The last cached family, BNU5, adds 2,334 occurrences across 40 groups. All 128 mapped pages
were visually reviewed, including 16 picture-dictionary figures. Five selected PDFs match parent
RGB pixels/native text; primary lists were manually transcribed. ISBN, imprint/printing and
curriculum-basis fields remain unknown because those pages are absent. Places/names remain
separate from unit rows; alphabetic-only items are not invented as unit vocabulary.

Annual grid: 59 bounded not_found, 6 blocked, 215 genuinely unsearched. New bounded passes:
Shanghai, Yantai, Qingdao, Jinan, Linyi and Shijiazhuang. Shanghai's independent public POST
supersedes its earlier failed route. Wuhan's five actual city targets render a site-administrator
block; independent provincial searches found no raw local list. Its linked policy explicitly
preserves separate Wuhan setting, so provincial marks/minutes are not imported into Wuhan.

Northern query semantics and pagination limits are explicit. Qingdao's all-time filter and complete
short indexes were checked; Linyi advanced AND syntax was validated against a positive control.
Jinan forbids unauthorized reproduction/mirroring; original HTML is excluded. Shijiazhuang's
restricted district reply and containing snippets are excluded, retaining only bibliographic
metadata/rights warnings; it is not citywide adoption evidence. Luoyang's old API fails useful
controls and its current public page has a JavaScript failure; no annual absence is inferred.

ESPress/Shandong source conflicts and unchanged-parent requirements remain in the branch notes.
Public access grants no commercial permission. Guangzhou's practice RAR was statically opened,
never executed; zero media sets played. City curriculum versions remain distinct: Guangzhou
2024–2026 uses 2022 standards, Beijing transitions from 2025, Henan2026English retains2011basis.
No national2025revision adoption, local1600set or publisher adoption is assumed.

Two existing delegates continue northern/southern actual city-year discovery; root owns IDs,
tracked edits and publication, and continues east/central-west/current-edition research. Nothing
is released, no incomplete unit is merged/done, and R-INT still depends on all R units done.

The fresh native/deferred registry still exposes no Chrisverse, Kanban or Obsidian tools, no
generic tool-search/reload capability and no callable
`mcp__codex_apps__chrisverse_studio_mcp_capabilities`. External reconciliation is pending;
no external write or duplicate record is claimed. Reuse the existing English project board/note
when exposed. Keep cards short, one deliverable each, with evidence linked in memory. No
credentials were printed and no auth/network configuration was changed.
