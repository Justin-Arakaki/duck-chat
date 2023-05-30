/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME ?? 'quackchat',
  process.env.DB_USER ?? 'root',
  process.env.DB_PASSWORD ?? 'root',
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

export default async function connectToDb() {
  try {
    await sequelize.authenticate();
    console.log(`Connection to ${process.env.DB_NAME} established.`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
