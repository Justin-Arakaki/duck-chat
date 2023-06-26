import { createSampleUser } from './testUtils/createSampleUser';
import Room from '../models/roomModel';
import User from '../models/userModel';

const USER_AMOUNT = 10;
const MESSAGE_AMOUNT = 30;
const ROOM_AMOUNT = 1;

export default async function seedUsers(userAmount: number) {
  const userPromises: Promise<User>[] = [];

  for (let i = 0; i < userAmount; i++) {
    userPromises.push(createSampleUser());
  }

  return await Promise.all(userPromises);
}
