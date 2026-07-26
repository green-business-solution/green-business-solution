# ITC-33 - Flush-fixture water reduction

This report evaluates automation coverage without changing the approved Information Card.
The category contains 4 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| flush_activity | Flush Activity Resolution | STD-CONTEXT-BENCHMARKS | Toilet or urinal type [User]; Female eligible population [User]; Male eligible population [User]; Customer or visitor population when applicable [User]; In-scope fixture count [User]; Operating days per week [User]; Active weeks per year [User]; Observed restroom study when available [Project Document] | Total annual flushes across the in-scope fixture group -> total_annual_flushes_group (flushes/year; PROJECT_TOTAL) |
| existing_flush_rate | Existing Flush Volume Resolution | STD-CONTEXT-BENCHMARKS | Existing toilet or urinal type [User]; Existing label, specification, audit, or measurement when available [Project Document] | One existing gallons-per-flush value -> gpf_existing (gallons/flush; PER_FIXTURE) |
| exact-proposed-fixture-rating | Exact Proposed Flush Fixture Rating Lookup | STD-WATERSENSE-FIXTURES | Exact proposed fixture make and model from the linked opportunity [Linked Opportunity]; Fixture type and application [Linked Opportunity] | Proposed rated gallons per flush with units and product provenance -> gpf_proposed (gallons/flush; PER_FIXTURE) |
| requirement-proposed-fixture-rating | Requirement-Based Proposed Flush Fixture Resolution | STD-WATERSENSE-FIXTURES | Fixture requirements from the linked opportunity [Linked Opportunity]; Fixture type and application [Linked Opportunity]; Required water-use criterion [Linked Opportunity] | One selected proposed rated gallons per flush, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally -> gpf_proposed (gallons/flush; PER_FIXTURE) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| flush_activity | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/context-benchmarks/run.mjs | context-watersense-flush-activity-real-proof: NOT_COVERED<br>context-watersense-flush-scope-failure-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| existing_flush_rate | DOCUMENTATION_ONLY | None implemented | None required or recorded for the current proof state | MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |
| exact-proposed-fixture-rating | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/watersense-fixtures/operator-import.mjs | watersense-fixtures-access-boundary-proof: NOT_COVERED<br>watersense-fixtures-acquisition-path-failure-proof: NOT_COVERED<br>watersense-fixtures-operator-contract: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| requirement-proposed-fixture-rating | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/watersense-fixtures/operator-import.mjs | watersense-fixtures-access-boundary-proof: NOT_COVERED<br>watersense-fixtures-acquisition-path-failure-proof: NOT_COVERED<br>watersense-fixtures-operator-contract: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `flush_activity`: Toilet or urinal type [User] + Female eligible population [User] + Male eligible population [User] + Customer or visitor population when applicable [User] + In-scope fixture count [User] + Operating days per week [User] + Active weeks per year [User] + Observed restroom study when available [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> Total annual flushes across the in-scope fixture group -> total_annual_flushes_group (flushes/year)
- `existing_flush_rate`: Existing toilet or urinal type [User] + Existing label, specification, audit, or measurement when available [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One existing gallons-per-flush value -> gpf_existing (gallons/flush)
- `exact-proposed-fixture-rating`: Exact proposed fixture make and model from the linked opportunity [Linked Opportunity] + Fixture type and application [Linked Opportunity] -> STD-WATERSENSE-FIXTURES -> equipment_products + equipment_certifications + equipment_performance_fields -> Proposed rated gallons per flush with units and product provenance -> gpf_proposed (gallons/flush)
- `requirement-proposed-fixture-rating`: Fixture requirements from the linked opportunity [Linked Opportunity] + Fixture type and application [Linked Opportunity] + Required water-use criterion [Linked Opportunity] -> STD-WATERSENSE-FIXTURES -> equipment_products + equipment_certifications + equipment_performance_fields -> One selected proposed rated gallons per flush, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally -> gpf_proposed (gallons/flush)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| flush_activity | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| existing_flush_rate | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |
| exact-proposed-fixture-rating | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| requirement-proposed-fixture-rating | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
