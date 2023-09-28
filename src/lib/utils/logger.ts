import winston from 'winston';

import { CONFIG } from '../../config';

function createLogger(logFileName: string): winston.Logger {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      }),
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: logFileName }),
    ],
  });
}

export const logger = createLogger(CONFIG.log.output);
