export type PermissionView = {
  permission_id: number;
  permission_name: string;
  permission_description: string;
  parent_id: number | null;
  created_by: number;
  created_at: Date;
  updated_by: number;
  updated_at: Date;
  parent_permission_name?: string;
  parent_permission_description?: string;
  child_count: number;
};

export type GroupRoleView = {
  group_id: number;
  role_id: number;
  created_by: number | null;
  created_at: Date;
  role_name: string;
  role_description: string;
  group_name: string;
  group_description: string;
  group_email: string | null;
};

/**
 * Model Role
 *
 */
export type Role = {
  role_id: number;
  role_name: string;
  role_description: string;
  created_by: number | null;
  created_at: Date;
  updated_by: number | null;
  updated_at: Date;
};

export type RoleListDto = {
  role_id: number;
  role_name: string;
  role_description: string;
  created_by: number | null;
  created_at: Date;
  updated_by: number | null;
  updated_at: Date;
  group_count: number;
  user_count: number;
};

export type RolePermissionView = {
  role_id: number;
  permission_id: number;
  created_by: number | null;
  created_at: Date;
  permission_name: string;
  permission_description: string;
  role_name: string;
  role_description: string;
};

export type RoleEditDto = RoleListDto & {
  users: UserLookupModel[];
  permissions: { permission_id: number }[];
  groups: GroupLookupModel[];
};

export type RoleLookupModel = Pick<
  Role,
  'role_id' | 'role_name' | 'role_description'
>;

/**
 * Model User
 *
 */
export type User = {
  user_id: number;
  user_name: string;
  full_name: string;
  password: string;
  user_email: string;
  created_by: number | null;
  created_at: Date;
  updated_by: number | null;
  updated_at: Date;
};
export type UserLookupModel = Pick<
  User,
  'user_email' | 'user_id' | 'full_name' | 'user_name'
>;

/**
 * Model UserView
 *
 */
export type UserListDto = {
  user_id: number;
  user_name: string;
  full_name: string;
  password: string;
  user_email: string;
  created_by: number | null;
  created_at: Date;
  updated_by: number | null;
  updated_at: Date;
  group_count: number;
  role_count: number;
};

export type UserEditDto = UserListDto & {
  roles: RoleLookupModel[];
  groups: GroupLookupModel[];
};
/**
 * Model Group
 *
 */
export type Group = {
  group_id: number;
  group_name: string;
  group_description: string | null;
  group_email: string | null;
  created_by: number | null;
  created_at: Date;
  updated_by: number | null;
  updated_at: Date;
};

export type GroupLookupModel = Pick<
  Group,
  'group_id' | 'group_name' | 'group_description' | 'group_email'
>;

/**
 * Model Permission
 *
 */
export type Permission = {
  permission_id: number;
  permission_name: string;
  permission_description: string;
  parent_id: number | null;
  created_by: number | null;
  created_at: Date;
  updated_by: number | null;
  updated_at: Date;
};
export type PermissionLookupModel = Pick<
  Permission,
  'permission_id' | 'permission_name' | 'parent_id' | 'permission_description'
>;
