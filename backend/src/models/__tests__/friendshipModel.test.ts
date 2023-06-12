import '../../utils/setupDotenv';
import Friendship from '../friendshipModel';
import { SaveOptions, Transaction } from 'sequelize';
import { sequelize } from '../../utils/database';
import { createSampleFriendship } from '../../utils/testUtils/createSampleFriendship';
import { createSampleUser } from '../../utils/testUtils/createSampleUser';

describe('Friendship Model', () => {
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

    it('should create a new friendship', async () => {
      const { user1, user2, friendship } = await createSamples({ transaction });

      expect(friendship.userId1).toBe(user1.id);
      expect(friendship.userId2).toBe(user2.id);
    });

    // TODO: This causes error to log
    it('should create only unique friendships', async () => {
      const { user1, user2 } = await createSamples({ transaction });

      const createCloneFriendship = async () => {
        await createSampleFriendship(user1.id, user2.id, { transaction });
      };
      const createSwappedFriendship = async () => {
        await createSampleFriendship(user2.id, user1.id, { transaction });
      };

      await expect(createCloneFriendship()).rejects.toThrow();
      await expect(createSwappedFriendship()).rejects.toThrow();
    });

    it('should retrieve a friendship', async () => {
      const { user1, user2, friendship } = await createSamples({ transaction });

      const retrievedFriendship = await Friendship.findByCompositeKey(
        user1.id,
        user2.id,
        transaction
      );
      const inverseFriendship = await Friendship.findByCompositeKey(
        user2.id,
        user1.id,
        transaction
      );

      expect(retrievedFriendship?.userId1).toBe(friendship.userId1);
      expect(retrievedFriendship?.userId2).toBe(friendship.userId2);
      expect(inverseFriendship?.userId1).toBe(friendship.userId1);
      expect(inverseFriendship?.userId2).toBe(friendship.userId2);
    });

    it('should delete a friendship', async () => {
      const { user1, user2, friendship } = await createSamples({ transaction });

      await friendship.destroy({ transaction });
      const retrievedfriendship = await Friendship.findByCompositeKey(
        user1.id,
        user2.id,
        transaction
      );

      expect(retrievedfriendship).toBeNull();
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
});

async function createSamples(options?: SaveOptions) {
  const user1 = await createSampleUser(options);
  const user2 = await createSampleUser(options);
  const friendship = await createSampleFriendship(user1.id, user2.id, options);

  return { user1, user2, friendship };
}
