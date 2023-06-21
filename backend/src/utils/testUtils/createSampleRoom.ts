import { SaveOptions } from 'sequelize';
import { models } from '../../models';

export async function createSampleRoom(userId: number, options?: SaveOptions) {
  try {
    const name = 'Test Room';
    const room = await models.Room.create(
      {
        name,
        createdBy: userId,
      },
      options
    );
    return room;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
