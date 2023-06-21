import { checkRequiredField } from '../errorHandlers';
import { BadRequestError } from '../errors';

describe('checkIfMissing', () => {
  it('should throw BadRequestError if field is falsy', () => {
    const missing = undefined;
    expect(() => checkRequiredField(missing, 'missing')).toThrow(
      BadRequestError
    );
  });

  it('should not throw BadRequestError if field is defined', () => {
    const exists = 55;
    expect(() => checkRequiredField(exists, 'exists')).not.toThrow(
      BadRequestError
    );
  });
});
