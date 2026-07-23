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
│  ├─ Timestamped Interval Utility Data (Bill)
│  ├─ Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact (Bill)
│  ├─ Rate Schedule and Customer Class (Bill)
│  ├─ Authoritative Tariff Mapping Is Not Yet Verified (Derived)
│  ├─ No Interval Dollar Estimate Until Tariff Rules Are Resolved (Derived)
│  └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
├─ Installed Charger Count (User)
├─ Public Operating Hours (User)
├─ Expected Charging Activity
│  ├─ Expected Sessions per Operating Day from Site Study or Opportunity Design (Linked Opportunity)
│  ├─ Average Delivered Energy per Session from Site Study or Opportunity Design (Linked Opportunity)
│  ├─ Documented Interval Charging Profile from Site Study or Contractor Design (Linked Opportunity)
│  └─ No Utilization Estimate Without a Site Study or Contractor Design (Derived)
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

1. Read the exact manufacturer, model, and product configuration from the linked public electric vehicle charging opportunity.
2. Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.
3. Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.
4. Return certified active efficiency, standby power, and rated capacity with units.
5. Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Environmental Protection Agency - ENERGY STAR Product Finder records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Easy to Medium

**Validation:**
The official ENERGY STAR EV charger criteria and Product Finder access path were checked. Exact active-model lookup is technically possible, but the category-specific adapter, retained EV charger record, and formula-level golden test have not yet been added.

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

* Eligible compatible certified charger population with documented low, median, and high performance, or no value when no compatible record remains

**How to Use:**

1. Extract the application, capacity, certification, and performance limits from the linked public electric vehicle charging opportunity requirements.
2. Filter the official current-product population by every mandatory requirement, product-family boundary, active specification, and native test unit.
3. Reject the path when no compatible record remains; when several records remain, keep the eligible population and calculate a documented low, median, and high value without selecting the contractor's future product.
4. Return eligible compatible certified charger population with documented low, median, and high performance, or no value when no compatible record remains.
5. Retain the source version, complete filters, eligible record identities, population size, native units, summary rule, and no-result reason.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Environmental Protection Agency - ENERGY STAR Product Finder population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and calculate deterministic low, median, and high native-unit results.
* **Difficulty:** Easy to Medium

**Validation:**
The official ENERGY STAR EV charger criteria and Product Finder access path were checked. No retained category export currently proves the requirement filters, eligible population, population size, or low, median, and high result.

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

* Timestamped interval utility data from the uploaded utility artifact
* Time zone and daylight-saving metadata from the uploaded utility artifact
* Authoritative tariff mapping, which is not yet verified
* Installed charger count
* Public operating hours
* Expected sessions per operating day from a site study or opportunity design
* Average delivered energy per session from a site study or opportunity design
* Documented interval charging profile from the same site study or contractor design
* Resolved charger efficiency, standby power, and rated capacity from the connected product process

**Value Needed:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance

**How to Use:**

1. Validate the timestamped utility load, timezone treatment, monthly reconciliation, and authoritative tariff mapping before any dollar calculation.
2. Require one site study or contractor design that states expected daily sessions, delivered energy per session, and a compatible interval charging profile; daily averages alone do not define interval demand.
3. Resolve charger active efficiency, standby power, and rated capacity through the exact-product or requirements-based charger process.
4. Apply charger-count and public-hours limits to the documented charging profile, add the resulting import load to the baseline, and run the pinned REopt.jl baseline and proposed bill cases.
5. Retain the utility artifact, tariff source, charging-study version, charger-rating records, solver version, warnings, and monthly bill reconciliation; otherwise return no interval dollar estimate.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl bill comparison using a documented site-study or contractor charging profile.
* **Automation Method:** Validate the uploaded interval load, verified tariff mapping, documented charging profile, and resolved charger ratings; add the charging profile to baseline load and compare the versioned REopt.jl bill cases.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
