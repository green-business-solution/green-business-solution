# ITC-39 - Variable-speed load-bin reduction

This report evaluates automation coverage without changing the approved Information Card.
The category contains 3 category-local process instances and references 2 canonical Standards.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| context_benchmarks | Pump or Fan Operating-Profile Benchmark | STD-CONTEXT-BENCHMARKS | Pump or fan application; Business activity; Building type; Equipment capacity class; Operating schedule; Site location | One normalized load or speed profile; One annual-hours allocation across its bins | load_fraction_i; hours_i | PARTIALLY_FEASIBLE | 0 | DOE building-load data can support application-specific operating-profile populations after equipment, building, schedule, climate, and geography filters are implemented. No retained eligible population currently proves those filters, so the benchmark adapter remains implementation-pending. |
| doe_measur_pump | Pump Variable-Speed Engineering Calculation | STD-DOE-MEASUR | In-scope pump count; Pump nameplate and measured input from a Project Document; Required flow and total dynamic head from a Project Document; Pump curve or documented operating points; Load or speed fractions from a Project Document; Annual hours by bin from a Project Document; Normalized load or speed profile from the connected operating-profile benchmark; Annual-hours allocation from the connected operating-profile benchmark; Proposed minimum speed and pump control rule from the linked opportunity | Existing pump input power by load bin; Proposed pump input power by load bin | existing_kW_i; proposed_kW_i | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official MEASUR calculator list identifies the Pumping System Assessment Tool and the open-source implementation is available. The exact input mapping and category golden example have not yet been pinned, so module-level execution proof remains pending. |
| doe_measur_fan | Fan Variable-Speed Engineering Calculation | STD-DOE-MEASUR | In-scope fan count; Fan nameplate and measured input from a Project Document; Required airflow and pressure rise from a Project Document; Fan curve or documented operating points; Load or speed fractions from a Project Document; Annual hours by bin from a Project Document; Normalized load or speed profile from the connected operating-profile benchmark; Annual-hours allocation from the connected operating-profile benchmark; Proposed minimum speed and fan control rule from the linked opportunity | Existing fan input power by load bin; Proposed fan input power by load bin | existing_kW_i; proposed_kW_i | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official MEASUR calculator list identifies the Fan System Assessment Tool and the open-source implementation is available. The exact input mapping and category golden example have not yet been pinned, so module-level execution proof remains pending. |

## End-to-end graph

- `context_benchmarks`: Pump or fan application [User] + Business activity [Profile] + Building type [Profile] + Equipment capacity class [User] + Operating schedule [User] + Site location [Profile] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One normalized load or speed profile -> load_fraction_i (fraction) + One annual-hours allocation across its bins -> hours_i (hours/bin)
- `doe_measur_pump`: In-scope pump count [User] + Pump nameplate and measured input from a Project Document [Project Document] + Required flow and total dynamic head from a Project Document [Project Document] + Pump curve or documented operating points [Project Document] + Load or speed fractions from a Project Document [Project Document] + Annual hours by bin from a Project Document [Project Document] + Normalized load or speed profile from the connected operating-profile benchmark [Standard Output] + Annual-hours allocation from the connected operating-profile benchmark [Standard Output] + Proposed minimum speed and pump control rule from the linked opportunity [Linked Opportunity] -> STD-DOE-MEASUR -> model_versions + model_input_schemas + calculation_assumptions + calculation_runs + calculation_warnings -> Existing pump input power by load bin -> existing_kW_i (kW/bin) + Proposed pump input power by load bin -> proposed_kW_i (kW/bin)
- `doe_measur_fan`: In-scope fan count [User] + Fan nameplate and measured input from a Project Document [Project Document] + Required airflow and pressure rise from a Project Document [Project Document] + Fan curve or documented operating points [Project Document] + Load or speed fractions from a Project Document [Project Document] + Annual hours by bin from a Project Document [Project Document] + Normalized load or speed profile from the connected operating-profile benchmark [Standard Output] + Annual-hours allocation from the connected operating-profile benchmark [Standard Output] + Proposed minimum speed and fan control rule from the linked opportunity [Linked Opportunity] -> STD-DOE-MEASUR -> model_versions + model_input_schemas + calculation_assumptions + calculation_runs + calculation_warnings -> Existing fan input power by load bin -> existing_kW_i (kW/bin) + Proposed fan input power by load bin -> proposed_kW_i (kW/bin)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE, FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
