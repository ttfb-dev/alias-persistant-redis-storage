import { logger } from './logger.js';
import redis from "redis";
const client = redis.createClient({
  host: "prs-database-redis",
  port: 6379,
});
import { promisify } from "util";
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on("error", function (error) {
  logger.error(error, {})
});

const persistentRedisService = {
  
  set: async (prefix, key, value) => {
    try {
      return await setAsync(`${prefix}_${key}`, JSON.stringify(value));
    } catch (error) {
      logger.error(error.message, {prefix, key, value})
    }
  },

  get: async (prefix, key, def = undefined) => {
    try {
      const result = (await getAsync(`${prefix}_${key}`));
      return JSON.parse(result);
    } catch (error) {
      logger.error(error.message, {})
    }
    return def;
  },
};

export { persistentRedisService };
