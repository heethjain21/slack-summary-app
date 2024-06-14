import { App, LogLevel } from '@slack/bolt';
import * as dotenv from 'dotenv';
import { CronJob } from 'cron';
import { SummaryService } from './src/services/summary.service';
import { PrismaClient } from '@prisma/client';
import { SlackService } from './src/services/slack.service';
dotenv.config();

export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.DEBUG,
});

export const job = new CronJob(
  '*/30 * * * *', // run every 30 mins
  SummaryService.runSummaries
);

export const prisma = new PrismaClient();

export async function main() {
  try {
    prisma.$connect();
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running! ⚡️');
  } catch (error) {
    console.error('Unable to start App', error);
  }
}

main();
job.start();
SlackService.register();
