import { Request } from 'express';
import User from '../models/userModel';

export interface AuthzRequest extends Request {
  headers: {
    'x-access-token': string;
  };
  user: User;
}

export interface AuthBody {
  username?: string;
  password?: string;
}

export interface AuthRequest extends Request {
  body: AuthBody;
}

export interface UserRequest extends AuthzRequest {}
