# ITC-36 - Cooling-tower water and fan optimization

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| watersense_ci_operations | WaterSense Commercial Operations Calculation | STD-WATERSENSE-CI-OPERATIONS | Existing cycles of concentration [Project Document]; Proposed cycles of concentration [Linked Opportunity]; Annual evaporation or equivalent heat rejection [Project Document] | Annual avoided cooling-tower makeup water -> avoided_makeup_gallons (gallons/year; PROJECT_TOTAL) |
| doe_measur | Cooling Tower Optimization Engineering Calculation | STD-DOE-MEASUR | Existing cycles of concentration [Project Document]; Proposed cycles of concentration [Linked Opportunity]; Annual evaporation or equivalent heat rejection [Project Document]; Existing fan control profile [Project Document]; Proposed fan control profile [Linked Opportunity] | Annual avoided cooling-tower fan electricity -> avoided_fan_kWh (kWh/year; PROJECT_TOTAL) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| watersense_ci_operations | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/watersense-ci/run.mjs | watersense-ci-cooling-tower-unsupported-proof: NOT_COVERED<br>watersense-ci-native-unit-failure-proof: NOT_COVERED<br>watersense-ci-offline-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| doe_measur | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/doe-measur/equipment.mjs | doe-measur-equipment-drift-failure-proof: NOT_COVERED<br>doe-measur-equipment-input-failure-proof: NOT_COVERED<br>doe-measur-equipment-publication-proof: NOT_COVERED<br>doe-measur-real-equipment-native-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `watersense_ci_operations`: Existing cycles of concentration [Project Document] + Proposed cycles of concentration [Linked Opportunity] + Annual evaporation or equivalent heat rejection [Project Document] -> STD-WATERSENSE-CI-OPERATIONS -> calculation_assumptions + calculation_runs + selected_value_provenance -> Annual avoided cooling-tower makeup water -> avoided_makeup_gallons (gallons/year)
- `doe_measur`: Existing cycles of concentration [Project Document] + Proposed cycles of concentration [Linked Opportunity] + Annual evaporation or equivalent heat rejection [Project Document] + Existing fan control profile [Project Document] + Proposed fan control profile [Linked Opportunity] -> STD-DOE-MEASUR -> model_versions + model_input_schemas + calculation_assumptions + calculation_runs + calculation_warnings -> Annual avoided cooling-tower fan electricity -> avoided_fan_kWh (kWh/year)

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
| doe_measur | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
