# Incentive Calculation Model V2

This document records the GPT Pro-assisted direction for replacing simple one-rule opportunity incentives with richer calculation packages.

## Core Decision

RetroFi should not treat an opportunity as one simple incentive formula. Each opportunity should have a calculation package containing:

- availability and applicability rules,
- one or more monetary effects,
- declarative calculation rules,
- measure catalogs and rate tables,
- caps, limits, and stacking constraints,
- required inputs,
- source evidence,
- confidence and repair metadata.

For active user-visible monetary opportunities, `no_rule` should not be a terminal state. If the current model cannot calculate value, the opportunity should be repaired, estimated from source-backed ranges/defaults, marked custom-quote, escalated as source-inaccessible, or archived if unavailable.

## Calculation Statuses

Use explicit statuses instead of nullable or implicit rule state:

- `calculable`
- `calculable_with_missing_inputs`
- `estimate_from_range`
- `custom_quote_estimate`
- `source_inaccessible_repair_failure`
- `unavailable_archived`
- `needs_repair_review`

`needs_repair_review` is temporary and should not be published to normal user-facing estimates unless there is a conservative fallback estimate.

## Monetary Effects

One opportunity may contain multiple effects:

- `one_time_savings`
- `recurring_savings`
- `recurring_expense`
- `grant_expected_value`
- `tax_credit`
- `financing_subsidy`

The calculator should aggregate these separately before computing first-year benefit, net recurring benefit, payback, ROI, and NPV.

## Rule Types

The v2 model should support:

- fixed amount,
- per-unit,
- per-kW,
- per-kWh,
- per-therm,
- per-square-foot,
- per-ton,
- per-port,
- percent of cost,
- measure catalog,
- rate table,
- tiered rate table,
- range estimate,
- expected-value grant,
- custom quote estimate,
- restricted expression.

## Measure Catalogs

Use measure catalogs for opportunities where a source lists discrete equipment or measure rows.

Example: Consumers Energy appliance rebates should be represented as a measure catalog, not rejected because there is no universal formula.

```json
{
  "effect_type": "one_time_savings",
  "calculation": {
    "method": "measure_catalog",
    "measure_catalog_id": "consumers_energy_res_appliances_2026",
    "measure_selection_input": "selected_measures"
  },
  "limits": [
    {
      "scope": "household",
      "period": "calendar_year",
      "max_count": 2,
      "applies_to_measure_ids": ["air_purifier"]
    }
  ]
}
```

The actual measure row can then carry the `"$50 for Electric Customers Only"` evidence and the two-per-calendar-year household limit.

## Rate Tables

Use rate tables when incentive values vary by dimensions such as:

- customer class,
- equipment type,
- equipment size,
- efficiency tier,
- fuel type,
- income band,
- utility territory,
- project size,
- geography.

Rate table lookup must return missing inputs or a conservative default when dimensions are unavailable. It should not silently pick the best/highest value unless the rule explicitly allows it.

## Limits And Caps

Limits and caps must be first-class data, not notes. Model:

- per-customer limits,
- per-site limits,
- per-account limits,
- per-household limits,
- per-meter limits,
- per-project limits,
- per-measure limits,
- annual/program-year/lifetime limits,
- max dollar caps,
- percent-of-cost caps,
- stacked-total caps.

Every cap or limit should have source evidence when user-facing.

## Grants

Replace `possible_grant` with expected-value grants.

Store both:

- published range or maximum,
- expected grant estimate.

If the source gives a range but no award probability:

- default expected award can use midpoint or conservative minimum,
- default probability should be explicit,
- confidence should include `range_only` and `assumption_used`.

## Missing Inputs

Every rule should declare the inputs it needs. If an input is missing, return:

- partial estimate where possible,
- `missing_inputs`,
- confidence impact,
- debug trace.

The UI can then ask focused questions such as selected equipment, quantity, capacity, project cost, annual kWh savings, or utility account details.

## Stacking And Conflicts

Default stacking logic:

- explicit source says not stackable: `exclusive`,
- explicit source says stackable: `stackable`,
- same provider plus same measure plus no stacking text: `unknown_requires_review`, conservative default is do not stack duplicate one-time rebates,
- otherwise stackable with reduced confidence if evidence is incomplete.

Scenario selection should calculate each opportunity independently, build conflict groups, apply source-backed stacking rules, choose the highest expected net benefit for exclusive groups, apply stacked-total caps, and explain excluded opportunities.

## Migration Plan

1. Add v2 calculation data beside the old `opportunity_incentive_rules.json` model.
2. Auto-convert current simple rules into v2 effects.
3. Keep old and new calculators running in parallel for migrated simple rules.
4. Reclassify the 509 reviewed no-rule rows into:
   - inactive/archive,
   - missed fixed amount,
   - measure catalog,
   - rate table,
   - percent/per-unit/per-energy rule,
   - recurring savings or expense,
   - grant expected-value estimate,
   - custom quote-based program,
   - source-inaccessible repair failure,
   - genuinely non-monetary informational opportunity.
5. Fact-check old simple rules for hidden tables, caps, limits, recurring effects, or under-modeled measure rows.
6. Add validation tests for every migrated or repaired rule.
7. Roll out in this order:
   - exact simple rules,
   - repaired fixed/percent/per-unit rules,
   - measure catalogs,
   - rate tables,
   - recurring bill credits and expenses,
   - grants with expected value,
   - custom quote estimates,
   - stacking optimization.

## Repair Pipeline

For each active opportunity:

1. Fetch official source content.
2. Extract source text, tables, PDFs, and relevant linked application pages.
3. Classify incentive structure.
4. Extract the appropriate v2 calculation package.
5. Validate schema and evidence coverage.
6. Generate unit test fixtures.
7. Compare old and new results when a legacy simple rule exists.
8. Save calculation JSON or create a repair failure ticket.

## Admin Escalation

If source access, extraction, or confidence checks fail, create an admin repair ticket with:

- opportunity ID,
- failure type,
- source URLs,
- fetched evidence,
- extractor warnings,
- suggested GPT Pro prompt,
- expected response schema,
- action options: repair, archive, discard, or keep hidden.

## Minimum Implementation Slice

The first safe code step should not replace the current calculator. It should add:

- a v2 schema or validator module,
- a converter from existing simple rules to v2 calculation packages,
- unit tests proving the converted v2 output matches the old simple-rule output for fixed amount, percent of cost, per-unit, per-kW, per-kWh, and recurring bill credit rules.

After that, add one new hand-built measure catalog fixture, such as the Consumers Energy air purifier example, and prove the calculator handles quantity limits and missing selected-measure inputs.
