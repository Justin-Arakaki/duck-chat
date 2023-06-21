/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import mysql from 'mysql2';
import mysqlConnect from '../utils/mysqlConnect';
import mysqlDisconnect from '../utils/mysqlDisconnect';
import hashPassword from '../utils/passwordUtils';

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

seedSampleData();

async function seedSampleData() {
  await mysqlConnect(connection);
  await insertFaker(20);
  await mysqlDisconnect(connection);
}

function insertFaker(numEntries: number) {
  console.log('Populating database...');
  return new Promise<void>((resolve) => {
    const fakey = {
      name: faker.internet.userName(),
      password: hashPassword(faker.internet.password()),
    };

    for (let i = 0; i < numEntries; i++) {
      connection.query('INSERT INTO users SET ?', fakey, (err) => {
        if (err) throw err;
      });
    }
    resolve();
  }).catch((err) => {
    console.error('Error inserting sample data:', err);
    throw err;
  });
}
