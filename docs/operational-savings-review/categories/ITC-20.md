# Information Card — Fuel Cell Electricity Generation

**Retrofits included:** Fuel cell system

**Overview:** A fuel cell converts purchased fuel into onsite electricity, reducing grid purchases while adding fuel use.

**Broader Formula**

```text
Annual Operational Savings =
Avoided Existing Resource Cost − Added New Resource Cost
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Grid Electricity × Bill-Derived Electricity Rate - Added Fuel × Current Fuel Price

Annual Onsite Generation = Installed Capacity × Annual Operating Hours × Operating Load Fraction

Added Fuel = Convert to Billed Resource Units (Annual Onsite Generation / Electric Efficiency, Fuel Unit)

Avoided Grid Electricity = Minimum of (Annual Onsite Generation, Coincident Onsite Electric Load)
```

**Information Tree**

```text
Annual Operational Savings
├─ Prime-mover type (Linked Opportunity)
├─ Input fuel (Linked Opportunity)
├─ Selected Unit Model, if known (Linked Opportunity)
├─ Total installed capacity (Linked Opportunity)
├─ Opportunity Equipment or Performance Requirements (Linked Opportunity)
├─ Annual operating hours
│  ├─ Recognizable Business, Shift, Seasonal, or Usage Pattern (User)
│  ├─ Detailed Operating Days, Shifts, or Active Season, if known (User)
│  ├─ Measured Annual Operating Hours, if known (Project Document)
│  ├─ Site Location and Business Activity (Profile)
│  └─ Standard 1.1 — Fuel Cell Electricity Generation Annual Operating Hours
├─ Documented Operating load fraction from Controls Trends or Engineering Audit (Project Document)
├─ Documented Coincident Onsite Electric Load, if known from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
├─ Standard 1.2 — Fuel Cell Electricity Generation Performance Balance
└─ Applicable Resource Rates
   ├─ Bill-Derived Electricity Rate
   │  ├─ Electricity Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Generation Charges (Bill)
   │  └─ Avoidable Electricity Rate (Derived)
   ├─ Bill-Derived Gas Rate
   │  ├─ Gas Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Procurement Charges (Bill)
   │  └─ Avoidable Gas Rate (Derived)
   └─ Current Fuel Price from Receipt, Contract, or Operating Record (Project Document)
```

**■ Standard 1.1 — Fuel Cell Electricity Generation Annual Operating Hours**

**Purpose:**
Use U.S. Department of Energy reference buildings and U.S. Naval Observatory daylight data to resolve annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance from the listed category inputs.

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

* Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance

**Input Bindings:**

* Recognizable Business, Shift, Seasonal, or Usage Pattern ← User at `Annual Operational Savings > Annual operating hours > Recognizable Business, Shift, Seasonal, or Usage Pattern`. Pass the exact bound Recognizable Business, Shift, Seasonal, or Usage Pattern to Fuel Cell Electricity Generation Annual Operating Hours when computing Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance; do not substitute a value from another tree path.
* Detailed Operating Days, Shifts, or Active Season, if known ← User at `Annual Operational Savings > Annual operating hours > Detailed Operating Days, Shifts, or Active Season, if known`. Pass the exact bound Detailed Operating Days, Shifts, or Active Season, if known to Fuel Cell Electricity Generation Annual Operating Hours when computing Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance; do not substitute a value from another tree path.
* Measured Annual Operating Hours, if known ← Project Document at `Annual Operational Savings > Annual operating hours > Measured Annual Operating Hours, if known`. Pass the exact bound Measured Annual Operating Hours, if known to Fuel Cell Electricity Generation Annual Operating Hours when computing Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance; do not substitute a value from another tree path.
* Site Location and Business Activity ← Profile at `Annual Operational Savings > Annual operating hours > Site Location and Business Activity`. Pass the exact bound Site Location and Business Activity to Fuel Cell Electricity Generation Annual Operating Hours when computing Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance; do not substitute a value from another tree path.

**Output Bindings:**

* Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance → `annual_generation` (kWh/year; PER_YEAR) at `Annual Operational Savings > Annual operating hours > Standard 1.1 - Fuel Cell Electricity Generation Annual Operating Hours`.

**How to Use:**

1. Map the Fuel Cell Electricity Generation inputs to the documented Fuel Cell Electricity Generation Annual Operating Hours source fields or model inputs: Recognizable Business, Shift, Seasonal, or Usage Pattern; Detailed Operating Days, Shifts, or Active Season, if known; Measured Annual Operating Hours, if known; Site Location and Business Activity.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance.
5. Retain the Fuel Cell Electricity Generation Annual Operating Hours source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Deterministic calendar calculation from a recognizable business, shift, seasonal, or usage pattern.
* **Automation Method:** Apply the supplied operating days, shifts, active weeks, holidays, and measured-hour overrides to a versioned local calendar calculation.
* **Difficulty:** Easy to Medium

**Validation:**
The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists.

**■ Standard 1.2 — Fuel Cell Electricity Generation Performance Balance**

**Purpose:**
Use U.S. Environmental Protection Agency - CHP technologies and calculator to resolve annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity from the listed category inputs.

**Source:**
U.S. Environmental Protection Agency - CHP technologies and calculator

**CHP technologies and current catalog links:**
[https://www.epa.gov/chp/chp-technologies](https://www.epa.gov/chp/chp-technologies)

**CHP efficiency method and resources:**
[https://www.epa.gov/chp/chp-resources](https://www.epa.gov/chp/chp-resources)

**Current CHP calculator download:**
[https://www.epa.gov/chp/download-chp-energy-and-emissions-savings-calculator](https://www.epa.gov/chp/download-chp-energy-and-emissions-savings-calculator)

**Lookup Inputs:**

* Prime-mover type
* Input fuel
* Selected Unit Model, if known
* Total installed capacity
* Operating load fraction from an uploaded site study, controls trend, or engineering audit
* Coincident Onsite Electric Load, if known
* Annual operating hours from the connected schedule process

**Value Needed:**

* Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity

**Input Bindings:**

* Prime-mover type ← Linked Opportunity at `Annual Operational Savings > Prime-mover type`. Pass the exact bound Prime-mover type to Fuel Cell Electricity Generation Performance Balance when computing Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity; do not substitute a value from another tree path.
* Input fuel ← Standard Output at `Annual Operational Savings > Annual operating hours > Standard 1.1 - Fuel Cell Electricity Generation Annual Operating Hours`. Pass the exact bound Input fuel to Fuel Cell Electricity Generation Performance Balance when computing Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity; do not substitute a value from another tree path.
* Selected Unit Model, if known ← Linked Opportunity at `Annual Operational Savings > Selected Unit Model, if known`. Pass the exact bound Selected Unit Model, if known to Fuel Cell Electricity Generation Performance Balance when computing Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity; do not substitute a value from another tree path.
* Total installed capacity ← Linked Opportunity at `Annual Operational Savings > Total installed capacity`. Pass the exact bound Total installed capacity to Fuel Cell Electricity Generation Performance Balance when computing Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity; do not substitute a value from another tree path.
* Operating load fraction from an uploaded site study, controls trend, or engineering audit ← Project Document at `Annual Operational Savings > Documented Operating load fraction from Controls Trends or Engineering Audit`. Pass the exact bound Operating load fraction from an uploaded site study, controls trend, or engineering audit to Fuel Cell Electricity Generation Performance Balance when computing Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity; do not substitute a value from another tree path.
* Coincident Onsite Electric Load, if known ← Project Document at `Annual Operational Savings > Documented Coincident Onsite Electric Load, if known from Submeter, Controls Trend, Audit, or Contractor Specification`. Pass the exact bound Coincident Onsite Electric Load, if known to Fuel Cell Electricity Generation Performance Balance when computing Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity; do not substitute a value from another tree path.
* Annual operating hours from the connected schedule process ← Standard Output at `Annual Operational Savings > Annual operating hours > Standard 1.1 - Fuel Cell Electricity Generation Annual Operating Hours`. Pass the exact bound Annual operating hours from the connected schedule process to Fuel Cell Electricity Generation Performance Balance when computing Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity; do not substitute a value from another tree path.

**Output Bindings:**

* Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity → `added_fuel` (fuel-unit/year; PER_YEAR) at `Annual Operational Savings > Standard 1.2 - Fuel Cell Electricity Generation Performance Balance`.

**How to Use:**

1. Map the Fuel Cell Electricity Generation inputs to the documented Fuel Cell Electricity Generation Performance Balance source fields or model inputs: Prime-mover type; Input fuel; Selected Unit Model, if known; Total installed capacity; Operating load fraction from an uploaded site study, controls trend, or engineering audit; Coincident Onsite Electric Load, if known; Annual operating hours from the connected schedule process.
2. Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity.
5. Retain the Fuel Cell Electricity Generation Performance Balance source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Versioned technology-class lookup followed by a transparent heat-and-power energy balance.
* **Automation Method:** Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.
* **Difficulty:** Medium to Hard

**Validation:**
The official technology pages, efficiency method, and calculator download were checked. The category adapter and retained source fixture are still absent, and the source does not identify an exact unit or supply site capacity, schedule, or thermal coincidence.
