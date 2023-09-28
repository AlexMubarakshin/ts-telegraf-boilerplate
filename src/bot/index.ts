import { Telegraf } from 'telegraf';

import { StartCommand } from './commands/start';
import { logMiddleware } from './middlwares/log';

export function createBot(token: string) {
  const startCommand = new StartCommand();

  const bot = new Telegraf(token);

  bot.use(logMiddleware);

  bot.start(startCommand.execute);

  return bot;
}
