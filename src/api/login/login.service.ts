import { User } from 'src/orm/user';
import { PasswordHash } from 'src/script/password-hash/password-hash';
import jwt from 'jsonwebtoken';
import { UserModel, UserVerify } from 'src/api/login/login.model';
import { Role } from 'src/orm/roles';
import { config } from 'src/.config';

export class loginService {
  public static async verifyUser(userVerify: UserVerify): Promise<UserModel | null> {
    const user = await User.unscoped().findOne({
      attributes: ['id', 'userName', 'passwordHash', 'roleId'],
      where: { userName: userVerify.userName },
      include: [
        {
          model: Role,
          attributes: ['roleName'],
        },
      ],
    });

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await PasswordHash.verifyHash(userVerify.password, user?.passwordHash);
    if (!isPasswordCorrect) {
      return null;
    }

    return {
      userName: user.userName,
      id: user.id,
      roleName: user.Role?.roleName,
      roleId: user.roleId,
    };
  }

  public static createJWT(user: UserModel) {
    return jwt.sign(user, config.secretToken);
  }

  // Use this midleware to check if a person is login
  public static authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, config.secretToken, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

  public static notAuthenticate(req: any, res: any, next: any) {
    next();
  }
}
