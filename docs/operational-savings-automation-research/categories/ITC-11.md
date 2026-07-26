# ITC-11 - Refrigeration control fractional reduction

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| scout_ecm_screen | Building Measure Performance Screen | STD-SCOUT-ECM-SCREEN | Affected-load share, if known [Project Document]; Existing building vintage class [User]; Existing condition or control [User]; Proposed scope or sequence [Linked Opportunity]; Building Type [Profile]; Site Climate Zone [Profile] | Documented resource-reduction factor for the approved measure and market segment, with source version and units -> reduction_fraction (fraction; PROJECT_TOTAL) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| scout_ecm_screen | SOURCE_UNSUPPORTED | scripts/research/operational-savings/adapters/scout/run.mjs | scout-offline-crosswalk-proof: PASSED; scripts/research/operational-savings/tests/scout-real.test.mjs :: requires offline mode and an independently reviewed crosswalk<br>scout-pinned-source-gap-audit: PASSED; scripts/research/operational-savings/tests/scout-real.test.mjs :: proves the pinned source inventory cannot supply ITC-05 or ITC-11 | REMAINING_BLOCKER: The pinned Scout ECM inventory contains whole-equipment refrigeration efficiency measures but no compatible refrigeration-control ECM that supplies the required fractional control reduction. |

## End-to-end graph

- `scout_ecm_screen`: Affected-load share, if known [Project Document] + Existing building vintage class [User] + Existing condition or control [User] + Proposed scope or sequence [Linked Opportunity] + Building Type [Profile] + Site Climate Zone [Profile] -> STD-SCOUT-ECM-SCREEN -> building_upgrade_measures + retrofit_measure_crosswalks + benchmark_populations + benchmark_values + model_versions -> Documented resource-reduction factor for the approved measure and market segment, with source version and units -> reduction_fraction (fraction)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| scout_ecm_screen | SOURCE_UNSUPPORTED | Revise the source strategy or keep the card path explicitly unsupported before implementation. REMAINING_BLOCKER: The pinned Scout ECM inventory contains whole-equipment refrigeration efficiency measures but no compatible refrigeration-control ECM that supplies the required fractional control reduction. |
