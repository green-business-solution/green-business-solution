# ITC-54 - Backup-power routine resource use

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| exact-backup-routine-inputs | Exact Backup-Power Routine-Use Input Resolution | STD-CONTEXT-BENCHMARKS | Tested fuel use per operating hour per unit [Project Document]; Scheduled annual test operating hours per unit [Project Document]; Standby electric input kilowatts per unit [Project Document]; Annual standby energized hours per unit [Project Document] | One exact backup-power routine-use input set -> exact_backup_routine_input_set (record set; RECORD_SET) |
| fema-full-load-diesel-test-fuel | FEMA Full-Load Diesel Test-Fuel Calculation | STD-CONTEXT-BENCHMARKS | Confirmed diesel-generator technology and fuel type [User]; Diesel generator rated capacity in kilowatts [Project Document]; Scheduled annual full-load test operating hours per unit [Project Document] | Annual full-load diesel test fuel per equipment unit -> benchmark_annual_test_fuel_per_unit (fuel-unit/year; PER_EQUIPMENT_UNIT) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| exact-backup-routine-inputs | DOCUMENTATION_ONLY | None implemented | None required or recorded for the current proof state | MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |
| fema-full-load-diesel-test-fuel | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/context-benchmarks/run.mjs | context-fema-full-load-diesel-real-proof: PASSED; scripts/research/operational-savings/tests/context-fema-real.test.mjs :: maps the narrow FEMA calculation to the exact ITC-54 term<br>context-fema-scope-failure-proof: PASSED; scripts/research/operational-savings/tests/context-fema-real.test.mjs :: fails closed outside the diesel full-load boundary<br>context-fema-source-mutation-proof: PASSED; scripts/research/operational-savings/tests/context-fema-real.test.mjs :: fails native-formula and applicability mutations | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `exact-backup-routine-inputs`: Tested fuel use per operating hour per unit [Project Document] + Scheduled annual test operating hours per unit [Project Document] + Standby electric input kilowatts per unit [Project Document] + Annual standby energized hours per unit [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One exact backup-power routine-use input set -> exact_backup_routine_input_set (record set)
- `fema-full-load-diesel-test-fuel`: Confirmed diesel-generator technology and fuel type [User] + Diesel generator rated capacity in kilowatts [Project Document] + Scheduled annual full-load test operating hours per unit [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> Annual full-load diesel test fuel per equipment unit -> benchmark_annual_test_fuel_per_unit (fuel-unit/year)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| exact-backup-routine-inputs | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |
| fema-full-load-diesel-test-fuel | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
