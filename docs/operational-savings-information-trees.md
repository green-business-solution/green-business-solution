# Operational Savings Information Trees

## Purpose and boundary

This document defines the minimum information needed to estimate predictable annual direct operational-resource value for every canonical retrofit taxonomy type.
It is a screening architecture, not an investment-grade audit.
It includes purchased electricity, demand, fuel, water, sewer, and waste only when a category has an explicit direct formula.
It excludes project costs, incentives, taxes, financing, maintenance, repairs, downtime, productivity, equipment life, resilience monetization, comfort, health, revenue, asset value, emissions, and speculative benefits.

The canonical taxonomy is `RETROFIT_TYPES` in `apps/api/server/matching/retrofitTaxonomy.mjs`.
The canonical external lookup specifications are in `docs/operational-savings-standard-registry.md`.
The generated presentation projection is defined by `scripts/operational-savings-information-card-registry.mjs` and validated against `docs/operational-savings-information-card.schema.json`.
The generated internal User-input realism contract is `docs/operational-savings-user-input-realism.json` and is validated against `docs/operational-savings-user-input-realism.schema.json`.
The focused validation command is `node scripts/validate-operational-savings-information-trees.mjs`.
The generated standalone Information Card index is `docs/operational-savings-review/README.md`.
Regenerate it with `node scripts/generate-operational-savings-review-pages.mjs` and verify freshness with `node scripts/generate-operational-savings-review-pages.mjs --check`.

## Conventions

- `S` is annual direct operational-resource savings in dollars.
- `ΔR_r` is annual avoided resource `r` in the bill's native unit and may be negative when a retrofit adds resource use.
- `p_r` is the avoidable marginal price for resource `r` from BR-AVOIDABLE-RESOURCE-RATE.
- `to_energy(resource_quantity, resource_unit)` and `to_billed_unit(energy, resource_unit)` are explicit deterministic conversions between a bill's native resource unit and the common energy unit used by a formula.
- Every thermal formula must perform this conversion before multiplying a resource quantity by a price, even when the conversion is an identity for electricity.
- Fixed charges are excluded unless the proposed case demonstrably removes the charge.
- A whole-bill average is not a marginal rate.
- Annual energy is not interval demand.
- Categories without chronological load and tariff data value volumetric energy only and never claim demand-charge savings.
- A utility-provider candidate is not a verified tariff or customer class.
- User inputs are recognizable facts or business activities that a normal business representative can provide without reading a technical specification or performing an engineering calculation.
- Every visible terminal User leaf must have one explicit category-specific realism decision, selected-value method, and missing-exact-value behavior.
- Equipment labels, measurements, audits, engineering studies, contractor specifications, commissioning records, maintenance plans, and uploaded operating records are Project Documents.
- Linked Opportunities contain only incentive, rebate, grant, tax, or other opportunity requirements and explicitly named products.
- Standard-derived generic values must remain visible and editable.
- Every unresolved input follows the exact-to-benchmark fallback order and produces one selected value.
- A missing exact value never produces a calculation range, removes the estimate, or becomes zero unless the actual operational effect is legitimately zero.

Allowed category and branch statuses are `DRAFT`, `RESEARCHED — READY FOR HUMAN REVIEW`, and `BLOCKED`.
Nothing in this document is finalized.

## Shared Branch Registry

### BR-AVOIDABLE-RESOURCE-RATE - Avoidable marginal resource price

**Status:** DRAFT

**Value:** `p_r`, the price avoided or incurred by the next unit of resource `r` during the modeled periods.

```text
Avoidable marginal resource price
├─ Electric volumetric charge {{resource: electricity}} {{component: electric-volumetric}}
│  ├─ utilityExtractedValues average_cost_per_kwh for a verified single volumetric tariff (Bill)
│  └─ Variable delivery and generation rates derived from delivery_charges, generation_charges, and matched kWh (Bill)
├─ Electric time-of-use energy charge {{resource: electricity}} {{component: electric-time-of-use}}
│  └─ Verified tariff calendar for the modeled interval import energy; the current bill parser has no complete canonical tariff artifact {{input: required}} (User)
├─ Electric demand charge {{resource: electricity}} {{component: electric-demand}}
│  ├─ utilityExtractedValues demand_charge_rate, when parsed (Bill)
│  └─ Verified billing-demand and ratchet rules applied to interval kW {{input: required}} (User)
├─ Electric export credit {{resource: electricity}} {{component: electric-export}}
│  └─ Verified export-credit rule applied to interval exports; no current canonical bill field {{input: required}} (User)
├─ Electric non-bypassable export treatment {{resource: electricity}} {{component: electric-export-non-bypassable}}
│  └─ Verified non-bypassable tariff rule applied to interval exports; no current canonical bill field {{input: required}} (User)
├─ Gas volumetric charge {{resource: gas}} {{component: gas-volumetric}}
│  └─ utilityExtractedValues average_cost_per_therm for a verified single volumetric tariff, or gas_delivery_charges and gas_procurement_charges divided by matched therms (Bill)
├─ Water volumetric charge {{resource: water-sewer}} {{component: water-volumetric}}
│  └─ annual_water_cost divided by annual_water_use after explicit water_unit normalization (Bill)
├─ Sewer volumetric charge {{resource: water-sewer}} {{component: sewer-volumetric}}
│  └─ annual_sewer_cost divided by applicable annual_water_use after explicit water_unit normalization, only when the avoided use is sewer-billed (Bill)
└─ Liquid or vehicle-fuel price {{resource: liquid-fuel, vehicle-fuel}} {{component: fuel-price}}
   └─ Documented current project fuel price for the matching fuel and geography {{input: required}} (User)
```

For electricity, preserve energy, demand, time-of-use, seasonal, export-credit, and non-bypassable components separately.
For gas, water, sewer, liquid fuel, or waste, use the applicable variable block or service price.
Exclude fixed customer charges unless usage elimination also removes the charge.
If only a whole-bill blended rate exists, use it only for a single volumetric tariff and flag the result as estimated.
Otherwise select one context-matched authoritative rate and then one deterministic RetroFi rate benchmark while retaining the physical resource result and fallback provenance.

**Used By:** ITC-01 through ITC-14, ITC-16, ITC-17, and ITC-19 through ITC-54.

### BR-ANNUAL-BILL-RESOURCE - Annual billed resource baseline

**Status:** DRAFT

**Value:** Annual imported quantity for the requested resource and service period.

```text
Annual billed resource r
├─ annual_kwh for electricity {{resource: electricity}} (Bill)
├─ annual_therms for gas {{resource: gas}} (Bill)
├─ annual_water_use with water_unit for water and sewer {{resource: water-sewer}} (Bill)
├─ billing_period_start (Bill)
└─ billing_period_end (Bill)
```

Normalize only with explicit unit conversions, annualize only when at least 10 representative months are present, and retain the coverage fraction.
Do not derive end-use energy from a whole-building bill without a documented Standard or user-confirmed allocation.

**Used By:** ITC-01, ITC-03 through ITC-07, ITC-11, ITC-14, ITC-45, ITC-46, ITC-48, and ITC-49.

### BR-ANNUAL-OPERATING-HOURS - Resolved annual operating time

**Status:** DRAFT

**Value:** Annual operating hours resolved from a recognizable schedule, with a measured exact override when supplied.

```text
Annual operating hours
├─ Recognizable Business, Shift, Seasonal, or Usage Pattern {{lookup: operating_schedule}} {{input: required}} (User)
├─ Detailed Operating Days, Shifts, or Active Season, if known {{lookup: operating_schedule_details}} {{input: optional}} (User)
├─ Measured Annual Operating Hours, if known {{lookup: operating_schedule, measured_annual_operating_hours, measur_calculator_inputs, operating_profile}} {{input: optional}} (User)
├─ site.geo.coordinates and business.primaryActivityText {{lookup: operating_schedule}} (Profile)
└─ Deterministic annual operating-hours resolution {{lookup: operating_schedule}} (Standard)
```

Use the exact measured value when supplied.
Otherwise calculate one annual-hours value from the stated pattern, operating days, shifts, active season, site daylight when relevant, and Profile context.
When those facts are incomplete, select the closest authoritative schedule median and then the deterministic RetroFi schedule benchmark.

**Standards:** STD-OPERATING-SCHEDULE.

**Used By:** ITC-09, ITC-12, ITC-20, ITC-30, ITC-37, ITC-38, ITC-40 through ITC-43, ITC-47, and ITC-51.

### BR-INTERVAL-LOAD-AND-TARIFF - Chronological electric load and complete tariff

**Status:** DRAFT

**Value:** Aligned interval import load and tariff rules for one analysis year.

```text
Chronological load and tariff
├─ Timestamped Green Button interval kW or kWh artifact; no current canonical bill-dictionary field {{lookup: chronological_load_and_tariff}} {{input: required}} (User)
├─ Interval timezone and daylight-saving treatment from the uploaded interval artifact {{lookup: chronological_load_and_tariff}} {{input: required}} (User)
├─ utilityExtractedValues rate_schedule and customer_class, verified rather than provider-inferred {{lookup: chronological_load_and_tariff}} (Bill)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

All intervals must be continuous, aligned to the tariff calendar, and reconciled to billed monthly energy.
Monthly peak values without timestamps are insufficient for dispatch, demand response, or time-of-use shifting.
When exact interval or tariff information is incomplete, select one source-versioned screening tariff or load profile from the closest authoritative context and retain the fallback level.

**Used By:** ITC-16, ITC-17, ITC-19, ITC-23 through ITC-28, and ITC-31.

### BR-SCOPE-QUANTITY - In-scope equipment quantity

**Status:** DRAFT

**Value:** Count of identical in-scope units represented by one calculation row.

```text
In-scope quantity
└─ Count of identical units in project scope {{lookup: measur_calculator_inputs}} {{input: required}} (User)
```

Split a project into rows when equipment models, schedules, ratings, or operating conditions differ materially.

**Used By:** ITC-10, ITC-12, ITC-13, ITC-27, ITC-29, ITC-30, ITC-32, ITC-33, ITC-37 through ITC-44, ITC-47, and ITC-50 through ITC-54.

### BR-CERTIFIED-PRODUCT-RESOLUTION - Existing and proposed certified-product resolution

**Status:** DRAFT

**Value:** Existing and proposed engineering values resolved from recognizable product classes, exact optional models, Linked Opportunity constraints, and authoritative certified-product records.

```text
Certified existing and proposed product resolution
├─ Existing Recognizable Equipment Type or Application {{lookup: ccms_product_context, energy_star_product_context}} {{input: required}} (User)
├─ Existing Model, if known {{lookup: ccms_exact_product, energy_star_exact_product}} {{input: optional}} (User)
├─ Existing Capacity or Size Class, if known {{lookup: ccms_exact_product, energy_star_exact_product}} {{input: optional}} (User)
├─ Linked Opportunity {{lookup: linked_opportunity}} {{intermediate: project-opportunity}}
├─ Proposed Product Class or Intended Scope {{lookup: ccms_product_context, energy_star_product_context}} {{input: required}} (User)
├─ Selected Proposed Model, if known {{lookup: ccms_exact_product, energy_star_exact_product}} {{input: optional}} (User)
├─ Proposed Capacity or Size Class, if known {{lookup: ccms_exact_product, energy_star_exact_product}} {{input: optional}} (User)
└─ Certified engineering-value resolution (Standard)
```

The applicable product Standard defines only the scenarios its evidence records support, including any Linked Opportunity restriction, exact override, uncertainty, and no-estimate behavior.
Do not infer an exact model when the source supports only a product class or candidate distribution.

**Used By:** ITC-03, ITC-06, ITC-07, ITC-10, ITC-13, ITC-50, ITC-52, and ITC-53.

## Category Index

| Category | Information-tree identity | Status | Retrofit count |
|---|---|---|---:|
| `ITC-01` | [ComStock archetype annual resource delta](operational-savings-review/categories/ITC-01.md) | DRAFT | 13 |
| `ITC-02` | [Exterior lighting power and schedule](operational-savings-review/categories/ITC-02.md) | DRAFT | 1 |
| `ITC-03` | [Fuel-fired equipment efficiency replacement](operational-savings-review/categories/ITC-03.md) | DRAFT | 1 |
| `ITC-04` | [Boiler control fractional fuel reduction](operational-savings-review/categories/ITC-04.md) | DRAFT | 1 |
| `ITC-05` | [Duct loss reduction](operational-savings-review/categories/ITC-05.md) | DRAFT | 1 |
| `ITC-06` | [Heat-pump water-heater resource switching](operational-savings-review/categories/ITC-06.md) | DRAFT | 1 |
| `ITC-07` | [Gas water-heater efficiency replacement](operational-savings-review/categories/ITC-07.md) | DRAFT | 1 |
| `ITC-08` | [Solar thermal backup-resource displacement](operational-savings-review/categories/ITC-08.md) | DRAFT | 1 |
| `ITC-09` | [Water-heating recirculation loss reduction](operational-savings-review/categories/ITC-09.md) | DRAFT | 1 |
| `ITC-10` | [Refrigeration certified-rating replacement](operational-savings-review/categories/ITC-10.md) | DRAFT | 1 |
| `ITC-11` | [Refrigeration control fractional reduction](operational-savings-review/categories/ITC-11.md) | DRAFT | 3 |
| `ITC-12` | [Refrigeration EC-motor power reduction](operational-savings-review/categories/ITC-12.md) | DRAFT | 1 |
| `ITC-13` | [Ice-machine production resource intensity](operational-savings-review/categories/ITC-13.md) | DRAFT | 1 |
| `ITC-14` | [Scout ECM fractional resource screen](operational-savings-review/categories/ITC-14.md) | BLOCKED | 5 |
| `ITC-15` | [No direct operational-resource calculation](operational-savings-review/categories/ITC-15.md) | RESEARCHED — READY FOR HUMAN REVIEW | 11 |
| `ITC-16` | [Demand-response interval bill delta](operational-savings-review/categories/ITC-16.md) | DRAFT | 1 |
| `ITC-17` | [PV interval generation and bill offset](operational-savings-review/categories/ITC-17.md) | DRAFT | 3 |
| `ITC-18` | [Community-solar contract bill delta](operational-savings-review/categories/ITC-18.md) | DRAFT | 1 |
| `ITC-19` | [Wind interval generation and bill offset](operational-savings-review/categories/ITC-19.md) | DRAFT | 1 |
| `ITC-20` | [Fuel-cell electricity and fuel balance](operational-savings-review/categories/ITC-20.md) | DRAFT | 1 |
| `ITC-21` | [CHP electric and useful-heat balance](operational-savings-review/categories/ITC-21.md) | DRAFT | 1 |
| `ITC-22` | [Biomass or biogas resource balance](operational-savings-review/categories/ITC-22.md) | DRAFT | 1 |
| `ITC-23` | [Battery interval dispatch](operational-savings-review/categories/ITC-23.md) | DRAFT | 1 |
| `ITC-24` | [Solar-plus-storage interval dispatch](operational-savings-review/categories/ITC-24.md) | DRAFT | 1 |
| `ITC-25` | [Thermal-storage interval dispatch](operational-savings-review/categories/ITC-25.md) | DRAFT | 1 |
| `ITC-26` | [Microgrid composite interval dispatch](operational-savings-review/categories/ITC-26.md) | DRAFT | 1 |
| `ITC-27` | [Public EVSE added-load bill impact](operational-savings-review/categories/ITC-27.md) | DRAFT | 3 |
| `ITC-28` | [Fleet charging added-load bill impact](operational-savings-review/categories/ITC-28.md) | DRAFT | 1 |
| `ITC-29` | [Light-duty vehicle resource switching](operational-savings-review/categories/ITC-29.md) | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-30` | [Forklift resource switching](operational-savings-review/categories/ITC-30.md) | BLOCKED | 1 |
| `ITC-31` | [Managed fleet-charging interval shift](operational-savings-review/categories/ITC-31.md) | DRAFT | 1 |
| `ITC-32` | [Flow-fixture water and hot-water reduction](operational-savings-review/categories/ITC-32.md) | DRAFT | 1 |
| `ITC-33` | [Flush-fixture water reduction](operational-savings-review/categories/ITC-33.md) | DRAFT | 1 |
| `ITC-34` | [Landscape water-budget reduction](operational-savings-review/categories/ITC-34.md) | DRAFT | 2 |
| `ITC-35` | [Measured leak avoidance](operational-savings-review/categories/ITC-35.md) | DRAFT | 1 |
| `ITC-36` | [Cooling-tower water and fan optimization](operational-savings-review/categories/ITC-36.md) | DRAFT | 1 |
| `ITC-37` | [Demand-controlled kitchen ventilation](operational-savings-review/categories/ITC-37.md) | DRAFT | 1 |
| `ITC-38` | [Motor input-power efficiency replacement](operational-savings-review/categories/ITC-38.md) | DRAFT | 1 |
| `ITC-39` | [Variable-speed load-bin reduction](operational-savings-review/categories/ITC-39.md) | DRAFT | 2 |
| `ITC-40` | [Pump wire-to-water replacement](operational-savings-review/categories/ITC-40.md) | DRAFT | 1 |
| `ITC-41` | [Fan or ventilation system replacement](operational-savings-review/categories/ITC-41.md) | DRAFT | 2 |
| `ITC-42` | [Air-compressor specific-power replacement](operational-savings-review/categories/ITC-42.md) | DRAFT | 1 |
| `ITC-43` | [Compressed-air leak loss](operational-savings-review/categories/ITC-43.md) | DRAFT | 1 |
| `ITC-44` | [Compressed-air control profile reduction](operational-savings-review/categories/ITC-44.md) | DRAFT | 1 |
| `ITC-45` | [Waste-heat useful-energy recovery](operational-savings-review/categories/ITC-45.md) | DRAFT | 1 |
| `ITC-46` | [Industrial process electrification balance](operational-savings-review/categories/ITC-46.md) | DRAFT | 2 |
| `ITC-47` | [Steam-trap loss reduction](operational-savings-review/categories/ITC-47.md) | DRAFT | 1 |
| `ITC-48` | [Induction-cooking measured resource switch](operational-savings-review/categories/ITC-48.md) | BLOCKED | 1 |
| `ITC-49` | [Walk-in refrigeration measured system delta](operational-savings-review/categories/ITC-49.md) | BLOCKED | 1 |
| `ITC-50` | [Commercial cooking tested-duty and idle balance](operational-savings-review/categories/ITC-50.md) | DRAFT | 3 |
| `ITC-51` | [Air-filtration fan-power delta](operational-savings-review/categories/ITC-51.md) | DRAFT | 1 |
| `ITC-52` | [Commercial dishwasher water, heat, and idle balance](operational-savings-review/categories/ITC-52.md) | DRAFT | 1 |
| `ITC-53` | [Commercial laundry cycle resource balance](operational-savings-review/categories/ITC-53.md) | DRAFT | 1 |
| `ITC-54` | [Backup-power routine resource use](operational-savings-review/categories/ITC-54.md) | BLOCKED | 1 |

## Information Category Trees

### ITC-01 - ComStock archetype annual resource delta

**Status:** DRAFT

**Applicable Resources:** electricity, gas

**Retrofits:**

- `led_lighting_retrofit` - LED lighting retrofit
- `lighting_controls_retrofit` - Lighting controls retrofit
- `high_efficiency_hvac_replacement` - High-efficiency HVAC replacement
- `heat_pump_hvac_retrofit` - Heat pump HVAC retrofit
- `smart_thermostat_zoning_retrofit` - Smart thermostat / zoning retrofit
- `hvac_controls_retrofit` - HVAC controls retrofit
- `energy_recovery_ventilation_retrofit` - Energy recovery ventilation retrofit
- `high_efficiency_boiler_retrofit` - High-efficiency boiler retrofit
- `ground_source_geothermal_heat_pump` - Ground-source / geothermal heat pump
- `insulation_upgrade` - Insulation upgrade
- `window_replacement` - Window replacement
- `window_film_shading_retrofit` - Window film / shading retrofit
- `demand_controlled_ventilation` - Demand-controlled ventilation

**Primary Formula:**

`S = Σ_r (valued_R_r × p_r)`

**Supporting Formula(s):**

`ΔR_r = floor_area × median_ComStock_delta_r_per_ft²`

`valued_R_r = min(ΔR_r, billed_R_r)` when `ΔR_r ≥ 0`; otherwise `valued_R_r = ΔR_r`.

**Information Tree:**

```text
Annual direct resource dollar savings
├─ Annual resource delta by resource
│  ├─ Linked Opportunity {{lookup: canonical_retrofit}} {{intermediate: project-opportunity}}
│  ├─ Existing-condition selector {{lookup: existing_condition}} {{input: required}} (User)
│  ├─ Proposed-option selector {{lookup: proposed_option}} {{input: required}} (User)
│  ├─ site.buildingTypes canonical building type {{lookup: building_type}} (Profile)
│  ├─ site.geo.stateCode or site.geo.countyFips {{lookup: site_geography}} (Profile)
│  ├─ site.squareFootage.value, approximate unless subsequently verified {{lookup: floor_area}} (Profile)
│  └─ ComStock per-area delta distribution (Standard)
├─ BR-ANNUAL-BILL-RESOURCE
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-COMSTOCK-ANNUAL-DELTA.

**Default Estimate:** UNVALIDATED

**Notes:** Only the 13 explicitly crosswalked ComStock measures belong here.
When the linked opportunity scope does not exactly match a documented ComStock upgrade-measure record, continue to the closest compatible authoritative aggregate and deterministic RetroFi fallback.
Do not add separate measure results together.
Retain the eligible population, filters, weights, applicability share, and sample count internally while returning only one selected value.

### ITC-02 - Exterior lighting power and schedule

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `exterior_site_lighting_retrofit` - Exterior/site lighting retrofit

**Primary Formula:**

`S = quantity × (existing_kW - proposed_kW) × annual_on_hours × p_electric`

**Supporting Formula(s):**

`fixture_input_kW = fixture_input_W / 1000`

**Information Tree:**

```text
Annual dollar savings
├─ Annual electricity reduction
│  ├─ Replacement Fixture Count {{input: required}} (User)
│  ├─ Existing fixture wattage
│  │  ├─ Existing Fixture Model or Documented Watts {{lookup: existing_fixture_model}} {{input: conditional}} (User)
│  │  ├─ Existing Fixture Type or Application {{lookup: exterior_fixture_context}} {{input: required}} (User)
│  │  ├─ site.buildingTypes and site.squareFootage.value {{lookup: exterior_fixture_context}} (Profile)
│  │  └─ Existing Fixture Wattage Resolution {{lookup: exterior_fixture_resolution}} (Standard)
│  ├─ Proposed fixture wattage
│  │  ├─ Linked Opportunity {{lookup: linked_opportunity}} {{intermediate: project-opportunity}}
│  │  ├─ Selected Proposed Model or Documented Watts {{lookup: proposed_fixture_model}} {{input: conditional}} (User)
│  │  ├─ Existing fixture type or resolved class {{lookup: exterior_fixture_context}} (Standard)
│  │  ├─ site.buildingTypes and site.squareFootage.value {{lookup: exterior_fixture_context}} (Profile)
│  │  └─ Proposed Product Resolution {{lookup: exterior_fixture_resolution}} (Standard)
│  └─ Annual operating hours
│     ├─ site.geo coordinates {{lookup: operating_schedule}} (Profile)
│     ├─ Exterior Lighting Control Pattern {{lookup: operating_schedule}} {{input: required}} (User)
│     ├─ Exact Schedule, if known {{lookup: operating_schedule, operating_schedule_details, measured_annual_operating_hours}} {{input: optional}} (User)
│     └─ Exterior Lighting Schedule Resolution {{lookup: operating_schedule}} (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-FEMP-EXTERIOR-LIGHTING, STD-OPERATING-SCHEDULE, and STD-CONTEXT-BENCHMARKS.

**Default Estimate:** UNVALIDATED

**Notes:** V1 covers one-for-one replacement or upgrade of existing exterior fixtures.
Use separate rows when fixture types or schedules differ materially, and exclude entirely new fixture additions from the savings path.
The reviewed FEMP artifact supplies proposed efficacy requirements and a narrow wall-mounted example, not a representative installed legacy-fixture population.
Unknown existing watts therefore use the separate reviewed DOE application benchmark.
Exact models and exact schedules override estimates.
When exact fixture watts or schedule data are unavailable, select one documented application wattage and one context-matched schedule value through the fallback policy.
Use a project photometric design for scope suitability, but do not monetize lighting quality.

### ITC-03 - Fuel-fired equipment efficiency replacement

**Status:** DRAFT

**Applicable Resources:** gas

**Retrofits:**

- `high_efficiency_furnace_retrofit` - High-efficiency furnace retrofit

**Primary Formula:**

`S = current_annual_fuel × (1 - η_existing / η_proposed) × p_fuel`

**Supporting Formula(s):**

`current_annual_fuel = measured_equipment_fuel` or a user-confirmed allocation of BR-ANNUAL-BILL-RESOURCE.

**Information Tree:**

```text
Annual dollar savings
├─ Annual fuel reduction
│  ├─ Current annual furnace fuel
│  │  ├─ BR-ANNUAL-BILL-RESOURCE
│  │  └─ Furnace share of billed fuel, if known {{input: optional}} (User)
│  └─ BR-CERTIFIED-PRODUCT-RESOLUTION
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-CCMS-RATINGS.

**Default Estimate:** UNVALIDATED

**Notes:** When furnace fuel cannot be isolated from other gas end uses, select one context-matched furnace share from the closest authoritative building population.
The category remains DRAFT until a repeatable DOE database export path is approved.

### ITC-04 - Boiler control fractional fuel reduction

**Status:** DRAFT

**Applicable Resources:** gas

**Retrofits:**

- `boiler_controls_burner_retrofit` - Boiler controls / burner retrofit

**Primary Formula:**

`S = annual_boiler_fuel × control_reduction_fraction × p_fuel`

**Supporting Formula(s):**

`control_reduction_fraction = 1 - proposed_annual_fuel / baseline_annual_fuel`

**Information Tree:**

```text
Annual dollar savings
├─ Annual fuel reduction
│  ├─ Annual boiler fuel
│  │  ├─ BR-ANNUAL-BILL-RESOURCE
│  │  └─ Boiler share of billed fuel {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing control sequence {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed control sequence {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  └─ MEASUR baseline and proposed fuel result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** A generic controls percentage is not acceptable.
The status remains DRAFT until the exact MEASUR adapter and minimum control inputs are fixture-tested.

### ITC-05 - Duct loss reduction

**Status:** DRAFT

**Applicable Resources:** electricity, gas

**Retrofits:**

- `duct_sealing_and_insulation` - Duct sealing and duct insulation

**Primary Formula:**

`S = Σ_r (annual_HVAC_R_r × duct_loss_reduction_fraction × p_r)`

**Supporting Formula(s):**

`duct_loss_reduction_fraction = existing_duct_loss_fraction - proposed_duct_loss_fraction`

**Information Tree:**

```text
Annual dollar savings
├─ Annual HVAC resource reduction
│  ├─ Annual HVAC resource by end use and fuel {{lookup: end_use_and_fuel}}
│  │  ├─ BR-ANNUAL-BILL-RESOURCE
│  │  └─ HVAC share of billed resource, if known {{input: optional}} (User)
│  ├─ Canonical retrofit ID from linked-opportunity taxonomy match {{lookup: canonical_retrofit}} {{intermediate: project-opportunity}}
│  ├─ site.buildingTypes commercial building type {{lookup: building_type}} (Profile)
│  ├─ Climate zone resolved from site.geo.coordinates or site.geo.countyFips {{lookup: climate_zone}} (Profile)
│  ├─ Existing building vintage class {{lookup: building_vintage}} {{input: required}} (User)
│  ├─ Existing duct location and condition {{lookup: existing_condition}} {{input: required}} (User)
│  ├─ Proposed sealing and insulation scope {{lookup: proposed_option}} {{input: required}} (User)
│  └─ Applicable duct-loss performance factor (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-SCOUT-ECM-SCREEN.

**Default Estimate:** UNVALIDATED

**Notes:** When an exact supported Scout definition or measured duct leakage is unavailable, select one compatible authoritative duct-condition benchmark and retain the fallback level.

### ITC-06 - Heat-pump water-heater resource switching

**Status:** DRAFT

**Applicable Resources:** electricity, gas

**Retrofits:**

- `heat_pump_water_heater` - Heat pump water heater

**Primary Formula:**

`S = avoided_existing_resource × p_existing - added_kWh × p_electric`

**Supporting Formula(s):**

`annual_hot_water_load = to_energy(current_annual_input, existing_resource_unit) × η_existing`

`avoided_existing_resource = current_annual_input` for a complete replacement of the allocated load.

`added_kWh = annual_hot_water_load / UEF_or_COP_proposed`

**Information Tree:**

```text
Annual dollar savings
├─ Avoided existing water-heating resource
│  ├─ BR-ANNUAL-BILL-RESOURCE
│  └─ Water-heating share, if known {{input: optional}} (User)
├─ Added heat-pump water-heater electricity
│  └─ BR-CERTIFIED-PRODUCT-RESOLUTION
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-CCMS-RATINGS and STD-ENERGY-STAR-PRODUCT-DATA.

**Default Estimate:** UNVALIDATED

**Notes:** Do not use ComStock for this category because its published commercial service-water-heating coverage is incomplete.
The category remains DRAFT until a repeatable DOE database export path is approved for existing products that are not in current ENERGY STAR data.

### ITC-07 - Gas water-heater efficiency replacement

**Status:** DRAFT

**Applicable Resources:** gas

**Retrofits:**

- `high_efficiency_gas_water_heater` - High-efficiency gas water heater

**Primary Formula:**

`S = current_annual_gas × (1 - η_existing / η_proposed) × p_gas`

**Supporting Formula(s):**

No additional formula is required.

**Information Tree:**

```text
Annual dollar savings
├─ Annual gas reduction
│  ├─ Current annual water-heating gas
│  │  ├─ BR-ANNUAL-BILL-RESOURCE
│  │  └─ Water-heating share, if known {{input: optional}} (User)
│  └─ BR-CERTIFIED-PRODUCT-RESOLUTION
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-CCMS-RATINGS and STD-ENERGY-STAR-PRODUCT-DATA.

**Default Estimate:** UNVALIDATED

**Notes:** The current end-use allocation must be confirmed rather than inferred from business type alone.
The category remains DRAFT until a repeatable DOE database export path is approved.

### ITC-08 - Solar thermal backup-resource displacement

**Status:** DRAFT

**Applicable Resources:** electricity, gas, liquid-fuel

**Retrofits:**

- `solar_water_heating_system` - Solar water heating system

**Primary Formula:**

`S = avoided_backup_resource × p_backup_resource`

**Supporting Formula(s):**

`useful_solar_thermal_output = min(SAM_output, annual_delivered_hot_water_load)`

`avoided_backup_resource = to_billed_unit(useful_solar_thermal_output / backup_efficiency, backup_resource_unit)`

**Information Tree:**

```text
Annual dollar savings
├─ Annual backup-resource reduction
│  ├─ site.geo.coordinates, verified rather than address-only {{lookup: site_coordinates}} (Profile)
│  ├─ Collector configuration
│  │  ├─ Collector type {{lookup: solar_thermal_configuration}} {{input: required}} (User)
│  │  ├─ Collector area {{lookup: solar_thermal_configuration}} {{input: required}} (User)
│  │  ├─ Tilt {{lookup: solar_thermal_configuration}} {{input: required}} (User)
│  │  ├─ Azimuth {{lookup: solar_thermal_configuration}} {{input: required}} (User)
│  │  └─ Storage volume {{lookup: solar_thermal_configuration}} {{input: required}} (User)
│  ├─ Annual delivered hot-water thermal load {{lookup: hot_water_load}} {{input: required}} (User)
│  ├─ Backup resource
│  │  ├─ Backup fuel {{lookup: backup_resource}} {{input: required}} (User)
│  │  └─ Backup efficiency {{lookup: backup_resource}} {{input: required}} (User)
│  └─ SAM solar-thermal output (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-SAM-SOLAR-THERMAL and STD-CONTEXT-BENCHMARKS.

**Default Estimate:** UNVALIDATED

**Notes:** Eight atomic project values are retained because load, collector geometry, storage, and backup-system performance are high-sensitivity facts.

### ITC-09 - Water-heating recirculation loss reduction

**Status:** DRAFT

**Applicable Resources:** electricity, gas

**Retrofits:**

- `water_heating_controls_recirculation` - Water-heating controls / recirculation controls

**Primary Formula:**

`S = avoided_thermal_input × p_heating_resource + avoided_pump_kWh × p_electric`

**Supporting Formula(s):**

`avoided_distribution_heat = existing_distribution_heat - proposed_distribution_heat`

`avoided_thermal_input = to_billed_unit(avoided_distribution_heat / heater_efficiency, heating_resource_unit)`

`avoided_pump_kWh = pump_kW × avoided_run_hours`

**Information Tree:**

```text
Annual dollar savings
├─ Annual thermal-input and pump-electricity reduction
│  ├─ Existing annual distribution heat loss {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed annual distribution heat loss {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing water-heating system efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing control schedule {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed control schedule {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Pump input kW {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ BR-ANNUAL-OPERATING-HOURS
│  └─ MEASUR thermal and pump result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** Status remains DRAFT until the adapter pins its heat-loss boundary, required physical inputs, and a golden example.

### ITC-10 - Refrigeration certified-rating replacement

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `high_efficiency_refrigeration_equipment` - High-efficiency refrigeration equipment

**Primary Formula:**

`S = quantity × (existing_annual_kWh - proposed_annual_kWh) × p_electric`

**Supporting Formula(s):**

Convert daily ratings with `annual_kWh = daily_kWh × 365` only when the certification field is daily energy consumption.

**Information Tree:**

```text
Annual dollar savings
├─ Annual electricity reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ BR-CERTIFIED-PRODUCT-RESOLUTION
│  └─ Certified annual or daily energy ratings (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-CCMS-RATINGS and STD-ENERGY-STAR-PRODUCT-DATA.

**Default Estimate:** UNVALIDATED

**Notes:** This category is limited to self-contained refrigeration products with a certified annual or daily energy-consumption value.
The category remains DRAFT until a repeatable DOE database export path is approved.

### ITC-11 - Refrigeration control fractional reduction

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `refrigeration_controls_retrofit` - Refrigeration controls retrofit
- `anti_sweat_heater_controls` - Anti-sweat heater controls
- `door_gasket_strip_curtain_night_cover` - Door gasket / strip curtain / night cover retrofit

**Primary Formula:**

`S = annual_affected_refrigeration_kWh × reduction_fraction × p_electric`

**Supporting Formula(s):**

`reduction_fraction = 1 - proposed_annual_kWh / baseline_annual_kWh`

**Information Tree:**

```text
Annual dollar savings
├─ Annual refrigeration electricity reduction
│  ├─ Affected refrigeration annual kWh {{lookup: end_use_and_fuel}}
│  │  ├─ BR-ANNUAL-BILL-RESOURCE
│  │  └─ Affected-load share, if known {{input: optional}} (User)
│  ├─ Canonical retrofit ID from linked-opportunity taxonomy match {{lookup: canonical_retrofit}} {{intermediate: project-opportunity}}
│  ├─ site.buildingTypes commercial building type {{lookup: building_type}} (Profile)
│  ├─ Climate zone resolved from site.geo.coordinates or site.geo.countyFips {{lookup: climate_zone}} (Profile)
│  ├─ Existing building vintage class {{lookup: building_vintage}} {{input: required}} (User)
│  ├─ Existing condition or control {{lookup: existing_condition}} {{input: required}} (User)
│  ├─ Proposed scope or sequence {{lookup: proposed_option}} {{input: required}} (User)
│  └─ Exact refrigeration ECM factor (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-SCOUT-ECM-SCREEN.

**Default Estimate:** UNVALIDATED

**Notes:** The category remains DRAFT until exact Scout records are crosswalked.
No broad refrigeration percentage may be substituted.

### ITC-12 - Refrigeration EC-motor power reduction

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `refrigeration_ec_motor_retrofit` - Refrigeration EC motor retrofit

**Primary Formula:**

`S = quantity × (existing_input_kW - proposed_input_kW) × annual_hours × p_electric`

**Supporting Formula(s):**

`input_kW = shaft_kW / motor_efficiency` when only shaft power is known.

**Information Tree:**

```text
Annual dollar savings
├─ Annual electricity reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Existing motor input or shaft rating {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed motor input or shaft rating {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ BR-ANNUAL-OPERATING-HOURS
│  └─ Motor performance calculation (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** Fan duty must be unchanged; a changed fan operating profile belongs in ITC-39 or ITC-41.

### ITC-13 - Ice-machine production resource intensity

**Status:** DRAFT

**Applicable Resources:** electricity, water-sewer

**Retrofits:**

- `efficient_ice_machine` - Efficient ice machine

**Primary Formula:**

`S = quantity × annual_ice_100lb_units_per_machine × ((kWh_per_100lb_existing - kWh_per_100lb_proposed) × p_electric + (water_gallons_per_100lb_existing - water_gallons_per_100lb_proposed) × p_water_sewer)`

**Supporting Formula(s):**

`annual_ice_100lb_units_per_machine = annual_ice_production_lb_per_machine / 100`

**Information Tree:**

```text
Annual dollar savings
├─ Annual ice-machine electricity and water reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ BR-CERTIFIED-PRODUCT-RESOLUTION
│  ├─ Annual pounds of ice produced per machine {{input: required}} (User)
│  └─ Certified kWh and potable gallons per 100 pounds of ice (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-CCMS-RATINGS and STD-ENERGY-STAR-PRODUCT-DATA.

**Default Estimate:** UNVALIDATED

**Notes:** Batch and continuous machines must match on certified equipment type and ice-duty assumptions.
The category remains DRAFT until DOE database access and the exact-model adapter are fixture-tested.

### ITC-14 - Scout ECM fractional resource screen

**Status:** BLOCKED

**Applicable Resources:** electricity, gas

**Retrofits:**

- `air_sealing_weatherization` - Air sealing / weatherization
- `exterior_door_replacement` - Exterior door replacement
- `cool_roof_reflective_roof` - Cool roof / reflective roof coating
- `building_automation_system` - Building automation system
- `energy_management_system` - Energy management system

**Primary Formula:**

`S = Σ_r (annual_billed_R_r × Scout_reduction_fraction_r × p_r)`

**Supporting Formula(s):**

No additional formula is required.

**Information Tree:**

```text
Annual dollar savings
├─ Annual direct resource reduction by end use and fuel {{lookup: end_use_and_fuel}}
│  ├─ BR-ANNUAL-BILL-RESOURCE
│  ├─ Canonical retrofit ID from linked-opportunity taxonomy match {{lookup: canonical_retrofit}} {{intermediate: project-opportunity}}
│  ├─ Existing-condition selector {{lookup: existing_condition}} {{input: required}} (User)
│  ├─ Proposed-option selector {{lookup: proposed_option}} {{input: required}} (User)
│  ├─ site.buildingTypes commercial building type {{lookup: building_type}} (Profile)
│  ├─ Climate zone resolved from site.geo.coordinates or site.geo.countyFips {{lookup: climate_zone}} (Profile)
│  ├─ Existing building vintage class {{lookup: building_vintage}} {{input: required}} (User)
│  └─ Exact Scout ECM reduction factor (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-SCOUT-ECM-SCREEN.

**Default Estimate:** UNVALIDATED

**Notes:** The category is BLOCKED pending human approval that each taxonomy type has an exact Scout definition and identical fallback behavior.
If any mapping fails, that retrofit must split into a project-engineering category rather than accept a keyword match.

### ITC-15 - No direct operational-resource calculation

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Applicable Resources:** none

**Retrofits:**

- `submetering_energy_monitoring` - Submetering / energy monitoring system
- `ev_make_ready_electrical_upgrade` - EV make-ready electrical upgrade
- `energy_audit` - Energy audit
- `water_audit` - Water audit
- `retro_commissioning_study` - Retro-commissioning study
- `engineering_feasibility_study` - Engineering feasibility study
- `solar_feasibility_study` - Solar feasibility study
- `ev_charging_site_assessment` - EV charging site assessment
- `energy_star_certification` - ENERGY STAR certification
- `leed_certification` - LEED certification
- `building_benchmarking_compliance` - Building benchmarking compliance

**Primary Formula:**

`S = 0`

**Supporting Formula(s):**

No supporting formula is required.

**Information Tree:**

```text
Annual direct operational-resource savings equals zero
└─ Linked Opportunity {{intermediate: project-opportunity}}
```

**Standards:** None.

**Default Estimate:** NOT APPLICABLE

**Notes:** Monitoring, studies, certification, compliance, enabling infrastructure, and resilience may enable later savings, but attributing another measure's savings here would double count or speculate.
Calculate a linked physical measure only in its own category.

### ITC-16 - Demand-response interval bill delta

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `automated_demand_response_controls` - Automated demand response controls

**Primary Formula:**

`S = baseline_annual_bill - proposed_annual_bill`

**Supporting Formula(s):**

`proposed_load_t = baseline_load_t - shed_t + rebound_t`

**Information Tree:**

```text
Annual bill reduction
├─ BR-INTERVAL-LOAD-AND-TARIFF
├─ Controllable-load definition {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Maximum shed kW {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Event-availability schedule {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Maximum event duration {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Rebound or recovery constraint {{lookup: reopt_category_constraints}} {{input: required}} (User)
└─ Audited load template and REopt bill result (Standard)
```

**Standards:** STD-REOPT-LOCAL-DISPATCH and STD-CONTEXT-BENCHMARKS.

**Default Estimate:** UNVALIDATED

**Notes:** REopt has no generic demand-response input object.
The adapter must first construct a fixed proposed load series from the explicit shed and rebound constraints, then use REopt only for tariff valuation.
The category remains DRAFT until that load-template adapter has golden tests.
Program payments are incentives or revenue and remain out of scope.
Only avoided utility bill charges are included.

### ITC-17 - PV interval generation and bill offset

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `rooftop_solar_pv` - Rooftop solar PV
- `ground_mounted_solar_pv` - Ground-mounted solar PV
- `solar_carport` - Solar carport

**Primary Formula:**

`S = Σ_t (onsite_offset_kWh_t × import_rate_t + export_kWh_t × export_credit_t)`

**Supporting Formula(s):**

`onsite_offset_kWh_t = min(PV_AC_kWh_t, baseline_import_kWh_t)`

`export_kWh_t = max(PV_AC_kWh_t - baseline_import_kWh_t, 0)`

**Information Tree:**

```text
Annual PV bill reduction
├─ site.geo.coordinates, verified rather than address-only {{lookup: site_coordinates}} (Profile)
├─ PV array configuration
│  ├─ DC capacity {{lookup: pv_array_configuration}} {{input: required}} (User)
│  ├─ Module Type {{lookup: pv_array_configuration}} {{input: required}} (User)
│  ├─ Array type {{lookup: pv_array_configuration}} {{input: required}} (User)
│  ├─ System losses {{lookup: pv_array_configuration}} {{input: required}} (User)
│  ├─ Tilt {{lookup: pv_array_configuration}} {{input: required}} (User)
│  └─ Azimuth {{lookup: pv_array_configuration}} {{input: required}} (User)
├─ PVWatts interval AC generation (Standard)
├─ Interval onsite-offset and export calculation {{intermediate: formula}}
└─ BR-INTERVAL-LOAD-AND-TARIFF
```

**Standards:** STD-PVWATTS-V8.

**Default Estimate:** UNVALIDATED

**Notes:** The three siting types share a category because siting is a record-level array configuration inside the same PVWatts tree.
Do not assume retail credit for exports.

### ITC-18 - Community-solar contract bill delta

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `community_solar_subscription` - Community solar subscription

**Primary Formula:**

`S = annual_bill_credits - annual_subscription_charges`

**Supporting Formula(s):**

`annual_bill_credits = Σ_period credited_kWh_period × contract_credit_rate_period`

**Information Tree:**

```text
Annual contract bill reduction
├─ Allocated or credited kWh by period from the executed contract or statement {{input: required}} (User)
├─ Credit rate by period from the executed contract or statement {{input: required}} (User)
├─ Subscription charge by period from the executed contract or statement {{input: required}} (User)
├─ Contract escalation rule {{input: required}} (User)
└─ Contract term rule {{input: required}} (User)
```

**Standards:** None.

**Default Estimate:** UNVALIDATED

**Notes:** The executed contract and bill are authoritative.
Renewable attributes, emissions, incentives, and resale value are excluded.

### ITC-19 - Wind interval generation and bill offset

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `small_wind_turbine` - Small wind turbine

**Primary Formula:**

`S = Σ_t (onsite_offset_kWh_t × import_rate_t + export_kWh_t × export_credit_t)`

**Supporting Formula(s):**

`onsite_offset_kWh_t = min(wind_kWh_t, baseline_import_kWh_t)`

`export_kWh_t = max(wind_kWh_t - baseline_import_kWh_t, 0)`

**Information Tree:**

```text
Annual wind bill reduction
├─ site.geo.coordinates, verified rather than address-only {{lookup: site_coordinates}} (Profile)
├─ Wind Turbine Class or Intended Application {{lookup: wind_system_configuration}} {{input: required}} (User)
├─ Exact Turbine Model or Power Curve {{lookup: wind_system_configuration}} {{input: required}} (User)
├─ Hub Height {{lookup: wind_system_configuration}} {{input: required}} (User)
├─ Loss factor {{lookup: wind_system_configuration}} {{input: required}} (User)
├─ Analysis Year {{lookup: analysis_year}} {{input: required}} (User)
├─ WIND Toolkit resource and SAM generation (Standard)
├─ Interval onsite-offset and export calculation {{intermediate: formula}}
└─ BR-INTERVAL-LOAD-AND-TARIFF
```

**Standards:** STD-WIND-SAM.

**Default Estimate:** UNVALIDATED

**Notes:** Display High uncertainty until onsite wind-resource validation exists.

### ITC-20 - Fuel-cell electricity and fuel balance

**Status:** DRAFT

**Applicable Resources:** electricity, gas

**Retrofits:**

- `fuel_cell_system` - Fuel cell system

**Primary Formula:**

`S = avoided_grid_kWh × p_electric - added_fuel × p_fuel`

**Supporting Formula(s):**

`annual_generation = capacity_kW × annual_operating_hours × load_fraction`

`added_fuel = to_billed_unit(annual_generation / electric_efficiency, fuel_unit)`

`avoided_grid_kWh = min(annual_generation, coincident_onsite_electric_load)`

**Information Tree:**

```text
Annual resource value
├─ Prime-mover type {{lookup: prime_mover_and_fuel}} {{input: required}} (User)
├─ Input fuel {{lookup: prime_mover_and_fuel}} {{input: required}} (User)
├─ Selected Unit Model, if known {{lookup: chp_exact_model}} {{input: optional}} (User)
├─ Total installed capacity {{lookup: generation_capacity}} {{input: required}} (User)
├─ Linked Opportunity {{lookup: linked_opportunity}} {{intermediate: project-opportunity}}
├─ BR-ANNUAL-OPERATING-HOURS
├─ Operating load fraction {{lookup: operating_profile}} {{input: required}} (User)
├─ Coincident Onsite Electric Load, if known {{input: optional}} (User)
├─ Electric efficiency by technology and capacity (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-EPA-CHP-PERFORMANCE.

**Default Estimate:** UNVALIDATED

**Notes:** Useful recovered heat is included only when the project is explicitly CHP and mapped to ITC-21.
Export value is excluded from this category.

### ITC-21 - CHP electric and useful-heat balance

**Status:** DRAFT

**Applicable Resources:** electricity, gas

**Retrofits:**

- `combined_heat_and_power_system` - Combined heat and power system

**Primary Formula:**

`S = avoided_grid_kWh × p_electric + avoided_boiler_fuel × p_fuel - CHP_input_fuel × p_CHP_fuel`

**Supporting Formula(s):**

`useful_heat = min(generation × recoverable_heat_ratio, coincident_thermal_load)`

`avoided_boiler_fuel = to_billed_unit(useful_heat / existing_boiler_efficiency, boiler_fuel_unit)`

`generation = total_capacity_kW × 8760 × annual_capacity_factor`

`CHP_input_fuel = to_billed_unit(generation / electric_efficiency, CHP_fuel_unit)`

`avoided_grid_kWh = min(generation, coincident_onsite_electric_load)`

**Information Tree:**

```text
Annual CHP resource value
├─ Prime mover {{lookup: prime_mover_and_fuel}} {{input: required}} (User)
├─ Input fuel {{lookup: prime_mover_and_fuel}} {{input: required}} (User)
├─ Selected Unit Model, if known {{lookup: chp_exact_model}} {{input: optional}} (User)
├─ Total installed capacity {{lookup: generation_capacity}} {{input: required}} (User)
├─ Linked Opportunity {{lookup: linked_opportunity}} {{intermediate: project-opportunity}}
├─ Annual capacity factor {{lookup: operating_profile}} {{input: required}} (User)
├─ Coincident onsite electric-load constraint, if known {{input: optional}} (User)
├─ Coincident useful thermal-load constraint {{lookup: thermal_load_coincidence}} {{input: required}} (User)
├─ Existing boiler efficiency, if known {{input: optional}} (User)
├─ CHP performance by technology and capacity (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-EPA-CHP-PERFORMANCE.

**Default Estimate:** UNVALIDATED

**Notes:** Cap electricity and useful heat at coincident site loads.
Export value is excluded from this category.

### ITC-22 - Biomass or biogas resource balance

**Status:** DRAFT

**Applicable Resources:** electricity, gas, liquid-fuel

**Retrofits:**

- `biomass_biogas_energy_system` - Biomass / biogas energy system

**Primary Formula:**

`S = avoided_grid_kWh × p_electric + avoided_boiler_fuel × p_fuel - input_biomass_or_biogas × p_input_fuel`

**Supporting Formula(s):**

`input_biomass_or_biogas = min(annual_available_fuel, scheduled_input_fuel)`

`generation = input_biomass_or_biogas × lower_heating_value × electric_efficiency`

`useful_heat = min(input_biomass_or_biogas × lower_heating_value × recoverable_heat_fraction, coincident_thermal_load)`

`avoided_boiler_fuel = to_billed_unit(useful_heat / existing_boiler_efficiency, boiler_fuel_unit)`

`avoided_grid_kWh = min(generation, coincident_onsite_electric_load)`

**Information Tree:**

```text
Annual biomass or biogas resource value
├─ Confirmed annual fuel availability, if known {{lookup: prime_mover_and_fuel}} {{input: optional}} (User)
├─ Fuel unit {{lookup: prime_mover_and_fuel}} {{input: required}} (User)
├─ Fuel lower heating value, if known {{input: optional}} (User)
├─ Conversion technology {{lookup: prime_mover_and_fuel}} {{input: required}} (User)
├─ Selected Unit Model, if known {{lookup: chp_exact_model}} {{input: optional}} (User)
├─ Installed capacity {{lookup: generation_capacity}} {{input: required}} (User)
├─ Linked Opportunity {{lookup: linked_opportunity}} {{intermediate: project-opportunity}}
├─ Operating schedule {{lookup: operating_profile}} {{input: required}} (User)
├─ Coincident onsite electric-load constraint, if known {{input: optional}} (User)
├─ Coincident useful thermal-load constraint {{lookup: thermal_load_coincidence}} {{input: required}} (User)
├─ Existing boiler efficiency, if known {{input: optional}} (User)
├─ Scheduled input fuel {{intermediate: formula}}
├─ Performance by technology and fuel (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-EPA-CHP-PERFORMANCE.

**Default Estimate:** UNVALIDATED

**Notes:** Status is DRAFT and uncertainty is High because the federal biomass catalog is partly outdated and project fuel quality dominates performance.
Do not monetize avoided disposal, renewable credits, or fuel that is not contractually available.
Export value is excluded from this category.

### ITC-23 - Battery interval dispatch

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `battery_storage_system` - Battery storage system

**Primary Formula:**

`S = baseline_annual_bill - proposed_annual_bill`

**Supporting Formula(s):**

`state_of_charge_t = state_of_charge_(t-1) + charge_t × η_charge - discharge_t / η_discharge`

**Information Tree:**

```text
Annual battery bill reduction
├─ BR-INTERVAL-LOAD-AND-TARIFF
├─ Power capacity {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Usable-energy capacity {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Charge efficiency {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Discharge efficiency {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Initial state of charge {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Terminal state-of-charge constraint {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Dispatch-availability schedule {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Reserve constraint {{lookup: reopt_category_constraints}} {{input: required}} (User)
└─ REopt baseline and proposed bill result (Standard)
```

**Standards:** STD-REOPT-LOCAL-DISPATCH and STD-CONTEXT-BENCHMARKS.

**Default Estimate:** UNVALIDATED

**Notes:** Exclude resilience, outage, incentives, degradation economics, and capital costs.

### ITC-24 - Solar-plus-storage interval dispatch

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `solar_plus_storage_system` - Solar-plus-storage system

**Primary Formula:**

`S = baseline_annual_bill - proposed_annual_bill`

**Supporting Formula(s):**

PV generation follows ITC-17 and storage state follows ITC-23 inside one dispatch optimization.

**Information Tree:**

```text
Annual solar-plus-storage bill reduction
├─ site.geo.coordinates, verified rather than address-only {{lookup: site_coordinates}} (Profile)
├─ PV array configuration
│  ├─ DC capacity {{lookup: pv_array_configuration, reopt_category_constraints}} {{input: required}} (User)
│  ├─ Module Type {{lookup: pv_array_configuration}} {{input: required}} (User)
│  ├─ Array type {{lookup: pv_array_configuration}} {{input: required}} (User)
│  ├─ System losses {{lookup: pv_array_configuration}} {{input: required}} (User)
│  ├─ Tilt {{lookup: pv_array_configuration}} {{input: required}} (User)
│  └─ Azimuth {{lookup: pv_array_configuration}} {{input: required}} (User)
├─ Battery configuration
│  ├─ Power capacity {{lookup: reopt_category_constraints}} {{input: required}} (User)
│  ├─ Usable-energy capacity {{lookup: reopt_category_constraints}} {{input: required}} (User)
│  ├─ Charge efficiency {{lookup: reopt_category_constraints}} {{input: required}} (User)
│  ├─ Discharge efficiency {{lookup: reopt_category_constraints}} {{input: required}} (User)
│  ├─ Initial state of charge {{lookup: reopt_category_constraints}} {{input: required}} (User)
│  ├─ Terminal state-of-charge constraint {{lookup: reopt_category_constraints}} {{input: required}} (User)
│  └─ Reserve constraint {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ PVWatts interval generation (Standard)
├─ BR-INTERVAL-LOAD-AND-TARIFF
└─ REopt composite dispatch result (Standard)
```

**Standards:** STD-PVWATTS-V8 and STD-REOPT-LOCAL-DISPATCH.

**Default Estimate:** UNVALIDATED

**Notes:** Do not add standalone ITC-17 and ITC-23 savings because dispatch interactions would be double counted.

### ITC-25 - Thermal-storage interval dispatch

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `thermal_energy_storage` - Thermal energy storage

**Primary Formula:**

`S = baseline_annual_bill - proposed_annual_bill`

**Supporting Formula(s):**

`thermal_state_t = thermal_state_(t-1) + charge_t × η_charge - discharge_t / η_discharge - standing_loss_t`

**Information Tree:**

```text
Annual thermal-storage bill reduction
├─ BR-INTERVAL-LOAD-AND-TARIFF
├─ Interval HVAC thermal load or validated electric proxy {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Thermal capacity {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Charge limit {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Discharge limit {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Charge efficiency {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Discharge efficiency {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Standing loss {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Initial Thermal State {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Terminal thermal-state constraint {{lookup: reopt_category_constraints}} {{input: required}} (User)
└─ REopt baseline and proposed bill result (Standard)
```

**Standards:** STD-REOPT-LOCAL-DISPATCH.

**Default Estimate:** UNVALIDATED

**Notes:** Whole-building interval load alone is insufficient unless the controllable HVAC component is identified.

### ITC-26 - Microgrid composite interval dispatch

**Status:** DRAFT

**Applicable Resources:** electricity, gas, liquid-fuel

**Retrofits:**

- `microgrid_system` - Microgrid system

**Primary Formula:**

`S = baseline_grid_and_fuel_bill - proposed_grid_and_fuel_bill`

**Supporting Formula(s):**

Apply the ITC-17, ITC-20 or ITC-21, and ITC-23 resource balances inside one optimization.

**Information Tree:**

```text
Annual microgrid direct bill reduction
├─ BR-INTERVAL-LOAD-AND-TARIFF
├─ Included component types {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Linked Opportunity {{lookup: linked_opportunity}} {{intermediate: project-opportunity}}
├─ Component site and operating inputs
│  ├─ site.geo.coordinates when PV or wind is included {{lookup: site_coordinates}} (Profile)
│  ├─ PV array configuration when PV is included
│  │  ├─ DC capacity {{lookup: pv_array_configuration, reopt_category_constraints}} {{input: required}} (User)
│  │  ├─ Module Type {{lookup: pv_array_configuration}} {{input: required}} (User)
│  │  ├─ Array type {{lookup: pv_array_configuration}} {{input: required}} (User)
│  │  ├─ System losses {{lookup: pv_array_configuration}} {{input: required}} (User)
│  │  ├─ Tilt {{lookup: pv_array_configuration}} {{input: required}} (User)
│  │  └─ Azimuth {{lookup: pv_array_configuration}} {{input: required}} (User)
│  ├─ Wind configuration when wind is included
│  │  ├─ Wind Turbine Class or Intended Application {{lookup: wind_system_configuration, reopt_category_constraints}} {{input: required}} (User)
│  │  ├─ Exact Turbine Model or Power Curve {{lookup: wind_system_configuration, reopt_category_constraints}} {{input: required}} (User)
│  │  ├─ Hub Height {{lookup: wind_system_configuration}} {{input: required}} (User)
│  │  ├─ Loss factor {{lookup: wind_system_configuration}} {{input: required}} (User)
│  │  └─ Analysis Year {{lookup: analysis_year}} {{input: required}} (User)
│  ├─ Fuel-cell or CHP configuration when fuel generation is included
│  │  ├─ Prime mover {{lookup: prime_mover_and_fuel, reopt_category_constraints}} {{input: required}} (User)
│  │  ├─ Input fuel {{lookup: prime_mover_and_fuel}} {{input: required}} (User)
│  │  ├─ Selected Unit Model, if known {{lookup: chp_exact_model}} {{input: optional}} (User)
│  │  ├─ Installed capacity {{lookup: generation_capacity}} {{input: required}} (User)
│  │  ├─ Annual operating profile {{lookup: operating_profile}} {{input: required}} (User)
│  │  └─ Coincident useful thermal-load constraint when heat recovery is included {{lookup: thermal_load_coincidence}} {{input: required}} (User)
│  └─ Storage configuration when storage is included
│     ├─ Power capacity {{lookup: reopt_category_constraints}} {{input: required}} (User)
│     ├─ Usable-energy capacity {{lookup: reopt_category_constraints}} {{input: required}} (User)
│     ├─ Charge efficiency {{lookup: reopt_category_constraints}} {{input: required}} (User)
│     ├─ Discharge efficiency {{lookup: reopt_category_constraints}} {{input: required}} (User)
│     ├─ Initial state of charge {{lookup: reopt_category_constraints}} {{input: required}} (User)
│     ├─ Terminal state-of-charge constraint {{lookup: reopt_category_constraints}} {{input: required}} (User)
│     └─ Reserve constraint {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ PV or wind interval generation when included (Standard)
├─ Fuel-cell or CHP performance when included (Standard)
└─ REopt composite dispatch result (Standard)
```

**Standards:** STD-PVWATTS-V8, STD-WIND-SAM, STD-EPA-CHP-PERFORMANCE, and STD-REOPT-LOCAL-DISPATCH.

**Default Estimate:** UNVALIDATED

**Notes:** Every included component must pass its own category input gate before the composite may run.
The category remains DRAFT until the conditional component schema and cross-category regression fixtures are approved.
Reliability and resilience value are excluded even when the physical system can island.

### ITC-27 - Public EVSE added-load bill impact

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `ev_charger_installation` - EV charger installation
- `level_2_ev_charger_installation` - Level 2 EV charger installation
- `dc_fast_charger_installation` - DC fast charger installation

**Primary Formula:**

`S = baseline_annual_bill - proposed_annual_bill`

**Supporting Formula(s):**

`proposed_load_t = baseline_load_t + quantity × (charging_input_kWh_t + standby_kWh_t)`

`charging_input_kWh_t = delivered_kWh_t / active_efficiency`

`standby_kWh_t = standby_power_kW × noncharging_interval_hours_t`

**Information Tree:**

```text
Annual public-charging bill impact
├─ BR-INTERVAL-LOAD-AND-TARIFF
├─ BR-SCOPE-QUANTITY
├─ Session-arrival distribution per charger {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Session-duration distribution per charger {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Delivered-kWh distribution per charger {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Linked Opportunity {{lookup: linked_opportunity}} {{intermediate: project-opportunity}}
├─ Charger Class or Intended Application {{lookup: energy_star_product_context}} {{input: required}} (User)
├─ Selected Charger Model, if known {{lookup: energy_star_exact_product}} {{input: optional}} (User)
├─ Rated Power or Capacity {{lookup: energy_star_exact_product, reopt_category_constraints}} {{input: required}} (User)
├─ Certified active efficiency and standby power (Standard)
├─ EVSE interval load profile {{intermediate: formula}}
└─ Audited session-load template and REopt bill result (Standard)
```

**Standards:** STD-ENERGY-STAR-PRODUCT-DATA, STD-REOPT-LOCAL-DISPATCH, and STD-CONTEXT-BENCHMARKS.

**Default Estimate:** UNVALIDATED

**Notes:** A charger creates load rather than operational savings unless paired with a separately modeled avoided transportation fuel or managed-charging measure.
The category remains DRAFT until the session-load template and tariff regression fixtures are approved.
Charging revenue is excluded.

### ITC-28 - Fleet charging added-load bill impact

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `fleet_charging_infrastructure` - Fleet charging infrastructure

**Primary Formula:**

`S = baseline_annual_bill - proposed_unmanaged_charging_bill`

**Supporting Formula(s):**

`vehicle_kWh_per_mile = proposed_combE / 100` when an exact FuelEconomy record is used.

`annual_vehicle_kWh = fleet_annual_miles × vehicle_kWh_per_mile`

`standby_kWh = installed_ports × standby_kW_per_port × noncharging_hours`

**Information Tree:**

```text
Annual fleet charging added cost
├─ BR-INTERVAL-LOAD-AND-TARIFF
├─ Annual fleet miles {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Depot allocation fraction {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Vehicle Class and Service Need {{lookup: vehicle_context}} {{input: required}} (User)
├─ Selected Vehicle Model, if known {{lookup: vehicle_exact_model}} {{input: optional}} (User)
├─ Measured kWh per Mile {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Vehicle-arrival schedule {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Vehicle-departure schedule {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Uncontrolled charging rule {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Linked Opportunity {{lookup: linked_opportunity}} {{intermediate: project-opportunity}}
├─ Charger Class or Intended Application {{lookup: energy_star_product_context}} {{input: required}} (User)
├─ Selected Charger Model, if known {{lookup: energy_star_exact_product}} {{input: optional}} (User)
├─ Rated Charger Power or Capacity {{lookup: energy_star_exact_product, reopt_category_constraints}} {{input: required}} (User)
├─ Installed port count {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Vehicle and charger efficiency (Standard)
├─ EVSE standby energy {{intermediate: formula}}
└─ Audited fleet-load template and REopt bill result (Standard)
```

**Standards:** STD-FUELECONOMY-VEHICLES, STD-ENERGY-STAR-PRODUCT-DATA, STD-REOPT-LOCAL-DISPATCH, and STD-CONTEXT-BENCHMARKS.

**Default Estimate:** UNVALIDATED

**Notes:** Medium- and heavy-duty vehicles outside FuelEconomy.gov require a measured or vendor-confirmed efficiency and remain DRAFT.
Do not add this electric bill impact to the electricity term in ITC-29.
For a combined fleet-electrification view, use this category's bill delta with ITC-29's avoided fuel term only.

### ITC-29 - Light-duty vehicle resource switching

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Applicable Resources:** electricity, vehicle-fuel

**Retrofits:**

- `electric_vehicle_purchase` - Electric vehicle purchase

**Primary Formula:**

`S = quantity × (avoided_fuel_units × p_fuel - added_kWh × p_electric)`

**Supporting Formula(s):**

`avoided_gallons = annual_miles / existing_combined_mpg`

`added_kWh = annual_miles × proposed_combE / 100`

**Information Tree:**

```text
Annual dollar savings
├─ Annual vehicle resource switch
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Annual miles for replaced vehicle {{input: required}} (User)
│  ├─ Existing Vehicle Class and Fuel Type {{lookup: vehicle_context}} {{input: required}} (User)
│  ├─ Existing Vehicle Model and FuelEconomy.gov ID {{lookup: vehicle_exact_model}} {{input: conditional}} (User)
│  ├─ Linked Opportunity {{lookup: linked_opportunity}} {{intermediate: project-opportunity}}
│  ├─ Proposed Electric Vehicle Class or Service Need {{lookup: vehicle_context}} {{input: required}} (User)
│  ├─ Selected Proposed Electric Vehicle Model and FuelEconomy.gov ID {{lookup: vehicle_exact_model}} {{input: conditional}} (User)
│  ├─ User confirms the two exact models provide equivalent required service {{input: conditional}} (User)
│  └─ Vehicle efficiency records (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-FUELECONOMY-VEHICLES.

**Default Estimate:** AVAILABLE

**Notes:** Exclude purchase price, maintenance, incentives, and emissions.
The Ready verdict applies only to the exact-model scenario backed by vehicle IDs 43764 and 44444, exact project activity and prices, and explicit user confirmation of service equivalence.
Matching model line, class, model year, and drive support the human decision but do not establish service equivalence automatically.
Exact vehicle models override source-backed vehicle-class distributions.
Do not calculate class percentiles until an eligible model-year, vehicle-class, fuel, drive, and service-compatibility population has a fixture-backed sample count.
FuelEconomy.gov `combE` is already measured at the wall and includes charging losses, so do not apply charging efficiency again.
The vehicle-fuel price is a required documented project input because the utility bill parser does not provide a canonical vehicle-fuel price path.
Do not add this category's electricity term to ITC-28.

### ITC-30 - Forklift resource switching

**Status:** BLOCKED

**Applicable Resources:** electricity, vehicle-fuel

**Retrofits:**

- `electric_forklift_material_handling` - Electric forklift / material handling equipment

**Primary Formula:**

`S = quantity × annual_hours × (existing_fuel_per_hour × p_fuel - proposed_kWh_per_hour × p_electric)`

**Supporting Formula(s):**

No additional formula is required.

**Information Tree:**

```text
Annual dollar savings
├─ Annual forklift resource switch
│  ├─ BR-SCOPE-QUANTITY
│  ├─ BR-ANNUAL-OPERATING-HOURS
│  ├─ Existing fuel use per operating hour, if known {{input: optional}} (User)
│  └─ Proposed charging kWh per operating hour, if known {{input: optional}} (User)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** None.

**Default Estimate:** UNVALIDATED

**Notes:** BLOCKED because no authoritative public model-level cross-fuel performance dataset was validated.
The formula is usable only with measured or contractually specified project values.

### ITC-31 - Managed fleet-charging interval shift

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `fleet_telematics_charging_management` - Fleet telematics / charging management system

**Primary Formula:**

`S = unmanaged_annual_bill - managed_annual_bill`

**Supporting Formula(s):**

`Σ_available_intervals delivered_kWh_t ≥ required_departure_energy`

**Information Tree:**

```text
Annual managed-charging bill reduction
├─ BR-INTERVAL-LOAD-AND-TARIFF
├─ Vehicle-arrival schedule {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Vehicle-departure schedule {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Required energy by departure {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Charger power limit {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Site power limit {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Managed charging template {{lookup: reopt_category_constraints}} {{input: required}} (User)
├─ Unmanaged charging template {{lookup: reopt_category_constraints}} {{input: required}} (User)
└─ REopt interval dispatch result (Standard)
```

**Standards:** STD-REOPT-LOCAL-DISPATCH.

**Default Estimate:** UNVALIDATED

**Notes:** Status remains DRAFT until the fleet availability schema and unmanaged counterfactual are product-approved.

### ITC-32 - Flow-fixture water and hot-water reduction

**Status:** DRAFT

**Applicable Resources:** electricity, gas, water-sewer

**Retrofits:**

- `low_flow_fixture_retrofit` - Low-flow fixture retrofit

**Primary Formula:**

`S = avoided_water × p_water_sewer + avoided_hot_water_input × p_heating_resource`

**Supporting Formula(s):**

`avoided_water = quantity × uses_per_year × duration_minutes × (gpm_existing - gpm_proposed)`

`avoided_hot_water_input = to_billed_unit(avoided_water × hot_fraction × thermal_energy_per_gallon / heater_efficiency, heating_resource_unit)`

**Information Tree:**

```text
Annual dollar savings
├─ Annual water and heating-resource reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Recognizable Fixture Usage Pattern {{lookup: fixture_usage_pattern}} {{input: required}} (User)
│  ├─ Annual uses per fixture {{lookup: fixture_usage_pattern}} {{input: required}} (User)
│  ├─ Typical minutes per use {{lookup: fixture_usage_pattern}} {{input: required}} (User)
│  ├─ business.primaryActivityText usage context {{lookup: fixture_usage_pattern}} (Profile)
│  ├─ Water-heating resource or cold-only selection {{input: required}} (User)
│  ├─ Hot-water fraction when nonzero {{input: required}} (User)
│  ├─ Hot-water temperature rise when nonzero {{input: required}} (User)
│  ├─ Water-heater efficiency when nonzero {{input: required}} (User)
│  ├─ Fixture selection
│  │  ├─ Existing fixture type {{lookup: fixture_context}} {{input: required}} (User)
│  │  ├─ Existing rated flow {{lookup: fixture_exact_rating}} {{input: required}} (User)
│  │  ├─ Linked Opportunity {{lookup: linked_opportunity}} {{intermediate: project-opportunity}}
│  │  ├─ Proposed fixture type {{lookup: fixture_context}} {{input: required}} (User)
│  │  └─ Proposed rated flow, if known {{lookup: fixture_exact_rating}} {{input: optional}} (User)
│  └─ Rated flow and use-pattern values (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-WATERSENSE-FIXTURES and STD-CONTEXT-BENCHMARKS.

**Default Estimate:** UNVALIDATED

**Notes:** Use a legitimate zero hot-water component for a confirmed cold-only fixture rather than assuming a fraction.
For a hot-water fixture with missing exact technical inputs, resolve one selected hot-water fraction, temperature rise, and heater-efficiency value through the commercial context benchmark.

### ITC-33 - Flush-fixture water reduction

**Status:** DRAFT

**Applicable Resources:** water-sewer

**Retrofits:**

- `high_efficiency_toilet_urinal` - High-efficiency toilet / urinal replacement

**Primary Formula:**

`S = quantity × flushes_per_year × (gpf_existing - gpf_proposed) × p_water_sewer`

**Supporting Formula(s):**

No additional formula is required.

**Information Tree:**

```text
Annual dollar savings
├─ Annual water reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Recognizable Flush Usage Pattern {{lookup: fixture_usage_pattern}} {{input: required}} (User)
│  ├─ Annual flushes per fixture {{lookup: fixture_usage_pattern}} {{input: required}} (User)
│  ├─ business.primaryActivityText usage context {{lookup: fixture_usage_pattern}} (Profile)
│  ├─ Fixture selection
│  │  ├─ Existing fixture type {{lookup: fixture_context}} {{input: required}} (User)
│  │  ├─ Existing rated gallons per flush {{lookup: fixture_exact_rating}} {{input: required}} (User)
│  │  ├─ Linked Opportunity {{lookup: linked_opportunity}} {{intermediate: project-opportunity}}
│  │  ├─ Proposed fixture type {{lookup: fixture_context}} {{input: required}} (User)
│  │  └─ Proposed rated gallons per flush, if known {{lookup: fixture_exact_rating}} {{input: optional}} (User)
│  └─ Rated gallons per flush and use-pattern values (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-WATERSENSE-FIXTURES and STD-CONTEXT-BENCHMARKS.

**Default Estimate:** UNVALIDATED

**Notes:** Toilets and urinals share the tree because fixture type selects a different record inside the same rating Standard.
The retained EPA commercial activity method selects one annual flush count, and an exact label, audit, or installed-class benchmark resolves existing gallons per flush.

### ITC-34 - Landscape water-budget reduction

**Status:** DRAFT

**Applicable Resources:** water-sewer

**Retrofits:**

- `smart_irrigation_controller` - Smart irrigation controller
- `efficient_irrigation_retrofit` - Drip irrigation / efficient irrigation retrofit

**Primary Formula:**

`S = (baseline_design_allowance_gallons - proposed_design_allowance_gallons) × p_water`

**Supporting Formula(s):**

Use the WaterSense Water Budget Tool equations with constant climate and landscape area across cases.

The result is a modeled design-allowance comparison, not measured existing operational consumption.

**Information Tree:**

```text
Annual dollar savings
├─ Annual irrigation water reduction
│  ├─ site.addressStructured.zip5, approximate only when parsed from an unmatched raw address {{lookup: site_zip}} (Profile)
│  ├─ Repeatable hydrozone definition
│  │  ├─ Approximate Landscape Area for Each Hydrozone {{lookup: hydrozone_definition}} {{input: required}} (User)
│  │  └─ Recognizable Plant or Landscape Type for Each Hydrozone {{lookup: hydrozone_definition}} {{input: required}} (User)
│  ├─ Existing irrigation configuration
│  │  ├─ Irrigation method {{lookup: irrigation_configuration}} {{input: required}} (User)
│  │  ├─ Irrigation efficiency, if known {{lookup: irrigation_efficiency}} {{input: optional}} (User)
│  │  └─ Controller treatment {{lookup: irrigation_configuration}} {{input: required}} (User)
│  ├─ Proposed irrigation configuration
│  │  ├─ Irrigation method {{lookup: irrigation_configuration}} {{input: required}} (User)
│  │  ├─ Irrigation efficiency, if known {{lookup: irrigation_efficiency}} {{input: optional}} (User)
│  │  └─ Controller treatment {{lookup: irrigation_configuration}} {{input: required}} (User)
│  └─ Climate data and Water Budget equations (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-WATERSENSE-LANDSCAPE.

**Default Estimate:** UNVALIDATED

**Notes:** The two retrofits share a category because the existing and proposed method are record selections in the same water-budget tree.
The Water Budget Tool is a design method and does not prove actual existing irrigation consumption.
Use only the water charge for irrigation unless a verified account rule proves the avoided irrigation use is sewer-billed.
Do not cap the modeled allowance difference against an unrelated whole-site annual water bill.

### ITC-35 - Measured leak avoidance

**Status:** DRAFT

**Applicable Resources:** water-sewer

**Retrofits:**

- `leak_detection_system` - Leak detection system

**Primary Formula:**

`S = measured_leak_gpm × confirmed_leak_minutes_per_year × p_water_sewer`

**Supporting Formula(s):**

No additional formula is required.

**Information Tree:**

```text
Annual dollar savings
├─ Annual measured leak water reduction
│  ├─ Measured leak flow {{lookup: watersense_method_inputs}} {{input: required}} (User)
│  ├─ Confirmed leak start date {{lookup: watersense_method_inputs}} {{input: required}} (User)
│  ├─ Confirmed repair date {{lookup: watersense_method_inputs}} {{input: required}} (User)
│  └─ WaterSense measured-leak calculation method (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-WATERSENSE-CI-OPERATIONS.

**Default Estimate:** UNVALIDATED

**Notes:** A detection system alone has zero attributable direct savings until it identifies and causes repair of a measured leak.

### ITC-36 - Cooling-tower water and fan optimization

**Status:** DRAFT

**Applicable Resources:** electricity, water-sewer

**Retrofits:**

- `cooling_tower_controls_optimization` - Cooling tower controls / optimization

**Primary Formula:**

`S = avoided_makeup_gallons × p_water_sewer + avoided_fan_kWh × p_electric`

**Supporting Formula(s):**

`makeup = evaporation + blowdown + drift`

`blowdown = evaporation / (cycles_of_concentration - 1)` when drift is handled separately.

**Information Tree:**

```text
Annual dollar savings
├─ Annual cooling-tower water and fan-electricity reduction
│  ├─ Existing cycles of concentration {{lookup: watersense_method_inputs}} {{input: required}} (User)
│  ├─ Proposed cycles of concentration {{lookup: watersense_method_inputs}} {{input: required}} (User)
│  ├─ Annual evaporation or equivalent heat rejection {{lookup: watersense_method_inputs, measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing fan control profile {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed fan control profile {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ WaterSense water balance (Standard)
│  └─ MEASUR fan-energy result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-WATERSENSE-CI-OPERATIONS and STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** Compute water and fan components independently and omit either component when its minimum inputs are absent.

### ITC-37 - Demand-controlled kitchen ventilation

**Status:** DRAFT

**Applicable Resources:** electricity, gas

**Retrofits:**

- `demand_controlled_kitchen_ventilation` - Demand-controlled kitchen ventilation

**Primary Formula:**

`S = avoided_fan_kWh × p_electric + Σ_r (avoided_makeup_air_R_r × p_r)`

**Supporting Formula(s):**

`fan_shaft_power_fraction = airflow_fraction³` for applicable variable-speed fan systems.
MEASUR must convert shaft power to electrical input with the applicable fan, motor, and drive efficiencies.

`avoided_fan_kWh = quantity × Σ_period hours_period × (existing_fan_kW_period - proposed_fan_kW_period)`

**Information Tree:**

```text
Annual dollar savings
├─ Annual kitchen ventilation fan and makeup-air resource reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Existing fan input power {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing Design Airflow {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing airflow schedule {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed airflow schedule {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Makeup-air heating system {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Makeup-air cooling system {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ site.geo.coordinates for outdoor conditions (Profile)
│  ├─ BR-ANNUAL-OPERATING-HOURS
│  └─ MEASUR fan and thermal result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** The cube law applies only within the validated system range and must not replace a measured fan curve when available.
The category remains DRAFT until the makeup-air thermal calculation and weather adapter are source-mapped and fixture-tested.

### ITC-38 - Motor input-power efficiency replacement

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `high_efficiency_motor_replacement` - High-efficiency motor replacement

**Primary Formula:**

`S = quantity × shaft_kW × load_fraction × (1 / η_existing - 1 / η_proposed) × annual_hours × p_electric`

**Supporting Formula(s):**

No additional formula is required.

**Information Tree:**

```text
Annual dollar savings
├─ Annual motor electricity reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Motor rated shaft power {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Motor rated speed {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Operating load fraction {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing motor class {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed motor class {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ BR-ANNUAL-OPERATING-HOURS
│  └─ MEASUR motor efficiencies (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** Load fraction is retained because nameplate power alone materially overstates many motor loads.

### ITC-39 - Variable-speed load-bin reduction

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `variable_frequency_drive_retrofit` - Variable frequency drive retrofit
- `pump_fan_controls_retrofit` - Pump/fan controls retrofit

**Primary Formula:**

`S = quantity × Σ_bins hours_i × (existing_kW_i - proposed_kW_i) × p_electric`

**Supporting Formula(s):**

MEASUR must return existing and proposed input kW for every bin from a pinned calculator and complete project inputs.
No standalone cube-law adjustment is approved without the exact shaft-power and drive-efficiency boundary.

**Information Tree:**

```text
Annual dollar savings
├─ Annual variable-speed electricity reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Existing full-load input kW {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Repeatable load-bin profile
│  │  ├─ Load or speed fraction for each bin {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  │  └─ Annual hours for each bin {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed Minimum Speed {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed control rule {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  └─ MEASUR load-bin result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR and STD-CONTEXT-BENCHMARKS.

**Default Estimate:** UNVALIDATED

**Notes:** These retrofits share the tree because the control type changes the proposed record inside one load-bin calculation.

### ITC-40 - Pump wire-to-water replacement

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `efficient_pump_replacement` - Efficient pump replacement

**Primary Formula:**

`S = quantity × (existing_input_kW - proposed_input_kW) × annual_hours × p_electric`

**Supporting Formula(s):**

`input_kW = hydraulic_power_kW / (pump_efficiency × motor_efficiency)`

**Information Tree:**

```text
Annual dollar savings
├─ Annual pump electricity reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Required flow {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Total dynamic head {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing pump efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing motor efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed pump efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed motor efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ BR-ANNUAL-OPERATING-HOURS
│  └─ MEASUR pump assessment result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** Flow and head are high-sensitivity project facts and cannot be replaced with a generic pump efficiency.

### ITC-41 - Fan or ventilation system replacement

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `efficient_fan_blower_replacement` - Efficient fan/blower replacement
- `efficient_ventilation_system` - Efficient ventilation system

**Primary Formula:**

`S = quantity × (existing_input_kW - proposed_input_kW) × annual_hours × p_electric`

**Supporting Formula(s):**

`input_kW = air_power_kW / (fan_efficiency × motor_efficiency)`

**Information Tree:**

```text
Annual dollar savings
├─ Annual fan-system electricity reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Required airflow {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Required pressure rise {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing fan efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing motor efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed fan efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed motor efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ BR-ANNUAL-OPERATING-HOURS
│  └─ MEASUR fan assessment result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** The two taxonomy types share an identical fan-system boundary and calculation tree.
When an efficient-ventilation opportunity changes heat recovery, outdoor-air quantity, or controls outside that fan-system boundary, use the closest compatible validated system method rather than misapplying the fan-only equation.

### ITC-42 - Air-compressor specific-power replacement

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `efficient_air_compressor` - Efficient air compressor

**Primary Formula:**

`S = quantity × annual_flow_hours × (specific_power_existing - specific_power_proposed) × p_electric`

**Supporting Formula(s):**

`annual_flow_hours = mean_flow × annual_hours` with the same flow unit used by specific power.

**Information Tree:**

```text
Annual dollar savings
├─ Annual compressor electricity reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Required pressure {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Mean flow {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing compressor type {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing compressor specific power {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed compressor type {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed compressor specific power {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ BR-ANNUAL-OPERATING-HOURS
│  └─ MEASUR compressed-air assessment result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** Preserve the delivered pressure and air requirement across cases.

### ITC-43 - Compressed-air leak loss

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `compressed_air_leak_repair` - Compressed air leak repair

**Primary Formula:**

`S = quantity × leak_flow × compressor_specific_power × annual_pressurized_hours × p_electric`

**Supporting Formula(s):**

Use the selected MEASUR leak-measurement method to resolve `leak_flow`.

**Information Tree:**

```text
Annual dollar savings
├─ Annual compressed-air leak electricity reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Selected leak-measurement method {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Measurement Observations {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ System Pressure {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Compressor specific power {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ BR-ANNUAL-OPERATING-HOURS
│  └─ MEASUR leak-flow result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** A generic leak percentage is not a substitute for a measured leak method.

### ITC-44 - Compressed-air control profile reduction

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `compressed_air_controls` - Compressed air controls

**Primary Formula:**

`S = quantity × Σ_bins hours_i × (existing_kW_i - proposed_kW_i) × p_electric`

**Supporting Formula(s):**

MEASUR resolves input kW from compressor type, control mode, pressure, and load fraction.

**Information Tree:**

```text
Annual dollar savings
├─ Annual compressed-air control electricity reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Compressor type {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Rated input power {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Rated flow {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing control mode {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed control mode {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Repeatable annual load profile
│  │  ├─ Load fraction for each bin {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  │  └─ Annual hours for each bin {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  └─ MEASUR control-profile result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** Do not merge with leak repair because the inputs, physics, and missing-data behavior differ.

### ITC-45 - Waste-heat useful-energy recovery

**Status:** DRAFT

**Applicable Resources:** electricity, gas

**Retrofits:**

- `waste_heat_recovery` - Waste heat recovery

**Primary Formula:**

`S = avoided_displaced_resource × p_displaced_resource - added_auxiliary_kWh × p_electric`

**Supporting Formula(s):**

`useful_recovered_heat = min(available_waste_heat × recovery_efficiency, coincident_useful_heat_load)`

`avoided_displaced_resource = min(to_billed_unit(useful_recovered_heat / displaced_system_efficiency, displaced_resource_unit), billed_displaced_resource)`

**Information Tree:**

```text
Annual waste-heat resource value
├─ Waste-stream flow {{lookup: measur_calculator_inputs}} {{input: required}} (User)
├─ Waste-stream temperature {{lookup: measur_calculator_inputs}} {{input: required}} (User)
├─ Waste-stream schedule {{lookup: measur_calculator_inputs}} {{input: required}} (User)
├─ Coincident Useful-Heat Load {{lookup: measur_calculator_inputs}} {{input: required}} (User)
├─ Recovery-equipment efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
├─ Displaced heating-system efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
├─ Recovery auxiliary power {{lookup: measur_calculator_inputs}} {{input: required}} (User)
├─ BR-ANNUAL-BILL-RESOURCE
├─ MEASUR process-heat result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** Cap recovered heat at coincident useful demand and exclude revenue from exported heat or power.

### ITC-46 - Industrial process electrification balance

**Status:** DRAFT

**Applicable Resources:** electricity, gas

**Retrofits:**

- `industrial_heat_pump` - Industrial heat pump
- `process_electrification_equipment` - Process electrification equipment

**Primary Formula:**

`S = current_fuel_input × p_fuel - proposed_electric_input × p_electric`

**Supporting Formula(s):**

`useful_process_heat = to_energy(current_fuel_input, current_fuel_unit) × current_efficiency`

`proposed_electric_input = to_billed_unit(useful_process_heat / proposed_COP_or_efficiency, electricity_unit)`

**Information Tree:**

```text
Annual dollar savings
├─ Annual process resource switch
│  ├─ BR-ANNUAL-BILL-RESOURCE
│  ├─ Process share of billed fuel {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing Process or Fuel Type {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Required Process Temperature {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Useful Process Load {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing process efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed technology {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed COP or efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  └─ MEASUR process-heating balance (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** The two retrofit types share the tree because the proposed technology selects the applicable efficiency or COP record inside the same useful-heat balance.
When the process-electrification scope is not a thermal process that can use this balance, route it to the closest compatible validated process method rather than misapplying this equation.

### ITC-47 - Steam-trap loss reduction

**Status:** DRAFT

**Applicable Resources:** gas

**Retrofits:**

- `steam_trap_replacement` - Steam trap replacement

**Primary Formula:**

`S = quantity × avoided_steam_loss × boiler_fuel_per_steam_unit × p_fuel`

**Supporting Formula(s):**

`boiler_fuel_per_steam_unit = to_billed_unit(steam_enthalpy_rise / boiler_efficiency, boiler_fuel_unit)`

`avoided_steam_loss = steam_loss_rate × annual_pressurized_hours`

**Information Tree:**

```text
Annual dollar savings
├─ Annual steam-trap fuel reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Failed-trap condition {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Leak class {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Steam Pressure {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Condensate-return condition {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ BR-ANNUAL-OPERATING-HOURS
│  ├─ Boiler efficiency {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  └─ MEASUR steam-loss result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** Use tested failed-trap condition, not the total installed trap count.

### ITC-48 - Induction-cooking measured resource switch

**Status:** BLOCKED

**Applicable Resources:** electricity, gas

**Retrofits:**

- `induction_cooking_equipment` - Induction cooking equipment

**Primary Formula:**

`S = current_annual_cooking_fuel × p_fuel - proposed_annual_induction_kWh × p_electric`

**Supporting Formula(s):**

`current_annual_cooking_fuel = annual_billed_fuel × confirmed_cooking_share`

`proposed_annual_induction_kWh = annual_cooking_activity × proposed_tested_kWh_per_activity_unit`

**Information Tree:**

```text
Annual dollar savings
├─ Annual cooking resource switch
│  ├─ BR-ANNUAL-BILL-RESOURCE
│  ├─ Cooking share of billed fuel or direct equipment measurement, if known {{input: optional}} (User)
│  ├─ Annual Cooking Activity in the Tested Duty Unit, if known {{input: optional}} (User)
│  ├─ Proposed Induction kWh per Identical Tested Duty Unit, if known {{input: optional}} (User)
│  ├─ Existing cooking-duty definition {{input: required}} (User)
│  └─ Proposed duty-equivalence confirmation {{input: required}} (User)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** None.

**Default Estimate:** UNVALIDATED

**Notes:** BLOCKED because no authoritative public commercial induction model-level dataset or standardized cross-fuel duty lookup was validated.
The broad ComStock electric-cooking scenario is not an induction-specific record and must not be used as one.
The formula is usable only with a project-specific bill allocation or measurement and proposed performance tested for an identical cooking duty.

### ITC-49 - Walk-in refrigeration measured system delta

**Status:** BLOCKED

**Applicable Resources:** electricity

**Retrofits:**

- `walk_in_cooler_freezer_upgrade` - Walk-in cooler/freezer upgrade

**Primary Formula:**

`S = (current_annual_refrigeration_kWh - proposed_annual_refrigeration_kWh) × p_electric`

**Supporting Formula(s):**

`current_annual_refrigeration_kWh = annual_billed_kWh × confirmed_walk_in_share` unless direct submetering is available.

**Information Tree:**

```text
Annual dollar savings
├─ Annual walk-in refrigeration electricity reduction
│  ├─ BR-ANNUAL-BILL-RESOURCE
│  ├─ Walk-in share of billed electricity or direct measurement, if known {{input: optional}} (User)
│  ├─ Proposed Annual System kWh for the Same Box Load and Duty, if known {{input: optional}} (User)
│  └─ Existing and proposed duty-equivalence confirmation {{input: required}} (User)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** None.

**Default Estimate:** UNVALIDATED

**Notes:** BLOCKED because certified walk-in component ratings do not by themselves resolve whole-system annual kWh for a specific box and load.
The formula is usable only with a project-specific baseline allocation or measurement and a proposed whole-system result for the same duty.

### ITC-50 - Commercial cooking tested-duty and idle balance

**Status:** DRAFT

**Applicable Resources:** electricity, gas

**Retrofits:**

- `high_efficiency_fryer` - High-efficiency fryer
- `high_efficiency_oven` - High-efficiency oven
- `high_efficiency_steamer` - High-efficiency steamer

**Primary Formula:**

`S = quantity × Σ_r ((annual_activity_per_unit × (active_intensity_existing,r - active_intensity_proposed,r) + annual_idle_hours × (idle_rate_existing,r - idle_rate_proposed,r)) × p_r)`

**Supporting Formula(s):**

`active_input_per_test_unit = to_billed_unit(useful_test_load_per_unit / tested_cooking_efficiency, resource_unit)` when the certification reports efficiency rather than direct input intensity.

**Information Tree:**

```text
Annual dollar savings
├─ Annual commercial cooking resource reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ BR-CERTIFIED-PRODUCT-RESOLUTION
│  ├─ Recognizable Cooking Usage Pattern {{lookup: product_usage_pattern}} {{input: required}} (User)
│  ├─ Annual Activity per Unit in the Certified Test Unit {{lookup: product_usage_pattern}} {{input: required}} (User)
│  ├─ Annual Idle Hours per Unit {{lookup: product_usage_pattern}} {{input: required}} (User)
│  └─ Certified cooking efficiency and idle energy rate by resource (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-CCMS-RATINGS and STD-ENERGY-STAR-PRODUCT-DATA.

**Default Estimate:** UNVALIDATED

**Notes:** These three product families share the same tested-duty plus idle-energy tree, while each adapter preserves its exact test unit and resource.
The category remains DRAFT until DOE database access and all three product adapters are fixture-tested.

### ITC-51 - Air-filtration fan-power delta

**Status:** DRAFT

**Applicable Resources:** electricity

**Retrofits:**

- `air_filtration_system` - Air filtration system

**Primary Formula:**

`S = quantity × (existing_input_kW - proposed_input_kW) × annual_hours × p_electric`

**Supporting Formula(s):**

`fan_input_kW = airflow × pressure_rise × air_power_conversion_factor / (fan_efficiency × motor_efficiency)`

`air_power_conversion_factor` must convert the declared flow and pressure units to kW exactly once.

**Information Tree:**

```text
Annual dollar impact
├─ Annual filtration fan electricity change
│  ├─ BR-SCOPE-QUANTITY
│  ├─ Required airflow {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Clean-filter pressure rise {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Loaded-filter pressure rise {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing fan input data {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Existing filtration input data {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed fan input data {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ Proposed filtration input data {{lookup: measur_calculator_inputs}} {{input: required}} (User)
│  ├─ BR-ANNUAL-OPERATING-HOURS
│  └─ MEASUR fan-power result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Default Estimate:** UNVALIDATED

**Notes:** Use zero existing input for a new standalone filtration load, which yields a negative direct operational value.
Health, productivity, and indoor-air-quality benefits remain out of scope.

### ITC-52 - Commercial dishwasher water, heat, and idle balance

**Status:** DRAFT

**Applicable Resources:** electricity, gas, water-sewer

**Retrofits:**

- `high_efficiency_commercial_dishwasher` - High-efficiency commercial dishwasher

**Primary Formula:**

`S = avoided_water × p_water_sewer + Σ_r (avoided_water_heating_R_r × p_r) + avoided_idle_kWh × p_electric`

**Supporting Formula(s):**

`avoided_water = quantity × annual_racks_per_unit × (water_per_rack_existing - water_per_rack_proposed)`

`avoided_water_heating_R_r = quantity × annual_racks_per_unit × (water_heating_R_per_rack_existing - water_heating_R_per_rack_proposed)`

`avoided_idle_kWh = quantity × annual_idle_hours_per_unit × (idle_kW_existing - idle_kW_proposed)`

`annual_idle_hours_per_unit` may be confirmed directly or derived as `annual_energized_hours_per_unit - annual_active_wash_hours_per_unit`.

**Information Tree:**

```text
Annual dollar savings
├─ Annual commercial dishwasher resource reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ BR-CERTIFIED-PRODUCT-RESOLUTION
│  ├─ Recognizable Dishwasher Usage Pattern {{lookup: product_usage_pattern}} {{input: required}} (User)
│  ├─ Annual Racks or Operating Hours in the Certified Test Unit {{lookup: product_usage_pattern}} {{input: required}} (User)
│  ├─ Annual Idle Hours per Unit, if known {{lookup: product_usage_pattern}} {{input: optional}} (User)
│  ├─ Water-heating resources represented by the per-rack inputs {{input: required}} (User)
│  ├─ Existing purchased water-heating input per certified rack by resource {{input: required}} (User)
│  ├─ Proposed purchased water-heating input per certified rack by resource {{input: required}} (User)
│  └─ Certified water use and idle energy by model (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-CCMS-RATINGS, STD-ENERGY-STAR-PRODUCT-DATA, and STD-CONTEXT-BENCHMARKS.

**Default Estimate:** UNVALIDATED

**Notes:** Flight-type machines use the certified hourly activity unit instead of racks and must not be converted with an assumed racks-per-hour value.
Report only the modeled water, water-heating, and idle-energy components when the source does not separately report active-cycle machine electricity.
The category remains DRAFT until the sanitation, booster-heater, water, and idle-energy adapter is fixture-tested.
Do not infer water-heating input from total water per rack without a source-supported wash, rinse, booster, and resource boundary.

### ITC-53 - Commercial laundry cycle resource balance

**Status:** DRAFT

**Applicable Resources:** electricity, gas, water-sewer

**Retrofits:**

- `high_efficiency_laundry_equipment` - High-efficiency laundry equipment

**Primary Formula:**

`S = avoided_water × p_water_sewer + avoided_machine_kWh × p_electric + avoided_water_heating_input × p_heating_resource`

**Supporting Formula(s):**

`water_per_cycle = certified_tub_volume × certified_integrated_water_factor`

`avoided_water = quantity × annual_cycles_per_unit × (water_per_cycle_existing - water_per_cycle_proposed)`

`hot_water_per_cycle_case = water_per_cycle_case × hot_fraction_case`

`avoided_hot_water = quantity × annual_cycles_per_unit × (hot_water_per_cycle_existing - hot_water_per_cycle_proposed)`

`avoided_water_heating_input = to_billed_unit(avoided_hot_water × thermal_energy_per_gallon / heater_efficiency, heating_resource_unit)`

`avoided_machine_kWh = quantity × annual_cycles_per_unit × (machine_kWh_per_cycle_existing - machine_kWh_per_cycle_proposed)`

**Information Tree:**

```text
Annual dollar savings
├─ Annual commercial laundry resource reduction
│  ├─ BR-SCOPE-QUANTITY
│  ├─ BR-CERTIFIED-PRODUCT-RESOLUTION
│  ├─ Recognizable Laundry Usage Pattern {{lookup: product_usage_pattern}} {{input: required}} (User)
│  ├─ Annual Cycles per Unit {{lookup: product_usage_pattern}} {{input: required}} (User)
│  ├─ Existing hot-water fraction {{lookup: product_usage_pattern}} {{input: required}} (User)
│  ├─ Proposed hot-water fraction {{lookup: product_usage_pattern}} {{input: required}} (User)
│  ├─ Hot-water temperature rise {{input: required}} (User)
│  ├─ Water-heating resource {{input: required}} (User)
│  ├─ Water-heater efficiency {{input: required}} (User)
│  ├─ Existing and proposed separately reported or measured machine electricity per cycle, if known {{input: optional}} (User)
│  └─ Certified tub volume and water or energy factors (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-CCMS-RATINGS and STD-ENERGY-STAR-PRODUCT-DATA.

**Default Estimate:** UNVALIDATED

**Notes:** Do not apply the standardized modified-energy-factor total directly to a site bill because it combines machine, water-heating, and remaining-moisture drying assumptions.
When machine electricity is not separately reported or measured, select one compatible product-class benchmark and keep it distinct from water heating.
Commercial dryers and combined washer-dryers require their own source-specific benchmark and calculation tree rather than reuse the washer method.

### ITC-54 - Backup-power routine resource use

**Status:** BLOCKED

**Applicable Resources:** electricity, gas, liquid-fuel

**Retrofits:**

- `resilience_backup_power_system` - Resilience / backup power system

**Primary Formula:**

`S = -(annual_test_fuel × p_fuel + annual_standby_kWh × p_electric)`

**Supporting Formula(s):**

`annual_test_fuel = quantity × test_fuel_per_hour × annual_test_hours_per_unit`

`annual_standby_kWh = quantity × standby_kW_per_unit × annual_energized_hours_per_unit`

**Information Tree:**

```text
Annual routine backup-power resource cost
├─ BR-SCOPE-QUANTITY
├─ Backup technology {{input: required}} (User)
├─ Fuel type {{input: required}} (User)
├─ Tested fuel use per operating hour per unit, if known {{input: optional}} (User)
├─ Standby electric input kW per unit, if known {{input: optional}} (User)
├─ Scheduled annual test operating hours per unit, if known {{input: optional}} (User)
├─ Annual standby energized hours per unit, if known {{input: optional}} (User)
├─ Technology-and-capacity routine-use benchmark {{lookup: benchmark_context, exact_value_override, eligible_population}} (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-CONTEXT-BENCHMARKS.

**Default Estimate:** UNVALIDATED

**Notes:** BLOCKED because the broad taxonomy type has no validated public model-level performance source across generator, battery, and hybrid systems.
The formula is usable with project-specific tested or contractual routine-use values.
Exclude unpredictable outage operation and all resilience, reliability, and avoided-loss value.

## Coverage contract

The validator independently imports the canonical taxonomy and parses the category sections.
The required result is 54 categories, 92 unique retrofit mappings, zero missing IDs, and zero duplicate IDs.
It also checks category field order, allowed statuses, terminal source labels, canonical branch and Standard references, registry usage declarations, and direct-source URL syntax.

## Change procedure

1. Change the taxonomy or category tree only with an explicit identity review.
2. Split a category whenever formula, inputs, source labels, Standard, bill treatment, missing behavior, automation, or platform behavior diverges.
3. Merge categories only when the complete trees are identical and differences are record selections inside one Standard.
4. Update branch and Standard usage lists in the same commit.
5. Run `node scripts/generate-operational-savings-review-pages.mjs` after every canonical category, branch, or Standard change.
6. Run `node scripts/generate-operational-savings-review-pages.mjs --check` and `node scripts/validate-operational-savings-information-trees.mjs`, then inspect the full diff.
7. Keep all statuses below human finalization.
