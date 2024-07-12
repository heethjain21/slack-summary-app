import type { MessageElement } from '@slack/web-api/dist/response/ConversationsHistoryResponse';
import type { Channel } from '@slack/web-api/dist/response/ChannelsInfoResponse';

export namespace CommonTypes {
  export type SlackChannelMessages = MessageElement & { name: string };

  export type SlackChannelInfo = Channel;

  export interface GetUserDetails {
    name: string | undefined;
    timezone: string | undefined;
  }
}
