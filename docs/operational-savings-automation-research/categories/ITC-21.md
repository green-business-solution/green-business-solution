# ITC-21 - CHP electric and useful-heat balance

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| epa_chp_performance | Combined Heat and Power Performance Balance | STD-EPA-CHP-PERFORMANCE | Prime mover; Input fuel; Selected Unit Model, if known; Total installed capacity; Annual capacity factor; Coincident onsite electric-load constraint, if known; Coincident useful thermal-load constraint; Existing Boiler Nameplate or Combustion-Test Information, if known | Annual electricity generation; Annual CHP input fuel; Annual useful recovered heat | generation; CHP_input_fuel; useful_heat | FEASIBLE_AFTER_ADAPTER_WORK | 0 | The official technology pages, efficiency method, and calculator download were checked. The category adapter and retained source fixture are still absent, and the source does not identify an exact unit or supply site capacity, schedule, or thermal coincidence. |

## End-to-end graph

- `epa_chp_performance`: Prime mover [Linked Opportunity] + Input fuel [Linked Opportunity] + Selected Unit Model, if known [Linked Opportunity] + Total installed capacity [Linked Opportunity] + Annual capacity factor [Linked Opportunity] + Coincident onsite electric-load constraint, if known [Project Document] + Coincident useful thermal-load constraint [Project Document] + Existing Boiler Nameplate or Combustion-Test Information, if known [Project Document] -> STD-EPA-CHP-PERFORMANCE -> equipment_performance_fields + benchmark_populations + benchmark_values + calculation_assumptions -> Annual electricity generation -> generation (kWh/year) + Annual CHP input fuel -> CHP_input_fuel (fuel-unit/year) + Annual useful recovered heat -> useful_heat (energy/year)

## Feasibility

The category depends on these source-level verdicts: FEASIBLE_AFTER_ADAPTER_WORK.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
