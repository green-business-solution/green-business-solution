# ITC-30 - Forklift resource switching

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| operating_schedule | Electric Forklift or Material Handling Equipment Annual Operating Hours | STD-OPERATING-SCHEDULE | Recognizable Business, Shift, Seasonal, or Usage Pattern; Detailed Operating Days, Shifts, or Active Season, if known; Measured Annual Operating Hours, if known; Site Location and Business Activity | Annual operating hours | annual_hours | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists. |
| context_benchmarks | Material-Handling Resource-Intensity Resolver | STD-CONTEXT-BENCHMARKS | Exact measured or contractual hourly resource use from a Project Document; Equipment class and rated capacity; Fuel or electric propulsion type; Comparable operating duty; Annual operating hours from the connected schedule process | One compatible existing fuel-use intensity; One compatible proposed wall-electricity intensity | existing_fuel_per_hour; proposed_kWh_per_hour | PARTIALLY_FEASIBLE | 0 | The retained Argonne fixture proves a 5,000-pound electric forklift value of 7.5 kWh per operating hour and a paired propane value of 1.38 gallons per operating hour, plus separate useful-work intensities. The broad category remains blocked outside exact project inputs or this compatible record because the report documents material usage variability and limited operating data. No category calculation golden fixture is retained, so end-to-end execution proof remains pending. |

## End-to-end graph

- `operating_schedule`: Recognizable Business, Shift, Seasonal, or Usage Pattern [User] + Detailed Operating Days, Shifts, or Active Season, if known [User] + Measured Annual Operating Hours, if known [Project Document] + Site Location and Business Activity [Profile] -> STD-OPERATING-SCHEDULE -> calculation_assumptions + benchmark_values + model_input_schemas -> Annual operating hours -> annual_hours (hours/year)
- `context_benchmarks`: Exact measured or contractual hourly resource use from a Project Document [Project Document] + Equipment class and rated capacity [User] + Fuel or electric propulsion type [User] + Comparable operating duty [User] + Annual operating hours from the connected schedule process [Standard Output] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One compatible existing fuel-use intensity -> existing_fuel_per_hour (fuel-unit/hour) + One compatible proposed wall-electricity intensity -> proposed_kWh_per_hour (kWh/hour)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK, PARTIALLY_FEASIBLE.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
