import { Module } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service.js';
import { BankAccountsController } from './bank-accounts.controller.js';
import { ValidateBankAccountOwnershipService } from './services/validate-bank-account-ownership.service.js';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateBankAccountOwnershipService],
  exports: [ValidateBankAccountOwnershipService],
})
export class BankAccountsModule {}
