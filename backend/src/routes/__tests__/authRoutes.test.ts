import { app } from '../../app';
import { Transaction } from 'sequelize';
import request from 'supertest';
import { sequelize } from '../../utils/database';
import {
  createSampleUser,
  createSampleUserAttributes,
} from '../../utils/testUtils/createSampleUser';

describe('POST /register', () => {
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
      const user = await createSampleUserAttributes();

      const response = await request(app).post('/api/register').send({
        username: user.name,
        password: 'password123',
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: 'Account created successfully!',
      });
    });
  } catch (err) {
    console.error(err);
  }
});
