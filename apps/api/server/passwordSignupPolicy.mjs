export const PASSWORD_CLAIM_GUARD_FIELD = "passwordClaimProtected";
export const PASSWORD_CLAIM_GUARD_RUN_ID_FIELD = "passwordClaimProtectionRunId";
export const PASSWORD_CLAIM_GUARD_AT_FIELD = "passwordClaimProtectionAt";
export const PASSWORD_CLAIM_GUARD_REASON_FIELD = "passwordClaimProtectionReason";
export const PASSWORD_CLAIM_GUARD_REASON = "password_link_state_missing_or_incomplete";
export const passwordSignupDuplicateErrorMessage =
  "An account already exists for that email. Log in instead.";

export function isPasswordSignupDuplicateBlocked(existing) {
  return Boolean(existing && existing.userId);
}

function hasPasswordCredentialState(user) {
  return (
    user?.passwordLinked === true &&
    user?.passwordHash !== undefined &&
    user?.passwordSalt !== undefined &&
    typeof user?.passwordAlgorithm === "string" &&
    user?.passwordAlgorithm.length > 0 &&
    user?.passwordHashKeyLength !== undefined
  );
}

export function isPasswordSignupLinkBlocked(user, { passwordHashAlgorithm, passwordHashKeyLength } = {}) {
  if (!user || !user.userId) {
    return true;
  }

  if (user?.[PASSWORD_CLAIM_GUARD_FIELD] === true) {
    return true;
  }

  if (user.passwordLinked !== true) {
    return true;
  }

  if (!hasPasswordCredentialState(user)) {
    return true;
  }

  if (
    typeof passwordHashAlgorithm === "string" &&
    user.passwordAlgorithm !== passwordHashAlgorithm
  ) {
    return true;
  }

  if (
    typeof passwordHashKeyLength === "number" &&
    user.passwordHashKeyLength !== passwordHashKeyLength
  ) {
    return true;
  }

  return false;
}

export function requiresPasswordClaimProtection(user, policy = {}) {
  return isPasswordSignupLinkBlocked(user, policy);
}
