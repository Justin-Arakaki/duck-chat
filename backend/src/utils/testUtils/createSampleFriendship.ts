import { SaveOptions } from 'sequelize';
import { models } from '../../models';

export async function createSampleFriendship(
  userId1: number,
  userId2: number,
  options?: SaveOptions
) {
  try {
    const friendship = await models.Friendship.createFriend(
      userId1,
      userId2,
      options
    );
    return friendship;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
