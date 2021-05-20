import { Logger } from '@ttfb/aliasgame';
const host = process.env.LOGGER_HOST;
const service = 'prs';

const logger = new Logger(host, service);

export {
  logger,
}
