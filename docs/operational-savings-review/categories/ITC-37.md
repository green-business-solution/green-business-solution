# Information Card — Demand-Controlled Kitchen Ventilation

**Retrofits included:** Demand-controlled kitchen ventilation

**Overview:** Demand-controlled kitchen ventilation reduces fan power and conditioned makeup-air load by matching airflow to cooking activity.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Fan Electricity × Bill-Derived Electricity Rate + Sum Across Resources of (Avoided Makeup-Air Resource Use × Bill-Derived Resource Rate)

Fan Shaft Power Fraction = Airflow Fraction³ for applicable variable-speed fan systems.
MEASUR must convert shaft power to electrical input with the applicable fan, motor, and drive efficiencies.

Avoided Fan Electricity = In-Scope Equipment Count × Sum Across Billing Periods of Operating Hours by Period × (Existing Fan Input Power by Period - Proposed Fan Input Power by Period)
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual kitchen ventilation fan and makeup-air resource reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Existing Fan Nameplate or Measured Input (User)
│  ├─ Existing Design Airflow (User)
│  ├─ Existing airflow schedule (User)
│  ├─ Proposed airflow schedule (Linked Opportunity)
│  ├─ Makeup-air heating system (User)
│  ├─ Makeup-air cooling system (User)
│  ├─ Site Location for outdoor conditions (Profile)
│  ├─ Annual operating hours
│  │  ├─ Recognizable Business, Shift, Seasonal, or Usage Pattern (User)
│  │  ├─ Detailed Operating Days, Shifts, or Active Season, if known (User)
│  │  ├─ Measured Annual Operating Hours, if known (User)
│  │  ├─ Site Location and Business Activity (Profile)
│  │  └─ Standard 1.1 — Demand-Controlled Kitchen Ventilation Annual Operating Hours
│  └─ Standard 1.2 — Demand-Controlled Kitchen Ventilation Engineering Calculation
└─ Applicable Resource Rates
   ├─ Bill-Derived Electricity Rate
   │  ├─ Electricity Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Generation Charges (Bill)
   │  └─ Avoidable Electricity Rate (Derived)
   └─ Bill-Derived Gas Rate
      ├─ Gas Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Procurement Charges (Bill)
      └─ Avoidable Gas Rate (Derived)
```

**■ Standard 1.1 — Demand-Controlled Kitchen Ventilation Annual Operating Hours**

**Purpose:**
Use U.S. Department of Energy reference buildings and U.S. Naval Observatory daylight data to resolve annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance from the listed category inputs.

**Source:**
U.S. Department of Energy - Commercial Reference Buildings

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Lookup Inputs:**

* In-Scope Equipment Count
* Existing Fan Nameplate or Measured Input
* Existing Design Airflow
* Existing airflow schedule
* Proposed airflow schedule
* Makeup-air heating system
* Makeup-air cooling system
* Recognizable Business, Shift, Seasonal, or Usage Pattern

**Value Needed:**

* Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: In-Scope Equipment Count; Existing Fan Nameplate or Measured Input; Existing Design Airflow.
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

**■ Standard 1.2 — Demand-Controlled Kitchen Ventilation Engineering Calculation**

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
* Existing Fan Nameplate or Measured Input
* Existing Design Airflow
* Existing airflow schedule
* Proposed airflow schedule
* Makeup-air heating system
* Makeup-air cooling system
* Recognizable Business, Shift, Seasonal, or Usage Pattern

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: In-Scope Equipment Count; Existing Fan Nameplate or Measured Input; Existing Design Airflow.
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
