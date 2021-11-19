import { Sequelize } from 'sequelize';

// Connect to the database
export const sequelize = new Sequelize('bde', 'bde', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});
sequelize.authenticate()
  .then(() => {})
  .catch(() => {
    console.log('Error: Unable to connect to the database');
  });
