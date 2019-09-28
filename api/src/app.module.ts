import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SprintModule } from './sprint/sprint.module';

import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    // MongooseModule.forRoot(
    //   'mongodb+srv://USER:PASSWORD@cluster0-qwlfd.mongodb.net/nestjs?retryWrites=true&w=majority',
    // ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getString(),
      }),
      inject: [ConfigService],
    }),
    SprintModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
