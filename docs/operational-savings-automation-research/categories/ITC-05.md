# ITC-05 - Duct loss reduction

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| scout_ecm_screen | Building Measure Performance Screen | STD-SCOUT-ECM-SCREEN | HVAC share of billed resource, if known [Project Document]; Existing building vintage class [User]; Existing duct location and condition [User]; Proposed sealing and insulation scope [Linked Opportunity]; Building Type [Profile]; Site Climate Zone [Profile] | Documented resource-reduction factor for the approved measure and market segment, with source version and units -> duct_loss_reduction_fraction (fraction; PROJECT_TOTAL) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| scout_ecm_screen | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/scout/run.mjs | scout-offline-crosswalk-proof: PASSED; scripts/research/operational-savings/tests/scout-real.test.mjs :: requires offline mode and an independently reviewed crosswalk<br>scout-pinned-source-gap-audit: PASSED; scripts/research/operational-savings/tests/scout-real.test.mjs :: proves the pinned source inventory cannot supply ITC-05 or ITC-11 | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `scout_ecm_screen`: HVAC share of billed resource, if known [Project Document] + Existing building vintage class [User] + Existing duct location and condition [User] + Proposed sealing and insulation scope [Linked Opportunity] + Building Type [Profile] + Site Climate Zone [Profile] -> STD-SCOUT-ECM-SCREEN -> building_upgrade_measures + retrofit_measure_crosswalks + benchmark_populations + benchmark_values + model_versions -> Documented resource-reduction factor for the approved measure and market segment, with source version and units -> duct_loss_reduction_fraction (fraction)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| scout_ecm_screen | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
