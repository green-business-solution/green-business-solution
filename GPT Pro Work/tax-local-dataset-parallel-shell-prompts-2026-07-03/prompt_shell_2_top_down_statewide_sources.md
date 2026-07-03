# Shell 2 Prompt: Top-Down Statewide Tax Source Coverage

You are Codex shell 2 working in `/Users/neer_kuchlous/Code/Green Business Solution`.

You are working in parallel with another Codex shell. Your scope is **top-down statewide and bulk/API source coverage**. Do not work on bottom-up county/city/locality-specific research except when a statewide source points to a local adapter.

## Coordination Rules

- Follow `AGENTS.md` and `AGENT_WORKFLOW.md`.
- Do not edit runtime app code, AWS configuration, deployed data, or canonical data files.
- Do not modify files in `GPT Pro Work/tax-local-dataset-parallel-shell-3-bottom-up-2026-07-03/`.
- Do not overwrite your previous outputs in `GPT Pro Work/tax-local-dataset-codex-sweep-2026-07-03/`; treat them as read-only inputs.
- Write all new work only under:
  `GPT Pro Work/tax-local-dataset-parallel-shell-2-top-down-2026-07-03/`
- If you commit, only stage your own shell-2 output folder. Do not stage untracked files created by shell 3 or another process.
- Before any commit/push, run `git status --short --branch` and make sure you are not including another shell's files.

## Mission

Build a **top-down source-backed coverage map** for tax automation using official statewide, federal, or multi-state machine-readable sources.

You are not trying to manually research every city or county. Your job is to answer:

1. Which official statewide or multi-state datasets can RetroFi import?
2. What tax domains can be mostly automated from address/geography plus those sources?
3. Which states have official APIs/downloads versus lookup-only tools versus manual/PDF sources?
4. Which gaps should shell 3 investigate bottom-up at the county/city/locality level?

## Read First

Inspect these as inputs:

- `data/tax_official_dataset_rule_research_gpt_pro_2026-07-03.json`
- `data/tax_geography_rules.json`
- `docs/tax-geography-model.md`
- `GPT Pro Work/Tax Research Codex Sweep 2026-07-03/official_tax_dataset_sources.md`
- `GPT Pro Work/Tax Research Codex Sweep 2026-07-03/tax_research_summary.md`
- `GPT Pro Work/tax-local-dataset-codex-sweep-2026-07-03/official_local_tax_source_manifest.json`, if present
- `GPT Pro Work/tax-local-dataset-codex-sweep-2026-07-03/local_tax_research_summary.md`, if present

## Scope

Cover all 50 states plus DC for these domains:

1. Sales and use tax
   - State rate and local option sources.
   - Official APIs, downloads, boundary files, and lookup tools.
   - Streamlined Sales Tax member files.
   - Whether equipment/labor defaults are statewide, category-specific, or not safely automatable.

2. State business taxes
   - State income/franchise/gross receipts/B&O/CAT/excise rate schedules.
   - Official statutes, forms, instructions, or datasets.
   - Whether rates can be derived server-side or need taxpayer/accountant filing facts.

3. Property tax statewide sources
   - Statewide parcel/tax/millage/assessor portals if they exist.
   - State constants or statutes relevant to incentive calculations.
   - Whether property tax can be calculated from address alone, parcel/APN, uploaded tax bill, or assessor records.

4. Multi-state geography sources
   - Census Geocoder, TIGER/Line, TIGERweb, school districts, county subdivisions, places.
   - What they can route safely and what they cannot prove.

## Deliverables

Create these files in `GPT Pro Work/tax-local-dataset-parallel-shell-2-top-down-2026-07-03/`:

1. `top_down_research_summary.md`

Must explicitly answer:
- Did you produce a complete all-locality tax database? If not, why not?
- Which tax domains can get broad coverage through statewide/multi-state official sources?
- Which domains cannot be automated from address alone?
- What should shell 3 research bottom-up?
- What should engineering import first?

2. `statewide_source_coverage_matrix.json`

Schema:
```json
{
  "schemaVersion": "retrofi_statewide_tax_source_coverage_matrix.v1",
  "generatedAt": "YYYY-MM-DD",
  "source": "codex_shell_2_top_down",
  "states": [
    {
      "stateCode": "CA",
      "salesUseTaxCoverage": "official_api | official_download | lookup_only | manual | no_state_tax | unknown",
      "propertyTaxCoverage": "statewide_machine_readable | county_level_only | parcel_required | tax_bill_required | manual | unknown",
      "stateBusinessTaxCoverage": "statutory_formula | official_rate_schedule | forms_required | accountant_required | no_major_business_tax | unknown",
      "officialSources": [
        {
          "taxDomain": "sales_use_tax | property_tax | state_business_tax | geography_boundary",
          "officialOwner": "",
          "sourceName": "",
          "sourceUrls": [],
          "accessMethod": "API | download | lookup_tool | HTML_table | PDF | statute | regulation | unknown",
          "machineReadable": true,
          "effectiveDateHandling": "",
          "runtimeUse": "",
          "limitations": [],
          "sourceConfidence": "high | medium | low",
          "evidenceText": ""
        }
      ],
      "automationAssessment": {
        "addressOnlyCanCalculate": [],
        "addressCanRouteButNeedsUserFacts": [],
        "requiresParcelOrTaxBill": [],
        "requiresAccountantOrFilingFacts": [],
        "notPracticalYet": []
      },
      "recommendedImportPriority": "high | medium | low"
    }
  ]
}
```

3. `official_bulk_source_manifest.json`

Use this for source families that can cover multiple states or large parts of a state. Include official URLs and evidence text.

4. `top_down_import_priority_plan.md`

Rank the first 10 imports/adapters RetroFi should build. For each, explain engineering effort, coverage impact, source reliability, refresh frequency, and runtime calculation use.

5. `handoff_to_shell_3_bottom_up.md`

List the top county/city/locality gaps shell 3 should research. Be concrete:
- jurisdiction;
- tax domain;
- source needed;
- why the statewide source was insufficient;
- expected source owner.

## Quality Bar

Do not finish with generic statements. Produce a source-backed coverage matrix.

A valid result is allowed to say "nationwide all-locality tax coverage is not feasible from one source," but it must identify the best official statewide/multi-state imports and the precise local gaps.

Use web research only for current official sources. Cite source URLs in the artifact files.
