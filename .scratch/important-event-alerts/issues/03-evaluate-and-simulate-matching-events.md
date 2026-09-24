# 03: Evaluate and simulate matching events

**What to build:** A user can manually simulate an earthquake event and see whether it matches an alert, including a deterministic importance score and explanation.

**Blocked by:** 02: Create and persist structured alerts

**Status:** implemented

- [x] The user can manually create a simulated earthquake event.
- [x] A matching event triggers the intended enabled alert.
- [x] A non-matching event does not trigger the alert.
- [x] Threshold equality behaves correctly.
- [x] The result shows the matched alert and event details.
- [x] The result includes an importance level, score, and contributing reasons.
- [x] The same evaluation path is used for simulated events and alert matching.
