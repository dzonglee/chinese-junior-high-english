# l-g-be · class-photo dialogue

Authoring date: 2026-10-18 (Sydney). Content remains draft. Individual visual/control review passed after
inspection of every dialogue, missing/wrong referents, wrong verbs, application, clinic and transfer. Other lessons are not signed off by this work.

## Teaching decision

The old workshop practised a stored verb against one/three notebook icons. This redesign asks
students to identify grammatical person before choosing a form. One picture contains three
classmates, but `I` still takes `am`; `you` takes `are` even when it refers to one person. Changing
the speaker changes whom `I` refers to. `we` includes the speaker; `they` in the authored dialogue
does not. These distinctions address errors that counting the people in a picture cannot solve.

The new picture was generated specifically for this task and inspected: Mia is on the left in
coral, Leo in the centre in blue, Amy on the right in lavender. Names, speaker/listener badges and
selection frames are code, not generated text. Accessible names describe each character and
selection state. Students tap the people directly. Correct verb + wrong referents cannot finish.

## Authored sequence

| Dialogue | Speaker | Referents the student must select | Form | Reason |
| --- | --- | --- | --- | --- |
| I am ready for the photo. | Mia | Mia | am | I refers to the current speaker |
| She is our new classmate. | Leo | Mia | is | she refers to a third person, not the speaker |
| You are in my group. | Mia | Leo | are | singular you still takes are |
| They are my friends. | Amy | Mia and Leo | are | the complete plural referent excludes Amy |
| We are in Class Three. | Mia | all three | are | we includes the speaker and the named group |
| I am Leo. | Leo | Leo | am | I changes referent when the speaker changes |
| You are in my team. | Mia | Leo and Amy | are | plural you uses the same form as singular you |

The first prediction and two distinct application items now fit the photo context. The
application changes from named plural subjects to `you`, rather than replaying the prediction.
Error feedback names the student's actual wrong selection. Changing a completed selection
invalidates its completion; per-dialogue selections survive navigation and reload.

The fresh transfer is separately authored: `My sister and I ___ in the school photo. I ___ on
the left.` It tests the complete compound subject against the nearby `I`, then the first-person
subject in a new sentence. Both distractors explain the specific person/number mistake. Original
delayed questions remain unexposed. All of this is guided work and grants no independent attempt,
mastery or lesson-pass record.

## Reviewed evidence

The actual browser flow passed all seven dialogues, reload/restoration, two application items,
both clinic checks, fresh transfer and summary. All 21 condition × width checks at 320/390/768
passed, including 44-pixel person targets, loaded artwork and no horizontal overflow. No
independent attempt, mastery or lesson-pass record was created. See [controls](l-g-be/controls.json).

Inspected every generated screenshot. Review found and corrected a misleading red verb when
only the selected person was wrong: wrong people now receive red frames, and wrong verbs
receive the sentence highlight. Correct `am` stays neutral when the referent is wrong. Also
replaced seven long navigation tabs with a compact dialogue pager to keep the scene accessible.

[Wrong person](l-g-be/wrong-person.png) · [We includes the speaker](l-g-be/condition-4.png) ·
[Plural you](l-g-be/condition-6.png) · [Fresh transfer](l-g-be/fresh-transfer.png)

Core, type and package checks pass; native validation remains separate. Content is still draft,
and this individual review does not approve the other 412 lessons or public release.
