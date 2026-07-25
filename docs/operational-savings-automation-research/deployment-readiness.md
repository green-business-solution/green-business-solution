# Deployment readiness

No deployment is performed by this research branch.

## Per-Standard gate

Every Standard must satisfy all of the following before a production connection is proposed:

- The acquisition method works from a clean environment.
- The source and artifact license have completed review.
- The source schema and unit mapping are pinned.
- The raw artifact checksum and byte size are retained.
- The normalized internal schema is implemented and migrated through the normal review process.
- The adapter is implemented against the shared typed interface.
- The exact path is tested.
- The requirements and benchmark paths are tested when they are allowed.
- Unsupported fallback levels return typed unavailable results.
- Units and resource boundaries are validated.
- Complete selected-value provenance is stored.
- Refresh, schema-drift detection, quarantine, and rollback are implemented.
- The estimate succeeds with network access disabled.
- Every enabled category golden fixture passes.
- Monitoring, freshness thresholds, warning escalation, and operator ownership are defined.

## Current research readiness

| Standard | Research verdict | Production blocker |
| --- | --- | --- |
| STD-COMSTOCK-ANNUAL-DELTA | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-SCOUT-ECM-SCREEN | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-DOE-CCMS-RATINGS | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No genuine official export reaches the complete source-to-Standard gate set, so an access probe or planned operator workflow is not counted as a manual seed. |
| STD-ENERGY-STAR-PRODUCT-DATA | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-DOE-MEASUR | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-SAM-SOLAR-THERMAL | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-PVWATTS-V8 | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-WIND-SAM | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-INTERVAL-TARIFF | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-REOPT-LOCAL-DISPATCH | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-EPA-CHP-PERFORMANCE | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-FUELECONOMY-VEHICLES | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-WATERSENSE-FIXTURES | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No genuine official export reaches the complete source-to-Standard gate set, so an access probe or planned operator workflow is not counted as a manual seed. |
| STD-WATERSENSE-LANDSCAPE | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-WATERSENSE-CI-OPERATIONS | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-FEMP-EXTERIOR-LIGHTING | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-OPERATING-SCHEDULE | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-DISHWASHER-WATER-HEATING | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |
| STD-CONTEXT-BENCHMARKS | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary. |

## Staging and rollout

Stage 1 imports one nonproduction source release and compares checksums, schemas, counts, enumerations, null rates, and duplicates.
Stage 2 runs adapters against retained source fixtures with network disabled.
Stage 3 runs category golden fixtures and bill or project-document reconciliation where applicable.
Stage 4 shadows calculations without showing results to customers and records latency, warnings, fallback levels, and overlap conflicts.
Stage 5 enables a narrow exact-input path for an internal cohort.
Stage 6 expands by source family only after freshness, rollback, and warning-service objectives are met.

Rollback selects the prior published source or adapter version and never mutates historical calculations.
