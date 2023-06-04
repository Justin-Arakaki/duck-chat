import { Request } from 'express';

declare module 'express' {
  interface Request {
    user: string;
    headers: {
      'x-access-token': string;
    };
  }
}
