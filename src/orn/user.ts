import { Model, DataTypes } from 'sequelize';
import { sequelize } from 'index';

/**
 * Represent User table
 */
export class User extends Model {
  public id: number;
  public userName: string;
  public passwordHash: string;
  public token: string;

  public readonly createdAt: string;
  public readonly updateAt: string;
  public readonly deletedAt: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  passwordHash: {
    type: new DataTypes.STRING(1024),
    allowNull: false,
  },
  token: {
    type: new DataTypes.STRING(2048),
    allowNull: true,
  },
}, {
  tableName: 'users',
  sequelize: sequelize,
});
