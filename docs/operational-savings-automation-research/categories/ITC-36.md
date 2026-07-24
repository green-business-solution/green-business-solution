# ITC-36 - Cooling-tower water and fan optimization

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| watersense_ci_operations | WaterSense Commercial Operations Calculation | STD-WATERSENSE-CI-OPERATIONS | Existing cycles of concentration; Proposed cycles of concentration; Annual evaporation or equivalent heat rejection | Annual avoided cooling-tower makeup water | avoided_makeup_gallons | PARTIALLY_FEASIBLE | 0 | The official commercial best-practice and facility-tool pages were checked. Exact page, equation, and worked-example fixtures have not yet been retained, so the process cannot use generic site defaults or claim an executable default path. |
| doe_measur | Cooling Tower Optimization Engineering Calculation | STD-DOE-MEASUR | Existing cycles of concentration; Proposed cycles of concentration; Annual evaporation or equivalent heat rejection; Existing fan control profile; Proposed fan control profile | Annual avoided cooling-tower fan electricity | avoided_fan_kWh | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation. |

## End-to-end graph

- `watersense_ci_operations`: Existing cycles of concentration [Project Document] + Proposed cycles of concentration [Linked Opportunity] + Annual evaporation or equivalent heat rejection [Project Document] -> STD-WATERSENSE-CI-OPERATIONS -> calculation_assumptions + calculation_runs + selected_value_provenance -> Annual avoided cooling-tower makeup water -> avoided_makeup_gallons (gallons/year)
- `doe_measur`: Existing cycles of concentration [Project Document] + Proposed cycles of concentration [Linked Opportunity] + Annual evaporation or equivalent heat rejection [Project Document] + Existing fan control profile [Project Document] + Proposed fan control profile [Linked Opportunity] -> STD-DOE-MEASUR -> model_versions + model_input_schemas + calculation_assumptions + calculation_runs + calculation_warnings -> Annual avoided cooling-tower fan electricity -> avoided_fan_kWh (kWh/year)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE, FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
