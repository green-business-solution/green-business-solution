# ITC-48 - Induction-cooking measured resource switch

This report evaluates automation coverage without changing the approved Information Card.
The category contains 1 category-local process instance and references 1 canonical Standard.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

| Process key | Process name | Canonical Standard | Required inputs | Exact outputs | Formula terms | Source feasibility | Runtime external calls | Current blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| context_benchmarks | Comparable Cooking-Duty Resolver | STD-CONTEXT-BENCHMARKS | Existing cooking equipment type and resource; Proposed induction equipment type and resource; Identical tested cooking duty definition; Annual activity in that tested duty unit; Exact project test records when available | One existing resource intensity per identical tested cooking duty; One proposed resource intensity per identical tested cooking duty | existing_resource_per_activity_r; proposed_resource_per_activity_r | PARTIALLY_FEASIBLE | 0 | The retained ENERGY STAR CFS calculator fixture proves the electric-cooktop 20-pound water-boil duty, conventional and efficient cooking efficiencies, 1.03 and 0.91 kWh per boil values, and annualization equation. It does not prove gas-to-induction savings or a different cooking duty, so those cases remain blocked without exact comparable project tests. No category calculation golden fixture is retained, so end-to-end execution proof remains pending. |

## End-to-end graph

- `context_benchmarks`: Existing cooking equipment type and resource [User] + Proposed induction equipment type and resource [Linked Opportunity] + Identical tested cooking duty definition [Project Document] + Annual activity in that tested duty unit [User] + Exact project test records when available [Project Document] -> STD-CONTEXT-BENCHMARKS -> benchmark_populations + benchmark_values + calculation_assumptions + selected_values + selected_value_provenance -> One existing resource intensity per identical tested cooking duty -> existing_resource_per_activity_r (resource/certified activity) + One proposed resource intensity per identical tested cooking duty -> proposed_resource_per_activity_r (resource/certified activity)

## Feasibility

The category depends on these source-level verdicts: PARTIALLY_FEASIBLE.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
