import { Sequelize } from 'sequelize';
import { Logger } from './logger/logger';

// Connect to the database
export const sequelize = new Sequelize('bde', 'bde', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});
sequelize.authenticate()
  .then(() => {})
  .catch(() => {
    Logger.error('Unable to connect to the database');
  });
