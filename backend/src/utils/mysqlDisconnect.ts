/* eslint-disable no-console */
import mysql from 'mysql2';

export default function mysqlDisconnect(connection: mysql.Connection) {
  const dbName = connection.config.database;
  return new Promise<void>((resolve, reject) => {
    connection.end((err) => {
      if (err) {
        console.error('Error disconnecting from MySQL database:', err);
        reject(err);
        return;
      }
      console.log(`Disconnected from MySQL database: ${dbName}.`);
      resolve();
    });
  });
}
