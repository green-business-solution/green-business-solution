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
  if (!cleanText(credential) && !cleanText(passwordSessionToken)) {
    const error = new Error("Admin sign-in is required.");
    error.status = 401;
    throw error;
  }

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

function bearerCredentialFromRequest(req) {
  const authorization = cleanText(req.get("authorization"));
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match ? cleanText(match[1]) : "";
}

function adminAuthFromRequest(req) {
  return {
    credential: cleanText(req.get("x-gbs-google-credential")) || bearerCredentialFromRequest(req) || req.body?.credential,
    passwordSessionToken: cleanText(req.get("x-gbs-password-session")) || req.body?.passwordSessionToken
  };
}

async function requireAdminFromRequest(req) {
  return requireAdminFromAuth(adminAuthFromRequest(req));
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

function isDatabaseCloneRecord(record) {
  return isDsireOpportunityRecord(record) && record?.ingestionMode !== "rss_delta_feed";
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeFilterValue(value) {
  return String(value || "").trim().toLowerCase();
}

function parseQueryList(value) {
  if (value == null) {
    return [];
  }

  const values = Array.isArray(value) ? value : String(value).split(",");
  return values.map((item) => normalizeFilterValue(item)).filter(Boolean);
}

function parsePositiveInteger(value, fallback, max) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1) {
    return fallback;
  }

  return Math.min(number, max);
}

function toLookupArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") {
        return {
          name: item,
          slug: slugify(item)
        };
      }

      if (!item || typeof item !== "object") {
        return null;
      }

      const name = cleanText(item.name || item.title || item.abbreviation || item.code || item.id);
      if (!name) {
        return null;
      }

      return {
        ...item,
        id: item.id == null ? undefined : String(item.id),
        name,
        slug: item.slug || slugify(name)
      };
    })
    .filter(Boolean);
}

function uniqueLookups(values) {
  const seen = new Map();
  const result = [];

  for (const value of values) {
    if (!value?.name) {
      continue;
    }

    const key = normalizeFilterValue(value.slug || value.name || value.id);
    if (!key) {
      continue;
    }

    const existingIndex = seen.get(key);
    if (existingIndex != null) {
      result[existingIndex] = {
        ...value,
        ...result[existingIndex],
        id: result[existingIndex].id || value.id,
        slug: result[existingIndex].slug || value.slug,
        name: result[existingIndex].name || value.name
      };
      continue;
    }

    seen.set(key, result.length);
    result.push(value);
  }

  return result;
}

function lookupMatches(lookup, filters) {
  if (filters.length === 0) {
    return true;
  }

  const values = [lookup?.id, lookup?.name, lookup?.slug, lookup?.abbreviation].map(normalizeFilterValue);
  return filters.some((filter) => values.includes(filter));
}

function anyLookupMatches(lookups, filters) {
  if (filters.length === 0) {
    return true;
  }

  return lookups.some((lookup) => lookupMatches(lookup, filters));
}

function compactDatabaseDetails(details) {
  if (!Array.isArray(details)) {
    return [];
  }

  return details
    .map((detail, index) => ({
      id: detail?.id == null ? null : String(detail.id),
      label: detail?.label || null,
      value: compactText(detail?.value, 1800),
      displayOrder: detail?.displayOrder ?? index,
      templateId: detail?.templateId == null ? null : String(detail.templateId)
    }))
    .filter((detail) => detail.label || detail.value)
    .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0));
}

function compactDatabaseParameterSets(parameterSets) {
  if (!Array.isArray(parameterSets)) {
    return [];
  }

  return parameterSets.map((parameterSet, index) => ({
    id: parameterSet?.id == null ? null : String(parameterSet.id),
    label: parameterSet?.label || null,
    displayOrder: parameterSet?.displayOrder ?? index,
    sectors: uniqueLookups(toLookupArray(parameterSet?.sectors)),
    technologies: uniqueLookups(toLookupArray(parameterSet?.technologies)),
    parameters: Array.isArray(parameterSet?.parameters)
      ? parameterSet.parameters.map((parameter) => ({
          id: parameter?.id == null ? null : String(parameter.id),
          source: parameter?.source || null,
          qualifier: parameter?.qualifier || null,
          amount: parameter?.amount ?? null,
          amountText: parameter?.amountText || null,
          units: parameter?.units || null,
          displayValue: parameter?.displayValue || null
        }))
      : []
  }));
}

function buildDatabaseProgram(record, { includeDetail = false } = {}) {
  const clone = record.dsireClone || {};
  const cloneProgram = clone.program || {};
  const sourceProgramId = String(cloneProgram.sourceProgramId || clone.sourceProgramId || record.dsire?.programId || record.externalId);
  const name = cloneProgram.name || record.canonicalTitle || "Untitled DSIRE program";
  const state = {
    id: cloneProgram.state?.id || (record.dsire?.stateId == null ? null : String(record.dsire.stateId)),
    abbreviation: cloneProgram.state?.abbreviation || record.state || null,
    name: cloneProgram.state?.name || record.stateName || null,
    isTerritory: cloneProgram.state?.isTerritory ?? record.raw?.stateObj?.is_territory ?? null
  };
  const category = {
    id: cloneProgram.category?.id || (record.categoryId == null ? null : String(record.categoryId)),
    name: cloneProgram.category?.name || record.category || null,
    slug: cloneProgram.category?.slug || slugify(record.category)
  };
  const programType = {
    id: cloneProgram.programType?.id || (record.programTypeId == null ? null : String(record.programTypeId)),
    categoryId: cloneProgram.programType?.categoryId || (record.categoryId == null ? null : String(record.categoryId)),
    name: cloneProgram.programType?.name || record.programType || null,
    slug: cloneProgram.programType?.slug || slugify(record.programType)
  };
  const implementingSector = {
    id: cloneProgram.implementingSector?.id || record.implementingSector?.id || (record.dsire?.sectorId == null ? null : String(record.dsire.sectorId)),
    name: cloneProgram.implementingSector?.name || record.implementingSector?.name || record.dsire?.sectorName || null,
    slug: cloneProgram.implementingSector?.slug || record.implementingSector?.slug || slugify(record.dsire?.sectorName)
  };
  const overviewDetails = compactDatabaseDetails(clone.overviewDetails || record.details);
  const parameterSets = compactDatabaseParameterSets(clone.parameterSets || record.parameterSets || record.raw?.parameterSets);
  const eligibleSectors = uniqueLookups([
    ...toLookupArray(clone.eligibleSectors),
    ...toLookupArray(record.eligibleSectors),
    ...toLookupArray(record.sectors),
    ...parameterSets.flatMap((parameterSet) => parameterSet.sectors)
  ]);
  const technologies = uniqueLookups([
    ...toLookupArray(clone.technologies),
    ...toLookupArray(record.technologyRecords),
    ...toLookupArray(record.technologies),
    ...parameterSets.flatMap((parameterSet) => parameterSet.technologies)
  ]);
  const summaryText = compactText(cloneProgram.summaryText || record.summary, includeDetail ? 8000 : 700);

  return {
    id: sourceProgramId,
    opportunityId: record.opportunityId,
    sourceSystem: "DSIRE",
    sourceUrl: cloneProgram.sourceUrl || record.sourceUrl || null,
    websiteUrl: cloneProgram.websiteUrl || record.websiteUrl || null,
    code: cloneProgram.code || record.dsire?.programCode || record.raw?.code || null,
    name,
    slug: cloneProgram.slug || slugify(name),
    state,
    category,
    programType,
    implementingSector,
    eligibleSectors,
    technologies,
    published: cloneProgram.published ?? record.published ?? null,
    status: record.status || "unknown",
    administrator: cloneProgram.administrator || record.administrator || null,
    fundingSource: cloneProgram.fundingSource || record.fundingSource || null,
    budget: cloneProgram.budget || record.budget || null,
    startDate: cloneProgram.startDate || record.startDate || null,
    startDateText: cloneProgram.startDateText || record.raw?.startDateText || null,
    endDate: cloneProgram.endDate || record.endDate || null,
    endDateText: cloneProgram.endDateText || record.raw?.endDateText || null,
    summaryText,
    lastReviewedAt: cloneProgram.lastReviewedAt || record.lastUpdated || null,
    updatedAt: cloneProgram.updatedAt || record.lastUpdated || record.updatedAt || null,
    createdAt: cloneProgram.createdAt || record.sourceCreatedAt || null,
    geography: clone.geography || record.geography || {},
    overviewDetails: includeDetail ? overviewDetails : [],
    parameterSets: includeDetail ? parameterSets : [],
    authorities: includeDetail && Array.isArray(clone.authorities) ? clone.authorities : [],
    contacts: includeDetail && Array.isArray(clone.contacts) ? clone.contacts : [],
    memos: includeDetail && Array.isArray(clone.memos) ? clone.memos : []
  };
}

function filterDatabasePrograms(programs, query) {
  const q = normalizeFilterValue(query.q);
  const stateFilters = parseQueryList(query.state);
  const categoryFilters = parseQueryList(query.category);
  const typeFilters = parseQueryList(query.type);
  const technologyFilters = parseQueryList(query.technology);
  const sectorFilters = parseQueryList(query.eligible_sector || query.sector);
  const implementingSectorFilters = parseQueryList(query.implementing_sector);

  return programs.filter((program) => {
    const haystack = normalizeFilterValue(
      [
        program.name,
        program.code,
        program.administrator,
        program.summaryText,
        program.state?.abbreviation,
        program.state?.name,
        program.category?.name,
        program.programType?.name,
        program.implementingSector?.name,
        ...program.eligibleSectors.map((sector) => sector.name),
        ...program.technologies.map((technology) => technology.name)
      ].join(" ")
    );

    return (
      (!q || haystack.includes(q)) &&
      lookupMatches(program.state, stateFilters) &&
      lookupMatches(program.category, categoryFilters) &&
      lookupMatches(program.programType, typeFilters) &&
      lookupMatches(program.implementingSector, implementingSectorFilters) &&
      anyLookupMatches(program.technologies, technologyFilters) &&
      anyLookupMatches(program.eligibleSectors, sectorFilters)
    );
  });
}

function buildFacet(values, labelKey = "name") {
  const map = new Map();

  for (const value of values) {
    if (!value) {
      continue;
    }

    const id = value.id ?? value.abbreviation ?? value.slug ?? value[labelKey];
    const label = value[labelKey] || value.name || value.abbreviation || id;
    if (!id || !label) {
      continue;
    }

    const key = normalizeFilterValue(value.slug || value.abbreviation || label || id);
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(key, {
        id: key,
        label: String(label),
        value: value.slug || value.abbreviation || String(label),
        count: 1
      });
    }
  }

  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
}

function buildDatabaseFacets(programs) {
  return {
    states: buildFacet(programs.map((program) => program.state), "name"),
    categories: buildFacet(programs.map((program) => program.category), "name"),
    programTypes: buildFacet(programs.map((program) => program.programType), "name"),
    implementingSectors: buildFacet(programs.map((program) => program.implementingSector), "name"),
    eligibleSectors: buildFacet(programs.flatMap((program) => program.eligibleSectors), "name"),
    technologies: buildFacet(programs.flatMap((program) => program.technologies), "name")
  };
}

async function loadDatabasePrograms({ includeDetail = false } = {}) {
  const records = await scanAll(opportunitiesTable);
  return records
    .filter(isDatabaseCloneRecord)
    .map((record) => buildDatabaseProgram(record, { includeDetail }))
    .sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")) || a.name.localeCompare(b.name));
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

app.use("/api/database", async (req, res, next) => {
  try {
    await requireAdminFromRequest(req);
    next();
  } catch (error) {
    handleError(res, error);
  }
});

app.get("/api/database/programs", async (req, res) => {
  try {
    const page = parsePositiveInteger(req.query.page, 1, 10000);
    const perPage = parsePositiveInteger(req.query.per_page || req.query.perPage, 24, 100);
    const programs = await loadDatabasePrograms();
    const filteredPrograms = filterDatabasePrograms(programs, req.query);
    const start = (page - 1) * perPage;

    res.json({
      generatedAt: new Date().toISOString(),
      page,
      perPage,
      total: filteredPrograms.length,
      programs: filteredPrograms.slice(start, start + perPage),
      facets: buildDatabaseFacets(programs),
      resultFacets: buildDatabaseFacets(filteredPrograms)
    });
  } catch (error) {
    handleError(res, error);
  }
});

app.get("/api/database/programs/updates", async (req, res) => {
  try {
    const updatedAfter = req.query.updated_after ? new Date(String(req.query.updated_after)) : null;
    const updatedBefore = req.query.updated_before ? new Date(String(req.query.updated_before)) : null;
    const programs = await loadDatabasePrograms();
    const updates = programs.filter((program) => {
      const updatedAt = program.updatedAt ? new Date(program.updatedAt) : null;
      if (!updatedAt || Number.isNaN(updatedAt.getTime())) {
        return false;
      }

      return (!updatedAfter || updatedAt >= updatedAfter) && (!updatedBefore || updatedAt <= updatedBefore);
    });

    res.json({
      generatedAt: new Date().toISOString(),
      total: updates.length,
      updates: updates.map((program) => ({
        id: program.id,
        opportunityId: program.opportunityId,
        name: program.name,
        updatedAt: program.updatedAt,
        sourceUrl: program.sourceUrl
      }))
    });
  } catch (error) {
    handleError(res, error);
  }
});

app.get("/api/database/programs/:programId", async (req, res) => {
  try {
    const requestedId = normalizeFilterValue(req.params.programId);
    const programs = await loadDatabasePrograms({ includeDetail: true });
    const program = programs.find(
      (item) =>
        normalizeFilterValue(item.id) === requestedId ||
        normalizeFilterValue(item.opportunityId) === requestedId ||
        normalizeFilterValue(item.slug) === requestedId
    );

    if (!program) {
      const error = new Error("Program was not found.");
      error.status = 404;
      throw error;
    }

    res.json({ program });
  } catch (error) {
    handleError(res, error);
  }
});

app.get("/api/database/facets", async (_req, res) => {
  try {
    const programs = await loadDatabasePrograms();
    res.json({
      generatedAt: new Date().toISOString(),
      facets: buildDatabaseFacets(programs)
    });
  } catch (error) {
    handleError(res, error);
  }
});

app.get("/api/database/states", async (_req, res) => {
  try {
    const programs = await loadDatabasePrograms();
    res.json({ states: buildDatabaseFacets(programs).states });
  } catch (error) {
    handleError(res, error);
  }
});

app.get("/api/database/program-types", async (_req, res) => {
  try {
    const programs = await loadDatabasePrograms();
    const facets = buildDatabaseFacets(programs);
    res.json({
      categories: facets.categories,
      programTypes: facets.programTypes
    });
  } catch (error) {
    handleError(res, error);
  }
});

app.get("/api/database/technologies", async (_req, res) => {
  try {
    const programs = await loadDatabasePrograms();
    res.json({ technologies: buildDatabaseFacets(programs).technologies });
  } catch (error) {
    handleError(res, error);
  }
});

app.get("/api/database/sectors", async (_req, res) => {
  try {
    const programs = await loadDatabasePrograms();
    const facets = buildDatabaseFacets(programs);
    res.json({
      eligibleSectors: facets.eligibleSectors,
      implementingSectors: facets.implementingSectors
    });
  } catch (error) {
    handleError(res, error);
  }
});

app.get("/api/database/summary/maps", async (req, res) => {
  try {
    const programs = filterDatabasePrograms(await loadDatabasePrograms(), req.query);
    res.json({
      generatedAt: new Date().toISOString(),
      states: buildFacet(programs.map((program) => program.state), "name")
    });
  } catch (error) {
    handleError(res, error);
  }
});

app.get("/api/database/summary/tables", async (req, res) => {
  try {
    const programs = filterDatabasePrograms(await loadDatabasePrograms(), req.query);
    const rows = new Map();

    for (const program of programs) {
      const state = program.state?.abbreviation || "Unknown";
      const type = program.programType?.name || "Unknown";
      const key = `${state}:${type}`;
      const existing = rows.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        rows.set(key, {
          state,
          stateName: program.state?.name || state,
          programType: type,
          count: 1
        });
      }
    }

    res.json({
      generatedAt: new Date().toISOString(),
      rows: [...rows.values()].sort((a, b) => a.state.localeCompare(b.state) || a.programType.localeCompare(b.programType))
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
