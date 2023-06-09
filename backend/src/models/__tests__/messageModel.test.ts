import '../../utils/setupDotenv';
import { models } from '..';
import { SaveOptions, Transaction } from 'sequelize';
import { sequelize } from '../../utils/database';
import { createSampleMessage } from '../../utils/testUtils/createSampleMessage';
import { createSampleRoom } from '../../utils/testUtils/createSampleRoom';
import { createSampleUser } from '../../utils/testUtils/createSampleUser';

describe('Message Model', () => {
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

  it('should create a new message', async () => {
    const { user, room, message } = await createSamples({ transaction });

    expect(message.id).toBeDefined();
    expect(message.roomId).toBe(room.id);
    expect(message.userId).toBe(user.id);
    expect(message.message).toBe('Hello, world!');
  });

  it('should retrieve a message', async () => {
    const { message } = await createSamples({ transaction });
    let retrievedMessage;

    try {
      retrievedMessage = await models.Message.findByPk(message.id, {
        transaction,
      });
    } catch (err) {
      console.error(err);
    }

    expect(retrievedMessage?.id).toBe(message.id);
    expect(retrievedMessage?.roomId).toBe(message.roomId);
    expect(retrievedMessage?.userId).toBe(message.userId);
    expect(retrievedMessage?.message).toBe(message.message);
  });

  it('should update a message', async () => {
    const { message } = await createSamples({ transaction });

    try {
      await message.update({ message: 'Updated message' }, { transaction });
    } catch (err) {
      console.error(err);
    }

    expect(message.message).toBe('Updated message');
  });

  it('should delete a message', async () => {
    const { message } = await createSamples({ transaction });
    let retrievedMessage;

    try {
      await message.destroy({ transaction });
      retrievedMessage = await models.Message.findByPk(message.id, {
        transaction,
      });
    } catch (err) {
      console.error(err);
    }

    expect(retrievedMessage).toBeNull();
  });
});

async function createSamples(options: SaveOptions) {
  const user = await createSampleUser(options);
  const room = await createSampleRoom(user.id, options);
  const message = await createSampleMessage(user.id, room.id, options);

  return { user, room, message };
}
