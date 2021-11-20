import Joi from 'joi';
import { validate } from 'src/decorator/data.decorator';
import { hasPermission } from 'src/decorator/permission.decorator';
import { HTTP_METHOD, swag } from 'src/decorator/swagger.decorator';
import { PERMISSION } from '../permission/permission.model';
import { RoleCreate } from './role.model';
import { RoleService } from './role.service';

export class RoleController {
  public static init() {};

  @swag(HTTP_METHOD.POST, '/role', 'Create a new role')
  @validate({
    body: Joi.object({
      roleName: Joi.string().required(),
      permissions: Joi.array().items(Joi.string().required()).optional(),
    }),
  })
  @hasPermission(PERMISSION.CreateRole)
  public static async createRole(req: any, res: any) {
    const roleToBeCreated: RoleCreate = { ...req.body };
    const role = await RoleService.createRole(roleToBeCreated);
    res.send(role);
  };
}
