# Information Card — Automated Demand Response

**Retrofits included:** Automated demand response controls

**Overview:** Automated demand response changes interval electric load during eligible events and can reduce utility charges under the applicable tariff.

**Broader Formula**

```text
Annual Operational Savings =
Baseline Annual Bill − Proposed Annual Bill
```

**Expanded Formula**

```text
Annual Operational Savings = Baseline Annual Bill - Proposed Annual Bill

Proposed Load in Each Interval = Baseline Load in Each Interval - Shed Load in Each Interval + Rebound Load in Each Interval
```

**Information Tree**

```text
Annual Operational Savings
├─ Chronological Electricity Load and Tariff
│  ├─ Timestamped Interval Electricity Data (User)
│  ├─ Time Zone and Daylight-Saving Treatment from the Uploaded Data (User)
│  ├─ Rate Schedule and Customer Class (Bill)
│  ├─ Complete Tariff Calendar and Billing Rules (User)
│  └─ Monthly Bill Reconciliation (Derived)
├─ Controllable-load definition (User)
├─ Maximum shed kW (User)
├─ Event-availability schedule (User)
├─ Maximum event duration (User)
├─ Rebound or recovery constraint (User)
└─ Standard 1.1 — Automated Demand Response Interval Bill Calculation
```

**■ Standard 1.1 — Automated Demand Response Interval Bill Calculation**

**Purpose:**
Use National Laboratory of the Rockies - REopt V3 and REopt.jl to resolve baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance from the listed category inputs.

**Source:**
National Laboratory of the Rockies - REopt V3 and REopt.jl

**REopt API V3 documentation:**
[https://developer.nlr.gov/docs/energy-optimization/reopt/v3/](https://developer.nlr.gov/docs/energy-optimization/reopt/v3/)

**REopt.jl input reference:**
[https://natlabrockies.github.io/REopt.jl/dev/reopt/inputs/](https://natlabrockies.github.io/REopt.jl/dev/reopt/inputs/)

**REopt.jl open-source package:**
[https://github.com/NatLabRockies/REopt.jl](https://github.com/NatLabRockies/REopt.jl)

**Lookup Inputs:**

* Timestamped Interval Electricity Data
* Time Zone and Daylight-Saving Treatment from Uploaded Interval Data
* Complete Tariff Calendar and Billing Rules
* Billing-Demand and Ratchet Rules
* Controllable-load definition
* Maximum shed kW
* Event-availability schedule
* Maximum event duration

**Value Needed:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Timestamped Interval Electricity Data; Time Zone and Daylight-Saving Treatment from Uploaded Interval Data; Complete Tariff Calendar and Billing Rules.
2. Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
