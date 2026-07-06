function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function publicUser(user) {
  if (!user) return null;

  return {
    userId: user.userId,
    role: user.role,
    status: user.status,
    fullName: user.fullName,
    email: user.email,
    companyName: user.companyName || null,
    authProvider: user.authProvider,
    googleLinked: Boolean(user.googleLinked),
    googlePicture: user.googlePicture || null,
    passwordLinked: Boolean(user.passwordLinked),
    isFakeUser: typeof user.isFakeUser === "boolean" ? user.isFakeUser : user.role !== "admin",
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt || null
  };
}

export function hasFixtureRetrofitRecommendations(testCase) {
  return Array.isArray(testCase?.retrofits) && testCase.retrofits.length > 0;
}

export function buildFixtureRetrofitRecommendationsPayload({ intake, now = new Date(), testCase, user }) {
  if (!hasFixtureRetrofitRecommendations(testCase)) {
    return null;
  }

  const retrofits = testCase.retrofits;
  const taxRuntimePreview = testCase.taxRuntimePreview || null;
  return {
    user: publicUser(user),
    intake,
    generatedAt: now.toISOString(),
    source: {
      kind: "generated_test_fixture",
      sampleUserId: cleanText(testCase.sampleUserId) || null
    },
    summary: {
      matchedRetrofitCount: retrofits.length,
      matchedOpportunityCount: retrofits.reduce((sum, retrofit) => {
        if (Array.isArray(retrofit?.opportunities)) return sum + retrofit.opportunities.length;
        return sum + (Number.isFinite(retrofit?.opportunityCount) ? retrofit.opportunityCount : 0);
      }, 0),
      canShowOpportunities: taxRuntimePreview ? !taxRuntimePreview.opportunityDisplayBlocked : true,
      taxIntakeRequiredBeforeOpportunityDisplay: taxRuntimePreview ? taxRuntimePreview.opportunityDisplayBlocked === true : false,
      requiredTaxInputCount: taxRuntimePreview?.requiredPreOpportunityInputs?.length || 0,
      calculatedTaxBenefitCents: taxRuntimePreview?.totals?.includedBenefitCents || 0,
      calculatedTaxLiabilityCents: taxRuntimePreview?.totals?.includedLiabilityCents || 0,
      netTaxImpactCents: taxRuntimePreview?.totals?.includedAmountCents || 0
    },
    taxRuntimePreview,
    retrofits
  };
}
