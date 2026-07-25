import { Readable } from "node:stream";
import { StringDecoder } from "node:string_decoder";

export async function* parseCsvRows(input) {
  const stream = typeof input === "string" ? Readable.from([input]) : input;
  const decoder = new StringDecoder("utf8");
  let row = [];
  let field = "";
  let quoted = false;
  let pendingQuote = false;

  function* consume(text) {
    for (let index = 0; index < text.length; index += 1) {
      const character = text[index];
      if (quoted) {
        if (pendingQuote) {
          if (character === '"') {
            field += '"';
            pendingQuote = false;
            continue;
          }
          quoted = false;
          pendingQuote = false;
        } else if (character === '"') {
          pendingQuote = true;
          continue;
        } else {
          field += character;
          continue;
        }
      }

      if (character === '"') {
        if (field.length !== 0) {
          throw new Error("INVALID_CSV_QUOTE: quote appears after unquoted content");
        }
        quoted = true;
      } else if (character === ",") {
        row.push(field);
        field = "";
      } else if (character === "\n") {
        row.push(field.endsWith("\r") ? field.slice(0, -1) : field);
        yield row;
        row = [];
        field = "";
      } else {
        field += character;
      }
    }
  }

  for await (const chunk of stream) {
    const bytes =
      typeof chunk === "string"
        ? Buffer.from(chunk, "utf8")
        : Buffer.from(chunk);
    yield* consume(decoder.write(bytes));
  }
  yield* consume(decoder.end());

  if (quoted && !pendingQuote) {
    throw new Error("INVALID_CSV_QUOTE: unterminated quoted field");
  }
  if (field.length || row.length) {
    row.push(field);
    yield row;
  }
}

export async function* parseCsvRecords(input, {
  requiredHeaders = [],
  transformHeader = (value) => value
} = {}) {
  let headers;
  for await (const row of parseCsvRows(input)) {
    if (!headers) {
      headers = row.map(transformHeader);
      const duplicates = headers.filter((header, index) => headers.indexOf(header) !== index);
      if (duplicates.length) {
        throw new Error(`DUPLICATE_SOURCE_COLUMN: ${[...new Set(duplicates)].join(", ")}`);
      }
      const missing = requiredHeaders.filter((header) => !headers.includes(header));
      if (missing.length) {
        throw new Error(`MISSING_REQUIRED_COLUMN: ${missing.join(", ")}`);
      }
      continue;
    }
    if (row.length === 1 && row[0] === "") continue;
    if (row.length !== headers.length) {
      throw new Error(
        `CSV_COLUMN_COUNT_MISMATCH: expected ${headers.length}, received ${row.length}`
      );
    }
    yield Object.fromEntries(headers.map((header, index) => [header, row[index]]));
  }
  if (!headers) {
    throw new Error("EMPTY_SOURCE_ARTIFACT: CSV has no header");
  }
}

export function parseNullableNumber(value, field) {
  if (value === undefined || value === null || String(value).trim() === "") return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`INCOMPATIBLE_UNIT_OR_VALUE: ${field} is not numeric`);
  }
  return parsed;
}
