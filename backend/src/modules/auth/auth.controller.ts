import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SigninDto } from './dto/signin.dto.js';
import { SignupDto } from './dto/signup.dto.js';
import { IsPublic } from '../../shared/decorators/IsPublic.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @IsPublic()
  authenticate(@Body() signinDto: SigninDto) {
    return this.authService.authenticate(signinDto);
  }

  @IsPublic()
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
