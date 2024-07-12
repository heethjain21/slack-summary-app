import type { AllMiddlewareArgs, SlackCommandMiddlewareArgs, SlashCommand } from '@slack/bolt';
import { Frequency, SummaryType } from '@prisma/client';
import { app, prisma } from '../../../app';
import { CustomLogger } from '../../lib/logger';
import { CommonConstants } from '../../common/common.constants';
import { SlackService } from '../slack.service';

export namespace SlackCommandsService {
  const logger = new CustomLogger('SlackCommandsService');

  export const register = () => {
    app.command('/summaries', summariesCommandCallback);
  };

  const summariesCommandCallback = async ({
    command,
    ack,
    respond,
  }: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
    try {
      await ack();

      const commands = command.text.split(' ');

      switch (commands[0].toLowerCase()) {
        case CommonConstants.SlashCommandTypes.SUBSCRIBE:
          {
            const [, summaryType, frequency, summaryTime] = commands;
            const { success, error } = await handleSubscribe(command);
            if (success) {
              await respond(
                `Success: Subscribed successfully for this channel with ${summaryType} summary for ${frequency} frequency at time ${summaryTime} hours`
              );
            } else if (error) {
              await respond(error);
            }
          }
          break;
        case CommonConstants.SlashCommandTypes.UNSUBSCRIBE:
          {
            const { success, error } = await handleUnsubscribe(command);
            if (success) {
              await respond('Success: Unsubscribed all commands for this channel');
            } else if (error) {
              await respond(error);
            }
          }
          break;
        default:
          await respond('Error: Invalid command. Valid commands are subscribe / unsubscribe');
          break;
      }
    } catch (error) {
      logger.error(error);
      await respond('Error: Something went wrong internally');
    }
  };

  const handleSubscribe = async (commandDetails: SlashCommand) => {
    const { team_id, user_id, text, channel_id } = commandDetails;
    const commands = text.split(' ');
    const [, summaryType, frequency, summaryTime] = commands;

    if (!Object.values(Frequency).includes(frequency.toUpperCase() as Frequency)) {
      return {
        success: false,
        error: `Error: Invalid frequency. Valid values are ${Object.values(Frequency).join(', ')}`,
      };
    }
    if (!Object.values(SummaryType).includes(summaryType.toUpperCase() as SummaryType)) {
      return {
        success: false,
        error: `Error: Invalid summary type. Valid values are ${Object.values(SummaryType).join(
          ', '
        )}`,
      };
    }

    // Ensure the org exists or create it
    const org = await prisma.org.upsert({
      where: { slack_id: team_id },
      update: {},
      create: { slack_id: team_id },
    });

    const userDetails = await SlackService.getUserDetails(user_id);

    // Ensure the user exists or create them
    const user = await prisma.user.upsert({
      where: { slack_id_org_id: { slack_id: user_id, org_id: org.id } },
      update: {
        summary_time: parseInt(summaryTime),
      },
      create: {
        slack_id: user_id,
        org_id: org.id,
        timezone: userDetails?.timezone ?? 'Etc/UTC',
        summary_time: parseInt(summaryTime),
      },
    });

    // Insert into summaries table
    try {
      await prisma.summary.create({
        data: {
          org_id: org.id,
          user_id: user.id,
          channel_id,
          frequency: frequency.toUpperCase() as Frequency,
          type: summaryType.toUpperCase() as SummaryType,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // unique constraint failed
      if (error?.code === 'P2002') {
        return {
          success: false,
          error:
            'Error: User already subscribed for this channel with same frequency and summary type',
        };
      }
    }

    return {
      success: true,
      error: null,
    };
  };

  const handleUnsubscribe = async (commandDetails: SlashCommand) => {
    const { team_id, user_id, channel_id } = commandDetails;
    // Assuming org and user must exist at this point
    const org = await prisma.org.findUnique({
      where: { slack_id: team_id },
    });

    if (!org) {
      return {
        success: false,
        error: 'Error: Organization onboarding incomplete',
      };
    }

    const user = await prisma.user.findUnique({
      where: { slack_id_org_id: { slack_id: user_id, org_id: org.id } },
    });

    if (!user) {
      return {
        success: false,
        error: 'Error: User onboarding incomplete',
      };
    }

    // Delete the summary
    await prisma.summary.deleteMany({
      where: {
        org_id: org.id,
        user_id: user.id,
        channel_id,
      },
    });

    return {
      success: true,
      error: null,
    };
  };
}
