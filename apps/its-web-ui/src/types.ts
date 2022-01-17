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
