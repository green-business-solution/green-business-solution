# ITC-01 - ComStock archetype annual resource delta

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| comstock_annual_delta | Commercial Building Upgrade Resource Model | STD-COMSTOCK-ANNUAL-DELTA | Existing Building Condition; Proposed Upgrade Option; Building Type; Site State or County; Building Area, approximate unless subsequently verified | Annual electricity and fuel-use change per square foot for the approved measure and building segment, with source version and units | median_ComStock_delta_r_per_ft² | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official release pages, upgrade documentation, and reference method were checked. A retained aggregate fixture and reviewed category crosswalk do not yet exist, so this process cannot currently return a project estimate or claim project-specific equipment performance. |

## End-to-end graph

- `comstock_annual_delta`: Existing Building Condition [User] + Proposed Upgrade Option [Linked Opportunity] + Building Type [Profile] + Site State or County [Profile] + Building Area, approximate unless subsequently verified [Profile] -> STD-COMSTOCK-ANNUAL-DELTA -> building_upgrade_measures + building_archetype_benchmarks + retrofit_measure_crosswalks + benchmark_populations + benchmark_values -> Annual electricity and fuel-use change per square foot for the approved measure and building segment, with source version and units -> median_ComStock_delta_r_per_ft² (resource-unit/ft2-year)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
