# Information Card — High-Efficiency Motor Replacement

**Retrofits included:** High-efficiency motor replacement

**Overview:** A high-efficiency motor reduces electric input while delivering the same shaft power, speed, load, and operating hours.

**Broader Formula**

```text
Annual Operational Savings =
Annual Electricity Reduction × Bill-Derived Electricity Rate
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × Shaft Power × Operating Load Fraction × (1 / Existing Efficiency - 1 / Proposed Efficiency) × Annual Operating Hours × Bill-Derived Electricity Rate
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual motor electricity reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Documented Motor rated shaft power from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  ├─ Documented Motor rated speed from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
│  ├─ Documented Operating load fraction from Controls Trends or Engineering Audit (Project Document)
│  ├─ Existing motor class (User)
│  ├─ Proposed motor class (Linked Opportunity)
│  ├─ Annual operating hours
│  │  ├─ Recognizable Business, Shift, Seasonal, or Usage Pattern (User)
│  │  ├─ Detailed Operating Days, Shifts, or Active Season, if known (User)
│  │  ├─ Measured Annual Operating Hours, if known (Project Document)
│  │  ├─ Site Location and Business Activity (Profile)
│  │  └─ Standard 1.1 — Motor Replacement Annual Operating Hours
│  └─ Standard 1.2 — Motor Replacement Engineering Calculation
└─ Applicable Resource Rates
   └─ Bill-Derived Electricity Rate
      ├─ Electricity Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Generation Charges (Bill)
      └─ Avoidable Electricity Rate (Derived)
```

**■ Standard 1.1 — Motor Replacement Annual Operating Hours**

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

1. Map the High-Efficiency Motor Replacement inputs to the documented Motor Replacement Annual Operating Hours source fields or model inputs: Recognizable Business, Shift, Seasonal, or Usage Pattern; Detailed Operating Days, Shifts, or Active Season, if known; Measured Annual Operating Hours, if known; Site Location and Business Activity.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected annual operating hours.
5. Retain the Motor Replacement Annual Operating Hours source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Deterministic calendar calculation from a recognizable business, shift, seasonal, or usage pattern.
* **Automation Method:** Apply the supplied operating days, shifts, active weeks, holidays, and measured-hour overrides to a versioned local calendar calculation.
* **Difficulty:** Easy to Medium

**Validation:**
The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists.

**■ Standard 1.2 — Motor Replacement Engineering Calculation**

**Purpose:**
Use U.S. Department of Energy - MEASUR to resolve existing motor efficiency; Proposed motor efficiency from the listed category inputs.

**Source:**
U.S. Department of Energy - MEASUR

**MEASUR tool and downloads:**
[https://www.energy.gov/cmei/ito/measur](https://www.energy.gov/cmei/ito/measur)

**Calculator list and descriptions:**
[https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions](https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions)

**ORNL MEASUR source repository:**
[https://github.com/ORNL-AMO/AMO-Tools-Desktop](https://github.com/ORNL-AMO/AMO-Tools-Desktop)

**Lookup Inputs:**

* In-Scope Equipment Count
* Motor rated shaft power from a nameplate, measurement, audit, or contractor specification
* Motor rated speed from a nameplate, measurement, audit, or contractor specification
* Operating load fraction from an uploaded site study, controls trend, or engineering audit
* Existing motor class
* Proposed motor class
* Annual operating hours from the connected schedule process

**Value Needed:**

* Existing motor efficiency
* Proposed motor efficiency

**How to Use:**

1. Load the High-Efficiency Motor Replacement project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR Motor Inventory and Motor Performance calculators.
2. When an exact technical input is unavailable, use only a source-specific retained equipment or application population with documented filters, numeric rule, unit, scope, and version before running the Motor Inventory and Motor Performance calculators; otherwise report the implementation limitation.
3. Run the pinned open-source Motor Inventory and Motor Performance calculators baseline and proposed cases using the category formula boundary shown in this card.
4. Return one selected existing motor efficiency; Proposed motor efficiency.
5. Retain the MEASUR version, Motor Inventory and Motor Performance calculators input object, exact and benchmark input provenance, context filters, eligible populations, selection rules, unit conversions, warnings, and baseline and proposed outputs.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Motor Inventory and Motor Performance calculators for High-Efficiency Motor Replacement.
* **Automation Method:** Map reviewed project evidence into the Motor Inventory and Motor Performance calculators input schema, fill unresolved inputs through the single-value authoritative benchmark policy, execute the versioned local module, and preserve its warnings and native outputs.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
