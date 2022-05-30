import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      UserRepository
    ]),
    JwtModule.register({ secret: process.env.JWT_SECRET })
  ]
})
export class PostModule {}
