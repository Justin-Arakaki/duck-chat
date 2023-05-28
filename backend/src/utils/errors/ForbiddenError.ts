export default class ForbiddenError extends Error {
  constructor(message = 'Error 403 Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
  }
}
