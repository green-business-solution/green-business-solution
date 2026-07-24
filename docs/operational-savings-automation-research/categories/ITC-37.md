# ITC-37 - Demand-controlled kitchen ventilation

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| operating_schedule | Demand-Controlled Kitchen Ventilation Annual Operating Hours | STD-OPERATING-SCHEDULE | Existing airflow schedule from a nameplate, measurement, audit, or contractor specification; Proposed airflow schedule from a nameplate, measurement, audit, or contractor specification; Recognizable Business, Shift, Seasonal, or Usage Pattern; Detailed Operating Days, Shifts, or Active Season, if known; Measured Annual Operating Hours, if known; Site Location for outdoor conditions; Site Location and Business Activity | Operating hours by modeled period | hours_period | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists. |
| doe_measur | Demand-Controlled Kitchen Ventilation Engineering Calculation | STD-DOE-MEASUR | In-Scope Equipment Count; Existing Fan Nameplate or Measured Input; Existing Design Airflow from a nameplate, measurement, audit, or contractor specification; Makeup-air heating system; Makeup-air cooling system; Annual operating hours from the connected schedule process | Existing fan input power by modeled period; Proposed fan input power by modeled period | existing_fan_kW_period; proposed_fan_kW_period | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation. |

## End-to-end graph

- `operating_schedule`: Existing airflow schedule from a nameplate, measurement, audit, or contractor specification [Project Document] + Proposed airflow schedule from a nameplate, measurement, audit, or contractor specification [Linked Opportunity] + Recognizable Business, Shift, Seasonal, or Usage Pattern [User] + Detailed Operating Days, Shifts, or Active Season, if known [User] + Measured Annual Operating Hours, if known [Project Document] + Site Location for outdoor conditions [Profile] + Site Location and Business Activity [Profile] -> STD-OPERATING-SCHEDULE -> calculation_assumptions + benchmark_values + model_input_schemas -> Operating hours by modeled period -> hours_period (hours/period)
- `doe_measur`: In-Scope Equipment Count [User] + Existing Fan Nameplate or Measured Input [Project Document] + Existing Design Airflow from a nameplate, measurement, audit, or contractor specification [Project Document] + Makeup-air heating system [User] + Makeup-air cooling system [User] + Annual operating hours from the connected schedule process [Standard Output] -> STD-DOE-MEASUR -> model_versions + model_input_schemas + calculation_assumptions + calculation_runs + calculation_warnings -> Existing fan input power by modeled period -> existing_fan_kW_period (kW) + Proposed fan input power by modeled period -> proposed_fan_kW_period (kW)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
