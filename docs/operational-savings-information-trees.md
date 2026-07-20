# Operational Savings Information Trees

> Living specification for RetroFi's minimum-information operational-savings engine.
>
> **Canonical scope:** 41 information categories covering all 92 retrofit types in `apps/api/server/matching/retrofitTaxonomy.mjs`.

## Purpose

This file is the working source of truth for the information trees used to calculate operational savings. It is designed to be updated category by category as the trees are refined.

The minimum-information rule is:

> Two retrofits share an information category only when they use the same formula inputs, the same input types, and the same sub-information needed to resolve every input.

## Status rules

- `DRAFT`: initial structure; not yet reviewed branch by branch.
- `IN REVIEW`: actively being refined.
- `FINALIZED`: the branch or category has been explicitly accepted.
- A category is finalized only when its formula, members, and every referenced branch are finalized.
- A shared branch is defined once in the **Shared Branch Registry**. Categories reference the branch ID instead of copying independent logic.
- When a shared branch becomes `FINALIZED`, every category that references the same branch ID inherits `FINALIZED` automatically.
- Similar-looking branches are not merged unless their formula, source path, field type, and platform behavior are truly identical.

## Input types

- **User Required / Confirmed**: a project-specific value the user must answer or confirm.
- **Directly Obtained**: definitively extracted or calculated from profile, bills, tariffs, or deterministic data.
- **Estimated**: automatically estimated from known information and standards, shown as editable.

## Current review focus

- `ITC-01` is currently **IN REVIEW**, beginning with LED lighting.
- `BR-ELECTRICITY-RATE` is **FINALIZED** and is inherited wherever the simple kWh-rate branch is truly identical.
- `BR-SCOPE-QUANTITY`, `BR-EXISTING-INPUT-POWER`, `BR-PROPOSED-INPUT-POWER`, and `BR-ANNUAL-OPERATING-HOURS` are **IN REVIEW**.

## Shared Branch Registry

The canonical branch registry is the mechanism that keeps identical logic synchronized. Every category tree below references branch IDs. When a branch is finalized, all categories referencing that exact ID inherit the finalized branch automatically.

### Finalized and active shared branches

#### `BR-ELECTRICITY-RATE` — Electricity Rate

**Status:** 🟢 FINALIZED  
**Type:** Directly Obtained

```text
Electricity Rate (Directly Obtained)
└── Electric Bill
    ├── Electricity Usage (kWh)
    └── Variable Charges
```

**Rule:** Electricity rate = applicable variable electricity charges ÷ corresponding kWh. Unchanged fixed charges are excluded.

**Inherited by:** `ITC-01`, `ITC-02`, `ITC-03`, `ITC-04`, `ITC-19`, `ITC-20`, `ITC-21`, `ITC-31`, `ITC-37`, `ITC-38`.

#### `BR-SCOPE-QUANTITY` — Scope Quantity

**Status:** 🟠 IN REVIEW  
**Type:** User Required / Confirmed

```text
Scope Quantity (User Required / Confirmed)
└── User-confirmed project count
```

**Rule:** RetroFi may prefill an estimate, but the user confirms the actual project quantity.

**Used by:** `ITC-01`, `ITC-02`, `ITC-19`.

#### `BR-EXISTING-INPUT-POWER` — Existing Input Power per Unit

**Status:** 🟠 IN REVIEW  
**Type:** Estimated

```text
Existing Input Power (Estimated)
├── Equipment Type (Estimated)
│   ├── Site Type (Directly Obtained)
│   └── Baseline Standard
└── Standard Input Power
```

**Rule:** Use an editable technology-class estimate unless actual nameplate/model data replaces it.

**Used by:** `ITC-01`, `ITC-02`.

#### `BR-PROPOSED-INPUT-POWER` — Proposed Input Power per Unit

**Status:** 🟠 IN REVIEW  
**Type:** Estimated

```text
Proposed Input Power (Estimated)
├── Existing Equipment Class
├── Equivalent Service Output
└── Qualified Product Standard
```

**Rule:** Use an editable comparable-product estimate until an exact product specification is available.

**Used by:** `ITC-01`, `ITC-02`.

#### `BR-ANNUAL-OPERATING-HOURS` — Annual Operating Hours

**Status:** 🟠 IN REVIEW  
**Type:** Estimated

```text
Annual Operating Hours (Estimated)
├── Site Type (Directly Obtained)
├── Business Hours (Estimated)
│   ├── Website
│   └── Standard Schedule
├── Operating Days
└── Usage Adjustment
```

**Rule:** Use an editable site-type schedule estimate; replace it with measured or user-confirmed hours when available.

**Used by:** `ITC-01`, `ITC-38`, `ITC-39`, `ITC-40`.

### Draft branch rule

All other branch IDs below are currently `DRAFT`. Their top-level place in each category tree is established, but their subbranches, field types, estimation methods, and finalization status will be refined as we work through the categories. A new branch ID must be created whenever the information path is not truly identical.

## Category Index

| Category | Name | Status | Retrofit count |
|---|---|---|---:|
| `ITC-01` | Direct electric power × operating time | 🟠 IN REVIEW | 7 |
| `ITC-02` | Exterior-lighting power × darkness/control hours | 🟡 DRAFT | 1 |
| `ITC-03` | Electric end-use baseline × savings factor | 🟡 DRAFT | 7 |
| `ITC-04` | Variable-speed load-bin model | 🟡 DRAFT | 1 |
| `ITC-05` | Fuel-fired space-heating efficiency | 🟡 DRAFT | 2 |
| `ITC-06` | Fuel-only boiler/burner control savings | 🟡 DRAFT | 1 |
| `ITC-07` | Gas water-heating efficiency | 🟡 DRAFT | 1 |
| `ITC-08` | Space-conditioning equipment resource balance | 🟡 DRAFT | 3 |
| `ITC-09` | Heat-pump water-heating resource switching | 🟡 DRAFT | 1 |
| `ITC-10` | Process/cooking electrification | 🟡 DRAFT | 3 |
| `ITC-11` | Multi-resource operational controls | 🟡 DRAFT | 6 |
| `ITC-12` | Energy-recovery ventilation | 🟡 DRAFT | 1 |
| `ITC-13` | Duct leakage and duct-conduction reduction | 🟡 DRAFT | 1 |
| `ITC-14` | Opaque-envelope insulation | 🟡 DRAFT | 1 |
| `ITC-15` | Exterior-door performance | 🟡 DRAFT | 1 |
| `ITC-16` | Building air-leakage reduction | 🟡 DRAFT | 1 |
| `ITC-17` | Fenestration heat-transfer and solar-gain reduction | 🟡 DRAFT | 2 |
| `ITC-18` | Roof solar-reflectance reduction | 🟡 DRAFT | 1 |
| `ITC-19` | Annual equipment-energy rating difference | 🟡 DRAFT | 2 |
| `ITC-20` | Solar-PV generation and bill offset | 🟡 DRAFT | 3 |
| `ITC-21` | Wind generation and bill offset | 🟡 DRAFT | 1 |
| `ITC-22` | Contracted community-solar bill impact | 🟡 DRAFT | 1 |
| `ITC-23` | Onsite fuel generation/cogeneration balance | 🟡 DRAFT | 3 |
| `ITC-24` | Solar-thermal water-heating displacement | 🟡 DRAFT | 1 |
| `ITC-25` | Battery-storage interval dispatch | 🟡 DRAFT | 1 |
| `ITC-26` | Thermal-storage interval dispatch | 🟡 DRAFT | 1 |
| `ITC-27` | Demand-response load reduction | 🟡 DRAFT | 1 |
| `ITC-28` | Managed EV-charging load shifting | 🟡 DRAFT | 1 |
| `ITC-29` | Composite distributed-energy simulation | 🟡 DRAFT | 2 |
| `ITC-30` | EV-charging added-load bill impact | 🟡 DRAFT | 4 |
| `ITC-31` | Vehicle/material-handling resource switching | 🟡 DRAFT | 2 |
| `ITC-32` | Flow-based water fixtures | 🟡 DRAFT | 1 |
| `ITC-33` | Flush-based water fixtures | 🟡 DRAFT | 1 |
| `ITC-34` | Irrigation water-budget reduction | 🟡 DRAFT | 2 |
| `ITC-35` | Known-leak water avoidance | 🟡 DRAFT | 1 |
| `ITC-36` | Multi-resource equipment per activity | 🟡 DRAFT | 6 |
| `ITC-37` | Cooling-tower water balance | 🟡 DRAFT | 1 |
| `ITC-38` | Compressed-air leak loss | 🟡 DRAFT | 1 |
| `ITC-39` | Waste-heat recovery | 🟡 DRAFT | 1 |
| `ITC-40` | Steam-trap loss reduction | 🟡 DRAFT | 1 |
| `ITC-41` | No direct operational-resource calculation | 🟡 DRAFT | 13 |

## Information Category Trees

### `ITC-01` — Direct electric power × operating time

**Status:** 🟠 IN REVIEW

**Retrofits:**
- `led_lighting_retrofit` — LED lighting retrofit
- `refrigeration_ec_motor_retrofit` — Refrigeration EC motor retrofit
- `high_efficiency_motor_replacement` — High-efficiency motor replacement
- `efficient_pump_replacement` — Efficient pump replacement
- `efficient_fan_blower_replacement` — Efficient fan/blower replacement
- `efficient_air_compressor` — Efficient air compressor
- `efficient_ventilation_system` — Efficient ventilation system

**Core formula:**

```text
Annual savings
= quantity
× (existing kW/unit − proposed kW/unit)
× annual operating hours
× electricity rate
```

**Information tree:**

```text
Annual Dollar Savings
│
├── Annual kWh Saved
│   ├── Scope Quantity [BR-SCOPE-QUANTITY] — IN REVIEW
│   ├── Existing Input Power [BR-EXISTING-INPUT-POWER] — IN REVIEW
│   ├── Proposed Input Power [BR-PROPOSED-INPUT-POWER] — IN REVIEW
│   └── Annual Operating Hours [BR-ANNUAL-OPERATING-HOURS] — IN REVIEW
│
└── Electricity Rate [BR-ELECTRICITY-RATE] — FINALIZED (inherited)
```

---

### `ITC-02` — Exterior-lighting power × darkness/control hours

**Status:** 🟡 DRAFT

**Retrofits:**
- `exterior_site_lighting_retrofit` — Exterior/site lighting retrofit

**Core formula:**

```text
Annual savings
= quantity
× (existing kW/unit − proposed kW/unit)
× annual exterior-lighting hours
× electricity rate
```

**Information tree:**

```text
Annual Dollar Savings
├── Scope Quantity [BR-SCOPE-QUANTITY] — IN REVIEW
├── Existing Input Power [BR-EXISTING-INPUT-POWER] — IN REVIEW
├── Proposed Input Power [BR-PROPOSED-INPUT-POWER] — IN REVIEW
├── Exterior-Lighting Hours [BR-EXTERIOR-LIGHTING-HOURS] — DRAFT
└── Electricity Rate [BR-ELECTRICITY-RATE] — FINALIZED (inherited)
```

---

### `ITC-03` — Electric end-use baseline × savings factor

**Status:** 🟡 DRAFT

**Retrofits:**
- `lighting_controls_retrofit` — Lighting controls retrofit
- `refrigeration_controls_retrofit` — Refrigeration controls retrofit
- `anti_sweat_heater_controls` — Anti-sweat heater controls
- `door_gasket_strip_curtain_night_cover` — Door gasket / strip curtain / night cover retrofit
- `energy_management_system` — Energy management system
- `pump_fan_controls_retrofit` — Pump/fan controls retrofit
- `compressed_air_controls` — Compressed air controls

**Core formula:**

```text
Annual savings
= affected baseline kWh
× scope coverage
× validated savings fraction
× electricity rate
```

**Information tree:**

```text
Annual Dollar Savings
├── Affected Electric End Use [BR-AFFECTED-ELECTRIC-END-USE] — DRAFT
├── Scope Coverage [BR-SCOPE-COVERAGE] — DRAFT
├── Validated Savings Fraction [BR-VALIDATED-SAVINGS-FRACTION] — DRAFT
└── Electricity Rate [BR-ELECTRICITY-RATE] — FINALIZED (inherited)
```

---

### `ITC-04` — Variable-speed load-bin model

**Status:** 🟡 DRAFT

**Retrofits:**
- `variable_frequency_drive_retrofit` — Variable frequency drive retrofit

**Core formula:**

```text
Annual savings
= Σ[(baseline kW at bin − proposed kW at bin) × hours in bin]
× electricity rate
```

**Information tree:**

```text
Annual Dollar Savings
├── Equipment Capacity [BR-EQUIPMENT-CAPACITY] — DRAFT
├── Load/Speed Bins [BR-LOAD-SPEED-BINS] — DRAFT
├── Baseline Power by Bin [BR-BASELINE-POWER-BY-BIN] — DRAFT
├── Proposed Power by Bin [BR-PROPOSED-POWER-BY-BIN] — DRAFT
└── Electricity Rate [BR-ELECTRICITY-RATE] — FINALIZED (inherited)
```

---

### `ITC-05` — Fuel-fired space-heating efficiency

**Status:** 🟡 DRAFT

**Retrofits:**
- `high_efficiency_furnace_retrofit` — High-efficiency furnace retrofit
- `high_efficiency_boiler_retrofit` — High-efficiency boiler retrofit

**Core formula:**

```text
Annual savings
= useful heating load
× (1 ÷ old efficiency − 1 ÷ new efficiency)
× fuel rate
```

**Information tree:**

```text
Annual Dollar Savings
├── Annual Useful Heating Load [BR-ANNUAL-USEFUL-HEATING-LOAD] — DRAFT
├── Baseline Heating Efficiency [BR-BASELINE-HEATING-EFFICIENCY] — DRAFT
├── Proposed Heating Efficiency [BR-PROPOSED-HEATING-EFFICIENCY] — DRAFT
└── Fuel Rate [BR-FUEL-RATE] — DRAFT
```

---

### `ITC-06` — Fuel-only boiler/burner control savings

**Status:** 🟡 DRAFT

**Retrofits:**
- `boiler_controls_burner_retrofit` — Boiler controls / burner retrofit

**Core formula:**

```text
Annual savings
= affected baseline fuel use
× scope coverage
× validated fuel savings fraction
× fuel rate
```

**Information tree:**

```text
Annual Dollar Savings
├── Affected Fuel End Use [BR-AFFECTED-FUEL-END-USE] — DRAFT
├── Scope Coverage [BR-SCOPE-COVERAGE] — DRAFT
├── Validated Fuel Savings Fraction [BR-VALIDATED-FUEL-SAVINGS-FRACTION] — DRAFT
└── Fuel Rate [BR-FUEL-RATE] — DRAFT
```

---

### `ITC-07` — Gas water-heating efficiency

**Status:** 🟡 DRAFT

**Retrofits:**
- `high_efficiency_gas_water_heater` — High-efficiency gas water heater

**Core formula:**

```text
Annual savings
= useful hot-water load
× (1 ÷ old efficiency − 1 ÷ new efficiency)
× gas rate
```

**Information tree:**

```text
Annual Dollar Savings
├── Annual Useful Hot-Water Load [BR-ANNUAL-USEFUL-HOT-WATER-LOAD] — DRAFT
├── Baseline Water-Heating Efficiency [BR-BASELINE-WATER-HEATING-EFFICIENCY] — DRAFT
├── Proposed Water-Heating Efficiency [BR-PROPOSED-WATER-HEATING-EFFICIENCY] — DRAFT
└── Gas Rate [BR-GAS-RATE] — DRAFT
```

---

### `ITC-08` — Space-conditioning equipment resource balance

**Status:** 🟡 DRAFT

**Retrofits:**
- `high_efficiency_hvac_replacement` — High-efficiency HVAC replacement
- `heat_pump_hvac_retrofit` — Heat pump HVAC retrofit
- `ground_source_geothermal_heat_pump` — Ground-source / geothermal heat pump

**Core formula:**

```text
Annual savings
= baseline heating/cooling resource cost
− proposed heating/cooling resource cost
```

**Information tree:**

```text
Annual Dollar Savings
├── Annual Useful Heating Load [BR-ANNUAL-USEFUL-HEATING-LOAD] — DRAFT
├── Annual Useful Cooling Load [BR-ANNUAL-USEFUL-COOLING-LOAD] — DRAFT
├── Baseline HVAC Performance [BR-BASELINE-HVAC-PERFORMANCE] — DRAFT
├── Proposed HVAC Performance [BR-PROPOSED-HVAC-PERFORMANCE] — DRAFT
└── HVAC Resource Rates [BR-HVAC-RESOURCE-RATES] — DRAFT
```

---

### `ITC-09` — Heat-pump water-heating resource switching

**Status:** 🟡 DRAFT

**Retrofits:**
- `heat_pump_water_heater` — Heat pump water heater

**Core formula:**

```text
Annual savings
= baseline water-heating resource cost
− proposed heat-pump electricity cost
```

**Information tree:**

```text
Annual Dollar Savings
├── Annual Useful Hot-Water Load [BR-ANNUAL-USEFUL-HOT-WATER-LOAD] — DRAFT
├── Baseline Water-Heating Performance [BR-BASELINE-WATER-HEATING-PERFORMANCE] — DRAFT
├── Proposed HPWH Performance [BR-PROPOSED-HPWH-PERFORMANCE] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-10` — Process/cooking electrification

**Status:** 🟡 DRAFT

**Retrofits:**
- `industrial_heat_pump` — Industrial heat pump
- `process_electrification_equipment` — Process electrification equipment
- `induction_cooking_equipment` — Induction cooking equipment

**Core formula:**

```text
Annual savings
= annual service output
× (baseline resource intensity × old-resource rate
− proposed electricity intensity × electricity rate)
```

**Information tree:**

```text
Annual Dollar Savings
├── Annual Service Output [BR-ANNUAL-SERVICE-OUTPUT] — DRAFT
├── Baseline Resource Intensity [BR-BASELINE-RESOURCE-INTENSITY] — DRAFT
├── Proposed Electricity Intensity [BR-PROPOSED-ELECTRICITY-INTENSITY] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-11` — Multi-resource operational controls

**Status:** 🟡 DRAFT

**Retrofits:**
- `smart_thermostat_zoning_retrofit` — Smart thermostat / zoning retrofit
- `hvac_controls_retrofit` — HVAC controls retrofit
- `building_automation_system` — Building automation system
- `water_heating_controls_recirculation` — Water-heating controls / recirculation controls
- `demand_controlled_ventilation` — Demand-controlled ventilation
- `demand_controlled_kitchen_ventilation` — Demand-controlled kitchen ventilation

**Core formula:**

```text
Annual savings
= Σ(affected resource baseline
× scope coverage
× validated reduction fraction
× applicable rate)
```

**Information tree:**

```text
Annual Dollar Savings
├── Defined Control Change [BR-DEFINED-CONTROL-CHANGE] — DRAFT
├── Affected Resource End Uses [BR-AFFECTED-RESOURCE-END-USES] — DRAFT
├── Scope Coverage [BR-SCOPE-COVERAGE] — DRAFT
├── Validated Savings Fractions [BR-VALIDATED-SAVINGS-FRACTIONS] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-12` — Energy-recovery ventilation

**Status:** 🟡 DRAFT

**Retrofits:**
- `energy_recovery_ventilation_retrofit` — Energy recovery ventilation retrofit

**Core formula:**

```text
Annual savings
= avoided heating/cooling energy cost
− added fan electricity cost
```

**Information tree:**

```text
Annual Dollar Savings
├── Outdoor-Air Flow [BR-OUTDOOR-AIR-FLOW] — DRAFT
├── Ventilation Schedule [BR-VENTILATION-SCHEDULE] — DRAFT
├── Weather and Setpoints [BR-WEATHER-AND-SETPOINTS] — DRAFT
├── Recovery Effectiveness [BR-RECOVERY-EFFECTIVENESS] — DRAFT
├── Added Fan Power [BR-ADDED-FAN-POWER] — DRAFT
├── HVAC Performance [BR-HVAC-PERFORMANCE] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-13` — Duct leakage and duct-conduction reduction

**Status:** 🟡 DRAFT

**Retrofits:**
- `duct_sealing_and_insulation` — Duct sealing and duct insulation

**Core formula:**

```text
Annual savings
= baseline delivered-load losses
− post-retrofit delivered-load losses,
valued by HVAC resource rates
```

**Information tree:**

```text
Annual Dollar Savings
├── Duct System Scope [BR-DUCT-SYSTEM-SCOPE] — DRAFT
├── Baseline Duct Loss [BR-BASELINE-DUCT-LOSS] — DRAFT
├── Proposed Duct Loss [BR-PROPOSED-DUCT-LOSS] — DRAFT
├── Annual HVAC Load [BR-ANNUAL-HVAC-LOAD] — DRAFT
├── HVAC Performance [BR-HVAC-PERFORMANCE] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-14` — Opaque-envelope insulation

**Status:** 🟡 DRAFT

**Retrofits:**
- `insulation_upgrade` — Insulation upgrade

**Core formula:**

```text
Annual savings
= modeled heating/cooling resource use before insulation
− modeled heating/cooling resource use after insulation
```

**Information tree:**

```text
Annual Dollar Savings
├── Envelope Area [BR-ENVELOPE-AREA] — DRAFT
├── Baseline Opaque Performance [BR-BASELINE-OPAQUE-PERFORMANCE] — DRAFT
├── Proposed Opaque Performance [BR-PROPOSED-OPAQUE-PERFORMANCE] — DRAFT
├── Weather and Setpoints [BR-WEATHER-AND-SETPOINTS] — DRAFT
├── HVAC Performance [BR-HVAC-PERFORMANCE] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-15` — Exterior-door performance

**Status:** 🟡 DRAFT

**Retrofits:**
- `exterior_door_replacement` — Exterior door replacement

**Core formula:**

```text
Annual savings
= modeled heating/cooling resource use before door replacement
− modeled heating/cooling resource use after replacement
```

**Information tree:**

```text
Annual Dollar Savings
├── Door Area and Count [BR-DOOR-AREA-AND-COUNT] — DRAFT
├── Baseline Door Performance [BR-BASELINE-DOOR-PERFORMANCE] — DRAFT
├── Proposed Door Performance [BR-PROPOSED-DOOR-PERFORMANCE] — DRAFT
├── Weather and Setpoints [BR-WEATHER-AND-SETPOINTS] — DRAFT
├── HVAC Performance [BR-HVAC-PERFORMANCE] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-16` — Building air-leakage reduction

**Status:** 🟡 DRAFT

**Retrofits:**
- `air_sealing_weatherization` — Air sealing / weatherization

**Core formula:**

```text
Annual savings
= modeled heating/cooling resource use before air sealing
− modeled heating/cooling resource use after air sealing
```

**Information tree:**

```text
Annual Dollar Savings
├── Building Air Leakage [BR-BUILDING-AIR-LEAKAGE] — DRAFT
├── Proposed Air Leakage [BR-PROPOSED-AIR-LEAKAGE] — DRAFT
├── Building Volume [BR-BUILDING-VOLUME] — DRAFT
├── Weather and Setpoints [BR-WEATHER-AND-SETPOINTS] — DRAFT
├── HVAC Performance [BR-HVAC-PERFORMANCE] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-17` — Fenestration heat-transfer and solar-gain reduction

**Status:** 🟡 DRAFT

**Retrofits:**
- `window_replacement` — Window replacement
- `window_film_shading_retrofit` — Window film / shading retrofit

**Core formula:**

```text
Annual savings
= modeled HVAC resource cost before fenestration change
− modeled HVAC resource cost after fenestration change
```

**Information tree:**

```text
Annual Dollar Savings
├── Window Area and Orientation [BR-WINDOW-AREA-ORIENTATION] — DRAFT
├── Baseline U-Factor / SHGC [BR-BASELINE-U-SHGC] — DRAFT
├── Proposed U-Factor / SHGC [BR-PROPOSED-U-SHGC] — DRAFT
├── Weather and Setpoints [BR-WEATHER-AND-SETPOINTS] — DRAFT
├── HVAC Performance [BR-HVAC-PERFORMANCE] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-18` — Roof solar-reflectance reduction

**Status:** 🟡 DRAFT

**Retrofits:**
- `cool_roof_reflective_roof` — Cool roof / reflective roof coating

**Core formula:**

```text
Annual savings
= modeled cooling/heating resource cost before roof change
− modeled cooling/heating resource cost after roof change
```

**Information tree:**

```text
Annual Dollar Savings
├── Roof Area [BR-ROOF-AREA] — DRAFT
├── Baseline Roof Reflectance [BR-BASELINE-ROOF-REFLECTANCE] — DRAFT
├── Proposed Roof Reflectance [BR-PROPOSED-ROOF-REFLECTANCE] — DRAFT
├── Weather and Setpoints [BR-WEATHER-AND-SETPOINTS] — DRAFT
├── HVAC Performance [BR-HVAC-PERFORMANCE] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-19` — Annual equipment-energy rating difference

**Status:** 🟡 DRAFT

**Retrofits:**
- `high_efficiency_refrigeration_equipment` — High-efficiency refrigeration equipment
- `walk_in_cooler_freezer_upgrade` — Walk-in cooler/freezer upgrade

**Core formula:**

```text
Annual savings
= quantity
× (baseline annual kWh/unit − proposed annual kWh/unit)
× electricity rate
```

**Information tree:**

```text
Annual Dollar Savings
├── Scope Quantity [BR-SCOPE-QUANTITY] — IN REVIEW
├── Baseline Annual Energy Rating [BR-BASELINE-ANNUAL-ENERGY-RATING] — DRAFT
├── Proposed Annual Energy Rating [BR-PROPOSED-ANNUAL-ENERGY-RATING] — DRAFT
└── Electricity Rate [BR-ELECTRICITY-RATE] — FINALIZED (inherited)
```

---

### `ITC-20` — Solar-PV generation and bill offset

**Status:** 🟡 DRAFT

**Retrofits:**
- `rooftop_solar_pv` — Rooftop solar PV
- `ground_mounted_solar_pv` — Ground-mounted solar PV
- `solar_carport` — Solar carport

**Core formula:**

```text
Annual value
= self-consumed kWh × import rate
+ exported kWh × export rate
```

**Information tree:**

```text
Annual Dollar Value
├── PV System Size [BR-PV-SYSTEM-SIZE] — DRAFT
├── PV Orientation [BR-PV-ORIENTATION] — DRAFT
├── PV Losses [BR-PV-LOSSES] — DRAFT
├── Solar Resource [BR-SOLAR-RESOURCE] — DRAFT
├── Load and Self-Consumption [BR-LOAD-AND-SELF-CONSUMPTION] — DRAFT
├── Electricity Rate [BR-ELECTRICITY-RATE] — FINALIZED (inherited)
└── Export Rate [BR-EXPORT-RATE] — DRAFT
```

---

### `ITC-21` — Wind generation and bill offset

**Status:** 🟡 DRAFT

**Retrofits:**
- `small_wind_turbine` — Small wind turbine

**Core formula:**

```text
Annual value
= self-consumed kWh × import rate
+ exported kWh × export rate
```

**Information tree:**

```text
Annual Dollar Value
├── Wind Turbine Size [BR-WIND-TURBINE-SIZE] — DRAFT
├── Hub Height [BR-HUB-HEIGHT] — DRAFT
├── Wind Resource [BR-WIND-RESOURCE] — DRAFT
├── Turbine Power Curve [BR-TURBINE-POWER-CURVE] — DRAFT
├── Load and Self-Consumption [BR-LOAD-AND-SELF-CONSUMPTION] — DRAFT
├── Electricity Rate [BR-ELECTRICITY-RATE] — FINALIZED (inherited)
└── Export Rate [BR-EXPORT-RATE] — DRAFT
```

---

### `ITC-22` — Contracted community-solar bill impact

**Status:** 🟡 DRAFT

**Retrofits:**
- `community_solar_subscription` — Community solar subscription

**Core formula:**

```text
Annual value
= annual bill credits
− annual subscription payments
```

**Information tree:**

```text
Annual Dollar Value
├── Credited Energy [BR-CREDITED-ENERGY] — DRAFT
├── Community-Solar Credit Rate [BR-COMMUNITY-SOLAR-CREDIT-RATE] — DRAFT
├── Subscription Payment [BR-SUBSCRIPTION-PAYMENT] — DRAFT
└── Contract Adjustments [BR-CONTRACT-ADJUSTMENTS] — DRAFT
```

---

### `ITC-23` — Onsite fuel generation/cogeneration balance

**Status:** 🟡 DRAFT

**Retrofits:**
- `fuel_cell_system` — Fuel cell system
- `combined_heat_and_power_system` — Combined heat and power system
- `biomass_biogas_energy_system` — Biomass / biogas energy system

**Core formula:**

```text
Annual value
= avoided electricity
+ useful heat displacement
+ exports
− generator fuel
− parasitic electricity
```

**Information tree:**

```text
Annual Dollar Value
├── Gross Electric Output [BR-GROSS-ELECTRIC-OUTPUT] — DRAFT
├── Useful Thermal Output [BR-USEFUL-THERMAL-OUTPUT] — DRAFT
├── Generator Fuel Input [BR-GENERATOR-FUEL-INPUT] — DRAFT
├── Parasitic Electricity [BR-PARASITIC-ELECTRICITY] — DRAFT
├── Self-Consumption / Export [BR-SELF-CONSUMPTION-EXPORT] — DRAFT
├── Displaced Thermal Resource [BR-DISPLACED-THERMAL-RESOURCE] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-24` — Solar-thermal water-heating displacement

**Status:** 🟡 DRAFT

**Retrofits:**
- `solar_water_heating_system` — Solar water heating system

**Core formula:**

```text
Annual value
= displaced water-heating resource cost
− pump/control electricity cost
```

**Information tree:**

```text
Annual Dollar Value
├── Annual Useful Hot-Water Load [BR-ANNUAL-USEFUL-HOT-WATER-LOAD] — DRAFT
├── Solar-Thermal Fraction [BR-SOLAR-THERMAL-FRACTION] — DRAFT
├── Baseline Water-Heating Performance [BR-BASELINE-WATER-HEATING-PERFORMANCE] — DRAFT
├── Pump/Control Electricity [BR-PUMP-CONTROL-ELECTRICITY] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-25` — Battery-storage interval dispatch

**Status:** 🟡 DRAFT

**Retrofits:**
- `battery_storage_system` — Battery storage system

**Core formula:**

```text
Annual value
= tariff cost of baseline interval imports
− tariff cost of dispatched interval imports/exports
```

**Information tree:**

```text
Annual Dollar Value
├── Baseline Interval Load [BR-BASELINE-INTERVAL-LOAD] — DRAFT
├── Battery Power/Energy [BR-BATTERY-POWER-ENERGY] — DRAFT
├── Battery Efficiency [BR-BATTERY-EFFICIENCY] — DRAFT
├── State-of-Charge Rules [BR-STATE-OF-CHARGE-RULES] — DRAFT
├── Electric Tariff [BR-ELECTRIC-TARIFF] — DRAFT
└── Dispatch Rules [BR-DISPATCH-RULES] — DRAFT
```

---

### `ITC-26` — Thermal-storage interval dispatch

**Status:** 🟡 DRAFT

**Retrofits:**
- `thermal_energy_storage` — Thermal energy storage

**Core formula:**

```text
Annual value
= tariff cost before thermal dispatch
− tariff cost after thermal dispatch
```

**Information tree:**

```text
Annual Dollar Value
├── Baseline Interval Load [BR-BASELINE-INTERVAL-LOAD] — DRAFT
├── Thermal-Storage Capacity [BR-THERMAL-STORAGE-CAPACITY] — DRAFT
├── HVAC Conversion Performance [BR-HVAC-CONVERSION-PERFORMANCE] — DRAFT
├── Thermal Dispatch Rules [BR-THERMAL-DISPATCH-RULES] — DRAFT
└── Electric Tariff [BR-ELECTRIC-TARIFF] — DRAFT
```

---

### `ITC-27` — Demand-response load reduction

**Status:** 🟡 DRAFT

**Retrofits:**
- `automated_demand_response_controls` — Automated demand response controls

**Core formula:**

```text
Annual value
= tariff/program value of interval load shed
− penalties or added costs
```

**Information tree:**

```text
Annual Dollar Value
├── Baseline Interval Load [BR-BASELINE-INTERVAL-LOAD] — DRAFT
├── DR Shed Capacity [BR-DR-SHED-CAPACITY] — DRAFT
├── DR Event Windows [BR-DR-EVENT-WINDOWS] — DRAFT
├── DR Program Terms [BR-DR-PROGRAM-TERMS] — DRAFT
└── Electric Tariff [BR-ELECTRIC-TARIFF] — DRAFT
```

---

### `ITC-28` — Managed EV-charging load shifting

**Status:** 🟡 DRAFT

**Retrofits:**
- `fleet_telematics_charging_management` — Fleet telematics / charging management system

**Core formula:**

```text
Annual value
= unmanaged charging tariff cost
− managed charging tariff cost
```

**Information tree:**

```text
Annual Dollar Value
├── Baseline Interval Load [BR-BASELINE-INTERVAL-LOAD] — DRAFT
├── Vehicle Energy Requirements [BR-VEHICLE-ENERGY-REQUIREMENTS] — DRAFT
├── Arrival/Departure Windows [BR-ARRIVAL-DEPARTURE-WINDOWS] — DRAFT
├── Charger Limits [BR-CHARGER-LIMITS] — DRAFT
├── Managed-Charging Rules [BR-MANAGED-CHARGING-RULES] — DRAFT
└── Electric Tariff [BR-ELECTRIC-TARIFF] — DRAFT
```

---

### `ITC-29` — Composite distributed-energy simulation

**Status:** 🟡 DRAFT

**Retrofits:**
- `solar_plus_storage_system` — Solar-plus-storage system
- `microgrid_system` — Microgrid system

**Core formula:**

```text
Annual value
= baseline utility/fuel cost
− optimized post-project utility/fuel cost
```

**Information tree:**

```text
Annual Dollar Value
├── Baseline Interval Load [BR-BASELINE-INTERVAL-LOAD] — DRAFT
├── DER Component Package [BR-DER-COMPONENT-PACKAGE] — DRAFT
├── Interval Generation [BR-INTERVAL-GENERATION] — DRAFT
├── Interval Storage Dispatch [BR-INTERVAL-STORAGE-DISPATCH] — DRAFT
├── Generator Fuel Profile [BR-GENERATOR-FUEL-PROFILE] — DRAFT
├── Electric Tariff [BR-ELECTRIC-TARIFF] — DRAFT
└── Fuel Rate [BR-FUEL-RATE] — DRAFT
```

---

### `ITC-30` — EV-charging added-load bill impact

**Status:** 🟡 DRAFT

**Retrofits:**
- `ev_charger_installation` — EV charger installation
- `level_2_ev_charger_installation` — Level 2 EV charger installation
- `dc_fast_charger_installation` — DC fast charger installation
- `fleet_charging_infrastructure` — Fleet charging infrastructure

**Core formula:**

```text
Annual operating impact
= annual delivered charging kWh
÷ charging efficiency,
valued under the electric tariff
```

**Information tree:**

```text
Annual Dollar Impact
├── Charger Count [BR-CHARGER-COUNT] — DRAFT
├── Charger Power [BR-CHARGER-POWER] — DRAFT
├── Annual Delivered Charging Energy [BR-ANNUAL-DELIVERED-CHARGING-ENERGY] — DRAFT
├── Charging Efficiency [BR-CHARGING-EFFICIENCY] — DRAFT
├── Charging Profile [BR-CHARGING-PROFILE] — DRAFT
└── Electric Tariff [BR-ELECTRIC-TARIFF] — DRAFT
```

---

### `ITC-31` — Vehicle/material-handling resource switching

**Status:** 🟡 DRAFT

**Retrofits:**
- `electric_vehicle_purchase` — Electric vehicle purchase
- `electric_forklift_material_handling` — Electric forklift / material handling equipment

**Core formula:**

```text
Annual value
= avoided baseline fuel cost
− added electricity cost
```

**Information tree:**

```text
Annual Dollar Value
├── Asset Count [BR-ASSET-COUNT] — DRAFT
├── Annual Asset Activity [BR-ANNUAL-ASSET-ACTIVITY] — DRAFT
├── Baseline Fuel Intensity [BR-BASELINE-FUEL-INTENSITY] — DRAFT
├── Proposed Electricity Intensity [BR-PROPOSED-ELECTRICITY-INTENSITY] — DRAFT
├── Charging Efficiency [BR-CHARGING-EFFICIENCY] — DRAFT
├── Fuel Rate [BR-FUEL-RATE] — DRAFT
└── Electricity Rate [BR-ELECTRICITY-RATE] — FINALIZED (inherited)
```

---

### `ITC-32` — Flow-based water fixtures

**Status:** 🟡 DRAFT

**Retrofits:**
- `low_flow_fixture_retrofit` — Low-flow fixture retrofit

**Core formula:**

```text
Annual value
= fixture count
× (old flow − new flow)
× minutes/use
× uses/year
× water/sewer rate
+ hot-water energy value
```

**Information tree:**

```text
Annual Dollar Value
├── Fixture Count [BR-FIXTURE-COUNT] — DRAFT
├── Baseline Flow Rate [BR-BASELINE-FLOW-RATE] — DRAFT
├── Proposed Flow Rate [BR-PROPOSED-FLOW-RATE] — DRAFT
├── Duration per Use [BR-DURATION-PER-USE] — DRAFT
├── Uses per Year [BR-USES-PER-YEAR] — DRAFT
├── Hot-Water Fraction [BR-HOT-WATER-FRACTION] — DRAFT
├── Water/Sewer Rate [BR-WATER-SEWER-RATE] — DRAFT
└── Water-Heating Rate [BR-WATER-HEATING-RATE] — DRAFT
```

---

### `ITC-33` — Flush-based water fixtures

**Status:** 🟡 DRAFT

**Retrofits:**
- `high_efficiency_toilet_urinal` — High-efficiency toilet / urinal replacement

**Core formula:**

```text
Annual value
= fixture count
× (old gallons/flush − new gallons/flush)
× flushes/year
× water/sewer rate
```

**Information tree:**

```text
Annual Dollar Value
├── Fixture Count [BR-FIXTURE-COUNT] — DRAFT
├── Baseline Gallons per Flush [BR-BASELINE-GALLONS-PER-FLUSH] — DRAFT
├── Proposed Gallons per Flush [BR-PROPOSED-GALLONS-PER-FLUSH] — DRAFT
├── Flushes per Year [BR-FLUSHES-PER-YEAR] — DRAFT
└── Water/Sewer Rate [BR-WATER-SEWER-RATE] — DRAFT
```

---

### `ITC-34` — Irrigation water-budget reduction

**Status:** 🟡 DRAFT

**Retrofits:**
- `smart_irrigation_controller` — Smart irrigation controller
- `efficient_irrigation_retrofit` — Drip irrigation / efficient irrigation retrofit

**Core formula:**

```text
Annual value
= (baseline irrigation requirement − proposed requirement)
× water rate
```

**Information tree:**

```text
Annual Dollar Value
├── Irrigated Area [BR-IRRIGATED-AREA] — DRAFT
├── Reference ET [BR-REFERENCE-ET] — DRAFT
├── Landscape Factor [BR-LANDSCAPE-FACTOR] — DRAFT
├── Effective Precipitation [BR-EFFECTIVE-PRECIPITATION] — DRAFT
├── Baseline Irrigation Efficiency [BR-BASELINE-IRRIGATION-EFFICIENCY] — DRAFT
├── Proposed Irrigation Efficiency [BR-PROPOSED-IRRIGATION-EFFICIENCY] — DRAFT
└── Water Rate [BR-WATER-RATE] — DRAFT
```

---

### `ITC-35` — Known-leak water avoidance

**Status:** 🟡 DRAFT

**Retrofits:**
- `leak_detection_system` — Leak detection system

**Core formula:**

```text
Annual value
= leak flow
× avoided duration
× capture fraction
× applicable water/sewer rate
```

**Information tree:**

```text
Annual Dollar Value
├── Known Leak Flow [BR-KNOWN-LEAK-FLOW] — DRAFT
├── Avoided Leak Duration [BR-AVOIDED-LEAK-DURATION] — DRAFT
├── Leak Capture Fraction [BR-LEAK-CAPTURE-FRACTION] — DRAFT
└── Water/Sewer Rate [BR-WATER-SEWER-RATE] — DRAFT
```

---

### `ITC-36` — Multi-resource equipment per activity

**Status:** 🟡 DRAFT

**Retrofits:**
- `efficient_ice_machine` — Efficient ice machine
- `high_efficiency_laundry_equipment` — High-efficiency laundry equipment
- `high_efficiency_commercial_dishwasher` — High-efficiency commercial dishwasher
- `high_efficiency_fryer` — High-efficiency fryer
- `high_efficiency_oven` — High-efficiency oven
- `high_efficiency_steamer` — High-efficiency steamer

**Core formula:**

```text
Annual value
= quantity
× annual activity
× Σ[(old resource/unit − new resource/unit) × resource rate]
+ idle-resource difference
```

**Information tree:**

```text
Annual Dollar Value
├── Equipment Count [BR-EQUIPMENT-COUNT] — DRAFT
├── Annual Activity per Unit [BR-ANNUAL-ACTIVITY-PER-UNIT] — DRAFT
├── Baseline Resource-Intensity Vector [BR-BASELINE-RESOURCE-INTENSITY-VECTOR] — DRAFT
├── Proposed Resource-Intensity Vector [BR-PROPOSED-RESOURCE-INTENSITY-VECTOR] — DRAFT
├── Idle Resource Rates [BR-IDLE-RESOURCE-RATES] — DRAFT
├── Annual Idle Hours [BR-ANNUAL-IDLE-HOURS] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-37` — Cooling-tower water balance

**Status:** 🟡 DRAFT

**Retrofits:**
- `cooling_tower_controls_optimization` — Cooling tower controls / optimization

**Core formula:**

```text
Annual value
= (baseline makeup water − proposed makeup water)
× water/sewer rate
+ measured electric delta
```

**Information tree:**

```text
Annual Dollar Value
├── Cooling-Tower Heat Rejection [BR-COOLING-TOWER-HEAT-REJECTION] — DRAFT
├── Baseline Cycles of Concentration [BR-BASELINE-CYCLES-OF-CONCENTRATION] — DRAFT
├── Proposed Cycles of Concentration [BR-PROPOSED-CYCLES-OF-CONCENTRATION] — DRAFT
├── Drift/Leak/Overflow [BR-DRIFT-LEAK-OVERFLOW] — DRAFT
├── Water/Sewer Rate [BR-WATER-SEWER-RATE] — DRAFT
├── Measured Electric Delta [BR-MEASURED-ELECTRIC-DELTA] — DRAFT
└── Electricity Rate [BR-ELECTRICITY-RATE] — FINALIZED (inherited)
```

---

### `ITC-38` — Compressed-air leak loss

**Status:** 🟡 DRAFT

**Retrofits:**
- `compressed_air_leak_repair` — Compressed air leak repair

**Core formula:**

```text
Annual value
= (baseline leak airflow − residual leak airflow)
× compressor specific power
× annual hours
× electricity rate
```

**Information tree:**

```text
Annual Dollar Value
├── Baseline Compressed-Air Leak [BR-BASELINE-COMPRESSED-AIR-LEAK] — DRAFT
├── Residual Compressed-Air Leak [BR-RESIDUAL-COMPRESSED-AIR-LEAK] — DRAFT
├── Compressor Specific Power [BR-COMPRESSOR-SPECIFIC-POWER] — DRAFT
├── Annual Operating Hours [BR-ANNUAL-OPERATING-HOURS] — IN REVIEW
└── Electricity Rate [BR-ELECTRICITY-RATE] — FINALIZED (inherited)
```

---

### `ITC-39` — Waste-heat recovery

**Status:** 🟡 DRAFT

**Retrofits:**
- `waste_heat_recovery` — Waste heat recovery

**Core formula:**

```text
Annual value
= recoverable heat rate
× annual hours
× recovery/utilization fraction
× displaced-system value
```

**Information tree:**

```text
Annual Dollar Value
├── Recoverable Heat Rate [BR-RECOVERABLE-HEAT-RATE] — DRAFT
├── Annual Operating Hours [BR-ANNUAL-OPERATING-HOURS] — IN REVIEW
├── Recovery/Utilization Fraction [BR-RECOVERY-UTILIZATION-FRACTION] — DRAFT
├── Displaced-System Efficiency [BR-DISPLACED-SYSTEM-EFFICIENCY] — DRAFT
└── Resource Rates [BR-RESOURCE-RATES] — DRAFT
```

---

### `ITC-40` — Steam-trap loss reduction

**Status:** 🟡 DRAFT

**Retrofits:**
- `steam_trap_replacement` — Steam trap replacement

**Core formula:**

```text
Annual value
= (baseline steam loss − residual steam loss)
× annual hours
÷ boiler efficiency
× fuel rate
```

**Information tree:**

```text
Annual Dollar Value
├── Baseline Steam Loss [BR-BASELINE-STEAM-LOSS] — DRAFT
├── Residual Steam Loss [BR-RESIDUAL-STEAM-LOSS] — DRAFT
├── Annual Operating Hours [BR-ANNUAL-OPERATING-HOURS] — IN REVIEW
├── Boiler Efficiency [BR-BOILER-EFFICIENCY] — DRAFT
└── Fuel Rate [BR-FUEL-RATE] — DRAFT
```

---

### `ITC-41` — No direct operational-resource calculation

**Status:** 🟡 DRAFT

**Retrofits:**
- `submetering_energy_monitoring` — Submetering / energy monitoring system
- `resilience_backup_power_system` — Resilience / backup power system
- `ev_make_ready_electrical_upgrade` — EV make-ready electrical upgrade
- `air_filtration_system` — Air filtration system
- `energy_audit` — Energy audit
- `water_audit` — Water audit
- `retro_commissioning_study` — Retro-commissioning study
- `engineering_feasibility_study` — Engineering feasibility study
- `solar_feasibility_study` — Solar feasibility study
- `ev_charging_site_assessment` — EV charging site assessment
- `energy_star_certification` — ENERGY STAR certification
- `leed_certification` — LEED certification
- `building_benchmarking_compliance` — Building benchmarking compliance

**Core formula:**

```text
Direct operational savings = $0
until linked to a separately quantified physical or operating change
```

**Information tree:**

```text
Direct Operational Savings
└── Linked Implemented Measure [BR-LINKED-IMPLEMENTED-MEASURE] — DRAFT
```

---

## Coverage validation

- Information categories: **41**
- Canonical retrofit types mapped: **92**
- Missing retrofit mappings: **0**
- Duplicate retrofit mappings: **0**

## Update procedure

1. Refine one category tree with the product owner.
2. For each branch, determine whether an existing branch ID is truly identical.
3. If identical, reference the existing branch ID. Never create a copied variant.
4. Update the canonical branch in the Shared Branch Registry.
5. Set the branch to `FINALIZED` only after explicit acceptance.
6. Mark every category referencing that branch as inheriting the finalized branch.
7. Finalize the category only after its formula, member mapping, and every branch are finalized.
