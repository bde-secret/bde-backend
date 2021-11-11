import { loginService } from 'src/api/login/login.service';
import { UserModel, UserVerify } from 'src/api/login/login.model';
import Joi from 'joi';

export class LoginController {
  public static async login(req: any, res: any): Promise<void> {
    const schema = Joi.object({
      userName: Joi.string().required(),
      password: Joi.string().required(),
    });

    const valide = schema.validate(req.body);
    if (valide.error) {
      res.status(404).send(valide.error.details[0].message);
      return;
    }

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
}
