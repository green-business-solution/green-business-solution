# Information Card — High-Efficiency Furnace Replacement

**Retrofits included:** High-efficiency furnace retrofit

**Overview:** A high-efficiency furnace supplies the same heating service with less annual fuel by improving the certified conversion efficiency.

**Broader Formula**

```text
Annual Operational Savings =
Annual Gas Reduction × Bill-Derived Gas Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Current Annual Fuel Use × (1 - Existing Efficiency / Proposed Efficiency) × Bill-Derived Gas Rate

Current Annual Fuel Use = Measured Equipment Fuel Use or a user-confirmed allocation of Annual Billed Resource Use.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual fuel reduction
│  ├─ Current annual furnace fuel
│  │  ├─ Annual Billed Resource Use
│  │  │  ├─ Annual Gas Use (Bill)
│  │  │  └─ Billing Period Coverage (Bill)
│  │  └─ Documented Furnace share of billed fuel, if known from Submeter, Controls Trend, Audit, or Contractor Specification (Linked Opportunity)
│  └─ Furnace Performance
│     ├─ Existing Furnace
│     │  ├─ Existing Furnace Type or Application (User)
│     │  ├─ Existing Make and Model, when available (User)
│     │  ├─ Existing Capacity or Size Class, when available (User)
│     │  └─ Standard 1.1 — Existing Furnace Rating Resolution
│     └─ Proposed Furnace
│        ├─ Linked Opportunity names an exact product
│        │  ├─ Exact Product Information (Linked Opportunity)
│        │  └─ Standard 1.2 — Exact Proposed Furnace Rating Lookup
│        └─ Linked Opportunity specifies requirements but no exact product
│           ├─ Product Requirements (Linked Opportunity)
│           └─ Standard 1.3 — Requirement-Based Proposed Furnace Resolution
└─ Applicable Resource Rates
   └─ Bill-Derived Gas Rate
      ├─ Gas Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Procurement Charges (Bill)
      └─ Avoidable Gas Rate (Derived)
```

**■ Standard 1.1 — Existing Furnace Rating Resolution**

**Purpose:**
Resolve the existing furnace performance only from a documented exact model or retained certification record.

**Source:**
U.S. Department of Energy - Compliance Certification Database

**Compliance Certification Database:**
[https://www.regulations.doe.gov/certification-data/](https://www.regulations.doe.gov/certification-data/)

**CCMS and database description:**
[https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement](https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement)

**Product-specific certification and test-result templates:**
[https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results](https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results)

**Lookup Inputs:**

* Existing furnace type or application
* Existing make and model, when available
* Existing capacity or size class

**Value Needed:**

* Existing certified furnace performance with its exact unit, or no value when no exact record is supported

**How to Use:**

1. Normalize the documented existing manufacturer and model for the high-efficiency furnace replacement; do not infer a rating from equipment type alone.
2. Search the applicable certification export for that exact model and filter by the displayed product type, capacity or size class, and native test procedure.
3. Require one compatible record; return no existing rating when the model is absent, ambiguous, inactive, or from a different product family.
4. Return existing certified furnace performance with its exact unit, or no value when no exact record is supported without substituting a current efficient-product distribution for the installed baseline.
5. Retain the dataset version, record identity, native field names, units, model match, and rejection reason.

**Automation:**

* **Selected Strategy:** Exact-record lookup for documented existing high-efficiency furnace replacement models only.
* **Automation Method:** Normalize the submitted model, query the applicable certification export, apply product-family and capacity filters, and accept only one native-unit record.
* **Difficulty:** Medium

**Validation:**
The official certification access paths and native product-family fields were checked. Current efficient-product records do not represent the installed baseline, so this process may use only one documented exact existing model. The category-specific exact-record adapter and golden test have not yet been added.

**■ Standard 1.2 — Exact Proposed Furnace Rating Lookup**

**Purpose:**
Resolve proposed furnace performance when the linked opportunity names an exact product.

**Source:**
U.S. Department of Energy - Compliance Certification Database

**Compliance Certification Database:**
[https://www.regulations.doe.gov/certification-data/](https://www.regulations.doe.gov/certification-data/)

**CCMS and database description:**
[https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement](https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement)

**Product-specific certification and test-result templates:**
[https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results](https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results)

**Lookup Inputs:**

* Exact proposed make and model from the linked opportunity
* Product type and capacity
* Applicable certified test method

**Value Needed:**

* Proposed certified furnace performance with its exact unit

**How to Use:**

1. Read the exact manufacturer, model, and product configuration from the linked high-efficiency furnace replacement opportunity.
2. Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.
3. Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.
4. Return proposed certified furnace performance with its exact unit.
5. Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Department of Energy - Compliance Certification Database records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Medium

**Validation:**
The official certification access path and applicable furnace product-family fields were checked. Exact active-model matching is technically possible, but the category-specific adapter, retained product fixture, and golden test have not yet been added.

**■ Standard 1.3 — Requirement-Based Proposed Furnace Resolution**

**Purpose:**
Interpret the linked opportunity requirements and determine whether they identify a compatible certified furnace record.

**Source:**
U.S. Department of Energy - Compliance Certification Database

**Compliance Certification Database:**
[https://www.regulations.doe.gov/certification-data/](https://www.regulations.doe.gov/certification-data/)

**CCMS and database description:**
[https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement](https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement)

**Product-specific certification and test-result templates:**
[https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results](https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results)

**Lookup Inputs:**

* Product requirements from the linked opportunity
* Required application and capacity
* Applicable efficiency or resource-use criteria

**Value Needed:**

* Eligible compatible proposed furnace population with documented low, median, and high native-unit performance, or no value when no compatible record remains

**How to Use:**

1. Extract the application, capacity, certification, and performance limits from the linked high-efficiency furnace replacement opportunity requirements.
2. Filter the official current-product population by every mandatory requirement, product-family boundary, active specification, and native test unit.
3. Reject the path when no compatible record remains; when several records remain, keep the eligible population and calculate a documented low, median, and high value without selecting the contractor's future product.
4. Return eligible compatible proposed furnace population with documented low, median, and high native-unit performance, or no value when no compatible record remains.
5. Retain the source version, complete filters, eligible record identities, population size, native units, summary rule, and no-result reason.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Department of Energy - Compliance Certification Database population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and calculate deterministic low, median, and high native-unit results.
* **Difficulty:** Medium

**Validation:**
The official certification access path and applicable furnace product-family filters were checked. Candidate-set automation is technically possible, but no retained category export proves the eligible population, filters, population size, or low, median, and high result.
