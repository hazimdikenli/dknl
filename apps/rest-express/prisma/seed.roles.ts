import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const seedData: Prisma.RoleCreateInput[] = [
  { role_name: 'admin', role_description: 'built-in admins' },
  {
    role_name: 'issue_topic',
    role_description: 'issue topic admin',
  },
];


export async function seedRoles() {
  console.log(`Seeding roles...`)
  for (const u of seedData) {
    const role = await prisma.role.create({
      data: u,
    })
    console.log(`Created role with id: ${role.role_id}`)
  }
  console.log(`Seeding roles finished.`)
}
