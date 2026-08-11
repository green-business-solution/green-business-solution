# Information Card — Air Filtration System

**Retrofits included:** Air filtration system

**Overview:** An air filtration project changes fan electricity through its airflow, filter pressure rise, fan efficiency, and operating schedule.

**Broader Formula**

```text
Annual Operational Savings =
Annual Electricity Reduction × Bill-Derived Electricity Rate
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × (Existing Input Power - Proposed Input Power) × Annual Operating Hours × Bill-Derived Electricity Rate

Fan Input kW = Airflow × Pressure Rise × Air Power Conversion Factor / (Fan Efficiency × Motor Efficiency)

Air Power Conversion Factor must convert the declared flow and pressure units to kW exactly once.
```

**Information Tree**

```text
Annual Operational Cost Impact
├─ Annual filtration fan electricity change
│  ├─ In-Scope Equipment Count (User)
│  ├─ Documented Required airflow from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  ├─ Documented Clean-filter pressure rise from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  ├─ Documented Loaded-filter pressure rise from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  ├─ Existing fan input data (Project Document)
│  ├─ Existing filtration input data (Project Document)
│  ├─ Proposed fan input data (Linked Opportunity)
│  ├─ Proposed filtration input data (Linked Opportunity)
│  ├─ Annual operating hours
│  │  ├─ Recognizable Business, Shift, Seasonal, or Usage Pattern (User)
│  │  ├─ Detailed Operating Days, Shifts, or Active Season, if known (User)
│  │  ├─ Measured Annual Operating Hours, if known (Project Document)
│  │  ├─ Site Location and Business Activity (Profile)
│  │  └─ Standard 1.1 — Air Filtration System Annual Operating Hours
│  └─ Standard 1.2 — Air Filtration System Engineering Calculation
└─ Applicable Resource Rates
   └─ Bill-Derived Electricity Rate
      ├─ Electricity Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Generation Charges (Bill)
      └─ Avoidable Electricity Rate (Derived)
```

**■ Standard 1.1 — Air Filtration System Annual Operating Hours**

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

1. Map the Air Filtration System inputs to the documented Air Filtration System Annual Operating Hours source fields or model inputs: Recognizable Business, Shift, Seasonal, or Usage Pattern; Detailed Operating Days, Shifts, or Active Season, if known; Measured Annual Operating Hours, if known; Site Location and Business Activity.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected annual operating hours.
5. Retain the Air Filtration System Annual Operating Hours source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Deterministic calendar calculation from a recognizable business, shift, seasonal, or usage pattern.
* **Automation Method:** Apply the supplied operating days, shifts, active weeks, holidays, and measured-hour overrides to a versioned local calendar calculation.
* **Difficulty:** Easy to Medium

**Validation:**
The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists.

**■ Standard 1.2 — Air Filtration System Engineering Calculation**

**Purpose:**
Use U.S. Department of Energy - MEASUR to resolve existing filtration fan input power; Proposed filtration fan input power from the listed category inputs.

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
* Required airflow from a nameplate, measurement, audit, or contractor specification
* Clean-filter pressure rise from a nameplate, measurement, audit, or contractor specification
* Loaded-filter pressure rise from a nameplate, measurement, audit, or contractor specification
* Existing fan input data
* Existing filtration input data
* Proposed fan input data
* Proposed filtration input data
* Annual operating hours from the connected schedule process

**Value Needed:**

* Existing filtration fan input power
* Proposed filtration fan input power

**How to Use:**

1. Load the Air Filtration System project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR Fan System Assessment Tool.
2. When an exact technical input is unavailable, use only a source-specific retained equipment or application population with documented filters, numeric rule, unit, scope, and version before running the Fan System Assessment Tool; otherwise report the implementation limitation.
3. Run the pinned open-source Fan System Assessment Tool baseline and proposed cases using the category formula boundary shown in this card.
4. Return one selected existing filtration fan input power; Proposed filtration fan input power.
5. Retain the MEASUR version, Fan System Assessment Tool input object, exact and benchmark input provenance, context filters, eligible populations, selection rules, unit conversions, warnings, and baseline and proposed outputs.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Fan System Assessment Tool for Air Filtration System.
* **Automation Method:** Map reviewed project evidence into the Fan System Assessment Tool input schema, fill unresolved inputs through the single-value authoritative benchmark policy, execute the versioned local module, and preserve its warnings and native outputs.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
