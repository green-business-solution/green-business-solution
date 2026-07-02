# Incentive Formula / Rate-Table Repair Apply Report

Generated: 2026-07-02T18:43:22.498Z
Source artifact: `data/incentive_formula_rate_table_research_repairs_gpt_pro_2026-07-02_batches_1_50.json`
Reviewed opportunities: 984
V2 calculation packages: 984
Legacy runtime rules generated: 10
Reviewed rows without legacy runtime rule: 975

## Validation

- Invalid v2 packages: 0
- Public retrofit edge deletions tracked: 1016
- Public retrofit edge deletions applied this run: 0
- Sample fixture edge deletions tracked: 164
- Sample fixture edge deletions applied this run: 0

## Legacy Rule Counts

```json
{
  "byIncentiveType": {
    "capped_rebate": 10
  },
  "byAmountRule": {
    "fixed_per_unit": 7,
    "fixed_amount": 3
  },
  "byConfidence": {
    "high": 10
  }
}
```

## Skipped Legacy Rule Reasons

```json
{
  "not_included_in_user_facing_total_default": 1112,
  "human_review_required": 8,
  "missing_project_inputs_not_legacy_safe": 75
}
```

## V2 Package Status Counts

```json
{
  "calculable_with_missing_inputs": 782,
  "needs_repair_review": 17,
  "estimate_from_range": 27,
  "custom_quote_estimate": 66,
  "no_calculable_value": 22,
  "source_inaccessible_repair_failure": 24,
  "non_monetary_workflow": 31,
  "calculable": 14,
  "unavailable_archived": 1
}
```
