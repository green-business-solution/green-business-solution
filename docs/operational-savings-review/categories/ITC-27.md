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
│  ├─ Published Utility Tariff and Effective-Date Mapping (Derived)
│  ├─ One Selected Interval Tariff Value (Derived)
│  └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
├─ Installed Charger Count (User)
├─ Public Operating Hours (User)
├─ Expected Charging Activity
│  ├─ Expected Sessions per Operating Day from Charging or Utilization Study (Project Document)
│  ├─ Average Delivered Energy per Session from Charging or Utilization Study (Project Document)
│  ├─ Documented Interval Charging Profile from Site Study or Contractor Design (Project Document)
│  └─ Standard 1.1 — Public Charging Utilization Benchmark
├─ Charger Performance
│  ├─ Linked Opportunity names an exact charger
│  │  ├─ Exact Charger Product Information (Linked Opportunity)
│  │  └─ Standard 1.2 — Exact Charger Rating Lookup
│  └─ Linked Opportunity specifies charger requirements but no exact product
│     ├─ Charger Requirements (Linked Opportunity)
│     └─ Standard 1.3 — Requirement-Based Charger Resolution
├─ Charging-Station Interval Load Profile (Derived)
└─ Standard 1.4 — Public Electric Vehicle Charging Interval Bill Calculation
```

**■ Standard 1.1 — Public Charging Utilization Benchmark**

**Purpose:**
Select one public-charging utilization and interval load profile when a charging or utilization study is unavailable.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**EVI-Pro Lite API and model documentation:**
[https://developer.nlr.gov/docs/transportation/evi-pro-lite-v1/](https://developer.nlr.gov/docs/transportation/evi-pro-lite-v1/)

**Lookup Inputs:**

* Site location
* Business and building context
* Installed charger count
* Public operating hours
* AC-output or DC-output charger type and rated power

**Value Needed:**

* One daily charging utilization value
* One normalized interval charging profile

**How to Use:**

1. Map the Public Electric Vehicle Charging inputs to the documented Public Charging Utilization Benchmark source fields or model inputs: Site location; Business and building context; Installed charger count; Public operating hours; AC-output or DC-output charger type and rated power.
2. Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected daily charging utilization value; One normalized interval charging profile.
5. Retain the Public Charging Utilization Benchmark source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from the closest authoritative compatible population.
* **Automation Method:** Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
* **Difficulty:** Medium

**Validation:**
The NLR EVI-Pro Lite API documents representative weekday and weekend 15-minute charging profiles for location and charging scenarios. A retained request and response fixture for RetroFi's public-site filters is not yet present, so the method is verified while category execution remains pending.

**■ Standard 1.2 — Exact Charger Rating Lookup**

**Purpose:**
Resolve native AC-output or DC-output charging and low-power fields when the opportunity names an exact certified charger.

**Source:**
U.S. Environmental Protection Agency - ENERGY STAR Product Finder

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**EV charger product criteria and finder:**
[https://www.energystar.gov/products/ev_chargers](https://www.energystar.gov/products/ev_chargers)

**Lookup Inputs:**

* Exact charger make and model
* Charger product type: AC-output or DC-output
* Rated charger power and application
* Opportunity product information

**Value Needed:**

* For AC-output chargers: maximum output power, no-vehicle or idle power, and mode-specific total-loss fields
* For DC-output chargers: maximum output power, no-vehicle or idle power, and loading-adjusted efficiency

**How to Use:**

1. Match the exact manufacturer and model, require active certification, and preserve whether the record is AC-output or DC-output.
2. For an AC-output charger, retain maximum output power, no-vehicle or idle input power, and the applicable current-specific operation-mode total-loss field.
3. Normalize AC active input power as output power plus the applicable mode-specific total loss, with units converted consistently.
4. For a DC-output charger, retain maximum output power, no-vehicle or idle AC input power, and average loading-adjusted efficiency.
5. Normalize DC active input power as output power divided by loading-adjusted efficiency, then apply native no-vehicle or idle input only to the corresponding non-charging duration.
6. Return one exact compatible native-field record and retain the product ID, source version, fields, units, and charger-type normalization path.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Environmental Protection Agency - ENERGY STAR Product Finder records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Easy to Medium

**Validation:**
The retained official ENERGY STAR fixture inspects separate AC-output and DC-output certified records and binds maximum output power, AC mode-specific total loss, native idle or no-vehicle input, and DC loading-adjusted efficiency fields. The category adapter and formula-level golden test have not yet been added, so source-field support is verified while category execution proof remains pending.

**■ Standard 1.3 — Requirement-Based Charger Resolution**

**Purpose:**
Interpret charger requirements from the opportunity, separate AC-output and DC-output products, and select one compatible certified record value for each required native field.

**Source:**
U.S. Environmental Protection Agency - ENERGY STAR Product Finder

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**EV charger product criteria and finder:**
[https://www.energystar.gov/products/ev_chargers](https://www.energystar.gov/products/ev_chargers)

**Lookup Inputs:**

* Charger product type: AC-output or DC-output
* Charger class and intended application
* Rated power requirement
* Opportunity performance requirements

**Value Needed:**

* One selected native-field performance record from the compatible AC-output or DC-output population
* The eligible population, filters, population size, and median selection rule retained internally

**How to Use:**

1. Extract the charger type, application, rated-power requirement, certification requirement, and every mandatory performance limit from the opportunity.
2. Filter AC-output and DC-output records separately and preserve each source's native field family and unit.
3. Use an official recommended or typical compatible record when the source designates one; otherwise use a valid weighted median or the ordinary median of the eligible compatible population.
4. For AC-output records, calculate active input as output power plus the selected mode-specific total loss and keep idle or no-vehicle input separate.
5. For DC-output records, calculate active input as output power divided by loading-adjusted efficiency and keep idle or no-vehicle AC input separate.
6. Return one selected compatible native-field record without choosing a future contractor product, and retain the complete population and selection trace.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Environmental Protection Agency - ENERGY STAR Product Finder population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and select one official typical value, weighted median, or median in native units.
* **Difficulty:** Easy to Medium

**Validation:**
The official ENERGY STAR EV charger criteria and Product Finder access path were checked. The source distinguishes AC-output total-loss fields from DC-output loading-adjusted efficiency. No retained category export currently proves the requirement filters, eligible population, population size, or selected median, so implementation proof remains pending.

**■ Standard 1.4 — Public Electric Vehicle Charging Interval Bill Calculation**

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
* Expected sessions per operating day from a project document, or one context-matched benchmark when unavailable
* Average delivered energy per session from a project document, or one context-matched benchmark when unavailable
* Interval charging profile from a project document, or one deterministic context-matched profile when unavailable
* Resolved native AC-output or DC-output charger fields from the connected product process

**Value Needed:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance

**How to Use:**

1. Validate the timestamped utility load, timezone treatment, monthly reconciliation, and authoritative tariff mapping before any dollar calculation.
2. Use a charging or utilization study when available. Otherwise select one context-matched public-charging profile from an authoritative travel-and-charging model using location, charger type, public hours, business context, and installed count.
3. Resolve the charger through the exact-product or requirements-based process, preserving AC-output total-loss fields separately from DC-output loading-adjusted efficiency.
4. Apply charger-count and public-hours limits to the documented charging profile, add the resulting import load to the baseline, and run the pinned REopt.jl baseline and proposed bill cases.
5. Retain the utility artifact, tariff source, charging-study or benchmark version, context filters, selected profile, charger-rating records, solver version, warnings, and monthly bill reconciliation.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl bill comparison using a documented site-study or contractor charging profile.
* **Automation Method:** Validate the uploaded interval load, verified tariff mapping, documented charging profile, and resolved charger ratings; add the charging profile to baseline load and compare the versioned REopt.jl bill cases.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
