import { type Context } from 'telegraf';
import { type Update } from 'telegraf/typings/core/types/typegram';
import { type UpdateType } from 'telegraf/typings/telegram-types';

import { logger } from '../../lib/utils/logger';

export function constructLogMessageFromCtx(ctx: Context): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseContextByType: Partial<Record<UpdateType, (ctx: Context<any>) => string | undefined>> =
    {
      callback_query: (ctx: Context<Update.CallbackQueryUpdate>) => {
        if ('data' in ctx.callbackQuery) {
          return ctx.callbackQuery.data;
        }

        return undefined;
      },
      channel_post: (ctx: Context<Update.ChannelPostUpdate>) => {
        if ('text' in ctx.channelPost) {
          return ctx.channelPost.text;
        }

        if ('sticker' in ctx.channelPost) {
          return ctx.channelPost.sticker.emoji;
        }

        return undefined;
      },
      chosen_inline_result: (ctx: Context<Update.ChosenInlineResultUpdate>) =>
        ctx.chosenInlineResult.query,
      edited_channel_post: (ctx: Context<Update.EditedChannelPostUpdate>) => {
        if ('text' in ctx.editedChannelPost) return ctx.editedChannelPost.text;

        return undefined;
      },
      edited_message: (ctx: Context<Update.EditedMessageUpdate>) => {
        if ('text' in ctx.editedMessage) return ctx.editedMessage.text;

        return undefined;
      },
      inline_query: (ctx: Context<Update.InlineQueryUpdate>) => ctx.inlineQuery.query,
      message: (ctx: Context<Update.MessageUpdate>) => {
        if ('text' in ctx.message) {
          return ctx.message.text;
        }
        if ('sticker' in ctx.message) {
          return ctx.message.sticker.emoji;
        }
        return undefined;
      },
      pre_checkout_query: (ctx: Context<Update.PreCheckoutQueryUpdate>) =>
        ctx.preCheckoutQuery.invoice_payload,
      shipping_query: (ctx: Context<Update.ShippingQueryUpdate>) =>
        ctx.shippingQuery.invoice_payload,

      // 🫡 TODO: If necessary, the following update types can be implemented
      // chat_member: (ctx: Context<Update.ChatMemberUpdate>) => '',
      // my_chat_member: (ctx: Context<Update.MyChatMemberUpdate>) => '',
      // poll_answer: (ctx: Context<Update.PollAnswerUpdate>) => '',
      // poll: (ctx: Context<Update.PollUpdate>) => '',
      // chat_join_request: (ctx: Context<Update.ChatJoinRequestUpdate>) => '',
    } as const;

  const logContent = parseContextByType[ctx.updateType]?.(ctx) || '';

  const chatId = ctx.chat?.id ? `(${ctx.chat.id})` : '';
  const chatTitle = ctx.chat && 'title' in ctx.chat ? `${ctx.chat.title} ` : '';

  const userName = ctx.from?.username ? `@${ctx.from.username}` : '';
  const userId = ctx.from?.id ? `(${ctx.from.id})` : '';

  return `${ctx.updateType} -> chat[${chatTitle}${chatId}] user[${userName} ${userId}]: ${logContent}`;
}

export async function logMiddleware(ctx: Context, next: () => void) {
  logger.info(constructLogMessageFromCtx(ctx));

  next();
}
