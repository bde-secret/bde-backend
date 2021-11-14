import { app } from 'src/index';
import { LoginController } from 'src/api/login/login.controller';
import { loginService } from './login.service';

export function createLoginRoute() {
  app.post('/login', (req: any, res: any) => {
    LoginController.login(req, res);
  });

  app.get('/me', loginService.authenticateToken, (req: any, res: any) => {
    LoginController.getMyInformation(req, res);
  });
}
