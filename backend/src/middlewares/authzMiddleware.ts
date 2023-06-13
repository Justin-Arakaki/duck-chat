import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { models } from '../models';
import { NotFoundError, UnauthorizedError } from '../utils/errors';
import getEnv from '../utils/getEnv';

export default async function authzMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['x-access-token'];
  if (typeof token !== 'string') throw new UnauthorizedError('Unauthorized.');

  const decodedToken = jwt.verify(
    token,
    getEnv<Secret>('TOKEN_SECRET')
  ) as JwtPayload;
  const user = await models.User.findByPk(decodedToken.userId);
  if (!user) throw new NotFoundError('user');

  req.user = user;
  next();
}
