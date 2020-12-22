import { Module } from '@nestjs/common';
import { SecureController } from './secure.controller';
import { SecureService } from './secure.service';

@Module({
  imports: [],
  controllers: [SecureController],
  providers: [SecureService]
})
export class SecureModule {}
