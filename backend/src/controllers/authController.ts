import { Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { AuthRequest } from '../types/express';
import { models } from '../models';
import { checkRequiredField } from '../utils/errorHandlers';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/errors';
import getEnv from '../utils/getEnv';
import { hashPassword, verifyPassword } from '../utils/passwordUtils';

export async function login(req: AuthRequest, res: Response) {
  const { username, password } = req.body;
  checkRequiredField(username, 'username');
  checkRequiredField(password, 'password');

  const user = await models.User.findOne({ where: { username } });
  if (!user) throw new NotFoundError('user');

  const isMatch = await verifyPassword(user.hashedPassword, password);
  if (!isMatch) throw new UnauthorizedError('Password is incorrect.');

  const token = jwt.sign({ userId: user.id }, getEnv<Secret>('TOKEN_SECRET'));

  res.json({ token, message: 'Logged in successfully!' });
}

export async function register(req: AuthRequest, res: Response) {
  const { username, password } = req.body;
  checkRequiredField(username, 'username');
  checkRequiredField(password, 'password');

  const user = await models.User.findOne({ where: { username } });
  if (user) throw new BadRequestError('Username is already in use.');

  const hashedPassword = await hashPassword(password);

  await models.User.create({ username, password: hashedPassword });

  res.status(201).json({ message: 'Account created successfully!' });
}
