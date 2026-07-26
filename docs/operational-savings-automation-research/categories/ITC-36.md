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
| watersense_ci_operations | SOURCE_UNSUPPORTED | scripts/research/operational-savings/adapters/watersense-ci/run.mjs | watersense-ci-cooling-tower-unsupported-proof: PASSED; scripts/research/operational-savings/tests/watersense-ci-real.test.mjs :: retains cooling-tower measurements and the absent numeric equation as blockers<br>watersense-ci-native-unit-failure-proof: PASSED; scripts/research/operational-savings/tests/watersense-ci-real.test.mjs :: fails closed on a mutated native unit contract<br>watersense-ci-offline-proof: PASSED; scripts/research/operational-savings/tests/watersense-ci-real.test.mjs :: requires the offline runtime guard | REMAINING_BLOCKER: The reviewed workbook identifies cooling-tower cycles, meters, controls, and conductivity-based blowdown, but it contains no numeric makeup-water equation or native units for existing cycles, proposed cycles, and annual evaporation. |
| doe_measur | END_TO_END_REAL | scripts/research/operational-savings/adapters/doe-measur/equipment.mjs | doe-measur-equipment-drift-failure-proof: PASSED; scripts/research/operational-savings/tests/doe-measur-real.test.mjs :: detects MEASUR equipment binding and golden-fixture drift<br>doe-measur-equipment-input-failure-proof: PASSED; scripts/research/operational-savings/tests/doe-measur-real.test.mjs :: rejects incomplete or incompatible MEASUR equipment inputs before native execution<br>doe-measur-equipment-publication-proof: PASSED; scripts/research/operational-savings/tests/doe-measur-real.test.mjs :: publishes all four native MEASUR equipment calculations with provenance<br>doe-measur-real-equipment-native-proof: PASSED; scripts/research/operational-savings/tests/doe-measur-real.test.mjs :: maps native MEASUR equipment outputs to the exact ITC-36, ITC-38, ITC-40, and ITC-41 terms | None |

## End-to-end graph

- `watersense_ci_operations`: Existing cycles of concentration [Project Document] + Proposed cycles of concentration [Linked Opportunity] + Annual evaporation or equivalent heat rejection [Project Document] -> STD-WATERSENSE-CI-OPERATIONS -> calculation_assumptions + calculation_runs + selected_value_provenance -> Annual avoided cooling-tower makeup water -> avoided_makeup_gallons (gallons/year)
- `doe_measur`: Existing cycles of concentration [Project Document] + Proposed cycles of concentration [Linked Opportunity] + Annual evaporation or equivalent heat rejection [Project Document] + Existing fan control profile [Project Document] + Proposed fan control profile [Linked Opportunity] -> STD-DOE-MEASUR -> model_versions + model_input_schemas + calculation_assumptions + calculation_runs + calculation_warnings -> Annual avoided cooling-tower fan electricity -> avoided_fan_kWh (kWh/year)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| watersense_ci_operations | SOURCE_UNSUPPORTED | Revise the source strategy or keep the card path explicitly unsupported before implementation. REMAINING_BLOCKER: The reviewed workbook identifies cooling-tower cycles, meters, controls, and conductivity-based blowdown, but it contains no numeric makeup-water equation or native units for existing cycles, proposed cycles, and annual evaporation. |
| doe_measur | END_TO_END_REAL | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
