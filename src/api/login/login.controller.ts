import { loginService } from 'src/api/login/login.service';
import { UserModel, UserVerify } from 'src/api/login/login.model';
import { validate } from 'src/decorator/data.decorator';
import Joi from 'joi';

export class LoginController {
  @validate({
    body: Joi.object({
      userName: Joi.string().required(),
      password: Joi.string().required(),
    }),
  })
  public static async login(req: any, res: any): Promise<void> {
    const userVerify: UserVerify = {
      userName: req.body.userName,
      password: req.body.password,
    };

    const user = await loginService.verifyUser(userVerify) as UserModel;
    if (!user) {
      res.status(404).send('User or Password incorrect!');
      return;
    }

    res.json({ accessToken: loginService.createJWT(user) });
  };

  public static async getMyInformation(req: any, res: any): Promise<void> {
    res.send(req.user);
  }
}
