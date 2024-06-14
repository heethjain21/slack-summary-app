# Contributing Guidelines

## 1. Table of Contents

- [Contributing Guidelines](#contributing-guidelines)
  - [1. Table of Contents](#1-table-of-contents)
  - [2. Branching \& Merging](#2-branching--merging)
  - [3. Commits](#3-commits)
  - [4. Code Organization](#4-code-organization)

## 2. Branching & Merging

To get an overview of the project, read the [README](README.md).

- Main branch:
  - For any new functionality, a new branch must be created from the main branch
  - Push all code in that new branch and once done, create a pull request to the main branch
  - Ensure that **all the PR workflows** pass. If they fail, make corresponding changes to fix it
  - Once all PR workflows pass, then **Squash & Merge** the PR to main branch (squash and merge - will convert multiple commits to a single commit)

**Note:**

- Make sure to keep the Pull Request title **Semantic** (refer commits section below)
- While merging PR in `main` branch, always **Squash and Merge** (so multiple commits are pushed as a single commit in the branch)

## 3. Commits

- Every commit must be verified using GPG keys. Reference: [here](https://medium.com/big0one/how-to-create-a-verified-commit-in-github-using-gpg-key-signature-16acee004e0f)

- We are following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (based on Angular convention)

- In brief, add either of these prefixes before a commit message,

> - build: Changes that affect the build system orexternal > dependencies (example scopes: gulp, broccoli,npm)
> - ci: Changes to our CI configuration files and scripts> (example scopes: Travis, Circle, BrowserStack, SauceLabs)
> - docs: Documentation only changes
> - feat: A new feature
> - fix: A bug fix
> - perf: A code change that improves performance
> - refactor: A code change that neither fixes a bug nor >adds a feature
> - style: Changes that do not affect the meaning of the >code (white-space, formatting, missing semi-colons, etc)
> - test: Adding missing tests or correcting existing tests
> - revert: Reverting a previous commit

- Examples:
  - `fix: slash command to return complete error message`
  - `feat: monthly and weekly frequency for slash command`

## 4. Code Organization

- Following [Node Best Practices](https://github.com/goldbergyoni/nodebestpractices) for consistency and best practices in industry

- We are using our own Custom Logger (from `/lib/logger`), to log events (built on top of Winston to replicate NestJS like logging functionality)

- Different types of files to have the filetype as a suffix in name. For example, `common.constants.ts`, `slack.service.ts`, and so on

- Wrap constants/utils/types under a namespace/module

  - When calling a util function `getPreviousDayRange()`, we will call it as `CommonUtils.getPreviousDayRange()`.
  - This helps in code readability, as while looking at the code, we know the function is imported from `CommonUtils`, instead of looking for it