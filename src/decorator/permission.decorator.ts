import { UserModel } from 'src/api/login/login.model';

export function hasPermission(permission: string) {
  return function(target: object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const req = args[0];
      const res = args[1];

      const user: UserModel = req.user;
      if (!user) {
        res.sendStatus(403);
        return;
      }
      if (!user.permissions?.includes(permission)) {
        res.sendStatus(403);
        return;
      }

      const result = original.apply(this, args);
      return result;
    };

    return descriptor;
  };
}
