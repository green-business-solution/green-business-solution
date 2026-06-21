import crypto from "node:crypto";
import express from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
  TransactWriteCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const region = process.env.AWS_REGION || "us-east-2";
const profile = process.env.AWS_PROFILE || "gbs";
const usersTable = process.env.GBS_USERS_TABLE || "gbs-users";
const intakeTable = process.env.GBS_INTAKE_TABLE || "gbs-client-intake";
const port = Number(process.env.API_PORT || 8787);

const client = new DynamoDBClient({
  region,
  credentials: profile ? fromIni({ profile }) : undefined
});
const db = DynamoDBDocumentClient.from(client);
const app = express();

app.use(express.json({ limit: "128kb" }));

const requiredFields = [
  ["fullName", "Full name"],
  ["email", "Email"],
  ["companyName", "Company name"],
  ["roleTitle", "Role/title"],
  ["industry", "Industry"],
  ["organizationSize", "Organization size"],
  ["headquarters", "Primary operating region"],
  ["sustainabilityGoals", "Sustainability goals"],
  ["currentChallenges", "Current challenges"],
  ["timeline", "Timeline"]
];

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanOptional(value) {
  const text = cleanText(value);
  return text.length > 0 ? text : null;
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
      roleTitle: cleanText(input.roleTitle),
      contactPreference: cleanOptional(input.contactPreference)
    },
    business: {
      companyName: cleanText(input.companyName),
      website: cleanOptional(input.website),
      industry: cleanText(input.industry),
      organizationSize: cleanText(input.organizationSize),
      headquarters: cleanText(input.headquarters)
    },
    sustainability: {
      goals: cleanText(input.sustainabilityGoals),
      currentChallenges: cleanText(input.currentChallenges),
      monthlyUtilitySpend: cleanOptional(input.monthlyUtilitySpend),
      timeline: cleanText(input.timeline),
      notes: cleanOptional(input.notes)
    },
    createdAt: now,
    updatedAt: now
  };
}

async function getUser(userId) {
  const result = await db.send(
    new GetCommand({
      TableName: usersTable,
      Key: { userId }
    })
  );
  return result.Item || null;
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

async function updateLastLogin(userId) {
  const now = new Date().toISOString();
  await db.send(
    new UpdateCommand({
      TableName: usersTable,
      Key: { userId },
      UpdateExpression: "SET lastLoginAt = :now, updatedAt = :now",
      ExpressionAttributeValues: {
        ":now": now
      }
    })
  );
}

async function requireUser(userId) {
  const code = cleanText(userId);
  if (!/^\d{6}$/.test(code)) {
    const error = new Error("Enter a valid six-digit temporary code.");
    error.status = 400;
    throw error;
  }

  const user = await getUser(code);
  if (!user || user.status !== "active") {
    const error = new Error("No active user was found for that code.");
    error.status = 404;
    throw error;
  }

  return user;
}

async function requireAdmin(userId) {
  const user = await requireUser(userId);
  if (user.role !== "admin") {
    const error = new Error("This code does not have admin access.");
    error.status = 403;
    throw error;
  }
  return user;
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

async function createClientUser(input) {
  const errors = validateIntake(input);
  if (errors.length > 0) {
    const error = new Error(errors.join(" "));
    error.status = 400;
    throw error;
  }

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const userId = String(crypto.randomInt(100000, 1000000));
    const now = new Date().toISOString();
    const intake = createIntakeRecord(userId, input, now);
    const user = {
      userId,
      role: "client",
      status: "active",
      fullName: intake.contact.fullName,
      email: intake.contact.email,
      companyName: intake.business.companyName,
      authProvider: "temporaryCode",
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
      if (error.name !== "TransactionCanceledException") {
        throw error;
      }
    }
  }

  const error = new Error("Could not allocate a temporary code. Please try again.");
  error.status = 500;
  throw error;
}

function handleError(res, error) {
  const status = error.status || 500;
  if (status >= 500) {
    console.error(error);
  }
  res.status(status).json({ error: error.message || "Request failed." });
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, region, usersTable, intakeTable });
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

app.post("/api/login", async (req, res) => {
  try {
    const user = await requireUser(req.body?.userId);
    await updateLastLogin(user.userId);
    res.json({
      user: publicUser({ ...user, lastLoginAt: new Date().toISOString() }),
      intake: user.role === "client" ? await getIntake(user.userId) : null
    });
  } catch (error) {
    handleError(res, error);
  }
});

app.post("/api/portal", async (req, res) => {
  try {
    const user = await requireUser(req.body?.userId);
    res.json({
      user: publicUser(user),
      intake: await getIntake(user.userId)
    });
  } catch (error) {
    handleError(res, error);
  }
});

app.post("/api/admin/users", async (req, res) => {
  try {
    const admin = await requireAdmin(req.body?.adminUserId);
    const [users, intakes] = await Promise.all([scanAll(usersTable), scanAll(intakeTable)]);
    const intakeByUser = new Map(intakes.map((intake) => [intake.userId, intake]));

    res.json({
      admin: publicUser(admin),
      users: users
        .map((user) => ({
          user: publicUser(user),
          intake: intakeByUser.get(user.userId) || null
        }))
        .sort((a, b) => String(b.user.createdAt).localeCompare(String(a.user.createdAt)))
    });
  } catch (error) {
    handleError(res, error);
  }
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Green Business Solution API running at http://127.0.0.1:${port}`);
  console.log(`Using AWS profile ${profile}, region ${region}`);
});
