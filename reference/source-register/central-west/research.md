# R-CW research handoff — 2026-10-15

This is an incomplete, evidence-preserving first research pass. It does not satisfy the
Stage1 gate: many city/year/resource cells remain `not_searched`, and none of the commercial
paper previews is promoted to an authenticated original or commercially reusable content.

## Sources and scope

The register holds105 source records and75 retained artifacts: six official-hosted policy
or timetable documents and69 public preview HTML pages. Exact retrieval failures are separate
from `not_found`. `preview-index.json` records grade, semester, calendar-year uncertainty,
resource kind, and whether actual transcript/rubric text was visible in the main preview.
Related-resource links are excluded from those observations.

- **Yinchuan2026:** the education-bureau annual reminder gives English onJune29,
  15:00–16:40 (100minutes). It does not give marks or speaking task types.
- **Ningxia regional table:** the one-page attachment lists English120 in its current,
  2024–2025 and2026-onward columns. The host is Zhongwei's government website. Its parent
  promulgation and any city-specific exceptions remain unverified; it does not independently
  establish an annual Yinchuan written/oral split.
- **Yinchuan reform:** the government-hosted newspaper report describes a change from
  100written+20listening/speaking to90+30, within120. It announces2027/2028 milestones but
  uses cohort wording that needs the actual implementation scheme. Do not apply the new split
  to2026 or silently derive a first affected graduation year.
- **Urumqi2026:** the local official-hosted reminder gives an English entry cutoff of
  June24 at10:15. The embedded image was opened and is traffic guidance, not an exam timetable.
  No English duration or marks are inferred from it.
- **Xinjiang context:** the registration notice and Kezhou admissions FAQ were opened. Kezhou's
  English150-mark rule is not transferred to Urumqi. These regional/context records have no
  priority-city assignment where the source does not establish it.

Official policy or schedule candidates for Chongqing, Chengdu, Xi'an, Lanzhou, Xining,
Guiyang, Tibet/Lhasa and Yunnan failed individually; see `access-attempts.json`. A failed
endpoint does not establish that the document or resource does not exist. The Chengdu
shared teaching-schedule PDF also remains inaccessible through the inspected endpoint.

## Public paper, school-test and writing evidence

The opened previews include2022–2026 school and district tests in Chongqing, Chengdu, Wuhan,
Zhengzhou, Luoyang, Xi'an, Yinchuan, Urumqi, Kunming and Guiyang, plus other attempted leads.
Chongqing2026 reported common-paper previews expose actual paper headings, answer text and a
writing rubric. Their header says150marks/120minutes; those remain reported mirror facts.
No whole official paper, answer original or audio file was acquired in this unit.

`writing-rubric-notes.json` distinguishes the reported Chongqing entrance rubric from local
Guiyang grade7, Zhengzhou grade8 and Luoyang grade8 scoring material. The Luoyang preview
refers to a band table without displaying its full contents, so no missing bands are invented.
Two publisher unit-test previews include actual labelled listening dialogue text, but their
matching lesson titles are numbered Unit10 and Unit11. They do not verify a textbook sequence
or city adoption. Other MP3 filenames are advertisements, not downloaded audio.

Publisher regional practice stays separate from real school/district examinations. Midterms
are not misclassified as entrance papers just because `期中考试` contains `中考`. Upper-term
academic-year ranges are kept unresolved without a reliable exam month/date; upload dates
are not exam dates. A listing typo2026–2026 is corrected only in the research interpretation
where the visible header explicitly says2025–2026, with both versions retained.

One Ankang lead was excluded because `陕西安康` contains the city-name substring `西安`
across an administrative-name boundary. That is a discovery-filter false positive, not a
changed resource identity. No Ankang fact or coverage is assigned to Xi'an.

## Discovery, rights and next actions

The current English roster's56city set matches the sister maths roster. Historical stream
labels are not used to override this project's explicitly assigned13 central/west cities.
Inherited maths sources were discovery candidates only; no maths paper, score or adoption
fact has been copied as an English finding.

All actors shared one public21cnjy sitemap cache and a request-start limiter to avoid
duplicate crawling. Historical index samples locate useful previews but are not exhaustive
city/year searches. Missing cells remain `not_searched`; no absence in sampled windows is
called `not_found`. Source URLs, explicit request errors and retained artifact checksums
allow later verification. Ordinary search responses containing unrelated results were rejected.

Next: obtain accessible official annual English policy and paper sources for each missing
city/year, especially the cities without usable official documents; fill the full grade/term
grid; verify provincial-paper applicability; gather actual listening/speaking specs,
transcripts, vocabulary lists, textbook adoption and teaching schedules. Recheck inaccessible
destinations after a meaningful network/configuration change, rather than repeat unchanged
requests. The revised standard and other units retain their own dependencies and gate.

Every source is reference-only with `commercial_reuse_approved:false`. No login, paywall,
captcha or download challenge was bypassed. Public previews and filenames do not confer a
commercial licence. Validate with
`node scripts/check-register.mjs reference/source-register/central-west`.

## Official-source followup

The remaining inherited Chengdu2023–25all-subject paper articles and Chongqing new-textbook notice were tried at their exact public URLs; they returned CONNECT403or503. These are not verified English papers or proof of city/year resource absence. The Ministry-hosted school course attachment succeeded (125pages,2,999,985bytes). Its35selected central/west English rows have visually checked edition, grade/term and school cells. `school-course-hints.json` preserves these witnesses, with partial chapter excerpts and PDF row locations. The2022award-cycle label remains inherited discovery context: no cycle/cohort appears on the opened table cover, so no annual adoption cell is upgraded. A course-list entry is not an acquired teacher guide/video or current citywide adoption. Ambiguous province-only and multi-city school names do not assign the capital.

The historical maths stream assignments differ from English: cross-stream discovery recovered actual Henan/Luoyang/Zhengzhou policy candidates. Three official2026pages and two embedded timetable images opened. Luoyang and Zhengzhou urban participation in the provincial English paper is explicit; each has120marks (100nonlistening+20listening) and aJune23 15:00–16:40sitting. The provincial explanation retains2011curriculum standards for English2026while reflecting2022concepts; this must not be replaced by a blanket2022/2025exam basis. Four coarse coverage cells are upgraded with clear limits: syllabus evidence is a curriculum basis, not an acquired full syllabus or word list. Hubei's exact policy PDF returned412and was not bypassed; no unsupported Wuhan rule was inferred.
