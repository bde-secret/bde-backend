import { PERMISSION } from '@api/permission/permission.model';

export interface RoleUpdate extends RoleCreate {
  id: number;
}

export interface RoleCreate {
  roleName: string;
  permissions?: PERMISSION[];
}

export interface RoleModel {
  roleName: string;
  id: number;
  permissions: PERMISSION[];
}
