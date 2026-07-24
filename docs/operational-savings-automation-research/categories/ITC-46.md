# ITC-46 - Industrial process electrification balance

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| doe_measur | Industrial Process Electrification Engineering Calculation | STD-DOE-MEASUR | Process share of billed fuel; Existing Process or Fuel Type; Required Process Temperature from a nameplate, measurement, audit, or contractor specification; Useful Process Load; Existing Process Nameplate or Test Information; Proposed technology; Proposed COP or efficiency from a nameplate, measurement, audit, or contractor specification | Existing process efficiency; Useful process heat; Proposed coefficient of performance or efficiency | current_efficiency; useful_process_heat; proposed_COP_or_efficiency | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation. |

## End-to-end graph

- `doe_measur`: Process share of billed fuel [Project Document] + Existing Process or Fuel Type [User] + Required Process Temperature from a nameplate, measurement, audit, or contractor specification [Project Document] + Useful Process Load [Project Document] + Existing Process Nameplate or Test Information [Project Document] + Proposed technology [Linked Opportunity] + Proposed COP or efficiency from a nameplate, measurement, audit, or contractor specification [Linked Opportunity] -> STD-DOE-MEASUR -> model_versions + model_input_schemas + calculation_assumptions + calculation_runs + calculation_warnings -> Existing process efficiency -> current_efficiency (fraction) + Useful process heat -> useful_process_heat (energy/year) + Proposed coefficient of performance or efficiency -> proposed_COP_or_efficiency (fraction)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
