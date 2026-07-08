import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  GetObjectTaggingCommand,
  ListObjectVersionsCommand,
  PutObjectCommand,
  S3Client
} from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";

const defaultPairs = [
  {
    sourceBucket: "gbs-retrofi-test-fixtures-448016109714-us-east-1",
    targetBucket: "gbs-retrofi-test-fixtures-059310317821-us-east-1"
  },
  {
    sourceBucket: "gbs-retrofi-dev-work-448016109714-us-east-1",
    targetBucket: "gbs-retrofi-dev-work-059310317821-us-east-1"
  }
];

const metadataHeaders = [
  "CacheControl",
  "ContentDisposition",
  "ContentEncoding",
  "ContentLanguage",
  "ContentType",
  "Expires",
  "Metadata"
];

function parseArgs(argv) {
  const options = {
    sourceProfile: "gbs",
    targetProfile: "retrofi-prod",
    region: "us-east-1",
    pairs: [],
    write: false,
    resetTarget: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--source-profile" && next) {
      options.sourceProfile = next;
      index += 1;
    } else if (arg === "--target-profile" && next) {
      options.targetProfile = next;
      index += 1;
    } else if (arg === "--region" && next) {
      options.region = next;
      index += 1;
    } else if (arg === "--pair" && next) {
      const [sourceBucket, targetBucket] = next.split("=");
      if (!sourceBucket || !targetBucket) {
        throw new Error("--pair must use source-bucket=target-bucket");
      }
      options.pairs.push({ sourceBucket, targetBucket });
      index += 1;
    } else if (arg === "--write") {
      options.write = true;
    } else if (arg === "--reset-target") {
      options.resetTarget = true;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (options.pairs.length === 0) {
    options.pairs = defaultPairs;
  }

  if (options.resetTarget && !options.write) {
    throw new Error("--reset-target requires --write");
  }

  return options;
}

function usage() {
  console.log(`Usage:
  node scripts/copy-s3-bucket-versions-between-profiles.mjs [options]

Options:
  --source-profile gbs
  --target-profile retrofi-prod
  --region us-east-1
  --pair source-bucket=target-bucket
  --write
  --reset-target

Default dry-run pairs:
  ${defaultPairs.map((pair) => `${pair.sourceBucket}=${pair.targetBucket}`).join("\n  ")}

Dry-run lists version and delete-marker counts only.
Use --write --reset-target for an exact target replay from an empty version history.
`);
}

function s3Client(profile, region) {
  return new S3Client({
    region,
    credentials: profile ? fromIni({ profile }) : undefined,
    requestStreamBufferSize: 65_536
  });
}

async function listVersions(client, bucket) {
  const versions = [];
  const deleteMarkers = [];
  let KeyMarker;
  let VersionIdMarker;

  do {
    const response = await client.send(
      new ListObjectVersionsCommand({
        Bucket: bucket,
        KeyMarker,
        VersionIdMarker
      })
    );

    versions.push(...(response.Versions || []));
    deleteMarkers.push(...(response.DeleteMarkers || []));
    KeyMarker = response.NextKeyMarker;
    VersionIdMarker = response.NextVersionIdMarker;
  } while (KeyMarker || VersionIdMarker);

  return { versions, deleteMarkers };
}

function summarizeHistory(history) {
  const currentVersions = history.versions.filter((version) => version.IsLatest);
  const currentDeleteMarkers = history.deleteMarkers.filter((marker) => marker.IsLatest);

  return {
    versions: history.versions.length,
    versionBytes: history.versions.reduce((sum, version) => sum + Number(version.Size || 0), 0),
    deleteMarkers: history.deleteMarkers.length,
    currentObjects: currentVersions.length,
    currentBytes: currentVersions.reduce((sum, version) => sum + Number(version.Size || 0), 0),
    currentDeleteMarkers: currentDeleteMarkers.length
  };
}

function historyEvents(history) {
  const versionEvents = history.versions.map((version, index) => ({
    kind: "object",
    originalIndex: index,
    key: version.Key,
    versionId: version.VersionId,
    lastModified: new Date(version.LastModified || 0).getTime()
  }));

  const deleteMarkerEvents = history.deleteMarkers.map((marker, index) => ({
    kind: "delete-marker",
    originalIndex: index,
    key: marker.Key,
    versionId: marker.VersionId,
    lastModified: new Date(marker.LastModified || 0).getTime()
  }));

  return [...versionEvents, ...deleteMarkerEvents].sort((left, right) => {
    if (left.key !== right.key) return left.key < right.key ? -1 : 1;
    if (left.lastModified !== right.lastModified) return left.lastModified - right.lastModified;
    return right.originalIndex - left.originalIndex;
  });
}

async function deleteTargetHistory(targetClient, targetBucket, history) {
  const objects = [
    ...history.versions.map((version) => ({ Key: version.Key, VersionId: version.VersionId })),
    ...history.deleteMarkers.map((marker) => ({ Key: marker.Key, VersionId: marker.VersionId }))
  ];

  for (let index = 0; index < objects.length; index += 1000) {
    const batch = objects.slice(index, index + 1000);
    if (batch.length === 0) continue;
    await targetClient.send(
      new DeleteObjectsCommand({
        Bucket: targetBucket,
        Delete: {
          Objects: batch,
          Quiet: true
        }
      })
    );
  }
}

function copyableHeaders(sourceObject) {
  return Object.fromEntries(
    metadataHeaders
      .filter((header) => sourceObject[header] !== undefined)
      .map((header) => [header, sourceObject[header]])
  );
}

function tagHeader(tagSet) {
  if (!tagSet || tagSet.length === 0) return undefined;
  return tagSet.map((tag) => `${encodeURIComponent(tag.Key)}=${encodeURIComponent(tag.Value || "")}`).join("&");
}

async function getObjectTags(sourceClient, sourceBucket, event) {
  const response = await sourceClient.send(
    new GetObjectTaggingCommand({
      Bucket: sourceBucket,
      Key: event.key,
      VersionId: event.versionId
    })
  );
  return response.TagSet || [];
}

async function replayEvent({ sourceClient, targetClient, sourceBucket, targetBucket, event }) {
  if (event.kind === "delete-marker") {
    await targetClient.send(
      new DeleteObjectCommand({
        Bucket: targetBucket,
        Key: event.key
      })
    );
    return;
  }

  const sourceObject = await sourceClient.send(
    new GetObjectCommand({
      Bucket: sourceBucket,
      Key: event.key,
      VersionId: event.versionId
    })
  );
  const tags = await getObjectTags(sourceClient, sourceBucket, event);

  await targetClient.send(
    new PutObjectCommand({
      Bucket: targetBucket,
      Key: event.key,
      Body: sourceObject.Body,
      ContentLength: sourceObject.ContentLength,
      ServerSideEncryption: "AES256",
      Tagging: tagHeader(tags),
      ...copyableHeaders(sourceObject)
    })
  );
}

function printSummary(label, summary) {
  console.log(
    `${label}: ${summary.versions} versions / ${summary.versionBytes} bytes, ` +
      `${summary.deleteMarkers} delete markers, ` +
      `${summary.currentObjects} current objects / ${summary.currentBytes} bytes, ` +
      `${summary.currentDeleteMarkers} current delete markers`
  );
}

function assertReplayMatches(sourceSummary, targetSummary) {
  const fields = ["versions", "versionBytes", "deleteMarkers", "currentObjects", "currentBytes", "currentDeleteMarkers"];
  const mismatches = fields.filter((field) => sourceSummary[field] !== targetSummary[field]);
  if (mismatches.length > 0) {
    const details = mismatches
      .map((field) => `${field}: source=${sourceSummary[field]} target=${targetSummary[field]}`)
      .join(", ");
    throw new Error(`Target replay mismatch: ${details}`);
  }
}

async function copyPair(options, pair) {
  const sourceClient = s3Client(options.sourceProfile, options.region);
  const targetClient = s3Client(options.targetProfile, options.region);

  console.log(`\n${pair.sourceBucket} -> ${pair.targetBucket}`);

  const sourceHistory = await listVersions(sourceClient, pair.sourceBucket);
  const sourceSummary = summarizeHistory(sourceHistory);
  printSummary("source", sourceSummary);

  let targetHistory = await listVersions(targetClient, pair.targetBucket);
  printSummary("target before", summarizeHistory(targetHistory));

  if (!options.write) {
    console.log("dry-run only; add --write to copy");
    return;
  }

  if (options.resetTarget) {
    console.log("resetting target version history");
    await deleteTargetHistory(targetClient, pair.targetBucket, targetHistory);
    targetHistory = await listVersions(targetClient, pair.targetBucket);
    printSummary("target after reset", summarizeHistory(targetHistory));
  }

  const events = historyEvents(sourceHistory);
  console.log(`replaying ${events.length} source history events`);

  for (let index = 0; index < events.length; index += 1) {
    await replayEvent({
      sourceClient,
      targetClient,
      sourceBucket: pair.sourceBucket,
      targetBucket: pair.targetBucket,
      event: events[index]
    });

    const completed = index + 1;
    if (completed % 50 === 0 || completed === events.length) {
      console.log(`  replayed ${completed}/${events.length}`);
    }
  }

  const targetAfter = await listVersions(targetClient, pair.targetBucket);
  const targetSummary = summarizeHistory(targetAfter);
  printSummary("target after", targetSummary);
  assertReplayMatches(sourceSummary, targetSummary);
  console.log("verified replay summary matches source");
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    usage();
    return;
  }

  for (const pair of options.pairs) {
    await copyPair(options, pair);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
