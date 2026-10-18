# Calculated reading responses

A proof item with `sourceStyle: cards` may require a `calculation` after its evidence is collected.
Use this when a question needs a numerical result; choosing a quote alone must not reveal it.

The object contains `kind` (`time`, `minutes` or `yuan`), a canonical `answer`, a short Chinese `label`,
a format/method `hint`, and specific `wrong` feedback that helps repair the method without
revealing the result. `time` uses 24-hour HH:MM; `minutes` and `yuan` use an integer from 0 to 9999. `yuan` explicitly means whole yuan, not minutes or fractional currency. Give the unit in the input label and source; do not use this kind for fen or decimal prices. The web/native numeric keyboards follow the declared non-time kind.
Authored answers are strict. Learner input accepts surrounding whitespace and full-width
Chinese-keyboard digits/colons, but never prefixes, partial numbers or unrequested units.
Do not combine this with ordered sources or a picture answer.

The learner first collects the required quotes, then types and checks a result. A result without
evidence cannot complete the task. Multi-clue tasks still require the learner's own explanation;
single-clue calculations complete only after the number is checked. Editing or removing the
number invalidates completion, keeps the useful evidence and preserves the reasoning draft.
Offline reload restores the attempted number. These are guided activities and create no
independent attempt, mastery or lesson-completion records.

For money tasks, assign each value to its actual role before computing: budget, chosen price, spending or balance. Equal numerical values can play different roles. A quoted balance and another product price being equal does not make the other price evidence for a balance calculation. Keep a planned purchase separate from a receipt and a repayment promise separate from actual repayment.
