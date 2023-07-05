import '../../utils/setupDotenv';
import { seedDb } from '../seedDb';
import { Transaction } from 'sequelize';
import { sequelize } from '../../utils/database';

describe('seedDb', () => {
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

  it('should create new entries', async () => {
    const entries = await seedDb(40, 7, 5, 5, 120, { transaction });

    expect(entries).toHaveProperty('users');
    expect(entries).toHaveProperty('rooms');
    expect(entries).toHaveProperty('friendships');
    expect(entries).toHaveProperty('roomMembers');
    expect(entries).toHaveProperty('messages');

    expect(Array.isArray(entries.users)).toBe(true);
    expect(Array.isArray(entries.rooms)).toBe(true);
    expect(Array.isArray(entries.friendships)).toBe(true);
    expect(Array.isArray(entries.roomMembers)).toBe(true);
    expect(Array.isArray(entries.messages)).toBe(true);

    expect(entries.users).toHaveLength(40);
    expect(entries.rooms).toHaveLength(7);
    expect(entries.friendships).toHaveLength(5);
  }, 15000);
});
