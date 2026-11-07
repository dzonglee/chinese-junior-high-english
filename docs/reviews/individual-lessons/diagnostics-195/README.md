# Lesson 195 retained diagnostic

The initial offline fixture syntax check caught a duplicate scopeLesson binding. Renamed only the new fixture bindings with a lesson-specific suffix; syntax checks then passed. Original assertions and timeouts retained. This was caught before the final full pipeline and is not a production-code failure.

Actual visual review of the first successful browser snapshot found that the abstract vehicle symbols needed an explicit key. Added “每个小框表示1辆车” to the configured hint, with a regression assertion. The previous browser run and its 249 figures remain frozen privately under before-traffic-key; only sheets 0–3 had actually been reviewed. The in-progress offline run was stopped for this correction; it did not pass. All final figures require fresh review after the new full pipeline.

The next actual 320px visual review caught a route name wrapping beside six symbols. Made route labels nonshrinking/nowrap and added a one-line DOM Range guard for each route in every arrangement/width. Retained that snapshot under before-route-label-width; only sheets 0–7 had actually been reviewed. Its in-progress offline run was stopped without pass credit. Final figures require fresh review after the repeat.

Final offline flow caught a test-fixture ordering error: it asserted the own-writing input while the rotated route remained invalid and the input correctly hidden. Restored and checked the minimum route before asserting the exact retained writing. No assertion or timeout removed; production code and frozen browser figures unchanged. Retained the failed log and repeated the platform checks.
