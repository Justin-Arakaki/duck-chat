import { DataTypes, Model, Sequelize } from 'sequelize';
import { Models } from './models';
import { sequelize } from '../utils/database';

export default class User extends Model {
  declare id: number;
  declare name: string;
  declare hashedPassword: string;
  declare lastLogin: Date;
  declare readonly createdAt: Date;

  updateLastLogin() {
    this.lastLogin = new Date();
    return this.save();
  }

  static associate(models: Models) {
    User.hasMany(models.Message, { foreignKey: 'user_id' });
    User.belongsToMany(models.Room, {
      through: models.RoomMember,
      foreignKey: 'user_id',
    });
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
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: 'username',
    },
    hashedPassword: {
      type: DataTypes.STRING(194),
      allowNull: false,
      field: 'hashed_password',
    },
    lastLogin: {
      type: DataTypes.DATE,
      field: 'last_login',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);
