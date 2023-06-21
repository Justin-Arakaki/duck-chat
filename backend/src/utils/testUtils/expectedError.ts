export default class ExpectedError extends Error {
  constructor(message = 'Expected error.') {
    super(message);
    this.name = 'ExpectedError';
  }
}
