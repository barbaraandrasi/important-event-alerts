# 07: Safe persisted-data versioning and migration

**What to build:** Persisted application data is versioned, validated, migrated when supported, and safely reset when it is invalid or incompatible.

**Blocked by:** 02: Create and persist structured alerts

**Status:** implemented

- [x] Persisted data includes a schema version.
- [x] Current valid alert and notification data loads after refresh.
- [x] A supported older data version migrates to the current structure.
- [x] Malformed or unsupported data is replaced with safe defaults.
- [x] Invalid persisted data never crashes the application.
- [x] Storage behavior is covered by focused validation checks.
