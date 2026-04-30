import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../../../../../modules/transactions/entities/Transaction.js';

export class UpdateTransactionDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  bankAccountId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  constructor(
    id: string,
    bankAccountId: string,
    categoryId: string,
    name: string,
    value: number,
    date: Date,
    type: TransactionType,
  ) {
    this.id = id;
    this.bankAccountId = bankAccountId;
    this.categoryId = categoryId;
    this.name = name;
    this.value = value;
    this.date = date;
    this.type = type;
  }
}
