import '../../utils/setupDotenv';
import RoomMember from '../roomMemberModel';
import { SaveOptions, Transaction } from 'sequelize';
import { sequelize } from '../../utils/database';
import { createSampleRoom } from '../../utils/testUtils/createSampleRoom';
import { createSampleRoomMember } from '../../utils/testUtils/createSampleRoomMember';
import { createSampleUser } from '../../utils/testUtils/createSampleUser';

describe('RoomMember Model', () => {
  let transaction: Transaction;

  try {
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

    it('should create a new room member', async () => {
      const { user, room, roomMember } = await createSamples({ transaction });

      expect(roomMember.id).toBeDefined();
      expect(roomMember.roomId).toBe(room.id);
      expect(roomMember.userId).toBe(user.id);
    });

    it('should retrieve a room member', async () => {
      const { roomMember } = await createSamples({ transaction });

      const retrievedRoomMember = await RoomMember.findByPk(roomMember.id, {
        transaction,
      });

      expect(retrievedRoomMember?.id).toBe(roomMember.id);
      expect(retrievedRoomMember?.roomId).toBe(roomMember.roomId);
      expect(retrievedRoomMember?.userId).toBe(roomMember.userId);
    });

    it('should update a room member', async () => {
      const { room, roomMember } = await createSamples({ transaction });

      await roomMember.update({ roomId: room.id }, { transaction });

      expect(roomMember.roomId).toBe(room.id);
    });

    it('should delete a room member', async () => {
      const { roomMember } = await createSamples({ transaction });

      await roomMember.destroy({ transaction });
      const retrievedRoomMember = await RoomMember.findByPk(roomMember.id, {
        transaction,
      });

      expect(retrievedRoomMember).toBeNull();
    });
  } catch (err) {
    console.error(err);
  }
});

async function createSamples(options?: SaveOptions) {
  const user = await createSampleUser(options);
  const room = await createSampleRoom(user.id, options);
  const roomMember = await createSampleRoomMember(user.id, room.id, options);

  return { user, room, roomMember };
}
