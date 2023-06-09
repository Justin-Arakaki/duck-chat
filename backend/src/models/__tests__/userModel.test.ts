import '../../utils/setupDotenv';
import { models } from '..';
import User from '../userModel';
import { Transaction } from 'sequelize';
import { sequelize } from '../../utils/database';
import {
  createSampleUser,
  createSampleUserAttributes,
} from '../../utils/testUtils/createSampleUser';

describe('User Model', () => {
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

  it('should create a new user', async () => {
    const attributes = await createSampleUserAttributes();
    const user = await models.User.create(attributes, { transaction });

    expect(user.id).toBeDefined();
    expect(user.name).toBe(attributes.name);
    expect(user.hashedPassword).toBe(attributes.hashedPassword);
  });

  it('should retrieve a user', async () => {
    const user = await createSampleUser({ transaction });
    let retrievedUser;

    try {
      retrievedUser = await User.findByPk(user.id, { transaction });
    } catch (err) {
      console.error(err);
    }

    expect(retrievedUser?.id).toBe(user.id);
    expect(retrievedUser?.name).toBe(user.name);
    expect(retrievedUser?.hashedPassword).toBe(user.hashedPassword);
  });

  it('should update a user', async () => {
    const user = await createSampleUser({ transaction });

    try {
      await user.update({ name: 'NewName' }, { transaction });
    } catch (err) {
      console.error(err);
    }

    expect(user.name).toBe('NewName');
  });

  it('should delete a user', async () => {
    const user = await createSampleUser({ transaction });
    let retrievedUser;

    try {
      await user.destroy({ transaction });
      retrievedUser = await User.findByPk(user.id, { transaction });
    } catch (err) {
      console.error(err);
    }

    expect(retrievedUser).toBeNull();
  });

  it('should update last login', async () => {
    const user = await createSampleUser({ transaction });

    try {
      await user.updateLastLogin({ transaction });
    } catch (err) {
      console.error(err);
    }

    const updatedUser = await models.User.findByPk(user.id, { transaction });

    expect(updatedUser?.lastLogin).toBeInstanceOf(Date);
  });
});
