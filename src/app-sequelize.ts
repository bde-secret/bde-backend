import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('bde', 'bde', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});
