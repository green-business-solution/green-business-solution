# Information Card — Efficient Ice Machine

**Retrofits included:** Efficient ice machine

**Overview:** An efficient ice machine uses less electricity and potable water for the same annual quantity and type of ice production.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × Annual Hundred-Pound Ice Units per Machine × ((Existing Electricity per 100 Pounds of Ice - Proposed Electricity per 100 Pounds of Ice) × Bill-Derived Electricity Rate + (Existing Water per 100 Pounds of Ice - Proposed Water per 100 Pounds of Ice) × Bill-Derived Water and Sewer Rate)

Annual Hundred-Pound Ice Units per Machine = Annual Ice Production per Machine / 100
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual ice-machine electricity and water reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Ice Machine Performance
│  │  ├─ Existing Ice Machine
│  │  │  ├─ Existing Ice Machine Type or Application (User)
│  │  │  ├─ Existing Make and Model, when available (User)
│  │  │  ├─ Existing Capacity or Size Class, when available (User)
│  │  │  └─ Standard 1.1 — Existing Ice Machine Rating Resolution
│  │  └─ Proposed Ice Machine
│  │     ├─ Linked Opportunity names an exact product
│  │     │  ├─ Exact Product Information (Linked Opportunity)
│  │     │  └─ Standard 1.2 — Exact Proposed Ice Machine Rating Lookup
│  │     └─ Linked Opportunity specifies requirements but no exact product
│  │        ├─ Product Requirements (Linked Opportunity)
│  │        └─ Standard 1.3 — Requirement-Based Proposed Ice Machine Resolution
│  ├─ Annual pounds of ice produced per machine (User)
│  └─ Certified Performance Difference (Derived)
└─ Applicable Resource Rates
   ├─ Bill-Derived Electricity Rate
   │  ├─ Electricity Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Generation Charges (Bill)
   │  └─ Avoidable Electricity Rate (Derived)
   ├─ Bill-Derived Water Rate
   │  ├─ Water Use and Unit (Bill)
   │  ├─ Variable Water Charges (Bill)
   │  └─ Avoidable Water Rate (Derived)
   └─ Bill-Derived Sewer Rate
      ├─ Sewer-Billed Water Use (Bill)
      ├─ Variable Sewer Charges (Bill)
      └─ Avoidable Sewer Rate (Derived)
```

**■ Standard 1.1 — Existing Ice Machine Rating Resolution**

**Purpose:**
Resolve the existing ice machine performance only from a documented exact model or retained certification record.

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

**Commercial ice machine dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ice-Machines/nak5-fsjf](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ice-Machines/nak5-fsjf)

**Lookup Inputs:**

* Existing ice machine type or application
* Existing make and model, when available
* Existing capacity or size class

**Value Needed:**

* Existing electricity use per 100 pounds of ice
* Existing potable water use per 100 pounds of ice

**How to Use:**

1. Normalize the documented existing manufacturer and model for the efficient ice machine when it is available.
2. Search the applicable certification export for that exact model and filter by the displayed product type, capacity or size class, and native test procedure.
3. If an exact record is unavailable, select one context-matched existing-equipment benchmark from an authoritative historical or installed-stock source; never substitute the current efficient-product population for the installed baseline.
4. Return one selected existing electricity use per 100 pounds of ice; Existing potable water use per 100 pounds of ice.
5. Retain the dataset version, record identity or benchmark population, context filters, population size, selection rule, native fields, units, and fallback level.

**Automation:**

* **Selected Strategy:** Exact-record lookup followed by a context-matched installed-equipment benchmark for efficient ice machine.
* **Automation Method:** Normalize the submitted model, query the applicable certification export, and use one exact compatible native-unit record when available; otherwise apply reviewed installed-stock filters and select the official typical value, weighted median, or median.
* **Difficulty:** Medium

**Validation:**
The official certification access paths and native product-family fields were checked. Current efficient-product records do not represent the installed baseline. An exact documented existing model is preferred; when it is unavailable, a separately sourced context-matched installed-equipment benchmark is required. That benchmark adapter and the category golden test have not yet been added.

**■ Standard 1.2 — Exact Proposed Ice Machine Rating Lookup**

**Purpose:**
Resolve proposed ice machine performance when the linked opportunity names an exact product.

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

**Commercial ice machine dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ice-Machines/nak5-fsjf](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ice-Machines/nak5-fsjf)

**Lookup Inputs:**

* Exact proposed make and model from the linked opportunity
* Product type and capacity
* Applicable certified test method

**Value Needed:**

* Proposed electricity use per 100 pounds of ice
* Proposed potable water use per 100 pounds of ice

**How to Use:**

1. Read the exact manufacturer, model, and product configuration from the linked efficient ice machine opportunity.
2. Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.
3. Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.
4. Return proposed electricity use per 100 pounds of ice; Proposed potable water use per 100 pounds of ice.
5. Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Department of Energy - Compliance Certification Database records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Medium

**Validation:**
The official certification access path and applicable ice machine product-family fields were checked. Exact active-model matching is technically possible, but the category-specific adapter, retained product fixture, and golden test have not yet been added.

**■ Standard 1.3 — Requirement-Based Proposed Ice Machine Resolution**

**Purpose:**
Interpret the linked opportunity requirements and determine whether they identify a compatible certified ice machine record.

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

**Commercial ice machine dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ice-Machines/nak5-fsjf](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ice-Machines/nak5-fsjf)

**Lookup Inputs:**

* Product requirements from the linked opportunity
* Required application and capacity
* Applicable efficiency or resource-use criteria

**Value Needed:**

* Selected proposed electricity use per 100 pounds of ice
* Selected proposed potable water use per 100 pounds of ice

**How to Use:**

1. Extract the application, capacity, certification, and performance limits from the linked efficient ice machine opportunity requirements.
2. Filter the official current-product population by every mandatory requirement, product-family boundary, active specification, and native test unit.
3. Use the source's official recommended or typical value when it provides one; otherwise select the weighted median when valid weights exist, or the ordinary median of the eligible compatible population.
4. Return one selected selected proposed electricity use per 100 pounds of ice; Selected proposed potable water use per 100 pounds of ice without choosing a future contractor product arbitrarily.
5. Retain the source version, complete filters, eligible record identities, population size, native units, selection rule, selected value, and fallback level.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Department of Energy - Compliance Certification Database population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and select one official typical value, weighted median, or median in native units.
* **Difficulty:** Medium

**Validation:**
The official certification access path and applicable ice machine product-family filters were checked. Candidate-set automation is technically possible, but no retained category export proves the eligible population, filters, population size, or selected median result.
