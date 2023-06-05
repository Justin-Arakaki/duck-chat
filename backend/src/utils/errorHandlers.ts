import { BadRequestError } from './errors';

export function checkRequiredField<T>(value: T, name: string): asserts value {
  if (!value) throw new BadRequestError(`Missing required field: ${name}.`);
}
