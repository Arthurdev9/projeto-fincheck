import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './shared/decorators/IsPublic.js';

@Controller('health')
export class HealthController {
  @Get()
  @IsPublic()
  check() {
    return { status: 'ok' };
  }
}
