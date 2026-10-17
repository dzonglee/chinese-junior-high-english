# Whole-app product design

The owner rejected the earlier English UI. APP-UI is a solo redesign of the full product, using
the maths app at main 933ab32 as a concrete reference. Matching colours or passing tests does not
establish equal product quality. Compare complete journeys and rendered screens again before
completion; continue fixing material gaps found by that comparison.

## Product structure

- Today: one next-course action, one integrated daily task card, then alternate skill entries.
  A completed studio leads to consolidation; it does not masquerade as a passed lesson.
- Courses: the next lesson, search, horizontal skill filters and compact grouped lesson rows.
  Theme/grade/term/progress filters open on demand. Each row has one learning entry and a separate
  practice action. All 413 original lessons remain discoverable; grade and media gates remain.
- Practice: one dark timed-practice card and a distinct two-column skill grid. Basic setup needs
  only skill, count and (for timed work) minutes; detailed question filters remain available.
  Listening preparation opens actual text courses while audio stays pending.
- Mistakes: a purposeful empty state, or real due statuses and retry controls after wrong answers.
- Profile: identity, a shared statistics strip and compact menu rows. Data, private questions,
  recordings, sources and privacy stay reachable.
- Onboarding: city/structure, grade/textbook, then daily plan. Validate before advancing, preserve
  previous choices on back, and create the profile only on final confirmation.
- Learning: one task at a time, tactile word tiles, specific feedback and optional references.
  Selected letters form a word instead of spreading across the card.

The shared frame uses cool ground, white surfaces, strong headings, one action blue, useful
skill colours, original study-tool artwork and a floating icon tab bar. Navigation reserves safe
area space. Avoid generic stat-tile dashboards, decorative maths objects in English, repeated
full-width button stacks and long technical caveats at the front of a task.

## Comparison and acceptance

| Dimension | Earlier English gap | Acceptance |
| --- | --- | --- |
| Home hierarchy | Generic hero, separate numbers/week, repetitive cards | A useful next action and integrated real daily tasks |
| Course discovery | Filters occupy the first screen; three competing actions per card | A real lesson appears immediately; progressive filters and clear rows |
| Distinct sections | Most pages look like the same card template | Recognisable home, course list, practice grid, review and profile patterns |
| First use | Long configuration form | Three short validated steps and correct edition/structure |
| Learning controls | Letters spread apart; dense repeated controls | Native typing/taps, cohesive tiles, concise feedback and readable references |
| Native finish | Browser pass used as a proxy for product quality | Real simulator screenshots and connected flows, with no hidden final controls |
| Evidence | Completion can look like learning success | Existing independent/assisted/delayed/self-review distinctions preserved |

Review fresh and populated profiles, empty and real mistake states, 320/390/768 browser widths,
all secondary routes and every learning mode. Readable screenshots are required; overview scans
alone do not establish copy quality. Actual phone behavior, approved audio, exact publisher maps,
editorial approval and production publication remain separate work.

Current status: implementation and repeated visual/interaction review are in progress. The
intermediate native eight-screen walk passes; the expanded final native/browser checks are
running. Do not describe this document or the older development milestone as UI parity approval.
