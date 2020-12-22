import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SprintModule } from './sprint/sprint.module';
import { MongooseModule } from '@nestjs/mongoose';

import { resolve } from 'path';
import { config } from 'dotenv';
import { SecureModule } from './secure/secure.module';

if (!process.env.DATABASE_USER) {
  config({ path: resolve(__dirname, '../.env') });
}

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}${process.env.DATABASE_URI}`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    ),
    SprintModule,
    SecureModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
