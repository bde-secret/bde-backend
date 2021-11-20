import { loginService } from 'src/api/login/login.service';
import { UserModel, UserVerify } from 'src/api/login/login.model';
import { validate } from 'src/decorator/data.decorator';
import Joi from 'joi';
import { HTTP_METHOD, swag } from 'src/decorator/swagger.decorator';

export class LoginController {
  public static init() {};

  @swag(HTTP_METHOD.POST, '/login', 'Connect a user', { authEnabled: false })
  @validate({
    body: Joi.object({
      userName: Joi.string().required(),
      password: Joi.string().required(),
    }),
  })
  public static async login(req: any, res: any): Promise<void> {
    const userVerify: UserVerify = { ...req.body };

    const user = await loginService.verifyUser(userVerify) as UserModel;
    if (!user) {
      res.status(404).send('User or Password incorrect!');
      return;
    }

    res.json({ accessToken: loginService.createJWT(user) });
  };

  @swag(HTTP_METHOD.GET, '/me', 'Get me information')
  public static async getMyInformation(req: any, res: any): Promise<void> {
    res.send(req.user);
  }
}
