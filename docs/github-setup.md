# GitHub Setup

The repository lives in a private GitHub organization named:

```text
green-business-solution
```

Repository URL:

```text
https://github.com/green-business-solution/green-business-solution
```

## Organization creation

The GitHub organization was created in the GitHub web UI.

The repository was created and pushed from this local checkout with:

```sh
gh repo create green-business-solution/green-business-solution --private --source . --remote origin --push
```

The collaborator was invited with write access:

```sh
gh api repos/green-business-solution/green-business-solution/collaborators/SchrodingersCatLooks \
  -X PUT \
  -f permission=push
```

The invitation remains pending until `SchrodingersCatLooks` accepts it in GitHub.
