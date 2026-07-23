# Information Card — Fleet Charging Infrastructure

**Retrofits included:** Fleet charging infrastructure

**Overview:** Fleet charging infrastructure converts vehicle travel needs and charging schedules into added interval electric load and utility cost.

**Broader Formula**

```text
Annual Operational Savings =
Baseline Annual Bill − Proposed Annual Bill
```

**Expanded Formula**

```text
Annual Operational Savings = Baseline Annual Bill - Proposed Unmanaged-Charging Bill

Vehicle Electricity per Mile = Proposed Vehicle Electricity per 100 Miles / 100 when an exact FuelEconomy record is used.

Annual Vehicle Electricity = Annual Fleet Miles × Vehicle Electricity per Mile

Annual Standby Electricity = Installed Charging Ports × Standby Power per Port × Annual Noncharging Hours
```

**Information Tree**

```text
Annual Operational Cost Impact
├─ Chronological Electricity Load and Tariff
│  ├─ Timestamped Interval Electricity Data (User)
│  ├─ Time Zone and Daylight-Saving Treatment from the Uploaded Data (User)
│  ├─ Rate Schedule and Customer Class (Bill)
│  ├─ Complete Tariff Calendar and Billing Rules (User)
│  └─ Monthly Bill Reconciliation (Derived)
├─ Annual fleet miles (User)
├─ Depot allocation fraction (User)
├─ Vehicle Class and Service Need (User)
├─ Selected Vehicle Model, if known (Linked Opportunity)
├─ Measured kWh per Mile (User)
├─ Vehicle-arrival schedule (User)
├─ Vehicle-departure schedule (User)
├─ Uncontrolled charging rule (User)
├─ Installed port count (Linked Opportunity)
├─ Charger Performance
│  ├─ Standard 1.1 — Exact Vehicle Efficiency Lookup
│  ├─ Linked Opportunity names an exact charger
│  │  ├─ Exact Charger Product Information (Linked Opportunity)
│  │  └─ Standard 1.2 — Exact Charger Rating Lookup
│  └─ Linked Opportunity specifies charger requirements but no exact product
│     ├─ Charger Requirements (Linked Opportunity)
│     └─ Standard 1.3 — Requirement-Based Charger Resolution
├─ EVSE standby energy (Derived)
└─ Standard 1.4 — Fleet Charging Infrastructure Interval Bill Calculation
```

**■ Standard 1.1 — Exact Vehicle Efficiency Lookup**

**Purpose:**
Use U.S. Department of Energy and U.S. Environmental Protection Agency - FuelEconomy.gov to resolve exact-record fuel economy or electricity use per distance, with units and vehicle-record provenance from the listed category inputs.

**Source:**
U.S. Department of Energy and U.S. Environmental Protection Agency - FuelEconomy.gov

**FuelEconomy.gov web services and bulk downloads:**
[https://www.fueleconomy.gov/feg/ws/index.shtml](https://www.fueleconomy.gov/feg/ws/index.shtml)

**Lookup Inputs:**

* Timestamped Interval Electricity Data
* Time Zone and Daylight-Saving Treatment from Uploaded Interval Data
* Complete Tariff Calendar and Billing Rules
* Billing-Demand and Ratchet Rules
* Annual fleet miles
* Depot allocation fraction
* Vehicle Class and Service Need
* Selected Vehicle Model, if known

**Value Needed:**

* Exact-record fuel economy or electricity use per distance, with units and vehicle-record provenance

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Timestamped Interval Electricity Data; Time Zone and Daylight-Saving Treatment from Uploaded Interval Data; Complete Tariff Calendar and Billing Rules.
2. Normalize make, model, approximate year, and needed drivetrain details, require one compatible existing and proposed record, convert the returned efficiencies to per-mile use, and store the matched record provenance.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return exact-record fuel economy or electricity use per distance, with units and vehicle-record provenance.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Local exact-record lookup from the official downloadable vehicle table.
* **Automation Method:** Normalize make, model, approximate year, and needed drivetrain details, require one compatible existing and proposed record, convert the returned efficiencies to per-mile use, and store the matched record provenance.
* **Difficulty:** Easy to Medium

**Validation:**
The official downloadable schema and exact records were checked. The retained fixture validates record identity, efficiency fields, units, source version, and the golden calculation. Class-based estimates remain disabled because no compatible population and sample-size fixture has been reviewed.

**■ Standard 1.2 — Exact Charger Rating Lookup**

**Purpose:**
Resolve active charging efficiency, standby power, and rated capacity when the opportunity names an exact certified charger.

**Source:**
U.S. Environmental Protection Agency - ENERGY STAR Product Finder

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**EV charger product criteria and finder:**
[https://www.energystar.gov/products/ev_chargers](https://www.energystar.gov/products/ev_chargers)

**Lookup Inputs:**

* Exact charger make and model
* Rated charger power and application
* Opportunity product information

**Value Needed:**

* Certified active efficiency, standby power, and rated capacity with units

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Exact charger make and model; Rated charger power and application; Opportunity product information.
2. Use the official download or API, normalize product identifiers, filter to the applicable active specification, reject ambiguous matches, and return the required certified fields.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return certified active efficiency, standby power, and rated capacity with units.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family dataset lookup with exact model and specification filters.
* **Automation Method:** Use the official download or API, normalize product identifiers, filter to the applicable active specification, reject ambiguous matches, and return the required certified fields.
* **Difficulty:** Easy to Medium

**Validation:**
The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.

**■ Standard 1.3 — Requirement-Based Charger Resolution**

**Purpose:**
Interpret charger requirements from the opportunity and determine whether a compatible certified product record can supply the needed performance values.

**Source:**
U.S. Environmental Protection Agency - ENERGY STAR Product Finder

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**EV charger product criteria and finder:**
[https://www.energystar.gov/products/ev_chargers](https://www.energystar.gov/products/ev_chargers)

**Lookup Inputs:**

* Charger class and intended application
* Rated power requirement
* Opportunity performance requirements

**Value Needed:**

* One compatible certified product result, or no value when the requirements do not identify a supported record

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Charger class and intended application; Rated power requirement; Opportunity performance requirements.
2. Use the official download or API, normalize product identifiers, filter to the applicable active specification, reject ambiguous matches, and return the required certified fields.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return one compatible certified product result, or no value when the requirements do not identify a supported record.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family dataset lookup with exact model and specification filters.
* **Automation Method:** Use the official download or API, normalize product identifiers, filter to the applicable active specification, reject ambiguous matches, and return the required certified fields.
* **Difficulty:** Easy to Medium

**Validation:**
The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.

**■ Standard 1.4 — Fleet Charging Infrastructure Interval Bill Calculation**

**Purpose:**
Use National Laboratory of the Rockies - REopt V3 and REopt.jl to resolve baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance from the listed category inputs.

**Source:**
National Laboratory of the Rockies - REopt V3 and REopt.jl

**REopt API V3 documentation:**
[https://developer.nlr.gov/docs/energy-optimization/reopt/v3/](https://developer.nlr.gov/docs/energy-optimization/reopt/v3/)

**REopt.jl input reference:**
[https://natlabrockies.github.io/REopt.jl/dev/reopt/inputs/](https://natlabrockies.github.io/REopt.jl/dev/reopt/inputs/)

**REopt.jl open-source package:**
[https://github.com/NatLabRockies/REopt.jl](https://github.com/NatLabRockies/REopt.jl)

**Lookup Inputs:**

* Timestamped Interval Electricity Data
* Time Zone and Daylight-Saving Treatment from Uploaded Interval Data
* Complete Tariff Calendar and Billing Rules
* Billing-Demand and Ratchet Rules
* Annual fleet miles
* Depot allocation fraction
* Vehicle Class and Service Need
* Selected Vehicle Model, if known

**Value Needed:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Timestamped Interval Electricity Data; Time Zone and Daylight-Saving Treatment from Uploaded Interval Data; Complete Tariff Calendar and Billing Rules.
2. Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
