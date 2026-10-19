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

During an authored word-decision activity, both renderers omit the repeated exam-focus
overview. It remains at prediction and later phases; the active prompt and choices
appear sooner. This is layout support, not individual review credit for other lessons.

Optional `art.evidence` maps every choice to a short observation caption and zero
to four labelled percentage rectangles. Coordinates must be finite, inside the
image and uniquely identified within that choice. The map must cover each actual
option exactly once. A claim about an unobserved process may have no region.

Choosing a claim updates neutral outlines and the observation caption. Outlines
locate what to compare; they never mark a claim correct or bypass meaning,
spelling or own-writing gates. Switching claims/reopening restores that claim's
actual regions. Both renderers use the full uncropped image as the coordinate
frame. Browser checks measure every region at 320/390/768; native SDK checks
measure the real image frame separately. Each authored region must also be
visually checked against the delivered image. Labels and captions map with the
spelling variant while option/region identities and coordinates stay fixed.

Meaning choices use a deterministic per-word rotation of the authored options.
This varies correct-answer positions while preserving option IDs, source content,
saved selections and the same order during checks/reopening. It does not use the
correctness flag to choose an order. Context tasks say “把目标词填回句子” because
some prompts/hints show the target; they do not claim concealed-word recall.

Vocabulary examples use inline sentence flow in both renderers. A punctuation-only tail stays with the target word; a longer tail stays inline and can wrap naturally. The view derives this presentation flag from the authored tail without changing answers or learning credit. Browser geometry checks keep the empty-target closing mark on the same line at 320/390/768, measure all eight completed sentence figures, and prevent the short repair example from splitting needlessly at 320. Native SDK checks the actual punctuation geometry separately.

An optional `ownForms` list admits explicitly authored word forms in the learner’s original sentence and changed rewrite. Use 2–8 distinct lowercase forms, include the base target, and keep each form a single word (internal hyphens/apostrophes allowed). Both spelling variants map the forms. A sentence may contain any listed form as a complete word; no stemming or unrestricted prefix match is inferred. The contextual blank still requires its exact authored answer, and meaning, length, non-copy and rewrite self-review gates remain. Renderers disclose that the word form may change. This is guided form checking, not a claim that grammar, meaning or collocation is automatically correct. Items without this field retain their given-form requirement.
