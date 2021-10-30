import {helloWorld} from './hello-world';
import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize('bde', 'bde', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});


// Create express connection
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req: any, res: any) => {
  res.send(helloWorld());
});

app.listen(port, () => {
  console.log(helloWorld());
  sequelize
    .authenticate()
    .then(() => {
      console.log('DB CONNECTED');
    })
    .catch(() => {
      console.log('DB ERROR CONNECTING');
    });
});
