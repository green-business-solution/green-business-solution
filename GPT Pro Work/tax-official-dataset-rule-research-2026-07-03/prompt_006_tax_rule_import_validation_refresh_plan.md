You are helping RetroFi build a source-backed tax dataset and rule database.

Task name: Tax rule import validation and refresh plan
Research date: 2026-07-03

Rules:
- Use official government, utility, tax agency, assessor, treasurer, statutory, regulatory, or filed-tariff sources wherever possible.
- Prefer machine-readable official sources over third-party summaries.
- Do not invent rates, jurisdictions, formulas, or effective dates.
- If official data is not complete, mark the gap and state the safest user-facing behavior.
- Separate geography-derived facts from taxpayer/project-specific facts.
- Separate source confidence from estimate confidence.
- Return JSON only. No markdown outside the JSON object.
- Use source URLs and concise evidence text for every material claim.


Task:
Design the validation/import/refresh approach for RetroFi's future tax dataset database. This should tell Codex exactly how to validate GPT Pro-researched tax data before importing it.

Use these current sample profile jurisdictions to prioritize practical coverage:
```json
[
  {
    "state": "AK",
    "profiles": [
      {
        "sampleUserId": "uaf-akasofu-building",
        "companyName": "University of Alaska Fairbanks - Akasofu Building",
        "siteAddress": "2160 Koyukuk Drive, Fairbanks, AK 99775, USA",
        "organizationType": "Government / Public Agency",
        "buildingType": "School / Education Campus"
      }
    ]
  },
  {
    "state": "AZ",
    "profiles": [
      {
        "sampleUserId": "intel-ocotillo-chandler",
        "companyName": "Intel Ocotillo Campus",
        "siteAddress": "4500 S Dobson Road, Chandler, AZ 85248, USA",
        "organizationType": "Industrial Facility",
        "buildingType": "Industrial / Manufacturing"
      },
      {
        "sampleUserId": "ntua-fort-defiance-headquarters",
        "companyName": "Navajo Tribal Utility Authority Headquarters",
        "siteAddress": "Indian Route 12, Fort Defiance, AZ 86504, USA",
        "organizationType": "Government / Public Agency",
        "buildingType": "Office / Administrative"
      }
    ]
  },
  {
    "state": "CA",
    "profiles": [
      {
        "sampleUserId": "california-endowment-hq",
        "companyName": "The California Endowment",
        "siteAddress": "1000 N Alameda Street, Los Angeles, CA 90012, USA",
        "organizationType": "Nonprofit Organization",
        "buildingType": "Office / Administrative"
      },
      {
        "sampleUserId": "ikea-burbank",
        "companyName": "IKEA Burbank",
        "siteAddress": "600 South IKEA Way, Burbank, CA 91502, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Retail / Storefront"
      },
      {
        "sampleUserId": "juniper-and-ivy-san-diego",
        "companyName": "Juniper & Ivy",
        "siteAddress": "2228 Kettner Boulevard, San Diego, CA 92101, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Restaurant / Commercial Kitchen"
      },
      {
        "sampleUserId": "northgate-market-anaheim",
        "companyName": "Northgate Gonzalez Market #40",
        "siteAddress": "2030 E Lincoln Avenue, Anaheim, CA 92806, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Grocery / Convenience / Cold Storage"
      },
      {
        "sampleUserId": "melissas-vernon-distribution",
        "companyName": "Melissa's / World Variety Produce",
        "siteAddress": "5325 S Soto Street, Vernon, CA 90058, USA",
        "organizationType": "Industrial Facility",
        "buildingType": "Warehouse / Industrial Space"
      },
      {
        "sampleUserId": "fender-corona-plant",
        "companyName": "Fender Musical Instruments Corporation - Corona Manufacturing Plant",
        "siteAddress": "311 Cessna Circle, Corona, CA 92880, USA",
        "organizationType": "Industrial Facility",
        "buildingType": "Industrial / Manufacturing"
      },
      {
        "sampleUserId": "westin-pasadena",
        "companyName": "The Westin Pasadena",
        "siteAddress": "191 N Los Robles Avenue, Pasadena, CA 91101, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Hotel / Hospitality"
      },
      {
        "sampleUserId": "one-community-health-midtown",
        "companyName": "One Community Health - Midtown Campus",
        "siteAddress": "1500 21st Street, Sacramento, CA 95811, USA",
        "organizationType": "Nonprofit Organization",
        "buildingType": "Medical / Healthcare"
      },
      {
        "sampleUserId": "santa-clara-university-campus",
        "companyName": "Santa Clara University",
        "siteAddress": "500 El Camino Real, Santa Clara, CA 95053, USA",
        "organizationType": "Nonprofit Organization",
        "buildingType": "School / Education Campus"
      },
      {
        "sampleUserId": "seghesio-healdsburg-winery",
        "companyName": "Seghesio Family Vineyards",
        "siteAddress": "700 Grove Street, Healdsburg, CA 95448, USA",
        "organizationType": "Agricultural Operation",
        "buildingType": "Industrial / Manufacturing"
      }
    ]
  },
  {
    "state": "CO",
    "profiles": [
      {
        "sampleUserId": "tapiz-mariposa-denver-household",
        "companyName": "Anonymized senior or disabled household at Tapiz at Mariposa",
        "siteAddress": "1099 Osage Street, Denver, CO 80204, USA",
        "organizationType": "Residential",
        "buildingType": "Multifamily / Apartment Building"
      },
      {
        "sampleUserId": "food-bank-rockies-aurora-dc",
        "companyName": "Food Bank of the Rockies - Denver Metro Distribution Center",
        "siteAddress": "20600 E 38th Avenue, Aurora, CO 80019, USA",
        "organizationType": "Nonprofit Organization",
        "buildingType": "Warehouse / Logistics"
      }
    ]
  },
  {
    "state": "DC",
    "profiles": [
      {
        "sampleUserId": "bens-chili-bowl-dc",
        "companyName": "Ben's Chili Bowl - U Street Location",
        "siteAddress": "1213 U Street NW, Washington, DC 20009, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Restaurant / Commercial Kitchen"
      }
    ]
  },
  {
    "state": "GA",
    "profiles": [
      {
        "sampleUserId": "trees-atlanta-kendeda-treehouse",
        "companyName": "Trees Atlanta - Kendeda TreeHouse",
        "siteAddress": "825 Warner Street SW, Suite A, Atlanta, GA 30310, USA",
        "organizationType": "Nonprofit Organization",
        "buildingType": "Office / Administrative"
      }
    ]
  },
  {
    "state": "HI",
    "profiles": [
      {
        "sampleUserId": "keauhou-lane-honolulu-renter",
        "companyName": "Anonymized workforce-housing household at Keauhou Lane",
        "siteAddress": "502 Keawe Street, Honolulu, HI 96813, USA",
        "organizationType": "Residential",
        "buildingType": "Mixed-use"
      },
      {
        "sampleUserId": "kauai-coffee-kalaheo",
        "companyName": "Kauai Coffee Company Visitor Center and Estate",
        "siteAddress": "870 Halewili Road, Kalaheo, HI 96741, USA",
        "organizationType": "Agricultural Operation",
        "buildingType": "Agricultural / Greenhouse"
      }
    ]
  },
  {
    "state": "IA",
    "profiles": [
      {
        "sampleUserId": "quaker-oats-cedar-rapids",
        "companyName": "Quaker Oats Cedar Rapids Plant",
        "siteAddress": "418 2nd Street NE, Cedar Rapids, IA 52401, USA",
        "organizationType": "Industrial Facility",
        "buildingType": "Industrial / Manufacturing"
      }
    ]
  },
  {
    "state": "ID",
    "profiles": [
      {
        "sampleUserId": "boise-coop-north-end",
        "companyName": "Boise Co-op - North End",
        "siteAddress": "888 W Fort Street, Boise, ID 83702, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Grocery / Convenience / Cold Storage"
      }
    ]
  },
  {
    "state": "IL",
    "profiles": [
      {
        "sampleUserId": "common-ground-coop-urbana",
        "companyName": "Common Ground Food Co-op",
        "siteAddress": "300 S Broadway Avenue, Suite 166, Urbana, IL 61801, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Grocery / Convenience / Cold Storage"
      }
    ]
  },
  {
    "state": "MA",
    "profiles": [
      {
        "sampleUserId": "boston-latin-school",
        "companyName": "Boston Latin School",
        "siteAddress": "78 Avenue Louis Pasteur, Boston, MA 02115, USA",
        "organizationType": "Government / Public Agency",
        "buildingType": "School / Education Campus"
      }
    ]
  },
  {
    "state": "ME",
    "profiles": [
      {
        "sampleUserId": "portland-food-coop-maine",
        "companyName": "Portland Food Co-op",
        "siteAddress": "290 Congress Street, Portland, ME 04101, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Grocery / Convenience / Cold Storage"
      }
    ]
  },
  {
    "state": "MI",
    "profiles": [
      {
        "sampleUserId": "zingermans-deli-ann-arbor",
        "companyName": "Zingerman's Delicatessen",
        "siteAddress": "422 Detroit Street, Ann Arbor, MI 48104, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Restaurant / Commercial Kitchen"
      },
      {
        "sampleUserId": "eastern-market-detroit",
        "companyName": "Eastern Market Partnership",
        "siteAddress": "2934 Russell Street, Detroit, MI 48207, USA",
        "organizationType": "Nonprofit Organization",
        "buildingType": "Mixed-use"
      },
      {
        "sampleUserId": "gm-factory-zero-detroit",
        "companyName": "General Motors Factory ZERO",
        "siteAddress": "2500 E Grand Boulevard, Detroit, MI 48211, USA",
        "organizationType": "Industrial Facility",
        "buildingType": "Industrial / Manufacturing"
      }
    ]
  },
  {
    "state": "MN",
    "profiles": [
      {
        "sampleUserId": "the-rose-minneapolis-household",
        "companyName": "Anonymized household at The Rose",
        "siteAddress": "1928 Portland Avenue S, Minneapolis, MN 55404, USA",
        "organizationType": "Residential",
        "buildingType": "Multifamily / Apartment Building"
      }
    ]
  },
  {
    "state": "MT",
    "profiles": [
      {
        "sampleUserId": "big-dipper-missoula",
        "companyName": "Big Dipper Ice Cream - Missoula",
        "siteAddress": "631 S Higgins Avenue, Missoula, MT 59801, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Restaurant / Commercial Kitchen"
      }
    ]
  },
  {
    "state": "NC",
    "profiles": [
      {
        "sampleUserId": "museum-life-science-durham",
        "companyName": "Museum of Life and Science",
        "siteAddress": "433 W Murray Avenue, Durham, NC 27704, USA",
        "organizationType": "Nonprofit Organization",
        "buildingType": "Public Institution"
      },
      {
        "sampleUserId": "ocracoke-school-island",
        "companyName": "Ocracoke School",
        "siteAddress": "120 Schoolhouse Road, Ocracoke, NC 27960, USA",
        "organizationType": "Government / Public Agency",
        "buildingType": "School / Education Campus"
      }
    ]
  },
  {
    "state": "NM",
    "profiles": [
      {
        "sampleUserId": "la-montanita-nob-hill-albuquerque",
        "companyName": "La Montanita Co-op - Nob Hill",
        "siteAddress": "3500 Central Avenue SE, Albuquerque, NM 87106, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Grocery / Convenience / Cold Storage"
      }
    ]
  },
  {
    "state": "NY",
    "profiles": [
      {
        "sampleUserId": "via-verde-bronx-renter-household",
        "companyName": "Anonymized renter household at Via Verde",
        "siteAddress": "700 Brook Avenue, Bronx, NY 10455, USA",
        "organizationType": "Residential",
        "buildingType": "Multifamily / Apartment Building"
      }
    ]
  },
  {
    "state": "OH",
    "profiles": [
      {
        "sampleUserId": "whirlpool-clyde-operations",
        "companyName": "Whirlpool Corporation - Clyde Operations",
        "siteAddress": "119 Birdseye Street, Clyde, OH 43410, USA",
        "organizationType": "Industrial Facility",
        "buildingType": "Industrial / Manufacturing"
      }
    ]
  },
  {
    "state": "OK",
    "profiles": [
      {
        "sampleUserId": "okc-national-memorial-museum",
        "companyName": "Oklahoma City National Memorial & Museum",
        "siteAddress": "620 N Harvey Avenue, Oklahoma City, OK 73102, USA",
        "organizationType": "Nonprofit Organization",
        "buildingType": "Public Institution"
      },
      {
        "sampleUserId": "cherokee-ww-hastings-hospital",
        "companyName": "Cherokee Nation W.W. Hastings Hospital and Outpatient Health Center Campus",
        "siteAddress": "100 S Bliss Avenue, Tahlequah, OK 74464, USA",
        "organizationType": "Government / Public Agency",
        "buildingType": "Medical / Healthcare"
      }
    ]
  },
  {
    "state": "PA",
    "profiles": [
      {
        "sampleUserId": "phipps-conservatory-pittsburgh",
        "companyName": "Phipps Conservatory and Botanical Gardens",
        "siteAddress": "1 Schenley Park, Pittsburgh, PA 15213, USA",
        "organizationType": "Nonprofit Organization",
        "buildingType": "Public Institution"
      },
      {
        "sampleUserId": "hersheys-chocolate-world-hershey",
        "companyName": "Hershey's Chocolate World - Hershey",
        "siteAddress": "101 Chocolate World Way, Hershey, PA 17033, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Retail / Storefront"
      }
    ]
  },
  {
    "state": "SC",
    "profiles": [
      {
        "sampleUserId": "bmw-spartanburg-plant",
        "companyName": "BMW Manufacturing Co. - Spartanburg Plant",
        "siteAddress": "1400 Highway 101 S, Greer, SC 29651, USA",
        "organizationType": "Industrial Facility",
        "buildingType": "Industrial / Manufacturing"
      }
    ]
  },
  {
    "state": "TN",
    "profiles": [
      {
        "sampleUserId": "bluebird-cafe-nashville",
        "companyName": "The Bluebird Cafe",
        "siteAddress": "4104 Hillsboro Pike, Nashville, TN 37215, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Restaurant / Commercial Kitchen"
      },
      {
        "sampleUserId": "fedex-world-hub-memphis",
        "companyName": "FedEx Express World Hub",
        "siteAddress": "2903 Sprankel Avenue, Memphis, TN 38118, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Warehouse / Logistics"
      }
    ]
  },
  {
    "state": "TX",
    "profiles": [
      {
        "sampleUserId": "austin-central-library",
        "companyName": "Austin Central Library",
        "siteAddress": "710 W Cesar Chavez Street, Austin, TX 78701, USA",
        "organizationType": "Government / Public Agency",
        "buildingType": "Public Institution"
      }
    ]
  },
  {
    "state": "UT",
    "profiles": [
      {
        "sampleUserId": "salt-lake-public-safety-building",
        "companyName": "Salt Lake City Public Safety Building",
        "siteAddress": "475 S 300 E, Salt Lake City, UT 84111, USA",
        "organizationType": "Government / Public Agency",
        "buildingType": "Public Institution"
      }
    ]
  },
  {
    "state": "VA",
    "profiles": [
      {
        "sampleUserId": "qts-richmond-data-center",
        "companyName": "QTS Richmond Data Center",
        "siteAddress": "6000 Technology Boulevard, Sandston, VA 23150, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Data Center / Server Facility"
      }
    ]
  },
  {
    "state": "VT",
    "profiles": [
      {
        "sampleUserId": "burlington-beer-company",
        "companyName": "Burlington Beer Company",
        "siteAddress": "180 Flynn Avenue, Burlington, VT 05401, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Industrial / Manufacturing"
      }
    ]
  },
  {
    "state": "WA",
    "profiles": [
      {
        "sampleUserId": "hoa-mai-gardens-seattle-household",
        "companyName": "Anonymized household at Hoa Mai Gardens",
        "siteAddress": "221 10th Avenue S, Seattle, WA 98104, USA",
        "organizationType": "Residential",
        "buildingType": "Multifamily / Apartment Building"
      },
      {
        "sampleUserId": "boeing-everett-factory",
        "companyName": "Boeing Everett Factory",
        "siteAddress": "3003 W Casino Road, Everett, WA 98204, USA",
        "organizationType": "Industrial Facility",
        "buildingType": "Industrial / Manufacturing"
      },
      {
        "sampleUserId": "microsoft-columbia-data-center-quincy",
        "companyName": "Microsoft Columbia Data Center",
        "siteAddress": "Quincy, WA 98848, USA",
        "organizationType": "Commercial Business",
        "buildingType": "Data Center / Server Facility"
      }
    ]
  },
  {
    "state": "WI",
    "profiles": [
      {
        "sampleUserId": "uw-madison-main-campus",
        "companyName": "University of Wisconsin-Madison",
        "siteAddress": "500 Lincoln Drive, Madison, WI 53706, USA",
        "organizationType": "Government / Public Agency",
        "buildingType": "School / Education Campus"
      },
      {
        "sampleUserId": "organic-valley-lafarge-hq",
        "companyName": "Organic Valley Headquarters",
        "siteAddress": "One Organic Way, La Farge, WI 54639, USA",
        "organizationType": "Agricultural Operation",
        "buildingType": "Office / Administrative"
      }
    ]
  }
]
```

Return JSON only using this schema:
```json
{
  "schemaVersion": "retrofi_tax_dataset_import_validation_refresh_plan.v1",
  "researchedAt": "2026-07-03",
  "source": "gpt_pro",
  "recommendedDatabaseTables": [],
  "ruleVersioningModel": {},
  "effectiveDateModel": {},
  "sourceConfidenceModel": {},
  "importValidationRules": [],
  "crossSourceConsistencyChecks": [],
  "addressGeographyJoinPlan": [],
  "refreshSchedulesByDatasetFamily": [],
  "failureAndStalenessPolicy": [],
  "adminReviewQueueReasons": [],
  "firstImplementationMilestones": []
}
```
