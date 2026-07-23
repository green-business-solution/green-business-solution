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
│  │  └─ Documented Furnace share of billed fuel, if known from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
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

* One selected existing furnace performance value with its exact unit and provenance

**Input Bindings:**

* Existing furnace type or application ← User at `Annual Operational Savings > Annual fuel reduction > Furnace Performance > Existing Furnace > Existing Furnace Type or Application`. Pass the exact bound Existing furnace type or application to Existing Furnace Rating Resolution when computing One selected existing furnace performance value with its exact unit and provenance; do not substitute a value from another tree path.
* Existing make and model, when available ← User at `Annual Operational Savings > Annual fuel reduction > Furnace Performance > Existing Furnace > Existing Make and Model, when available`. Pass the exact bound Existing make and model, when available to Existing Furnace Rating Resolution when computing One selected existing furnace performance value with its exact unit and provenance; do not substitute a value from another tree path.
* Existing capacity or size class ← User at `Annual Operational Savings > Annual fuel reduction > Furnace Performance > Existing Furnace > Existing Capacity or Size Class, when available`. Pass the exact bound Existing capacity or size class to Existing Furnace Rating Resolution when computing One selected existing furnace performance value with its exact unit and provenance; do not substitute a value from another tree path.

**Output Bindings:**

* One selected existing furnace performance value with its exact unit and provenance → `η_existing` (fraction; PROJECT_TOTAL) at `Annual Operational Savings > Annual fuel reduction > Furnace Performance > Existing Furnace > Standard 1.1 - Existing Furnace Rating Resolution`.

**How to Use:**

1. Normalize the documented existing manufacturer and model for the high-efficiency furnace replacement when it is available.
2. Search the applicable certification export for that exact model and filter by the displayed product type, capacity or size class, and native test procedure.
3. If an exact record is unavailable, select one context-matched existing-equipment benchmark from an authoritative historical or installed-stock source; never substitute the current efficient-product population for the installed baseline.
4. Return one selected existing furnace performance value with its exact unit and provenance.
5. Retain the dataset version, record identity or benchmark population, context filters, population size, selection rule, native fields, units, and fallback level.

**Automation:**

* **Selected Strategy:** Exact-record lookup followed by a context-matched installed-equipment benchmark for high-efficiency furnace replacement.
* **Automation Method:** Normalize the submitted model, query the applicable certification export, and use one exact compatible native-unit record when available; otherwise apply reviewed installed-stock filters and select the official typical value, weighted median, or median.
* **Difficulty:** Medium

**Validation:**
The official certification access paths and native product-family fields were checked. Current efficient-product records do not represent the installed baseline. An exact documented existing model is preferred; when it is unavailable, a separately sourced context-matched installed-equipment benchmark is required. That benchmark adapter and the category golden test have not yet been added.

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

**Input Bindings:**

* Exact proposed make and model from the linked opportunity ← Linked Opportunity at `Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity names an exact product > Exact Product Information`. Apply the exact bound Exact proposed make and model from the linked opportunity to resolve and validate the authoritative record before Exact Proposed Furnace Rating Lookup emits Proposed certified furnace performance with its exact unit.
* Product type and capacity ← Linked Opportunity at `Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity names an exact product > Exact Product Information`. Apply the exact bound Product type and capacity to resolve and validate the authoritative record before Exact Proposed Furnace Rating Lookup emits Proposed certified furnace performance with its exact unit.
* Applicable certified test method ← Linked Opportunity at `Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity names an exact product > Exact Product Information`. Apply the exact bound Applicable certified test method to resolve and validate the authoritative record before Exact Proposed Furnace Rating Lookup emits Proposed certified furnace performance with its exact unit.

**Output Bindings:**

* Proposed certified furnace performance with its exact unit → `η_existing` (fraction; RECORD_SET) at `Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity names an exact product > Standard 1.2 - Exact Proposed Furnace Rating Lookup`.

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

* One selected proposed furnace native-unit performance value, with the compatible population, filters, population size, and selection rule retained internally

**Input Bindings:**

* Product requirements from the linked opportunity ← Linked Opportunity at `Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity specifies requirements but no exact product > Product Requirements`. Apply the exact bound Product requirements from the linked opportunity as a compatibility filter before Requirement-Based Proposed Furnace Resolution emits One selected proposed furnace native-unit performance value, with the compatible population, filters, population size, and selection rule retained internally.
* Required application and capacity ← Linked Opportunity at `Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity specifies requirements but no exact product > Product Requirements`. Apply the exact bound Required application and capacity as a compatibility filter before Requirement-Based Proposed Furnace Resolution emits One selected proposed furnace native-unit performance value, with the compatible population, filters, population size, and selection rule retained internally.
* Applicable efficiency or resource-use criteria ← Linked Opportunity at `Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity specifies requirements but no exact product > Product Requirements`. Apply the exact bound Applicable efficiency or resource-use criteria as a compatibility filter before Requirement-Based Proposed Furnace Resolution emits One selected proposed furnace native-unit performance value, with the compatible population, filters, population size, and selection rule retained internally.

**Output Bindings:**

* One selected proposed furnace native-unit performance value, with the compatible population, filters, population size, and selection rule retained internally → `η_existing` (fraction; RECORD_SET) at `Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity specifies requirements but no exact product > Standard 1.3 - Requirement-Based Proposed Furnace Resolution`.

**How to Use:**

1. Extract the application, capacity, certification, and performance limits from the linked high-efficiency furnace replacement opportunity requirements.
2. Filter the official current-product population by every mandatory requirement, product-family boundary, active specification, and native test unit.
3. Use the source's official recommended or typical value when it provides one; otherwise select the weighted median when valid weights exist, or the ordinary median of the eligible compatible population.
4. Return one selected proposed furnace native-unit performance value, with the compatible population, filters, population size, and selection rule retained internally without choosing a future contractor product arbitrarily.
5. Retain the source version, complete filters, eligible record identities, population size, native units, selection rule, selected value, and fallback level.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Department of Energy - Compliance Certification Database population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and select one official typical value, weighted median, or median in native units.
* **Difficulty:** Medium

**Validation:**
The official certification access path and applicable furnace product-family filters were checked. Candidate-set automation is technically possible, but no retained category export proves the eligible population, filters, population size, or selected median result.
