

## 0. Table of Contents

- [0. Table of Contents](#0-table-of-contents)
- [1. Introduction](#1-introduction)
- [2. System Architecture + Flowchart](#2-system-architecture--flowchart)
- [3. Database Schema](#3-database-schema)
- [4. Scope](#4-scope)
- [5. Setup](#5-setup)
- [6. Contributing](#6-contributing)
- [7. Improvements](#7-improvements)

## 1. Introduction

- This is a Slack app which summarizes all the chats in selected/enabled channels and gives it to the user according to the priorities and user selected time
- The basic version only has limited features mentioned in the [Scope](#4-scope) section

- Here is a video for project demonstration + going over the technical aspects and details:

[![Video](https://github.com/heethjain21/slack-summary-app/assets/143497789/f9ed9c55-9770-4be2-9b24-fffd3415d508)](https://share.cleanshot.com/bxHHrfCz)

## 2. System Architecture + Flowchart

- This is an ideal architecture/flow we should have once we go live for the first version (v1)

![system](https://github.com/heethjain21/slack-summary-app/assets/143497789/e52a219d-7120-4d4e-8861-65de0ef731b9)

## 3. Database Schema

![schema](https://github.com/heethjain21/slack-summary-app/assets/143497789/8265ecd5-03de-4c5f-adea-664e43e10825)

## 4. Scope

Basic features for the app:
- The user can subscribe/unsubscribe from any channel which the Bot has access to (currently there is unsubscribe all for each channel, and not individual)
- The user can choose the time for the summary (in their time zone only). 
- Currently the summary_time is global i.e one summary time for per user and it will be same for all the types of summaries/channels.
- Only consider text input for now
- Summarize by priority of the messages (for now this is just a prompt)
- Give user the ability to customize/configure summary
  - Want summary in detail or brief?

Future scope:
- The user the ability to turn the daily summary on/off (currently have to subscribe/unsubscribe from each channel)
- Feedback for each summary (Helps in understanding if summary was helpful or not)
- Include media into summary like images, videos, pdfs and so on
- Add interactive elements like buttons for example to read more and so on
- Chat with the bot to know more about the summary/messages (like chat with pdf apps, but here the user will chat with the data of the messages)
- Ability to change frequency (twice a day, or auto send summary after a certain number of messages)
- A Slack Modal/popup for managing all these preferences instead of commands
- Templates and presets for summary setup and configuration
- Track custom keywords (example tracking based on the project name "project-xyz")
- More customizations like summary according to their roles. eg a developer only receiving summary of dev related work
- Summary Priority based config
  - Do you only want to recieve summary for urgent messages or all messages or something like that?
  - Have custom keywords / codewords setup by the team, and if a message contains those codewords using by using ! before, it means a certain priroity, like !important or !urgent and so on
- Adaptive summaries
  - improve prompts / summaries based on the feedback provided for summaries
- Team based settings for summaries (like a common channel for team)
  
## 5. Setup

To set up this project on your local machine, please follow the instructions in the [Setup Guide](./SETUP.md).

## 6. Contributing

Please review the [Contribution Guidelines](./CONTRIBUTING.md) before getting started.
It has all the rules, details, and steps about the code and how to contribute.

## 7. Improvements

This is a very basic version, and of course it misses a lot of things that we'd want to have on production app,
  - Test cases (Slack Bolt library does not support test cases. Ref: https://github.com/slackapi/bolt-js/issues/1336#issuecomment-1051105251)
  - Code observability (logging, monitoring, etc) + alerts
  - CI/CD pipeline for deployments (currently it only has lint checks)
  - More code documentation
