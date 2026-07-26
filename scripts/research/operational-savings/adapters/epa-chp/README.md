# EPA CHP catalog real-source adapter

This adapter reads the checksummed 150-page September 2017 EPA Catalog of CHP Technologies.
It extracts exact rows from Table 2-2 on PDF pages 36 and 37 and Table 5-2 on pages 98 and 99.
The normalized records retain technology, system capacity, electrical efficiency on an HHV basis, total efficiency on an HHV basis, power-to-heat ratio, table, and page references.

The adapter also reads the checksummed 122-page EPA Biomass CHP Catalog v1.1.
It extracts the representative 50 kW modular biomass system from Table 7-15 on document page 95 and PDF page 105.
The normalized record retains the native equipment type, commercialization status, capacity, biomass-fuel rate, recovered-heat rate, efficiencies, power-to-heat ratio, operating factor, and source page references.
The source explicitly describes this system as speculative and reports no commercial installations, so the result is a source-backed research screening case rather than evidence for a purchasable product.

The proved ITC-21 path uses one exact catalog system and explicit annual full-load operating hours.
It calculates generation, HHV fuel input, and useful recovered heat without substituting project fuel availability or part-load assumptions.
The proved ITC-22 path uses the exact Table 7-15 technology and capacity plus explicit annual operating hours.
It produces generation, scheduled biomass input fuel in MMBtu, and useful recovered heat without inferring project fuel availability or coincidence.

Acquire the biomass catalog:

```bash
node scripts/research/operational-savings/adapters/epa-chp/acquire.mjs
```

Run offline:

```bash
OS_RESEARCH_NETWORK=disabled npx vitest run \
  scripts/research/operational-savings/tests/epa-chp-real.test.mjs
```

This is a catalog-backed screening calculation.
It is not project-specific CHP engineering.
Site derates, thermal-load matching, fuel constraints, part-load performance, commercial product selection, and other catalog technology families remain explicit blockers.
