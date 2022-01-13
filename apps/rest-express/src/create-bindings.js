import {Container} from './container';
import {PRISMA_SERVICE, REPOSITORIES} from './keys'
import {UserRepository} from './common/user.repository';
import {  Prisma,
  PrismaClient
} from '@prisma/client';

const container = new Container();
container.register(PRISMA_SERVICE, (container) => new PrismaClient({}))
container.register(REPOSITORIES.USER_REPOSITORY, (container) => new UserRepository(container[PRISMA_SERVICE]))
