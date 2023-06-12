import Friendship from './friendshipModel';
import Message from './messageModel';
import RoomMember from './roomMemberModel';
import Room from './roomModel';
import User from './userModel';

export interface Models {
  User: typeof User;
  Room: typeof Room;
  RoomMember: typeof RoomMember;
  Message: typeof Message;
  Friendship: typeof Friendship;
}
