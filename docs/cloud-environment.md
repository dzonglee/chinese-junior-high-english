# Cloud environment startup

Use the existing isolated checkout at `/workspace/chinese-junior-high-english`. Do not create a
worktree unless the owner explicitly asks. Preserve local changes and existing research claims.
The local application is integrated on `main`; do not reset a branch or discard work merely to
run setup. Videos are deferred and production credentials are unnecessary for local development.

## Every session

1. Read `AGENTS.md`, `README.md`, `docs/plan.md`, `docs/project-memory.md`, the current
   `docs/authoring/board.md` and latest `docs/authoring/log.md`. Fetch `origin main` using the
   existing HTTPS Git proxy before choosing work. Follow the ownership protocol.
2. Discover the existing Obsidian project memory and Kanban board through MCP. Read/update them
   as work progresses and carry this requirement into any authorized delegation or handoff.
   Keep the board short and in plain English. Do not guess vault/board IDs or create duplicates.
   If the tools are unavailable, record that exact limitation, maintain the local memory/board
   and continue independent app work, as the owner requested. Reconcile when tools become available.
3. Inspect `git status --short --untracked-files=all` and the active branch. No new worktree,
   branch reset or merge of incomplete research is part of setup.

## Retained tools and installation

The current instance has Node 24.19.0, npm 11.9.0, Git LFS 3.6.1, Chromium 154, Blender 4.3.2,
FFmpeg 7.1.5, PDF tools and Python imports `fitz`, `pypdf` and `docx`. Actual executable checks,
compiler runs, Blender rendering and Chromium journeys have been performed. Publication of an
environment snapshot and a fresh-task restore are separate operations, not claimed by setup.

When application dependencies need refreshing, use the locked install:

```bash
cd /workspace/chinese-junior-high-english
npm ci --no-audit --no-fund --cache /tmp/cjhe-npm-cache
npm run build:local
npm run check
npm run test:grammar
npm run check:course
npm run check:interactions
npm run check:teaching
npm run content:audit
npm run check:package
npm run test:native-adapter
npm run test:native-cancellation
```

On a research-only checkout without a lockfile, do not invent dependencies. Run
`npm run check:register`, `git lfs pull` and `git lfs fsck`; use a unit's documented audit for
specialized datasets. The register checker skips unresolved pointers, so its pass alone is not
an artifact-integrity claim. Keep skipped and unrun checks visible.

## Start and verify the application

`npm run dev` starts the local learning app on loopback port 4173. Live processes do
not survive environment publication/restoration, so start it again when needed. Read its output
and verify a functional request; a PID alone is not readiness. Do not create user-facing localhost
preview links in the onboarding UI.

`npm run test:journeys` starts its own temporary harness on port 4180, runs the full learner paths,
and shuts down that server/browser. It writes current results and screenshots under
`test-results/journeys/`. Use `CHROMIUM_PATH` for an installed browser; `/usr/bin/chromium` is the
verified default here. Otherwise install Playwright's supported Chromium using
`npx playwright install --with-deps chromium` in an environment with the required system-package
capabilities. Socket/browser execution may need the normal sandbox escalation; do not interpret
that as an application defect or disable checks.

`npm run build:local` also produces a portable standalone app at `dist/local/index.html`.
`npm run test:local` exercises its offline learner flows and backup download. Managed Chromium
here blocks direct file navigation, so that runner serves the same document on loopback and then
disables networking during practice. Preserve that distinction; do not disable managed policies.
See `docs/local-version.md` for persistence and optional microphone behavior.

Browser screenshots and microphone simulation are not WeChat evidence. Native validation needs
the actual WeChat DevTools and a real device. See `docs/release-checklist.md`.

## Credentials, network and release

Development build/tests need no app secrets or backing service. The repository has no actual
release AppID/CloudBase configuration. Release credentials, account ownership and publication are
owner prerequisites; do not fabricate them. Listen/record self-review is never machine scoring.

Audio policy remains unselected until the owner chooses the source/model. If OpenAI audio is
chosen, declare `AUDIO_API_KEY` securely for `api.openai.com`, preserve the environment proxy and
TLS verification, and run the preparation command with Node's environment-proxy support. Never
request or print credential values in chat. Do not add a different provider silently.

Read managed-environment runtime/network policy before diagnosing access. Keep existing custom
network destinations and credential bindings when updating configuration. A saved draft is not
an applied policy or published snapshot. A failed endpoint blocks only dependent operations;
continue implementation and validation that can run independently.

The full-course browser check is `npm run test:course-browser` (port 4182). It checks inventory
and lessons, lays out every instructional figure at three widths and captures topic representatives.
The current local catalog contains 413 lessons and 245 embedded hash-checked packs.

`npm run test:interactions` runs the standalone app on port 4183 and checks every language
workshop offline, reading evidence, saved exploration progress and the topic-practice handoff.
It captures all 39 changed conditions. Generated assets are already included; routine setup
needs no image-generation API credentials.

## Shared WeChat environment

The tested direct Studio MCP fallback is `/workspace/.onboarding/chrisverse_mcp.py`. It uses
the existing runtime credential privately, with exactly one Authorization scheme. Do not wait
for native plugin injection or copy a credential into files/arguments/logs. Native tools, when
actually exposed, are also valid; inspect schemas and actual returned jobs. The helper is outside
the checkout, so its presence in a fresh restored environment is not assumed.

Read `memory_start_here` and the existing `Projects/Chinese Junior High English.md` note and
Kanban records. Use the isolated `wechat/english-solo-20261017` Mac project; hold the shared
`wechat/DEVTOOLS.lock`, inspect other owners and close only this project. The installed official
simulator SDK lives under `wechat/tooling/node_modules/miniprogram-automator`. Guest mode
permits local simulator work, not phone preview/upload/release. Check the nested test exit and
actual screenshots/results with `get_job`; a successful wrapper is insufficient.

The current 413 studios are described in `docs/lesson-studios.md`. Their native package contains
245 topic packs in six size-limited subpackages. Keep build and tests sequential when they share
generated packs. Actual DevTools checks exposed defects absent from browser/API-double tests.
See `docs/validation.md` for the current verification boundary before claiming readiness.
