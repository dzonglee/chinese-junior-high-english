# Individual vocabulary decisions

An optional `wordDecision` on a `word-use` item adds a semantic or grammatical
choice before spelling and own use. The item still owns the target word,
original example and specific explanation. Its existing `options` must contain
2–4 distinct options with exactly one correct answer and feedback for each.

`wordDecision.prompt` states the decision. Optional `art` names registered original
artwork, its native asset root and an honest description. Art supports the task;
exact actor labels, arrows, spelling changes, quantities and deadlines stay in code.
Never infer permission, a completed loan or a measured quantity from decoration.

A correct spelling with a wrong or missing interpretation cannot unlock own use
or complete the task. Wrong choices stay visible with their own feedback. A
correct interpretation can stay marked after checking a misspelling, so the
learner sees which part to repair. Editing either answer clears checked status
and completion while retaining the other answer and saved own sentence. A hidden
or stale save event cannot replace semantic feedback with an own-writing prompt.
A missing or copied own sentence receives neutral repair feedback, never the
green success style used for a passed form check.
Restoration retains the learner's actual choices and inputs, never a substituted
correct answer. The native partial-input update refreshes choice feedback as well
as input, completion and the directional model.

Own use retains the existing minimum length, target-word and non-copy checks.
Those are form checks and self-review, not an automatic judgement of meaning or
mastery. Guided progress grants no independent attempts, mastery or lessonDone.
Delayed vocabulary questions remain protected.

Both spelling variants map prompt, alternative text, feedback and image
accessibility text; persisted option and asset identities stay unchanged.
Native semantic buttons explicitly override WeChat’s intrinsic non-mini button
width. Browser and actual native SDK checks measure full-column width and at
least 48-pixel height; CSS presence alone is insufficient.

The first individual vocabulary lesson supplies its own eight decisions. Shared
engine support does not grant review credit to other vocabulary lessons.
