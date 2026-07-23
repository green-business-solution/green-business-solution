# Information Card — Industrial Process Electrification

**Retrofits included:** Industrial heat pump; Process electrification equipment

**Overview:** Industrial heat pumps and other thermal process electrification replace purchased fuel with electricity for the same useful process heat.

**Broader Formula**

```text
Annual Operational Savings =
Avoided Existing Resource Cost − Added New Resource Cost
```

**Expanded Formula**

```text
Annual Operational Savings = Current Fuel Input × Current Fuel Price - Proposed Electric Input × Bill-Derived Electricity Rate

Useful Process Heat = Convert to Common Energy Units (Current Fuel Input, Current Fuel Unit) × Current Process Efficiency

Proposed Electric Input = Convert to Billed Resource Units (Useful Process Heat / Proposed Coefficient of Performance or Efficiency, Electricity Unit)
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual process resource switch
│  ├─ Annual Billed Resource Use
│  │  ├─ Annual Electricity Use (Bill)
│  │  ├─ Annual Gas Use (Bill)
│  │  └─ Billing Period Coverage (Bill)
│  ├─ Process share of billed fuel (User)
│  ├─ Existing Process or Fuel Type (User)
│  ├─ Required Process Temperature (User)
│  ├─ Useful Process Load (User)
│  ├─ Existing Process Nameplate or Test Information (User)
│  ├─ Proposed technology (Linked Opportunity)
│  ├─ Proposed COP or efficiency (Linked Opportunity)
│  └─ Standard 1.1 — Industrial Process Electrification Engineering Calculation
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

**■ Standard 1.1 — Industrial Process Electrification Engineering Calculation**

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

* Process share of billed fuel
* Existing Process or Fuel Type
* Required Process Temperature
* Useful Process Load
* Existing Process Nameplate or Test Information
* Proposed technology
* Proposed COP or efficiency

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Process share of billed fuel; Existing Process or Fuel Type; Required Process Temperature.
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
