# Shell 3 Prompt: Bottom-Up Locality Tax Source Coverage

You are Codex shell 3 working in `/Users/neer_kuchlous/Code/Green Business Solution`.

You are working in parallel with shell 2. Your scope is **bottom-up locality-specific research**: counties, cities, municipalities, assessor jurisdictions, treasurers, local business taxes, local property tax records, and high-priority sample/test geographies.

Shell 2 is handling statewide and multi-state official source coverage. Do not duplicate that work except as context.

## Coordination Rules

- Follow `AGENTS.md` and `AGENT_WORKFLOW.md`.
- Do not edit runtime app code, AWS configuration, deployed data, or canonical data files.
- Do not modify files in `GPT Pro Work/tax-local-dataset-parallel-shell-2-top-down-2026-07-03/`.
- Treat `GPT Pro Work/tax-local-dataset-codex-sweep-2026-07-03/` as read-only input.
- Write all new work only under:
  `GPT Pro Work/tax-local-dataset-parallel-shell-3-bottom-up-2026-07-03/`
- If you commit, only stage your own shell-3 output folder. Do not stage untracked files created by shell 2 or another process.
- Before any commit/push, run `git status --short --branch` and make sure you are not including another shell's files.

## Mission

Build a **bottom-up local tax source map** for high-impact jurisdictions, using official local sources.

You are not expected to manually research every locality in the US. Your job is to answer:

1. For real RetroFi sample/test geographies, what local tax sources are needed?
2. Which property tax calculations require parcel/APN/tax bill/assessor records?
3. Which local business taxes have official sources and calculable formulas?
4. Which local sources are machine-readable enough for an adapter?
5. Which gaps should be handed to GPT Pro or deferred to user/accountant/assessor inputs?

## Read First

Inspect these as inputs:

- `public/sample_matching_test_cases.json`
- `data/sample_user_profiles.json`, if present
- `data/test_case_tax_document_updates_gpt_pro_2026-07-03.json`
- `data/tax_official_dataset_rule_research_gpt_pro_2026-07-03.json`
- `data/tax_geography_rules.json`
- `docs/tax-geography-model.md`
- `GPT Pro Work/Tax Research Codex Sweep 2026-07-03/official_tax_dataset_sources.md`
- `GPT Pro Work/tax-local-dataset-codex-sweep-2026-07-03/local_tax_research_summary.md`, if present

If shell 2 has already produced `GPT Pro Work/tax-local-dataset-parallel-shell-2-top-down-2026-07-03/handoff_to_shell_3_bottom_up.md`, read it. If not, proceed independently.

## Scope

Start from actual RetroFi sample/test-case geography. Use small scripts if useful to extract and rank:

- state;
- county FIPS/name;
- city/place name;
- ZIP;
- coordinates if available;
- sector/entity type;
- tax document fields present.

Then research bottom-up sources for the top practical set:

1. Property tax local sources
   - County assessor;
   - County treasurer/tax collector;
   - Parcel/APN lookup;
   - tax-rate-area/millage;
   - exemptions/abatements;
   - special assessments;
   - whether data is API/download/GIS/lookup/manual.

2. Local business tax sources
   - City/county B&O, gross receipts, local income, payroll, occupational, privilege, utility, or similar business taxes.
   - Official ordinances, rate tables, forms, instructions, and filing portals.

3. Program-specific locality facts
   - Rhode Island municipal renewable property/tangible tax treatment if sample/test or current package work needs it.
   - Michigan RERZ local-unit/zone documents if sample/test or current package work needs it.
   - Any other local tax incentive source tied to sample/test opportunities.

## Deliverables

Create these files in `GPT Pro Work/tax-local-dataset-parallel-shell-3-bottom-up-2026-07-03/`:

1. `bottom_up_research_summary.md`

Must explicitly answer:
- Which sample/test jurisdictions did you prioritize?
- Which local tax data can be automated from official local sources?
- Which calculations require parcel/APN, tax bill, account number, accountant input, or assessor confirmation?
- Which local sources are lookup-only and not suitable for bulk import?
- What should engineering build first?
- What should GPT Pro research next?

2. `sample_geography_priority_list.json`

Schema:
```json
{
  "schemaVersion": "retrofi_sample_tax_geography_priority_list.v1",
  "generatedAt": "YYYY-MM-DD",
  "source": "codex_shell_3_bottom_up",
  "geographies": [
    {
      "priorityRank": 1,
      "stateCode": "",
      "countyFips": "",
      "countyName": "",
      "placeName": "",
      "zip5": "",
      "sampleUserIds": [],
      "relevantTaxDomains": [],
      "whyPrioritized": ""
    }
  ]
}
```

3. `locality_source_manifest.json`

Schema:
```json
{
  "schemaVersion": "retrofi_locality_tax_source_manifest.v1",
  "generatedAt": "YYYY-MM-DD",
  "source": "codex_shell_3_bottom_up",
  "sources": [
    {
      "sourceId": "",
      "stateCode": "",
      "countyFips": "",
      "countyName": "",
      "placeName": "",
      "taxDomain": "property_tax | local_business_tax | program_specific_tax_incentive | special_assessment | parcel_boundary | assessor_boundary",
      "officialOwner": "",
      "sourceName": "",
      "sourceUrls": [],
      "accessMethod": "API | download | GIS_service | lookup_tool | HTML_table | PDF | statute | ordinance | form_instruction | unknown",
      "machineReadable": true,
      "joinKeys": [],
      "requiresParcelOrAccount": false,
      "requiresUserOrAccountantFacts": false,
      "canSupportRuntimeCalculation": "yes | partial | no",
      "runtimeUse": "",
      "limitations": [],
      "sourceConfidence": "high | medium | low",
      "evidenceText": ""
    }
  ],
  "gaps": [
    {
      "gapId": "",
      "jurisdiction": "",
      "taxDomain": "",
      "gapDescription": "",
      "recommendedNextStep": "GPT Pro research | user_document_upload | accountant_input | assessor_review | official_adapter | defer",
      "priority": "high | medium | low"
    }
  ]
}
```

4. `property_tax_adapter_notes.md`

For each researched property-tax locality, explain:
- whether address is enough;
- whether parcel/APN is required;
- whether tax bill upload is required;
- what source fields could map to RetroFi runtime inputs;
- whether an adapter is practical.

5. `local_business_tax_adapter_notes.md`

For each researched local business-tax jurisdiction, explain:
- taxpayer/entity facts needed;
- formula/rate source;
- filing/accountant fields needed;
- whether RetroFi can safely estimate from address plus user profile.

6. `gpt_pro_local_gap_prompts.md`

Write targeted GPT Pro prompts for unresolved local gaps only. Do not ask GPT Pro to duplicate official bulk downloads or statewide source cataloging.

## Quality Bar

Do not finish after only high-level source families. This shell must produce jurisdiction-specific local evidence.

If you cannot cover every locality, say so directly and explain the prioritization. A strong result covers a realistic first batch of high-impact localities and gives precise next prompts for unresolved local gaps.
