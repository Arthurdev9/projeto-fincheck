import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { ActiveUserId } from '../../shared/decorators/ActiveUserId.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId);
  }
}
