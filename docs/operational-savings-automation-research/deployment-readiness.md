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
| STD-COMSTOCK-ANNUAL-DELTA | FEASIBLE_NOW | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. |
| STD-SCOUT-ECM-SCREEN | PARTIALLY_FEASIBLE | At least one bound process is proved end to end, but the complete Standard process set is not. |
| STD-DOE-CCMS-RATINGS | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No genuine official export reaches the complete source-to-Standard gate set, so an access probe or planned operator workflow is not counted as a manual seed. |
| STD-ENERGY-STAR-PRODUCT-DATA | FEASIBLE_AFTER_ADAPTER_WORK | Real source evidence reaches a source-specific parser or Standard output, but no bound process is proved end to end. |
| STD-DOE-MEASUR | PARTIALLY_FEASIBLE | At least one bound process is proved end to end, but the complete Standard process set is not. |
| STD-SAM-SOLAR-THERMAL | FEASIBLE_NOW | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. |
| STD-PVWATTS-V8 | FEASIBLE_NOW | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. |
| STD-WIND-SAM | FEASIBLE_NOW | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. |
| STD-INTERVAL-TARIFF | FEASIBLE_NOW | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. |
| STD-REOPT-LOCAL-DISPATCH | PARTIALLY_FEASIBLE | At least one bound process is proved end to end, but the complete Standard process set is not. |
| STD-EPA-CHP-PERFORMANCE | FEASIBLE_NOW | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. |
| STD-FUELECONOMY-VEHICLES | FEASIBLE_NOW | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. |
| STD-WATERSENSE-FIXTURES | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | No genuine official export reaches the complete source-to-Standard gate set, so an access probe or planned operator workflow is not counted as a manual seed. |
| STD-WATERSENSE-LANDSCAPE | FEASIBLE_NOW | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. |
| STD-WATERSENSE-CI-OPERATIONS | PARTIALLY_FEASIBLE | At least one bound process is proved end to end, but the complete Standard process set is not. |
| STD-FEMP-EXTERIOR-LIGHTING | PARTIALLY_FEASIBLE | At least one bound process is proved end to end, but the complete Standard process set is not. |
| STD-OPERATING-SCHEDULE | PARTIALLY_FEASIBLE | At least one bound process is proved end to end, but the complete Standard process set is not. |
| STD-DISHWASHER-WATER-HEATING | FEASIBLE_NOW | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. |
| STD-CONTEXT-BENCHMARKS | PARTIALLY_FEASIBLE | At least one bound process is proved end to end, but the complete Standard process set is not. |

## Staging and rollout

Stage 1 imports one nonproduction source release and compares checksums, schemas, counts, enumerations, null rates, and duplicates.
Stage 2 runs adapters against retained source fixtures with network disabled.
Stage 3 runs category golden fixtures and bill or project-document reconciliation where applicable.
Stage 4 shadows calculations without showing results to customers and records latency, warnings, fallback levels, and overlap conflicts.
Stage 5 enables a narrow exact-input path for an internal cohort.
Stage 6 expands by source family only after freshness, rollback, and warning-service objectives are met.

Rollback selects the prior published source or adapter version and never mutates historical calculations.
