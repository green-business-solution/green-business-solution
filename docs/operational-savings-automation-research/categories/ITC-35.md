# ITC-35 - Measured leak avoidance

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| watersense_ci_operations | WaterSense Commercial Operations Calculation | STD-WATERSENSE-CI-OPERATIONS | Measured leak flow from a nameplate, measurement, audit, or contractor specification; Confirmed leak start date | Measured leak flow; Confirmed annual leak duration | measured_leak_gpm; confirmed_leak_minutes_per_year | PARTIALLY_FEASIBLE | 0 | The official commercial best-practice and facility-tool pages were checked. Exact page, equation, and worked-example fixtures have not yet been retained, so the process cannot use generic site defaults or claim an executable default path. |

## End-to-end graph

- `watersense_ci_operations`: Measured leak flow from a nameplate, measurement, audit, or contractor specification [Project Document] + Confirmed leak start date [User] -> STD-WATERSENSE-CI-OPERATIONS -> calculation_assumptions + calculation_runs + selected_value_provenance -> Measured leak flow -> measured_leak_gpm (gallons/minute) + Confirmed annual leak duration -> confirmed_leak_minutes_per_year (minutes/year)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
