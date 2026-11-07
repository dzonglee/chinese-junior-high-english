# Contextual gap tasks

An individual reading workshop may add `sourceGap` to a proof item with literal source cards.
It supplies `before`, `after`, an answer option ID and two to four unique candidate words or
phrases, each with its own explanation. `before + "____" + after` must appear in the complete
material. Keep other blanks unfilled in the workshop material; original delayed texts stay out.

The student places a candidate into the actual sentence, then checks it. Incorrect candidates
remain visible with their specific feedback. The source cards stay unchanged so students can
connect the relevant context rather than read back an automatically completed story. Completion
requires the checked correct word, every required source group and the student's saved reasoning.
Changing or clearing the word removes completion; reload retains the actual attempted state.
The saved reasoning is a draft, not semantic grading or independent question evidence.

Do not combine a contextual gap with source ordering, a calculation or source art on the same item.
Use pictures only where they help resolve the language task; sentence meaning itself can be the
visual model. Existing proof items retain their original behavior.

Proof item IDs and clue option IDs must be unique stable lowercase identifiers matching
`[a-z][a-z0-9-]*`. They become saved-state keys: an underscore or slash may appear to work
until reload, then fail storage validation. The teaching audit rejects these identifiers; verify
actual browser reload after collecting clues and saving the learner's reasoning.
