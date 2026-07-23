# Information Card — Waste Heat Recovery

**Retrofits included:** Waste heat recovery

**Overview:** Waste heat recovery captures otherwise discarded thermal energy to displace purchased heating resources, net of auxiliary electricity.

**Broader Formula**

```text
Annual Operational Savings =
Avoided Existing Resource Cost − Added New Resource Cost
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Displaced Resource × Displaced-Resource Rate - Added Auxiliary Electricity × Bill-Derived Electricity Rate

Useful Recovered Heat = Minimum of (Available Waste Heat × Recovery Efficiency, Coincident Useful-Heat Load)

Avoided Displaced Resource = Minimum of (Convert to Billed Resource Units (Useful Recovered Heat / Displaced-System Efficiency, Displaced-Resource Unit), Billed Displaced Resource Use)
```

**Information Tree**

```text
Annual Operational Savings
├─ Waste-stream flow (User)
├─ Waste-stream temperature (User)
├─ Waste-stream schedule (User)
├─ Coincident Useful-Heat Load (User)
├─ Recovery-equipment efficiency (Linked Opportunity)
├─ Displaced heating-system efficiency (User)
├─ Recovery auxiliary power (Linked Opportunity)
├─ Annual Billed Resource Use
│  ├─ Annual Electricity Use (Bill)
│  ├─ Annual Gas Use (Bill)
│  └─ Billing Period Coverage (Bill)
├─ Standard 1.1 — Waste Heat Recovery Engineering Calculation
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

**■ Standard 1.1 — Waste Heat Recovery Engineering Calculation**

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

* Waste-stream flow
* Waste-stream temperature
* Waste-stream schedule
* Coincident Useful-Heat Load
* Recovery-equipment efficiency
* Displaced heating-system efficiency
* Recovery auxiliary power

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Waste-stream flow; Waste-stream temperature; Waste-stream schedule.
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
