import { DataTypes, Model } from 'sequelize';
import { Models } from './models';
import { sequelize } from '../utils/database';

export default class Room extends Model {
  declare id: number;
  declare name: string;
  declare createdBy: number;
  declare readonly createdAt: Date;

  static associate(models: Models) {
    Room.belongsTo(models.User, { foreignKey: 'created_by' });
    Room.belongsToMany(models.User, {
      through: models.RoomMember,
      foreignKey: 'room_id',
    });
    Room.hasMany(models.Message, { foreignKey: 'room_id' });
  }
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
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'created_by',
    },
  },
  {
    sequelize,
    modelName: 'Room',
    tableName: 'rooms',
    timestamps: false,
  }
);
