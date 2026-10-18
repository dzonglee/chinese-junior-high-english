# Context sentence with a cardinal location preview

`sourceGap.locationMap` optionally supplies an `anchor` and a `marker`. Use this only
for a source-grounded relative-location sentence whose candidate words are cardinal
directions. Both names must be distinct, trimmed and at most 16 characters. Candidate
words must be distinct north/south/east/west directions, ignoring case. Normal gap
validation and at least two source-evidence groups still apply.

The fixed north indicator establishes diagram orientation. The anchor occupies the
centre. Before a choice, the marker is absent; selecting a candidate places it in the
corresponding cardinal cell. Checking uses the existing sentence answer. Wrong
placements remain visible; edits invalidate completion while retaining collected
evidence and the learner's explanation. Clearing hides the marker. Actual selected
words, rather than the correct answer, drive the map. Ordinary gaps stay unchanged.

Do not draw waterways, slopes, distances or movement arrows unless the source gives
them and a separately reviewed model supports them. North of a village does not
establish southward water flow. The location preview's north indicator must never be
described as a flow arrow. Text belongs in code, with edition spelling conversion.

Acceptance includes real wrong-choice, source, own-explanation, storage/reopen,
repair and clear paths; inspect the full map at 320, 390 and 768 pixels, plus actual
native controls and geometry. The map remains assisted practice, with no independent
attempts, mastery, lessonDone or hearing credit. Content remains draft.
