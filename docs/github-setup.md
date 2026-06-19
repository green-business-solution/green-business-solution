# GitHub Setup

The repository should live in a private GitHub organization named:

```text
green-business-solution
```

## Create the organization

GitHub organization creation must be completed in the GitHub web UI:

1. Open `https://github.com/organizations/new`.
2. Choose the organization plan.
3. Set the organization name to `green-business-solution`.
4. Use an owner email address controlled by the project owner.
5. Complete the organization setup.

After the organization exists, create and push the repository from this local checkout:

```sh
gh repo create green-business-solution/green-business-solution --private --source . --remote origin --push
```

Then invite the collaborator with write access:

```sh
gh api repos/green-business-solution/green-business-solution/collaborators/SchrodingersCatLooks \
  -X PUT \
  -f permission=push
```
