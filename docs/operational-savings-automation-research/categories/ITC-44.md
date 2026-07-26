# ITC-44 - Compressed-air control profile reduction

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| doe_measur | Compressed Air Controls Engineering Calculation | STD-DOE-MEASUR | In-Scope Equipment Count [User]; Compressor type [User]; Rated input power [Project Document]; Rated flow from a nameplate, measurement, audit, or contractor specification [Project Document]; Existing control mode [User]; Proposed control mode [Linked Opportunity]; Load fraction for each bin from an uploaded site study, controls trend, or engineering audit [Project Document]; Annual hours for each bin from an uploaded site study, controls trend, or engineering audit [Project Document] | Existing compressor input power by load bin -> existing_kW_i (kW; PROFILE); Proposed compressor input power by load bin -> proposed_kW_i (kW; PROFILE) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| doe_measur | DOCUMENTATION_ONLY | None implemented | None required or recorded for the current proof state | MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |

## End-to-end graph

- `doe_measur`: In-Scope Equipment Count [User] + Compressor type [User] + Rated input power [Project Document] + Rated flow from a nameplate, measurement, audit, or contractor specification [Project Document] + Existing control mode [User] + Proposed control mode [Linked Opportunity] + Load fraction for each bin from an uploaded site study, controls trend, or engineering audit [Project Document] + Annual hours for each bin from an uploaded site study, controls trend, or engineering audit [Project Document] -> STD-DOE-MEASUR -> model_versions + model_input_schemas + calculation_assumptions + calculation_runs + calculation_warnings -> Existing compressor input power by load bin -> existing_kW_i (kW) + Proposed compressor input power by load bin -> proposed_kW_i (kW)

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
