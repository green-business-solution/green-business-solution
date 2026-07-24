# ITC-49 - Walk-in refrigeration measured system delta

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| context_benchmarks | Walk-In Component Energy Benchmark | STD-CONTEXT-BENCHMARKS | Component type and DOE equipment class; Walk-in temperature class; Indoor or outdoor configuration; Panel area when a panel intensity is selected; Existing efficiency level from a Project Document; Proposed efficiency level from the linked opportunity | One class-matched existing annual component energy; One class-matched proposed annual component energy | current_annual_refrigeration_kWh; proposed_annual_refrigeration_kWh | PARTIALLY_FEASIBLE | 0 | The retained DOE fixture records reviewed class rows and native units from Tables IV.31, IV.32, and IV.33. It proves a class-matched component benchmark, not whole-box project energy. The category remains blocked when the component boundary, class filters, panel area, or same-duty project scope is unavailable. No category calculation golden fixture is retained, so end-to-end execution proof remains pending. |

## End-to-end graph

- `context_benchmarks`: Component type and DOE equipment class [User] + Walk-in temperature class [User] + Indoor or outdoor configuration [User] + Panel area when a panel intensity is selected [Project Document] + Existing efficiency level from a Project Document [Project Document] + Proposed efficiency level from the linked opportunity [Linked Opportunity] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One class-matched existing annual component energy -> current_annual_refrigeration_kWh (kWh/year) + One class-matched proposed annual component energy -> proposed_annual_refrigeration_kWh (kWh/year)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
