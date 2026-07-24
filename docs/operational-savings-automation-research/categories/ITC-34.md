# ITC-34 - Landscape water-budget reduction

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| watersense_landscape | Landscape Water Budget Calculation | STD-WATERSENSE-LANDSCAPE | Approximate Landscape Area for Each Hydrozone; Recognizable Plant or Landscape Type for Each Hydrozone; Irrigation method; Irrigation efficiency, if known from a nameplate, measurement, audit, or contractor specification; Controller treatment; Site ZIP Code | Baseline annual design water allowance; Proposed annual design water allowance | baseline_design_allowance_gallons; proposed_design_allowance_gallons | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official Version 2.0 scope and equations were checked, and the retained fixture validates the design-method boundary. The tool compares designed allowances and does not prove actual existing consumption, irrigation scheduling, or whole-site bill allocation. The category adapter and formula-level golden test have not yet been added. |

## End-to-end graph

- `watersense_landscape`: Approximate Landscape Area for Each Hydrozone [User] + Recognizable Plant or Landscape Type for Each Hydrozone [User] + Irrigation method [User] + Irrigation efficiency, if known from a nameplate, measurement, audit, or contractor specification [Project Document] + Controller treatment [User] + Site ZIP Code [Profile] -> STD-WATERSENSE-LANDSCAPE -> climate_crosswalks + geographic_crosswalks + benchmark_values + calculation_assumptions -> Baseline annual design water allowance -> baseline_design_allowance_gallons (gallons/year) + Proposed annual design water allowance -> proposed_design_allowance_gallons (gallons/year)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
