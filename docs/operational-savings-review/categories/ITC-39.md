# Information Card — Variable Frequency Drives and Pump or Fan Controls

**Retrofits included:** Variable frequency drive retrofit; Pump/fan controls retrofit

**Overview:** Variable-speed controls reduce pump or fan electricity by matching equipment speed and input power to the annual load profile.

**Broader Formula**

```text
Annual Operational Savings =
Annual Electricity Reduction × Bill-Derived Electricity Rate
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × Sum Across Load Bins of Annual Hours in Each Load Bin × (Existing Input Power in Each Load Bin - Proposed Input Power in Each Load Bin) × Bill-Derived Electricity Rate

MEASUR must return existing and proposed input kW for every bin from a pinned calculator and complete project inputs.
No standalone cube-law adjustment is approved without the exact shaft-power and drive-efficiency boundary.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual variable-speed electricity reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Existing Equipment Nameplate and Load Information (User)
│  ├─ Repeatable load-bin profile
│  │  ├─ Load or speed fraction for each bin (User)
│  │  └─ Annual hours for each bin (User)
│  ├─ Proposed Minimum Speed (Linked Opportunity)
│  ├─ Proposed control rule (Linked Opportunity)
│  └─ Standard 1.1 — Variable Frequency Drives and Pump or Fan Controls Engineering Calculation
└─ Applicable Resource Rates
   └─ Bill-Derived Electricity Rate
      ├─ Electricity Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Generation Charges (Bill)
      └─ Avoidable Electricity Rate (Derived)
```

**■ Standard 1.1 — Variable Frequency Drives and Pump or Fan Controls Engineering Calculation**

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
* Existing Equipment Nameplate and Load Information
* Load or speed fraction for each bin
* Annual hours for each bin
* Proposed Minimum Speed
* Proposed control rule

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: In-Scope Equipment Count; Existing Equipment Nameplate and Load Information; Load or speed fraction for each bin.
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
