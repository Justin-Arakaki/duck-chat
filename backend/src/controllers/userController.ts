import { Request, Response } from 'express';
import { checkRequiredField, checkUser } from '../utils/errorHandlers';
import { hashPassword } from '../utils/passwordUtils';

export async function updateName(req: Request, res: Response) {
  const user = req.user;
  checkUser(user);
  const { username } = req.body;
  checkRequiredField(username, 'username');

  await user.update({ name: username });

  res.json({ message: 'Username updated successfully!' });
}

export async function updatePassword(req: Request, res: Response) {
  const user = req.user;
  checkUser(user);
  const { password } = req.body;
  checkRequiredField<string>(password, 'password', 'string');

  const hashedPassword = await hashPassword(password);
  await user.update({ hashedPassword });

  res.json({ message: 'Password updated successfully!' });
}

export async function deleteUser(req: Request, res: Response) {
  const user = req.user;
  checkUser(user);

  await user.destroy();

  res.json({ message: 'User deleted successfully' });
}
