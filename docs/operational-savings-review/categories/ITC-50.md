# Information Card — High-Efficiency Commercial Cooking Equipment

**Retrofits included:** High-efficiency fryer; High-efficiency oven; High-efficiency steamer

**Overview:** Efficient fryers, ovens, and steamers reduce active and idle electricity or gas use for the same certified cooking duty.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × Sum Across Resources of ((Annual Activity per Unit × (Existing Active Resource Intensity - Proposed Active Resource Intensity) + Annual Idle Hours × (Existing Idle Resource Rate - Proposed Idle Resource Rate)) × Bill-Derived Resource Rate)

Active Input Per Test Unit = Convert to Billed Resource Units (Useful Test Load Per Unit / Tested Cooking Efficiency, Resource Unit) when the certification reports efficiency rather than direct input intensity.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual commercial cooking resource reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Cooking Equipment Performance
│  │  ├─ Existing Cooking Equipment
│  │  │  ├─ Existing Cooking Equipment Type or Application (User)
│  │  │  ├─ Existing Make and Model, when available (User)
│  │  │  ├─ Existing Capacity or Size Class, when available (User)
│  │  │  └─ Standard 1.1 — Existing Cooking Equipment Rating Resolution
│  │  └─ Proposed Cooking Equipment
│  │     ├─ Linked Opportunity names an exact product
│  │     │  ├─ Exact Product Information (Linked Opportunity)
│  │     │  └─ Standard 1.2 — Exact Proposed Cooking Equipment Rating Lookup
│  │     └─ Linked Opportunity specifies requirements but no exact product
│  │        ├─ Product Requirements (Linked Opportunity)
│  │        └─ Standard 1.3 — Requirement-Based Proposed Cooking Equipment Resolution
│  ├─ Recognizable Cooking Usage Pattern (User)
│  ├─ Annual Activity per Unit in the Certified Test Unit (User)
│  ├─ Annual Idle Hours per Unit (User)
│  └─ Certified Performance Difference (Derived)
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

**■ Standard 1.1 — Existing Cooking Equipment Rating Resolution**

**Purpose:**
Resolve the existing cooking equipment performance only from a documented exact model or retained certification record.

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

**Commercial fryer dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Fryers/edi8-b5vk](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Fryers/edi8-b5vk)

**Commercial oven dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ovens/c8av-ccf7](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ovens/c8av-ccf7)

**Commercial steam cooker dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Steam-Cookers/vtsv-aq9u](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Steam-Cookers/vtsv-aq9u)

**Lookup Inputs:**

* Existing cooking equipment type or application
* Existing make and model, when available
* Existing capacity or size class

**Value Needed:**

* Existing certified cooking equipment performance with its exact unit, or no value when no exact record is supported

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Existing cooking equipment type or application; Existing make and model, when available; Existing capacity or size class.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return existing certified cooking equipment performance with its exact unit, or no value when no exact record is supported.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.

**■ Standard 1.2 — Exact Proposed Cooking Equipment Rating Lookup**

**Purpose:**
Resolve proposed cooking equipment performance when the linked opportunity names an exact product.

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

**Commercial fryer dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Fryers/edi8-b5vk](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Fryers/edi8-b5vk)

**Commercial oven dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ovens/c8av-ccf7](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ovens/c8av-ccf7)

**Commercial steam cooker dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Steam-Cookers/vtsv-aq9u](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Steam-Cookers/vtsv-aq9u)

**Lookup Inputs:**

* Exact proposed make and model from the linked opportunity
* Product type and capacity
* Applicable certified test method

**Value Needed:**

* Proposed certified cooking equipment performance with its exact unit

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Exact proposed make and model from the linked opportunity; Product type and capacity; Applicable certified test method.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return proposed certified cooking equipment performance with its exact unit.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.

**■ Standard 1.3 — Requirement-Based Proposed Cooking Equipment Resolution**

**Purpose:**
Interpret the linked opportunity requirements and determine whether they identify a compatible certified cooking equipment record.

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

**Commercial fryer dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Fryers/edi8-b5vk](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Fryers/edi8-b5vk)

**Commercial oven dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ovens/c8av-ccf7](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ovens/c8av-ccf7)

**Commercial steam cooker dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Steam-Cookers/vtsv-aq9u](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Steam-Cookers/vtsv-aq9u)

**Lookup Inputs:**

* Product requirements from the linked opportunity
* Required application and capacity
* Applicable efficiency or resource-use criteria

**Value Needed:**

* One compatible proposed cooking equipment result, or no value when the requirements do not identify a supported record

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Product requirements from the linked opportunity; Required application and capacity; Applicable efficiency or resource-use criteria.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return one compatible proposed cooking equipment result, or no value when the requirements do not identify a supported record.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.
