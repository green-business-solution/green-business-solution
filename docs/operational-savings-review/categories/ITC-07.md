# Information Card — High-Efficiency Gas Water Heater

**Retrofits included:** High-efficiency gas water heater

**Overview:** A higher-efficiency gas water heater reduces the gas required to deliver the same annual hot-water load.

**Broader Formula**

```text
Annual Operational Savings =
Annual Gas Reduction × Bill-Derived Gas Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Current Annual Gas Use × (1 - Existing Efficiency / Proposed Efficiency) × Bill-Derived Gas Rate
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual gas reduction
│  ├─ Current annual water-heating gas
│  │  ├─ Annual Billed Resource Use
│  │  │  ├─ Annual Gas Use (Bill)
│  │  │  └─ Billing Period Coverage (Bill)
│  │  └─ Water-heating share, if known (User)
│  └─ Gas Water Heater Performance
│     ├─ Existing Gas Water Heater
│     │  ├─ Existing Gas Water Heater Type or Application (User)
│     │  ├─ Existing Make and Model, when available (User)
│     │  ├─ Existing Capacity or Size Class, when available (User)
│     │  └─ Standard 1.1 — Existing Gas Water Heater Rating Resolution
│     └─ Proposed Gas Water Heater
│        ├─ Linked Opportunity names an exact product
│        │  ├─ Exact Product Information (Linked Opportunity)
│        │  └─ Standard 1.2 — Exact Proposed Gas Water Heater Rating Lookup
│        └─ Linked Opportunity specifies requirements but no exact product
│           ├─ Product Requirements (Linked Opportunity)
│           └─ Standard 1.3 — Requirement-Based Proposed Gas Water Heater Resolution
└─ Applicable Resource Rates
   └─ Bill-Derived Gas Rate
      ├─ Gas Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Procurement Charges (Bill)
      └─ Avoidable Gas Rate (Derived)
```

**■ Standard 1.1 — Existing Gas Water Heater Rating Resolution**

**Purpose:**
Resolve the existing gas water heater performance only from a documented exact model or retained certification record.

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

* Existing gas water heater type or application
* Existing make and model, when available
* Existing capacity or size class

**Value Needed:**

* Existing certified gas water heater performance with its exact unit, or no value when no exact record is supported

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Existing gas water heater type or application; Existing make and model, when available; Existing capacity or size class.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return existing certified gas water heater performance with its exact unit, or no value when no exact record is supported.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.

**■ Standard 1.2 — Exact Proposed Gas Water Heater Rating Lookup**

**Purpose:**
Resolve proposed gas water heater performance when the linked opportunity names an exact product.

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

* Proposed certified gas water heater performance with its exact unit

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Exact proposed make and model from the linked opportunity; Product type and capacity; Applicable certified test method.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return proposed certified gas water heater performance with its exact unit.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.

**■ Standard 1.3 — Requirement-Based Proposed Gas Water Heater Resolution**

**Purpose:**
Interpret the linked opportunity requirements and determine whether they identify a compatible certified gas water heater record.

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

* One compatible proposed gas water heater result, or no value when the requirements do not identify a supported record

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Product requirements from the linked opportunity; Required application and capacity; Applicable efficiency or resource-use criteria.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return one compatible proposed gas water heater result, or no value when the requirements do not identify a supported record.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.
