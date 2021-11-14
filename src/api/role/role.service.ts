import { RoleCreate } from 'src/api/role/role.model';
import { Role } from 'src/orm/roles';

export class RoleService {
  public static async createRole(role: RoleCreate): Promise<Role> {
    return Role.create(role);
  }
}
