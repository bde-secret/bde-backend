export interface RoleCreate {
  roleName: string;
  permissions?: permissions;
}

export interface permissions {
  permissionsList: string[];
}
