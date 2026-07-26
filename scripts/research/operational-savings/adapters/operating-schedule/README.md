# Operating-schedule real proof

This adapter separates acquisition from runtime execution.
It retains a checksummed U.S. Naval Observatory one-day GeoJSON response, extracts the observed solar-event schema, and compares a documented NOAA-style deterministic solar calculation against the official times.

The calendar engine enumerates local dates and converts every interval boundary through an IANA time zone.
It supports weekly intervals, overnight intervals, supplied holidays, date-specific exceptions, and selected ISO active weeks.
Elapsed time follows daylight-saving transitions rather than assuming every day contains 24 hours.

Acquire the official comparison artifact:

```bash
node scripts/research/operational-savings/adapters/operating-schedule/acquire.mjs \
  scripts/research/operational-savings/.cache/artifacts/usno-sf-2026-06-21.json
```

Run offline tests:

```bash
OS_RESEARCH_NETWORK=disabled npx vitest run \
  scripts/research/operational-savings/tests/operating-schedule-real.test.mjs
```

The USNO comparison demonstrates only the astronomy-model boundary.
It does not supply a project schedule, location, control setting, or annual operating-hours value.

Weekly schedules, exceptions, holidays, active weeks, and site inputs remain project-owned or profile-owned calculation inputs.
Each calculation stores a SHA-256 hash of its exact normalized input and records `NULL` for both the primary source artifact and source release.
Daylight calculations add the pinned USNO response as a separate `astronomy_model_validation` dependency.
Fixed schedules and schedule differences have no USNO dependency.

The source-controlled `project-schedule-fixtures.v1.json` file supplies compact synthetic regression cases.
Those cases prove branch execution, input hashing, database publication, and failure behavior, but they are not production schedules or external source artifacts.
This proof does not invent a benchmark schedule for a building that lacks one.
