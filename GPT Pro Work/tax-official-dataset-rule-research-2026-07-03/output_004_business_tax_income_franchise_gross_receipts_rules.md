{
"schemaVersion": "retrofi_business_tax_rule_research.v1",
"researchedAt": "2026-07-03",
"source": "gpt_pro",
"promptCitation": "",
"scopeNotes": [
"This dataset is designed to identify official sources and gating rules for estimating business tax incentives and tax-rate preferences. It is not a complete tax-compliance engine.",
"Geography can usually identify a possible state, county, municipality, and tax district. Geography alone does not determine nexus, taxable income, gross receipts, franchise base, B&O classification, apportionment, deductions, credit ordering, or whether a taxpayer actually has liability.",
"User-facing dollar totals for income, franchise, gross receipts, B&O, and local business taxes should generally be gated unless a filed return, draft return, accountant-reviewed tax profile, or actual tax bill supplies the tax base and liability."
],
"stateBusinessTaxRules": [
{
"state": "Alabama",
"taxTypes": [
"corporate income tax",
"business privilege tax"
],
"officialRateSources": [
{
"sourceName": "Alabama Department of Revenue - Corporate Income Tax",
"url": "[https://www.revenue.alabama.gov/tax-types/corporate-income-tax/](https://www.revenue.alabama.gov/tax-types/corporate-income-tax/)",
"evidenceText": "The official corporate income tax page states that corporations pay Alabama income tax at a 6.5% rate.",
"webCitation": "([Alabama Department of Revenue][1])"
},
{
"sourceName": "Alabama Department of Revenue - Business Privilege Tax",
"url": "[https://www.revenue.alabama.gov/tax-types/business-privilege-tax/](https://www.revenue.alabama.gov/tax-types/business-privilege-tax/)",
"evidenceText": "The official business privilege tax page states that tax rates range from $0.25 to $1.75 for each $1,000 of net worth in Alabama, with the exact rate depending on federal taxable income apportioned to Alabama.",
"webCitation": "([Alabama Department of Revenue][2])"
},
{
"sourceName": "Alabama Department of Revenue - BPT filing update",
"url": "[https://www.revenue.alabama.gov/business-privilege-tax/](https://www.revenue.alabama.gov/business-privilege-tax/)",
"evidenceText": "Alabama states that taxpayers whose total business privilege tax due is $100 or less are exempt from paying and filing for tax years beginning after December 31, 2023.",
"webCitation": "([Alabama Department of Revenue][3])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Alabama Department of Revenue - Corporate and Business Privilege Tax pages",
"url": "[https://www.revenue.alabama.gov/tax-types/corporate-income-tax/](https://www.revenue.alabama.gov/tax-types/corporate-income-tax/)",
"evidenceText": "Official Alabama tax-type pages provide the filing-source entry point for corporate income and privilege tax returns.",
"webCitation": "([Alabama Department of Revenue][1])"
}
],
"geographyDerivedInputs": [
"Alabama state presence and possible county or municipal location can be derived from address.",
"Geography can identify Alabama as a possible taxing state but cannot determine Alabama taxable income, net worth in Alabama, apportionment, deductions, or credits."
],
"taxpayerSpecificInputs": [
"entity type",
"tax year",
"Alabama taxable income",
"federal taxable income starting point",
"Alabama apportionment",
"net worth or privilege tax base",
"credit schedules",
"filed return or accountant-reviewed estimate"
],
"retrofitOrIncentiveRelevance": "Business tax preferences should be modeled only as reductions to actual Alabama income or privilege tax liability. Retrofit project geography alone is not enough to estimate a value.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Alaska",
"taxTypes": [
"corporate income tax"
],
"officialRateSources": [
{
"sourceName": "Alaska Department of Revenue - Corporate Income Tax Forms",
"url": "[https://tax.alaska.gov/programs/programs/forms/index.aspx?60380](https://tax.alaska.gov/programs/programs/forms/index.aspx?60380)",
"evidenceText": "Alaska provides official corporation net income tax forms and instructions through the Department of Revenue.",
"webCitation": "([Alaska Tax Division][4])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Alaska Department of Revenue - Revenue Online and Modernized e-File",
"url": "[https://tax.alaska.gov/](https://tax.alaska.gov/)",
"evidenceText": "Alaska identifies Revenue Online and Modernized e-File as official filing channels for tax programs.",
"webCitation": "([AWS Alaska][5])"
}
],
"geographyDerivedInputs": [
"Alaska state location can be derived from address.",
"Geography cannot determine whether the corporation has Alaska-source income, combined reporting obligations, apportionment, or credits."
],
"taxpayerSpecificInputs": [
"entity type",
"tax year",
"Alaska taxable income",
"apportionment",
"federal return inputs",
"credit schedules",
"filed Alaska corporation net income tax return"
],
"retrofitOrIncentiveRelevance": "Use Alaska corporate tax sources to cap any state business income-tax incentive at actual Alaska corporation tax liability.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Arizona",
"taxTypes": [
"corporate income tax",
"pass-through entity tax election"
],
"officialRateSources": [
{
"sourceName": "Arizona Department of Revenue - Corporate Income Tax",
"url": "[https://azdor.gov/business/income-tax-information/corporate-income-tax](https://azdor.gov/business/income-tax-information/corporate-income-tax)",
"evidenceText": "Arizona identifies official corporate income tax filing information and states that e-file is required for 2020 and later returns.",
"webCitation": "([Arizona Department of Revenue][6])"
},
{
"sourceName": "Arizona Department of Revenue - Corporate Forms",
"url": "[https://azdor.gov/forms/corporate-tax-forms](https://azdor.gov/forms/corporate-tax-forms)",
"evidenceText": "Arizona maintains official corporate tax forms and instructions, including current-year corporation filing sources.",
"webCitation": "([Arizona Department of Revenue][7])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Arizona Department of Revenue - Corporate Tax Forms",
"url": "[https://azdor.gov/forms/corporate-tax-forms](https://azdor.gov/forms/corporate-tax-forms)",
"evidenceText": "Official Arizona corporate tax forms are the filing-source basis for corporate income-tax calculations and credits.",
"webCitation": "([Arizona Department of Revenue][7])"
}
],
"geographyDerivedInputs": [
"Arizona state location can be derived from address.",
"Address cannot determine Arizona corporate taxable income, apportionment, PTE election status, or credit eligibility."
],
"taxpayerSpecificInputs": [
"entity type",
"tax year",
"Arizona taxable income",
"apportionment factors",
"credits",
"PTE election status if applicable",
"filed Arizona return"
],
"retrofitOrIncentiveRelevance": "Any Arizona business tax credit or preference should be limited to actual Arizona liability and the taxpayer's filed classification.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Arkansas",
"taxTypes": [
"corporate income tax",
"business incentive credits"
],
"officialRateSources": [
{
"sourceName": "Arkansas Department of Finance and Administration - Corporate Income Tax",
"url": "[https://www.dfa.arkansas.gov/income-tax/corporation/](https://www.dfa.arkansas.gov/income-tax/corporation/)",
"evidenceText": "Arkansas provides official corporate income tax administration and filing information through DFA.",
"webCitation": "([Arkansas Finance Admin][8])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Arkansas DFA - Corporate Income Tax Forms",
"url": "[https://www.dfa.arkansas.gov/income-tax/corporation/corporation-forms/](https://www.dfa.arkansas.gov/income-tax/corporation/corporation-forms/)",
"evidenceText": "Arkansas provides official corporate forms and a business incentive credits schedule.",
"webCitation": "([Arkansas Finance Admin][9])"
}
],
"geographyDerivedInputs": [
"Arkansas state location can be derived from address.",
"Geography cannot determine Arkansas taxable income, apportionment, or business incentive credit use."
],
"taxpayerSpecificInputs": [
"corporation type",
"tax year",
"Arkansas taxable income",
"apportionment",
"business incentive credit schedules",
"filed Arkansas return"
],
"retrofitOrIncentiveRelevance": "Arkansas incentive credits should be calculated from official credit forms and gated to the taxpayer's actual state income tax liability.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "California",
"taxTypes": [
"corporate franchise tax",
"corporate income tax",
"S corporation franchise tax"
],
"officialRateSources": [
{
"sourceName": "California Franchise Tax Board - C Corporations",
"url": "[https://www.ftb.ca.gov/file/business/types/corporations/c-corporations.html](https://www.ftb.ca.gov/file/business/types/corporations/c-corporations.html)",
"evidenceText": "California states that C corporations are subject to an 8.84% tax rate and a minimum franchise tax of $800.",
"webCitation": "([State of California Franchise Tax Board][10])"
},
{
"sourceName": "California Franchise Tax Board - S Corporations",
"url": "[https://www.ftb.ca.gov/file/business/types/corporations/s-corporations.html](https://www.ftb.ca.gov/file/business/types/corporations/s-corporations.html)",
"evidenceText": "California states that S corporations pay a 1.5% franchise tax and the $800 minimum franchise tax.",
"webCitation": "([State of California Franchise Tax Board][11])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "California FTB - Forms Search",
"url": "[https://www.ftb.ca.gov/forms/](https://www.ftb.ca.gov/forms/)",
"evidenceText": "California FTB provides official business return forms and instructions through its forms search.",
"webCitation": "([State of California Franchise Tax Board][12])"
}
],
"geographyDerivedInputs": [
"California state, county, and city can be derived from address.",
"Geography can identify possible local business taxes, but not California nexus, taxable income, water's-edge status, apportionment, credits, or minimum-tax exceptions."
],
"taxpayerSpecificInputs": [
"entity type",
"tax year",
"California taxable income",
"apportionment",
"franchise-tax minimum status",
"credits",
"filed California return"
],
"retrofitOrIncentiveRelevance": "California corporate tax credits and abatements should not be shown as cash unless tax-liability limits, carryforwards, and credit ordering are known.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Colorado",
"taxTypes": [
"corporate income tax"
],
"officialRateSources": [
{
"sourceName": "Colorado Department of Revenue - Corporate Income Tax Guide",
"url": "[https://tax.colorado.gov/corporate-income-tax-guide](https://tax.colorado.gov/corporate-income-tax-guide)",
"evidenceText": "Colorado publishes an official corporate income tax guide covering tax calculation, additions, subtractions, credits, and filing requirements.",
"webCitation": "([Colorado Department of Revenue][13])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Colorado DOR - DR 0112 Corporation Income Tax Return",
"url": "[https://tax.colorado.gov/DR0112](https://tax.colorado.gov/DR0112)",
"evidenceText": "Colorado states that every C corporation doing business in Colorado or deriving income from Colorado sources must file the DR 0112 return.",
"webCitation": "([Colorado Department of Revenue][14])"
},
{
"sourceName": "Colorado DOR - Business Income Tax Forms",
"url": "[https://tax.colorado.gov/business-income-tax-forms](https://tax.colorado.gov/business-income-tax-forms)",
"evidenceText": "Colorado maintains official business income tax forms and instructions.",
"webCitation": "([Colorado Department of Revenue][15])"
}
],
"geographyDerivedInputs": [
"Colorado state and local address can be derived.",
"Address cannot determine Colorado-source income, apportionment, additions, subtractions, or credits."
],
"taxpayerSpecificInputs": [
"federal taxable income",
"Colorado modifications",
"apportionment",
"credits",
"DR 0112 return data"
],
"retrofitOrIncentiveRelevance": "Colorado incentives that reduce income tax should be gated to actual Colorado income-tax return data.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Connecticut",
"taxTypes": [
"corporation business tax",
"business tax credits"
],
"officialRateSources": [
{
"sourceName": "Connecticut Department of Revenue Services - Corporation Business Tax Forms",
"url": "[https://portal.ct.gov/drs/drs-forms/current-year-forms/corporation-business-tax-forms](https://portal.ct.gov/drs/drs-forms/current-year-forms/corporation-business-tax-forms)",
"evidenceText": "Connecticut provides current corporation business tax forms, including Form CT-1120 and business credit summary Form CT-1120K.",
"webCitation": "([CT.gov][16])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Connecticut DRS - Electronic Filing Requirement",
"url": "[https://portal.ct.gov/drs/myconnect/corporation-business-tax](https://portal.ct.gov/drs/myconnect/corporation-business-tax)",
"evidenceText": "Connecticut states that all corporation business tax returns must be filed and paid electronically.",
"webCitation": "([CT.gov][17])"
}
],
"geographyDerivedInputs": [
"Connecticut state and municipality can be derived from address.",
"Geography cannot determine Connecticut taxable base, surtax/minimum tax, capital base, credit use, or unitary-combined reporting."
],
"taxpayerSpecificInputs": [
"corporation type",
"tax year",
"Connecticut taxable income",
"capital base if applicable",
"combined reporting data",
"CT-1120K credit schedule",
"filed return"
],
"retrofitOrIncentiveRelevance": "Connecticut business credits require CT-1120K and actual corporation business tax liability before user-facing value.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Delaware",
"taxTypes": [
"corporate income tax",
"gross receipts tax",
"corporate franchise tax"
],
"officialRateSources": [
{
"sourceName": "Delaware Division of Revenue - Gross Receipts Tax FAQ",
"url": "[https://revenue.delaware.gov/business-tax-forms/gross-receipts-tax-faqs/](https://revenue.delaware.gov/business-tax-forms/gross-receipts-tax-faqs/)",
"evidenceText": "Delaware states that gross receipts tax is imposed on total gross revenues and lists rates ranging from 0.0945% to 1.9914%, with separate petroleum rates up to 2.4218%.",
"webCitation": "([Division of Revenue - State of Delaware][18])"
},
{
"sourceName": "Delaware Division of Revenue - Gross Receipts Tax Rates",
"url": "[https://revenue.delaware.gov/business-tax-forms/gross-receipts-tax-rates/](https://revenue.delaware.gov/business-tax-forms/gross-receipts-tax-rates/)",
"evidenceText": "Delaware publishes gross receipts tax rates by business activity and filing frequency.",
"webCitation": "([Division of Revenue - State of Delaware][19])"
},
{
"sourceName": "Delaware Division of Corporations - Franchise Taxes",
"url": "[https://corp.delaware.gov/frtax/](https://corp.delaware.gov/frtax/)",
"evidenceText": "Delaware states that franchise tax and annual report obligations are administered through the Division of Corporations and that domestic corporation annual reports and franchise taxes are due March 1.",
"webCitation": "([Division of Revenue - State of Delaware][20])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Delaware Division of Revenue - Business Tax Forms",
"url": "[https://revenue.delaware.gov/business-tax-forms/](https://revenue.delaware.gov/business-tax-forms/)",
"evidenceText": "Delaware maintains official business tax forms for corporate income and gross receipts tax filing.",
"webCitation": "([Division of Revenue - State of Delaware][21])"
}
],
"geographyDerivedInputs": [
"Delaware state and local address can be derived.",
"Geography can identify possible Delaware GRT nexus location but not activity category, gross receipts, exclusions, franchise-tax method, or corporate income."
],
"taxpayerSpecificInputs": [
"business activity category",
"Delaware gross receipts",
"filing frequency",
"corporate shares or assumed par value data for franchise tax",
"Delaware taxable income",
"credits",
"filed returns"
],
"retrofitOrIncentiveRelevance": "Delaware gross receipts and franchise taxes are classification-heavy. Any rate preference should be gated to taxpayer activity, receipts, and filed-return data.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "District of Columbia",
"taxTypes": [
"corporate franchise tax",
"unincorporated business franchise tax"
],
"officialRateSources": [
{
"sourceName": "District of Columbia Office of Tax and Revenue - Business Franchise Tax Rates",
"url": "[https://otr.cfo.dc.gov/page/business-franchise-tax-rates](https://otr.cfo.dc.gov/page/business-franchise-tax-rates)",
"evidenceText": "DC publishes official business franchise tax rates and minimum tax thresholds for corporate and unincorporated business franchise tax.",
"webCitation": "([Office of Tax and Revenue][22])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "DC OTR - Business Tax Forms and Publications",
"url": "[https://otr.cfo.dc.gov/page/business-tax-forms-and-publications](https://otr.cfo.dc.gov/page/business-tax-forms-and-publications)",
"evidenceText": "DC provides official corporate business franchise tax forms including D-20 and related business tax forms.",
"webCitation": "([Office of Tax and Revenue][23])"
}
],
"geographyDerivedInputs": [
"DC location can be derived from address.",
"Geography cannot determine DC taxable income, entity type, apportionment, deductions, or minimum-tax thresholds."
],
"taxpayerSpecificInputs": [
"entity type",
"DC gross receipts or taxable income thresholds",
"apportionment",
"credits",
"filed D-20 or unincorporated business return"
],
"retrofitOrIncentiveRelevance": "DC business tax incentives require actual DC franchise-tax liability and correct corporate or unincorporated filing status.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Florida",
"taxTypes": [
"corporate income tax",
"franchise tax"
],
"officialRateSources": [
{
"sourceName": "Florida Department of Revenue - Corporate Income Tax",
"url": "[https://floridarevenue.com/taxes/taxesfees/Pages/corporate.aspx](https://floridarevenue.com/taxes/taxesfees/Pages/corporate.aspx)",
"evidenceText": "Florida provides official corporate income/franchise tax information through the Department of Revenue.",
"webCitation": "([Florida Department of Revenue][24])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Florida Department of Revenue - Corporate Income Tax Forms",
"url": "[https://floridarevenue.com/Forms_library/current/f1120.pdf](https://floridarevenue.com/Forms_library/current/f1120.pdf)",
"evidenceText": "Florida publishes official corporate income/franchise tax forms including Form F-1120 and instructions.",
"webCitation": "([Florida Department of Revenue][25])"
},
{
"sourceName": "Florida Department of Revenue - e-Services",
"url": "[https://floridarevenue.com/taxes/eservices/Pages/filepay.aspx](https://floridarevenue.com/taxes/eservices/Pages/filepay.aspx)",
"evidenceText": "Florida provides official electronic filing and payment sources for corporate income/franchise tax.",
"webCitation": "([Florida Tax Apps][26])"
}
],
"geographyDerivedInputs": [
"Florida state and local address can be derived.",
"Geography cannot determine Florida taxable income, apportionment, exemptions, or credit limitations."
],
"taxpayerSpecificInputs": [
"entity type",
"Florida taxable income",
"apportionment",
"credits",
"filed F-1120 data"
],
"retrofitOrIncentiveRelevance": "Florida business tax preferences should be capped by actual corporate income/franchise tax due after official credit ordering.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Georgia",
"taxTypes": [
"corporate income tax",
"corporate net worth tax"
],
"officialRateSources": [
{
"sourceName": "Georgia Department of Revenue - Corporation Tax",
"url": "[https://dor.georgia.gov/taxes/business-taxes/corporation-tax](https://dor.georgia.gov/taxes/business-taxes/corporation-tax)",
"evidenceText": "Georgia identifies corporate income tax and net worth tax as business taxes administered by the Department of Revenue.",
"webCitation": "([Department of Revenue][27])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Georgia DOR - IT-611 Corporation Income Tax Booklet",
"url": "[https://dor.georgia.gov/it-611-corporation-income-tax-booklet](https://dor.georgia.gov/it-611-corporation-income-tax-booklet)",
"evidenceText": "Georgia publishes an official corporation income tax booklet for filing instructions.",
"webCitation": "([Department of Revenue][28])"
}
],
"geographyDerivedInputs": [
"Georgia state and local location can be derived.",
"Address cannot determine Georgia taxable income, apportionment, net worth, credits, or incentive eligibility."
],
"taxpayerSpecificInputs": [
"Georgia taxable income",
"net worth tax base",
"apportionment",
"credits",
"IT-611/Form 600 data",
"filed return"
],
"retrofitOrIncentiveRelevance": "Georgia credits require tax-return data and should not be included in totals without confirmed Georgia tax liability.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Hawaii",
"taxTypes": [
"corporate income tax",
"general excise tax for business context"
],
"officialRateSources": [
{
"sourceName": "Hawaii Department of Taxation - Tax Forms",
"url": "[https://tax.hawaii.gov/forms/](https://tax.hawaii.gov/forms/)",
"evidenceText": "Hawaii maintains official tax forms and instructions, including corporation income tax forms such as Form N-30.",
"webCitation": "([Hawaii Department of Taxation][29])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Hawaii Department of Taxation - Corporation Income Tax Forms",
"url": "[https://tax.hawaii.gov/forms/a1_1alphalist/](https://tax.hawaii.gov/forms/a1_1alphalist/)",
"evidenceText": "Hawaii provides corporation income tax forms and instructions through its official forms list.",
"webCitation": "([Hawaii Department of Taxation][30])"
}
],
"geographyDerivedInputs": [
"Hawaii state and county island location can be derived.",
"Geography does not determine taxable income, Hawaii apportionment, GET gross receipts, deductions, or credits."
],
"taxpayerSpecificInputs": [
"corporate taxable income",
"Hawaii apportionment",
"GET activity and gross income if relevant",
"credit schedules",
"filed Hawaii returns"
],
"retrofitOrIncentiveRelevance": "Hawaii income-tax credits and gross-receipts effects require filed-return inputs and should be gated.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Idaho",
"taxTypes": [
"corporate income tax",
"business income tax"
],
"officialRateSources": [
{
"sourceName": "Idaho State Tax Commission - Business Income Tax",
"url": "[https://tax.idaho.gov/taxes/income-tax/business-income/](https://tax.idaho.gov/taxes/income-tax/business-income/)",
"evidenceText": "Idaho provides official business income tax guidance and filing information.",
"webCitation": "([Idaho State Tax Commission][31])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Idaho State Tax Commission - Business Income Tax Forms",
"url": "[https://tax.idaho.gov/forms/formtype/business-income/](https://tax.idaho.gov/forms/formtype/business-income/)",
"evidenceText": "Idaho maintains official business income tax forms and instructions.",
"webCitation": "([Idaho State Tax Commission][32])"
}
],
"geographyDerivedInputs": [
"Idaho state and local address can be derived.",
"Geography cannot determine Idaho taxable income, apportionment, unitary group status, minimum tax, or credits."
],
"taxpayerSpecificInputs": [
"entity type",
"Idaho taxable income",
"apportionment",
"unitary group data",
"credits",
"filed Idaho return"
],
"retrofitOrIncentiveRelevance": "Idaho credits or preferences require state return data before inclusion in user-facing totals.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Illinois",
"taxTypes": [
"corporate income tax",
"personal property replacement tax"
],
"officialRateSources": [
{
"sourceName": "Illinois Department of Revenue - Business Income Tax Rates",
"url": "[https://tax.illinois.gov/businesses/taxinformation/income/rates.html](https://tax.illinois.gov/businesses/taxinformation/income/rates.html)",
"evidenceText": "Illinois publishes official business income tax and replacement tax rates; the page states corporations are taxed at 7% for income tax and 2.5% for replacement tax.",
"webCitation": "([Illinois Department of Revenue][33])"
},
{
"sourceName": "Illinois Department of Revenue - Replacement Tax",
"url": "[https://tax.illinois.gov/businesses/taxinformation/income/replacementtax.html](https://tax.illinois.gov/businesses/taxinformation/income/replacementtax.html)",
"evidenceText": "Illinois identifies replacement tax as a tax on corporations, partnerships, trusts, and S corporations.",
"webCitation": "([Illinois Department of Revenue][34])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Illinois Department of Revenue - IL-1120 Forms",
"url": "[https://tax.illinois.gov/forms/incometax/business/il-1120.html](https://tax.illinois.gov/forms/incometax/business/il-1120.html)",
"evidenceText": "Illinois provides official corporation income and replacement tax return forms.",
"webCitation": "([Illinois Department of Revenue][35])"
}
],
"geographyDerivedInputs": [
"Illinois state and local location can be derived.",
"Address cannot determine Illinois base income, replacement tax base, unitary status, apportionment, or credits."
],
"taxpayerSpecificInputs": [
"base income",
"apportionment",
"replacement tax base",
"credits",
"unitary or combined reporting data",
"IL-1120 data"
],
"retrofitOrIncentiveRelevance": "Illinois business tax incentive values should be capped by actual income and replacement tax liabilities.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Indiana",
"taxTypes": [
"corporate adjusted gross income tax"
],
"officialRateSources": [
{
"sourceName": "Indiana Department of Revenue - Corporate and Partnership Forms",
"url": "[https://www.in.gov/dor/tax-forms/corporate-and-partnership-forms/](https://www.in.gov/dor/tax-forms/corporate-and-partnership-forms/)",
"evidenceText": "Indiana publishes official corporate and partnership income tax forms and instructions.",
"webCitation": "([Government of India][36])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Indiana DOR - Corporation Income Tax Instructions",
"url": "[https://www.in.gov/dor/tax-forms/corporate-and-partnership-forms/](https://www.in.gov/dor/tax-forms/corporate-and-partnership-forms/)",
"evidenceText": "The current official forms page is the authoritative filing-source entry point for Indiana corporate adjusted gross income tax.",
"webCitation": "([Government of India][36])"
}
],
"geographyDerivedInputs": [
"Indiana state and local location can be derived.",
"Geography cannot determine Indiana adjusted gross income, apportionment, addbacks, credits, or nexus."
],
"taxpayerSpecificInputs": [
"federal taxable income",
"Indiana modifications",
"apportionment",
"credits",
"filed Indiana corporate return"
],
"retrofitOrIncentiveRelevance": "Indiana credit estimates require current-year official instructions and taxpayer return inputs.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Iowa",
"taxTypes": [
"corporate income tax",
"business tax credits"
],
"officialRateSources": [
{
"sourceName": "Iowa Department of Revenue - Corporate Income Tax Rates",
"url": "[https://tax.iowa.gov/tax-guidance/corporation-income-tax/corporate-income-tax-rates](https://tax.iowa.gov/tax-guidance/corporation-income-tax/corporate-income-tax-rates)",
"evidenceText": "Iowa publishes official corporate income tax rates and states that 2024 and later rates are 5.5% on the first $100,000 and 7.1% on taxable income over $100,000, with future reductions tied to statutory revenue triggers.",
"webCitation": "([Department of Revenue][37])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Iowa Department of Revenue - Corporation Income Tax Forms",
"url": "[https://tax.iowa.gov/forms?combine=IA+1120](https://tax.iowa.gov/forms?combine=IA+1120)",
"evidenceText": "Iowa provides official corporate income tax forms, including Form IA 1120 and business credit schedules such as IA 148.",
"webCitation": "([Department of Revenue][38])"
}
],
"geographyDerivedInputs": [
"Iowa state and local location can be derived.",
"Geography cannot determine Iowa taxable income bracket, apportionment, credit certificates, or tax liability."
],
"taxpayerSpecificInputs": [
"Iowa taxable income",
"apportionment",
"credit certificate data",
"IA 148 credits",
"filed IA 1120"
],
"retrofitOrIncentiveRelevance": "Iowa business credits should be displayed only after credit certificate and tax-return data are available.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Kansas",
"taxTypes": [
"corporate income tax"
],
"officialRateSources": [
{
"sourceName": "Kansas Department of Revenue - Corporate Income Tax Forms",
"url": "[https://www.ksrevenue.gov/bustaxtypescorp.html](https://www.ksrevenue.gov/bustaxtypescorp.html)",
"evidenceText": "Kansas provides official corporation income tax forms and current K-120 filing instructions.",
"webCitation": "([Kansas Department of Revenue][39])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Kansas Department of Revenue - K-120 Instructions",
"url": "[https://www.ksrevenue.gov/pdf/k-12025.pdf](https://www.ksrevenue.gov/pdf/k-12025.pdf)",
"evidenceText": "Kansas publishes official K-120 corporation income tax instructions for return preparation.",
"webCitation": "([Kansas Department of Revenue][40])"
}
],
"geographyDerivedInputs": [
"Kansas state and local location can be derived.",
"Geography cannot determine Kansas taxable income, surtax exposure, apportionment, or credits."
],
"taxpayerSpecificInputs": [
"Kansas taxable income",
"surtax base if applicable",
"apportionment",
"credits",
"filed K-120"
],
"retrofitOrIncentiveRelevance": "Kansas business tax preferences require current-year K-120 inputs and should be gated to accountant review.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Kentucky",
"taxTypes": [
"corporate income tax",
"limited liability entity tax"
],
"officialRateSources": [
{
"sourceName": "Kentucky Department of Revenue - Corporation Income and LLET",
"url": "[https://revenue.ky.gov/Business/Pages/Corporation-Income-and-LLET.aspx](https://revenue.ky.gov/Business/Pages/Corporation-Income-and-LLET.aspx)",
"evidenceText": "Kentucky states that corporate income tax is a flat 5% of taxable income and that the limited liability entity tax applies to limited liability pass-through entities.",
"webCitation": "([Department of Revenue][41])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Kentucky Department of Revenue - Corporation Income and LLET Forms",
"url": "[https://revenue.ky.gov/Forms/720%20Instructions%202025.pdf](https://revenue.ky.gov/Forms/720%20Instructions%202025.pdf)",
"evidenceText": "Kentucky publishes official corporation income and limited liability entity tax forms and instructions.",
"webCitation": "([Department of Revenue][42])"
}
],
"geographyDerivedInputs": [
"Kentucky state and local occupational-tax jurisdictions can be derived from address only as possible jurisdictions.",
"Geography cannot determine taxable income, LLET base, local occupational receipts or payroll, or nexus."
],
"taxpayerSpecificInputs": [
"entity type",
"Kentucky taxable income",
"LLET gross receipts or gross profits base",
"apportionment",
"credits",
"local occupational tax returns if applicable"
],
"retrofitOrIncentiveRelevance": "Kentucky income and LLET incentives require state return inputs; local occupational taxes require separate local filings.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Louisiana",
"taxTypes": [
"corporate income tax",
"corporate franchise tax through repeal period"
],
"officialRateSources": [
{
"sourceName": "Louisiana Department of Revenue - Corporate Income Tax",
"url": "[https://revenue.louisiana.gov/CorporationIncomeAndFranchiseTaxes](https://revenue.louisiana.gov/CorporationIncomeAndFranchiseTaxes)",
"evidenceText": "Louisiana states that for taxable periods beginning on or after January 1, 2025, corporate income tax is imposed at a flat 5.5% rate.",
"webCitation": "([Louisiana Department of Revenue][43])"
},
{
"sourceName": "Louisiana Department of Revenue - Franchise Tax Repeal",
"url": "[https://revenue.louisiana.gov/CorporationIncomeAndFranchiseTaxes](https://revenue.louisiana.gov/CorporationIncomeAndFranchiseTaxes)",
"evidenceText": "Louisiana states that Act 1 of the 2024 Third Extraordinary Session repeals corporate franchise tax for franchise tax periods beginning on or after January 1, 2026.",
"webCitation": "([Louisiana Department of Revenue][44])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Louisiana Department of Revenue - Business Tax Forms",
"url": "[https://revenue.louisiana.gov/Forms/ForBusinesses](https://revenue.louisiana.gov/Forms/ForBusinesses)",
"evidenceText": "Louisiana provides official corporation income/franchise tax forms and business incentive forms.",
"webCitation": "([Louisiana Department of Revenue][45])"
}
],
"geographyDerivedInputs": [
"Louisiana state and parish location can be derived.",
"Geography cannot determine corporate taxable income, franchise-tax period, apportionment, or credit limits."
],
"taxpayerSpecificInputs": [
"tax year",
"franchise tax period",
"Louisiana taxable income",
"apportionment",
"credits",
"CIFT return data"
],
"retrofitOrIncentiveRelevance": "Louisiana incentives must respect the franchise-tax repeal period and actual corporate income-tax liability.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Maine",
"taxTypes": [
"corporate income tax",
"business tax credits"
],
"officialRateSources": [
{
"sourceName": "Maine Revenue Services - Corporate Income Tax",
"url": "[https://www.maine.gov/revenue/taxes/income-estate-tax/corporate-income-tax](https://www.maine.gov/revenue/taxes/income-estate-tax/corporate-income-tax)",
"evidenceText": "Maine publishes official graduated corporate income tax rates ranging from 3.5% to 8.93% across taxable-income brackets.",
"webCitation": "([Maine][46])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Maine Revenue Services - Corporate Tax Forms",
"url": "[https://www.maine.gov/revenue/tax-return-forms/corporate-tax](https://www.maine.gov/revenue/tax-return-forms/corporate-tax)",
"evidenceText": "Maine provides current corporate income tax forms, including Form 1120ME and Schedule C for tax credits.",
"webCitation": "([Maine][47])"
}
],
"geographyDerivedInputs": [
"Maine state and municipal address can be derived.",
"Geography cannot determine taxable income bracket, Maine apportionment, or credit usability."
],
"taxpayerSpecificInputs": [
"Maine taxable income",
"apportionment",
"credits on Schedule C",
"filed 1120ME",
"carryforward data"
],
"retrofitOrIncentiveRelevance": "Maine tax credit value should be based on Schedule C and actual corporate tax liability.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Maryland",
"taxTypes": [
"corporate income tax",
"business income tax credits"
],
"officialRateSources": [
{
"sourceName": "Maryland Comptroller - Corporate Income Tax Forms",
"url": "[https://www.marylandtaxes.gov/business/income/forms.php](https://www.marylandtaxes.gov/business/income/forms.php)",
"evidenceText": "Maryland provides official corporation income tax forms and business income tax credit forms, including Form 500 and Form 500CR.",
"webCitation": "([Maryland Comptroller][48])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Maryland Comptroller - Form 500CR",
"url": "[https://www.marylandtaxes.gov/business/income/500CR.php](https://www.marylandtaxes.gov/business/income/500CR.php)",
"evidenceText": "Maryland states that most business tax credits are claimed on Form 500CR and that the form must be filed electronically for business credits generated after tax year 2012.",
"webCitation": "([Maryland Comptroller][49])"
}
],
"geographyDerivedInputs": [
"Maryland state, county, and municipality can be derived.",
"Geography cannot determine Maryland taxable income, credit certificates, apportionment, or credit ordering."
],
"taxpayerSpecificInputs": [
"Maryland taxable income",
"apportionment",
"Form 500CR credit data",
"certificate numbers if required",
"filed Form 500"
],
"retrofitOrIncentiveRelevance": "Maryland business tax credits should be calculated from Form 500CR and gated until taxpayer liability and credit documentation are available.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Massachusetts",
"taxTypes": [
"corporate excise tax",
"income measure",
"non-income measure"
],
"officialRateSources": [
{
"sourceName": "Massachusetts Department of Revenue - Corporate Excise Forms and Instructions",
"url": "[https://www.mass.gov/lists/corporate-excise-tax-forms-and-instructions](https://www.mass.gov/lists/corporate-excise-tax-forms-and-instructions)",
"evidenceText": "Massachusetts publishes official corporate excise tax forms and instructions.",
"webCitation": "([Massachusetts Government][50])"
},
{
"sourceName": "Massachusetts Secretary of the Commonwealth - Corporate Tax Information",
"url": "[https://www.sec.state.ma.us/divisions/corporations/tax-information.htm](https://www.sec.state.ma.us/divisions/corporations/tax-information.htm)",
"evidenceText": "Massachusetts explains that corporations may owe both an income measure and non-income measure of corporate excise, or a $456 minimum excise.",
"webCitation": "([Massachusetts Sec. of the Commonwealth][51])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Massachusetts DOR - 2025 Corporate Excise Forms",
"url": "[https://www.mass.gov/lists/2025-corporate-excise-tax-forms-and-instructions](https://www.mass.gov/lists/2025-corporate-excise-tax-forms-and-instructions)",
"evidenceText": "Massachusetts provides current-year corporate excise forms and instructions.",
"webCitation": "([Massachusetts Government][52])"
}
],
"geographyDerivedInputs": [
"Massachusetts state and municipality can be derived.",
"Geography cannot determine income measure, non-income measure, tangible property/net worth base, apportionment, or credits."
],
"taxpayerSpecificInputs": [
"Massachusetts taxable net income",
"non-income measure base",
"apportionment",
"minimum excise applicability",
"credits",
"filed corporate excise return"
],
"retrofitOrIncentiveRelevance": "Massachusetts incentives can affect either corporate excise liability or credit schedules and require return data.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Michigan",
"taxTypes": [
"corporate income tax",
"property tax abatements",
"local income tax special cases",
"Renaissance Zone abatements"
],
"officialRateSources": [
{
"sourceName": "Michigan Department of Treasury - Corporate Income Tax",
"url": "[https://www.michigan.gov/taxes/business-taxes/cit](https://www.michigan.gov/taxes/business-taxes/cit)",
"evidenceText": "Michigan states that the Corporate Income Tax is imposed at 6% on C corporations with Michigan business activity and that a 1.8% small business alternative credit may apply.",
"webCitation": "([Michigan][53])"
},
{
"sourceName": "Michigan Legislature - Michigan Renaissance Zone Act",
"url": "[https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-Act-376-of-1996](https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-Act-376-of-1996)",
"evidenceText": "Michigan provides the official statutory source for Renaissance Zone authority.",
"webCitation": "([Michigan Legislature][54])"
},
{
"sourceName": "Michigan Economic Development Corporation - Renewable Energy Renaissance Zones",
"url": "[https://www.michiganbusiness.org/4a817a/globalassets/documents/macc/rerz.pdf](https://www.michiganbusiness.org/4a817a/globalassets/documents/macc/rerz.pdf)",
"evidenceText": "Michigan's official program material states that approved RERZ facilities do not pay state education tax, personal and real property taxes, and local income tax where applicable, while other taxes and special assessments remain outside the exemption.",
"webCitation": "([MEDC][55])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Michigan Treasury - Business Tax Forms",
"url": "[https://www.michigan.gov/taxes/business-taxes/business-tax-forms](https://www.michigan.gov/taxes/business-taxes/business-tax-forms)",
"evidenceText": "Michigan provides official business tax forms for CIT and related schedules.",
"webCitation": "([Michigan][56])"
}
],
"geographyDerivedInputs": [
"Michigan address can identify state, city, county, parcel, local income-tax city possibility, and local property taxing authorities.",
"Geography alone cannot determine approved Renewable Energy Renaissance Zone designation, approved zone term, program year, phaseout multiplier, tax-current status, eligible local income-tax liability, or actual property-tax liabilities."
],
"taxpayerSpecificInputs": [
"Michigan CIT return data for general corporate tax caps",
"approved RERZ designation documents",
"qualified renewable-energy operations",
"company current on state and local taxes",
"approved zone term and year",
"phaseout multiplier",
"state education tax otherwise due",
"real property tax otherwise due",
"personal property tax otherwise due",
"local income tax otherwise due if applicable"
],
"retrofitOrIncentiveRelevance": "Michigan is a concrete special case for RetroFi's Renewable Energy Renaissance Zone package. The value should be modeled as approved abated state education, property, and applicable local income taxes, not as a generic corporate income tax credit.",
"recommendedEstimateStatus": "suppress_until_review",
"sourceConfidence": "high"
},
{
"state": "Minnesota",
"taxTypes": [
"corporation franchise tax",
"minimum fee",
"business credits"
],
"officialRateSources": [
{
"sourceName": "Minnesota Department of Revenue - Corporation Franchise Tax",
"url": "[https://www.revenue.state.mn.us/corporation-franchise-tax](https://www.revenue.state.mn.us/corporation-franchise-tax)",
"evidenceText": "Minnesota provides official corporation franchise tax filing information for C corporations with Minnesota business activity, presence, or Minnesota gross income.",
"webCitation": "([Minnesota Department of Revenue][57])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Minnesota Department of Revenue - Form M4 and Minimum Fee",
"url": "[https://www.revenue.state.mn.us/corporation-franchise-tax-forms-and-instructions](https://www.revenue.state.mn.us/corporation-franchise-tax-forms-and-instructions)",
"evidenceText": "Minnesota provides Form M4 and minimum-fee instructions; the minimum fee is based on Minnesota property, payroll, and sales.",
"webCitation": "([mn.gov // Minnesota's State Portal][58])"
}
],
"geographyDerivedInputs": [
"Minnesota state and local address can be derived.",
"Geography cannot determine Minnesota property, payroll, sales, taxable income, combined reporting, or credits."
],
"taxpayerSpecificInputs": [
"Minnesota taxable income",
"Minnesota property/payroll/sales",
"apportionment",
"credits",
"Form M4 data"
],
"retrofitOrIncentiveRelevance": "Minnesota incentives require Form M4 and credit schedule inputs to calculate actual liability reductions.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Mississippi",
"taxTypes": [
"corporate income tax",
"corporate franchise tax"
],
"officialRateSources": [
{
"sourceName": "Mississippi Department of Revenue - Corporate Income and Franchise Tax Forms",
"url": "[https://www.dor.ms.gov/business/corporate-income-and-franchise-tax-forms](https://www.dor.ms.gov/business/corporate-income-and-franchise-tax-forms)",
"evidenceText": "Mississippi provides official Form 83-105 corporate income and franchise tax return materials.",
"webCitation": "([Mississippi Department of Revenue][59])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Mississippi DOR - Form 83-105 Instructions",
"url": "[https://www.dor.ms.gov/business/corporate-income-and-franchise-tax-forms](https://www.dor.ms.gov/business/corporate-income-and-franchise-tax-forms)",
"evidenceText": "Mississippi's official forms page is the filing-source entry point for current corporate income and franchise tax instructions.",
"webCitation": "([Mississippi Department of Revenue][59])"
}
],
"geographyDerivedInputs": [
"Mississippi state and local address can be derived.",
"Geography cannot determine taxable income, capital/franchise base, apportionment, or credits."
],
"taxpayerSpecificInputs": [
"Mississippi taxable income",
"franchise tax base",
"apportionment",
"credits",
"filed Form 83-105"
],
"retrofitOrIncentiveRelevance": "Mississippi income/franchise tax preferences require actual return data and credit schedules.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Missouri",
"taxTypes": [
"corporate income tax",
"local earnings tax special cases"
],
"officialRateSources": [
{
"sourceName": "Missouri Department of Revenue - Corporation Income Tax",
"url": "[https://dor.mo.gov/taxation/business/corporate/](https://dor.mo.gov/taxation/business/corporate/)",
"evidenceText": "Missouri provides official corporation income tax information and filing sources.",
"webCitation": "([Missouri Department of Revenue][60])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Missouri Department of Revenue - MO-1120",
"url": "[https://dor.mo.gov/forms/?formName=MO-1120](https://dor.mo.gov/forms/?formName=MO-1120)",
"evidenceText": "Missouri provides official MO-1120 corporation income tax forms and instructions.",
"webCitation": "([Missouri Department of Revenue][61])"
}
],
"geographyDerivedInputs": [
"Missouri state and local city location can be derived.",
"Geography can flag Kansas City or St. Louis earnings-tax possibility, but cannot determine net profits, payroll, work location allocation, or state taxable income."
],
"taxpayerSpecificInputs": [
"Missouri taxable income",
"apportionment",
"credits",
"city net profits or earnings-tax base if applicable",
"filed state and city returns"
],
"retrofitOrIncentiveRelevance": "Missouri state and local tax preferences require both state return data and local earnings-tax inputs for affected cities.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Montana",
"taxTypes": [
"corporate income tax"
],
"officialRateSources": [
{
"sourceName": "Montana Department of Revenue - Corporation Income Tax",
"url": "[https://mtrevenue.gov/taxes/corporation-income-tax/](https://mtrevenue.gov/taxes/corporation-income-tax/)",
"evidenceText": "Montana states that any C corporation doing business in Montana, or receiving income from Montana sources, must file Form CIT and pay Montana corporation income tax.",
"webCitation": "([Montana Department of Revenue][62])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Montana Department of Revenue - Corporation Income Tax Forms",
"url": "[https://mtrevenue.gov/taxes/corporation-income-tax/forms/](https://mtrevenue.gov/taxes/corporation-income-tax/forms/)",
"evidenceText": "Montana provides official corporation income tax forms and instructions, including Form CIT materials.",
"webCitation": "([Montana Department of Revenue][63])"
}
],
"geographyDerivedInputs": [
"Montana state and local location can be derived.",
"Geography cannot determine Montana-source income, apportionment, deductions, credits, or filing group."
],
"taxpayerSpecificInputs": [
"Montana taxable income",
"apportionment",
"credits",
"federal return inputs",
"filed Form CIT"
],
"retrofitOrIncentiveRelevance": "Montana income-tax incentives should be calculated only against actual Montana corporate income tax liability.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Nebraska",
"taxTypes": [
"corporate income tax"
],
"officialRateSources": [
{
"sourceName": "Nebraska Department of Revenue - Corporation Income Tax Forms",
"url": "[https://revenue.nebraska.gov/businesses/corporation-income-tax-forms](https://revenue.nebraska.gov/businesses/corporation-income-tax-forms)",
"evidenceText": "Nebraska provides official corporation income tax return forms and instructions, including Form 1120N.",
"webCitation": "([Nebraska Department of Revenue][64])"
},
{
"sourceName": "Nebraska Department of Revenue - Business Income Tax FAQs",
"url": "[https://revenue.nebraska.gov/about/frequently-asked-questions/business-income-tax-frequently-asked-questions](https://revenue.nebraska.gov/about/frequently-asked-questions/business-income-tax-frequently-asked-questions)",
"evidenceText": "Nebraska provides official business income tax FAQs for corporation income tax administration.",
"webCitation": "([Nebraska Department of Revenue][65])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Nebraska DOR - Form 1120N Instructions",
"url": "[https://revenue.nebraska.gov/businesses/corporation-income-tax-forms](https://revenue.nebraska.gov/businesses/corporation-income-tax-forms)",
"evidenceText": "Nebraska's official corporation income tax forms page is the source for current 1120N instructions and schedules.",
"webCitation": "([Nebraska Department of Revenue][64])"
}
],
"geographyDerivedInputs": [
"Nebraska state and local location can be derived.",
"Geography cannot determine taxable income bracket, Nebraska apportionment, or credits."
],
"taxpayerSpecificInputs": [
"Nebraska taxable income",
"apportionment",
"credits",
"Form 1120N schedules",
"filed return"
],
"retrofitOrIncentiveRelevance": "Nebraska incentives should be valued only from official forms and taxpayer liability.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Nevada",
"taxTypes": [
"commerce tax",
"modified business tax"
],
"officialRateSources": [
{
"sourceName": "Nevada Department of Taxation - Commerce Tax and Modified Business Tax",
"url": "[https://tax.nv.gov/](https://tax.nv.gov/)",
"evidenceText": "Nevada administers Commerce Tax and Modified Business Tax through the Department of Taxation and official File & Pay systems.",
"webCitation": "([Nevada Department of Taxation][66])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Nevada Department of Taxation - Tax Forms and My Nevada Tax",
"url": "[https://tax.nv.gov/Forms/](https://tax.nv.gov/Forms/)",
"evidenceText": "Nevada identifies official filing sources and migration of Commerce Tax and Modified Business Tax services to My Nevada Tax.",
"webCitation": "([Nevada Department of Taxation][67])"
}
],
"geographyDerivedInputs": [
"Nevada state location can be derived.",
"Geography cannot determine Nevada gross revenue by business category, exclusions, payroll/wages for modified business tax, or filing thresholds."
],
"taxpayerSpecificInputs": [
"Nevada gross revenue",
"business category",
"commerce tax exclusions",
"wage base for modified business tax",
"filed Nevada returns"
],
"retrofitOrIncentiveRelevance": "Nevada has no general corporate income tax, but Commerce Tax and Modified Business Tax can affect incentive valuation if a program references gross receipts or payroll taxes.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "New Hampshire",
"taxTypes": [
"business profits tax",
"business enterprise tax"
],
"officialRateSources": [
{
"sourceName": "New Hampshire Department of Revenue Administration - Business Taxes",
"url": "[https://www.revenue.nh.gov/businesses/business-profits-tax](https://www.revenue.nh.gov/businesses/business-profits-tax)",
"evidenceText": "New Hampshire publishes official business tax information and states that the Business Profits Tax rate is 7.5% for taxable periods ending on or after December 31, 2023.",
"webCitation": "([NH Revenue Administration][68])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "New Hampshire DRA - Current Business Tax Forms",
"url": "[https://www.revenue.nh.gov/forms/business-tax-forms](https://www.revenue.nh.gov/forms/business-tax-forms)",
"evidenceText": "New Hampshire provides current business tax forms and instructions.",
"webCitation": "([NH Revenue Administration][69])"
}
],
"geographyDerivedInputs": [
"New Hampshire state and local address can be derived.",
"Geography cannot determine gross business profits, enterprise value tax base, apportionment, or credits."
],
"taxpayerSpecificInputs": [
"business profits",
"enterprise value tax base",
"apportionment",
"credits",
"filed NH business tax returns"
],
"retrofitOrIncentiveRelevance": "New Hampshire tax preferences require actual BPT/BET return data and credit schedules.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "New Jersey",
"taxTypes": [
"corporation business tax",
"surtax or special rates where applicable"
],
"officialRateSources": [
{
"sourceName": "New Jersey Division of Taxation - Corporation Business Tax Rates",
"url": "[https://www.nj.gov/treasury/taxation/cbt/cbtrates.shtml](https://www.nj.gov/treasury/taxation/cbt/cbtrates.shtml)",
"evidenceText": "New Jersey publishes official corporation business tax rates; the page lists rates by entire net income brackets, including 9% when entire net income exceeds $100,000.",
"webCitation": "([NJ.gov][70])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "New Jersey Division of Taxation - CBT Returns",
"url": "[https://www.nj.gov/treasury/taxation/cbt/cbtreturns.shtml](https://www.nj.gov/treasury/taxation/cbt/cbtreturns.shtml)",
"evidenceText": "New Jersey provides official CBT returns, forms, and instructions.",
"webCitation": "([NJ.gov][71])"
}
],
"geographyDerivedInputs": [
"New Jersey state and local location can be derived.",
"Geography cannot determine entire net income, allocation, combined group status, surtax exposure, or credits."
],
"taxpayerSpecificInputs": [
"entire net income",
"allocation",
"combined reporting data",
"credits",
"CBT return data"
],
"retrofitOrIncentiveRelevance": "New Jersey incentives require CBT return data and official credit schedules before user-facing value.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "New Mexico",
"taxTypes": [
"corporate income tax",
"corporate franchise tax"
],
"officialRateSources": [
{
"sourceName": "New Mexico Taxation and Revenue Department - CIT-1 Overview",
"url": "[https://www.tax.newmexico.gov/businesses/corporate-income-franchise-tax-overview/](https://www.tax.newmexico.gov/businesses/corporate-income-franchise-tax-overview/)",
"evidenceText": "New Mexico states that a $50 franchise tax applies to corporations with a corporate franchise in New Mexico, including inactive corporations and corporations with no corporate income tax due.",
"webCitation": "([Taxation and Revenue New Mexico][72])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "New Mexico Taxation and Revenue Department - CIT-1 Return",
"url": "[https://www.tax.newmexico.gov/businesses/corporate-income-franchise-tax-overview/](https://www.tax.newmexico.gov/businesses/corporate-income-franchise-tax-overview/)",
"evidenceText": "New Mexico identifies the CIT-1 return as the annual corporate income and franchise tax filing source.",
"webCitation": "([Taxation and Revenue New Mexico][73])"
}
],
"geographyDerivedInputs": [
"New Mexico state and local location can be derived.",
"Geography cannot determine corporate franchise status, New Mexico taxable income, apportionment, or credits."
],
"taxpayerSpecificInputs": [
"corporate franchise status",
"New Mexico taxable income",
"apportionment",
"credits",
"CIT-1 return data"
],
"retrofitOrIncentiveRelevance": "New Mexico incentives should account for both income-tax liability and the separate franchise-tax obligation where applicable.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "New York",
"taxTypes": [
"corporation franchise tax",
"metropolitan transportation business tax surcharges",
"New York City business taxes as local special cases"
],
"officialRateSources": [
{
"sourceName": "New York State Department of Taxation and Finance - Corporation Tax",
"url": "[https://www.tax.ny.gov/bus/ct/](https://www.tax.ny.gov/bus/ct/)",
"evidenceText": "New York provides official corporation tax information, including current tax-year filing guidance.",
"webCitation": "([NY Taxation and Finance][74])"
},
{
"sourceName": "New York State - CT-3 Instructions",
"url": "[https://www.tax.ny.gov/forms/current-forms/ct/ct3i.htm](https://www.tax.ny.gov/forms/current-forms/ct/ct3i.htm)",
"evidenceText": "New York publishes official CT-3 general business corporation franchise tax instructions.",
"webCitation": "([NY Taxation and Finance][75])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "New York State Department of Taxation and Finance - Corporation Tax Forms",
"url": "[https://www.tax.ny.gov/forms/corp_tax_cur_forms.htm](https://www.tax.ny.gov/forms/corp_tax_cur_forms.htm)",
"evidenceText": "New York provides official current corporation tax forms and instructions.",
"webCitation": "([NY Taxation and Finance][74])"
}
],
"geographyDerivedInputs": [
"New York state, county, city, and MCTD/NYC location can be derived from address.",
"Geography cannot determine tax base measure, capital base, fixed dollar minimum, MTA surcharge base, combined group status, or credits."
],
"taxpayerSpecificInputs": [
"New York business income base",
"capital base or fixed-dollar minimum if applicable",
"apportionment",
"combined group data",
"credits",
"CT-3 return data",
"NYC returns if applicable"
],
"retrofitOrIncentiveRelevance": "New York incentives and NYC local taxes require taxpayer return data; address can only route to possible state and local tax regimes.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "North Carolina",
"taxTypes": [
"corporate income tax",
"franchise tax"
],
"officialRateSources": [
{
"sourceName": "North Carolina Department of Revenue - Corporate Income and Franchise Tax Rates",
"url": "[https://www.ncdor.gov/taxes-forms/corporate-income-franchise-tax/corporate-income-tax-and-franchise-tax-rates](https://www.ncdor.gov/taxes-forms/corporate-income-franchise-tax/corporate-income-tax-and-franchise-tax-rates)",
"evidenceText": "North Carolina publishes official corporate income and franchise tax rates, including a 2026 corporate income tax rate of 2.00% and franchise tax rates and bases.",
"webCitation": "([NCDOR][76])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "North Carolina DOR - Corporate Tax Forms and Instructions",
"url": "[https://www.ncdor.gov/taxes-forms/corporate-income-franchise-tax](https://www.ncdor.gov/taxes-forms/corporate-income-franchise-tax)",
"evidenceText": "North Carolina provides official corporate income and franchise tax forms and instructions.",
"webCitation": "([NCDOR][77])"
}
],
"geographyDerivedInputs": [
"North Carolina state and local address can be derived.",
"Geography cannot determine franchise tax base, taxable income, apportionment, or credits."
],
"taxpayerSpecificInputs": [
"North Carolina taxable income",
"franchise tax base",
"apportionment",
"credits",
"filed corporate return"
],
"retrofitOrIncentiveRelevance": "North Carolina tax preferences should be applied only to actual corporate income and franchise tax liabilities.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "North Dakota",
"taxTypes": [
"corporate income tax"
],
"officialRateSources": [
{
"sourceName": "North Dakota Office of State Tax Commissioner - Corporation Income Tax",
"url": "[https://www.tax.nd.gov/business/corporation-income-tax](https://www.tax.nd.gov/business/corporation-income-tax)",
"evidenceText": "North Dakota states that every corporation doing business in North Dakota or deriving income from North Dakota sources must file Form 40.",
"webCitation": "([ND Tax Commissioner][78])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "North Dakota Tax - Corporation Income Tax Forms",
"url": "[https://www.tax.nd.gov/forms](https://www.tax.nd.gov/forms)",
"evidenceText": "North Dakota provides official corporation income tax forms and filing instructions.",
"webCitation": "([ND Tax Commissioner][79])"
}
],
"geographyDerivedInputs": [
"North Dakota state and local location can be derived.",
"Geography cannot determine North Dakota-source income, apportionment, or credits."
],
"taxpayerSpecificInputs": [
"North Dakota taxable income",
"apportionment",
"credits",
"Form 40 data"
],
"retrofitOrIncentiveRelevance": "North Dakota income-tax incentives require actual Form 40 data before value display.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Ohio",
"taxTypes": [
"commercial activity tax",
"municipal net profits tax special case"
],
"officialRateSources": [
{
"sourceName": "Ohio Department of Taxation - Commercial Activity Tax",
"url": "[https://tax.ohio.gov/business/ohio-business-taxes/commercial-activity-tax/commercial_activity_tax](https://tax.ohio.gov/business/ohio-business-taxes/commercial-activity-tax/commercial_activity_tax)",
"evidenceText": "Ohio states that it has no corporate income tax and that CAT applies broadly to business entities with taxable gross receipts above the statutory thresholds; the annual minimum tax was eliminated and exclusions increased beginning in 2024 and 2025.",
"webCitation": "([Ohio Department of Taxation][80])"
},
{
"sourceName": "Ohio Department of Taxation - CAT Tax Rate",
"url": "[https://tax.ohio.gov/business/ohio-business-taxes/commercial-activity-tax/commercial-activity-tax-cat-rate](https://tax.ohio.gov/business/ohio-business-taxes/commercial-activity-tax/commercial-activity-tax-cat-rate)",
"evidenceText": "Ohio states that the CAT rate remains 0.26% after the taxable gross receipts exclusion.",
"webCitation": "([Ohio Department of Taxation][81])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Ohio Department of Taxation - CAT Registration",
"url": "[https://tax.ohio.gov/forms/form-number-search/commercial_activities_tax_cat/cat_reg-fi](https://tax.ohio.gov/forms/form-number-search/commercial_activities_tax_cat/cat_reg-fi)",
"evidenceText": "Ohio provides official CAT registration and filing resources.",
"webCitation": "([Ohio Department of Taxation][82])"
},
{
"sourceName": "Ohio Department of Taxation - Municipal Net Profit Tax",
"url": "[https://tax.ohio.gov/business/ohio-business-taxes/municipal-net-profit-tax/municipal-net-profit-tax](https://tax.ohio.gov/business/ohio-business-taxes/municipal-net-profit-tax/municipal-net-profit-tax)",
"evidenceText": "Ohio describes the municipal net profit tax as a local income tax on the net profit of businesses.",
"webCitation": "([Ohio Department of Taxation][83])"
}
],
"geographyDerivedInputs": [
"Ohio state and municipality can be derived from address.",
"Geography can identify possible municipal tax jurisdictions, but CAT depends on Ohio taxable gross receipts and municipal net profits depend on business activity, situs, and apportionment."
],
"taxpayerSpecificInputs": [
"Ohio taxable gross receipts",
"CAT exclusion threshold status",
"business entity type",
"municipal net profit by municipality",
"apportionment",
"credits",
"filed CAT and municipal returns"
],
"retrofitOrIncentiveRelevance": "Ohio is a concrete gross-receipts-tax target. CAT value cannot be estimated from project cost; require taxable gross receipts and filed or accountant-reviewed CAT data.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Oklahoma",
"taxTypes": [
"corporate income tax",
"business credits"
],
"officialRateSources": [
{
"sourceName": "Oklahoma Tax Commission - Business Forms",
"url": "[https://oklahoma.gov/tax/forms/business-forms.html](https://oklahoma.gov/tax/forms/business-forms.html)",
"evidenceText": "Oklahoma provides official corporation income tax forms, including Form 512 materials.",
"webCitation": "([Welcome to Oklahoma's Official Web Site][84])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Oklahoma Tax Commission - Form 512 Corporation Income Tax Return",
"url": "[https://oklahoma.gov/tax/forms/business-forms.html](https://oklahoma.gov/tax/forms/business-forms.html)",
"evidenceText": "The Oklahoma Tax Commission business forms page is the official source for current corporation income tax return and instruction materials.",
"webCitation": "([Welcome to Oklahoma's Official Web Site][84])"
}
],
"geographyDerivedInputs": [
"Oklahoma state and local address can be derived.",
"Geography cannot determine Oklahoma taxable income, apportionment, or credits."
],
"taxpayerSpecificInputs": [
"Oklahoma taxable income",
"apportionment",
"credits",
"Form 512 data"
],
"retrofitOrIncentiveRelevance": "Oklahoma business credits require official Form 512 schedules and taxpayer liability data.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Oregon",
"taxTypes": [
"corporate excise tax",
"corporate income tax",
"corporate activity tax"
],
"officialRateSources": [
{
"sourceName": "Oregon Department of Revenue - Corporation Excise and Income Tax",
"url": "[https://www.oregon.gov/dor/programs/businesses/Pages/corporation-excise-and-income.aspx](https://www.oregon.gov/dor/programs/businesses/Pages/corporation-excise-and-income.aspx)",
"evidenceText": "Oregon publishes official corporation excise and income tax rates of 6.6% on taxable income of $1 million or less and 7.6% on taxable income above $1 million, plus minimum tax rules.",
"webCitation": "([Oregon][85])"
},
{
"sourceName": "Oregon Department of Revenue - Corporate Activity Tax",
"url": "[https://www.oregon.gov/dor/programs/businesses/Pages/corporate-activity-tax.aspx](https://www.oregon.gov/dor/programs/businesses/Pages/corporate-activity-tax.aspx)",
"evidenceText": "Oregon states that the Corporate Activity Tax is $250 plus 0.57% of Oregon commercial activity over $1 million, after allowable subtractions.",
"webCitation": "([Oregon][86])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Oregon Department of Revenue - Business Forms",
"url": "[https://www.oregon.gov/dor/forms/Pages/default.aspx](https://www.oregon.gov/dor/forms/Pages/default.aspx)",
"evidenceText": "Oregon provides official corporation and CAT forms and instructions.",
"webCitation": "([Oregon][87])"
}
],
"geographyDerivedInputs": [
"Oregon state and local location can be derived.",
"Geography can flag Oregon CAT and Portland-region local taxes, but cannot determine Oregon commercial activity, excise taxable income, or subtractions."
],
"taxpayerSpecificInputs": [
"Oregon taxable income",
"Oregon commercial activity",
"CAT exclusions and subtractions",
"apportionment",
"credits",
"filed corporation and CAT returns"
],
"retrofitOrIncentiveRelevance": "Oregon is both an income-tax and gross-receipts-style tax target. CAT and excise-tax preferences require actual tax bases.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Pennsylvania",
"taxTypes": [
"corporate net income tax",
"Philadelphia local business taxes special case"
],
"officialRateSources": [
{
"sourceName": "Pennsylvania Department of Revenue - Corporation Tax Rates",
"url": "[https://www.pa.gov/agencies/revenue/businesses/business-types/corporations/tax-rates.html](https://www.pa.gov/agencies/revenue/businesses/business-types/corporations/tax-rates.html)",
"evidenceText": "Pennsylvania publishes the corporate net income tax rate reduction schedule, including 7.99% for 2025 and 7.49% for 2026.",
"webCitation": "([Pennsylvania Governor's Office][88])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Pennsylvania Department of Revenue - Corporation Tax Forms",
"url": "[https://www.pa.gov/agencies/revenue/forms-and-publications/business-tax-forms/corporation-tax-forms.html](https://www.pa.gov/agencies/revenue/forms-and-publications/business-tax-forms/corporation-tax-forms.html)",
"evidenceText": "Pennsylvania provides official corporation tax forms, including the RCT-101 filing source.",
"webCitation": "([Pennsylvania Governor's Office][89])"
}
],
"geographyDerivedInputs": [
"Pennsylvania state, municipality, school district, and Philadelphia location can be derived from address.",
"Geography cannot determine CNI tax base, apportionment, local BIRT/NPT base, or credits."
],
"taxpayerSpecificInputs": [
"Pennsylvania taxable income",
"apportionment",
"credits",
"RCT-101 data",
"Philadelphia gross receipts and net income if applicable"
],
"retrofitOrIncentiveRelevance": "Pennsylvania state credits and Philadelphia local taxes should be gated to filed return data.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Rhode Island",
"taxTypes": [
"corporate income tax",
"renewable property tax valuation",
"municipal tangible and real property tax special case"
],
"officialRateSources": [
{
"sourceName": "Rhode Island Division of Taxation - Business Corporation Tax",
"url": "[https://tax.ri.gov/tax-sections/businesses/corporate-tax](https://tax.ri.gov/tax-sections/businesses/corporate-tax)",
"evidenceText": "Rhode Island states that C corporations pay 7% of net income or a $400 minimum, whichever is greater.",
"webCitation": "([RI Division of Taxation][90])"
},
{
"sourceName": "Rhode Island Division of Taxation - Renewable Energy Resources Regulation",
"url": "[https://rules.sos.ri.gov/regulations/part/300-00-00-2](https://rules.sos.ri.gov/regulations/part/300-00-00-2)",
"evidenceText": "Rhode Island's active regulation establishes renewable-energy tangible property valuation at $5 per kW AC and identifies residential and manufacturer-used renewable systems as exempt under statutory provisions.",
"webCitation": "([Rhode Island Department of State][91])"
},
{
"sourceName": "Rhode Island General Assembly - H5967A renewable energy resource taxation",
"url": "[https://webserver.rilegislature.gov/BillText/BillText17/HouseText17/H5967A.pdf](https://webserver.rilegislature.gov/BillText/BillText17/HouseText17/H5967A.pdf)",
"evidenceText": "Rhode Island enacted statutory language requiring municipalities to tax renewable energy resources at $5 per kW AC for tangible property and $3.50 per kW AC for applicable real property treatment.",
"webCitation": "([Rhode Island General Assembly][92])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Rhode Island Division of Taxation - RI-1120C Forms",
"url": "[https://tax.ri.gov/forms/business-tax-forms/corporate-tax-forms](https://tax.ri.gov/forms/business-tax-forms/corporate-tax-forms)",
"evidenceText": "Rhode Island provides official RI-1120C corporate income tax forms and instructions.",
"webCitation": "([RI Division of Taxation][93])"
}
],
"geographyDerivedInputs": [
"Rhode Island state and municipality can be derived from address.",
"Geography can identify the municipal assessor jurisdiction, but cannot determine renewable resource type, AC capacity, commercial/residential/manufacturer status, municipal exemption or waiver status, interconnection date, counterfactual ordinary property tax, or assessor confirmation."
],
"taxpayerSpecificInputs": [
"AC nameplate capacity",
"renewable resource type",
"commercial/residential/manufacturer tax status",
"tangible property applicability",
"real property applicability",
"municipal exemption or waiver status",
"interconnection agreement date",
"counterfactual ordinary tax bill",
"local assessor confirmation"
],
"retrofitOrIncentiveRelevance": "Rhode Island is a concrete RetroFi special case. The rule is a statutory valuation workflow, not a guaranteed cash incentive; positive savings require a counterfactual assessment and local assessor confirmation.",
"recommendedEstimateStatus": "suppress_until_review",
"sourceConfidence": "high"
},
{
"state": "South Carolina",
"taxTypes": [
"corporate income tax",
"corporate license fee"
],
"officialRateSources": [
{
"sourceName": "South Carolina Department of Revenue - C Corporation",
"url": "[https://dor.sc.gov/tax/c-corporation](https://dor.sc.gov/tax/c-corporation)",
"evidenceText": "South Carolina states that most corporations owe an annual corporate license fee equal to 0.1% of capital stock and paid-in or capital surplus plus $15, with a $25 minimum.",
"webCitation": "([South Carolina Department of Revenue][94])"
},
{
"sourceName": "South Carolina Department of Revenue - S Corporation",
"url": "[https://dor.sc.gov/tax/s-corporation](https://dor.sc.gov/tax/s-corporation)",
"evidenceText": "South Carolina states that S corporations may also be subject to the same annual corporate license fee.",
"webCitation": "([South Carolina Department of Revenue][95])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "South Carolina DOR - Corporate Tax Forms",
"url": "[https://dor.sc.gov/forms-site/Forms/SC1120.pdf](https://dor.sc.gov/forms-site/Forms/SC1120.pdf)",
"evidenceText": "South Carolina provides official corporation income tax and license fee return materials.",
"webCitation": "([South Carolina Department of Revenue][96])"
}
],
"geographyDerivedInputs": [
"South Carolina state and local location can be derived.",
"Geography cannot determine corporate license fee base, taxable income, apportionment, or credits."
],
"taxpayerSpecificInputs": [
"South Carolina taxable income",
"capital stock and paid-in surplus base",
"apportionment",
"credits",
"filed SC corporate return"
],
"retrofitOrIncentiveRelevance": "South Carolina corporate incentives require income tax and license-fee return data.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "South Dakota",
"taxTypes": [
"bank franchise tax",
"no general corporate income tax"
],
"officialRateSources": [
{
"sourceName": "South Dakota Department of Revenue - Bank Franchise Tax",
"url": "[https://dor.sd.gov/businesses/taxes/bank-franchise-tax/](https://dor.sd.gov/businesses/taxes/bank-franchise-tax/)",
"evidenceText": "South Dakota provides official bank franchise tax information; the general business corporate income tax regime is not present for non-bank businesses.",
"webCitation": "([South Dakota Department of Revenue][97])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "South Dakota Department of Revenue - Taxes and Forms",
"url": "[https://dor.sd.gov/businesses/taxes/](https://dor.sd.gov/businesses/taxes/)",
"evidenceText": "South Dakota provides official tax-type and filing sources for administered business taxes.",
"webCitation": "([South Dakota Department of Revenue][98])"
}
],
"geographyDerivedInputs": [
"South Dakota state and local location can be derived.",
"Geography cannot determine bank franchise-tax applicability, taxable income, or other special tax bases."
],
"taxpayerSpecificInputs": [
"financial institution status",
"bank franchise-tax base if applicable",
"filed South Dakota tax returns for special taxes"
],
"retrofitOrIncentiveRelevance": "For most non-bank businesses, suppress state income/franchise tax benefit estimates unless a program specifically references a South Dakota administered tax.",
"recommendedEstimateStatus": "suppress_until_review",
"sourceConfidence": "high"
},
{
"state": "Tennessee",
"taxTypes": [
"franchise tax",
"excise tax",
"business tax",
"gross receipts taxes for specified activities"
],
"officialRateSources": [
{
"sourceName": "Tennessee Department of Revenue - Franchise and Excise Tax",
"url": "[https://www.tn.gov/revenue/taxes/franchise---excise-tax.html](https://www.tn.gov/revenue/taxes/franchise---excise-tax.html)",
"evidenceText": "Tennessee states that franchise tax is based on net worth and excise tax is based on net earnings, with a $100 minimum franchise tax.",
"webCitation": "([Tennessee State Government][99])"
},
{
"sourceName": "Tennessee Department of Revenue - Business Tax Classifications",
"url": "[https://www.tn.gov/revenue/taxes/business-tax/business-tax-classifications.html](https://www.tn.gov/revenue/taxes/business-tax/business-tax-classifications.html)",
"evidenceText": "Tennessee states that business tax classification and rate are determined by the dominant business activity at each business location.",
"webCitation": "([Tennessee State Government][100])"
},
{
"sourceName": "Tennessee Department of Revenue - Gross Receipts Taxes",
"url": "[https://www.tn.gov/revenue/taxes/gross-receipts-taxes.html](https://www.tn.gov/revenue/taxes/gross-receipts-taxes.html)",
"evidenceText": "Tennessee states that certain gross receipts taxes apply to specified activities and that receipts subject to gross receipts tax are exempt from business tax.",
"webCitation": "([Tennessee State Government][101])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Tennessee Department of Revenue - Franchise and Excise Forms",
"url": "[https://www.tn.gov/revenue/tax-resources/forms.html](https://www.tn.gov/revenue/tax-resources/forms.html)",
"evidenceText": "Tennessee provides official franchise/excise and business tax forms through the Department of Revenue.",
"webCitation": "([Tennessee State Government][102])"
}
],
"geographyDerivedInputs": [
"Tennessee state, county, and city location can be derived.",
"Geography can route to local business tax filing locations, but dominant business activity, gross receipts by location, net worth, net earnings, and exemptions are taxpayer-specific."
],
"taxpayerSpecificInputs": [
"net earnings",
"net worth",
"business-tax classification by location",
"gross receipts by activity and location",
"franchise/excise credits",
"filed Tennessee returns"
],
"retrofitOrIncentiveRelevance": "Tennessee is a major gross-reipts/business tax target. Do not estimate business tax from project cost; require receipts by classification and location.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Texas",
"taxTypes": [
"franchise tax",
"margin tax"
],
"officialRateSources": [
{
"sourceName": "Texas Comptroller - Franchise Tax Overview",
"url": "[https://comptroller.texas.gov/taxes/franchise/](https://comptroller.texas.gov/taxes/franchise/)",
"evidenceText": "Texas publishes official franchise tax rates and thresholds, including a 2026-2027 no-tax-due threshold of $2.65 million, a 0.375% rate for retail or wholesale taxable entities, and a 0.75% rate for other taxable entities.",
"webCitation": "([Texas Comptroller][103])"
},
{
"sourceName": "Texas Comptroller - Franchise Tax Reports and Information Reports",
"url": "[https://comptroller.texas.gov/taxes/franchise/reports.php](https://comptroller.texas.gov/taxes/franchise/reports.php)",
"evidenceText": "Texas states that franchise tax reports are due May 15 and that entities below the no-tax-due threshold are not required to file a franchise tax report, but are still required to file a public information report or ownership information report.",
"webCitation": "([Texas Comptroller][104])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Texas Comptroller - 2026 Franchise Tax Forms",
"url": "[https://comptroller.texas.gov/taxes/franchise/forms/2026.php](https://comptroller.texas.gov/taxes/franchise/forms/2026.php)",
"evidenceText": "Texas provides official 2026 franchise tax forms and notes that the No Tax Due Report is not available for report years 2024 and later.",
"webCitation": "([Texas Comptroller][105])"
}
],
"geographyDerivedInputs": [
"Texas state location can be derived.",
"Geography cannot determine total revenue, taxable margin method, retail/wholesale classification, compensation limit, cost-of-goods-sold deduction, exclusions, or no-tax-due status."
],
"taxpayerSpecificInputs": [
"total revenue",
"taxable margin method",
"retail or wholesale classification",
"COGS or compensation deductions",
"apportionment",
"credits",
"public information report status",
"filed franchise tax data"
],
"retrofitOrIncentiveRelevance": "Texas is a concrete franchise/margins tax target. Any tax-rate preference must be calculated from taxable margin and taxpayer classification, not from geography alone.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Utah",
"taxTypes": [
"corporate franchise and income tax"
],
"officialRateSources": [
{
"sourceName": "Utah State Tax Commission - Forms and Publications",
"url": "[https://tax.utah.gov/forms-pubs](https://tax.utah.gov/forms-pubs)",
"evidenceText": "Utah provides official corporation and pass-through tax forms and publications.",
"webCitation": "([Utah State Tax Commission][106])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Utah State Tax Commission - Modernized e-File",
"url": "[https://tax.utah.gov/developers/mef](https://tax.utah.gov/developers/mef)",
"evidenceText": "Utah identifies corporate return Form TC-20 as supported in its Modernized e-File program.",
"webCitation": "([Utah State Tax Commission][107])"
}
],
"geographyDerivedInputs": [
"Utah state and local location can be derived.",
"Geography cannot determine Utah taxable income, apportionment, minimum tax, or credits."
],
"taxpayerSpecificInputs": [
"Utah taxable income",
"apportionment",
"credits",
"Form TC-20 data"
],
"retrofitOrIncentiveRelevance": "Utah business tax incentives require TC-20 return inputs and current-year official rate validation.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Vermont",
"taxTypes": [
"corporate income tax",
"minimum entity tax"
],
"officialRateSources": [
{
"sourceName": "Vermont Department of Taxes - Corporate Income Tax Return Instructions",
"url": "[https://tax.vermont.gov/business-and-corp/corporate-income-tax](https://tax.vermont.gov/business-and-corp/corporate-income-tax)",
"evidenceText": "Vermont's official site is the authoritative source for corporate income tax, but the searchable source available here was a mirrored official Form CO-411 instruction set; production should retrieve current CO-411 directly from Vermont Department of Taxes.",
"webCitation": "([TaxFormFinder][108])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Vermont Department of Taxes - Form CO-411",
"url": "[https://tax.vermont.gov/business-and-corp/corporate-income-tax](https://tax.vermont.gov/business-and-corp/corporate-income-tax)",
"evidenceText": "The official Vermont corporate income tax form set is Form CO-411 and related schedules; current-year official retrieval should be required before deterministic calculations.",
"webCitation": "([TaxFormFinder][108])"
}
],
"geographyDerivedInputs": [
"Vermont state and local location can be derived.",
"Geography cannot determine Vermont gross receipts bracket, taxable income, minimum tax, apportionment, or credits."
],
"taxpayerSpecificInputs": [
"Vermont taxable income",
"Vermont gross receipts for minimum entity tax",
"apportionment",
"credits",
"CO-411 data"
],
"retrofitOrIncentiveRelevance": "Vermont estimates should be suppressed until current official CO-411 sources are retrieved and taxpayer return data are available.",
"recommendedEstimateStatus": "suppress_until_review",
"sourceConfidence": "medium"
},
{
"state": "Virginia",
"taxTypes": [
"corporate income tax",
"local BPOL gross receipts tax special case"
],
"officialRateSources": [
{
"sourceName": "Virginia Tax - Corporation Income Tax",
"url": "[https://www.tax.virginia.gov/corporation-income-tax](https://www.tax.virginia.gov/corporation-income-tax)",
"evidenceText": "Virginia states that corporations file Form 500 and identifies a 6% corporation income tax rate with apportionment rules.",
"webCitation": "([Virginia Tax][109])"
},
{
"sourceName": "Virginia Tax - BPOL Ruling",
"url": "[https://www.tax.virginia.gov/laws-rules-decisions/rulings-tax-commissioner/21-28](https://www.tax.virginia.gov/laws-rules-decisions/rulings-tax-commissioner/21-28)",
"evidenceText": "Virginia explains that local license fees or taxes are imposed and administered by local officials under local authority.",
"webCitation": "([Virginia Tax][110])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Virginia Tax - Corporation Forms",
"url": "[https://www.tax.virginia.gov/forms/search?category=Corporation](https://www.tax.virginia.gov/forms/search?category=Corporation)",
"evidenceText": "Virginia provides official corporation income tax forms and instructions.",
"webCitation": "([Virginia Tax][111])"
},
{
"sourceName": "Virginia Administrative Code - BPOL Regulations",
"url": "[https://law.lis.virginia.gov/admincode/title23/agency10/chapter500/](https://law.lis.virginia.gov/admincode/title23/agency10/chapter500/)",
"evidenceText": "Virginia's administrative code provides BPOL regulatory authority for local business license tax rules.",
"webCitation": "([Virginia Law][112])"
}
],
"geographyDerivedInputs": [
"Virginia state, county, city, and town can be derived from address.",
"Address can identify possible BPOL locality, but cannot determine local gross receipts, BPOL classification, definite place of business, situs, or Virginia taxable income."
],
"taxpayerSpecificInputs": [
"Virginia taxable income",
"apportionment",
"credits",
"local BPOL gross receipts by locality and class",
"filed state and local business license returns"
],
"retrofitOrIncentiveRelevance": "Virginia income-tax preferences and local BPOL impacts require tax-return and local classification inputs.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Washington",
"taxTypes": [
"state B&O gross receipts tax",
"local B&O special cases",
"tax preferences requiring annual tax performance reports"
],
"officialRateSources": [
{
"sourceName": "Washington Department of Revenue - B&O Tax Classification Definitions",
"url": "[https://dor.wa.gov/taxes-rates/business-occupation-tax/bo-tax-classification-definitions](https://dor.wa.gov/taxes-rates/business-occupation-tax/bo-tax-classification-definitions)",
"evidenceText": "Washington publishes B&O classifications and states that manufacturing solar energy systems and qualifying solar-related wholesale and processing activities are taxed at 0.275%; it also states that an Annual Tax Performance Report is required.",
"webCitation": "([Washington Department of Revenue][113])"
},
{
"sourceName": "Washington Legislature - RCW 82.04.294",
"url": "[https://app.leg.wa.gov/RCW/default.aspx?cite=82.04.294](https://app.leg.wa.gov/RCW/default.aspx?cite=82.04.294)",
"evidenceText": "RCW 82.04.294 requires taxpayers taking the solar silicon and solar energy systems preferential B&O rate to complete an annual tax performance report.",
"webCitation": "([Washington State Legislative App][114])"
},
{
"sourceName": "Washington Legislature - RCW Chapter 82.04",
"url": "[https://app.leg.wa.gov/RCW/default.aspx?cite=82.04](https://app.leg.wa.gov/RCW/default.aspx?cite=82.04)",
"evidenceText": "Washington's statute lists RCW 82.04.294 as expiring July 1, 2032.",
"webCitation": "([Washington State Legislature][115])"
},
{
"sourceName": "Washington Department of Revenue - General B&O Tax",
"url": "[https://dor.wa.gov/taxes-rates/business-occupation-tax](https://dor.wa.gov/taxes-rates/business-occupation-tax)",
"evidenceText": "Washington states that the B&O tax has more than 50 classifications, that tax classification determines the tax rate, and that credits such as the Multiple Activities Tax Credit may apply.",
"webCitation": "([Washington Department of Revenue][116])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Washington Department of Revenue - Manufacturing Solar Energy Systems Industry Guide",
"url": "[https://dor.wa.gov/education/industry-guides/manufacturing-solar-energy-systems](https://dor.wa.gov/education/industry-guides/manufacturing-solar-energy-systems)",
"evidenceText": "Washington's official industry guide cross-references RCW 82.04.294 and the annual tax performance report requirement for solar manufacturing activities.",
"webCitation": "([Washington Department of Revenue][117])"
}
],
"geographyDerivedInputs": [
"Washington state and local city location can be derived from address.",
"Geography can identify possible state and city B&O jurisdictions, but cannot determine B&O classification, qualifying solar manufacturing activity, tax period, gross receipts, deductions, interstate or foreign sales deductions, Multiple Activities Tax Credit adjustments, or annual tax performance report filing."
],
"taxpayerSpecificInputs": [
"qualifying solar B&O activity classification",
"tax period start and end date",
"qualifying tax base after deductions and MATC",
"otherwise applicable B&O classification and rate",
"annual tax performance report filing status",
"interstate or foreign sales deductions",
"MATC adjustments",
"filed excise tax returns"
],
"retrofitOrIncentiveRelevance": "Washington is a concrete RetroFi target for the solar manufacturing B&O rate preference. The rule is a tax-rate preference for qualifying manufacturers, processors for hire, and wholesalers, not a customer installation rebate.",
"recommendedEstimateStatus": "suppress_until_review",
"sourceConfidence": "high"
},
{
"state": "West Virginia",
"taxTypes": [
"corporation net income tax"
],
"officialRateSources": [
{
"sourceName": "West Virginia State Tax Department - Corporation Net Income Tax",
"url": "[https://tax.wv.gov/Business/CorporateIncomeTax/Pages/CorporateIncomeTax.aspx](https://tax.wv.gov/Business/CorporateIncomeTax/Pages/CorporateIncomeTax.aspx)",
"evidenceText": "West Virginia states that the corporation net income tax is imposed on domestic and foreign corporations engaged in business in West Virginia or deriving income from West Virginia sources.",
"webCitation": "([West Virginia Tax Division][118])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "West Virginia Tax Division - CIT-120 and Electronic Filing",
"url": "[https://tax.wv.gov/Business/CorporateIncomeTax/Pages/CorporateIncomeTax.aspx](https://tax.wv.gov/Business/CorporateIncomeTax/Pages/CorporateIncomeTax.aspx)",
"evidenceText": "West Virginia provides CIT-120 corporation net income tax filing sources and electronic filing and payment requirements.",
"webCitation": "([West Virginia Tax Division][119])"
},
{
"sourceName": "West Virginia Tax Division - Corporation Net Income Tax Credits",
"url": "[https://tax.wv.gov/TaxProfessionals/TaxForms/Pages/BusinessTaxForms.aspx](https://tax.wv.gov/TaxProfessionals/TaxForms/Pages/BusinessTaxForms.aspx)",
"evidenceText": "West Virginia provides corporate credit forms including CIT-120TC through official business tax form sources.",
"webCitation": "([West Virginia Tax Division][120])"
}
],
"geographyDerivedInputs": [
"West Virginia state and local address can be derived.",
"Geography cannot determine West Virginia-source income, apportionment, or credit eligibility."
],
"taxpayerSpecificInputs": [
"federal taxable income",
"West Virginia modifications",
"apportionment",
"CIT-120TC credits",
"filed CIT-120"
],
"retrofitOrIncentiveRelevance": "West Virginia income-tax credits should be gated to CIT-120 and credit schedule data.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Wisconsin",
"taxTypes": [
"corporation franchise tax",
"corporation income tax"
],
"officialRateSources": [
{
"sourceName": "Wisconsin Department of Revenue - Corporation Tax Forms",
"url": "[https://www.revenue.wi.gov/Pages/Form/2025Corporation.aspx](https://www.revenue.wi.gov/Pages/Form/2025Corporation.aspx)",
"evidenceText": "Wisconsin provides official 2025 corporation tax forms and instructions.",
"webCitation": "([Wisconsin Department of Revenue][121])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Wisconsin Department of Revenue - Corporation Filing Due Dates",
"url": "[https://www.revenue.wi.gov/Pages/FAQS/ise-corpduedates.aspx](https://www.revenue.wi.gov/Pages/FAQS/ise-corpduedates.aspx)",
"evidenceText": "Wisconsin provides official corporate filing due-date and form guidance.",
"webCitation": "([Wisconsin Department of Revenue][122])"
}
],
"geographyDerivedInputs": [
"Wisconsin state and local location can be derived.",
"Geography cannot determine franchise/income tax base, apportionment, credits, or combined reporting."
],
"taxpayerSpecificInputs": [
"Wisconsin net income",
"apportionment",
"credits",
"combined group data",
"filed corporation return"
],
"retrofitOrIncentiveRelevance": "Wisconsin tax-credit value requires official corporation return data and credit limitations.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"state": "Wyoming",
"taxTypes": [
"annual report license tax",
"no general corporate income tax"
],
"officialRateSources": [
{
"sourceName": "Wyoming Secretary of State - Annual Report License Tax FAQ",
"url": "[https://sos.wyo.gov/Business/FAQ.aspx](https://sos.wyo.gov/Business/FAQ.aspx)",
"evidenceText": "Wyoming states that an annual report license tax is based on assets located and employed in Wyoming or a flat filing fee.",
"webCitation": "([Wyoming Secretary of State][123])"
},
{
"sourceName": "Wyoming Secretary of State - Business Fee Schedule",
"url": "[https://sos.wyo.gov/Forms/Publications/Fee_Schedule.pdf](https://sos.wyo.gov/Forms/Publications/Fee_Schedule.pdf)",
"evidenceText": "Wyoming provides an official business fee schedule for annual report license tax filing.",
"webCitation": "([Wyoming Secretary of State][124])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Wyoming Secretary of State - Annual Report Filing",
"url": "[https://wyobiz.wyo.gov/Business/AnnualReport.aspx](https://wyobiz.wyo.gov/Business/AnnualReport.aspx)",
"evidenceText": "Wyoming provides official annual report filing through the Secretary of State.",
"webCitation": "([Wyoming Secretary of State][123])"
}
],
"geographyDerivedInputs": [
"Wyoming state location can be derived.",
"Geography cannot determine Wyoming asset base, annual report license tax amount, or special industry taxes."
],
"taxpayerSpecificInputs": [
"entity type",
"assets located and employed in Wyoming",
"annual report data",
"special industry tax filings if applicable"
],
"retrofitOrIncentiveRelevance": "Wyoming generally should not show state corporate income-tax incentive value. License-tax effects require entity and asset data.",
"recommendedEstimateStatus": "suppress_until_review",
"sourceConfidence": "high"
}
],
"majorLocalBusinessTaxSources": [
{
"jurisdiction": "Washington cities, including Seattle, Tacoma, and Bellevue",
"taxTypes": [
"local B&O gross receipts tax"
],
"officialRateSources": [
{
"sourceName": "Seattle Finance and Administrative Services - Business Taxes",
"url": "[https://www.seattle.gov/city-finance/business-taxes-and-licenses/business-taxes](https://www.seattle.gov/city-finance/business-taxes-and-licenses/business-taxes)",
"evidenceText": "Seattle states that its B&O tax threshold increased to $2 million effective January 1, 2026, and that businesses may still need to file annual gross revenue even when no tax is due.",
"webCitation": "([Seattle.gov][125])"
},
{
"sourceName": "Tacoma Tax and License - B&O Tax",
"url": "[https://www.cityoftacoma.org/government/city_departments/finance/tax_and_license/business_and_occupation_tax](https://www.cityoftacoma.org/government/city_departments/finance/tax_and_license/business_and_occupation_tax)",
"evidenceText": "Tacoma describes B&O tax as measured by value of products, gross proceeds of sales, or gross income, with no deduction for labor, materials, or cost of goods sold.",
"webCitation": "([City of Tacoma][126])"
},
{
"sourceName": "Bellevue - B&O Tax",
"url": "[https://bellevuewa.gov/city-government/departments/finance/doing-business-with-bellevue/taxes-and-licenses/bo-tax](https://bellevuewa.gov/city-government/departments/finance/doing-business-with-bellevue/taxes-and-licenses/bo-tax)",
"evidenceText": "Bellevue states that businesses with taxable receipts at or below the 2026 threshold may be exempt from tax but still must file.",
"webCitation": "([City of Bellevue][127])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Washington city tax filing portals",
"url": "[https://dor.wa.gov/taxes-rates/business-occupation-tax](https://dor.wa.gov/taxes-rates/business-occupation-tax)",
"evidenceText": "State B&O classification is separate from city B&O reporting; local returns must be sourced from each city.",
"webCitation": "([Washington Department of Revenue][116])"
}
],
"geographyCanDerive": "partially",
"geographyDerivedInputs": [
"business address inside city boundary",
"possible city B&O jurisdiction"
],
"taxpayerSpecificInputs": [
"gross receipts by city",
"B&O activity classification",
"apportionment or allocation",
"deductions and exemptions",
"filing frequency",
"city return data"
],
"includeInUserFacingTotals": "gated",
"safestBehavior": "Flag possible local B&O exposure from address, but suppress dollar estimates until the taxpayer supplies city returns or accountant-reviewed gross receipts by classification.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"jurisdiction": "Ohio municipalities",
"taxTypes": [
"municipal net profits tax",
"municipal income tax"
],
"officialRateSources": [
{
"sourceName": "Ohio Department of Taxation - Municipal Net Profit Tax",
"url": "[https://tax.ohio.gov/business/ohio-business-taxes/municipal-net-profit-tax/municipal-net-profit-tax](https://tax.ohio.gov/business/ohio-business-taxes/municipal-net-profit-tax/municipal-net-profit-tax)",
"evidenceText": "Ohio describes the municipal net profit tax as a local income tax on the net profit of businesses.",
"webCitation": "([Ohio Department of Taxation][83])"
},
{
"sourceName": "Regional Income Tax Agency - Municipal Tax Rates",
"url": "[https://www.ritaohio.com/TaxRatesTable](https://www.ritaohio.com/TaxRatesTable)",
"evidenceText": "RITA publishes official municipal tax rates and codes for participating Ohio municipalities.",
"webCitation": "([Rita Ohio][128])"
},
{
"sourceName": "Central Collection Agency - Tax Rates",
"url": "[https://ccatax.ci.cleveland.oh.us/?p=taxrates](https://ccatax.ci.cleveland.oh.us/?p=taxrates)",
"evidenceText": "CCA publishes tax rates for Cleveland-administered municipalities and districts.",
"webCitation": "([CCA Ohio][129])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "RITA - Business Forms",
"url": "[https://www.ritaohio.com/BusinessForms](https://www.ritaohio.com/BusinessForms)",
"evidenceText": "RITA provides business forms including Form 27 net profit return and registration materials.",
"webCitation": "([Rita Ohio][130])"
}
],
"geographyCanDerive": "partially",
"geographyDerivedInputs": [
"municipality from business address",
"tax administrator if municipality participates in RITA, CCA, or self-administers"
],
"taxpayerSpecificInputs": [
"net profit by municipality",
"apportionment",
"nexus",
"resident/nonresident owner treatment if pass-through",
"credits",
"filed municipal returns"
],
"includeInUserFacingTotals": "gated",
"safestBehavior": "Show possible Ohio municipal net profits tax only as a required tax-profile input until municipal taxable net profit is provided.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"jurisdiction": "Philadelphia, Pennsylvania",
"taxTypes": [
"Business Income and Receipts Tax",
"Net Profits Tax"
],
"officialRateSources": [
{
"sourceName": "City of Philadelphia - Business Income and Receipts Tax",
"url": "[https://www.phila.gov/services/payments-assistance-taxes/business-taxes/business-income-receipts-tax-birt/](https://www.phila.gov/services/payments-assistance-taxes/business-taxes/business-income-receipts-tax-birt/)",
"evidenceText": "Philadelphia states that BIRT has both gross receipts and net income components and publishes current rates including 1.410 mills on gross receipts and 5.71% on taxable net income.",
"webCitation": "([City of Philadelphia][131])"
},
{
"sourceName": "City of Philadelphia - Net Profits Tax",
"url": "[https://www.phila.gov/services/payments-assistance-taxes/business-taxes/net-profits-tax/](https://www.phila.gov/services/payments-assistance-taxes/business-taxes/net-profits-tax/)",
"evidenceText": "Philadelphia states that businesses must file NPT returns even when they have a loss and provides estimated payment requirements.",
"webCitation": "([City of Philadelphia][132])"
},
{
"sourceName": "City of Philadelphia - 2025 NPT Rate Update",
"url": "[https://www.phila.gov/2025-06-24-philadelphia-announces-lower-tax-rates-for-wage-earnings-and-net-profits-taxes/](https://www.phila.gov/2025-06-24-philadelphia-announces-lower-tax-rates-for-wage-earnings-and-net-profits-taxes/)",
"evidenceText": "Philadelphia announced 2025 net profits tax rates of 3.74% for residents and 3.43% for non-residents, with 2025 net profits taxed at the new rate in 2026.",
"webCitation": "([City of Philadelphia][133])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "City of Philadelphia - Business Tax Filing",
"url": "[https://tax-services.phila.gov/](https://tax-services.phila.gov/)",
"evidenceText": "Philadelphia provides official tax filing and payment sources for BIRT and NPT.",
"webCitation": "([City of Philadelphia][131])"
}
],
"geographyCanDerive": "partially",
"geographyDerivedInputs": [
"business location in Philadelphia",
"possible Pennsylvania PSD and local tax jurisdiction"
],
"taxpayerSpecificInputs": [
"Philadelphia taxable gross receipts",
"Philadelphia taxable net income",
"apportionment",
"estimated payments",
"resident or nonresident NPT status",
"filed BIRT and NPT returns"
],
"includeInUserFacingTotals": "gated",
"safestBehavior": "Do not infer BIRT or NPT from project cost. Require filed Philadelphia tax profile or accountant-reviewed gross receipts and net income.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"jurisdiction": "Pennsylvania local earned income tax and local services tax",
"taxTypes": [
"local earned income tax",
"local services tax",
"employer withholding"
],
"officialRateSources": [
{
"sourceName": "Pennsylvania DCED - Act 32 Local Income Tax",
"url": "[https://dced.pa.gov/local-government/local-income-tax-information/](https://dced.pa.gov/local-government/local-income-tax-information/)",
"evidenceText": "Pennsylvania states that employers with worksites in Pennsylvania must withhold and remit local earned income tax and local services tax.",
"webCitation": "([PA DECD][134])"
},
{
"sourceName": "Pennsylvania DCED - PSD Codes and EIT Rates",
"url": "[https://dced.pa.gov/local-government/local-income-tax-information/local-withholding-tax-faqs/](https://dced.pa.gov/local-government/local-income-tax-information/local-withholding-tax-faqs/)",
"evidenceText": "Pennsylvania PSD codes and EIT rates identify municipalities and tax jurisdictions for local withholding.",
"webCitation": "([PA DECD][135])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Pennsylvania DCED - Local Income Tax Information",
"url": "[https://dced.pa.gov/local-government/local-income-tax-information/](https://dced.pa.gov/local-government/local-income-tax-information/)",
"evidenceText": "Pennsylvania provides official Act 32 local income tax information and links for employers and collectors.",
"webCitation": "([PA DECD][134])"
}
],
"geographyCanDerive": "partially",
"geographyDerivedInputs": [
"worksite municipality",
"employee residence municipality",
"PSD code"
],
"taxpayerSpecificInputs": [
"payroll by worksite",
"employee residence",
"withholding data",
"tax collector",
"local returns"
],
"includeInUserFacingTotals": "usually excluded from business incentive totals unless a program explicitly abates local income tax",
"safestBehavior": "Use for payroll and local income tax routing; do not include in project incentive totals without explicit program authority and payroll data.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"jurisdiction": "New York City",
"taxTypes": [
"Business Corporation Tax",
"Unincorporated Business Tax",
"Commercial Rent Tax"
],
"officialRateSources": [
{
"sourceName": "NYC Department of Finance - Business Corporation Tax",
"url": "[https://www.nyc.gov/site/finance/business/business-corporation-tax.page](https://www.nyc.gov/site/finance/business/business-corporation-tax.page)",
"evidenceText": "NYC publishes Business Corporation Tax rates, including qualified manufacturing corporation rates, small business rates, financial corporation rates, and other corporate rates.",
"webCitation": "([NYC.gov][136])"
},
{
"sourceName": "NYC Department of Finance - Unincorporated Business Tax",
"url": "[https://www.nyc.gov/site/finance/business/business-unincorporated-business-tax-ubt.page](https://www.nyc.gov/site/finance/business/business-unincorporated-business-tax-ubt.page)",
"evidenceText": "NYC states that UBT is imposed at 4% on taxable income allocated to New York City.",
"webCitation": "([NYC.gov][137])"
},
{
"sourceName": "NYC Department of Finance - Commercial Rent Tax",
"url": "[https://www.nyc.gov/site/finance/business/business-commercial-rent-tax-crt.page](https://www.nyc.gov/site/finance/business/business-commercial-rent-tax-crt.page)",
"evidenceText": "NYC states that Commercial Rent Tax has a 6% rate on base rent and a 35% rent reduction, producing an effective tax rate of 3.9%, with credits and threshold rules.",
"webCitation": "([NYC.gov][138])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "NYC Department of Finance - Business Tax Forms",
"url": "[https://www.nyc.gov/site/finance/business/business-forms/business-forms.page](https://www.nyc.gov/site/finance/business/business-forms/business-forms.page)",
"evidenceText": "NYC provides official business tax forms for BCT, UBT, and CRT.",
"webCitation": "([NYC.gov][136])"
}
],
"geographyCanDerive": "partially",
"geographyDerivedInputs": [
"NYC borough and address",
"Manhattan south of 96th Street for CRT possibility"
],
"taxpayerSpecificInputs": [
"NYC allocated taxable income",
"corporation type",
"manufacturing or financial corporation status",
"unincorporated business income",
"commercial rent by premises",
"credits",
"filed NYC returns"
],
"includeInUserFacingTotals": "gated",
"safestBehavior": "Flag NYC local business taxes from address, but suppress values until NYC return or accountant-reviewed allocation data are supplied.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"jurisdiction": "San Francisco, California",
"taxTypes": [
"gross receipts tax",
"business registration fees",
"administrative office tax where applicable"
],
"officialRateSources": [
{
"sourceName": "San Francisco Treasurer and Tax Collector - Gross Receipts Tax",
"url": "[https://sftreasurer.org/business/taxes-fees/gross-receipts-tax-gr](https://sftreasurer.org/business/taxes-fees/gross-receipts-tax-gr)",
"evidenceText": "San Francisco states that gross receipts tax rates vary depending on San Francisco gross receipts and business activity category.",
"webCitation": "([Treasurer & Tax Collector][139])"
},
{
"sourceName": "San Francisco Tax Collector - Gross Receipts Apportionment Examples",
"url": "[https://sftreasurer.org/business/taxes-fees/gross-receipts-tax-gr/gross-receipts-tax-apportionment](https://sftreasurer.org/business/taxes-fees/gross-receipts-tax-gr/gross-receipts-tax-apportionment)",
"evidenceText": "San Francisco provides official examples for apportioning gross receipts to San Francisco.",
"webCitation": "([Treasurer & Tax Collector][140])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "San Francisco Treasurer and Tax Collector - Business Taxes and Fees",
"url": "[https://sftreasurer.org/business/taxes-fees](https://sftreasurer.org/business/taxes-fees)",
"evidenceText": "San Francisco provides official filing and tax sources for local business taxes and fees.",
"webCitation": "([Treasurer & Tax Collector][139])"
}
],
"geographyCanDerive": "partially",
"geographyDerivedInputs": [
"business address inside San Francisco",
"possible local tax filing jurisdiction"
],
"taxpayerSpecificInputs": [
"San Francisco gross receipts",
"business activity category",
"apportionment",
"registration status",
"payroll or office tax inputs if applicable",
"filed San Francisco return"
],
"includeInUserFacingTotals": "gated",
"safestBehavior": "Do not estimate SF gross receipts tax from state or project data. Require activity-category and apportioned gross receipts.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"jurisdiction": "Los Angeles, California",
"taxTypes": [
"business tax based on gross receipts"
],
"officialRateSources": [
{
"sourceName": "City of Los Angeles Office of Finance - Tax Rate Table",
"url": "[https://finance.lacity.gov/tax-education/tax-rates-and-classifications](https://finance.lacity.gov/tax-education/tax-rates-and-classifications)",
"evidenceText": "Los Angeles publishes business tax rates by class, with rates commonly stated per $1,000 of gross receipts after class-specific base amounts.",
"webCitation": "([Los Angeles Office of Finance][141])"
},
{
"sourceName": "City of Los Angeles - Business Tax Booklet",
"url": "[https://finance.lacity.gov/](https://finance.lacity.gov/)",
"evidenceText": "Los Angeles states that most business taxes are based on gross receipts and that rate class determines the rate per $1,000.",
"webCitation": "([Los Angeles Office of Finance][142])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "City of Los Angeles Office of Finance - Renewal Instructions",
"url": "[https://finance.lacity.gov/](https://finance.lacity.gov/)",
"evidenceText": "Los Angeles renewal instructions require gross receipts reporting by business activity.",
"webCitation": "([Los Angeles Office of Finance][143])"
}
],
"geographyCanDerive": "partially",
"geographyDerivedInputs": [
"business address inside Los Angeles",
"business tax registration jurisdiction"
],
"taxpayerSpecificInputs": [
"gross receipts by activity",
"business tax class",
"new business exemptions if any",
"apportionment",
"filed Los Angeles renewal"
],
"includeInUserFacingTotals": "gated",
"safestBehavior": "Flag as possible local gross receipts tax only; do not compute without activity class and gross receipts.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"jurisdiction": "Portland, Multnomah County, and Metro, Oregon",
"taxTypes": [
"Portland Business License Tax",
"Multnomah County Business Income Tax",
"Metro Supportive Housing Services Business Income Tax",
"Portland Clean Energy Surcharge"
],
"officialRateSources": [
{
"sourceName": "City of Portland Revenue Division - Business Taxes",
"url": "[https://www.portland.gov/revenue/business-tax](https://www.portland.gov/revenue/business-tax)",
"evidenceText": "Portland publishes business tax information, including Portland Business License Tax, Multnomah County Business Income Tax, and Metro SHS Business Income Tax filing through the Revenue Division.",
"webCitation": "([Portland.gov][144])"
},
{
"sourceName": "Metro - Supportive Housing Services Business Income Tax",
"url": "[https://www.oregonmetro.gov/public-projects/supportive-housing-services-tax/businesses](https://www.oregonmetro.gov/public-projects/supportive-housing-services-tax/businesses)",
"evidenceText": "Metro states that a 1% business income tax applies to net income for businesses with gross receipts over $5 million.",
"webCitation": "([Oregon Metro][145])"
},
{
"sourceName": "Portland Revenue Division - Clean Energy Surcharge",
"url": "[https://www.portland.gov/revenue/clean-energy-surcharge](https://www.portland.gov/revenue/clean-energy-surcharge)",
"evidenceText": "Portland states that the Clean Energy Surcharge is a 1% surcharge on retail sales within the City for large retailers meeting global and Portland gross-income thresholds.",
"webCitation": "([Portland.gov][146])"
},
{
"sourceName": "Multnomah County - Business Income Tax",
"url": "[https://www.multco.us/assessment-taxation/business-income-tax](https://www.multco.us/assessment-taxation/business-income-tax)",
"evidenceText": "Multnomah County states that its Business Income Tax is imposed on net income.",
"webCitation": "([Multnomah County][147])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "City of Portland Revenue Division - Business Tax Filing",
"url": "[https://www.portland.gov/revenue/file-pay-business-taxes](https://www.portland.gov/revenue/file-pay-business-taxes)",
"evidenceText": "Portland provides official filing and payment sources for Portland, Multnomah County, and Metro business taxes.",
"webCitation": "([Portland.gov][144])"
}
],
"geographyCanDerive": "partially",
"geographyDerivedInputs": [
"Portland city boundary",
"Multnomah County",
"Metro district"
],
"taxpayerSpecificInputs": [
"business net income by jurisdiction",
"gross receipts thresholds",
"retail sales within Portland if CES applies",
"exemptions",
"filed Portland/Multnomah/Metro returns"
],
"includeInUserFacingTotals": "gated",
"safestBehavior": "Use address to identify possible local Oregon taxes, but suppress values until net income, gross receipts, and return data are available.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"jurisdiction": "Detroit, Michigan",
"taxTypes": [
"corporation income tax",
"business income tax",
"partnership and trust income tax"
],
"officialRateSources": [
{
"sourceName": "City of Detroit - Income Tax",
"url": "[https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-treasury/income-tax](https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-treasury/income-tax)",
"evidenceText": "Detroit states that all corporations, partnerships, and trusts and estates must file, and lists a 2% business rate plus separate partnership partner and trust or estate rates.",
"webCitation": "([City of Detroit][148])"
},
{
"sourceName": "Michigan Treasury - City of Detroit Corporation Income Tax",
"url": "[https://www.michigan.gov/taxes/citytax/corporate/detroit](https://www.michigan.gov/taxes/citytax/corporate/detroit)",
"evidenceText": "Michigan Treasury provides official Detroit corporation income tax forms and due-date information.",
"webCitation": "([Michigan][149])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "City of Detroit - Tax Forms",
"url": "[https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-treasury/income-tax/income-tax-forms](https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-treasury/income-tax/income-tax-forms)",
"evidenceText": "Detroit provides official city income tax forms.",
"webCitation": "([Michigan][150])"
}
],
"geographyCanDerive": "partially",
"geographyDerivedInputs": [
"Detroit city address",
"possible local income-tax city"
],
"taxpayerSpecificInputs": [
"Detroit allocated business income",
"entity type",
"partnership partner allocations",
"credits",
"filed Detroit return"
],
"includeInUserFacingTotals": "gated",
"safestBehavior": "Use only for programs explicitly involving local income tax, such as Michigan Renaissance Zone benefits; require actual Detroit liability before value display.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"jurisdiction": "Kentucky cities and counties",
"taxTypes": [
"occupational license tax",
"net profits tax",
"gross receipts occupational tax"
],
"officialRateSources": [
{
"sourceName": "Kentucky Department of Revenue - Local Occupational License Taxes",
"url": "[https://revenue.ky.gov/Business/Pages/Local-Occupational-License-Taxes.aspx](https://revenue.ky.gov/Business/Pages/Local-Occupational-License-Taxes.aspx)",
"evidenceText": "Kentucky states that the Department of Revenue does not administer local occupational, net profits, or gross receipts taxes and directs taxpayers to local officials.",
"webCitation": "([Department of Revenue][151])"
},
{
"sourceName": "Kentucky League of Cities - Occupational Taxes",
"url": "[https://www.klc.org/InfoCentral/News/municipal-taxes-3671](https://www.klc.org/InfoCentral/News/municipal-taxes-3671)",
"evidenceText": "Kentucky local occupational license taxes may be imposed on gross earnings, gross receipts, or net profits.",
"webCitation": "([Kentucky League of Cities][152])"
},
{
"sourceName": "Kentucky One Stop - Local Occupational Tax Database",
"url": "[https://onestop.ky.gov/start/Pages/local-occupational-taxes.aspx](https://onestop.ky.gov/start/Pages/local-occupational-taxes.aspx)",
"evidenceText": "Kentucky maintains a local occupational tax form database under KRS 67.766.",
"webCitation": "([Kentucky Business One Stop][153])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Louisville Metro Revenue Commission - Form OL-3",
"url": "[https://louisvilleky.gov/government/revenue-commission/forms](https://louisvilleky.gov/government/revenue-commission/forms)",
"evidenceText": "Louisville provides Form OL-3 business occupational license tax return sources.",
"webCitation": "([Louisville Metro Government][154])"
},
{
"sourceName": "Lexington-Fayette Urban County Government - Occupational License Fee",
"url": "[https://www.lexingtonky.gov/occupational-license-tax](https://www.lexingtonky.gov/occupational-license-tax)",
"evidenceText": "Lexington states that the Fayette County occupational license fee applies to individuals, employers, and businesses.",
"webCitation": "([City of Lexington][155])"
}
],
"geographyCanDerive": "partially",
"geographyDerivedInputs": [
"city and county",
"local tax administrator"
],
"taxpayerSpecificInputs": [
"local gross earnings",
"gross receipts or net profits",
"payroll",
"nexus",
"local return data"
],
"includeInUserFacingTotals": "gated",
"safestBehavior": "Route users to the local occupational tax database and require local return data before including amounts.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"jurisdiction": "Virginia localities",
"taxTypes": [
"BPOL gross receipts business license tax"
],
"officialRateSources": [
{
"sourceName": "Virginia Tax - BPOL Guidance",
"url": "[https://www.tax.virginia.gov/laws-rules-decisions/rulings-tax-commissioner/21-28](https://www.tax.virginia.gov/laws-rules-decisions/rulings-tax-commissioner/21-28)",
"evidenceText": "Virginia states that BPOL license taxes are imposed and administered by local officials under local authority.",
"webCitation": "([Virginia Tax][110])"
},
{
"sourceName": "Virginia Administrative Code - BPOL Regulations",
"url": "[https://law.lis.virginia.gov/admincode/title23/agency10/chapter500/](https://law.lis.virginia.gov/admincode/title23/agency10/chapter500/)",
"evidenceText": "Virginia administrative regulations define BPOL concepts including gross receipts and local taxation rules.",
"webCitation": "([Virginia Law][112])"
},
{
"sourceName": "Fairfax County - BPOL Rate Schedule",
"url": "[https://www.fairfaxcounty.gov/taxes/business/understanding-bpol-tax](https://www.fairfaxcounty.gov/taxes/business/understanding-bpol-tax)",
"evidenceText": "Fairfax County publishes BPOL rates by business class per $100 of gross receipts.",
"webCitation": "([Fairfax County][156])"
},
{
"sourceName": "Arlington County - Business License Tax",
"url": "[https://www.arlingtonva.us/Government/Programs/Taxes/Business/Business-License-Tax](https://www.arlingtonva.us/Government/Programs/Taxes/Business/Business-License-Tax)",
"evidenceText": "Arlington states that business license taxes are based on prior-year gross receipts.",
"webCitation": "([Arlington County][157])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Local BPOL filing sources",
"url": "[https://law.lis.virginia.gov/admincode/title23/agency10/chapter500/](https://law.lis.virginia.gov/admincode/title23/agency10/chapter500/)",
"evidenceText": "BPOL returns and rates are local; production must source the applicable locality's official forms.",
"webCitation": "([Virginia Tax][110])"
}
],
"geographyCanDerive": "partially",
"geographyDerivedInputs": [
"city or county",
"possible BPOL locality"
],
"taxpayerSpecificInputs": [
"gross receipts by locality",
"business classification",
"definite place of business",
"situs",
"local license return"
],
"includeInUserFacingTotals": "gated",
"safestBehavior": "Flag possible BPOL only. Require local classification and receipts before any estimate.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
},
{
"jurisdiction": "Missouri cities of Kansas City and St. Louis",
"taxTypes": [
"earnings tax",
"net profits tax"
],
"officialRateSources": [
{
"sourceName": "Kansas City, Missouri - Earnings Tax",
"url": "[https://www.kcmo.gov/city-hall/departments/finance/tax-home/earnings-tax](https://www.kcmo.gov/city-hall/departments/finance/tax-home/earnings-tax)",
"evidenceText": "Kansas City states that its earnings tax is 1% on earned income and net profits of businesses and applies to businesses and people who live or work in Kansas City.",
"webCitation": "([Kansas City][158])"
},
{
"sourceName": "City of St. Louis - Earnings Tax",
"url": "[https://www.stlouis-mo.gov/government/departments/collector/earnings-tax/](https://www.stlouis-mo.gov/government/departments/collector/earnings-tax/)",
"evidenceText": "St. Louis states that businesses located in the city and nonresident businesses performing work or services in the city must pay 1% of business earnings.",
"webCitation": "([stlouis-mo.gov][159])"
}
],
"officialFormInstructionSources": [
{
"sourceName": "Kansas City - RD-108 Net Profits Forms",
"url": "[https://www.kcmo.gov/city-hall/departments/finance/tax-home/forms](https://www.kcmo.gov/city-hall/departments/finance/tax-home/forms)",
"evidenceText": "Kansas City provides net profits return forms and states that electronic filing is required for returns.",
"webCitation": "([Kansas City][160])"
},
{
"sourceName": "St. Louis - E-234 Form",
"url": "[https://www.stlouis-mo.gov/government/departments/collector/earnings-tax/forms/](https://www.stlouis-mo.gov/government/departments/collector/earnings-tax/forms/)",
"evidenceText": "St. Louis provides Form E-234 to report and pay the 1% earnings tax.",
"webCitation": "([stlouis-mo.gov][161])"
}
],
"geographyCanDerive": "partially",
"geographyDerivedInputs": [
"city location",
"worksite or service location"
],
"taxpayerSpecificInputs": [
"net profits",
"earned income or payroll allocation",
"business services performed in city",
"filed RD-108 or E-234 data"
],
"includeInUserFacingTotals": "gated",
"safestBehavior": "Use geography to flag possible earnings tax. Require net profits and work-location allocation before estimating.",
"recommendedEstimateStatus": "needs_accountant_review",
"sourceConfidence": "high"
}
],
"specificRuleRepairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"programName": "Renewable Energy Renaissance Zones",
"state": "Michigan",
"issueSummary": "The current expression is directionally correct for abated tax liabilities, but user-facing value must be gated. The benefit is not a generic rebate and should not include Michigan corporate income tax unless an official approval document specifically authorizes it.",
"officialSources": [
{
"sourceName": "Michigan Renaissance Zone Act",
"url": "[https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-Act-376-of-1996](https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-Act-376-of-1996)",
"evidenceText": "The statute is the official authority for Renaissance Zone designations and exemptions.",
"webCitation": "([Michigan Legislature][54])"
},
{
"sourceName": "Michigan Economic Development Corporation - Renewable Energy Renaissance Zones",
"url": "[https://www.michiganbusiness.org/4a817a/globalassets/documents/macc/rerz.pdf](https://www.michiganbusiness.org/4a817a/globalassets/documents/macc/rerz.pdf)",
"evidenceText": "Michigan program material identifies exempt taxes as state education tax, personal and real property taxes, and local income tax where applicable; it also states that other obligations such as federal taxes, local bond obligations, school sinking fund, special assessments, and sales/use taxes are not exempt.",
"webCitation": "([MEDC][55])"
}
],
"geographyDerivedFacts": [
"A Michigan address can derive state, county, municipality, parcel jurisdiction, and whether a city local income tax may exist.",
"Address alone cannot derive approved RERZ designation, approved term, current year in the term, tax-current status, or phaseout multiplier."
],
"taxpayerSpecificFacts": [
"approved_rerz_designation",
"qualified_company_operations",
"company_current_on_state_and_local_taxes",
"approved_zone_term_years",
"program_year",
"phaseout_multiplier",
"eligible_state_education_tax_cents",
"eligible_real_property_tax_cents",
"eligible_personal_property_tax_cents",
"eligible_local_income_tax_cents"
],
"recommendedCalculation": "gross_benefit_cents = (eligible_state_education_tax_cents + eligible_real_property_tax_cents + eligible_personal_property_tax_cents + eligible_local_income_tax_cents) * phaseout_multiplier, but only after approval documents and actual otherwise-due tax liabilities are collected.",
"recommendedDisplay": "Display as approved tax abatement, not a cash rebate. Show no dollar amount until approval and tax-liability inputs are present.",
"excludeFromCalculation": [
"federal tax",
"sales and use tax",
"local bond obligations",
"school sinking fund taxes",
"special assessments",
"Michigan CIT unless specifically documented"
],
"recommendedEstimateStatus": "suppress_until_review",
"sourceConfidence": "high",
"estimateConfidence": "low_without_program_approval_and_tax_bills"
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"programName": "Renewable Energy Tax Valuation",
"state": "Rhode Island",
"issueSummary": "The rule should remain a property-tax valuation workflow rather than a cash incentive estimate. The statutory formula gives a tax treatment; savings require a counterfactual ordinary assessment and local assessor confirmation.",
"officialSources": [
{
"sourceName": "Rhode Island Division of Taxation - Renewable Energy Resources Regulation",
"url": "[https://rules.sos.ri.gov/regulations/part/300-00-00-2](https://rules.sos.ri.gov/regulations/part/300-00-00-2)",
"evidenceText": "Rhode Island's active regulation establishes a $5 per kW AC valuation for commercial renewable energy resources under the tangible property tax treatment and identifies residential and manufacturer-used systems as exempt under statutory provisions.",
"webCitation": "([Rhode Island Department of State][91])"
},
{
"sourceName": "Rhode Island General Assembly - H5967A",
"url": "[https://webserver.rilegislature.gov/BillText/BillText17/HouseText17/H5967A.pdf](https://webserver.rilegislature.gov/BillText/BillText17/HouseText17/H5967A.pdf)",
"evidenceText": "Rhode Island statutory text supports $5 per kW AC for tangible property and $3.50 per kW AC for applicable real property renewable-energy taxation.",
"webCitation": "([Rhode Island General Assembly][92])"
}
],
"geographyDerivedFacts": [
"A Rhode Island address can derive municipality and assessor jurisdiction.",
"Address alone cannot determine AC nameplate capacity, tangible versus real property treatment, commercial versus residential or manufacturer status, municipal exemption or waiver status, interconnection date, or counterfactual assessment."
],
"taxpayerSpecificFacts": [
"ac_kw_capacity",
"renewable_resource_type",
"municipality",
"commercial_tax_status",
"tangible_property_applicable",
"real_property_applicable",
"municipal_exemption_or_waiver_status",
"residential_system_exemption",
"manufacturer_system_exemption",
"interconnection_agreement_date",
"counterfactual_ordinary_annual_property_tax_cents",
"local_assessor_confirmation"
],
"recommendedCalculation": "annual_statutory_tax_cents = (tangible_property_applicable ? ac_kw_capacity * 500 : 0) + (real_property_applicable ? ac_kw_capacity * 350 : 0). Do not calculate savings unless counterfactual_ordinary_annual_property_tax_cents and local_assessor_confirmation are present.",
"recommendedDisplay": "Display as statutory property-tax valuation workflow. If counterfactual ordinary tax is missing, show only the statutory treatment and required next steps.",
"recommendedEstimateStatus": "suppress_until_review",
"sourceConfidence": "high",
"estimateConfidence": "low_without_assessor_confirmation_and_counterfactual_tax_bill"
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"programName": "Tax Abatement for Solar Manufacturers",
"state": "Washington",
"issueSummary": "The current expression is valid as a rate-difference calculation only for qualifying Washington solar manufacturing, processing-for-hire, or wholesale manufacturer activities. It should not be shown to customers installing solar.",
"officialSources": [
{
"sourceName": "Washington Department of Revenue - B&O Classification Definitions",
"url": "[https://dor.wa.gov/taxes-rates/business-occupation-tax/bo-tax-classification-definitions](https://dor.wa.gov/taxes-rates/business-occupation-tax/bo-tax-classification-definitions)",
"evidenceText": "Washington lists manufacturing solar energy systems and related qualifying activities at a 0.275% B&O rate and states that an Annual Tax Performance Report is required.",
"webCitation": "([Washington Department of Revenue][113])"
},
{
"sourceName": "Washington Legislature - RCW 82.04.294",
"url": "[https://app.leg.wa.gov/RCW/default.aspx?cite=82.04.294](https://app.leg.wa.gov/RCW/default.aspx?cite=82.04.294)",
"evidenceText": "RCW 82.04.294 requires taxpayers using the preference to complete an annual tax performance report.",
"webCitation": "([Washington State Legislative App][114])"
},
{
"sourceName": "Washington Legislature - RCW Chapter 82.04",
"url": "[https://app.leg.wa.gov/RCW/default.aspx?cite=82.04](https://app.leg.wa.gov/RCW/default.aspx?cite=82.04)",
"evidenceText": "The statute lists the solar preference provision as expiring July 1, 2032.",
"webCitation": "([Washington State Legislature][115])"
},
{
"sourceName": "Washington Department of Revenue - B&O Tax",
"url": "[https://dor.wa.gov/taxes-rates/business-occupation-tax](https://dor.wa.gov/taxes-rates/business-occupation-tax)",
"evidenceText": "Washington states that the B&O tax has more than 50 classifications and that classification determines the rate; credits such as the Multiple Activities Tax Credit may apply.",
"webCitation": "([Washington Department of Revenue][116])"
}
],
"geographyDerivedFacts": [
"A Washington address can identify state and possible local B&O jurisdictions.",
"Address alone cannot determine qualifying solar manufacturing classification, taxable B&O base, deductions, MATC adjustments, annual report filing, or correct otherwise-applicable rate."
],
"taxpayerSpecificFacts": [
"qualifying_solar_b_and_o_classification",
"tax_period_start_date",
"tax_period_end_date",
"qualifying_tax_base_after_deductions_and_matc_cents",
"otherwise_applicable_b_and_o_rate_decimal",
"preferential_solar_b_and_o_rate_decimal",
"annual_tax_performance_report_filed",
"interstate_or_foreign_sales_deductions_cents",
"multiple_activities_tax_credit_adjustments_cents"
],
"recommendedCalculation": "gross_benefit_cents = max(0, qualifying_tax_base_after_deductions_and_matc_cents * (otherwise_applicable_b_and_o_rate_decimal - 0.00275)). Apply only for qualifying activity and tax periods before the statutory sunset unless extended by law.",
"recommendedDisplay": "Display as Washington solar manufacturing B&O rate preference. Suppress for installation customers and for taxpayers without qualifying manufacturing, processing-for-hire, or wholesale manufacturer classification.",
"effectiveDateHandling": "Do not apply to tax periods on or after July 1, 2032 unless an official statutory extension is confirmed.",
"recommendedEstimateStatus": "suppress_until_review",
"sourceConfidence": "high",
"estimateConfidence": "low_without_filed_excise_return_or_accountant_review"
}
],
"normalizedRuleSchemaRecommendations": {
"taxRuleFields": [
"ruleId",
"jurisdictionLevel",
"jurisdictionName",
"state",
"localJurisdictionType",
"taxType",
"taxBaseType",
"taxpayerClass",
"activityClass",
"effectiveStartDate",
"effectiveEndDate",
"rateExpression",
"rateUnits",
"minimumTaxExpression",
"thresholdExpression",
"deductionInputs",
"creditInputs",
"filingFormIds",
"sourceUrls",
"sourceEvidenceText",
"sourceConfidence",
"estimateConfidence",
"userFacingGatingStatus"
],
"rateUnitsNormalization": {
"percentage": "Store as decimal in calculations, e.g. 7% as 0.07.",
"mills": "Store originalUnits='mills' and convert to decimal by dividing by 1000.",
"per_1000_dollars": "Store originalUnits='dollars_per_1000' and convert to decimal by dividing by 1000.",
"currency": "Store monetary inputs and outputs in integer cents.",
"capacityBasedTax": "Store kW or MW basis explicitly and preserve AC/DC unit; Rhode Island renewable property treatment uses AC kW."
},
"geographyDerivedVsTaxpayerSpecific": {
"geographyDerived": [
"state",
"county",
"municipality",
"tax district",
"parcel jurisdiction",
"possible local business tax authority",
"possible utility territory where separately required"
],
"taxpayerSpecific": [
"nexus",
"entity type",
"tax year",
"taxable income",
"gross receipts",
"net worth or capital base",
"payroll",
"property",
"sales factor",
"apportionment",
"business activity classification",
"deductions",
"credits",
"credit carryforwards",
"tax liability before and after credits",
"filed return positions"
]
},
"userFacingGating": {
"deterministic_with_tax_return_inputs": "Allowed only when official rate source, effective period, and taxpayer tax base are all present from filed return, draft return, accountant review, or actual tax bill.",
"needs_accountant_review": "Use when rate source is official but taxable base, classification, apportionment, deductions, or credit ordering require taxpayer return data.",
"suppress_until_review": "Use when a result could be materially misleading without approval documents, assessor confirmation, local tax classification, or official current-year source retrieval.",
"not_calculable": "Use when official sources do not provide enough public formula detail or the incentive is purely procedural."
},
"federalTaxCreditFilingSources": [
{
"sourceName": "IRS - Form 3800 General Business Credit",
"url": "[https://www.irs.gov/forms-pubs/about-form-3800](https://www.irs.gov/forms-pubs/about-form-3800)",
"evidenceText": "IRS states that Form 3800 is used to claim general business credits.",
"webCitation": "([IRS][162])"
},
{
"sourceName": "IRS - Form 3468 Investment Credit",
"url": "[https://www.irs.gov/forms-pubs/about-form-3468](https://www.irs.gov/forms-pubs/about-form-3468)",
"evidenceText": "IRS provides Form 3468 and instructions for investment credit claims and requires separate Form 3468 filing for each investment credit property or facility.",
"webCitation": "([IRS][163])"
},
{
"sourceName": "IRS - Form 7207 Advanced Manufacturing Production Credit",
"url": "[https://www.irs.gov/forms-pubs/about-form-7207](https://www.irs.gov/forms-pubs/about-form-7207)",
"evidenceText": "IRS states that Form 7207 is used for the advanced manufacturing production credit for eligible components produced and sold.",
"webCitation": "([IRS][164])"
},
{
"sourceName": "IRS - Form 8911 Alternative Fuel Vehicle Refueling Property Credit",
"url": "[https://www.irs.gov/forms-pubs/about-form-8911](https://www.irs.gov/forms-pubs/about-form-8911)",
"evidenceText": "IRS states that the business or investment use part of Form 8911 is treated as a general business credit.",
"webCitation": "([IRS][165])"
},
{
"sourceName": "IRS - Form 7205 Energy Efficient Commercial Buildings Deduction",
"url": "[https://www.irs.gov/forms-pubs/about-form-7205](https://www.irs.gov/forms-pubs/about-form-7205)",
"evidenceText": "IRS provides Form 7205 for the energy efficient commercial buildings deduction under section 179D; it should be modeled as a deduction rather than a credit.",
"webCitation": "([IRS][166])"
}
],
"sourceConfidenceRules": {
"high": "Official tax agency, statutory, regulatory, assessor, treasurer, city finance, or filed-government source with current or clearly effective rule text.",
"medium": "Official source exists but current content was available only through a PDF, a search snippet, or a mirrored official form; production must fetch and parse the current official file before calculation.",
"low": "Only third-party summaries or incomplete official references are available; suppress user-facing values."
},
"estimateConfidenceRules": {
"high": "Official formula and taxpayer tax base are known; return or bill inputs are verified.",
"medium": "Official formula is known and taxpayer supplied inputs are plausible but not accountant-reviewed.",
"low": "Official rate exists but taxable base, classification, approval status, or counterfactual tax is missing."
}
},
"validationRules": [
{
"ruleId": "business_tax_no_address_only_liability",
"severity": "error",
"description": "Never derive taxable income, taxable gross receipts, net worth, B&O base, CAT base, franchise base, or property tax liability from address alone."
},
{
"ruleId": "official_source_required",
"severity": "error",
"description": "Every rate, threshold, exemption, sunset date, and filing form must have sourceUrl, sourceName, evidenceText, and sourceConfidence before calculation."
},
{
"ruleId": "effective_period_required",
"severity": "error",
"description": "Do not apply a tax rate or preference unless taxYear or effectiveStartDate and effectiveEndDate are known."
},
{
"ruleId": "taxpayer_base_required_for_totals",
"severity": "error",
"description": "Do not include income, franchise, gross receipts, CAT, B&O, or local business tax effects in user-facing totals unless the relevant taxpayer tax base is supplied by filed return, draft return, accountant review, tax profile, or actual tax bill."
},
{
"ruleId": "local_tax_geography_is_only_routing",
"severity": "warning",
"description": "Local business tax geography may identify possible jurisdiction only; require nexus, business activity classification, receipts, payroll, net income, or situs before calculation."
},
{
"ruleId": "classification_required_for_gross_receipts_taxes",
"severity": "error",
"description": "For Washington B&O, Ohio CAT, Delaware GRT, Tennessee business tax, San Francisco GRT, Los Angeles business tax, and Virginia BPOL, require activity classification and taxable receipts before estimating."
},
{
"ruleId": "washington_solar_b_and_o_sunset",
"severity": "error",
"description": "Do not apply Washington solar manufacturing B&O preferential rate to tax periods on or after July 1, 2032 unless an official statutory extension is confirmed."
},
{
"ruleId": "washington_solar_customer_exclusion",
"severity": "error",
"description": "Suppress Washington solar manufacturing B&O preference for ordinary solar installation customers; it applies only to qualifying manufacturing, processing-for-hire, or manufacturer-wholesale activities."
},
{
"ruleId": "michigan_rerz_approval_required",
"severity": "error",
"description": "Suppress Michigan Renewable Energy Renaissance Zone dollar value unless approved_rerz_designation, qualified_company_operations, tax-current status, term/year, phaseout multiplier, and actual otherwise-due eligible taxes are present."
},
{
"ruleId": "michigan_rerz_exclusion_list",
"severity": "error",
"description": "Do not include federal taxes, sales/use taxes, local bond obligations, school sinking fund taxes, special assessments, or Michigan CIT in Michigan RERZ abatement unless specific official approval documents say otherwise."
},
{
"ruleId": "rhode_island_property_valuation_not_savings",
"severity": "warning",
"description": "For Rhode Island renewable property-tax valuation, show statutory tax treatment as process value and compute savings only when counterfactual ordinary tax and assessor confirmation are present."
},
{
"ruleId": "unit_normalization",
"severity": "error",
"description": "Normalize all tax math to integer cents and decimal rates while preserving original source units such as mills, per-$1,000, percentage, dollars per kW AC, and gross receipts brackets."
},
{
"ruleId": "nonrefundable_credit_cap",
"severity": "warning",
"description": "For nonrefundable credits, cap current-year user-facing value at available tax liability unless official sources confirm refundability or transferability."
},
{
"ruleId": "credit_ordering_and_carryforward",
"severity": "warning",
"description": "If credit ordering, carryforward, recapture, or certificate rules are unknown, set recommendedEstimateStatus to needs_accountant_review or suppress_until_review."
},
{
"ruleId": "state_local_double_counting",
"severity": "error",
"description": "Do not double count a state tax credit, local abatement, property tax valuation change, federal credit, or utility rebate as the same cash benefit."
}
]
}

[1]: https://www.revenue.alabama.gov/tax-types/corporate-income-tax/?utm_source=chatgpt.com "Corporate Income Tax - Alabama Department of Revenue"
[2]: https://www.revenue.alabama.gov/tax-types/business-privilege-tax/?utm_source=chatgpt.com "Business Privilege Tax - Alabama Department of Revenue"
[3]: https://www.revenue.alabama.gov/individual-corporate/alabama-business-privilege-tax-and-corporate-share-tax/?utm_source=chatgpt.com "Alabama Business Privilege Tax"
[4]: https://tax.alaska.gov/programs/programs/forms/index.aspx?60380=&utm_source=chatgpt.com "Corporate Income Tax Forms"
[5]: https://aws.state.ak.us/OnlinePublicNotices/Notices/View.aspx?id=178707&utm_source=chatgpt.com "Corporate Income Tax Electronic Filing Requirement ..."
[6]: https://azdor.gov/business/corporate-income-tax?utm_source=chatgpt.com "Corporate Income Tax | Arizona Department of Revenue"
[7]: https://azdor.gov/forms/corporate-tax-forms?utm_source=chatgpt.com "Corporate Tax Forms | Arizona Department of Revenue"
[8]: https://www.dfa.arkansas.gov/office/taxes/income-tax-administration/corporation-income-tax/?utm_source=chatgpt.com "Corporation Income Tax – Arkansas Department of Finance ..."
[9]: https://www.dfa.arkansas.gov/office/taxes/income-tax-administration/corporation-income-tax/forms/?utm_source=chatgpt.com "Forms - Arkansas Department of Finance and Administration"
[10]: https://www.ftb.ca.gov/file/business/types/corporations/c-corporations.html?utm_source=chatgpt.com "C corporations | FTB.ca.gov"
[11]: https://www.ftb.ca.gov/file/business/types/corporations/s-corporations.html?utm_source=chatgpt.com "S corporations Business type - Franchise Tax Board - CA.gov"
[12]: https://www.ftb.ca.gov/forms/search/?utm_source=chatgpt.com "Forms and Publications Search | California Franchise Tax Board"
[13]: https://tax.colorado.gov/corporate-income-tax-guide?utm_source=chatgpt.com "Corporate Income Tax Guide | Department of Revenue"
[14]: https://tax.colorado.gov/DR0112?utm_source=chatgpt.com "DR 0112 - C Corporation Income Tax Return (form only)"
[15]: https://tax.colorado.gov/business-income-tax-forms?utm_source=chatgpt.com "Business Income Tax | Forms & Instructions"
[16]: https://portal.ct.gov/drs/drs-forms/current-year-forms/corporation-forms?utm_source=chatgpt.com "Corporation Forms"
[17]: https://portal.ct.gov/drs/corporation-tax/tax-information?utm_source=chatgpt.com "Corporation Welcome Page"
[18]: https://revenue.delaware.gov/frequently-asked-questions/gross-receipts-tax-faqs/?utm_source=chatgpt.com "Gross Receipts Tax FAQs - Delaware Division of Revenue"
[19]: https://revenue.delaware.gov/business-tax-forms/doing-business-in-delaware/step-4-gross-receipts-taxes/?utm_source=chatgpt.com "Step 4: Learn About Gross Receipts Taxes - Division of Revenue"
[20]: https://revenue.delaware.gov/business-tax-forms/franchise-taxes/ "https://revenue.delaware.gov/business-tax-forms/franchise-taxes/"
[21]: https://revenue.delaware.gov/business-tax-forms/?utm_source=chatgpt.com "Business Tax Forms 2025-2026 - Delaware Division of Revenue"
[22]: https://otr.cfo.dc.gov/page/dc-business-franchise-tax-rates?utm_source=chatgpt.com "DC Business Franchise Tax Rates | otr"
[23]: https://otr.cfo.dc.gov/page/corporate-business-franchise-tax-forms?utm_source=chatgpt.com "Corporate Business Franchise Tax Forms | otr"
[24]: https://floridarevenue.com/taxes/taxesfees/Pages/corporate.aspx?utm_source=chatgpt.com "Florida Dept. of Revenue - Corporate Income Tax"
[25]: https://floridarevenue.com/Pages/forms_index.aspx?utm_source=chatgpt.com "Florida Dept. of Revenue - ​​​​Forms and Publications"
[26]: https://taxapps.floridarevenue.com/Corporate/Login.aspx?utm_source=chatgpt.com "File and Pay Corporate Income Tax"
[27]: https://dor.georgia.gov/taxes/taxes-corporations?utm_source=chatgpt.com "Taxes for Corporations - Department of Revenue - Georgia.gov"
[28]: https://dor.georgia.gov/it-611-corporation-income-tax-instruction-booklet?utm_source=chatgpt.com "IT-611 Corporation Income Tax Instruction Booklet"
[29]: https://tax.hawaii.gov/forms/a1_1alphalist/?utm_source=chatgpt.com "Hawaii Tax Forms (Alphabetical Listing)"
[30]: https://tax.hawaii.gov/forms/a1_b1_3corp/?utm_source=chatgpt.com "Corporate Income Tax Forms - Hawaii Department of Taxation"
[31]: https://tax.idaho.gov/taxes/income-tax/business-income/?utm_source=chatgpt.com "Business Income | Idaho State Tax Commission"
[32]: https://tax.idaho.gov/taxes/income-tax/business-income/forms/?utm_source=chatgpt.com "Business Income Tax Forms - Idaho State Tax Commission"
[33]: https://tax.illinois.gov/research/taxrates/income.html "https://tax.illinois.gov/research/taxrates/income.html"
[34]: https://tax.illinois.gov/localgovernments/personal-property-replacement-tax.html "https://tax.illinois.gov/localgovernments/personal-property-replacement-tax.html"
[35]: https://tax.illinois.gov/forms/incometax/businesses.html "https://tax.illinois.gov/forms/incometax/businesses.html"
[36]: https://www.in.gov/dor/tax-forms/corporate/current-corporatepartnership/?utm_source=chatgpt.com "DOR: Current Year Corporate/Partnership Tax Forms"
[37]: https://revenue.iowa.gov/taxes/tax-guidance/business-income-tax/iowa-corporate-income-tax-rates "https://revenue.iowa.gov/taxes/tax-guidance/business-income-tax/iowa-corporate-income-tax-rates"
[38]: https://revenue.iowa.gov/forms/common-forms/corporation-income-tax?utm_source=chatgpt.com "Forms - Corporation Income Tax"
[39]: https://www.ksrevenue.gov/forms-btcinc.html "https://www.ksrevenue.gov/forms-btcinc.html"
[40]: https://www.ksrevenue.gov/corpbook25.html "https://www.ksrevenue.gov/corpbook25.html"
[41]: https://revenue.ky.gov/Business/Corporation-Income-and-Limited-Liability-Entity-Tax/Pages/default.aspx "https://revenue.ky.gov/Business/Corporation-Income-and-Limited-Liability-Entity-Tax/Pages/default.aspx"
[42]: https://revenue.ky.gov/Forms/Form%20720.pdf "https://revenue.ky.gov/Forms/Form%20720.pdf"
[43]: https://revenue.louisiana.gov/tax-education-and-faqs/faqs/income-tax-reform/what-is-the-corporation-income-tax-rate/ "https://revenue.louisiana.gov/tax-education-and-faqs/faqs/income-tax-reform/what-is-the-corporation-income-tax-rate/"
[44]: https://revenue.louisiana.gov/tax-education-and-faqs/faqs/income-tax-reform/is-the-corporation-franchise-tax-repealed/ "https://revenue.louisiana.gov/tax-education-and-faqs/faqs/income-tax-reform/is-the-corporation-franchise-tax-repealed/"
[45]: https://revenue.louisiana.gov/tax-forms/businesses/ "https://revenue.louisiana.gov/tax-forms/businesses/"
[46]: https://www.maine.gov/revenue/taxes/income-estate-tax/corporate-income-tax-1120me "https://www.maine.gov/revenue/taxes/income-estate-tax/corporate-income-tax-1120me"
[47]: https://www.maine.gov/revenue/tax-return-forms/corporate-income-tax-2025 "https://www.maine.gov/revenue/tax-return-forms/corporate-income-tax-2025"
[48]: https://services.marylandcomptroller.gov/taxes?id=kb_article_view&sysparm_article=KB0010197 "https://services.marylandcomptroller.gov/taxes?id=kb_article_view&sysparm_article=KB0010197"
[49]: https://services.marylandcomptroller.gov/taxes?id=kb_article_view&sysparm_article=KB0010129 "https://services.marylandcomptroller.gov/taxes?id=kb_article_view&sysparm_article=KB0010129"
[50]: https://www.mass.gov/info-details/massachusetts-corporate-excise-tax-forms-and-instructions "https://www.mass.gov/info-details/massachusetts-corporate-excise-tax-forms-and-instructions"
[51]: https://www.sec.state.ma.us/divisions/corporations/important-tax-info.htm "https://www.sec.state.ma.us/divisions/corporations/important-tax-info.htm"
[52]: https://www.mass.gov/lists/2025-massachusetts-corporate-excise-tax-forms-and-instructions "https://www.mass.gov/lists/2025-massachusetts-corporate-excise-tax-forms-and-instructions"
[53]: https://www.michigan.gov/taxes/business-taxes/cit "https://www.michigan.gov/taxes/business-taxes/cit"
[54]: https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-act-376-of-1996 "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-act-376-of-1996"
[55]: https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf "https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf"
[56]: https://www.michigan.gov/taxes/biz-forms "https://www.michigan.gov/taxes/biz-forms"
[57]: https://www.revenue.state.mn.us/corporation-franchise-tax "https://www.revenue.state.mn.us/corporation-franchise-tax"
[58]: https://mn.gov/deed/business/starting-business/taxes/tax-returns.jsp "https://mn.gov/deed/business/starting-business/taxes/tax-returns.jsp"
[59]: https://www.dor.ms.gov/node/6416 "https://www.dor.ms.gov/node/6416"
[60]: https://dor.mo.gov/taxation/business/ "https://dor.mo.gov/taxation/business/"
[61]: https://dor.mo.gov/forms/index.php?category=&formName=MO-1120 "https://dor.mo.gov/forms/index.php?category=&formName=MO-1120"
[62]: https://revenue.mt.gov/taxes/corporate-income-tax "https://revenue.mt.gov/taxes/corporate-income-tax"
[63]: https://revenue.mt.gov/forms/ "https://revenue.mt.gov/forms/"
[64]: https://revenue.nebraska.gov/about/forms/corporation-and-s-corporation-income-tax-forms "https://revenue.nebraska.gov/about/forms/corporation-and-s-corporation-income-tax-forms"
[65]: https://revenue.nebraska.gov/about/frequently-asked-questions/business-income-tax-faqs "https://revenue.nebraska.gov/about/frequently-asked-questions/business-income-tax-faqs"
[66]: https://tax.nv.gov/ "https://tax.nv.gov/"
[67]: https://tax.nv.gov/updates-to-my-nevada-tax/ "https://tax.nv.gov/updates-to-my-nevada-tax/"
[68]: https://www.revenue.nh.gov/taxes-glance/business-taxes "https://www.revenue.nh.gov/taxes-glance/business-taxes"
[69]: https://www.revenue.nh.gov/resource-center/current-year-forms-and-instructions "https://www.revenue.nh.gov/resource-center/current-year-forms-and-instructions"
[70]: https://www.nj.gov/treasury/taxation/corp_over.shtml "https://www.nj.gov/treasury/taxation/corp_over.shtml"
[71]: https://www.nj.gov/treasury/taxation/prntcbt.shtml "https://www.nj.gov/treasury/taxation/prntcbt.shtml"
[72]: https://www.tax.newmexico.gov/businesses/corporate-income-franchise-tax-overview/ "https://www.tax.newmexico.gov/businesses/corporate-income-franchise-tax-overview/"
[73]: https://www.tax.newmexico.gov/businesses/corporate-income-franchise-tax-overview/filing-requirements/ "https://www.tax.newmexico.gov/businesses/corporate-income-franchise-tax-overview/filing-requirements/"
[74]: https://www.tax.ny.gov/bus/ct/ctidx.htm "https://www.tax.ny.gov/bus/ct/ctidx.htm"
[75]: https://www.tax.ny.gov/forms/current-forms/ct/ct3i.htm "https://www.tax.ny.gov/forms/current-forms/ct/ct3i.htm"
[76]: https://www.ncdor.gov/taxes-forms/corporate-income-franchise-tax/corporate-income-and-franchise-tax-rates "https://www.ncdor.gov/taxes-forms/corporate-income-franchise-tax/corporate-income-and-franchise-tax-rates"
[77]: https://www.ncdor.gov/taxes-forms/corporate-income-franchise-tax/corporate-tax-forms-and-instructions "https://www.ncdor.gov/taxes-forms/corporate-income-franchise-tax/corporate-tax-forms-and-instructions"
[78]: https://www.tax.nd.gov/business/corporate-income-tax "https://www.tax.nd.gov/business/corporate-income-tax"
[79]: https://www.tax.nd.gov/forms "https://www.tax.nd.gov/forms"
[80]: https://tax.ohio.gov/business/commercial-activity-tax "https://tax.ohio.gov/business/commercial-activity-tax"
[81]: https://tax.ohio.gov/business/ohio-business-taxes/commercial-activities/information-releases/index-cat/cat-2013-05 "https://tax.ohio.gov/business/ohio-business-taxes/commercial-activities/information-releases/index-cat/cat-2013-05"
[82]: https://tax.ohio.gov/home/forms/landing-page-area/cat1 "https://tax.ohio.gov/home/forms/landing-page-area/cat1"
[83]: https://tax.ohio.gov/business/municipal-net-profit-tax "https://tax.ohio.gov/business/municipal-net-profit-tax"
[84]: https://oklahoma.gov/tax/forms.html "https://oklahoma.gov/tax/forms.html"
[85]: https://www.oregon.gov/dor/programs/businesses/pages/corp-requirements.aspx "https://www.oregon.gov/dor/programs/businesses/pages/corp-requirements.aspx"
[86]: https://www.oregon.gov/dor/programs/businesses/pages/corporate-activity-tax.aspx "https://www.oregon.gov/dor/programs/businesses/pages/corporate-activity-tax.aspx"
[87]: https://www.oregon.gov/dor/forms/pages/2025.aspx "https://www.oregon.gov/dor/forms/pages/2025.aspx"
[88]: https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/corporation-taxes/corporate-net-income-tax "https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/corporation-taxes/corporate-net-income-tax"
[89]: https://www.pa.gov/agencies/revenue/forms-and-publications "https://www.pa.gov/agencies/revenue/forms-and-publications"
[90]: https://tax.ri.gov/tax-sections/corporate-tax/tax-filing-requirements "https://tax.ri.gov/tax-sections/corporate-tax/tax-filing-requirements"
[91]: https://rules.sos.ri.gov/regulations/part/300-00-00-2 "https://rules.sos.ri.gov/regulations/part/300-00-00-2"
[92]: https://webserver.rilegislature.gov/BillText/BillText25/HouseText25/H5967A.pdf "https://webserver.rilegislature.gov/BillText/BillText25/HouseText25/H5967A.pdf"
[93]: https://tax.ri.gov/forms/business-tax-forms/corporate-tax-forms "https://tax.ri.gov/forms/business-tax-forms/corporate-tax-forms"
[94]: https://dor.sc.gov/business-income-taxes/corporate/c-corporation "https://dor.sc.gov/business-income-taxes/corporate/c-corporation"
[95]: https://dor.sc.gov/business-income-taxes/corporate/s-corporation "https://dor.sc.gov/business-income-taxes/corporate/s-corporation"
[96]: https://dor.sc.gov/sites/dor/files/forms/SC1120I.pdf "https://dor.sc.gov/sites/dor/files/forms/SC1120I.pdf"
[97]: https://dor.sd.gov/businesses/taxes/bank-franchise-tax/ "https://dor.sd.gov/businesses/taxes/bank-franchise-tax/"
[98]: https://dor.sd.gov/businesses/taxes/ "https://dor.sd.gov/businesses/taxes/"
[99]: https://www.tn.gov/revenue/taxes/franchise---excise-tax.html "https://www.tn.gov/revenue/taxes/franchise---excise-tax.html"
[100]: https://www.tn.gov/revenue/taxes/business-tax/classifications.html "https://www.tn.gov/revenue/taxes/business-tax/classifications.html"
[101]: https://www.tn.gov/revenue/taxes/gross-receipts-taxes.html "https://www.tn.gov/revenue/taxes/gross-receipts-taxes.html"
[102]: https://www.tn.gov/revenue/taxes/franchise---excise-tax/forms.html "https://www.tn.gov/revenue/taxes/franchise---excise-tax/forms.html"
[103]: https://comptroller.texas.gov/taxes/franchise/ "https://comptroller.texas.gov/taxes/franchise/"
[104]: https://comptroller.texas.gov/taxes/publications/98-806.php "https://comptroller.texas.gov/taxes/publications/98-806.php"
[105]: https://comptroller.texas.gov/taxes/franchise/forms/2026-franchise.php "https://comptroller.texas.gov/taxes/franchise/forms/2026-franchise.php"
[106]: https://tax.utah.gov/forms-pubs/ "https://tax.utah.gov/forms-pubs/"
[107]: https://tax.utah.gov/tax-professionals/mef/ "https://tax.utah.gov/tax-professionals/mef/"
[108]: https://www.taxformfinder.org/forms/2025/2025-vermont-form-co-411.pdf "https://www.taxformfinder.org/forms/2025/2025-vermont-form-co-411.pdf"
[109]: https://www.tax.virginia.gov/corporation-income-tax "https://www.tax.virginia.gov/corporation-income-tax"
[110]: https://www.tax.virginia.gov/laws-rules-decisions/rulings-tax-commissioner/16-175 "https://www.tax.virginia.gov/laws-rules-decisions/rulings-tax-commissioner/16-175"
[111]: https://www.tax.virginia.gov/forms/search "https://www.tax.virginia.gov/forms/search"
[112]: https://law.lis.virginia.gov/admincode/title23/agency10/chapter500/ "https://law.lis.virginia.gov/admincode/title23/agency10/chapter500/"
[113]: https://dor.wa.gov/open-business/apply-business-license/plan-taxes/business-and-occupation-bo-tax-classification-definitions "https://dor.wa.gov/open-business/apply-business-license/plan-taxes/business-and-occupation-bo-tax-classification-definitions"
[114]: https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.294 "https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.294"
[115]: https://app.leg.wa.gov/rcw/default.aspx?cite=82.04&full=true "https://app.leg.wa.gov/rcw/default.aspx?cite=82.04&full=true"
[116]: https://dor.wa.gov/taxes-rates/business-occupation-tax "https://dor.wa.gov/taxes-rates/business-occupation-tax"
[117]: https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems "https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems"
[118]: https://tax.wv.gov/researchandgovernment/research/taxexpenditurestudy/corporationtax/Pages/CorporationTax.aspx "https://tax.wv.gov/researchandgovernment/research/taxexpenditurestudy/corporationtax/Pages/CorporationTax.aspx"
[119]: https://tax.wv.gov/business/corporateincometax/pages/corporateincometax.aspx "https://tax.wv.gov/business/corporateincometax/pages/corporateincometax.aspx"
[120]: https://tax.wv.gov/Business/CorporateIncomeTax/Pages/CorporateIncomeTaxPriorYears.aspx "https://tax.wv.gov/Business/CorporateIncomeTax/Pages/CorporateIncomeTaxPriorYears.aspx"
[121]: https://www.revenue.wi.gov/Pages/HTML/formpub.aspx "https://www.revenue.wi.gov/Pages/HTML/formpub.aspx"
[122]: https://www.revenue.wi.gov/Pages/FAQS/ise-crpginfo.aspx "https://www.revenue.wi.gov/Pages/FAQS/ise-crpginfo.aspx"
[123]: https://sos.wyo.gov/faqs.aspx?root=BUS "https://sos.wyo.gov/faqs.aspx?root=BUS"
[124]: https://sos.wyo.gov/business/docs/businessfees.pdf "https://sos.wyo.gov/business/docs/businessfees.pdf"
[125]: https://www.seattle.gov/city-finance/business-taxes-and-licenses/business-taxes "https://www.seattle.gov/city-finance/business-taxes-and-licenses/business-taxes"
[126]: https://tacoma.gov/government/departments/finance/taxes-and-licenses/city-taxes/tax-types/ "https://tacoma.gov/government/departments/finance/taxes-and-licenses/city-taxes/tax-types/"
[127]: https://bellevuewa.gov/city-government/departments/finance/business-taxes/business-occupation-taxes "https://bellevuewa.gov/city-government/departments/finance/business-taxes/business-occupation-taxes"
[128]: https://www.ritaohio.com/TaxRatesTable "https://www.ritaohio.com/TaxRatesTable"
[129]: https://www.ccaohio.gov/tax-rates "https://www.ccaohio.gov/tax-rates"
[130]: https://www.ritaohio.com/Forms/Home/BusinessFormDownloads "https://www.ritaohio.com/Forms/Home/BusinessFormDownloads"
[131]: https://www.phila.gov/services/payments-assistance-taxes/taxes/business-taxes/business-taxes-by-type/business-income-receipts-tax-birt/ "https://www.phila.gov/services/payments-assistance-taxes/taxes/business-taxes/business-taxes-by-type/business-income-receipts-tax-birt/"
[132]: https://www.phila.gov/services/payments-assistance-taxes/taxes/business-taxes/business-taxes-by-type/net-profits-tax/ "https://www.phila.gov/services/payments-assistance-taxes/taxes/business-taxes/business-taxes-by-type/net-profits-tax/"
[133]: https://www.phila.gov/2025-06-18-philly-extends-deadline-for-relief-program-announces-tax-cuts/ "https://www.phila.gov/2025-06-18-philly-extends-deadline-for-relief-program-announces-tax-cuts/"
[134]: https://dced.pa.gov/local-government/local-income-tax-information/ "https://dced.pa.gov/local-government/local-income-tax-information/"
[135]: https://dced.pa.gov/local-government/local-income-tax-information/psd-codes-and-eit-rates/ "https://dced.pa.gov/local-government/local-income-tax-information/psd-codes-and-eit-rates/"
[136]: https://www.nyc.gov/site/finance/business/business-corporation-tax.page "https://www.nyc.gov/site/finance/business/business-corporation-tax.page"
[137]: https://www.nyc.gov/site/finance/business/business-unincorporated-business-tax-ubt.page "https://www.nyc.gov/site/finance/business/business-unincorporated-business-tax-ubt.page"
[138]: https://www.nyc.gov/site/finance/business/business-commercial-rent-tax-crt.page "https://www.nyc.gov/site/finance/business/business-commercial-rent-tax-crt.page"
[139]: https://sftreasurer.org/business/taxes-fees/gross-receipts-tax-gr-0 "https://sftreasurer.org/business/taxes-fees/gross-receipts-tax-gr-0"
[140]: https://sftreasurer.org/business/gross-receipts-tax-overview "https://sftreasurer.org/business/gross-receipts-tax-overview"
[141]: https://finance.lacity.gov/tax-education/business-taxes/know-your-rates "https://finance.lacity.gov/tax-education/business-taxes/know-your-rates"
[142]: https://finance.lacity.gov/tax-information-booklet "https://finance.lacity.gov/tax-information-booklet"
[143]: https://finance.lacity.gov/business-tax-renewal-instructions "https://finance.lacity.gov/business-tax-renewal-instructions"
[144]: https://www.portland.gov/revenue/business-tax "https://www.portland.gov/revenue/business-tax"
[145]: https://www.oregonmetro.gov/what-metro-does/housing-and-homelessness/supportive-housing-services/funding "https://www.oregonmetro.gov/what-metro-does/housing-and-homelessness/supportive-housing-services/funding"
[146]: https://www.portland.gov/revenue/business-tax/clean-energy-surcharge "https://www.portland.gov/revenue/business-tax/clean-energy-surcharge"
[147]: https://multco.us/info/multnomah-county-business-income-tax-mcbit "https://multco.us/info/multnomah-county-business-income-tax-mcbit"
[148]: https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-treasury/income-tax/business-income-tax "https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-treasury/income-tax/business-income-tax"
[149]: https://www.michigan.gov/taxes/citytax/detroit/business/cit "https://www.michigan.gov/taxes/citytax/detroit/business/cit"
[150]: https://www.michigan.gov/taxes/citytax/detroit/forms "https://www.michigan.gov/taxes/citytax/detroit/forms"
[151]: https://revenue.ky.gov/Business/Pages/default.aspx "https://revenue.ky.gov/Business/Pages/default.aspx"
[152]: https://www.klc.org/InfoCentral/Detail/31/occupational-license-tax "https://www.klc.org/InfoCentral/Detail/31/occupational-license-tax"
[153]: https://onestop.ky.gov/start/pages/default.aspx "https://onestop.ky.gov/start/pages/default.aspx"
[154]: https://louisvilleky.gov/revenue-commission/forms/form-ol-3-occupational-license-return "https://louisvilleky.gov/revenue-commission/forms/form-ol-3-occupational-license-return"
[155]: https://www.lexingtonky.gov/working/business-licensing-taxes "https://www.lexingtonky.gov/working/business-licensing-taxes"
[156]: https://www.fairfaxcounty.gov/taxes/business/bpol-license-rates "https://www.fairfaxcounty.gov/taxes/business/bpol-license-rates"
[157]: https://www.arlingtonva.us/Government/Programs/Taxes/Business-License-and-Taxes/Business-Types-Tax-Rates "https://www.arlingtonva.us/Government/Programs/Taxes/Business-License-and-Taxes/Business-Types-Tax-Rates"
[158]: https://www.kcmo.gov/city-hall/departments/finance/earnings-tax "https://www.kcmo.gov/city-hall/departments/finance/earnings-tax"
[159]: https://www.stlouis-mo.gov/government/departments/collector/earnings-tax/business-earnings-tax-info.cfm "https://www.stlouis-mo.gov/government/departments/collector/earnings-tax/business-earnings-tax-info.cfm"
[160]: https://www.kcmo.gov/city-hall/departments/finance/tax-home/tax-forms "https://www.kcmo.gov/city-hall/departments/finance/tax-home/tax-forms"
[161]: https://www.stlouis-mo.gov/government/departments/collector/earnings-tax/documents/index.cfm "https://www.stlouis-mo.gov/government/departments/collector/earnings-tax/documents/index.cfm"
[162]: https://www.irs.gov/forms-pubs/about-form-3800 "https://www.irs.gov/forms-pubs/about-form-3800"
[163]: https://www.irs.gov/forms-pubs/about-form-3468 "https://www.irs.gov/forms-pubs/about-form-3468"
[164]: https://www.irs.gov/instructions/i7207 "https://www.irs.gov/instructions/i7207"
[165]: https://www.irs.gov/forms-pubs/about-form-8911 "https://www.irs.gov/forms-pubs/about-form-8911"
[166]: https://www.irs.gov/instructions/i7205 "https://www.irs.gov/instructions/i7205"
