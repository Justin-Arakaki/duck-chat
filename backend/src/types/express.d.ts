import User from '../models/userModel';

export interface UserRequestBody {
  username?: string;
  password?: string;
}

export interface AuthRequest extends Request {
  headers: {
    'x-access-token': string;
  };
  user: User;
}

export interface UserRequest extends AuthRequest {
  body: UserRequestBody;
}
