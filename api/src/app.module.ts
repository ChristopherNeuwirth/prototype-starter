import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SprintModule } from './sprint/sprint.module';

@Module({
  imports: [SprintModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
