import { IsEnum, IsHexColor, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { BankAccountType } from '../../../../../modules/bank-accounts/entities/BankAccount.js';

export class CreateBankAccountDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsEnum(BankAccountType)
  @IsNotEmpty()
  type: BankAccountType;

  @IsString()
  @IsHexColor()
  @IsNotEmpty()
  color: string;

  constructor(
    userId: string,
    name: string,
    initialBalance: number,
    type: BankAccountType,
    color: string,
  ) {
    this.userId = userId;
    this.name = name;
    this.initialBalance = initialBalance;
    this.type = type;
    this.color = color;
  }
}
