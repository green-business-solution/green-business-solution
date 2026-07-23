# Information Card — Solar Water Heating

**Retrofits included:** Solar water heating system

**Overview:** A solar water-heating system supplies useful thermal energy that displaces electricity, gas, or liquid fuel otherwise used by the backup water heater.

**Broader Formula**

```text
Annual Operational Savings =
Annual Backup-Resource Reduction × Applicable Backup-Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Backup Resource × Backup-Resource Rate

Useful Solar Thermal Output = Minimum of (Simulated Solar Thermal Output, Annual Delivered Hot-Water Load)

Avoided Backup Resource = Convert to Billed Resource Units (Useful Solar Thermal Output / Backup-System Efficiency, Backup-Resource Unit)
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual backup-resource reduction
│  ├─ Site Location (Profile)
│  ├─ Collector configuration
│  │  ├─ Collector type (Linked Opportunity)
│  │  ├─ Collector area (Linked Opportunity)
│  │  ├─ Tilt (Linked Opportunity)
│  │  ├─ Azimuth (Linked Opportunity)
│  │  └─ Storage volume (Linked Opportunity)
│  ├─ Hot-Water Load from Project Design or Measurement (Linked Opportunity)
│  ├─ Backup resource
│  │  ├─ Backup fuel (User)
│  │  └─ Backup-System Nameplate or Test Information (User)
│  └─ Standard 1.1 — Solar Thermal Production Simulation
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
   └─ Documented Current Fuel Price (User)
```

**■ Standard 1.1 — Solar Thermal Production Simulation**

**Purpose:**
Use National Laboratory of the Rockies - System Advisor Model to resolve annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version from the listed category inputs.

**Source:**
National Laboratory of the Rockies - System Advisor Model

**System Advisor Model:**
[https://sam.nlr.gov/](https://sam.nlr.gov/)

**SAM open-source repository:**
[https://github.com/NatLabRockies/SAM](https://github.com/NatLabRockies/SAM)

**Lookup Inputs:**

* Collector type
* Collector area
* Tilt
* Azimuth
* Storage volume
* Hot-Water Load from Project Design or Measurement
* Backup fuel
* Backup-System Nameplate or Test Information

**Value Needed:**

* Annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Collector type; Collector area; Tilt.
2. Validate the project configuration, select the site weather data, run the solar water-heating model, cap useful output at the delivered load, and convert displaced backup energy to its billed unit.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Versioned local SAM simulation using explicit system, weather, load, and backup inputs.
* **Automation Method:** Validate the project configuration, select the site weather data, run the solar water-heating model, cap useful output at the delivered load, and convert displaced backup energy to its billed unit.
* **Difficulty:** Hard

**Validation:**
The official SAM tool and open-source repository were checked, and local simulation is possible. No retained category fixture or golden calculation exists, and SAM does not supply missing collector design, hot-water load, or backup-system inputs.
