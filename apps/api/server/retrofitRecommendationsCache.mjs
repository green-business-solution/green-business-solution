import crypto from "node:crypto";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { DeleteCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export const persistentRetrofitRecommendationsStateScope =
  "retrofitRecommendations";
export const persistentRetrofitRecommendationsCacheVersion =
  "2026-07-10-integrated-recommendations-v3";
export const persistentRetrofitRecommendationsPayloadSchemaVersion =
  "recommendation-payload-v1";

function hasPaybackFields(value) {
  return (
    value &&
    Object.prototype.hasOwnProperty.call(value, "paybackPeriodYears") &&
    Object.prototype.hasOwnProperty.call(value, "paybackPeriodDetails")
  );
}

export function hasCurrentRetrofitRecommendationsPayloadShape(payload) {
  if (!payload || typeof payload !== "object") {
    return false;
  }
  if (!Array.isArray(payload.retrofits)) {
    return false;
  }

  return payload.retrofits.every((retrofit) => {
    const savingsPreview = retrofit?.savingsPreview || null;
    if (!savingsPreview || savingsPreview.status !== "calculated") return true;
    return hasPaybackFields(savingsPreview);
  });
}

function hasCurrentRetrofitRecommendationsPayloadEnvelope(payload) {
  if (!payload || typeof payload !== "object") return false;
  if (
    payload.schemaVersion !==
    persistentRetrofitRecommendationsPayloadSchemaVersion
  ) {
    return false;
  }
  return hasCurrentRetrofitRecommendationsPayloadShape(payload.payload);
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(cleanText).filter(Boolean);
}

export function normalizeRetrofitTypeIdList(retrofitTypeIds) {
  return [
    ...new Set(
      cleanStringArray(retrofitTypeIds)
        .map((value) => value.toLowerCase())
        .filter(Boolean),
    ),
  ].sort();
}

export function stableJsonStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableJsonStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJsonStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function retrofitRecommendationsFingerprint(
  user,
  intake,
  cacheVersion = persistentRetrofitRecommendationsCacheVersion,
) {
  return crypto
    .createHash("sha256")
    .update(
      stableJsonStringify({
        cacheVersion,
        intake: intake || null,
        user: {
          userId: user?.userId || null,
          updatedAt: user?.updatedAt || null,
          isFakeUser: Boolean(user?.isFakeUser),
        },
      }),
    )
    .digest("hex");
}

export function persistentRetrofitRecommendationsStateKey(user) {
  return {
    stateScope: persistentRetrofitRecommendationsStateScope,
    stateKey: `user:${cleanText(user?.userId) || "unknown"}`,
  };
}

export function persistentRetrofitRecommendationsS3Key(user, fingerprint) {
  return `runtime-cache/retrofit-recommendations/${encodeURIComponent(cleanText(user?.userId) || "unknown")}/${fingerprint}.json`;
}

export function filterRetrofitRecommendationsPayload(
  payload,
  retrofitTypeIds = [],
) {
  const requestedRetrofitTypeIds = new Set(
    normalizeRetrofitTypeIdList(retrofitTypeIds),
  );
  if (!requestedRetrofitTypeIds.size) {
    return payload;
  }
  const retrofits = (payload?.retrofits || []).filter((retrofit) =>
    requestedRetrofitTypeIds.has(
      cleanText(retrofit.retrofitTypeId).toLowerCase(),
    ),
  );
  return {
    ...payload,
    isPartialRecommendations: true,
    retrofits,
    summary: {
      matchedRetrofitCount: retrofits.length,
      matchedOpportunityCount: retrofits.reduce(
        (sum, retrofit) => sum + (retrofit.opportunities?.length || 0),
        0,
      ),
    },
  };
}

async function clearPersistentRetrofitRecommendationsState(
  db,
  table,
  user,
  logger = console,
) {
  try {
    await db.send(
      new DeleteCommand({
        TableName: table,
        Key: persistentRetrofitRecommendationsStateKey(user),
      }),
    );
  } catch (error) {
    logger?.warn?.(
      `[retrofit-recommendations-cache] persistent state clear failed for ${user?.userId || "unknown"}:`,
      error,
    );
  }
}

export async function readPersistentRetrofitRecommendations({
  bucket,
  cacheVersion = persistentRetrofitRecommendationsCacheVersion,
  db,
  intake,
  logger = console,
  s3,
  table,
  user,
}) {
  if (!bucket || !table) {
    return null;
  }
  const fingerprint = retrofitRecommendationsFingerprint(
    user,
    intake,
    cacheVersion,
  );
  try {
    const result = await db.send(
      new GetCommand({
        TableName: table,
        Key: persistentRetrofitRecommendationsStateKey(user),
      }),
    );
    const item = result.Item || null;
    if (item?.fingerprint !== fingerprint || !item?.s3Key) {
      return null;
    }
    const response = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: item.s3Key,
      }),
    );
    const text = await response.Body?.transformToString("utf-8");
    if (!text) return null;
    const envelope = JSON.parse(text);
    if (!hasCurrentRetrofitRecommendationsPayloadEnvelope(envelope)) {
      await clearPersistentRetrofitRecommendationsState(
        db,
        table,
        user,
        logger,
      );
      return null;
    }
    return envelope.payload;
  } catch (error) {
    logger?.warn?.(
      `[retrofit-recommendations-cache] persistent read failed for ${user?.userId || "unknown"}:`,
      error,
    );
    return null;
  }
}

export async function writePersistentRetrofitRecommendations({
  bucket,
  cacheVersion = persistentRetrofitRecommendationsCacheVersion,
  db,
  intake,
  logger = console,
  payload,
  s3,
  table,
  user,
}) {
  if (
    !bucket ||
    !table ||
    !payload ||
    payload.isPartialRecommendations ||
    !hasCurrentRetrofitRecommendationsPayloadShape(payload)
  ) {
    return null;
  }
  const now = new Date().toISOString();
  const fingerprint = retrofitRecommendationsFingerprint(
    user,
    intake,
    cacheVersion,
  );
  const s3Key = persistentRetrofitRecommendationsS3Key(user, fingerprint);
  const isLocalStack = process.env.GBS_LOCAL_STACK === "1";
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: s3Key,
        Body: JSON.stringify({
          schemaVersion: persistentRetrofitRecommendationsPayloadSchemaVersion,
          generatedAt: new Date().toISOString(),
          payload,
        }),
        ContentType: "application/json",
        ...(isLocalStack ? {} : { ServerSideEncryption: "AES256" }),
      }),
    );
    await db.send(
      new PutCommand({
        TableName: table,
        Item: {
          ...persistentRetrofitRecommendationsStateKey(user),
          cacheVersion,
          fingerprint,
          s3Key,
          userId: user?.userId || null,
          generatedAt: payload.generatedAt || now,
          updatedAt: now,
        },
      }),
    );
    return { fingerprint, s3Key };
  } catch (error) {
    logger?.warn?.(
      `[retrofit-recommendations-cache] persistent write failed for ${user?.userId || "unknown"}:`,
      error,
    );
    return null;
  }
}
