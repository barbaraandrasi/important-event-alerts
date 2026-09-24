# 07: Safe persisted-data versioning and migration

**What to build:** Persisted application data is versioned, validated, migrated when supported, and safely reset when it is invalid or incompatible.

**Blocked by:** 02: Create and persist structured alerts

**Status:** ready-for-agent

- [ ] Persisted data includes a schema version.
- [ ] Current valid alert and notification data loads after refresh.
- [ ] A supported older data version migrates to the current structure.
- [ ] Malformed or unsupported data is replaced with safe defaults.
- [ ] Invalid persisted data never crashes the application.
- [ ] Storage behavior is covered by focused validation checks.
