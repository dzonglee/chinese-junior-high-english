# Application architecture

## Runtime

`src/core` contains platform-independent TypeScript. `src/app` implements learner actions and a
screen view model. Native WeChat pages mount `miniprogram/components/app-shell`; browser
verification renders the same view model. Platform adapters handle navigation, storage, files,
playback, recording and consent. Browser checks do not validate WeChat's renderer or permissions.

`npm run build` compiles the native CommonJS runtime with esbuild. Development content is split
into asynchronous WeChat subpackages. Each pack is validated and hashed; the main package keeps
question metadata, not full question/explanation payloads. UTF-8 encoding works without browser
TextEncoder/TextDecoder. Loading shares concurrent requests and retries after failure without
partially adding a pack.

A release build goes to `dist/release/`, leaving development source/output untouched. Its native
package contains no question/audio subpackages. It initializes the configured CloudBase environment
and downloads content with `wx.cloud.downloadFile`. Every question pack and audio file is checked
against its SHA-256 before use. Public authored content is read-only; there is no client write or
public submission endpoint. Private questions, drafts, progress and recordings remain on device.

## Learner evidence

The saved schema separates independent attempts, assisted practice and self-review. Hints,
retries, recently viewed solutions and immediately repeated items do not become independent
credit. Timed unanswered items score zero without pretending they were independently answered.
Listening evidence requires playback. Sentence-restoration feedback can reveal other gaps, so
subsequent practice in the exposed group is assisted; a fresh full timed sitting hides solutions.

Independent evidence can increase a topic score. A retention label also requires a successful
delayed response. Spaced word and mistake schedules do not advance from early peeks or assisted
success. Lesson reviews use distinct passages/items. Late first reviews are separated from the
next stage, rather than serving two overdue stages back to back. Seeing a solution restarts the
minimum delay for retention evidence.

Writing and speaking use explicit rubric self-review. Their scores stay separate from objective
scores and never become machine-assessed mastery. Speaking recordings are for playback and
self-check; there is no fabricated speech-recognition assessment.

## Profile and examinations

Profile values retain numeric grade and six-three/five-four structure independently of local
labels. Calendar calculations use mainland China dates. The school-year start anchors graduation
year, while examination countdowns use only an explicitly confirmed date.

Course and unit selection require the exact edition/version, grade and term. Until a mapping is
available, the UI explicitly uses generic grade capability ordering. A local mock requires an
official, complete blueprint matching city, structure and examination year. Otherwise only
user-configured timed practice is available. Question selection refuses shortages and duplicates;
blueprint marks are applied to the actual selected items.

## Persistence and privacy

One atomic storage value contains the versioned learner state. A failed write retains the prior
in-memory state. Unreadable data is preserved for export rather than overwritten. Portable
backups are validated before replacement, measured in UTF-8 bytes, and exclude device recordings
and active-session pointers. Import keeps existing device recordings; it never trusts recording paths in a portable file. Local restoration retains the device-specific fields.

Recordings are saved only after microphone consent. WeChat uses its privacy authorization button
and system microphone permission; browser tests use a simulated microphone. Navigating away or
backgrounding stops playback and saves an active recording. Deletion includes orphaned saved
audio and app-owned temporary backup files, not only paths still present in the state. User-owned
copies already exported outside the app cannot be deleted by the app.

No advertising, analytics, profile upload, private-question upload, recording upload or remote
speech-scoring service is implemented. CloudBase is used for authored content delivery in release.
