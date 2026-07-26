# ITC-01 - ComStock archetype annual resource delta

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| comstock_annual_delta | Commercial Building Upgrade Resource Model | STD-COMSTOCK-ANNUAL-DELTA | Existing Building Condition [User]; Proposed Upgrade Option [Linked Opportunity]; Building Type [Profile]; Site State or County [Profile]; Building Area, approximate unless subsequently verified [Profile] | Annual electricity and fuel-use change per square foot for the approved measure and building segment, with source version and units -> median_ComStock_delta_r_per_ft² (resource-unit/ft2-year; PER_YEAR) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| comstock_annual_delta | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/comstock/run.mjs | comstock-artifact-network-failure-proof: PASSED; scripts/research/operational-savings/tests/comstock-real.test.mjs :: rejects changed artifacts and attempted runtime network access<br>comstock-real-release-3-annual-delta-proof: PASSED; scripts/research/operational-savings/tests/comstock-real.test.mjs :: joins real baseline and LED rows, applies release weights, and publishes the ITC-01 output offline<br>comstock-resolution-failure-proof: PASSED; scripts/research/operational-savings/tests/comstock-real.test.mjs :: rejects mixed releases, insufficient populations, duplicates, and ambiguous resolution<br>comstock-schema-failure-proof: PASSED; scripts/research/operational-savings/tests/comstock-real.test.mjs :: fails closed on schema drift, missing columns, and incompatible units | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `comstock_annual_delta`: Existing Building Condition [User] + Proposed Upgrade Option [Linked Opportunity] + Building Type [Profile] + Site State or County [Profile] + Building Area, approximate unless subsequently verified [Profile] -> STD-COMSTOCK-ANNUAL-DELTA -> building_upgrade_measures + building_archetype_benchmarks + retrofit_measure_crosswalks + benchmark_populations + benchmark_values -> Annual electricity and fuel-use change per square foot for the approved measure and building segment, with source version and units -> median_ComStock_delta_r_per_ft² (resource-unit/ft2-year)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| comstock_annual_delta | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
