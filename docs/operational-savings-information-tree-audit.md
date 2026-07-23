# Operational Savings Information-Tree Audit

## Executive result

All 54 operational-savings categories, all 92 canonical retrofit mappings, and all 16 Standards were re-audited at five separate layers.
The required result is 54 categories, 92 unique retrofit mappings, zero missing IDs, and zero duplicate IDs.
The audit now distinguishes structural completeness, semantic source support, formula correctness, default executability, and implementation readiness.
ITC-15 and the exact-model scenario for ITC-29 are `RESEARCHED — READY FOR HUMAN REVIEW`.
Forty-seven categories are `DRAFT`, five categories are `BLOCKED`, and all 16 Standards are `LIMITED`.
No Draft or Blocked category claims an executable golden fixture.

Current documentation state:

- Categories: 54.
- Generated standalone category pages: 54.
- Visible Information Cards: 54.
- Visible category-local Standard processes: 93.
- Visible direct source-link occurrences: 273.
- Information Card schema version: `operational-savings/information-card-v1`.
- Canonical retrofit mappings: 92.
- Missing mappings: 0.
- Duplicate mappings: 0.
- Shared branches: 6.
- Canonical Standards: 16.
- Standards with a selected automation strategy: 16.
- Expanded maximum atomic User inputs per category: 30.
- Expanded Required Screening inputs: 366.
- Expanded Conditional Calculation Gates: 5.
- Expanded Optional Known Details: 93.
- Maximum Required Screening inputs per category: 29.
- Categories above four Required Screening inputs: ITC-08, ITC-09, ITC-16, ITC-17, ITC-18, ITC-19, ITC-20, ITC-21, ITC-22, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-29, ITC-31, ITC-32, ITC-33, ITC-34, ITC-36, ITC-37, ITC-38, ITC-39, ITC-40, ITC-41, ITC-42, ITC-43, ITC-44, ITC-45, ITC-46, ITC-47, ITC-50, ITC-51, ITC-52, ITC-53.
- Category statuses: 2 `RESEARCHED — READY FOR HUMAN REVIEW`, 47 `DRAFT`, and 5 `BLOCKED`.
- Standard statuses: 16 `LIMITED`.
- Machine-readable source-evidence records: 42.
- Source-evidence statuses: UNSUPPORTED 7, UNVERIFIED 28, VERIFIED 7.
- Atomic formula terms: 445.
- Recorded category manual verdicts: 54.
- Recorded Standard manual verdicts: 16.
- Executable Ready-category golden fixtures: 2.

The status change from 7 Ready, 42 Draft, and 5 Blocked to 2 Ready, 47 Draft, and 5 Blocked is intentional.
The former Ready labels depended on source-role assumptions, unproved default inputs, or missing end-to-end fixtures.
The Standard status change from 14 Ready and 2 Limited to 16 Limited is also intentional.
A relevant authoritative URL does not prove that its exact fields support every baseline, proposal, usage, tariff, or geography role assigned to it.

## Audit method

The audit started from `RETROFIT_TYPES`, the real normalized Profile schema, and `data/bill_field_dictionary.json`.
It then reviewed every category formula, every expanded tree leaf, every rate component, every Standard output, and every default-estimate path.
The machine-readable evidence manifest is `docs/operational-savings-source-evidence.json`.
The machine-readable category and formula contract is `docs/operational-savings-category-contracts.json`.
Small reviewed source fixtures are stored under `docs/operational-savings-fixtures/sources`.
Ready-category executable fixtures are stored under `docs/operational-savings-fixtures/categories`.

The validator imports the production `normalizeUserProfile` function, derives its path and structure contract, and rejects a stale checked Profile-path fixture.
The validator regenerates all review artifacts and compares them byte for byte.
It rejects missing or stale pages, nonexistent Profile or Bill fields, unsupported Standard scenarios, unresolved formula terms, unknown or combined units, dimensional mismatches, invalid rate components, and unsupported Ready status.
It also rejects double application of FuelEconomy charging losses and double annualization of compressor output.

## Structural audit

The structural audit passed for 54 contiguous category IDs, 92 unique retrofit mappings, six recursively expanded shared branches, and 16 embedded Standards.
Every terminal source leaf is labeled User, Profile, Bill, Linked Opportunity, Derived, or is a referenced category-local Standard process.
Linked Opportunity and other derived project context are explicit internal intermediates and are no longer mislabeled as Profile fields.
Every User leaf has exactly one Required Screening, Conditional Calculation Gate, or Optional Known Detail classification.
Every generated page contains exactly one visible Information Card.
The visible order is the title, mapped retrofits, overview, broader formula, expanded formula, readable information tree, and only the category-local Standard processes referenced by that tree.
The pages omit audit status, readiness, evidence tables, input inventories, review decisions, and implementation gates while the canonical contracts, evidence manifest, fixtures, and validators retain those controls.

## Semantic source audit

The semantic source audit uses six independent source roles:

- Existing-equipment baseline.
- Proposed or qualified product.
- Usage or operating schedule.
- Physics or calculation method.
- Tariff or bill.
- Geographic or climate.

Every Standard output key has at least one evidence record with an exact artifact and exact field, table, page, equation, or function location.
Every declared Standard scenario must have compatible evidence that is not `UNSUPPORTED`.
Each evidence record declares every source role it supports and must appear under exactly those roles in its Standard summary.
`VERIFIED` means that the exact reviewed contract is deeply bound to a validated source fixture through JSON pointers for source identity, version, artifact, checksum, coverage, fields, units, values when present, unsupported inferences, and substantive records.
It does not mean that unrelated roles or project-specific inputs are supported.
Link validation covered 42 unique direct registry URLs.

The seven verified records cover the reviewed ENERGY STAR commercial dishwasher fields, FuelEconomy `comb08` and `combE`, PVWatts V8 input and output fields, WaterSense landscape design scope, and the two reviewed FEMP exterior-lighting table scopes.
Twenty-eight records remain unverified because an exact adapter, source export, module function, equation, or worked example has not been pinned.
Seven records explicitly mark unsupported existing-baseline or distribution uses.
Certification and product datasets resolve compatible equipment ratings only.
They do not resolve project usage, activity, operating schedules, or installed-equipment distributions.
WaterSense fixture criteria resolve compatible proposed rated flow or flush volume, not existing installed performance or commercial usage frequency.

## Unsupported claims removed

The following claims were removed or converted to explicit no-estimate behavior:

- Current certified-product datasets are not representative installed existing-equipment distributions.
- FEMP Table 1 is a proposed efficacy table, not an existing legacy-wattage distribution.
- FEMP Table 2 is a narrow wall-mounted example, not a general percentile population.
- FuelEconomy `combE` already represents wall electricity and must not receive another charging-efficiency divisor.
- WaterSense Water Budget Tool output is a design comparison, not measured actual landscape consumption or an irrigation schedule.
- A simulator is not a source for missing project capacity, flow, pressure, equipment size, operating schedule, load, tariff, or fuel availability.
- A Profile or Bill fallback is not allowed merely because a source URL exists.
- A generic percentile is disabled until the eligible population, filters, weights when applicable, sample size, and reviewed fixture are recorded.
- A whole-site bill quantity is not an end-use allocation unless the allocation is explicitly measured or confirmed.

## Formula audit

Formula/tree corrections are now recorded in the canonical category contract rather than only in narrative notes.
The category contract records 445 atomic formula terms.
Each record has one name, dimension, canonical unit ID, display unit, quantity kind, source or resolver, exact paths, fallback behavior, Standard output evidence, formula use, and missing-data behavior.
Every declared tree node must resolve to an exact node in the expanded category tree.
Every identifier used by a canonical formula must have an atomic formula-term contract and a matching expanded-tree path.
The Information Card renderer projects those identifiers into readable formula labels without changing the canonical contract.
Thermal and cross-fuel formulas now call `to_energy` or `to_billed_unit` explicitly instead of multiplying a common energy quantity by a price in an unrelated billing unit.
The versioned unit registry declares every category and source-fixture unit.
Explicit dimensional relationships validate the ITC-02 watt conversion, ITC-29 fuel and electricity arithmetic, and ITC-42 flow annualization.

Rate components are now declared per category and projected into shared branches.
Demand value requires a complete interval load and tariff path.
Export value requires an explicit export formula or traced integrated dispatch output.
Water and sewer are separate components.
ITC-34 excludes sewer because the reviewed WaterSense path is a landscape design allowance rather than evidence of avoided sewer billing.

The formula review corrected the highest-risk double-counting paths.
ITC-29 calculates added EV electricity as `annual_miles × proposed_combE / 100` with no second charging-efficiency adjustment.
ITC-42 integrates flow into flow-unit-hours per year once and does not multiply that annual quantity by annual hours again.
ITC-24 models PV and storage together rather than adding separate category savings.
ITC-26 uses one integrated microgrid result rather than summing overlapping component results.

## Default executability audit

Each category contract has a default-path proof with minimum required inputs, exact scenario, source fixture, low/base/high rule, final result path, uncertainty, executable fixture, and remaining gate.
A category cannot be Ready unless it names a `VERIFIED_EXECUTABLE` scenario, its declared executable golden fixture exists, and all referenced evidence is `VERIFIED`.
A Draft or Blocked category cannot claim an executable golden fixture.

ITC-15 is an executable Ready path.
Its golden fixture proves `S = 0`, low = base = high = 0 USD/year, an empty direct resource delta, and the boundary that another category's physical savings must not be duplicated.
The zero result is a category boundary, not an estimate of a linked physical measure.

ITC-29 is the first nonzero executable Ready path.
Its golden fixture uses exact FuelEconomy.gov vehicle IDs 43764 and 44444, user-confirmed service equivalence, synthetic project activity and prices, 32 miles per gallon, 28 kWh per 100 miles at the wall, 750 avoided gallons per year, 6,720 added kWh per year, and 1,617 USD per year of net savings.
The Ready verdict applies only to the exact-model scenario.
The vehicle-class percentile scenario remains `UNSUPPORTED`, and no second charging-efficiency factor is applied.

Every other category retains a concrete gate.
Typical gates include an exact installed baseline, a project scope or design, an end-use allocation, a chronological load, a complete tariff, a category-specific Standard adapter, or an end-to-end fixture.
Missing gates produce no estimate or a resource result without a dollar value as explicitly documented.

## Implementation readiness audit

Implementation readiness is intentionally stricter than structural completeness.
A complete tree and formula do not make an adapter production-ready.
The 47 Draft categories require one or more source adapters, project-input contracts, tariff parsers, category fixtures, or product decisions.
The five Blocked categories require a defensible source or semantic method that is not currently available.

The highest-value implementation sequence is:

1. Pin category-specific CCMS and ENERGY STAR export schemas with exact product filters and retained fixtures.
2. Pin interval-load and tariff schemas before implementing demand, export, storage, charging, or dispatch categories.
3. Pin each MEASUR category to an exact module, function, units, inputs, outputs, and golden example.
4. Add end-to-end fixtures only after the source role and formula contract is stable.
5. Promote a category to Ready only after the validator proves its full default path.

## Generated Information Card workflow

The category registry, Standard registry, evidence manifest, category contract, Information Card registry, and closed Information Card schema are the maintained sources.
The generator recursively expands shared branches, filters rate components, traces Standard lookup keys, projects recognizable Profile and Bill leaves, and renders one Information Card per category.
Category-specific process definitions keep exact-product and requirements-only linked-opportunity paths distinct where a product resolver applies.
Simple bill-derived rates remain Bill and Derived branches and never become Standards.
Canonical formulas, evidence roles, readiness proofs, fixtures, and status controls remain outside the visible cards.
Freshness validation compares every generated byte with a deterministic render.

## Atomic User-input review

The Required Screening count reflects simple facts needed to attempt the ordinary path.
Conditional Calculation Gates defer exact fixture records and exact vehicle records until the selected scenario needs them and no approved fallback exists.
MEASUR, SAM, PVWatts, wind, REopt, EPA CHP, and WaterSense method inputs remain visible wherever the reviewed source does not actually supply a fallback.
This is not a recommendation to ask all questions at once.
Required Screening inputs are ordinary path facts.
Conditional Calculation Gates are mandatory only after their activation conditions are met.
Optional Known Details replace a corresponding assumption, select an exact path, or enable an explicitly optional component.
Progressive disclosure should request only the inputs for the selected opportunity and scenario.

## Mutation tests

The focused test suite proves that the validator fails for:

- A missing generated page or a stale generated page.
- A generated page with a second top-level card, a banned audit heading, a missing required card component, or a changed component order.
- An Information Card schema with an added field or a missing required field.
- A tree process without exactly one matching process section, or a process section that is not referenced by the tree.
- A duplicate visible Standard number or a Standard missing Purpose, Source, Lookup Inputs, Value Needed, How to Use, Automation, or Validation.
- A Standard source without a direct visible URL.
- A technical source identifier exposed as a User input.
- A Profile leaf outside the production-backed presentation projection.
- A simple Bill-derived rate rendered as a Standard.
- A Linked Opportunity engineering value without an interpreting process.
- A repeated result root, generic retrofit branch, unsupported generic route, generic Validation, or source-evidence contradiction.
- An undefined or circular shared branch.
- A missing embedded Standard or source link.
- A missing exact evidence field.
- An evidence record omitted from one of its declared source roles.
- Proposed-product evidence used as an existing baseline.
- An unsupported Profile or Bill equipment fallback.
- An evidence record that names an undeclared Standard lookup input.
- A forced unsupported Standard scenario.
- A percentile without eligible-population filters, sample size, and a fixture.
- A formula term without a tree node.
- A formula term marked unused.
- A tree User input unused by the formula or a traced Standard.
- A displayed formula identifier without a formula-term contract.
- A formula-term unit mismatch.
- A high-sensitivity project input made optional without a source-supported resolver.
- A resource-energy conversion without a formula-term contract.
- An unused resource-energy conversion contract.
- A second charging-efficiency adjustment for FuelEconomy `combE`.
- An annual quantity multiplied by annual hours twice.
- Demand without an interval load path.
- Export without an export formula or traced dispatch.
- Sewer on the ITC-34 irrigation design path.
- A nonexistent Profile path or Bill field.
- A Ready category without a golden fixture.
- A Ready category that references unverified evidence.
- A VERIFIED evidence binding with a substituted fixture type, source title, source URL, source version, artifact, field, unit, reviewed value, unsupported inference, checksum, or substantive pointer.
- A normalized Profile path fixture with a missing path, renamed path, wrong object or array structure, or stale checksum.
- A formula term with a missing or unknown unit ID, a combined unit, or unit metadata that disagrees with the versioned registry.
- A dimensional relationship with an incompatible multiplication or division result.
- A Conditional Calculation Gate without activation, term, no-estimate, or future-Standard metadata.
- A Ready category that does not name a `VERIFIED_EXECUTABLE` scenario.
- An ITC-29 golden fixture with a changed vehicle ID, `comb08`, `combE`, service-equivalence confirmation, charging-loss guard, or nonzero arithmetic result.

## Manual review record

The following category verdicts were recorded after reviewing the formula, source roles, tree, rates, default path, and implementation gate.

| Category | Verdict | Recorded manual verdict |
|---|---|---|
| `ITC-01` | DRAFT | Formula is coherent, but the current allowlist and quartile claims are not proved by local source fixtures. |
| `ITC-02` | DRAFT | FEMP does not support the former legacy-wattage percentile or Profile/Bill fallback. |
| `ITC-03` | DRAFT | No class-based existing baseline or default fuel allocation is supported. |
| `ITC-04` | DRAFT | The formula is reasonable, but the MEASUR umbrella claim is not an executable adapter. |
| `ITC-05` | DRAFT | No exact Scout definition or measured duct leakage is yet available. |
| `ITC-06` | DRAFT | Current efficient-product data cannot resolve unknown existing equipment. |
| `ITC-07` | DRAFT | No source-supported existing equipment class or Profile/Bill model inference exists. |
| `ITC-08` | DRAFT | The simulator cannot supply missing capacity, configuration, load, or backup inputs. |
| `ITC-09` | DRAFT | Annual useful-heat savings are bounded by explicit existing and proposed distribution losses. No bill branch or generic MEASUR default substitutes for those inputs. |
| `ITC-10` | DRAFT | Current certified products cannot serve as the existing refrigeration baseline. |
| `ITC-11` | DRAFT | The source and end-use allocation are not executable. |
| `ITC-12` | DRAFT | Motor efficiency must be applied once, and no generic adapter is approved. |
| `ITC-13` | DRAFT | Usage-unit conversion is explicit, but source adapters are incomplete. |
| `ITC-14` | BLOCKED | Semantic crosswalks and site applicability are not defensible. |
| `ITC-15` | RESEARCHED — READY FOR HUMAN REVIEW | The category intentionally returns zero and prevents duplicate physical savings. |
| `ITC-16` | DRAFT | Demand value is allowed because interval kW and billing-demand rules are explicit, while export is excluded. |
| `ITC-17` | DRAFT | PVWatts fields are verified, but no system-design default or executable bill path exists. |
| `ITC-18` | DRAFT | The formula is contract-based and must not inherit utility marginal-rate, demand, or export branches. |
| `ITC-19` | DRAFT | The simulator is not a source for missing turbine design, and export is shown only because the formula models it. |
| `ITC-20` | DRAFT | EPA can support a proposed technology class, not missing project capacity or operation. |
| `ITC-21` | DRAFT | The heat and fuel terms are separated, but the default design path is unsupported. |
| `ITC-22` | DRAFT | Organization type cannot be used to infer fuel availability or heating value. |
| `ITC-23` | DRAFT | Demand is modeled from interval kW, and export is excluded from the declared formula contract. |
| `ITC-24` | DRAFT | PV and storage must be modeled together to avoid double counting. |
| `ITC-25` | DRAFT | Export is excluded because the category does not model generation. |
| `ITC-26` | DRAFT | No generic microgrid design fallback is defensible, and separate component savings must not be added. |
| `ITC-27` | DRAFT | Demand is explicit from interval added load, and export is excluded. |
| `ITC-28` | DRAFT | No class distribution or extra charging-efficiency adjustment is allowed. |
| `ITC-29` | RESEARCHED — READY FOR HUMAN REVIEW | Ready only for the exact-model scenario backed by vehicle IDs 43764 and 44444, explicit service-equivalence confirmation, exact project activity and prices, and the nonzero golden fixture. The class-percentile scenario remains unsupported. |
| `ITC-30` | BLOCKED | Only exact measured or contractual project inputs can unblock the category. |
| `ITC-31` | DRAFT | Demand is explicit from interval charging, and export is excluded. |
| `ITC-32` | DRAFT | Annual uses, minutes per use, existing rated flow, hot-water fraction, temperature rise, and heater efficiency are explicit. WaterSense supplies only compatible proposed performance. |
| `ITC-33` | DRAFT | Annual flushes and existing rated flush volume are explicit. WaterSense supplies only compatible proposed performance. |
| `ITC-34` | DRAFT | The bill cap and sewer default are removed, and the result is not labeled measured operational savings. |
| `ITC-35` | DRAFT | No unmeasured leak rate or duration default is allowed. |
| `ITC-36` | DRAFT | Water and fan components are separate, and sewer applicability cannot be assumed. |
| `ITC-37` | DRAFT | The cubic affinity law applies to shaft-power fraction only. The pinned MEASUR adapter must convert shaft power to electrical input without applying efficiency twice. |
| `ITC-38` | DRAFT | Efficiency is applied once through reciprocal input-power terms. |
| `ITC-39` | DRAFT | Pinned MEASUR bin outputs must provide electrical input directly. No standalone cube-law input-power adjustment or second annual-hours factor is allowed. |
| `ITC-40` | DRAFT | The simulator does not supply flow, head, or geometry. |
| `ITC-41` | DRAFT | No generic airflow, pressure, or fan curve is allowed. |
| `ITC-42` | DRAFT | The integration basis is flow-unit-hours per year, so annual flow-hours cannot be multiplied by another annual-hours term. |
| `ITC-43` | DRAFT | Leak flow has no safe generic default. |
| `ITC-44` | DRAFT | Bin hours are the annualization basis and cannot be multiplied by another annual-hours term. |
| `ITC-45` | DRAFT | Whole-bill resource caps require a matching end-use allocation, not an unrelated bill. |
| `ITC-46` | DRAFT | Broad process labels cannot supply temperatures, loads, or proposed performance. |
| `ITC-47` | DRAFT | No generic trap loss or pressurized-hours default is allowed. |
| `ITC-48` | BLOCKED | Only a measured project-specific comparison can unblock the category. |
| `ITC-49` | BLOCKED | Component ratings cannot be promoted to a whole-box annual result. |
| `ITC-50` | DRAFT | Each product family must preserve its test unit. Usage or activity remains a required project input, and no cross-family usage conversion is allowed. |
| `ITC-51` | DRAFT | Health value is out of scope, fan physics inputs remain project-specific, and the flow-pressure product is converted to kW exactly once. |
| `ITC-52` | DRAFT | Flight-type gallons/hour and rack-machine gallons/rack remain separate, and total water is not promoted to purchased water-heating input without a wash, rinse, booster, and resource boundary. |
| `ITC-53` | DRAFT | Hot-water savings and optional machine-only electricity are computed as separate existing and proposed deltas. The modified-energy-factor total is not applied directly. |
| `ITC-54` | BLOCKED | Default routine-use and resilience value remain excluded. |

The following Standard verdicts were recorded after reviewing every declared source role and output.

| Standard | Verdict | Recorded manual verdict |
|---|---|---|
| `STD-COMSTOCK-ANNUAL-DELTA` | LIMITED | The release can support an archetype simulation delta after a reviewed crosswalk and aggregate fixture exist, but it cannot establish a project-specific exact product. |
| `STD-SCOUT-ECM-SCREEN` | LIMITED | Scout is a segment-level ECM method, and exact category crosswalks and performance fields still need reviewed fixtures. |
| `STD-DOE-CCMS-RATINGS` | LIMITED | Current certification records can support an exact current product after a product-specific export is reviewed, but they do not supply an installed-equipment population. |
| `STD-ENERGY-STAR-PRODUCT-DATA` | LIMITED | The dishwasher schema proves several proposed-product fields, while other product families and all existing-equipment or usage claims remain unverified or unsupported. |
| `STD-DOE-MEASUR` | LIMITED | Every category remains at no estimate until its exact module, inputs, units, outputs, function, and golden example are pinned. |
| `STD-SAM-SOLAR-THERMAL` | LIMITED | SAM can calculate performance after design, weather, load, and backup inputs are supplied, but it is not a source for those project inputs. |
| `STD-PVWATTS-V8` | LIMITED | The API field contract is verified, but required system-design inputs are project facts and no default design range is supported. |
| `STD-WIND-SAM` | LIMITED | The simulator requires an explicit turbine, power curve, hub height, losses, and resource selection. |
| `STD-REOPT-LOCAL-DISPATCH` | LIMITED | REopt can calculate dispatch only after a complete chronological load, tariff, technology, and operating-constraint set is provided. |
| `STD-EPA-CHP-PERFORMANCE` | LIMITED | EPA rows can support proposed screening classes and a transparent energy balance, but they do not identify exact equipment or supply site design and coincidence inputs. |
| `STD-FUELECONOMY-VEHICLES` | LIMITED | Exact vehicle records and units are verified, while class distributions are disabled until compatibility filters and sample-size fixtures are reviewed. |
| `STD-WATERSENSE-FIXTURES` | LIMITED | WaterSense criteria support proposed performance, while existing installed ratings and commercial usage frequency remain unresolved. |
| `STD-WATERSENSE-LANDSCAPE` | LIMITED | Version 2.0 compares designed landscape water use with typical standard new construction, not actual consumption or irrigation scheduling. |
| `STD-WATERSENSE-CI-OPERATIONS` | LIMITED | Leak and cooling-tower equations still require exact page, equation, and worked-example fixtures. |
| `STD-FEMP-EXTERIOR-LIGHTING` | LIMITED | Table 1 provides proposed efficacy requirements, while Table 2 is one narrow wall-mounted example and neither supplies a legacy-wattage distribution. |
| `STD-OPERATING-SCHEDULE` | LIMITED | Explicit calendar and daylight calculations are defensible after all inputs are supplied, while a business label alone does not prove annual operating hours. |

## Focused manual inspection

All five canonical source fixtures were inspected after schema normalization.
The ENERGY STAR fixture preserves native dishwasher field units and does not infer installed baselines or usage.
The FEMP fixture keeps proposed efficacy rows separate from the narrow wall-mounted example.
The FuelEconomy fixture retains exact record IDs, official response checksums, `comb08`, `combE`, compatibility facts, and the explicit service-equivalence boundary.
The PVWatts fixture records the reviewed schema snapshot and its checksum limitation.
The WaterSense fixture labels its result as a modeled design allowance rather than measured consumption.

All seven `VERIFIED` evidence records were inspected against their JSON Pointer bindings.
The bound URL, version, artifact, checksum, coverage, fields, canonical units, exact values when present, unsupported inferences, and substantive records match their evidence metadata.
No `LIMITED` evidence record is used by ITC-29.
ITC-29 uses two `VERIFIED` evidence records and one `UNSUPPORTED` distribution record only to document why the class-percentile scenario stays disabled.

All 54 generated Information Cards were manually inspected for the required structure, readable formulas, source-labeled leaves, process placement, and absence of banned audit material.
The required deep-inspection sample was reviewed in full:

- `ITC-02` uses the approved exterior-lighting tree, separates exact-product and requirements-only proposal paths, and leaves the electricity rate Bill-derived.
- `ITC-08` places collector design and project load requirements on the Linked Opportunity path and connects them to the SAM process.
- `ITC-15` still proves the zero-direct-resource boundary.
- `ITC-17` keeps PV design specifications on the Linked Opportunity path and does not invent a system design.
- `ITC-23` keeps battery design specifications on the Linked Opportunity path and retains chronological interval load and tariff requirements.
- `ITC-27` separates exact charger lookup from requirements-only charger resolution and treats the result as an operational cost impact.
- `ITC-29` recomputes to 375 gallons and 3,360 kWh per vehicle-year, 750 gallons and 6,720 kWh per project-year, and 1,617 USD per year.
- `ITC-32` keeps water and water-heating resource terms separate and uses distinct exact-product and requirements-only WaterSense paths.
- `ITC-34` keeps existing irrigation inputs separate from proposed Linked Opportunity specifications and retains a modeled landscape design allowance with no sewer default.
- `ITC-39` keeps MEASUR bin output and annualization boundaries explicit.
- `ITC-52` preserves gallons per rack, gallons per hour, idle kW, and active kWh per rack as separate quantities.
- `ITC-54` remains Blocked because no authoritative cross-technology routine-use resolver exists.

The deep-inspection sample was also checked for direct source URLs, readable user-facing inputs, exact Standard numbering, and the absence of status, readiness, evidence, and review-decision sections.

## Unresolved blockers

ITC-14 requires approved exact Scout semantic crosswalks and site-applicability rules.
ITC-30 lacks an authoritative cross-fuel forklift performance dataset.
ITC-48 lacks a validated commercial induction cross-fuel duty source.
ITC-49 lacks a whole-system walk-in refrigeration annual-energy resolver for a specific box and duty.
ITC-54 lacks one authoritative routine-use resolver across generator, battery, and hybrid backup technologies.

## High-uncertainty Standards

ComStock and Scout remain high uncertainty for an individual site until exact semantic mappings and reviewed population fixtures exist.
SAM wind remains high uncertainty without onsite resource validation and a compatible documented power curve.
EPA CHP remains high uncertainty for generic biomass or biogas screening because fuel quality, availability, and thermal coincidence dominate the result.
MEASUR remains unverified at the category adapter level even when the upstream software is authoritative.

## Release gates

### A1 - Integration and sync

Regenerate all 54 category pages and the index from the canonical registries and contracts.
Require a clean freshness check and zero taxonomy, branch, Standard, Profile, Bill, evidence, and semantic-contract errors.

### A2 - Adversarial correctness

Run the generator and validator unit tests, including every semantic mutation listed above.
Require each mutation to fail for the intended reason.
Run the repository checks that cover the changed scripts and documentation.

### A3 - Release readiness

Keep the pull request in Draft.
Do not merge, deploy, access AWS, or change secrets.
Require GitHub Actions to complete successfully before requesting human review.
