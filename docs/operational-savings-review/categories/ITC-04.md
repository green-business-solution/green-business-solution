# Information Card — Boiler Controls and Burner Improvements

**Retrofits included:** Boiler controls / burner retrofit

**Overview:** Improved boiler controls and burner operation reduce fuel use by changing how the boiler responds to load and operating conditions.

**Broader Formula**

```text
Annual Operational Savings =
Annual Gas Reduction × Bill-Derived Gas Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Annual Boiler Fuel Use × Control Resource-Reduction Fraction × Bill-Derived Gas Rate

Control Resource-Reduction Fraction = 1 - Proposed Annual Fuel / Baseline Annual Fuel
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual fuel reduction
│  ├─ Annual boiler fuel
│  │  ├─ Annual Billed Resource Use
│  │  │  ├─ Annual Gas Use (Bill)
│  │  │  └─ Billing Period Coverage (Bill)
│  │  └─ Boiler share of billed fuel (User)
│  ├─ Existing control sequence (User)
│  ├─ Proposed control sequence (User)
│  └─ Standard 1.1 — Boiler Controls and Burner Improvements Engineering Calculation
└─ Applicable Resource Rates
   └─ Bill-Derived Gas Rate
      ├─ Gas Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Procurement Charges (Bill)
      └─ Avoidable Gas Rate (Derived)
```

**■ Standard 1.1 — Boiler Controls and Burner Improvements Engineering Calculation**

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

* Boiler share of billed fuel
* Existing control sequence
* Proposed control sequence

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Boiler share of billed fuel; Existing control sequence; Proposed control sequence.
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
