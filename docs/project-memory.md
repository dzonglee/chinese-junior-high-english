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
tool set. Fresh native/deferred registry inspection exposes neither the exact Chrisverse capabilities
identifier nor any generic tool-search/reload interface. No external memory or Kanban write has been
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
- `research/R-VOC` at `2f3cc5b`: latest vocabulary research; not merged as a completed unit.

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

R-VOC retains its existing claim. Latest published checkpoint: `research/R-VOC` at `2f3cc5b`.
The validated register contains 215 sources, 903 retained artifact records (three shared curriculum
records), 60 cached legacy books and 23,248 literal word/phrase/name occurrences in 592 groups.
These are occurrences including repetitions, not unique lemmas or prescribed examination words.
National lists preserve 1,600 entries and separately versioned 2022/2025 lists and supplements.
Every mapped legacy appendix/identity page was viewed; original-to-registered sequences, retained
bytes/hashes and visible ISBN checks pass. Missing identity fields and source conflicts stay explicit.

The 280 vocabulary city/year targets now contain 269 bounded not_found, 9 blocked and 2 unverified
provider links, with zero unsearched cells. No actual raw local examination wordset or verified current
2024-book wordlist was acquired. Eighty-seven annual targets use only the Ministry national index;
that weaker scope is explicit. Queries match the published-form return and native parsed response.
Actual access challenges were stopped. Restricted bodies, personal-list details, snippets and native
ephemeral values are excluded. Search status is not acquisition or exhaustive local absence.

A final review identified the separate Stage 1 section 5 requirement to search for an official
English-exam announcement in every city/year. Two existing delegates now cross-reference actual
regional notices and perform missing announcement-target searches independently of the vocabulary
grid. R-VOC stays claimed while this evidence and final review/checks are completed. Do not relabel
vocabulary queries as announcement searches. No other research claim or R-INT dependency is waived.

Current-edition discovery preserves five BNU catalogue observations, PEP companion navigation,
FLTRP sales metadata, inherited route failures and pinned community candidates. No current English
word pages were verified; no untrusted scripts, share-login flows or protected delivery were used.
The national 2024 catalogue was reopened and visually checked: eleven standard-size entries plus
one large-print variant; only three explicitly print five-four. Unlabelled rows retain unknown
school structure. The 70 standard and 2 variant theoretical volume positions are not acquired or
necessarily published books. PEP/Shandong five-four is one coedition row. Current catalogues and
legacy volumes differ; do not splice them or infer city/cohort adoption.

BNU and Shandong reproduction/mirroring restrictions require metadata-only retention; no current
reader bodies/DOM/screenshots were copied. Jinan and restricted Shijiazhuang replies are similarly
limited. Guangzhou's practice RAR was statically opened, never executed; zero media sets played.
Guangzhou 2024–2026, Beijing from 2025 and Henan 2026 retain their distinct documented curriculum
bases. No adoption of the national 2025 revision or local 1,600-word equivalence is assumed.

The latest fresh native/deferred tool registry still exposes no Chrisverse, Kanban or Obsidian tools,
no generic tool-search/reload interface and no callable
`mcp__codex_apps__chrisverse_studio_mcp_capabilities`. This is a worker tool-exposure limitation,
not a server-availability diagnosis. No external write, authentication/network change or credential
dump is claimed. When exposed, read the existing English board and Obsidian note first and reconcile
this memory/log. Keep one short English deliverable per card; link detailed evidence in memory.
