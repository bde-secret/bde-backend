export interface RoleCreate {
  roleName: string;
  permissions?: permissions;
}

export interface RoleModel {
  roleName: string,
  id: number,
  permissions: string[];
}

export interface permissions {
  permissions: string[];
}
