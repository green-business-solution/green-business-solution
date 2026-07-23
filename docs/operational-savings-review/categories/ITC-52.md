# Information Card — High-Efficiency Commercial Dishwasher

**Retrofits included:** High-efficiency commercial dishwasher

**Overview:** An efficient commercial dishwasher reduces water, water-heating input, and idle electricity for the same certified washing activity.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Water × Bill-Derived Water and Sewer Rate + Sum Across Resources of (Avoided Water-Heating Resource × Bill-Derived Resource Rate) + Avoided Idle Electricity × Bill-Derived Electricity Rate

Avoided Water = In-Scope Equipment Count × Annual Racks per Unit × (Existing Water per Rack - Proposed Water per Rack)

Avoided Water-Heating Resource = In-Scope Equipment Count × Annual Racks per Unit × (Existing Water-Heating Resource per Rack - Proposed Water-Heating Resource per Rack)

Avoided Idle Electricity = In-Scope Equipment Count × Annual Idle Hours per Unit × (Existing Idle Power - Proposed Idle Power)

Annual Idle Hours per Unit may be confirmed directly or derived as Annual Energized Hours per Unit - Annual Active Wash Hours per Unit.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual commercial dishwasher resource reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Commercial Dishwasher Performance
│  │  ├─ Existing Commercial Dishwasher
│  │  │  ├─ Existing Commercial Dishwasher Type or Application (User)
│  │  │  ├─ Existing Make and Model, when available (User)
│  │  │  ├─ Existing Capacity or Size Class, when available (User)
│  │  │  └─ Standard 1.1 — Existing Commercial Dishwasher Rating Resolution
│  │  └─ Proposed Commercial Dishwasher
│  │     ├─ Linked Opportunity names an exact product
│  │     │  ├─ Exact Product Information (Linked Opportunity)
│  │     │  └─ Standard 1.2 — Exact Proposed Commercial Dishwasher Rating Lookup
│  │     └─ Linked Opportunity specifies requirements but no exact product
│  │        ├─ Product Requirements (Linked Opportunity)
│  │        └─ Standard 1.3 — Requirement-Based Proposed Commercial Dishwasher Resolution
│  ├─ Recognizable Dishwasher Usage Pattern (User)
│  ├─ Annual Racks or Operating Hours in the Certified Test Unit (User)
│  ├─ Annual Idle Hours per Unit, if known (User)
│  ├─ Water-heating resources represented by the per-rack inputs (User)
│  ├─ Existing purchased water-heating input per certified rack by resource (User)
│  ├─ Proposed purchased water-heating input per certified rack by resource (Linked Opportunity)
│  └─ Certified Performance Difference (Derived)
└─ Applicable Resource Rates
   ├─ Bill-Derived Electricity Rate
   │  ├─ Electricity Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Generation Charges (Bill)
   │  └─ Avoidable Electricity Rate (Derived)
   ├─ Bill-Derived Gas Rate
   │  ├─ Gas Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Procurement Charges (Bill)
   │  └─ Avoidable Gas Rate (Derived)
   ├─ Bill-Derived Water Rate
   │  ├─ Water Use and Unit (Bill)
   │  ├─ Variable Water Charges (Bill)
   │  └─ Avoidable Water Rate (Derived)
   └─ Bill-Derived Sewer Rate
      ├─ Sewer-Billed Water Use (Bill)
      ├─ Variable Sewer Charges (Bill)
      └─ Avoidable Sewer Rate (Derived)
```

**■ Standard 1.1 — Existing Commercial Dishwasher Rating Resolution**

**Purpose:**
Resolve the existing commercial dishwasher performance only from a documented exact model or retained certification record.

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

**Commercial dishwasher dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8)

**Lookup Inputs:**

* Existing commercial dishwasher type or application
* Existing make and model, when available
* Existing capacity or size class

**Value Needed:**

* Existing certified commercial dishwasher performance with its exact unit, or no value when no exact record is supported

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Existing commercial dishwasher type or application; Existing make and model, when available; Existing capacity or size class.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return existing certified commercial dishwasher performance with its exact unit, or no value when no exact record is supported.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official commercial dishwasher dataset was checked, and the retained fixture validates its source schema, units, source version, water-per-cycle field, and idle-energy fields. Existing installed-equipment baselines, annual rack activity, and the complete category adapter remain unverified.

**■ Standard 1.2 — Exact Proposed Commercial Dishwasher Rating Lookup**

**Purpose:**
Resolve proposed commercial dishwasher performance when the linked opportunity names an exact product.

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

**Commercial dishwasher dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8)

**Lookup Inputs:**

* Exact proposed make and model from the linked opportunity
* Product type and capacity
* Applicable certified test method

**Value Needed:**

* Proposed certified commercial dishwasher performance with its exact unit

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Exact proposed make and model from the linked opportunity; Product type and capacity; Applicable certified test method.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return proposed certified commercial dishwasher performance with its exact unit.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official commercial dishwasher dataset was checked, and the retained fixture validates its source schema, units, source version, water-per-cycle field, and idle-energy fields. Existing installed-equipment baselines, annual rack activity, and the complete category adapter remain unverified.

**■ Standard 1.3 — Requirement-Based Proposed Commercial Dishwasher Resolution**

**Purpose:**
Interpret the linked opportunity requirements and determine whether they identify a compatible certified commercial dishwasher record.

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

**Commercial dishwasher dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8)

**Lookup Inputs:**

* Product requirements from the linked opportunity
* Required application and capacity
* Applicable efficiency or resource-use criteria

**Value Needed:**

* One compatible proposed commercial dishwasher result, or no value when the requirements do not identify a supported record

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Product requirements from the linked opportunity; Required application and capacity; Applicable efficiency or resource-use criteria.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return one compatible proposed commercial dishwasher result, or no value when the requirements do not identify a supported record.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official commercial dishwasher dataset was checked, and the retained fixture validates its source schema, units, source version, water-per-cycle field, and idle-energy fields. Existing installed-equipment baselines, annual rack activity, and the complete category adapter remain unverified.
