import { NextFunction, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { AuthRequest } from '../types/express';
import { models } from '../models';
import { UnauthorizedError, NotFoundError } from '../utils/errors';
import getEnv from '../utils/getEnv';

// TODO: Token management - token expiration, revocation, blacklisting
// TODO: Error handling - database connection errors
// TODO: Rate limiting
// TODO: Logging

export default async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['x-access-token'];
  if (!token) throw new UnauthorizedError('Unauthorized.');

  const decodedToken = jwt.verify(
    token,
    getEnv<Secret>('TOKEN_SECRET')
  ) as JwtPayload;
  const user = await models.User.findByPk(decodedToken.userId);
  if (!user) throw new NotFoundError('user');

  req.user = user;
  next();
}
