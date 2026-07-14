export type ContactFormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type ContactFormErrors = Partial<
  Record<"name" | "email" | "message", string>
>;

const CONTACT_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  contactForm: ContactFormState,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!contactForm.name.trim()) {
    errors.name = "Enter your name.";
  }

  if (!contactForm.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!CONTACT_EMAIL_PATTERN.test(contactForm.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!contactForm.message.trim()) {
    errors.message = "Tell us how we can help.";
  }

  return errors;
}

export function contactMailtoUrl(contactForm: ContactFormState) {
  const name = contactForm.name.trim();
  const email = contactForm.email.trim();
  const company = contactForm.company.trim();
  const message = contactForm.message.trim();
  const subject = company
    ? `RetroFi inquiry from ${company}`
    : `RetroFi inquiry from ${name || "website visitor"}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    "",
    message,
  ].join("\n");

  return `mailto:hello@retrofi.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
