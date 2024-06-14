import type { MessageElement } from '@slack/web-api/dist/response/ConversationsHistoryResponse';

export namespace CommonTypes {
  export type SlackChannelMessages = MessageElement & { name: string };

  export interface GetUserDetails {
    name: string | undefined;
    timezone: string | undefined;
  }
}
