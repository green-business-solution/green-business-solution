# Information Card — High-Efficiency Commercial Laundry Equipment

**Retrofits included:** High-efficiency laundry equipment

**Overview:** Efficient commercial laundry equipment reduces water, machine electricity, and water-heating input for the same annual cycle duty.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Water × Bill-Derived Water and Sewer Rate + Avoided Machine Electricity × Bill-Derived Electricity Rate + Avoided Water-Heating Input × Heating-Resource Rate

Water Per Cycle = Certified Tub Volume × Certified Integrated Water Factor

Avoided Water = In-Scope Equipment Count × Annual Cycles Per Unit × (Existing Water per Cycle - Proposed Water per Cycle)

Hot Water per Cycle for Each Case = Water per Cycle for Each Case × Hot-Water Fraction for Each Case

Avoided Hot Water = In-Scope Equipment Count × Annual Cycles Per Unit × (Hot Water Per Cycle Existing - Hot Water Per Cycle Proposed)

Avoided Water-Heating Input = Convert to Billed Resource Units (Avoided Hot Water × Thermal Energy per Gallon / Water-Heater Efficiency, Heating-Resource Unit)

Avoided Machine Electricity = In-Scope Equipment Count × Annual Cycles Per Unit × (Existing Machine Electricity per Cycle - Proposed Machine Electricity per Cycle)
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual commercial laundry resource reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Commercial Washer Performance
│  │  ├─ Existing Commercial Washer
│  │  │  ├─ Existing Commercial Washer Type or Application (User)
│  │  │  ├─ Existing Make and Model, when available (User)
│  │  │  ├─ Existing Capacity or Size Class, when available (User)
│  │  │  └─ Standard 1.1 — Existing Commercial Washer Rating Resolution
│  │  └─ Proposed Commercial Washer
│  │     ├─ Linked Opportunity names an exact product
│  │     │  ├─ Exact Product Information (Linked Opportunity)
│  │     │  └─ Standard 1.2 — Exact Proposed Commercial Washer Rating Lookup
│  │     └─ Linked Opportunity specifies requirements but no exact product
│  │        ├─ Product Requirements (Linked Opportunity)
│  │        └─ Standard 1.3 — Requirement-Based Proposed Commercial Washer Resolution
│  ├─ Recognizable Laundry Usage Pattern (User)
│  ├─ Annual Cycles per Unit (User)
│  ├─ Existing hot-water fraction (User)
│  ├─ Proposed hot-water fraction (User)
│  ├─ Hot-water temperature rise (User)
│  ├─ Water-heating resource (User)
│  ├─ Water-heater efficiency (User)
│  ├─ Existing and proposed separately reported or measured machine electricity per cycle, if known (User)
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

**■ Standard 1.1 — Existing Commercial Washer Rating Resolution**

**Purpose:**
Resolve the existing commercial washer performance only from a documented exact model or retained certification record.

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

**Commercial clothes washer dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Clothes-Washers/9g6r-cpdt](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Clothes-Washers/9g6r-cpdt)

**Lookup Inputs:**

* Existing commercial washer type or application
* Existing make and model, when available
* Existing capacity or size class

**Value Needed:**

* Existing certified commercial washer performance with its exact unit, or no value when no exact record is supported

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Existing commercial washer type or application; Existing make and model, when available; Existing capacity or size class.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return existing certified commercial washer performance with its exact unit, or no value when no exact record is supported.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.

**■ Standard 1.2 — Exact Proposed Commercial Washer Rating Lookup**

**Purpose:**
Resolve proposed commercial washer performance when the linked opportunity names an exact product.

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

**Commercial clothes washer dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Clothes-Washers/9g6r-cpdt](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Clothes-Washers/9g6r-cpdt)

**Lookup Inputs:**

* Exact proposed make and model from the linked opportunity
* Product type and capacity
* Applicable certified test method

**Value Needed:**

* Proposed certified commercial washer performance with its exact unit

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Exact proposed make and model from the linked opportunity; Product type and capacity; Applicable certified test method.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return proposed certified commercial washer performance with its exact unit.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.

**■ Standard 1.3 — Requirement-Based Proposed Commercial Washer Resolution**

**Purpose:**
Interpret the linked opportunity requirements and determine whether they identify a compatible certified commercial washer record.

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

**Commercial clothes washer dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Clothes-Washers/9g6r-cpdt](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Clothes-Washers/9g6r-cpdt)

**Lookup Inputs:**

* Product requirements from the linked opportunity
* Required application and capacity
* Applicable efficiency or resource-use criteria

**Value Needed:**

* One compatible proposed commercial washer result, or no value when the requirements do not identify a supported record

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Product requirements from the linked opportunity; Required application and capacity; Applicable efficiency or resource-use criteria.
2. Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return one compatible proposed commercial washer result, or no value when the requirements do not identify a supported record.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set.
* **Automation Method:** Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields.
* **Difficulty:** Medium

**Validation:**
The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported. The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.
