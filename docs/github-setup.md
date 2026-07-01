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

Collaborators were invited with write access:

```sh
gh api repos/green-business-solution/green-business-solution/collaborators/SchrodingersCatLooks \
  -X PUT \
  -f permission=push

gh api repos/green-business-solution/green-business-solution/collaborators/PlaneCoder75367 \
  -X PUT \
  -f permission=push
```

Invitations remain pending until each collaborator accepts them in GitHub.

Rajvansh Gupta's GitHub account `SchrodingersCatLooks` was later invited as an organization admin/owner with:

```sh
gh api /orgs/green-business-solution/memberships/SchrodingersCatLooks \
  -X PUT \
  -f role=admin
```
