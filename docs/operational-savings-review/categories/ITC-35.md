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
│  ├─ Measured leak flow (User)
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

* Measured leak flow
* Confirmed leak start date
* Confirmed repair date

**Value Needed:**

* Annual avoidable water for the selected commercial-facility equation, with measured inputs, units, and dates

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Measured leak flow; Confirmed leak start date; Confirmed repair date.
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
