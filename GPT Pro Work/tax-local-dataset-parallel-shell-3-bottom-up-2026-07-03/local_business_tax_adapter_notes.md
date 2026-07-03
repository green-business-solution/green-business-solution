# Local Business Tax Adapter Notes

Date: 2026-07-03

Scope: locality-specific business tax sources tied to sample/test geographies.

## Common Runtime Inputs

Local business taxes usually cannot be estimated from address plus NAICS alone. The minimum useful input set is:

- exact business location and period;
- whether activity occurs inside city limits;
- city tax classification;
- gross receipts or taxable income attributable to the city;
- apportionment or allocation facts;
- entity type;
- employee count or square footage where local formula uses them;
- exemptions, thresholds, deductions, credits, and filing/account numbers.

## Los Angeles, CA

Samples: `california-endowment-hq` and possibly other LA-located business activity.

Official sources:

- Tax Information Booklet: https://finance.lacity.gov/tax-information-booklet
- About Business Tax: https://finance.lacity.gov/tax-education/business-taxes/about-business-tax
- Know Your Rates: https://finance.lacity.gov/tax-education/business-taxes/know-your-rates
- Renewal Instructions: https://finance.lacity.gov/business-tax-renewal-instructions

Formula/rate source: official city rates by business tax classification, generally stated per $1,000 of taxable gross receipts. The city states most business taxes are gross-receipts based, though some use flat amounts, employee count, square footage, seats, vehicles, or other facts.

Can RetroFi estimate from address plus profile? Partial only. Address can confirm likely city; profile/NAICS can suggest candidate classifications. User/accountant must confirm taxable gross receipts, Los Angeles apportionment, classification, exemptions, and filings.

Build recommendation: create a Los Angeles `local_business_tax_classification` table from the official rates page and keep estimates disabled until user supplies gross receipts and classification.

## Pasadena, CA

Sample: `westin-pasadena`.

Official sources:

- Starting a Business: https://www.cityofpasadena.net/economicdevelopment/starting-a-business/
- Business Licenses: https://www.cityofpasadena.net/finance/licenses/business-licenses/

Formula/rate source: Pasadena states it generally does not charge a gross receipts tax and that most business license tax is computed using a flat rate plus employee count, with exceptions.

Can RetroFi estimate from address plus profile? Partial, low risk for routing only. Runtime should not infer hotel-specific license tax without business license class and employee/facility facts.

## Burbank, CA

Sample: `ikea-burbank`.

Official sources:

- Business Tax: https://www.burbankca.gov/web/community-development/business-tax
- Business Tax Applications: https://www.burbankca.gov/web/community-development/business-tax-applications

Formula/rate source: Burbank says its tax is not a gross receipts tax with limited exceptions. Applications page identifies category-specific bases such as residential units, commercial square footage, annual business volume for laundry, gross receipts for vending/coin-operated machines, and hotel/motel rooms.

Can RetroFi estimate from address plus profile? No final estimate. For IKEA-like retail, need city business tax class and current city rate schedule/account facts.

## Vernon, CA

Sample: `melissas-vernon-distribution`.

Official sources:

- Licenses & Permits: https://www.cityofvernonca.gov/government/finance-treasury/licenses-permits
- Doing Business in Vernon: https://www.cityofvernonca.gov/doing-business/doing-business-in-vernon

Formula/rate source: license renewal and tax due dates are official. Vernon also identifies a special parcel tax on non-refrigerated warehouses, truck terminals, freight terminals, and distribution facilities, collected through the property tax bill.

Can RetroFi estimate from address plus profile? No. The special parcel tax needs facility category and tax-bill lines/current rate confirmation.

## San Diego, CA

Sample: `juniper-and-ivy-san-diego`.

Official sources:

- Business Tax/Rental Unit Business Tax: https://www.sandiego.gov/treasurer/taxesfees/btax
- Apply for Business Tax Certificate: https://www.sandiego.gov/treasurer/taxesfees/btax/btaxhow

Formula/rate source: San Diego requires all businesses operating in the city to obtain a Business Tax Certificate. The application page identifies base business tax, SB-1186 fee, and an employee-based Minimum Wage Enforcement Fee beginning July 1, 2025.

Can RetroFi estimate from address plus profile? Partial. For a restaurant, address plus employee count can approximate known certificate components, but final account fees, late fees, and category-specific items need user filing facts.

## Anaheim, CA

Sample: `northgate-market-anaheim`.

Official sources:

- Business License: https://www.anaheim.net/494/Business-License
- Business License FAQs: https://www.anaheim.net/495/Business-License-FAQs
- Anaheim Municipal Code 3.16.010: https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54706

Formula/rate source: ordinance example for services uses a flat license tax plus per-employee amount. Other classes may differ.

Can RetroFi estimate from address plus profile? Partial only after city business activity class and employee count are confirmed.

## Seattle, WA

Sample: `hoa-mai-gardens-seattle-household` is residential, but Seattle is a high-impact local business tax jurisdiction for future commercial samples.

Official sources:

- Seattle business taxes: https://www.seattle.gov/city-finance/business-taxes-and-licenses/business-taxes
- FileLocal: https://www.filelocal-wa.gov/
- Washington DOR city B&O note: https://dor.wa.gov/forms-publications/publications-subject/tax-topics/city-bo-tax

Formula/rate source: Seattle says business license/B&O tax is applied to gross income and varies by business type. Washington DOR confirms local B&O is in addition to state B&O and is not administered by DOR.

Can RetroFi estimate from address plus profile? Partial. Need Seattle activity, gross income, classification, deductions, threshold/exemption status, and FileLocal/accountant facts.

Build recommendation: Seattle should be the first local B&O adapter because official pages are clear, FileLocal centralizes filing, and it complements the existing Washington state B&O package work.

## Detroit, MI

Samples: `eastern-market-detroit`, `gm-factory-zero-detroit`.

Official sources:

- Detroit Business Income Tax: https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-treasury/income-tax/business-income-tax
- Michigan Treasury Detroit CIT: https://www.michigan.gov/taxes/citytax/detroit/business/cit
- 2026 Detroit withholding guide: https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/Forms/City-Withholding/TY2026/5469_ty2026.pdf

Formula/rate source: Detroit publishes business income tax rates, including 2.00% for businesses, with separate partnership/resident/nonresident partner treatment. Michigan Treasury administers Detroit city tax filings and forms.

Can RetroFi estimate from address plus profile? No final estimate. Need entity type, taxable income, apportionment, partner details, employee/payroll facts, and actual return/workpaper data.

## Ann Arbor, MI

Sample: `zingermans-deli-ann-arbor`.

Official status: no official Ann Arbor city income or gross-receipts tax source was verified in this pass. Treat the sample as property-tax/local license only until proven otherwise.

## Everett and Quincy, WA

Samples: `boeing-everett-factory`, `microsoft-columbia-data-center-quincy`.

Official status: Washington DOR confirms many cities impose local B&O but do not administer it. Official city-specific Everett/Quincy B&O applicability and current rates were not proven in this pass.

Runtime action: do not include local city B&O estimates for these samples yet. GPT Pro should verify current city ordinances/rates and whether the sample activity is inside city limits.

## Engineering Build First

1. Build `local_business_tax_sources` and `local_business_tax_inputs_required` tables.
2. Add local business tax workflow states: `city_routed`, `classification_candidate`, `classification_confirmed`, `tax_base_supplied`, `calculation_allowed`.
3. Implement Los Angeles and Seattle source-backed rate/classification catalogs first.
4. Implement Detroit as an accountant-input workflow with source-backed rates, not an address-only estimate.
5. For Burbank, Pasadena, Anaheim, Vernon, and San Diego, start with checklist/routing and document upload prompts before rate automation.
