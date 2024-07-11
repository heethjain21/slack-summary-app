import axios from 'axios';
import type { Summary, User } from '@prisma/client';
import { prisma } from '../../app';
import { SlackService } from './slack.service';
import { CommonUtils } from '../common/common.utils';
import { CustomLogger } from '../lib/logger';
import type { CommonTypes } from '../common/common.types';

export namespace SummaryService {
  const logger = new CustomLogger('SummaryService');

  export async function generateSummary(
    messages: CommonTypes.SlackChannelMessages[],
    summary: Summary,
    channel: CommonTypes.SlackChannelInfo
  ): Promise<string | undefined> {
    try {
      const formattedMessages = messages
        .map((msg) => `${msg.name}: ${msg.text}`)
        .join('\n\nEND_OF_A_MESSAGE\n\n');

      const data = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Summarize the following conversation in ${summary.type}. On the top of the message, also mention the Channel Name like this: "Channel Name: ${channel.name}". Format with bullets (DO NOT USE MARKDOWN) and also format using priority, so its easier to read. Each message is separated by 'END_OF_A_MESSAGE'`,
          },
          { role: 'user', content: formattedMessages },
        ],
      };

      const res = await axios.post('https://api.openai.com/v1/chat/completions', data, {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      return res.data.choices[0].message.content as string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error(
        err?.response?.data,
        `error while generating summary for summary: ${summary.id}`
      );
      return undefined;
    }
  }

  export async function sendSummary(user: User, summary: Summary, from: number, to: number) {
    try {
      const messages = await SlackService.fetchMessages(summary.channel_id, from, to);
      const channel = await SlackService.getChannelDetails(summary.channel_id);
      if (messages.length === 0) return;

      const summaryMessage = await generateSummary(messages, summary, channel);
      if (!summaryMessage) {
        logger.warn(`summary generation failed for user ${user.id} summary ${summary.id}`);
        return;
      }

      logger.log(`sending summary to ${user.id}: ${summary}`);

      const { success } = await SlackService.sendDirectMessage(user.slack_id, summaryMessage);

      if (success) {
        await prisma.log.create({
          data: {
            summary_id: summary.id,
            last_timestamp: new Date(Number(to) * 1000).toISOString(),
          },
        });
        logger.log(`log entry created for user ${user.id} summary ${summary.id} `);
      } else {
        logger.warn(`Sending summary to ${user.id}: ${summary}`);
      }
    } catch (error) {
      logger.error(error, `error while generating and sending summary for user ${user.id}`);
    }
  }

  export async function runSummaries() {
    try {
      const users = await prisma.user.findMany();

      await Promise.all(
        // run checks and generation for every user in parallel
        users.map(async (user) => {
          try {
            const isTimeForSummary = CommonUtils.isTimeForSummary(user.timezone, user.summary_time);
            if (isTimeForSummary) {
              const summaries = await prisma.summary.findMany({
                where: { user_id: user.id },
              });

              const { startOfDay, endOfDay } = CommonUtils.getPreviousDayRange(user.timezone);

              // running each summary for each user in series
              await Promise.all(
                summaries.map(async (summary) => {
                  try {
                    const alreadySent = await prisma.log.findFirst({
                      where: {
                        summary_id: summary.id,
                        last_timestamp: {
                          lte: new Date(Number(endOfDay) * 1000).toISOString(),
                        },
                      },
                    });

                    if (!alreadySent) {
                      await sendSummary(user, summary, startOfDay, endOfDay);
                    } else {
                      logger.log(`summary already sent to ${user.id} for the previous date`);
                    }
                  } catch (error) {
                    logger.error(
                      error,
                      `error while running summary for user ${user.id}, summary: ${summary.id}`
                    );
                  }
                })
              );
            }
          } catch (error) {
            logger.error(error, `error while running summaries for user ${user.id}`);
          }
        })
      );
    } catch (error) {
      logger.error(error, 'error while running summaries for all users');
    }
  }
}
