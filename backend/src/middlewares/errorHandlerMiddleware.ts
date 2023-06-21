/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler as ErrReq, Response } from 'express';
import {
  CustomError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
} from '../utils/errors';

export const errorHandlerMiddleware: ErrReq = (
  err: CustomError,
  _req,
  res: Response,
  _next
) => {
  switch (true) {
    case err instanceof BadRequestError:
      res.status(400).json({ error: err.message });
      break;
    case err instanceof UnauthorizedError:
      res.status(401).json({ error: err.message });
      break;
    case err instanceof ForbiddenError:
      res.status(403).json({ error: err.message });
      break;
    case err instanceof NotFoundError:
      res.status(404).json({ error: `${err.resource} was not found` });
      break;
    default:
      console.error(err);
      res.status(500).json({ error: 'Internal server error.' });
      break;
  }
};
