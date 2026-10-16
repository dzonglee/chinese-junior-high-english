# Application review · 2026-10-16

The application is **not finished or releasable**. This is an independent, read-only review of
[`platform/app-delivery` at ebc5ca1](https://github.com/dzonglee/chinese-junior-high-english/tree/ebc5ca1aea8ac4c1dfa2d40ac91568eae24e0c2e).
The checkout remained unchanged. The fresh APP-DELIVERY claim stays with codex-app; this review
neither takes it over nor approves content, native behavior or publication.

## Findings requiring correction

| Priority | Finding | Reproduced evidence | Next correction |
| --- | --- | --- | --- |
| High | Generated blanks omit necessary lexical/meaning constraints | Nine valid answers rejected, including `Please tell me _____.` accepting only an unstated model-making clause | Author suitable task kinds and explicit cues; review all generated blanks |
| High | Free responses exclude grammatical equivalents | Four valid answers rejected: `if`, defining-relative alternatives and prohibition `cannot` | Author legitimate alternatives and correct explanations; retain rejection of genuinely wrong forms |
| P2 | Recording can become active after suspension | Deferred start resolves after `suspend()`; zero stop calls and recording state true | Cancel pending starts or stop/save late starts; test the authorization/background interleaving |
| P2 | Material catalog changes preserve editorial approval | Edition spelling/topic grade changes leave the fingerprint and release approval check unchanged | Include material runtime catalog metadata and test invalidation of old approval |

The first two findings have 13 actual `checkAnswer` reproductions against the 368 generated
questions. See [content review](content-review.md) and [answer results](answer-results.json).
The other two were independently reproduced with deterministic local fixtures; see
[runtime review](runtime-review.md) and [runtime results](runtime-results.jsonl). The coordinator
reran all probes. These simulations do not establish real-device microphone behavior.

## Existing checks and actual release state

Locked installation, development build, TypeScript, all 73 existing automated tests, content audit,
24-route static package checks, development/synthetic-cloud native adapters and all 11 Chromium
journeys pass. Approximate package size is 771 KB main / 1,464 KB total. Two representative current
phone screenshots were visually inspected. Browser microphone input is simulated. Existing suites
do not cover the newly reproduced defects, and their success does not make the app complete.

The current editorial review artifact was generated at `dist/review/index.html` in the app checkout.
It is not an editorial decision. `release:check` exits 1 with 77 missing entries:

- The real AppID and CloudBase environment: 2 entries.
- Actual content file mappings: 48 entries.
- Approved audio and audio file mappings: 12 + 12 entries.
- Matching owner editorial approval, DevTools/real-device evidence and platform privacy confirmation:
  3 entries.

`audio:prepare` exits 2 before any request: source, model, voice and owner approval are unselected.
No local release config is present; `AUDIO_API_KEY` is unset. A key is relevant only if the owner
chooses that service; licensed recordings remain a separate permitted route. No source/model,
project identifier, native evidence, approval, cloud upload or public release was invented.
[Validation metadata](validation.json) retains the exact readiness report and current fingerprint.

## Reproduce the snapshot defects

Use Node 24 and a checkout of the reviewed app commit with its locked dependencies installed and
`npm run build` completed. Pass that checkout's path; these probes do not alter it:

```sh
node docs/reviews/app-2026-10-16/answer-probe.mjs /path/to/reviewed-app
node docs/reviews/app-2026-10-16/runtime-probe.mjs /path/to/reviewed-app
```

These are **snapshot defect reproductions**, not passing regression tests: exit 0 means the recorded
bad outcomes were reproduced. They retain the reviewers' assertions and fixtures, with portable
paths/output handling only. After a fix, replace them with desired-behavior regression assertions;
newly constrained prompts must be assessed under their new explicit constraints. Do not treat a
failed old-snapshot assertion after a fix as proof of a new application defect.

Original manifests pin the temporary reviewer inputs independently checked by the coordinator.
The generated controller bundle is not retained. `manifest.json` pins this persisted package;
reviewers' absolute paths describe the actual run, while source references are relative to the app
checkout above. Portable probe copies were rerun and reproduce the same 13 + 2 scenarios.

## Continuation and ownership

The next implementation action belongs to the current APP-DELIVERY owner: read this report, fix the
four findings with meaningful regression coverage, then rerun the relevant checks and journeys.
Requests 17–19 on the shared board group the three concrete correction deliverables; no new
implementation claim is created. Keep all original content draft and preserve research rights.

Overall research is unfinished. No research unit is currently claimable: R-INT waits for other
claimed units and their claims are not stale. Do not merge incomplete research or waive its gate.
The app also still needs the owner's actual audio/project/launch inputs and native/device access.
Those requirements remain after code corrections and cannot be supplied by this review.

Native/deferred Chrisverse, Kanban and Obsidian tools remain absent, including the exact capabilities
identifier and any generic tool-search/reload interface. Existing external records await reconciliation;
repository board, memory and log contain the review and next actions. No external update succeeded.
