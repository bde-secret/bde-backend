import { RoleService } from 'src/api/role/role.service';
import { Role } from 'src/orm/roles';
import { User } from 'src/orm/user';
import { PasswordHash } from 'src/script/password-hash/password-hash';

export class globalTester {
  public static async truncateTable() {
    await User.truncate();
    await Role.truncate();
  }

  public static async spawnRole(roleName: string, permissions: string[] = []): Promise<Role> {
    return RoleService.createRole({ roleName, permissions: { permissions } });
  };

  public static async spawnUser(userName: string, password: string, roleId: number | null = null) {
    return User.create({
      userName,
      passwordHash: await PasswordHash.getPasswordHash(password),
      roleId,
    });
  };
};
