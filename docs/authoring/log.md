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
- Did: pushed `research/R-STD` (`891d1c2`): original Ministry-hosted English2022 standard (201pages), publisher revision-programme interview,58grammar research entries,29level3 themes,17quality indicators and 94pages of explicitly unreviewed OCR. Source and download checks pass.
- Decided: keep R-STD claimed/incomplete. A general October2025 revision announcement is not a verified revised English standard; OCR is not a corrected1600word list. No commercial permission inferred.
- Next: retrieve the English-specific revised standard, audit the vocabulary transcription and review remaining teaching/evaluation cases. Exact successful/failed endpoints and provenance are in the unit branch. No unit dependency or final gate is waived. The coordinator continues other independent research while those missing-source checks remain unresolved.
- Open questions: official English2025 revision attachment remains unavailable through inspected sources. Network additions are saved in the environment draft; saving a draft has not changed runtime policy.

## 2026-10-15 · codex research coordinator · city-stream partial handoffs
- Did: pushed R-NORTH (`da41b42`,160sources/19 files/132opened previews), R-EAST (`f53d4ab`,231records/143HTML artifacts) and R-CW (`3a1a82f`,105sources/75artifacts). Each branch passes its register and source/coverage integrity checks. Shared public-index samples were cached and rate-limited; no gated original files were acquired.
- Decided: all three units stay claimed/incomplete. Source verification is separate from full city/year coverage. Actual official policy evidence is retained where opened; commercial previews remain reported. Upper-term dates, local-school scope, publisher mocks and title/body conflicts are explicit. No partial branch is merged as a completed unit and no final integration dependency is waived.
- Next: finish the unresolved official sources, original files, city/year searches and grade/term grids on each existing branch. Independent national/publisher/bank resource lanes can proceed while those external-source gaps remain unresolved.
- Open questions: network/source failures and unavailable original paper/audio licences remain precise unit-level gaps, not a claim that all official sites are blocked.

## 2026-10-15 · codex-south · R-SOUTH partial handoff
- Did: pushed `research/R-SOUTH` (`e03b907`):81sources/13 files; acquired official English papers and answers/model essays for all five Fujian years2022–2026, parent hashes and opened checks retained; verified Quanzhou2026 citywide Renai/Kepu adoption from the actual notice/DOCX. All seven LFS objects uploaded; register, scope and file-integrity checks pass.
- Decided: remain claimed/incomplete;1459coverage cells are explicitly unsearched. Complete whole-page English extracts are distinguished from their all-subject parent PDFs and from public commercial previews. No MP3 advertisement becomes acquired audio.
- Next: follow the unit's149unreviewed/index leads and 99attempt records, finish official city/year applicability and missing audio/transcripts/grade-term grids. Independent publisher research continues on a separate claimed unit.
- Open questions: detailed current local speaking rubrics, actual licensed audio and full 56city coverage remain unresolved.

## 2026-10-15 · codex research coordinator · R-ED-A and R-BANK partial handoffs
- Did: pushed R-ED-A (`7174f0d`,19sources/19 files,17legacy book reference extracts and official catalogues) and R-BANK (`8545410`,62sources/40HTML snapshots,930catalogue asset listings,35observed question-type labels). Unit checkers and committed-file integrity checks pass.
- Decided: both remain claimed/incomplete. Legacy editions do not satisfy2024book coverage; listed assets are not verified question totals. Existing bank snapshots are reference-only. Further automated21cnjy collection stopped after inspecting its agreement, which requires written permission for automated collection and commercial use.
- Next: retrieve current publisher books and complete audited maps; seek an authorized bank access/licensing route and official English exam analyses. Independent auxiliary and rights research proceeds separately.
- Open questions: current-edition availability, actual audio licences, and platform permissions remain unresolved; no outreach or agreement is authorized by this handoff.

## 2026-10-15 · codex research coordinator · R-ED-B and R-LS partial handoffs
- Did: pushed R-ED-B (`876dae3`,51sources/44artifacts,43legacy books with local full parents, compact repository extracts and 7representative maps) and R-LS (`eeddd83`,21sources/20artifacts,5official Fujian2022–26listening models). Source/schema/file-integrity audits pass; LFS objects uploaded.
- Decided: both remain claimed/incomplete. The 2024catalogue is separate from legacy books; no current2024book/audio acquired. Fujian listening models are provincial facts, not evidence of speaking tests in every city.278speaking cells remain unsearched. No permission inferred from access or hashes.
- Next: current publisher originals, complete maps, audio and local speaking rubrics/platform mandates need followup. Proceed with separate writing/measurement work using opened official papers.
- Open questions: the English-specific2025revised standard remains unavailable after genuine government searches; its dependent vocabulary and integration gates remain unwaived.

## 2026-10-15 · codex research coordinator · further research handoffs
- Did: pushed curriculum followup `ac16203`, R-WRITE `efb65fc`, R-AUX `7b1138c`, R-RIGHTS `6734785`, regional followups R-NORTH `060fa97`, R-EAST `96ca2a0`, R-SOUTH `d69861f`, and R-BANK `95026a7`. Their register, scope, artifact-hash and LFS checks pass. All units remain incomplete with their explicit gaps; no partial unit is merged as done.
- Decided: preserve cohort-specific evidence. Tianjin changes listening/written delivery in 2025; Qingdao annual policies retain their actual dates; Guangzhou has a 100-minute written sitting; Changsha oral grading is separate from English admission marks. Hainan's 2023–26 written-question/answer nonpublication is a statement about the official release route, not universal absence. Shanghai's four qualitative analyses are available, without invented score statistics or rubrics.
- Next: finish publisher followups and the baseline word-form audit. Three existing agent slots are reused; no fourth agent is created. North will audit curriculum pages read-only into temporary files while the coordinator retains R-STD ownership and source numbering. East's read-only BNU/Shanghai catalogue discovery is packaged for coordinator registration under R-ED-B. This is coordination within existing units, not a dependency waiver.
- Open questions: many city/year and grade/term cells remain genuinely unsearched; current full books, original city papers/media, local scoring details, lexical audits and terms still need work. The network draft is saved with exact discovered domains but is unpublished and has not changed runtime policy. No contacts, licences, protected-platform access or app ingestion occurred.

## 2026-10-15 · codex research coordinator · publisher and central/west followups
- Did: pushed R-CW `4df6bc3` (124 sources/106 artifacts), R-ED-B `c7d14a6` (64 sources/78 artifacts) and R-AUX `0897b15` (41 sources/31 artifacts). Register validation, source references, byte/hash checks and relevant LFS checks pass. The editions checker used temporary standard filenames because the shared checker does not read b-prefixed files; no shared script was changed.
- Decided: annual Zhengzhou originals support2023–2025English marks/minutes; Luoyang2024has only partial structure/basis evidence and 2025detailed schedule is attributed newspaper reporting. BNU new-series student/teacher navigation is useful metadata, not acquired current books or ISBN proof. Shanghai's live data request failed; Shandong's tested audio route requires membership and trial reader rendered no pages. Do not convert these failures or catalogue listings into acquired material.
- Coordination: board-only ownership handoff `43112c0` transferred R-LS from codex-listening to codex-listening-east, preserving the existing branch. East is reusing its cached Shanghai official documents; North is visually auditing the 2022vocabulary appendices read-only. The coordinator retains R-STD and R-ED-B source numbering and tracked edits. Three existing agents are reused.
- Next: register the final bounded Shandong catalogue inspection, complete/review the vocabulary audit and publish the Shanghai listening/speaking followup. Full original city papers/media, current textbooks and detailed local rubrics remain open; thousands of grid cells are still unsearched. All units remain claimed/incomplete; R-VOC and R-INT dependencies are not waived.
- Open questions: no commercial permissions have been obtained. The network draft additionally records the literal publisher hosts `3wm.seph.com.cn`, `up.sjs.com.cn` and `cdn-jcjyzyw-pri.100875.com.cn`; saved draft status is confirmed, but publication is required to apply it. No contacts, accounts or protected access were used.

## 2026-10-15 · codex research coordinator · checked collection-pass handoff
- Did: pushed curriculum `ea09f7e`, editions-B `bf15137`, central/west `0d724a5` and listening/speaking `00cf3ac`. Across the twelve published unit branches, manifests contain 929 source records and 582 retained artifacts. These counts include candidates, failed retrievals, catalogue metadata, reported evidence and repeated provenance copies; they are not counts of complete or licensed resources. No application material was shipped.
- Curriculum: the 2022 main vocabulary lists were compared word by word against original images. Exactly 505 level-two entries match 505 actual starred entries in the 1,600-entry combined list, leaving 1,095 additional entries. Independent counts, uniqueness, star matching, source hashes, page totals and visual spot checks pass. The audit preserves 153 corrections and 58 excluded OCR lines. Supplemental tables are indexed and visually inspected but their structured transcription remains incomplete; the English-specific 2025 revision is still unresolved. National grade-skill and pronunciation maps are separate from city examination rules.
- Publisher/specification followups: BNU has five new-series student/teacher navigation pairs, without verified physical books or ISBNs. Shandong index/filter observations support no individual current-book claim. Shanghai's seven cached official annual documents now have listening/speaking profiles with explicit year, timing and mark limits; no actual audio or candidate-only platform content was acquired.
- Checks: all changed unit registers validate; retained artifacts and audit datasets have byte/hash checks, source references and false reuse flags. Relevant LFS objects are uploaded. The shared checker/schema are unchanged. Research changes remain on their owned branches; no incomplete unit was merged as done. The three delegated agent turns are finished.
- Next: continue the genuinely unsearched city/year and grade/term grid; acquire missing current textbook originals, papers, audio/transcripts, teacher/supplement texts, local analytic rubrics and complete the supplementary lexical data. Thousands of cells remain unsearched, so access failures alone do not explain the full gap. Preserve exact city/cohort scope and follow the board locks. R-VOC and R-INT remain unstarted behind their existing dependencies.
- Open questions: commercial permissions remain unobtained, and no outreach, account creation or agreement occurred. The saved network draft is confirmed but unpublished; reviewing/saving/publishing the environment settings is needed to apply it. Stage 1 is not complete, and this handoff does not declare Gate 1 ready.

## 2026-10-16 · codex-curriculum · resumed R-STD completion work
- Did: synced and reread the board, plan and handoffs. The owner requested continued research with two agents and will handle MCP access in a later session. Resumed the existing R-STD claim; no other owner's unit or dependent gate is taken over.
- Decided: delegates work read-only in temporary folders on supplemental appendix transcription and official revised-standard discovery. The coordinator retains R-STD numbering, branch edits and final review, and completes teaching/assessment-case mappings.
- Next: register verified results, run schema and semantic/file checks, and assess the actual unit done criteria before updating its status. Then claim the next eligible open unit.
- Open questions: the English-specific revised standard remains unverified; access failures and missing facts must remain explicit. No account, network or MCP reconfiguration is part of this research continuation.

## 2026-10-16 · codex-curriculum · R-STD completed and squash-merged
- Did: pushed `research/R-STD` (`b48d267`), rebased on current main and squash-merged the completed unit with its board status. It contains15source records and 33retained artifacts. The actual English2025revised PDF was discovered through the Qingpu school curriculum index, literal English article and literal attachment; the earlier mathematics candidate is excluded. The revised197-page PDF is82,942,124bytes, SHA-256 `a08998470dd3c81bce1d05d3be34d0a5421cd10822c0f8917839bc92d0b1e4c9`. School article date18March2026is separate from the unknown Ministry issue date.
- Audited: all 197revised pages, figures and tables were viewed across two delegates/coordinator. Full main-word reconciliation confirms505level-two/1600combined/505matchingstars/1095additional entries. Separate baseline and revised221-record supplements preserve blanks/dashes. Revised changes include Tomb-Sweepingcapitalization and bear’s printed participle borne, plus two preface edits. No source-count or image-hash shortcut establishes lexical identity.
- Mapped: baseline55competency/culture/strategy records and all 8teaching cases are complete; separate2025datasets apply currentsource/pageprovenance, cultural-age/overview overrides, revised case1/2projects and body/evaluation guards. All 29themes,58grammar entries and 17numbered quality indicators retain supported research paraphrases. The complete visual body comparison is not an exhaustive verbatim redline. Original passages/artwork are not app content; all reuse approvals stayfalse.
- Checks: required register validation,33artifact byte/SHA checks, versioned dataset hashes, baseline-provenance hashes, word-set/star reconciliation,194numbered-page coverage plus3front pages and GitLFS integrity pass. No shared schema/scripts or application code changed.
- Decided: R-STD isdone with documented source gaps, rather than fabricating2011comparison or Ministry-original authentication. R-VOC is now eligible; R-INT still waits for every research unit. Other city/edition/audio units remain partial on their existing branches and Stage1/Gate1is notcomplete.
- Next: claim R-VOC using the board lock and use the separately versioned national lists as the baseline for actual provincial/city and edition word-list research. The next session must fetch main, read this entry and the board, and preserve existing branch ownership. The owner plans to provide MCP access in another session; no MCP/network/auth changes were performed here.
- Open questions: official2011English fulltext, exact Ministry2025issue/effective dates and byte-identical Ministry original remain unavailable. Regional/city applicability cannot be inferred. R-WRITE should remeasure any use of revised printed66sample4: an English phrase changed, so exact2022counts cannot be silently carried forward. No licence/contact/account agreement was made.

## 2026-10-16 · codex-vocabulary · R-VOC checked partial handoff
- Did: after R-STD was merged as done (`d4c7430`), claimed R-VOC with the board-only push `2924e8c`. Pushed `research/R-VOC` at `88a8870`. Its 21 source records and 49 manifest records include failures, metadata and 3 references to existing curriculum artifacts; they are not 49 complete, new or licensed resources. R-VOC remains on its own branch.
- National data: 1600 printed headwords carry separate 2022 and 2025 source occurrences, including the 505 level-two subset and 1095 additional entries. The two 221-row supplemental datasets remain separately indexed. No city examination equivalence or textbook-unit assignment follows automatically.
- Textbooks: the two delegates completed five cached legacy PEP volumes (2611 occurrences, 58 literal headings, 57 appendix pages) and six cached legacy FLTRP volumes (2164 occurrences, 39 unit-list pages). The total of 4775 includes repeated uses, phrases and Starter/Revision groups; it is not a unique lemma count. FLTRP's 51 standalone name/alphabetical pages are retained separately and excluded from those counts. Book stars and bold conventions are distinct from national curriculum markers and exam requirements.
- Evidence and checks: retained complete wordlist/index sections and identity, approval, copyright, preface and back-cover evidence, with pinned public Git, blob, SHA and page provenance. All 200 derivative pages match parent decoded RGB renders and native text. Three cover extracts initially lost a color profile; these were repaired without changing the original PDFs. Five PEP ISBNs were observed and their checksums verified; six FLTRP ISBNs remain unknown after back-cover inspection. Approval, copyright, first-edition and printing dates stay distinct. Register validation, 49 artifact hashes, dataset/group/source/page checks and Git LFS integrity pass; objects are uploaded.
- Field limits: IPA and gloss remain null; raw font text is unreviewed evidence. Individual bold/variant fields in two scanned PEP volumes remain null, while their lexical fields are reviewed. Community mirrors are not independently matched publisher originals, current 2024 books or adoption proof. All commercial reuse approvals remain false; no app code, shared schema/scripts or released content changed.
- Local discovery: audited 662 existing regional records without counting them as new resources. Bing failed its relevance control; Shanghai's visible search raised `tiao is not defined`; the Nantong 2026 candidate returned 403; Shanghai's government homepage returned 503. The alternate public search provider presented a human CAPTCHA during its normal UI control; stopped without solving or retrying. The actual Shanghai 2022 analysis contains no prescribed word list. The Shenzhen teacher preview is nonofficial, and no further 21cnjy automation occurred. Henan's 2026 policy still identifies the 2011 standard as English's basis while reflecting 2022 concepts, so the 2025 national list cannot be applied automatically.
- Status: keep R-VOC claimed and incomplete. All 280 annual city vocabulary cells remain genuinely unsearched at the required scope. Generic failures or one analysis do not complete annual searches. Current 2024 books, other editions/five-four lists and actual local wordsets remain unfinished. Other owners' claims are unchanged; R-INT still requires all units done. Stage 1 and Gate 1 are not complete.
- Next session: fetch main and read AGENTS, the board and this log, then resume the existing `research/R-VOC` claim. If the fetch refspec only includes main, run `git fetch origin refs/heads/research/R-VOC:refs/remotes/origin/research/R-VOC` before checking out that branch. Start with its `reference/source-register/vocabulary/research.md`, `edition-wordlist-index.json`, `audit-registration.json` and `local-discovery/`. Preserve IDs through `R-VOC::021` and `R-VOC-049` (next: 022 and 050). Use working authorized discovery/MCP tools for actual city/year and current-edition sources, and retain the completed legacy audits. Preserve other active claims and integration dependencies. Integration must deduplicate the three shared curriculum artifacts by path/hash.
- Open questions: local exam word lists, current cohort books/ISBNs, other editions, exact Ministry 2025 issue/effective dates and the 2011 full text remain unresolved as recorded. Route failures do not prove universal absence. No outreach, account creation, agreements or MCP/network/auth reconfiguration occurred. The owner intends to launch a session with MCP access; this is a checked handoff, not a declaration that research is finished.

## 2026-10-16 · codex-vocabulary · reproducible audit and access followup
- Did: synced main, resumed the existing R-VOC branch and pushed `29211b7`. Added the unit-owned `check-audit.mjs` so pinned dataset/artifact hashes, national source-page positions, book occurrence/group counts, ISBN checksums, applicability/reuse flags and the complete annual grid can be rechecked. Reopened the PEP grade-seven upper back cover and corrected the stale ISBN caveat consistently; all lexical entries, groups and original provenance are unchanged.
- Checks: the vocabulary audit passes for 1600 national entries, 11 books / 4775 occurrences, 49 hydrated artifacts and 280 annual cells. Five isolated negative cases (duplicate national entry, wrong source page, duplicate annual cell, wrong unit grouping and unresolved LFS pointer) were rejected; the unmodified copy passed. The shared full register check passes for 36 sources, 82 files and 280 cells; Git LFS integrity and whitespace checks pass. Recorded earlier visual reviews were not repeated in full.
- Access: existing GitHub fetch/push and LFS access work. Literal Nantong 2026 PDF and Zhengzhou-hosted Henan 2026 policy requests failed at HTTPS proxy CONNECT with 403; no origin response was obtained. Saved exact custom host additions `jyj.nantong.gov.cn` and `zzjy.zhengzhou.gov.cn` in the environment draft, preserving the existing scripts and package-manager preset. Saving does not apply or publish policy. No new source, downloaded artifact or local headword list was acquired; annual coverage is unchanged.
- Status: R-VOC remains claimed/incomplete. All 280 annual local cells remain genuinely unsearched, and current books/other editions remain unfinished. Other owners' claims and the R-INT dependency gate are unchanged. Stage 1/Gate 1 is not complete.
- Next: review/save and publish the network draft in environment settings, then retry the literal official leads and follow actual vocabulary/scope links. Run `node reference/source-register/vocabulary/check-audit.mjs` alongside the shared checker after changes. Keep city/year/cohort applicability explicit. IDs remain through R-VOC::021 and R-VOC-049; no new IDs were allocated. Additional discovery destinations may need further exact host additions; no general Internet-access claim is made.

## 2026-10-16 · codex-vocabulary · continued collection and complete SHEP legacy appendix audits
- Did: continued through working discovery routes and pushed `research/R-VOC` at `441c167`, including seven new LFS objects (six unchanged textbook PDFs and one official timetable image). The six SHEP Oxford legacy books add 1367 word/phrase occurrences across 46 literal units. The R-VOC totals are now 27 source records, 57 asset records (three shared), 17 legacy books and 6142 occurrences. Counts retain repeats, phrases and sourcecase; they are not unique lemmas or complete examination-wordsets.
- Reviewed: all 27 complete unit-appendix pages and 12 cover/copyright pages were rendered and read. Preserved exact labels, source stars, literal units, appendix positions and all printed lesson-page references. All six ISBNs were visually observed and their checksums pass; approval, first-edition and actual printing dates remain distinct. A full-width native parenthesis had hidden the grade-nine upper `(be) happy with` entry from the initial extractor; restored it from the image. Removed a gloss parenthesis incorrectly appended to grade-eight upper `(be) full of`. IPA, Chinese glosses and prose inflection notes remain uncurated.
- Integrity: every full parent matches the existing pinned R-ED-B byte/SHA ledger. A trial grade-seven lower subset changed decoded pixels, so no subset PDFs were retained or used: unchanged complete parent bytes replace the subsets. The review ledger identifies the 39 pages actually reviewed; no whole-body review, publisher-original match, current 2024 edition or city adoption is claimed. All 11 previous book-index records and lexical datasets remain unchanged.
- Access correction: the earlier Zhengzhou CONNECT denial is historical, not a continuing global blocker. Its actual Henan 2026 policy HTML and linked timetable now return successfully and were reopened under R-VOC::010 (assets R-VOC-050/051). Q3 retains 2011 standards for English with 2022 concepts; the table confirms June 23, 15:00–16:40, 100 minutes, 120 marks (100 written + 20 listening). This is policy evidence, not a headword list or proof of each city's participation. Public GitHub repository discovery works. A current SHEP candidate cites literal public Smart Education page/image URLs, but those originals were not acquired; their requests returned CONNECT 403. Keep that candidate as an unverified lead rather than accepting its latest wordlist as a publisher original. The Nantong PDF returned HTTP 403 and no PDF; failure attribution beyond that response is not established here.
- Checks: the unit register passes for 27 sources / 57 artifacts / 280 annual cells. The vocabulary audit passes for 1600 national entries and 17 books / 6142 occurrences. Added an aggregate-index check after expansion exposed stale top-level totals; an isolated stale-total fixture is rejected. The shared full register check passes for 42 sources / 90 artifacts / 280 cells. Source hashes, sequential unit rows, page references, LFS integrity and whitespace checks pass. No original permissions or local applicability flags were relaxed.
- Status and next: R-VOC remains claimed/incomplete; all 280 annual local-wordlist cells remain genuinely unsearched at the required scope. Continue actual provincial/city and annual sources through available routes, current 2024 books and remaining edition/five-four families. A failed endpoint must not stop independent research. Start at `shep-audit/README.md`, `research.md` and the continued-discovery ledger. IDs now end at R-VOC::027 and R-VOC-057 (next 028 and 058). Other claims and the R-INT dependency gate are unchanged; no incomplete unit was merged as done, and Stage 1/Gate 1 is not complete.

## 2026-10-16 · codex-app · owner-directed application delivery and persistent memory protocol
- Owner direction: finish the app and continue beyond research milestones. Platform and original-content development now proceed alongside unfinished research; no research unit, city coverage or editorial gate is falsely marked complete.
- Claimed APP-DELIVERY for platform/app-delivery. Read the sister maths platform at 933ab324ba947f061ebff65dca45ba5c2fc26b75; reuse relevant architecture and design patterns, preserving the English requirements and research rights boundary.
- Added the standing Obsidian-memory and Kanban protocol to AGENTS.md for all future sessions and agents. The repository board uses short plain-English status notes; detailed technical history remains in this log.
- Current session has no exposed Obsidian or Kanban MCP tools or configured local MCP servers. No external write is claimed. The owner explicitly asked to continue application work first; docs/project-memory.md records the pending reconciliation.
- Next: implement the content model, reusable learning logic, native English screens and original content; keep the board and memory current as each capability is validated. Owner-only release and audio requirements must be identified without stopping independent development.

## 2026-10-16 · codex-vocabulary · continuous research resumed
- Synced main through `8e386b7` and the published R-VOC branch through `441c167`; preserved the existing claim and rebased its research commits on current main. An interrupted LFS hydration was preserved in a recovery stash before the successful sync; no authored work was discarded.
- Delegated two read-only temporary audits: six Renai/Kepu and six Yilin legacy volumes. The coordinator owns R-VOC IDs, register edits and publication. Annual vocabulary discovery continues through actual public authority forms, independently of external MCP availability.
- Rechecked native and deferred tools after the owner reported Chrisverse online and attached the plugin twice: this worker exposes no Chrisverse/Kanban/Obsidian tools, no generic tool-search interface and no callable native capabilities tool. No external write succeeded or is claimed. Repository memory records the exact limitation and pending reconciliation; no network/auth reconfiguration was performed.
- Baidu and Sogou presented verification challenges and were stopped. Google's normal JavaScript interface also presented an unusual-traffic challenge. These do not fill annual coverage. Zhengzhou's visible public search form works; distinct annual queries and linked policies are being inspected with exact scope retained.
- Next: register complete reviewed audit packages and actual annual search evidence, run the required checks and publish further research. Keep the existing board readable and reconcile it with the owner's external records when native tools become available. No unit or gate is declared complete.

## 2026-10-16 · codex-vocabulary · Renai/Yilin and actual annual-source checkpoint
- Published `research/R-VOC` at `2e8f176` after rebase and checks. Totals:52sources,138asset records (three shared),29legacy books,11,069literal word/phrase occurrences across306groups. No complete local wordset or current2024book is claimed. No incomplete unit was merged.
- Added six Renai/Kepu books:2634occurrences/86groups; all 154retained pages visually reviewed and 24PDFderivatives pixel/native-equal. Added six Yilin books:2293occurrences/44groups; all 122retained pages visually reviewed and 18PDFderivatives pixel/native-equal. All 12ISBNs were observed/checksummed. Renai9lower CIP2014-10conflicts with copyright first-edition2014-11; Yilin second editions remain distinct from unknown first editions and 2021printings. Original curated datasets remain unchanged; registered datasets add source IDs, false reuse flags and checked group/page fields. IPA/gloss/individual markers remain explicitly unreviewed.
- Actual local work: submitted separate2022–2026vocabulary searches to Beijing/Zhengzhou public forms, inspected short-term results and all six Beijing词汇/four考试说明pages. Ten cells are boundednot_found; Zhengzhou2023/2024pagination limits are explicit. Actual Shanghai2026and Guangzhou2022targets were blocked;268cells remain unsearched. Captchas were stopped; failed controls and homepages do not fill annual cells.
- Evidence: actual national教基厅函〔2022〕6号(25March/6April2022),sectionIII,cancels separate exam syllabi. Beijing2023evaluation says English last uses2011standards in2024and2022standards from2025. A teacher plan printed14September2024(web25September)mentions1540words; April2025teacher guidance mentions1600plus extensions/phrases. Preserve conflicting counts as weaker teacher advice; no exact local list or2025revision adoption inferred. Zhengzhou2025/2026city-area policies bridge exact candidates to provincial English exams;2026timetable was fully viewed and matches100minutes/120marks(100written+20listening).
- Checks: required register52/138/280; vocabulary1600national/29books/11069occurrences; full register67/171/280; actual byte/SHA,ISBN,original-to-registered lexical/group/page sequences,LFS and whitespace all pass. A repinned unsupported lexical-label fixture is rejected by the new source-sequence check. LFS upload and explicit leased branch push succeeded.
- Continuing: two existing delegates now audit Hebei and SWFL; coordinator continues local annual/current-edition discovery. Next IDs are R-VOC::053 and R-VOC-139. Other claims and R-INT dependencies remain intact. Latest Chrisverse attachment still exposes no native capability/search/board/memory tools in this worker; repository memory records pending reconciliation, and no external update is claimed. No auth/network reconfiguration, outreach, account creation, permissions or released content.

## 2026-10-16 · codex-vocabulary · Hebei/SWFL and Guangzhou checkpoint
- Published Hebei/SWFL at `965df76`, then Guangzhou evidence at `0687f91`. Current totals:71 sources,197 retained asset records,40 legacy books,16,031 literal word/phrase occurrences. All 239 pages retained for the eleven new books were viewed and passed selected-page pixel/native comparisons. The five Hebei books lack copyright/imprint pages, so edition/printing dates remain unknown. SWFL's delta marks2011level-five vocabulary; it is not the national2022star. Preserve source `hocky`/`gallope`, Hebei main `Niagara Falls` versus index `Niagra Falls`, and SWFL grade8lower's TOC/actual alphabetic-index end discrepancy.
- Guangzhou: followed ten documents/thirteen news pages through actual next links to2021. Opened all five annual guide PDFs (1114pages total), read full native text for discovery and visually checked the exact recorded cover/contents/English/policy pages. No whole-guide visual-completeness claim or raw local list. Five annual cells are boundednot_found, superseding Guangzhou2022's earlier failed search route; current coverage15not_found/1blocked/264unsearched.
- Evidence: the 2024/2025guides explicitly apply2022standards to2024–2026cohorts. Selected2022–2025English sections give20minutes listening/speaking,100written,30+90=120marks; the 2026guide contents review alone does not reverify marks/timing. These facts remain separate from Beijing and Henan. Ordinary attachmentGET succeeds althoughHEAD403; no authentication workaround.
- The actual2022offline practiceRAR was downloaded, hashed and statically opened with existinglibarchive: unencryptedWindowsEXE, no execution/installation/security change. The notice reports two20-minute sets and the 2026warmtip still recommends it. Zero sets/audio/transcripts independently played or decoded. Registered as a practice package, with rightsfalse; available for R-SOUTH/R-LS/R-AUX owner followup.
- Checks: register71/197/280 and vocabulary1600national/40books/16031occurrences pass, including actual hydrated bytes/SHA and unchanged lexical sequence checks. GitLFS uploads and branch pushes succeeded. NextIDs072and198. Delegates continue Shandong/ESPress/BNU; coordinator continues actual local sources and current editions. No incomplete unit merged or setreleased; other locks and R-INT dependencies preserved.
- Latest plugin attachment still exposes no native Chrisverse/Kanban/Obsidian tools or generic tool search in this worker. Repository board/memory updated with concise cards and exact pending reconciliation. No external update is claimed; no credential/auth/network changes.

## 2026-10-16 · codex-vocabulary · ESPress/Shandong and annual-source checkpoint
- Published Shenzhen at `ddfbfbd`, Haikou/ESPress at `b7ecbd6`, Shandong at `6697fb6`, and Changsha at `0a79bba`. Totals102sources/285asset records/55legacybooks/20,914literal occurrences/552groups;29boundednot_found/2blocked/249unsearched annualcells. No current2024book or actual local raw examination wordset acquired; no unit/Gate1completion claimed.
- ESPress8:2138entries/90units/127visually reviewed pages; all 8ISBNs checked. Grade7upper subset changed identity-page pixels, so unchanged full parent retained. Preserve grade6upper2012-07imprint/2013-07CIPconflict, manners/manner, unbalanced/unbaleanced, alphabetic-onlyweight/flight and literalleft-handness/Hellen Keller. Shandong7:2745 rows/62units/170reviewed pages; all 7ISBNs checked. ElevenacceptedPDFs only; five full parents retained once because selection changed strict native spaces/soft hyphens. Fullbodyunaudited; accepted selected pages match RGB/native text. IndividualIPA/gloss/typography/variants remainunknown. BNU5scans nowunderway; missing imprint/ISBN fields will stayunknown.
- Shenzhen2023–2026actualannualEnglishpolicies/Q&Aandall10embedded images opened/read. Written tables showJune28,09:00–10:10. Actual2024–2026text gives100including25listening/speaking,20-minute人机对话; no2023backfill. No explicit national-standard version or local wordset.2022actualpublicquery403andarchive limits remainblocked.
- Haikou:five actual annual vocabulary targets, broadshortterm and five actual citypolicies read. Broadquerythreehitsincludes2019syllabus, separatelyopened/outsidecurrentcoverage; no raw list. Search projections exclude unrelated public12345case metadata and pin raw byte/SHA; lossy semantics/2023first-page limit remainexplicit. Changsha:five annual ordinary/advancedtargets plus all 4pages/38broadtokenisedhits read; high-school word-chunkcandidate opened and excluded(visible2019datevs2023URLpath). ActualHunan2023policy introduces provincial written setting from2024without specifying a curriculum version. Actual2025Changshareform treats oralEnglish as20-markassessment converted toA/B/C/Dforcomprehensiveevaluation; no extra20admissionsmarks inferred.
- Requiredregister102/285/280 and vocabulary1600national/55books/20914occurrences pass, including actual hydrated byte/SHA and original-to-registered sequence/ISBN checks. A rejectedresource-type enum was corrected before publication, then checksrerun. LFSuploads and pushes succeeded; allrightsfalse. NextIDs103and286. Two existing delegates continue BNU/northernannual discovery; root continues independently. Luoyangunreliablecontrols leaveitscellsunsearched; ShanghaiworkingpublicPOSTandactualannualnoticesarebeingreviewed, withoutrelyingonitsbrokenheaderform.
- Mainboard/memory updated with concise existingcards. NativeChrisverse/Kanban/Obsidian tools and generic toolsearch remainabsent in thisworker; externalreconciliationpending and noexternalwriteclaimed. No auth/network reconfiguration, outreach, accounts, permissions or releasedcontent. Otherclaims and R-INTdependencies preserved.

## 2026-10-16 · codex-app · tested learning core in progress
- Implemented typed English content/state, strict question explanations, answer evaluation, China-calendar cohort routing, spaced vocabulary/mistake review, honest evidence tracking, sessions and timed-exam safeguards on platform/app-delivery.
- Validation: 30 core tests pass; TypeScript passes. Tests cover wrong-answer recovery, hints, immediate-repeat credit, delayed retention, scheduling, exam deadlines, exact blueprint marks, impossible builder requests and content validation.
- Updated local project memory and the readable delivery board. External Obsidian/Kanban tools remain unavailable; the owner requested continued app work first. No external write is claimed.
- Continue immediately with the compiler, original content, persistent services, native UI, Blender assets and functional journeys. This is a development checkpoint, not app completion or a reason to stop.

## 2026-10-16 · codex-app · APP-DELIVERY implementation checkpoint
- Did: added the compiler, eight original draft grammar lessons/96 questions, hash-checked packs, atomic storage, shared screens, native page shell and browser harness. TypeScript and 40 meaningful tests pass. Chromium completed onboarding and opened the first interactive lesson without a page error.
- Decided: local restoration retains active practice and device recordings; portable backups exclude recording files. Timed practice requires an unanswered-item confirmation and remains separate from verified local mocks.
- Next: expand original content, complete recording and self-review edge cases, render Blender artwork and test full learner journeys. Native DevTools validation and editorial review are still outstanding.
- Open prerequisites: the audio-model choice is pending; no configured audio key or actual release AppID is present. MCP memory/board tools remain unavailable, so these local updates await reconciliation. Independent app work continues.

## 2026-10-16 · codex-app · complete browser learner journeys
- Did: expanded to 32 original draft lessons, 348 questions and 96 vocabulary entries, including cloze and expression rubrics. Rendered three original Blender assets. Added edition spelling, practice history/favourites, backup integrity checks, honest subjective-exam scoring, vocabulary evidence and microphone/privacy handling.
- Checks: TypeScript, 52 unit/integration tests and nine complete Chromium learner journeys pass. A native API simulation passes CommonJS/async-pack loading, hashes without browser encoders, saved answers and privacy routing. Chromium uses a simulated microphone; neither simulation is native-device evidence.
- Fixed: same-device restoration had dropped active sessions and recordings; browser-only TextEncoder could break actual native pack hashing; unanswered exam questions could incorrectly count as independent learning evidence.
- Next: finish the CloudBase release transport/build and release checks, review small-screen layouts and remaining content types. No owner audio choice, real AppID/CloudBase, editorial release approval or DevTools evidence is fabricated.
- Memory: Obsidian/Kanban tools were rediscovered and remain unavailable. Local memory and the plain-English board are current; reconciliation remains pending.

## 2026-10-16 · codex-app · validated application and concrete release handoff
- Did: completed the native/shared UI and learning workflows, 34 original draft lessons/368 questions/96 words, three Blender assets, CloudBase content/audio transport, separate release output, release guards, CI workflow, setup/startup instructions and a standalone editorial review artifact. Unit/topic/skill/kind/difficulty filters, read-aloud, history/favourites and a meaningful daily target are implemented.
- Validation: TypeScript and 73 automated tests pass. Eleven full Chromium journeys pass with zero page errors. Development and synthetic CloudBase native-adapter simulations, static checks for 24 native routes, content audit, LFS/register checks and the exact reusable install script pass. Main package is about 771 KB, total development package about 1,464 KB. Neither browser microphone simulation nor API/WXML checks are native device evidence.
- Decisions: solution exposure persists across sessions, retention is spaced after recent exposure, overdue review stages are not consecutive, subjective scores stay separate, empty exams do not invent independent evidence, and backup import retains existing device recordings without accepting foreign paths. Full deletion also clears orphan audio.
- Release: actual readiness fails while the owner source/model, AppID/CloudBase files, privacy/device evidence and editorial/launch-scope approval are absent. Audio preparation intentionally exits before sending a request. The 96-word foundation is not the complete national word list and textbook/local exam mappings remain visibly unverified. No release, research completion or approval is fabricated.
- Environment: install_script and start_skill were saved successfully to the current draft after execution. The product requires review/save and environment publication to activate that saved version; no snapshot publication or fresh-task restore is claimed.
- Next: apply the owner's actual audio/project inputs as soon as supplied, prepare the media/cloud mappings, run native DevTools/device journeys and use the review artifact for the editorial decision. APP-DELIVERY remains in progress. Read docs/validation.md and docs/release-checklist.md on platform/app-delivery first.
- Memory: external Obsidian/Kanban tools are still unavailable. The repository memory/board and startup instructions carry the standing requirement for future sessions; reconcile with existing external records when access appears.

## 2026-10-16 · codex-app · main-branch handoff synchronized
- Published the working app at platform/app-delivery checkpoint ce8b82d. Main now records the actual application progress, 73 automated tests and 11 browser journeys, while retaining the concurrent R-VOC continuation and every research claim.
- This is a documentation handoff, not an app release or a merge of an incomplete research/application gate. APP-DELIVERY stays in progress pending approved audio, the real WeChat/CloudBase project, native/device evidence and editorial launch review.
- Future sessions should read this memory and the existing external MCP records when accessible, then continue the app branch. Do not restart the platform or claim the 96-word foundation is complete curriculum coverage.

## 2026-10-16 · codex-vocabulary · cached book audit and northern annual searches
- Published BNU at20309ea, Wuhan atb0674bb and five northern cities atf05f1e7. Required register123sources/434assets/280cells and vocabulary1600national/60cachedbooks/23248occurrences pass; GitLFSintegrity checked. R-VOC remainsclaimed; current books and 215annualcells remain unresolved.
- BNU5:2334literal occurrences/40groups/128visually reviewed pages, including16picture-dictionaryfigures; manual primary-list transcription and exact selected RGB/native fidelity. Covers show2013approval; missing ISBN/imprint/curriculum-basis fields stayunknown. Alphabetic-only entries are not invented in unit rows.
- Annual coverage59boundednot_found/6blocked/215unsearched. Shanghai's working publicPOSTsupersedesoldfailedroute; five actualWuhancitytargets render a site-administrator block, with independentprovincialnegative searcheslinked. Actualpolicy preservesseparateWuhansetting; provincialmarks/minutesnotimported. Northernfivecitypasses include complete shortindexes and actualannualtargets, withsingle-index/query-semanticslimits. JinanHTMLandrestrictedSJZreplytext/snippets excluded; metadata-only citationsdonotestablishcitywideadoption.
- Next: two delegates continue nine northern and nine southern cities; root continues east/central-west independentforms/archives and current-editiondiscovery. No otherclaim takeover, incompleteunitmerge, releasedcontent or R-INTdependencywaiver. Existingappdeliveryclaim preserved.
- Ownergap: rawcurrentbookappendices/localannualwordsetsremainunacquired. NativeChrisverse/Kanban/Obsidian tools and generictoolsearch remainabsent despitepluginattachments; repositoryboard/memoryupdated, externalreconciliationpending. Noexternalwriteclaimed, auth/networkreconfiguration, credentialdump, outreachoraccountcreation.

## 2026-10-16 · codex-vocabulary · southern coverage and current-reader limits
- Published independent northern indexes at a0207c1, southern annual searches at fb9efd0, four Zhejiang city sets at c23315a, and current BNU metadata/readable research report at 83ce076. Checks pass for 155 sources, 775 retained asset records, 60 cached books / 23,248 literal occurrences and 280 annual cells. Annual status: 178 bounded not found, 7 blocked, 95 unsearched. R-VOC remains claimed/incomplete; Stage1 and R-INT dependencies are unchanged.
- Southern nine-city pass actually issued all 45annual targets:185usable responses, with pagination and relaxed-term limits preserved. Root rehashed original responses and retained purpose-limited JSON projections, excluding unrelated branches, duplicate raw/decoded bodies, challenge HTML and interface screenshots. Quanzhou's named500-primary-word transition material has no attached word table; Nanning's commercial2023FLTRPlead has no verified original metadata/file. No local annual raw wordset acquired.
- Ordinary360 form worked with standardhttpx whereurlliblooped; no auth, custom headers, proxy orTLSchange. Both active streams stopped on explicit challenges (actualJiaxing2026andBaoding2024); unissued targets remain unsearched. The Ministry's exact published advanced form now returns ordinary result URLs and verified native results. Continue with matching actual queries/counts/rows, title/URL/date-only metadata and explicit Ministry-index-only scope; exclude unrelated indexed individual-list bodies/snippets and ephemeral native request values.
- Current BNU: five listed catalogues checked, zero vocabulary pages/entries. Grade7upper's actual visible vocabulary click gives a loading/incorrect subject placeholder; longer reader and two other catalogues503, two remain incomplete shells. Publisher copyright notice requires prior permission for reproduction/mirroring, so only paraphrases/bibliographic hashes are registered; no current-reader HTML/DOM/screenshots or notice text copied. Known blocked covers were not retried.
- Rewrote current research.md for readable findings and added the city/year status grid; earlier checkpoint details remain in research-history.md. Other unit claims and active app branch preserved. Exact native/deferred registry still has45tools and exposes no Chrisverse/Kanban/Obsidian or generic tool-search/reload interface. Local board/memory updated; existing external records await reconciliation, with no external write claimed. Next: finish actual remaining annual targets and record current/uncached family gaps before any completion decision.

## 2026-10-16 · codex-vocabulary · annual vocabulary grid and current-edition provenance
- Published all remaining vocabulary targets at7436e14 and current-edition provenance at2f3cc5b. Register215sources/903artifacts/280cells and vocabulary1600national/60legacybooks/23248occurrences pass. Vocabulary grid:269boundednot_found,9blocked,2unverifiedlinks,0unsearched;87targets use only the Ministry national index. No rawlocalwordset/currentbookwordlist or commercial permission acquired.
- Reopened the national2024catalogue and corrected ordinary rows to unknown school structure; only3explicitfive-fourrows. Elevenstandardentries plus one large-printvariant imply70+2theoreticalpositions, not acquired/publishedbooks. Added metadata-only publisher/sales/community leads, actual route failures and source provenance. No protected delivery, login, download scripts or restricted bodies copied.
- Final review found the separate section5annualofficialEnglish-exam-announcement search requirement. Two existing delegates are cross-referencing regional notices and searching missing targets through the actual published Ministry form/native result flow, separately from vocabulary coverage. R-VOC staysclaimed until those records/finalchecks are finished; no incomplete merge or dependency waiver.
- Existing board cards are short English deliverables; memory updated. Fresh tools still lack Chrisverse/Kanban/Obsidian and generic discovery/reload; exactcapabilitiesidentifier unavailable. Existing externalrecords await reconciliation, no externalwriteclaimed. Next: integrate announcementevidence, finish readable per-cityreport, runchecks and reassess unitcompletion; otherlocks/appbranch preserved.

## 2026-10-16 · codex-vocabulary · bounded R-VOC research completed
- Completed and published `research/R-VOC` at `0924dfe`, rebased on current main. Squash-merged the unit and set R-VOC to done in the same main push. Final register: 294 sources, 1,158 retained artifact records (three shared), 60 audited legacy books, 23,248 literal occurrences / 592 groups and 1,600 separately versioned national entries. All mapped legacy appendix/identity pages were viewed; original sequences, source conflicts and unknown identity/IPA/gloss fields remain intact.
- Filled the vocabulary grid: 269 bounded not_found, 9 blocked, 2 unverified provider links, 0 unsearched. Eighty-seven annual targets use Ministry-only fallbacks. No actual local raw examination wordset or verified current-book vocabulary list was acquired. Found publisher/community/current-book leads, exact failed routes and copyright limits are registered; catalogue/navigation metadata does not establish book identity or city/cohort adoption.
- Completed the separate official English-exam announcement-search criterion: 280 unique cells, comprising 252 actual annual targets and 28 pinned regional notice/policy/direct-attempt references, plus three positive controls. Two Shanghai original requests remain blocked; five cohort-policy cells are not fabricated annual issuances. Exact published-returned/native submitted/parsed queries and all 255 actual returned-URL TXT artifacts match. These are bounded Ministry-index attempts, not exhaustive local archives or newly verified blueprint facts. No raw native body, personal details, snippets or ephemeral values retained.
- Required unit check, full shared register (309 sources / 1,191 artifacts), hydrated lexical/source/page/ISBN/announcement audit, Git LFS integrity, authored-file whitespace and independent city/report/completion review pass. Root independently checked both delegate packages and four immutable regional source-register snapshots. Only the coordinator assigned IDs and changed tracked research. Source/file IDs now end at R-VOC::294 and R-VOC-1158 (next 295 / 1159).
- Owner questions: can lawful current-book and missing-family originals, local annual raw lists and Quanzhou's named transition resource be supplied with provenance? Which written publication/audio permissions will be obtained through R-RIGHTS? No permission, outreach, commercial reuse, release, full Stage 1/Gate 1 or application completion is claimed. See vocabulary/research.md, city-findings.md and completion-review.md first.
- The repository board and memory are updated with concise current status. Chrisverse/Kanban/Obsidian tools and generic tool-search/reload remain absent from this worker, including the exact capabilities identifier. Existing external records await reconciliation; no external write, duplicate board, credential dump or authentication/network change is claimed. APP-DELIVERY and all other claims are preserved. Next: fetch main and re-read the board/log; claim only an eligible open unit, never waive R-INT dependencies or take a fresh claim.

- Retained source HTML keeps original whitespace and bytes. The merge-wide whitespace scan therefore reports source formatting; the scoped authored-file staged check passes without changing source hashes.

- Post-merge loop: fetched origin/main at f0c5398 and reread the full board and latest log. No eligible open R unit remains: R-INT is the only open row and still depends on the other claimed units. Those claims are dated 2026-10-15, so none meets the 48-hour stale-claim rule on 2026-10-16. No claim was taken over or dependency bypassed. Resume with a fresh board sync when an owner completes or releases a unit.

## 2026-10-16 · codex-continuation · next-step application verification
- Owner instruction: continue toward all remaining work. Synced main and the current app handoff at `ebc5ca1`; no research claim is eligible and APP-DELIVERY remains freshly owned by codex-app.
- Started read-only app build/validation and two existing delegates' original-content/runtime review in the already existing detached checkout. No new worktree, implementation claim, source edit, research copy, audio choice, release approval or publication is made.
- Locked dependency installation and development build succeeded without tracked changes. Continue the documented tests/journeys and inspect actual release readiness before finalizing the next concrete handoff. Existing external Kanban/Obsidian tools remain absent, so repository records carry the progress.

## 2026-10-16 · codex-continuation · app review and exact continuation blockers
- Completed the next independent step after R-VOC: read-only verification and two delegates' content/runtime review of `platform/app-delivery` at `ebc5ca1`. The app checkout stayed clean; no implementation claim, app source edits, new worktree or owner gate waiver occurred. Persisted findings, exact cases, portable probes, current readiness metadata and SHA manifest under `docs/reviews/app-2026-10-16/`.
- Fresh checks pass: locked install/build, TypeScript, 73 existing automated tests, content audit (34 lessons / 368 questions / 96 words), 24 native routes/static package, development and synthetic-cloud adapters, and all 11 Chromium journeys. Main/total size about 771/1,464 KB. Generated the standalone editorial artifact and visually inspected two current phone screenshots. Browser microphone and adapter checks remain simulations, not native/device evidence.
- Four reproduced findings remain: nine underconstrained blanks and four excluded grammatical equivalents reject valid answers; deferred recording start can resolve after suspension with zero stop calls; edition spelling/topic grades can change without invalidating editorial approval. Coordinator independently reproduced all 13 answer cases and both isolated runtime scenarios. Existing passing suites do not cover these defects. Snapshot repro scripts exit 0 when the recorded bad outcomes occur; no fixed behavior is claimed.
- Added concise Requests 17–19 under the existing APP-DELIVERY ownership for grammar grading, recording cancellation and approval fingerprint correction. First next action is for the current app owner to read the review, correct these findings with meaningful regressions, then rerun checks. No app or editorial completion is claimed.
- Actual `release:check` exits 1 with 77 missing requirements. `audio:prepare` exits 2 before any request because the owner source/model/voice/approval is unset. Real project/storage mappings, approved audio, native/device evidence, platform privacy and the owner's editorial/launch decisions remain missing. No credentials or actual approvals were fabricated; all fixture approvals are clearly synthetic and isolated.
- Final sync still shows main at the preceding published handoff and app at `ebc5ca1`; no eligible open research unit exists, other claims are not stale and R-INT dependencies remain unmet. This worker cannot take over fresh app/research implementation claims. Preserve them and resume after status/ownership changes; owner audio/project/native prerequisites remain necessary even after code fixes.
- Board, memory and review handoff are current. Native/deferred Chrisverse/Kanban/Obsidian and generic discovery/reload remain absent; existing external records await reconciliation, no external write claimed. This is a blocked overall goal with completed independent review, not a finished application or research stage.

## 2026-10-17 · codex-local · owner-directed local implementation resumed
- Owner explicitly requested immediate development, a local version first and videos later. Reassigned the existing APP-DELIVERY claim to codex-local and pushed its lock; build on the existing published implementation, preserving other research claims.
- The prior ownership-only pause is superseded. Local development proceeds without production credentials, media production or MCP activation. Fix Requests 17–19 with real regressions, test learner journeys and leave the local app running; retain honest pending media/research/release states.
- Native Chrisverse/Kanban/Obsidian tools remain absent on a fresh registry check; this does not stop coding. Repository board/memory carry progress until existing external records can be reconciled.

## 2026-10-17 · codex-local · local app delivered for integration
- Implemented a portable standalone local app: 1.64 MB HTML with all 48 SHA-checked topic packs, bundled code/styles and three original Blender assets. No server/account/cloud is needed for practice. Added documented Node 24 build/run commands and CI artifacts. Videos are deferred; listening audio stays honestly pending.
- Corrected all 90 grammar free responses with explicit lexical/meaning constraints and authored equivalents/explanations. Fixed delayed microphone consent/background cancellation in shared, browser and actual native source; browser tracks close even on recording-storage failure. Approval fingerprints now include the entire catalog with stable object-key ordering and meaningful array order. Requests 17–19 are complete.
- Two existing delegates supplied grammar/runtime patches in the existing checkout; coordinator inspected/copied their pinned files, regenerated outputs and verified final behavior. No new worktree or reference-content copy. All research claims and files remain intact.
- Final checks pass: TypeScript plus 90 automated tests, seven grammar regressions, four native-source permission simulations, compiler/audit (34 original draft lessons / 368 questions / 96 words), 24 routes and package budgets (about 772/1,475 KB), development/synthetic-cloud adapters, release guards, 11 full Chromium journeys and seven offline local checks. Current phone screenshots were inspected. Real development service runs on port 4173 with actual document/bundle verified.
- Managed Chromium blocks direct file navigation; no policy bypass. Standalone tests serve the exact HTML over loopback and disable networking during practice. Microphone checks use simulated input/API doubles, not native devices. Direct-file opening on this machine, native DevTools/device behavior and publication are not claimed.
- Plan re-cut for owner scope: APP-DELIVERY is the local milestone; subsequent native/project/audio/publication preparation belongs to APP-NATIVE. Content remains draft; no research gate, full national coverage, model choice, rights grant or editorial/release approval is inferred. Existing October 16 bad-outcome probes are historical; use current desired-behavior regressions.
- Next: integrate the checked local app on main and mark the local milestone done in the same push. Future owner should claim APP-NATIVE for real DevTools/device validation and actual project/media preparation. External MCP tools remain absent on fresh registry inspection; repository board/memory are current and existing external records await reconciliation, with no external write claimed.
- Updated and saved the complete environment install_script/start_skill for the tested Node 24 local build, real service startup/readiness, offline checks and standing external-memory protocol. Unrelated network/secret/repository settings were preserved. Draft save is not publication or a fresh-task restoration claim. Portable ZIP includes the standalone app and Chinese instructions.
- Integration: fetched unchanged main d6738e3, rebased implementation and pushed checked branch bf8727b with an exact lease against the earlier remote checkpoint; squash-integrated the app on main. Marked APP-DELIVERY done for the requested local scope and left APP-NATIVE open/unclaimed. Main includes the usable implementation, all current research unchanged and the local build instructions.

## 2026-10-17 · codex-course · owner continuation to all lessons
- Owner rejected stopping at the 34-lesson foundation and directed continuing through all lessons. Added APP-LESSONS and the comprehensive original-course scope on main; videos remain deferred. No native publication or research ownership change is implied.
- Audit found uncovered grammar objectives, only four vocabulary lessons, and expression topics with tasks but no lesson records. Work now covers original grammar, all 29 thematic domains across skills, expanded vocabulary, pronunciation knowledge, delayed checks and a visible complete course inventory.
- Fresh registry still has no Chrisverse/Obsidian/Kanban or generic discovery/reload tools. Repository memory/board/log carry progress without claiming external writes; independent authoring continues.

## 2026-10-17 · codex-course · complete original lesson inventory authored
- Authored the full original capability-course inventory: 413 lessons, 4,804 tasks, 1,690 distinct headwords and 245 topic packs. All 29 themes have reading/listening/speaking/writing lessons; 58 grammar objectives have executable anchors and eight pronunciation-knowledge units are included. Every topic, task and word belongs to immediate/delayed lessons. Videos remain deferred; 99 scripts/31 listening lessons await approved audio.
- Two authorized existing delegates completed the vocabulary and thematic reading/expression lanes, then independently reviewed the other sources. Coordinator applied concrete ambiguity/collocation/task-model corrections, preserved existing IDs and authored legacy expression scaffolds. Full vocabulary source fields, headwords, variants, target occurrence and examples were checked. One old discover example was corrected so its target can actually be masked.
- Integrated grade/term/skill/theme/status/search course filters and paging. Compacted generated catalog arrays with exact round-trip testing and UTF-8 output after the expanded native main package exceeded its safety budget; limits remain unchanged. Current main is about 1,641 KB, development total 10,039 KB.
- Full-course controller/pack/storage/delayed-review tests uncovered a real feedback leak: passage feedback exposed later answers, making independent delayed completion impossible. Shared-passage reviews now defer feedback and evidence until submission; self-review advances its practice schedule without becoming verified retention. All 511 automated tests passed after correction. New inventory browser flows pass; full diagram layout/contact-sheet checks and final handoff are in progress.
- The external registry still lacks Chrisverse/Kanban/Obsidian and generic discovery/reload; existing external records await reconciliation. No external write, native/device check, audio model choice, reference-content reuse, official textbook mapping, research completion, editorial approval or publication is claimed. APP-LESSONS remains claimed until final checks/integration.

## 2026-10-17 · codex-course · complete local course checked for integration
- APP-LESSONS is ready for integration: 413 original draft lessons, 4,804 tasks, 1,690 distinct headwords and 245 hash-checked packs. Every task/word belongs to immediate/delayed lessons. All 29 themes cover reading/listening/speaking/writing, with 58 grammar anchors and eight pronunciation-knowledge units. Complete inventory filters/search/paging and a rebuilt 10.04 MB offline HTML are included; the ZIP was overwritten and its entries/CRC verified.
- Final TypeScript and 511 tests pass, including all 413 lesson lifecycles, real missing-audio rejection, saved progress and distinct delayed checks. Seven grammar regressions, four native recording simulations, 11 browser journeys, seven offline checks, six expanded-course browser checks, coverage/audit, static package checks, development/synthetic-cloud adapters and release rejection guards pass. Main/development size is about 1,641/10,038 KB with unchanged safety budgets. Browser/API evidence is not native/device validation; direct-file opening is blocked by managed Chromium, so offline checks serve the exact standalone HTML then disable networking.
- Independently reviewed source lanes and 245 topic figure representatives. All 4,804 instructional figures were rendered at 320/390/768 widths without horizontal overflow. Corrected actual reading-context midword truncation/internal placeholders with full-paragraph evidence and a ten-item regression; retook sheets with isolated pages/font readiness. Apparent heading clipping was a scaled-preview interpretation error; enlarged PNG inspection confirmed complete text. Bounded review and source SHA-256 evidence are in docs/reviews/course-2026-10-17.md and its source manifest. All content remains draft, not editorially approved.
- Runtime corrections: shared-passage delayed reviews defer feedback and evidence until submission so later answers are not exposed; persisted reload respects that boundary. Subjective completion advances practice scheduling without becoming measured retention. Vocabulary meaning exposure makes immediate spelling assisted. Compact generated catalog tuples preserve exact runtime data and avoid a main-package overflow.
- Owner preference remains needed for audio source/model/voice; an optional question was sent and no approval inferred. All 99 scripts/31 listening lessons await actual approved audio. Videos remain deferred. The authored progression is not a verified publisher-unit map or exact official vocabulary set. Research, reference files and other claims are unchanged; no gate, native release, editorial approval or publication is claimed.
- Fresh registry still exposes no Chrisverse/Kanban/Obsidian or generic tool-search/reload capabilities. Repository board/memory/log are current; existing external records await reconciliation, with no external write claimed. Next: squash this checked branch onto current main, mark APP-LESSONS done in the same push; continue actual audio/native work under APP-NATIVE when its prerequisites are available.
- Integration: fetched origin/main at 7ff19f3, rebase was a no-op, and all final checks passed. Published author/full-course at 7e5c98c, squash-integrated the complete original local course on main, and marked APP-LESSONS done in the same push. Real development document and bundle return HTTP 200 on port 4173; portable ZIP entries match the final HTML. APP-NATIVE remains open and research claims are preserved. Existing external memory/board reconciliation and actual audio/source choice are still pending.

## 2026-10-17 · codex-interaction · owner challenges maths-app parity
- Compared maths main 933ab32 fun/design/content contracts. Maths requires predict/explore/spot/check rhythms and has live manipulable models; English course inventory and static explanation coverage do not establish equivalent interactive pedagogy. The prior authoring milestone remains delivered, but experience parity is not claimed.
- Added APP-INTERACTION for sentence experiments, passage evidence selection and visual scene tasks with actual browser/native behavior. The owner explicitly permits AI-generated images; AGENTS.md now records this override. Research claims, audio policy and deferred videos are unchanged.
- Native/deferred registry still lacks Chrisverse/Kanban/Obsidian and generic tool discovery. Local board/memory carry this decision; existing external records await reconciliation. No external write is claimed.

## 2026-10-17 · codex-interaction · interactive language foundation ready
- Implemented 13 original four-phase workshops: commit a prediction, change a condition, diagnose an actual error and transfer to a fresh context. Twelve grammar topics plus the spatial scene provide 39 live conditions. Topic-linked course cards open the relevant workshop; completed workshops lead into actual topic practice. Explore progress survives local restoration/backup/import/reset and never creates independent attempts, lesson passes or mastery.
- Added post-answer original-sentence evidence selection for 264/298 reading tasks, with conservative literal mapping and specific linked feedback. Unsupported evidence stays hidden. Timed and shared-passage delayed work cannot expose it before submission. Explanation reasons reveal progressively. All authored course/task/word counts are unchanged; this is the first interactive lane, not proof of full maths-style exploration coverage in all 413 lessons.
- Generated and inspected one empty desk backdrop through image_gen.imagegen under the owner's explicit AI-image override. Book shapes, on/under/next-to positions and English labels are deterministic code. Registered provenance and delivered SHA-256 in content/visual-assets.json; source and instructional renderer/geometry/art hashes now participate in editorial fingerprints. No model-generated answer text, reference copy, audio-model change or release approval.
- All 561 tests, interaction/course audits, grammar regressions, 25-route package checks, release guards and native API simulations pass. Existing 11 browser journeys and seven offline checks pass. Eight new browser checks exercise all 13 workshops and 39 conditions, wrong/correct paths, storage restoration, evidence gating and real course-practice handoff; screenshots include all 36 sentence conditions, all three scene positions and the actual reading locator. Two delegates and root inspected every new condition; no unresolved visual/content finding. Browser/API checks are not native devices; HTTP delivery is enabled for document reload, then networking disabled during workshop practice.
- Local build is 10.12 MB; main/development size about 1,704/10,101 KB, under unchanged budgets. Final artifacts are dist/local/index.html, dist/local-english-app.zip and test-results/interactions/. Comparison and remaining teaching gaps are in docs/reviews/maths-interaction-comparison-2026-10-17.md. Videos remain deferred; 99 scripts still await approved audio.
- External native/deferred Chrisverse/Kanban/Obsidian and generic discovery tools remain unavailable. Repository memory/board/log record decisions and evidence; no external write claimed. Next: integrate this checked interaction foundation on main, then extend domain-specific exploratory sequences throughout the course; native/audio/textbook/research gates remain separate and incomplete.
- Integration: fetched unchanged main f680b0d, rebase was a no-op, and published platform/interactive-lessons at 0987b7b. Final full-course browser regression also passes all six checks, rendering all 4,804 figures at three widths. Squash-integrated the verified interaction foundation and marked APP-INTERACTION done in the same main push. Added APP-TEACHING for the explicitly unfinished per-lesson exploratory coverage, rather than claiming maths parity. Running local document, bundle and scene asset return HTTP200; current ZIP entries/CRC and all nine instructional source/art hashes match. No native release or external MCP write is claimed.

## 2026-10-17 · codex-solo · every lesson teaching checkpoint
- Continuing the existing APP-TEACHING claim without delegation, as explicitly required by the owner. Added native/browser five-phase studios for all 413 lessons: prediction, source-based assembly, skill-specific exploration, diagnosis and a different transfer task. Vocabulary covers all 1,690 words; eight phonetics activities include immediate sorting feedback; communication preserves original and revised drafts with explicitly subjective self-checks.
- All 977 automated tests pass, including 413 complete checked-pack studio lifecycles, both spelling variants, persistence/import validation, wrong-answer gates, unchanged mastery and unexposed delayed tests. Compiler, course/content/package audits, grammar regressions, native API simulations and release guards pass. Main package is about 1,744 KB under the unchanged budget. Listening remains text preparation, audio pending; videos deferred; all content remains draft.
- Corrected the direct Studio MCP client's doubled Bearer scheme without changing credentials. The saved token-free helper passes initialize, 46-tool discovery, capabilities and WeChat status. Read the actual vault guide/context and shared board, created the missing English project records and saved Obsidian memory. Kanban task IDs and paths are in project-memory.md; no native plugin injection is claimed.
- Synced an isolated actual WeChat project to MacStudioExternal and ran the official simulator SDK under the shared lock. First native process exited 1 with an automation timeout; no lesson screenshots or native success claimed. Closed only that project and began narrow compiler/runtime log diagnosis. Browser studio/layout/contact-sheet review and old journey regressions are ongoing.
- Next: fix actual DevTools failure, inspect all new figures, rerun affected checks, update external records and squash-integrate only checked work. Research files/claims are untouched. Owner-selected audio and actual account/device/publication requirements remain separate; no model choice, release approval, upload or publication inferred.

## 2026-10-17 · codex-solo · native compiler fix and action-first lessons
- Actual DevTools exposed a real compiler defect missed by the earlier browser/API checks: 245 subpackages exceed WeChat's limit of 100. The compiler now groups the same 245 hash-checked topic packs into six subpackages, each below a 1.5 MB build budget. Main is about 1,725 KB; package checks enforce the native count and per-package budget. Both native adapter modes now load and validate all 4,804 questions, not only the first topic.
- The actual English app now compiles and opens onboarding. The installed official starter passes its launch/tap/text/screenshot checks. English simulator walkthrough is still in progress; helper wrapper status is never treated as nested-test success. SDK callback compatibility and return-to-course navigation are handled in the authored test runner, with isolated project cleanup and shared GUI locking.
- Owner clarified that learning itself must be hands-on and easy to understand. Added a literal live sentence slot for word insertion, preserved exact authored meaning cues, shortened prompts and removed duplicated lesson introductions. Reading uses source selection; writing/speaking uses one criterion at a time before revising a real draft; spelling/sequence boards and phonetic sorting remain active tasks. Longer references and illustrated explanations appear only on demand, tied to current choices. No new reference copying or audio choice.
- Current stable build and all 979 automated tests pass. Final all-lesson browser evidence is regenerating after these interaction changes; native whole-course verification remains unfinished. Research and other claims are unchanged. APP-TEACHING stays claimed until final visual/native checks and integration.

## 2026-10-17 · codex-solo · native controls and concise references
- Browser verification covers all 413 studios / 2,478 states at three widths, 1,962 assemblies and 201 contact sheets. Inspected the complete overview set and representative full-size modes. Thirteen real exploration-control flows and fourteen original communication transfer-reference flows pass. The latter are outside the 4,804 scored-task catalog and receive their own diagram review. No editorial approval is inferred.
- Actual native typing exposed a controlled-textarea defect: saved drafts existed, but the bound visible before/after fields were stale. Both are now patched; real simulator typing and two source-level native regressions pass. Every authored studio is tested in both edition spellings; newly derived transfers now adapt summarize/summarise correctly. Fresh transfers no longer inherit unrelated old passages/media, and their diagrams list short facts rather than duplicating the full model answer.
- All 982 automated tests and both-spelling teaching audit pass. Latest actual native run bb3795e09f2e47bf92d236b90d2445a8 is checking explicit compact source-button geometry and the whole course. Prior run stopped at listening navigation; it is not a whole-course pass. Added post-capture route assertions and failure context to distinguish a harness navigation race from application failure. Native verification and integration remain unfinished; APP-TEACHING stays claimed.
- External Kanban is current through the draft fix; the existing English Obsidian project note is being updated. Videos remain deferred, actual listening still awaits approved audio, content stays draft and reference files are untouched.

## 2026-10-17 · codex-solo · final native presentation and review recovery
- Actual native screenshots exposed cramped communication criteria and narrow self-review buttons. Both platforms now use short numbered criterion tabs while retaining the full active criterion below; native self-checks span the card. Actual native width assertions and complete representative flows pass. Native illustrated references also render; their scroll containers are being checked explicitly.
- The 982-test suite, both-spelling teaching audit, 13 current-source browser exploration flows and 14 fresh-task reference checks pass. The browser action runner now builds its own source bundle, preventing stale fixture fingerprints after authored transfer changes. The exhaustive browser audit now covers every assembly at all three widths, in addition to all six states per lesson. A workspace restart interrupted screenshot generation; it is being resumed, not reported complete.
- Native coverage is deliberately separated: complete end-to-end flows and real controls for every skill, plus an exhaustive render of all 413 real lesson pages using explicit phase-two fixtures. Full controller lifecycles for all lessons are covered by the automated suite; a render fixture is not a native end-to-end completion. Same-page native query reuse proved unreliable, so navigation returns through the actual course action. Job d760bac9b72b42f7b6127d3c5c055fba runs independently on the Mac; inspect actual results before claiming success.
- Updated the existing environment setup draft with studio checks, solo-work requirements, shared-GUI coordination and the private helper path. Save confirmed; the draft is not applied/published and fresh snapshot restoration is not claimed. APP-TEACHING remains claimed pending final native/browser evidence and integration.

## 2026-10-17 · codex-solo · edition-specific phonetics correction
- Found British practise on an American PEP thought-group card during visual review. Written phonetics cards now use the exact profile edition's spelling. Added a policy regression; all 983 tests pass and the 826-model audit passes. Compared every model fingerprint before/after: only American l-p-thought-groups changes; all other 825 models are identical.
- The final browser review passes all 2,478 lesson states AND 1,962 assemblies at each of three widths (13,320 layouts), with 201 regenerated sheets and the full 17-overview scan. All fourteen new transfer figures and seven actual native scrolled reference diagrams were inspected. The current local app document and learner bundle return HTTP 200 after the cloud restart.
- Native exhaustive page job 9372033579184c898746a28fc9eeb63e is in progress, with seven full skill flows passing. It uses supported SDK course navigation on every page; faster same-page transitions were unreliable and were rejected by explicit route assertions. After that job releases the shared lock, run focused American/British checks for the corrected thought-group card and inspect actual assembly boards. The runner supports explicit lesson/output/spelling selectors; fixtures and full flows remain distinct in evidence.
- Source and reference claims are preserved. Audio still awaits the owner-selected source/model, videos remain deferred, and content remains draft. APP-TEACHING stays claimed until native review, final evidence and integration.

## 2026-10-17 · codex-solo · accurate one-letter activity instructions
- The one-letter target a correctly uses sentence assembly, but its old prompt still asked students to assemble letters. Its title and prompt now describe building the example sentence from word tiles. All 984 tests and the 826-model audit pass. Relative to db5fd03, exactly three model variants change: American thought-groups plus both spellings of the first linking-word lesson; the other 823 are identical. Exact scope is in the model-change review record.
- Final browser fixtures now explicitly synchronize the repository spelling with the PEP profile instead of only changing stored profile fields. The current American review is regenerating, including the corrected a figure; source-level British coverage remains separately audited. Real control fixtures build their own current-source bundle and check answered states at three widths.
- Native job 9372033579184c898746a28fc9eeb63e continues through the supported course navigation. Final focused native checks will cover the two changed lessons, both spelling profiles, and actual native assembly-board geometry. No full native pass, release or editorial approval is claimed before those actual results.

## 2026-10-17 · codex-solo · final all-lesson development verification
- All 413 original lessons now teach through concise, hands-on studios. The final build passes 984 tests, the 826-model spelling audit, course/content/interaction/package checks and eight fresh offline checks. Browser evidence covers 13,320 layouts (all six states and every assembly at three widths); all seventeen overview sheets, fourteen new transfer figures and representative readable states were inspected. No editorial approval or measured learning-effect claim is inferred.
- Actual WeChat job 9372033579184c898746a28fc9eeb63e completed 413 real lesson routes and seven full representative flows with nested exit 0 and no exceptions. The other rows are explicit render fixtures. Visual inspection found five empty captures; the runner now requires actual bound lesson/stage controls. All five subsequently rendered visibly and completed focused full flows. Failed screenshots are retained.
- Final American follow-up 9c70b8b12f9d4b6f98fdda698c5c9995 completed eleven full rows before a later SDK prefetch failed; that whole job is not a pass. Fresh bounded job 10ae47c60cbf4cf58d1c50389f30c396 passed the remaining three with nested exit 0. British job 2b9682d652fc4e09bf8380d8a1376fd5 passed both changed lessons. Actual letter-row geometry/taps, single-letter sentence instructions, practice/practise card text, saved typing, evidence selection and scrolling reference diagrams were checked and inspected. Exact boundaries/jobs are in the teaching review and native JSON record.
- Both development ZIPs match the final source entry by entry: dist/english-wechat-development.zip is importable in DevTools; dist/local-english-app.zip is the portable offline app. Source stays draft, videos are deferred, and approved audio, real-device permissions, production AppID/cloud setup, publisher mappings and editorial launch review remain pending. Reference files and research claims are unchanged.
- APP-TEACHING is in review for squash integration; no further delegation. Existing Obsidian/Kanban records are being reconciled with the final evidence. The environment setup draft was saved but still needs review/save/publish in environment settings for reuse; no fresh-restoration claim or app publication is implied.

- Integration: fetched main b0ad1c7 and re-read the live board/log; no concurrent main change. Rebase was a no-op. Rebuilt the final app and reran TypeScript, all 984 tests and all course/interaction/teaching/content/package checks successfully. Pushed the review branch at 0bc51ae, then squash-integrated the checked source and set APP-TEACHING done in this same main push. No reference changes or other claims were included. APP-NATIVE remains open for actual phone/production/audio work; the guest simulator milestone is already checked. Existing external memory/cards are being saved with the integration commit and exact boundaries.
- External closeout confirmed: saved the existing Obsidian Projects/Chinese Junior High English.md note with main f6a6207, exact native job boundaries and the next owner-only requirements. Both existing English Kanban cards are done with concise checked outcomes and evidence links; no competing board or note was created. Source remains draft and APP-NATIVE is open for actual phone/production/audio work.

## 2026-10-17 · codex-solo · APP-UI claim
- Owner rejected the whole-app presentation and explicitly requires an actual UI upgrade judged against the maths app, followed by further improvement whenever concrete gaps remain. Claimed APP-UI for coherent product design and native/browser verification, not a colour-only change or test-count acceptance. Work remains solo; course facts, research claims and publication boundaries stay unchanged.
- Next: inspect current maths source and rendered journeys beside English, write concrete comparison criteria, then implement and repeatedly review the complete app flow. Existing lesson/native development delivery does not establish UI parity or ship readiness.

## 2026-10-17 · codex-solo · whole-app UI checkpoint
- Rebuilt all five main sections, progressive course filters, three-stage validated onboarding and compact practice setup. Native and browser presentations share the same typed model. All 413 lessons and independent/assisted/self-review distinctions remain. Added identifiable communication task previews within the original package budget; reused only owner-controlled sister-app study-tool art with provenance.
- Repeated visual review found and corrected stale setup warnings, completed-studio routing, listening text-preparation routing and separated letter tiles. Six actual product journeys pass with 41 screenshots; eleven existing journeys and 988 automated tests pass. Native trace caught a hidden builder page reopening after the session; added a visible-route guard and matching-route draft preservation, with a source-VM regression. Expanded native validation is rerunning; failed jobs are retained and are not reported as success.
- Next: inspect the fresh native result/screens, finish remaining regression checks and regenerate exact-source ZIPs before squash integration. APP-UI remains claimed. External Kanban and existing Obsidian project note have been updated. Content stays draft; no reference edits, production publication, real-phone or approved-audio claim.

## 2026-10-17 · codex-solo · native navigation repair
- Actual route traces identified an older failed navigateTo callback redirecting back to the builder after a session opened. Guarded all native navigation generations and limited redirect fallback to stack-limit errors. Both packaged/cloud adapter regressions pass. Focused actual native job e47507a4cbdd4fce8a97732abeef61bf passes with nested exit 0, including real numeric input, picker changes and a visible custom session.
- Expanded actual native walk fc8a0d051e1d4212a56311083afa24ae passes all connected product flows and reaches the secondary-route survey, then the SDK fails to issue report navigation. This entire job is retained as failed. The runner now retries once only when the SDK’s physical path never changed to the requested route; a requested route with wrong app state still fails. Final capture is rerunning.
- Final browser checks pass: 988 tests, six product journeys/41 captures, eleven existing journeys, eight offline checks, all course figures at three widths, 13 workshop/control flows and fourteen fresh transfer diagrams. All 13,320 studio layouts pass; all seventeen overview scans and readable representatives were inspected. Reworded defensive UI caveats into useful learner instructions while preserving honest audio/exam/self-review status. APP-UI remains claimed pending fresh native evidence and integration.

## 2026-10-17 · codex-solo · final native UI evidence
- Whole-app native job df36731eb8684018a419922367f2b4ed passes with nested exit 0, 34 actual screenshots, four connected control checks and no simulator exceptions. Downloaded and verified every PNG; inspected all nine readable contact sheets. Retained actual main-section captures under docs/screenshots/ui-2026-10-17/.
- Further source and screenshot review caught two final native problems: a fresh physical home route could skip initialization, and a more-specific global button selector squeezed quiz choices. Matching-route foreground preserves setup; a newly attached page now initializes explicitly. Removed the conflicting selector and kept checked answers legible. Actual follow-up 861ad544a23744d6ab18ba259d617c80 passes nine fresh-home/builder/answer captures and native width assertions, nested exit 0.
- All 989 tests, six refreshed product browser checks and eight offline checks pass. Source/content/package audits pass. Seven-mode native follow-up is running. The earlier seven-mode attempt failed because the old harness assumed empty QA counters; it now compares preserved baseline evidence and restores exact QA state in finally. This avoids deleting genuine existing test evidence or falsely accusing studios of creating it. Failed jobs remain retained. APP-UI stays claimed until that final result and integration.

## 2026-10-17 · codex-solo · UI ready for integration
- The repeated comparison now meets the recorded product UI criteria for the inspected journeys. Rebuilt every main section, onboarding, progressive course/builder filters and shared learning controls; corrected the material native/state/layout problems found during follow-up. Actual readable evidence is retained in docs/screenshots/ui-2026-10-17/ and the comparison review.
- All 989 tests pass. The final CSS again passes all 13,320 studio layouts; the earlier complete set of 201 sheets and all seventeen overview scans was visually inspected. Current product/offline checks pass (41 product captures, eight offline checks), alongside the existing eleven journeys, course figures, interaction and transfer checks. No source or reference content was released.
- Actual native job df36731eb8684018a419922367f2b4ed passes the 34-screen whole-app walk. Follow-up 861ad544a23744d6ab18ba259d617c80 passes nine fresh-home/choice-control captures. Final lesson job 8364bfca0e0a4f74b9f7a02bc55418d4 passes all seven complete modes and 22 captures, including real taps/typing/evidence/sorting and scrollable references. Inspected all seven readable mode sheets and the final built letter board. Every successful job has nested exit 0 and the whole-app/lesson jobs have no simulator exceptions. The source-VM fresh-home regression and native geometry assertions guard defects the browser missed.
- APP-UI is review. Next: rebase on main, rerun required checks, regenerate exact-source ZIPs, squash-integrate and close out the existing external card/memory with the main commit. APP-NATIVE remains open for phones, owner-approved audio and production work. Videos are deferred, all content is draft, publisher mapping and editorial launch review remain pending.

- Integration: fetched main 0cd7f4d and re-read the live board/log; no concurrent main changes. Rebase was a no-op. Rebuilt the final local/native app and reran TypeScript, all 989 tests and all course/interaction/teaching/content/package checks successfully. Final CSS passes all 13,320 studio layouts. Both ZIPs pass CRC checks and match every source entry; source hashes, native jobs and package hashes are pinned in docs/reviews/ui-2026-10-17.json. Pushed review branch 29f0634, then squash-integrated the checked source and set APP-UI done in this same main push. No reference changes or other research claims were included. Existing external Kanban/Obsidian records are being closed out with this integration commit. No app publication, audio approval or phone validation is implied.

## 2026-10-17 · codex-solo · exam-teaching scope
- Owner requests substantive individual lesson upgrades and a proper exam-focused app with mock papers. Added APP-EXAM-LESSONS and APP-MOCKS as sequential units; existing UI completion does not imply teaching/exam completion. Work remains solo.
- Initial audit finds generic model-reconstruction/diagnosis tasks and random timed practice rather than authored papers. First unit audits all 413 lessons and strengthens their specific exam reasoning, misconceptions and transfer; second adds original structured written papers and correction flow. City/cohort verification, audio approval and honest score evidence remain required; no full-marks guarantee or official local paper is invented.

## 2026-10-17 · codex-solo · APP-EXAM-LESSONS implementation

Added individual exam coaching across all 413 lessons, 55 original grammar contrasts and
72 authored model-role maps with task-specific revision checks. Reading now connects
questions to evidence across the lesson; writing rejects mismatched sentence links.
Reviewed and corrected model-only requirements, the younger-brother check, Sunday in t12,
and photo provenance/date checking in t20. Kept all content draft and delayed items hidden.

991 tests, course/teaching/package/content audits and native adapters pass. Native job
3a3e77a3a55447ae91c6ee9ffb824df6 passes 11 full flows with 45 captures and no exceptions.
Browser checks cover 15,795 layouts and 13 control journeys; all 16 new teacher-review
sheets and the four changed model visuals were inspected. See the detailed review.
Copy-only native follow-up 7aeda37e77ec4bc5a2abc7a399a4552c also passes both flows with eight captures and no exceptions. Next: integrate this
unit, claim APP-MOCKS and author fixed original written papers and correction journeys.
Open owner question remains approved audio; it does not block written practice.

## 2026-10-17 · codex-solo · APP-EXAM-LESSONS integration

Final native visual review moved the full diagnostic task into optional scrollable materials,
leaving a short instruction. Follow-up 6b4d6b30ae484a05a961bb14a532b793 passes the full
writing flow (four captures, nested exit 0); the final screenshot was inspected. All 991
tests pass again, as does the 997 KB main / 10,338 KB total package check. Rebased onto
current main. Integrate this unit as done; next claim is APP-MOCKS. No new owner decision
is needed for original written papers.


## 2026-10-17 · codex-solo · APP-MOCKS review

Authored eight original 60-minute/60-mark papers, 200 new draft questions reserved from
lesson and delayed pools. Added preflight, stable saved deadlines, grouped answer sheets,
flags, section scores, cause/evidence corrections, lesson returns and separate essay rewrites.
Objective marks stay out of 40; writing's 20 require human assessment. Fixed native card/
number widths and an initial route-binding race found in actual screenshots/testing.

All 1,006 tests pass with one file worker; browser mock, product, eleven connected journeys,
eight offline checks and course/teaching/content/package audits pass. Native eight-paper job
ea9c3e5a07364b1e9a6effa4e6ec5d6e and final two-paper job de32c81ae1eb47adaeb5eb0604cab6d0
pass with nested exit 0 and no simulator exceptions. Every new diagram rendered; all thirteen
sheets and final changed diagrams/native frames inspected. Failed/intermediate checks are
recorded in docs/reviews/mock-exams-2026-10-17.md. Both archives match source and pass CRC.

Next: rebase on current main, rerun required checks and squash integrate. No official city
format, approved audio, editorial launch approval, real-device testing or publication is
claimed. These remain the existing owner/research/native follow-ups; no new question blocks
this original written training deliverable. Reference files and other claims are untouched.


## 2026-10-17 · codex-solo · APP-MOCKS integration

Review branch checkpoint 55d3125 rebases cleanly onto current main. All 1,006 tests pass
again with the original timeouts and one file worker. Squash-integrate and mark APP-MOCKS
done in the same push. Final native route/writing job de32c81ae1eb47adaeb5eb0604cab6d0
passes both complete flows; actual final report and corrected preflight screenshots inspected.
Archives were refreshed and verified against source. Obsidian and the existing mock Kanban
card are updated after the main push with its exact SHA. The next separate milestone is
APP-NATIVE/official mapping/approved audio; no publication or audio selection is authorized.


## 2026-10-17 · codex-solo · visual teaching scope

The owner requests a further substantive revamp of every lesson, with generated pictures
and more interactive elements. Add APP-VISUAL-LESSONS to the plan/board; preserve completed
exam papers and all other claims. Use lesson-specific tasks and exact coded learning clues,
not decorative images as evidence. Work stays solo. Claim this unit before implementation.


## 2026-10-17 · codex-solo · APP-VISUAL-LESSONS local review

The owner requests more substantive visuals and interaction in every lesson. Implemented all
413 explicit missions on `author/visual-lessons`: 1,002 boards / 2,202 slots, 55 authored live
grammar experiments, contextual word cards with concealed recall, literal evidence chains,
saved original expression frames and written sound-pattern sorting. Generated and inspected
two original scene illustrations; inspected every teacher sheet and changed student screen.
No reference material was copied; no content was released; mock papers and other claims remain intact.

Local validation passes 1,424 tests with original timeouts; 6,936 new visual layouts and nine
actual control journeys; 15,795 retained studio layouts, thirteen exploration flows, eleven
connected journeys, eight offline checks, six product checks and both native-adapter simulations.
Course, teaching, mock, content and package audits pass. Fixed exposed recall answers, ambiguous
vocabulary clues, spelling-converted IDs, unfinished-board navigation, excessive whitespace,
pitch arrows and a wrapped footer label. Both development archives match source and pass CRC.
Detailed per-lesson evidence and actual browser screenshots are on the feature branch in
`docs/reviews/visual-lessons-2026-10-17.*`; checkpoint 47278eb.

APP-VISUAL-LESSONS stays review, not done: actual new WeChat compilation/control checks are
blocked. Studio memory/Kanban work, but file access reports MacStudioExternal unavailable and
the authenticated archive transfer returned HTTP 400. No new native job was submitted and no
shared GUI was changed. Older native results do not prove this revision. Next: restore Mac
external-drive access, read `wechat/AGENTS.md`, coordinate the existing card/GUI lock and run
`scripts/devtools-visual-lessons.cjs` against this exact branch in both spelling variants. Inspect
actual nested job results and screenshots before native acceptance, then rebase/check/squash.
No new owner question blocks the completed local work. Approved audio, device checks, official
local/publisher mapping and publication remain separate existing follow-ups. Obsidian and the
existing visual Kanban card carry this same project/scope and exact blocker.


## 2026-10-17 · codex-solo · owner rejects lesson quality; comparison

Reopen APP-VISUAL-LESSONS on its existing branch/claim. The owner clarified that “Chinese” means
the Chinese maths app. Cloned maths main 933ab32 and compared authored sequences/components and
13 existing native screenshots, verifying each PNG against its Git LFS object. Four sampled
maths activities show object manipulation, state-specific wrong feedback and recovery; fourteen
existing proof/tile/number-line logic tests pass. This is a comparison of recorded native maths
evidence with English browser/source evidence, not a new run of the maths GUI.

English 702ef77 has broad functional coverage, but five reusable mission formats do not prove
413 individually redesigned lessons. Scene art stays static; most board checks compare the
selected card with a stored answer. Two grammar switches change highlighting within the same
full sentence. The new email mission can finish with zero original writing, and its handoff
restarts the retained studio at stage zero. Existing exploratory workshops and draft revision
remain useful foundations; retain their real progress/evidence safeguards.

The missing new native run is an additional blocker, not the main explanation for these teaching
gaps. Revised acceptance is recorded in the plan. The comparison report and browsable paired
evidence are being saved on author/visual-lessons. Do not mark the teaching revamp done or
reuse functional counts as a claim of parity. Next implementation should prove representative
whole lessons before another generated course-wide pass. No course code or maths files changed.


## 2026-10-17 · codex-solo · maths comparison completed

Comparison is saved in docs/reviews/lesson-quality-comparison-2026-10-17.md with machine-readable
evidence and fresh English captures. The standalone viewer /workspace/lesson-comparison/index.html
passes four cases, 22 frame selections and two responsive widths. All thirteen selected maths
images match their LFS hashes; fourteen existing maths model-logic tests pass. No fresh native
execution or all-maths-lesson quality review is claimed. Maths tracked files and English lesson
code/content are unchanged. The clone and local LFS setup are ready for further comparison work.

Confirmed the new English repair-state defect: choosing are leaves initial am on the canvas,
while feedback discusses are. Also reproduced the empty new writing mission and fresh handoff
into old studio phase zero. Corrected README, local instructions, project memory and the older
review to distinguish functional coverage from rejected teaching quality. APP-VISUAL-LESSONS
remains claimed and unfinished; new native access is an additional issue, not the primary gap.
Next: author and inspect coherent subject-specific exemplars before scaling another pass. No
new owner question is pending; the requested reference is the Chinese maths repository.

## 2026-10-17 · codex-solo · coherent lesson upgrade checkpoint

APP-VISUAL-LESSONS remains claimed on author/visual-lessons. Replaced the default extra
mission introduction and exact reconstruction stage with a single five-phase teaching path.
The checked-in workshop manifest covers every lesson: changing-condition grammar models,
contextual recall and original word use, evidence chains with a learner explanation, task-based
original expression plans and sound-notation changes. Repair feedback now retains the actual
attempt. Guided reading requires both an answer and evidence. Transfer questions are held out
of guided contexts; vocabulary has new original production tasks. Writing follows its actual
stated word range rather than accepting a four-word outline. Semantic judgments remain self-review.

First complete Chromium pass: 14 whole lesson journeys and 6,297 rendered workshop states at
320/390/768 widths. These are functional results, not teaching-quality acceptance. Visual review
identified and corrected long reading choice lists, redundant writing roles and misleading count
icons. Further polish adds borrow/lend direction models and live writing form feedback. The latest
core run passed 1,432 tests before that final polish; final build, core and browser checks are next.

MCP board and project memory updated successfully. wechat_status succeeds, but reading
wechat/AGENTS.md still reports unavailable MacStudioExternal access; no fresh native compilation
or GUI test is claimed. Continue local visual/content review independently. No owner decision
is needed to finish the local implementation.

## 2026-10-17 · codex-solo · local workshop review completed

APP-VISUAL-LESSONS is ready for local integration on author/visual-lessons. The review fixes
actual attempted-expression rendering, changing-condition diagrams, vocabulary production and
new-situation application, complete evidence premises, original task-specific plans, constrained
writing revision and visible sound notation. Twelve evidence chains now require two excerpts;
all 66 evidence lessons have individual short reasoning notes. Drafts survive content updates
and backward navigation. Guided completion remains separate from independent assessment.

Final checks pass: typecheck; 1,448 tests in 14 files; course/content/teaching/mock/package audits;
826 spelling variants; development/cloud adapter simulations; 22 whole browser lesson journeys;
6,608 states at each of three widths; six product checks; eight offline checks; eleven connected
app journeys; six mock journeys/audits, all eight preflights and all 200 mock visuals. Thirteen
exploration-control flows also passed. Reviewed the first panel in every lesson, both grammar
conditions and all 202 completed/wrong model states, with changed evidence states checked again.
These checks do not constitute full editorial approval, measured learning effectiveness or a
blanket claim of maths-app parity.

Saved the current report, machine-readable lesson inventory/results and nine actual app captures
in docs/reviews/lesson-workshops-2026-10-17.* and docs/screenshots/lesson-workshops-2026-10-17/.
The complete offline app and native development ZIPs pass CRC and exact source-entry comparison;
rebuild with npm run build:local and python3 scripts/package-development.py.

Fresh MCP check: wechat_status succeeds, but reading wechat/AGENTS.md reports MacStudioExternal
unavailable. No new native GUI job or compilation was attempted. Reopened the existing native
Kanban card as blocked so older validation cannot be mistaken for this revision. APP-NATIVE stays
separate; restore project access, read the shared GUI instructions, obtain its lock and run the
current devtools-teaching/product/mock runners. Approved audio (99 scripts), devices, editorial
review and verified local exam mappings remain pending. Content stays draft; videos stay deferred.
No new owner decision is needed for this local delivery. Final Obsidian/Kanban reconciliation
follows the integration push; the native blocker remains explicit.


## 2026-10-17 · codex-solo · local workshop integration

Squash-integrated the reviewed author/visual-lessons branch (e920ffb) on current main and set
APP-VISUAL-LESSONS done for its local implementation/review scope. Rebase was unchanged;
typecheck and static native-package checks pass again. The current review preserves exact
functional, visual and editorial boundaries; APP-NATIVE remains open, with the existing external
native card blocked by Mac project-drive access. No production publication, audio approval,
new native compilation or shared-GUI ownership is implied. Next independent session should read
current memory/board and resume native validation only when its project files are reachable.

Final reconciliation succeeded: the existing Obsidian project note was saved and read back.
Kanban confirms the local lesson card is done and the native card remains blocked. Main code
commit 9cb5fa7 matches the reviewed delivery fingerprint; the worktree is clean after handoff.


## 2026-10-18 (Sydney) · codex-solo · individual redesign requested

The owner explicitly requires a lesson-by-lesson upgrade and better use of generated pictures.
Reopen the existing visual lesson unit; the previous shared workshop implementation remains a
functional baseline, not completion of this new acceptance. Create an inventory with every row
pending, then author/review each lesson separately. Work stays solo. Pictures must support an
actual observation/comparison/story task, with inspected art and code-rendered exact clues.


## 2026-10-18 (Sydney) · codex-solo · first individual lesson reviewed

l-g-be is individually authored and reviewed; 1/413 complete under the new acceptance. The
original generated class photo drives seven speaker/referent tasks; a correct verb cannot bypass
wrong subject identification. Application is separate from prediction, and the fresh compound-
subject transfer is original. Visual review fixed a correct verb turning red for a wrong person
and reduced long tabs to a compact pager. Every dialogue and wrong/recovery/transfer state was
rendered and inspected. Whole browser flow, 21 width checks, reload and zero assessment records
pass; 1,449 core tests, typecheck, package and 826 spelling checks pass. All content remains draft.
See docs/reviews/individual-lessons/l-g-be.md. Other 412 rows remain pending. Next: individually
redesign l-g-present around habit evidence and verb agreement. Work stays solo on the same claim.


## 2026-10-18 (Sydney) · codex-solo · habits lesson individually reviewed

l-g-present is now reviewed: 2/413 complete. An inspected walking scene plus explicit multi-week
records distinguish a habit from one snapshot. Four subject tasks contrast I, a singular name,
an and-group and a with-phrase; four live word-building tasks cover finishes/studies/plays/goes.
The diagram retains wrong spellings. Visual review removed answer leakage and duplicate plus
signs, separated rewriting from suffix addition, enlarged weekday text and moved role labels off
faces. All eight task figures, wrong forms and transfer were inspected. The whole real-control
journey and 24 width checks pass; core 1,450, typecheck, 826 spelling and package checks pass.
The first lesson was rechecked after shared rendering changes. Native GUI remains separate.
Next l-g-continuous will use only actions actually supported by its newly generated picture;
holding an open book is not itself proof of reading, nor a held plane proof of folding it.


## 2026-10-18 (Sydney) · codex-solo · ongoing-action lesson individually reviewed

l-g-continuous is reviewed: 3/413. Its inspected original scene supports holding/watering,
with six actor + full-predicate tasks and two actual word-building tasks for making/running.
No image is treated as proof of unseen reading or folding. Wrong actor and wrong form feedback
remain separate. Application and fresh transfer are distinct; delayed items remain untouched.
All eight task figures, error states and transfer were inspected. The whole browser journey,
24 width checks, reload and zero assessment records pass. Reduced repeated banners and time
text. Next: l-g-past, using documented completed events, irregular verbs and did + base forms.
The unit remains claimed and unfinished. Native project-drive access is still a separate blocker.


## 2026-10-18 (Sydney) · codex-solo · past-events lesson individually reviewed

l-g-past is reviewed: 4/413. An inspected cleanup diptych and fictional dated records anchor
seven distinct tasks: completed events, irregular went, cancelled activity, did + base in negative
and question forms, was/were states and stopped spelling. A new required event-record selection
moves its timeline marker. Wrong chronology cannot pass with a correct verb. Visual review fixed
now-label alignment and added exact coded panel captions. All models/errors/application/transfer
were inspected. Full browser flow and 21 width checks pass, including alignment, reload and no
assessment records. All 1,451 core tests, typecheck, native adapter simulations and package checks
pass. Native GUI remains separate. Next l-g-future; the overall unit stays claimed and unfinished.


## 2026-10-18 (Sydney) · codex-solo · future-plans lesson individually reviewed

l-g-future is reviewed: 5/413. Seven authored tasks cover will/base, will be, won't/base,
Will questions, be going to plans and present evidence for a future prediction. Reused original
cleanup art establishes a completed prior event; coded records distinguish tomorrow's poster.
The dark-cloud task requires current evidence, not last week's weather or a future umbrella plan.
Question contexts retain uncertainty; no false will/going-to exclusivity is taught. All figures,
wrong evidence and transfer were inspected. Full flow, 21 widths, reload/alignment and no assessment
records pass; core 1,451 and typecheck pass, with final wording rechecked through the browser.
Next l-g-perfect: original key-loss/resolution art is generated and inspected but not yet integrated.
The unit remains unfinished and claimed; no native GUI or release approval is inferred.


## 2026-10-18 (Sydney) · codex-solo · past-to-now lesson individually reviewed

l-g-perfect is reviewed: 6/413. Eight tasks use original tappable lost/found-key panels,
changed present consequences, have/has, past versus participle forms, ended versus ongoing
residence and since/for. Selected evidence changes the actual time band. Review fixed current
state labels plotted as past events, corrected diagram phrase order/terminology and removed an
accidentally repeated sentence. All eight figures, wrong evidence, application and transfer were
inspected; full browser flow, 24 widths, alignment/reload and zero assessment records pass.
All 1,452 core tests, typecheck, 826 spelling/teaching and static package audits pass. Main 1699 KB;
no native GUI pass is implied. Next l-g-articles: a generated book/umbrella image is pending
inspection, not completion. The unit remains claimed and unfinished; work stays solo.


## 2026-10-18 (Sydney) · codex-solo · article lesson individually reviewed

l-g-articles is reviewed: 7/413. Nine authored tasks require named-object and sound/reference
selection, including old versus useful, silent h, university, same-object the and general plural
without an article. An inspected original book/umbrella illustration supplies actual tappable
objects. The unusual-map transfer prevents a false u-letter shortcut. Review corrected an image/
sentence location mismatch, abstract feedback and noun-phrase highlighting. All nine figures,
wrong-object/word and transfer states were inspected. Full browser flow and 27 widths, reload
and zero assessment records pass; typecheck and all-lesson teaching/spelling audits pass.
Last full core run1,452 precedes article data. Next l-g-comparison with a selectable comparison
group and measured diagrams; do not infer measurements from illustration perspective.
The overall claim remains unfinished. Native access/audio/release boundaries are unchanged.


## 2026-10-18 (Sydney) · codex-solo · comparison lesson individually reviewed

l-g-comparison is reviewed: 8/413. Eight tasks require the actual comparison group, distinguish
two/three/equal objects and require typed more interesting/better/easier. Wrong group and typed
form are retained independently. Numerical bars are code and stay on equal-width rails. All
figures, error paths and transfer were inspected. Whole flow, 24 widths, reload and zero assessment
records pass; all 1,454 core tests, typecheck,826 teaching/spelling audit and package checks pass.
A combined edition audit hit5s once and passed alone. Split it into two complete edition audits,
each covering all 413 lessons/all 1,690 headwords, keeping the same timeout and assertions.
Next l-g-pronouns: identify referents separately from grammatical position and coded ownership.
Unit stays claimed and unfinished; native GUI remains separate. Work stays solo.


## 2026-10-18 (Sydney) · codex-solo · pronoun lesson individually reviewed

l-g-pronouns is reviewed: 9/413. Eight tasks distinguish referents from grammar position,
require typed her/hers, and contrast singular/plural objects, ownership and ourselves. Explicit
records establish ownership and making, rather than infer them from who holds a pictured item.
Review corrected the subject-only prompt and sentence/punctuation flow. All figures, wrong
referents, application and transfer were inspected. Full flow and 24 widths pass, with reload and
zero assessment records; all four affected scene lessons were rechecked. Typecheck and 826
teaching/spelling audit pass; last core 1,454 precedes pronoun data. Next l-g-nouns.

Fresh direct MCP check: wechat_status succeeds, read_file wechat/AGENTS.md reports external-drive
file access unavailable. No native GUI job, compilation, restart, upload or publication occurred.
Reaffirm the existing blocked native card; continue local work without claiming native execution.
The overall lesson claim remains unfinished. Work stays solo.


## 2026-10-18 (Sydney) · codex-solo · noun lesson individually reviewed

l-g-nouns is reviewed: 10/413. Ten tasks require typed words and distinguish exact object
counts, singular/plural, irregular forms, photo/tomato spellings and content versus countable
units. Diagrams show precisely3/1 sandwiches,2 bottles,3 children,2 leaves and 3 bread slices;
visible slices do not make bread countable. Every figure and common typed error was inspected,
with distinct application and fresh advice transfer. Full flow and 30 widths pass, with reload
and zero assessment records. Build/typecheck/826 teaching-spelling audit pass; last core 1,454
precedes pronoun/noun data. Next prepositions, then a coherent broad verification/package refresh.
The overall unit remains claimed and unfinished; solo work and native/audio boundaries persist.


## 2026-10-18 (Sydney) · codex-solo · preposition lesson individually reviewed

l-g-prepositions is reviewed: 11/413. Nine tasks distinguish complete time phrases and actual
spatial relations. Classification cannot be bypassed by a correct preposition. Book/desk contact,
below/above bounds and map order are checked in pixels at three widths. Review shortened labels
and repeated feedback. An initially chosen delayed application ID was rejected by the compiler;
it was replaced with an immediate item, preserving the delayed pool. All figures/errors/transfer
were inspected; full flow and 27 widths, geometry/reload and zero assessment records pass.
Current broad checks pass:1,454 core, typecheck, grammar constraints, course,826 teaching-spelling
and static package. Adapter/all-individual/offline/archive checks are running at this checkpoint.
Next l-g-past-continuous is prepared outside course files; do not apply it during current checks.
Overall claim remains unfinished; native project-drive access is still blocked.


## 2026-10-18 (Sydney) · codex-solo · eleven-lesson coherent checkpoint

All current checks pass:1,454 core/14 files, typecheck,7 grammar constraints, course,826 teaching-
spelling, static package, both native-adapter simulations, all 11 individual browser flows/89 tasks/
267 widths,8 offline checks, and CRC/exact-byte comparison for refreshed local/native ZIPs.
Managed policy blocks direct file navigation; standalone testing served the embedded document
once on loopback and then disabled networking during practice. Full evidence and source/artifact
hashes are in docs/reviews/individual-lessons/checkpoint-11.*. Selected tracked captures refreshed
from the coherent run. Native GUI remains excluded;402 lessons still await individual review.
Next apply the prepared past-continuous authoring, then inspect it. Unit stays claimed.


## 2026-10-18 (Sydney) · codex-solo · past-continuous lesson individually reviewed

l-g-past-continuous is reviewed:12/413. Eight tasks select intervals against a fixed16:10 cursor,
contrast was/were and ongoing/finished/Did forms, and require typed rang/writing. Original holding/
watering art is reused with code names/times; writing is supported by a separate written record.
Review made duplicated contexts distinct, fixed interval-start labels and improved report wording.
All figures/errors/transfer inspected. Whole flow,24 widths, actual cursor/bar geometry, reload and
zero assessment records pass. Typecheck,826 teaching-spelling,28 workshop tests and package pass.
Checkpoint 11 retains full 1,454-core/adapter/offline/archive evidence for its exact snapshot.
Next l-g-passive is prepared outside course files. Overall unit unfinished;401 rows remain pending.


## 2026-10-18 (Sydney) · codex-solo · exact delayed-sentence overlap found

A new exact-text audit found two reused reserved sentences: prepositions workshop matched
q-g-prepositions-005, and the unreviewed passive draft matched q-g-passive-005. ID-only safeguards
had rejected delayed application IDs but did not catch rewritten workshop records of the same
complete sentence. The baseline shared workshops have no exact matches. Replace the park/location
and game-rules examples, preserve the actual delayed questions, add a compiler guard/regression,
and rerun both lessons. Temporarily reopen prepositions (11 current reviews) until its changed
figure is inspected. Checkpoint 11 retains the exact earlier snapshot and now has this limitation.
No main merge, release or production publication occurred. Continue the existing unit solo.


## 2026-10-18 (Sydney) · codex-solo · passive lesson and corrections reviewed

Prepositions is restored to reviewed after the changed park map was inspected. Passive voice is
individually reviewed: 13/413, with seven actor/receiver, number/tense, future/modal and participle
tasks. Wrong focus remains separate from a correct predicate. All figures, six narrow role models,
error paths and transfer were inspected. Both reserved grammar questions were compared with the
historical pack and verified unchanged. New exact-text guard covers all selected grammar models;
new grade guard prevents a transfer omitting an eligible lesson grade. Three grade-6 tags corrected.
The noun transfer now applies the rules to route information/photos rather than repeating advice.

Current checks pass: 1,458 core/14 files, typecheck, 826 teaching-spelling, package, all 13 full
browser flows/104 conditions/312 widths, four affected flows again after final corrections,
both native-adapter simulations, eight offline checks and refreshed ZIP CRC/exact-byte comparison.
Full source/artifact evidence: docs/reviews/individual-lessons/checkpoint-13.*. The earlier checkpoint
retains its historical hashes and disclosed limitation. Native GUI remains blocked; no upload or
publication occurred. Next l-g-modals; generated pool art is inspected but not yet integrated.
Overall claim unfinished; 400 lesson reviews remain. Work stays solo.


## 2026-10-18 (Sydney) · codex-solo · modal meanings individually reviewed

l-g-modals is reviewed:14/413. Eight tasks separate prohibition/no requirement/ability/permission/
advice, base forms and the negative Must reply. Original pool-gate art has exact code-rendered
sign text; its 320px rendering was inspected and bounds checked at three widths. All figures,
semantic/typed errors, application and fresh museum transfer were inspected. Whole flow,24 widths,
reload and zero independent assessment records pass. Current1,458 core, typecheck,826 teaching/
spelling and package pass; selected vocabulary browser flow checks the shared sentence-flow fix.
Archives retain checkpoint13 pending refresh. Next infinitives; a new contrast illustration is
being generated. Unit remains claimed and unfinished, with399 individual reviews remaining.


## 2026-10-18 (Sydney) · codex-solo · infinitives individually reviewed

l-g-infinitives is reviewed:15/413. Nine tasks connect plans/requests/negative reminders/purpose/
too-to/remember with complete expressions. A new original reading/drinking diptych requires the
correct later action for stop to drink versus stop drinking; timing comes from explicit records.
All nine models, both picture errors, three typed errors, application and fresh corridor transfer
were inspected. Hints mentioning nonexistent brackets corrected. Whole browser flow,27 widths,
reload and zero assessment records pass; typecheck,826 teaching/spelling and package pass. Next
gerunds. Overall unit unfinished;398 pending. Archives retain checkpoint13 until next refresh.


## 2026-10-18 (Sydney) · codex-solo · gerunds individually reviewed

l-g-gerunds is reviewed:16/413. Eight tasks require activity forms, live silent-e removal/consonant
doubling, classification of the two kinds of to and a retrospective remember meaning. Four typed
errors, semantic errors, all models and fresh kayaking/coach transfer inspected. Original science
and watering scenes reused; written records provide interest and remembered time. Whole browser
flow,24 widths,reload and zero assessment records pass; typecheck,826 teaching/spelling and
package pass. Next conditionals; an original alternative-weather scene is being generated.
Unit remains unfinished;397 pending. Broad archives still represent checkpoint13.


## 2026-10-18 (Sydney) · codex-solo · conditionals and seventeen-lesson checkpoint

l-g-conditionals is reviewed:17/413. Eight tasks manipulate alternative weather hypotheses and
show their actual different outcomes, then separate tense/clauses/unless/when/modal/if-whether.
All models, picture and typed errors, full negative alternative and fresh soil transfer inspected.
Review removed an exposed answer and corrected model labels. Typed alternatives now accept valid
contractions/full forms; new regressions reject wrong forms and audit alternative delayed text.
The science-scene delivery image was reduced/re-inspected, with affected complete flows rerun.

Coherent checks pass:1,461 core/14 files,typecheck,826 teaching-spelling,7 grammar constraints,
course/static package,all17 browser flows/137 conditions/411 widths,both adapter simulations,
8 offline checks and refreshed ZIP CRC/exact-source comparison. File URLs remain blocked; served
standalone once then disabled networking. Hashes/sizes and historical limits:checkpoint-17.*.
Next object clauses; its authoring/word-builder patch are prepared outside course files. Unit
remains claimed and unfinished;396 pending. No new native GUI pass, upload or release occurred.


## 2026-10-18 (Sydney) · codex-solo · object clauses individually reviewed

l-g-object-clauses is reviewed:18/413. Eight real word-tile tasks build the learner's clause inside
the sentence, require relevant meaning/subject evidence, accept if/whether and optional-that,
prevent choose/input bypass and invalidate completion on edits. All initial/model/error/recovery/
alternative/removal/transfer states inspected. UI review moved controls higher, compacted art and
removed a duplicate answer board; inline flow/punctuation checked at three widths. Three regressions
cover bypass/edit/persistence, alternatives and duplicate words/unbuildable authored banks.

Current checks pass:1,464 core/14 files,typecheck,826 teaching-spelling,package,new full flow/24
widths,three shared flows/57 layouts at each width,both native-adapter simulations,8 offline checks
and refreshed ZIP CRC/exact-source comparison. A test-driver input/button mix-up was fixed; no app
answer path failed. Prior17 whole browser flows retain checkpoint17 scope. Exact new hashes and
boundaries:checkpoint-18.json. Next relatives; its explicit draft is prepared outside course files.
Unit remains claimed/unfinished;395 pending. Native GUI blocked; no upload or publication.


## 2026-10-18 (Sydney) · codex-solo · relatives individually reviewed

l-g-relatives is reviewed:19/413. Eight tasks require the pictured antecedent and a finite relative
clause, separating reference/number errors, duplicate pronouns, subject/object omission, whose and
locative/preposition variants. Silent scenes no longer invent a speaker; invalid listener-only
scenes are rejected. All initial/models/errors/repairs/alternatives and volunteer transfer inspected.
Corrected an inaccurate diagram label and clarified the empty ordering control in both renderers.

Current checks pass:1,466 core/14 files,typecheck,826 teaching-spelling,package,new complete flow/
24 widths,object flow after shared changes,both adapter simulations,8 offline checks and refreshed
ZIP CRC/exact-source comparison. Aggregate153 conditions/459 widths; older flows retain their
original scope. New hashes/boundaries:checkpoint-19.json. Next conjunctions; explicit draft prepared
outside course files. Unit claimed/unfinished;394 pending. Native GUI blocked; no upload/release.


## 2026-10-18 (Sydney) · codex-solo · conjunctions individually reviewed

l-g-conjunctions is reviewed:20/413. Eight tasks retain causal direction while reversing English
clause order, distinguish concession/contrast with explicit relationship labels, remove repeated
connectors and apply otherwise/conditions. Original weather art reused for scenario selection.
All models,wrong premises,repairs,expanded diagrams and fresh poster transfer inspected. Full
flow/24 widths,reload and zero assessment records pass. Current1,466 core/14 files,typecheck,
826 teaching-spelling,package,both adapter simulations,8 offline checks and refreshed ZIP CRC/
exact-source comparison pass. Aggregate161 conditions/483 widths; older flows retain scope.
Hashes:checkpoint-20.json. Next questions/tags; explicit draft prepared outside course files.
Unit claimed/unfinished;393 pending. Native GUI blocked; no upload or release.


## 2026-10-18 (Sydney) · codex-solo · questions and tags individually reviewed

l-g-questions is reviewed:21/413. Eleven tasks distinguish quantities, use an actual walking-day
calendar,select the plural reference and construct tags from auxiliaries/polarity/special forms.
Negative-tag replies follow the supplied fact. Initial/all models/errors/repairs/20-minute transfer
inspected. Corrected orphan tag punctuation and nested browser span styling; added safe edition
conversion for kilometer/kilometre without changing device meter. New regressions cover actual
dates,negative answers and spelling. Full flow/33 widths,reload and zero assessment records pass.
Current1,469 core/14 files,typecheck,826 teaching-spelling,package,object flow after shared changes,
both adapter simulations,8 offline checks and refreshed ZIP CRC/exact-source comparison pass.
Aggregate172 conditions/516 widths; older flows retain scope. Hashes:checkpoint-21.json. Next
agreement; explicit draft prepared outside course files. Count-record audit found existing noun
bread on @attempt with static3 slices; preserve it while fixing selected @record count projection.
Unit remains claimed/unfinished;392 pending. Native GUI blocked; no upload or release.


## 2026-10-18 (Sydney) · codex-solo · agreement and coherent22-lesson checkpoint

l-g-agreement is reviewed:22/413. Eight tasks select controller/count,distinguish each/everyone /
a-the number and together-with/and. All initial/models/wrong-head counts/repairs/fresh transfer
inspected. Projected concrete counts now drive actual counters; timeline bounds remain separate.
Existing noun bread stays3 slices. Counts beyond exact renderer capacity are rejected.

Coherent checks pass:all22 full flows/180 conditions/540 widths,reload/zero independent records,
1,470 core/14 files,typecheck,826 teaching-spelling,7 grammar constraints,course/package,both
adapter simulations,8 offline checks and fresh ZIP CRC/exact-source comparison. Exact evidence:
checkpoint-22.*. File URLs blocked;standalone loaded once before networking disabled. Historical
checkpoint11 limitation stays disclosed. Next proper names/capitalization;read8-case bank and
reserve005–008. New original travel art inspected outside course files;delivery trials in /tmp
are not integrated. Overall unit claimed/unfinished;391 pending. Native GUI blocked;no release.


## 2026-10-18 (Sydney) · codex-solo · proper names and live caption editing reviewed

l-g-proper-nouns is reviewed:23/413. Nine tasks edit actual wrong-case drafts. Original travel
art supports changing learner captions,Great Wall/ordinary wall,and May/modal may. Written cards
establish facts. Case-sensitive validation,cleared-draft persistence and immutable caption templates
have regressions. Removed redundant meaning gates and an invisible-picture reference after visual
review;fixed orphan punctuation for short typed answers. Original/delivery art and all lesson
figures,errors,repairs and fresh Ben/French/June transfer inspected. Grades6–9 covered;005–008 reserved.

Checks:23 full main paths/189 conditions/567 widths before optional reasoning pagination;then
proper-name and agreement paths verify paged reasoning,and final proper-name flow verifies simplified
feedback. Steps inspected at three widths. Reload/zero independent records,1,472
core/14 files,typecheck,826 teaching/spelling,7 grammar constraints,course/static package,both adapter
simulations,8 offline checks and fresh ZIP CRC/exact-source comparison. Scope/hashes:checkpoint-23.*.
Smaller courtyard delivery inspected;existing budget unchanged. Next l-g-possessives,explicit
nine-task draft outside course files. Overall unit claimed/unfinished;390 pending. Native GUI
still blocked by project-drive access;no upload/release or whole-course parity.

The interaction audit had an obsolete no-image-references assertion that rejected earlier authorized
class-photo reuse. Added explicit source asset IDs and verified registered owner-original provenance,
file hashes and acyclic references. No external image reference is accepted. Interaction audit passes.


## 2026-10-18 (Sydney) · codex-solo · ownership diagrams individually reviewed

l-g-possessives is reviewed:24/413. Nine tasks edit actual apostrophes,select owner counts and
compare joint/separate possession. The bespoke album diagram changes actual allocation and
requires the matching relationship. Inspected every model,wrong allocation/form,repair and
application/transfer reasoning. Removed misleading book icons beside words and clarified its.
Reworded only immediate001–004 feedback into Chinese;reserved005–008 and all answers unchanged.

Current flow passes27 widths with owner/book alignment,reload and zero independent records.
1,473 core/14 files,typecheck,826 teaching/spelling,7 grammar constraints,course/interaction/static
package,both adapter simulations,8 offline checks and fresh archive CRC/exact-source comparison
pass. Cumulative198 conditions/594 widths;earlier flows retain scope. Hashes:checkpoint-24.*.
Cloud reconnection preserved files/tools;MCP memory and board read successfully. Next verb forms;
the unintegrated draft's cue/transform labels were revised;inspect their actual rendering. Overall claim continues
solo;389 pending. Native GUI still blocked by project access;no upload,release or parity claim.


## 2026-10-18 (Sydney) · codex-solo · l-g-verb-forms individually reviewed

25/413 reviewed. Ten tasks choose verb forms from actual auxiliaries and time clues. Students select the current writing scene, distinguish wrote/written, repair makeing/stoped and transfer the method to break/broken. Cue-to-form diagrams show their attempt. Answer giveaways and an ambiguous past/current postcard reference were corrected during visual review.

All models,wrong picture,typed errors,spelling repairs,application explanations and both transfer steps inspected. Explicit facts:two completed postcards,two bus journeys this week,three filed cards. Grades7–9 covered;reserved005–008 unexposed. No independent attempts,mastery or lesson-pass record.

Current new lesson flow:10 conditions/30 task-width checks,reload and zero independent records. 1,473 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Development and cloud simulations passed, including every packed topic's hash. Final task heading changed afterward; no native GUI pass.

Cumulative208 conditions/624 widths;earlier flows retain scope. Hashes:checkpoint-25.*.
Next:l-g-transitivity. The transitivity draft remains outside course files. It contrasts reach/arrive,city versus specific destination,adverbial home,direct discuss,listen/look with prepositions,and explain content to a recipient. The final task uses real word tiles. Its source diagram was corrected to display the actual wrong original,not a literal placeholder. Compile and inspect before review credit. Overall claim continues solo;388 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-transitivity individually reviewed

26/413 reviewed. Eleven tasks visibly add or remove the actual preposition. They cover reach/arrive,direct discuss,listen/look,home,explain-to,join,wait-for and depend-on. Actual word tiles repair a missing connection. Unknown expressions never get a fabricated parse. Neutral initial prompts allow a first attempt before feedback.

All models,initial state,six wrong paths,typed errors,tile assembly,applications and both transfer steps inspected. Six actual320-pixel diagram captures were checked. The bounds check now measures text instead of intentional connector strokes;an actual depends overflow was repaired with a wider node. Text must fit each node and verbs stay whole. Grades8–9 covered;reserved005–008 unexposed. No independent assessment record is created.

Current new lesson flow:11 conditions/33 task-width checks,reload and zero independent records. 1,474 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development and cloud simulations passed,including all245 packed topic hashes. Static checks and adapter simulations do not establish native GUI validation.

Cumulative219 conditions/657 widths;earlier flows retain scope. Hashes:checkpoint-26.*.
Next:l-g-linking-verbs. A nine-task linking-verb draft and original blanket-touch artwork remain outside course files. The raw image and600/512-pixel deliveries were inspected;the512-pixel trial is18,786 bytes. Use it to contrast the blanket's soft state with the student's careful touching action. The draft also distinguishes friendly,healthy well,good,and look versus look-at. Preserve the1,900,000-byte main-package budget;current headroom is about20KB,so inspect the final delivery after integration. No review credit yet. Overall claim continues solo;387 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-linking-verbs individually reviewed

27/413 reviewed. Nine tasks distinguish a subject's state from an action's manner. An original blanket-touch image makes students select what the sentence describes. Live diagrams show their actual word. Tasks address friendly, bodily well-being, good and look versus look-at; a fresh transfer contrasts two uses of taste.

The raw image and delivery trials,all nine models and320-pixel figures,initial controls,wrong image/meaning selections,typed errors,applications and both transfer steps were inspected. Exact tactile facts come from written records,not inferred photography. Provenance and image hash are registered. Grades7–9 covered;reserved005–008 unexposed;zero independent records.

Current new lesson flow:9 conditions/27 task-width checks,reload and zero independent records. 1,474 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development and cloud simulations passed, including all245 packed topic hashes. Neither simulation establishes native GUI validation.

Cumulative228 conditions/684 widths;earlier flows retain scope. Hashes:checkpoint-27.*.
Next:l-g-auxiliaries. A ten-task auxiliary draft remains outside course files. Students will assemble questions and negatives with do-support,existing be/modal/perfect auxiliaries,base-form repair and plural subjects. Inspect every assembled sentence and diagram. Main-package headroom is only1,344 bytes;preserve the existing budget and optimize assets when necessary. Overall claim continues solo;386 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-auxiliaries individually reviewed

28/413 reviewed. Ten tasks use shuffled word tiles and a typed repair to distinguish do-support from existing be,modal and perfect auxiliaries. Students build questions and negatives,restore base forms,retain participles and compare singular/plural subjects. Case-only feedback identifies capitalization without falsely diagnosing grammar.

All ten models and narrow-phone diagrams,empty tile controls,wrong inflections,typed repair,lowercase can,accepted contraction,applications and both fresh-transfer steps were inspected. Punctuation stays with the last word. Before/after diagrams use actual source and student sentences. Grades7–9 covered;reserved005–008 unexposed;zero independent records.

Current new lesson flow:10 conditions/30 task-width checks,reload and zero independent records. 1,475 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development and cloud simulations passed,including all245 packed topic hashes. These are not native GUI evidence.

Cumulative238 conditions/714 widths;earlier flows retain scope. Hashes:checkpoint-28.*.
Next:l-g-adjectives. A ten-task adjective draft stays outside course files. It reuses the inspected blanket image and adds shuffled phrase tiles for size/colour,something useful and contrasting enough positions. It also contrasts exciting/excited and an interesting person,avoiding the person-versus-object shortcut. Inspect all renders before review. Lossless recompression trials for three existing Blender PNGs preserve every pixel and could recover about137KB for future instructional art;they are not integrated yet. Overall claim continues solo;385 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-adjectives individually reviewed

29/413 reviewed. Ten adjective tasks combine the blanket picture,typed repairs and shuffled phrase tiles. Students contrast noun and be positions,something useful,adjective/noun enough positions,and exciting/excited/interesting meanings. A new transfer uses useful equipment small enough to fit in a bag.

All ten models and narrow-phone figures,wrong image/phrase choices,typed repairs,expanded before/after diagrams,applications and both transfer steps were inspected. The last label was rewritten as natural Chinese. Three existing Blender PNGs were losslessly recompressed and inspected:137,249 bytes saved,all decoded pixels identical,proof hashes recorded. Grades7–9 covered;reserved005–008 unexposed;zero independent records.

Current new lesson flow:10 conditions/30 task-width checks,reload and zero independent records. 1,475 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Development and cloud simulations passed before the final task-label simplification. Final browser,compiler and static checks ran afterward. All245 packed topic hashes are covered by adapter checks;no native GUI pass.

Cumulative248 conditions/744 widths;earlier flows retain scope. Hashes:checkpoint-29.*.
Next:l-g-adverbs. An eleven-task adverb draft stays outside course files. It uses the inspected new bicycle diptych to locate the repairer,then contrasts action manner with a linking-verb state,well/fast/hard/hardly/heavily,frequency positions and carefully enough. Both raw and600-pixel image delivery are inspected;the47,437-byte derivative fits the unchanged budget after lossless PNG optimization. Integrate and inspect actual controls before review credit. Overall claim continues solo;384 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-adverbs individually reviewed

30/413 reviewed. Eleven adverb tasks use a new original bicycle-repair diptych,typed repairs and shuffled phrase tiles. Students distinguish manner from state,well/fast/hard/hardly/heavily,frequency positions,never and carefully enough. The transfer contrasts effort with barely audible recording volume.

Raw and600-pixel art,all eleven models and narrow-phone figures,wrong picture selections,typed errors,expanded phrase diagrams,applications and both transfer steps were inspected. Coded records supply identities and carefulness. Frequency tasks explicitly constrain the requested neutral positions without banning all alternatives. Grades7–9 covered;reserved005–008 unexposed;zero independent records. Fresh native tooling responds,but project-drive access remains unavailable.

Current new lesson flow:11 conditions/33 task-width checks,reload and zero independent records. 1,475 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Development and cloud simulations passed,including all245 packed topic hashes,before final Chinese transfer wording edits. Final browser,compiler and static checks ran afterward. Fresh wechat_status succeeds,but project-drive instruction read remains blocked;no GUI job started.

Cumulative259 conditions/777 widths;earlier flows retain scope. Hashes:checkpoint-30.*.
Next:l-g-adverb-comparison. A ten-task adverb-comparison draft stays outside course files. Deterministic duration bars compare equal100-metre races:12/15seconds,and12/14/15seconds. Students select the fastest runner before choosing the expression. Further tasks cover analytic and irregular forms,as-early-as,less carefully and much more clearly. Inspect numeric proportionality,controls and every render before review credit. Overall claim continues solo;383 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-adverb-comparison individually reviewed

31/413 reviewed. Ten tasks compare equal-distance race records,analytic and irregular adverb forms,as-early-as,less carefully and much more clearly. Students select the fastest runner from exact proportional duration bars before completing the sentence.

All ten models and narrow-phone figures,wrong evidence/forms,expanded phrase diagrams,applications and both transfer steps were inspected. Initial wrong diagram metadata was corrected. Names and time values were separated after phone inspection found broken units. Six plot-width measurements verify authored percentages;48/56/60 encode12/14/15seconds exactly. Grades8–9 covered;reserved005–008 unexposed;zero independent records.

Current new lesson flow:10 conditions/30 task-width checks,reload and zero independent records. 1,475 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Development and cloud simulations passed,including all245 packed topic hashes,before final race-label layout edits. Final browser,compiler and static checks ran afterward. Simulations do not establish native GUI validation.

Cumulative269 conditions/807 widths;earlier flows retain scope. Hashes:checkpoint-31.*.
Next:l-g-reflexives. A twelve-task reflexive draft stays outside course files. It reuses the inspected repair diptych to contrast solo work and help for another person,then covers all eight reflexive forms,quoted I,addressed singular/plural you,enjoy oneself,reciprocal each other/one another and emphatic self versus by oneself. Inspect each task before credit. Overall claim continues solo;382 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-reflexives individually reviewed

32/413 reviewed. Twelve tasks contrast self and other recipients,all eight reflexive forms,quoted I,addressed singular/plural you,reciprocal help and emphatic self versus by oneself. Shared grammar diagrams now attach punctuation to the expression and omit empty context placeholders,while retaining real context and accepted answers.

All twelve models and narrow-phone figures,both wrong scene selections,typed person/number errors,reciprocal alternatives,expanded phrase diagrams,applications and both transfer steps were inspected. The opening caption was shortened. A prior linking-verbs flow was replayed in full and its new explanation layouts inspected after the shared formatter change. Eight grammar source checks pass. Grades7–9 covered;reserved005–008 unexposed;zero independent records.

Current new lesson flow:12 conditions/36 task-width checks,reload and zero independent records. 1,475 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development and cloud simulations passed,including all245 packed topic hashes. These are simulations,not native GUI validation.

Cumulative281 conditions/843 widths;earlier flows retain scope. Hashes:checkpoint-32.*.
Next:l-g-demonstratives. A ten-task demonstrative draft and a new near/far classroom image remain outside course files. Raw and600-pixel delivery are inspected;the32,406-byte derivative fixes Mia at the front desk while one book moves from the near desk to the back cabinet. Combine this with exact1/3-book coded counts. Transfer covers grades6–9. Audit source spatial cues and enforce explicitly requested capitalization in applications without changing ordinary case-insensitive answers. No review credit yet. Overall claim continues solo;381 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-demonstratives individually reviewed

33/413 reviewed. Ten tasks combine an original fixed-speaker near/far diptych,exact1/3-book figures,phrase tiles,short-answer pronouns and noun ellipsis. Per-response capitalization requirements now work in applications without making unrelated word-form answers strict. Case-only feedback identifies the actual error in guided and ordinary practice.

Original and600-pixel art,all ten models and narrow-phone figures,every wrong distance/count record,physical icon counts,capital errors,phrase diagrams,applications and both transfer steps were inspected. Mid-sentence hints no longer suggest sentence-initial capitals. The complete auxiliary flow was replayed after its capital requirement fix. A reserved spatial cue was clarified without exposing it in practice. Grades6–9 covered;reserved005–008 unexposed;zero independent records.

Current new lesson flow:10 conditions/30 task-width checks,reload and zero independent records. 1,476 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development and cloud simulations passed,including all245 packed topic hashes. These are not native GUI evidence.

Cumulative291 conditions/873 widths;earlier flows retain scope. Hashes:checkpoint-33.*.
Next:l-g-indefinites. A twelve-task indefinite-word draft stays outside course files. It selects all three team members forEveryone while retaining singular agreement,uses an inspected original empty-box/one-ball diptych with exact0/1 counters,contrasts some/any contexts and equivalent negative phrases,and separates nothing new from a completely empty inventory. The600-pixel derivative is18,592 bytes. Add a coded ball style and a partial-selection negative test for the all-member scene;inspect all controls before review credit. Overall claim continues solo;380 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-indefinites individually reviewed

34/413 reviewed. Twelve tasks connect complete-team reference and singular agreement,exact0/1 inventories,equivalent negatives,some/any contexts,person/thing/place and adjective placement. Original box art supports actual inventory selection.

All twelve models,narrow-phone figures,partial-team recovery,wrong0/1 records,physical ball counts,negative alternatives,phrase diagrams,applications and transfer steps were inspected. Replaced the misleading source-sentence label with source draft. Corrected a rendered apostrophe and narrow count-card word break. The full demonstrative flow was replayed after the count-card style change;no extra review credit. Grades8–9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:12 conditions/36 task-width checks,reload and zero independent records. 1,476 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Development/cloud simulations and all245 topic hashes passed before the final apostrophe and narrow count-card style edits. Final compiler/typecheck/static checks,full indefinite+demonstrative browser flows,offline checks and verified archives passed afterward. No native GUI claim.

Cumulative303 conditions/909 widths;earlier flows retain scope. Hashes:checkpoint-34.*.
Next:l-g-question-words. Twelve question-word tasks are drafted outside course files. Reuse the class portrait for owner versus borrower and the empty/one-ball diptych for which versus what. Add coded three-book counting,whose versus who is,method/reason,time/place,and how many/much. Enforce only explicitly requested initial capitals in source applications;inspect every task before credit. Overall claim continues solo;379 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-question-words individually reviewed

35/413 reviewed. Twelve tasks identify owner versus borrower,Whose versus Who is,Which versus What,method versus reason,time versus place,and countable quantities versus money. Reused original pictures provide actual selection tasks;three coded book icons match the inventory.

All twelve models,narrow-phone figures,wrong-person and wrong-box recovery,actual0/1 counts,accepted alternative,capitalization errors,applications and all explanation/transfer steps were inspected. Four explicitly requested initial capitals now work per response,including two reserved responses checked only in source tests. Grades7–9;reserved005–008 unexposed;zero independent records. Fresh read-only native check still cannot read project-drive instructions;existing native card updated as blocked.

Current new lesson flow:12 conditions/36 task-width checks,reload and zero independent records. 1,476 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development and cloud simulations passed,including all245 topic hashes. These are not native GUI evidence.

Cumulative315 conditions/945 widths;earlier flows retain scope. Hashes:checkpoint-35.*.
Next:l-g-cardinals. Twelve cardinal tasks are drafted outside course files. Add exact coded bundle labels10/100/1000 for group counting;contrast teens/tens,exact numbers with approximate plural-of constructions,spelling and compound measurement modifiers. Inspect all totals and narrow-phone figures before credit. An original green-house/greenhouse picture is generated and inspected for the later compound lesson;not integrated or counted. Overall claim continues solo;378 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-cardinals individually reviewed

36/413 reviewed. Twelve tasks combine live group selectors with exact coded10/100/1000 unit figures,teen/tens contrasts,spelling,exact/approximate number constructions and compound measurement modifiers.

All twelve models,narrow-phone figures,eight wrong group records and physical counts,misspellings,capitalization errors,applications and all transfer/explanation steps were inspected. Twelve group measurements verify quantities40/200/3000/80 at three widths and untruncated labels. Full-width measurement diagrams fix cramped hyphenated words;Chinese uses groups consistently. Grades6–9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:12 conditions/36 task-width checks,reload and zero independent records. 1,476 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 packed topic hashes. These are not native GUI evidence. Core scope:1476 tests/14 files passed after the initial-capital grading fix,before the final four group selectors,two diagram layouts and group wording edits. Final teaching/grammar/compiler/typecheck/static-package/browser/offline/native-adapter and archive checks cover those edits.

Cumulative327 conditions/981 widths;earlier flows retain scope. Hashes:checkpoint-36.*.
Next:l-g-ordinals. Twelve ordinal tasks are drafted outside course files:select people from left/right,distinguish the whole-year month index from the displayed five-month subset,repair irregular ordinals,dates and possessive determiners. Inspect all tasks before credit. The later compound lesson also has a twelve-task draft and an original inspected house/greenhouse diptych outside course files. Overall claim continues solo;377 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-ordinals individually reviewed

37/413 reviewed. Twelve tasks select people by left/right ordinal position,contrast the whole-year month index with the displayed subset,and repair irregular spellings,dates,floor references and possessive-determiner constructions.

All twelve models,narrow-phone figures,wrong selections in all three portrait tasks,missing/wrong month gates,spelling/determiner errors,applications and all explanation/transfer steps were inspected. The five-cell month strip fits320 pixels. Floor numbering is explicitly specified. Final direction feedback names left-to-right/right-to-left plainly. Grades6–9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:12 conditions/36 task-width checks,reload and zero independent records. 1,476 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Development/cloud simulations and all245 hashes passed before the final three directional wording edits. Final compiler/typecheck/static/teaching/grammar/browser/offline/archive checks cover the edits. No native GUI claim. Core scope:1476 tests/14 files passed before the final directional wording-only edit. Final compiler/typecheck/teaching/grammar/static-package/browser/offline/archive checks cover that edit.

Cumulative339 conditions/1017 widths;earlier flows retain scope. Hashes:checkpoint-37.*.
Next:l-g-compounds. Twelve compound tasks are drafted outside course files. An original green residential house/transparent greenhouse diptych and inspected600-pixel quality70 JPEG derivative32,141 bytes support actual semantic picture selection. Add snap-together word parts for selected compound nouns,keeping phrase tiles spaced and joined words contiguous. Test removals,duplicate/unknown tokens and wrong forms;inspect models before credit. A later twelve-task derivation draft also remains outside course files. Overall claim continues solo;376 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-compounds individually reviewed

38/413 reviewed. Twelve tasks use an original house/greenhouse meaning contrast,open/closed compounds,four real word-part puzzles,noun-head plurals and everyday/every day. Joined words and spaced phrases use distinct assembly modes with actual consumable tile controls.

Original and600-pixel art,all twelve models,narrow-phone figures,both wrong picture choices,four wrong assemblies,incomplete-word removal/reload,everyday errors,applications and all explanation/transfer steps were inspected. Widened picture diagrams keepgreenhouse intact;new browser checks reject split English model words. Full indefinite replay confirms spaced phrases and accepted alternatives;no extra review credit. Grades7–9;reserved005–008 unexposed;zero independent records. Main1,893,637 bytes under unchanged1,900,000 budget.

Current new lesson flow:12 conditions/36 task-width checks,reload and zero independent records. 1,478 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 packed topic hashes. These are not native GUI evidence. Core scope:1478 tests/14 files passed before the final two picture-diagram layout edits. Final compiler/typecheck/teaching/grammar/static-package,complete compound+indefinite browser,native-adapter,offline and archive checks cover those edits.

Cumulative351 conditions/1053 widths;earlier flows retain scope. Hashes:checkpoint-38.*.
Next:l-g-derivation. A twelve-task derivation draft with actual word parts remains outside course files. It separates sentence roles and polarity,repairs happy/happiness and swim/swimmer,and shows friendly is an adjective despite-ly. Reuse the existing original assets and word controls. Only6,363 bytes remain in the current main safety budget;future artwork needs a packaging strategy rather than a raised limit. Overall claim continues solo;375 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-derivation individually reviewed

39/413 reviewed. Fourteen actual word-part puzzles connect sentence roles and polarity to conventional prefixes/suffixes,repair happiness/swimmer/believable,and distinguish friendly from an adverb. The added-able and in- tasks broaden pattern coverage.

All fourteen models,narrow-phone figures,wrong assemblies,incomplete-word persistence,spelling and polarity repairs,applications and all explanation/transfer steps were inspected. Word-part workshops omit the repeated exam-introduction card;generic phrase ARIA now says expression. Final labels identify actual base words and adjective formation clearly. Grades8–9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:14 conditions/42 task-width checks,reload and zero independent records. 1,478 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 packed topic hashes. These are not native GUI evidence. Core scope:1478 tests/14 files passed before the final part-description wording edits. Final compiler/typecheck/teaching/grammar/static-package,complete browser,native-adapter,offline and archive checks cover those edits.

Cumulative365 conditions/1095 widths;earlier flows retain scope. Hashes:checkpoint-39.*.
Next:l-g-conversion. Twelve conversion tasks are drafted outside course files. Six word pairs distinguish noun/verb or adjective/verb uses from actual sentence cues and meanings. Require a correct role selection plus a correct word form;reuse the empty/one-ball picture for empty as state versus action. Add explicit unselected-record/outcome labels so the role activity uses accurate Chinese. Inspect every task before credit. Overall claim continues solo;374 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-conversion individually reviewed

40/413 reviewed. Twelve paired-use tasks require a contextual meaning/part-of-speech choice plus a correct word form. Water/email/walk/answer switch noun/verb roles;clean/empty switch adjective/verb roles. The original box picture contrasts state with the instruction to remove contents.

All twelve models,narrow-phone figures,twelve wrong-role interpretations,initial authored placeholders,word-form repairs,applications and all explanation/transfer steps were inspected. Coded0/1 captions and a left-pointing action annotation clarify the box reference. New optional record prompts use accurate Chinese and retain existing defaults. Grades8–9;reserved005–008 unexposed;zero independent records. Fresh MCP status succeeds;project instruction access still fails;existing native card remains blocked.

Current new lesson flow:12 conditions/36 task-width checks,reload and zero independent records. 1,478 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 packed topic hashes. These are not native GUI evidence. Core scope:1478 tests/14 files passed before the final meaning-prompt wording and picture annotation. Final compiler/typecheck/teaching/grammar/static-package,complete browser,native-adapter,offline and archive checks cover those edits.

Cumulative377 conditions/1131 widths;earlier flows retain scope. Hashes:checkpoint-40.*.
Next:l-g-contractions. Thirteen contraction tasks are drafted outside course files:build apostrophes,contrastits/your/their with contracted pronoun+verb forms,select the has expansion from following syntax,and distinguish PE from apostrophe contractions. The portrait makes your referent selectable. Enforce the two explicitly requested source capitals per response,including the reserved response only in source tests. Inspect all diagrams and accepted punctuation forms before credit. Overall claim continues solo;373 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-contractions individually reviewed

41/413 reviewed. Thirteen contraction tasks combine real apostrophe assemblies, possession contrasts, a selectable addressee, a mandatory has-expansion gate and a constrained uppercase initialism.

Inspected all thirteen models,narrow-phone figures,wrong apostrophe/person/expansion paths,typed possession repairs,capital feedback,removal/reload and all application/transfer steps. Final ASCII English apostrophes render clearly. Grades7–9,reserved005–008 unexposed,zero independent records.

Current new lesson flow:13 conditions/39 task-width checks,reload and zero independent records. 1,478 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 packed topic hashes. These are not native GUI evidence. Core scope:1478 tests/14 files passed before final wording and English-internal source apostrophe typography. Final compiler/typecheck/teaching/grammar/static-package,complete browser,native-adapter,offline and archive checks cover those edits.

Cumulative390 conditions/1170 widths;earlier flows retain scope. Hashes:checkpoint-41.*.
Next:l-g-statements. A twelve-task statements draft remains outside course files. Learners select factual records,change box inventory and repair be,do/does/did and modal statements with actual phrase tiles. Preserve subject and capitalization in the final complete statement. Inspect each task before review credit. Overall claim continues solo;372 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-statements individually reviewed

42/413 reviewed. Twelve factual sentence tasks combine selectable inventories and habit/location records with real phrase/full-sentence repairs. They distinguish be,lexical-verb and modal negation,positive third-person agreement,past auxiliaries,and complete subjects.

Inspected all twelve models,narrow-phone figures,wrong facts and forms,capital feedback,piece removal/reload and all application/transfer steps. Exact0/1 picture selections alter actual icons. Accepted contractions are exercised. Grades6–9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:12 conditions/36 task-width checks,reload and zero independent records. 1,478 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 packed topic hashes. These are not native GUI evidence.

Cumulative402 conditions/1206 widths;earlier flows retain scope. Hashes:checkpoint-42.*.
Next:l-g-alternative-questions. Twelve alternative-question tasks are drafted outside course files. A newly generated bus/bike diptych will support changing picture selections,with factual labels coded. Inspect original and phone delivery,and create safe package space before integrating further art. Other tasks require concrete replies across dates,colors,actions and occupations,and reconstruct a complete question. Overall claim continues solo;371 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-alternative-questions individually reviewed

43/413 reviewed. Twelve choice-question tasks require concrete replies across transport,dates,colors,actions and occupations,with an original generated bus/bike diptych and actual full-question tiles.

Inspected original/600-pixel art,all twelve models,narrow-phone figures,wrong picture/fact gates,repairs,capital feedback,removal/reload and all application/transfer steps. Both picture halves are selectable and the correct half changes. New artwork uses a registered subpackage with compiler path binding and simulated readiness/failure/retry. Grades7–9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:12 conditions/36 task-width checks,reload and zero independent records. 1,479 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,8 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 packed hashes and illustration readiness,failure and successful retry. These are not native GUI evidence. Core scope:1479 distinct tests/14 files:remaining tests passed initially;two unrelated five-second teaching timeouts cleared when the full422-test file passed on rerun without changing limits. Final compiler/typecheck/teaching/grammar/interaction/package,browser,native-adapter,offline and archive checks cover subsequent provenance wording and one diagram-label refinement.

Cumulative414 conditions/1242 widths;earlier flows retain scope. Hashes:checkpoint-43.*.
Next:l-g-imperatives. A fourteen-task imperative draft remains outside course files. Original open/closed door art and600-pixel delivery are inspected;use it to choose commanded target states. Repair positive/negative and be instructions,polite requests,let suggestions and fixed No+ing notices. Enforce explicit source capitals per response and keep reserved responses in source tests only. Overall claim continues solo;370 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-imperatives individually reviewed

44/413 reviewed. Fourteen instruction tasks connect opposite door targets to actual commands,repair be and negative forms,assemble requests and let suggestions,and contrast No+ing signs with base-form imperatives.

Inspected original/600-pixel door art,all fourteen models,narrow-phone figures,wrong goals and forms,capital feedback,removal/reload and all application/transfer steps. Corrected a misleading No-running hint and the statement-to-command caption. Explicit source capitals enforced per response;reservedWash tested only at source. Grades6–9;reserved005–008 unexposed;zero independent records. Nine offline checks include both actual new picture-control error/repair flows.

Current new lesson flow:14 conditions/42 task-width checks,reload and zero independent records. 1,479 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,9 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 packed hashes and illustration readiness,failure and successful retry. These are not native GUI evidence. Core scope:1479 tests/14 files passed before final No-running hint and statement-caption corrections. Final compiler/typecheck/teaching/grammar/interaction/package,complete browser,native-adapter,nine offline and archive checks cover those edits.

Cumulative428 conditions/1284 widths;earlier flows retain scope. Hashes:checkpoint-44.*.
Next:l-g-exclamations. A thirteen-task exclamation draft remains outside course files. It requires selecting whole fronted phrases word by word,contrasts noun phrases with adjectives/adverbs,and assembles complete What/How sentences. Build a compact word-selection model with accurate selected-phrase feedback;avoid labelling the correct answer in advance. Enforce explicit source capitals per response. Overall claim continues solo;369 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-exclamations individually reviewed

45/413 reviewed. Thirteen exclamation tasks require complete word-by-word phrase boundaries before What/How and a/an repairs,with paired noun/adjective uses and actual full-sentence assembly.

Inspected all thirteen models,narrow-phone figures,all wrong-boundary selections,incomplete/removed phrases,wording refinements,repairs,capitals and all application/transfer steps. The model previews actual selected words in reading order. Full ordinal regression passes;month/date figures reinspected,no extra review credit. Grades8–9;reserved005–008 unexposed;zero independent records. Fresh MCP project access still fails;existing native card remains blocked.

Current new lesson flow:13 conditions/39 task-width checks,reload and zero independent records. 1,480 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,9 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry,before final four-condition caption/prompt clarifications. Runtime/UI code is unchanged;final compiler/browser/offline/archive checks cover that wording. No native GUI evidence. Core scope:1480 tests/14 files passed before final four-condition figure captions/prompts. Final compiler/typecheck/teaching/grammar/interaction/package,complete exclamation browser,nine offline and archive checks cover the wording. The full ordinal control regression and its month/date visual inspection precede those exclamation-only edits.

Cumulative441 conditions/1323 widths;earlier flows retain scope. Hashes:checkpoint-45.*.
Next:l-g-sentence-patterns. A twelve-task sentence-pattern draft remains outside course files. Use the word selector to identify whole subjects/objects and noninitial predicates,complements and adverbials. Analyze an explicitly correct model before repairing a separate draft;distinguish prepositional objects,linking predicates and missing verbs. Inspect all new boundaries and forms before credit. Overall claim continues solo;368 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-sentence-patterns individually reviewed

46/413 reviewed. Twelve sentence-role tasks require whole subjects/objects and noninitial predicates,complements,adverbials or prepositional phrases before repairing a separate draft. Full-sentence tiles repair missing verbs and object order.

Inspected all twelve models,narrow-phone figures,all wrong roles,incomplete/removed phrases,typed/full-sentence repairs,removal/reload and every application/transfer step. Correct analysis examples are explicitly separate from attempted drafts. Grades7–9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:12 conditions/36 task-width checks,reload and zero independent records. Retained shared-engine coverage:1,480 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,9 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Current development/cloud simulations passed,including all245 packed hashes and artwork readiness,failure and successful retry. These are not native GUI evidence. Core scope:Retained checkpoint45 coverage:1480 tests/14 files before this data-only lesson. Shared engine/UI is unchanged;the full core suite was not rerun. Current compiler/typecheck/teaching/grammar/course/interaction/package,complete browser,native-adapter,nine offline and archive checks cover the new data.

Cumulative453 conditions/1359 widths;earlier flows retain scope. Hashes:checkpoint-46.*.
Next:l-g-double-objects. Fifteen double-object tasks are drafted outside course files. Original giving-direction art and600-pixel delivery are inspected. Two first-person accounts require opposite picture selections;then learners identify recipients/beneficiaries,assemble both word orders,distinguish to/for and avoid the explain double-object error. Add registered provenance and inspect phone figures before credit. Overall claim continues solo;367 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-double-objects individually reviewed

47/413 reviewed. Fifteen double-object tasks use original reversed giving pictures,first-person pronouns,noninitial recipient/beneficiary selection,both word orders,to/for and an explain exception.

Inspected original/600-pixel art,all fifteen models,narrow-phone figures,both wrong picture gates,all thirteen wrong word roles,partial/removal recovery,typed/assembled repairs and every application/transfer step. Plain Chinese prompts and final to-position feedback were reinspected. Grades8–9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:15 conditions/45 task-width checks,reload and zero independent records. Retained shared-engine coverage:1,480 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,9 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry,before final Chinese prompts and to-position explanation. Runtime/UI code is unchanged;final compiler/browser/offline/archive checks cover those edits. No native GUI evidence. Core scope:Retained checkpoint45 coverage:1480 tests/14 files before this data/art-only lesson. Shared engine/UI is unchanged;the full core suite was not rerun. Final compiler/typecheck/teaching/grammar/interaction/package,complete browser,nine offline and archive checks cover the final data and artwork. Native adapter scope precedes the last wording refinements.

Cumulative468 conditions/1404 widths;earlier flows retain scope. Hashes:checkpoint-47.*.
Next:l-g-object-complements. Fifteen object-complement tasks are drafted outside course files. Reuse inspected door and box pictures for actual target states,identify action performers and contrast object complements with subject complements and double objects. Explicit lexical/form constraints avoid rejecting valid perception-verb alternatives. Inspect all boundaries and states before credit. Overall claim continues solo;366 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-object-complements individually reviewed

48/413 reviewed. Fifteen object-complement tasks connect actual door/box states,action performers and full object boundaries with adjectives,bare/to-infinitives,negative instructions and identity versus double objects.

Inspected all fifteen models,narrow-phone figures,wrong picture gates,all twelve wrong word roles,partial/removal recovery,typed/assembled repairs and all application/transfer steps. Explicit perception-verb form constraints preserve valid alternatives. Grades8–9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:15 conditions/45 task-width checks,reload and zero independent records. Retained shared-engine coverage:1,480 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,9 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Retained checkpoint45 coverage:1480 tests/14 files. Shared engine/UI is unchanged;the full core suite was not rerun for this data-only lesson. Current compiler/typecheck/teaching/grammar/course/interaction/package,browser,nine offline and archive checks cover the final data.

Cumulative483 conditions/1449 widths;earlier flows retain scope. Hashes:checkpoint-48.*.
Next:l-g-there-be. Fourteen there-be tasks are drafted outside course files. Check actual zero/one/three inventories,water agreement,opposite box pictures,questions/short answers,have contrast and past/future forms before review credit. Overall claim continues solo;365 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-there-be individually reviewed

49/413 reviewed. Fourteen there-be tasks use actual0/1/3 inventories,opposite box pictures,noun boundaries,water agreement,have/holding contrasts and present/past/future questions and replies.

Inspected all14 models,narrow-phone figures,all13 wrong records,wrong person/all5 wrong word selections,partial/removal recovery,typed/assembled errors and all application/transfer steps. Final water-word selection replaces an inappropriate short-answer source toggle. Grades6–9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:14 conditions/42 task-width checks,reload and zero independent records. Retained shared-engine coverage:1,480 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,9 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Retained checkpoint45 coverage:1480 tests/14 files. Shared engine/UI is unchanged;the full core suite was not rerun for this data-only lesson. Current compiler/typecheck/teaching/grammar/course/interaction/package,browser,nine offline and archive checks cover the final data.

Cumulative497 conditions/1491 widths;earlier flows retain scope. Hashes:checkpoint-49.*.
Next:l-g-future-passive. Fifteen future-passive tasks are drafted outside course files. Inspect and register an original missing/repaired handrail diptych for planned-result selection,then check doer/receiver boundaries,will/be/participle,irregular forms,negative placement,questions and replies. Overall claim continues solo;364 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-future-passive individually reviewed

50/413 reviewed. Fifteen future-passive tasks use original handrail repair imagery,active/passive meaning,will/be/participle assembly,irregular forms,negatives,questions,by-agents and short replies.

Inspected original/delivery art,all15 models,narrow-phone figures,wrong picture/all14 wrong word selections,partial/removal recovery and all application/transfer steps. Enlarged the first picture and reinspected final actor,predicate and future-time boundaries. Grade9;reserved005–008 unexposed;zero independent records. Fresh MCP project-instruction read remains blocked by external-drive access;existing native card updated.

Current new lesson flow:15 conditions/45 task-width checks,reload and zero independent records. Retained shared-engine coverage:1,480 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,9 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Retained checkpoint45 coverage:1480 tests/14 files. Shared engine/UI is unchanged;the full core suite was not rerun for this data-only lesson. Current compiler/typecheck/teaching/grammar/course/interaction/package,browser,nine offline and archive checks cover the final data.

Cumulative512 conditions/1536 widths;earlier flows retain scope. Hashes:checkpoint-50.*.
Next:l-g-participles. Fifteen participle tasks are drafted outside course files. Original airborne/grounded leaf art has been inspected at original/delivery size. Register it after this checkpoint;check ongoing/completed states,modified nouns,active/passive relationships,irregular forms and finite predicates without treating all past participles as passive. Overall claim continues solo;363 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-participles individually reviewed

51/413 reviewed. Fifteen participle tasks contrast falling/fallen pictures,modified nouns,doer/receiver relationships,completion,irregular forms,excited/exciting and finite predicates.

Inspected original/revised delivery art,all15 models,phone figures,both wrong picture gates,all13 wrong word selections,partial/removal recovery and all application/transfer steps. Reframed art after a label hid the grounded leaf;final phone views show both leaves clearly. Corrected breaking-window feedback preserves intransitive meaning. Grade9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:15 conditions/45 task-width checks,reload and zero independent records. Retained shared-engine coverage:1,480 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,9 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Retained checkpoint45 coverage:1480 tests/14 files. Shared engine/UI is unchanged;the full core suite was not rerun for this data-only lesson. Current compiler/typecheck/teaching/grammar/course/interaction/package,browser,nine offline and archive checks cover the final data.

Cumulative527 conditions/1581 widths;earlier flows retain scope. Hashes:checkpoint-51.*.
Next:l-g-time-clauses. Fifteen time-clause tasks are drafted outside course files. Reuse opposite door states,check actual overlapping past intervals and select complete clauses or event order. Distinguish future time-clause present forms from past narrative,since origins and indirect when questions. Overall claim continues solo;362 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-time-clauses individually reviewed

52/413 reviewed. Fifteen time-clause tasks connect opposite door states,overlapping past intervals,event order and full clause boundaries with future-time present forms,past narration,since origins and indirect when questions. A shared fix keeps short assembled answers with punctuation.

Inspected all15 models,phone figures,four wrong records,eleven wrong word selections,partial/removal recovery and all application/transfer steps. Reinspected final timeline,bell feedback and corrected320-pixel ending. Existing participle ending was inspected after a complete regression;no extra credit. Maths river-drag/number-line examples were visually compared;no whole-course parity claim. Grades8–9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:15 conditions/45 task-width checks,reload and zero independent records. 1,481 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,9 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:1481 distinct tests/14 files:13 files passed the serial suite;catalogue round-trip timed out at the unchanged5-second limit and passed isolated in3.13 seconds total. Core checks precede final time-clause timeline/Chinese-feedback data refinements;final compiler/typecheck/teaching/grammar/course/interaction/package,browser,adapter,nine offline and archive checks cover those refinements.

Cumulative542 conditions/1626 widths;earlier flows retain scope. Hashes:checkpoint-52.*.
Next:l-g-reason-purpose. Fifteen reason/purpose/result tasks are drafted outside course files. Reuse opposite actual bus/bike records,distinguish clause/noun/verb phrase boundaries and so/such structures,and keep intended goals separate from outcomes. Check every role and explanation before review credit. Overall claim continues solo;361 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-reason-purpose individually reviewed

53/413 reviewed. Fifteen cause/purpose/result tasks gate opposite transport records,select complete clause/noun/verb phrase boundaries,and repair because/of,so that/in order to,so/such including many and repeated because/so.

Inspected all15 models,phone figures,both wrong transport gates,all13 wrong word selections,partial/removal recovery and all application/transfer steps. Given purposes do not prove achieved outcomes;fresh lamp/map transfer rejects invented completion. Grades8–9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:15 conditions/45 task-width checks,reload and zero independent records. Retained shared-engine coverage:1,481 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,9 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Retained checkpoint52 coverage:1481 distinct tests/14 files,with its documented unchanged-timeout catalogue rerun. Shared engine/UI is unchanged;the full core suite was not rerun for this data-only lesson. Current compiler/typecheck/teaching/grammar/course/interaction/package,browser,adapter,nine offline and archive checks cover the final data.

Cumulative557 conditions/1671 widths;earlier flows retain scope. Hashes:checkpoint-53.*.
Next:l-g-concession. Fifteen concession/condition tasks are drafted outside course files. Register inspected dry/rain playground artwork,apply the explicit activity policy,repair unless/if-not and although/despite boundaries,and distinguish necessary conditions from guaranteed results. Enforce the existing sentence-initial capital instructions in source responses. Overall claim continues solo;360 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-concession individually reviewed

54/413 reviewed. Fifteen concession/condition tasks gate opposite dry/rain records,apply an explicit activity policy,repair unless/if-not and although/despite boundaries,and distinguish necessary conditions from guaranteed outcomes.

Inspected all15 models,narrow-phone weather figures,both wrong record gates,all13 wrong word selections,typed/assembled errors,partial/removal recovery and every application/transfer step. Unless does not guarantee entry after the necessary ticket/test condition is met. Grades9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:15 conditions/45 task-width checks,reload and zero independent records. Retained shared-engine coverage:1,481 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,9 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Retained checkpoint52 coverage:1481 distinct tests/14 files,with its documented unchanged-timeout catalogue rerun. Shared engine/UI is unchanged;the full core suite was not rerun for this data-only lesson. Current compiler/typecheck/teaching/grammar/course/interaction/package,browser,adapter,nine offline and archive checks cover the final data.

Cumulative572 conditions/1716 widths;earlier flows retain scope. Hashes:checkpoint-54.*.
Next:l-g-interjections. Thirteen interjection tasks are drafted outside course files. Register the inspected upright/spilled cup artwork,require actual event records and textual emotion clues,and distinguish reactions/requests from unsupported facts. Preserve sentence-initial capital requirements. Overall claim continues solo;359 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-g-interjections individually reviewed

55/413 reviewed. Thirteen interjection tasks gate opposite cup outcomes,select context clues for reactions,compare two Oh contexts,and separate size impressions or quiet requests from unsupported facts.

Inspected all13 models,phone figures,both wrong cup gates,all11 wrong word selections,typed errors,partial/removal recovery and every application/transfer step. Shortened two inference labels after the first visual review and reinspected their final models and error states. Grades6–9;reserved005–008 unexposed;zero independent records.

Current new lesson flow:13 conditions/39 task-width checks,reload and zero independent records. Retained shared-engine coverage:1,481 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,9 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Retained checkpoint52 coverage:1481 distinct tests/14 files,with its documented unchanged-timeout catalogue rerun. Shared engine/UI is unchanged;the full core suite was not rerun for this data-only lesson. Current compiler/typecheck/teaching/grammar/course/interaction/package,browser,adapter,nine offline and archive checks cover the final data.

Cumulative585 conditions/1755 widths;earlier flows retain scope. Hashes:checkpoint-55.*.
Next:l-r-details. Twelve reading-detail tasks are drafted outside course files around an original book-cover notice and update. Build readable source cards,check action-specific places,bring/provide and deadline/event day,and require both time clues for duration. Extend real-control review to proof activities before credit. Overall claim continues solo;358 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-details individually reviewed

56/413 reviewed. Twelve original reading-detail tasks use visible source cards and a workshop-notice update to distinguish numbers/grades,action-specific places,bring/provide,deadline/event day and changed versus retained facts. Nine single-clue tasks finish directly;three dual-clue tasks require a short reason. Application evidence is a readable carousel.

Inspected all12 final models,320-pixel source cards,all21 wrong evidence selections,three partial-chain repairs,missing/removed reasons,application source carousels at320,all application/transfer steps and the fresh music-club source. Durations45,25 and35 minutes are checked. Reinspected both compound picture gates after a byte-identical migration;its12-task/36-width regression grants no new lesson credit. Grades6–9;reserved reading text2 remains unexposed;zero independent records.

Current new lesson flow:12 conditions/36 task-width checks,reload and zero independent records. 1,483 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,10 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Final full serial suite:1483 tests in14 files pass with the unchanged time limits. This includes source-card quote validation and single-clue versus multi-clue completion rules. Final current UI/data also passes compiler,typecheck,teaching,grammar,course,interaction,package,browser,adapter,ten offline and archive checks.

Cumulative597 conditions/1791 widths;earlier flows retain scope. Hashes:checkpoint-56.*.
Next:l-r-inference. Ten inference tasks and original broken/rejoined paper-bridge art are drafted and inspected outside course files. Connect picture choices to actual quoted evidence;combine context/actions and retain limits on motives,prizes,future plans and universal claims. Complete its own tests and visual review before credit. Overall claim continues solo;357 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-inference individually reviewed

57/413 reviewed. Ten original inference tasks connect an interactive broken/rejoined bridge pair to quoted evidence,combine context and actions,and limit conclusions about worry,helping,independence,repair outcomes,future plans and universal claims. Fresh speech transfer confines the inference to the actual listener and occasion.

Inspected all10 models,320-pixel source/bridge figures,both wrong picture paths,all15 wrong source choices,five partial-chain repairs,missing/removed reasons,application carousels and every application/transfer step. Reinspected final language refinements and both full sources,including actual scrolling to the story ending. The picture supplies state,not lesson timing,motives,prizes or strength. Grades7–9;reserved reading text2 remains unexposed;zero independent records.

Current new lesson flow:10 conditions/30 task-width checks,reload and zero independent records. 1,484 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,11 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Final full serial suite:1484 tests in14 files pass with unchanged time limits. It includes source-illustration ID validation and all whole-lesson completion guards. Final polished copy and UI also pass compiler,typecheck,teaching,grammar,course,interaction,package,browser,adapter,eleven offline and exact-source archive checks.

Cumulative607 conditions/1821 widths;earlier flows retain scope. Hashes:checkpoint-57.*.
Next:l-r-main-idea. Eight main-idea tasks are drafted outside course files around original garden-guide and photo-show texts. Connect problem/change/result,distinguish vivid true details from the whole theme,and support titles and purpose. Fresh chair-helping transfer rejects a scene detail and an invented speech. Complete its own browser and visual review before credit. Overall claim continues solo;356 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-main-idea individually reviewed

58/413 reviewed. Eight original main-idea tasks distinguish a true detail from the whole theme,connect problem/change/result,and support titles and purpose. Corrected the previously all-A reviewed choice transfers using stable build-time option layouts with answer/distractor remapping;canonical wording and correct meaning stay unchanged.

Inspected all8 models,all13 wrong source choices,three-clue and dual-clue partial recovery,full source endings,phone source cards,application carousels and every application/transfer diagram. Reinspected final American realized/colorful rendering. Three older full flows cover actual B/A/C transfer positions without new individual credit. Eligible grades8–9;reserved reading text2 remains unexposed;guided work creates zero independent records.

Current new lesson flow:8 conditions/24 task-width checks,reload and zero independent records. 1,488 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,12 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Final full serial suite:1488 tests in14 files with unchanged limits. Meaningful guards verify canonical answer/distractor meaning,stable layout and stale checked-letter invalidation while preserving writing. Edition tests cover American/British source cards,full material and application passages. Final compiler,typecheck,teaching,grammar,course,interaction,package,real browser,adapter,twelve offline and exact-source archive checks pass.

Cumulative615 conditions/1845 widths;earlier flows retain scope. Hashes:checkpoint-58.*.
Next:l-r-course-t01. Eight daily-routine tasks and an inspected original phone-beside-book/phone-on-shelf picture are drafted outside course files. Connect picture states to quoted evidence,Then to its antecedent,and distinguish activity duration,clock time,unknown gaps and conditional changes. Finish its own learner and visual review. Overall claim continues solo;355 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t01 individually reviewed

59/413 reviewed. Eight original daily-routine tasks use an interactive phone-beside-book/phone-on-shelf picture to select actual source evidence,require a separate action clue for interrupted reading,connect Then to homework,and distinguish duration,arrival time,unknown gaps,Tuesday exceptions and flexible buffers. Fresh18+7 transfer rejects an invented finishing time and a reassigned duration.

Inspected all8 models,all12 wrong source choices,both wrong picture paths,four partial-chain repairs,missing/removed reasons,the full source ending,all320-pixel picture/source figures,application carousels and every application/transfer step. Checked25+5=30 and18+7=25. Original and delivered art are inspected and registered with provenance/hash. Grades7–9;reserved reading text2 remains unexposed;zero independent records.

Current new lesson flow:8 conditions/24 task-width checks,reload and zero independent records. Retained shared-engine coverage:1,488 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,12 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Retained checkpoint58 full serial coverage:1488 tests/14 files with unchanged limits. Shared engine/UI and answer-layout helper are unchanged;the full suite was not rerun for this data/art-only lesson. Current compiler,typecheck,teaching,grammar,course,interaction,package,real browser,adapter,twelve offline and exact-source archive checks cover the new lesson.

Cumulative623 conditions/1869 widths;earlier flows retain scope. Hashes:checkpoint-59.*.
Next:l-r-course-t02. Ten school-notice tasks and inspected original blue-side-gate/front-entrance art are drafted outside production. Connect meeting/waiting,bring/provide,demonstration plus permission,eligibility plus signup,and conditional or dated updates. Verify45/35-minute sessions and fresh30-minute transfer before individual credit. Overall claim continues solo;354 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t02 individually reviewed

60/413 reviewed. Ten original school-notice tasks connect an original blue-side-gate/front-entrance picture to meeting and waiting evidence,contrast bring/provide,require demonstration and actual permission before scissors use,join eligibility with signup,and follow conditional or dated updates without discarding retained rules. Original45-minute and updated35-minute sessions lead to a fresh30-minute robot-club transfer.

Inspected all10 models,all13 wrong source choices,the wrong entrance picture,seven partial-chain repairs,missing/removed reasons,both full-source endings,all320-pixel source/entrance figures,application carousels and every application/transfer diagram. Reinspected final tool-use wording to distinguish actual permission from merely asking. Original and600-pixel generated art are inspected and registered with provenance/hash. Grades7–9;reserved reading text2 remains unexposed;zero independent records.

Current new lesson flow:10 conditions/30 task-width checks,reload and zero independent records. Retained shared-engine coverage:1,488 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,12 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Retained checkpoint58 full serial coverage:1488 tests/14 files with unchanged limits. Shared engine/UI and answer-layout helper are unchanged;the full suite was not rerun for this data/art-only lesson. Current compiler,typecheck,teaching,grammar,course,interaction,package,real browser,adapter,twelve offline and exact-source archive checks cover the new lesson.

Cumulative633 conditions/1899 widths;earlier flows retain scope. Hashes:checkpoint-60.*.
Next:l-r-course-t03. Nine original help-reading tasks are drafted outside production around a message,a teacher reply and a later outcome. Separate explicit privacy,difficulty/request,planning/guarantees,conditional family support and limited progress. Fresh report transfer distinguishes arranged help from rehearsal and task completion. Overall claim continues solo;353 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t03 individually reviewed

61/413 reviewed. Nine original message/reply/outcome tasks connect stated difficulty to a specific help request,identify explicit privacy,limit situational difficulty,distinguish a practice plan from guarantees,and follow conditional family support and real progress. Fresh report transfer separates agreed support,first-step preparation,rehearsal and the later presentation.

Inspected all9 models,all16 wrong source choices,two partial-chain repairs,missing/removed reasons,all three full sources and their endings,320-pixel source cards,application carousels and every application/transfer diagram. Reinspected the final unambiguous in-front-of-the-class phrasing. Feelings come from explicit text,not faces or diagnoses. Grades7–9;reserved reading text2 remains unexposed;zero independent records.

Current new lesson flow:9 conditions/27 task-width checks,reload and zero independent records. Retained shared-engine coverage:1,488 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,12 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Retained checkpoint58 full serial coverage:1488 tests/14 files with unchanged limits. Shared engine/UI and answer-layout helper are unchanged;the full suite was not rerun for this data/art-only lesson. Current compiler,typecheck,teaching,grammar,course,interaction,package,real browser,adapter,twelve offline and exact-source archive checks cover the new lesson.

Cumulative642 conditions/1926 widths;earlier flows retain scope. Hashes:checkpoint-61.*.
Next:l-r-course-t04. Eight learning-method reading tasks are drafted outside production. Connect covered-note attempt/check order,resolve4/2 scopes and those two,separate correction from later recall,and decline to invent Thursday scores. Fresh Jun log separates2 recalled before checking from1 corrected after. A bounded audit also found unconverted practised in existing American speaking/vocabulary text;repair its edition handling with a meaningful regression. Overall claim continues solo;352 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t04 individually reviewed

62/413 reviewed. Eight original learning-method reading tasks establish attempt-before-checking,resolve4/2 counts and those two,follow Tuesday/Thursday scopes,separate corrections from recall and refuse an invented later score. Fresh Jun log distinguishes2 recalled before checking from1 corrected after. Fixed practised/practiced across actual speaking/vocabulary models while preserving the noun practice;replaced notice-specific source-button copy and an internal-record caption with student-facing wording.

Inspected all8 models,all13 wrong source choices,three partial-chain repairs,missing/removed reasons,the full source ending,all320-pixel cards,application carousels and every application/transfer diagram. Reinspected the final source button and educational caption. The log questions analyse fictional characters;guided attempts,mastery and lesson-pass records remain zero. Grades7–9;reserved reading text2 remains unexposed.

Current new lesson flow:8 conditions/24 task-width checks,reload and zero independent records. 1,489 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,12 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Final full serial suite:1489 tests in14 files pass with unchanged limits. The added regression exercises actual speaking models and the singer vocabulary example under both spellings,plus the unchanged noun practice. Final compiler,typecheck,teaching,grammar,course,interaction,package,real browser,adapter,twelve offline and exact-source archive checks cover the final data/UI copy.

Cumulative650 conditions/1950 widths;earlier flows retain scope. Hashes:checkpoint-62.*.
Next:l-r-course-t05. Eight self-management tasks plus original red-folder/front-pocket versus paper-tray art are drafted and inspected outside production. Compare expected/actual8-minute timing,match opposite destinations,keep2 books distinct,and limit one success and untried plans. Fresh Sam transfer uses12 minutes. Implement named clue slots from evidenceLabels and test their real partial/wrong/reload states before review. Plan:/tmp/next63-engine-plan.md. Overall claim continues solo;351 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t05 individually reviewed

63/413 reviewed. Eight original self-management tasks connect opposite red-folder/front-pocket and paper-tray picture choices to actual evidence,compare expected versus actual8-minute timing,attach2 to returned books,and separate one success,remaining difficulties and an untried plan. Named clue slots show each complementary evidence role and fill from checked groups. Fresh Sam transfer uses12 minutes while preserving the untried weekly plan.

Inspected all8 models,all12 wrong source choices,both wrong picture destinations,four partial-chain repairs,missing/removed reasons,the complete source ending,all320-pixel picture/source and named-slot figures,application carousels and every application/transfer diagram. Shortened and reinspected the final picture label so it fits one line at320. Original and600-pixel art are inspected,registered and hashed. Grades7–9;reserved reading text2 stays unexposed;zero independent records.

Current new lesson flow:8 conditions/24 task-width checks,reload and zero independent records. 1,491 core tests/14 files,typecheck,826 teaching/spelling,grammar/course/interaction/package checks,13 offline checks and fresh ZIP CRC/exact-source comparison pass. Native adapter scope:Final development/cloud simulations passed,including all245 hashes and artwork readiness/failure/retry. No native GUI evidence. Core scope:Final full serial suite:1491 tests/14 files pass with unchanged limits. Two new regressions validate named evidence metadata and prove that multiple alternatives in one group cannot fill another,with wrong-choice and partial-reload preservation. Real controls check empty/partial/complete nodes and fit at320/390/768. Final compiler,typecheck,teaching,grammar,course,interaction,package,browser,adapter,thirteen offline and exact-source archive checks pass.

Cumulative658 conditions/1974 widths;earlier flows retain scope. Hashes:checkpoint-63.*.
Next:l-r-course-t06. Nine careers-reading tasks and inspected original backstage-prop/entrance-ticket-desk art are drafted outside production. Resolve She/them from context,match opposite workspaces to responsibilities,follow reporting and its limits,and distinguish an observed occasion from permanent claims. Fresh library-event transfer keeps role/report ownership and rejects zero-problem guarantees. Grades8–9;complete its own browser/visual review. Overall claim continues solo;350 pending.
Native GUI still blocked by project access;no release,upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t06 individually reviewed

64/413 reviewed. Nine original careers-reading tasks resolve She/them in context, match backstage props and entrance tickets to opposite pictured workspaces, connect damaged objects and mismatched tickets to their respective reports, and preserve the limits of a guarantee and an observed occasion. The fresh library-event transfer keeps each volunteer’s role and report together without inventing a problem-free outcome.

Inspected all nine models, wrong source choices and both wrong picture choices, partial evidence chains and reason repairs, complete source, 320-pixel source/picture cards and named evidence slots, application carousels and every application/transfer explanation figure. Rechecked the final adjacent Mina/She source order and workspace feedback. Original and 600-pixel artwork inspected and registered. Grades 8–9; reserved reading text 2 stays unexposed; guided attempts, mastery and lesson-pass records remain zero.

Current new lesson: 9 tasks / 27 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 63 serial suite: 1491 tests in 14 files; shared engine/UI unchanged. Current final data/art compiler, typecheck, teaching/spelling, grammar, course, interactions, package, individual browser, development/cloud adapters, thirteen offline checks and exact-source archives pass. No new full core-suite run is claimed. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 13 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 667 tasks / 2001 widths; earlier flows retain scope. Hashes: checkpoint-64.*.
Next: l-r-course-t07. Eight labor-procedure tasks and inspected original cloth-versus-notebook plant setups are drafted outside production. Read positive and negative picture prompts, whether/if/before conditions, cleanup and completion requirements, Friday reporting roles and limits of blame. Fresh art-club checklist requires clean brushes, a dry table and returned materials. Overall claim continues solo; 349 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t07 individually reviewed

65/413 reviewed. Eight original plant-care reading tasks connect action with purpose, use opposite positive/negative picture choices, read whether/if/before conditions, join cleanup with readiness for others, identify Friday reporting roles and reject unsupported blame. A fresh art-club checklist requires clean brushes, a dry table and returned materials.

Inspected all eight models, all thirteen wrong source choices, both wrong pictures, three partial-chain repairs and missing/removed reasons, the full source ending, all 320-pixel source/picture cards and named slots, application carousels and every application/transfer explanation. Original and 600-pixel artwork are inspected, registered and hashed. Grades 7–9; reserved reading text 2 stays unexposed; zero independent records. A read-only native recheck confirmed that WeChat status responds but MacStudioExternal project-file access remains blocked; the existing blocked Kanban card was updated successfully.

Current new lesson: 8 tasks / 24 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 63 serial suite: 1491 tests in 14 files; shared engine/UI unchanged. Current final data/art compiler, typecheck, teaching/spelling, grammar, course, interactions, package, individual browser, development/cloud adapters, thirteen offline checks and exact-source archives pass. No new full core-suite run is claimed. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 13 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 675 tasks / 2025 widths; earlier flows retain scope. Hashes: checkpoint-65.*.
Next: l-r-course-t08. Design the spending/budget lesson around single-versus-three-pack offers, total versus unit prices, current need and budget, change and unsupported quality claims. New original notebook-offer artwork is generated and inspected outside production; keep prices and quantities in code. Overall claim continues solo; 348 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t08 individually reviewed

66/413 reviewed. Eight original budget-reading tasks distinguish pack total, unit price, budget, current need, actual purchase and change. Opposite picture answers select the purchased single notebook versus the cheaper-per-item three-pack. Fresh Tao transfer changes every amount (7×2=14, 17−14=3, 24÷4=6) and includes a partly correct option with an unsupported durability claim. The existing application now quotes both budget and need in full. Shared picture feedback distinguishes new selection (dot), checked wrong (cross) and accepted evidence (tick) in web and native layouts; the browser driver now navigates explanations with any number of steps.

Inspected all eight models, all thirteen wrong source choices, both wrong offer pictures, three partial-chain repairs, missing/removed reasons, complete source ending, all 320-pixel cards and named slots, application carousels and every application/transfer figure. Reinspected the final opposite picture states and complete budget/need explanation. Original and 600-pixel art are inspected and registered. Grades 8–9; reserved reading text 2 stays unexposed; zero independent records. Full plant-lesson regression (8 tasks/24 widths) verifies the shared picture-symbol change and is not counted again.

Current new lesson: 8 tasks / 24 task-width checks, reload and zero independent records. Core scope: Final full serial suite: 1491 tests in 14 files pass with unchanged limits. Current final compiler, typecheck, 826 teaching/spelling variants, nine grammar constraints, course, interactions, package, complete budget and plant browser flows, development/cloud adapters, thirteen offline checks and exact-source archives pass. Real controls assert a new selection dot and wrong cross instead of a misleading tick; the three-step explanation restores and navigates backward through each step. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 13 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 683 tasks / 2049 widths; earlier flows retain scope. Hashes: checkpoint-66.*.
Next: l-r-course-t09. Eight problem-solving tasks are drafted outside production, with inspected original clear-pocket/marker art. Implement and test opt-in sourceOrder so the learner constructs observe → test → choose, with decoy removal, wrong-order repair and partial reload. Preserve spare/borrowed ownership and tested-scope limits. Plan: /workspace/.onboarding/lesson-drafts/next67-sequence-plan.md. Overall claim continues solo; 347 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t09 individually reviewed

67/413 reviewed. Eight original problem-solving tasks separate guess from observation, build observe → test → choose from source sentences, preserve spare/borrowed ownership, compare opposite clear-pocket/direct-writing pictures and match method features to changing needs. Fresh library-notice transfer limits an indoor result instead of inventing outdoor performance. New ordered-source controls support add/remove/reset, specific decoy and misplaced-position feedback, actual-order validation, partial restoration and completion invalidation after edits.

Inspected all eight models, all wrong source and picture choices, swapped-order and decoy states, partial order restore and removal after completion, three other partial evidence-chain repairs, missing/removed reasoning, full source ending, every 320-pixel source/order/picture and named-slot figure, application carousels and all application/transfer steps. Shortened and reinspected the final borrowed-box label. Original and 600-pixel artwork inspected and registered. Grades 8–9; reserved text 2 stays unexposed; zero independent records. Existing budget flow rerun after shared changes without new review credit.

Current new lesson: 8 tasks / 24 task-width checks, reload and zero independent records. Core scope: Final serial suite: 1493 tests in 14 files, unchanged limits. Two new meaningful regressions cover actual-order requirements, swapped steps, decoys, duplicate/unknown IDs, partial reload, removed completion, own reasoning and ambiguous metadata; the complete checked-pack app test uses the actual new actions. Final compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, individual browser, development/cloud adapters, fourteen offline checks and exact-source archives pass. The existing workshop checker also passes one complete lesson-67 flow and 25 rendered states at each of 320/390/768 after its order, single-clue, multi-clue and carousel actions and registered-art resolver were updated. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 14 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 691 tasks / 2073 widths; earlier flows retain scope. Hashes: checkpoint-67.*.
Next: l-r-course-t10. Eight friendship-email tasks plus inspected original board-game/school-gate art are drafted outside production. Order leaving, guessing and later explanation; use opposite pictures for a reported destination and tomorrow’s invitation; separate request ownership, personal commitment, unconfirmed acceptance and choice. Fresh shared-drawing transfer keeps agreed storage and notice of moves distinct from ownership or a total ban. Overall claim continues solo; 346 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t10 individually reviewed

68/413 reviewed. Eight original friendship-email tasks separate May’s guess from Leo’s reported explanation, construct the leaving/guess/later-explanation sequence, choose opposite game/gate pictures for different times, assign requests and commitments to the right person, preserve unconfirmed acceptance and respect other plans. Fresh shared-drawing transfer distinguishes agreed storage and notice of moves from a total ban or ownership change. English possessives and contractions now use readable interior apostrophes in edition-mapped web/native models; local Leo/Tao prompts use matching punctuation.

Inspected all eight models, all eleven wrong source choices and both wrong pictures, wrong order and decoy, partial-order reload and removal after completion, four other partial chains, missing/removed reasoning, full source ending, all 320-pixel cards/order/pictures and four named-slot figures, application carousels and every application/transfer step. Reinspected the final Leo/Ben headings and Tao budget-transfer heading. Original and 600-pixel art inspected and registered. Grades 7–9; reserved reading text 2 stays unexposed; zero independent records. Existing budget lesson rerun (8 tasks/24 widths), without new individual credit.

Current new lesson: 8 tasks / 24 task-width checks, reload and zero independent records. Core scope: Final full serial suite: 1494 tests in 14 files pass, unchanged limits. The added integration regression exercises actual friendship cases and modal-lesson models under both spellings, preserving quoted evidence, correct answers and Chinese quotation marks while making interior English apostrophes readable. Final compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete friendship and budget browser flows, development/cloud adapters, fourteen offline checks and exact-source archives pass. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 14 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 699 tasks / 2097 widths; earlier flows retain scope. Hashes: checkpoint-68.*.
Next: l-r-course-t11. Eight family-notice tasks and inspected original washing-station/table-setting art are drafted outside production. Resolve those days, match opposite roles, distinguish assignments from an unstated order, keep everyone/their own scope and Saturday availability separate, and read advance notice and cooperative purpose. Fresh community-reading-room transfer changes the day and rejects automatic role carryover and speed ranking. Overall claim continues solo; 345 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t11 individually reviewed

69/413 reviewed. Eight original family-notice tasks resolve those days, use opposite washing/table-setting pictures, distinguish role assignments from unstated sequence, preserve everyone/their own scope and Saturday availability, and connect advance notice with cooperative purpose. Fresh community-reading-room transfer changes the day and rejects automatic role carryover and speed ranking.

Inspected all eight models, all twelve wrong source choices and both wrong pictures, four partial evidence chains and missing/removed reasoning, full source ending, final adjacent reference/role cards, all 320-pixel cards/pictures and four named-slot figures, application carousels and every application/transfer explanation. Final passage endings are visible after actual scrolling at 320 pixels. Original and delivery artwork inspected and registered. Grades 7–9; reserved reading text 2 stays unexposed; zero independent records. Read-only native status succeeds but MacStudioExternal file access still fails; existing blocked card updated.

Current new lesson: 8 tasks / 24 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 68 full serial suite: 1494 tests in 14 files; shared product engine/UI unchanged. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete family browser flow, development/cloud adapters, fourteen offline checks and exact-source archives pass. The browser driver additionally verifies the actual final passage characters are reachable and visible at 320 pixels. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 14 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 707 tasks / 2121 widths; earlier flows retain scope. Hashes: checkpoint-69.*.
Next: l-r-course-t12. Eight volunteer-notice tasks and original welcome-desk/large-print-shelf art are drafted outside production. Separate 13:50 arrival from 80-minute event duration, match opposite locations, preserve only-if permission and private-document requirements, distinguish advance notice from early arrival and respond to actual needs. Fresh Saturday transfer changes arrival to 15:45 and checks partly correct combinations. Overall claim continues solo; 344 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t12 individually reviewed

70/413 reviewed. Eight original volunteer-notice tasks require entered 13:50 arrival and 80-minute duration, opposite welcome-desk/large-print-shelf picture choices, only-if permission, paired private-document instructions, distinct advance notice and early arrival, and help based on actual needs. Fresh Saturday transfer changes arrival to 15:45 and uses partly correct combination distractors. Calculated responses now require evidence and the learner's own number; edits invalidate completion and offline reload retains attempts. Web/native explanation views temporarily hide the separate evidence browser and feedback, restore it on closing, and close a previous answer's explanation when changing questions. Application reasons explain early arrival and private handling specifically; the full handling sentence is quoted.

Inspected all eight models, thirteen wrong source choices and both wrong pictures, three partial chains, missing/removed reasoning, empty/wrong/removed numerical answers and final calculated controls at 320 pixels, the shortened private-handling slot, complete source and passage endings, application carousels and all application/transfer explanation steps. Final focused explanation screens were inspected after duplicate evidence/feedback removal. Original and 600-pixel art inspected and registered. Grades 7–9; reserved reading text 2 stays unexposed; zero independent records.

Current new lesson: 8 tasks / 24 task-width checks, reload and zero independent records. Core scope: Final full serial suite: 1497 tests in 14 files pass with unchanged limits. Three new meaningful regressions cover actual calculated answers plus evidence, wrong/partial formats, full-width digits/colons, reload/edit invalidation, invalid metadata, spelling mapping and closing a prior explanation when changing reading questions. The full checked-pack journey uses calculated responses. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete volunteer flow, development/cloud adapters, fifteen offline checks, one existing-checker flow and 27 states at each of 320/390/768, and exact-source archives pass. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 15 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 715 tasks / 2145 widths; earlier flows retain scope. Hashes: checkpoint-70.*.
Next: l-r-course-t13. Eight teamwork tasks and inspected original permission-clipboard/microphone art are drafted outside production. Construct needs → division of work → group check, match opposite responsibilities, separate internal checking from public sharing, assign fact checking, explain early delay notice, recognise several contributions and satisfy a two-part meeting requirement. Fresh podcast transfer changes people and day, and requires obtained permission before sharing. Overall claim continues solo; 343 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t13 individually reviewed

71/413 reviewed. Eight original teamwork tasks construct needs → division of work → group check, match opposite permission-recording/narration pictures, separate internal checking from public sharing and obtained permission, assign fact checking, explain early delay notice, recognise several necessary contributions and satisfy a two-part meeting requirement. Fresh podcast transfer changes people and day and rejects inflated roles and automatic release. The course title, objective, pitfall and application reasons now name the actual cooperation-reading skills.

Inspected all eight models, all wrong source choices and both wrong role pictures, sequence decoy/swapped order/partial reload/removal after completion, three other partial chains and missing/removed reasons, every 320-pixel source/order/picture card and three named-slot figures, complete source and passage endings, application carousels and every application/transfer step. Reinspected the final credit prompt and native Chinese meeting explanation. Original and 600-pixel artwork inspected and registered. Grades 8–9; reserved reading text 2 stays unexposed; zero independent records.

Current new lesson: 8 tasks / 24 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 70 final serial suite: 1497 tests in 14 files; shared product engine/UI unchanged. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete teamwork browser flow, development/cloud adapters, fifteen offline checks and exact-source archives pass. The browser driver now opens and verifies the full source at 320 pixels even when the first task is an ordered sequence. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 15 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 723 tasks / 2169 widths; earlier flows retain scope. Hashes: checkpoint-71.*.
Next: l-r-course-t14. Eight local-history tasks and inspected original tool-room/history-display art are drafted outside production. Build storage → empty → display, use opposite original/current picture choices without giving away the time in labels, keep the street constant while time changes, weigh loss with benefit, preserve unknown dates and source provenance and support a balanced attitude. Fresh bridge-display transfer rejects invented years and one-sided inference. Overall claim continues solo; 342 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t14 individually reviewed

72/413 reviewed. Eight original local-history tasks construct storage → empty → display, select opposite original/current room pictures with neutral use labels, hold street identity constant while time varies, weigh a loss against a benefit, preserve unknown dates and photograph provenance, and support a balanced attitude. Fresh bridge-display transfer rejects an invented year and a one-sided inference. Course title, objective, pitfall and application reasons identify the actual reading skills; the comparison application quotes its full sentence.

Inspected all eight models, all wrong source choices and both wrong room pictures, sequence decoy/swapped order/partial reload/removal after completion, two other partial chains and missing/removed reasons, every 320-pixel source/order/picture card and both named-slot figures, full source and passage endings, application carousels and all application/transfer steps. Final timeline explanation avoids inventing when permission was granted. Original and 600-pixel art inspected; generated street thumbnails are fictional illustrations, not historical evidence. Grades 8–9; reserved reading text 2 stays unexposed; zero independent records.

Current new lesson: 8 tasks / 24 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 70 final serial suite: 1497 tests in 14 files; shared product engine/UI unchanged. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete local-history browser flow, development/cloud adapters, fifteen offline checks and exact-source archives pass. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 15 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 731 tasks / 2193 widths; earlier flows retain scope. Hashes: checkpoint-72.*.
Next: l-r-course-t15. Eight family-food-story invitation tasks and inspected original noodles/dumplings art are drafted outside production. Enter a 45-minute duration, match opposite named speakers and dishes, distinguish no obligation from prohibition, combine optional photographs with permission conditions, ask about particular family experiences, handle a declined question politely and reject country-wide overgeneralisation. Fresh weekend-story transfer changes duration to 50 minutes and tests partly correct time/scope combinations. Overall claim continues solo; 341 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t15 individually reviewed

73/413 reviewed. Eight original family-food invitation tasks require an entered 45-minute duration, opposite Tao/noodles and Nora/dumplings picture matching, distinguish absence of obligation from prohibition, connect optional photographs with permission conditions, ask about particular experiences, handle a declined personal question and reject country-wide rules. Fresh weekend-story transfer changes duration to 50 minutes with partly correct time/scope distractors. Course title, objective, pitfall and application reasons now identify these specific skills.

Inspected all eight models, all thirteen wrong source choices and both wrong food pictures, three partial evidence chains and missing/removed reasoning, empty/wrong/removed numerical input and its reload, every 320-pixel source/picture card and three named-slot figures, the calculated-response control at 320 pixels, full source and passage endings, application carousels and every application/transfer step. Original and 600-pixel art inspected and registered; dish identity does not establish nationality, compulsory food bringing or fixed customs. Grades 8–9; reserved reading text 2 stays unexposed; zero independent records.

Current new lesson: 8 tasks / 24 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 70 final serial suite: 1497 tests in 14 files; shared product engine/UI unchanged. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete invitation browser flow, development/cloud adapters, fifteen offline checks and exact-source archives pass. Calculation probes choose a distinct incorrect value without assuming every future duration is 80 minutes or every arrival is 13:50. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 15 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 739 tasks / 2217 widths; earlier flows retain scope. Hashes: checkpoint-73.*.
Next: l-r-course-t16. Eight poem-and-note tasks and inspected original still/rippled-puddle art are drafted outside production. Match opposite water states, construct reflection → disturbance → clear reflection, distinguish a poetic second tree from an actual new tree, explain the returning reflection, ground differing feelings in words, read grows quiet as a change of state and reject invented biography. Fresh window-on-lane metaphor changes tree/wheel to sky/footstep. Recheck native project-file access before the next native GUI attempt. Overall claim continues solo; 340 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t16 individually reviewed

74/413 reviewed. Eight original poem-and-note tasks match opposite still/rippled pictures, build reflection → disturbance → return, distinguish a poetic second tree from an actual new tree, explain the returning reflection, ground differing feelings in words, read grows quiet as change and reject invented biography. Fresh sky/window metaphor changes the image and disturbance. Course title, objective, pitfall and application reasons identify these reading skills.

Inspected all eight models, all wrong source choices and both wrong water pictures, sequence decoy/swapped order/partial reload/removal after completion, three other partial chains and missing/removed reasons, every 320-pixel source/order/picture card and three named-slot figures, full source and passage endings, application carousels and every application/transfer step. Reinspected the shortened tree/word-evidence slots and final biography feedback. Original and 600-pixel art inspected and registered; the real tree stays intact and the reflection changes. Grades 8–9; reserved text 2 stays unexposed; zero independent records. Read-only WeChat status succeeds, but shared project-file access remains unavailable; the existing card tracking status is blocked.

Current new lesson: 8 tasks / 24 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 70 final serial suite: 1497 tests in 14 files; shared product engine/UI unchanged. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete poetry flow, development/cloud adapters, fifteen offline checks and exact-source archives pass. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 15 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 747 tasks / 2241 widths; earlier flows retain scope. Hashes: checkpoint-74.*.
Next: l-r-course-t17. Build ten sports-rule tasks using selectable players and changing pass logs, followed by fall/teacher-check, disagreement, opponent-help and participation situations. Original four-player art is inspected outside production. Fresh five-player transfer must distinguish five touches from four different players. Overall claim continues solo; 339 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t17 individually reviewed

75/413 reviewed. Ten original sports-rule tasks use four selectable fictional players and changing pass logs to distinguish touches from different participants, then apply fall/teacher-check, calm disagreement, opponent-help and inclusive-purpose rules. Fresh five-player transfer has five touches but four different players and tests a partly correct combination. Explicit stacked web/native diagrams preserve English words and correct stop-before-check order; selected people now use pending dots, wrong crosses and ticks only for a checked complete participant set. Reading applications can opt into the existing fragment carousel independently of workshop kind.

Inspected all ten models and wrong expressions, wrong/missing player selections, removal after completion and reload in each picture condition, every 320-pixel picture/record/stacked diagram, complete application and transfer passages through their final characters, application evidence errors/repairs and every explanation step. Reinspected final stop/check order, opponent-plus-skill requirements, shorter distractors, selection symbols and updated application wording. Original and 600-pixel art inspected and registered; code logs determine touches, not the portrait. Fresh five-player figure uses exact code labels, not the four-person image. Grades 7–9; reserved Ben/race text stays unexposed; zero independent records. Existing be lesson rerun at three widths, with wrong/removal/correct screenshots inspected and no new individual credit.

Current new lesson: 10 tasks / 30 task-width checks, reload and zero independent records. Core scope: Final full serial suite: 1498 tests in 14 files pass with unchanged limits. A meaningful new two-spelling regression checks actual changing pass logs, distinct-player sets, incomplete/repaired/removed selections and five-player transfer separation. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, full sports browser flow, seven-condition existing be-lesson regression, development/cloud adapters, fifteen offline checks and exact-source archives pass. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 15 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 757 tasks / 2271 widths; earlier flows retain scope. Hashes: checkpoint-75.*.
Next: l-r-course-t18. Nine kite-story tasks and inspected original missing/attached-paper-tail art are drafted outside production. Distinguish unused could-have possibilities from actual messages, order four real events, compare expected perfection with remembered shared work, interpret made room and preserve the qualified theme. Fresh leaky-model-boat transfer rejects partly correct overgeneralisation. Overall claim continues solo; 338 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t18 individually reviewed

76/413 reviewed. Nine original kite-story tasks match opposite missing/attached-tail pictures, distinguish an unused could-have possibility from an actual message, identify the cousin’s suggestion, order four real events, combine adult supervision with adjustment, compare expected perfection with remembered shared work, interpret made room and preserve the qualified theme. Fresh leaky-model-boat transfer rejects both an invented hiding action and a partly correct summary that says mistakes never matter. Course title, objective, pitfall and application reasons now identify these skills.

Inspected all nine models, all wrong source choices and both wrong kite pictures, sequence decoy/swapped order/partial reload/removal after completion, four other partial chains and missing/removed reasoning, every 320-pixel source/order/picture card and four named-slot figures, complete source and passage endings, application evidence carousels and every application/transfer step. Reinspected final shorter cooperation/participation slots and simpler theme labels. Original and 600-pixel art inspected and registered; pictures establish tail state, not date, motives or flight success. Grades 8–9; reserved invented-book review stays unexposed; no cousin gender or exact age invented; zero independent records.

Current new lesson: 9 tasks / 27 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 75 final serial suite: 1498 tests in 14 files; shared product engine/UI unchanged. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete kite-story browser flow, development/cloud adapters, fifteen offline checks and exact-source archives pass. The source-ending driver now checks the actual final characters of a long paragraph rather than requiring an entire final paragraph to fit at once. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 15 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 766 tasks / 2298 widths; earlier flows retain scope. Hashes: checkpoint-76.*.
Next: l-r-course-t19. Nine postcard tasks and inspected original close/wider paper-bird framing art are drafted outside production. Identify writer/recipient, contrast expectation with variety, apply a limited photo permission through opposite pictures, order ask/limited yes/compliance, resolve She, locate the favourite activity and preserve one-family and unstated publishing-permission boundaries. Fresh pottery sketch transfer combines permission limits with one-family scope. Overall claim continues solo; 337 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t19 individually reviewed

77/413 reviewed. Nine original postcard tasks identify writer/recipient, contrast expectation with actual variety, apply a limited photo permission through opposite close/wide framing pictures, order ask/limited yes/compliance, resolve She, locate the favourite activity, preserve one-family scope and distinguish photo-taking permission from unstated publishing permission. Fresh pottery-sketch transfer combines a changed permission boundary with family-scope inference. Web/native accepted picture evidence now remains marked while collecting another clue; quoted greeting/signature line breaks remain readable.

Inspected all nine models, all wrong source choices and both wrong framing pictures, ordered decoy/swapped steps/partial reload/removal after completion, five other partial chains and missing/removed reasoning, every 320-pixel source/order/picture card and five named-slot figures, full source and passage endings, application evidence errors/repairs and every explanation step. Reinspected retained picture ticks alongside another selected clue or wrong picture and the final separate Love/Jia signature lines. Original and 600-pixel art inspected and registered; the close view includes hands and apron but excludes the child, while the wider view includes the fictional child. Pictures establish framing, not permission. Grades 7–9; reserved culture-fair notice stays unexposed; no exact date or national custom invented; zero independent records. Existing kite flow rerun at three widths with wrong/correct single-clue figures inspected, without new individual credit.

Current new lesson: 9 tasks / 27 task-width checks, reload and zero independent records. Core scope: Full serial suite: 1499 tests in 14 files pass with unchanged limits. A meaningful new regression exercises both actual postcard picture arguments, retained accepted pictures across another clue, wrong pictures, reload and the still-required reasoning. Final quote line-break styling is verified by the real rendered signature assertion. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete postcard flow, prior single-clue kite regression, development/cloud adapters, fifteen offline checks and exact-source archives pass. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 15 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 775 tasks / 2325 widths; earlier flows retain scope. Hashes: checkpoint-77.*.
Next: l-r-course-t20. Use eight changing record-and-conclusion tasks for the fictional Ms Rao biography: explicit fiction, uncertainty, conflicting memories, a dated record resolving one question, loan versus gift, separate public-display permission, traceable records and accurate contribution. Use exact coded evidence/flow figures, not invented primary-source dates. Fresh fictional 2010/2012 event case combines date confirmation with still-ungranted public-display permission. Detailed plan is outside production; no next lesson authored or reviewed yet. Overall claim continues solo; 336 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t20 individually reviewed

78/413 reviewed. Eight changing record-and-conclusion tasks distinguish a fictional profile, evidence-seeking, conflicting memories before later evidence, a dated record resolving one question, discussion loans versus gifts, separate public-display permission, traceable uncertainty and accurate contribution. Fresh fictional 2010/2012 case separates date confirmation from ungranted display permission. Exact code diagrams change with the selected record and expression. Stacked web/native record rows now use larger full-width quotes with content-sized height, and the diagram omits a redundant source box. Course title, objective, pitfall and application reasons are specific to the biography.

Inspected all eight models, all sixteen wrong records and eight wrong expressions, correct-record repairs and reload, every final 320-pixel record bank and two-node diagram, full application and transfer passages through their final characters, evidence carousels and every explanation step, both partly correct transfer distractors, prediction, clinic and summary. Reinspected larger text after fixing inherited flex sizing so no quote spills into another row. Grade 9; reserved interview remains unexposed; primary-profile dates stay unknown; 2010/2012 belong only to the explicit original fictional transfer; zero independent records. No AI image substitutes for documentary evidence.

Current new lesson: 8 tasks / 24 task-width checks, reload and zero independent records. Core scope: Full serial core: 1499 tests in 14 files pass with unchanged limits. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package and full biography browser flow pass. Final row sizing is checked by actual full-width, font-size, whole-word and vertical text-containment assertions at 320/390/768. Development/cloud adapters, fifteen offline checks and exact-source archives pass. Native adapter scope: Development/cloud simulations passed, including all 245 hashes and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 15 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 783 tasks / 2349 widths; earlier flows retain scope. Hashes: checkpoint-78.*.
Next: l-r-course-t21. Build a fixed fictional photo-background masking exercise using an inspected original blank noticeboard and cardboard-robot project image, with exact name/phone/title overlays and masks in code. Reuse selection state, use full-width hide/restore buttons, keep purpose/permission checks separate and never promise deletion removes all copies. Raw and 600-pixel delivery are inspected outside production; no redaction engine or next-lesson JSON exists yet. Recheck read-only native project-file access around this next lesson before any GUI attempt. Overall claim continues solo; 335 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t21 individually reviewed

79/413 reviewed. Ten original photo-sharing tasks include four changing fictional masking previews. Learners hide actual name/phone fields while keeping the project title, reject automatic publishing permission, distinguish private-chat from public-use consent, choose a respectful alternative, seek help and preserve one-copy/all-copy limits. Fresh robot-project transfer rejects two partly correct plans. Web/native controls use exact opaque code masks over inspected original art. A separate native scene-root fix restores the sports illustration path.

Inspected all ten models and wrong expressions, all four unmasked/masked previews, extra/incomplete/edited masks, partial reload/removal/repair, every 320-pixel diagram and all masking widths, all application/transfer distractors and explanation steps, source endings, prediction, clinic and summary. Original PNG and 600-pixel art inspected; fictional fields only, no real-photo upload. Grades 8–9; reserved text stays unexposed; zero independent records. Existing sports wrong/correct/removal figures reinspected without new review credit.

Current new lesson: 10 tasks / 30 task-width checks, reload and zero independent records. Core scope: Full serial core: 1501 tests in 14 files pass. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete privacy learner flow, existing sports compatibility flow, both native adapters, sixteen offline checks and exact-source archives pass. Masking controls and field containment are checked at 320/390/768. Native adapter scope: Development/cloud simulations passed: all 245 hashes, registered resolved scene/record/proof/preview art files and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 16 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 793 tasks / 2379 widths; earlier flows retain scope. Hashes: checkpoint-79.*.
Next: l-r-course-t22. Author exhibition-note tasks for MANY WAYS TO BELONG: distinguish a river-path drawing, a family word and a new-neighbourhood bus journey; combine ordinary objects with personal connections, retain more-than-one-place and presenter-chosen privacy limits, repair overbroad labels and choose respectful visitor questions. Fresh transfer must change the examples and reject partly correct overgeneralisation. Source read; no next-lesson content or art installed. Overall claim continues solo; 334 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t22 individually reviewed

80/413 reviewed. Nine original exhibition-note tasks match opposite river-path/bus illustrations to the correct presenters, distinguish a family word from an invented exhibit, preserve multiple-place and no-residence-test limits, keep presenter-chosen privacy, reject town-wide labels and identify respectful participation and purpose. Fresh bridge/ticket transfer changes examples and rejects partly correct generalisation and exclusion. Shorter prompts and a plain-English application replace technical scoped wording. Course title/objective/pitfall and application reasons are specific to these skills.

Inspected all nine models, all 14 wrong source choices and both wrong pictures, six partial evidence chains with reload and missing/removed reasons, every 320-pixel source/picture card and named-slot figure, complete source/passage endings, all application/transfer distractors, evidence errors/repairs and every explanation step, prediction, clinic and summary. Reinspected shorter picture/residence prompts and final readable possessive punctuation. Original PNG and 600-pixel art inspected; fictional illustrations do not identify real places or prove family relationships. Grade 9; reserved personal essay stays unexposed; zero independent records.

Current new lesson: 9 tasks / 27 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 79 full serial suite: 1501 tests in 14 files; shared engine/UI unchanged. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete exhibition-note browser flow, both native adapter simulations, sixteen offline checks and exact-source archives pass. Native adapter scope: Development/cloud simulations passed: all 245 hashes, registered resolved scene/record/proof/preview art and illustration readiness/failure/retry. No native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 16 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 802 tasks / 2406 widths; earlier flows retain scope. Hashes: checkpoint-80.*.
Next: l-r-course-t23. Build fact-checking tasks for THE PHOTOGRAPH WITH A NEW CAPTION. Separate missing origin metadata, an earlier different-town context, the new current/local caption, unknown original details, intent of each sharer and current local conditions. Consider repeating one original fictional bridge/fence illustration in code-controlled old-post/new-caption panels so both truly use the same image. No original date/town may be invented. Fresh transfer must change the claimed event and preserve origin versus current local verification. A plan exists outside production; no next-lesson content or art installed. Overall claim continues solo; 333 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t23 individually reviewed

81/413 reviewed. Nine original fact-check tasks identify missing provenance, match opposite earlier-context/new-caption cards using exactly one repeated image, retain unknown original details, separate current local checks, avoid universal intent claims, distinguish genuine images from accurate captions, order two origin-checking steps and report known plus unknown. Fresh fallen-tree/gate transfer changes the event and restricts current-notice claims to named routes. New opt-in web/native context cards keep neutral labels and exact captions in code, with readable text and persistent accepted/wrong markers. Course prompts and application wording are specific and plain.

Inspected all nine models, all 16 wrong source choices and both wrong context cards, three partial evidence chains with missing/removed reasoning, ordered decoy/swapped steps/partial reload/removal/repair, every 320-pixel source/picture/order card and named-slot figure, all three comparison widths, complete source and passage endings, all application/transfer distractors, evidence errors and every explanation step, prediction, clinic and summary. Reinspected final shorter prompts and 15-pixel comparison captions. Raw and 600-pixel art inspected; one fictional bridge/fence asset is repeated unchanged. No real place/date or original-event cause invented. Grade 9; reserved survey text stays unexposed; zero independent records. Earlier exhibition wrong/right picture layouts reinspected without new review credit.

Current new lesson: 9 tasks / 27 task-width checks, reload and zero independent records. Core scope: Full serial core: 1503 tests in 14 files pass. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete fact-check flow, existing exhibition compatibility flow, both native adapters, seventeen offline checks and exact-source archives pass. Actual comparison cards retain the same image source, fit their labels, use 15-pixel captions and meet touch sizes at 320/390/768. Native adapter scope: Development/cloud simulations passed: all 245 hashes, registered resolved artwork and illustration readiness/failure/retry. Native status succeeds but shared project-file access fails; no native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 17 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 811 tasks / 2433 widths; earlier flows retain scope. Hashes: checkpoint-81.*.
Next: l-r-course-t24. Author paper-bridge engineering tasks that let students identify changed conditions, distinguish a fair fold-only comparison from changing paper/gap/test objects together, retain teacher safety checks, limit conclusions to two tested designs, repeat comparisons, preserve failed attempts and distinguish appearance from performance. Use exact code models for experimental conditions; an illustration must serve a specific teaching task if added. Fresh transfer should change the model and reject partly correct claims. Original source read; no next-lesson implementation or art installed. Overall claim continues solo; 332 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t24 individually reviewed

82/413 reviewed. Ten original engineering tasks compare five exact paper/gap/object/fold records, identify every changed condition, distinguish fair fold comparisons, retain supervised safety checks, limit the first comparison to its two designs, repeat later comparisons and preserve failed attempts and performance records. A new opt-in fields selector uses full-width code cards and verifies both selected fields and the conclusion. Fresh three-version tower transfer isolates height by comparing A with C while retaining failed attempts and limiting the finding. Source and application prompts are tailored.

Inspected all ten models and wrong expressions, all five condition-selection records with extra/missing choices, partial reload, wrong conclusions, removal and repair, every 320-pixel model, all three selector widths, complete source/passage endings, every application/transfer distractor and explanation step, prediction, clinic and summary. Reinspected final first-comparison scope, meaningful sentence suffixes, all three fresh tower versions, exact A/B/C diagram and both partly correct transfer plans. Conditions and arrows are exact code models; no unsupported loads, dimensions or performance curves. Grade 9; reserved invention text stays unexposed; zero independent records. Existing privacy mask wrong/correct/edited states reinspected without new review credit.

Current new lesson: 10 tasks / 30 task-width checks, reload and zero independent records. Core scope: Full serial core: 1505 tests in 14 files pass after the final three-version transfer correction. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete engineering browser flow, privacy compatibility flow, both native adapters, eighteen offline checks and exact-source archives pass. All five condition selectors have readable full-width controls without misleading quantity bars at 320/390/768. Native adapter scope: Development/cloud simulations passed: all 245 hashes, registered resolved artwork and illustration readiness/failure/retry. Native status succeeds but shared project-file access fails; no native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 18 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 821 tasks / 2463 widths; earlier flows retain scope. Hashes: checkpoint-82.*.
Next: l-r-course-t25. Plan, not implementation/review credit: l-r-course-t25.
Primary text is the fictional valley walking guide. Reserve text2 (visitor centre / wooden platform / old stone bridge) must stay unexposed.
- Purposeful original art: two fictional views, flat river path and stepped woodland path, neutral A/B labels. Match picture plus literal route evidence; pictures do not prove current opening or universal suitability.
- Retain printed/current-information distinction, steps not suitable for everyone, barrier at viewpoints, plants/stones left in place, water/litter responsibilities, sketch order versus scale.
- Consider a separately labelled original practice route Gate → Meadow → Lookout, avoiding reserve places. Literal order cards and route times, e.g. 18+12=30 minutes excluding stops, supplied in code notes rather than measured from art. Never present these as times or places stated by the original guide.
- Fresh changed garden/coastal situation should test current closure, suitability and/or a new time sum, with partly correct distractors. No real travel advice or route guarantee implied. Overall claim continues solo; 331 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t25 individually reviewed

83/413 reviewed. Ten original walking-guide tasks match opposite river/woodland pictures, retain conditional closure and individual suitability, prefer current information, respect barriers and natural features, distinguish sketch order from scale, order a separately labelled practice route and enter its 18+12-minute walking time. Fresh garden transfer changes the traveller, route conditions and times (16+9), with partly correct plans. All four primary application evidence reasons are tailored. Original art has no instructional labels; neutral choices stay in code.

Inspected all ten models, both wrong pictures and every wrong source, partial evidence/reason removal/reload/repair, swapped/decoy/removed route steps, empty/wrong/removed time entries, every 320-pixel source/picture/order model, complete source and passage endings, all application/transfer distractors and explanation steps, prediction, clinic and summary. Reinspected final three-part nature prompt, tailored application reasons and native Chinese fresh explanation. Raw 1536x1024 and 600x400 art inspected; clear flat river path and woodland steps, no present-access or distance guarantee. Grades 8–9; reserved second text stays unexposed; zero independent records.

Current new lesson: 10 tasks / 30 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 82 full serial core: 1505 tests in 14 files; shared engine and UI unchanged. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete walking-guide browser flow, both native adapters, eighteen offline checks and exact-source archives pass. Native adapter scope: Development/cloud simulations passed: all 245 hashes, registered resolved artwork and illustration readiness/failure/retry. Native status succeeds but shared project-file access fails; no native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 18 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 831 tasks / 2493 widths; earlier flows retain scope. Hashes: checkpoint-83.*.
Next: l-r-course-t26. Author wildlife-observation tasks that separate visible features from guessed species or identity, retain uncertainty, keep marked paths/viewing areas and low voices, reject feeding and approaching nests or leaving the path for a clearer photograph. Consider an original two-bird illustration with exact code-controlled observation/guess captions; do not invent species or measured distances. Fresh transfer must change the animals and context, with partly correct distractors. Primary source read; reserved community-advice text remains unexposed. Overall claim continues solo; 330 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t26 individually reviewed

84/413 reviewed. Ten original wildlife tasks distinguish visible features from unsupported yesterday-identity claims using opposite captions over the same original two-bird image, retain marked viewing areas and low voices, reject feeding and leaving the path for a clearer photograph, record time/weather/visible features and preserve uncertainty. Fresh butterfly transfer tests truthful recording and undisturbing actions with partly correct plans. All four primary application reasons are tailored. A browser-discovered two-word identity clue is replaced with its complete source sentence; validation now rejects any reading/listening application with no usable source evidence, backed by a regression test.

Inspected all ten models, both wrong caption cards, every wrong source and four partial evidence chains with reload/missing/removed reasoning and repair, every 320-pixel source/caption model, complete source and passage endings, all application/transfer distractors and explanation steps, prediction, clinic and summary. Reinspected the repaired identity evidence selector and final shorter title. Original PNG and 600x400 art inspected: exactly two small brown birds, no species labels or earlier records; both context cards use identical art. Grades 8–9; reserved community-advice text stays unexposed; zero independent records. Three isolated 320-pixel real-wheel checks reached the passage ending; the browser driver now waits two paint frames after resize before real wheel input, without programmatic scrolling.

Current new lesson: 10 tasks / 30 task-width checks, reload and zero independent records. Core scope: Full serial core: 1506 tests in 14 files pass after the application-evidence validation fix; the subsequent edit only shortens the lesson title. Final compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete wildlife browser flow, both native adapters, eighteen offline checks and exact-source archives pass. Repeated-image captions use readable 15-pixel text and checked touch/containment geometry at 320/390/768. Native adapter scope: Development/cloud simulations passed: all 245 hashes, registered resolved artwork and illustration readiness/failure/retry. Native status succeeds but shared project-file access fails; no native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 18 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 841 tasks / 2523 widths; earlier flows retain scope. Hashes: checkpoint-84.*.
Next: l-r-course-t27. Plan only: l-r-course-t27. Primary report counts visible litter on the same short path on three afternoons; no exact category totals are supplied. Reserve refill-plan text (30/18/12 cup figures) stays unexposed.
Potential tasks: finite scope and visible-only safe recording; wind/paper pattern versus who dropped it; possible open-container cause versus established cause; refuse proximity-based blame; covered bin plus clearer collection routine; observe same site after small change; causal relevance plus rechecking rather than town-wide claims. A fictional open/covered-bin illustration can support opposite proposed-change matching, with exact code captions; it must not masquerade as documentary evidence. No AI counts or distances. Fresh changed classroom litter scenario should retain safe handling, possible causes and limited follow-up findings, with partly correct distractors. No implementation or art yet. Overall claim continues solo; 329 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t27 individually reviewed

85/413 reviewed. Ten original litter-report tasks retain finite place/time/safety scope, separate windy-day patterns from responsibility, match opposite open/covered-container designs to a possible source and proposed trial, reject proximity blame, distinguish proposed actions from reported results, order three observation/proposal/follow-up stages and check the same site. Fresh corridor transfer changes the context and preserves unknown responsibility, specific cause and wider outcomes. Original design art is explicitly not measured before/after evidence; no category totals or distances are invented. All four primary application reasons and complete evidence quotes are tailored.

Inspected all ten models, both wrong pictures, every wrong source, six partial evidence chains with missing/removed reasoning and reload/repair, three-stage decoy/swapped/partial/removed ordering and repair, every 320-pixel source/picture/order model, complete source and passage endings, all application/transfer distractors and explanation steps, prediction, clinic and summary. Reinspected time-scope wording and the label for planned follow-up. Original PNG and 600x400 art inspected: open and covered blue bins are design alternatives, not evaluated results. Grade 9; reserved refill-plan text stays unexposed; zero independent records. Read-only Mac recheck confirms DevTools installed but project-drive access unavailable; no GUI job launched.

Current new lesson: 10 tasks / 30 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 84 full serial core: 1506 tests in 14 files; shared engine and UI unchanged. Final compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete litter-report browser flow, both native adapters, eighteen offline checks and exact-source archives pass. Native adapter scope: Development/cloud simulations passed: all 245 hashes, registered resolved artwork and illustration readiness/failure/retry. Native status succeeds but shared project-file access fails; no native GUI evidence. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 18 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 851 tasks / 2553 widths; earlier flows retain scope. Hashes: checkpoint-85.*.
Next: l-r-course-t28. Plan only: l-r-course-t28 primary is the SCHOOL PRACTICE SESSION notice, not the reserved heavy-rain checklist. Preserve planned exercise versus live warning; before/during/after sequence; current school plan, agreed signal and meeting point are to be explained, not supplied by this source. Do not invent route maps, signals, meeting points or actual emergency guidance. Interactive code models can sort stated instructions into phases, order source steps, distinguish bag/video interruptions and retain staff supervision when separated. The post-exercise discussion checks clarity, not running speed. Fresh drill context should change participants and difficulty, test asking staff rather than inventing a meeting point, and retain actual emergencies needing current local guidance. If artwork is added it must serve a particular stated task without implying a usable evacuation map. Source read; no production implementation or art. Overall claim continues solo; 328 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t28 individually reviewed

86/413 reviewed. Ten original practice-notice tasks distinguish a planned exercise from a live warning, recover three preparation details, place literal instructions in named Before/During/After slots, reject bag/video interruptions, retain staff supervision, review clarity, preserve unknown actual signals/meeting points and use current local guidance for actual emergencies. Fresh new-student transfer changes the context with partly correct distractors. All four primary application reasons and complete quotes are tailored. Exact code diagrams serve the sequence without inventing a route map or emergency signal.

Inspected all ten models, every wrong source and partial evidence/reason state, all three empty stage slots, decoy/swapped/partial/removed order and repair, all 320-pixel models, source/passage endings, application/transfer distractors and explanation steps, prediction, clinic and summary. Reinspected final full-width stage text, single-line stage headings, wrong/correct/removal states at 390 and 320 pixels and final task labels. All actual control widths checked at 320/390/768. Existing litter ordering visually inspected without new individual credit. Grades 8–9; reserved heavy-rain text stays unexposed; zero independent records. Fourteen unchanged compiled modules moved between compiler groups and are byte-identical. Content remains draft.

Current new lesson: 10 tasks / 30 task-width checks, reload and zero independent records. Core scope: Full serial core: 1508 tests in 14 files after named-stage ordering and its real wrong/partial/reload/removal/reason regressions. Final compiler/typecheck, 826 teaching/spelling variants, grammar/course/interactions/package, complete practice-notice browser flow, both native adapters, nineteen offline checks and exact-source archives pass. Prior litter three-stage order compatibility also passes; its layout is unchanged by the opt-in named slots. Native adapter scope: Development/cloud simulations passed; these do not establish a native GUI pass. Last read-only Mac status finds DevTools installed but project-file access unavailable; no GUI started. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 19 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 861 tasks / 2583 widths; earlier flows retain scope. Hashes: checkpoint-86.*.
Next: l-r-course-t29. Plan only: l-r-course-t29 primary is LOOKING AT THE MOON CAREFULLY. Journal records time, visible shape and cloudy obstruction; no exact observing dates, phase durations, fractions, sizes or distances are provided. Preserve not-visible versus nonexistent, reflected sunlight versus self-produced visible light, appearance versus removed/replaced pieces, drawing as observation versus model as explanation, labelled not-to-scale limitations and incomplete lamp/ball model. If using AI art, keep any exact phase/light geometry and labels in code and do not invent astronomical dates or measurements. A clear/clouded-view interaction could support opposite claims without suggesting the Moon disappears. Reserved second text stays unexposed. Primary source read; no production implementation or art. Overall claim continues solo; 327 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-r-course-t29 individually reviewed

87/413 reviewed. Ten individual lunar-journal tasks match opposite clear/cloud-blocked pictures, retain time/visible-shape/cloud notes, distinguish reflected sunlight from self-produced light and appearance from removed pieces, contrast observation drawings with explanatory models, retain labels/not-to-scale warnings and model incompleteness, and reject invented real distances. Fresh changed journal transfer preserves cloudy entries and separates observation, explanation and model limits with partly correct distractors. All four primary application evidence reasons and complete source quotes are tailored.

Inspected all ten models, both wrong pictures and every wrong source; four two-clue chains with partial reload, wrong-choice preservation, missing/removed reasoning and repair; every 320-pixel model; full source/passage endings; every application/transfer distractor and explanation step; prediction, clinic and summary. Original 1536x1024 PNG and 600x400 JPEG inspected: left crescent visible, right cloud blocks the view. Pictures are fictional visibility comparisons, not measured successive phases or evidence for dates or light sources. All controls checked at 320/390/768. Grade 9; reserved fictional-mission text stays unexposed; zero independent records. Content remains draft.

Current new lesson: 10 tasks / 30 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 86 full serial core: 1508 tests in 14 files; shared engine and UI unchanged. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, full Moon browser flow, both native adapters, nineteen offline checks and exact-source archives pass. Native adapter scope: Development/cloud simulations pass, including all registered illustration paths and readiness/failure/retry. Read-only Mac check 86 still finds project-file access unavailable; no native GUI run. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 19 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 871 tasks / 2613 widths; earlier flows retain scope. Hashes: checkpoint-87.*.
Next: l-r-cloze. Plan only: l-r-cloze. Primary original shared-garden passage has six gaps: garden, but, dark, everything, value, instead of. Preserve primary passage facts (including modest harvest) and leave reserved question-box text unexposed. Replace the broad source-card baseline with a contextual gap-building task: actual attempted words should appear in their sentence, with clue fragments on both sides, every wrong option explained and a full-story recheck. Use original art only for a task-specific literal comparison; any text/gap/labels and exact claims stay in code. Fresh transfer must change the context and require forward/backward checking rather than repeat the garden answer pattern. Canonical source read; no production implementation or art yet. Overall claim continues solo; 326 pending.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 · synchronization blocker after checkpoint 87

Moon review is saved in local commit d495fb1. Push and fetch fail with missing HTTPS credentials;
read-only gh auth status reports the existing GH_TOKEN invalid. No credentials changed. Last
confirmed pushed checkpoint is 86 f7e5342. Existing APP-VISUAL-LESSONS main claim remains held;
continue l-r-cloze locally and keep the MCP records current. Reconcile pending commits once
existing GitHub access is repaired.


## 2026-10-18 (Sydney) · codex-solo · l-r-cloze individually reviewed

88/413 reviewed. Six contextual word-placement tasks and one whole-story inference check replace the broad cloze baseline. Every attempted candidate appears in the actual sentence, with specific feedback; completion requires a checked correct word, both quoted context clues and saved original reasoning. Editing or clearing invalidates completion without losing clues. Fresh reading-corner transfer changes both lighting and connector relations, requiring bright/so instead of copying dark/but. All six primary question explanations now quote literal surrounding sentences; the hardcoded cloze clue lookup is removed. The reserved question-box text stays unexposed.

Inspected all seven models, all twelve wrong-word choices, correct-word-without-clues states, word editing/clearing/reload and repair, every wrong source, seven partial clue chains and missing/removed reasoning, every 320-pixel model, full source/passage endings, all application/transfer distractors and explanation steps, prediction, clinic and summary. Final application evidence and all three polished wrong reasons reinspected. A visible inline-style collision was fixed by isolating the cloze block; final layout is neutral and readable, sentence text is 18 pixels, and every control/containment check passes at 320/390/768. The exact code sentence is the instructional visual, so decorative art was not added. Grades 7–9; zero independent records. Content remains draft.

Current new lesson: 7 tasks / 21 task-width checks, reload and zero independent records. Core scope: Full serial core: 1511 tests in 14 files after contextual-gap state, literal cloze evidence and stale-completion regressions. Three later edits only polish wrong-word feedback. Final compiler/typecheck, 826 teaching/spelling variants, grammar/course/interactions/package, complete cloze browser flow, both native adapters, twenty offline checks and exact-source archives pass. Initial Moon compatibility flow covers ten tasks/thirty widths; final refinements are confined to opt-in cloze UI and explicit cloze evidence. Native adapter scope: Development/cloud simulations pass, including all registered illustration paths and load readiness/failure/retry. Read-only Mac check 88 finds DevTools installed but shared project-file access unavailable; no GUI job started. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 20 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 878 tasks / 2634 widths; earlier flows retain scope. Hashes: checkpoint-88.*.
Next: l-ls-details. Plan only: l-ls-details. Use only the four exposed scripts library-time, poster-place, bring-bottle and bus-number. Club-day and return-book are delayed and stay unexposed. This is transcript preparation while approved audio remains pending; do not claim hearing discrimination, make audio marks or add unapproved TTS. Distinguish initial 3:00 proposal from proposed/accepted 4:30, library door location, initial classroom versus confirmed art room, lunch supplied versus own water bottle, prior bus 12 versus current 21 and never invent bus 20. Consider exact labelled proposal/change/confirmation order and actionable final-detail notes. If a generated illustration is useful, use it for a literal two-place/object contrast with exact code labels; it cannot establish dialogue facts, dates or timetables. Fresh transcript task must change speakers, proposal, final agreement and question focus. Four primary scripts and existing eligibility split read; no new production lesson or art yet. Overall claim continues solo; 325 pending.
GitHub sync is blocked: the existing GH_TOKEN is invalid according to read-only gh auth status. Moon commit d495fb1 and this checkpoint remain local; f7e5342 is the last confirmed push. No credentials changed. Continue the already-locked parent claim locally and reconcile pending commits when existing GitHub access is repaired. Obsidian/Kanban remain available.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 · synchronization recovered

GitHub synchronization recovered on retry without credential changes: Moon commit d495fb1 and cloze checkpoint d2cbf65 are now pushed, and origin/main is fetched. Earlier authentication failures are retained in the log as history. Native GUI project-drive access remains blocked.
Continue l-ls-details under the same parent claim; no content or credentials changed during recovery.


## 2026-10-18 (Sydney) · codex-solo · l-ls-details individually reviewed

89/413 reviewed. Ten individual transcript-preparation tasks cover all four exposed scripts. Three live response sentences distinguish final 4:30, the art room and current bus 21 from earlier or truncated alternatives. Named proposal/change/acceptance slots organise the real dialogue. Other tasks retain library-door location, classroom-cleaning reason, opposite self-brought bottle/school-provided lunch picture matches, fill-before-departure scope and old-route pronoun reference. Fresh new-speaker transfer changes both time and place and uses partly correct distractors. All four primary application reasons and complete evidence quotes are tailored.

Inspected all ten models, all six wrong time/place/route candidates, correct-without-clues and editing/clearing/reload states, both wrong picture matches, every wrong source, seven partial two-clue chains with missing/removed reasoning and repair, named empty/decoy/swapped/partial/removed ordering and repair, every 320-pixel model, all four source-context endings, application/transfer distractors and explanation steps, prediction, clinic and summary. Reinspected final short title at 320 pixels, concise response sentences/clue labels and the exact sequence-repair hint. All controls checked at 320/390/768. Original 1536x1024 PNG and 600x400 JPEG inspected: bottle left, meal box right. Pictures identify fictional object types, not supply responsibility or actual fill time. Grades 6–9; reserved club-day/return-book scripts stay unexposed. Text preparation is explicit, approved audio remains pending, and guided/independent/listening/mastery records remain separate with zero independent records. Content remains draft.

Current new lesson: 10 tasks / 30 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 88 full serial core: 1511 tests in 14 files; shared engine and UI unchanged. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete listening-details preparation browser flow, both native adapters, twenty offline checks and exact-source archives pass. Native adapter scope: Development/cloud simulations pass, including registered image paths and readiness/failure/retry. Read-only Mac check 88 confirms DevTools installed but shared project-file access unavailable; no native GUI job or device pass. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 20 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 888 tasks / 2664 widths; earlier flows retain scope. Hashes: checkpoint-89.*.
Next: l-ls-purpose. Plan only: l-ls-purpose. Read its four exposed scripts: quiet-request, missed-meeting, try-again and better-route. Reserved check-note and sharing-work scripts stay unexposed. Keep transcript-preparation/audio-pending boundaries; no hearing or listening-score claim. Teach the polite low-noise request versus talk background, Ben as the absent participant asking what he missed, encouragement through examining failure and changing one part rather than giving up or rebuilding everything, and the shorter river path versus a possibly safer village road after rain. Preserve may be slippery and today rather than guarantee route safety. Consider purposeful fictional route art for literal initial/proposed route matches and exact code captions, not current real travel guidance. Fresh context must change request, roles or constraints and include partly correct distractors. Four exposed scripts read; no production authoring or art yet. Overall claim continues solo; 324 pending.
Previous checkpoints 87/88 and the synchronization-recovery note are pushed. GitHub access recovered without credential changes; continue fetching and pushing the existing parent branch. Native GUI project-drive access remains blocked.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-ls-purpose individually reviewed

90/413 reviewed. Ten individual transcript-preparation tasks cover all four exposed scripts. Two live intention sentences separate the low-noise request from talk background and teacher encouragement from the pupil's quitting thought. Other tasks connect planned apology/adjustment, Ben's absence and information request, incremental improvement rather than a complete restart, opposite river/village picture matches and a three-clue current-plan chain. Rain concerns remain conditional and limited to today. A fresh display-design transcript uses partly correct intention/action distractors. All four primary application evidence quotes and reasons are tailored.

Inspected all ten correct models, all four wrong intention candidates, both wrong picture choices, every wrong source, partial two-clue and three-clue chains, missing reasoning, reload and repair, both live sentences without clues and after editing/clearing, every 320-pixel model, full source endings, both application distractors and all explanation steps, fresh transfer distractors and all steps, prediction, clinic and summary. Controls pass at 320/390/768. Original 1536x1024 PNG and 600x400 JPEG inspected: riverside path left, village road right. Fictional illustrations identify route types; distance, rain concerns, acceptance and uncertainty come from dialogue, with no real-route safety guarantee. Grades 8–9; reserved check-note/sharing-work scripts stay unexposed. Transcript preparation is explicit; approved audio is pending, with zero independent/listening/mastery records. Content remains draft.

Current new lesson: 10 tasks / 30 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 88 full serial core: 1511 tests in 14 files; shared engine and UI unchanged. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete speaker-intent preparation browser flow, both native adapters, twenty offline checks and exact-source archives pass. Native adapter scope: Development/cloud simulations pass. Read-only Mac check 90 confirms DevTools installed but project-file access unavailable; no native GUI job or device pass. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 20 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 898 tasks / 2694 widths; earlier flows retain scope. Hashes: checkpoint-90.*.
Next: l-ls-course-t01. Plan only: l-ls-course-t01. The four exposed questions use two dialogues: Mina/Leo homework (initial five, proposed/accepted half past five, forty minutes then break, Leo walks dog at the initial time and brings maths book) and Sam/Nina phone/reading (phone in another room, a twenty-minute trial tonight, messages afterwards, start small and see how it goes). The third transcript/questions are delayed and stay unexposed. Grades 7–9; approved audio pending, transcript preparation only. Build distinct live arrangements, exact duration checks and work/break or reading/messages sequence; never conflate the two durations or invent successful long-term habit change from a plan. Exact code room/object or time models can explain the language; art is optional and must serve a literal location/action task. Fresh transfer must change both times/durations or the proposed routine, with partly correct distractors. Primary exposed transcripts and eligibility split read; no production authoring or art yet. Overall claim continues solo; 323 pending.
Checkpoint 89 is pushed; origin/main fetched before this checkpoint. Continue the same solo parent claim. Native project-file access remains blocked.
Native GUI remains blocked by project access; no release, upload or complete-course parity.


## 2026-10-18 (Sydney) · codex-solo · l-ls-course-t01 individually reviewed

91/413 reviewed. Ten individually authored daily-routine transcript-preparation tasks separate accepted 5:30 from initial 5:00, forty-minute homework from Sam's twenty-minute trial, Leo's book, work/break and reading/messages order, and planned rather than verified habit change. A live time sentence, three named ordering boards, two numeric duration checks and opposite same-desk/another-room phone pictures require actual learner input. Fresh science-revision transfer changes both start times, duration and phone location with partly correct distractors. All four primary evidence quotes and reasons are tailored.

Inspected all ten correct models, both wrong time candidates and live sentence without clues or after editing/clearing, all wrong source and picture choices, four partial two-clue chains, missing reasoning and repair, three ordering boards with decoy/swapped/partial/removed states, both numeric checks empty/wrong/removed/correct at narrow width, all ten 320-pixel models, both source-context endings, both application distractors and all steps, fresh transfer distractors and all steps, prediction, clinic and summary. All controls pass at 320/390/768, with reload and zero independent/listening/mastery records. First generated picture rejected because the hall phone was too small; final 1536x1024 PNG and 600x400 JPEG inspected and phone locations remain clear at 320 pixels. Pictures illustrate possible arrangements, not compliance or measured concentration. Grades 7–9; reserved third transcript/questions stay unexposed. Approved audio pending; content remains draft.

Current new lesson: 10 tasks / 30 task-width checks, reload and zero independent records. Core scope: Inherited checkpoint 88 full serial core: 1511 tests in 14 files; shared engine and UI unchanged. Current compiler/typecheck, 826 teaching/spelling variants, nine grammar constraints, course/interactions/package, complete daily-routine preparation browser flow, both native adapters, twenty offline checks and exact-source archives pass. Native adapter scope: Development/cloud simulations pass. Inherited read-only Mac check 90 confirms DevTools installed but project-file access unavailable; no native GUI job or device pass. Current typecheck, 826 teaching/spelling variants, grammar/course/interaction/package checks, 20 offline checks and ZIP CRC/exact-source comparisons pass.

Cumulative 908 tasks / 2724 widths; earlier flows retain scope. Hashes: checkpoint-91.*.
Next: l-ls-course-t02. Plan only: l-ls-course-t02, grades7–9. Four exposed questions use two transcripts. Gardening club: today hall because rain; tools stay shed; bring notebooks to plan next week; current start four rather than old poster half past four. Stairs: wet floor requires walking even when bell about to ring; teacher agrees Ben should tell office while teacher stays to remind others. Do not swap who reports/stands, call running acceptable to avoid lateness, or infer Ben cleans stairs. Reserved third transcript/questions remain unexposed. Keep text preparation/audio-pending boundary and zero hearing/independent credit. Consider exact current/old time live sentence, hall/shed/notebook role contrasts and pupil/teacher responsibility matching; fresh scenario must change both setting/values/roles and include partly correct distractors. No production authoring yet. Overall claim continues solo; 322 pending.
Checkpoint 90 pushed at 2c4d9ae. Continue the existing solo parent claim; native project-file access remains blocked.
Native GUI remains blocked by project access; no release, upload or complete-course parity.
