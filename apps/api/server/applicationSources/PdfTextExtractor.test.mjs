import { describe, expect, it } from "vitest";
import { extractPdfText } from "./PdfTextExtractor.mjs";

function pdfEscape(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function makeSimplePdfBuffer(text) {
  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n"
  ];
  const stream = `BT /F1 12 Tf 72 720 Td (${pdfEscape(text)}) Tj ET`;
  objects.push(`5 0 obj\n<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream\nendobj\n`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += object;
  }
  const xrefOffset = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(pdf, "latin1");
}

describe("PdfTextExtractor", () => {
  it("extracts text from a simple PDF text layer", async () => {
    const result = await extractPdfText(makeSimplePdfBuffer("Applicants must provide phone and recent utility bill."));

    expect(result.extractionStatus).toBe("pdf_text_extracted");
    expect(result.cleanedText).toMatch(/Applicants must provide phone/i);
    expect(result.cleanedText).not.toMatch(/%PDF|endstream|xref/);
  });

  it("does not expose raw PDF binary when extraction fails", async () => {
    const result = await extractPdfText(Buffer.from("%PDF-1.4\nnot a valid readable pdf", "latin1"));

    expect(result.extractionStatus).toBe("pdf_text_unavailable");
    expect(result.cleanedText).toBe("");
    expect(result.rawText).toBe("");
  });
});
