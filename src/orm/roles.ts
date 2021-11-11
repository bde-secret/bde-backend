import { Model, DataTypes } from 'sequelize';
import { sequelize } from 'src/app-sequelize';

/**
 * Represent Role table
 */
export class Role extends Model {
  public id!: number;
  public roleName!: string;
  public permissions!: any;

  public readonly createdAt!: string;
  public readonly updateAt!: string;
}

Role.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  roleName: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  permissions: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
}, {
  tableName: 'Roles',
  sequelize: sequelize,
});
