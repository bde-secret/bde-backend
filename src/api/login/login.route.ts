import { app } from 'src/index';
import { LoginController } from 'src/api/login/login.controller';

export function createLoginRoute() {
  app.post('/login', (req: any, res: any) => {
    LoginController.login(req, res);
  });
}
