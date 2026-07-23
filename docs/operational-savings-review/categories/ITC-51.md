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
│  ├─ Required airflow (User)
│  ├─ Clean-filter pressure rise (User)
│  ├─ Loaded-filter pressure rise (User)
│  ├─ Existing fan input data (User)
│  ├─ Existing filtration input data (User)
│  ├─ Proposed fan input data (Linked Opportunity)
│  ├─ Proposed filtration input data (Linked Opportunity)
│  ├─ Annual operating hours
│  │  ├─ Recognizable Business, Shift, Seasonal, or Usage Pattern (User)
│  │  ├─ Detailed Operating Days, Shifts, or Active Season, if known (User)
│  │  ├─ Measured Annual Operating Hours, if known (User)
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
Use U.S. Department of Energy reference buildings and U.S. Naval Observatory daylight data to resolve annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance from the listed category inputs.

**Source:**
U.S. Department of Energy - Commercial Reference Buildings

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Lookup Inputs:**

* In-Scope Equipment Count
* Required airflow
* Clean-filter pressure rise
* Loaded-filter pressure rise
* Existing fan input data
* Existing filtration input data
* Proposed fan input data
* Proposed filtration input data

**Value Needed:**

* Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: In-Scope Equipment Count; Required airflow; Clean-filter pressure rise.
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

**■ Standard 1.2 — Air Filtration System Engineering Calculation**

**Purpose:**
Use U.S. Department of Energy - MEASUR to resolve existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings from the listed category inputs.

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
* Required airflow
* Clean-filter pressure rise
* Loaded-filter pressure rise
* Existing fan input data
* Existing filtration input data
* Proposed fan input data
* Proposed filtration input data

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: In-Scope Equipment Count; Required airflow; Clean-filter pressure rise.
2. Map the supplied project facts and units to the named calculator, run the versioned open-source calculation locally, reject incomplete or incompatible inputs, and return its existing and proposed resource results.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Pinned local execution of the exact MEASUR calculator for this category.
* **Automation Method:** Map the supplied project facts and units to the named calculator, run the versioned open-source calculation locally, reject incomplete or incompatible inputs, and return its existing and proposed resource results.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
