# ITC-45 - Waste-heat useful-energy recovery

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| doe_measur | Waste Heat Recovery Engineering Calculation | STD-DOE-MEASUR | Waste-stream flow from a nameplate, measurement, audit, or contractor specification; Waste-stream temperature from a nameplate, measurement, audit, or contractor specification; Waste-stream schedule; Coincident Useful-Heat Load; Recovery-equipment efficiency from a nameplate, measurement, audit, or contractor specification; Displaced heating-system efficiency from a nameplate, measurement, audit, or contractor specification; Recovery auxiliary power | Annual available waste heat; Annual useful recovered heat; Annual recovery auxiliary electricity | available_waste_heat; useful_recovered_heat; added_auxiliary_kWh | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation. |

## End-to-end graph

- `doe_measur`: Waste-stream flow from a nameplate, measurement, audit, or contractor specification [Project Document] + Waste-stream temperature from a nameplate, measurement, audit, or contractor specification [Project Document] + Waste-stream schedule [User] + Coincident Useful-Heat Load [Project Document] + Recovery-equipment efficiency from a nameplate, measurement, audit, or contractor specification [Linked Opportunity] + Displaced heating-system efficiency from a nameplate, measurement, audit, or contractor specification [Project Document] + Recovery auxiliary power [Linked Opportunity] -> STD-DOE-MEASUR -> model_versions + model_input_schemas + calculation_assumptions + calculation_runs + calculation_warnings -> Annual available waste heat -> available_waste_heat (energy/year) + Annual useful recovered heat -> useful_recovered_heat (energy/year) + Annual recovery auxiliary electricity -> added_auxiliary_kWh (kWh/year)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
