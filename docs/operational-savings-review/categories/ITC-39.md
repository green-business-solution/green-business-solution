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
│  ├─ Existing Equipment Nameplate and Load Information from Uploaded Audit or Measurement (Project Document)
│  ├─ Measured Load-Bin Profile
│  │  ├─ Pump or Fan Application (User)
│  │  ├─ Business Activity (Profile)
│  │  ├─ Building Type (Profile)
│  │  ├─ Equipment Capacity Class (User)
│  │  ├─ Operating Schedule (User)
│  │  ├─ Site Location (Profile)
│  │  ├─ Load or Speed Fractions from Controls Trends or Engineering Audit (Project Document)
│  │  ├─ Annual Hours by Bin from Controls Trends or Engineering Audit (Project Document)
│  │  └─ Standard 1.1 — Pump or Fan Operating-Profile Benchmark
│  ├─ Equipment is a Pump
│  │  ├─ Required Flow and Total Dynamic Head from Engineering Assessment or Measurement (Project Document)
│  │  ├─ Pump Curve or Documented Operating Points (Project Document)
│  │  ├─ Proposed Minimum Speed and Pump Control Rule (Linked Opportunity)
│  │  └─ Standard 1.2 — Pump Variable-Speed Engineering Calculation
│  └─ Equipment is a Fan
│     ├─ Required Airflow and Pressure Rise from Engineering Assessment or Measurement (Project Document)
│     ├─ Fan Curve or Documented Operating Points (Project Document)
│     ├─ Proposed Minimum Speed and Fan Control Rule (Linked Opportunity)
│     └─ Standard 1.3 — Fan Variable-Speed Engineering Calculation
└─ Applicable Resource Rates
   └─ Bill-Derived Electricity Rate
      ├─ Electricity Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Generation Charges (Bill)
      └─ Avoidable Electricity Rate (Derived)
```

**■ Standard 1.1 — Pump or Fan Operating-Profile Benchmark**

**Purpose:**
Select one representative operating profile when controls trends, measurements, or an engineering audit do not provide load bins.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**ComStock data lake and documentation:**
[https://comstock.nrel.gov/](https://comstock.nrel.gov/)

**Lookup Inputs:**

* Pump or fan application
* Business activity
* Building type
* Equipment capacity class
* Operating schedule
* Site location

**Value Needed:**

* One normalized load or speed profile
* One annual-hours allocation across its bins

**How to Use:**

1. Map the Variable Frequency Drives and Pump or Fan Controls inputs to the documented Pump or Fan Operating-Profile Benchmark source fields or model inputs: Pump or fan application; Business activity; Building type; Equipment capacity class; Operating schedule; Site location.
2. Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected normalized load or speed profile; One annual-hours allocation across its bins.
5. Retain the Pump or Fan Operating-Profile Benchmark source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
DOE building-load data can support application-specific operating-profile populations after equipment, building, schedule, climate, and geography filters are implemented. No retained eligible population currently proves those filters, so the benchmark adapter remains implementation-pending.

**■ Standard 1.2 — Pump Variable-Speed Engineering Calculation**

**Purpose:**
Calculate pump electricity for the documented baseline and variable-speed proposal with the MEASUR Pumping System Assessment Tool.

**Source:**
U.S. Department of Energy - MEASUR

**Calculator list and descriptions:**
[https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions](https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions)

**ORNL MEASUR source repository:**
[https://github.com/ORNL-AMO/AMO-Tools-Desktop](https://github.com/ORNL-AMO/AMO-Tools-Desktop)

**Lookup Inputs:**

* In-scope pump count
* Pump nameplate and measured input from a Project Document
* Required flow and total dynamic head from a Project Document
* Pump curve or documented operating points
* Load or speed fractions from a Project Document
* Annual hours by bin from a Project Document
* Normalized load or speed profile from the connected operating-profile benchmark
* Annual-hours allocation from the connected operating-profile benchmark
* Proposed minimum speed and pump control rule from the linked opportunity

**Value Needed:**

* Existing pump input power by load bin
* Proposed pump input power by load bin

**How to Use:**

1. Map documented pump flow, total dynamic head, pump curve or operating points, motor and drive data, and baseline schedule into the Pumping System Assessment Tool input schema.
2. Use the measured load or speed profile when available; otherwise use the one context-matched pump profile from the connected benchmark.
3. Apply the opportunity-prescribed minimum speed and pump control rule to the proposed case.
4. Run one pinned baseline and proposed Pumping System Assessment Tool case and return one annual electricity reduction.
5. Retain the MEASUR version, exact input object, unit conversions, benchmark provenance, warnings, and both annual results.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Pumping System Assessment Tool.
* **Automation Method:** Validate the pump-specific hydraulic and operating inputs, resolve one profile, run the versioned pump module, and preserve the complete input and output trace.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR calculator list identifies the Pumping System Assessment Tool and the open-source implementation is available. The exact input mapping and category golden example have not yet been pinned, so module-level execution proof remains pending.

**■ Standard 1.3 — Fan Variable-Speed Engineering Calculation**

**Purpose:**
Calculate fan electricity for the documented baseline and variable-speed proposal with the MEASUR Fan System Assessment Tool.

**Source:**
U.S. Department of Energy - MEASUR

**Calculator list and descriptions:**
[https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions](https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions)

**ORNL MEASUR source repository:**
[https://github.com/ORNL-AMO/AMO-Tools-Desktop](https://github.com/ORNL-AMO/AMO-Tools-Desktop)

**Lookup Inputs:**

* In-scope fan count
* Fan nameplate and measured input from a Project Document
* Required airflow and pressure rise from a Project Document
* Fan curve or documented operating points
* Load or speed fractions from a Project Document
* Annual hours by bin from a Project Document
* Normalized load or speed profile from the connected operating-profile benchmark
* Annual-hours allocation from the connected operating-profile benchmark
* Proposed minimum speed and fan control rule from the linked opportunity

**Value Needed:**

* Existing fan input power by load bin
* Proposed fan input power by load bin

**How to Use:**

1. Map documented fan airflow, pressure rise, fan curve or operating points, motor and drive data, and baseline schedule into the Fan System Assessment Tool input schema.
2. Use the measured load or speed profile when available; otherwise use the one context-matched fan profile from the connected benchmark.
3. Apply the opportunity-prescribed minimum speed and fan control rule to the proposed case.
4. Run one pinned baseline and proposed Fan System Assessment Tool case and return one annual electricity reduction.
5. Retain the MEASUR version, exact input object, unit conversions, benchmark provenance, warnings, and both annual results.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Fan System Assessment Tool.
* **Automation Method:** Validate the fan-specific aerodynamic and operating inputs, resolve one profile, run the versioned fan module, and preserve the complete input and output trace.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR calculator list identifies the Fan System Assessment Tool and the open-source implementation is available. The exact input mapping and category golden example have not yet been pinned, so module-level execution proof remains pending.
