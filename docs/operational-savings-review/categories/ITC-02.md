# Information Card — Exterior Lighting Replacement

**Retrofits included:** Exterior/site lighting retrofit

**Overview:** Exterior lighting replacement reduces electricity use by lowering fixture input power while preserving the required lighting application and operating schedule.

**Broader Formula**

```text
Annual Operational Savings =
Annual Electricity Reduction × Bill-Derived Electricity Rate
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × (Existing Input Power - Proposed Input Power) × Annual Operating Hours × Bill-Derived Electricity Rate

Fixture Input Kilowatts = Fixture Input Watts / 1000
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual Electricity Reduction
│  ├─ Replacement Fixture Count (User)
│  ├─ Existing Fixture Watts
│  │  ├─ Existing Fixture Type or Application (User)
│  │  ├─ Existing Nameplate, Photometric Report, or Field Measurement (User)
│  │  └─ No Existing Wattage Value Without Documentation or Measurement (Derived)
│  ├─ New Fixture Watts
│  │  ├─ Linked Opportunity names an exact replacement product
│  │  │  ├─ Exact Product Information (Linked Opportunity)
│  │  │  └─ Standard 1.1 — Exact New Fixture Wattage Lookup
│  │  └─ Linked Opportunity specifies requirements but no exact product
│  │     ├─ Product Requirements (Linked Opportunity)
│  │     └─ Standard 1.2 — Requirement-Based New Fixture Wattage Resolution
│  ├─ Annual Operating Hours
│  │  └─ Exterior Lighting Operating Pattern (User)
│  │     ├─ Lighting follows a fixed or business schedule
│  │     │  ├─ Lighting Hours per Operating Day (User)
│  │     │  ├─ Operating Days per Week (User)
│  │     │  ├─ Active Weeks per Year (User)
│  │     │  └─ Standard 2.1 — Fixed-Schedule Lighting Hours
│  │     └─ Lighting is dusk-to-dawn or photocell-controlled
│  │        ├─ Control Type and Timing Offset (User)
│  │        ├─ Site Location (Profile)
│  │        └─ Standard 2.2 — Daylight-Based Lighting Hours
│  └─ Standard 3.1 — Lighting-Replacement Calculation
└─ Bill-Derived Electricity Rate
   ├─ Electricity Use (Bill)
   ├─ Variable Delivery Charges (Bill)
   ├─ Variable Generation Charges (Bill)
   └─ Avoidable Electricity Rate (Derived)
```

**■ Standard 1.1 — Exact New Fixture Wattage Lookup**

**Purpose:**
Resolve input watts when the linked opportunity names an exact replacement luminaire.

**Source:**
DesignLights Consortium - Solid-State Lighting Qualified Products List

**DLC API and data download user guide:**
[https://designlights.org/wp-content/uploads/2021/08/DLC_API-and-Data-Access-User-Guide_FINAL_08022021.pdf](https://designlights.org/wp-content/uploads/2021/08/DLC_API-and-Data-Access-User-Guide_FINAL_08022021.pdf)

**SSL V6.0 and LUNA V2.0 Technical Requirements:**
[https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf](https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf)

**Lookup Inputs:**

* Exact replacement product information from the linked opportunity
* Exterior lighting application

**Value Needed:**

* Exact proposed input watts per fixture with product provenance

**How to Use:**

1. Read the exact manufacturer, model, and product configuration from the linked exterior lighting replacement opportunity.
2. Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.
3. Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.
4. Return exact proposed input watts per fixture with product provenance.
5. Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Department of Energy FEMP and DesignLights Consortium records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Medium

**Validation:**
The official DLC data-access guide documents tokenized SSL QPL CSV downloads, and the technical requirements define model, application, light-output, efficacy, input-power, status, and version fields. No authenticated QPL extract, retained exact-product fixture, or category adapter is present, so implementation execution is not yet proved.

**■ Standard 1.2 — Requirement-Based New Fixture Wattage Resolution**

**Purpose:**
Interpret performance requirements when the linked opportunity does not name an exact replacement product.

**Source:**
DesignLights Consortium - Solid-State Lighting Qualified Products List

**DLC API and data download user guide:**
[https://designlights.org/wp-content/uploads/2021/08/DLC_API-and-Data-Access-User-Guide_FINAL_08022021.pdf](https://designlights.org/wp-content/uploads/2021/08/DLC_API-and-Data-Access-User-Guide_FINAL_08022021.pdf)

**SSL V6.0 and LUNA V2.0 Technical Requirements:**
[https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf](https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf)

**Lookup Inputs:**

* Product requirements from the linked opportunity
* Exterior lighting application
* Required light output or performance criteria

**Value Needed:**

* Eligible compatible QPL population with documented low, median, and high input watts, or no value when no compatible product remains

**How to Use:**

1. Extract the application, capacity, certification, and performance limits from the linked exterior lighting replacement opportunity requirements.
2. Filter the official current-product population by every mandatory requirement, product-family boundary, active specification, and native test unit.
3. Reject the path when no compatible record remains; when several records remain, keep the eligible population and calculate a documented low, median, and high value without selecting the contractor's future product.
4. Return eligible compatible QPL population with documented low, median, and high input watts, or no value when no compatible product remains.
5. Retain the source version, complete filters, eligible record identities, population size, native units, summary rule, and no-result reason.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Department of Energy FEMP and DesignLights Consortium population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and calculate deterministic low, median, and high native-unit results.
* **Difficulty:** Medium

**Validation:**
The official DLC data-access guide and SSL technical requirements establish a candidate-filtering method. No retained QPL population currently proves the application, light-output, distribution, mounting, controls, active-status, and version filters or the resulting low, median, and high wattage values.

**■ Standard 2.1 — Fixed-Schedule Lighting Hours**

**Purpose:**
Calculate annual exterior-lighting hours for a fixed business or calendar schedule.

**Source:**
U.S. Department of Energy - Commercial Reference Buildings

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Lookup Inputs:**

* Lighting hours per operating day
* Operating days per week
* Active weeks per year

**Value Needed:**

* Annual operating hours

**How to Use:**

1. Map the Exterior Lighting Replacement inputs to the documented Fixed-Schedule Lighting Hours source fields or model inputs: Lighting hours per operating day; Operating days per week; Active weeks per year.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. Reject the Exterior Lighting Replacement path when a required source field, project design input, compatible record, or native unit is absent; do not insert a cross-category default.
4. Return annual operating hours.
5. Retain the Fixed-Schedule Lighting Hours source version, exact fields or model inputs, native units, selected records, warnings, and category-specific rejection reason.

**Automation:**

* **Selected Strategy:** Deterministic calendar calculation from an explicit fixed operating schedule.
* **Automation Method:** Calculate annual hours from operating hours per day, operating days per week, active weeks, holidays, and any declared seasonal exceptions.
* **Difficulty:** Easy to Medium

**Validation:**
The DOE commercial reference-building schedule context was checked. The calendar arithmetic is deterministic when all schedule inputs are supplied, but no category golden fixture exists and a business label alone is not a validated annual-hours value.

**■ Standard 2.2 — Daylight-Based Lighting Hours**

**Purpose:**
Calculate annual exterior-lighting hours for dusk-to-dawn or photocell control.

**Source:**
U.S. Naval Observatory - daylight definitions and data services

**Rise, Set, and Twilight Definitions:**
[https://aa.usno.navy.mil/faq/RST_defs](https://aa.usno.navy.mil/faq/RST_defs)

**Data Services API:**
[https://aa.usno.navy.mil/data/api.html](https://aa.usno.navy.mil/data/api.html)

**Lookup Inputs:**

* Control type and timing offset
* Site location
* Analysis year

**Value Needed:**

* Annual daylight-based operating hours

**How to Use:**

1. Map the Exterior Lighting Replacement inputs to the documented Daylight-Based Lighting Hours source fields or model inputs: Control type and timing offset; Site location; Analysis year.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. Reject the Exterior Lighting Replacement path when a required source field, project design input, compatible record, or native unit is absent; do not insert a cross-category default.
4. Return annual daylight-based operating hours.
5. Retain the Daylight-Based Lighting Hours source version, exact fields or model inputs, native units, selected records, warnings, and category-specific rejection reason.

**Automation:**

* **Selected Strategy:** Versioned daylight calculation from site location, analysis year, and the declared exterior-lighting control rule.
* **Automation Method:** Resolve local sunrise, sunset, or civil-twilight times, apply the control offset and timezone rules for every day, and sum the resulting annual operating hours.
* **Difficulty:** Easy to Medium

**Validation:**
The USNO daylight definitions and data-services interface were checked. Location-specific calculation is feasible when location, year, timezone, and control offset are supplied, but no category golden fixture exists.

**■ Standard 3.1 — Lighting-Replacement Calculation**

**Purpose:**
Calculate annual electricity reduction from fixture count, existing and proposed watts, and the resolved annual schedule.

**Source:**
DOE FEMP, DesignLights Consortium, DOE reference buildings, and U.S. Naval Observatory

**Purchasing Energy-Efficient Exterior Lighting:**
[https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting](https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting)

**DLC API and data download user guide:**
[https://designlights.org/wp-content/uploads/2021/08/DLC_API-and-Data-Access-User-Guide_FINAL_08022021.pdf](https://designlights.org/wp-content/uploads/2021/08/DLC_API-and-Data-Access-User-Guide_FINAL_08022021.pdf)

**SSL V6.0 and LUNA V2.0 Technical Requirements:**
[https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf](https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf)

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Rise, Set, and Twilight Definitions:**
[https://aa.usno.navy.mil/faq/RST_defs](https://aa.usno.navy.mil/faq/RST_defs)

**Data Services API:**
[https://aa.usno.navy.mil/data/api.html](https://aa.usno.navy.mil/data/api.html)

**Lookup Inputs:**

* Replacement fixture count
* Existing fixture watts
* New fixture watts
* Annual operating hours

**Value Needed:**

* Annual electricity reduction in kilowatt-hours

**How to Use:**

1. Confirm that all fixtures in the row share the same existing watts, proposed watts, and operating schedule.
2. Subtract proposed fixture watts from existing fixture watts and divide the difference by 1,000.
3. Multiply the kilowatt difference by fixture count and annual operating hours.
4. Return annual electricity reduction in kilowatt-hours and keep negative results when the proposed design adds load.
5. Store the fixture and schedule sources used by the calculation.

**Automation:**

* **Selected Strategy:** Deterministic local arithmetic after all connected fixture and schedule processes resolve.
* **Automation Method:** Apply the displayed replacement formula once to each homogeneous fixture group, then sum the annual electricity results.
* **Difficulty:** Easy

**Validation:**
The arithmetic and unit conversion are deterministic and correspond to the displayed formula. The result is executable only when fixture count, existing watts, proposed watts, and annual operating hours have all been resolved. A category-level golden test has not yet been added, and the reviewed source gaps for those inputs remain visible in the connected processes.
