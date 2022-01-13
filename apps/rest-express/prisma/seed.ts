import { PrismaClient, Prisma } from '@prisma/client'
import { seedPermissions } from './seed.permissions';
import { seedUsers } from './seed.users';
const prisma = new PrismaClient()



async function main() {
  console.log(`Start seeding ...`)
  await seedUsers();
  await seedPermissions();

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
