import { Request, Response } from 'express';
import { models } from '../models';
import { checkRequiredField, checkUser } from '../utils/errorHandlers';
import { ForbiddenError, NotFoundError } from '../utils/errors';

export async function createRoom(req: Request, res: Response) {
  const user = req.user;
  checkUser(user);
  const { roomName } = req.body;
  checkRequiredField<string>(roomName, 'roomName', 'string');

  await models.Room.create({ name: roomName, createdBy: user.id });

  res.status(201).json({ message: 'Chatroom created successfully!' });
}

export async function joinRoom(req: Request, res: Response) {
  const user = req.user;
  checkUser(user);
  const { roomId } = req.body;
  checkRequiredField<number>(roomId, 'roomId', 'number');

  const room = await models.Room.findOne({ where: { room_id: roomId } });
  if (!room) throw new NotFoundError('Room');

  await models.RoomMember.create({ roomId: room.id, userId: user.id });

  res.status(200).json({ message: 'Chatroom joined successfully!' });
}

export async function leaveRoom(req: Request, res: Response) {
  const user = req.user;
  checkUser(user);
  const { roomId } = req.body;
  checkRequiredField<number>(roomId, 'roomId', 'number');

  const roomMember = await models.RoomMember.findOne({
    where: { user_id: user.id, room_id: roomId },
  });
  if (!roomMember)
    throw new NotFoundError('User', 'You are not in this chatroom.');

  await roomMember.destroy();

  res.status(200).json({ message: 'Chatroom left successfully!' });
}

export async function getRoomMembers(req: Request, res: Response) {
  const user = req.user;
  checkUser(user);
  const { roomId } = req.body;
  checkRequiredField<number>(roomId, 'roomId', 'number');

  const roomMember = await models.RoomMember.findAll({
    where: { user_id: user.id },
  });
  if (!roomMember) throw new ForbiddenError('You are not in this chatroom.');

  res.status(200).json({ message: 'Chatroom members received.' });
}
