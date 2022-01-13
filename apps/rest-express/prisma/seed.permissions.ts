import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const seedData: Prisma.PermissionCreateInput[] = [
  {
    permission_name: 'admin',
    permission_description: 'administrative tasks',
  },
  {
    permission_name: 'admin.users',
    permission_description: 'user administration',
    parent_id: 1,
  }
  ];


export async function seedPermissions() {
  console.log(`Seeding permission...`)
  for (const u of seedData) {
    const permission = await prisma.permission.create({
      data: u,
    })
    console.log(`Created permission with id: ${permission.permission_id}`)
  }
  console.log(`Seeding permissions finished.`)
}
