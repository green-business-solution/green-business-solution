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
│  ├─ Existing cycles of concentration (User)
│  ├─ Proposed cycles of concentration (Linked Opportunity)
│  ├─ Annual evaporation or equivalent heat rejection (User)
│  ├─ Existing fan control profile (User)
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
Use U.S. Environmental Protection Agency - WaterSense at Work to resolve annual avoidable water for the selected commercial-facility equation, with measured inputs, units, and dates from the listed category inputs.

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
* Existing fan control profile
* Proposed fan control profile

**Value Needed:**

* Annual avoidable water for the selected commercial-facility equation, with measured inputs, units, and dates

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Existing cycles of concentration; Proposed cycles of concentration; Annual evaporation or equivalent heat rejection.
2. Validate measured project inputs, apply the selected equation with explicit units and dates, reject missing physical observations, and return annual avoidable water.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return annual avoidable water for the selected commercial-facility equation, with measured inputs, units, and dates.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Deterministic implementation of the exact applicable WaterSense commercial-facility equation.
* **Automation Method:** Validate measured project inputs, apply the selected equation with explicit units and dates, reject missing physical observations, and return annual avoidable water.
* **Difficulty:** Medium

**Validation:**
The official commercial best-practice and facility-tool pages were checked. Exact page, equation, and worked-example fixtures have not yet been retained, so the process cannot use generic site defaults or claim an executable default path.

**■ Standard 1.2 — Cooling Tower Optimization Engineering Calculation**

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

* Existing cycles of concentration
* Proposed cycles of concentration
* Annual evaporation or equivalent heat rejection
* Existing fan control profile
* Proposed fan control profile

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Existing cycles of concentration; Proposed cycles of concentration; Annual evaporation or equivalent heat rejection.
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
