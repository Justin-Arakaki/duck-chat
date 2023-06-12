import Friendship from './friendshipModel';
import Message from './messageModel';
import RoomMember from './roomMemberModel';
import Room from './roomModel';
import User from './userModel';

export const models = { User, Room, RoomMember, Message, Friendship };

for (const model of Object.values(models)) {
  if (!('associate' in model)) break;
  model.associate(models);
}
