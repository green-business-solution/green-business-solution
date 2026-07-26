import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const templatePath = join(
  repoRoot,
  "infra/operational-savings-research.json"
);
const templateSource = readFileSync(templatePath, "utf8");
const template = JSON.parse(templateSource);

const requiredTags = {
  Project: "RetroFi",
  Environment: "Research",
  System: "OperationalSavings",
  ManagedBy: "Codex",
  DataClassification: "InternalResearch"
};

const repositoryNames = new Map([
  ["ReoptRepository", "retrofi-research-reopt"],
  ["SscRepository", "retrofi-research-ssc"],
  ["MeasurRepository", "retrofi-research-measur"],
  ["ScoutRepository", "retrofi-research-scout"]
]);

const expectedActionsBySid = {
  ResearchBucketMetadata: [
    "s3:GetBucketLocation",
    "s3:GetBucketOwnershipControls",
    "s3:GetBucketPolicy",
    "s3:GetBucketPublicAccessBlock",
    "s3:GetBucketTagging",
    "s3:GetBucketVersioning",
    "s3:GetEncryptionConfiguration",
    "s3:GetLifecycleConfiguration",
    "s3:ListBucket",
    "s3:ListBucketMultipartUploads",
    "s3:ListBucketVersions"
  ],
  ResearchBucketObjects: [
    "s3:AbortMultipartUpload",
    "s3:DeleteObject",
    "s3:DeleteObjectVersion",
    "s3:GetObject",
    "s3:GetObjectAttributes",
    "s3:GetObjectTagging",
    "s3:GetObjectVersion",
    "s3:GetObjectVersionAttributes",
    "s3:GetObjectVersionTagging",
    "s3:ListMultipartUploadParts",
    "s3:PutObject",
    "s3:PutObjectTagging",
    "s3:RestoreObject"
  ],
  ResearchEcrRepositories: [
    "ecr:BatchCheckLayerAvailability",
    "ecr:BatchDeleteImage",
    "ecr:BatchGetImage",
    "ecr:CompleteLayerUpload",
    "ecr:CreateRepository",
    "ecr:DeleteLifecyclePolicy",
    "ecr:DeleteRepository",
    "ecr:DescribeImageScanFindings",
    "ecr:DescribeImages",
    "ecr:DescribeRepositories",
    "ecr:GetDownloadUrlForLayer",
    "ecr:GetLifecyclePolicy",
    "ecr:GetLifecyclePolicyPreview",
    "ecr:GetRepositoryPolicy",
    "ecr:InitiateLayerUpload",
    "ecr:ListImages",
    "ecr:ListTagsForResource",
    "ecr:PutImage",
    "ecr:PutImageScanningConfiguration",
    "ecr:PutImageTagMutability",
    "ecr:PutLifecyclePolicy",
    "ecr:StartImageScan",
    "ecr:StartLifecyclePolicyPreview",
    "ecr:TagResource",
    "ecr:UntagResource",
    "ecr:UploadLayerPart"
  ],
  EcrAuthorizationToken: ["ecr:GetAuthorizationToken"],
  ResearchLogGroups: [
    "logs:CreateLogGroup",
    "logs:CreateLogStream",
    "logs:DeleteLogGroup",
    "logs:DeleteLogStream",
    "logs:DeleteRetentionPolicy",
    "logs:DescribeLogStreams",
    "logs:FilterLogEvents",
    "logs:GetLogEvents",
    "logs:ListTagsForResource",
    "logs:PutLogEvents",
    "logs:PutRetentionPolicy",
    "logs:TagResource",
    "logs:UntagResource"
  ],
  ReadOwnResearchRole: [
    "iam:GetRole",
    "iam:GetRolePolicy",
    "iam:ListAttachedRolePolicies",
    "iam:ListRolePolicies"
  ],
  ManageOwnInlinePolicies: [
    "iam:DeleteRolePolicy",
    "iam:PutRolePolicy"
  ],
  PassOwnResearchRoleToEcsTasks: ["iam:PassRole"]
};

const allowedWildcardResourceStrings = new Set([
  "*",
  "${BucketArn}/*",
  "arn:${AWS::Partition}:ecr:${AWS::Region}:${AWS::AccountId}:repository/retrofi-research-*",
  "arn:${AWS::Partition}:logs:${AWS::Region}:${AWS::AccountId}:log-group:/retrofi/research/operational-savings/*"
]);

function tagsByKey(tags) {
  return Object.fromEntries(tags.map(({ Key, Value }) => [Key, Value]));
}

function policyStatements() {
  return template.Resources.ResearchPermissionsBoundary.Properties
    .PolicyDocument.Statement;
}

function statementBySid(sid) {
  return policyStatements().find((statement) => statement.Sid === sid);
}

function asArray(value) {
  return Array.isArray(value) ? value : [value];
}

function sorted(values) {
  return [...values].sort();
}

function nestedStrings(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(nestedStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(nestedStrings);
  }
  return [];
}

describe("isolated operational-savings research infrastructure", () => {
  test("contains only the authorized resource inventory", () => {
    expect(Object.keys(template.Resources).sort()).toEqual(
      [
        "ResearchBucket",
        "ResearchBucketPolicy",
        "ReoptRepository",
        "SscRepository",
        "MeasurRepository",
        "ScoutRepository",
        "ResearchPermissionsBoundary",
        "ResearchRole"
      ].sort()
    );
    expect(
      Object.values(template.Resources).map((resource) => resource.Type)
    ).toEqual(
      expect.arrayContaining([
        "AWS::S3::Bucket",
        "AWS::S3::BucketPolicy",
        "AWS::IAM::ManagedPolicy",
        "AWS::IAM::Role",
        "AWS::ECR::Repository",
        "AWS::ECR::Repository",
        "AWS::ECR::Repository",
        "AWS::ECR::Repository"
      ])
    );
    expect(templateSource).not.toMatch(
      /AdministratorAccess|arn:aws:iam::aws:policy|059310317821|448016109714|gbs-|retrofi\.org/
    );
  });

  test("trusts only the exact required operator IAM role parameter", () => {
    const parameter = template.Parameters.OperatorRoleArn;
    expect(parameter.Default).toBeUndefined();
    expect(parameter.AllowedPattern).toMatch(/:iam::/);
    expect(parameter.AllowedPattern).toContain(":role/");
    expect(parameter.AllowedPattern).not.toContain("assumed-role");
    expect(parameter.AllowedPattern).not.toContain("*");

    const role = template.Resources.ResearchRole.Properties;
    expect(role.RoleName).toBe("RetroFiOperationalSavingsResearchRole");
    expect(template.Resources.ResearchRole.DeletionPolicy).toBe("Retain");
    expect(template.Resources.ResearchRole.UpdateReplacePolicy).toBe(
      "Retain"
    );
    expect(role.ManagedPolicyArns).toEqual([
      {
        Ref: "ResearchPermissionsBoundary"
      }
    ]);
    expect(role.PermissionsBoundary).toEqual({
      Ref: "ResearchPermissionsBoundary"
    });
    expect(role.Policies).toBeUndefined();
    expect(role.AssumeRolePolicyDocument.Statement).toEqual([
      {
        Sid: "ExactOperatorRoleTrust",
        Effect: "Allow",
        Principal: {
          AWS: {
            Ref: "OperatorRoleArn"
          }
        },
        Action: "sts:AssumeRole",
        Condition: {
          ArnEquals: {
            "aws:PrincipalArn": {
              Ref: "OperatorRoleArn"
            }
          }
        }
      }
    ]);
    expect(role.Tags).toHaveLength(5);
    expect(tagsByKey(role.Tags)).toEqual(requiredTags);

    const boundary =
      template.Resources.ResearchPermissionsBoundary;
    expect(boundary.Type).toBe("AWS::IAM::ManagedPolicy");
    expect(boundary.DeletionPolicy).toBe("Retain");
    expect(boundary.UpdateReplacePolicy).toBe("Retain");
    expect(boundary.Properties.ManagedPolicyName).toBe(
      "RetroFiOperationalSavingsResearchBoundary"
    );
  });

  test("keeps the research bucket private, encrypted, versioned, and narrowly expired", () => {
    const bucket = template.Resources.ResearchBucket;
    const properties = bucket.Properties;
    expect(template.Parameters.ResearchBucketName.Default).toBe("");
    expect(template.Conditions.UseGeneratedResearchBucketName).toEqual({
      "Fn::Equals": [
        {
          Ref: "ResearchBucketName"
        },
        ""
      ]
    });
    expect(bucket.DeletionPolicy).toBe("Retain");
    expect(bucket.UpdateReplacePolicy).toBe("Retain");
    expect(properties.BucketName).toEqual({
      "Fn::If": [
        "UseGeneratedResearchBucketName",
        {
          "Fn::Sub":
            "retrofi-operational-savings-research-${AWS::AccountId}-${AWS::Region}"
        },
        {
          Ref: "ResearchBucketName"
        }
      ]
    });
    expect(properties.OwnershipControls).toEqual({
      Rules: [
        {
          ObjectOwnership: "BucketOwnerEnforced"
        }
      ]
    });
    expect(properties.PublicAccessBlockConfiguration).toEqual({
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true
    });
    expect(properties.BucketEncryption).toEqual({
      ServerSideEncryptionConfiguration: [
        {
          ServerSideEncryptionByDefault: {
            SSEAlgorithm: "AES256"
          }
        }
      ]
    });
    expect(properties.VersioningConfiguration).toEqual({
      Status: "Enabled"
    });
    expect(properties.Tags).toHaveLength(5);
    expect(tagsByKey(properties.Tags)).toEqual(requiredTags);

    const rules = properties.LifecycleConfiguration.Rules;
    expect(rules).toHaveLength(2);
    const abortRule = rules.find(
      (rule) => rule.Id === "abort-incomplete-multipart-uploads"
    );
    expect(abortRule).toEqual({
      Id: "abort-incomplete-multipart-uploads",
      Status: "Enabled",
      AbortIncompleteMultipartUpload: {
        DaysAfterInitiation: 7
      }
    });
    const temporaryRule = rules.find(
      (rule) => rule.Id === "expire-temporary-objects"
    );
    expect(temporaryRule).toEqual({
      Id: "expire-temporary-objects",
      Status: "Enabled",
      Prefix: "temporary/",
      ExpirationInDays: 14,
      NoncurrentVersionExpiration: {
        NoncurrentDays: 14
      }
    });
    for (const rule of rules) {
      if (
        "ExpirationInDays" in rule ||
        "NoncurrentVersionExpiration" in rule
      ) {
        expect(rule.Prefix).toBe("temporary/");
      }
    }
  });

  test("denies non-HTTPS S3 requests on only the designated bucket", () => {
    const bucketPolicy = template.Resources.ResearchBucketPolicy;
    expect(bucketPolicy.DeletionPolicy).toBe("Retain");
    expect(bucketPolicy.UpdateReplacePolicy).toBe("Retain");
    const policy =
      bucketPolicy.Properties.PolicyDocument;
    expect(policy.Statement).toEqual([
      {
        Sid: "DenyInsecureTransport",
        Effect: "Deny",
        Principal: "*",
        Action: "s3:*",
        Resource: [
          {
            "Fn::GetAtt": ["ResearchBucket", "Arn"]
          },
          {
            "Fn::Sub": [
              "${BucketArn}/*",
              {
                BucketArn: {
                  "Fn::GetAtt": ["ResearchBucket", "Arn"]
                }
              }
            ]
          }
        ],
        Condition: {
          Bool: {
            "aws:SecureTransport": "false"
          }
        }
      }
    ]);
  });

  test("keeps every ECR repository immutable, scanned, encrypted, and tag-safe", () => {
    for (const [logicalId, repositoryName] of repositoryNames) {
      const repository = template.Resources[logicalId];
      expect(repository.Type).toBe("AWS::ECR::Repository");
      expect(repository.DeletionPolicy).toBe("Retain");
      expect(repository.UpdateReplacePolicy).toBe("Retain");
      expect(repository.Properties.RepositoryName).toBe(repositoryName);
      expect(repository.Properties.ImageTagMutability).toBe("IMMUTABLE");
      expect(repository.Properties.ImageScanningConfiguration).toEqual({
        ScanOnPush: true
      });
      expect(repository.Properties.EncryptionConfiguration).toEqual({
        EncryptionType: "AES256"
      });
      expect(repository.Properties.Tags).toHaveLength(5);
      expect(tagsByKey(repository.Properties.Tags)).toEqual(requiredTags);

      const lifecycle = JSON.parse(
        repository.Properties.LifecyclePolicy.LifecyclePolicyText
      );
      expect(lifecycle.rules).toHaveLength(1);
      expect(lifecycle.rules[0]).toMatchObject({
        rulePriority: 1,
        selection: {
          tagStatus: "untagged",
          countType: "sinceImagePushed",
          countUnit: "days",
          countNumber: 14
        },
        action: {
          type: "expire"
        }
      });
      expect(
        lifecycle.rules.some(
          (rule) => rule.selection.tagStatus !== "untagged"
        )
      ).toBe(false);
    }
  });

  test("confines every Allow statement to research resources", () => {
    const statements = policyStatements();
    expect(statements.map(({ Sid }) => Sid).sort()).toEqual(
      [
        "ResearchBucketMetadata",
        "ResearchBucketObjects",
        "ResearchEcrRepositories",
        "EcrAuthorizationToken",
        "ResearchLogGroups",
        "ReadOwnResearchRole",
        "ManageOwnInlinePolicies",
        "PassOwnResearchRoleToEcsTasks"
      ].sort()
    );

    for (const statement of statements) {
      expect(statement.Effect).toBe("Allow");
      expect(statement.NotAction).toBeUndefined();
      expect(statement.NotResource).toBeUndefined();
      expect(statement.Principal).toBeUndefined();
      expect(sorted(asArray(statement.Action))).toEqual(
        sorted(expectedActionsBySid[statement.Sid])
      );
      for (const action of asArray(statement.Action)) {
        expect(action).not.toContain("*");
        expect(action).toMatch(/^(s3|ecr|logs|iam):/);
      }
      if (statement.Resource === "*") {
        expect(statement.Sid).toBe("EcrAuthorizationToken");
        expect(asArray(statement.Action)).toEqual([
          "ecr:GetAuthorizationToken"
        ]);
      }
    }
    expect(statementBySid("EcrAuthorizationToken").Resource).toBe("*");

    const wildcardResourceStrings = statements.flatMap((statement) =>
      nestedStrings(statement.Resource).filter((value) =>
        value.includes("*")
      )
    );
    expect(new Set(wildcardResourceStrings)).toEqual(
      allowedWildcardResourceStrings
    );
    expect(
      statements.filter((statement) =>
        nestedStrings(statement.Resource).includes("*")
      ).map(({ Sid }) => Sid)
    ).toEqual(["EcrAuthorizationToken"]);

    expect(statementBySid("ResearchBucketMetadata").Resource).toEqual({
      "Fn::GetAtt": ["ResearchBucket", "Arn"]
    });
    expect(statementBySid("ResearchBucketObjects").Resource).toEqual({
      "Fn::Sub": [
        "${BucketArn}/*",
        {
          BucketArn: {
            "Fn::GetAtt": ["ResearchBucket", "Arn"]
          }
        }
      ]
    });
    expect(statementBySid("ResearchEcrRepositories").Resource).toEqual({
      "Fn::Sub":
        "arn:${AWS::Partition}:ecr:${AWS::Region}:${AWS::AccountId}:repository/retrofi-research-*"
    });

    const logResources = statementBySid("ResearchLogGroups").Resource;
    expect(logResources).toEqual({
      "Fn::Sub":
        "arn:${AWS::Partition}:logs:${AWS::Region}:${AWS::AccountId}:log-group:/retrofi/research/operational-savings/*"
    });

    const ownRoleArn = {
      "Fn::Sub":
        "arn:${AWS::Partition}:iam::${AWS::AccountId}:role/RetroFiOperationalSavingsResearchRole"
    };
    expect(statementBySid("ReadOwnResearchRole").Resource).toEqual(
      ownRoleArn
    );
    expect(statementBySid("ManageOwnInlinePolicies").Resource).toEqual(
      ownRoleArn
    );
    expect(
      statementBySid("PassOwnResearchRoleToEcsTasks")
    ).toMatchObject({
      Action: "iam:PassRole",
      Resource: ownRoleArn,
      Condition: {
        StringEquals: {
          "iam:PassedToService": "ecs-tasks.amazonaws.com"
        }
      }
    });

    const allActions = statements.flatMap((statement) =>
      asArray(statement.Action)
    );
    expect(
      allActions.some((action) =>
        /AttachRolePolicy|CreatePolicy|CreateRole|DeleteRolePermissionsBoundary|PutRolePermissionsBoundary|UpdateAssumeRolePolicy/.test(
          action
        )
      )
    ).toBe(false);
  });

  test("exports every operator-facing identifier", () => {
    expect(Object.keys(template.Outputs).sort()).toEqual(
      [
        "ResearchRoleArn",
        "ResearchRoleName",
        "ResearchPermissionsBoundaryArn",
        "ResearchBucketName",
        "ResearchBucketArn",
        "ResearchLogGroupPrefix",
        "ReoptRepositoryArn",
        "ReoptRepositoryUri",
        "SscRepositoryArn",
        "SscRepositoryUri",
        "MeasurRepositoryArn",
        "MeasurRepositoryUri",
        "ScoutRepositoryArn",
        "ScoutRepositoryUri"
      ].sort()
    );
  });
});
