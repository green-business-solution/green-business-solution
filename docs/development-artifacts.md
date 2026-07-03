# Development Artifacts

Raw GPT Pro prompt/output work packets are stored outside Git in a private S3 bucket.

## GPT Pro Work

- S3 URI: `s3://gbs-retrofi-dev-work-448016109714-us-east-1/gpt-pro-work/`
- AWS region: `us-east-1`
- Bucket: `gbs-retrofi-dev-work-448016109714-us-east-1`
- Access: private S3 bucket with public access blocked
- Default encryption: AES-256
- Versioning: enabled

Restore locally:

```sh
AWS_PROFILE=gbs AWS_REGION=us-east-1 aws s3 sync \
  s3://gbs-retrofi-dev-work-448016109714-us-east-1/gpt-pro-work/ \
  "GPT Pro Work/"
```

Upload new local GPT Pro work:

```sh
AWS_PROFILE=gbs AWS_REGION=us-east-1 aws s3 sync \
  "GPT Pro Work/" \
  s3://gbs-retrofi-dev-work-448016109714-us-east-1/gpt-pro-work/ \
  --exclude ".DS_Store" \
  --exclude "*/.DS_Store" \
  --sse AES256
```

`GPT Pro Work/` is intentionally ignored by Git. Keep durable normalized import artifacts in `data/` when runtime code or tests need them.
