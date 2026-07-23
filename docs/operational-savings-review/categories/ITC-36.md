# Information Card — Cooling Tower Optimization

**Retrofits included:** Cooling tower controls / optimization

**Overview:** Cooling tower optimization reduces makeup water through improved cycles of concentration and may reduce fan electricity through better control.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Cooling-Tower Makeup Water × Bill-Derived Water and Sewer Rate + Avoided Fan Electricity × Bill-Derived Electricity Rate

Makeup Water = Evaporation Water + Blowdown Water + Drift Water

Blowdown Water = Evaporation Water / (Cycles Of Concentration - 1) when Drift Water is handled separately.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual cooling-tower water and fan-electricity reduction
│  ├─ Documented Existing cycles of concentration from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  ├─ Proposed cycles of concentration (Linked Opportunity)
│  ├─ Documented Annual evaporation or equivalent heat rejection from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  ├─ Documented Existing fan control profile from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  ├─ Proposed fan control profile (Linked Opportunity)
│  ├─ Standard 1.1 — WaterSense Commercial Operations Calculation
│  └─ Standard 1.2 — Cooling Tower Optimization Engineering Calculation
└─ Applicable Resource Rates
   ├─ Bill-Derived Electricity Rate
   │  ├─ Electricity Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Generation Charges (Bill)
   │  └─ Avoidable Electricity Rate (Derived)
   ├─ Bill-Derived Water Rate
   │  ├─ Water Use and Unit (Bill)
   │  ├─ Variable Water Charges (Bill)
   │  └─ Avoidable Water Rate (Derived)
   └─ Bill-Derived Sewer Rate
      ├─ Sewer-Billed Water Use (Bill)
      ├─ Variable Sewer Charges (Bill)
      └─ Avoidable Sewer Rate (Derived)
```

**■ Standard 1.1 — WaterSense Commercial Operations Calculation**

**Purpose:**
Use U.S. Environmental Protection Agency - WaterSense at Work to resolve annual avoided cooling-tower makeup water from the listed category inputs.

**Source:**
U.S. Environmental Protection Agency - WaterSense at Work

**WaterSense at Work best-management practices:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**Tools for commercial and institutional facilities:**
[https://www.epa.gov/watersense/tools-ci-facilities](https://www.epa.gov/watersense/tools-ci-facilities)

**Lookup Inputs:**

* Existing cycles of concentration
* Proposed cycles of concentration
* Annual evaporation or equivalent heat rejection

**Value Needed:**

* Annual avoided cooling-tower makeup water

**How to Use:**

1. Map the Cooling Tower Optimization inputs to the documented WaterSense Commercial Operations Calculation source fields or model inputs: Existing cycles of concentration; Proposed cycles of concentration; Annual evaporation or equivalent heat rejection.
2. Validate measured project inputs, apply the selected equation with explicit units and dates, reject missing physical observations, and return annual avoidable water.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected annual avoided cooling-tower makeup water.
5. Retain the WaterSense Commercial Operations Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Deterministic implementation of the exact applicable WaterSense commercial-facility equation.
* **Automation Method:** Validate measured project inputs, apply the selected equation with explicit units and dates, reject missing physical observations, and return annual avoidable water.
* **Difficulty:** Medium

**Validation:**
The official commercial best-practice and facility-tool pages were checked. Exact page, equation, and worked-example fixtures have not yet been retained, so the process cannot use generic site defaults or claim an executable default path.

**■ Standard 1.2 — Cooling Tower Optimization Engineering Calculation**

**Purpose:**
Use U.S. Department of Energy - MEASUR to resolve annual avoided cooling-tower fan electricity from the listed category inputs.

**Source:**
U.S. Department of Energy - MEASUR

**MEASUR tool and downloads:**
[https://www.energy.gov/cmei/ito/measur](https://www.energy.gov/cmei/ito/measur)

**Calculator list and descriptions:**
[https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions](https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions)

**ORNL MEASUR source repository:**
[https://github.com/ORNL-AMO/AMO-Tools-Desktop](https://github.com/ORNL-AMO/AMO-Tools-Desktop)

**Lookup Inputs:**

* Existing cycles of concentration
* Proposed cycles of concentration
* Annual evaporation or equivalent heat rejection
* Existing fan control profile
* Proposed fan control profile

**Value Needed:**

* Annual avoided cooling-tower fan electricity

**How to Use:**

1. Load the Cooling Tower Optimization project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR Cooling Tower Water Assessment.
2. When an exact technical input is unavailable, use only a source-specific retained equipment or application population with documented filters, numeric rule, unit, scope, and version before running the Cooling Tower Water Assessment; otherwise report the implementation limitation.
3. Run the pinned open-source Cooling Tower Water Assessment baseline and proposed cases using the category formula boundary shown in this card.
4. Return one selected annual avoided cooling-tower fan electricity.
5. Retain the MEASUR version, Cooling Tower Water Assessment input object, exact and benchmark input provenance, context filters, eligible populations, selection rules, unit conversions, warnings, and baseline and proposed outputs.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Cooling Tower Water Assessment for Cooling Tower Optimization.
* **Automation Method:** Map reviewed project evidence into the Cooling Tower Water Assessment input schema, fill unresolved inputs through the single-value authoritative benchmark policy, execute the versioned local module, and preserve its warnings and native outputs.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
