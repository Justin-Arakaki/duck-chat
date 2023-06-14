import { app } from '../../app';
import { SaveOptions, Transaction } from 'sequelize';
import request from 'supertest';
import { sequelize } from '../../utils/database';
import { createSampleMessage } from '../../utils/testUtils/createSampleMessage';
import { createSampleRoom } from '../../utils/testUtils/createSampleRoom';
import { createSampleUser } from '../../utils/testUtils/createSampleUser';

describe('POST /login', () => {
  let transaction: Transaction;

  beforeEach(async () => {
    await sequelize.sync();
    transaction = await sequelize.transaction();
  });

  afterEach(async () => {
    await transaction.rollback();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  try {
    it('should return a 200 status code and a success message', async () => {
      const user = await createSampleUser({ transaction });
      const response = await request(app).post('/login').send({
        username: user.name,
        password: 'password123',
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Login successful' });
    });
  } catch (err) {
    console.error(err);
  }
});
