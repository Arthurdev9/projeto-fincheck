import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../shared/database/repositories/users/user.repositories.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string) {
    const user = await this.usersRepository.findById(userId);
    return {
      name: user?.name,
      email: user?.email,
    };
  }
}
