import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { PostController } from '../post/post.controller';
import { PostRepository } from '../post/post.repository';
import { PostService } from '../post/post.service';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { HttpService } from '@nestjs/axios';

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
  controllers: [PostController],
  providers: [PostService, HttpService],
  imports: [
    TypeOrmModule.forFeature([PostRepository, UserRepository]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
})
export class PostModule {}
