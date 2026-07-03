# Grant Estimation Repair Work Packet - 2026-07-03

Use this folder with GPT Pro while Codex continues implementation. Paste each GPT Pro result into the matching blank output file.

## Sections

- `grant_package_research/`: 37 prompts, one per grant-like v2 package. These ask GPT Pro to research official sources and return source-backed formula/probability/package repair JSON.
- `test_case_project_profiles/`: 50 prompts, one per sample test case. These ask GPT Pro to enrich the project profile realistically so grant estimates can be tested without making every project conveniently qualify.

## Important Policy

- GPT Pro should use official sources whenever it researches grant formulas.
- Do not let GPT Pro invent award probability, current funding, eligibility, or award amounts.
- For test cases, synthetic profile values are allowed, but they must be realistic for the business/building and clearly marked synthetic.
- Some test cases should not qualify, should need a quote, or should have suppressed/uncertain grant estimates. That is expected and desirable.

## Import Plan After Outputs

After the outputs are pasted, Codex should validate them, repair `data/opportunity_incentive_calculation_packages_v2.json`, add any missing runtime calculator support, enrich the sample test-case project inputs, run focused tests, then update GitHub/AWS if runtime behavior changes.
