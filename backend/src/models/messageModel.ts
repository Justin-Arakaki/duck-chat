import { DataTypes, Model } from 'sequelize';
import { Models } from './models';
import { sequelize } from '../utils/database';

export default class Message extends Model {
  declare id: number;
  declare roomId: number;
  declare userId: number;
  declare message: string;
  declare readonly createdAt: Date;

  static associate(models: Models) {
    Message.belongsTo(models.Room, { foreignKey: 'room_id' });
    Message.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'message_id',
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: 'room_id',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'message',
    },
  },
  {
    sequelize,
    modelName: 'messages',
    tableName: 'Messages',
  }
);
