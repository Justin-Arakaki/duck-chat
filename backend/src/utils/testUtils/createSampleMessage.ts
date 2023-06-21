import { SaveOptions } from 'sequelize';
import { models } from '../../models';

export async function createSampleMessage(
  userId: number,
  roomId: number,
  options?: SaveOptions
) {
  try {
    const message = await models.Message.create(
      {
        userId,
        roomId,
        message: 'Hello, world!',
      },
      options
    );
    return message;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
