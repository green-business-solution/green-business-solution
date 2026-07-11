import { describe, expect, it } from "vitest";
import {
  isPasswordSignupLinkBlocked,
  passwordSignupDuplicateErrorMessage,
} from "./passwordSignupPolicy.mjs";

describe("passwordSignupPolicy", () => {
  it("blocks duplicate signup on admin users missing passwordLinked", () => {
    const blocked = isPasswordSignupLinkBlocked(
      { userId: "admin-user", role: "admin", email: "admin@example.com" },
      { passwordHashAlgorithm: "scrypt", passwordHashKeyLength: 64 },
    );

    expect(blocked).toBe(true);
  });

  it("blocks duplicate signup on admin users with passwordLinked false", () => {
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

  it("blocks duplicate signup on non-admin Google-like users missing password-linked fields", () => {
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

  it("does not block signup when password credentials are present and consistent", () => {
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
