import { PERMISSION } from '@api/permission/permission.model';
import { RoleModel } from '@api/role/role.model';
import { RoleService } from '@api/role/role.service';
import { Role } from '@orm/roles';
import { User } from '@orm/user';
import { PasswordHash } from '@script/password-hash/password-hash';

export class globalTester {
  public static async truncateTable() {
    await User.truncate();
    await Role.truncate();
  }

  public static async spawnRole(roleName: string, permissions: PERMISSION[] = []): Promise<RoleModel> {
    return RoleService.createRole({ roleName, permissions });
  };

  public static async spawnUser(userName: string, password: string, roleId: number | null = null) {
    return User.create({
      userName,
      passwordHash: await PasswordHash.getPasswordHash(password),
      roleId,
    });
  };
};
