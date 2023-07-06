import getEnv from './getEnv';
import * as Redis from 'redis';

export const redisClient = Redis.createClient({
  socket: {
    host: getEnv('REDIS_HOST'),
    port: getEnv('REDIS_PORT'),
  },
});

redisClient.on('error', (err) => {
  console.error('Could not establish a connection with redis. ' + err);
});

redisClient.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Connected to redis successfully');
});

redisClient.connect();
