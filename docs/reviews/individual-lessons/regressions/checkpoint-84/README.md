# Passage scrolling

A full-flow run sent wheel input immediately after viewport resizing and saw no inner scroll. Three isolated real-wheel checks at 320 pixels reached scrollTop 247 (270-pixel viewport, 517-pixel content), with the actual passage as the hit target and no page scroll. The full-flow driver now waits two paint frames after resizing before its real wheel gesture; it never sets scrollTop. The inspected screenshot shows the complete final sentence. These seeded diagnostic checks add no lesson-review credit and do not demonstrate native GUI behavior.
