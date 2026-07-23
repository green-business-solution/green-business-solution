# Information Card — Electric Forklift or Material Handling Equipment

**Retrofits included:** Electric forklift / material handling equipment

**Overview:** Electric material-handling equipment replaces hourly fuel use with charging electricity for the same operating duty.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × Annual Operating Hours × (Existing Fuel Per Hour × Current Fuel Price - Proposed kWh Per Hour × Bill-Derived Electricity Rate)
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual Material-Handling Resource Switch
│  ├─ In-Scope Equipment Count (User)
│  ├─ Equipment Class and Rated Capacity (User)
│  ├─ Fuel or Electric Propulsion Type (User)
│  ├─ Comparable Operating Duty (User)
│  ├─ Annual Operating Hours
│  │  ├─ Recognizable Business, Shift, Seasonal, or Usage Pattern (User)
│  │  ├─ Detailed Operating Days, Shifts, or Active Season, if known (User)
│  │  ├─ Measured Annual Operating Hours, if known (Project Document)
│  │  ├─ Site Location and Business Activity (Profile)
│  │  └─ Standard 1.1 — Electric Forklift or Material Handling Equipment Annual Operating Hours
│  ├─ Exact Existing and Proposed Hourly Resource Use (Project Document)
│  └─ Standard 1.2 — Material-Handling Resource-Intensity Resolver
└─ Applicable Resource Rates
   ├─ Bill-Derived Electricity Rate
   │  ├─ Electricity Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Generation Charges (Bill)
   │  └─ Avoidable Electricity Rate (Derived)
   └─ Current Fuel Price from Receipt, Contract, or Operating Record (Project Document)
```

**■ Standard 1.1 — Electric Forklift or Material Handling Equipment Annual Operating Hours**

**Purpose:**
Use U.S. Department of Energy reference buildings and U.S. Naval Observatory daylight data to resolve annual operating hours from the listed category inputs.

**Source:**
U.S. Department of Energy - Commercial Reference Buildings

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Lookup Inputs:**

* Recognizable Business, Shift, Seasonal, or Usage Pattern
* Detailed Operating Days, Shifts, or Active Season, if known
* Measured Annual Operating Hours, if known
* Site Location and Business Activity

**Value Needed:**

* Annual operating hours

**How to Use:**

1. Map the Electric Forklift or Material Handling Equipment inputs to the documented Electric Forklift or Material Handling Equipment Annual Operating Hours source fields or model inputs: Recognizable Business, Shift, Seasonal, or Usage Pattern; Detailed Operating Days, Shifts, or Active Season, if known; Measured Annual Operating Hours, if known; Site Location and Business Activity.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected annual operating hours.
5. Retain the Electric Forklift or Material Handling Equipment Annual Operating Hours source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Deterministic calendar calculation from a recognizable business, shift, seasonal, or usage pattern.
* **Automation Method:** Apply the supplied operating days, shifts, active weeks, holidays, and measured-hour overrides to a versioned local calendar calculation.
* **Difficulty:** Easy to Medium

**Validation:**
The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists.

**■ Standard 1.2 — Material-Handling Resource-Intensity Resolver**

**Purpose:**
Resolve comparable existing-fuel and proposed-electric resource intensity for the same material-handling class, capacity, and duty.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**Argonne forklift propulsion comparison:**
[https://www.energy.gov/sites/prod/files/2014/03/f11/forklift_anl_esd.pdf](https://www.energy.gov/sites/prod/files/2014/03/f11/forklift_anl_esd.pdf)

**Lookup Inputs:**

* Exact measured or contractual hourly resource use from a Project Document
* Equipment class and rated capacity
* Fuel or electric propulsion type
* Comparable operating duty
* Annual operating hours from the connected schedule process

**Value Needed:**

* One compatible existing fuel-use intensity
* One compatible proposed wall-electricity intensity

**How to Use:**

1. Use exact measured or contractual hourly resource use for both systems when comparable records exist.
2. Otherwise filter an authoritative population by equipment class, rated capacity, propulsion type, and operating duty before selecting any intensity.
3. Use the retained Argonne 5,000-pound electric and propane hourly pair only when the project matches that capacity and duty boundary.
4. Do not extrapolate the paired record to another capacity, duty, fuel, battery, charger, shift pattern, or annual schedule.
5. Return one existing and one proposed intensity in native hourly units and retain the source version, filters, selected record, units, and limitation.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
The retained Argonne fixture proves a 5,000-pound electric forklift value of 7.5 kWh per operating hour and a paired propane value of 1.38 gallons per operating hour, plus separate useful-work intensities. The broad category remains blocked outside exact project inputs or this compatible record because the report documents material usage variability and limited operating data. No category calculation golden fixture is retained, so end-to-end execution proof remains pending.
