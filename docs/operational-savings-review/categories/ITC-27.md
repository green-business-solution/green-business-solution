# Information Card — Public Electric Vehicle Charging

**Retrofits included:** EV charger installation; Level 2 EV charger installation; DC fast charger installation

**Overview:** Public charging equipment adds active charging and standby electricity to the site load, producing an annual bill impact rather than an automatic savings value.

**Broader Formula**

```text
Annual Operational Savings =
Baseline Annual Bill − Proposed Annual Bill
```

**Expanded Formula**

```text
Annual Operational Savings = Baseline Annual Bill - Proposed Annual Bill

Proposed Load in Each Interval = Baseline Load in Each Interval + In-Scope Equipment Count × (Charging Electricity in Each Interval + Standby Electricity in Each Interval)

Charging Electricity in Each Interval = Delivered Charging Energy in Each Interval / Active Charging Efficiency

Standby Electricity in Each Interval = Standby Power × Noncharging Hours in Each Interval
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
├─ In-Scope Equipment Count (User)
├─ Session-arrival distribution per charger (User)
├─ Session-duration distribution per charger (User)
├─ Delivered-kWh distribution per charger (User)
├─ Charger Performance
│  ├─ Linked Opportunity names an exact charger
│  │  ├─ Exact Charger Product Information (Linked Opportunity)
│  │  └─ Standard 1.1 — Exact Charger Rating Lookup
│  └─ Linked Opportunity specifies charger requirements but no exact product
│     ├─ Charger Requirements (Linked Opportunity)
│     └─ Standard 1.2 — Requirement-Based Charger Resolution
├─ Charging-Station Interval Load Profile (Derived)
└─ Standard 1.3 — Public Electric Vehicle Charging Interval Bill Calculation
```

**■ Standard 1.1 — Exact Charger Rating Lookup**

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

**■ Standard 1.2 — Requirement-Based Charger Resolution**

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

**■ Standard 1.3 — Public Electric Vehicle Charging Interval Bill Calculation**

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
* In-Scope Equipment Count
* Session-arrival distribution per charger
* Session-duration distribution per charger
* Delivered-kWh distribution per charger

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
