import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../entities/Transaction.js';

export class CreateTransactionDto {
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
    bankAccountId: string,
    categoryId: string,
    name: string,
    value: number,
    date: Date,
    type: TransactionType,
  ) {
    this.bankAccountId = bankAccountId;
    this.categoryId = categoryId;
    this.name = name;
    this.value = value;
    this.date = date;
    this.type = type;
  }
}
