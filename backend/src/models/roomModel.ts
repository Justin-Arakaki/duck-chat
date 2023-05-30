import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database';

class Room extends Model {
  declare id: number;
  declare name: string;
  declare createdBy: number;
  declare readonly createdAt: Date;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'room_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'room_name',
    },
    createdBy: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_by',
    },
  },
  {
    sequelize,
    modelName: 'rooms',
  }
);

export default Room;
