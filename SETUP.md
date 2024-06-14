# Project Setup

## 1. Table of Contents

- [Project Setup](#project-setup)
  - [1. Table of Contents](#1-table-of-contents)
  - [2. Project](#2-project)
  - [3. Docker](#3-docker)
  - [4. Database](#4-database)
  - [5. Slack](#5-slack)
    - [5.1 Create a Slack App](#51-create-a-slack-app)
    - [5.2 Slack Environment Variables](#52-slack-environment-variables)
  - [6. Code Setup](#6-code-setup)
  - [7. VS Code Extensions](#7-vs-code-extensions)

## 2. Project

- Install Node Version

  [Install nvm](https://github.com/nvm-sh/nvm#installing-and-updating), if not yet installed

  In the root directory, run the following command to install node from `.nvmrc`:

  ```bash
  $ nvm install
  ```

## 3. Docker

- Install Docker from [here](https://www.docker.com/products/docker-desktop)

- From the root directory, run `npm run docker:dev` to start the docker corresponding docker containers accordingly.

## 4. Database

- Postgres database is running from docker:dev

- For migrations in docker db, run the corresponding migrations from root directory package.json

  ```bash
  # generate
  $ npm run prisma:generate

  # migrate
  $ npm run prisma:migrate:dev
  ```

## 5. Slack

### 5.1 Create a Slack App
1. Open [https://api.slack.com/apps/new](https://api.slack.com/apps/new) and choose "From an app manifest"
2. Choose the workspace you want to install the application to
3. Copy the contents of [manifest.json](./manifest.json) into the text box that says `*Paste your manifest code here*` (within the JSON tab) and click *Next*
4. Review the configuration and click *Create*
5. Click *Install to Workspace* and *Allow* on the screen that follows. You'll then be redirected to the App Configuration dashboard.

### 5.2 Slack Environment Variables
Before you can run the app, you'll need to store some environment variables.

1. Copy `.env.sample` to `.env`
2. Open your apps configuration page from [this list](https://api.slack.com/apps), click *OAuth & Permissions* in the left hand menu, then copy the *Bot User OAuth Token* into your `.env` file under `SLACK_BOT_TOKEN`
3. Click *Basic Information* from the left hand menu and follow the steps in the *App-Level Tokens* section to create an app-level token with the `connections:write` scope. Copy that token into your `.env` as `SLACK_APP_TOKEN`.

## 6. Code Setup

- Environment Variables

  Copy the `.env.example` file to `.env` and modify the permission

  ```bash
  $ cp .env.sample .env
  $ chmod 640 .env
  ```

  - NODE_ENV
    - This env variable is checked by lot of libraries and they work faster on NODE_ENV=production.
    - Hence even on staging, set NODE_ENV=production.

- Install node modules

  ```bash
  $ npm install
  ```

- Start server

  ```bash
  $ npm run start:dev
  ```

- Fix lints and errors

  ```bash
  # automatically lint fixes
  $ npm run lint
  ```

  Fix the errors shown (can ignore warnings)


## 7. VS Code Extensions

- Install the recommended extensions for the workspace/project
- VS Code extensions (prettier, lint, markdown) are there to help keep a consistent code standard. It auto formats code on save and also will show warnings/errors to keep the code style consistent across the project