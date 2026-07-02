# Incentive Formula / Rate-Table Repair Work Packet

Generated: 2026-07-02T01:51:08.594Z

Use each `prompt_batch*.md` file as the prompt for GPT Pro and paste the result into the matching blank `output_batch*.md` file.

You do not need to give GPT Pro `target_batches_1_50.json`; each prompt already embeds its targets. The target batch JSON is for Codex validation/import work after outputs are returned.

## Counts

- Immediate repair targets available: 984
- Targets included in this packet: 984
- Prompt batches: 50
- End batch: 50
- Targets per full prompt: 20
- Final prompt target count: 4
- Target kinds: {"existing_simple_rule_v2_repair":515,"reviewed_no_rule_reclassification":469}

## Focus

- Repair and fact-check existing simple incentive rules.
- Reclassify prior no-rule rows into richer calculation/workflow buckets.
- Extract rate tables, measure catalogs, caps, tax credits, grants, recurring effects, custom quote status, and non-monetary workflows.
- Mark unsupported retrofit-opportunity edges as `delete_bad_edge`.
