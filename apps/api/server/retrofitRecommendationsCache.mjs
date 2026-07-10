import crypto from "node:crypto";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export const persistentRetrofitRecommendationsStateScope = "retrofitRecommendations";
export const persistentRetrofitRecommendationsCacheVersion = "2026-07-09-sustainability-impact-v1";

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
  return [...new Set(cleanStringArray(retrofitTypeIds).map((value) => value.toLowerCase()).filter(Boolean))].sort();
}

export function stableJsonStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableJsonStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJsonStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function retrofitRecommendationsFingerprint(user, intake, cacheVersion = persistentRetrofitRecommendationsCacheVersion) {
  return crypto
    .createHash("sha256")
    .update(stableJsonStringify({
      cacheVersion,
      intake: intake || null,
      user: {
        userId: user?.userId || null,
        updatedAt: user?.updatedAt || null,
        isFakeUser: Boolean(user?.isFakeUser)
      }
    }))
    .digest("hex");
}

export function persistentRetrofitRecommendationsStateKey(user) {
  return {
    stateScope: persistentRetrofitRecommendationsStateScope,
    stateKey: `user:${cleanText(user?.userId) || "unknown"}`
  };
}

export function persistentRetrofitRecommendationsS3Key(user, fingerprint) {
  return `runtime-cache/retrofit-recommendations/${encodeURIComponent(cleanText(user?.userId) || "unknown")}/${fingerprint}.json`;
}

export function filterRetrofitRecommendationsPayload(payload, retrofitTypeIds = []) {
  const requestedRetrofitTypeIds = new Set(normalizeRetrofitTypeIdList(retrofitTypeIds));
  if (!requestedRetrofitTypeIds.size) {
    return payload;
  }
  const retrofits = (payload?.retrofits || []).filter((retrofit) =>
    requestedRetrofitTypeIds.has(cleanText(retrofit.retrofitTypeId).toLowerCase())
  );
  return {
    ...payload,
    isPartialRecommendations: true,
    retrofits,
    summary: {
      matchedRetrofitCount: retrofits.length,
      matchedOpportunityCount: retrofits.reduce((sum, retrofit) => sum + (retrofit.opportunities?.length || 0), 0)
    }
  };
}

export async function readPersistentRetrofitRecommendations({
  bucket,
  cacheVersion = persistentRetrofitRecommendationsCacheVersion,
  db,
  intake,
  logger = console,
  s3,
  table,
  user
}) {
  if (!bucket || !table) {
    return null;
  }
  const fingerprint = retrofitRecommendationsFingerprint(user, intake, cacheVersion);
  try {
    const result = await db.send(
      new GetCommand({
        TableName: table,
        Key: persistentRetrofitRecommendationsStateKey(user)
      })
    );
    const item = result.Item || null;
    if (item?.fingerprint !== fingerprint || !item?.s3Key) {
      return null;
    }
    const response = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: item.s3Key
      })
    );
    const text = await response.Body?.transformToString("utf-8");
    return text ? JSON.parse(text) : null;
  } catch (error) {
    logger?.warn?.(`[retrofit-recommendations-cache] persistent read failed for ${user?.userId || "unknown"}:`, error);
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
  user
}) {
  if (!bucket || !table || !payload || payload.isPartialRecommendations) {
    return null;
  }
  const now = new Date().toISOString();
  const fingerprint = retrofitRecommendationsFingerprint(user, intake, cacheVersion);
  const s3Key = persistentRetrofitRecommendationsS3Key(user, fingerprint);
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: s3Key,
        Body: JSON.stringify(payload),
        ContentType: "application/json",
        ServerSideEncryption: "AES256"
      })
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
          updatedAt: now
        }
      })
    );
    return { fingerprint, s3Key };
  } catch (error) {
    logger?.warn?.(`[retrofit-recommendations-cache] persistent write failed for ${user?.userId || "unknown"}:`, error);
    return null;
  }
}
