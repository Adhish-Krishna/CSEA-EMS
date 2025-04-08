import winston from 'winston';
import dotenv from 'dotenv';
import Transport from 'winston-transport';

import LokiTransport from 'winston-loki';

dotenv.config();

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
  })
);
const transports: Transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      format
    ),
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
];

if (process.env.LOKI_URL) {
  transports.push(
    new LokiTransport({
      host: process.env.LOKI_URL!,
      labels: { app: 'daddy-ems' },
      json: true,
      format: winston.format.json(),
      replaceTimestamp: true,
      onConnectionError: (err) => console.error(err),
    })
  );
}

const logger = winston.createLogger({
  level,
  levels,
  format,
  transports,
});

export default logger;
