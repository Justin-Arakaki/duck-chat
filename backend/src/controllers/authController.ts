import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { models } from '../models';
import { checkRequiredField } from '../utils/errorHandlers';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/errors';
import getEnv from '../utils/getEnv';
import { hashPassword, verifyPassword } from '../utils/passwordUtils';

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  checkRequiredField<string>(username, 'username', 'string');
  checkRequiredField<string>(password, 'password', 'string');

  const user = await models.User.findOne({ where: { username } });
  if (!user) throw new NotFoundError('User');

  const isMatch = await verifyPassword(user.hashedPassword, password);
  if (!isMatch) throw new UnauthorizedError('Password is incorrect.');

  const token = jwt.sign({ userId: user.id }, getEnv<Secret>('TOKEN_SECRET'));

  res.json({ token, message: 'Logged in successfully!' });
}

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;
  checkRequiredField<string>(username, 'username', 'string');
  checkRequiredField<string>(password, 'password', 'string');

  const user = await models.User.findOne({ where: { username } });
  if (user) throw new BadRequestError('Username is already in use.');

  const hashedPassword = await hashPassword(password);

  await models.User.create({ name: username, hashedPassword });

  res.status(201).json({ message: 'Account created successfully!' });
}
