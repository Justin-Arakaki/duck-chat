/* eslint-disable no-console */
import getEnv from './getEnv';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  getEnv('DB_NAME'),
  getEnv('DB_USER'),
  getEnv('DB_PASSWORD'),
  {
    host: getEnv('DB_HOST'),
    dialect: 'mysql',
  }
);

export default async function connectToDb() {
  try {
    await sequelize.authenticate();
    console.log(`Connection to [${getEnv('DB_NAME')}] established.`);
    await sequelize.sync();
    console.log('Database synced.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
}
