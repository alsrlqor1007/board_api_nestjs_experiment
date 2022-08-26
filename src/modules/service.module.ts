import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
// import { UserController } from '../user/user.controller';
// import { PostController } from '../post/post.controller';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { UserRepository } from '../user/user.repository';
import { PostRepository } from '../post/post.repository';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PostController } from '../post/post.controller';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'prod'
      ? '.dev.env'
      : process.env.NODE_ENV === 'dev'
      ? '.dev.env'
      : '.test.env',
  ),
});

@Global()
@Module({
  controllers: [PostController],
  providers: [UserService, PostService],
  imports: [
    TypeOrmModule.forFeature([UserRepository, PostRepository]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
})
export class ServiceModule {}
