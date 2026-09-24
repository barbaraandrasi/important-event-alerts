# Important Event Alerts — Product Specification

## Problem Statement

Users want to be notified when important events happen in the world, such as breaking news, significant market movements, or natural disasters. They need to express what matters to them, choose where notifications should be delivered, and understand why an event triggered an alert.

This is a frontend take-home exercise. The implementation is evidence of the development process rather than the primary deliverable. The solution should therefore be polished enough to demonstrate the product, while keeping external integrations and infrastructure mocked and deterministic. The important quality bar is transparent reasoning, explicit assumptions, visible validation, and deliberate scope control.

## Solution

Build a React and Vite application with a user-first alert-management experience and a smaller admin monitoring experience.

Users can create structured alerts for supported event topics, optionally start from a natural-language description, choose email and Slack destinations, and observe simulated events being evaluated against their alerts. Matching events produce transparent importance scores and reasons, followed by channel-specific mock delivery previews.

Admins can monitor incoming events, active alerts, notification deliveries, and failures. The application uses local mock data and browser storage rather than a real backend, worker, SSE connection, LLM, email provider, Slack integration, or external API.

The primary demonstration is: sign in as a user, create an earthquake alert for magnitude at least 7 near Japan, simulate a magnitude 7.2 event, inspect the importance explanation and email/Slack previews, then inspect the resulting event and delivery records as an admin.

## User Stories

1. As a visitor, I want to sign in with a demo account, so that I can enter the application as a user or administrator.
2. As a visitor, I want demo accounts to be clearly identified, so that I do not mistake mock authentication for production security.
3. As a user, I want to see my active alerts, so that I can understand what monitoring is currently enabled.
4. As a user, I want to see recent matched events, so that I know what the system has detected for me.
5. As a user, I want to create an alert for a supported topic, so that I can monitor events relevant to me.
6. As a user, I want to configure conditions such as a numeric threshold or region, so that alerts are specific rather than broad.
7. As a user, I want multiple conditions to be combined with AND semantics, so that an alert only fires when all selected requirements are met.
8. As a user, I want to start an alert from natural language, so that I can describe a real-world need without knowing the structured rule format.
9. As a user, I want the natural-language interpretation to be visibly marked as mocked, so that the application remains transparent about its capabilities.
10. As a user, I want to review and edit the generated structured conditions, so that I remain in control of the alert that will be saved.
11. As a user, I want to choose one or more notification destinations, so that matched events reach me where I prefer.
12. As a user, I want email and Slack destinations to look different, so that I understand how each notification will appear.
13. As a user, I want to enable or disable an alert without deleting it, so that I can pause monitoring temporarily.
14. As a user, I want to edit or delete an existing alert, so that my monitoring preferences stay current.
15. As a user, I want simulated events to arrive automatically, so that the product demonstrates continuous monitoring.
16. As a user, I want to trigger a simulated event manually, so that I can reliably demonstrate a matching or non-matching scenario.
17. As a user, I want to select the simulated event type, so that news, market, and disaster examples can all be tested.
18. As a user, I want to see whether an event matched my alert, so that I can understand the system outcome.
19. As a user, I want to see why an event was considered important, so that the alert decision is explainable rather than opaque.
20. As a user, I want importance to reflect event severity, source reliability, relevance, recency, and my configured threshold, so that the result is understandable and useful.
21. As a user, I want a high-importance event to include contributing reasons, so that I can validate the decision.
22. As a user, I want to see mock delivery status for each selected channel, so that I know whether the notification was delivered, failed, or is pending.
23. As a user, I want delivery failures to include an error message, so that the failure is actionable in the demo.
24. As a user, I want alert and notification history to survive a page refresh, so that the application feels like a real product.
25. As a user, I want invalid or outdated saved data to be handled safely, so that a storage-format change does not crash the application.
26. As an administrator, I want to monitor incoming events, so that I can see what the system is processing.
27. As an administrator, I want to inspect active alerts, so that I can understand what users are monitoring.
28. As an administrator, I want to inspect notification deliveries, so that I can identify successful and failed channel operations.
29. As an administrator, I want to see delivery failures and their reasons, so that I can diagnose mock operational problems.
30. As an administrator, I want to see event, alert, and delivery records in one monitoring view, so that I can follow an event through the system.
31. As an evaluator, I want the product to support a predictable end-to-end demo, so that I can assess the implementation without waiting for nondeterministic external systems.
32. As an evaluator, I want the repository to contain the important decisions and validation evidence, so that I can evaluate how the solution was directed and reviewed.

## Implementation Decisions

- Use React with Vite and JavaScript. Avoid adding a backend or new infrastructure unless the implementation later demonstrates a concrete need.
- Treat the event-to-alert evaluation pipeline as the primary application seam. The UI, simulation controls, and admin monitoring consume its results rather than duplicating matching logic.
- Represent an alert with a topic, structured conditions, enabled state, selected notification destinations, and user-facing metadata.
- Support news, market, and natural-disaster event categories through a shared event model. Implement earthquake matching most deeply, with simpler testable examples for the other categories.
- Use AND semantics when an alert contains multiple conditions.
- Provide a deterministic mock natural-language interpreter that converts supported phrases into editable structured conditions. Do not claim that an actual LLM is integrated.
- Use a transparent deterministic importance evaluator. It returns an importance level, a score, and individual reasons based on event severity, source reliability, geographic relevance, recency, and user-defined thresholds.
- Keep importance evaluation explainable and testable. An LLM may be a future enhancement for interpretation or summarization, but it is not required to decide whether an alert fires.
- Model notification destinations behind a generic channel abstraction. Email and Slack are the initial mock channel implementations, with channel-specific previews and delivery records.
- Represent delivery records with at least a channel, status, timestamp, associated event/alert references, and optional error information.
- Simulate continuous monitoring with a timer-driven event generator. Provide a manual simulation control with selectable event types and enough control to trigger matching and non-matching scenarios.
- Provide mock login with fixed user and admin demo accounts. This demonstrates role-based routing and UI without implementing real authentication, passwords, tokens, or authorization infrastructure.
- Make the user dashboard the primary experience. Include alert management, recent matches, importance explanations, and delivery previews.
- Make the admin dashboard a monitoring surface for events, alerts, deliveries, and failures. Do not add model-selection, provider configuration, billing, team management, or broad platform settings.
- Persist alerts and notification history in localStorage.
- Store a root schema version with persisted data. Validate loaded data, migrate known older versions where practical, and fall back to safe defaults when migration is impossible. Malformed storage must never crash the application.
- Keep mock data deterministic enough for repeatable validation while still making the automatic event feed feel active.
- Preserve transparency in the UI and documentation: clearly label simulated events, mock delivery, demo authentication, and mock natural-language interpretation.
- The curated process artifacts are part of the deliverable: product brief, decision log, implementation plan, prompt log, validation checklist, and final reflection. They should record assumptions, rejected suggestions, course corrections, and evidence that generated output was checked.

## Testing Decisions

Tests should verify externally observable behavior at the highest useful seam, especially the event-to-alert evaluation pipeline. Avoid tests that merely assert component implementation details or internal state layout.

The implementation should validate:

- A matching earthquake event triggers the intended alert.
- A non-matching earthquake event does not trigger the alert.
- Threshold boundaries behave correctly, including equality at the configured value.
- Multiple alert conditions use AND semantics.
- News and market events remain testable through the shared event flow.
- Importance output contains a score, level, and accurate contributing reasons.
- Duplicate events do not create duplicate deliveries for the same alert.
- Email and Slack produce distinct notification previews.
- Delivery success and failure states are visible and recorded.
- Failed deliveries preserve an actionable error message.
- Disabled alerts do not trigger deliveries.
- User and admin demo accounts reach the appropriate experiences.
- Alert and notification history survives refresh.
- Current persisted data loads successfully.
- Known older storage versions migrate successfully.
- Malformed or unsupported storage is safely replaced with defaults rather than crashing the app.
- Automatic and manual event simulation both use the same evaluation path.

The current repository is a minimal Vite starter and contains no prior domain test patterns. Establish the smallest practical test seam around event evaluation and storage migration; supplement it with a manual validation checklist for the complete demo flow and visual states.

## Out of Scope

- Real user authentication, passwords, sessions, tokens, or permission enforcement.
- A production backend, database, job queue, background worker, or server-sent events connection.
- Real Slack webhooks, Slack OAuth, email delivery, Resend, or other provider integrations.
- Live news, market, earthquake, or other external data sources.
- Actual LLM calls, model selection, prompt infrastructure, or AI provider settings.
- Production-grade importance classification or claims that the mock score is predictive.
- Nested rule groups, OR semantics, or a full visual rule-builder language.
- User profiles, billing, teams, sharing, subscriptions, or account settings.
- Admin user management and platform configuration.
- Guaranteed real-time delivery, delivery retries, rate limiting, or operational scaling.
- Comprehensive accessibility, performance, and security hardening beyond sensible frontend basics for the demo.

## Further Notes

The code is not expected to represent a production notification platform. Its purpose is to make the product decisions and validation process inspectable.

The recommended acceptance path is the earthquake scenario described above, but the event simulator should also expose news and market examples so the shared event pipeline can be demonstrated beyond a single domain.

The most important design principle is explainability: every triggered alert should make it possible to answer both “why did this match?” and “why was it considered important?”

The project should maintain separate curated process documents rather than relying on an unstructured conversation transcript. The final reflection should explicitly identify assumptions challenged, AI-generated work rejected or rewritten, and checks performed before accepting the result.
