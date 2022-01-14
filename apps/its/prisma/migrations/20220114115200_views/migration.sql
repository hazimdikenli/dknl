drop view GroupView;
drop view UserView;
drop view RoleView;
drop view GroupRoleView;
drop view GroupUserView;
drop view PermissionView;
drop view RolePermissionView;
drop view UserRoleView;

CREATE VIEW IF NOT EXISTS "GroupView" AS
select tbl.group_id,
       tbl.group_name,
       tbl.group_description,
       tbl.group_email,
       tbl.created_by,
       tbl.created_at,
       tbl.updated_by,
       tbl.updated_at,
       coalesce((select count(1) from GroupUser GU where GU.group_id = tbl.group_id),0) as user_count,
       coalesce((select count(1) from GroupRole GR where GR.group_id = tbl.group_id),0) as role_count
from "Group" tbl;

CREATE VIEW IF NOT EXISTS "UserView" AS
select tbl.user_id,
       tbl.user_name,
       tbl.full_name,
       tbl.password,
       tbl.user_email,
       tbl.created_by,
       tbl.created_at,
       tbl.updated_by,
       tbl.updated_at,
       coalesce((select count(1) from GroupUser GU where GU.user_id = tbl.user_id), 0) as group_count,
       coalesce((select count(1) from UserRole UR where UR.user_id = tbl.user_id), 0)  as role_count
from "User" tbl;

CREATE VIEW IF NOT EXISTS "RoleView" AS
select tbl.role_id,
       tbl.role_name,
       tbl.role_description,
       tbl.created_by,
       tbl.created_at,
       tbl.updated_by,
       tbl.updated_at,
       coalesce((select count(1) from GroupRole GR where GR.role_id = tbl.role_id), 0) as group_count,
       coalesce((select count(1) from UserRole UR where UR.role_id = tbl.role_id), 0)  as user_count
from "Role" tbl;

CREATE VIEW IF NOT EXISTS "PermissionView" AS
select tbl.permission_id,
       tbl.permission_name,
       tbl.permission_description,
       tbl.parent_id,
       tbl.created_by,
       tbl.created_at,
       tbl.updated_by,
       tbl.updated_at,
       parent.permission_name
           as parent_permission_name,
       parent.permission_description
           as parent_permission_description,
       coalesce((select count(1) from "Permission" children where children.parent_id = tbl.permission_id),
                0)
           as child_count
from "Permission" tbl
         left join "Permission" parent on parent.permission_id = tbl.parent_id;

CREATE VIEW IF NOT EXISTS "RolePermissionView" AS
select tbl.role_id,
       tbl.permission_id,
       tbl.created_by,
       tbl.created_at,
       P.permission_name,
       P.permission_description,
       R.role_name,
       R.role_description
from "RolePermission" tbl
         left join "Permission" P on tbl.permission_id = P.permission_id
         left join "Role" R on tbl.role_id = R.role_id
;

CREATE VIEW IF NOT EXISTS "UserRoleView" AS
select tbl.role_id,
       tbl.user_id,
       tbl.created_by,
       tbl.created_at,
       R.role_name,
       R.role_description,
       U.user_name,
       U.full_name,
       U.user_email
from "UserRole" tbl
         left join "Role" R on tbl.role_id = R.role_id
         left join User U on tbl.user_id = U.user_id
;

CREATE VIEW IF NOT EXISTS "GroupRoleView" AS
select tbl.group_id,
       tbl.role_id,
       tbl.created_by,
       tbl.created_at,
       R.role_name,
       R.role_description,
       G.group_name,
       G.group_description,
       G.group_email
from "GroupRole" tbl
         left join "Role" R on tbl.role_id = R.role_id
         left join "Group" G on tbl.group_id = G.group_id
;
CREATE VIEW IF NOT EXISTS "GroupUserView" AS
select tbl.group_id,
       tbl.user_id,
       tbl.created_by,
       tbl.created_at,
       G.group_name,
       G.group_description,
       G.group_email,
       U.user_name,
       U.full_name,
       U.user_email
from "GroupUser" tbl
         left join "Group" G on tbl.group_id = G.group_id
         left join "User" U on tbl.user_id = U.user_id
;
