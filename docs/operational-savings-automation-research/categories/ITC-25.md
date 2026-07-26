# ITC-25 - Thermal-storage interval dispatch

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| interval_tariff | Interval Tariff Resolution | STD-INTERVAL-TARIFF | Serving electric utility from the bill [Bill]; Published rate schedule and customer class from the bill [Bill]; Tariff effective date covering the analysis period [Bill]; Continuous interval energy and demand aligned to the tariff timezone [Bill] | One complete tariff input set with exact or conservative-screening provenance -> tariff_input_set (record set; RECORD_SET) |
| reopt_local_dispatch | Thermal Energy Storage Interval Bill Calculation | STD-REOPT-LOCAL-DISPATCH | Timestamped interval utility data from the uploaded utility artifact [Bill]; Time zone and daylight-saving metadata from the uploaded utility artifact [Bill]; Thermal capacity [Linked Opportunity]; Charge limit [Linked Opportunity]; Discharge limit [Linked Opportunity]; Charge efficiency prescribed by the linked opportunity [Linked Opportunity]; Discharge efficiency prescribed by the linked opportunity [Linked Opportunity]; Standing loss [Linked Opportunity]; Initial Thermal State [Linked Opportunity]; Terminal thermal-state constraint [Linked Opportunity] | Baseline annual bill -> baseline_annual_bill (USD/year; SITE_TOTAL); Proposed annual bill -> proposed_annual_bill (USD/year; SITE_TOTAL) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| interval_tariff | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/interval-tariff/run.mjs | interval-tariff-real-composite-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: returns the exact tariff_input_set formula term offline<br>interval-tariff-term-schedule-failure-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: fails closed when a required tariff term or schedule is mutated | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| reopt_local_dispatch | DOCUMENTATION_ONLY | None implemented | None required or recorded for the current proof state | MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |

## End-to-end graph

- `interval_tariff`: Serving electric utility from the bill [Bill] + Published rate schedule and customer class from the bill [Bill] + Tariff effective date covering the analysis period [Bill] + Continuous interval energy and demand aligned to the tariff timezone [Bill] -> STD-INTERVAL-TARIFF -> utility_providers + utility_tariffs + tariff_periods + tariff_energy_charges + tariff_demand_charges + tariff_export_rules -> One complete tariff input set with exact or conservative-screening provenance -> tariff_input_set (record set)
- `reopt_local_dispatch`: Timestamped interval utility data from the uploaded utility artifact [Bill] + Time zone and daylight-saving metadata from the uploaded utility artifact [Bill] + Thermal capacity [Linked Opportunity] + Charge limit [Linked Opportunity] + Discharge limit [Linked Opportunity] + Charge efficiency prescribed by the linked opportunity [Linked Opportunity] + Discharge efficiency prescribed by the linked opportunity [Linked Opportunity] + Standing loss [Linked Opportunity] + Initial Thermal State [Linked Opportunity] + Terminal thermal-state constraint [Linked Opportunity] -> STD-REOPT-LOCAL-DISPATCH -> model_versions + model_input_schemas + calculation_runs + calculation_warnings + selected_value_provenance -> Baseline annual bill -> baseline_annual_bill (USD/year) + Proposed annual bill -> proposed_annual_bill (USD/year)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| interval_tariff | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| reopt_local_dispatch | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |
