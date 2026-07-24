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
| STD-COMSTOCK-ANNUAL-DELTA | FEASIBLE_AFTER_ADAPTER_WORK | Project-specific equipment performance, combined upgrade arithmetic, and any percentile without retained population size and weights |
| STD-SCOUT-ECM-SCREEN | FEASIBLE_AFTER_ADAPTER_WORK | Keyword-selected measures, prospective assumptions without review, and generic savings factors applied outside the source market |
| STD-DOE-CCMS-RATINGS | FEASIBLE_AFTER_MANUAL_SEED | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| STD-ENERGY-STAR-PRODUCT-DATA | FEASIBLE_NOW | Unknown installed-equipment baselines and cross-family field assumptions |
| STD-DOE-MEASUR | FEASIBLE_AFTER_ADAPTER_WORK | Generic MEASUR calls, inferred equipment design inputs, or reuse of one module's output contract for another module |
| STD-SAM-SOLAR-THERMAL | FEASIBLE_AFTER_ADAPTER_WORK | Automatic system sizing, missing draw profiles, and pool-specific or otherwise incompatible thermal systems |
| STD-PVWATTS-V8 | FEASIBLE_AFTER_ADAPTER_WORK | System sizing, tariff value, missing geometry, and assumed losses presented as source outputs |
| STD-WIND-SAM | FEASIBLE_AFTER_ADAPTER_WORK | Turbine selection, hub-height inference, and generic statewide wind production |
| STD-INTERVAL-TARIFF | FEASIBLE_AFTER_ADAPTER_WORK | Raw historical URDB records treated as current, missing ratchets or non-bypassable charges, and tariff selection based only on geography |
| STD-REOPT-LOCAL-DISPATCH | FEASIBLE_AFTER_ADAPTER_WORK | Incomplete tariff screens represented as detailed optimization and inferred charging or storage constraints |
| STD-EPA-CHP-PERFORMANCE | FEASIBLE_AFTER_ADAPTER_WORK | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |
| STD-FUELECONOMY-VEHICLES | FEASIBLE_NOW | Arbitrary class medians without population review and commercial fleet duty not represented by light-duty labels |
| STD-WATERSENSE-FIXTURES | FEASIBLE_AFTER_MANUAL_SEED | Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency |
| STD-WATERSENSE-LANDSCAPE | FEASIBLE_AFTER_ADAPTER_WORK | Real-time irrigation scheduling, actual measured water use, and missing landscape design inputs |
| STD-WATERSENSE-CI-OPERATIONS | PARTIALLY_FEASIBLE | Default leak rates, default duration, and automatic savings from a checklist item alone |
| STD-FEMP-EXTERIOR-LIGHTING | FEASIBLE_NOW | Existing fixture wattage inferred from FEMP proposed-efficiency requirements |
| STD-OPERATING-SCHEDULE | FEASIBLE_AFTER_ADAPTER_WORK | A generic building-type schedule presented as actual operation and daylight without coordinates or event definition |
| STD-DISHWASHER-WATER-HEATING | FEASIBLE_NOW | Treating all machine water as hot water without the building and booster boundary or converting flight gallons per hour to racks |
| STD-CONTEXT-BENCHMARKS | PARTIALLY_FEASIBLE | A universal fallback, a cross-category median, or any context process without a pinned population and exact selection rule |

## Staging and rollout

Stage 1 imports one nonproduction source release and compares checksums, schemas, counts, enumerations, null rates, and duplicates.
Stage 2 runs adapters against retained source fixtures with network disabled.
Stage 3 runs category golden fixtures and bill or project-document reconciliation where applicable.
Stage 4 shadows calculations without showing results to customers and records latency, warnings, fallback levels, and overlap conflicts.
Stage 5 enables a narrow exact-input path for an internal cohort.
Stage 6 expands by source family only after freshness, rollback, and warning-service objectives are met.

Rollback selects the prior published source or adapter version and never mutates historical calculations.
