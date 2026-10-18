# Calculated reading responses

A proof item with `sourceStyle: cards` may require a `calculation` after its evidence is collected.
Use this when a question needs a numerical result; choosing a quote alone must not reveal it.

The object contains `kind` (`time` or `minutes`), a canonical `answer`, a short Chinese `label`,
a format/method `hint`, and specific `wrong` feedback that helps repair the method without
revealing the result. `time` uses 24-hour HH:MM; `minutes` uses an integer from 0 to 9999.
Authored answers are strict. Learner input accepts surrounding whitespace and full-width
Chinese-keyboard digits/colons, but never prefixes, partial numbers or unrequested units.
Do not combine this with ordered sources or a picture answer.

The learner first collects the required quotes, then types and checks a result. A result without
evidence cannot complete the task. Multi-clue tasks still require the learner's own explanation;
single-clue calculations complete only after the number is checked. Editing or removing the
number invalidates completion, keeps the useful evidence and preserves the reasoning draft.
Offline reload restores the attempted number. These are guided activities and create no
independent attempt, mastery or lesson-completion records.
