import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const logDir = 'logs';

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d'
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.prettyPrint()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        })
      )
    }),
    dailyRotateFileTransport
  ]
});

export default logger;
