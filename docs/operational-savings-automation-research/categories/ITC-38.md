# ITC-38 - Motor input-power efficiency replacement

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| operating_schedule | Motor Replacement Annual Operating Hours | STD-OPERATING-SCHEDULE | Recognizable Business, Shift, Seasonal, or Usage Pattern [User]; Detailed Operating Days, Shifts, or Active Season, if known [User]; Measured Annual Operating Hours, if known [Project Document]; Site Location and Business Activity [Profile] | Annual operating hours -> annual_hours (hours/year; PER_YEAR) |
| doe_measur | Motor Replacement Engineering Calculation | STD-DOE-MEASUR | In-Scope Equipment Count [User]; Motor rated shaft power from a nameplate, measurement, audit, or contractor specification [Project Document]; Motor rated speed from a nameplate, measurement, audit, or contractor specification [Project Document]; Operating load fraction from an uploaded site study, controls trend, or engineering audit [Project Document]; Existing motor class [User]; Proposed motor class [Linked Opportunity]; Annual operating hours from the connected schedule process [Standard Output] | Existing motor efficiency -> η_existing (fraction; PER_EQUIPMENT_UNIT); Proposed motor efficiency -> η_proposed (fraction; PER_EQUIPMENT_UNIT) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| operating_schedule | DOCUMENTATION_ONLY | None implemented | None required or recorded for the current proof state | MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |
| doe_measur | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/doe-measur/equipment.mjs | doe-measur-equipment-drift-failure-proof: NOT_COVERED<br>doe-measur-equipment-input-failure-proof: NOT_COVERED<br>doe-measur-equipment-publication-proof: NOT_COVERED<br>doe-measur-real-equipment-native-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `operating_schedule`: Recognizable Business, Shift, Seasonal, or Usage Pattern [User] + Detailed Operating Days, Shifts, or Active Season, if known [User] + Measured Annual Operating Hours, if known [Project Document] + Site Location and Business Activity [Profile] -> STD-OPERATING-SCHEDULE -> operating_schedule_references + calculation_runs + selected_values + selected_value_provenance + calculation_source_dependencies -> Annual operating hours -> annual_hours (hours/year)
- `doe_measur`: In-Scope Equipment Count [User] + Motor rated shaft power from a nameplate, measurement, audit, or contractor specification [Project Document] + Motor rated speed from a nameplate, measurement, audit, or contractor specification [Project Document] + Operating load fraction from an uploaded site study, controls trend, or engineering audit [Project Document] + Existing motor class [User] + Proposed motor class [Linked Opportunity] + Annual operating hours from the connected schedule process [Standard Output] -> STD-DOE-MEASUR -> model_versions + model_input_schemas + calculation_assumptions + calculation_runs + calculation_warnings -> Existing motor efficiency -> η_existing (fraction) + Proposed motor efficiency -> η_proposed (fraction)

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
| doe_measur | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
