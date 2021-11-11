import { User } from 'src/orm/user';
import { PasswordHash } from 'src/script/password-hash/password-hash';
import jwt from 'jsonwebtoken';
import { UserModel, UserVerify } from 'src/api/login/login.model';

export class loginService {
  public static async verifyUser(userVerify: UserVerify): Promise<UserModel | null> {
    const user = await User.unscoped().findOne({
      attributes: ['id', 'userName', 'passwordHash'],
      where: { userName: userVerify.userName },
    });

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await PasswordHash.verifyHash(userVerify.password, user?.passwordHash);
    if (!isPasswordCorrect) {
      return null;
    }

    return { userName: user.userName, id: user.id };
  }

  public static createJWT(user: UserModel) {
    const secretToken = // TODO: Export secretToken
    'c5f013629d6eee5bc685cd0151897a2e8535c72ae2e42110ea24ad617af3d1cda690f97d3e528b8d0670f20b090404b485113c4ae4caff24248a6c9a112f9595';
    return jwt.sign(user, secretToken);
  }
}
