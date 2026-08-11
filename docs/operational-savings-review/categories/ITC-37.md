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
│  ├─ Existing Fan Nameplate or Measured Input (Project Document)
│  ├─ Documented Existing Design Airflow from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
│  ├─ Documented Existing airflow schedule from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
│  ├─ Proposed airflow schedule (Linked Opportunity)
│  ├─ Makeup-air heating system (User)
│  ├─ Makeup-air cooling system (User)
│  ├─ Site Location for outdoor conditions (Profile)
│  ├─ Annual operating hours
│  │  ├─ Recognizable Business, Shift, Seasonal, or Usage Pattern (User)
│  │  ├─ Detailed Operating Days, Shifts, or Active Season, if known (User)
│  │  ├─ Measured Annual Operating Hours, if known (Project Document)
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
Use U.S. Department of Energy reference buildings and U.S. Naval Observatory daylight data to resolve operating hours by modeled period from the listed category inputs.

**Source:**
U.S. Department of Energy - Commercial Reference Buildings

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Lookup Inputs:**

* Existing airflow schedule from a nameplate, measurement, audit, or contractor specification
* Proposed airflow schedule from a nameplate, measurement, audit, or contractor specification
* Recognizable Business, Shift, Seasonal, or Usage Pattern
* Detailed Operating Days, Shifts, or Active Season, if known
* Measured Annual Operating Hours, if known
* Site Location for outdoor conditions
* Site Location and Business Activity

**Value Needed:**

* Operating hours by modeled period

**How to Use:**

1. Map the Demand-Controlled Kitchen Ventilation inputs to the documented Demand-Controlled Kitchen Ventilation Annual Operating Hours source fields or model inputs: Existing airflow schedule from a nameplate, measurement, audit, or contractor specification; Proposed airflow schedule from a nameplate, measurement, audit, or contractor specification; Recognizable Business, Shift, Seasonal, or Usage Pattern; Detailed Operating Days, Shifts, or Active Season, if known; Measured Annual Operating Hours, if known; Site Location for outdoor conditions; Site Location and Business Activity.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected operating hours by modeled period.
5. Retain the Demand-Controlled Kitchen Ventilation Annual Operating Hours source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Deterministic calendar calculation from a recognizable business, shift, seasonal, or usage pattern.
* **Automation Method:** Apply the supplied operating days, shifts, active weeks, holidays, and measured-hour overrides to a versioned local calendar calculation.
* **Difficulty:** Easy to Medium

**Validation:**
The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists.

**■ Standard 1.2 — Demand-Controlled Kitchen Ventilation Engineering Calculation**

**Purpose:**
Use U.S. Department of Energy - MEASUR to resolve existing fan input power by modeled period; Proposed fan input power by modeled period from the listed category inputs.

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
* Existing Design Airflow from a nameplate, measurement, audit, or contractor specification
* Makeup-air heating system
* Makeup-air cooling system
* Annual operating hours from the connected schedule process

**Value Needed:**

* Existing fan input power by modeled period
* Proposed fan input power by modeled period

**How to Use:**

1. Load the Demand-Controlled Kitchen Ventilation project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR Fan System Assessment Tool.
2. When an exact technical input is unavailable, use only a source-specific retained equipment or application population with documented filters, numeric rule, unit, scope, and version before running the Fan System Assessment Tool; otherwise report the implementation limitation.
3. Run the pinned open-source Fan System Assessment Tool baseline and proposed cases using the category formula boundary shown in this card.
4. Return one selected existing fan input power by modeled period; Proposed fan input power by modeled period.
5. Retain the MEASUR version, Fan System Assessment Tool input object, exact and benchmark input provenance, context filters, eligible populations, selection rules, unit conversions, warnings, and baseline and proposed outputs.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Fan System Assessment Tool for Demand-Controlled Kitchen Ventilation.
* **Automation Method:** Map reviewed project evidence into the Fan System Assessment Tool input schema, fill unresolved inputs through the single-value authoritative benchmark policy, execute the versioned local module, and preserve its warnings and native outputs.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
