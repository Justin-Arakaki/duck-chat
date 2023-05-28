export default class UnauthorizedError extends Error {
  constructor(message = 'Error 401 Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
