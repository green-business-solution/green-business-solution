# Shared deterministic adapter architecture

## Boundary

This research interface is not connected to the production calculation engine.
It defines a common contract for future source-family adapters.

```ts
interface OperationalSavingsSourceAdapter<Raw, Normalized, Query, ModelInput> {
  discoverRelease(): Promise<DiscoveredRelease>;
  acquire(release: DiscoveredRelease): Promise<RawArtifact[]>;
  verifyChecksum(artifacts: RawArtifact[]): Promise<VerifiedArtifact[]>;
  inspectSchema(artifacts: VerifiedArtifact[]): Promise<SchemaFingerprint>;
  validateRaw(artifacts: VerifiedArtifact[]): Promise<ValidationReport>;
  normalize(artifacts: VerifiedArtifact[]): Promise<NormalizedSnapshot<Normalized>>;
  publishSnapshot(snapshot: NormalizedSnapshot<Normalized>): Promise<PublishedRelease>;
  resolveExact(query: Query, release: PublishedRelease): ResolutionResult;
  resolveRequirements(query: Query, release: PublishedRelease): ResolutionResult;
  resolveBenchmark(query: Query, release: PublishedRelease): ResolutionResult;
  executeModel(input: ModelInput, model: PublishedModel): ResolutionResult;
  mapToFormulaInputs(result: ResolutionResult): FormulaInputSet;
  returnProvenance(result: ResolutionResult): SelectedValueProvenance;
  detectSchemaDrift(previous: SchemaFingerprint, next: SchemaFingerprint): DriftReport;
  rollbackRelease(release: PublishedRelease, reason: string): Promise<void>;
}
```

## Typed result contract

```ts
type ResolutionResult =
  | ScalarResult
  | ProductRecordResult
  | ProfileResult
  | InputSetResult
  | ModelResultSet
  | UnavailableResult;

interface ResultEnvelope<T> {
  kind: "scalar" | "product_record" | "profile" | "input_set" | "model_result_set" | "unavailable";
  value: T | null;
  unit: string | null;
  scope: string;
  inputOwnership: "SOURCE" | "PROJECT_OR_PROFILE";
  source: string | null;
  sourceVersion: string | null;
  sourceArtifact: string | null;
  inputSha256: string;
  filters: Record<string, unknown>;
  eligiblePopulation: unknown[];
  sampleSize: number;
  selectionRule: string;
  fallbackLevel: string;
  uncertainty: string;
  warnings: TypedWarning[];
  provenance: SelectedValueProvenance;
}
```

Every result contains the selected value or structure, unit, scope, ownership, exact input hash, filters, eligible population, sample size, selection rule, fallback level, uncertainty, warnings, and provenance.
A source-backed result also contains its source, release, and artifact identities.
A project-owned result leaves those source fields null and proves the exact input through its content hash and immutable input calculation run.
Unavailable is a successful typed result when the source cannot lawfully or technically supply a required value.

## Estimate-time flow

```text
Normalized Profile
+ normalized Bills
+ selected Linked Opportunities
+ extracted Project Documents
-> determine required Standards and exact process bindings
-> load published internal source releases
-> resolve exact inputs
-> apply only implemented source-specific fallback levels
-> execute pinned local models
-> map typed outputs to approved formula terms
-> run the local category calculation
-> store one annual result, assumptions, warnings, and provenance
-> label screening or detailed
```

Later exact inputs supersede benchmark selections by creating a new calculation run.
Historical runs remain immutable.
Category-overlap guards compare retrofit identity, physical resource boundary, time interval, and upstream savings component before summing results.

## Identity and publication contract

Source IDs, release IDs, artifact IDs, model-version IDs, input hashes, and calculation IDs identify immutable content.
Adapters may reuse an existing row only after every identity-bearing field matches.
They fail closed on conflicting content instead of rewriting a retained release, artifact, assumption, calculation, selected value, or dependency.
`calculation_source_dependencies` requires an upstream calculation run or a source artifact for every dependency.
This permits content-addressed project inputs without falsely attributing them to an external source.

The offline proof publisher creates the database, compact export, and receipt as one generation.
It verifies byte sizes and SHA-256 values before publishing, then installs the receipt last.
The prior generation remains usable if publication fails before that final commit marker.

## Error policy

Checksum mismatch, schema drift, unit mismatch, ambiguity, inactive status, incompatible test procedure, impossible physical input, model nonconvergence, and missing required ownership inputs are typed errors.
Adapters never convert these conditions to zero.
A prior published release remains available when refresh fails.
Human review remains required for tariff eligibility, ambiguous product identities, project-document engineering interpretation, category overlap, source licensing, and any new benchmark population.
