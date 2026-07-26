# ITC-09 - Water-heating recirculation loss reduction

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| operating_schedule | Water-Heating Recirculation Controls Annual Operating Hours | STD-OPERATING-SCHEDULE | Existing control schedule [Project Document]; Proposed control schedule [Linked Opportunity]; Recognizable Business, Shift, Seasonal, or Usage Pattern [User]; Detailed Operating Days, Shifts, or Active Season, if known [User]; Measured Annual Operating Hours, if known [Project Document]; Site Location and Business Activity [Profile] | Avoided annual recirculation pump run hours -> avoided_run_hours (hours/year; PER_YEAR) |
| doe_measur | Water-Heating Recirculation Controls Engineering Calculation | STD-DOE-MEASUR | Existing annual distribution heat loss from an uploaded site study, controls trend, or engineering audit [Project Document]; Proposed annual distribution heat loss from an uploaded site study, controls trend, or engineering audit [Project Document]; Existing Water-Heater Nameplate or Test Information [Project Document]; Pump Nameplate or Measured Input [Project Document]; Annual operating hours from the connected schedule process [Standard Output] | Avoided annual distribution heat -> avoided_distribution_heat (energy/year; PER_YEAR); Avoided annual recirculation pump electricity -> avoided_pump_kWh (kWh/year; PER_YEAR) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| operating_schedule | SYNTHETIC_ONLY | scripts/research/operational-savings/adapters/operating-schedule/run.mjs | operating-schedule-itc09-project-input-proof: PASSED; scripts/research/operational-savings/tests/operating-schedule-real.test.mjs :: maps an explicit schedule reduction to avoided recirculation hours<br>operating-schedule-project-fixture-proof: PASSED; scripts/research/operational-savings/tests/operating-schedule-real.test.mjs :: pins the project-owned schedule fixture separately from USNO evidence | REMAINING_BLOCKER: The executed existing and proposed schedules are source-controlled synthetic fixtures. Production avoided hours require content-addressed project schedules. |
| doe_measur | DOCUMENTATION_ONLY | None implemented | None required or recorded for the current proof state | MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |

## End-to-end graph

- `operating_schedule`: Existing control schedule [Project Document] + Proposed control schedule [Linked Opportunity] + Recognizable Business, Shift, Seasonal, or Usage Pattern [User] + Detailed Operating Days, Shifts, or Active Season, if known [User] + Measured Annual Operating Hours, if known [Project Document] + Site Location and Business Activity [Profile] -> STD-OPERATING-SCHEDULE -> operating_schedule_references + calculation_runs + selected_values + selected_value_provenance + calculation_source_dependencies -> Avoided annual recirculation pump run hours -> avoided_run_hours (hours/year)
- `doe_measur`: Existing annual distribution heat loss from an uploaded site study, controls trend, or engineering audit [Project Document] + Proposed annual distribution heat loss from an uploaded site study, controls trend, or engineering audit [Project Document] + Existing Water-Heater Nameplate or Test Information [Project Document] + Pump Nameplate or Measured Input [Project Document] + Annual operating hours from the connected schedule process [Standard Output] -> STD-DOE-MEASUR -> model_versions + model_input_schemas + calculation_assumptions + calculation_runs + calculation_warnings -> Avoided annual distribution heat -> avoided_distribution_heat (energy/year) + Avoided annual recirculation pump electricity -> avoided_pump_kWh (kWh/year)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| operating_schedule | SYNTHETIC_ONLY | Replace the synthetic fixture with a retained real source artifact or a content-addressed project, profile, bill, or document input as ownership permits, then record the exact offline execution. |
| doe_measur | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |
