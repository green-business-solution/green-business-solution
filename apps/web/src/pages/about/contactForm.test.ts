import { describe, expect, it } from "vitest";
import { contactMailtoUrl, validateContactForm } from "./contactForm";

describe("contact form helpers", () => {
  it("reports required and malformed fields with actionable messages", () => {
    expect(
      validateContactForm({
        name: " ",
        email: "not-an-email",
        company: "",
        message: "",
      }),
    ).toEqual({
      name: "Enter your name.",
      email: "Enter a valid email address.",
      message: "Tell us how we can help.",
    });
  });

  it("builds the existing email handoff without losing entered details", () => {
    const mailtoUrl = contactMailtoUrl({
      name: "Avery Green",
      email: "avery@example.com",
      company: "North Star Buildings",
      message: "I have a question about utility data.",
    });

    expect(mailtoUrl).toContain("mailto:hello@retrofi.org");
    expect(decodeURIComponent(mailtoUrl)).toContain(
      "RetroFi inquiry from North Star Buildings",
    );
    expect(decodeURIComponent(mailtoUrl)).toContain(
      "I have a question about utility data.",
    );
  });
});
