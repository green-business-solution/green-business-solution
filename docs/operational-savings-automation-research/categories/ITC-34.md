# ITC-34 - Landscape water-budget reduction

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| watersense_landscape | Landscape Water Budget Calculation | STD-WATERSENSE-LANDSCAPE | Approximate Landscape Area for Each Hydrozone [User]; Recognizable Plant or Landscape Type for Each Hydrozone [User]; Irrigation method [User]; Irrigation efficiency, if known from a nameplate, measurement, audit, or contractor specification [Project Document]; Controller treatment [User]; Site ZIP Code [Profile] | Baseline annual design water allowance -> baseline_design_allowance_gallons (gallons/year; PROJECT_TOTAL); Proposed annual design water allowance -> proposed_design_allowance_gallons (gallons/year; PROJECT_TOTAL) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| watersense_landscape | END_TO_END_REAL | scripts/research/operational-savings/adapters/watersense-landscape/run.mjs | watersense-landscape-header-failure-proof: PASSED; scripts/research/operational-savings/tests/watersense-landscape-real.test.mjs :: fails closed when an observed native header drifts<br>watersense-landscape-input-failure-proof: PASSED; scripts/research/operational-savings/tests/watersense-landscape-real.test.mjs :: rejects missing Version 2.0 inputs and incompatible project units<br>watersense-landscape-real-workbook-proof: PASSED; scripts/research/operational-savings/tests/watersense-landscape-real.test.mjs :: executes the exact reviewed Version 2.0 method and reaches both ITC-34 terms | None |

## End-to-end graph

- `watersense_landscape`: Approximate Landscape Area for Each Hydrozone [User] + Recognizable Plant or Landscape Type for Each Hydrozone [User] + Irrigation method [User] + Irrigation efficiency, if known from a nameplate, measurement, audit, or contractor specification [Project Document] + Controller treatment [User] + Site ZIP Code [Profile] -> STD-WATERSENSE-LANDSCAPE -> climate_crosswalks + geographic_crosswalks + benchmark_values + calculation_assumptions -> Baseline annual design water allowance -> baseline_design_allowance_gallons (gallons/year) + Proposed annual design water allowance -> proposed_design_allowance_gallons (gallons/year)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_NOW.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| watersense_landscape | END_TO_END_REAL | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
