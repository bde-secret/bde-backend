import { hasPermission } from 'src/decorator/permission.decorator';
import { PERMISSION } from '../permission/permission.model';

export class RoleController {
  @hasPermission(PERMISSION.CreateRole)
  public static async createRole(req: any, res: any) {
    res.sendStatus(200);
  };
}
