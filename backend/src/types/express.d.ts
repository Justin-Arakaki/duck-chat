export {};

declare global {
  namespace Express {
    export interface Request {
      headers?: {
        'x-access-token'?: string;
      };
      user?: User;
      body?: {
        username?: string;
        password?: string;
        roomName?: string;
      };
    }
  }
}
