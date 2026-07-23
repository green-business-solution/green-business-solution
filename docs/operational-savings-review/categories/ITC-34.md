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
│  │  ├─ Irrigation efficiency, if known (User)
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
* Irrigation efficiency, if known
* Controller treatment
* Site ZIP Code

**Value Needed:**

* Baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Approximate Landscape Area for Each Hydrozone; Recognizable Plant or Landscape Type for Each Hydrozone; Irrigation method.
2. Resolve climate data, validate hydrozone areas and plant factors, apply existing and proposed irrigation efficiencies, and compare the two annual design allowances.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Deterministic implementation of the versioned Water Budget Tool equations.
* **Automation Method:** Resolve climate data, validate hydrozone areas and plant factors, apply existing and proposed irrigation efficiencies, and compare the two annual design allowances.
* **Difficulty:** Medium

**Validation:**
The official Version 2.0 scope and equations were checked, and the retained fixture validates the design-method boundary. The tool compares designed allowances and does not prove actual existing consumption, irrigation scheduling, or whole-site bill allocation.
