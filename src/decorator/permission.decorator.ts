import { UserModel } from 'src/api/login/login.model';
import { PERMISSION } from 'src/api/permission/permission.model';
import { Role } from 'src/orm/roles';

export function hasPermission(permission: PERMISSION) {
  return function(target: object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      const req = args[0];
      const res = args[1];

      const user: UserModel = req.user;
      if (!user) {
        res.sendStatus(401);
        return;
      }

      const role = await Role.findByPk(user.roleId);
      if (!role) {
        res.sendStatus(403);
        return;
      }
      if (role && !role.permissions?.includes(permission)) {
        res.sendStatus(403);
        return;
      }

      const result = original.apply(this, args);
      return result;
    };

    return descriptor;
  };
}
