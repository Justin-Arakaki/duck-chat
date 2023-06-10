import { Response } from 'express';
import { UserRequest } from '../types/express';
import { checkRequiredField } from '../utils/errorHandlers';
import { hashPassword } from '../utils/passwordUtils';

export async function updateName(req: UserRequest, res: Response) {
  const user = req.user;
  const { username } = req.body;
  checkRequiredField(username, 'username');

  await user.update({ name: username });

  res.json({ message: 'Username updated successfully!' });
}

export async function updatePassword(req: UserRequest, res: Response) {
  const user = req.user;
  const { password } = req.body;
  checkRequiredField(password, 'password');

  const hashedPassword = await hashPassword(password);
  await user.update({ hashedPassword });

  res.json({ message: 'Password updated successfully!' });
}

export async function deleteUser(req: UserRequest, res: Response) {
  const user = req.user;

  await user.destroy();

  res.json({ message: 'User deleted successfully' });
}
