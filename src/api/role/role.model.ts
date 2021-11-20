import { PERMISSION } from 'src/api/permission/permission.model';

export interface RoleCreate {
  roleName: string;
  permissions?: permissions;
}

export interface RoleModel {
  roleName: string,
  id: number,
  permissions: PERMISSION[];
}

export interface permissions {
  permissions: PERMISSION[];
}
