import { sequelize } from 'src/app-sequelize';
import { helloWorld } from 'src/hello-world';
import { app } from 'src/app';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserController } from 'src/api/user/user.controller';

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
