import 'dotenv/config';

import { CONFIG } from './config';

import { createServer } from './server';

import { createBot } from './bot';

function main(): void {
  const server = createServer();

  server.listen(CONFIG.server.port, () => {
    console.log(`💨 Server is running on port ${CONFIG.server.port}`);
  });

  const bot = createBot(CONFIG.bot.token);

  process.once('SIGINT', () => {
    bot.stop('SIGINT');
    server.close();
  });

  process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
    server.close();
  });

  console.log('💨 Bot is running');

  bot.launch();
}

main();
