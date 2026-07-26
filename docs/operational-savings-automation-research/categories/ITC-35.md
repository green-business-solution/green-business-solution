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
| watersense_ci_operations | END_TO_END_REAL | scripts/research/operational-savings/adapters/watersense-ci/run.mjs | watersense-ci-native-unit-failure-proof: PASSED; scripts/research/operational-savings/tests/watersense-ci-real.test.mjs :: fails closed on a mutated native unit contract<br>watersense-ci-offline-proof: PASSED; scripts/research/operational-savings/tests/watersense-ci-real.test.mjs :: requires the offline runtime guard<br>watersense-ci-real-workbook-proof: PASSED; scripts/research/operational-savings/tests/watersense-ci-real.test.mjs :: executes the measured flow-duration method and reaches both ITC-35 terms | None |

## End-to-end graph

- `watersense_ci_operations`: Measured leak flow from a nameplate, measurement, audit, or contractor specification [Project Document] + Confirmed leak start date [User] -> STD-WATERSENSE-CI-OPERATIONS -> calculation_assumptions + calculation_runs + selected_value_provenance -> Measured leak flow -> measured_leak_gpm (gallons/minute) + Confirmed annual leak duration -> confirmed_leak_minutes_per_year (minutes/year)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| watersense_ci_operations | END_TO_END_REAL | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
