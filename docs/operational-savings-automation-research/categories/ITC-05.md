# ITC-05 - Duct loss reduction

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| scout_ecm_screen | Building Measure Performance Screen | STD-SCOUT-ECM-SCREEN | HVAC share of billed resource, if known; Existing building vintage class; Existing duct location and condition; Proposed sealing and insulation scope; Building Type; Site Climate Zone | Documented resource-reduction factor for the approved measure and market segment, with source version and units | duct_loss_reduction_fraction | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official Scout program, summaries, and source repository were checked. The exact category crosswalk and performance-field fixtures remain unverified, so keyword matching and generic reduction defaults are not supported. |

## End-to-end graph

- `scout_ecm_screen`: HVAC share of billed resource, if known [Project Document] + Existing building vintage class [User] + Existing duct location and condition [User] + Proposed sealing and insulation scope [Linked Opportunity] + Building Type [Profile] + Site Climate Zone [Profile] -> STD-SCOUT-ECM-SCREEN -> building_upgrade_measures + retrofit_measure_crosswalks + benchmark_populations + benchmark_values + model_versions -> Documented resource-reduction factor for the approved measure and market segment, with source version and units -> duct_loss_reduction_fraction (fraction)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
