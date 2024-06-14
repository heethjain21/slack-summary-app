import { app } from '../../app';
import type { CommonTypes } from '../common/common.types';
import { CustomLogger } from '../lib/logger';
import { SlackCommandsService } from './slack/commands.slack.service';

export namespace SlackService {
  const logger = new CustomLogger('SlackService');

  export async function register() {
    SlackCommandsService.register();
  }

  export async function getUserDetails(
    userId: string
  ): Promise<CommonTypes.GetUserDetails | undefined> {
    try {
      const result = await app.client.users.info({
        user: userId,
        token: process.env.SLACK_BOT_TOKEN, // Ensure your bot token is accessible here
      });

      if (result.user && (result.user.real_name || result.user.name)) {
        return {
          name: result.user.real_name ?? result.user.name,
          timezone: result.user.tz,
        };
      }
      logger.warn(`slack user not found or an error occurred for user ${userId}`);
      return undefined;
    } catch (error) {
      logger.error(`error fetching user details for slack user: ${error}`);
      return undefined;
    }
  }

  export async function sendDirectMessage(channelId: string, messageText: string) {
    try {
      await app.client.chat.postMessage({
        channel: channelId,
        text: messageText,
        mrkdwn: true,
        token: process.env.SLACK_BOT_TOKEN,
      });
      return { success: true };
    } catch (error) {
      logger.error(`error sending message to ${channelId}: ${error}`);
      return { success: false };
    }
  }

  export async function fetchMessages(
    channelId: string,
    from: number,
    to: number
  ): Promise<CommonTypes.SlackChannelMessages[] | []> {
    try {
      const historyResult = await app.client.conversations.history({
        channel: channelId,
        oldest: from.toString(),
        latest: to.toString(),
        token: process.env.SLACK_BOT_TOKEN, // Ensure your bot token is accessible here
      });

      if (!historyResult.messages) return [];

      const messagesWithUserName = await Promise.all(
        historyResult.messages.map(async (message) => {
          const userDetails = await SlackService.getUserDetails(message.user ?? '');
          return { name: userDetails?.name ?? '', ...message };
        })
      );

      return messagesWithUserName;
    } catch (error) {
      logger.error(`error fetching messages for ${channelId} between ${from} and ${to}`);
      return [];
    }
  }
}
