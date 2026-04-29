import { IsEnum, IsHexColor, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BankAccountType } from '../entities/BankAccount.js';

export class UpdateBankAccountDto {
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

  constructor(name: string, initialBalance: number, type: BankAccountType, color: string) {
    this.name = name;
    this.initialBalance = initialBalance;
    this.type = type;
    this.color = color;
  }
}
