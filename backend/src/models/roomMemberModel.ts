import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database';

export default class RoomMember extends Model {
  declare id: number;
  declare roomId: number;
  declare userId: number;
}

RoomMember.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'room_member_id',
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'room_id',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
  },
  {
    sequelize,
    modelName: 'RoomMember',
    tableName: 'room_members',
    timestamps: false,
  }
);
