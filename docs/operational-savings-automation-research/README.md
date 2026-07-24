# Operational savings internal automation research

This package fully inventories the source and adapter work required to execute operational-savings estimates without runtime external calls.
It is based on source commit `5ebdf470fdff8b04d38a2ab362b85f40ebd1f0d0`.
It covers 19 canonical Standards, 124 category-local processes, and 54 categories.

## Start here

- [Executive summary](executive-summary.md)
- [Source access matrix](source-access-matrix.md)
- [Internal database design](internal-database-design.md)
- [Shared adapter architecture](shared-adapter-architecture.md)
- [Category-process coverage](category-process-coverage.md)
- [Cost and feasibility](cost-and-feasibility.md)
- [Implementation roadmap](implementation-roadmap.md)
- [Deployment readiness](deployment-readiness.md)
- [Unresolved product decisions](unresolved-product-decisions.md)
- [Source download manifest](source-download-manifest.json)
- [Standard reports](standards/)
- [Category reports](categories/)
- [Retained compact samples](samples/)

## Reproduce

```bash
node scripts/research/operational-savings/generate-research.mjs
node scripts/research/operational-savings/run-synthetic-prototypes.mjs
npx vitest run scripts/research/operational-savings/tests
```

The synthetic prototype runner performs no network access and cannot satisfy a real-proof gate.
Large downloaded artifacts and cloned repositories remain under the ignored `scripts/research/operational-savings/.cache/` directory.
The generated reports do not change the approved formulas, trees, bindings, ownership decisions, statuses, or Information Cards.
