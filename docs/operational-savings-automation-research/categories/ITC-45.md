# ITC-45 - Waste-heat useful-energy recovery

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| doe_measur | Waste Heat Recovery Engineering Calculation | STD-DOE-MEASUR | Waste-stream flow from a nameplate, measurement, audit, or contractor specification [Project Document]; Waste-stream temperature from a nameplate, measurement, audit, or contractor specification [Project Document]; Waste-stream schedule [User]; Coincident Useful-Heat Load [Project Document]; Recovery-equipment efficiency from a nameplate, measurement, audit, or contractor specification [Linked Opportunity]; Displaced heating-system efficiency from a nameplate, measurement, audit, or contractor specification [Project Document]; Recovery auxiliary power [Linked Opportunity] | Annual available waste heat -> available_waste_heat (energy/year; PROJECT_TOTAL); Annual useful recovered heat -> useful_recovered_heat (energy/year; PROJECT_TOTAL); Annual recovery auxiliary electricity -> added_auxiliary_kWh (kWh/year; PROJECT_TOTAL) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| doe_measur | DOCUMENTATION_ONLY | None implemented | None required or recorded for the current proof state | MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |

## End-to-end graph

- `doe_measur`: Waste-stream flow from a nameplate, measurement, audit, or contractor specification [Project Document] + Waste-stream temperature from a nameplate, measurement, audit, or contractor specification [Project Document] + Waste-stream schedule [User] + Coincident Useful-Heat Load [Project Document] + Recovery-equipment efficiency from a nameplate, measurement, audit, or contractor specification [Linked Opportunity] + Displaced heating-system efficiency from a nameplate, measurement, audit, or contractor specification [Project Document] + Recovery auxiliary power [Linked Opportunity] -> STD-DOE-MEASUR -> model_versions + model_input_schemas + calculation_assumptions + calculation_runs + calculation_warnings -> Annual available waste heat -> available_waste_heat (energy/year) + Annual useful recovered heat -> useful_recovered_heat (energy/year) + Annual recovery auxiliary electricity -> added_auxiliary_kWh (kWh/year)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| doe_measur | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |
