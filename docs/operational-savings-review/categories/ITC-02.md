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
│  │  └─ Standard 1.1 — Existing Fixture Wattage Estimate
│  ├─ New Fixture Watts
│  │  ├─ Linked Opportunity names an exact replacement product
│  │  │  ├─ Exact Product Information (Linked Opportunity)
│  │  │  └─ Standard 1.2 — Exact New Fixture Wattage Lookup
│  │  └─ Linked Opportunity specifies requirements but no exact product
│  │     ├─ Product Requirements (Linked Opportunity)
│  │     └─ Standard 1.3 — Requirement-Based New Fixture Wattage Resolution
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

**■ Standard 1.1 — Existing Fixture Wattage Estimate**

**Purpose:**
Determine whether recognizable existing fixture information is sufficient to resolve installed input watts.

**Source:**
U.S. Department of Energy FEMP and DesignLights Consortium

**Purchasing Energy-Efficient Exterior Lighting:**
[https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting](https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting)

**SSL V6.0 and LUNA V2.0 Technical Requirements:**
[https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf](https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf)

**Lookup Inputs:**

* Existing fixture type or application
* Existing nameplate or measured watts, when available

**Value Needed:**

* Existing input watts per fixture, or no value when no supported installed-baseline source applies

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Existing fixture type or application; Existing nameplate or measured watts, when available.
2. Identify the lighting application, apply the opportunity restrictions, query an approved product source when available, reject incompatible candidates, and return documented fixture input power.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return existing input watts per fixture, or no value when no supported installed-baseline source applies.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Application-specific source lookup with explicit exact-product or requirement-based routing.
* **Automation Method:** Identify the lighting application, apply the opportunity restrictions, query an approved product source when available, reject incompatible candidates, and return documented fixture input power.
* **Difficulty:** Medium

**Validation:**
The reviewed FEMP tables validate proposed efficacy requirements and one narrow wall-mounted example. They do not supply a general installed legacy-wattage distribution or an exact product catalog, so those paths must return no value until separate sources are fixture-validated.

**■ Standard 1.2 — Exact New Fixture Wattage Lookup**

**Purpose:**
Resolve input watts when the linked opportunity names an exact replacement luminaire.

**Source:**
U.S. Department of Energy FEMP and DesignLights Consortium

**Purchasing Energy-Efficient Exterior Lighting:**
[https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting](https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting)

**SSL V6.0 and LUNA V2.0 Technical Requirements:**
[https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf](https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf)

**Lookup Inputs:**

* Exact replacement product information from the linked opportunity
* Exterior lighting application

**Value Needed:**

* Exact proposed input watts per fixture with product provenance

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Exact replacement product information from the linked opportunity; Exterior lighting application.
2. Identify the lighting application, apply the opportunity restrictions, query an approved product source when available, reject incompatible candidates, and return documented fixture input power.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return exact proposed input watts per fixture with product provenance.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Application-specific source lookup with explicit exact-product or requirement-based routing.
* **Automation Method:** Identify the lighting application, apply the opportunity restrictions, query an approved product source when available, reject incompatible candidates, and return documented fixture input power.
* **Difficulty:** Medium

**Validation:**
The reviewed FEMP tables validate proposed efficacy requirements and one narrow wall-mounted example. They do not supply a general installed legacy-wattage distribution or an exact product catalog, so those paths must return no value until separate sources are fixture-validated.

**■ Standard 1.3 — Requirement-Based New Fixture Wattage Resolution**

**Purpose:**
Interpret performance requirements when the linked opportunity does not name an exact replacement product.

**Source:**
U.S. Department of Energy FEMP and DesignLights Consortium

**Purchasing Energy-Efficient Exterior Lighting:**
[https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting](https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting)

**SSL V6.0 and LUNA V2.0 Technical Requirements:**
[https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf](https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf)

**Lookup Inputs:**

* Product requirements from the linked opportunity
* Exterior lighting application
* Required light output or performance criteria

**Value Needed:**

* Compatible proposed input watts, or no value when the requirements do not identify a supported product

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Product requirements from the linked opportunity; Exterior lighting application; Required light output or performance criteria.
2. Identify the lighting application, apply the opportunity restrictions, query an approved product source when available, reject incompatible candidates, and return documented fixture input power.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return compatible proposed input watts, or no value when the requirements do not identify a supported product.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Application-specific source lookup with explicit exact-product or requirement-based routing.
* **Automation Method:** Identify the lighting application, apply the opportunity restrictions, query an approved product source when available, reject incompatible candidates, and return documented fixture input power.
* **Difficulty:** Medium

**Validation:**
The reviewed FEMP tables validate proposed efficacy requirements and one narrow wall-mounted example. They do not supply a general installed legacy-wattage distribution or an exact product catalog, so those paths must return no value until separate sources are fixture-validated.

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

1. Validate these inputs and preserve the source of each supplied value: Lighting hours per operating day; Operating days per week; Active weeks per year.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return annual operating hours.
5. Store the source version, selected record or method, input units, and any warnings with the result.

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

1. Validate these inputs and preserve the source of each supplied value: Control type and timing offset; Site location; Analysis year.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return annual daylight-based operating hours.
5. Store the source version, selected record or method, input units, and any warnings with the result.

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
The arithmetic and unit conversion are deterministic and correspond to the displayed formula. The result is executable only when fixture count, existing watts, proposed watts, and annual operating hours have all been resolved; the reviewed source gaps for those inputs remain visible in the connected processes.
