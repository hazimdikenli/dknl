import {
  Prisma,
  PrismaClient,
  Permission,
  Role,
  User,
  GroupUser,
  Group,
} from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();

  await deleteAll();
  const permissions = await seedPermissions();
  console.table(permissions, [
    'id',
    'permission_name',
    'permission_description',
    'parent_id',
  ]);

  const roles = await seedRoles();
  console.table(roles, ['id', 'role_name', 'role_description']);

  const groups = await seedGroups();
  console.table(groups, ['id', 'group_name', 'group_description']);
  const users = await seedUsers();
  console.table(users, ['id', 'user_name', 'full_name']);
}

async function seedRoles() {
  console.log('Seeding Roles...');

  const adminPriveleges = await prisma.permission.findMany({
    where: { permission_name: { startsWith: 'auth' } },
  });
  const roles: Array<Prisma.RoleCreateInput> = [
    {
      role_name: 'admins',
      role_description: 'System Admins',
      permissions: {
        // create: [{
        //   permission: {connect: {}}
        // }],
        create: adminPriveleges.map(p => {
          return {permission: {connect: {permission_id: p.permission_id}}}
        })
      },
    },
    {
      role_name: 'everyone',
      role_description: 'Every Regular User',
    },
  ];
  const rows = [] as Array<Role>;
  for (const data of roles) {
    rows.push(await prisma.role.create({ data }));
  }
  return rows;
}

function createCrudPermissions(name: string): Prisma.PermissionCreateInput[] {
  return [
    {
      permission_name: name + '.C',
      permission_description: 'Create',
    },
    {
      permission_name: name + '.R',
      permission_description: 'Read',
    },
    {
      permission_name: name + '.U',
      permission_description: 'Update',
    },
    {
      permission_name: name + '.D',
      permission_description: 'Delete',
    },
  ];
}

async function seedPermissions(): Promise<Permission[]> {
  console.log('Seeding Permissions...');

  const permissions: Array<Prisma.PermissionCreateInput> = [
    {
      permission_name: 'AUTH',
      permission_description: 'System Administration',
    },
    {
      permission_name: 'AUTH.PERMISSIONS',
      permission_description: 'Permission Definitions',
      parent: {
        connect: {
          permission_name: 'AUTH',
        },
      },
      children: {
        create: createCrudPermissions('AUTH.PERMISSIONS'),
      },
    },
    {
      permission_name: 'AUTH.USERS',
      permission_description: 'User Definitions',
      parent: {
        connect: {
          permission_name: 'AUTH',
        },
      },
      children: {
        create: createCrudPermissions('AUTH.USERS'),
      },
    },
  ];
  const rows = [] as Array<Permission>;
  for (const data of permissions) {
    rows.push(await prisma.permission.create({ data }));
  }
  return await prisma.permission.findMany({});
}

async function seedUsers(): Promise<User[]> {
  console.log('Seeding Users...');

  const users: Array<Prisma.UserCreateInput> = [
    {
      user_name: 'admin',
      full_name: 'Admin User',
      email: 'admin@dikenli.com',
      password: '$2a$10$Agfl.CSaInZ6.5oMGhi7jec.hfAEahzz2OmiKF2hks3U/IEJhDqku',
      groups: {
        // connectOrCreate: {
        //   where: {},
        //   create: { userGroup: { connect: { group_name: 'admins' } } },
        // },
        create: [
          { group: { connect: { group_name: 'admins' } } },
          { group: { connect: { group_name: 'everyone' } } },
          // {
          //   group_id: adminGroup.id,
          // },
          // {
          //   group_id: everyoneGroup.id,
          // },
        ],
      },
    },
    {
      user_name: 'guest',
      full_name: 'Guest User',
      email: 'guest@dikenli.com',
      password: '$2a$10$fZ/NRlW6Wzm5JZg5ZaJiT.eKfIoeo5NUoZgGZX4iwcxMFfpRl37YK',
      groups: {
        create: [
          { group: { connect: { group_name: 'everyone' } } },
          // {
          //   group_id: everyoneGroup.id,
          // },
        ],
      },
    },
  ];
  const createdUsers = [] as Array<User>;
  for (const data of users) {
    createdUsers.push(await prisma.user.create({ data }));
  }
  return createdUsers;
}

async function seedGroups(): Promise<Group[]> {
  console.log('Seeding Groups...');

  const groups: Array<Prisma.GroupCreateInput> = [
    {
      group_name: 'admins',
      group_description: 'built-in admin group',
    },
    {
      group_name: 'everyone',
      group_description: 'everyone is a member of this group by default',
    },
  ];
  const rows = [] as Array<Group>;
  for (const data of groups) {
    rows.push(await prisma.group.create({ data }));
  }
  return rows;
}

async function deleteAll() {
  await prisma.rolePermission.deleteMany();
  await prisma.permission.deleteMany();
  
  await prisma.userRole.deleteMany();
  await prisma.groupRole.deleteMany();
  await prisma.role.deleteMany();
  
  await prisma.user.deleteMany();

  await prisma.groupUser.deleteMany();
  await prisma.group.deleteMany();

}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
