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
- R-VOC bounded research merged on `main`; audit branch `research/R-VOC` at `0924dfe`.

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

## Vocabulary research handoff (2026-10-16)

R-VOC is done as a bounded research pass and squash-merged on main. Its published audit branch is
`research/R-VOC` at `0924dfe`. The register contains 294 sources, 1,158 retained artifact records
(three shared curriculum records), 60 legacy books and 23,248 literal word/phrase/name occurrences
across 592 groups. National datasets preserve 1,600 entries, 505 level-two entries, distinct 2022/2025
occurrences and separately indexed supplements. Occurrences include repetitions; they are not unique
lemmas or prescribed local exam words. Every mapped appendix/identity page was viewed; unknowns,
source errors, metadata conflicts and unaudited IPA/glosses/typography remain explicit.

Both annual grids are filled for all 56 cities × 2022–2026. Vocabulary outcomes: 269 bounded not_found,
9 blocked, 2 unverified links, 0 unsearched. Eighty-seven targets use only the Ministry national index;
that weaker scope remains explicit. The separate announcement ledger has 252 actual targeted searches,
three relevance controls and 28 regional notice/policy/direct-attempt cells. Those include two blocked
Shanghai English-notice requests and five explicitly cohort-spanning policy cells. Restrictive index
queries are not exhaustive local archives or newly verified notices/exam facts. Exact published-returned,
native submitted/parsed query strings, counts and all downloaded URL bytes/hashes reconcile.

Checks passed: unit schema/register, full shared register (309 sources / 1,191 artifacts), hydrated
vocabulary/source-sequence/ISBN/announcement audit, Git LFS integrity, authored-file whitespace and independent
city/report/completion review. Branch rebase and an explicitly leased push succeeded; the main merge
and done row are published together. No content is released and all commercial reuse flags stay false.

Acquisition gaps: no verified current 2024-book wordlist or local raw annual examination wordset was
acquired. Current publisher catalogues/navigation, sales ISBN leads, inherited failed routes and pinned
community candidates are registered without promoting them to originals/adoption. The national 2024
catalogue has eleven standard entries and one large-print variant; only three explicitly print five-four.
Unlabelled structures remain unknown. Seventy standard plus two variant theoretical positions are not
acquired or necessarily published books. Current and legacy volume patterns differ; do not splice them.

Restricted current BNU/Shandong, Jinan and Shijiazhuang bodies remain excluded; only scoped metadata,
paraphrases/hashes are retained. Actual access challenges were stopped. No untrusted downloader,
shared-drive login, token synthesis, API replay, protected route or copy restriction was bypassed.
Guangzhou's practice RAR was statically opened, never executed; zero media sets were played. Guangzhou,
Beijing and Henan retain distinct documented curriculum bases; no national 2025 revision/local 1,600-set
or publisher/cohort adoption is inferred. Start with `reference/source-register/vocabulary/research.md`,
`city-findings.md`, `completion-review.md` and `announcement-search/README.md`.

Owner follow-up: lawful current/missing-family originals with physical imprint/ISBN; local annual raw
wordsets and the Quanzhou transition resource; written reuse/audio permissions through R-RIGHTS.
These gaps do not reopen other agents' claims. All other research units remain separately claimed;
R-INT still requires them all done, so Stage 1/Gate 1 is not complete. APP-DELIVERY and its actual release
prerequisites remain unchanged. Re-fetch/read the board before selecting any next unit.

External reconciliation is pending. This worker's fresh native/deferred registry has no Chrisverse,
Kanban, Obsidian or generic tool-search/reload interface, including no callable
`mcp__codex_apps__chrisverse_studio_mcp_capabilities`. This is tool exposure, not a server-availability
diagnosis. No external write or credential/auth/network change is claimed. Once exposed, read the
existing English board/note and update the existing vocabulary card to done, with the above bounded
scope and acquisition gaps linked in memory. Use short English cards and do not duplicate records.
