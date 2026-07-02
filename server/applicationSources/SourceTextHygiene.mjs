const TEMPLATE_PLACEHOLDER_PATTERN = /\{\{[\s\S]*?\}\}/;
const TEMPLATE_PLACEHOLDER_REPLACE_PATTERN = /\{\{[\s\S]*?\}\}/g;
const BOILERPLATE_PATTERNS = [
  /\bget free,?\s+expert advice\b/i,
  /\bno phone calls required\b/i,
  /\bcookie(s)?\b.{0,80}\b(accept|settings|preferences|privacy)\b/i,
  /\b(accept|manage)\s+cookie(s)?\b/i,
  /\bskip to (main )?content\b/i,
  /^\s*(home|about|contact|privacy policy|terms of use|login|sign in|search|menu)\s*$/i,
  /^\s*(facebook|twitter|linkedin|youtube|instagram)\s*$/i
];

export function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeWhitespace(value) {
  return cleanText(value).replace(/\s+/g, " ");
}

export function containsTemplatePlaceholder(value) {
  return TEMPLATE_PLACEHOLDER_PATTERN.test(cleanText(value));
}

export function isBoilerplateSourceText(value) {
  const text = normalizeWhitespace(value);
  if (!text) return true;
  if (TEMPLATE_PLACEHOLDER_PATTERN.test(text)) return true;
  return BOILERPLATE_PATTERNS.some((pattern) => pattern.test(text));
}

function shouldDropLabelOnlyLine(text) {
  return /^(expiration date|deadline|application deadline|program expiration date)\s*:\s*$/i.test(text);
}

export function cleanSourceText(value) {
  const source = cleanText(value).replace(TEMPLATE_PLACEHOLDER_REPLACE_PATTERN, " ");
  const lines = source
    .split(/\n+/)
    .map((line) => normalizeWhitespace(line))
    .filter(Boolean);
  const lineCounts = new Map();
  for (const line of lines) {
    lineCounts.set(line, (lineCounts.get(line) || 0) + 1);
  }

  let removedLineCount = 0;
  const cleanedLines = [];
  for (const line of lines) {
    if (isBoilerplateSourceText(line) || shouldDropLabelOnlyLine(line) || (lineCounts.get(line) || 0) > 3) {
      removedLineCount += 1;
      continue;
    }
    cleanedLines.push(line);
  }

  return {
    text: cleanedLines.join("\n"),
    removedLineCount
  };
}

export function sanitizeSnippet(value, maxLength = 280) {
  const cleaned = cleanSourceText(value).text || cleanText(value).replace(TEMPLATE_PLACEHOLDER_REPLACE_PATTERN, " ");
  const text = normalizeWhitespace(cleaned);
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
}
