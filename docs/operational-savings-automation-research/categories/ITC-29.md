# ITC-29 - Light-duty vehicle resource switching

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| fueleconomy_vehicles | Exact Vehicle Efficiency Lookup | STD-FUELECONOMY-VEHICLES | Existing vehicle make and model; Proposed vehicle make and model; Existing approximate model year; Proposed approximate model year; Existing version or drivetrain details only when needed to resolve an ambiguous match; Proposed version or drivetrain details only when needed to resolve an ambiguous match | Existing combined fuel economy; Proposed electricity use at the wall | existing_combined_mpg; proposed_combE | FEASIBLE_NOW | 0 | The official downloadable schema and the two exact vehicle records were checked. The retained fixture validates record identity, efficiency fields, units, source version, and the exact-model golden calculation of $1,617 per year. Class-based estimates remain disabled because no compatible population and sample-size fixture has been reviewed. |

## End-to-end graph

- `fueleconomy_vehicles`: Existing vehicle make and model [User] + Proposed vehicle make and model [Linked Opportunity] + Existing approximate model year [User] + Proposed approximate model year [Linked Opportunity] + Existing version or drivetrain details only when needed to resolve an ambiguous match [User] + Proposed version or drivetrain details only when needed to resolve an ambiguous match [Linked Opportunity] -> STD-FUELECONOMY-VEHICLES -> equipment_products + equipment_performance_fields + product_taxonomy_crosswalks -> Existing combined fuel economy -> existing_combined_mpg (miles/gallon) + Proposed electricity use at the wall -> proposed_combE (kWh/100 miles)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_NOW.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
