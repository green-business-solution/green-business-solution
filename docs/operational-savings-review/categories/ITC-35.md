# Information Card — Measured Water Leak Repair

**Retrofits included:** Leak detection system

**Overview:** A leak detection system produces attributable water savings only after a measured leak is identified and repaired.

**Broader Formula**

```text
Annual Operational Savings =
Annual Water Reduction × Applicable Bill-Derived Water and Sewer Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Measured Leak Flow × Confirmed Annual Leak Duration × Bill-Derived Water and Sewer Rate
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual measured leak water reduction
│  ├─ Documented Measured leak flow from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  ├─ Confirmed leak start date (User)
│  ├─ Confirmed repair date (User)
│  └─ Standard 1.1 — WaterSense Commercial Operations Calculation
└─ Applicable Resource Rates
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
Use U.S. Environmental Protection Agency - WaterSense at Work to resolve measured leak flow; Confirmed annual leak duration from the listed category inputs.

**Source:**
U.S. Environmental Protection Agency - WaterSense at Work

**WaterSense at Work best-management practices:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**Tools for commercial and institutional facilities:**
[https://www.epa.gov/watersense/tools-ci-facilities](https://www.epa.gov/watersense/tools-ci-facilities)

**Lookup Inputs:**

* Measured leak flow from a nameplate, measurement, audit, or contractor specification
* Confirmed leak start date

**Value Needed:**

* Measured leak flow
* Confirmed annual leak duration

**How to Use:**

1. Map the Measured Water Leak Repair inputs to the documented WaterSense Commercial Operations Calculation source fields or model inputs: Measured leak flow from a nameplate, measurement, audit, or contractor specification; Confirmed leak start date.
2. Validate measured project inputs, apply the selected equation with explicit units and dates, reject missing physical observations, and return annual avoidable water.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected measured leak flow; Confirmed annual leak duration.
5. Retain the WaterSense Commercial Operations Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Deterministic implementation of the exact applicable WaterSense commercial-facility equation.
* **Automation Method:** Validate measured project inputs, apply the selected equation with explicit units and dates, reject missing physical observations, and return annual avoidable water.
* **Difficulty:** Medium

**Validation:**
The official commercial best-practice and facility-tool pages were checked. Exact page, equation, and worked-example fixtures have not yet been retained, so the process cannot use generic site defaults or claim an executable default path.
