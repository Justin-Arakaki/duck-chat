import User from '../models/sampleUserModel';

class UserService {
  async createUser(name: string, email: string): Promise<User> {
    return User.create({ name, email, id: 0 });
  }

  async getUserById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  async getUsers(): Promise<User[]> {
    return User.findAll();
  }

  async updateUser(
    id: number,
    name: string,
    email: string
  ): Promise<User | null> {
    await User.update({ name, email }, { where: { id } });
    return User.findByPk(id);
  }

  async deleteUser(id: number): Promise<number> {
    return User.destroy({ where: { id } });
  }
}

export default new UserService();
