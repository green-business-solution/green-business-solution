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
├─ Annual Variable-Speed Electricity Reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Existing Equipment Nameplate and Load Information from Uploaded Audit or Measurement (Linked Opportunity)
│  ├─ Measured Load-Bin Profile
│  │  ├─ Load or Speed Fractions from Controls Trends or Engineering Audit (Linked Opportunity)
│  │  ├─ Annual Hours by Bin from Controls Trends or Engineering Audit (Linked Opportunity)
│  │  └─ No Load-Bin Estimate Without Measured or Audited Operating Data (Derived)
│  ├─ Proposed Minimum Speed and Control Rule (Linked Opportunity)
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
* Load or speed fraction for each bin from an uploaded site study, controls trend, or engineering audit
* Annual hours for each bin from an uploaded site study, controls trend, or engineering audit
* Proposed Minimum Speed
* Proposed control rule

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**How to Use:**

1. Load the Variable Frequency Drives and Pump or Fan Controls project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR Pumping System Assessment Tool for pumps or Fan System Assessment Tool for fans.
2. Run the pinned open-source Pumping System Assessment Tool for pumps or Fan System Assessment Tool for fans baseline and proposed cases using the category formula boundary shown in this card.
3. Return no result when the Pumping System Assessment Tool for pumps or Fan System Assessment Tool for fans requires a flow, pressure, load profile, duty point, efficiency, or schedule that is absent from the project evidence.
4. Return existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings.
5. Retain the MEASUR version, Pumping System Assessment Tool for pumps or Fan System Assessment Tool for fans input object, unit conversions, warnings, baseline and proposed outputs, and project-document provenance.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Pumping System Assessment Tool for pumps or Fan System Assessment Tool for fans for Variable Frequency Drives and Pump or Fan Controls.
* **Automation Method:** Map reviewed project evidence into the Pumping System Assessment Tool for pumps or Fan System Assessment Tool for fans input schema, execute the versioned local module, and preserve its warnings and native outputs without supplying missing design inputs.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
