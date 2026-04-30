import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto.js';
import { UpdateTransactionDto } from '../dto/update-transaction.dto.js';
import { TransactionsRepository } from '../../../shared/database/repositories/transactions/transactions.repository.js';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service.js';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service.js';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service.js';
import { TransactionType } from '../entities/Transaction.js';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    await this.validatEntitiesOwnership({
      userId,
      bankAccountId: createTransactionDto.bankAccountId,
      categoryId: createTransactionDto.categoryId,
    });

    return this.transactionsRepository.create({
      userId,
      ...createTransactionDto,
    });
  }

  async findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    await this.validatEntitiesOwnership({
      userId,
      bankAccountId: filters.bankAccountId,
    });

    return this.transactionsRepository.findAllByUserId(userId, filters);
  }

  async update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    await this.validatEntitiesOwnership({
      userId,
      transactionId,
      bankAccountId: updateTransactionDto.bankAccountId,
      categoryId: updateTransactionDto.categoryId,
    });

    return this.transactionsRepository.update({
      ...updateTransactionDto,
      id: transactionId,
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validatEntitiesOwnership({ userId, transactionId });
    await this.transactionsRepository.delete(transactionId);
    return null;
  }

  private async validatEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId && this.validateTransactionOwnershipService.validate(userId, transactionId),
      bankAccountId && this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      categoryId && this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
