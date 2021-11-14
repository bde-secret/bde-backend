import { RoleCreate } from 'src/api/role/role.model';
import { Role } from 'src/orm/roles';

export class RoleService {
  public static async createRole(role: RoleCreate): Promise<Role> {
    return Role.create(role);
  }

  public static async updateRole(roleId: string, roleName: string, permissions: string[]): Promise<Role | null> {
    const role = await Role.findByPk(roleId);
    if (!role) {
      return null;
    }

    role.roleName = roleName;
    role.permissions = { permissions };
    await role.save();
    return role;
  }
}
