import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { PostModule } from './modules/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ServiceModule } from './modules/service.module';
import { HttpModule } from '@nestjs/axios';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'prod'
      ? '.dev.env'
      : process.env.NODE_ENV === 'dev'
      ? '.dev.env'
      : '.test.env',
  ),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.test.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    PostModule,
    ServiceModule,
    HttpModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
