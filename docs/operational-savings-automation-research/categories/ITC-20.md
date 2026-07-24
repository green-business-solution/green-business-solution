# ITC-20 - Fuel-cell electricity and fuel balance

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| operating_schedule | Fuel Cell Electricity Generation Annual Operating Hours | STD-OPERATING-SCHEDULE | Recognizable Business, Shift, Seasonal, or Usage Pattern; Detailed Operating Days, Shifts, or Active Season, if known; Measured Annual Operating Hours, if known; Site Location and Business Activity | Annual operating hours | annual_operating_hours | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists. |
| epa_chp_performance | Fuel Cell Electricity Generation Performance Balance | STD-EPA-CHP-PERFORMANCE | Prime-mover type; Input fuel; Selected Unit Model, if known; Total installed capacity; Operating load fraction from an uploaded site study, controls trend, or engineering audit; Coincident Onsite Electric Load, if known; Annual operating hours from the connected schedule process | Annual electricity generation; Annual input fuel | annual_generation; added_fuel | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official technology pages, efficiency method, and calculator download were checked. The category adapter and retained source fixture are still absent, and the source does not identify an exact unit or supply site capacity, schedule, or thermal coincidence. |

## End-to-end graph

- `operating_schedule`: Recognizable Business, Shift, Seasonal, or Usage Pattern [User] + Detailed Operating Days, Shifts, or Active Season, if known [User] + Measured Annual Operating Hours, if known [Project Document] + Site Location and Business Activity [Profile] -> STD-OPERATING-SCHEDULE -> calculation_assumptions + benchmark_values + model_input_schemas -> Annual operating hours -> annual_operating_hours (hours/year)
- `epa_chp_performance`: Prime-mover type [Linked Opportunity] + Input fuel [Linked Opportunity] + Selected Unit Model, if known [Linked Opportunity] + Total installed capacity [Linked Opportunity] + Operating load fraction from an uploaded site study, controls trend, or engineering audit [Project Document] + Coincident Onsite Electric Load, if known [Project Document] + Annual operating hours from the connected schedule process [Standard Output] -> STD-EPA-CHP-PERFORMANCE -> equipment_performance_fields + benchmark_populations + benchmark_values + calculation_assumptions -> Annual electricity generation -> annual_generation (kWh/year) + Annual input fuel -> added_fuel (fuel-unit/year)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
