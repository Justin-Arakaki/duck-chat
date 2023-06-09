import { SaveOptions } from 'sequelize';
import { models } from '../../models';

export async function createSampleRoomMember(
  userId: number,
  roomId: number,
  options?: SaveOptions
) {
  try {
    const roomMember = await models.RoomMember.create(
      {
        userId,
        roomId,
      },
      options
    );
    return roomMember;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
