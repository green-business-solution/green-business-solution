# Codex Research Prompt: Nationwide Local Tax Dataset Sweep

You are a separate Codex shell working in `/Users/neer_kuchlous/Code/Green Business Solution`.

Important constraints:
- Follow `AGENTS.md` and `AGENT_WORKFLOW.md`.
- Do not edit runtime app code, AWS configuration, deployed data, or production database records.
- Do not claim nationwide local tax coverage unless you have source-backed coverage metrics.
- Prefer official machine-readable government sources over manual web summaries.
- Use only official government/tax/assessor/treasurer/statutory/regulatory sources for authoritative records. Third-party sources can be discovery-only.
- Keep all new research artifacts under `GPT Pro Work/tax-local-dataset-codex-sweep-2026-07-03/` or `var/tax-local-dataset-research/`.
- If you download official source files, store only small samples/metadata in Git-tracked paths and put bulky files under `var/`.

## Why this prompt exists

A previous Codex sweep finished too quickly because it scoped itself to:
- the 3 current v2 tax packages;
- high-level state dataset catalogs;
- implementation recommendations.

That is useful, but it is not a nationwide local tax dataset. RetroFi needs to understand how much tax data can be automated from official sources and what remains user/accountant/assessor supplied.

## Objective

Build a practical, source-backed local tax dataset acquisition plan and initial seed artifacts that can support RetroFi's tax input resolver.

The target is not "manually research every city." The target is:
1. Identify official bulk/API sources that can cover many local jurisdictions.
2. Quantify coverage by tax domain and geography.
3. Produce import-ready schemas/manifests for what can be automated.
4. Produce a gap queue for places/tax types that require GPT Pro, manual review, document upload, or future adapters.
5. Be explicit about what cannot be automated from address alone.

## Existing files to inspect first

Read these before researching:
- `data/tax_official_dataset_rule_research_gpt_pro_2026-07-03.json`
- `data/tax_geography_rules.json`
- `data/opportunity_incentive_calculation_packages_v2.json`
- `docs/tax-geography-model.md`
- `GPT Pro Work/Tax Research Codex Sweep 2026-07-03/tax_research_summary.md`
- `GPT Pro Work/Tax Research Codex Sweep 2026-07-03/official_tax_dataset_sources.md`
- `GPT Pro Work/Tax Research Codex Sweep 2026-07-03/implementation_recommendations.md`

## Research scope

Cover these domains separately:

1. Sales and use tax
   - State sales tax.
   - Local option sales tax.
   - Special district sales tax.
   - Equipment taxability defaults.
   - Installation labor taxability defaults.
   - Official rate/boundary files, APIs, or lookup tools.

2. Property tax
   - State-level property tax constants relevant to incentives.
   - County/municipal assessor and treasurer data availability.
   - Parcel/APN, assessed value, tax-rate-area/millage, special assessments, exemptions, abatements.
   - Whether address alone is enough, or whether parcel/tax-bill/account number is needed.

3. State business taxes
   - Income/franchise/gross receipts/B&O/CAT/excise tax rate schedules.
   - Official forms/instructions where runtime formula inputs come from.
   - Whether rates can be derived from entity type/NAICS/state, or need accountant-supplied filing data.

4. Local business taxes
   - City/county B&O, gross receipts, local income, occupational, payroll, privilege, utility, or similar business taxes.
   - Identify only official sources and high-impact jurisdictions first.
   - Do not pretend every locality is covered unless an official bulk dataset exists.

5. Program-specific tax incentives
   - Current RetroFi package examples: WA solar manufacturer B&O, RI renewable property valuation, MI Renewable Energy Renaissance Zones.
   - Identify other common official tax incentive rule datasets only if machine-readable or statutory enough to normalize.

## Required deliverables

Create these files:

1. `GPT Pro Work/tax-local-dataset-codex-sweep-2026-07-03/local_tax_research_summary.md`

Include:
- What the previous sweep did and did not cover.
- Whether "all local areas in the US" is feasible from official sources.
- A staged implementation plan.
- Clear answer: what data can be automated server-side from address/geography, what requires parcel/tax document/accountant/user input, and what needs admin/GPT Pro follow-up.
- No vague claims. Use source-backed examples.

2. `GPT Pro Work/tax-local-dataset-codex-sweep-2026-07-03/official_local_tax_source_manifest.json`

Schema:
```json
{
  "schemaVersion": "retrofi_official_local_tax_source_manifest.v1",
  "generatedAt": "YYYY-MM-DD",
  "source": "codex_research_shell",
  "coverageSummary": {
    "salesUseTax": {},
    "propertyTax": {},
    "stateBusinessTax": {},
    "localBusinessTax": {},
    "programSpecificTaxIncentives": {}
  },
  "sources": [
    {
      "sourceId": "",
      "taxDomain": "sales_use_tax | property_tax | state_business_tax | local_business_tax | program_specific_tax_incentive | geography_boundary",
      "jurisdictionLevel": "federal | state | county | city | municipality | special_district | mixed",
      "jurisdictionsCovered": [],
      "officialOwner": "",
      "officialSourceName": "",
      "sourceUrls": [],
      "accessMethod": "download | API | lookup_tool | PDF | HTML_table | GIS_service | statute | regulation | form_instruction | unknown",
      "machineReadable": true,
      "formats": [],
      "updateFrequency": "",
      "effectiveDateHandling": "",
      "addressJoinKeys": [],
      "requiresParcelOrAccount": false,
      "requiresUserOrAccountantFacts": false,
      "canSupportRuntimeCalculation": "yes | partial | no",
      "runtimeUse": "",
      "knownLimitations": [],
      "importPriority": "high | medium | low",
      "sourceConfidence": "high | medium | low",
      "evidenceText": ""
    }
  ],
  "gaps": [
    {
      "gapId": "",
      "taxDomain": "",
      "jurisdiction": "",
      "gapDescription": "",
      "whyItMatters": "",
      "recommendedNextStep": "official_api_adapter | official_bulk_download | GPT Pro research | user_document_upload | accountant_input | assessor_review | defer",
      "priority": "high | medium | low"
    }
  ]
}
```

3. `GPT Pro Work/tax-local-dataset-codex-sweep-2026-07-03/importable_seed_examples.json`

Include small seed examples only, not huge full files:
- At least 5 sales/use tax source examples.
- At least 5 property tax/assessor source examples.
- At least 5 state business tax source examples.
- At least 5 local business tax source examples if official sources can be found; otherwise document why not.
- Include source URLs and evidence text for every example.

4. `GPT Pro Work/tax-local-dataset-codex-sweep-2026-07-03/runtime_tax_resolver_requirements.md`

Describe:
- required database tables;
- join strategy from Census/Geocodio-derived address facts;
- how to cache source lookups;
- how to gate calculations when a source is lookup-only or requires parcel/account details;
- how to represent source confidence vs estimate confidence;
- how user/accountant overrides should work.

5. `GPT Pro Work/tax-local-dataset-codex-sweep-2026-07-03/gpt_pro_gap_prompts.md`

Write targeted GPT Pro prompts only for unresolved gaps where GPT Pro can help.
Do not use GPT Pro prompts for work that should be done by downloading/importing official machine-readable datasets.

## Minimum quality bar

Before finishing, answer these explicitly in `local_tax_research_summary.md`:

1. Did you produce actual local tax rates/rules for all local jurisdictions in the US?
2. If not, why not?
3. What official machine-readable datasets can get us closest to automated nationwide coverage?
4. Which tax calculations can be automated from address alone?
5. Which calculations require parcel/APN, tax bill, account number, entity tax classification, filing data, or accountant input?
6. What should the next engineering step be?
7. What should be handed to GPT Pro next?

## Suggested approach

Use `rg`, `jq`, and small Node scripts to inspect existing artifacts.
Use web research for official current sources where needed.
Do not dump huge downloaded files into Git.
If you fetch data, save raw downloads under `var/tax-local-dataset-research/` and summarize metadata in the tracked manifest.

Expected result: this should take real research time. A complete and honest answer is likely a staged coverage plan plus seed manifests, not a finished all-locality tax database.
