import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindBankAccountByIdDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  constructor(id: string, userId: string) {
    this.id = id;
    this.userId = userId;
  }
}
