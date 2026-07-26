# ITC-29 - Light-duty vehicle resource switching

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| fueleconomy_vehicles | Exact Vehicle Efficiency Lookup | STD-FUELECONOMY-VEHICLES | Existing vehicle make and model [User]; Proposed vehicle make and model [Linked Opportunity]; Existing approximate model year [User]; Proposed approximate model year [Linked Opportunity]; Existing version or drivetrain details only when needed to resolve an ambiguous match [User]; Proposed version or drivetrain details only when needed to resolve an ambiguous match [Linked Opportunity] | Existing combined fuel economy -> existing_combined_mpg (miles/gallon; PER_EQUIPMENT_UNIT); Proposed electricity use at the wall -> proposed_combE (kWh/100 miles; PER_EQUIPMENT_UNIT) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| fueleconomy_vehicles | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/fueleconomy/run.mjs | fueleconomy-incompatible-pair-failure-proof: NOT_COVERED<br>fueleconomy-offline-proof: NOT_COVERED<br>fueleconomy-real-bulk-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `fueleconomy_vehicles`: Existing vehicle make and model [User] + Proposed vehicle make and model [Linked Opportunity] + Existing approximate model year [User] + Proposed approximate model year [Linked Opportunity] + Existing version or drivetrain details only when needed to resolve an ambiguous match [User] + Proposed version or drivetrain details only when needed to resolve an ambiguous match [Linked Opportunity] -> STD-FUELECONOMY-VEHICLES -> equipment_products + equipment_performance_fields + product_taxonomy_crosswalks -> Existing combined fuel economy -> existing_combined_mpg (miles/gallon) + Proposed electricity use at the wall -> proposed_combE (kWh/100 miles)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| fueleconomy_vehicles | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
