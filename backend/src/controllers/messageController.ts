import { redisClient } from '../utils/redisClient';
import { Request, Response } from 'express';
import { models } from '../models';
import { checkRequiredField, checkUser } from '../utils/errorHandlers';
import { ForbiddenError } from '../utils/errors';
import { redisConfig } from '../config/redisConfig';

export async function getRoomMessages(req: Request, res: Response) {
  const user = req.user;
  checkUser(user);
  const { roomId } = req.body;
  checkRequiredField<number>(roomId, 'roomId', 'number');

  const roomMember = await models.RoomMember.findOne({
    where: { user_id: user.id, room_id: roomId },
  });
  if (!roomMember) throw new ForbiddenError('You are not in this chatroom.');

  const cacheKey = `room_messages:${roomId}`;
  const cachedMessages = await redisClient.get(cacheKey);
  let messages;

  if (cachedMessages) {
    messages = JSON.parse(cachedMessages);
  } else {
    messages = await models.Message.findAll({
      where: { room_id: roomId },
      order: ['created_at', 'ASC'],
    });
    redisClient.setEx(
      cacheKey,
      redisConfig.defaultExpiration,
      JSON.stringify(messages)
    );
  }

  res.status(200).json({ messages, message: 'Messages received.' });
}
