# GPT Pro Work Chats

`/chats` is an admin-only workspace for GPT Pro repair batches.

The production API reads and writes GPT Pro artifacts from the private dev work S3 bucket under the `gpt-pro-work/` prefix.

Current RetroFi production GPT Pro work lives at:

```text
s3://gbs-retrofi-dev-work-059310317821-us-east-1/gpt-pro-work/
```

Use `AWS_PROFILE=retrofi-prod` and `AWS_REGION=us-east-1` for current GPT Pro work.

The old `gbs` profile and account `448016109714` are legacy rollback context only.

The deploy script passes `GBS_DEV_WORK_BUCKET` and `GBS_GPT_PRO_WORK_PREFIX` into the API Lambda.

The default object layout preserves the local folder tree:

```text
gpt-pro-work/<top-level-local-folder>/<relative-file-path>
```

Prompt files are detected from filenames or parent folders containing `prompt`.

Output files are derived server-side from the selected prompt path by replacing `prompt` or `prompts` with `output`, or by prefixing the prompt filename with `output_` when there is no prompt token.

The browser never chooses an arbitrary S3 output key.

Local development can read the captain's existing GPT Pro Work folder when no S3 bucket is configured.

That fallback is read-only and is disabled in Lambda.

Run a dry migration check with:

```sh
AWS_PROFILE=retrofi-prod AWS_REGION=us-east-1 npm run migrate:gpt-pro-work
```

Run the migration with:

```sh
AWS_PROFILE=retrofi-prod AWS_REGION=us-east-1 npm run migrate:gpt-pro-work -- --write
```

The migration skips `.DS_Store`, AppleDouble files, and `__MACOSX`.

It never deletes or modifies the local GPT Pro Work folder.
