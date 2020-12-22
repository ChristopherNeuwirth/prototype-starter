import { Controller, Get } from '@nestjs/common';
import { SecureService } from './secure.service';

@Controller('secure')
export class SecureController {
  constructor(private secureService: SecureService) {}

  @Get()
  async secureHello() {
    return await this.secureService.getSecureHello();
  }
}
