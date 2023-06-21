import { BadRequestError } from './errors';
import User from '../models/userModel';

export function checkRequiredField<T>(
  value: T,
  name: string,
  type?: string
): asserts value is T {
  if (!value) throw new BadRequestError(`Missing required field: ${name}.`);
  if (type && typeof value !== type)
    throw new BadRequestError(`Invalid ${name}.`);
}

export function checkUser(user: User | undefined): asserts user is User {
  if (!user) throw new Error();
}
