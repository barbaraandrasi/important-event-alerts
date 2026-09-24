# 04: Mock email and Slack deliveries

**What to build:** When an event matches an alert, the user can inspect distinct mock email and Slack notification previews and their delivery outcomes.

**Blocked by:** 03: Evaluate and simulate matching events

**Status:** ready-for-agent

- [ ] A matching event creates a delivery record for each selected channel.
- [ ] Email and Slack previews are visually distinct and channel-appropriate.
- [ ] Each delivery shows status and timestamp.
- [ ] Successful and failed mock deliveries are both representable.
- [ ] Failed deliveries include an actionable error message.
- [ ] Duplicate processing of the same event does not create duplicate deliveries for one alert.
