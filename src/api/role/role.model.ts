export interface RoleCreate {
  roleName: string;
  permissions?: permissions;
}

export interface permissions {
  permissions: string[];
}
