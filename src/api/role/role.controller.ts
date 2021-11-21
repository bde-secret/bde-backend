import Joi from 'joi';
import { validate } from 'src/decorator/data.decorator';
import { hasPermission } from 'src/decorator/permission.decorator';
import { HTTP_METHOD, swag } from 'src/decorator/swagger.decorator';
import { PERMISSION } from '../permission/permission.model';
import { RoleCreate, RoleUpdate } from './role.model';
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
  @hasPermission(PERMISSION.ROLE_MANAGEMENT)
  public static async createRole(req: any, res: any) {
    const roleToBeCreated: RoleCreate = { ...req.body };
    const role = await RoleService.createRole(roleToBeCreated);
    res.send(role);
  };

  @swag(HTTP_METHOD.PUT, '/role', 'Update a role')
  @validate({
    body: Joi.object({
      id: Joi.number().required(),
      roleName: Joi.string().required(),
      permissions: Joi.array().items(Joi.string().optional()).optional(),
    }),
  })
  @hasPermission(PERMISSION.ROLE_MANAGEMENT)
  public static async updateRole(req: any, res: any) {
    const roleToBeUpdated: RoleUpdate = { ...req.body };
    const role = await RoleService.updateRole(roleToBeUpdated);
    if (!role) {
      res.sendStatus(404).send('Unable to find role');
    }
    res.send(role);
  };
}
