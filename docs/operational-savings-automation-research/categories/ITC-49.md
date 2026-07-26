# ITC-49 - Walk-in refrigeration measured system delta

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| context_benchmarks | Walk-In Component Energy Benchmark | STD-CONTEXT-BENCHMARKS | Component type and DOE equipment class [User]; Walk-in temperature class [User]; Indoor or outdoor configuration [User]; Panel area when a panel intensity is selected [Project Document]; Existing efficiency level from a Project Document [Project Document]; Proposed efficiency level from the linked opportunity [Linked Opportunity] | One class-matched existing annual component energy -> current_annual_refrigeration_kWh (kWh/year; PER_EQUIPMENT_UNIT); One class-matched proposed annual component energy -> proposed_annual_refrigeration_kWh (kWh/year; PER_EQUIPMENT_UNIT) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| context_benchmarks | END_TO_END_REAL | scripts/research/operational-savings/adapters/context-benchmarks/doe-walkin.mjs | context-doe-walkin-real-proof: PASSED; scripts/research/operational-savings/tests/context-doe-walkin-real.test.mjs :: publishes both exact ITC-49 formula terms with canonical units and scope<br>context-doe-walkin-scope-failure-proof: PASSED; scripts/research/operational-savings/tests/context-doe-walkin-real.test.mjs :: fails closed outside the reviewed row and exact class dimensions<br>context-doe-walkin-source-mutation-proof: PASSED; scripts/research/operational-savings/tests/context-doe-walkin-real.test.mjs :: fails source-title, table-row, and fixture-value mutations | None |

## End-to-end graph

- `context_benchmarks`: Component type and DOE equipment class [User] + Walk-in temperature class [User] + Indoor or outdoor configuration [User] + Panel area when a panel intensity is selected [Project Document] + Existing efficiency level from a Project Document [Project Document] + Proposed efficiency level from the linked opportunity [Linked Opportunity] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One class-matched existing annual component energy -> current_annual_refrigeration_kWh (kWh/year) + One class-matched proposed annual component energy -> proposed_annual_refrigeration_kWh (kWh/year)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| context_benchmarks | END_TO_END_REAL | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
