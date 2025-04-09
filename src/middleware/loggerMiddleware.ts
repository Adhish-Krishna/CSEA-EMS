import expressWinston from 'express-winston';
import winston from 'winston';
import Transport from 'winston-transport';
import LokiTransport from 'winston-loki';
import dotenv from 'dotenv';

dotenv.config();

const requestTransports: Transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
  new winston.transports.File({ filename: 'logs/requests.log' }),
];

if (process.env.LOKI_URL) {
  requestTransports.push(
    new LokiTransport({
      host: process.env.LOKI_URL,
      labels: { 
        job:'daddy-ems-backend-routes',
        app: 'daddy-ems-requests' },
      json: true,
      format: winston.format.json(),
      replaceTimestamp: true,
      onConnectionError: (err) => console.error(err),
    })
  );
}

const requestLoggerInstance = winston.createLogger({
  transports: requestTransports,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

export const requestLogger = expressWinston.logger({
  winstonInstance: requestLoggerInstance,
  msg: "HTTP {{req.method}} {{req.url}}",
  meta: true,
  colorize: false,
  requestWhitelist: ['headers', 'query', 'body'],
  responseWhitelist: ['statusCode', 'body'],
  ignoreRoute: () => false
});

const errorTransports: Transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
  new winston.transports.File({ filename: 'logs/http-errors.log' }),
];

if (process.env.LOKI_URL) {
  errorTransports.push(
    new LokiTransport({
      host: process.env.LOKI_URL,
      labels: { app: 'daddy-ems-errors' },
      json: true,
      format: winston.format.json(),
      replaceTimestamp: true,
      onConnectionError: (err) => console.error(err),
    })
  );
}

const errorLoggerInstance = winston.createLogger({
  transports: errorTransports,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

export const errorLogger = expressWinston.errorLogger({
  winstonInstance: errorLoggerInstance,
  msg: "HTTP {{req.method}} {{req.url}}",
  meta: true
});
