# ITC-35 - Measured leak avoidance

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| watersense_ci_operations | WaterSense Commercial Operations Calculation | STD-WATERSENSE-CI-OPERATIONS | Measured leak flow from a nameplate, measurement, audit, or contractor specification [Project Document]; Confirmed leak start date [User] | Measured leak flow -> measured_leak_gpm (gallons/minute; PROJECT_TOTAL); Confirmed annual leak duration -> confirmed_leak_minutes_per_year (minutes/year; PER_YEAR) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| watersense_ci_operations | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/watersense-ci/run.mjs | watersense-ci-native-unit-failure-proof: NOT_COVERED<br>watersense-ci-offline-proof: NOT_COVERED<br>watersense-ci-real-workbook-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `watersense_ci_operations`: Measured leak flow from a nameplate, measurement, audit, or contractor specification [Project Document] + Confirmed leak start date [User] -> STD-WATERSENSE-CI-OPERATIONS -> calculation_assumptions + calculation_runs + selected_value_provenance -> Measured leak flow -> measured_leak_gpm (gallons/minute) + Confirmed annual leak duration -> confirmed_leak_minutes_per_year (minutes/year)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| watersense_ci_operations | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
