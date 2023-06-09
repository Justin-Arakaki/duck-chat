import { Request, Response } from 'express';
import User from '../models/userModel';
import { NotFoundError } from '../utils/errors';

// TODO: Fix all this crap. Be sure to validate!

export const findUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError('user');

  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = req.user;
  const { username, password } = req.body;

  // TODO: Add validation for username and password
  // TODO: Be sure to hash password
  await user.update({ username, password });
  res.json({ message: 'User updated successfully!' });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
