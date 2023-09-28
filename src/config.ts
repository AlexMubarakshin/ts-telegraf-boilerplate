export type IConfig = {
  bot: { token: string };
  server: { port: number };
  log: { output: string };
};

function initConfig(): IConfig {
  const envs = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    SERVER_PORT: process.env.SERVER_PORT,
    LOGS_OUTPUT: process.env.LOGS_OUTPUT || 'logs.log',
  } as const;

  const requiredEnvsNames = ['BOT_TOKEN'] as const;

  requiredEnvsNames.forEach((key: keyof typeof envs) => {
    const value = !!envs[key];
    if (!value) {
      console.error(`❌ Missing env value for ${key}`);
      return process.exit(0);
    }
  });

  const config: IConfig = {
    bot: {
      token: envs.BOT_TOKEN!,
    },
    server: {
      port: Number(envs.SERVER_PORT) || 3000,
    },
    log: {
      output: envs.LOGS_OUTPUT,
    },
  };

  return config;
}

export const CONFIG: IConfig = initConfig();
