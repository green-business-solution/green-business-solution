# ITC-54 - Backup-power routine resource use

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| exact-backup-routine-inputs | Exact Backup-Power Routine-Use Input Resolution | STD-CONTEXT-BENCHMARKS | Tested fuel use per operating hour per unit; Scheduled annual test operating hours per unit; Standby electric input kilowatts per unit; Annual standby energized hours per unit | One exact backup-power routine-use input set | exact_backup_routine_input_set | PARTIALLY_FEASIBLE | 0 | The exact path is deterministic when compatible Project Documents supply the required fields. No category golden fixture is retained, so implementation proof remains pending. |
| fema-full-load-diesel-test-fuel | FEMA Full-Load Diesel Test-Fuel Calculation | STD-CONTEXT-BENCHMARKS | Confirmed diesel-generator technology and fuel type; Diesel generator rated capacity in kilowatts; Scheduled annual full-load test operating hours per unit | Annual full-load diesel test fuel per equipment unit | benchmark_annual_test_fuel_per_unit | PARTIALLY_FEASIBLE | 0 | The retained FEMA page and deep source fixture prove the 0.07 full-load diesel coefficient and formula. The source does not supply annual test hours or standby electricity, and no category golden fixture is retained, so only the narrow formula is verified while full category execution remains pending. |

## End-to-end graph

- `exact-backup-routine-inputs`: Tested fuel use per operating hour per unit [Project Document] + Scheduled annual test operating hours per unit [Project Document] + Standby electric input kilowatts per unit [Project Document] + Annual standby energized hours per unit [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One exact backup-power routine-use input set -> exact_backup_routine_input_set (record set)
- `fema-full-load-diesel-test-fuel`: Confirmed diesel-generator technology and fuel type [User] + Diesel generator rated capacity in kilowatts [Project Document] + Scheduled annual full-load test operating hours per unit [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> Annual full-load diesel test fuel per equipment unit -> benchmark_annual_test_fuel_per_unit (fuel-unit/year)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
