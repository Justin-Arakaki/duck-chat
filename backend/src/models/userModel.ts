import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database';

class User extends Model {
  declare id: number;
  declare name: string;
  declare hashedPassword: string;
  declare lastLogin: Date;
  declare readonly createdAt: Date;

  updateLastLogin() {
    this.lastLogin = new Date();
    return this.save();
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'user_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'username',
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'hashed_password',
    },
    lastLogin: {
      type: DataTypes.DATE,
      field: 'last_login',
    },
  },
  {
    sequelize,
    modelName: 'users',
  }
);

export default User;
