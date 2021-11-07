import { sequelize } from 'src/app-sequelize';
import { app } from 'src/app';

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
