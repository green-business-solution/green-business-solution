# Operational Savings Information Trees

## Purpose and boundary

This document defines the minimum information needed to estimate predictable annual direct operational-resource value for every canonical retrofit taxonomy type.
It is a screening architecture, not an investment-grade audit.
It includes purchased electricity, demand, fuel, water, sewer, and waste only when a category has an explicit direct formula.
It excludes project costs, incentives, taxes, financing, maintenance, repairs, downtime, productivity, equipment life, resilience monetization, comfort, health, revenue, asset value, emissions, and speculative benefits.

The canonical taxonomy is `RETROFIT_TYPES` in `apps/api/server/matching/retrofitTaxonomy.mjs`.
The canonical external lookup specifications are in `docs/operational-savings-standard-registry.md`.
The focused validation command is `node scripts/validate-operational-savings-information-trees.mjs`.

## Conventions

- `S` is annual direct operational-resource savings in dollars.
- `ΔR_r` is annual avoided resource `r` in the bill's native unit and may be negative when a retrofit adds resource use.
- `p_r` is the avoidable marginal price for resource `r` from BR-AVOIDABLE-RESOURCE-RATE.
- Fixed charges are excluded unless the proposed case demonstrably removes the charge.
- A whole-bill average is not a marginal rate.
- Annual energy is not interval demand.
- A utility-provider candidate is not a verified tariff or customer class.
- User inputs are project facts that cannot be resolved safely from the profile, bills, or a Standard.
- Standard-derived generic values must remain visible and editable.
- Missing high-sensitivity information produces no estimate for the affected component, never a silent default.

Allowed category and branch statuses are `DRAFT`, `RESEARCHED — READY FOR HUMAN REVIEW`, and `BLOCKED`.
Nothing in this document is finalized.

## Shared Branch Registry

### BR-AVOIDABLE-RESOURCE-RATE - Avoidable marginal resource price

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Value:** `p_r`, the price avoided or incurred by the next unit of resource `r` during the modeled periods.

```text
p_r
└─ Applicable variable charge for resource r (Bill)
```

For electricity, preserve energy, demand, time-of-use, seasonal, export-credit, and non-bypassable components separately.
For gas, water, sewer, liquid fuel, or waste, use the applicable variable block or service price.
Exclude fixed customer charges unless usage elimination also removes the charge.
If only a whole-bill blended rate exists, use it only for a single volumetric tariff and flag the result as estimated.
Otherwise return no dollar value while retaining the resource result.

**Used By:** ITC-01 through ITC-14, ITC-17, ITC-19 through ITC-22, ITC-27 through ITC-30, and ITC-32 through ITC-47.

### BR-ANNUAL-BILL-RESOURCE - Annual billed resource baseline

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Value:** Annual imported quantity for the requested resource and service period.

```text
Annual billed resource r
├─ Billed resource quantities and units (Bill)
└─ Billing-period start and end dates (Bill)
```

Normalize only with explicit unit conversions, annualize only when at least 10 representative months are present, and retain the coverage fraction.
Do not derive end-use energy from a whole-building bill without a documented Standard or user-confirmed allocation.

**Used By:** ITC-01, ITC-03 through ITC-07, ITC-09, ITC-11, ITC-14, ITC-18, ITC-20 through ITC-22, ITC-29, ITC-34, ITC-36, ITC-45, and ITC-46.

### BR-ANNUAL-OPERATING-HOURS - Confirmed annual operating time

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Value:** Annual operating hours for the exact equipment or controlled load.

```text
Annual operating hours
├─ Hours per operating day (User)
└─ Operating days per year (User)
```

The application may prefill hours from published business hours or an equipment schedule, but the project-specific value remains a User leaf.

**Used By:** ITC-09, ITC-12, ITC-20 through ITC-22, ITC-27, ITC-28, ITC-30, ITC-37 through ITC-44, and ITC-47.

### BR-INTERVAL-LOAD-AND-TARIFF - Chronological electric load and complete tariff

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Value:** Aligned interval import load and tariff rules for one analysis year.

```text
Chronological load and tariff
├─ Timestamped interval kW or kWh (Bill)
├─ Interval timezone and daylight-saving treatment (Bill)
├─ Rate schedule and customer class (Bill)
├─ Billing demand and ratchet rules (Bill)
├─ Time-of-use periods and seasonal calendar (Bill)
└─ Export and non-bypassable charge rules (Bill)
```

All intervals must be continuous, aligned to the tariff calendar, and reconciled to billed monthly energy.
Monthly peak values without timestamps are insufficient for dispatch, demand response, or time-of-use shifting.
When this branch is missing, the affected interval-value category returns no estimate.

**Used By:** ITC-16, ITC-17, ITC-19, ITC-23 through ITC-26, and ITC-31.

### BR-SCOPE-QUANTITY - In-scope equipment quantity

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Value:** Count of identical in-scope units represented by one calculation row.

```text
In-scope quantity
└─ Count of identical units in project scope (User)
```

Split a project into rows when equipment models, schedules, ratings, or operating conditions differ materially.

**Used By:** ITC-02, ITC-06 through ITC-08, ITC-10, ITC-12, ITC-13, ITC-20 through ITC-22, ITC-27 through ITC-30, ITC-32, ITC-33, ITC-37 through ITC-44, and ITC-47.

## Category Index

| Category | Information-tree identity | Status | Retrofit count |
|---|---|---|---:|
| `ITC-01` | ComStock archetype annual resource delta | RESEARCHED — READY FOR HUMAN REVIEW | 14 |
| `ITC-02` | Exterior lighting power and schedule | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-03` | Fuel-fired equipment efficiency replacement | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-04` | Boiler control fractional fuel reduction | DRAFT | 1 |
| `ITC-05` | Duct loss reduction | DRAFT | 1 |
| `ITC-06` | Heat-pump water-heater resource switching | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-07` | Gas water-heater efficiency replacement | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-08` | Solar thermal backup-resource displacement | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-09` | Water-heating recirculation loss reduction | DRAFT | 1 |
| `ITC-10` | Refrigeration certified-rating replacement | RESEARCHED — READY FOR HUMAN REVIEW | 2 |
| `ITC-11` | Refrigeration control fractional reduction | DRAFT | 3 |
| `ITC-12` | Refrigeration EC-motor power reduction | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-13` | Product resource intensity per activity | RESEARCHED — READY FOR HUMAN REVIEW | 6 |
| `ITC-14` | Scout ECM fractional resource screen | BLOCKED | 5 |
| `ITC-15` | No direct operational-resource calculation | RESEARCHED — READY FOR HUMAN REVIEW | 13 |
| `ITC-16` | Demand-response interval bill delta | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-17` | PV interval generation and bill offset | RESEARCHED — READY FOR HUMAN REVIEW | 3 |
| `ITC-18` | Community-solar contract bill delta | DRAFT | 1 |
| `ITC-19` | Wind interval generation and bill offset | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-20` | Fuel-cell electricity and fuel balance | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-21` | CHP electric and useful-heat balance | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-22` | Biomass or biogas resource balance | DRAFT | 1 |
| `ITC-23` | Battery interval dispatch | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-24` | Solar-plus-storage interval dispatch | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-25` | Thermal-storage interval dispatch | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-26` | Microgrid composite interval dispatch | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-27` | Public EVSE added-load bill impact | RESEARCHED — READY FOR HUMAN REVIEW | 3 |
| `ITC-28` | Fleet charging added-load bill impact | DRAFT | 1 |
| `ITC-29` | Light-duty vehicle resource switching | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-30` | Forklift resource switching | BLOCKED | 1 |
| `ITC-31` | Managed fleet-charging interval shift | DRAFT | 1 |
| `ITC-32` | Flow-fixture water and hot-water reduction | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-33` | Flush-fixture water reduction | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-34` | Landscape water-budget reduction | RESEARCHED — READY FOR HUMAN REVIEW | 2 |
| `ITC-35` | Measured leak avoidance | DRAFT | 1 |
| `ITC-36` | Cooling-tower water and fan optimization | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-37` | Demand-controlled kitchen ventilation | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-38` | Motor input-power efficiency replacement | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-39` | Variable-speed load-bin reduction | RESEARCHED — READY FOR HUMAN REVIEW | 2 |
| `ITC-40` | Pump wire-to-water replacement | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-41` | Fan or ventilation system replacement | RESEARCHED — READY FOR HUMAN REVIEW | 2 |
| `ITC-42` | Air-compressor specific-power replacement | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-43` | Compressed-air leak loss | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-44` | Compressed-air control profile reduction | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-45` | Waste-heat useful-energy recovery | RESEARCHED — READY FOR HUMAN REVIEW | 1 |
| `ITC-46` | Industrial process electrification balance | RESEARCHED — READY FOR HUMAN REVIEW | 2 |
| `ITC-47` | Steam-trap loss reduction | RESEARCHED — READY FOR HUMAN REVIEW | 1 |

## Information Category Trees

### ITC-01 - ComStock archetype annual resource delta

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

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
- `induction_cooking_equipment` - Induction cooking equipment
- `demand_controlled_ventilation` - Demand-controlled ventilation

**Primary Formula:**

`S = Σ_r (ΔR_r × p_r)`

**Supporting Formula(s):**

`ΔR_r = floor_area × median_ComStock_delta_r_per_ft²`

`avoided_R_r = min(max(ΔR_r, 0), billed_R_r)` while negative `ΔR_r` remains added resource use.

**Information Tree:**

```text
Annual direct resource savings
├─ Annual resource delta by resource
│  ├─ Canonical retrofit and linked opportunity
│  │  └─ Canonical retrofit ID from matched opportunity (Profile)
│  ├─ Existing-condition selector (User)
│  ├─ Proposed-option selector (User)
│  ├─ Building type (Profile)
│  ├─ Site state or county (Profile)
│  ├─ Floor area (Profile)
│  └─ ComStock per-area delta distribution (Standard)
├─ BR-ANNUAL-BILL-RESOURCE
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-COMSTOCK-ANNUAL-DELTA.

**Notes:** Only the 14 explicitly crosswalked ComStock measures belong here.
Do not add separate measure results together.
Show the interquartile range and applicability share beside the screening estimate.

### ITC-02 - Exterior lighting power and schedule

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `exterior_site_lighting_retrofit` - Exterior/site lighting retrofit

**Primary Formula:**

`S = quantity × (existing_kW - proposed_kW) × annual_on_hours × p_electric`

**Supporting Formula(s):**

`annual_on_hours = darkness_hours × control_on_fraction`

**Information Tree:**

```text
Annual electricity reduction
├─ BR-SCOPE-QUANTITY
├─ Existing input kW per fixture (User)
├─ Proposed input kW per fixture (User)
├─ Site coordinates (Profile)
├─ Control-on fraction (User)
├─ Darkness-hour calculation (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** Use a project photometric design for scope suitability, but do not monetize lighting quality.

### ITC-03 - Fuel-fired equipment efficiency replacement

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `high_efficiency_furnace_retrofit` - High-efficiency furnace retrofit

**Primary Formula:**

`S = current_annual_fuel × (1 - η_existing / η_proposed) × p_fuel`

**Supporting Formula(s):**

`current_annual_fuel = measured_equipment_fuel` or a user-confirmed allocation of BR-ANNUAL-BILL-RESOURCE.

**Information Tree:**

```text
Annual fuel reduction
├─ Current annual furnace fuel
│  ├─ BR-ANNUAL-BILL-RESOURCE
│  └─ Furnace share of billed fuel (User)
├─ Existing furnace model (User)
├─ Proposed furnace model (User)
├─ Existing and proposed certified efficiency (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-CCMS-RATINGS.

**Notes:** Return no result when furnace fuel cannot be isolated from other gas end uses.

### ITC-04 - Boiler control fractional fuel reduction

**Status:** DRAFT

**Retrofits:**

- `boiler_controls_burner_retrofit` - Boiler controls / burner retrofit

**Primary Formula:**

`S = annual_boiler_fuel × control_reduction_fraction × p_fuel`

**Supporting Formula(s):**

`control_reduction_fraction = 1 - proposed_annual_fuel / baseline_annual_fuel`

**Information Tree:**

```text
Annual fuel reduction
├─ Annual boiler fuel
│  ├─ BR-ANNUAL-BILL-RESOURCE
│  └─ Boiler share of billed fuel (User)
├─ Existing control sequence (User)
├─ Proposed control sequence (User)
├─ MEASUR baseline and proposed fuel result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** A generic controls percentage is not acceptable.
The status remains DRAFT until the exact MEASUR adapter and minimum control inputs are fixture-tested.

### ITC-05 - Duct loss reduction

**Status:** DRAFT

**Retrofits:**

- `duct_sealing_and_insulation` - Duct sealing and duct insulation

**Primary Formula:**

`S = Σ_r (annual_HVAC_R_r × duct_loss_reduction_fraction × p_r)`

**Supporting Formula(s):**

`duct_loss_reduction_fraction = existing_duct_loss_fraction - proposed_duct_loss_fraction`

**Information Tree:**

```text
Annual HVAC resource reduction
├─ Annual HVAC resource by fuel
│  ├─ BR-ANNUAL-BILL-RESOURCE
│  └─ HVAC share of billed resource (User)
├─ Existing duct location and condition (User)
├─ Proposed sealing and insulation scope (User)
├─ Applicable duct-loss performance factor (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-SCOUT-ECM-SCREEN.

**Notes:** Return no estimate until an exact supported Scout definition is approved or measured duct leakage is supplied.

### ITC-06 - Heat-pump water-heater resource switching

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `heat_pump_water_heater` - Heat pump water heater

**Primary Formula:**

`S = avoided_existing_resource × p_existing - added_kWh × p_electric`

**Supporting Formula(s):**

`annual_hot_water_load = current_annual_input × η_existing`

`added_kWh = annual_hot_water_load / UEF_or_COP_proposed`

**Information Tree:**

```text
Annual resource switch
├─ Current annual water-heating input
│  ├─ BR-ANNUAL-BILL-RESOURCE
│  └─ Water-heating share (User)
├─ BR-SCOPE-QUANTITY
├─ Existing water-heater model (User)
├─ Proposed heat-pump water-heater model (User)
├─ Certified existing and proposed performance (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-CCMS-RATINGS and STD-ENERGY-STAR-PRODUCT-DATA.

**Notes:** Do not use ComStock for this category because its published commercial service-water-heating coverage is incomplete.

### ITC-07 - Gas water-heater efficiency replacement

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `high_efficiency_gas_water_heater` - High-efficiency gas water heater

**Primary Formula:**

`S = current_annual_gas × (1 - η_existing / η_proposed) × p_gas`

**Supporting Formula(s):**

No additional formula is required.

**Information Tree:**

```text
Annual gas reduction
├─ Current annual water-heating gas
│  ├─ BR-ANNUAL-BILL-RESOURCE
│  └─ Water-heating share (User)
├─ BR-SCOPE-QUANTITY
├─ Existing model (User)
├─ Proposed model (User)
├─ Certified efficiencies (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-CCMS-RATINGS and STD-ENERGY-STAR-PRODUCT-DATA.

**Notes:** The current end-use allocation must be confirmed rather than inferred from business type alone.

### ITC-08 - Solar thermal backup-resource displacement

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `solar_water_heating_system` - Solar water heating system

**Primary Formula:**

`S = useful_solar_thermal_output / backup_efficiency × p_backup_resource`

**Supporting Formula(s):**

`useful_solar_thermal_output = min(SAM_output, annual_delivered_hot_water_load)`

**Information Tree:**

```text
Annual backup-resource reduction
├─ Site coordinates (Profile)
├─ Collector configuration and area (User)
├─ Storage volume (User)
├─ Annual delivered hot-water load (User)
├─ Backup resource and efficiency (User)
├─ BR-SCOPE-QUANTITY
├─ SAM solar-thermal output (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-SAM-SOLAR-THERMAL.

**Notes:** Four project confirmations are retained because load and system size are high-sensitivity facts.

### ITC-09 - Water-heating recirculation loss reduction

**Status:** DRAFT

**Retrofits:**

- `water_heating_controls_recirculation` - Water-heating controls / recirculation controls

**Primary Formula:**

`S = avoided_thermal_input × p_heating_resource + avoided_pump_kWh × p_electric`

**Supporting Formula(s):**

`avoided_thermal_input = avoided_distribution_heat / heater_efficiency`

`avoided_pump_kWh = pump_kW × avoided_run_hours`

**Information Tree:**

```text
Annual resource reduction
├─ BR-ANNUAL-BILL-RESOURCE
├─ Recirculation share of water-heating resource (User)
├─ Existing and proposed control schedules (User)
├─ Pump input kW (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ MEASUR thermal and pump result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** Status remains DRAFT until the adapter demonstrates a minimum-input heat-loss calculation without assumed pipe geometry.

### ITC-10 - Refrigeration certified-rating replacement

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `high_efficiency_refrigeration_equipment` - High-efficiency refrigeration equipment
- `walk_in_cooler_freezer_upgrade` - Walk-in cooler/freezer upgrade

**Primary Formula:**

`S = quantity × (existing_annual_kWh - proposed_annual_kWh) × p_electric`

**Supporting Formula(s):**

Convert daily ratings with `annual_kWh = daily_kWh × 365` only when the certification field is daily energy consumption.

**Information Tree:**

```text
Annual electricity reduction
├─ BR-SCOPE-QUANTITY
├─ Existing product group and model (User)
├─ Proposed product group and model (User)
├─ Certified annual or daily energy ratings (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-CCMS-RATINGS and STD-ENERGY-STAR-PRODUCT-DATA.

**Notes:** These types share a category because they use different records within the same certified-rating tree and identical missing-model behavior.

### ITC-11 - Refrigeration control fractional reduction

**Status:** DRAFT

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
Annual electricity reduction
├─ Affected refrigeration annual kWh
│  ├─ BR-ANNUAL-BILL-RESOURCE
│  └─ Affected-load share (User)
├─ Existing condition or control (User)
├─ Proposed scope or sequence (User)
├─ Exact refrigeration ECM factor (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-SCOUT-ECM-SCREEN.

**Notes:** The category remains DRAFT until exact Scout records are crosswalked.
No broad refrigeration percentage may be substituted.

### ITC-12 - Refrigeration EC-motor power reduction

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `refrigeration_ec_motor_retrofit` - Refrigeration EC motor retrofit

**Primary Formula:**

`S = quantity × (existing_input_kW - proposed_input_kW) × annual_hours × p_electric`

**Supporting Formula(s):**

`input_kW = shaft_kW / motor_efficiency` when only shaft power is known.

**Information Tree:**

```text
Annual electricity reduction
├─ BR-SCOPE-QUANTITY
├─ Existing motor input or shaft rating (User)
├─ Proposed motor input or shaft rating (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ Motor performance calculation (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** Fan duty must be unchanged; a changed fan operating profile belongs in ITC-39 or ITC-41.

### ITC-13 - Product resource intensity per activity

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `efficient_ice_machine` - Efficient ice machine
- `high_efficiency_laundry_equipment` - High-efficiency laundry equipment
- `high_efficiency_commercial_dishwasher` - High-efficiency commercial dishwasher
- `high_efficiency_fryer` - High-efficiency fryer
- `high_efficiency_oven` - High-efficiency oven
- `high_efficiency_steamer` - High-efficiency steamer

**Primary Formula:**

`S = quantity × annual_activity × Σ_r ((intensity_existing,r - intensity_proposed,r) × p_r)`

**Supporting Formula(s):**

`annual_activity` uses the category dataset's tested activity unit, such as batches, cycles, racks, pounds of ice, or pounds of food.

**Information Tree:**

```text
Annual multi-resource reduction
├─ BR-SCOPE-QUANTITY
├─ Existing product category and model (User)
├─ Proposed product category and model (User)
├─ Annual activity in the certified test unit (User)
├─ Certified resource intensity by model and resource (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-CCMS-RATINGS and STD-ENERGY-STAR-PRODUCT-DATA.

**Notes:** The local product adapter must normalize each category to its own documented activity unit and must never compare unlike test methods.

### ITC-14 - Scout ECM fractional resource screen

**Status:** BLOCKED

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
Annual direct resource reduction
├─ BR-ANNUAL-BILL-RESOURCE
├─ Existing-condition selector (User)
├─ Proposed-option selector (User)
├─ Building type (Profile)
├─ Site climate zone from location (Profile)
├─ Exact Scout ECM reduction factor (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-SCOUT-ECM-SCREEN.

**Notes:** The category is BLOCKED pending human approval that each taxonomy type has an exact Scout definition and identical fallback behavior.
If any mapping fails, that retrofit must split into a project-engineering category rather than accept a keyword match.

### ITC-15 - No direct operational-resource calculation

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `submetering_energy_monitoring` - Submetering / energy monitoring system
- `resilience_backup_power_system` - Resilience / backup power system
- `ev_make_ready_electrical_upgrade` - EV make-ready electrical upgrade
- `air_filtration_system` - Air filtration system
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
└─ No linked physical resource-changing scope (User)
```

**Standards:** None.

**Notes:** Monitoring, studies, certification, compliance, enabling infrastructure, filtration, and resilience may enable later savings, but attributing another measure's savings here would double count or speculate.
Calculate a linked physical measure only in its own category.

### ITC-16 - Demand-response interval bill delta

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

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
├─ Controllable load and maximum shed kW (User)
├─ Event availability and duration (User)
├─ Rebound or recovery constraint (User)
└─ REopt baseline and proposed dispatch result (Standard)
```

**Standards:** STD-REOPT-LOCAL-DISPATCH.

**Notes:** Program payments are incentives or revenue and remain out of scope.
Only avoided utility bill charges are included.

### ITC-17 - PV interval generation and bill offset

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `rooftop_solar_pv` - Rooftop solar PV
- `ground_mounted_solar_pv` - Ground-mounted solar PV
- `solar_carport` - Solar carport

**Primary Formula:**

`S = Σ_t (onsite_offset_kWh_t × import_rate_t + export_kWh_t × export_credit_t)`

**Supporting Formula(s):**

`onsite_offset_t = min(PV_AC_kWh_t, baseline_import_kWh_t)`

`export_t = max(PV_AC_kWh_t - baseline_import_kWh_t, 0)`

**Information Tree:**

```text
Annual PV bill reduction
├─ Site coordinates (Profile)
├─ DC capacity and array configuration (User)
├─ PVWatts interval AC generation (Standard)
├─ BR-INTERVAL-LOAD-AND-TARIFF
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-PVWATTS-V8.

**Notes:** The three siting types share a category because siting is a record-level array configuration inside the same PVWatts tree.
Do not assume retail credit for exports.

### ITC-18 - Community-solar contract bill delta

**Status:** DRAFT

**Retrofits:**

- `community_solar_subscription` - Community solar subscription

**Primary Formula:**

`S = annual_bill_credits - annual_subscription_charges`

**Supporting Formula(s):**

`annual_bill_credits = Σ_period credited_kWh_period × contract_credit_rate_period`

**Information Tree:**

```text
Annual contract bill reduction
├─ Allocated or credited kWh by period (Bill)
├─ Credit rate by period (Bill)
├─ Subscription charge by period (Bill)
├─ Contract escalation or term rule (User)
└─ BR-ANNUAL-BILL-RESOURCE
```

**Standards:** None.

**Notes:** The executed contract and bill are authoritative.
Renewable attributes, emissions, incentives, and resale value are excluded.

### ITC-19 - Wind interval generation and bill offset

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `small_wind_turbine` - Small wind turbine

**Primary Formula:**

`S = Σ_t (onsite_offset_kWh_t × import_rate_t + export_kWh_t × export_credit_t)`

**Supporting Formula(s):**

`onsite_offset_t = min(wind_kWh_t, baseline_import_kWh_t)`

**Information Tree:**

```text
Annual wind bill reduction
├─ Site coordinates (Profile)
├─ Turbine model and hub height (User)
├─ Loss factor (User)
├─ WIND Toolkit resource and SAM generation (Standard)
├─ BR-INTERVAL-LOAD-AND-TARIFF
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-WIND-SAM.

**Notes:** Display High uncertainty until onsite wind-resource validation exists.

### ITC-20 - Fuel-cell electricity and fuel balance

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `fuel_cell_system` - Fuel cell system

**Primary Formula:**

`S = avoided_grid_kWh × p_electric - added_fuel × p_fuel`

**Supporting Formula(s):**

`annual_generation = capacity_kW × BR-ANNUAL-OPERATING-HOURS × load_fraction`

`added_fuel = annual_generation / electric_efficiency`

**Information Tree:**

```text
Annual resource value
├─ BR-SCOPE-QUANTITY
├─ Capacity and prime-mover type (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ Operating load fraction (User)
├─ Electric efficiency by technology and capacity (Standard)
├─ BR-ANNUAL-BILL-RESOURCE
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-EPA-CHP-PERFORMANCE.

**Notes:** Useful recovered heat is included only when the project is explicitly CHP and mapped to ITC-21.

### ITC-21 - CHP electric and useful-heat balance

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `combined_heat_and_power_system` - Combined heat and power system

**Primary Formula:**

`S = avoided_grid_kWh × p_electric + avoided_boiler_fuel × p_fuel - CHP_input_fuel × p_CHP_fuel`

**Supporting Formula(s):**

`useful_heat = min(generation × recoverable_heat_ratio, coincident_thermal_load)`

`avoided_boiler_fuel = useful_heat / existing_boiler_efficiency`

**Information Tree:**

```text
Annual CHP resource value
├─ BR-SCOPE-QUANTITY
├─ Prime mover and capacity (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ Coincident useful thermal load (User)
├─ Existing boiler efficiency (User)
├─ CHP performance by technology and capacity (Standard)
├─ BR-ANNUAL-BILL-RESOURCE
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-EPA-CHP-PERFORMANCE.

**Notes:** Cap electricity and useful heat at coincident site loads unless an explicit export rule exists.

### ITC-22 - Biomass or biogas resource balance

**Status:** DRAFT

**Retrofits:**

- `biomass_biogas_energy_system` - Biomass / biogas energy system

**Primary Formula:**

`S = avoided_purchased_resources - added_biomass_or_biogas_cost`

**Supporting Formula(s):**

Use the ITC-21 energy balance with confirmed annual fuel quantity and lower heating value.

**Information Tree:**

```text
Annual biomass or biogas resource value
├─ BR-SCOPE-QUANTITY
├─ Confirmed annual fuel availability and unit (User)
├─ Fuel lower heating value (User)
├─ Conversion technology and capacity (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ Performance by technology and fuel (Standard)
├─ BR-ANNUAL-BILL-RESOURCE
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-EPA-CHP-PERFORMANCE.

**Notes:** Status is DRAFT and uncertainty is High because the federal biomass catalog is partly outdated and project fuel quality dominates performance.
Do not monetize avoided disposal, renewable credits, or fuel that is not contractually available.

### ITC-23 - Battery interval dispatch

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

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
├─ Power and usable-energy capacity (User)
├─ Round-trip efficiency (User)
├─ Dispatch availability and reserve constraint (User)
└─ REopt baseline and proposed bill result (Standard)
```

**Standards:** STD-REOPT-LOCAL-DISPATCH.

**Notes:** Exclude resilience, outage, incentives, degradation economics, and capital costs.

### ITC-24 - Solar-plus-storage interval dispatch

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `solar_plus_storage_system` - Solar-plus-storage system

**Primary Formula:**

`S = baseline_annual_bill - proposed_annual_bill`

**Supporting Formula(s):**

PV generation follows ITC-17 and storage state follows ITC-23 inside one dispatch optimization.

**Information Tree:**

```text
Annual solar-plus-storage bill reduction
├─ Site coordinates (Profile)
├─ PV array configuration (User)
├─ Battery power, energy, and efficiency (User)
├─ PVWatts interval generation (Standard)
├─ BR-INTERVAL-LOAD-AND-TARIFF
└─ REopt composite dispatch result (Standard)
```

**Standards:** STD-PVWATTS-V8 and STD-REOPT-LOCAL-DISPATCH.

**Notes:** Do not add standalone ITC-17 and ITC-23 savings because dispatch interactions would be double counted.

### ITC-25 - Thermal-storage interval dispatch

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

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
├─ Interval HVAC thermal load or validated electric proxy (User)
├─ Thermal capacity and charge or discharge limits (User)
├─ Efficiency and standing loss (User)
└─ REopt baseline and proposed bill result (Standard)
```

**Standards:** STD-REOPT-LOCAL-DISPATCH.

**Notes:** Whole-building interval load alone is insufficient unless the controllable HVAC component is identified.

### ITC-26 - Microgrid composite interval dispatch

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

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
├─ Included generation technologies and capacities (User)
├─ Included storage power and energy (User)
├─ Fuel and useful-heat constraints (User)
├─ CHP performance where applicable (Standard)
└─ REopt composite dispatch result (Standard)
```

**Standards:** STD-EPA-CHP-PERFORMANCE and STD-REOPT-LOCAL-DISPATCH.

**Notes:** Reliability and resilience value are excluded even when the physical system can island.

### ITC-27 - Public EVSE added-load bill impact

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `ev_charger_installation` - EV charger installation
- `level_2_ev_charger_installation` - Level 2 EV charger installation
- `dc_fast_charger_installation` - DC fast charger installation

**Primary Formula:**

`S = -(delivered_kWh / active_efficiency + standby_kWh) × p_electric`

**Supporting Formula(s):**

`delivered_kWh = sessions_per_year × mean_delivered_kWh_per_session`

`standby_kWh = standby_kW × noncharging_hours`

**Information Tree:**

```text
Annual added electric cost
├─ BR-SCOPE-QUANTITY
├─ Sessions per year (User)
├─ Mean delivered kWh per session (User)
├─ Charger model (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ Certified active efficiency and standby power (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-ENERGY-STAR-PRODUCT-DATA.

**Notes:** A charger creates load rather than operational savings unless paired with a separately modeled avoided transportation fuel or managed-charging measure.

### ITC-28 - Fleet charging added-load bill impact

**Status:** DRAFT

**Retrofits:**

- `fleet_charging_infrastructure` - Fleet charging infrastructure

**Primary Formula:**

`S = -(annual_vehicle_kWh / charging_efficiency + standby_kWh) × p_electric`

**Supporting Formula(s):**

`annual_vehicle_kWh = fleet_annual_miles × vehicle_kWh_per_mile`

**Information Tree:**

```text
Annual fleet charging added cost
├─ BR-SCOPE-QUANTITY
├─ Annual fleet miles and depot allocation (User)
├─ Selected vehicle model or measured kWh per mile (User)
├─ Charger model and port count (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ Vehicle and charger efficiency (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-FUELECONOMY-VEHICLES and STD-ENERGY-STAR-PRODUCT-DATA.

**Notes:** Medium- and heavy-duty vehicles outside FuelEconomy.gov require a measured or vendor-confirmed efficiency and remain DRAFT.

### ITC-29 - Light-duty vehicle resource switching

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `electric_vehicle_purchase` - Electric vehicle purchase

**Primary Formula:**

`S = avoided_fuel_units × p_fuel - added_kWh × p_electric`

**Supporting Formula(s):**

`avoided_gallons = annual_miles / existing_combined_mpg`

`added_kWh = annual_miles × proposed_combE / 100 / charging_efficiency`

**Information Tree:**

```text
Annual vehicle resource switch
├─ BR-SCOPE-QUANTITY
├─ Annual miles for replaced vehicle (User)
├─ Existing vehicle selection (User)
├─ Proposed electric vehicle selection (User)
├─ Vehicle efficiency records (Standard)
├─ BR-ANNUAL-BILL-RESOURCE
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-FUELECONOMY-VEHICLES.

**Notes:** Exclude purchase price, maintenance, incentives, and emissions.

### ITC-30 - Forklift resource switching

**Status:** BLOCKED

**Retrofits:**

- `electric_forklift_material_handling` - Electric forklift / material handling equipment

**Primary Formula:**

`S = quantity × annual_hours × (existing_fuel_per_hour × p_fuel - proposed_kWh_per_hour × p_electric)`

**Supporting Formula(s):**

No additional formula is required.

**Information Tree:**

```text
Annual forklift resource switch
├─ BR-SCOPE-QUANTITY
├─ BR-ANNUAL-OPERATING-HOURS
├─ Existing fuel use per operating hour (User)
├─ Proposed charging kWh per operating hour (User)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** None.

**Notes:** BLOCKED because no authoritative public model-level cross-fuel performance dataset was validated.
The formula is usable only with measured or contractually specified project values.

### ITC-31 - Managed fleet-charging interval shift

**Status:** DRAFT

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
├─ Vehicle arrival and departure schedule (User)
├─ Required energy by departure (User)
├─ Charger and site power limits (User)
├─ Managed and unmanaged charging templates (User)
└─ REopt interval dispatch result (Standard)
```

**Standards:** STD-REOPT-LOCAL-DISPATCH.

**Notes:** Status remains DRAFT until the fleet availability schema and unmanaged counterfactual are product-approved.

### ITC-32 - Flow-fixture water and hot-water reduction

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `low_flow_fixture_retrofit` - Low-flow fixture retrofit

**Primary Formula:**

`S = avoided_water × p_water_sewer + avoided_hot_water_input × p_heating_resource`

**Supporting Formula(s):**

`avoided_water = quantity × uses_per_year × duration_minutes × (gpm_existing - gpm_proposed)`

`avoided_hot_water_input = avoided_water × hot_fraction × thermal_energy_per_gallon / heater_efficiency`

**Information Tree:**

```text
Annual water and heating-resource reduction
├─ BR-SCOPE-QUANTITY
├─ Uses per year and duration per use (User)
├─ Hot-water fraction (User)
├─ Existing and proposed fixture type or rating (User)
├─ Rated flow values (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-WATERSENSE-FIXTURES.

**Notes:** Omit hot-water value for cold-only fixtures rather than assuming a fraction.

### ITC-33 - Flush-fixture water reduction

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `high_efficiency_toilet_urinal` - High-efficiency toilet / urinal replacement

**Primary Formula:**

`S = quantity × flushes_per_year × (gpf_existing - gpf_proposed) × p_water_sewer`

**Supporting Formula(s):**

No additional formula is required.

**Information Tree:**

```text
Annual water reduction
├─ BR-SCOPE-QUANTITY
├─ Flushes per fixture per year (User)
├─ Existing and proposed fixture type or rating (User)
├─ Rated gallons per flush (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-WATERSENSE-FIXTURES.

**Notes:** Toilets and urinals share the tree because fixture type selects a different record inside the same rating Standard.

### ITC-34 - Landscape water-budget reduction

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `smart_irrigation_controller` - Smart irrigation controller
- `efficient_irrigation_retrofit` - Drip irrigation / efficient irrigation retrofit

**Primary Formula:**

`S = (baseline_landscape_gallons - proposed_landscape_gallons) × p_water_sewer`

**Supporting Formula(s):**

Use the WaterSense Water Budget Tool equations with constant climate and landscape area across cases.

**Information Tree:**

```text
Annual irrigation water reduction
├─ Site ZIP code (Profile)
├─ Landscape area by hydrozone (User)
├─ Existing irrigation method or controller (User)
├─ Proposed irrigation method or controller (User)
├─ Climate data and Water Budget equations (Standard)
├─ BR-ANNUAL-BILL-RESOURCE
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-WATERSENSE-LANDSCAPE.

**Notes:** The two retrofits share a category because the existing and proposed method are record selections in the same water-budget tree.

### ITC-35 - Measured leak avoidance

**Status:** DRAFT

**Retrofits:**

- `leak_detection_system` - Leak detection system

**Primary Formula:**

`S = measured_leak_gpm × confirmed_leak_minutes_per_year × p_water_sewer`

**Supporting Formula(s):**

No additional formula is required.

**Information Tree:**

```text
Annual measured leak water reduction
├─ Measured leak flow (User)
├─ Confirmed leak start and repair dates (User)
├─ WaterSense leak calculation method (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-WATERSENSE-CI-OPERATIONS.

**Notes:** A detection system alone has zero attributable direct savings until it identifies and causes repair of a measured leak.

### ITC-36 - Cooling-tower water and fan optimization

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `cooling_tower_controls_optimization` - Cooling tower controls / optimization

**Primary Formula:**

`S = avoided_makeup_gallons × p_water_sewer + avoided_fan_kWh × p_electric`

**Supporting Formula(s):**

`makeup = evaporation + blowdown + drift`

`blowdown = evaporation / (cycles_of_concentration - 1)` when drift is handled separately.

**Information Tree:**

```text
Annual cooling-tower resource reduction
├─ BR-ANNUAL-BILL-RESOURCE
├─ Existing and proposed cycles of concentration (User)
├─ Annual evaporation or heat rejection (User)
├─ Existing and proposed fan control profile (User)
├─ WaterSense water balance (Standard)
├─ MEASUR fan-energy result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-WATERSENSE-CI-OPERATIONS and STD-DOE-MEASUR.

**Notes:** Compute water and fan components independently and omit either component when its minimum inputs are absent.

### ITC-37 - Demand-controlled kitchen ventilation

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `demand_controlled_kitchen_ventilation` - Demand-controlled kitchen ventilation

**Primary Formula:**

`S = avoided_fan_kWh × p_electric + Σ_r (avoided_makeup_air_R_r × p_r)`

**Supporting Formula(s):**

`fan_kW_fraction = airflow_fraction³` for applicable variable-speed fan systems.

**Information Tree:**

```text
Annual kitchen ventilation resource reduction
├─ BR-SCOPE-QUANTITY
├─ Existing fan power and airflow (User)
├─ Existing and proposed airflow schedule (User)
├─ Makeup-air heating and cooling system (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ MEASUR fan and thermal result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** The cube law applies only within the validated system range and must not replace a measured fan curve when available.

### ITC-38 - Motor input-power efficiency replacement

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `high_efficiency_motor_replacement` - High-efficiency motor replacement

**Primary Formula:**

`S = quantity × shaft_kW × load_fraction × (1 / η_existing - 1 / η_proposed) × annual_hours × p_electric`

**Supporting Formula(s):**

No additional formula is required.

**Information Tree:**

```text
Annual motor electricity reduction
├─ BR-SCOPE-QUANTITY
├─ Motor rated shaft power and speed (User)
├─ Operating load fraction (User)
├─ Existing and proposed motor class (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ MEASUR motor efficiencies (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** Load fraction is retained because nameplate power alone materially overstates many motor loads.

### ITC-39 - Variable-speed load-bin reduction

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `variable_frequency_drive_retrofit` - Variable frequency drive retrofit
- `pump_fan_controls_retrofit` - Pump/fan controls retrofit

**Primary Formula:**

`S = quantity × Σ_bins hours_i × (existing_kW_i - proposed_kW_i) × p_electric`

**Supporting Formula(s):**

For a validated centrifugal system, `proposed_power_fraction_i = speed_fraction_i³ / drive_efficiency_i`.

**Information Tree:**

```text
Annual variable-speed electricity reduction
├─ BR-SCOPE-QUANTITY
├─ Existing full-load input kW (User)
├─ Annual hours by load or speed bin (User)
├─ Proposed minimum speed and control rule (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ MEASUR load-bin result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** These retrofits share the tree because the control type changes the proposed record inside one load-bin calculation.

### ITC-40 - Pump wire-to-water replacement

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `efficient_pump_replacement` - Efficient pump replacement

**Primary Formula:**

`S = quantity × (existing_input_kW - proposed_input_kW) × annual_hours × p_electric`

**Supporting Formula(s):**

`input_kW = hydraulic_power_kW / (pump_efficiency × motor_efficiency)`

**Information Tree:**

```text
Annual pump electricity reduction
├─ BR-SCOPE-QUANTITY
├─ Flow and total dynamic head (User)
├─ Existing pump and motor data (User)
├─ Proposed pump and motor data (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ MEASUR pump assessment result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** Flow and head are high-sensitivity project facts and cannot be replaced with a generic pump efficiency.

### ITC-41 - Fan or ventilation system replacement

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `efficient_fan_blower_replacement` - Efficient fan/blower replacement
- `efficient_ventilation_system` - Efficient ventilation system

**Primary Formula:**

`S = quantity × (existing_input_kW - proposed_input_kW) × annual_hours × p_electric`

**Supporting Formula(s):**

`input_kW = air_power_kW / (fan_efficiency × motor_efficiency)`

**Information Tree:**

```text
Annual fan-system electricity reduction
├─ BR-SCOPE-QUANTITY
├─ Airflow and pressure rise (User)
├─ Existing fan and motor data (User)
├─ Proposed fan and motor data (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ MEASUR fan assessment result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** The two taxonomy types share an identical fan-system boundary and calculation tree.

### ITC-42 - Air-compressor specific-power replacement

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `efficient_air_compressor` - Efficient air compressor

**Primary Formula:**

`S = quantity × annual_output_flow × (specific_power_existing - specific_power_proposed) × p_electric`

**Supporting Formula(s):**

`annual_output_flow = mean_flow × annual_hours` with consistent flow units.

**Information Tree:**

```text
Annual compressor electricity reduction
├─ BR-SCOPE-QUANTITY
├─ Required pressure and mean flow (User)
├─ Existing and proposed compressor data (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ MEASUR compressed-air assessment result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** Preserve the delivered pressure and air requirement across cases.

### ITC-43 - Compressed-air leak loss

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `compressed_air_leak_repair` - Compressed air leak repair

**Primary Formula:**

`S = quantity × leak_flow × compressor_specific_power × annual_pressurized_hours × p_electric`

**Supporting Formula(s):**

Use the selected MEASUR leak-measurement method to resolve `leak_flow`.

**Information Tree:**

```text
Annual compressed-air leak electricity reduction
├─ BR-SCOPE-QUANTITY
├─ Measured leak method and observations (User)
├─ System pressure (User)
├─ Compressor specific power (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ MEASUR leak-flow result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** A generic leak percentage is not a substitute for a measured leak method.

### ITC-44 - Compressed-air control profile reduction

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `compressed_air_controls` - Compressed air controls

**Primary Formula:**

`S = quantity × Σ_bins hours_i × (existing_kW_i - proposed_kW_i) × p_electric`

**Supporting Formula(s):**

MEASUR resolves input kW from compressor type, control mode, pressure, and load fraction.

**Information Tree:**

```text
Annual compressed-air control electricity reduction
├─ BR-SCOPE-QUANTITY
├─ Compressor type and rated data (User)
├─ Existing and proposed control modes (User)
├─ Annual load profile by bin (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ MEASUR control-profile result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** Do not merge with leak repair because the inputs, physics, and missing-data behavior differ.

### ITC-45 - Waste-heat useful-energy recovery

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `waste_heat_recovery` - Waste heat recovery

**Primary Formula:**

`S = useful_recovered_heat / displaced_system_efficiency × p_displaced_resource - added_auxiliary_kWh × p_electric`

**Supporting Formula(s):**

`useful_recovered_heat = min(available_waste_heat × recovery_efficiency, coincident_useful_heat_load)`

**Information Tree:**

```text
Annual waste-heat resource value
├─ Waste stream flow, temperature, and schedule (User)
├─ Coincident useful-heat load (User)
├─ Recovery equipment efficiency and auxiliary power (User)
├─ BR-ANNUAL-BILL-RESOURCE
├─ MEASUR process-heat result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** Cap recovered heat at coincident useful demand and exclude revenue from exported heat or power.

### ITC-46 - Industrial process electrification balance

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `industrial_heat_pump` - Industrial heat pump
- `process_electrification_equipment` - Process electrification equipment

**Primary Formula:**

`S = current_fuel_input × p_fuel - proposed_electric_input × p_electric`

**Supporting Formula(s):**

`useful_process_heat = current_fuel_input × current_efficiency`

`proposed_electric_input = useful_process_heat / proposed_COP_or_efficiency`

**Information Tree:**

```text
Annual process resource switch
├─ BR-ANNUAL-BILL-RESOURCE
├─ Process share of billed fuel (User)
├─ Required process temperature and useful load (User)
├─ Existing process efficiency (User)
├─ Proposed technology and COP or efficiency (User)
├─ MEASUR process-heating balance (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** The two retrofit types share the tree because the proposed technology selects the applicable efficiency or COP record inside the same useful-heat balance.

### ITC-47 - Steam-trap loss reduction

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Retrofits:**

- `steam_trap_replacement` - Steam trap replacement

**Primary Formula:**

`S = quantity × avoided_steam_loss × boiler_fuel_per_steam_unit × p_fuel`

**Supporting Formula(s):**

`boiler_fuel_per_steam_unit = steam_enthalpy_rise / boiler_efficiency`

**Information Tree:**

```text
Annual steam-trap fuel reduction
├─ BR-SCOPE-QUANTITY
├─ Failed-trap condition or leak class (User)
├─ Steam pressure and condensate-return condition (User)
├─ BR-ANNUAL-OPERATING-HOURS
├─ Boiler efficiency (User)
├─ MEASUR steam-loss result (Standard)
└─ BR-AVOIDABLE-RESOURCE-RATE
```

**Standards:** STD-DOE-MEASUR.

**Notes:** Use tested failed-trap condition, not the total installed trap count.

## Coverage contract

The validator independently imports the canonical taxonomy and parses the category sections.
The required result is 47 categories, 92 unique retrofit mappings, zero missing IDs, and zero duplicate IDs.
It also checks category field order, allowed statuses, terminal source labels, canonical branch and Standard references, registry usage declarations, and direct-source URL syntax.

## Change procedure

1. Change the taxonomy or category tree only with an explicit identity review.
2. Split a category whenever formula, inputs, source labels, Standard, bill treatment, missing behavior, automation, or platform behavior diverges.
3. Merge categories only when the complete trees are identical and differences are record selections inside one Standard.
4. Update branch and Standard usage lists in the same commit.
5. Run `node scripts/validate-operational-savings-information-trees.mjs` and inspect the full diff.
6. Keep all statuses below human finalization.
