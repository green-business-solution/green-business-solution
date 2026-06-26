export async function fetchSourceTextWithRetry(
  url,
  {
    attempts = 3,
    baseDelayMs = 30000,
    timeoutMs = 12000,
    userAgent = "RetroFi source review/1.0"
  } = {}
) {
  const maxAttempts = Math.max(1, Number(attempts) || 1);
  const retryDelayMs = Math.max(0, Number(baseDelayMs) || 0);
  const errors = [];

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        headers: {
          "user-agent": userAgent
        },
        signal: controller.signal
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type") || "";
        const body = await response.text();
        return {
          ok: true,
          url,
          contentType,
          attempts: attempt,
          text: stripHtml(body).slice(0, 250000)
        };
      }

      const error = `HTTP ${response.status}`;
      errors.push({ attempt, error });
      if (!isRetryableStatus(response.status) || attempt >= maxAttempts) {
        return { ok: false, url, error, attempts: attempt, errors };
      }

      await wait(retryDelayFor(response, retryDelayMs, attempt));
    } catch (error) {
      const message = error instanceof Error ? error.message : "fetch failed";
      errors.push({ attempt, error: message });
      if (attempt >= maxAttempts) {
        return { ok: false, url, error: message, attempts: attempt, errors };
      }

      await wait(retryDelayMs * attempt);
    } finally {
      clearTimeout(timeout);
    }
  }

  return { ok: false, url, error: "fetch failed", attempts: maxAttempts, errors };
}

function isRetryableStatus(status) {
  return status === 429 || status >= 500;
}

function retryDelayFor(response, baseDelayMs, attempt) {
  const retryAfter = response.headers.get("retry-after");
  const retryAfterSeconds = Number.parseInt(retryAfter || "", 10);
  if (Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0) {
    return retryAfterSeconds * 1000;
  }
  return baseDelayMs * attempt;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function stripHtml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}
