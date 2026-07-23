# Information Card — Refrigeration EC Motor Replacement

**Retrofits included:** Refrigeration EC motor retrofit

**Overview:** Electronically commutated refrigeration motors reduce input power while providing the same motor and fan duty.

**Broader Formula**

```text
Annual Operational Savings =
Annual Electricity Reduction × Bill-Derived Electricity Rate
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × (Existing Input Power - Proposed Input Power) × Annual Operating Hours × Bill-Derived Electricity Rate

Input kW = Shaft Power / Motor Efficiency when only shaft power is known.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual electricity reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Existing Motor Nameplate or Measurement (Project Document)
│  ├─ Proposed motor input or shaft rating (Linked Opportunity)
│  ├─ Annual operating hours
│  │  ├─ Recognizable Business, Shift, Seasonal, or Usage Pattern (User)
│  │  ├─ Detailed Operating Days, Shifts, or Active Season, if known (User)
│  │  ├─ Measured Annual Operating Hours, if known (Project Document)
│  │  ├─ Site Location and Business Activity (Profile)
│  │  └─ Standard 1.1 — Refrigeration EC Motor Replacement Annual Operating Hours
│  └─ Standard 1.2 — Refrigeration EC Motor Replacement Engineering Calculation
└─ Applicable Resource Rates
   └─ Bill-Derived Electricity Rate
      ├─ Electricity Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Generation Charges (Bill)
      └─ Avoidable Electricity Rate (Derived)
```

**■ Standard 1.1 — Refrigeration EC Motor Replacement Annual Operating Hours**

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

* Recognizable Business, Shift, Seasonal, or Usage Pattern ← User at `Annual Operational Savings > Annual electricity reduction > Annual operating hours > Recognizable Business, Shift, Seasonal, or Usage Pattern`. Pass the exact bound Recognizable Business, Shift, Seasonal, or Usage Pattern to Refrigeration EC Motor Replacement Annual Operating Hours when computing Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance; do not substitute a value from another tree path.
* Detailed Operating Days, Shifts, or Active Season, if known ← User at `Annual Operational Savings > Annual electricity reduction > Annual operating hours > Detailed Operating Days, Shifts, or Active Season, if known`. Pass the exact bound Detailed Operating Days, Shifts, or Active Season, if known to Refrigeration EC Motor Replacement Annual Operating Hours when computing Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance; do not substitute a value from another tree path.
* Measured Annual Operating Hours, if known ← Project Document at `Annual Operational Savings > Annual electricity reduction > Annual operating hours > Measured Annual Operating Hours, if known`. Pass the exact bound Measured Annual Operating Hours, if known to Refrigeration EC Motor Replacement Annual Operating Hours when computing Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance; do not substitute a value from another tree path.
* Site Location and Business Activity ← Profile at `Annual Operational Savings > Annual electricity reduction > Annual operating hours > Site Location and Business Activity`. Pass the exact bound Site Location and Business Activity to Refrigeration EC Motor Replacement Annual Operating Hours when computing Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance; do not substitute a value from another tree path.

**Output Bindings:**

* Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance → `annual_hours` (hours/year; PER_YEAR) at `Annual Operational Savings > Annual electricity reduction > Annual operating hours > Standard 1.1 - Refrigeration EC Motor Replacement Annual Operating Hours`.

**How to Use:**

1. Map the Refrigeration EC Motor Replacement inputs to the documented Refrigeration EC Motor Replacement Annual Operating Hours source fields or model inputs: Recognizable Business, Shift, Seasonal, or Usage Pattern; Detailed Operating Days, Shifts, or Active Season, if known; Measured Annual Operating Hours, if known; Site Location and Business Activity.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance.
5. Retain the Refrigeration EC Motor Replacement Annual Operating Hours source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Deterministic calendar calculation from a recognizable business, shift, seasonal, or usage pattern.
* **Automation Method:** Apply the supplied operating days, shifts, active weeks, holidays, and measured-hour overrides to a versioned local calendar calculation.
* **Difficulty:** Easy to Medium

**Validation:**
The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists.

**■ Standard 1.2 — Refrigeration EC Motor Replacement Engineering Calculation**

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
* Existing Motor Nameplate or Measurement
* Proposed motor input or shaft rating
* Annual operating hours from the connected schedule process

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**Input Bindings:**

* In-Scope Equipment Count ← User at `Annual Operational Savings > Annual electricity reduction > In-Scope Equipment Count`. Pass the exact bound In-Scope Equipment Count to Refrigeration EC Motor Replacement Engineering Calculation when computing Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings; do not substitute a value from another tree path.
* Existing Motor Nameplate or Measurement ← Project Document at `Annual Operational Savings > Annual electricity reduction > Existing Motor Nameplate or Measurement`. Pass the exact bound Existing Motor Nameplate or Measurement to Refrigeration EC Motor Replacement Engineering Calculation when computing Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings; do not substitute a value from another tree path.
* Proposed motor input or shaft rating ← Linked Opportunity at `Annual Operational Savings > Annual electricity reduction > Proposed motor input or shaft rating`. Pass the exact bound Proposed motor input or shaft rating to Refrigeration EC Motor Replacement Engineering Calculation when computing Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings; do not substitute a value from another tree path.
* Annual operating hours from the connected schedule process ← Standard Output at `Annual Operational Savings > Annual electricity reduction > Annual operating hours > Standard 1.1 - Refrigeration EC Motor Replacement Annual Operating Hours`. Pass the exact bound Annual operating hours from the connected schedule process to Refrigeration EC Motor Replacement Engineering Calculation when computing Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings; do not substitute a value from another tree path.

**Output Bindings:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings → `existing_input_kW` (kW; PER_YEAR) at `Annual Operational Savings > Annual electricity reduction > Standard 1.2 - Refrigeration EC Motor Replacement Engineering Calculation`.

**How to Use:**

1. Load the Refrigeration EC Motor Replacement project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR Motor Inventory and Motor Performance calculators.
2. When an exact technical input is unavailable, use only a source-specific retained equipment or application population with documented filters, numeric rule, unit, scope, and version before running the Motor Inventory and Motor Performance calculators; otherwise report the implementation limitation.
3. Run the pinned open-source Motor Inventory and Motor Performance calculators baseline and proposed cases using the category formula boundary shown in this card.
4. Return one selected existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings.
5. Retain the MEASUR version, Motor Inventory and Motor Performance calculators input object, exact and benchmark input provenance, context filters, eligible populations, selection rules, unit conversions, warnings, and baseline and proposed outputs.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Motor Inventory and Motor Performance calculators for Refrigeration EC Motor Replacement.
* **Automation Method:** Map reviewed project evidence into the Motor Inventory and Motor Performance calculators input schema, fill unresolved inputs through the single-value authoritative benchmark policy, execute the versioned local module, and preserve its warnings and native outputs.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
