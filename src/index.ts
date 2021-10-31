import { helloWorld } from './hello-world';
import { sequelize } from './app-sequelize';
import { app } from './app';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserController } from './api/user/user.controller';

new UserController();

const port = 8080;
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
