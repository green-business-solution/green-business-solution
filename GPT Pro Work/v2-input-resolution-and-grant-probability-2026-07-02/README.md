# GPT Pro Work: V2 Input Resolution and Grant Probability

Created: 2026-07-02

Use these files in order. Paste each prompt into GPT Pro, then paste GPT Pro's JSON response into the matching blank output file.

## Prompt/output pairs

- `prompt_001_input_resolution_scope_quantity_equipment.md` -> `output_001_input_resolution_scope_quantity_equipment.md`
- `prompt_002_input_resolution_cost_timing_bills_profile.md` -> `output_002_input_resolution_cost_timing_bills_profile.md`
- `prompt_003_grant_probability_targets_001_014.md` -> `output_003_grant_probability_targets_001_014.md`
- `prompt_004_grant_probability_targets_015_028.md` -> `output_004_grant_probability_targets_015_028.md`
- `prompt_005_grant_probability_targets_029_042.md` -> `output_005_grant_probability_targets_029_042.md`
- `prompt_006_grant_probability_targets_043_054.md` -> `output_006_grant_probability_targets_043_054.md`

## Important

The first input prompt explicitly asks GPT Pro to treat retrofit quantity, count, and replacement count as user-overridable fields. For example, LED incentives should default to a visible placeholder of `1` fixture/bulb only until the user overrides it; that value can scale to hundreds or thousands.

The second input prompt covers cost, quote, bill, rate, timing, and organization-profile fields.

The grant prompts ask for conditional-award evidence and probability evidence. GPT Pro should not turn max-only "up to" grant language into an expected value unless it finds source-backed probability evidence or clearly marks a low-confidence prior for human review.
