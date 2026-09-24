# Important Event Alerts — Curated Process Record

## Product brief

Important Event Alerts is a transparent frontend demo for monitoring meaningful
earthquake, news, and market events. The primary scenario is a user creating a
`magnitude 7+ near Japan` earthquake alert, simulating a `7.2` event, reviewing
the importance explanation and mock email/Slack deliveries, then switching to
the admin view to inspect the records.

Authentication, event sources, scoring, notifications, and persistence are
intentionally mocked and deterministic. The product demonstrates the workflow,
not production infrastructure.

## Decision log

| Decision | Reason | Rejected alternative |
| --- | --- | --- |
| Keep the product frontend-only | The exercise values inspectable behavior and fast deterministic demos | Backend, worker, SSE, and external APIs |
| Use one shared event-evaluation path | Manual and automatic events must behave consistently | Duplicated matching logic in each screen |
| Use AND semantics for conditions | It keeps alert behavior understandable | OR groups and a full rule-builder language |
| Store a schema version in localStorage | Refresh persistence must survive supported format changes | Unversioned JSON with silent assumptions |
| Keep importance scoring deterministic | The user can see why a result received its score | Opaque or live model-based classification |
| Keep React state local for now | The current state graph is small and explicit | Zustand or Context before cross-screen pressure exists |
| Prefer readable component files | Developers should be able to review generated code directly | Compressed one-line JSX and handlers |
| Keep live monitoring demo-local | The feed is a presentation aid, not a background service | Cross-tab monitoring state and persistent workers |
| Use a three-second feed cycle | The demo should provide quick visible feedback | Long waits that make the simulator appear idle |

## AI direction

Natural-language alert setup is represented by a deterministic interpreter. It
recognizes the supported demo phrases and produces editable structured fields.
No LLM, provider, prompt infrastructure, or model-selection surface is part of
the product.

Generated code was rewritten when compact output made the control flow hard to
review. Readability rules live in [`AGENTS.md`](../AGENTS.md).

The browser review also led to a small visual correction: the login content is
now centered within a bounded container while account rows remain left-aligned
for scanning.

## Implementation plan and status

1. Demo authentication and user/admin application shells — implemented.
2. Structured alert creation, persistence, editing, pausing, and deletion — implemented.
3. Shared event evaluation, simulation, matching, and importance explanations — implemented.
4. Mock email and Slack deliveries with success/failure previews — implemented.
5. Automatic monitoring plus news and market event examples — implemented.
6. Admin monitoring of events, alerts, deliveries, and failures — implemented.
7. Versioned localStorage validation, migration, and safe fallback — implemented.
8. Curated process and validation record — this document.

### Subsequent refinements

- Split each React component into its own readable file under `src/components`.
- Added a three-second countdown beside the local live-feed control; it resets
  after each automatic evaluation and when the feed is paused.
- Kept detailed evaluation results on Overview rather than duplicating them in
  Simulator.
- Centered the login page content after browser review identified excessive
  left alignment.

## Prompt and direction log

- Start with the provided issue chain and product specification.
- Use multiple agents when available; when delegation was unavailable, keep the
  dependency order explicit and use parallel validation commands.
- Apply a ponytail pass after implementation: prefer the smallest working
  solution, but do not compress code when the user needs it to be readable.
- Split every React component into its own file under `src/components`.
- Keep state management simple until shared-state complexity demonstrates a
  need for Context or Zustand.

## Validation checklist

- [x] User and admin demo accounts are visibly labeled as mock authentication.
- [x] User and admin roles open different application shells.
- [x] Earthquake alerts support magnitude and region conditions with AND behavior.
- [x] Email and Slack destinations can be selected together.
- [x] Alerts can be edited, paused, enabled, and deleted.
- [x] Alerts and delivery history persist through localStorage.
- [x] Matching includes threshold equality and rejects non-matching events.
- [x] Importance results include a score, level, and reasons.
- [x] Manual and automatic events share the evaluation path.
- [x] Email and Slack previews are distinct and failed delivery errors are visible.
- [x] Duplicate event delivery records are filtered per alert, event, and channel.
- [x] Admin monitoring exposes events, alerts, deliveries, and failures.
- [x] Version 1 data migrates; malformed or unsupported data falls back safely.
- [x] `npm run lint` passes.
- [x] `npm run build` passes.
- [x] The earthquake demo path is repeatable from user login through admin review.
- [x] The Simulator shows `Next event in —` while paused and a `3s` countdown while active.
- [x] Automatic feed labels identify the three-second cycle.
- [x] The login page is visually centered at the tested desktop viewport.
- [x] Browser testing found no console warnings or errors in the exercised flows.

## Final reflection

The implementation stayed within the requested demo scope. The main course
correction was replacing compressed generated JSX with explicit component files
and repository rules so a developer can follow the code without relying on an
editor formatter. Browser review then identified two presentation issues: the
login layout was too far left, and the live-feed interval had no visible timing
cue. The login content is now centered and the Simulator exposes a three-second
countdown without turning the demo feed into a persistent service. A state
library was considered and rejected for now because the current state has one
clear owner and persistence requires domain-specific validation and migration
anyway. Real authentication, external providers, cross-tab monitoring, retries,
and predictive scoring remain intentionally out of scope.
