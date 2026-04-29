import { IsEnum, IsHexColor, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { BankAccountType } from '../../../../../modules/bank-accounts/entities/BankAccount.js';

export class UpdateBankAccountDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

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
    id: string,
    name: string,
    initialBalance: number,
    type: BankAccountType,
    color: string,
  ) {
    this.id = id;
    this.name = name;
    this.initialBalance = initialBalance;
    this.type = type;
    this.color = color;
  }
}
