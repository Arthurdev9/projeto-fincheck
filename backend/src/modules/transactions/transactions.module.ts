import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service.js';
import { TransactionsController } from './transactions.controller.js';
import { ValidateTransactionOwnershipService } from './services/validate-transaction-ownership.service.js';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-ownership.service.js';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-category-ownership.service.js';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ValidateTransactionOwnershipService,
    ValidateBankAccountOwnershipService,
    ValidateCategoryOwnershipService,
  ],
})
export class TransactionsModule {}
