import { sequelize } from 'src/app-sequelize';
import { createLoginRoute } from 'src/api/login/login.route';

const express = require('express');
export const app = express();

const port = 8080;
let alreadyListen: boolean = false;

if (!alreadyListen) {
  app.use(express.json());

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
  alreadyListen = true;
}

createLoginRoute();
