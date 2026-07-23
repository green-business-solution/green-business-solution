# Information Card — Induction Cooking Equipment

**Retrofits included:** Induction cooking equipment

**Overview:** Induction cooking replaces an existing cooking fuel with electricity for an identical tested cooking duty.

**Broader Formula**

```text
Annual Operational Savings =
Avoided Existing Resource Cost − Added New Resource Cost
```

**Expanded Formula**

```text
Annual Operational Savings = Current Annual Cooking Fuel × Current Fuel Price - Proposed Annual Induction Electricity × Bill-Derived Electricity Rate

Current Annual Cooking Fuel = Annual Billed Fuel × Confirmed Cooking Share

Proposed Annual Induction Electricity = Annual Cooking Activity × Proposed Tested Electricity per Activity Unit
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual cooking resource switch
│  ├─ Annual Billed Resource Use
│  │  ├─ Annual Electricity Use (Bill)
│  │  ├─ Annual Gas Use (Bill)
│  │  └─ Billing Period Coverage (Bill)
│  ├─ Cooking share of billed fuel or direct equipment measurement, if known (User)
│  ├─ Annual Cooking Activity in the Tested Duty Unit, if known (User)
│  ├─ Proposed Induction kWh per Identical Tested Duty Unit, if known (User)
│  ├─ Existing cooking-duty definition (User)
│  └─ Proposed duty-equivalence confirmation (User)
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
