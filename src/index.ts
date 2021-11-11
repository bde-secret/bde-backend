import { sequelize } from 'src/app-sequelize';
import { createLoginRoute } from 'src/api/login/login.route';

const express = require('express');
export const app = express();
app.use(express.json());

const port = 8080;

app.listen(port, () => {
  console.log('Hello World!');
  sequelize
    .authenticate()
    .then(() => {
      console.log('DB CONNECTED');
    })
    .catch(() => {
      console.log('DB ERROR CONNECTING');
    });
});

createLoginRoute();
