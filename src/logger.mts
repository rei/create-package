import {
  transports, format, createLogger, Logger,
} from 'winston';

/**
 * Logger factory using 'winston'
 */
export default function LoggerFactory({ level = 'info', label = '' } = {}): Logger {
  const trans = [new transports.Console({ level })];
  return createLogger({
    format: format.combine(
      format.colorize(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.label({ label: `@rei/create-package${label}` }),
      format.printf(
        (info) => `[${info.label}] ${info.level} ${info.timestamp}: ${info.message}`,
      ),
    ),
    transports: trans,
  });
}
