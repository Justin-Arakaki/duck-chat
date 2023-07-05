import { hashPassword } from '../passwordUtils';
import { LoremIpsum } from 'lorem-ipsum';
import { SaveOptions } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { models } from '../../models';

export async function createSampleUser(options?: SaveOptions) {
  try {
    const defaultAttributes = await createSampleUserAttributes();

    const user = models.User.create(defaultAttributes, options);

    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

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

export async function createSampleMessage(
  userId: number,
  roomId: number,
  options?: SaveOptions
) {
  try {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4,
      },
      wordsPerSentence: {
        max: 16,
        min: 4,
      },
    });
    const message = await models.Message.create(
      {
        userId,
        roomId,
        message: lorem.generateParagraphs(1),
      },
      options
    );
    return message;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

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

export async function createSampleUserAttributes() {
  const name = `JohnDoe_${uuidv4()}`;
  const hashedPassword = await hashPassword('password123');

  return { name, hashedPassword };
}
