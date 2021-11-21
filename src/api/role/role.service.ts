import { RoleCreate, RoleModel, RoleUpdate } from 'src/api/role/role.model';
import { Role } from 'src/orm/roles';

export class RoleService {
  public static async createRole(role: RoleCreate): Promise<RoleModel> {
    const { id, roleName, permissions } = await Role.create(role);
    return { id, roleName, permissions };
  }

  public static async updateRole(role: RoleUpdate): Promise<RoleModel | null> {
    const r = await Role.findByPk(role.id);
    if (!r) {
      return null;
    }
    r.roleName = role.roleName;
    r.permissions = role.permissions;
    await r.save();
    const { id, roleName, permissions } = r;
    return { id, roleName, permissions: permissions };
  }
}
