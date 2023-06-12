import { DataTypes, Model, SaveOptions, Transaction } from 'sequelize';
import { sequelize } from '../utils/database';

export default class Friendship extends Model {
  declare userId1: number;
  declare userId2: number;

  // Database holds only composites with smallest number first
  static findByCompositeKey(
    userId1: number,
    userId2: number,
    transaction?: Transaction
  ) {
    let smallId, largeId;
    if (userId1 < userId2) {
      smallId = userId1;
      largeId = userId2;
    } else {
      smallId = userId2;
      largeId = userId1;
    }
    return this.findOne({
      where: { userId1: smallId, userId2: largeId },
      transaction,
    });
  }

  static createFriend(userId1: number, userId2: number, options?: SaveOptions) {
    let smallId, largeId;
    if (userId1 < userId2) {
      smallId = userId1;
      largeId = userId2;
    } else {
      smallId = userId2;
      largeId = userId1;
    }
    return this.create({ userId1: smallId, userId2: largeId }, options);
  }
}

Friendship.init(
  {
    userId1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'user_id1',
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    userId2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'user_id2',
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Friendship',
    tableName: 'friendships',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['user_id1', 'user_id2'],
      },
    ],
  }
);
