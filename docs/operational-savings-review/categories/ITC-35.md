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
│  ├─ Documented Measured leak flow from Nameplate, Measurement, Audit, or Contractor Specification (Linked Opportunity)
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
Use U.S. Environmental Protection Agency - WaterSense at Work to resolve annual avoidable water for the selected commercial-facility equation, with measured inputs, units, and dates from the listed category inputs.

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

* Annual avoidable water for the selected commercial-facility equation, with measured inputs, units, and dates

**How to Use:**

1. Map the Measured Water Leak Repair inputs to the documented WaterSense Commercial Operations Calculation source fields or model inputs: Measured leak flow from a nameplate, measurement, audit, or contractor specification; Confirmed leak start date.
2. Validate measured project inputs, apply the selected equation with explicit units and dates, reject missing physical observations, and return annual avoidable water.
3. Reject the Measured Water Leak Repair path when a required source field, project design input, compatible record, or native unit is absent; do not insert a cross-category default.
4. Return annual avoidable water for the selected commercial-facility equation, with measured inputs, units, and dates.
5. Retain the WaterSense Commercial Operations Calculation source version, exact fields or model inputs, native units, selected records, warnings, and category-specific rejection reason.

**Automation:**

* **Selected Strategy:** Deterministic implementation of the exact applicable WaterSense commercial-facility equation.
* **Automation Method:** Validate measured project inputs, apply the selected equation with explicit units and dates, reject missing physical observations, and return annual avoidable water.
* **Difficulty:** Medium

**Validation:**
The official commercial best-practice and facility-tool pages were checked. Exact page, equation, and worked-example fixtures have not yet been retained, so the process cannot use generic site defaults or claim an executable default path.
