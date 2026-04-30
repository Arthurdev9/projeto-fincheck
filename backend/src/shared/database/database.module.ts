import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { UsersRepository } from './repositories/users/user.repositories.js';

@Global()
@Module({
  providers: [PrismaService, UsersRepository],
  exports: [UsersRepository],
})
export class DatabaseModule {}
