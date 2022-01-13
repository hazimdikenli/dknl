import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient(
  {log: ['query', 'info', 'warn', 'error']},
)

const userData: Prisma.UserCreateInput[] = [
    {
      user_name: 'admin',
      full_name: 'Admin User',
      email: 'admin@dikenli.com',
      password:
        '$2a$10$Agfl.CSaInZ6.5oMGhi7jec.hfAEahzz2OmiKF2hks3U/IEJhDqku',
    },
    {
      user_name: 'guest',
      full_name: 'Guest User',
      email: 'guest@dikenli.com',
      password:
        '$2a$10$fZ/NRlW6Wzm5JZg5ZaJiT.eKfIoeo5NUoZgGZX4iwcxMFfpRl37YK',
    },
  ];

  if (process.env.NODE_ENV === 'test') {
    userData.push({
      user_name: 'test1001',
      full_name: 'Admin User',
      email: 'admin@dikenli.com',
      password:
        '$2a$10$Agfl.CSaInZ6.5oMGhi7jec.hfAEahzz2OmiKF2hks3U/IEJhDqku',
    });
    userData.push({
      user_name: 'test1002',
      full_name: 'Admin User',
      email: 'admin@dikenli.com',
      password:
        '$2a$10$Agfl.CSaInZ6.5oMGhi7jec.hfAEahzz2OmiKF2hks3U/IEJhDqku',
    });
  }


export async function seedUsers() {
  console.log(`Seeding users...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.user_id}`)
  }
  console.log(`Seeding users finished.`)
}
