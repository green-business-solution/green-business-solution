# GPT Pro Follow-Up Prompts

## Prompt 1: Rhode Island Municipal Renewable Energy Property Tax Treatment

You are helping RetroFi build official-source tax rule data. Use only official Rhode Island state, municipal, assessor, ordinance, or tax collector sources. If a source is unofficial, label it discovery-only and do not treat it as authoritative.

Research Rhode Island municipality-level renewable energy property/tangible tax treatment under R.I. Gen. Laws §§ 44-5-3, 44-5-12, and 44-3-21, especially municipal ordinances or resolutions that waive, exempt, or modify tangible tax treatment for commercial renewable energy systems, net-metered systems, virtual-net-metered systems, or systems not selling power.

Return JSON with:

- municipality name;
- official source URL;
- ordinance/resolution citation if available;
- effective date;
- whether treatment applies to all commercial renewable systems, only net-metered systems, only systems not selling power, or another category;
- whether the $5/kW AC tangible formula applies, is waived, or is modified;
- whether the $3.50/kW AC real-property treatment is addressed;
- required taxpayer/project documents;
- whether the data is practical to import or requires assessor case review;
- evidence snippet;
- confidence.

Also return a short implementation recommendation for RetroFi's runtime resolver.

## Prompt 2: Michigan Renewable Energy Renaissance Zone Boundaries And Active Status

You are helping RetroFi build official-source tax rule data. Use only official Michigan MEDC, Michigan Treasury, Michigan Legislature, State Administrative Board, county/local-unit, assessor, or official GIS/source documents. If a source is unofficial, label it discovery-only and do not treat it as authoritative.

Research current Michigan Renewable Energy Renaissance Zone records and identify whether an official current statewide machine-readable boundary dataset exists. If no complete official boundary dataset exists, identify the best official case-by-case sources for approved zone legal descriptions, maps, local-unit abatement resolutions, approved company/project names, active/expired/revoked status, phaseout schedules, and approved term.

Return JSON with:

- source family;
- official owner;
- source URL;
- machine-readable status;
- covered zones/projects;
- boundary type: GIS, legal description, parcel list, map/PDF, board packet, annual report, assessor record, other;
- active/expired/revoked/amended status if source-backed;
- phaseout schedule availability;
- local-unit approval evidence availability;
- whether practical to import or case-by-case only;
- evidence snippet;
- confidence.

Also answer: what exact documents should RetroFi require before estimating a Michigan RERZ dollar benefit?
