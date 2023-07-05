import {
  createSampleUser,
  createSampleRoom,
  createSampleRoomMember,
  createSampleMessage,
  createSampleFriendship,
} from './testUtils/createSample';
import { SaveOptions } from 'sequelize';
import Friendship from '../models/friendshipModel';
import Message from '../models/messageModel';
import RoomMember from '../models/roomMemberModel';
import Room from '../models/roomModel';
import User from '../models/userModel';

export async function seedDb(
  userAmount: number,
  roomAmount: number,
  friendshipAmount: number,
  maxUsersPerRoom: number,
  maxMessagesPerUser: number,
  options?: SaveOptions
) {
  const users = await seedUsers(userAmount, options);
  const rooms = await seedRooms(roomAmount, users, options);
  const friendshipPromises = seedFriendships(friendshipAmount, users, options);
  const roomMembers = await seedRoomMembers(
    maxUsersPerRoom,
    rooms,
    users,
    options
  );
  const messagesPromises = seedMessages(
    maxMessagesPerUser,
    roomMembers,
    options
  );

  const seededData = {
    users,
    rooms,
    friendships: await friendshipPromises,
    roomMembers,
    messages: await messagesPromises,
  };

  return seededData;
}

export async function seedUsers(userAmount: number, options?: SaveOptions) {
  const userPromises: Promise<User>[] = [];

  for (let i = 0; i < userAmount; i++) {
    const userPromise = createSampleUser(options);

    userPromises.push(userPromise);
  }

  return Promise.all(userPromises);
}

export async function seedRooms(
  roomAmount: number,
  users: User[],
  options?: SaveOptions
) {
  const roomPromises: Promise<Room>[] = [];

  for (let i = 0; i < roomAmount; i++) {
    const randomUser = getRandomElement(users);
    const roomPromise = createSampleRoom(randomUser.id, options);

    roomPromises.push(roomPromise);
  }

  return Promise.all(roomPromises);
}

export async function seedRoomMembers(
  maxUsersPerRoom: number,
  rooms: Room[],
  users: User[],
  options?: SaveOptions
) {
  const roomMemberPromises: Promise<RoomMember>[] = [];

  for (const room of rooms) {
    const usersAmount = Math.ceil(Math.random() * maxUsersPerRoom);
    const usedUsers: Set<number> = new Set();

    while (usedUsers.size < usersAmount) {
      const user = getRandomElement(users).id;

      if (!usedUsers.has(user)) {
        const roomMemberPromise = createSampleRoomMember(
          user,
          room.id,
          options
        );

        roomMemberPromises.push(roomMemberPromise);
        usedUsers.add(user);
      }
    }
  }

  return Promise.all(roomMemberPromises);
}

export async function seedMessages(
  maxMessagesPerRoomMember: number,
  roomMembers: RoomMember[],
  options?: SaveOptions
) {
  const messagePromises: Promise<Message>[] = [];

  for (const roomMember of roomMembers) {
    const messageAmount = Math.ceil(Math.random() * maxMessagesPerRoomMember);

    for (let i = 0; i < messageAmount; i++) {
      const messagePromise = createSampleMessage(
        roomMember.userId,
        roomMember.roomId,
        options
      );

      messagePromises.push(messagePromise);
    }
  }

  return Promise.all(messagePromises);
}

export async function seedFriendships(
  friendshipAmount: number,
  users: User[],
  options?: SaveOptions
) {
  const friendshipPromises: Promise<Friendship>[] = [];
  const usedPairs: Set<string> = new Set();

  while (friendshipPromises.length < friendshipAmount) {
    const user1 = getRandomElement(users).id;
    const user2 = getRandomElement(users).id;
    const pair1 = `${user1}:${user2}`;
    const pair2 = `${user2}:${user1}`;
    const isValidPair =
      user1 !== user2 && !usedPairs.has(pair1) && !usedPairs.has(pair2);

    if (isValidPair) {
      const friendshipPromise = createSampleFriendship(user1, user2, options);

      friendshipPromises.push(friendshipPromise);
      usedPairs.add(pair1);
    }
  }

  return Promise.all(friendshipPromises);
}

function getRandomElement<T>(arr: T[], exclude?: number[]): T {
  const filteredArr = exclude
    ? arr.filter((_, index) => !exclude.includes(index))
    : arr;
  const randomIndex = Math.floor(Math.random() * filteredArr.length);
  const randomElement = arr[randomIndex];

  return randomElement;
}
