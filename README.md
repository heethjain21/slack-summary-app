

## 0. Table of Contents

- [0. Table of Contents](#0-table-of-contents)
- [1. System Architecture + Flowchart](#1-system-architecture--flowchart)
- [2. Database Schema](#2-database-schema)
- [3. Scope](#3-scope)
- [4. Setup](#4-setup)
- [5. Contributing](#5-contributing)


## 1. System Architecture + Flowchart

- This is an ideal architecture/flow we should have once we go live

![system](https://github-production-user-asset-6210df.s3.amazonaws.com/143497789/321708533-23c88f04-5791-41a0-8f71-84f7a2ca9fe0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240614%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240614T115220Z&X-Amz-Expires=300&X-Amz-Signature=3a4715e221bff9fff38eac1900df3cb1648ad0c946030185bed43c3e555a5e5a&X-Amz-SignedHeaders=host&actor_id=143497789&key_id=0&repo_id=785046990)

## 2. Database Schema

![schema](https://github-production-user-asset-6210df.s3.amazonaws.com/143497789/321699791-ede6ccf5-1ca4-4fee-bb23-6e69872ef63d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240614%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240614T115229Z&X-Amz-Expires=300&X-Amz-Signature=6caff96ef153665ab9dc983180e01432e788a1c59f2a983b2b5fc928c11e4d42&X-Amz-SignedHeaders=host&actor_id=143497789&key_id=0&repo_id=785046990)

## 3. Scope

Basic features for the app:
- The user can subscribe/unsubscribe from #general and #random (currently there is unsubscribe all, and not individual)
- The user can choose the time for the daily summary (in their time zone only)
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

## 4. Setup

To set up this project on your local machine, please follow the instructions in the [Setup Guide](./SETUP.md).

## 5. Contributing

Please review the [Contribution Guidelines](./CONTRIBUTING.md) before getting started.
It has all the rules, details, and steps about the code and how to contribute.