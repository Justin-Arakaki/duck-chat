/* eslint-disable no-console */
import '../utils/setupDotenv';
import { seedDb } from './seedDb';
import { sequelize } from '../utils/database';
import { seedConfig } from '../config/seedConfig';

const {
  USER_AMOUNT,
  ROOM_AMOUNT,
  MAX_USERS_PER_ROOM,
  MAX_MESSAGES_PER_USER,
  FRIENDSHIP_AMOUNT,
} = seedConfig;

console.log('Synchronizing sequelize...');
await sequelize.sync();
console.log('COMPLETED');

console.log('Seeding database...');
await seedDb(
  USER_AMOUNT,
  ROOM_AMOUNT,
  FRIENDSHIP_AMOUNT,
  MAX_USERS_PER_ROOM,
  MAX_MESSAGES_PER_USER
);
console.log('COMPLETED');

await sequelize.close();
