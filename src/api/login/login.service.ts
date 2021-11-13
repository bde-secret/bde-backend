import { User } from 'src/orm/user';
import { PasswordHash } from 'src/script/password-hash/password-hash';
import jwt from 'jsonwebtoken';
import { UserModel, UserVerify } from 'src/api/login/login.model';
import { Role } from 'src/orm/roles';

export class loginService {
  public static secretToken = // TODO: Export secretToken
    'c5f013629d6eee5bc685cd0151897a2e8535c72ae2e42110ea24ad617af3d1cda690f97d3e528b8d0670f20b090404b485113c4ae4caff24248a6c9a112f9595';

  public static async verifyUser(userVerify: UserVerify): Promise<UserModel | null> {
    const user = await User.unscoped().findOne({
      attributes: ['id', 'userName', 'passwordHash'],
      where: { userName: userVerify.userName },
      include: [
        {
          model: Role,
          attributes: ['roleName', 'id', 'permissions'],
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
      permissions: user.Role?.permissions.permissionsList,
    };
  }

  public static createJWT(user: UserModel) {
    return jwt.sign(user, loginService.secretToken);
  }

  public static authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, loginService.secretToken, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
}
