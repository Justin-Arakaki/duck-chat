import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database';

class Message extends Model {
  declare id: number;
  declare roomId: number;
  declare userId: number;
  declare message: string;
  declare readonly createdAt: Date;
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
  }
);

export default Message;
