# ITC-08 - Solar thermal backup-resource displacement

This report evaluates automation coverage without changing the approved Information Card.
The category contains 2 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

### Canonical process contract

| Process key | Process name | Canonical Standard | Required inputs | Exact output and formula term |
| --- | --- | --- | --- | --- |
| context_benchmarks | Solar Water-Heating Input Benchmark | STD-CONTEXT-BENCHMARKS | Business activity [Profile]; Building type [Profile]; Building area [Profile]; Operating schedule [User]; Electricity use from the bill when water heating is electric [Bill]; Gas use from the bill when water heating is gas [Bill]; Collector requirements from the linked opportunity [Linked Opportunity]; Available collector and storage Project Document [Project Document]; Available hot-water-load Project Document [Project Document]; Available backup-system Project Document [Project Document] | One context-matched collector and storage configuration -> collector_and_storage_configuration (record set; RECORD_SET); One annual hot-water load -> annual_delivered_hot_water_load (kWh-thermal/year; PROJECT_TOTAL); One backup-system efficiency -> backup_efficiency (fraction; PROJECT_TOTAL) |
| sam_solar_thermal | Solar Thermal Production Simulation | STD-SAM-SOLAR-THERMAL | Site location [Profile]; Collector and storage design from the linked opportunity [Linked Opportunity]; Collector and storage design from a Project Document [Project Document]; Annual hot-water load from a Project Document [Project Document]; Annual hot-water load from the connected context benchmark [Standard Output]; Backup fuel type [User]; Backup-system efficiency from a Project Document [Project Document]; Backup-system efficiency from the connected context benchmark [Standard Output] | Annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version -> SAM_output (kWh-thermal/year; PER_YEAR) |

### Current execution evidence

| Process key | Execution-verified proof level | Adapter path | Actual adapter test result | Current blocker |
| --- | --- | --- | --- | --- |
| context_benchmarks | DOCUMENTATION_ONLY | None implemented | None required or recorded for the current proof state | MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |
| sam_solar_thermal | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/sam-solar-thermal/run.mjs | sam-solar-thermal-publication-failure: NOT_COVERED<br>sam-solar-thermal-real-database-publication: NOT_COVERED<br>sam-solar-thermal-real-ssc-execution: NOT_COVERED<br>sam-solar-thermal-ssc-version-failure: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## End-to-end graph

- `context_benchmarks`: Business activity [Profile] + Building type [Profile] + Building area [Profile] + Operating schedule [User] + Electricity use from the bill when water heating is electric [Bill] + Gas use from the bill when water heating is gas [Bill] + Collector requirements from the linked opportunity [Linked Opportunity] + Available collector and storage Project Document [Project Document] + Available hot-water-load Project Document [Project Document] + Available backup-system Project Document [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One context-matched collector and storage configuration -> collector_and_storage_configuration (record set) + One annual hot-water load -> annual_delivered_hot_water_load (kWh-thermal/year) + One backup-system efficiency -> backup_efficiency (fraction)
- `sam_solar_thermal`: Site location [Profile] + Collector and storage design from the linked opportunity [Linked Opportunity] + Collector and storage design from a Project Document [Project Document] + Annual hot-water load from a Project Document [Project Document] + Annual hot-water load from the connected context benchmark [Standard Output] + Backup fuel type [User] + Backup-system efficiency from a Project Document [Project Document] + Backup-system efficiency from the connected context benchmark [Standard Output] -> STD-SAM-SOLAR-THERMAL -> model_versions + model_input_schemas + climate_crosswalks + calculation_runs + calculation_warnings -> Annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version -> SAM_output (kWh-thermal/year)

## Feasibility

The category depends on these source-level verdicts: NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES.
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

| Process key | Current proof level | Next action |
| --- | --- | --- |
| context_benchmarks | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. MISSING_PROOF_MANIFEST: No source-specific adapter proof manifest covers this canonical process. Missing gates: sourceIdentityPinned, artifactAcquired, checksumOrCommitRetained, schemaExtracted, requiredFieldsLocated, unitsEnumerationsPinned, parserOrModelExecuted, normalizedPublished, resolutionExecuted, standardOutputProduced, unitScopeMatches, formulaTermReached, offlineRerunPassed, provenanceComplete, mutationFailureTestsPassed. |
| sam_solar_thermal | DOCUMENTATION_ONLY | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
