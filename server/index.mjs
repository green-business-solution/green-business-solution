import crypto from "node:crypto";
import express from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  TransactWriteCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const defaultGoogleClientId = "754037986401-dgklhhhtjr2k8u9jcj47fdf1jrf9baep.apps.googleusercontent.com";
const isLambdaRuntime = Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.AWS_EXECUTION_ENV);
const region = process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const profile = process.env.AWS_PROFILE ?? (isLambdaRuntime ? "" : "gbs");
const usersTable = process.env.GBS_USERS_TABLE || "gbs-users";
const intakeTable = process.env.GBS_INTAKE_TABLE || "gbs-client-intake";
const opportunitiesTable = process.env.GBS_OPPORTUNITIES_TABLE || "gbs-opportunity-candidates";
const dsireSourceKey = "SOURCE_DSIRE";
const port = Number(process.env.API_PORT || 8787);
const googleClientId = process.env.GOOGLE_CLIENT_ID || defaultGoogleClientId;
const googleAllowedClientIds = [
  googleClientId,
  ...(process.env.GOOGLE_ALLOWED_CLIENT_IDS || "").split(",").map((value) => value.trim())
].filter(Boolean);
const googleCertsUrl = "https://www.googleapis.com/oauth2/v3/certs";
const defaultAdminEmails = ["neerkuchlous@gmail.com", "pmrajvansh@gmail.com"];
const adminEmails = new Set(
  (process.env.GBS_ADMIN_EMAILS || defaultAdminEmails.join(","))
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
);

const client = new DynamoDBClient({
  region,
  credentials: profile ? fromIni({ profile }) : undefined
});
const db = DynamoDBDocumentClient.from(client);
export const app = express();
let activeServer = null;

app.use(express.json({ limit: "128kb" }));

const requiredFields = [
  ["fullName", "Contact name"],
  ["email", "Email"],
  ["siteAddress", "Site address"],
  ["electricUtilityProvider", "Electric utility provider"],
  ["companyName", "Company name"],
  ["organizationType", "Organization type"],
  ["ownershipStatus", "Ownership status"],
  ["buildingType", "Building type"],
  ["squareFootage", "Square footage"]
];
const opportunityReviewStatuses = new Set(["approved", "rejected", "needs_review", "duplicate"]);
const passwordHashAlgorithm = "scrypt";
const passwordHashKeyLength = 64;
const passwordSessionDurationMs = 7 * 24 * 60 * 60 * 1000;
const maxEvidenceTextLength = 1200;

let googleKeysCache = {
  expiresAt: 0,
  keys: []
};

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanOptional(value) {
  const text = cleanText(value);
  return text.length > 0 ? text : null;
}

function cleanStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(cleanText).filter(Boolean);
}

function cleanEmail(value) {
  return cleanText(value).toLowerCase();
}

function cleanUsername(value) {
  return cleanText(value).toLowerCase();
}

function isValidEmail(value) {
  const email = cleanEmail(value);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAdminEmail(email) {
  return adminEmails.has(cleanEmail(email));
}

function adminNameForEmail(email) {
  const normalized = cleanEmail(email);
  if (normalized === "neerkuchlous@gmail.com") return "Neer Kuchlous";
  if (normalized === "pmrajvansh@gmail.com") return "Rajvansh Gupta";
  return "";
}

function createAccountUserId(email) {
  const digest = crypto.createHash("sha256").update(cleanEmail(email)).digest("hex").slice(0, 32);
  return `account_${digest}`;
}

function createPasswordError(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function validatePasswordAuthInput(input, { requireEmail = false } = {}) {
  const username = cleanUsername(input?.username);
  const password = typeof input?.password === "string" ? input.password : "";

  if (!username) {
    throw createPasswordError(requireEmail ? "Email is required." : "Username is required.");
  }

  if (username.length < 3 || username.length > 96 || !/^[a-z0-9._@+-]+$/.test(username)) {
    throw createPasswordError("Username must be 3-96 characters and can use letters, numbers, dots, dashes, underscores, plus signs, and @.");
  }

  if (requireEmail && !isValidEmail(username)) {
    throw createPasswordError("Enter a valid email address.");
  }

  if (password.length < 8 || password.length > 128) {
    throw createPasswordError("Password must be 8-128 characters.");
  }

  return { username, password };
}

function derivePasswordKey(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, passwordHashKeyLength, (error, key) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(key);
    });
  });
}

async function createPasswordFields(password) {
  const passwordSalt = crypto.randomBytes(16).toString("base64url");
  const derivedKey = await derivePasswordKey(password, passwordSalt);

  return {
    passwordAlgorithm: passwordHashAlgorithm,
    passwordHashKeyLength,
    passwordHash: derivedKey.toString("base64url"),
    passwordSalt,
    passwordLinked: true
  };
}

async function verifyPassword(password, user) {
  if (
    !user?.passwordLinked ||
    user.passwordAlgorithm !== passwordHashAlgorithm ||
    !user.passwordHash ||
    !user.passwordSalt
  ) {
    return false;
  }

  const expected = Buffer.from(String(user.passwordHash), "base64url");
  const candidate = await derivePasswordKey(password, String(user.passwordSalt));

  return expected.length === candidate.length && crypto.timingSafeEqual(expected, candidate);
}

function createPasswordSessionToken() {
  return crypto.randomBytes(32).toString("base64url");
}

function hashPasswordSessionToken(token) {
  return crypto.createHash("sha256").update(token).digest("base64url");
}

function authProviderForPasswordUser(user) {
  return user?.googleLinked ? "google,password" : "password";
}

function displayNameForUsername(username) {
  return adminNameForEmail(username) || username.split("@")[0] || username;
}

function compactText(value, maxLength) {
  const text = cleanText(value);
  if (!text || text.length <= maxLength) {
    return text || null;
  }
  return `${text.slice(0, maxLength)}...`;
}

function decodeJwtJson(segment) {
  try {
    return JSON.parse(Buffer.from(segment, "base64url").toString("utf8"));
  } catch {
    const error = new Error("Google returned an invalid identity token.");
    error.status = 401;
    throw error;
  }
}

function parseCacheMaxAge(cacheControl) {
  const match = /max-age=(\d+)/i.exec(cacheControl || "");
  return match ? Number(match[1]) * 1000 : 60 * 60 * 1000;
}

async function getGoogleKeys(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && googleKeysCache.keys.length > 0 && googleKeysCache.expiresAt > now) {
    return googleKeysCache.keys;
  }

  const response = await fetch(googleCertsUrl);
  if (!response.ok) {
    const error = new Error("Could not load Google sign-in certificates.");
    error.status = 503;
    throw error;
  }

  const body = await response.json();
  googleKeysCache = {
    expiresAt: now + parseCacheMaxAge(response.headers.get("cache-control")),
    keys: Array.isArray(body.keys) ? body.keys : []
  };

  return googleKeysCache.keys;
}

async function verifyGoogleCredential(credential) {
  const token = cleanText(credential);
  const parts = token.split(".");
  if (parts.length !== 3) {
    const error = new Error("Google sign-in did not return a valid identity token.");
    error.status = 401;
    throw error;
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const header = decodeJwtJson(encodedHeader);
  const payload = decodeJwtJson(encodedPayload);

  if (header.alg !== "RS256" || !header.kid) {
    const error = new Error("Google returned an unsupported identity token.");
    error.status = 401;
    throw error;
  }

  let keys = await getGoogleKeys();
  let jwk = keys.find((key) => key.kid === header.kid);
  if (!jwk) {
    keys = await getGoogleKeys(true);
    jwk = keys.find((key) => key.kid === header.kid);
  }

  if (!jwk) {
    const error = new Error("Could not match the Google identity token signing key.");
    error.status = 401;
    throw error;
  }

  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.update(`${encodedHeader}.${encodedPayload}`);
  verifier.end();

  const isValidSignature = verifier.verify(
    crypto.createPublicKey({ key: jwk, format: "jwk" }),
    Buffer.from(encodedSignature, "base64url")
  );

  if (!isValidSignature) {
    const error = new Error("Google identity token signature was invalid.");
    error.status = 401;
    throw error;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const audience = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  const hasAllowedAudience = audience.some((aud) => googleAllowedClientIds.includes(aud));

  if (!hasAllowedAudience) {
    const error = new Error("Google sign-in is not configured for this OAuth client.");
    error.status = 401;
    throw error;
  }

  if (!["accounts.google.com", "https://accounts.google.com"].includes(payload.iss)) {
    const error = new Error("Google identity token issuer was invalid.");
    error.status = 401;
    throw error;
  }

  if (!payload.exp || Number(payload.exp) < nowSeconds) {
    const error = new Error("Google sign-in expired. Try signing in again.");
    error.status = 401;
    throw error;
  }

  const hasVerifiedEmail = payload.email_verified === true || payload.email_verified === "true";
  if (!payload.sub || !payload.email || !hasVerifiedEmail) {
    const error = new Error("Google did not return a verified email address.");
    error.status = 401;
    throw error;
  }

  return {
    sub: String(payload.sub),
    email: cleanEmail(payload.email),
    name: cleanText(payload.name),
    picture: cleanText(payload.picture)
  };
}

function validateIntake(input) {
  const errors = [];

  for (const [field, label] of requiredFields) {
    if (!cleanText(input[field])) {
      errors.push(`${label} is required.`);
    }
  }

  const email = cleanText(input.email);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Email must be a valid email address.");
  }

  if (cleanStringArray(input.interestedImprovements).length === 0) {
    errors.push("Select at least one interested improvement.");
  }

  return errors;
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
    passwordLinked: Boolean(user.passwordLinked),
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt || null
  };
}

function createIntakeRecord(userId, input, now) {
  return {
    userId,
    submissionId: `intake_${userId}`,
    contact: {
      fullName: cleanText(input.fullName),
      email: cleanText(input.email).toLowerCase(),
      phone: cleanOptional(input.phone),
      roleTitle: cleanOptional(input.roleTitle),
      contactPreference: cleanOptional(input.contactPreference)
    },
    business: {
      companyName: cleanText(input.companyName),
      website: cleanOptional(input.website),
      industry: cleanText(input.industry),
      organizationType: cleanText(input.organizationType),
      organizationSize: cleanText(input.organizationSize),
      headquarters: cleanText(input.headquarters)
    },
    site: {
      address: cleanText(input.siteAddress),
      electricUtilityProvider: cleanText(input.electricUtilityProvider),
      ownershipStatus: cleanText(input.ownershipStatus),
      buildingType: cleanText(input.buildingType),
      squareFootage: cleanText(input.squareFootage),
      derivedFieldsPlanned: ["State", "County", "City", "ZIP", "Utility territory"]
    },
    sustainability: {
      goals: cleanText(input.sustainabilityGoals),
      currentChallenges: cleanText(input.currentChallenges),
      interestedImprovements: cleanStringArray(input.interestedImprovements),
      monthlyUtilitySpend: cleanOptional(input.monthlyUtilitySpend),
      timeline: cleanText(input.timeline),
      notes: cleanOptional(input.notes)
    },
    createdAt: now,
    updatedAt: now
  };
}

async function getIntake(userId) {
  const result = await db.send(
    new GetCommand({
      TableName: intakeTable,
      Key: { userId }
    })
  );
  return result.Item || null;
}

async function scanAll(TableName) {
  const items = [];
  let ExclusiveStartKey;

  do {
    const result = await db.send(new ScanCommand({ TableName, ExclusiveStartKey }));
    items.push(...(result.Items || []));
    ExclusiveStartKey = result.LastEvaluatedKey;
  } while (ExclusiveStartKey);

  return items;
}

function isActiveUserRecord(user) {
  return user?.status === "active" && ["client", "admin"].includes(user.role);
}

function emailIdentitiesForUser(user) {
  return [user?.email, user?.googleEmail, user?.passwordUsername]
    .map(cleanEmail)
    .filter((email) => email && isValidEmail(email));
}

function activeUsersByEmail(users, email) {
  const normalized = cleanEmail(email);
  if (!isValidEmail(normalized)) {
    return [];
  }

  return users.filter((user) => isActiveUserRecord(user) && emailIdentitiesForUser(user).includes(normalized));
}

function createDuplicateEmailError(email) {
  const error = new Error(`An account already exists for ${cleanEmail(email)}. Log in with that email instead.`);
  error.status = 409;
  return error;
}

function createMultipleAccountsError(email) {
  const error = new Error(
    `More than one active account uses ${cleanEmail(email)}. Ask an admin to merge the duplicate records before signing in.`
  );
  error.status = 409;
  return error;
}

function requireSingleEmailAccount(users, email, { allowUserId = null } = {}) {
  const matches = activeUsersByEmail(users, email).filter((user) => user.userId !== allowUserId);

  if (allowUserId && matches.length > 0) {
    throw createMultipleAccountsError(email);
  }

  if (matches.length > 1) {
    throw createMultipleAccountsError(email);
  }

  return matches[0] || null;
}

async function findUserByGoogleIdentity(googleUser) {
  const users = await scanAll(usersTable);
  const activeUsers = users.filter(isActiveUserRecord);
  const subjectMatches = activeUsers.filter((user) => cleanText(user.googleSubject) === googleUser.sub);

  if (subjectMatches.length > 1) {
    throw createMultipleAccountsError(googleUser.email);
  }

  const subjectMatch = subjectMatches[0] || null;

  if (subjectMatch) {
    requireSingleEmailAccount(activeUsers, googleUser.email, { allowUserId: subjectMatch.userId });
    return subjectMatch;
  }

  return requireSingleEmailAccount(activeUsers, googleUser.email);
}

async function findUserByPasswordUsername(username) {
  const normalized = cleanUsername(username);
  const users = await scanAll(usersTable);
  const activeUsers = users.filter(isActiveUserRecord);

  if (isValidEmail(normalized)) {
    return requireSingleEmailAccount(activeUsers, normalized);
  }

  const matches = activeUsers.filter((user) => cleanUsername(user.passwordUsername) === normalized);
  if (matches.length > 1) {
    const error = new Error(`More than one active account uses ${normalized}. Ask an admin to merge the duplicate records before signing in.`);
    error.status = 409;
    throw error;
  }

  return matches[0] || null;
}

async function findUserByPasswordSession(sessionToken) {
  const cleanToken = cleanText(sessionToken);
  if (!cleanToken) {
    throw createPasswordError("Sign in again to continue.", 401);
  }

  const sessionHash = hashPasswordSessionToken(cleanToken);
  const users = await scanAll(usersTable);
  const user = users.find(
    (record) => record.status === "active" && cleanText(record.passwordSessionHash) === sessionHash
  );

  if (!user) {
    throw createPasswordError("Sign in again to continue.", 401);
  }

  const expiresAt = Date.parse(user.passwordSessionExpiresAt || "");
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    throw createPasswordError("Your session expired. Sign in again.", 401);
  }

  return user;
}

async function issuePasswordSession(user) {
  const sessionToken = createPasswordSessionToken();
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + passwordSessionDurationMs).toISOString();
  const result = await db.send(
    new UpdateCommand({
      TableName: usersTable,
      Key: { userId: user.userId },
      UpdateExpression:
        "SET passwordSessionHash = :sessionHash, passwordSessionCreatedAt = :now, passwordSessionExpiresAt = :expiresAt, lastLoginAt = :now, updatedAt = :now",
      ExpressionAttributeValues: {
        ":sessionHash": hashPasswordSessionToken(sessionToken),
        ":now": now,
        ":expiresAt": expiresAt
      },
      ReturnValues: "ALL_NEW"
    })
  );

  return {
    sessionToken,
    user: result.Attributes || {
      ...user,
      passwordSessionHash: hashPasswordSessionToken(sessionToken),
      passwordSessionCreatedAt: now,
      passwordSessionExpiresAt: expiresAt,
      lastLoginAt: now,
      updatedAt: now
    }
  };
}

async function createPasswordAccount(input) {
  const { username, password } = validatePasswordAuthInput(input, { requireEmail: true });
  const existing = await findUserByPasswordUsername(username);

  if (existing?.passwordLinked) {
    throw createPasswordError("An account already exists for that email. Log in instead.", 409);
  }

  const passwordFields = await createPasswordFields(password);
  const now = new Date().toISOString();

  if (existing) {
    const role = isAdminEmail(existing.email) || isAdminEmail(username) ? "admin" : existing.role || "client";
    const result = await db.send(
      new UpdateCommand({
        TableName: usersTable,
        Key: { userId: existing.userId },
        UpdateExpression:
          "SET #role = :role, authProvider = :authProvider, passwordLinked = :passwordLinked, passwordUsername = :passwordUsername, passwordHash = :passwordHash, passwordSalt = :passwordSalt, passwordAlgorithm = :passwordAlgorithm, passwordHashKeyLength = :passwordHashKeyLength, passwordLinkedAt = :now, updatedAt = :now",
        ExpressionAttributeNames: {
          "#role": "role"
        },
        ExpressionAttributeValues: {
          ":role": role,
          ":authProvider": authProviderForPasswordUser(existing),
          ":passwordLinked": true,
          ":passwordUsername": username,
          ":passwordHash": passwordFields.passwordHash,
          ":passwordSalt": passwordFields.passwordSalt,
          ":passwordAlgorithm": passwordFields.passwordAlgorithm,
          ":passwordHashKeyLength": passwordFields.passwordHashKeyLength,
          ":now": now
        },
        ReturnValues: "ALL_NEW"
      })
    );

    return issuePasswordSession(result.Attributes || { ...existing, ...passwordFields, role });
  }

  const role = isAdminEmail(username) ? "admin" : "client";
  const user = {
    userId: createAccountUserId(username),
    role,
    status: "active",
    fullName: displayNameForUsername(username),
    email: username,
    companyName: null,
    authProvider: "password",
    googleLinked: false,
    passwordUsername: username,
    passwordLinkedAt: now,
    ...passwordFields,
    createdAt: now,
    updatedAt: now
  };

  try {
    await db.send(
      new PutCommand({
        TableName: usersTable,
        Item: user,
        ConditionExpression: "attribute_not_exists(userId)"
      })
    );

    return issuePasswordSession(user);
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      throw createDuplicateEmailError(username);
    }
    throw error;
  }
}

async function loginPasswordAccount(input) {
  const { username, password } = validatePasswordAuthInput(input);
  const user = await findUserByPasswordUsername(username);
  const isValid = user ? await verifyPassword(password, user) : false;

  if (!isValid) {
    throw createPasswordError("Invalid username or password.", 401);
  }

  return issuePasswordSession(user);
}

async function createAdminUserFromGoogle(googleUser) {
  const now = new Date().toISOString();
  const user = {
    userId: createAccountUserId(googleUser.email),
    role: "admin",
    status: "active",
    fullName: googleUser.name || adminNameForEmail(googleUser.email) || googleUser.email,
    email: googleUser.email,
    companyName: null,
    authProvider: "google",
    googleLinked: true,
    googleSubject: googleUser.sub,
    googleEmail: googleUser.email,
    googleName: googleUser.name,
    googlePicture: googleUser.picture,
    linkedAt: now,
    createdAt: now,
    updatedAt: now,
    lastLoginAt: now
  };

  await db.send(
    new PutCommand({
      TableName: usersTable,
      Item: user,
      ConditionExpression: "attribute_not_exists(userId)"
    })
  );

  return user;
}

async function linkGoogleUser(user, googleUser) {
  if (user.googleSubject && user.googleSubject !== googleUser.sub) {
    const error = new Error("This app account is already linked to another Google account.");
    error.status = 409;
    throw error;
  }

  const now = new Date().toISOString();
  const role = isAdminEmail(googleUser.email) ? "admin" : "client";
  const authProvider = user.passwordLinked ? "google,password" : "google";
  const result = await db.send(
    new UpdateCommand({
      TableName: usersTable,
      Key: { userId: user.userId },
      UpdateExpression:
        "SET #role = :role, authProvider = :authProvider, googleLinked = :googleLinked, googleSubject = :googleSubject, googleEmail = :googleEmail, googleName = :googleName, googlePicture = :googlePicture, linkedAt = if_not_exists(linkedAt, :now), lastLoginAt = :now, updatedAt = :now",
      ExpressionAttributeNames: {
        "#role": "role"
      },
      ExpressionAttributeValues: {
        ":role": role,
        ":authProvider": authProvider,
        ":googleLinked": true,
        ":googleSubject": googleUser.sub,
        ":googleEmail": googleUser.email,
        ":googleName": googleUser.name,
        ":googlePicture": googleUser.picture,
        ":now": now
      },
      ReturnValues: "ALL_NEW"
    })
  );

  return result.Attributes || {
    ...user,
    role,
    authProvider,
    googleLinked: true,
    googleSubject: googleUser.sub,
    googleEmail: googleUser.email,
    googleName: googleUser.name,
    googlePicture: googleUser.picture,
    linkedAt: user.linkedAt || now,
    lastLoginAt: now,
    updatedAt: now
  };
}

async function requireGoogleUser(credential) {
  const googleUser = await verifyGoogleCredential(credential);
  const user = await findUserByGoogleIdentity(googleUser);

  if (!user) {
    if (isAdminEmail(googleUser.email)) {
      return createAdminUserFromGoogle(googleUser);
    }

    const error = new Error(
      "No Green Business Solution profile was found for that Google account. Complete the intake form first, then sign in with the same Google email."
    );
    error.status = 404;
    throw error;
  }

  return linkGoogleUser(user, googleUser);
}

async function requireAdminUser(credential) {
  const user = await requireGoogleUser(credential);
  if (user.role !== "admin") {
    const error = new Error("This Google account does not have admin access.");
    error.status = 403;
    throw error;
  }
  return user;
}

async function requirePasswordSessionUser(sessionToken) {
  return findUserByPasswordSession(sessionToken);
}

async function requireAdminFromAuth({ credential, passwordSessionToken }) {
  const user = cleanText(passwordSessionToken)
    ? await requirePasswordSessionUser(passwordSessionToken)
    : await requireAdminUser(credential);

  if (user.role !== "admin") {
    const error = new Error("This account does not have admin access.");
    error.status = 403;
    throw error;
  }

  return user;
}

async function updateOpportunityReview({ opportunityId, status, notes, duplicateOf, credential, passwordSessionToken }) {
  const admin = await requireAdminFromAuth({ credential, passwordSessionToken });
  const cleanOpportunityId = cleanText(opportunityId);
  const cleanStatus = cleanText(status);
  const cleanNotes = cleanOptional(notes);
  const cleanDuplicateOf = cleanStatus === "duplicate" ? cleanOptional(duplicateOf) : null;

  if (!cleanOpportunityId) {
    const error = new Error("Opportunity ID is required.");
    error.status = 400;
    throw error;
  }

  if (!opportunityReviewStatuses.has(cleanStatus)) {
    const error = new Error("Review status must be approved, rejected, needs_review, or duplicate.");
    error.status = 400;
    throw error;
  }

  if (cleanNotes && cleanNotes.length > 4000) {
    const error = new Error("Review notes must be 4000 characters or fewer.");
    error.status = 400;
    throw error;
  }

  if (cleanStatus === "duplicate" && !cleanDuplicateOf) {
    const error = new Error("Duplicate records must include the opportunity ID they duplicate.");
    error.status = 400;
    throw error;
  }

  const existing = await db.send(
    new GetCommand({
      TableName: opportunitiesTable,
      Key: { opportunityId: cleanOpportunityId }
    })
  );

  if (!existing.Item) {
    const error = new Error("Opportunity record was not found.");
    error.status = 404;
    throw error;
  }

  if (!isDsireOpportunityRecord(existing.Item)) {
    const error = new Error("Only DSIRE opportunity records are active for review.");
    error.status = 400;
    throw error;
  }

  const now = new Date().toISOString();
  const result = await db.send(
    new UpdateCommand({
      TableName: opportunitiesTable,
      Key: { opportunityId: cleanOpportunityId },
      ConditionExpression: "attribute_exists(opportunityId)",
      UpdateExpression:
        "SET reviewStatus = :reviewStatus, reviewNotes = :reviewNotes, duplicateOf = :duplicateOf, reviewedAt = :reviewedAt, reviewedBy = :reviewedBy, updatedAt = :updatedAt",
      ExpressionAttributeValues: {
        ":reviewStatus": cleanStatus,
        ":reviewNotes": cleanNotes,
        ":duplicateOf": cleanDuplicateOf,
        ":reviewedAt": now,
        ":reviewedBy": {
          userId: admin.userId,
          email: admin.email,
          fullName: admin.fullName
        },
        ":updatedAt": now
      },
      ReturnValues: "ALL_NEW"
    })
  );

  return result.Attributes;
}

function isDsireOpportunityRecord(record) {
  return record?.sourceKey === dsireSourceKey;
}

function compactEvidence(evidence) {
  if (!Array.isArray(evidence)) {
    return [];
  }

  return evidence.map((item) => ({
    sourceName: item?.sourceName,
    sourceUrl: item?.sourceUrl,
    documentType: item?.documentType,
    sectionHeading: item?.sectionHeading,
    sectionCategory: item?.sectionCategory,
    retrievedAt: item?.retrievedAt,
    rawContentHash: item?.rawContentHash,
    parentDocumentHash: item?.parentDocumentHash,
    extractedText: compactText(item?.extractedText, maxEvidenceTextLength)
  }));
}

function compactDetailLabels(details) {
  if (!Array.isArray(details)) {
    return [];
  }

  return details.map((detail) => detail?.label).filter(Boolean).slice(0, 20);
}

function buildDsireSourceRecords(record, evidence) {
  return [
    {
      sourceKey: record.sourceKey,
      sourceName: record.sourceName,
      sourceUrl: record.sourceUrl,
      externalId: record.externalId,
      externalIdType: record.externalIdType,
      ingestionMode: record.ingestionMode,
      ingestRunId: record.ingestRunId,
      evidence
    }
  ];
}

function compactOpportunityRecord(record) {
  const evidence = compactEvidence(record.evidence);

  return {
    opportunityId: record.opportunityId,
    IUID: record.opportunityId,
    canonicalTitle: record.canonicalTitle,
    normalizedTitle: record.normalizedTitle,
    sourceKey: record.sourceKey,
    sourceName: record.sourceName,
    sourceUrl: record.sourceUrl,
    sourceRecords: buildDsireSourceRecords(record, evidence),
    externalId: record.externalId,
    externalIdType: record.externalIdType,
    ingestionMode: record.ingestionMode,
    ingestRunId: record.ingestRunId,
    origin: record.origin,
    status: record.status,
    reviewStatus: record.reviewStatus,
    reviewNotes: record.reviewNotes || null,
    duplicateOf: record.duplicateOf || null,
    reviewedAt: record.reviewedAt,
    reviewedBy: record.reviewedBy,
    category: record.category,
    categoryId: record.categoryId,
    programType: record.programType,
    programTypeId: record.programTypeId,
    summary: compactText(record.summary, 1600),
    state: record.state,
    stateName: record.stateName,
    geography: record.geography,
    administrator: record.administrator,
    websiteUrl: record.websiteUrl || null,
    technologies: record.technologies,
    sectors: record.sectors,
    lastUpdated: record.lastUpdated,
    sourceCreatedAt: record.sourceCreatedAt,
    startDate: record.startDate,
    endDate: record.endDate,
    fundingSource: record.fundingSource,
    budget: record.budget,
    detailLabels: compactDetailLabels(record.details),
    dsire: record.dsire,
    evidence,
    dataQuality: record.dataQuality,
    contentHash: record.contentHash,
    previousContentHash: record.previousContentHash,
    firstSeenAt: record.firstSeenAt,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    lastSeenAt: record.lastSeenAt
  };
}

async function buildPasswordAuthPayload(sessionResult) {
  return {
    ...(await buildAuthPayload(sessionResult.user)),
    sessionToken: sessionResult.sessionToken
  };
}

async function buildAuthPayload(user) {
  if (user.role === "admin") {
    return {
      dashboard: "admin",
      user: publicUser(user),
      intake: null,
      adminDashboard: await buildAdminPayload(user)
    };
  }

  return {
    dashboard: "client",
    user: publicUser(user),
    intake: await getIntake(user.userId),
    adminDashboard: null
  };
}

async function buildAdminPayload(admin) {
  const [users, intakes, opportunities] = await Promise.all([
    scanAll(usersTable),
    scanAll(intakeTable),
    scanAll(opportunitiesTable)
  ]);
  const intakeByUser = new Map(intakes.map((intake) => [intake.userId, intake]));
  const sortedUsers = users
    .filter(isActiveUserRecord)
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  const sortedIntakes = [...intakes].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  const sortedOpportunities = opportunities.filter(isDsireOpportunityRecord).sort((a, b) =>
    String(b.lastSeenAt || b.updatedAt || b.publishedAt || "").localeCompare(
      String(a.lastSeenAt || a.updatedAt || a.publishedAt || "")
    )
  );

  return {
    admin: publicUser(admin),
    users: sortedUsers.map((user) => ({
      user: publicUser(user),
      intake: intakeByUser.get(user.userId) || null
    })),
    dataTables: [
      {
        name: usersTable,
        recordCount: sortedUsers.length,
        records: sortedUsers.map(publicUser)
      },
      {
        name: intakeTable,
        recordCount: sortedIntakes.length,
        records: sortedIntakes
      },
      {
        name: opportunitiesTable,
        recordCount: sortedOpportunities.length,
        records: sortedOpportunities.map(compactOpportunityRecord)
      }
    ]
  };
}

async function createClientUser(input) {
  const errors = validateIntake(input);
  if (errors.length > 0) {
    const error = new Error(errors.join(" "));
    error.status = 400;
    throw error;
  }

  const email = cleanEmail(input.email);
  const users = await scanAll(usersTable);
  const existing = requireSingleEmailAccount(users, email);
  const now = new Date().toISOString();

  if (existing) {
    if (existing.role !== "client") {
      throw createDuplicateEmailError(email);
    }

    const existingIntake = await getIntake(existing.userId);
    if (existingIntake) {
      throw createDuplicateEmailError(email);
    }

    const intake = createIntakeRecord(existing.userId, input, now);
    const user = {
      ...existing,
      fullName: intake.contact.fullName || intake.business.companyName,
      email,
      companyName: intake.business.companyName,
      updatedAt: now
    };

    try {
      await db.send(
        new TransactWriteCommand({
          TransactItems: [
            {
              Update: {
                TableName: usersTable,
                Key: { userId: existing.userId },
                ConditionExpression: "attribute_exists(userId) AND #status = :active AND #role = :client",
                UpdateExpression:
                  "SET fullName = :fullName, email = :email, companyName = :companyName, updatedAt = :now",
                ExpressionAttributeNames: {
                  "#role": "role",
                  "#status": "status"
                },
                ExpressionAttributeValues: {
                  ":active": "active",
                  ":client": "client",
                  ":fullName": user.fullName,
                  ":email": email,
                  ":companyName": user.companyName,
                  ":now": now
                }
              }
            },
            {
              Put: {
                TableName: intakeTable,
                Item: intake,
                ConditionExpression: "attribute_not_exists(userId)"
              }
            }
          ]
        })
      );

      return { user, intake };
    } catch (error) {
      if (error.name === "TransactionCanceledException") {
        throw createDuplicateEmailError(email);
      }
      throw error;
    }
  }

  const userId = createAccountUserId(email);
  const intake = createIntakeRecord(userId, input, now);
  const user = {
    userId,
    role: "client",
    status: "active",
    fullName: intake.contact.fullName || intake.business.companyName,
    email,
    companyName: intake.business.companyName,
    authProvider: "google",
    googleLinked: false,
    createdAt: now,
    updatedAt: now
  };

  try {
    await db.send(
      new TransactWriteCommand({
        TransactItems: [
          {
            Put: {
              TableName: usersTable,
              Item: user,
              ConditionExpression: "attribute_not_exists(userId)"
            }
          },
          {
            Put: {
              TableName: intakeTable,
              Item: intake,
              ConditionExpression: "attribute_not_exists(userId)"
            }
          }
        ]
      })
    );

    return { user, intake };
  } catch (error) {
    if (error.name === "TransactionCanceledException") {
      throw createDuplicateEmailError(email);
    }
    throw error;
  }
}

function classifyError(error) {
  const rawMessage = error?.message || "Request failed.";
  const name = error?.name || "";
  const searchable = `${name} ${rawMessage}`;

  if (
    /CredentialsProviderError|TokenProviderError|UnauthorizedException|ExpiredToken|SSO|credential/i.test(searchable)
  ) {
    return {
      status: 503,
      message:
        isLambdaRuntime
          ? "The production API could not access AWS. Check the Lambda execution role and deployment configuration."
          : "AWS credentials are not ready for the local API. Run `aws sso login --profile gbs`, then restart `npm run dev`."
    };
  }

  if (/AccessDenied|not authorized|is not authorized/i.test(searchable)) {
    return {
      status: 403,
      message:
        "The active AWS profile does not have access to the Green Business Solution DynamoDB tables. Confirm the `gbs` profile uses account 448016109714 with AdministratorAccess."
    };
  }

  if (/Could not connect|ENOTFOUND|EAI_AGAIN|ECONNREFUSED|fetch failed|network/i.test(searchable)) {
    return {
      status: 503,
      message:
        isLambdaRuntime
          ? "The production API could not reach its AWS data store. Try again in a minute."
          : "The local API could not reach AWS DynamoDB. Check internet access, then run `aws sts get-caller-identity --profile gbs`."
    };
  }

  return {
    status: error.status || 500,
    message: rawMessage
  };
}

function handleError(res, error) {
  const classified = classifyError(error);
  const status = classified.status;
  if (status >= 500) {
    console.error(error);
  }
  res.status(status).json({ error: classified.message });
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    region,
    usersTable,
    intakeTable,
    opportunitiesTable,
    googleClientConfigured: Boolean(googleClientId)
  });
});

app.get("/api/diagnostics", async (_req, res) => {
  try {
    const users = await scanAll(usersTable);
    const adminsPresent = Object.fromEntries(
      [...adminEmails].map((email) => [
        email,
        users.some((user) => user.status === "active" && cleanEmail(user.email) === email && user.role === "admin")
      ])
    );

    res.json({
      ok: true,
      region,
      profile,
      usersTable,
      intakeTable,
      opportunitiesTable,
      googleClientConfigured: Boolean(googleClientId),
      adminEmails: [...adminEmails],
      adminsPresent
    });
  } catch (error) {
    handleError(res, error);
  }
});

app.post("/api/intake", async (req, res) => {
  try {
    const result = await createClientUser(req.body || {});
    res.status(201).json({
      user: publicUser(result.user),
      intake: result.intake
    });
  } catch (error) {
    handleError(res, error);
  }
});

app.post("/api/auth/google", async (req, res) => {
  try {
    const user = await requireGoogleUser(req.body?.credential);
    res.json(await buildAuthPayload(user));
  } catch (error) {
    handleError(res, error);
  }
});

app.post("/api/auth/password/signup", async (req, res) => {
  try {
    const sessionResult = await createPasswordAccount(req.body || {});
    res.status(201).json(await buildPasswordAuthPayload(sessionResult));
  } catch (error) {
    handleError(res, error);
  }
});

app.post("/api/auth/password/login", async (req, res) => {
  try {
    const sessionResult = await loginPasswordAccount(req.body || {});
    res.json(await buildPasswordAuthPayload(sessionResult));
  } catch (error) {
    handleError(res, error);
  }
});

app.post("/api/auth/password/session", async (req, res) => {
  try {
    const user = await requirePasswordSessionUser(req.body?.sessionToken);
    res.json(await buildAuthPayload(user));
  } catch (error) {
    handleError(res, error);
  }
});

app.post("/api/admin/opportunities/:opportunityId/review", async (req, res) => {
  try {
    const opportunity = await updateOpportunityReview({
      opportunityId: req.params.opportunityId,
      status: req.body?.status,
      notes: req.body?.notes,
      duplicateOf: req.body?.duplicateOf,
      credential: req.body?.credential,
      passwordSessionToken: req.body?.passwordSessionToken
    });
    res.json({ opportunity: compactOpportunityRecord(opportunity) });
  } catch (error) {
    handleError(res, error);
  }
});

if (!isLambdaRuntime) {
  activeServer = app.listen(port, "127.0.0.1", () => {
    console.log(`Green Business Solution API running at http://127.0.0.1:${port}`);
    console.log(`Using AWS profile ${profile || "default credential chain"}, region ${region}`);
  });
  activeServer.on("error", (error) => {
    console.error(`Could not start Green Business Solution API on http://127.0.0.1:${port}`);
    console.error(error);
    process.exitCode = 1;
  });
}
