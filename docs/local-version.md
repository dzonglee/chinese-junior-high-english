# Local version · 2026-10-17

The owner's current milestone is a usable local app; videos come later. The local build includes
34 original draft lessons, 368 questions, 96 vocabulary entries and all 48 topic packs. Artwork
comes from the existing original Blender pipeline. No research documents are embedded.

## Use the app

Run `npm ci --no-audit --no-fund`, `npm run build:local`, then `npm run dev` from the repository
with Node 24. The server listens on loopback port 4173. Alternatively, copy `dist/local/index.html`
to a computer and open it in Chrome or Edge. The standalone HTML contains its own code, styles,
illustrations and hash-checked questions; practice works with networking disabled.

Choose the student's city, school structure, grade, term and exact edition. The app keeps
unverified adoption and exam-format states visible. This original capability course is not yet
a verified textbook-by-unit course or complete national vocabulary course.

Students can complete lessons with illustrated feedback, review words and mistakes, save writing
drafts, build practice sets, use timed practice, create private questions, and inspect progress.
Local data stays in the current browser profile/origin. Use the backup export in 我的 before
clearing browser data, switching browsers or moving/renaming the HTML file; use import to restore.
Exported JSON contains learning data, not microphone audio. Browser file storage behavior varies;
the development server gives a stable origin for regular use.

Recording is optional and requires a supported browser, a secure context and microphone consent.
Use the local development server if the browser restricts recording from files. Recordings are
stored locally in IndexedDB, can be played/deleted in the app and remain self-review evidence,
never automatic speech scores. Denied/cancelled consent and storage failures do not create a
successful recording or learning attempt.

Listening audio that has not been prepared stays explicitly pending. No audio model has been
selected and no video production is required for this local milestone. Native WeChat publication,
CloudBase deployment, device evidence and editorial approval are separate future work.

## What was verified

`npm run build:local` verifies pack hashes before embedding them. `npm run test:local` covers
offline lessons, legitimate grammar variants, saved progress, a real backup download, microphone
cancellation/storage failure through API doubles and small-screen layout. This cloud's managed
Chromium blocks direct `file://` navigation. The test respects that policy and serves the exact
standalone document over loopback, then disables networking during practice. Direct-file browser
navigation is therefore unvalidated on this machine; the runner also supports it where permitted.

All 90 automated tests, seven grammar regressions, four native-source permission simulations and
11 full browser journeys pass. See [validation evidence](validation.md) for the boundaries and
[authoring guidance](content-authoring.md) before changing questions.

The October 16 review is a historical defect snapshot. Its bad-outcome probes are preserved;
current desired-behavior regressions replace them for verification. The local work fixes all
three requested areas: constrained grammar prompts and accepted equivalents, cancellation of
pending microphone starts, and invalidation of editorial approval after any catalog change.
