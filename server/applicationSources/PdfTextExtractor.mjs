import { cleanSourceText, normalizeWhitespace } from "./SourceTextHygiene.mjs";

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function bufferLooksLikePdf(buffer) {
  if (!buffer || buffer.length < 4) return false;
  return buffer.slice(0, 5).toString("latin1") === "%PDF-";
}

function safeStringFromNonPdfBuffer(buffer) {
  const text = Buffer.isBuffer(buffer) ? buffer.toString("utf8") : "";
  if (!text || /%PDF-\d/i.test(text.slice(0, 40))) return "";
  return text;
}

function decodePdfLiteral(value) {
  return cleanText(value)
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\\\/g, "\\")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\\t/g, " ");
}

function extractSimplePdfText(buffer) {
  const latin = Buffer.isBuffer(buffer) ? buffer.toString("latin1") : "";
  const chunks = [];
  for (const match of latin.matchAll(/\((?:\\.|[^\\)]){2,}\)\s*T[jJ]/g)) {
    const literal = match[0].replace(/\)\s*T[jJ]\s*$/i, "").replace(/^\(/, "");
    const decoded = decodePdfLiteral(literal);
    if (/[A-Za-z]{3,}/.test(decoded)) chunks.push(decoded);
  }
  return chunks.join("\n");
}

export async function extractPdfText(buffer, options = {}) {
  const sourceBuffer = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer || "");
  const fallbackText = safeStringFromNonPdfBuffer(sourceBuffer);

  if (!bufferLooksLikePdf(sourceBuffer)) {
    const cleaned = cleanSourceText(fallbackText).text;
    return {
      rawText: fallbackText,
      cleanedText: cleaned,
      pageCount: undefined,
      title: undefined,
      extractionStatus: cleaned ? "pdf_text_extracted" : "pdf_text_unavailable",
      error: cleaned ? undefined : "PDF response did not contain readable PDF or text content."
    };
  }

  try {
    const imported = await import("pdf-parse");
    const pdfParse = imported.default || imported;
    const parsed = await pdfParse(sourceBuffer, options.pdfParseOptions || {});
    const rawText = cleanText(parsed?.text || "");
    const cleanedText = cleanSourceText(rawText).text;
    return {
      rawText,
      cleanedText,
      pageCount: parsed?.numpages,
      title: cleanText(parsed?.info?.Title || parsed?.metadata?.get?.("dc:title") || ""),
      extractionStatus: cleanedText ? "pdf_text_extracted" : "pdf_text_unavailable",
      error: cleanedText ? undefined : "PDF fetched, but no readable text was extracted."
    };
  } catch (error) {
    const fallbackText = extractSimplePdfText(sourceBuffer);
    const fallbackCleaned = cleanSourceText(fallbackText).text;
    if (fallbackCleaned) {
      return {
        rawText: fallbackText,
        cleanedText: fallbackCleaned,
        pageCount: undefined,
        title: undefined,
        extractionStatus: "pdf_text_extracted",
        error: undefined
      };
    }
    return {
      rawText: "",
      cleanedText: "",
      pageCount: undefined,
      title: undefined,
      extractionStatus: "pdf_text_unavailable",
      error: cleanText(error?.message || "PDF fetched but text extraction unavailable.").slice(0, 240)
    };
  }
}

export function pdfTextSnippet(content, maxLength = 4000) {
  const text = normalizeWhitespace(content?.cleanedText || content?.rawText || "");
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
}
