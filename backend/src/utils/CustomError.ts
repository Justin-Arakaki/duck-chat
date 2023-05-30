export type CustomError = (
  | Error
  | BadRequestError
  | ForbiddenError
  | NotFoundError
  | UnauthorizedError
) & {
  resource?: string;
};

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'Error 403 Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends Error {
  public resource: string;

  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = 'NotFoundError';
    this.resource = resource;
  }
}

export class UnauthorizedError extends Error {
  constructor(message = 'Error 401 Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
