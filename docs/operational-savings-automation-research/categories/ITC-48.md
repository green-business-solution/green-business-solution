# ITC-48 - Induction-cooking measured resource switch

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| context_benchmarks | Comparable Cooking-Duty Resolver | STD-CONTEXT-BENCHMARKS | Existing cooking equipment type and resource [User]; Proposed induction equipment type and resource [Linked Opportunity]; Identical tested cooking duty definition [Project Document]; Annual activity in that tested duty unit [User]; Exact project test records when available [Project Document] | One existing resource intensity per identical tested cooking duty -> existing_resource_per_activity_r (resource/certified activity; PER_EVENT); One proposed resource intensity per identical tested cooking duty -> proposed_resource_per_activity_r (resource/certified activity; PER_EVENT) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| context_benchmarks | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/context-benchmarks/run.mjs | context-cfs-cooktop-source-proof: NOT_COVERED<br>context-cfs-workbook-mutation-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `context_benchmarks`: Existing cooking equipment type and resource [User] + Proposed induction equipment type and resource [Linked Opportunity] + Identical tested cooking duty definition [Project Document] + Annual activity in that tested duty unit [User] + Exact project test records when available [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One existing resource intensity per identical tested cooking duty -> existing_resource_per_activity_r (resource/certified activity) + One proposed resource intensity per identical tested cooking duty -> proposed_resource_per_activity_r (resource/certified activity)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| context_benchmarks | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
