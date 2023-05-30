/* eslint-disable no-console */
import mysql from 'mysql2';

export default function mysqlConnect(connection: mysql.Connection) {
  const dbName = connection.config.database;
  return new Promise<void>((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL database:', err);
        reject(err);
        return;
      }
      console.log(`Connected to MySQL database: ${dbName}`);
      resolve();
    });
  });
}
