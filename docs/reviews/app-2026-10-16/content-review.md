# Original app content review

Read-only snapshot: `/tmp/english-research-docs`, commit `ebc5ca1aea8ac4c1dfa2d40ac91568eae24e0c2e` (`origin/platform/app-delivery`). The app claim remains with codex-app. No tracked files, IDs, claims, branches or generated content were changed. No agents were spawned.

## Scope and evidence

Read AGENTS.md and docs/content-authoring.md; inspected every authored grammar case, the 96-word vocabulary source, reading/cloze/restoration/short-answer passages and answers, 12 listening scripts, and 14 expression tasks. Reviewed compiler-generated explanation/visual data and the native explanation renderer for semantic truth; this is not a rendered-pixel, real-device, audio-listening or editorial-release approval. No reference material was copied or used as app content.

The actual generated collection contains 368 questions. `/tmp/english-app-content-probe.mjs` loads their existing `dist/packs` JSON and invokes the app's own `checkAnswer` from `src/core/answers.ts`; it does not run any generator. `/tmp/english-app-content-probe.json` records exact prompts, accepted keys, attempts and results. All 13 listed grammatical alternatives returned **false**. Probe execution completed successfully after a transient worker delay.

Reproduce from this same unchanged checkout:

```sh
node /tmp/english-app-content-probe.mjs
```

## Finding 1 — high priority: free-response conversion removes constraints needed for a unique answer

`scripts/lib/author-content.mjs:23` assigns question kind by index; line 28 replaces the target with a blank without adding an authored verb/meaning/word-bank cue; line 29 accepts only the original multiple-choice key. `src/core/answers.ts:19`–20 then exact-matches that list. The native input in `miniprogram/components/app-shell/index.wxml:19` supplies no missing constraint (only “先写下你的答案”). Topic tense/grammar rules do not disambiguate the alternatives below: the alternatives satisfy those same rules.

| Question ID | Authored source line | Actual generated prompt | Only accepted | Correct rejected answer |
|---|---|---|---|---|
| q-g-present-002 | content/grammar.json:110 | We _____ our bikes after school on Fridays. | ride | wash |
| q-g-past-002 | content/grammar.json:296 | Nina _____ a blue notebook two days ago. | bought | lost |
| q-g-future-002 | content/grammar.json:389 | The school fair _____ next Friday. | will start | will end |
| q-g-perfect-010 | content/grammar.json:538 | Ben _____ his bike, so he can ride it again. | has repaired | has fixed |
| q-g-passive-002 | content/grammar.json:965 | This bridge _____ ten years ago. | was built | was repaired |
| q-g-infinitives-002 | content/grammar.json:1067 | I went to the shop _____ some bread. | to buy | to get |
| q-g-gerunds-002 | content/grammar.json:1118 | Tom finished _____ the model before dinner. | making | painting |
| q-g-object-clauses-006 | content/grammar.json:1248 | Please tell me _____. | how you made this model | where the library is |
| q-g-pronouns-002 | content/grammar.json:761 | This is my ruler. That blue one is _____. | yours | mine |

These are actual incorrect grading outcomes, not a preference between writing styles. In particular, `Please tell me _____.` cannot communicate an unstated model-making question, and the ruler prompt never identifies the other possessor. The bike example does not supply the verb ride. A student cannot recover those constraints from the question without exposing the answer/hint first.

Suggested correction: make suitable task kinds, lexical cues and accepted forms explicit authored fields rather than automatically treating an original multiple-choice key as an exhaustive free-response answer. Supply a base verb/required construction or meaningful word bank where that is the intended exercise; keep unsuitable cases as choice/order tasks. Give the ruler a possessor clue, e.g. “That blue ruler belongs to you. It is _____.” For the full object clause, supply the intended words or a Chinese meaning cue. Audit the remaining generated blanks for this same failure; the nine rows above are confirmed examples, not a claim that every blank is defective.

## Finding 2 — high priority: valid alternatives within the intended construction are excluded

The same unconditional singleton answer list also rejects standard alternatives even when the intended meaning and structure are clear.

| Question ID | Authored source line | Actual prompt | Only accepted | Correct rejected answer | Reason |
|---|---|---|---|---|---|
| q-g-object-clauses-002 | content/grammar.json:1220 | I wonder _____ the museum opens on Mondays. | whether | if | Both introduce this indirect yes/no question after wonder; no surrounding construction requires whether. |
| q-g-relatives-002 | content/grammar.json:1271 | This is the camera _____ I bought last month. | which | that | Both introduce this defining object-relative clause. The published lesson rule explicitly permits which/that at line 1260. |
| q-g-relatives-003 | content/grammar.json:1278 | 改正括号中的表达，只写改正后的部分：I like stories （who） make me think. | that | which | Both are valid defining subject-relative pronouns for stories; the instruction does not require that. |
| q-g-modals-002 | content/grammar.json:1016 | The sign says "No swimming". You _____ swim here. | must not | cannot | Cannot can express this prohibition. The rationale “必须用 must not” incorrectly excludes that usage. |

Suggested correction: author explicit accepted alternatives for free responses (`if/whether`, `which/that`, and prohibition variants such as `must not/mustn't/cannot/can't`), or explicitly constrain the exercise when a particular form is the pedagogical target. Update explanations that imply the alternative is ungrammatical. Do not weaken normalization globally or accept arbitrary near-matches.

Useful regression coverage: verify the intended keys and these legitimate alternatives pass after correction; verify the authored wrong forms still fail. For newly constrained prompts, use the actual new prompt/expected meaning rather than preserving an underdetermined prompt and merely adding a few incidental synonyms.

## Existing checks do not cover these defects

The coordinator independently reran the probe and confirmed all 13 false negatives. The unchanged build/typecheck, 73 automated tests, content audit, static package check, native-adapter simulation and 11 browser journeys pass. Their passing results do not establish semantic uniqueness of a generated free-response answer or complete accepted-answer coverage; these confirmed cases are missing editorial/assessment coverage. No existing suite failure is alleged.

## Other observations and limits

No additional reproducible factual answer error was identified in the reviewed reading, listening-script, cloze or short-answer keys. Passage evidence supports the selected answers. Vocabulary meanings/usage notes and the reviewed native English/Chinese are generally sound for a scaffolded junior-high capability course. The seven writing models fall within their stated approximate word bands under the app's own word-count convention. This does not establish alignment to any exact local exam or textbook unit, which the app correctly leaves unverified.

Source-level sentence/evidence/paragraph visual segments reflect the actual authored decisions; no separate factual diagram error was found. Visual polish/rendering and whether those generic diagrams meet the eventual editorial release standard remain separate review work, not a confirmed content defect here.

Audio approval, actual AppID/CloudBase configuration, real-device evidence, editorial publication decisions and initial launch scope are release/owner requirements rather than the reproducible content defects above. The original question drafts remain draft; this review grants no release approval.

Native Chrisverse/Obsidian/Kanban tools remain unavailable in this worker. External board/memory reconciliation is pending with the coordinator; no external write or competing record was created or claimed.
