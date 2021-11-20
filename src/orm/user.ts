import { Model, DataTypes } from 'sequelize';
import { sequelize } from 'src/sequelize';
import { Role } from './roles';

/**
 * Represent User table
 */
export class User extends Model {
  public id!: number;
  public roleId!: number;
  public Role?: Role;
  public userName!: string;
  public passwordHash!: string;

  public readonly createdAt!: string;
  public readonly updateAt!: string;
  public readonly deletedAt!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  roleId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  userName: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  passwordHash: {
    type: new DataTypes.STRING(1024),
    allowNull: false,
  },
}, {
  tableName: 'Users',
  sequelize: sequelize,
});

User.belongsTo(Role, { foreignKey: 'roleId' });
