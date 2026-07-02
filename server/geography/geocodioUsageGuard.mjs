import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

export const GEOCODIO_DAILY_USAGE_LIMIT_DEFAULT = 2500;
export const GEOCODIO_USAGE_SCHEMA_VERSION = "geocodio-usage-v1";

export async function reserveGeocodioLookup({
  db,
  tableName,
  now = new Date(),
  limit = GEOCODIO_DAILY_USAGE_LIMIT_DEFAULT,
  alertEmailTo,
  alertEmailFrom,
  sesClient,
  appUrl = "https://retrofi.org",
  logger = console
} = {}) {
  const dailyLimit = normalizeLimit(limit);
  const resolvedAt = isoString(now);
  const usageDate = utcDateKey(now);

  if (!db || !tableName) {
    return blockedQuotaResult({
      reason: "quota_guard_not_configured",
      usageDate,
      usageCount: null,
      limit: dailyLimit,
      notes: ["Geocodio quota guard is not configured, so the paid fallback was skipped."]
    });
  }

  if (dailyLimit <= 0) {
    return blockedQuotaResult({
      reason: "quota_limit_disabled",
      usageDate,
      usageCount: 0,
      limit: dailyLimit,
      notes: ["Geocodio quota limit is zero, so the paid fallback was skipped."]
    });
  }

  const key = geocodioUsageKey(usageDate);
  try {
    const result = await db.send(
      new UpdateCommand({
        TableName: tableName,
        Key: key,
        ConditionExpression: "attribute_not_exists(usageCount) OR usageCount < :limit",
        UpdateExpression:
          "SET schemaVersion = :schemaVersion, provider = :provider, usageDate = :usageDate, usageLimit = :limit, updatedAt = :now, usageCount = if_not_exists(usageCount, :zero) + :one ADD reservationCount :one",
        ExpressionAttributeValues: {
          ":schemaVersion": GEOCODIO_USAGE_SCHEMA_VERSION,
          ":provider": "geocodio",
          ":usageDate": usageDate,
          ":limit": dailyLimit,
          ":now": resolvedAt,
          ":zero": 0,
          ":one": 1
        },
        ReturnValues: "ALL_NEW"
      })
    );

    const usageCount = Number(result.Attributes?.usageCount || 0);
    const alert = usageCount >= dailyLimit
      ? await notifyGeocodioQuotaReached({
          db,
          tableName,
          key,
          usageDate,
          usageCount,
          limit: dailyLimit,
          alertEmailTo,
          alertEmailFrom,
          sesClient,
          appUrl,
          now: resolvedAt,
          logger
        })
      : { attempted: false, sent: false };

    return {
      allowed: true,
      reason: "reserved",
      usageDate,
      usageCount,
      limit: dailyLimit,
      alert,
      notes: [`Reserved Geocodio fallback lookup ${usageCount} of ${dailyLimit} for ${usageDate}.`]
    };
  } catch (error) {
    if (isConditionalCheckFailed(error)) {
      return blockedQuotaResult({
        reason: "quota_exhausted",
        usageDate,
        usageCount: dailyLimit,
        limit: dailyLimit,
        notes: [`Geocodio daily fallback quota of ${dailyLimit} was already exhausted for ${usageDate}.`]
      });
    }

    logger?.error?.("Geocodio quota guard failed; skipping Geocodio fallback to avoid accidental charges.", error);
    return blockedQuotaResult({
      reason: "quota_check_failed",
      usageDate,
      usageCount: null,
      limit: dailyLimit,
      notes: ["Geocodio quota check failed, so the paid fallback was skipped."]
    });
  }
}

export function utcDateKey(now = new Date()) {
  return isoString(now).slice(0, 10);
}

export function geocodioUsageKey(usageDate = utcDateKey()) {
  return {
    stateScope: "geocodio",
    stateKey: `usage:${usageDate}`
  };
}

async function notifyGeocodioQuotaReached({
  db,
  tableName,
  key,
  usageDate,
  usageCount,
  limit,
  alertEmailTo,
  alertEmailFrom,
  sesClient,
  appUrl,
  now,
  logger
}) {
  if (!alertEmailTo || !alertEmailFrom) {
    return { attempted: false, sent: false, reason: "email_not_configured" };
  }

  try {
    await db.send(
      new UpdateCommand({
        TableName: tableName,
        Key: key,
        ConditionExpression: "attribute_not_exists(quotaAlertSentAt)",
        UpdateExpression:
          "SET quotaAlertSentAt = :now, quotaAlertRecipient = :to, quotaAlertFrom = :from, quotaAlertUsageCount = :usageCount",
        ExpressionAttributeValues: {
          ":now": now,
          ":to": alertEmailTo,
          ":from": alertEmailFrom,
          ":usageCount": usageCount
        }
      })
    );
  } catch (error) {
    if (isConditionalCheckFailed(error)) {
      return { attempted: false, sent: false, reason: "already_sent" };
    }
    logger?.error?.("Failed to mark Geocodio quota alert as sent.", error);
    return { attempted: false, sent: false, reason: "alert_marker_failed" };
  }

  try {
    const client = sesClient || new SESv2Client({});
    await client.send(
      new SendEmailCommand({
        FromEmailAddress: alertEmailFrom,
        Destination: {
          ToAddresses: [alertEmailTo]
        },
        Content: {
          Simple: {
            Subject: {
              Data: `RetroFi Geocodio quota reached for ${usageDate}`
            },
            Body: {
              Text: {
                Data: [
                  `RetroFi used ${usageCount} of ${limit} Geocodio fallback lookups for ${usageDate}.`,
                  "",
                  "The API will skip Geocodio fallback for the rest of this UTC day to avoid accidental paid usage.",
                  `Health endpoint: ${appUrl}/api/health`
                ].join("\n")
              }
            }
          }
        }
      })
    );
    return { attempted: true, sent: true };
  } catch (error) {
    logger?.error?.("Failed to send Geocodio quota alert email.", error);
    return { attempted: true, sent: false, reason: "send_failed" };
  }
}

function blockedQuotaResult({ reason, usageDate, usageCount, limit, notes }) {
  return {
    allowed: false,
    reason,
    usageDate,
    usageCount,
    limit,
    alert: { attempted: false, sent: false },
    notes
  };
}

function normalizeLimit(limit) {
  const parsed = Number(limit);
  return Number.isFinite(parsed) ? Math.max(0, Math.floor(parsed)) : GEOCODIO_DAILY_USAGE_LIMIT_DEFAULT;
}

function isoString(now) {
  if (now instanceof Date) return now.toISOString();
  const date = new Date(now);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function isConditionalCheckFailed(error) {
  return error?.name === "ConditionalCheckFailedException" || error?.__type?.includes("ConditionalCheckFailed");
}
