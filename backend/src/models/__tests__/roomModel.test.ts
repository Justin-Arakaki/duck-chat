import '../../utils/setupDotenv';
import { models } from '..';
import { SaveOptions, Transaction } from 'sequelize';
import { sequelize } from '../../utils/database';
import { createSampleRoom } from '../../utils/testUtils/createSampleRoom';
import { createSampleUser } from '../../utils/testUtils/createSampleUser';

describe('Room Model', () => {
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

  it('should create a new room', async () => {
    const { user, room } = await createSamples({ transaction });

    expect(room.id).toBeDefined();
    expect(room.name).toBeDefined();
    expect(room.createdBy).toBe(user.id);
  });

  it('should retrieve a room', async () => {
    const { room } = await createSamples({ transaction });
    let retrievedRoom;

    try {
      retrievedRoom = await models.Room.findByPk(room.id, { transaction });
    } catch (err) {
      console.error(err);
    }

    expect(retrievedRoom?.id).toBe(room.id);
    expect(retrievedRoom?.name).toBe(room.name);
    expect(retrievedRoom?.createdBy).toBe(room.createdBy);
  });

  it('should update a room', async () => {
    const { room } = await createSamples({ transaction });

    try {
      await room.update({ name: 'Updated Room' }, { transaction });
    } catch (err) {
      console.error(err);
    }

    expect(room.name).toBe('Updated Room');
  });

  it('should delete a room', async () => {
    const { room } = await createSamples({ transaction });
    let retrievedRoom;

    try {
      await room.destroy({ transaction });
      retrievedRoom = await models.Room.findByPk(room.id, { transaction });
    } catch (err) {
      console.error(err);
    }

    expect(retrievedRoom).toBeNull();
  });
});

async function createSamples(options: SaveOptions) {
  const user = await createSampleUser(options);
  const room = await createSampleRoom(user.id, options);

  return { user, room };
}
