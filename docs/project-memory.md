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
- `research/R-VOC` at `0a79bba`: latest vocabulary research; not merged as a completed unit.

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

R-VOC remains active under its existing claim. Latest published checkpoint: `research/R-VOC` at
`0a79bba`, with102sources,285retained asset records (three shared curriculum records),55legacy
books and20,914literal word/phrase occurrences across552groups. Counts include repetitions and
phrases, not unique lemmas or prescribed local examination lists. No current2024book or raw local
examination wordset has been acquired. Required register and hydrated vocabulary audits pass.

ESPress8 adds2,138entries/90units/127reviewed pages. Grade7upper retains its unchanged full parent
because subset selection changed identity-page colours. Shandong7 adds2,745rows/62units/170reviewed
pages; five unchanged full parents are each retained once because selected extraction changed
strict native trailing spaces or soft hyphens. Body pages outside reviewed maps remain unaudited.
All15ISBNs were visually read and checksumvalid. Literal source/index spelling and reference
conflicts remain visible. Per-entry IPA/gloss/typography/variants are uncurated. BNU5 scans are the
last cached family under audit; missing imprint/ISBN evidence stays unknown. Unacquired edition
families and current books still need separate discovery.

Annual grid:29boundednot_found,2blocked,249genuinelyunsearched. Completed bounded searches cover
Beijing, Zhengzhou, Guangzhou, Haikou, Changsha and Shenzhen2023–2026. The two blocks are actual
Shanghai2026and Shenzhen2022targets; Shanghai's independent public search followup is in progress
and may supersede its block. Controls/homepage failures never fill annual cells. Luoyang's ordinary
queries return broad unrelated results and advanced controls returnzero; its cells remain
unsearched pending useful independent evidence.

Guangzhou guides explicitly apply2022standards to2024–2026cohorts; Beijing transitions from2025;
Henan2026English retains2011basis. These scopes and national2025revision adoption remain separate.
Guangzhou's offline Windows practiceRAR was statically opened, never run; zero media sets played.
Haikou response projections omit unrelated public-case metadata, preserve original byte/SHA pins
and disclose lossy query/pagination limits. The older2019syllabus is not applied to later years.
Changsha's broad词汇表search was fully paginated through38tokenisedresults; a plausible中学word-chunk
hit proved high-school-only and was excluded. Its actual2025reform describes oralEnglish as a
separate20-markassessment converted toA/B/C/D, not simply20extraadmissionsmarks. No permissions
were obtained, no content released, and other research claims/integration dependencies are intact.

Two existing delegates continue BNU scans and actual northern annual-source discovery. Root owns
IDs, tracked edits and publication, and continues local/current-edition research. Native/deferred
tool discovery after the repeated plugin attachments still exposes no Chrisverse/Kanban/Obsidian
tools, no generic tool search and no callable native capabilities tool in this worker. No external
write, credential/auth/network changes or duplicate board is claimed. Read and reconcile the
existing English board/note when tools appear, using concise cards and linked detailed memory.
