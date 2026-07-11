import { describe, expect, it } from "vitest";
import {
  isPasswordSignupDuplicateBlocked,
  isPasswordSignupLinkBlocked,
  passwordSignupDuplicateErrorMessage,
} from "./passwordSignupPolicy.mjs";

describe("passwordSignupPolicy", () => {
  it("blocks duplicate signup for any existing account", () => {
    const blocked = isPasswordSignupDuplicateBlocked({
      userId: "user-1",
      role: "client",
      email: "user@example.com",
    });

    expect(blocked).toBe(true);
  });

  it("does not block signup when no existing account exists", () => {
    expect(isPasswordSignupDuplicateBlocked(null)).toBe(false);
  });

  it("flags admin users with missing passwordLinked as needing claim protection", () => {
    const blocked = isPasswordSignupLinkBlocked(
      { userId: "admin-user", role: "admin", email: "admin@example.com" },
      { passwordHashAlgorithm: "scrypt", passwordHashKeyLength: 64 },
    );

    expect(blocked).toBe(true);
  });

  it("flags admin users with passwordLinked false as needing claim protection", () => {
    const blocked = isPasswordSignupLinkBlocked(
      {
        userId: "admin-user-2",
        role: "admin",
        passwordLinked: false,
        email: "admin2@example.com",
      },
      { passwordHashAlgorithm: "scrypt", passwordHashKeyLength: 64 },
    );

    expect(blocked).toBe(true);
  });

  it("flags non-admin Google-like users with missing password-linked fields as needing claim protection", () => {
    const blocked = isPasswordSignupLinkBlocked(
      {
        userId: "user-1",
        role: "client",
        googleLinked: true,
        email: "client@example.com",
      },
      { passwordHashAlgorithm: "scrypt", passwordHashKeyLength: 64 },
    );

    expect(blocked).toBe(true);
  });

  it("does not flag active accounts with complete password state as needing claim protection", () => {
    const blocked = isPasswordSignupLinkBlocked(
      {
        userId: "user-2",
        role: "client",
        passwordLinked: true,
        passwordHash: "hash",
        passwordSalt: "salt",
        passwordAlgorithm: "scrypt",
        passwordHashKeyLength: 64,
      },
      { passwordHashAlgorithm: "scrypt", passwordHashKeyLength: 64 },
    );

    expect(blocked).toBe(false);
  });

  it("returns the generic duplicate signup message", () => {
    expect(passwordSignupDuplicateErrorMessage).toMatch(/already exists for that email/i);
  });
});
