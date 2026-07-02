import { cleanSourceText, normalizeWhitespace, sanitizeSnippet } from "./SourceTextHygiene.mjs";
import { extractOpportunitySummaryLinks } from "./OpportunitySummaryLinks.mjs";
import { extractPdfText } from "./PdfTextExtractor.mjs";

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_RESPONSE_BYTES = 600_000;
const PDF_URL_PATTERN = /\.pdf(?:$|[?#])/i;

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function decodeHtmlEntities(value) {
  return cleanText(value)
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ");
}

function stripHtml(value) {
  return decodeHtmlEntities(
    cleanText(value)
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<\/(?:p|div|li|h[1-6]|tr|section|article|br)>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
  );
}

function isBlockedFetchHostname(hostname) {
  const value = cleanText(hostname).toLowerCase();
  if (!value) return true;
  if (["localhost", "ip6-localhost", "metadata.google.internal"].includes(value)) return true;
  if (value === "::1" || value === "0.0.0.0") return true;
  if (/^127\./.test(value) || /^10\./.test(value) || /^192\.168\./.test(value) || /^169\.254\./.test(value)) return true;
  const private172 = value.match(/^172\.(\d{1,2})\./);
  return Boolean(private172 && Number(private172[1]) >= 16 && Number(private172[1]) <= 31);
}

function assertFetchableUrl(url) {
  const parsed = new URL(url);
  if (!["http:", "https:"].includes(parsed.protocol) || isBlockedFetchHostname(parsed.hostname)) {
    const error = new Error("Source URL host is not allowed for server-side application discovery.");
    error.status = 400;
    throw error;
  }
}

function headersGet(headers, key) {
  if (!headers) return "";
  if (typeof headers.get === "function") return cleanText(headers.get(key));
  return cleanText(headers[key] || headers[key.toLowerCase()]);
}

async function readResponseTextWithLimit(response, maxBytes) {
  if (response.body && typeof response.body.getReader === "function") {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let bytes = 0;
    let text = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value?.byteLength || 0;
      if (bytes > maxBytes) {
        throw new Error(`Source response exceeded ${maxBytes} byte limit.`);
      }
      text += decoder.decode(value, { stream: true });
    }

    text += decoder.decode();
    return text;
  }

  const text = await response.text();
  return text.length > maxBytes ? text.slice(0, maxBytes) : text;
}

async function readResponseBufferWithLimit(response, maxBytes) {
  if (typeof response.arrayBuffer === "function") {
    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength > maxBytes) {
      throw new Error(`Source response exceeded ${maxBytes} byte limit.`);
    }
    return Buffer.from(arrayBuffer);
  }

  if (response.body && typeof response.body.getReader === "function") {
    const reader = response.body.getReader();
    let bytes = 0;
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value?.byteLength || 0;
      if (bytes > maxBytes) {
        throw new Error(`Source response exceeded ${maxBytes} byte limit.`);
      }
      chunks.push(Buffer.from(value));
    }

    return Buffer.concat(chunks);
  }

  const text = await response.text();
  const buffer = Buffer.from(text);
  if (buffer.byteLength > maxBytes) {
    throw new Error(`Source response exceeded ${maxBytes} byte limit.`);
  }
  return buffer;
}

function extractTitle(html) {
  const match = cleanText(html).match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? normalizeWhitespace(stripHtml(match[1])).slice(0, 180) : undefined;
}

function htmlToReadableText(value) {
  return stripHtml(value);
}

function sourceLinksFromHtml(html, baseUrl) {
  return extractOpportunitySummaryLinks({
    summaryHtml: html,
    websiteUrl: baseUrl
  });
}

export async function fetchSourceContent(url, options = {}) {
  const timeoutMs = Math.max(1_000, Number(options.timeoutMs || DEFAULT_TIMEOUT_MS));
  const maxResponseBytes = Math.max(50_000, Number(options.maxResponseBytes || DEFAULT_MAX_RESPONSE_BYTES));
  const fetchFn = options.fetchFn || globalThis.fetch;

  try {
    assertFetchableUrl(url);
    if (typeof fetchFn !== "function") {
      throw new Error("Fetch is not available in this runtime.");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetchFn(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: {
          accept: "text/html,text/plain,application/pdf,application/xhtml+xml,*/*;q=0.2",
          "user-agent": "RetroFi ApplicationPrepEngine/1.0"
        }
      });

      const contentType = headersGet(response?.headers, "content-type");
      const httpStatus = response?.status;
      if (!response?.ok) {
        throw new Error(`Source returned HTTP ${httpStatus || "unknown"}.`);
      }

      const isPdf = /application\/pdf/i.test(contentType) || PDF_URL_PATTERN.test(url);
      if (isPdf) {
        const buffer = await readResponseBufferWithLimit(response, maxResponseBytes);
        const pdfText = await extractPdfText(buffer);
        return {
          url,
          contentType,
          httpStatus,
          title: pdfText.title,
          rawText: pdfText.rawText,
          cleanedText: pdfText.cleanedText,
          links: [],
          isPdf: true,
          pageCount: pdfText.pageCount,
          pdfExtractionStatus: pdfText.extractionStatus,
          extractionStatus: pdfText.extractionStatus,
          error: pdfText.extractionStatus === "pdf_text_unavailable" ? pdfText.error || "PDF fetched but text extraction unavailable." : undefined
        };
      }

      const raw = await readResponseTextWithLimit(response, maxResponseBytes);
      const readable = htmlToReadableText(raw);
      const cleaned = cleanSourceText(readable).text;
      return {
        url,
        contentType,
        httpStatus,
        title: extractTitle(raw),
        rawHtml: raw,
        rawText: readable,
        cleanedText: cleaned,
        links: sourceLinksFromHtml(raw, url),
        isPdf: false
      };
    } catch (error) {
      if (error?.name === "AbortError") {
        throw new Error(`Source fetch timed out after ${timeoutMs} ms.`);
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    const isPdf = PDF_URL_PATTERN.test(cleanText(url));
    return {
      url,
      error: cleanText(error?.message || "Source could not be fetched.").slice(0, 240),
      links: [],
      rawText: "",
      cleanedText: "",
      isPdf,
      pdfExtractionStatus: isPdf ? "pdf_fetch_failed" : undefined,
      extractionStatus: isPdf ? "pdf_fetch_failed" : undefined
    };
  }
}

export function sourceContentSnippet(content, maxLength = 4000) {
  return sanitizeSnippet(content?.cleanedText || content?.rawText || "", maxLength);
}
