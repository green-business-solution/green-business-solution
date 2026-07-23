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
│  ├─ Measured Annual Operating Hours, if known (User)
│  ├─ Site Location and Business Activity (Profile)
│  └─ Standard 1.1 — Fuel Cell Electricity Generation Annual Operating Hours
├─ Operating load fraction (User)
├─ Coincident Onsite Electric Load, if known (User)
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
   └─ Documented Current Fuel Price (User)
```

**■ Standard 1.1 — Fuel Cell Electricity Generation Annual Operating Hours**

**Purpose:**
Use U.S. Department of Energy reference buildings and U.S. Naval Observatory daylight data to resolve annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance from the listed category inputs.

**Source:**
U.S. Department of Energy - Commercial Reference Buildings

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Lookup Inputs:**

* Prime-mover type
* Input fuel
* Selected Unit Model, if known
* Total installed capacity
* Recognizable Business, Shift, Seasonal, or Usage Pattern
* Detailed Operating Days, Shifts, or Active Season, if known
* Measured Annual Operating Hours, if known
* Operating load fraction

**Value Needed:**

* Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Prime-mover type; Input fuel; Selected Unit Model, if known.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance.
5. Store the source version, selected record or method, input units, and any warnings with the result.

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
* Recognizable Business, Shift, Seasonal, or Usage Pattern
* Detailed Operating Days, Shifts, or Active Season, if known
* Measured Annual Operating Hours, if known
* Operating load fraction

**Value Needed:**

* Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Prime-mover type; Input fuel; Selected Unit Model, if known.
2. Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Versioned technology-class lookup followed by a transparent heat-and-power energy balance.
* **Automation Method:** Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.
* **Difficulty:** Medium to Hard

**Validation:**
The official technology pages, efficiency method, and calculator download were checked. The category adapter and retained source fixture are still absent, and the source does not identify an exact unit or supply site capacity, schedule, or thermal coincidence.
