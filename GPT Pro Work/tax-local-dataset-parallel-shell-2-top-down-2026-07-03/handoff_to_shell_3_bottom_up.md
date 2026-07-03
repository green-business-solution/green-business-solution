# Handoff To Shell 3 Bottom-Up Research

Generated: 2026-07-03  
Purpose: concrete county/city/locality gaps where statewide or multi-state sources are insufficient.

## Sales And Use Tax Local Gaps

1. Alaska municipalities and boroughs

- Tax domain: sales/use tax.
- Source needed: official municipal sales-tax ordinances, rate schedules, exemptions, and boundary/accountability pages.
- Why statewide source is insufficient: Alaska has no state sales tax; local municipalities administer local sales taxes.
- Expected source owners: municipal finance/tax departments, borough governments, Alaska municipal code sources.

2. Montana resort/local-option jurisdictions

- Tax domain: sales/use or resort/local option tax.
- Source needed: official resort tax/local option ordinances and rate schedules.
- Why statewide source is insufficient: Montana has no general state sales tax; local resort taxes are locality-specific.
- Expected source owners: resort-area city/town/county governments and Montana Department of Revenue references where available.

3. Louisiana parish and local sales/use tax administration

- Tax domain: sales/use tax.
- Source needed: official parish collector sources, Louisiana Uniform Local Sales Tax Board lookup details, local rate/boundary rules, and local exemption details.
- Why statewide source is insufficient: statewide sources point to lookup tools and local collectors, but local parish administration still controls many details.
- Expected source owners: Louisiana Uniform Local Sales Tax Board, Louisiana Department of Revenue, parish sales tax collectors.

4. Colorado home-rule municipalities

- Tax domain: sales/use tax.
- Source needed: official home-rule city taxability/rate and filing rules for high-volume jurisdictions.
- Why statewide source is insufficient: Colorado GIS/SUTS provides strong address/rate data, but home-rule taxability and filing rules can require local confirmation.
- Expected source owners: Colorado DOR SUTS/GIS and home-rule city finance/tax departments.

## Property Tax Local Gaps

5. Rhode Island renewable energy property-tax treatment

- Tax domain: property tax and program-specific tax incentive.
- Source needed: municipal assessor rules/adoption, tax-rate/millage treatment, renewable property valuation/exemption implementation, and tax-bill examples.
- Why statewide source is insufficient: current RetroFi RI package has official law support but unresolved municipal/assessor implementation details.
- Expected source owners: Rhode Island Division of Municipal Finance, city/town assessors, municipal tax collectors, state statutes/regulations.

6. Michigan Renewable Energy Renaissance Zone boundaries and tax liabilities

- Tax domain: property tax, state business tax, local business/property tax, program-specific incentive.
- Source needed: official RERZ zone maps/boundaries, certified business/project lists, zone expiration dates, and tax types waived by locality.
- Why statewide source is insufficient: current artifacts do not include official machine-readable zone boundaries or taxpayer baseline liability data.
- Expected source owners: Michigan Economic Development Corporation, Michigan Treasury, local zone administrators, county/city assessors and treasurers.

7. Texas county appraisal district parcel and taxing-unit assignment

- Tax domain: property tax.
- Source needed: official appraisal district parcel/taxable value feeds, taxing-unit assignment, exemptions, and tax bills for pilot counties.
- Why statewide source is insufficient: Texas Comptroller rates/levies do not map a specific property to all taxing units or parcel taxable value.
- Expected source owners: county appraisal districts and tax assessor-collector/treasurer offices.

8. Florida county tax bill and special assessment details

- Tax domain: property tax.
- Source needed: county treasurer/tax collector tax bill fields, non-ad valorem assessments, exemption details, and payment/bill status.
- Why statewide source is insufficient: Florida DOR statewide tax roll is strong, but customer-specific bill charges and current collector data can remain local.
- Expected source owners: Florida county property appraisers and tax collectors.

9. New York local property exemptions and bills

- Tax domain: property tax.
- Source needed: county/city assessor exemption records, tax bills, special district charges, and local renewable-energy exemption adoption where relevant.
- Why statewide source is insufficient: NY GIS parcels and ORPTS municipal data support routing/rates but do not fully resolve parcel-level tax bills or local exemption status.
- Expected source owners: county real property tax services, city/town assessors, county treasurers.

## Local Business Tax Gaps

10. Seattle, Tacoma, and Bellevue local B&O

- Tax domain: local business tax.
- Source needed: official city B&O classifications, thresholds, deductions, apportionment rules, and form instructions.
- Why statewide source is insufficient: Washington state B&O does not include city B&O liability or local classification rules.
- Expected source owners: Seattle Finance and Administrative Services, Tacoma Tax and License, Bellevue Finance.

11. Philadelphia BIRT and Net Profits Tax

- Tax domain: local business tax.
- Source needed: official tax-year rates, form instructions, apportionment, exemption/credit rules, and return input fields.
- Why statewide source is insufficient: Pennsylvania state business tax data does not calculate Philadelphia gross receipts/net income components.
- Expected source owner: City of Philadelphia Department of Revenue.

12. New York City BCT, UBT, CRT, and local business credits

- Tax domain: local business tax.
- Source needed: official tax-year forms/instructions, rate schedules, entity/type gates, rent thresholds, and manufacturing/financial corporation rules.
- Why statewide source is insufficient: New York state corporation tax sources do not determine NYC allocated taxable income or local tax bases.
- Expected source owner: NYC Department of Finance.

13. San Francisco gross receipts tax

- Tax domain: local business tax.
- Source needed: official activity-category schedules, gross receipts bands, apportionment examples, administrative office tax applicability, and form inputs.
- Why statewide source is insufficient: California state tax sources do not determine San Francisco local gross receipts tax.
- Expected source owner: San Francisco Treasurer and Tax Collector.

14. Los Angeles business tax

- Tax domain: local business tax.
- Source needed: official classification/rate table, renewal forms, apportionment, exemptions, and city boundary/business-location rules.
- Why statewide source is insufficient: California state sources do not classify or calculate Los Angeles business tax.
- Expected source owner: City of Los Angeles Office of Finance.

15. Portland, Multnomah County, and Metro business taxes

- Tax domain: local business tax.
- Source needed: official Portland Business License Tax, Multnomah County Business Income Tax, Metro SHS tax, and Portland Clean Energy Surcharge forms/rules.
- Why statewide source is insufficient: Oregon state income/CAT sources do not determine local net income, gross receipts thresholds, or district-specific obligations.
- Expected source owners: City of Portland Revenue Division, Multnomah County, Metro.

16. Ohio municipal net profits tax collectors

- Tax domain: local business tax.
- Source needed: RITA/CCA/self-administered municipality rates, codes, forms, apportionment rules, and business net-profit filing inputs.
- Why statewide source is insufficient: Ohio state CAT and state tax sources do not determine municipal net profits tax or collector-specific filing facts.
- Expected source owners: Ohio Department of Taxation, RITA, CCA, self-administered municipalities.

17. Kentucky local occupational license taxes

- Tax domain: local business tax.
- Source needed: official local occupational/net-profits/gross-receipts tax database entries, ordinances, rates, and form instructions for major cities/counties.
- Why statewide source is insufficient: Kentucky Revenue does not administer local occupational taxes; local governments administer them.
- Expected source owners: Kentucky Business One Stop, city/county revenue departments, Louisville Metro Revenue Commission, Lexington-Fayette Urban County Government.

## Output Needed From Shell 3

For each researched locality, shell 3 should produce:

- official source URLs;
- tax type and calculation model;
- whether address-derived boundary is enough to flag applicability;
- required taxpayer/accountant/document inputs;
- whether an import adapter, lookup adapter, or manual review queue is practical;
- conservative missing-input behavior;
- evidence quote/snippet and confidence.
