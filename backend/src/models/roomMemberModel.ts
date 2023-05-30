import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database';

class RoomMember extends Model {
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
    room_id: {
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
    modelName: 'room_members',
  }
);

export default RoomMember;
