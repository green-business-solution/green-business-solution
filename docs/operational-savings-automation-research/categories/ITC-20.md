# ITC-20 - Fuel-cell electricity and fuel balance

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| operating_schedule | Fuel Cell Electricity Generation Annual Operating Hours | STD-OPERATING-SCHEDULE | Recognizable Business, Shift, Seasonal, or Usage Pattern [User]; Detailed Operating Days, Shifts, or Active Season, if known [User]; Measured Annual Operating Hours, if known [Project Document]; Site Location and Business Activity [Profile] | Annual operating hours -> annual_operating_hours (hours/year; PER_YEAR) |
| epa_chp_performance | Fuel Cell Electricity Generation Performance Balance | STD-EPA-CHP-PERFORMANCE | Prime-mover type [Linked Opportunity]; Input fuel [Linked Opportunity]; Selected Unit Model, if known [Linked Opportunity]; Total installed capacity [Linked Opportunity]; Operating load fraction from an uploaded site study, controls trend, or engineering audit [Project Document]; Coincident Onsite Electric Load, if known [Project Document]; Annual operating hours from the connected schedule process [Standard Output] | Annual electricity generation -> annual_generation (kWh/year; PROJECT_TOTAL); Annual input fuel -> added_fuel (fuel-unit/year; PROJECT_TOTAL) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| operating_schedule | DOCUMENTATION_ONLY | None implemented | None required or recorded for the current proof state | MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |
| epa_chp_performance | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/epa-chp/run.mjs | epa-chp-itc20-formula-proof: NOT_COVERED<br>epa-chp-offline-proof: NOT_COVERED<br>epa-chp-required-row-failure-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `operating_schedule`: Recognizable Business, Shift, Seasonal, or Usage Pattern [User] + Detailed Operating Days, Shifts, or Active Season, if known [User] + Measured Annual Operating Hours, if known [Project Document] + Site Location and Business Activity [Profile] -> STD-OPERATING-SCHEDULE -> operating_schedule_references + calculation_runs + selected_values + selected_value_provenance + calculation_source_dependencies -> Annual operating hours -> annual_operating_hours (hours/year)
- `epa_chp_performance`: Prime-mover type [Linked Opportunity] + Input fuel [Linked Opportunity] + Selected Unit Model, if known [Linked Opportunity] + Total installed capacity [Linked Opportunity] + Operating load fraction from an uploaded site study, controls trend, or engineering audit [Project Document] + Coincident Onsite Electric Load, if known [Project Document] + Annual operating hours from the connected schedule process [Standard Output] -> STD-EPA-CHP-PERFORMANCE -> equipment_performance_fields + benchmark_populations + benchmark_values + calculation_assumptions -> Annual electricity generation -> annual_generation (kWh/year) + Annual input fuel -> added_fuel (fuel-unit/year)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| operating_schedule | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |
| epa_chp_performance | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
