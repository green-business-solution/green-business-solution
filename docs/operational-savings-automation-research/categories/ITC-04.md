# ITC-04 - Boiler control fractional fuel reduction

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| doe_measur | Boiler Controls and Burner Improvements Engineering Calculation | STD-DOE-MEASUR | Boiler share of billed fuel; Existing control sequence; Proposed control sequence | Baseline annual boiler fuel; Proposed annual boiler fuel | baseline_annual_fuel; proposed_annual_fuel | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation. |

## End-to-end graph

- `doe_measur`: Boiler share of billed fuel [Bill] + Existing control sequence [Project Document] + Proposed control sequence [Project Document] -> STD-DOE-MEASUR -> model_versions + model_input_schemas + calculation_assumptions + calculation_runs + calculation_warnings -> Baseline annual boiler fuel -> baseline_annual_fuel (therms/year) + Proposed annual boiler fuel -> proposed_annual_fuel (therms/year)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
