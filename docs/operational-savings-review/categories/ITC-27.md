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

Site Daily Delivered kWh = Minimum of (Selected Site Daily Delivered kWh, In-Scope Equipment Count × Rated Output Power kW × Public Operating Hours × Capacity Cap Fraction)

Delivered Charging Energy in Each Interval = Site Daily Delivered kWh × Normalized Shape T

Charging Electricity in Each Interval = Delivered Charging Energy in Each Interval + (Ac Total Loss W / 1000) × Charging Interval Hours T for AC-output EVSE.

Charging Electricity in Each Interval = Delivered Charging Energy in Each Interval / Dc Efficiency Fraction for DC-output EVSE.

Standby Electricity in Each Interval = In-Scope Equipment Count × Standby Power kW Per Port × Noncharging Hours in Each Interval

Proposed Load in Each Interval = Baseline Load in Each Interval + Charging Electricity in Each Interval + Standby Electricity in Each Interval
```

**Information Tree**

```text
Annual Operational Cost Impact
├─ Chronological Electricity Load and Tariff
│  ├─ Serving Electric Utility (Bill)
│  ├─ Billing Period Start and End (Bill)
│  ├─ Timestamped Interval Utility Data (Bill)
│  ├─ Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact (Bill)
│  ├─ Rate Schedule and Customer Class (Bill)
│  ├─ Standard 1.1 — Interval Tariff Resolution
│  └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
├─ Installed Charger Count (User)
├─ Public Operating Hours (User)
├─ Site Daily Delivered Energy
│  ├─ Selected Site Daily Delivered Energy from Charging Study or Contractor Design (Project Document)
│  ├─ Capacity Cap Fraction (Project Document)
│  └─ Standard 1.2 — Site Daily Delivered-Energy Resolution
├─ Normalized Time-of-Day Charging Shape
│  ├─ Site Location (Profile)
│  ├─ Charging Scenario Selector (User)
│  └─ Standard 1.3 — EVI-Pro Normalized Charging-Shape Resolution
├─ Charger Performance
│  ├─ Linked Opportunity names an exact charger
│  │  ├─ Exact Charger Product Information (Linked Opportunity)
│  │  └─ Standard 1.4 — Exact Charger Rating Lookup
│  └─ Linked Opportunity specifies charger requirements but no exact product
│     ├─ Charger Requirements (Linked Opportunity)
│     └─ Standard 1.5 — Requirement-Based Charger Resolution
├─ Charging-Station Interval Load Profile with Separate AC, DC, and Standby Normalization (Derived)
└─ Standard 1.6 — Public Electric Vehicle Charging Interval Bill Calculation
```

**■ Standard 1.1 — Interval Tariff Resolution**

**Purpose:**
Resolve one complete interval tariff input set before calculating time-of-use, demand, or export value.

**Source:**
U.S. Department of Energy OpenEI Utility Rate Database and exact published utility tariffs

**Utility Rate Database:**
[https://apps.openei.org/USURDB/](https://apps.openei.org/USURDB/)

**Utility Rates API documentation:**
[https://developer.nlr.gov/docs/electricity/openei-utility-rates/](https://developer.nlr.gov/docs/electricity/openei-utility-rates/)

**Lookup Inputs:**

* Serving electric utility from the bill
* Published rate schedule and customer class from the bill
* Tariff effective date covering the analysis period
* Continuous interval energy and demand aligned to the tariff timezone

**Value Needed:**

* One complete tariff input set with exact or conservative-screening provenance

**How to Use:**

1. Verify the serving utility, published schedule identifier, customer class, and analysis date against the source bill.
2. Resolve the exact published tariff by matching the OpenEI record and controlling utility tariff sheet to the same utility, schedule, customer class, and effective date.
3. Normalize energy periods, demand windows, ratchets, seasons, tiers, minimums, non-bypassable charges, and export rules into one versioned input set.
4. Apply the tariff to the aligned interval series as itemized bill components and reconcile monthly energy, billed demand, and variable charges to source bills.
5. If exact tariff execution is unavailable, use only the disclosed conservative screening path: a bill-derived blended variable energy rate, an effective demand rate when both demand charges and billed demand are present, and zero export credit only as an explicit downside assumption.
6. Return the scenario label, complete fields, missing terms, source versions, exact tariff URL, reconciliation residuals, and warnings. Never substitute a fabricated rate schedule or use zero as a missing-rate placeholder.

**Automation:**

* **Selected Strategy:** Exact published-tariff adapter with itemized bill reconciliation and a separate conservative screening adapter.
* **Automation Method:** Match utility identity and effective date, normalize typed tariff rules, execute the itemized bill kernel, reconcile monthly components, and emit one exact or explicitly conservative input set with full provenance.
* **Difficulty:** Hard

**Validation:**
The official OpenEI Utility Rate Database and API documentation define structured utility-rate access. No retained utility tariff, parser fixture, or bill-reconciliation golden case currently proves this category adapter, so exact execution remains implementation-pending and the conservative screen must remain explicitly labeled.

**■ Standard 1.2 — Site Daily Delivered-Energy Resolution**

**Purpose:**
Resolve the site's total daily delivered charging energy without treating a normalized time-of-day shape as utilization.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**EVI-Pro Lite API and model documentation:**
[https://developer.nlr.gov/docs/transportation/evi-pro-lite-v1/](https://developer.nlr.gov/docs/transportation/evi-pro-lite-v1/)

**Lookup Inputs:**

* Selected site daily delivered energy from a charging study or contractor design
* Installed charger count
* Rated output power per port from the connected exact charger record, when used
* Rated output power per port from the connected requirement-selected charger record, when used
* Public operating hours
* Capacity cap fraction

**Value Needed:**

* One site-total daily delivered charging-energy value in kilowatt-hours per day

**How to Use:**

1. Require site daily delivered energy from a charging study, utilization study, metered pilot, or contractor design.
2. Calculate the physical daily capacity cap as installed charger count multiplied by rated output power, public operating hours, and the explicit capacity cap fraction.
3. Return the lesser of the documented site daily delivered energy and the physical capacity cap.
4. Do not infer daily energy from EVI-Pro Lite's normalized time-of-day shape, a charger nameplate, or a business label.
5. When the exact project daily-energy value is unavailable, report the implementation limitation and leave the category blocked.

**Automation:**

* **Selected Strategy:** Exact site study or contractor-design daily energy, capped by documented installed capacity and operating hours.
* **Automation Method:** Validate the exact project daily-energy record, calculate the physical capacity cap, select the lesser value, and retain the complete source and cap trace.
* **Difficulty:** Medium

**Validation:**
EVI-Pro Lite does not provide site daily energy or site utilization. This resolver therefore supports only an exact project record plus a physical cap, remains blocked when that record is absent, and has no retained category golden fixture, so implementation proof is pending.

**■ Standard 1.3 — EVI-Pro Normalized Charging-Shape Resolution**

**Purpose:**
Resolve a normalized weekday and weekend 15-minute time-of-day charging shape without assigning a site utilization level.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**EVI-Pro Lite API and model documentation:**
[https://developer.nlr.gov/docs/transportation/evi-pro-lite-v1/](https://developer.nlr.gov/docs/transportation/evi-pro-lite-v1/)

**Lookup Inputs:**

* Site location
* Charging scenario selector
* AC-output or DC-output charger type from the connected exact charger record, when used
* AC-output or DC-output charger type from the connected requirement-selected charger record, when used
* Public operating hours

**Value Needed:**

* One normalized weekday and weekend 15-minute charging-shape profile

**How to Use:**

1. Submit the supported location and charging-scenario inputs to the versioned EVI-Pro Lite endpoint.
2. Retain separate weekday and weekend 15-minute normalized time-of-day values.
3. Validate the interval timestamps and normalize each applicable daily shape so its interval values sum to one.
4. Multiply the selected site daily delivered energy by the normalized shape to produce delivered energy by interval.
5. Do not interpret the shape as sessions per day, utilization, delivered kilowatt-hours, or a site load magnitude.

**Automation:**

* **Selected Strategy:** Versioned EVI-Pro Lite weekday and weekend normalized time-of-day shape.
* **Automation Method:** Call the official endpoint, validate and normalize the 15-minute response profile, and retain the request, response, version, and warnings.
* **Difficulty:** Medium

**Validation:**
The official EVI-Pro Lite API documents normalized 24-hour weekday and weekend charging shapes in 15-minute steps. A retained request and response fixture is still pending, so endpoint semantics are verified while execution proof remains incomplete.

**■ Standard 1.4 — Exact Charger Rating Lookup**

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

* Rated output power per port
* Applicable AC mode-specific total loss in watts when the record is AC-output
* DC loading-adjusted efficiency as a fraction when the record is DC-output
* Applicable no-vehicle or idle standby power per port

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
The retained official ENERGY STAR fixture inspects separate AC-output and DC-output certified records and binds maximum output power, AC mode-specific total loss, native idle or no-vehicle input, and DC loading-adjusted efficiency as the fraction 0.95. The category adapter and formula-level golden test have not yet been added, so source-field support is verified while category execution proof remains pending.

**■ Standard 1.5 — Requirement-Based Charger Resolution**

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

* Rated output power per port
* Applicable AC mode-specific total loss in watts when the selected record is AC-output
* DC loading-adjusted efficiency as a fraction when the selected record is DC-output
* Applicable no-vehicle or idle standby power per port

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
The official ENERGY STAR EV charger criteria and Product Finder access path were checked. The source distinguishes AC-output total-loss fields from DC-output loading-adjusted efficiency, which is normalized to a fraction. No retained category export currently proves the requirement filters, eligible population, population size, or selected median, so implementation proof remains pending.

**■ Standard 1.6 — Public Electric Vehicle Charging Interval Bill Calculation**

**Purpose:**
Use National Laboratory of the Rockies - REopt V3 and REopt.jl to resolve baseline annual bill; Proposed annual bill from the listed category inputs.

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
* Resolved interval tariff input set from the connected tariff process
* Installed charger count
* Public operating hours
* Site daily delivered charging energy from the connected exact project resolver
* Normalized weekday and weekend 15-minute shape from the connected EVI-Pro resolver
* Resolved native AC-output or DC-output charger fields from the connected exact charger process, when used
* Resolved native AC-output or DC-output charger fields from the connected requirement-selected charger process, when used

**Value Needed:**

* Baseline annual bill
* Proposed annual bill

**How to Use:**

1. Validate the timestamped utility load, timezone treatment, monthly reconciliation, and authoritative tariff mapping before any dollar calculation.
2. Require site daily delivered energy from the connected exact project resolver and reject the calculation when it is unavailable.
3. Use the connected EVI-Pro resolver only for a normalized weekday and weekend 15-minute time-of-day shape, never for utilization or daily energy.
4. Resolve the charger through the exact-product or requirements-based process, preserving AC-output total-loss fields separately from DC-output loading-adjusted efficiency.
5. Cap documented daily energy by charger count, rated output power, public hours, and the explicit capacity-cap fraction, then distribute it over intervals with the normalized shape.
6. For AC-output EVSE, add the applicable total-loss field during charging. For DC-output EVSE, divide delivered energy by the efficiency fraction. Apply standby only in non-charging intervals.
7. Add the resulting import load to the baseline, run the pinned REopt.jl baseline and proposed bill cases, and retain the complete utility, tariff, energy, shape, charger-field, solver, warning, and reconciliation trace.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl bill comparison using a documented site-study or contractor charging profile.
* **Automation Method:** Validate the uploaded interval load, verified tariff mapping, documented charging profile, and resolved charger ratings; add the charging profile to baseline load and compare the versioned REopt.jl bill cases.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
