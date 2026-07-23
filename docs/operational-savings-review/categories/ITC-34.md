# Information Card — Efficient Irrigation and Smart Controls

**Retrofits included:** Smart irrigation controller; Drip irrigation / efficient irrigation retrofit

**Overview:** Efficient irrigation methods and smart controls reduce the modeled landscape water allowance for the same climate and planted area.

**Broader Formula**

```text
Annual Operational Savings =
Annual Water Reduction × Bill-Derived Water Rate
```

**Expanded Formula**

```text
Annual Operational Savings = (Baseline Design Water Allowance - Proposed Design Water Allowance) × Bill-Derived Water Rate

Use the WaterSense Water Budget Tool equations with constant climate and landscape area across cases.

The result is a modeled design-allowance comparison, not measured existing operational consumption.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual irrigation water reduction
│  ├─ Site ZIP Code (Profile)
│  ├─ Repeatable hydrozone definition
│  │  ├─ Approximate Landscape Area for Each Hydrozone (User)
│  │  └─ Recognizable Plant or Landscape Type for Each Hydrozone (User)
│  ├─ Existing irrigation configuration
│  │  ├─ Irrigation method (User)
│  │  ├─ Documented Irrigation efficiency, if known from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  │  └─ Controller treatment (User)
│  ├─ Proposed irrigation configuration
│  │  ├─ Irrigation method (Linked Opportunity)
│  │  ├─ Irrigation efficiency, if known (Linked Opportunity)
│  │  └─ Controller treatment (Linked Opportunity)
│  └─ Standard 1.1 — Landscape Water Budget Calculation
└─ Applicable Resource Rates
   └─ Bill-Derived Water Rate
      ├─ Water Use and Unit (Bill)
      ├─ Variable Water Charges (Bill)
      └─ Avoidable Water Rate (Derived)
```

**■ Standard 1.1 — Landscape Water Budget Calculation**

**Purpose:**
Use U.S. Environmental Protection Agency - WaterSense Water Budget Tool to resolve baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance from the listed category inputs.

**Source:**
U.S. Environmental Protection Agency - WaterSense Water Budget Tool

**Water Budget Tool and data download:**
[https://www.epa.gov/watersense/water-budget-tool](https://www.epa.gov/watersense/water-budget-tool)

**Commercial outdoor-water tools:**
[https://www.epa.gov/watersense/tools-ci-facilities](https://www.epa.gov/watersense/tools-ci-facilities)

**Lookup Inputs:**

* Approximate Landscape Area for Each Hydrozone
* Recognizable Plant or Landscape Type for Each Hydrozone
* Irrigation method
* Irrigation efficiency, if known from a nameplate, measurement, audit, or contractor specification
* Controller treatment
* Site ZIP Code

**Value Needed:**

* Baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance

**Input Bindings:**

* Approximate Landscape Area for Each Hydrozone ← User at `Annual Operational Savings > Annual irrigation water reduction > Repeatable hydrozone definition > Approximate Landscape Area for Each Hydrozone`. Pass the exact bound Approximate Landscape Area for Each Hydrozone to Landscape Water Budget Calculation when computing Baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance; do not substitute a value from another tree path.
* Recognizable Plant or Landscape Type for Each Hydrozone ← User at `Annual Operational Savings > Annual irrigation water reduction > Repeatable hydrozone definition > Recognizable Plant or Landscape Type for Each Hydrozone`. Pass the exact bound Recognizable Plant or Landscape Type for Each Hydrozone to Landscape Water Budget Calculation when computing Baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance; do not substitute a value from another tree path.
* Irrigation method ← User at `Annual Operational Savings > Annual irrigation water reduction > Existing irrigation configuration > Irrigation method`. Pass the exact bound Irrigation method to Landscape Water Budget Calculation when computing Baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance; do not substitute a value from another tree path.
* Irrigation efficiency, if known from a nameplate, measurement, audit, or contractor specification ← Project Document at `Annual Operational Savings > Annual irrigation water reduction > Existing irrigation configuration > Documented Irrigation efficiency, if known from Nameplate, Measurement, Audit, or Contractor Specification`. Pass the exact bound Irrigation efficiency, if known from a nameplate, measurement, audit, or contractor specification to Landscape Water Budget Calculation when computing Baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance; do not substitute a value from another tree path.
* Controller treatment ← User at `Annual Operational Savings > Annual irrigation water reduction > Existing irrigation configuration > Controller treatment`. Pass the exact bound Controller treatment to Landscape Water Budget Calculation when computing Baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance; do not substitute a value from another tree path.
* Site ZIP Code ← Profile at `Annual Operational Savings > Annual irrigation water reduction > Site ZIP Code`. Pass the exact bound Site ZIP Code to Landscape Water Budget Calculation when computing Baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance; do not substitute a value from another tree path.

**Output Bindings:**

* Baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance → `baseline_design_allowance_gallons` (gallons/year; RECORD_SET) at `Annual Operational Savings > Annual irrigation water reduction > Standard 1.1 - Landscape Water Budget Calculation`.

**How to Use:**

1. Map the Efficient Irrigation and Smart Controls inputs to the documented Landscape Water Budget Calculation source fields or model inputs: Approximate Landscape Area for Each Hydrozone; Recognizable Plant or Landscape Type for Each Hydrozone; Irrigation method; Irrigation efficiency, if known from a nameplate, measurement, audit, or contractor specification; Controller treatment; Site ZIP Code.
2. Resolve climate data, validate hydrozone areas and plant factors, apply existing and proposed irrigation efficiencies, and compare the two annual design allowances.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance.
5. Retain the Landscape Water Budget Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Deterministic implementation of the versioned Water Budget Tool equations.
* **Automation Method:** Resolve climate data, validate hydrozone areas and plant factors, apply existing and proposed irrigation efficiencies, and compare the two annual design allowances.
* **Difficulty:** Medium

**Validation:**
The official Version 2.0 scope and equations were checked, and the retained fixture validates the design-method boundary. The tool compares designed allowances and does not prove actual existing consumption, irrigation scheduling, or whole-site bill allocation. The category adapter and formula-level golden test have not yet been added.
