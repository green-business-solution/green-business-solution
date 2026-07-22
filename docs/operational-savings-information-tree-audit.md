# Operational Savings Information-Tree Audit

## Executive result

The strict identity audit produces 54 information categories for 92 canonical retrofit taxonomy types.
The mapping is intended to contain every canonical ID exactly once.
The focused validator is the independent proof and must remain green after every edit.

Current documentation state:

- Categories: 54.
- Canonical retrofit mappings: 92.
- Missing mappings: 0.
- Duplicate mappings: 0.
- Shared branches: 5.
- Canonical Standards: 14.
- Standards with a selected automation strategy: 14.
- Expanded maximum User inputs per category: 5.
- Categories above four User inputs: ITC-37, ITC-47, ITC-52, ITC-53, ITC-54.
- Category statuses: 28 `RESEARCHED — READY FOR HUMAN REVIEW`, 21 `DRAFT`, and 5 `BLOCKED`.
- Standard statuses: 12 `RESEARCHED — READY FOR HUMAN REVIEW` and 2 `LIMITED`.

## Audit method

The review started from `RETROFIT_TYPES` in `apps/api/server/matching/retrofitTaxonomy.mjs`, not from the inherited documentation count.
It compared every proposed shared category across formula, supporting formulas, tree structure, source labels, required user facts, profile and bill inputs, Standard lookups, missing-data behavior, bill treatment, automation, and platform behavior.
It also reviewed `normalizeUserProfile.mjs`, the energy-data parser and bill field dictionary, and the existing savings engine to separate current implementation facts from future documentation requirements.

The inherited 41-category draft was rejected as the architectural target.
It grouped unrelated technologies under a common algebraic shape even when sources and operating data differed.
Examples included LED lighting with pumps and compressors, fuel cells with CHP and biomass, and generic process electrification with induction cooking.

The replacement architecture uses three deliberate kinds of reuse:

1. A category may contain different records inside one Standard when the complete tree and behavior are identical.
2. A shared branch may be referenced only when its value, source leaves, fallback, and platform behavior are identical.
3. Standards are canonical and are never copied into category prose.

## Source-validation record

Each selected source below was opened and its relevant data, method, access path, and maintenance posture were reviewed.

| Standard | Verified source surface | Access and version finding | Result |
|---|---|---|---|
| `STD-COMSTOCK-ANNUAL-DELTA` | ComStock data, upgrade measures, OEDI layout, and 2025 Release 3 reference PDF | Public individual-building annual-result files, data dictionary, crosswalk, and known-issue pages are available | Ready with individual-building uncertainty |
| `STD-SCOUT-ECM-SCREEN` | DOE Scout description, ECM summaries, and open-source definitions | Public and versionable, but the five category mappings need human semantic approval | Limited |
| `STD-DOE-CCMS-RATINGS` | DOE certification database, program description, and product templates | Human-accessible interactive records; anonymous automated retrieval returned HTTP 403 | Limited; analyst export required |
| `STD-ENERGY-STAR-PRODUCT-DATA` | Product Finder datasets and EV charger product pages | Public downloadable datasets updated frequently | Ready |
| `STD-DOE-MEASUR` | DOE MEASUR modules, downloads, and calculator list | Public open-source local execution | Ready |
| `STD-SAM-SOLAR-THERMAL` | SAM site and source repository | Public local compute modules | Ready |
| `STD-PVWATTS-V8` | PVWatts V8 inputs and outputs plus SAM source | API is public with a key, while local SAM avoids runtime dependence | Ready |
| `STD-WIND-SAM` | WIND Toolkit download documentation and SAM | Download API needs a key and email; local cache is practical | Ready with High uncertainty |
| `STD-REOPT-LOCAL-DISPATCH` | Stable V3 documentation and REopt.jl source | Public local solver avoids runtime API dependence | Ready |
| `STD-EPA-CHP-PERFORMANCE` | Current CHP catalog pages, methodology, and workbook | Public; biomass catalog is useful but partly outdated | Ready, with biomass caveat |
| `STD-FUELECONOMY-VEHICLES` | Web-service schema and current bulk vehicle downloads | Public CSV with documented `comb08` and `combE` fields | Ready |
| `STD-WATERSENSE-FIXTURES` | WaterSense at Work and fixture specifications | Public guide and criteria | Ready |
| `STD-WATERSENSE-LANDSCAPE` | Water Budget Tool and commercial outdoor tools | Public workbook and data download | Ready |
| `STD-WATERSENSE-CI-OPERATIONS` | WaterSense commercial best practices and worksheets | Public direct equations | Ready |

No licensed source is required by the selected architecture.
ASHRAE and proprietary engineering databases were intentionally not made runtime or build prerequisites.
Link validation covered 37 unique direct registry URLs.
Thirty-six returned HTTP 200 on July 22, 2026, and the direct DOE certification database returned the explicitly documented HTTP 403.

## Current implementation constraints

Stage 1 currently provides organization classification, site address and resolved geography, building type, approximate square footage, ownership, electric-utility candidate, project interests, and related intake data.
The utility value is a provider candidate, not a verified tariff.

The bill pipeline supports electric, gas, water and sewer, and waste fields, including annual or monthly quantities, costs, blended rates, rate schedule, customer class, peak demand, demand charges, and time-of-use fields when present.
It does not guarantee a complete interval load series or machine-readable tariff.

The existing savings engine mostly consumes user-modeled reductions and blended prices.
This documentation intentionally requires marginal-rate treatment, fixed-charge exclusions, chronological data for demand and time-of-use value, and local authoritative lookups.
No production calculation code or reference dataset is implemented in this work.

## Unresolved blockers

### ITC-14 Scout crosswalk

Five taxonomy types use the same proposed Scout tree, but the mapping is blocked until a human reviews exact ECM definitions for air sealing, exterior doors, cool roofs, building automation, and energy management.
Keyword similarity is insufficient.
If any exact definition is absent, that taxonomy type must split into a project-engineering category with a different source and missing-data behavior.

### ITC-30 forklift performance

No authoritative public model-level dataset was validated for comparable combustion and electric forklift resource consumption under a defined duty cycle.
The category therefore requires measured or contractual project values and remains BLOCKED for automated model lookup.

### ITC-48 induction cooking performance

The available ComStock cooking scenario models broad electric cooking equipment and does not validate an induction-specific cross-fuel performance record.
No authoritative public commercial model-level dataset or standardized cross-fuel duty lookup was validated.
The category therefore remains BLOCKED unless the project supplies a bill allocation or direct measurement and proposed induction performance tested for the same cooking duty.

### ITC-49 walk-in refrigeration system performance

DOE certification records describe walk-in components, but those ratings do not independently resolve whole-system annual electricity for a specific box, climate, temperature, infiltration, and product load.
The category therefore remains BLOCKED unless the project supplies a measured or allocated baseline and a proposed whole-system result under the same duty.

### ITC-54 backup-power routine use

The backup-power taxonomy spans generator, battery, and hybrid systems without one validated public model-level routine-use source.
The category therefore remains BLOCKED for automation, but project-specific test fuel and standby-electricity values can produce a bounded negative resource result.

## Draft categories and what closes them

- `ITC-04`: Golden-test the selected MEASUR boiler-control adapter and approve its minimum control-sequence inputs.
- `ITC-03`, `ITC-06`, `ITC-07`, `ITC-10`, and `ITC-13`: Approve a repeatable DOE certification-database export process and fixture-test each product adapter.
- `ITC-05`: Approve an exact Scout duct measure or replace it with a measured leakage path.
- `ITC-09`: Prove a minimum-input recirculation calculation without hiding pipe geometry behind defaults.
- `ITC-11`: Approve exact Scout refrigeration-control records or split the three retrofit types.
- `ITC-16`: Golden-test the explicit shed and rebound load-template adapter because REopt has no generic demand-response object.
- `ITC-18`: Product-approve the contract and bill field model for community-solar credits and charges.
- `ITC-22`: Approve the treatment of project-specific biomass or biogas fuel quality and the older EPA catalog.
- `ITC-26`: Approve the conditional microgrid component schema and cross-category regression fixtures.
- `ITC-27`: Golden-test the public-charging session-load template and tariff valuation path.
- `ITC-28`: Add an authoritative path for medium- and heavy-duty fleet efficiency or restrict the category to measured values.
- `ITC-31`: Approve the fleet availability schema, unmanaged counterfactual, and fixed-load adapter because REopt has no EV managed-charging object.
- `ITC-35`: Confirm product behavior that reports zero until a measured leak and repair duration exist.
- `ITC-37`: Source-map and golden-test the weather-sensitive makeup-air thermal adapter.
- `ITC-50`: Approve the three cooking-product adapters that preserve certified test units, active efficiency, and idle energy separately.
- `ITC-52`: Fixture-test dishwasher sanitation, booster-heater, water-use, and idle-energy treatment without assuming a racks-per-hour conversion.
- `ITC-53`: Approve the commercial-washer adapter and require separate site-resource decomposition instead of applying the composite modified energy factor to a utility bill.

## High-uncertainty Standards

- `STD-SCOUT-ECM-SCREEN` has High uncertainty for an individual site because it is a national or market-segment model and the proposed taxonomy crosswalk is not approved.
- `STD-WIND-SAM` has High uncertainty without onsite resource validation because gridded wind and terrain may not represent turbine micrositing.
- `STD-EPA-CHP-PERFORMANCE` has High uncertainty for generic biomass or biogas screening because fuel quality, availability, and thermal coincidence dominate the result and part of the catalog is outdated.

The application should display uncertainty as a screening range, not an invented precision percentage.

## Category boundaries requiring the most human attention

1. `ITC-14` is the highest-risk boundary because all five types depend on exact Scout semantic coverage.
2. `ITC-01` contains 13 ComStock measure records under one identical lookup tree.
The grouping is valid only if product accepts the same existing-condition selector, proposed-option selector, uncertainty display, bill cap, and no-measure-combination behavior for all records.
3. `ITC-50` groups fryers, ovens, and steamers only through the same tested cooking-duty plus idle-energy balance.
The grouping remains valid only if every product adapter preserves its exact test load, fuel, and reported idle unit.
4. `ITC-39` groups VFDs and pump or fan controls only when both use the same validated load-bin input tree.
5. `ITC-41` groups efficient fans and efficient ventilation systems only at a fan-system boundary with identical airflow, pressure, schedule, and MEASUR inputs.
6. `ITC-46` groups industrial heat pumps and other process electrification only through the same useful-process-heat balance, with technology-specific COP or efficiency as a record selection.
7. `ITC-48` remains separate from both ComStock and industrial process electrification because commercial cooking duty, source coverage, and missing-data behavior differ.
8. `ITC-26` composes only component models that independently pass their own input gates and remains DRAFT until that conditional contract is executable.
9. `ITC-27` and `ITC-28` require interval tariff valuation because EV charging can create demand charges that a volumetric average cannot represent.
10. `ITC-10` covers only self-contained refrigeration products with a certified whole-product energy value, while `ITC-49` isolates walk-in system modeling.
11. `ITC-13` uses directly reported ice-production intensities, `ITC-50` models cooking efficiency and idle energy, `ITC-52` isolates dishwasher sanitation and water-heating behavior, and `ITC-53` prevents standardized laundry energy assumptions from being treated as site resources.
12. `ITC-51` is excluded from the zero-value enabling category because filtration can create or change fan electricity use.
13. `ITC-54` is excluded from the zero-value enabling category because backup systems can consume test fuel and standby electricity even though resilience value is out of scope.

## Minimum-information review

Every category expands to at most five User inputs after shared branches are included.
Only `ITC-37`, `ITC-47`, `ITC-52`, `ITC-53`, and `ITC-54` require five because they respectively combine fan and makeup-air behavior, steam-loss conditions, dishwasher water and idle behavior, laundry water and site-energy decomposition, or separate backup test and standby schedules.
High-sensitivity facts remain User leaves when the profile and bills cannot resolve them, including equipment identity, operating schedule, load fraction, interval availability, process temperature, thermal coincidence, or site wind configuration.

The architecture avoids broad new Stage 1 questions.
Profile building type, geography, and floor area feed the ComStock screen automatically.
Product and engineering details belong in measure-specific follow-up flows after a relevant opportunity is linked.

Bill-derived fields are limited to values that can be extracted or deterministically calculated from actual bills and tariff records.
Provider candidates, annual totals, blended prices, and monthly peaks are not promoted into tariff class, marginal rate, or chronological demand data.

## Automation review

All 14 Standards select one practical strategy.
Bulk or periodic local ingestion is used for ComStock, DOE CCMS, ENERGY STAR, FuelEconomy.gov, WaterSense data, and WIND Toolkit resources.
Local version-pinned execution is used for MEASUR, SAM, PVWatts, and REopt.
Small stable federal tables are manually reviewed once and stored with provenance where automation would cost more than it saves.

No selected design depends on a live runtime API when a practical local dataset or open-source compute module exists.
No Standard proposes speculative columns.
Each local artifact must retain source version, retrieval date, schema version, checksums where available, and raw provenance fields.

## Efficient implementation estimate

The Standards individually estimate roughly 35 to 47 developer days if built as separate first-time efforts.
Shared ingestion, provenance, schema-diff, and regression-test infrastructure should reduce the practical program estimate to 29 to 39 focused developer days for one experienced developer using AI assistance.

Recommended order:

1. Build the common provenance manifest, versioned local-artifact contract, schema-diff checks, and bill-rate boundary.
2. Implement ComStock, ENERGY STAR, DOE CCMS, WaterSense, and FuelEconomy bulk ingestions.
3. Add local MEASUR adapters with DOE golden tests.
4. Add local PVWatts and SAM solar-thermal wrappers.
5. Add REopt interval dispatch and the shared EV charging load-template adapters only after interval load and tariff completeness gates exist.
6. Add WIND Toolkit caching and wind simulation.
7. Add the small EPA CHP performance table and biomass warnings.
8. Resolve the Scout, forklift, induction, walk-in refrigeration, and backup-power blockers after human architecture review.

## A1, A2, and A3 review record

### A1 - Integration and sync

The branch was based on the current `origin/main` at the start of this pass.
The taxonomy, profile normalization, bill parser and dictionary, savings engine, product vision, matching model, data model, repository workflow, and review instructions were inspected before the redesign.
No production code, AWS resource, deployment, secret, or main-branch state is changed.

### A2 - Adversarial correctness

The final validation must prove exact taxonomy coverage, source-label syntax, category field order, unique branch and Standard definitions, and valid references.
The manual review must also reject false shared categories, whole-bill rates presented as marginal prices, annual energy presented as demand, missing quantity factors, silent high-sensitivity defaults, combined ComStock measures, and duplicate attribution to enabling measures.

### A3 - Release readiness

This is documentation-only and remains human-review material.
Completion requires a clean focused validator, repository-selected checks, source-link validation, full diff review, committed and pushed changes on `docs/operational-savings-information-trees`, and an updated draft PR #29.
It does not authorize deployment or merge.

## Final review checklist

- [ ] Focused validator passes with 54 categories and 92 unique mappings.
- [ ] All direct source URLs return an acceptable response or an explicitly documented access limitation.
- [ ] Repository CI selector is run against `origin/main`.
- [ ] Selected documentation checks pass.
- [ ] Full diff contains no runtime calculation or dataset implementation.
- [ ] Branch commits are pushed.
- [ ] Draft PR #29 contains exact totals, checks, blockers, risks, and implementation estimate.
