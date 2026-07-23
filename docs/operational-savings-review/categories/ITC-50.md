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
│  ├─ Documented Annual Activity per Unit in the Certified Test Unit from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
│  ├─ Documented Annual Idle Hours per Unit from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
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

* Existing active resource intensity
* Existing idle resource rate

**How to Use:**

1. Normalize the documented existing manufacturer and model for the high-efficiency commercial cooking equipment when it is available.
2. Search the applicable certification export for that exact model and filter by the displayed product type, capacity or size class, and native test procedure.
3. If an exact record is unavailable, select one context-matched existing-equipment benchmark from an authoritative historical or installed-stock source; never substitute the current efficient-product population for the installed baseline.
4. Return one selected existing active resource intensity; Existing idle resource rate.
5. Retain the dataset version, record identity or benchmark population, context filters, population size, selection rule, native fields, units, and fallback level.

**Automation:**

* **Selected Strategy:** Exact-record lookup followed by a context-matched installed-equipment benchmark for high-efficiency commercial cooking equipment.
* **Automation Method:** Normalize the submitted model, query the applicable certification export, and use one exact compatible native-unit record when available; otherwise apply reviewed installed-stock filters and select the official typical value, weighted median, or median.
* **Difficulty:** Medium

**Validation:**
The official certification access paths and native product-family fields were checked. Current efficient-product records do not represent the installed baseline. An exact documented existing model is preferred; when it is unavailable, a separately sourced context-matched installed-equipment benchmark is required. That benchmark adapter and the category golden test have not yet been added.

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

* Proposed active resource intensity
* Proposed idle resource rate

**How to Use:**

1. Read the exact manufacturer, model, and product configuration from the linked high-efficiency commercial cooking equipment opportunity.
2. Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.
3. Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.
4. Return proposed active resource intensity; Proposed idle resource rate.
5. Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Department of Energy - Compliance Certification Database records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Medium

**Validation:**
The official certification access path and applicable cooking equipment product-family fields were checked. Exact active-model matching is technically possible, but the category-specific adapter, retained product fixture, and golden test have not yet been added.

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

* Selected proposed active resource intensity
* Selected proposed idle resource rate

**How to Use:**

1. Extract the application, capacity, certification, and performance limits from the linked high-efficiency commercial cooking equipment opportunity requirements.
2. Filter the official current-product population by every mandatory requirement, product-family boundary, active specification, and native test unit.
3. Use the source's official recommended or typical value when it provides one; otherwise select the weighted median when valid weights exist, or the ordinary median of the eligible compatible population.
4. Return one selected selected proposed active resource intensity; Selected proposed idle resource rate without choosing a future contractor product arbitrarily.
5. Retain the source version, complete filters, eligible record identities, population size, native units, selection rule, selected value, and fallback level.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Department of Energy - Compliance Certification Database population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and select one official typical value, weighted median, or median in native units.
* **Difficulty:** Medium

**Validation:**
The official certification access path and applicable cooking equipment product-family filters were checked. Candidate-set automation is technically possible, but no retained category export proves the eligible population, filters, population size, or selected median result.
