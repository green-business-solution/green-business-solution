# Information Card — Heat Pump Water Heater

**Retrofits included:** Heat pump water heater

**Overview:** A heat pump water heater replaces part or all of the existing water-heating fuel or electricity with efficient electric heat-pump operation.

**Broader Formula**

```text
Annual Operational Savings =
Avoided Existing Resource Cost − Added New Resource Cost
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Existing Resource × Existing Resource Rate - Added Electricity × Bill-Derived Electricity Rate

Annual Hot-Water Load = Convert to Common Energy Units (Current Annual Water-Heating Input, Existing Resource Unit) × Existing Efficiency

Avoided Existing Resource = Current Annual Water-Heating Input for a complete replacement of the allocated load.

Added Electricity = Annual Hot-Water Load / UEF Or COP Proposed
```

**Information Tree**

```text
Annual Operational Savings
├─ Avoided existing water-heating resource
│  ├─ Annual Billed Resource Use
│  │  ├─ Annual Electricity Use (Bill)
│  │  ├─ Annual Gas Use (Bill)
│  │  └─ Billing Period Coverage (Bill)
│  └─ Water-heating share, if known (User)
├─ Added heat-pump water-heater electricity
│  └─ Water Heater Performance
│     ├─ Existing Water Heater
│     │  ├─ Existing Water Heater Type or Application (User)
│     │  ├─ Existing Make and Model, when available (User)
│     │  ├─ Existing Capacity or Size Class, when available (User)
│     │  └─ Standard 1.1 — Existing Water Heater Rating Resolution
│     └─ Proposed Water Heater
│        ├─ Linked Opportunity names an exact product
│        │  ├─ Exact Product Information (Linked Opportunity)
│        │  └─ Standard 1.2 — Exact Proposed Water Heater Rating Lookup
│        └─ Linked Opportunity specifies requirements but no exact product
│           ├─ Product Requirements (Linked Opportunity)
│           └─ Standard 1.3 — Requirement-Based Proposed Water Heater Resolution
└─ Applicable Resource Rates
   ├─ Bill-Derived Electricity Rate
   │  ├─ Electricity Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Generation Charges (Bill)
   │  └─ Avoidable Electricity Rate (Derived)
   └─ Bill-Derived Gas Rate
      ├─ Gas Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Procurement Charges (Bill)
      └─ Avoidable Gas Rate (Derived)
```

**■ Standard 1.1 — Existing Water Heater Rating Resolution**

**Purpose:**
Resolve the existing water heater performance only from a documented exact model or retained certification record.

**Source:**
U.S. Department of Energy CCMS and U.S. Environmental Protection Agency ENERGY STAR Product Finder

**Compliance Certification Database:**
[https://www.regulations.doe.gov/certification-data/](https://www.regulations.doe.gov/certification-data/)

**CCMS and database description:**
[https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement](https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement)

**Product-specific certification and test-result templates:**
[https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results](https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results)

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**Lookup Inputs:**

* Existing water heater type or application
* Existing make and model, when available
* Existing capacity or size class

**Value Needed:**

* Existing certified water heater performance with its exact unit, or no value when no exact record is supported

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Existing water heater type or application; Existing make and model, when available; Existing capacity or size class.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return existing certified water heater performance with its exact unit, or no value when no exact record is supported.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.

**■ Standard 1.2 — Exact Proposed Water Heater Rating Lookup**

**Purpose:**
Resolve proposed water heater performance when the linked opportunity names an exact product.

**Source:**
U.S. Department of Energy CCMS and U.S. Environmental Protection Agency ENERGY STAR Product Finder

**Compliance Certification Database:**
[https://www.regulations.doe.gov/certification-data/](https://www.regulations.doe.gov/certification-data/)

**CCMS and database description:**
[https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement](https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement)

**Product-specific certification and test-result templates:**
[https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results](https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results)

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**Lookup Inputs:**

* Exact proposed make and model from the linked opportunity
* Product type and capacity
* Applicable certified test method

**Value Needed:**

* Proposed certified water heater performance with its exact unit

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Exact proposed make and model from the linked opportunity; Product type and capacity; Applicable certified test method.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return proposed certified water heater performance with its exact unit.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.

**■ Standard 1.3 — Requirement-Based Proposed Water Heater Resolution**

**Purpose:**
Interpret the linked opportunity requirements and determine whether they identify a compatible certified water heater record.

**Source:**
U.S. Department of Energy CCMS and U.S. Environmental Protection Agency ENERGY STAR Product Finder

**Compliance Certification Database:**
[https://www.regulations.doe.gov/certification-data/](https://www.regulations.doe.gov/certification-data/)

**CCMS and database description:**
[https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement](https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement)

**Product-specific certification and test-result templates:**
[https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results](https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results)

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**Lookup Inputs:**

* Product requirements from the linked opportunity
* Required application and capacity
* Applicable efficiency or resource-use criteria

**Value Needed:**

* One compatible proposed water heater result, or no value when the requirements do not identify a supported record

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Product requirements from the linked opportunity; Required application and capacity; Applicable efficiency or resource-use criteria.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return one compatible proposed water heater result, or no value when the requirements do not identify a supported record.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.
