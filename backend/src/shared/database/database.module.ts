import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { UsersRepository } from './repositories/users/user.repositories.js';
import { BankAccountsRepository } from './repositories/bank-accounts/bank-accounts.repository.js';
import { CategoriesRepository } from './repositories/categories/categories.repository.js';
import { TransactionsRepository } from './repositories/transactions/transactions.repository.js';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    BankAccountsRepository,
    CategoriesRepository,
    TransactionsRepository,
  ],
  exports: [UsersRepository, BankAccountsRepository, CategoriesRepository, TransactionsRepository],
})
export class DatabaseModule {}
