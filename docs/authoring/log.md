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

## 2026-10-15 · codex research coordinator · further research handoffs
- Did: pushed curriculum followup `ac16203`, R-WRITE `efb65fc`, R-AUX `7b1138c`, R-RIGHTS `6734785`, regional followups R-NORTH `060fa97`, R-EAST `96ca2a0`, R-SOUTH `d69861f`, and R-BANK `95026a7`. Their register, scope, artifact-hash and LFS checks pass. All units remain incomplete with their explicit gaps; no partial unit is merged as done.
- Decided: preserve cohort-specific evidence. Tianjin changes listening/written delivery in 2025; Qingdao annual policies retain their actual dates; Guangzhou has a 100-minute written sitting; Changsha oral grading is separate from English admission marks. Hainan's 2023–26 written-question/answer nonpublication is a statement about the official release route, not universal absence. Shanghai's four qualitative analyses are available, without invented score statistics or rubrics.
- Next: finish publisher followups and the baseline word-form audit. Three existing agent slots are reused; no fourth agent is created. North will audit curriculum pages read-only into temporary files while the coordinator retains R-STD ownership and source numbering. East's read-only BNU/Shanghai catalogue discovery is packaged for coordinator registration under R-ED-B. This is coordination within existing units, not a dependency waiver.
- Open questions: many city/year and grade/term cells remain genuinely unsearched; current full books, original city papers/media, local scoring details, lexical audits and terms still need work. The network draft is saved with exact discovered domains but is unpublished and has not changed runtime policy. No contacts, licences, protected-platform access or app ingestion occurred.

## 2026-10-15 · codex research coordinator · publisher and central/west followups
- Did: pushed R-CW `4df6bc3` (124 sources/106 artifacts), R-ED-B `c7d14a6` (64 sources/78 artifacts) and R-AUX `0897b15` (41 sources/31 artifacts). Register validation, source references, byte/hash checks and relevant LFS checks pass. The editions checker used temporary standard filenames because the shared checker does not read b-prefixed files; no shared script was changed.
- Decided: annual Zhengzhou originals support2023–2025English marks/minutes; Luoyang2024has only partial structure/basis evidence and2025detailed schedule is attributed newspaper reporting. BNU new-series student/teacher navigation is useful metadata, not acquired current books or ISBN proof. Shanghai's live data request failed; Shandong's tested audio route requires membership and trial reader rendered no pages. Do not convert these failures or catalogue listings into acquired material.
- Coordination: board-only ownership handoff `43112c0` transferred R-LS from codex-listening to codex-listening-east, preserving the existing branch. East is reusing its cached Shanghai official documents; North is visually auditing the2022vocabulary appendices read-only. The coordinator retains R-STD and R-ED-B source numbering and tracked edits. Three existing agents are reused.
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
- Did: pushed `research/R-STD` (`b48d267`), rebased on current main and squash-merged the completed unit with its board status. It contains15source records and33retained artifacts. The actual English2025revised PDF was discovered through the Qingpu school curriculum index, literal English article and literal attachment; the earlier mathematics candidate is excluded. The revised197-page PDF is82,942,124bytes, SHA-256 `a08998470dd3c81bce1d05d3be34d0a5421cd10822c0f8917839bc92d0b1e4c9`. School article date18March2026is separate from the unknown Ministry issue date.
- Audited: all197revised pages, figures and tables were viewed across two delegates/coordinator. Full main-word reconciliation confirms505level-two/1600combined/505matchingstars/1095additional entries. Separate baseline and revised221-record supplements preserve blanks/dashes. Revised changes include Tomb-Sweepingcapitalization and bear’s printed participle borne, plus two preface edits. No source-count or image-hash shortcut establishes lexical identity.
- Mapped: baseline55competency/culture/strategy records and all8teaching cases are complete; separate2025datasets apply currentsource/pageprovenance, cultural-age/overview overrides, revised case1/2projects and body/evaluation guards. All29themes,58grammar entries and17numbered quality indicators retain supported research paraphrases. The complete visual body comparison is not an exhaustive verbatim redline. Original passages/artwork are not app content; all reuse approvals stayfalse.
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
